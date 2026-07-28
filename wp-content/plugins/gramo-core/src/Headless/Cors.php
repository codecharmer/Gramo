<?php
/**
 * CORS for the public gramo/v1 endpoints.
 *
 * The static frontend (gramo.cafe) posts orders and inquiries directly to the
 * WordPress backend (cms.gramo.cafe), so those REST routes — and only those —
 * answer cross-origin requests from the frontend origin. GraphQL is build-time
 * only and deliberately gets no CORS headers.
 *
 * The frontend origin comes from the GRAMO_FRONTEND_URL constant (production)
 * with a sane default; local development origins are always allowed when
 * WP_ENVIRONMENT_TYPE is 'local'.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Headless;

use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Cors implements Bootable {

	public function boot(): void {
		add_filter( 'rest_pre_serve_request', array( $this, 'add_headers' ), 10, 4 );
	}

	/**
	 * The canonical frontend origin (no trailing slash).
	 */
	public static function frontend_url(): string {
		if ( defined( 'GRAMO_FRONTEND_URL' ) && '' !== (string) GRAMO_FRONTEND_URL ) {
			return untrailingslashit( (string) GRAMO_FRONTEND_URL );
		}
		return 'https://gramo.cafe';
	}

	/**
	 * Attach CORS headers to gramo/v1 responses (and answer preflights).
	 *
	 * @param bool             $served  Whether the request has already been served.
	 * @param mixed            $result  Response object.
	 * @param \WP_REST_Request $request Request.
	 * @param \WP_REST_Server  $server  Server.
	 */
	public function add_headers( bool $served, mixed $result, \WP_REST_Request $request, \WP_REST_Server $server ): bool {
		$route = $request->get_route();
		if ( ! str_starts_with( $route, '/gramo/v1/' ) ) {
			return $served;
		}

		$origin  = (string) get_http_origin();
		$allowed = array( self::frontend_url() );

		if ( 'local' === wp_get_environment_type() ) {
			$allowed[] = 'http://localhost:8000';
			$allowed[] = 'http://localhost:9000';
		}

		if ( ! in_array( $origin, $allowed, true ) ) {
			return $served;
		}

		$server->send_header( 'Access-Control-Allow-Origin', $origin );
		$server->send_header( 'Access-Control-Allow-Methods', 'POST, OPTIONS' );
		$server->send_header( 'Access-Control-Allow-Headers', 'Content-Type' );
		$server->send_header( 'Access-Control-Max-Age', '600' );
		$server->send_header( 'Vary', 'Origin' );

		return $served;
	}
}
