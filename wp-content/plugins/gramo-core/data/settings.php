<?php
/**
 * Seed content — site + business settings.
 *
 * Consumed by {@see \Gramo\Core\Setup\ContentSeeder::install_site_settings()}.
 * Keys mirror {@see \Gramo\Core\Setup\Options} defaults for the SITE and
 * BUSINESS groups; the seeder only installs a group when its option row is
 * absent, so client edits always survive re-seeding.
 *
 * EDITABLE PLACEHOLDERS (confirm with the client before launch):
 *  - business.email  — hola@gramo.cafe is a placeholder; no public address
 *    was verifiable.
 *  - business.phone  — the Gramo 3 (Casa Gaia) line, the only published one.
 *  - delivery_fee / delivery_free_over — working defaults for the local
 *    pay-on-delivery checkout, not confirmed rates.
 *  - announcement_* — seeded disabled; enable once wording is confirmed.
 *
 * @package Gramo\Core
 * @return array<string,array<string,mixed>>
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(

	'site'     => array(
		'nav_lines'            => 'Café | Coffee | /cafe/
Menú | Menu | /menu/
Ubicaciones | Locations | /ubicaciones/
Nosotros | About | /nosotros/
Journal | Journal | /journal/
Suscripciones | Subscriptions | /suscripciones/',
		'footer_lines'         => 'Mayoreo | Wholesale | /mayoreo/
Empleo | Careers | /empleo/
Contacto | Contact | /contacto/
Privacidad | Privacy | /privacidad/',
		'footer_note_es'       => 'Intervenimos espacios en donde hace falta buen café.',
		'footer_note_en'       => 'We take good coffee to the spaces that are missing it.',
		'announcement_enabled' => false,
		'announcement_es'      => 'Envío local en Cuernavaca — pago contra entrega',
		'announcement_en'      => 'Local delivery in Cuernavaca — pay on delivery',
		'announcement_url'     => '',
		'social_instagram'     => 'https://www.instagram.com/gramo.cafe/',
		'social_facebook'      => 'https://www.facebook.com/gramo.cafe/',
		'social_spotify'       => 'https://open.spotify.com/user/31opthafxgzocm3jhvpit5qeckuy',
		'social_linktree'      => 'https://linktr.ee/gramo.cafe',
		'whatsapp_community'   => 'https://chat.whatsapp.com/EiAo7v4ISQv7UrM1pRcR2M',
		// Editable placeholders: confirm real local-delivery pricing.
		'delivery_fee'         => 50,
		'delivery_free_over'   => 600,
	),

	'business' => array(
		'name'             => 'Gramo Café',
		'tagline'          => 'Intervenimos espacios en donde hace falta buen café',
		// Gramo 3 (Casa Gaia) line — the only published phone number.
		'phone'            => '+52 777 238 2946',
		'phone_link'       => '+527772382946',
		'whatsapp'         => 'https://chat.whatsapp.com/EiAo7v4ISQv7UrM1pRcR2M',
		// Editable placeholder — no public email address was verifiable.
		'email'            => 'hola@gramo.cafe',
		// Address of Gramo 1 (Jardín Gramo), the original house.
		'address'          => 'C. Alicia 513, Zona 1, Jardines las Delicias, 62296 Cuernavaca, Mor.',
		'address_short'    => 'C. Alicia 513, Cuernavaca',
		'street'           => 'C. Alicia 513, Zona 1',
		'locality'         => 'Cuernavaca',
		'region'           => 'Morelos',
		'postal_code'      => '62296',
		'country'          => 'MX',
		'hours_summary'    => '',
		'hours_closed'     => '',
		'instagram'        => 'https://www.instagram.com/gramo.cafe/',
		'instagram_handle' => '@gramo.cafe',
		'maps_url'         => 'https://maps.app.goo.gl/1nmHJQJxJtV515z17',
		'latitude'         => '',
		'longitude'        => '',
	),

);
