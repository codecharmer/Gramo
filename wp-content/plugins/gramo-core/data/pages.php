<?php
/**
 * Seed pages.
 *
 * STARTER STUB. Replace with the brand's real pages. Consumed by
 * {@see \Gramo\Core\Setup\Installer::install_pages()}. `content` is block markup
 * (or plain HTML); `template` maps to a theme template slug
 * (e.g. 'page-no-title', 'page-wide') or '' for the default. Exactly one page
 * should set 'is_front' => true.
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
		'title'            => 'Inicio',
		'slug'             => 'inicio',
		'template'         => '',
		'status'           => 'publish',
		'is_front'         => true,
		'content'          => '',   // front-page.html composes patterns; leave empty or add blocks
		'seo_short'        => '',
		'meta_description' => '',
	),

	array(
		'title'            => 'Contacto',
		'slug'             => 'contacto',
		'template'         => '',
		'status'           => 'publish',
		'is_front'         => false,
		'content'          => '<!-- wp:paragraph --><p>Contenido de la página.</p><!-- /wp:paragraph -->',
		'seo_short'        => '',
		'meta_description' => '',
	),

);
