<?php
/**
 * Surface reduction for the headless backend.
 *
 * The public face of the site is the static frontend; WordPress only needs to
 * serve wp-admin, GraphQL (build-time), and the gramo/v1 endpoints. Everything
 * else is switched off:
 *
 *   - XML-RPC disabled.
 *   - Anonymous REST user enumeration (/wp/v2/users) blocked.
 *   - Core sitemaps and feeds disabled (the frontend owns sitemap/robots).
 *   - Generator/meta cruft removed from what little HTML WP still emits.
 *   - WPGraphQL production posture enforced in code: introspection and debug
 *     off, query-depth limited — regardless of what the settings page says —
 *     whenever WP_ENVIRONMENT_TYPE is 'production'.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Headless;

use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Hardening implements Bootable {

	public function boot(): void {
		add_filter( 'xmlrpc_enabled', '__return_false' );
		add_filter( 'wp_sitemaps_enabled', '__return_false' );
		add_filter( 'rest_endpoints', array( $this, 'block_user_enumeration' ) );

		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'feed_links', 2 );
		remove_action( 'wp_head', 'feed_links_extra', 3 );

		add_action( 'do_feed', array( $this, 'disable_feed' ), 1 );
		add_action( 'do_feed_rss2', array( $this, 'disable_feed' ), 1 );
		add_action( 'do_feed_atom', array( $this, 'disable_feed' ), 1 );

		if ( 'production' === wp_get_environment_type() ) {
			add_filter( 'graphql_get_setting_section_field_value', array( $this, 'force_graphql_production_settings' ), 10, 3 );
		}
	}

	/**
	 * Remove the users endpoints for anonymous requests.
	 *
	 * @param array<string,mixed> $endpoints Registered REST endpoints.
	 * @return array<string,mixed>
	 */
	public function block_user_enumeration( array $endpoints ): array {
		if ( is_user_logged_in() ) {
			return $endpoints;
		}
		unset( $endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
		return $endpoints;
	}

	public function disable_feed(): void {
		wp_safe_redirect( Cors::frontend_url() . '/', 301 );
		exit;
	}

	/**
	 * Force WPGraphQL's hardening settings in production.
	 *
	 * @param mixed  $value      Stored setting value.
	 * @param mixed  $default_value Default.
	 * @param string $field_name Setting key.
	 */
	public function force_graphql_production_settings( mixed $value, mixed $default_value, string $field_name ): mixed {
		switch ( $field_name ) {
			case 'public_introspection_enabled':
			case 'graphiql_enabled':
			case 'debug_mode_enabled':
			case 'tracing_enabled':
			case 'batch_queries_enabled':
				return 'off';
			case 'query_depth_enabled':
				return 'on';
			case 'query_depth_max':
				return 10;
			default:
				return $value;
		}
	}
}
