<?php
/**
 * Inquiry endpoint — the site's forms inbox.
 *
 * `POST gramo/v1/inquiry` receives every frontend form (contact, wholesale,
 * subscription, catering, events, careers):
 *
 *   { type, name, email, phone?, company?, message, locale?, _gramo_hp, _gramo_t }
 *
 * Valid submissions are stored as private `gramo_inquiry` posts (the staff
 * inbox in wp-admin), e-mailed to the site admin, and announced to staff
 * numbers through the Twilio module (dry-run until credentials exist).
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Rest;

use Gramo\Core\Contracts\Bootable;
use Gramo\Core\Sms\InquiryNotifications;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class InquiryController implements Bootable {

	private const NS = 'gramo/v1';

	/**
	 * The form types the frontend may submit — mirrored by the
	 * `gramo/inquiry-form` block's formType enum.
	 */
	public const FORM_TYPES = array( 'general', 'wholesale', 'subscription', 'catering', 'events', 'careers' );

	/** Spanish inbox labels per form type. */
	private const TYPE_LABELS = array(
		'general'      => 'Contacto',
		'wholesale'    => 'Mayoreo',
		'subscription' => 'Suscripción',
		'catering'     => 'Catering',
		'events'       => 'Eventos',
		'careers'      => 'Empleo',
	);

	public function boot(): void {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes(): void {
		register_rest_route(
			self::NS,
			'/inquiry',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'handle' ),
				// Public form endpoint; abuse is filtered by Guard.
				'permission_callback' => '__return_true',
			)
		);
	}

	public function handle( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		$body = (array) $request->get_json_params();

		$guard_error = Guard::check( $body, 'inquiry' );
		if ( null !== $guard_error ) {
			return $guard_error;
		}

		$type = sanitize_key( (string) ( $body['type'] ?? '' ) );
		if ( ! in_array( $type, self::FORM_TYPES, true ) ) {
			return new \WP_Error( 'gramo_invalid', __( 'Tipo de solicitud no válido.', 'gramo-core' ), array( 'status' => 400 ) );
		}

		$name    = sanitize_text_field( (string) ( $body['name'] ?? '' ) );
		$email   = sanitize_email( (string) ( $body['email'] ?? '' ) );
		$phone   = sanitize_text_field( (string) ( $body['phone'] ?? '' ) );
		$company = sanitize_text_field( (string) ( $body['company'] ?? '' ) );
		$message = sanitize_textarea_field( (string) ( $body['message'] ?? '' ) );
		$locale  = 'en' === ( $body['locale'] ?? '' ) ? 'en' : 'es';

		if ( '' === $name || '' === $email || '' === $message ) {
			return new \WP_Error( 'gramo_invalid', __( 'Nombre, correo y mensaje son obligatorios.', 'gramo-core' ), array( 'status' => 400 ) );
		}
		if ( mb_strlen( $message ) > 5000 ) {
			return new \WP_Error( 'gramo_invalid', __( 'El mensaje es demasiado largo.', 'gramo-core' ), array( 'status' => 400 ) );
		}

		$label   = self::TYPE_LABELS[ $type ];
		$post_id = wp_insert_post(
			array(
				'post_type'   => 'gramo_inquiry',
				'post_status' => 'private',
				'post_title'  => $label . ': ' . $name,
				'meta_input'  => array(
					'_gramo_inq_type'    => $type,
					'_gramo_inq_name'    => $name,
					'_gramo_inq_email'   => $email,
					'_gramo_inq_phone'   => $phone,
					'_gramo_inq_company' => $company,
					'_gramo_inq_message' => $message,
					'_gramo_inq_locale'  => $locale,
					'_gramo_inq_ip'      => Guard::ip_hash(),
				),
			),
			true
		);

		if ( is_wp_error( $post_id ) ) {
			return new \WP_Error( 'gramo_failed', __( 'No se pudo registrar la solicitud.', 'gramo-core' ), array( 'status' => 500 ) );
		}

		$this->email_staff( $label, $name, $email, $phone, $company, $message );
		InquiryNotifications::notify( $label, $name, $phone, (int) $post_id );

		return new \WP_REST_Response( array( 'ok' => true ), 201 );
	}

	/**
	 * Plain-text staff e-mail to the site admin address.
	 */
	private function email_staff( string $label, string $name, string $email, string $phone, string $company, string $message ): void {
		$to      = (string) get_option( 'admin_email' );
		$subject = sprintf( '[Gramo] %s — %s', $label, $name );
		$lines   = array(
			'Tipo: ' . $label,
			'Nombre: ' . $name,
			'Correo: ' . $email,
		);
		if ( '' !== $phone ) {
			$lines[] = 'Teléfono: ' . $phone;
		}
		if ( '' !== $company ) {
			$lines[] = 'Empresa: ' . $company;
		}
		$lines[] = '';
		$lines[] = $message;

		wp_mail( $to, $subject, implode( "\n", $lines ) );
	}
}
