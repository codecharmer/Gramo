<?php
/**
 * Pattern: Menú.
 *
 * Estructura: hero compacto + tres secciones del menú (café, té, pastelería).
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'   => __( 'Menú', 'gramo-core' ),
	'content' => '<!-- wp:gramo/hero {"eyebrow":"La barra","heading":"Lo que servimos hoy","height":"compact"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"cafe","headingOverride":"Café"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"te","headingOverride":"Té"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"pasteleria","headingOverride":"Pastelería"} /-->',
);
