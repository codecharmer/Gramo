<?php
/**
 * Headless front-end redirects.
 *
 * The WordPress install serves editors and APIs only; every public HTML
 * request 301s to the static frontend with a mapped path so old links and
 * accidental visits land somewhere sensible:
 *
 *   - journal posts        → /journal/{slug} (EN posts → /en/journal/{slug})
 *   - pages                → /{slug} (EN pages → /en/{slug}; front page → /)
 *   - products (coffee)    → /cafe/{slug}
 *   - locations            → /ubicaciones/{slug}
 *   - everything else      → /
 *
 * REST, GraphQL, admin, login, cron, and WooCommerce AJAX never reach
 * template_redirect, so only genuine front-end page views are affected.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Headless;

use Gramo\Core\Contracts\Bootable;
use Gramo\Core\I18n\Translations;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Redirects implements Bootable {

	public function boot(): void {
		add_action( 'template_redirect', array( $this, 'redirect_to_frontend' ), 1 );
	}

	public function redirect_to_frontend(): void {
		if ( is_admin() || is_user_logged_in() ) {
			return; // Editors may need previews and admin-bar navigation.
		}
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return;
		}
		if ( isset( $_GET['wc-ajax'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- routing guard only.
			return;
		}

		$target = self::frontend_path();
		wp_safe_redirect( Cors::frontend_url() . $target, 301 );
		exit;
	}

	/**
	 * Map the current queried object to a frontend path.
	 */
	private static function frontend_path(): string {
		$object = get_queried_object();

		if ( $object instanceof \WP_Post ) {
			$slug   = $object->post_name;
			$locale = Translations::locale_of( $object->ID );
			$en     = 'en' === $locale ? '/en' : '';

			switch ( $object->post_type ) {
				case 'post':
					return $en . '/journal/' . $slug . '/';
				case 'page':
					if ( (int) get_option( 'page_on_front' ) === $object->ID ) {
						return 'en' === $locale ? '/en/' : '/';
					}
					return $en . '/' . $slug . '/';
				case 'product':
					return '/cafe/' . $slug . '/';
				case 'gramo_location':
					return '/ubicaciones/' . $slug . '/';
				default:
					return '/';
			}
		}

		return '/';
	}
}
