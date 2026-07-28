<?php
/**
 * Block binding source: gramo/business.
 *
 * Lets any bindable block (paragraph, heading, button, image) surface live
 * business data — address, hours, phone, social — without hardcoding it in
 * templates or patterns. The data is owned by the gramo-core plugin
 * (option `gramo_business_info`); the theme reads it defensively with
 * sensible fallbacks so patterns still render before the plugin seeds data.
 *
 * Usage in block markup:
 *   <!-- wp:paragraph {"metadata":{"bindings":{"content":{
 *     "source":"gramo/business","args":{"key":"address"}}}}} -->
 *
 * @package Gramo
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default business info. The plugin overrides these via the option; kept here so
 * the theme is never blank if the plugin is briefly inactive during setup.
 *
 * @return array<string,string>
 */
function gramo_business_defaults(): array {
	// STARTER: these are only a fallback for when the plugin option is briefly
	// empty. The real values live in Options (gramo_business_info). Keep in sync.
	return array(
		'name'             => 'Gramo',
		'tagline'          => '',
		'phone'            => '',
		'phone_link'       => '',
		'whatsapp'         => '',
		'email'            => 'hola@example.com',
		'address'          => '',
		'address_short'    => '',
		'street'           => '',
		'locality'         => '',
		'region'           => '',
		'postal_code'      => '',
		'country'          => 'MX',
		'hours_summary'    => '',
		'hours_closed'     => '',
		'instagram'        => '',
		'instagram_handle' => '',
		'maps_url'         => '',
		'latitude'         => '',
		'longitude'        => '',
	);
}

/**
 * Resolve a single business-info value.
 */
function gramo_business_value( string $key ): string {
	$stored = get_option( 'gramo_business_info', array() );
	$stored = is_array( $stored ) ? $stored : array();
	$data   = array_merge( gramo_business_defaults(), array_filter( $stored, 'is_scalar' ) );
	$value  = $data[ $key ] ?? '';
	return (string) $value;
}

/**
 * Register the binding source.
 */
function gramo_register_business_binding(): void {
	if ( ! function_exists( 'register_block_bindings_source' ) ) {
		return; // WordPress < 6.5.
	}

	register_block_bindings_source(
		'gramo/business',
		array(
			'label'              => __( 'Gramo — Datos del negocio', 'gramo' ),
			'get_value_callback' => static function ( array $source_args ): string {
				$key = isset( $source_args['key'] ) ? sanitize_key( (string) $source_args['key'] ) : '';
				if ( '' === $key ) {
					return '';
				}
				return gramo_business_value( $key );
			},
			'uses_context'       => array(),
		)
	);
}
add_action( 'init', 'gramo_register_business_binding' );
