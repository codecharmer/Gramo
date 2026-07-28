<?php
/**
 * Seed content — Eventos (gramo_event).
 *
 * The one verified recurring event: jazz nights at Gramo 3 (Casa Gaia).
 * No date is seeded — the series is recurring and specific dates are not
 * public, so editors add them per session. `location_id` is likewise left
 * unset and linked to the Casa Gaia location after seeding.
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
		'title'  => 'Noches de jazz en Gramo 3',
		'slug'   => 'noches-de-jazz-en-gramo-3',
		'fields' => array(
			'title_en'        => 'Jazz Nights at Gramo 3',
			'description'     => 'Algunas noches, la barra de Gramo 3 — dentro del Museo Casa Gaia, en el centro de Cuernavaca — cambia de registro: vino en la copa y jazz en vivo entre las salas. El cupo es limitado; reserva tu lugar con el formulario.',
			'description_en'  => 'Some nights, the bar at Gramo 3 — inside Museo Casa Gaia, in central Cuernavaca — changes register: wine in the glass and live jazz among the galleries. Seats are limited; reserve yours through the form.',
			'reservation_url' => 'https://forms.gle/qkTiEMPoLefiL41q8',
		),
	),

);
