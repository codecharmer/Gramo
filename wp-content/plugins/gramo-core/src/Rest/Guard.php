<?php
/**
 * Shared anti-abuse guard for the public gramo/v1 endpoints.
 *
 * Three cheap, layered checks that stop the bulk of drive-by spam without
 * adding friction for real customers:
 *
 *   1. Honeypot — a hidden field (`_gramo_hp`) humans never fill.
 *   2. Minimum fill time — the form ships a render timestamp (`_gramo_t`);
 *      submissions completed in under three seconds are bots.
 *   3. Per-IP rate limit — a rolling transient window per endpoint action.
 *
 * All three respond with generic errors so bots learn nothing.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Rest;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Guard {

	/** Minimum seconds a human plausibly needs to fill a form. */
	private const MIN_FILL_SECONDS = 3;

	/** Submissions allowed per IP per window. */
	private const RATE_LIMIT = 5;

	/** Rolling window (seconds). */
	private const RATE_WINDOW = 3600;

	/**
	 * Run all checks; null when the request may proceed.
	 *
	 * @param array<string,mixed> $body   Decoded JSON body.
	 * @param string              $action Endpoint key for the rate bucket.
	 */
	public static function check( array $body, string $action ): ?\WP_Error {
		// 1. Honeypot.
		if ( '' !== trim( (string) ( $body['_gramo_hp'] ?? '' ) ) ) {
			return new \WP_Error( 'gramo_rejected', __( 'No se pudo procesar la solicitud.', 'gramo-core' ), array( 'status' => 400 ) );
		}

		// 2. Minimum fill time.
		$rendered = (int) ( $body['_gramo_t'] ?? 0 );
		if ( $rendered <= 0 || ( time() - $rendered ) < self::MIN_FILL_SECONDS ) {
			return new \WP_Error( 'gramo_rejected', __( 'No se pudo procesar la solicitud.', 'gramo-core' ), array( 'status' => 400 ) );
		}

		// 3. Per-IP rate limit.
		$key   = 'gramo_rl_' . $action . '_' . self::ip_hash();
		$count = (int) get_transient( $key );
		if ( $count >= self::RATE_LIMIT ) {
			return new \WP_Error( 'gramo_rate_limited', __( 'Demasiadas solicitudes. Inténtalo más tarde.', 'gramo-core' ), array( 'status' => 429 ) );
		}
		set_transient( $key, $count + 1, self::RATE_WINDOW );

		return null;
	}

	/**
	 * A short stable hash of the client IP (never stored raw).
	 */
	public static function ip_hash(): string {
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
		return substr( hash( 'sha256', $ip . wp_salt( 'nonce' ) ), 0, 16 );
	}
}
