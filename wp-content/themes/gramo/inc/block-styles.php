<?php
/**
 * Custom block styles & pattern-friendly variations.
 *
 * @package Gramo
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register named block styles used across patterns. CSS for each lives in
 * assets/css/theme.css keyed by the generated `is-style-{name}` class.
 */
function gramo_register_block_styles(): void {
	$styles = array(
		'core/button'    => array(
			array(
				'name'  => 'ghost',
				'label' => __( 'Contorno', 'gramo' ),
			),
			array(
				'name'  => 'ink',
				'label' => __( 'Tinta', 'gramo' ),
			),
			array(
				'name'  => 'link-underline',
				'label' => __( 'Enlace subrayado', 'gramo' ),
			),
		),
		'core/image'     => array(
			array(
				'name'  => 'framed',
				'label' => __( 'Enmarcada', 'gramo' ),
			),
			array(
				'name'  => 'arch',
				'label' => __( 'Arco', 'gramo' ),
			),
			array(
				'name'  => 'duotone-rosa',
				'label' => __( 'Duotono rosa', 'gramo' ),
			),
		),
		'core/group'     => array(
			array(
				'name'  => 'card',
				'label' => __( 'Tarjeta', 'gramo' ),
			),
			array(
				'name'  => 'paper',
				'label' => __( 'Papel', 'gramo' ),
			),
			array(
				'name'  => 'hairline',
				'label' => __( 'Filete', 'gramo' ),
			),
		),
		'core/heading'   => array(
			array(
				'name'  => 'eyebrow',
				'label' => __( 'Antetítulo', 'gramo' ),
			),
			array(
				'name'  => 'script-accent',
				'label' => __( 'Acento cursiva', 'gramo' ),
			),
		),
		'core/list'      => array(
			array(
				'name'  => 'fleuron-marker',
				'label' => __( 'Viñeta florón', 'gramo' ),
			),
			array(
				'name'  => 'checkmarks',
				'label' => __( 'Palomitas', 'gramo' ),
			),
		),
		'core/separator' => array(
			array(
				'name'  => 'fleuron',
				'label' => __( 'Florón', 'gramo' ),
			),
		),
		'core/quote'     => array(
			array(
				'name'  => 'testimonial',
				'label' => __( 'Testimonio', 'gramo' ),
			),
		),
	);

	foreach ( $styles as $block => $variations ) {
		foreach ( $variations as $variation ) {
			register_block_style( $block, $variation );
		}
	}
}
add_action( 'init', 'gramo_register_block_styles' );
