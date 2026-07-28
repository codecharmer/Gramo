<?php
/**
 * Seed content — Equipo (gramo_team).
 *
 * The two founders, from the brand's public story only. Sara's surname is not
 * public, so she appears — as the brand itself presents her — simply as Sara.
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
		'title'  => 'Salo Askenazi',
		'slug'   => 'salo-askenazi',
		'order'  => 1,
		'fields' => array(
			'role'    => 'Fundador — Dirección creativa',
			'role_en' => 'Founder — Creative direction',
			'bio'     => 'Salo llegó al café desde el cine. Cuando la pandemia detuvo los rodajes, montó junto a Sara una barra de café en un garaje de Cuernavaca, y esa barra terminó siendo el origen de Gramo. Su oficio anterior sigue presente en la manera de trabajar de la casa: cada ubicación se piensa como una película, con su set, su utilería y su soundtrack.',
			'bio_en'  => 'Salo came to coffee from film. When the pandemic halted shoots, he and Sara set up a coffee bar in a Cuernavaca garage — the bar that became the origin of Gramo. His previous craft still shapes how the house works: every location is conceived like a film, with its own set, props and soundtrack.',
		),
	),

	array(
		'title'  => 'Sara',
		'slug'   => 'sara',
		'order'  => 2,
		'fields' => array(
			'role'    => 'Fundadora — Diseño',
			'role_en' => 'Founder — Design',
			'bio'     => 'Sara viene del diseño gráfico, y se nota: la identidad de Gramo pasa por sus manos. Fundó la casa junto a Salo en plena pandemia, desde un garaje en Cuernavaca, con una idea sencilla y ambiciosa a la vez: construir una cultura de café con identidad propia.',
			'bio_en'  => 'Sara comes from graphic design, and it shows: Gramo\'s identity passes through her hands. She founded the house with Salo at the height of the pandemic, out of a Cuernavaca garage, with an idea both simple and ambitious: to build a coffee culture with an identity of its own.',
		),
	),

);
