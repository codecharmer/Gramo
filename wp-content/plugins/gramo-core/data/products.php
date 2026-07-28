<?php
/**
 * Seed catalogue — WooCommerce products.
 *
 * STARTER STUB. Replace the single example below with the brand's real
 * catalogue. Returns an ordered array of product definitions consumed by
 * {@see \Gramo\Core\Setup\Installer::install_products()}.
 *
 * Rules learned the hard way (see docs/METHODOLOGY.md §8):
 *  - This is the source of truth. Do NOT reorganise products only in the DB, or
 *    a fresh deploy ships the wrong catalogue.
 *  - `category` must be a slug declared in Installer::CATEGORIES.
 *  - Real prices → 'price_is_estimate' => false (no "revisar precio" nag).
 *  - `image_key` resolves to data/media/source/{image_key}.{jpg,png,webp}; if no
 *    file exists a branded SVG placeholder is generated, so every product has an
 *    image either way.
 *
 * @package Gramo\Core
 * @return array<int,array<string,mixed>>
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(

	array(
		'name'              => 'Example Product',
		'slug'              => 'example-product',
		'category'          => 'pan-rustico',            // must exist in Installer::CATEGORIES
		'regular_price'     => 50.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-0001',
		'short_description' => 'One-line description shown in grids and cards.',
		'description'       => "Full product description (supports \\n\\n paragraphs).",
		'tags'              => array( 'example', 'tag' ),
		'attributes'        => array(
			// The four visible yes/no flags Installer::build_attributes() renders.
			// Rename the keys+labels there to fit the brand.
			'masa-madre'   => 'yes',
			'vegano'       => 'no',
			'sin-nueces'   => 'yes',
			'de-temporada' => 'no',
		),
		'stock'             => 20,
		'manage_stock'      => true,
		'image_key'         => 'example-product',        // → data/media/source/example-product.jpg
		'image_alt'         => 'Alt text for the product photo.',
		'seo_short'         => 'Short SEO summary (~155 chars).',
		'meta_description'  => 'Meta description for search engines (~155 chars).',
	),

);
