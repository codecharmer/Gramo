<?php
/**
 * Seed navigation menus (legacy wp_navigation seeding).
 *
 * Minimal, coherent IA matching the seeded Spanish pages. The headless
 * frontend builds its own navigation from the `nav_lines` / `footer_lines`
 * site settings (see data/settings.php); this file only keeps the WordPress
 * admin-side navigation posts sensible. Items referencing a page slug are
 * skipped silently until that page exists.
 *
 * Consumed by {@see \Gramo\Core\Setup\Installer::install_navigation()}.
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
			'label' => 'Café',
			'slug'  => 'cafe',
		),
		array(
			'label' => 'Menú',
			'slug'  => 'menu',
		),
		array(
			'label' => 'Ubicaciones',
			'slug'  => 'ubicaciones',
		),
		array(
			'label' => 'Nosotros',
			'slug'  => 'nosotros',
		),
		array(
			'label' => 'Suscripciones',
			'slug'  => 'suscripciones',
		),
	),
	'footer'  => array(
		array(
			'label' => 'Mayoreo',
			'slug'  => 'mayoreo',
		),
		array(
			'label' => 'Empleo',
			'slug'  => 'empleo',
		),
		array(
			'label' => 'Contacto',
			'slug'  => 'contacto',
		),
		array(
			'label' => 'Privacidad',
			'slug'  => 'privacidad',
		),
	),
);
