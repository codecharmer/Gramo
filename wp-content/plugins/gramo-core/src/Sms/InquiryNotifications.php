<?php
/**
 * Staff SMS/WhatsApp alerts for form inquiries.
 *
 * Companion to {@see OrderNotifications} for the non-commerce funnel: when a
 * visitor submits any frontend form (contact, wholesale, subscription,
 * catering, events, careers), every configured staff number receives a short
 * alert through the Twilio client. Honors the same config: `enabled` +
 * `notify_staff` flags, dry-run mode, and channel selection all come from
 * `Options::sms()`, and every attempt is written to the SMS log.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Sms;

use Gramo\Core\Setup\Options;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class InquiryNotifications {

	/**
	 * Alert staff numbers about a new inquiry.
	 *
	 * @param string $label      Spanish form label ("Mayoreo", "Contacto", …).
	 * @param string $name       Submitter's name.
	 * @param string $phone      Submitter's phone (may be empty).
	 * @param int    $inquiry_id The stored gramo_inquiry post ID.
	 */
	public static function notify( string $label, string $name, string $phone, int $inquiry_id ): void {
		$sms = Options::sms();
		if ( empty( $sms['enabled'] ) || empty( $sms['notify_staff'] ) ) {
			return;
		}

		$numbers = array_filter( (array) ( $sms['staff_numbers'] ?? array() ) );
		if ( array() === $numbers ) {
			return;
		}

		$body = sprintf(
			/* translators: 1: form label, 2: submitter name, 3: submitter phone, 4: inquiry ID. */
			__( "NUEVA SOLICITUD — %1\$s\n%2\$s%3\$s\nRevisa el buzón en el panel (solicitud #%4\$d).", 'gramo-core' ),
			$label,
			$name,
			'' !== $phone ? "\n" . $phone : '',
			$inquiry_id
		);

		/**
		 * Filter the staff inquiry alert body before sending.
		 *
		 * @param string $body       Message body.
		 * @param string $label      Form label.
		 * @param int    $inquiry_id Inquiry post ID.
		 */
		$body = (string) apply_filters( 'gramo_inquiry_sms_message', $body, $label, $inquiry_id );

		$client = new TwilioClient();
		$from   = (string) ( $sms['twilio_from'] ?? '' );

		foreach ( $numbers as $to ) {
			$result = $client->send( (string) $to, $body );
			Logger::record(
				array(
					'direction'    => 'outbound',
					'order_id'     => 0,
					'recipient'    => (string) $to,
					'sender'       => $from,
					'body'         => $body,
					'status'       => $result['success'] ? 'sent' : 'failed',
					'provider_sid' => $result['sid'],
					'error'        => $result['error'],
				)
			);
		}
	}
}
