<?php
/**
 * Theme setup: supports, image sizes, nav, i18n.
 *
 * @package Gramo
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register theme supports. Block themes get most defaults from theme.json;
 * this covers the runtime supports theme.json cannot express.
 */
function gramo_setup(): void {
	load_theme_textdomain( 'gramo', GRAMO_THEME_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 96,
			'width'       => 320,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	// Editor stylesheet so the canvas matches the front end.
	add_editor_style( array( 'assets/css/theme.css', 'assets/css/editor.css' ) );

	// Purposeful, art-directed crops for the cafe imagery pipeline.
	add_image_size( 'gramo-hero', 2000, 1200, true );
	add_image_size( 'gramo-card', 800, 800, true );      // square product/pattern cards
	add_image_size( 'gramo-card-tall', 800, 1040, true ); // 3:4 editorial
	add_image_size( 'gramo-wide', 1600, 900, true );      // 16:9 feature strips
	add_image_size( 'gramo-thumb', 300, 300, true );
}
add_action( 'after_setup_theme', 'gramo_setup' );

/**
 * Human-readable labels for the custom image sizes in the media UI.
 *
 * @param array<string,string> $sizes Registered sizes.
 * @return array<string,string>
 */
function gramo_image_size_names( array $sizes ): array {
	return array_merge(
		$sizes,
		array(
			'gramo-hero'      => __( 'Gramo — Hero', 'gramo' ),
			'gramo-card'      => __( 'Gramo — Card (1:1)', 'gramo' ),
			'gramo-card-tall' => __( 'Gramo — Card (3:4)', 'gramo' ),
			'gramo-wide'      => __( 'Gramo — Wide (16:9)', 'gramo' ),
		)
	);
}
add_filter( 'image_size_names_choose', 'gramo_image_size_names' );

/**
 * Add a modest set of body classes used by runtime CSS hooks.
 *
 * @param string[] $classes Body classes.
 * @return string[]
 */
function gramo_body_classes( array $classes ): array {
	if ( is_front_page() ) {
		$classes[] = 'is-front-page';
	}
	if ( function_exists( 'is_woocommerce' ) && ( is_woocommerce() || is_cart() || is_checkout() ) ) {
		$classes[] = 'is-commerce';
	}
	return $classes;
}
add_filter( 'body_class', 'gramo_body_classes' );

/**
 * Ship a small, safe set of preconnect hints (self-hosted fonts, so none external).
 * Kept as a hook point for the client if a CDN is later added.
 *
 * @param array<int,array<string,mixed>|string> $hints Resource hints.
 * @param string                                $relation Relation type.
 * @return array<int,array<string,mixed>|string>
 */
function gramo_resource_hints( array $hints, string $relation ): array { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed -- Filter signature; $relation is for future CDN hints.
	return $hints;
}
add_filter( 'wp_resource_hints', 'gramo_resource_hints', 10, 2 );
