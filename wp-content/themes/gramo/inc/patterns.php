<?php
/**
 * Block pattern categories.
 *
 * Patterns themselves are auto-registered from /patterns/*.php by WordPress.
 * Here we only declare the categories they slot into.
 *
 * @package Gramo
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Gramo pattern categories.
 */
function gramo_register_pattern_categories(): void {
	$categories = array(
		'gramo-hero'     => __( 'Gramo — Portadas', 'gramo' ),
		'gramo-page'     => __( 'Gramo — Secciones de página', 'gramo' ),
		'gramo-commerce' => __( 'Gramo — Tienda', 'gramo' ),
		'gramo-cta'      => __( 'Gramo — Llamados a la acción', 'gramo' ),
		'gramo-parts'    => __( 'Gramo — Encabezado y pie', 'gramo' ),
	);

	foreach ( $categories as $slug => $label ) {
		register_block_pattern_category( $slug, array( 'label' => $label ) );
	}
}
add_action( 'init', 'gramo_register_pattern_categories' );
