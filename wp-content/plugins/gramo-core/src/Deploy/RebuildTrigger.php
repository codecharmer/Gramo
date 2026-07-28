<?php
/**
 * Frontend rebuild trigger.
 *
 * The public site is statically built, so content changes must reach GitHub:
 * publishing, updating, or deleting public content (or saving site settings)
 * fires a `repository_dispatch` event (`content-updated`) that the frontend
 * deploy workflow listens for.
 *
 * Dispatches are debounced with a two-minute leading-edge transient so a burst
 * of edits costs one build; an admin-bar "Publicar sitio" button lets editors
 * force a build at any moment. The GitHub token comes from the
 * GRAMO_GITHUB_PAT constant (fine-grained, Contents: read/write on the site
 * repo only); with no token configured the service stays dormant and shows
 * the last dispatch result in the button's tooltip instead of failing.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Deploy;

use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class RebuildTrigger implements Bootable {

	/** GitHub repo (owner/name) receiving repository_dispatch events. */
	private const REPO_DEFAULT = 'codecharmer/Gramo';

	/** Leading-edge debounce window (seconds). */
	private const DEBOUNCE = 120;

	private const TRANSIENT_PENDING = 'gramo_rebuild_debounce';
	private const OPTION_LAST       = 'gramo_rebuild_last';

	/** Post types whose changes affect the public site. */
	private const PUBLIC_TYPES = array(
		'post',
		'page',
		'product',
		'gramo_location',
		'gramo_menu_item',
		'gramo_team',
		'gramo_testimonial',
		'gramo_event',
	);

	public function boot(): void {
		add_action( 'transition_post_status', array( $this, 'on_status_change' ), 10, 3 );
		add_action( 'deleted_post', array( $this, 'on_delete' ), 10, 2 );

		foreach ( array( 'gramo_site_settings', 'gramo_business_info', 'gramo_seo' ) as $option ) {
			add_action( "update_option_{$option}", array( $this, 'on_settings_change' ) );
		}

		add_action( 'admin_bar_menu', array( $this, 'add_admin_bar_button' ), 90 );
		add_action( 'admin_post_gramo_publish_site', array( $this, 'handle_manual_publish' ) );
		add_action( 'admin_notices', array( $this, 'maybe_render_notice' ) );
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Change detection                                                       */
	/* ---------------------------------------------------------------------- */

	public function on_status_change( string $new_status, string $old_status, \WP_Post $post ): void {
		if ( ! in_array( $post->post_type, self::PUBLIC_TYPES, true ) ) {
			return;
		}
		// Only transitions that change what the public site shows.
		if ( 'publish' !== $new_status && 'publish' !== $old_status ) {
			return;
		}
		$this->dispatch();
	}

	public function on_delete( int $post_id, \WP_Post $post ): void {
		if ( in_array( $post->post_type, self::PUBLIC_TYPES, true ) ) {
			$this->dispatch();
		}
	}

	public function on_settings_change(): void {
		$this->dispatch();
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Dispatch                                                               */
	/* ---------------------------------------------------------------------- */

	/**
	 * Fire the repository_dispatch, debounced unless forced.
	 */
	public function dispatch( bool $force = false ): bool {
		if ( ! $force && false !== get_transient( self::TRANSIENT_PENDING ) ) {
			return true; // A build was requested moments ago.
		}

		$token = defined( 'GRAMO_GITHUB_PAT' ) ? (string) GRAMO_GITHUB_PAT : '';
		if ( '' === $token ) {
			$this->remember( 'sin-token' );
			return false;
		}

		set_transient( self::TRANSIENT_PENDING, time(), self::DEBOUNCE );

		$repo     = defined( 'GRAMO_GITHUB_REPO' ) ? (string) GRAMO_GITHUB_REPO : self::REPO_DEFAULT;
		$response = wp_remote_post(
			'https://api.github.com/repos/' . $repo . '/dispatches',
			array(
				'timeout' => 10,
				'headers' => array(
					'Accept'               => 'application/vnd.github+json',
					'Authorization'        => 'Bearer ' . $token,
					'X-GitHub-Api-Version' => '2022-11-28',
					'User-Agent'           => 'gramo-core',
					'Content-Type'         => 'application/json',
				),
				'body'    => (string) wp_json_encode( array( 'event_type' => 'content-updated' ) ),
			)
		);

		if ( is_wp_error( $response ) ) {
			$this->remember( 'error: ' . $response->get_error_message() );
			return false;
		}

		$code = (int) wp_remote_retrieve_response_code( $response );
		$this->remember( 204 === $code ? 'ok' : 'http-' . $code );
		return 204 === $code;
	}

	private function remember( string $result ): void {
		update_option(
			self::OPTION_LAST,
			array(
				'result' => $result,
				'time'   => time(),
			),
			false
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Admin UI                                                               */
	/* ---------------------------------------------------------------------- */

	public function add_admin_bar_button( \WP_Admin_Bar $bar ): void {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}
		$bar->add_node(
			array(
				'id'    => 'gramo-publish',
				'title' => '☕ ' . __( 'Publicar sitio', 'gramo-core' ),
				'href'  => wp_nonce_url( admin_url( 'admin-post.php?action=gramo_publish_site' ), 'gramo_publish_site' ),
				'meta'  => array(
					'title' => __( 'Reconstruye el sitio público con el contenido actual.', 'gramo-core' ),
				),
			)
		);
	}

	public function handle_manual_publish(): void {
		check_admin_referer( 'gramo_publish_site' );
		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_die( esc_html__( 'No tienes permiso para publicar el sitio.', 'gramo-core' ) );
		}

		$ok       = $this->dispatch( true );
		$referer  = wp_get_referer();
		$redirect = add_query_arg( 'gramo_published', $ok ? '1' : '0', $referer ? $referer : admin_url() );
		wp_safe_redirect( $redirect );
		exit;
	}

	public function maybe_render_notice(): void {
		if ( ! isset( $_GET['gramo_published'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only display flag.
			return;
		}
		$ok = '1' === sanitize_key( wp_unslash( $_GET['gramo_published'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only display flag.
		if ( $ok ) {
			echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__( 'Se solicitó la reconstrucción del sitio. Los cambios estarán en línea en unos minutos.', 'gramo-core' ) . '</p></div>';
			return;
		}

		$last   = (array) get_option( self::OPTION_LAST, array() );
		$result = (string) ( $last['result'] ?? '' );
		if ( 'sin-token' === $result ) {
			echo '<div class="notice notice-warning is-dismissible"><p>' . esc_html__( 'No hay token de GitHub configurado (GRAMO_GITHUB_PAT); la publicación automática está inactiva.', 'gramo-core' ) . '</p></div>';
			return;
		}
		echo '<div class="notice notice-error is-dismissible"><p>' . esc_html__( 'No se pudo solicitar la reconstrucción del sitio. Revisa el token de GitHub.', 'gramo-core' ) . '</p></div>';
	}
}
