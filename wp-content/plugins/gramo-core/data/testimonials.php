<?php
/**
 * Seed content — Testimonios (gramo_testimonial).
 *
 * SAMPLE ENTRIES ONLY. We never attribute quotes to invented people: these
 * three placeholders paraphrase recurring themes from public reviews (coffee
 * quality, the spaces, the service) and are clearly labelled for replacement.
 * Swap each one for a real, attributed review before launch.
 *
 * Consumed by {@see \Gramo\Core\Setup\ContentSeeder::install_cpt()}.
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
		'title'  => 'Testimonio de ejemplo 1',
		'slug'   => 'testimonio-de-ejemplo-1',
		'order'  => 1,
		'fields' => array(
			'quote'          => 'El café siempre está bien tratado: tueste reciente, barra cuidada y recomendaciones honestas.',
			'quote_en'       => 'The coffee is always treated with care: fresh roasts, a well-kept bar, and honest recommendations.',
			'attribution'    => 'Ejemplo — reemplazar con reseñas reales',
			'attribution_en' => 'Sample — replace with real reviews',
		),
	),

	array(
		'title'  => 'Testimonio de ejemplo 2',
		'slug'   => 'testimonio-de-ejemplo-2',
		'order'  => 2,
		'fields' => array(
			'quote'          => 'Cada sucursal se siente distinta y, aun así, todas se sienten Gramo: espacios bonitos donde dan ganas de quedarse.',
			'quote_en'       => 'Every branch feels different, and yet they all feel like Gramo: beautiful spaces that make you want to linger.',
			'attribution'    => 'Ejemplo — reemplazar con reseñas reales',
			'attribution_en' => 'Sample — replace with real reviews',
		),
	),

	array(
		'title'  => 'Testimonio de ejemplo 3',
		'slug'   => 'testimonio-de-ejemplo-3',
		'order'  => 3,
		'fields' => array(
			'quote'          => 'Te atienden con calma y con gusto; se nota que al equipo le importa lo que sirve.',
			'quote_en'       => 'You are looked after calmly and gladly; you can tell the team cares about what they serve.',
			'attribution'    => 'Ejemplo — reemplazar con reseñas reales',
			'attribution_en' => 'Sample — replace with real reviews',
		),
	),

);
