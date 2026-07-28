<?php
/**
 * Seed navigation menus.
 *
 * STARTER STUB. Consumed by {@see \Gramo\Core\Setup\Installer::install_navigation()}.
 * Each item is a label + a page/term slug (custom URLs are also supported by the
 * installer). Replace with the brand's real IA.
 *
 * @package Gramo\Core
 * @return array<string,array<int,array<string,string>>>
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'primary' => array(
		array(
			'label' => 'Inicio',
			'slug'  => 'inicio',
		),
		array(
			'label' => 'Menú',
			'slug'  => 'menu',
		),
		array(
			'label' => 'Contacto',
			'slug'  => 'contacto',
		),
	),
	'footer'  => array(
		array(
			'label' => 'Contacto',
			'slug'  => 'contacto',
		),
	),
);
