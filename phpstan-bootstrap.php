<?php
/**
 * PHPStan bootstrap — runtime symbols the vendored stubs do not declare.
 *
 * php-stubs/wordpress-stubs only mentions the WordPress time/format constants
 * inside docblocks (they are defined procedurally by wp_initial_constants()),
 * and WP-CLI is not a dev dependency, so both are declared here for static
 * analysis only. GRAMO_CORE_DIR is defined at runtime in gramo-core.php with
 * a dynamic value (plugin_dir_path()) that PHPStan cannot resolve from
 * scanFiles. This file is never loaded by WordPress.
 *
 * @package Gramo
 */

declare( strict_types=1 );

if ( ! defined( 'MINUTE_IN_SECONDS' ) ) {
	define( 'MINUTE_IN_SECONDS', 60 );
}
if ( ! defined( 'HOUR_IN_SECONDS' ) ) {
	define( 'HOUR_IN_SECONDS', 3600 );
}
if ( ! defined( 'DAY_IN_SECONDS' ) ) {
	define( 'DAY_IN_SECONDS', 86400 );
}
if ( ! defined( 'ARRAY_A' ) ) {
	define( 'ARRAY_A', 'ARRAY_A' );
}
if ( ! defined( 'OBJECT' ) ) {
	define( 'OBJECT', 'OBJECT' );
}
if ( ! defined( 'GRAMO_CORE_DIR' ) ) {
	define( 'GRAMO_CORE_DIR', __DIR__ . '/wp-content/plugins/gramo-core/' );
}

if ( ! function_exists( 'register_graphql_object_type' ) ) {
	/**
	 * WPGraphQL type registration (plugin is not a composer dev dependency).
	 *
	 * @param array<string,mixed> $config
	 */
	function register_graphql_object_type( string $type_name, array $config ): void {}
}

if ( ! function_exists( 'register_graphql_field' ) ) {
	/**
	 * WPGraphQL field registration.
	 *
	 * @param array<string,mixed> $config
	 */
	function register_graphql_field( string $type_name, string $field_name, array $config ): void {}
}

if ( ! class_exists( 'WP_CLI' ) ) {
	/**
	 * Minimal WP-CLI surface used by Gramo\Core\Cli\Commands.
	 */
	class WP_CLI {
		/**
		 * @param string                       $name
		 * @param callable|class-string|object $callable
		 * @param array<string,mixed>          $args
		 */
		public static function add_command( $name, $callable, $args = array() ): bool {
			return true;
		}

		public static function line( string $message = '' ): void {}

		public static function log( string $message ): void {}

		public static function success( string $message ): void {}

		public static function warning( string $message ): void {}

		/**
		 * @param string|\WP_Error $message
		 * @param bool|int         $exit
		 */
		public static function error( $message, $exit = true ): void {}
	}
}
