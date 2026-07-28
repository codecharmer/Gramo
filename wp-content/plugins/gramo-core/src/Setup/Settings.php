<?php
/**
 * Ajustes — Gramo settings screen.
 *
 * Tabbed settings UI (Negocio / Recolección / SMS / SEO) built on the WordPress
 * Settings API. The whole form posts to options.php with settings_fields('gramo')
 * so the sanitizers registered in Options handle every write; all four option
 * groups are rendered in one form (tabs are presentational) so switching tabs and
 * saving never wipes another tab's values.
 *
 * Secrets are rendered masked; when a value is supplied through a GRAMO_TWILIO_*
 * constant the field becomes read-only/informational. Two side tools live outside
 * the Settings-API form with their own nonces: "Enviar SMS de prueba" (AJAX) and
 * "Instalar contenido de demostración" (admin-post → fires gramo_run_content_install).
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Setup;

use Gramo\Core\Admin\Dashboard;
use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Settings implements Bootable {

	private const SLUG           = 'gramo-ajustes';
	private const SETTINGS_GROUP = 'gramo';

	/** Secret keys → the constant that, when defined, overrides them. */
	private const SECRET_CONSTANTS = array(
		'twilio_sid'            => 'GRAMO_TWILIO_SID',
		'twilio_token'          => 'GRAMO_TWILIO_AUTH_TOKEN',
		'twilio_from'           => 'GRAMO_TWILIO_FROM',
		'messaging_service_sid' => 'GRAMO_TWILIO_MESSAGING_SID',
	);

	public function boot(): void {
		add_action( 'admin_menu', array( $this, 'register_menu' ), 10 );
		add_action( 'admin_post_gramo_run_content_install', array( $this, 'handle_content_install' ) );
		add_action( 'wp_ajax_gramo_test_sms', array( $this, 'ajax_test_sms' ) );
		add_action( 'admin_notices', array( $this, 'maybe_render_notice' ) );
	}

	public function register_menu(): void {
		add_submenu_page(
			Dashboard::SLUG,
			__( 'Ajustes de Gramo', 'gramo-core' ),
			__( 'Ajustes', 'gramo-core' ),
			Activator::CAP,
			self::SLUG,
			array( $this, 'render' )
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Screen                                                                 */
	/* ---------------------------------------------------------------------- */

	public function render(): void {
		if ( ! current_user_can( Activator::CAP ) ) {
			wp_die( esc_html__( 'No tienes permiso para ver esta página.', 'gramo-core' ) );
		}

		$business = Options::group( Options::BUSINESS );
		$pickup   = Options::group( Options::PICKUP );
		$sms      = Options::group( Options::SMS );
		$seo      = Options::group( Options::SEO );
		$site     = Options::group( Options::SITE );

		$tabs   = array(
			'business' => __( 'Negocio', 'gramo-core' ),
			'site'     => __( 'Sitio', 'gramo-core' ),
			'pickup'   => __( 'Recolección', 'gramo-core' ),
			'sms'      => __( 'SMS', 'gramo-core' ),
			'seo'      => __( 'SEO', 'gramo-core' ),
		);
		$active = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : 'business'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- presentational tab.
		if ( ! isset( $tabs[ $active ] ) ) {
			$active = 'business';
		}
		$base_url = admin_url( 'admin.php?page=' . self::SLUG );
		?>
		<div class="wrap gramo-wrap gramo-settings" data-active-tab="<?php echo esc_attr( $active ); ?>">
			<h1 class="gramo-title">
				<span class="dashicons dashicons-admin-settings" aria-hidden="true"></span>
				<?php esc_html_e( 'Ajustes de Gramo', 'gramo-core' ); ?>
			</h1>

			<nav class="nav-tab-wrapper gramo-settings__tabs">
				<?php foreach ( $tabs as $key => $label ) : ?>
					<a class="nav-tab <?php echo $active === $key ? 'nav-tab-active' : ''; ?>"
						href="<?php echo esc_url( add_query_arg( 'tab', $key, $base_url ) ); ?>"
						data-gramo-tab="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $label ); ?></a>
				<?php endforeach; ?>
			</nav>

			<form method="post" action="options.php" class="gramo-settings__form">
				<?php settings_fields( self::SETTINGS_GROUP ); ?>

				<div class="gramo-tab-panel" data-gramo-panel="business" <?php echo 'business' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_business( $business ); ?>
				</div>
				<div class="gramo-tab-panel" data-gramo-panel="site" <?php echo 'site' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_site( $site ); ?>
				</div>
				<div class="gramo-tab-panel" data-gramo-panel="pickup" <?php echo 'pickup' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_pickup( $pickup ); ?>
				</div>
				<div class="gramo-tab-panel" data-gramo-panel="sms" <?php echo 'sms' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_sms( $sms ); ?>
				</div>
				<div class="gramo-tab-panel" data-gramo-panel="seo" <?php echo 'seo' === $active ? '' : 'hidden'; ?>>
					<?php $this->render_seo( $seo ); ?>
				</div>

				<?php submit_button( __( 'Guardar cambios', 'gramo-core' ) ); ?>
			</form>

			<?php $this->render_tools( $sms ); ?>
		</div>
		<?php
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Tab: Negocio                                                           */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,mixed> $v
	 */
	private function render_business( array $v ): void {
		$g = Options::BUSINESS;
		echo '<table class="form-table" role="presentation"><tbody>';
		$this->text_row( $g, 'name', __( 'Nombre del negocio', 'gramo-core' ), $v );
		$this->text_row( $g, 'tagline', __( 'Eslogan', 'gramo-core' ), $v );
		$this->text_row( $g, 'phone', __( 'Teléfono (visible)', 'gramo-core' ), $v );
		$this->text_row( $g, 'phone_link', __( 'Teléfono (enlace tel:)', 'gramo-core' ), $v );
		$this->text_row( $g, 'whatsapp', __( 'WhatsApp (URL)', 'gramo-core' ), $v, 'url' );
		$this->text_row( $g, 'email', __( 'Correo electrónico', 'gramo-core' ), $v, 'email' );
		$this->text_row( $g, 'address', __( 'Dirección completa', 'gramo-core' ), $v );
		$this->text_row( $g, 'address_short', __( 'Dirección corta', 'gramo-core' ), $v );
		$this->text_row( $g, 'street', __( 'Calle', 'gramo-core' ), $v );
		$this->text_row( $g, 'locality', __( 'Ciudad', 'gramo-core' ), $v );
		$this->text_row( $g, 'region', __( 'Estado', 'gramo-core' ), $v );
		$this->text_row( $g, 'postal_code', __( 'Código postal', 'gramo-core' ), $v );
		$this->text_row( $g, 'country', __( 'País (ISO)', 'gramo-core' ), $v );
		$this->text_row( $g, 'hours_summary', __( 'Horario (resumen)', 'gramo-core' ), $v );
		$this->text_row( $g, 'hours_closed', __( 'Días cerrados', 'gramo-core' ), $v );
		$this->text_row( $g, 'instagram', __( 'Instagram (URL)', 'gramo-core' ), $v, 'url' );
		$this->text_row( $g, 'instagram_handle', __( 'Instagram (usuario)', 'gramo-core' ), $v );
		$this->text_row( $g, 'maps_url', __( 'Google Maps (URL)', 'gramo-core' ), $v, 'url' );
		$this->text_row( $g, 'latitude', __( 'Latitud', 'gramo-core' ), $v );
		$this->text_row( $g, 'longitude', __( 'Longitud', 'gramo-core' ), $v );
		echo '</tbody></table>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Tab: Recolección                                                       */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,mixed> $v
	 */
	private function render_pickup( array $v ): void {
		$g    = Options::PICKUP;
		$days = array(
			0 => __( 'Dom', 'gramo-core' ),
			1 => __( 'Lun', 'gramo-core' ),
			2 => __( 'Mar', 'gramo-core' ),
			3 => __( 'Mié', 'gramo-core' ),
			4 => __( 'Jue', 'gramo-core' ),
			5 => __( 'Vie', 'gramo-core' ),
			6 => __( 'Sáb', 'gramo-core' ),
		);
		$open = array_map( 'intval', (array) ( $v['open_days'] ?? array() ) );
		echo '<table class="form-table" role="presentation"><tbody>';

		echo '<tr><th scope="row">' . esc_html__( 'Días abiertos', 'gramo-core' ) . '</th><td><fieldset>';
		foreach ( $days as $num => $label ) {
			printf(
				'<label class="gramo-inline-check"><input type="checkbox" name="%1$s[open_days][]" value="%2$d" %3$s> %4$s</label>',
				esc_attr( $g ),
				(int) $num,
				checked( in_array( $num, $open, true ), true, false ),
				esc_html( $label )
			);
		}
		echo '</fieldset></td></tr>';

		$this->text_row( $g, 'open_time', __( 'Hora de apertura', 'gramo-core' ), $v, 'time' );
		$this->text_row( $g, 'close_time', __( 'Hora de cierre', 'gramo-core' ), $v, 'time' );
		$this->text_row( $g, 'last_pickup', __( 'Última recolección', 'gramo-core' ), $v, 'time' );
		$this->number_row( $g, 'lead_time_hours', __( 'Anticipación (horas)', 'gramo-core' ), $v, 0 );
		$this->number_row( $g, 'slot_minutes', __( 'Duración de cada horario (min)', 'gramo-core' ), $v, 5 );
		$this->number_row( $g, 'slot_capacity', __( 'Capacidad por horario', 'gramo-core' ), $v, 1 );
		$this->number_row( $g, 'max_days_ahead', __( 'Días máximos por adelantado', 'gramo-core' ), $v, 1 );
		$this->text_row( $g, 'timezone', __( 'Zona horaria', 'gramo-core' ), $v );
		$this->textarea_row( $g, 'instructions', __( 'Instrucciones de recolección', 'gramo-core' ), $v );

		// Blackout dates — repeatable date list.
		$blackouts = array_values( array_filter( (array) ( $v['blackout_dates'] ?? array() ) ) );
		echo '<tr><th scope="row">' . esc_html__( 'Días bloqueados', 'gramo-core' ) . '</th><td>';
		echo '<div class="gramo-repeatable" data-repeatable="blackout">';
		if ( empty( $blackouts ) ) {
			$blackouts = array( '' );
		}
		foreach ( $blackouts as $date ) {
			$this->repeatable_row( $g . '[blackout_dates][]', (string) $date, 'date' );
		}
		echo '</div>';
		printf(
			'<button type="button" class="button gramo-repeatable-add" data-target="blackout">%s</button>',
			esc_html__( 'Agregar fecha', 'gramo-core' )
		);
		echo '</td></tr>';

		echo '</tbody></table>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Tab: SMS                                                               */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,mixed> $v
	 */
	private function render_sms( array $v ): void {
		$g = Options::SMS;
		echo '<table class="form-table" role="presentation"><tbody>';

		$this->checkbox_row( $g, 'enabled', __( 'Activar SMS', 'gramo-core' ), __( 'Enviar notificaciones por SMS.', 'gramo-core' ), $v );

		// Provider is fixed to Twilio; keep it in POST so the sanitizer sees it.
		printf( '<input type="hidden" name="%s[provider]" value="twilio">', esc_attr( $g ) );

		$this->secret_row( $g, 'twilio_sid', __( 'Twilio Account SID', 'gramo-core' ), $v );
		$this->secret_row( $g, 'twilio_token', __( 'Twilio Auth Token', 'gramo-core' ), $v );
		$this->secret_row( $g, 'twilio_from', __( 'Número remitente (From)', 'gramo-core' ), $v );
		$this->secret_row( $g, 'messaging_service_sid', __( 'Messaging Service SID', 'gramo-core' ), $v );

		$this->checkbox_row( $g, 'notify_customer', __( 'Notificar al cliente', 'gramo-core' ), __( 'Enviar SMS al cliente en cada cambio de estado.', 'gramo-core' ), $v );
		$this->checkbox_row( $g, 'notify_staff', __( 'Notificar al personal', 'gramo-core' ), __( 'Enviar SMS al personal cuando entra un pedido.', 'gramo-core' ), $v );

		// Staff numbers — repeatable list.
		$numbers = array_values( array_filter( (array) ( $v['staff_numbers'] ?? array() ) ) );
		if ( empty( $numbers ) ) {
			$numbers = array( '' );
		}
		echo '<tr><th scope="row">' . esc_html__( 'Números del personal', 'gramo-core' ) . '</th><td>';
		echo '<div class="gramo-repeatable" data-repeatable="staff">';
		foreach ( $numbers as $number ) {
			$this->repeatable_row( $g . '[staff_numbers][]', (string) $number, 'tel' );
		}
		echo '</div>';
		printf(
			'<button type="button" class="button gramo-repeatable-add" data-target="staff">%s</button>',
			esc_html__( 'Agregar número', 'gramo-core' )
		);
		echo '<p class="description">' . esc_html__( 'En formato internacional, p. ej. +5217771234567.', 'gramo-core' ) . '</p>';
		echo '</td></tr>';

		// Reply map — inbound keyword → status.
		$reply    = (array) ( $v['reply_map'] ?? array() );
		$statuses = $this->status_choices();
		echo '<tr><th scope="row">' . esc_html__( 'Respuestas entrantes', 'gramo-core' ) . '</th><td><fieldset class="gramo-reply-map">';
		foreach ( array( '1', '2', '3', '4' ) as $key ) {
			$current = isset( $reply[ $key ] ) ? (string) $reply[ $key ] : '';
			echo '<label class="gramo-reply-row"><span class="gramo-reply-key">' . esc_html( $key ) . '</span>';
			printf( '<select name="%1$s[reply_map][%2$s]">', esc_attr( $g ), esc_attr( $key ) );
			foreach ( $statuses as $slug => $label ) {
				printf(
					'<option value="%1$s" %2$s>%3$s</option>',
					esc_attr( $slug ),
					selected( $current, $slug, false ),
					esc_html( $label )
				);
			}
			echo '</select></label>';
		}
		echo '</fieldset></td></tr>';

		echo '</tbody></table>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Tab: SEO                                                               */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,mixed> $v
	 */
	private function render_seo( array $v ): void {
		$g = Options::SEO;
		echo '<table class="form-table" role="presentation"><tbody>';

		$this->media_row( $g, 'default_og_image', __( 'Imagen Open Graph por defecto', 'gramo-core' ), (int) ( $v['default_og_image'] ?? 0 ) );
		$this->media_row( $g, 'organization_logo', __( 'Logo de la organización', 'gramo-core' ), (int) ( $v['organization_logo'] ?? 0 ) );
		$this->text_row( $g, 'twitter_handle', __( 'Usuario de X / Twitter', 'gramo-core' ), $v );

		$ranges  = array( '$', '$$', '$$$', '$$$$' );
		$current = (string) ( $v['price_range'] ?? '$$' );
		echo '<tr><th scope="row"><label for="pf-price_range">' . esc_html__( 'Rango de precios', 'gramo-core' ) . '</label></th><td>';
		printf( '<select id="pf-price_range" name="%s[price_range]">', esc_attr( $g ) );
		foreach ( $ranges as $r ) {
			printf( '<option value="%1$s" %2$s>%1$s</option>', esc_attr( $r ), selected( $current, $r, false ) );
		}
		echo '</select></td></tr>';

		echo '</tbody></table>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Tab: Sitio (navegación, pie, aviso, redes)                             */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,mixed> $v
	 */
	private function render_site( array $v ): void {
		$g = Options::SITE;
		echo '<table class="form-table" role="presentation"><tbody>';

		$this->textarea_row( $g, 'nav_lines', __( 'Navegación principal', 'gramo-core' ), $v );
		$this->help_row( __( 'Un enlace por línea con el formato: Etiqueta ES | Label EN | /ruta — por ejemplo: «Café | Coffee | /cafe/».', 'gramo-core' ) );

		$this->textarea_row( $g, 'footer_lines', __( 'Enlaces del pie', 'gramo-core' ), $v );
		$this->help_row( __( 'Mismo formato que la navegación. Se muestran en el pie de página.', 'gramo-core' ) );

		$this->text_row( $g, 'footer_note_es', __( 'Nota del pie (ES)', 'gramo-core' ), $v );
		$this->text_row( $g, 'footer_note_en', __( 'Nota del pie (EN)', 'gramo-core' ), $v );

		$this->checkbox_row( $g, 'announcement_enabled', __( 'Barra de aviso activa', 'gramo-core' ), __( 'Muestra la barra de anuncio en la parte superior del sitio.', 'gramo-core' ), $v );
		$this->text_row( $g, 'announcement_es', __( 'Aviso (ES)', 'gramo-core' ), $v );
		$this->text_row( $g, 'announcement_en', __( 'Aviso (EN)', 'gramo-core' ), $v );
		$this->text_row( $g, 'announcement_url', __( 'Aviso — enlace (URL)', 'gramo-core' ), $v, 'url' );

		$this->text_row( $g, 'delivery_fee', __( 'Costo de envío local (MXN)', 'gramo-core' ), $v, 'number' );
		$this->text_row( $g, 'delivery_free_over', __( 'Envío gratis a partir de (MXN)', 'gramo-core' ), $v, 'number' );
		$this->help_row( __( 'Se aplica a pedidos con entrega a domicilio. Deja 0 para desactivar el costo o el umbral.', 'gramo-core' ) );

		$this->text_row( $g, 'social_instagram', __( 'Instagram (URL)', 'gramo-core' ), $v, 'url' );
		$this->text_row( $g, 'social_facebook', __( 'Facebook (URL)', 'gramo-core' ), $v, 'url' );
		$this->text_row( $g, 'social_spotify', __( 'Spotify (URL)', 'gramo-core' ), $v, 'url' );
		$this->text_row( $g, 'social_linktree', __( 'Linktree (URL)', 'gramo-core' ), $v, 'url' );
		$this->text_row( $g, 'whatsapp_community', __( 'Comunidad de WhatsApp (URL)', 'gramo-core' ), $v, 'url' );

		echo '</tbody></table>';
	}

	/**
	 * A full-width description row under the preceding field.
	 */
	private function help_row( string $text ): void {
		echo '<tr><th scope="row"></th><td><p class="description">' . esc_html( $text ) . '</p></td></tr>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Herramientas (outside the Settings-API form; own nonces)               */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,mixed> $sms
	 */
	private function render_tools( array $sms ): void {
		$default_to = '';
		$numbers    = array_values( array_filter( (array) ( $sms['staff_numbers'] ?? array() ) ) );
		if ( ! empty( $numbers ) ) {
			$default_to = (string) $numbers[0];
		}
		?>
		<hr>
		<h2 class="gramo-tools__title"><?php esc_html_e( 'Herramientas', 'gramo-core' ); ?></h2>
		<div class="gramo-tools">
			<div class="gramo-tool">
				<h3><?php esc_html_e( 'Enviar SMS de prueba', 'gramo-core' ); ?></h3>
				<p class="description"><?php esc_html_e( 'Envía un mensaje de prueba con la configuración actual de Twilio.', 'gramo-core' ); ?></p>
				<p>
					<input type="tel" id="gramo-test-sms-to" class="regular-text" value="<?php echo esc_attr( $default_to ); ?>" placeholder="+5217771234567">
					<button type="button" class="button button-secondary" id="gramo-test-sms-btn"><?php esc_html_e( 'Enviar prueba', 'gramo-core' ); ?></button>
				</p>
				<p class="gramo-test-sms-result" role="status" aria-live="polite"></p>
			</div>

			<div class="gramo-tool">
				<h3><?php esc_html_e( 'Contenido de demostración', 'gramo-core' ); ?></h3>
				<p class="description"><?php esc_html_e( 'Instala productos y páginas de ejemplo para arrancar la tienda.', 'gramo-core' ); ?></p>
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
					<input type="hidden" name="action" value="gramo_run_content_install">
					<?php wp_nonce_field( 'gramo_run_content_install' ); ?>
					<button type="submit" class="button button-secondary" data-gramo-confirm-install><?php esc_html_e( 'Instalar contenido de demostración', 'gramo-core' ); ?></button>
				</form>
			</div>
		</div>
		<?php
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Field render helpers                                                   */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param array<string,mixed> $values
	 */
	private function text_row( string $group, string $key, string $label, array $values, string $type = 'text' ): void {
		$id  = 'pf-' . $group . '-' . $key;
		$val = (string) ( $values[ $key ] ?? '' );
		echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th><td>';
		printf(
			'<input type="%1$s" id="%2$s" name="%3$s[%4$s]" value="%5$s" class="regular-text">',
			esc_attr( $type ),
			esc_attr( $id ),
			esc_attr( $group ),
			esc_attr( $key ),
			esc_attr( $val )
		);
		echo '</td></tr>';
	}

	/**
	 * @param array<string,mixed> $values
	 */
	private function number_row( string $group, string $key, string $label, array $values, int $min ): void {
		$id  = 'pf-' . $group . '-' . $key;
		$val = (string) ( $values[ $key ] ?? '' );
		echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th><td>';
		printf(
			'<input type="number" min="%1$d" step="1" id="%2$s" name="%3$s[%4$s]" value="%5$s" class="small-text">',
			(int) $min,
			esc_attr( $id ),
			esc_attr( $group ),
			esc_attr( $key ),
			esc_attr( $val )
		);
		echo '</td></tr>';
	}

	/**
	 * @param array<string,mixed> $values
	 */
	private function textarea_row( string $group, string $key, string $label, array $values ): void {
		$id  = 'pf-' . $group . '-' . $key;
		$val = (string) ( $values[ $key ] ?? '' );
		echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th><td>';
		printf(
			'<textarea id="%1$s" name="%2$s[%3$s]" rows="3" class="large-text">%4$s</textarea>',
			esc_attr( $id ),
			esc_attr( $group ),
			esc_attr( $key ),
			esc_textarea( $val )
		);
		echo '</td></tr>';
	}

	/**
	 * @param array<string,mixed> $values
	 */
	private function checkbox_row( string $group, string $key, string $label, string $help, array $values ): void {
		$id = 'pf-' . $group . '-' . $key;
		echo '<tr><th scope="row">' . esc_html( $label ) . '</th><td><label for="' . esc_attr( $id ) . '">';
		printf(
			'<input type="checkbox" id="%1$s" name="%2$s[%3$s]" value="1" %4$s> %5$s',
			esc_attr( $id ),
			esc_attr( $group ),
			esc_attr( $key ),
			checked( ! empty( $values[ $key ] ), true, false ),
			esc_html( $help )
		);
		echo '</label></td></tr>';
	}

	private function repeatable_row( string $name, string $value, string $type ): void {
		echo '<div class="gramo-repeatable__row">';
		printf(
			'<input type="%1$s" name="%2$s" value="%3$s" class="regular-text">',
			esc_attr( $type ),
			esc_attr( $name ),
			esc_attr( $value )
		);
		printf(
			'<button type="button" class="button-link gramo-repeatable-remove" aria-label="%s">&times;</button>',
			esc_attr__( 'Quitar', 'gramo-core' )
		);
		echo '</div>';
	}

	/**
	 * Secret field: masked; read-only + informational when a GRAMO_TWILIO_* constant defines it.
	 *
	 * @param array<string,mixed> $values
	 */
	private function secret_row( string $group, string $key, string $label, array $values ): void {
		$id       = 'pf-' . $group . '-' . $key;
		$stored   = (string) ( $values[ $key ] ?? '' );
		$const    = self::SECRET_CONSTANTS[ $key ] ?? '';
		$is_const = '' !== $const && defined( $const ) && '' !== (string) constant( $const );

		echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th><td>';

		if ( $is_const ) {
			$masked = $this->mask( (string) constant( $const ) );
			printf(
				'<input type="text" id="%1$s" class="regular-text" value="%2$s" readonly disabled>',
				esc_attr( $id ),
				esc_attr( $masked )
			);
			// Preserve the stored (pre-constant) value so saving other fields never wipes it.
			printf(
				'<input type="hidden" name="%1$s[%2$s]" value="%3$s">',
				esc_attr( $group ),
				esc_attr( $key ),
				esc_attr( $stored )
			);
			echo '<p class="description gramo-const-note"><span class="dashicons dashicons-lock" aria-hidden="true"></span> ';
			printf(
				/* translators: %s: PHP constant name */
				esc_html__( 'Definido mediante la constante %s. Este campo es de solo lectura.', 'gramo-core' ),
				'<code>' . esc_html( $const ) . '</code>'
			);
			echo '</p>';
		} else {
			printf(
				'<input type="password" id="%1$s" name="%2$s[%3$s]" value="%4$s" class="regular-text" autocomplete="off" spellcheck="false">',
				esc_attr( $id ),
				esc_attr( $group ),
				esc_attr( $key ),
				esc_attr( $stored )
			);
		}
		echo '</td></tr>';
	}

	private function media_row( string $group, string $key, string $label, int $attachment_id ): void {
		$id  = 'pf-' . $group . '-' . $key;
		$src = $attachment_id ? wp_get_attachment_image_url( $attachment_id, 'thumbnail' ) : '';
		echo '<tr><th scope="row">' . esc_html( $label ) . '</th><td>';
		echo '<div class="gramo-media" data-gramo-media>';
		printf(
			'<input type="hidden" id="%1$s" name="%2$s[%3$s]" value="%4$d" data-gramo-media-input>',
			esc_attr( $id ),
			esc_attr( $group ),
			esc_attr( $key ),
			(int) $attachment_id
		);
		printf(
			'<img class="gramo-media__preview" src="%1$s" alt="" %2$s>',
			esc_url( $src ),
			$src ? '' : 'hidden'
		);
		echo '<span class="gramo-media__buttons">';
		printf( '<button type="button" class="button gramo-media-select">%s</button> ', esc_html__( 'Seleccionar imagen', 'gramo-core' ) );
		printf( '<button type="button" class="button-link gramo-media-remove" %2$s>%1$s</button>', esc_html__( 'Quitar', 'gramo-core' ), $src ? '' : 'hidden' );
		echo '</span></div></td></tr>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Tools handlers                                                         */
	/* ---------------------------------------------------------------------- */

	/**
	 * Fire the content installer. Nonce action: `gramo_run_content_install`.
	 * The actual work is owned by the CLI/installer engineer; we just fire the hook.
	 */
	public function handle_content_install(): void {
		if ( ! current_user_can( Activator::CAP ) ) {
			wp_die( esc_html__( 'Permiso denegado.', 'gramo-core' ), '', array( 'response' => 403 ) );
		}
		check_admin_referer( 'gramo_run_content_install' );

		/**
		 * Trigger demo/starter content installation.
		 *
		 * @since 1.0.0
		 */
		do_action( 'gramo_run_content_install' );

		$redirect = add_query_arg(
			array(
				'page'         => self::SLUG,
				'gramo_notice' => 'content-install',
			),
			admin_url( 'admin.php' )
		);
		wp_safe_redirect( $redirect );
		exit;
	}

	/**
	 * Send a test SMS via TwilioClient. Nonce action: `gramo_test_sms` (field `nonce`).
	 */
	public function ajax_test_sms(): void {
		check_ajax_referer( 'gramo_test_sms', 'nonce' );

		if ( ! current_user_can( Activator::CAP ) ) {
			wp_send_json_error( array( 'message' => __( 'Permiso denegado.', 'gramo-core' ) ), 403 );
		}

		$to = isset( $_POST['to'] ) ? preg_replace( '/[^\d+]/', '', (string) wp_unslash( $_POST['to'] ) ) : '';
		if ( '' === $to ) {
			wp_send_json_error( array( 'message' => __( 'Ingresa un número de destino válido.', 'gramo-core' ) ), 400 );
		}

		$client_class = 'Gramo\\Core\\Sms\\TwilioClient';
		if ( ! class_exists( $client_class ) || ! method_exists( $client_class, 'send' ) ) {
			wp_send_json_error( array( 'message' => __( 'El cliente de Twilio aún no está disponible.', 'gramo-core' ) ), 501 );
		}

		$body = __( 'Gramo: mensaje de prueba. Todo funciona correctamente.', 'gramo-core' );

		try {
			$client = new $client_class();
			$result = $client->send( $to, $body );

			// send() always returns array{success:bool,sid:string,error:string} —
			// report the provider's own error verbatim so misconfiguration
			// (bad credentials, unverified number, trial limits) is visible here
			// instead of silently reading as success.
			if ( ! is_array( $result ) || empty( $result['success'] ) ) {
				$error = is_array( $result ) ? (string) ( $result['error'] ?? '' ) : '';
				wp_send_json_error(
					array(
						'message' => '' !== $error
							? sprintf( /* translators: %s: provider error message. */ __( 'No se pudo enviar: %s', 'gramo-core' ), $error )
							: __( 'No se pudo enviar el mensaje.', 'gramo-core' ),
					),
					502
				);
			}
			wp_send_json_success(
				array(
					'message' => sprintf( /* translators: %s: Twilio message SID. */ __( 'Mensaje de prueba enviado (%s).', 'gramo-core' ), (string) ( $result['sid'] ?? '' ) ),
				)
			);
		} catch ( \Throwable $e ) {
			wp_send_json_error( array( 'message' => __( 'Error al enviar el mensaje de prueba.', 'gramo-core' ) ), 500 );
		}
	}

	public function maybe_render_notice(): void {
		if ( ! isset( $_GET['gramo_notice'] ) || ! current_user_can( Activator::CAP ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- read-only display flag.
			return;
		}
		$notice = sanitize_key( wp_unslash( $_GET['gramo_notice'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only display flag, sanitized with sanitize_key().
		if ( 'content-install' === $notice ) {
			echo '<div class="notice notice-success is-dismissible"><p>';
			esc_html_e( 'Se solicitó la instalación de contenido de demostración.', 'gramo-core' );
			echo '</p></div>';
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Misc helpers                                                           */
	/* ---------------------------------------------------------------------- */

	/**
	 * @return array<string,string> status slug => label
	 */
	private function status_choices(): array {
		$choices = array();
		if ( function_exists( 'wc_get_order_statuses' ) ) {
			foreach ( wc_get_order_statuses() as $slug => $label ) {
				$choices[ (string) preg_replace( '/^wc-/', '', (string) $slug ) ] = (string) $label;
			}
		}
		// Ensure the custom statuses are always selectable even before Woo registers them.
		$choices += array(
			'preparing' => __( 'Preparando', 'gramo-core' ),
			'ready'     => __( 'Listo', 'gramo-core' ),
			'completed' => __( 'Completado', 'gramo-core' ),
			'cancelled' => __( 'Cancelado', 'gramo-core' ),
		);
		return $choices;
	}

	private function mask( string $secret ): string {
		$len = strlen( $secret );
		if ( $len <= 4 ) {
			return str_repeat( '•', $len );
		}
		return str_repeat( '•', $len - 4 ) . substr( $secret, -4 );
	}
}
