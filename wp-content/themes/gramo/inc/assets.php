<?php
/**
 * Front-end & editor asset loading.
 *
 * @package Gramo
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Cache-busting version: file mtime in debug, theme version in production.
 */
function gramo_asset_version( string $relative_path ): string {
	$file = GRAMO_THEME_DIR . '/' . ltrim( $relative_path, '/' );
	if ( ( defined( 'WP_DEBUG' ) && WP_DEBUG ) && file_exists( $file ) ) {
		return (string) filemtime( $file );
	}
	return GRAMO_THEME_VERSION;
}

/**
 * Enqueue front-end styles and the tiny progressive-enhancement script.
 */
function gramo_enqueue_assets(): void {
	wp_enqueue_style(
		'gramo-theme',
		GRAMO_THEME_URI . '/assets/css/theme.css',
		array(),
		gramo_asset_version( 'assets/css/theme.css' )
	);

	if ( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() || is_account_page() ) ) {
		wp_enqueue_style(
			'gramo-woo',
			GRAMO_THEME_URI . '/assets/css/woocommerce.css',
			array( 'gramo-theme' ),
			gramo_asset_version( 'assets/css/woocommerce.css' )
		);
	}

	// Deferred, dependency-free enhancement module (scroll reveal, header state).
	wp_enqueue_script(
		'gramo-enhance',
		GRAMO_THEME_URI . '/assets/js/enhance.js',
		array(),
		gramo_asset_version( 'assets/js/enhance.js' ),
		array(
			'strategy'  => 'defer',
			'in_footer' => true,
		)
	);
}
add_action( 'wp_enqueue_scripts', 'gramo_enqueue_assets' );

/**
 * Editor-only styles so the block editor mirrors the front end.
 */
function gramo_enqueue_editor_assets(): void {
	wp_enqueue_style(
		'gramo-editor',
		GRAMO_THEME_URI . '/assets/css/editor.css',
		array(),
		gramo_asset_version( 'assets/css/editor.css' )
	);
}
add_action( 'enqueue_block_assets', 'gramo_enqueue_editor_assets' );

/**
 * Preload the display font to avoid FOUT on the hero headline.
 *
 * Only the Roman face is preloaded: it renders the above-the-fold h1, while the
 * italic face is first needed further down (quotes, pullquotes) and would
 * otherwise compete with the hero image for bandwidth. Body copy uses the
 * system stack, so there is nothing else to preload.
 */
function gramo_preload_fonts(): void {
	$fonts = array(
		'/assets/fonts/BodoniModa-Roman.woff2',
	);
	foreach ( $fonts as $font ) {
		if ( file_exists( GRAMO_THEME_DIR . $font ) ) {
			printf(
				'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
				esc_url( GRAMO_THEME_URI . $font )
			);
		}
	}
}
add_action( 'wp_head', 'gramo_preload_fonts', 1 );
