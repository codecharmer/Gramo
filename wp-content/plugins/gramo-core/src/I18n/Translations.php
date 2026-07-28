<?php
/**
 * Translation pairs for block-composed content (pages + journal posts).
 *
 * Every page/post carries `_gramo_locale` ('es' | 'en') and may link to its
 * peer in the other language through `_gramo_translation_of`. Both languages
 * are full Gutenberg documents; the Gatsby frontend pairs them for hreflang
 * and the language switcher, and omits untranslated content from EN routes
 * rather than falling back to Spanish.
 *
 * This service owns:
 *   - the "Traducción" meta box (locale radio, peer link, one-click cloner),
 *   - link integrity (bidirectional pointers, no same-locale or double links,
 *     pointers cleared on trash/delete),
 *   - the admin "Idioma" list column + locale filter,
 *   - bilingual journal categories (ES name native + `_gramo_name_en` term meta),
 *   - GraphQL exposure: `locale`, `translation { databaseId slug uri locale }`
 *     on Page/Post and `nameEn` on Category.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\I18n;

use Gramo\Core\Content\Schema;
use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Translations implements Bootable {

	/** Post types that participate in translation pairs. */
	private const POST_TYPES = array( 'page', 'post' );

	/** Term meta holding the English term name. */
	public const TERM_NAME_EN = '_gramo_name_en';

	/** Taxonomies whose terms carry an English name alongside the Spanish one. */
	private const BILINGUAL_TAXONOMIES = array( 'category', Schema::MENU_SECTION_TAX );

	/** GraphQL types for those taxonomies. */
	private const BILINGUAL_TERM_TYPES = array( 'Category', 'MenuSection' );

	private const NONCE_ACTION = 'gramo_i18n_save';
	private const NONCE_FIELD  = 'gramo_i18n_nonce';

	public function boot(): void {
		add_action( 'add_meta_boxes', array( $this, 'register_meta_box' ) );
		add_action( 'save_post', array( $this, 'save' ), 10, 2 );
		add_action( 'admin_post_gramo_create_translation', array( $this, 'handle_create_translation' ) );
		add_action( 'wp_trash_post', array( $this, 'unlink_peer' ) );
		add_action( 'before_delete_post', array( $this, 'unlink_peer' ) );

		foreach ( self::POST_TYPES as $post_type ) {
			add_filter( "manage_{$post_type}_posts_columns", array( $this, 'add_locale_column' ) );
			add_action( "manage_{$post_type}_posts_custom_column", array( $this, 'render_locale_column' ), 10, 2 );
		}
		add_action( 'restrict_manage_posts', array( $this, 'render_locale_filter' ) );
		add_action( 'pre_get_posts', array( $this, 'apply_locale_filter' ) );

		// Bilingual taxonomy names (journal categories + menu sections).
		foreach ( self::BILINGUAL_TAXONOMIES as $taxonomy ) {
			add_action( "{$taxonomy}_add_form_fields", array( $this, 'render_term_name_en_add' ) );
			add_action( "{$taxonomy}_edit_form_fields", array( $this, 'render_term_name_en_edit' ) );
			add_action( "created_{$taxonomy}", array( $this, 'save_term_name_en' ) );
			add_action( "edited_{$taxonomy}", array( $this, 'save_term_name_en' ) );
		}

		add_action( 'graphql_register_types', array( $this, 'register_graphql' ) );
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Meta box                                                               */
	/* ---------------------------------------------------------------------- */

	public function register_meta_box(): void {
		foreach ( self::POST_TYPES as $post_type ) {
			add_meta_box(
				'gramo-i18n',
				__( 'Traducción', 'gramo-core' ),
				array( $this, 'render_meta_box' ),
				$post_type,
				'side',
				'high'
			);
		}
	}

	public function render_meta_box( \WP_Post $post ): void {
		$locale  = self::locale_of( $post->ID );
		$peer_id = self::peer_of( $post->ID );
		$peer    = $peer_id > 0 ? get_post( $peer_id ) : null;

		wp_nonce_field( self::NONCE_ACTION, self::NONCE_FIELD );

		echo '<p><strong>' . esc_html__( 'Idioma de este contenido', 'gramo-core' ) . '</strong></p>';
		echo '<p>';
		foreach ( array(
			'es' => __( 'Español', 'gramo-core' ),
			'en' => __( 'Inglés', 'gramo-core' ),
		) as $value => $label ) {
			printf(
				'<label style="margin-right:12px"><input type="radio" name="gramo_locale" value="%1$s" %2$s> %3$s</label>',
				esc_attr( $value ),
				checked( $locale, $value, false ),
				esc_html( $label )
			);
		}
		echo '</p>';

		if ( $peer instanceof \WP_Post && 'trash' !== $peer->post_status ) {
			$edit_link = get_edit_post_link( $peer->ID );
			echo '<p>' . esc_html__( 'Traducción vinculada:', 'gramo-core' ) . '<br>';
			if ( is_string( $edit_link ) ) {
				echo '<a href="' . esc_url( $edit_link ) . '">' . esc_html( get_the_title( $peer ) ) . '</a>';
			} else {
				echo esc_html( get_the_title( $peer ) );
			}
			echo ' <span class="gramo-badge">' . esc_html( strtoupper( self::locale_of( $peer->ID ) ) ) . '</span></p>';
			return;
		}

		if ( 'auto-draft' === $post->post_status ) {
			echo '<p class="description">' . esc_html__( 'Guarda el contenido antes de crear su traducción.', 'gramo-core' ) . '</p>';
			return;
		}

		$url = wp_nonce_url(
			admin_url( 'admin-post.php?action=gramo_create_translation&post=' . $post->ID ),
			'gramo_create_translation_' . $post->ID
		);
		echo '<p><a href="' . esc_url( $url ) . '" class="button">' . esc_html__( 'Crear traducción', 'gramo-core' ) . '</a></p>';
		echo '<p class="description">' . esc_html__( 'Crea un borrador en el otro idioma con la misma estructura de bloques y lo vincula a este contenido.', 'gramo-core' ) . '</p>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Saving + link integrity                                                */
	/* ---------------------------------------------------------------------- */

	public function save( int $post_id, \WP_Post $post ): void {
		if ( ! in_array( $post->post_type, self::POST_TYPES, true ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( wp_is_post_revision( $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		// The locale radio posts through the classic meta box nonce.
		if ( isset( $_POST[ self::NONCE_FIELD ] )
			&& wp_verify_nonce( sanitize_key( wp_unslash( $_POST[ self::NONCE_FIELD ] ) ), self::NONCE_ACTION )
			&& isset( $_POST['gramo_locale'] )
		) {
			$locale = sanitize_key( wp_unslash( $_POST['gramo_locale'] ) );
			if ( in_array( $locale, array( 'es', 'en' ), true ) ) {
				update_post_meta( $post_id, Schema::LOCALE_META, $locale );
			}
		}

		// Default locale for content that never saw the meta box (CLI, seeder).
		if ( '' === (string) get_post_meta( $post_id, Schema::LOCALE_META, true ) ) {
			update_post_meta( $post_id, Schema::LOCALE_META, 'es' );
		}

		$this->enforce_link_integrity( $post_id );
	}

	/**
	 * Keep translation pointers bidirectional and coherent.
	 */
	private function enforce_link_integrity( int $post_id ): void {
		$peer_id = self::peer_of( $post_id );
		if ( $peer_id <= 0 ) {
			return;
		}

		$peer = get_post( $peer_id );
		if ( ! $peer instanceof \WP_Post || $peer_id === $post_id ) {
			delete_post_meta( $post_id, Schema::TRANSLATION_META );
			return;
		}

		// A pair must span both locales.
		if ( self::locale_of( $post_id ) === self::locale_of( $peer_id ) ) {
			delete_post_meta( $post_id, Schema::TRANSLATION_META );
			return;
		}

		// No double-linking: the peer must be free or already ours.
		$peer_pointer = self::peer_of( $peer_id );
		if ( 0 !== $peer_pointer && $peer_pointer !== $post_id ) {
			delete_post_meta( $post_id, Schema::TRANSLATION_META );
			return;
		}

		if ( $peer_pointer !== $post_id ) {
			update_post_meta( $peer_id, Schema::TRANSLATION_META, $post_id );
		}
	}

	/**
	 * Clear the peer's back-pointer when a linked post is trashed or deleted.
	 */
	public function unlink_peer( int $post_id ): void {
		$post = get_post( $post_id );
		if ( ! $post instanceof \WP_Post || ! in_array( $post->post_type, self::POST_TYPES, true ) ) {
			return;
		}
		$peer_id = self::peer_of( $post_id );
		if ( $peer_id > 0 && self::peer_of( $peer_id ) === $post_id ) {
			delete_post_meta( $peer_id, Schema::TRANSLATION_META );
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	One-click cloner                                                       */
	/* ---------------------------------------------------------------------- */

	public function handle_create_translation(): void {
		$post_id = isset( $_GET['post'] ) ? (int) $_GET['post'] : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- verified below via check_admin_referer.
		check_admin_referer( 'gramo_create_translation_' . $post_id );

		$post = get_post( $post_id );
		if ( ! $post instanceof \WP_Post
			|| ! in_array( $post->post_type, self::POST_TYPES, true )
			|| ! current_user_can( 'edit_post', $post_id )
		) {
			wp_die( esc_html__( 'Contenido no válido.', 'gramo-core' ) );
		}

		if ( self::peer_of( $post_id ) > 0 ) {
			wp_safe_redirect( (string) get_edit_post_link( self::peer_of( $post_id ), 'redirect' ) );
			exit;
		}

		$source_locale = self::locale_of( $post_id );
		$target_locale = 'es' === $source_locale ? 'en' : 'es';
		$suffix        = 'en' === $target_locale ? ' (EN)' : ' (ES)';

		$clone_id = self::without_kses(
			static function () use ( $post, $suffix ): int {
				$id = wp_insert_post(
					array(
						'post_type'    => $post->post_type,
						'post_status'  => 'draft',
						'post_title'   => $post->post_title . $suffix,
						'post_content' => $post->post_content,
						'post_parent'  => $post->post_parent,
						'menu_order'   => $post->menu_order,
					),
					true
				);
				return is_wp_error( $id ) ? 0 : (int) $id;
			}
		);

		if ( $clone_id <= 0 ) {
			wp_die( esc_html__( 'No se pudo crear la traducción.', 'gramo-core' ) );
		}

		// Template, featured image, categories, and SEO meta travel with the clone.
		$template = (string) get_post_meta( $post_id, '_wp_page_template', true );
		if ( '' !== $template ) {
			update_post_meta( $clone_id, '_wp_page_template', $template );
		}
		$thumbnail = (int) get_post_thumbnail_id( $post_id );
		if ( $thumbnail > 0 ) {
			set_post_thumbnail( $clone_id, $thumbnail );
		}
		if ( 'post' === $post->post_type ) {
			$terms = wp_get_post_categories( $post_id );
			if ( ! is_wp_error( $terms ) && array() !== $terms ) {
				wp_set_post_categories( $clone_id, array_map( 'intval', $terms ) );
			}
		}
		foreach ( array( '_gramo_meta_description', '_gramo_seo_short' ) as $seo_key ) {
			$seo_value = (string) get_post_meta( $post_id, $seo_key, true );
			if ( '' !== $seo_value ) {
				update_post_meta( $clone_id, $seo_key, $seo_value );
			}
		}

		update_post_meta( $clone_id, Schema::LOCALE_META, $target_locale );
		update_post_meta( $clone_id, Schema::TRANSLATION_META, $post_id );
		update_post_meta( $post_id, Schema::LOCALE_META, $source_locale );
		update_post_meta( $post_id, Schema::TRANSLATION_META, $clone_id );

		wp_safe_redirect( (string) get_edit_post_link( $clone_id, 'redirect' ) );
		exit;
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Admin list column + filter                                             */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,string> $columns
	 * @return array<string,string>
	 */
	public function add_locale_column( array $columns ): array {
		$columns['gramo_locale'] = __( 'Idioma', 'gramo-core' );
		return $columns;
	}

	public function render_locale_column( string $column, int $post_id ): void {
		if ( 'gramo_locale' !== $column ) {
			return;
		}
		echo '<strong>' . esc_html( strtoupper( self::locale_of( $post_id ) ) ) . '</strong>';

		$peer_id = self::peer_of( $post_id );
		if ( $peer_id > 0 ) {
			$edit_link = get_edit_post_link( $peer_id );
			if ( is_string( $edit_link ) ) {
				echo ' · <a href="' . esc_url( $edit_link ) . '">' . esc_html__( 'ver par', 'gramo-core' ) . '</a>';
			}
		} else {
			echo ' · <span class="description">' . esc_html__( 'sin traducción', 'gramo-core' ) . '</span>';
		}
	}

	public function render_locale_filter( string $post_type ): void {
		if ( ! in_array( $post_type, self::POST_TYPES, true ) ) {
			return;
		}
		$current = isset( $_GET['gramo_locale'] ) ? sanitize_key( wp_unslash( $_GET['gramo_locale'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only list filter.
		echo '<select name="gramo_locale">';
		echo '<option value="">' . esc_html__( 'Todos los idiomas', 'gramo-core' ) . '</option>';
		foreach ( array(
			'es' => __( 'Español', 'gramo-core' ),
			'en' => __( 'Inglés', 'gramo-core' ),
		) as $value => $label ) {
			printf( '<option value="%1$s" %2$s>%3$s</option>', esc_attr( $value ), selected( $current, $value, false ), esc_html( $label ) );
		}
		echo '</select>';
	}

	public function apply_locale_filter( \WP_Query $query ): void {
		if ( ! is_admin() || ! $query->is_main_query() ) {
			return;
		}
		$locale = isset( $_GET['gramo_locale'] ) ? sanitize_key( wp_unslash( $_GET['gramo_locale'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only list filter.
		if ( ! in_array( $locale, array( 'es', 'en' ), true ) ) {
			return;
		}
		$post_type = (string) $query->get( 'post_type' );
		if ( ! in_array( $post_type, self::POST_TYPES, true ) ) {
			return;
		}

		if ( 'es' === $locale ) {
			// ES is the default: match explicit 'es' plus rows without the meta.
			$query->set(
				'meta_query',
				array(
					'relation' => 'OR',
					array(
						'key'   => Schema::LOCALE_META,
						'value' => 'es',
					),
					array(
						'key'     => Schema::LOCALE_META,
						'compare' => 'NOT EXISTS',
					),
				)
			);
			return;
		}

		$query->set(
			'meta_query',
			array(
				array(
					'key'   => Schema::LOCALE_META,
					'value' => 'en',
				),
			)
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Bilingual categories                                                   */
	/* ---------------------------------------------------------------------- */

	public function render_term_name_en_add(): void {
		wp_nonce_field( self::NONCE_ACTION, self::NONCE_FIELD );
		echo '<div class="form-field"><label for="gramo-name-en">' . esc_html__( 'Nombre (EN)', 'gramo-core' ) . '</label>';
		echo '<input type="text" id="gramo-name-en" name="gramo_name_en" value="">';
		echo '<p class="description">' . esc_html__( 'Nombre de la categoría en inglés; el nombre normal es el español.', 'gramo-core' ) . '</p></div>';
	}

	public function render_term_name_en_edit( \WP_Term $term ): void {
		wp_nonce_field( self::NONCE_ACTION, self::NONCE_FIELD );
		$value = (string) get_term_meta( $term->term_id, self::TERM_NAME_EN, true );
		echo '<tr class="form-field"><th scope="row"><label for="gramo-name-en">' . esc_html__( 'Nombre (EN)', 'gramo-core' ) . '</label></th><td>';
		echo '<input type="text" id="gramo-name-en" name="gramo_name_en" value="' . esc_attr( $value ) . '">';
		echo '<p class="description">' . esc_html__( 'Nombre de la categoría en inglés; el nombre normal es el español.', 'gramo-core' ) . '</p></td></tr>';
	}

	public function save_term_name_en( int $term_id ): void {
		if ( ! isset( $_POST[ self::NONCE_FIELD ] )
			|| ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST[ self::NONCE_FIELD ] ) ), self::NONCE_ACTION )
			|| ! isset( $_POST['gramo_name_en'] )
			|| ! current_user_can( 'manage_categories' )
		) {
			return;
		}
		$value = sanitize_text_field( wp_unslash( $_POST['gramo_name_en'] ) );
		if ( '' === $value ) {
			delete_term_meta( $term_id, self::TERM_NAME_EN );
		} else {
			update_term_meta( $term_id, self::TERM_NAME_EN, $value );
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	GraphQL                                                                */
	/* ---------------------------------------------------------------------- */

	public function register_graphql(): void {
		if ( ! function_exists( 'register_graphql_object_type' ) || ! function_exists( 'register_graphql_field' ) ) {
			return;
		}

		register_graphql_object_type(
			'GramoTranslationLink',
			array(
				'description' => __( 'La versión de este contenido en el otro idioma.', 'gramo-core' ),
				'fields'      => array(
					'databaseId' => array( 'type' => 'Int' ),
					'slug'       => array( 'type' => 'String' ),
					'uri'        => array( 'type' => 'String' ),
					'locale'     => array( 'type' => 'String' ),
				),
			)
		);

		foreach ( array( 'Page', 'Post' ) as $graphql_type ) {
			register_graphql_field(
				$graphql_type,
				'locale',
				array(
					'type'        => 'String',
					'description' => __( 'Idioma de este contenido (es | en).', 'gramo-core' ),
					'resolve'     => static function ( $post ): string {
						return self::locale_of( self::model_id( $post ) );
					},
				)
			);
			register_graphql_field(
				$graphql_type,
				'translation',
				array(
					'type'        => 'GramoTranslationLink',
					'description' => __( 'Traducción vinculada, si existe y está publicada.', 'gramo-core' ),
					'resolve'     => static function ( $post ): ?array {
						$peer_id = self::peer_of( self::model_id( $post ) );
						if ( $peer_id <= 0 ) {
							return null;
						}
						$peer = get_post( $peer_id );
						if ( ! $peer instanceof \WP_Post || 'publish' !== $peer->post_status ) {
							return null;
						}
						return array(
							'databaseId' => $peer->ID,
							'slug'       => $peer->post_name,
							'uri'        => wp_make_link_relative( (string) get_permalink( $peer ) ),
							'locale'     => self::locale_of( $peer->ID ),
						);
					},
				)
			);
		}

		foreach ( self::BILINGUAL_TERM_TYPES as $term_type ) {
			register_graphql_field(
				$term_type,
				'nameEn',
				array(
					'type'        => 'String',
					'description' => __( 'Nombre del término en inglés.', 'gramo-core' ),
					'resolve'     => static function ( $term ): ?string {
						$id = 0;
						if ( is_object( $term ) ) {
							if ( isset( $term->databaseId ) ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
								$id = (int) $term->databaseId; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
							} elseif ( isset( $term->term_id ) ) {
								$id = (int) $term->term_id;
							}
						}
						$name = (string) get_term_meta( $id, self::TERM_NAME_EN, true );
						return '' === $name ? null : $name;
					},
				)
			);
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Helpers                                                                */
	/* ---------------------------------------------------------------------- */

	/**
	 * The locale of a post ('es' when unset — Spanish is the default language).
	 */
	public static function locale_of( int $post_id ): string {
		$locale = (string) get_post_meta( $post_id, Schema::LOCALE_META, true );
		return 'en' === $locale ? 'en' : 'es';
	}

	/**
	 * The linked peer's ID, or 0.
	 */
	public static function peer_of( int $post_id ): int {
		return (int) get_post_meta( $post_id, Schema::TRANSLATION_META, true );
	}

	/**
	 * Database ID from a WPGraphQL Post model.
	 *
	 * @param mixed $post WPGraphQL model.
	 */
	private static function model_id( mixed $post ): int {
		if ( is_object( $post ) ) {
			if ( isset( $post->databaseId ) ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
				return (int) $post->databaseId; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
			}
			if ( isset( $post->ID ) ) {
				return (int) $post->ID;
			}
		}
		return 0;
	}

	/**
	 * Run a callback with post-content kses filtering suspended so trusted
	 * block markup survives cloning under any user context.
	 *
	 * @template T
	 * @param callable():T $callback
	 * @return T
	 */
	private static function without_kses( callable $callback ): mixed {
		$had = false !== has_filter( 'content_save_pre', 'wp_filter_post_kses' );
		if ( $had ) {
			kses_remove_filters();
		}
		try {
			return $callback();
		} finally {
			if ( $had ) {
				kses_init_filters();
			}
		}
	}
}
