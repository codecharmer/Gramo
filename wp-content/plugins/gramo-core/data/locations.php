<?php
/**
 * Seed content — Ubicaciones (gramo_location).
 *
 * The eight real Gramo cafés, Cuernavaca and CDMX, consumed by
 * {@see \Gramo\Core\Setup\ContentSeeder::install_cpt()}. Field keys follow
 * {@see \Gramo\Core\Content\Schema::fields('gramo_location')}; a `_en` suffix
 * targets the English sibling of a bilingual field.
 *
 * Data policy: addresses, coordinates and opening hours come from verified
 * research only. Where hours or coordinates could not be confirmed the field
 * is intentionally left out — never guessed. Editors complete them in
 * Ubicaciones as branches confirm their schedules.
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
		'title'  => 'Jardín Gramo',
		'slug'   => 'jardin-gramo',
		'order'  => 1,
		'fields' => array(
			'short_name'            => 'Gramo 1',
			'address'               => 'C. Alicia 513, Zona 1',
			'neighborhood'          => 'Jardines las Delicias',
			'city'                  => 'cuernavaca',
			'postal_code'           => '62296',
			'maps_url'              => 'https://maps.app.goo.gl/1nmHJQJxJtV515z17',
			'amenities'             => array(
				array(
					'label_es' => 'Jardín',
					'label_en' => 'Garden',
				),
			),
			'description'           => 'El primer Gramo, hoy en versión jardín. La historia empezó muy cerca de aquí, en una barra sobre Tulipán 302, junto a Pacífica Panadería; con el tiempo, aquel primer café se mudó a esta casa entre plantas en Jardines las Delicias. Sigue siendo el mismo lugar de siempre: café bien hecho, sombra y ninguna prisa.',
			'description_en'        => 'The first Gramo, now in garden form. The story began just around the corner, at a bar on Tulipán 302 next to Pacífica Panadería; in time, that original café moved into this leafy house in Jardines las Delicias. It remains what it always was: good coffee, shade, and no hurry at all.',
			'neighborhood_guide'    => 'Jardines las Delicias es un barrio residencial y tranquilo de Cuernavaca, de calles que se caminan bien. A unos pasos está Pacífica Panadería, nuestra panadería hermana en Tulipán 302, donde nació la primera barra de Gramo — vale la pena pasar por pan antes o después del café.',
			'neighborhood_guide_en' => 'Jardines las Delicias is a quiet, residential corner of Cuernavaca with streets made for walking. A few steps away is Pacífica Panadería, our sister bakery on Tulipán 302, where the first Gramo bar was born — worth a stop for bread before or after your coffee.',
		),
	),

	array(
		'title'  => 'La Tallera',
		'slug'   => 'la-tallera',
		'order'  => 2,
		'fields' => array(
			'short_name'            => 'Gramo 2',
			'address'               => 'Marte 10',
			'neighborhood'          => 'Jardines de Cuernavaca',
			'city'                  => 'cuernavaca',
			'postal_code'           => '62360',
			'maps_url'              => 'https://maps.app.goo.gl/f2vbQm9HJC7JLbM78',
			'latitude'              => '18.9320284',
			'longitude'             => '-99.2048015',
			'hours'                 => array(
				'mon' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'tue' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'wed' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'thu' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'fri' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'sat' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'sun' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
			),
			'description'           => 'Nuestra barra junto a La Tallera, la antigua casa-estudio de David Alfaro Siqueiros convertida en museo. El café convive con uno de los espacios de arte más serios de Cuernavaca: se llega por los murales y se queda uno por la taza — o al revés, que también funciona.',
			'description_en'        => 'Our bar beside La Tallera, the former home and studio of David Alfaro Siqueiros, now a museum. The café keeps company with one of Cuernavaca\'s most serious art spaces: come for the murals and stay for the cup — or the other way around, which works just as well.',
			'neighborhood_guide'    => 'La visita obligada es La Tallera, el taller que Siqueiros habitó al final de su vida y que hoy opera como museo y centro cultural. La combinación es sencilla y buena: exposición primero, café después, y de regreso una caminata por Jardines de Cuernavaca.',
			'neighborhood_guide_en' => 'The essential visit is La Tallera, the studio Siqueiros kept in his final years, now a museum and cultural centre. The formula is simple and good: exhibition first, coffee after, then a slow walk back through Jardines de Cuernavaca.',
		),
	),

	array(
		'title'  => 'Gramo 2GO',
		'slug'   => 'gramo-2go',
		'order'  => 3,
		'fields' => array(
			'short_name'            => 'Gramo 2GO',
			'address'               => 'Av. Diana 70',
			'neighborhood'          => 'Delicias',
			'city'                  => 'cuernavaca',
			'postal_code'           => '62330',
			'maps_url'              => 'https://maps.app.goo.gl/ASSJQRPxSoYxZ4Vu8',
			'amenities'             => array(
				array(
					'label_es' => 'Pickup rápido',
					'label_en' => 'Quick pickup',
				),
				array(
					'label_es' => 'Pedidos en línea',
					'label_en' => 'Online ordering',
				),
			),
			'description'           => 'El formato para llevar de Gramo: pides desde la aplicación web y pasas a recoger tu café sin filas ni vueltas. El mismo café de nuestras barras, pensado para las mañanas en que el tiempo no alcanza.',
			'description_en'        => 'Gramo\'s to-go format: order through the web app and pick up your coffee with no lines and no detours. The same coffee we serve at our bars, made for mornings when time is short.',
			'neighborhood_guide'    => 'Estamos sobre Avenida Diana, en la zona de Delicias, a unos minutos del jardín de Gramo 1. Es un punto de paso: la idea es que tu café esté listo cuando llegues y sigas tu camino.',
			'neighborhood_guide_en' => 'You\'ll find us on Avenida Diana in the Delicias area, minutes from the garden at Gramo 1. This one is a waypoint: your coffee is ready when you arrive, and you carry on with your day.',
		),
	),

	array(
		'title'  => 'Casa Gaia',
		'slug'   => 'casa-gaia',
		'order'  => 4,
		'fields' => array(
			'short_name'            => 'Gramo 3',
			'address'               => 'Blvd. Lic. Benito Juárez 102',
			'neighborhood'          => 'Centro',
			'city'                  => 'cuernavaca',
			'postal_code'           => '62000',
			'phone'                 => '+52 777 238 2946',
			'maps_url'              => 'https://maps.app.goo.gl/ZmexvkhZwmPpPgqW7',
			'latitude'              => '18.9207',
			'longitude'             => '-99.2337',
			'hours'                 => array(
				'mon' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'tue' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'wed' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'thu' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'fri' => array(
					'open'  => '09:00',
					'close' => '22:00',
				),
				'sat' => array(
					'open'  => '09:00',
					'close' => '22:00',
				),
				'sun' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
			),
			'amenities'             => array(
				array(
					'label_es' => 'Dentro del Museo Casa Gaia',
					'label_en' => 'Inside Museo Casa Gaia',
				),
				array(
					'label_es' => 'Barra de vinos',
					'label_en' => 'Wine bar',
				),
				array(
					'label_es' => 'Noches de jazz',
					'label_en' => 'Jazz nights',
				),
			),
			'description'           => 'Gramo dentro del Museo Casa Gaia, la antigua casa de Cantinflas en el centro de Cuernavaca. Aquí el café comparte techo con un mural de Diego Rivera en la alberca y obra de Tamayo y Toledo en las salas. Al caer la tarde, la barra también sirve vino, y algunas noches se llena de jazz en vivo.',
			'description_en'        => 'Gramo inside Museo Casa Gaia, the former home of Cantinflas in central Cuernavaca. Here the coffee shares a roof with a Diego Rivera mural at the pool and works by Tamayo and Toledo in the galleries. As evening falls the bar pours wine too, and some nights it fills with live jazz.',
			'neighborhood_guide'    => 'Antes o después del café, recorre el museo: la alberca con el mural de Rivera es de esas cosas que no se ven dos veces en la vida, y las salas guardan obra de Rufino Tamayo y Francisco Toledo. Si vienes en fin de semana, pregunta por las noches de jazz.',
			'neighborhood_guide_en' => 'Before or after your coffee, wander the museum: the pool with Rivera\'s mural is the kind of thing you don\'t see twice in a lifetime, and the galleries hold works by Rufino Tamayo and Francisco Toledo. Visiting on a weekend? Ask about the jazz nights.',
		),
	),

	array(
		'title'  => 'Teopanzolco',
		'slug'   => 'teopanzolco',
		'order'  => 5,
		'fields' => array(
			'short_name'            => 'Gramo 4',
			'address'               => 'Río Balsas 22',
			'neighborhood'          => 'Vista Hermosa',
			'city'                  => 'cuernavaca',
			'postal_code'           => '62290',
			'maps_url'              => 'https://maps.app.goo.gl/pMK4AfL7ENALdr498',
			'latitude'              => '18.9311382',
			'longitude'             => '-99.2232296',
			'hours'                 => array(
				'tue' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'wed' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'thu' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'fri' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'sat' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
				'sun' => array(
					'open'  => '09:00',
					'close' => '20:00',
				),
			),
			'amenities'             => array(
				array(
					'label_es' => 'Centro cultural',
					'label_en' => 'Cultural centre',
				),
			),
			'description'           => 'Nuestra barra en el Centro Cultural Teopanzolco, junto a la zona arqueológica del mismo nombre. Pocas cafeterías pueden presumir la vista: café de especialidad de un lado, una pirámide del otro. Cierra los lunes, como la zona.',
			'description_en'        => 'Our bar at the Teopanzolco Cultural Centre, beside the archaeological zone of the same name. Few cafés can claim the view: specialty coffee on one side, a pyramid on the other. Closed Mondays, like the site.',
			'neighborhood_guide'    => 'La zona arqueológica de Teopanzolco está literalmente al lado: date tiempo de caminarla antes del café. El propio centro cultural mantiene una cartelera de conciertos y actividades que vale la pena revisar al planear la visita.',
			'neighborhood_guide_en' => 'The Teopanzolco archaeological zone is literally next door — give yourself time to walk it before coffee. The cultural centre itself keeps a programme of concerts and events worth checking when you plan your visit.',
		),
	),

	array(
		'title'  => 'Gramo 2GO Bosques',
		'slug'   => 'gramo-2go-bosques',
		'order'  => 6,
		'fields' => array(
			'short_name'            => 'Gramo 2GO Bosques',
			'address'               => 'Av. Secretaría de Marina 520',
			'neighborhood'          => 'Lomas del Chamizal, Cuajimalpa',
			'city'                  => 'cdmx',
			'postal_code'           => '05100',
			'maps_url'              => 'https://maps.app.goo.gl/ETqPSPS1VwME9WSL8',
			'amenities'             => array(
				array(
					'label_es' => 'Pickup rápido',
					'label_en' => 'Quick pickup',
				),
				array(
					'label_es' => 'Pedidos en línea',
					'label_en' => 'Online ordering',
				),
			),
			'description'           => 'El kiosco de recolección de Gramo en la Ciudad de México, sobre Avenida Secretaría de Marina. Mismo formato que en Cuernavaca: pides en línea, recoges y sigues — el café serio no tiene por qué ser lento.',
			'description_en'        => 'Gramo\'s pickup kiosk in Mexico City, on Avenida Secretaría de Marina. Same format as in Cuernavaca: order online, pick up, keep moving — serious coffee doesn\'t have to be slow.',
			'neighborhood_guide'    => 'Pensado para las rutinas de la zona de Bosques y Lomas del Chamizal: un alto breve de camino a la oficina o de regreso a casa. El pedido se hace desde la aplicación web y te espera listo en el kiosco.',
			'neighborhood_guide_en' => 'Built for the rhythms of Bosques and Lomas del Chamizal: a brief stop on the way to the office or back home. Order through the web app and your coffee is waiting at the kiosk.',
		),
	),

	array(
		'title'  => 'Gandhi Lomas',
		'slug'   => 'gandhi-lomas',
		'order'  => 7,
		'fields' => array(
			'short_name'            => 'Gramo 5',
			'address'               => 'Av. Paseo de las Palmas 840',
			'neighborhood'          => 'Lomas de Chapultepec',
			'city'                  => 'cdmx',
			'postal_code'           => '11000',
			'maps_url'              => 'https://maps.app.goo.gl/7vYGkkFnCeY91obS7',
			'amenities'             => array(
				array(
					'label_es' => 'Dentro de Librerías Gandhi',
					'label_en' => 'Inside a Gandhi bookstore',
				),
			),
			'description'           => 'La barra de Gramo dentro de la Librería Gandhi de Paseo de las Palmas. Libros y café: una de las pocas combinaciones que no necesita explicación. Pide en barra, elige un título y quédate el rato que haga falta.',
			'description_en'        => 'The Gramo bar inside the Gandhi bookstore on Paseo de las Palmas. Books and coffee: one of the few pairings that needs no explanation. Order at the bar, pick a title, and stay as long as it takes.',
			'neighborhood_guide'    => 'Estás dentro de una Librería Gandhi, así que el plan se arma solo: hojear novedades con la taza en la mano. Afuera, Paseo de las Palmas atraviesa Lomas de Chapultepec — buen pretexto para llegar caminando.',
			'neighborhood_guide_en' => 'You\'re inside a Gandhi bookstore, so the plan writes itself: browse the new releases with a cup in hand. Outside, Paseo de las Palmas runs through Lomas de Chapultepec — a good excuse to arrive on foot.',
		),
	),

	array(
		'title'  => 'Polanco',
		'slug'   => 'polanco',
		'order'  => 8,
		'fields' => array(
			'short_name'            => 'Gramo 6',
			'address'               => 'Lamartine 339',
			'neighborhood'          => 'Polanco V Sección',
			'city'                  => 'cdmx',
			'postal_code'           => '11560',
			'maps_url'              => 'https://maps.app.goo.gl/F6c67vBdetaiTsR98',
			'latitude'              => '19.4320956',
			'longitude'             => '-99.1899069',
			'amenities'             => array(
				array(
					'label_es' => 'Boutique de fragancias Laguna Cipryen',
					'label_en' => 'Laguna Cipryen fragrance boutique',
				),
			),
			'description'           => 'La sucursal más reciente de Gramo, en la calle Lamartine de Polanco. Compartimos espacio con Laguna Cipryen, una boutique de fragancias — café de un lado, perfume del otro, y la misma atención al detalle en ambos mostradores.',
			'description_en'        => 'Gramo\'s newest branch, on Lamartine street in Polanco. We share the space with Laguna Cipryen, a fragrance boutique — coffee on one side, perfume on the other, and the same attention to detail at both counters.',
			'neighborhood_guide'    => 'Polanco se camina por calles con nombre de escritor, y Lamartine es una de ellas. La barra funciona igual de bien como inicio de un paseo por el barrio que como su pausa de en medio.',
			'neighborhood_guide_en' => 'Polanco is a neighbourhood of streets named after writers, and Lamartine is one of them. The bar works equally well as the start of a wander through the area or as its midpoint pause.',
		),
	),

);
