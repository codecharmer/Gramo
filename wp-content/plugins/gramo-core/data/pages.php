<?php
/**
 * Seed content — bilingual page pairs.
 *
 * Every entry declares an `es` and an `en` side (full Gutenberg block markup);
 * {@see \Gramo\Core\Setup\ContentSeeder::install_page_pairs()} creates both,
 * stamps `_gramo_locale`, and links them via `_gramo_translation_of`. The
 * Spanish «Inicio» page sets the static front page.
 *
 * Composition uses the gramo/* blocks (hero, split-image, stats, faq,
 * menu-section, featured-coffees, locations, inquiry-form, cta-band)
 * plus core text blocks. Reference blocks resolve their data from
 * the store/CPTs at render time, so pages stay thin and editorial.
 *
 * All copy is grounded in verified brand facts (founders, the garage origin,
 * the roasters, Pacífica, the real links); nothing operational is invented.
 *
 * @package Gramo\Core
 * @return array<int,array<string,mixed>>
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(

	// ---------------------------------------------------------------------
	// Inicio / Home.
	// ---------------------------------------------------------------------
	array(
		'pair'     => 'inicio',
		'is_front' => true,
		'es'       => array(
			'title'            => 'Inicio',
			'slug'             => 'inicio',
			'seo_short'        => 'Gramo Café: tostadores y cafeterías de especialidad en Cuernavaca y CDMX.',
			'meta_description' => 'Intervenimos espacios en donde hace falta buen café: ocho cafeterías entre Cuernavaca y CDMX, café de origen tostado por nuestro sello y suscripciones mensuales.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Gramo Café","heading":"Intervenimos espacios en donde hace falta buen café","subheading":"Ocho cafeterías entre Cuernavaca y la Ciudad de México: jardines, museos, librerías y una tostadora propia.","primaryCta":{"label":"Ver cafés","url":"/cafe/"},"secondaryCta":{"label":"Ubicaciones","url":"/ubicaciones/"},"media":{"id":0,"url":"@escena-red-apple","alt":"Bolsa Vincent Vega en mano frente a la repisa"}} /-->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"La casa","heading":"Nacimos en un garaje, en plena pandemia","media":{"id":0,"url":"@escena-grunge","alt":"Entrega de una bolsa Grunge Coffee en la barra"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Gramo empezó como una barra de café en un garaje de Cuernavaca, montada por Salo y Sara cuando el mundo se detuvo. Hoy cada ubicación se piensa como una película — con su set, su utilería y su soundtrack — pero la regla sigue siendo la del primer día: el café, bien hecho y sin prisa.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>La vida es demasiado corta para tomar mal café.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/featured-coffees {"heading":"Cafés de la casa","intro":"Orígenes en rotación, tostados por nuestro sello y por tostadores invitados."} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"cafe","headingOverride":"De la barra"} /-->

<!-- wp:gramo/locations {"heading":"Dónde encontrarnos"} /-->

<!-- wp:gramo/cta-band {"heading":"Café en casa, cada mes","text":"Suscríbete y recibe un origen distinto cada mes, con sorpresas de la casa.","cta":{"label":"Ver suscripciones","url":"/suscripciones/"},"media":{"id":0,"url":"@escena-stickers","alt":"Decenas de stickers ilustrados de Gramo extendidos uno sobre otro, en colores saturados."}} /-->
BLOCKS
			,
		),
		'en'       => array(
			'title'            => 'Home',
			'slug'             => 'home',
			'seo_short'        => 'Gramo Café: specialty coffee roasters and cafés in Cuernavaca and Mexico City.',
			'meta_description' => 'We take good coffee to the spaces missing it: eight cafés across Cuernavaca and Mexico City, origin coffees roasted under our own label, and monthly subscriptions.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Gramo Café","heading":"We take good coffee to the spaces that are missing it","subheading":"Eight cafés across Cuernavaca and Mexico City: gardens, museums, bookstores, and a roastery of our own.","primaryCta":{"label":"Shop coffee","url":"/cafe/"},"secondaryCta":{"label":"Locations","url":"/en/locations/"},"media":{"id":0,"url":"@escena-red-apple","alt":"Vincent Vega bag held up in front of the shelf"}} /-->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"The house","heading":"Born in a garage, at the height of the pandemic","media":{"id":0,"url":"@escena-grunge","alt":"A Grunge Coffee bag handed over at the bar"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Gramo began as a coffee bar in a Cuernavaca garage, set up by Salo and Sara when the world stood still. Today every location is conceived like a film — with its own set, props and soundtrack — but the rule is still the one from day one: coffee, done well, without hurry.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Life is too short to drink bad coffee.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/featured-coffees {"heading":"House coffees","intro":"Origins in rotation, roasted under our own label and by guest roasters."} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"cafe","headingOverride":"From the bar"} /-->

<!-- wp:gramo/locations {"heading":"Where to find us"} /-->

<!-- wp:gramo/cta-band {"heading":"Coffee at home, every month","text":"Subscribe and receive a different origin each month, with small extras from the house.","cta":{"label":"See subscriptions","url":"/en/subscriptions/"},"media":{"id":0,"url":"@escena-stickers","alt":"Dozens of illustrated Gramo stickers spread one over another in saturated colour."}} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Nosotros / About.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'nosotros',
		'es'   => array(
			'title'            => 'Nosotros',
			'slug'             => 'nosotros',
			'seo_short'        => 'La historia de Gramo: del garaje en Cuernavaca a ocho cafeterías en dos ciudades.',
			'meta_description' => 'Gramo nació en un garaje de Cuernavaca durante la pandemia, fundado por Salo y Sara. Hoy: ocho ubicaciones, tostadora propia y pan de nuestra hermana Pacífica.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Nosotros","heading":"Una casa de café con identidad propia","height":"compact","media":{"id":0,"url":"@escena-marigold","alt":"Entrega de una bolsa Marigold sobre la barra"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"El origen","heading":"Del garaje a la calle","media":{"id":0,"url":"@escena-bad-motherfucker","alt":"Bolsa Red Apple sobre un barandal de metal"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Gramo nació en un garaje de Cuernavaca durante la pandemia y para finales de 2021 ya operaba como cafetería. No hubo plan maestro: hubo una barra, buen café y la intuición de que la ciudad merecía una cultura de café con identidad propia.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"Los fundadores","heading":"Salo y Sara","media":{"id":0,"url":"@escena-love-buzz","alt":"Dos bolsas Love Buzz, negra y blanca, entre plantas"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Salo venía del cine; Sara, del diseño gráfico. Esa mezcla explica casi todo lo que ves: cada ubicación se concibe como una película — set, utilería, soundtrack — y cada bolsa, cada taza y cada espacio pasa por un ojo de diseño que no perdona el detalle flojo.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"eyebrow":"El tueste","heading":"Nuestra tostadora y sus aliados","media":{"id":0,"url":"@escena-red-apple","alt":"Bolsa Vincent Vega en mano frente a la repisa"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>El café de casa se tuesta bajo nuestro sello, Gramo Coffee Roasters, en la Ciudad de México, y los tuestes medios corren por cuenta de Kurt W en Cuernavaca. A la repisa se suman tostadores invitados que admiramos: Flowerchild e Hydrangea desde California, y Color Roasters desde Colorado.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"La panadería hermana","heading":"Pacífica, la vecina de siempre"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>El pan dulce de nuestras barras viene de Pacífica Panadería, nuestra panadería hermana en Tulipán 302 — la misma puerta junto a la que nació la primera barra de Gramo. Panqué de limón con amapola, rol de almendra, rol de canela: las cosas simples, bien hechas.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/stats {"heading":"La casa en cifras","items":[{"value":"8","suffix":"","label":"ubicaciones"},{"value":"2","suffix":"","label":"ciudades"},{"value":"20","suffix":"+","label":"cafés de origen servidos"},{"value":"10","suffix":"","label":"sellos para tu recompensa de lealtad"}]} /-->

<!-- wp:gramo/cta-band {"heading":"Hazte de la casa","text":"Gramo Clientes: junta 10 sellos en tu tarjeta digital y llévate tu recompensa.","cta":{"label":"Únete a Gramo Clientes","url":"https://take.cards/I0F24"},"media":{"id":0,"url":"@escena-stickers","alt":"Decenas de stickers ilustrados de Gramo extendidos uno sobre otro, en colores saturados."}} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'About',
			'slug'             => 'about',
			'seo_short'        => 'The Gramo story: from a Cuernavaca garage to eight cafés in two cities.',
			'meta_description' => 'Gramo was born in a Cuernavaca garage during the pandemic, founded by Salo and Sara. Today: eight locations, a roastery of its own, and bread from sister bakery Pacífica.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"About","heading":"A coffee house with an identity of its own","height":"compact","media":{"id":0,"url":"@escena-marigold","alt":"A Marigold bag handed across the bar"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"The origin","heading":"From the garage to the street","media":{"id":0,"url":"@escena-bad-motherfucker","alt":"Red Apple bag on a metal railing"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Gramo was born in a Cuernavaca garage during the pandemic and was operating as a café by late 2021. There was no master plan: there was a bar, good coffee, and the intuition that the city deserved a coffee culture with an identity of its own.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"The founders","heading":"Salo and Sara","media":{"id":0,"url":"@escena-love-buzz","alt":"Two Love Buzz bags, black and white, among plants"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Salo came from film; Sara, from graphic design. That mix explains most of what you see: every location is conceived like a film — set, props, soundtrack — and every bag, cup and space passes a designer's eye that forgives no loose detail.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"eyebrow":"The roast","heading":"Our roastery and its allies","media":{"id":0,"url":"@escena-red-apple","alt":"Vincent Vega bag held up in front of the shelf"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>The house coffee is roasted under our own label, Gramo Coffee Roasters, in Mexico City, with the medium roasts handled by Kurt W in Cuernavaca. The shelf also welcomes guest roasters we admire: Flowerchild and Hydrangea from California, and Color Roasters from Colorado.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"The sister bakery","heading":"Pacífica, the neighbour from the start"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>The sweet breads at our bars come from Pacífica Panadería, our sister bakery on Tulipán 302 — the very door beside which Gramo's first bar was born. Lemon-poppy seed loaf, almond roll, cinnamon roll: simple things, done well.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/stats {"heading":"The house in numbers","items":[{"value":"8","suffix":"","label":"locations"},{"value":"2","suffix":"","label":"cities"},{"value":"20","suffix":"+","label":"origin coffees served"},{"value":"10","suffix":"","label":"stamps to your loyalty reward"}]} /-->

<!-- wp:gramo/cta-band {"heading":"Make yourself at home","text":"Gramo Clientes: collect 10 stamps on your digital card and claim your reward.","cta":{"label":"Join Gramo Clientes","url":"https://take.cards/I0F24"},"media":{"id":0,"url":"@escena-stickers","alt":"Dozens of illustrated Gramo stickers spread one over another in saturated colour."}} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Café / Coffee (editorial frame for the shop).
	// ---------------------------------------------------------------------
	array(
		'pair' => 'cafe',
		'es'   => array(
			'title'            => 'Café',
			'slug'             => 'cafe',
			'seo_short'        => 'Café en grano de origen: tostado por Gramo Coffee Roasters y tostadores invitados.',
			'meta_description' => 'Cafés de origen en grano: lavados, naturales y honeys de México, Colombia, Ecuador y África, tostados por Gramo Coffee Roasters y tostadores invitados.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"La tostadora","heading":"Café en grano, de origen","subheading":"Lotes en rotación constante, con ficha técnica completa y nombres que se quedan.","height":"compact","media":{"id":0,"url":"@escena-overdose","alt":"Bolsa Overdose sobre un poste oxidado, al aire libre"}} /-->

<!-- wp:gramo/featured-coffees {"heading":"Ahora en la repisa","intro":"Los destacados de la temporada."} /-->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"El tueste","heading":"Un sello propio y buenos invitados","media":{"id":0,"url":"@escena-red-apple","alt":"Bolsa Vincent Vega en mano frente a la repisa"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>El café de casa lleva el sello de Gramo Coffee Roasters, nuestra tostadora en la Ciudad de México; los tuestes medios se trabajan en Cuernavaca con Kurt W. Y porque el buen café no entiende de fronteras, la repisa recibe tostadores invitados: Flowerchild e Hydrangea, de California, y Color Roasters, de Colorado.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Cada bolsa dice de dónde viene, quién la produjo, a qué altura creció y a qué sabe. Lo demás lo decide tu método.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/cta-band {"tone":"linen","heading":"¿Mejor sin pensarlo cada mes?","text":"Las suscripciones traen un origen distinto cada mes, con sorpresas de la casa.","cta":{"label":"Ver suscripciones","url":"/suscripciones/"},"media":{"id":0,"url":"@escena-marigold","alt":"Una bolsa negra de café Marigold se entrega sobre la barra, con las gorras de la casa en la repisa al fondo."}} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Coffee',
			'slug'             => 'coffee',
			'seo_short'        => 'Origin whole-bean coffee, roasted by Gramo Coffee Roasters and guest roasters.',
			'meta_description' => 'Whole-bean origin coffees: washed, natural and honey lots from Mexico, Colombia, Ecuador and Africa, roasted by Gramo Coffee Roasters and guest roasters.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"The roastery","heading":"Whole-bean coffee, from origin","subheading":"Lots in constant rotation, with full spec sheets and names that stick.","height":"compact","media":{"id":0,"url":"@escena-overdose","alt":"Overdose bag on a rusted post, outdoors"}} /-->

<!-- wp:gramo/featured-coffees {"heading":"On the shelf now","intro":"This season's highlights."} /-->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"The roast","heading":"A label of our own, and good guests","media":{"id":0,"url":"@escena-red-apple","alt":"Vincent Vega bag held up in front of the shelf"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>The house coffee carries the Gramo Coffee Roasters label, our roastery in Mexico City; medium roasts are worked in Cuernavaca with Kurt W. And because good coffee knows no borders, the shelf hosts guest roasters too: Flowerchild and Hydrangea from California, and Color Roasters from Colorado.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Every bag tells you where it comes from, who produced it, how high it grew, and what it tastes like. The rest is up to your brew method.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/cta-band {"tone":"linen","heading":"Rather not think about it every month?","text":"Subscriptions bring a different origin each month, with small extras from the house.","cta":{"label":"See subscriptions","url":"/en/subscriptions/"},"media":{"id":0,"url":"@escena-marigold","alt":"A black Marigold coffee bag handed across the bar, house caps on the shelf behind."}} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Menú / Menu.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'menu',
		'es'   => array(
			'title'            => 'Menú',
			'slug'             => 'menu',
			'seo_short'        => 'El menú de Gramo: café de barra, bebidas, alimentos y pastelería de Pacífica.',
			'meta_description' => 'Menú de Gramo Café: espresso, filtrados, cáscara, chai y cold brew; toasts, ensaladas y croissants, y pastelería de nuestra panadería hermana Pacífica.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Menú","heading":"Lo que se sirve en barra","subheading":"Café, bebidas, alimentos y el pan dulce de Pacífica.","height":"compact","media":{"id":0,"url":"@escena-grunge","alt":"Entrega de una bolsa Grunge Coffee en la barra"}} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"cafe"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"bebidas"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"alimentos"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"pasteleria","showPrices":false} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Menu',
			// WordPress page slugs are globally unique, so the English page
			// cannot also be "menu" — the Spanish one owns it, and WP would
			// silently make this "menu-2". The route map points here.
			'slug'             => 'our-menu',
			'seo_short'        => 'The Gramo menu: bar coffee, drinks, food, and pastry from Pacífica.',
			'meta_description' => 'Gramo Café menu: espresso, pour overs, cascara, chai and cold brew; toasts, salads and croissants, plus pastry from our sister bakery Pacífica.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Menu","heading":"What the bar is serving","subheading":"Coffee, drinks, food, and sweet breads from Pacífica.","height":"compact","media":{"id":0,"url":"@escena-grunge","alt":"A Grunge Coffee bag handed over at the bar"}} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"cafe"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"bebidas"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"alimentos"} /-->

<!-- wp:gramo/menu-section {"sectionSlug":"pasteleria","showPrices":false} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Ubicaciones / Locations.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'ubicaciones',
		'es'   => array(
			'title'            => 'Ubicaciones',
			'slug'             => 'ubicaciones',
			'seo_short'        => 'Las ocho cafeterías de Gramo en Cuernavaca y Ciudad de México.',
			'meta_description' => 'Encuentra tu Gramo: jardines, museos, una librería y kioscos 2GO — ocho ubicaciones entre Cuernavaca y la Ciudad de México, con horarios y mapas.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Ubicaciones","heading":"Ocho espacios, dos ciudades","subheading":"Jardines, museos, una librería y un par de kioscos para llevar.","height":"compact","media":{"id":0,"url":"@escena-pennyroyal","alt":"Entrega de una bolsa Pennyroyal Blend en barra"}} /-->

<!-- wp:gramo/locations /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Locations',
			'slug'             => 'locations',
			'seo_short'        => 'Gramo\'s eight cafés across Cuernavaca and Mexico City.',
			'meta_description' => 'Find your Gramo: gardens, museums, a bookstore and 2GO kiosks — eight locations across Cuernavaca and Mexico City, with hours and maps.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Locations","heading":"Eight spaces, two cities","subheading":"Gardens, museums, a bookstore, and a couple of kiosks to go.","height":"compact","media":{"id":0,"url":"@escena-pennyroyal","alt":"A Pennyroyal Blend bag handed over at the bar"}} /-->

<!-- wp:gramo/locations /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Proceso / Our Process.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'proceso',
		'es'   => array(
			'title'            => 'Proceso',
			'slug'             => 'proceso',
			'seo_short'        => 'Del origen a la barra: cómo llega el café a tu taza en Gramo.',
			'meta_description' => 'El camino del café en Gramo: productores de origen, tueste con Gramo Coffee Roasters y Kurt W, y una barra que trata cada taza con calma.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Proceso","heading":"Del origen a la barra","subheading":"El camino que recorre cada bolsa antes de llegar a tu taza.","media":{"id":0,"url":"@escena-bad-motherfucker","alt":"Bolsa Red Apple sobre un barandal de metal"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"Origen","heading":"Primero, el productor","media":{"id":0,"url":"@escena-love-buzz","alt":"Dos bolsas Love Buzz, negra y blanca, entre plantas"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Todo empieza lejos de la barra: en Xico y Huatusco, en Morelos y Colima, en Huila, en Hacienda La Papaya, en Kayanza o en Guji. Cada café del catálogo lleva nombre y apellido de quien lo produjo — Meléndez y Córtes, Erick Bravo, Juan Peña, Hugo Salazar, Tagel Alemayehu — porque la trazabilidad no es un adorno: es la mitad de la historia.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"Tueste","heading":"Después, el fuego","media":{"id":0,"url":"@escena-overdose","alt":"Bolsa Overdose sobre un poste oxidado, al aire libre"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>El grano verde pasa por Gramo Coffee Roasters, nuestro sello en la Ciudad de México, o por el tambor de Kurt W en Cuernavaca para los tuestes medios. Los lotes de tostadores invitados — Flowerchild, Hydrangea, Color Roasters — llegan ya firmados por su casa. El objetivo es siempre el mismo: que el tueste sirva al origen, no al revés.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"eyebrow":"Barra","heading":"Al final, la taza","media":{"id":0,"url":"@escena-pennyroyal","alt":"Entrega de una bolsa Pennyroyal Blend en barra"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>En barra el café se trata con calma: espresso o filtrado, receta ajustada al lote y una regla sencilla — si la taza no convence a quien la prepara, no sale. Es el último paso del camino y el único que ves; los anteriores están ahí, en el sabor.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/faq {"heading":"Preguntas de barra","intro":"Lo que más nos preguntan sobre la preparación."} -->
<div class="wp-block-gramo-faq"><!-- wp:gramo/faq-item {"question":"¿Qué método me conviene para empezar en casa?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>El filtrado (V60 o similar) es el punto de entrada más noble: barato, transparente y difícil de arruinar. Una proporción de 1:15 — un gramo de café por 15 de agua — es un buen comienzo; de ahí se ajusta al gusto.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"¿Grano entero o molido?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Entero, siempre que puedas: el café molido pierde aroma en días; el grano entero aguanta semanas. Si no tienes molino, muele en tienda la cantidad que uses en una o dos semanas.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"¿Cómo guardo el café en casa?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>En un frasco hermético, lejos de la luz, el calor y la humedad — y nunca en el refrigerador. La bolsa cerrada con su válvula también funciona bien las primeras semanas.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"¿Qué significa que un café sea lavado, natural o honey?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Es la forma en que se retiró la fruta del grano. El lavado fermenta en agua y da tazas limpias; el natural seca el grano dentro de la cereza y da fruta y dulzor; el honey queda a medio camino, con parte del mucílago, y suma cuerpo y dulzura.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item --></div>
<!-- /wp:gramo/faq -->

<!-- wp:gramo/cta-band {"heading":"Pruébalo en tu método","text":"El catálogo completo, con ficha técnica de cada lote.","cta":{"label":"Ver cafés","url":"/cafe/"},"media":{"id":0,"url":"@escena-red-apple","alt":"Una mano sostiene una bolsa de café Vincent Vega frente a una repisa con bolsas de Gramo y un muro de lámina corrugada."}} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Our Process',
			'slug'             => 'process',
			'seo_short'        => 'From origin to bar: how coffee reaches your cup at Gramo.',
			'meta_description' => 'The coffee\'s journey at Gramo: origin producers, roasting with Gramo Coffee Roasters and Kurt W, and a bar that treats every cup with calm.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Our process","heading":"From origin to the bar","subheading":"The road every bag travels before it reaches your cup.","media":{"id":0,"url":"@escena-bad-motherfucker","alt":"Red Apple bag on a metal railing"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"Origin","heading":"First, the producer","media":{"id":0,"url":"@escena-love-buzz","alt":"Two Love Buzz bags, black and white, among plants"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>It all begins far from the bar: in Xico and Huatusco, in Morelos and Colima, in Huila, at Hacienda La Papaya, in Kayanza or Guji. Every coffee in the catalogue carries the name of the person who produced it — Meléndez y Córtes, Erick Bravo, Juan Peña, Hugo Salazar, Tagel Alemayehu — because traceability isn't decoration: it's half the story.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"Roast","heading":"Then, the fire","media":{"id":0,"url":"@escena-overdose","alt":"Overdose bag on a rusted post, outdoors"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>The green beans pass through Gramo Coffee Roasters, our label in Mexico City, or through Kurt W's drum in Cuernavaca for the medium roasts. Guest lots — Flowerchild, Hydrangea, Color Roasters — arrive already signed by their house. The goal never changes: the roast serves the origin, not the other way around.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"eyebrow":"Bar","heading":"Finally, the cup","media":{"id":0,"url":"@escena-pennyroyal","alt":"A Pennyroyal Blend bag handed over at the bar"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>At the bar the coffee is treated with calm: espresso or filter, the recipe tuned to the lot, and one simple rule — if the cup doesn't convince the person brewing it, it doesn't leave the bar. It's the last step of the road and the only one you see; the others are all there, in the taste.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/faq {"heading":"Bar questions","intro":"What we get asked most about brewing."} -->
<div class="wp-block-gramo-faq"><!-- wp:gramo/faq-item {"question":"Which method should I start with at home?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>The pour over (V60 or similar) is the noblest way in: inexpensive, transparent, and hard to ruin. A 1:15 ratio — one gram of coffee to 15 of water — is a good place to begin; adjust to taste from there.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"Whole bean or ground?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Whole, whenever you can: ground coffee loses its aroma in days, whole beans hold for weeks. No grinder? Have the shop grind only what you'll use in a week or two.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"How should I store coffee at home?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>In an airtight jar, away from light, heat and moisture — and never in the fridge. The sealed bag with its valve also does fine for the first weeks.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"What do washed, natural and honey mean?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>It's how the fruit was removed from the bean. Washed coffees ferment in water and give clean cups; naturals dry inside the cherry and give fruit and sweetness; honey sits in between, keeping part of the mucilage for extra body and sweetness.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item --></div>
<!-- /wp:gramo/faq -->

<!-- wp:gramo/cta-band {"heading":"Try it in your method","text":"The full catalogue, spec sheet included with every lot.","cta":{"label":"Shop coffee","url":"/cafe/"},"media":{"id":0,"url":"@escena-red-apple","alt":"A hand holds up a Vincent Vega coffee bag in front of a ledge lined with Gramo bags against a corrugated metal wall."}} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Suscripciones / Subscriptions.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'suscripciones',
		'es'   => array(
			'title'            => 'Suscripciones',
			'slug'             => 'suscripciones',
			'seo_short'        => 'Suscripciones de café Gramo: un origen distinto cada mes, desde $399 MXN.',
			'meta_description' => 'Café en casa cada mes: suscripciones Gramo de 250–300 g, 600 g o 1 kg premium, con orígenes en rotación, stickers y sorpresas de la casa.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Suscripciones","heading":"Un origen distinto, cada mes","subheading":"Elige tu tamaño y deja la curaduría en manos de la casa.","media":{"id":0,"url":"@escena-overdose","alt":"Bolsa Overdose sobre un poste oxidado, al aire libre"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"Cómo se siente","heading":"El café llega solo; la sorpresa, también","media":{"id":0,"url":"@escena-stickers","alt":"Stickers ilustrados de Gramo, extendidos a todo color"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Cada mes elegimos entre lo mejor que pasa por la tostadora — un lavado de Veracruz, un natural de Morelos, lo que la temporada mande — y te lo enviamos con stickers y detalles de la casa. Tu única tarea es no quedarte sin café, y de esa nos encargamos nosotros.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>250–300 g al mes — para una taza diaria.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>600 g al mes — para dos tazas, o una muy honesta.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>1 kg premium al mes — para casas donde el café no descansa.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/featured-coffees {"mode":"manual","productIds":[],"heading":"Los planes","intro":"Tres tamaños, un origen distinto cada mes."} /-->

<!-- wp:gramo/faq {"heading":"Preguntas frecuentes"} -->
<div class="wp-block-gramo-faq"><!-- wp:gramo/faq-item {"question":"¿Cómo funciona la suscripción?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Eliges uno de los tres planes y cada mes preparamos tu entrega con un origen distinto, seleccionado por nuestro equipo. No tienes que decidir nada más — aunque siempre puedes escribirnos si quieres ajustar molienda o preferencias.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"¿Cómo son las entregas?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Coordinamos la entrega mensual contigo al confirmar tu suscripción. Escríbenos desde el formulario y te contamos las opciones disponibles para tu zona.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"¿Puedo pausar o cancelar?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Sí, cuando quieras y sin plazos forzosos: basta con avisarnos antes de tu siguiente entrega. Las suscripciones son para quedarse por gusto, no por contrato.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item --></div>
<!-- /wp:gramo/faq -->

<!-- wp:gramo/inquiry-form {"formType":"subscription","heading":"Empieza tu suscripción","intro":"Cuéntanos qué plan te interesa y coordinamos tu primera entrega."} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Subscriptions',
			'slug'             => 'subscriptions',
			'seo_short'        => 'Gramo coffee subscriptions: a different origin every month, from $399 MXN.',
			'meta_description' => 'Coffee at home every month: Gramo subscriptions in 250–300 g, 600 g or 1 kg premium, with rotating origins, stickers and small extras from the house.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Subscriptions","heading":"A different origin, every month","subheading":"Pick your size and leave the curation to the house.","media":{"id":0,"url":"@escena-overdose","alt":"Overdose bag on a rusted post, outdoors"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"How it feels","heading":"The coffee arrives on its own; so does the surprise","media":{"id":0,"url":"@escena-stickers","alt":"Gramo's illustrated stickers, spread out in full colour"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Each month we choose from the best passing through the roastery — a washed Veracruz, a natural from Morelos, whatever the season sends — and ship it with stickers and small extras from the house. Your only job is not running out of coffee, and we take care of that one too.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>250–300 g a month — for a daily cup.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>600 g a month — for two cups, or one very honest one.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>1 kg premium a month — for households where the coffee never rests.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/featured-coffees {"mode":"manual","productIds":[],"heading":"The plans","intro":"Three sizes, a different origin each month."} /-->

<!-- wp:gramo/faq {"heading":"Frequently asked questions"} -->
<div class="wp-block-gramo-faq"><!-- wp:gramo/faq-item {"question":"How does the subscription work?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Pick one of the three plans and each month we pack your delivery with a different origin, selected by our team. There's nothing else to decide — though you can always write to us to adjust grind or preferences.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"How do deliveries work?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>We coordinate the monthly delivery with you when your subscription is confirmed. Reach out through the form and we'll walk you through the options available for your area.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"Can I pause or cancel?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Yes — anytime, with no lock-in: just let us know before your next delivery. Subscriptions are meant to be kept out of pleasure, not contract.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item --></div>
<!-- /wp:gramo/faq -->

<!-- wp:gramo/inquiry-form {"formType":"subscription","heading":"Start your subscription","intro":"Tell us which plan interests you and we'll coordinate your first delivery."} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Mayoreo / Wholesale.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'mayoreo',
		'es'   => array(
			'title'            => 'Mayoreo',
			'slug'             => 'mayoreo',
			'seo_short'        => 'Café Gramo al mayoreo para restaurantes, cafeterías y oficinas.',
			'meta_description' => 'Café de origen al mayoreo, con tueste propio en CDMX y Cuernavaca: acompañamiento de barra para restaurantes, cafeterías y oficinas que cuidan la taza.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Mayoreo","heading":"Café para mesas que cuidan el detalle","height":"compact","media":{"id":0,"url":"@escena-bad-motherfucker","alt":"Bolsa Red Apple sobre un barandal de metal"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"Cómo trabajamos","heading":"Acompañamiento, no solo costales","media":{"id":0,"url":"@escena-marigold","alt":"Entrega de una bolsa Marigold sobre la barra"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Trabajamos con restaurantes, cafeterías y oficinas que quieren servir buen café sin convertirse en expertos de la noche a la mañana. Nuestro tueste propio — Gramo Coffee Roasters en CDMX y los tuestes medios con Kurt W en Cuernavaca — nos permite ajustar el perfil a tu carta y a tu equipo.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Café de origen con ficha técnica completa</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Perfiles de tueste a la medida de tu barra</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Asesoría de preparación para tu equipo</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/stats {"heading":"La casa detrás del costal","items":[{"value":"8","suffix":"","label":"ubicaciones propias"},{"value":"2","suffix":"","label":"ciudades"},{"value":"20","suffix":"+","label":"cafés de origen servidos"}]} /-->

<!-- wp:gramo/inquiry-form {"formType":"wholesale","heading":"Hablemos de tu proyecto","intro":"Cuéntanos qué sirves y te proponemos una selección."} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Wholesale',
			'slug'             => 'wholesale',
			'seo_short'        => 'Gramo wholesale coffee for restaurants, cafés and offices.',
			'meta_description' => 'Origin coffee at wholesale, roasted in-house in Mexico City and Cuernavaca: bar-level support for restaurants, cafés and offices that care about the cup.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Wholesale","heading":"Coffee for tables that mind the details","height":"compact","media":{"id":0,"url":"@escena-bad-motherfucker","alt":"Red Apple bag on a metal railing"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"How we work","heading":"Support, not just sacks","media":{"id":0,"url":"@escena-marigold","alt":"A Marigold bag handed across the bar"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>We work with restaurants, cafés and offices that want to serve good coffee without becoming experts overnight. Roasting in-house — Gramo Coffee Roasters in Mexico City, medium roasts with Kurt W in Cuernavaca — lets us tune the profile to your menu and your team.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Origin coffees with full spec sheets</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Roast profiles tailored to your bar</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Brewing guidance for your team</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/stats {"heading":"The house behind the sack","items":[{"value":"8","suffix":"","label":"locations of our own"},{"value":"2","suffix":"","label":"cities"},{"value":"20","suffix":"+","label":"origin coffees served"}]} /-->

<!-- wp:gramo/inquiry-form {"formType":"wholesale","heading":"Let's talk about your project","intro":"Tell us what you serve and we'll propose a selection."} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Empleo / Careers.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'empleo',
		'es'   => array(
			'title'            => 'Empleo',
			'slug'             => 'empleo',
			'seo_short'        => 'Trabaja en Gramo: barras en Cuernavaca y CDMX que crecen con su equipo.',
			'meta_description' => 'Únete al equipo de Gramo Café: barras en Cuernavaca y Ciudad de México donde el oficio se aprende en serio. Envía tu CV o escríbenos desde el formulario.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Empleo","heading":"Trabaja con nosotros","height":"compact","media":{"id":0,"url":"@escena-grunge","alt":"Entrega de una bolsa Grunge Coffee en la barra"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"La cultura","heading":"Un oficio que se aprende en barra","media":{"id":0,"url":"@escena-pennyroyal","alt":"Entrega de una bolsa Pennyroyal Blend en barra"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Gramo creció de una barra en un garaje a ocho ubicaciones en dos ciudades, y ese crecimiento lo hizo la gente detrás de la barra. Buscamos personas con ganas de aprender el oficio en serio: el café, el servicio y el cuidado por los espacios que habitamos.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>No necesitas experiencia previa en especialidad — necesitas curiosidad y gusto por hacer las cosas bien.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://docs.google.com/forms/d/e/1FAIpQLSeCu5jOJSk8tdv9DgNRbJA4DM4Q6AqQpK2Ilzgfedp4HK0W3g/viewform">Enviar mi CV</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/inquiry-form {"formType":"careers","heading":"O escríbenos directo","intro":"Cuéntanos quién eres, en qué ciudad estás y qué te gustaría hacer en Gramo."} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Careers',
			'slug'             => 'careers',
			'seo_short'        => 'Work at Gramo: bars in Cuernavaca and Mexico City that grow with their team.',
			'meta_description' => 'Join the Gramo Café team: bars in Cuernavaca and Mexico City where the craft is taken seriously. Send your CV or reach out through the form.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Careers","heading":"Work with us","height":"compact","media":{"id":0,"url":"@escena-grunge","alt":"A Grunge Coffee bag handed over at the bar"}} /-->

<!-- wp:gramo/split-image {"eyebrow":"The culture","heading":"A craft learned at the bar","media":{"id":0,"url":"@escena-pennyroyal","alt":"A Pennyroyal Blend bag handed over at the bar"}} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Gramo grew from a bar in a garage to eight locations in two cities, and that growth was made by the people behind the bar. We look for people eager to learn the craft properly: the coffee, the service, and the care for the spaces we inhabit.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You don't need prior specialty experience — you need curiosity and a taste for doing things well.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://docs.google.com/forms/d/e/1FAIpQLSeCu5jOJSk8tdv9DgNRbJA4DM4Q6AqQpK2Ilzgfedp4HK0W3g/viewform">Send my CV</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/inquiry-form {"formType":"careers","heading":"Or write to us directly","intro":"Tell us who you are, which city you're in, and what you'd like to do at Gramo."} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Contacto / Contact.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'contacto',
		'es'   => array(
			'title'            => 'Contacto',
			'slug'             => 'contacto',
			'seo_short'        => 'Escríbele a Gramo Café: dudas, pedidos y todo lo demás.',
			'meta_description' => 'Contacta a Gramo Café: escríbenos desde el formulario o visítanos en cualquiera de nuestras ocho ubicaciones en Cuernavaca y Ciudad de México.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Contacto","heading":"Escríbenos con confianza","height":"compact","media":{"id":0,"url":"@escena-love-buzz","alt":"Dos bolsas Love Buzz, negra y blanca, entre plantas"}} /-->

<!-- wp:gramo/inquiry-form {"formType":"general","heading":"Cuéntanos","intro":"Dudas, pedidos, ideas o saludos: todo se lee y todo se responde."} /-->

<!-- wp:gramo/locations {"heading":"O ven a vernos"} /-->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Contact',
			'slug'             => 'contact',
			'seo_short'        => 'Write to Gramo Café: questions, orders and everything else.',
			'meta_description' => 'Contact Gramo Café: reach out through the form, or visit us at any of our eight locations across Cuernavaca and Mexico City.',
			'content'          => <<<'BLOCKS'
<!-- wp:gramo/hero {"eyebrow":"Contact","heading":"Write to us","height":"compact","media":{"id":0,"url":"@escena-love-buzz","alt":"Two Love Buzz bags, black and white, among plants"}} /-->

<!-- wp:gramo/inquiry-form {"formType":"general","heading":"Tell us","intro":"Questions, orders, ideas or hellos: everything gets read, and everything gets answered."} /-->

<!-- wp:gramo/locations {"heading":"Or come see us"} /-->
BLOCKS
			,
		),
	),

	// ---------------------------------------------------------------------
	// Privacidad / Privacy.
	// ---------------------------------------------------------------------
	array(
		'pair' => 'privacidad',
		'es'   => array(
			'title'            => 'Aviso de privacidad',
			'slug'             => 'privacidad',
			'seo_short'        => 'Aviso de privacidad de Gramo Café: qué datos usamos y para qué.',
			'meta_description' => 'Aviso de privacidad de Gramo Café: qué datos personales recabamos al procesar pedidos y formularios, cómo los usamos y cómo ejercer tus derechos ARCO.',
			'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>Gramo Café (en adelante, «Gramo»), con domicilio en C. Alicia 513, Jardines las Delicias, 62296 Cuernavaca, Morelos, es responsable del tratamiento de los datos personales que nos compartes a través de este sitio, en términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Qué datos recabamos</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Datos de contacto: nombre, teléfono y correo electrónico, cuando llenas un formulario o realizas un pedido.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Datos de entrega: dirección y referencias, cuando eliges entrega local con pago contra entrega.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Datos de tu pedido: productos, montos y fechas, para poder prepararlo y darle seguimiento.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>No recabamos datos financieros a través de este sitio: los pedidos locales se pagan contra entrega.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Para qué los usamos</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Procesar, entregar y dar seguimiento a tus pedidos.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Responder a las solicitudes que envías por nuestros formularios (contacto, mayoreo, suscripciones, empleo).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Cuando nos lo autorizas, enviarte comunicaciones sobre productos y novedades de la casa.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Con quién los compartimos</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>No vendemos ni rentamos tus datos personales. Solo los compartimos con terceros cuando es necesario para operar el servicio — por ejemplo, con quien realiza la entrega de tu pedido — o cuando la ley lo requiere.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Cookies</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Este sitio utiliza cookies técnicas necesarias para su funcionamiento (por ejemplo, para recordar tu carrito de compra). Puedes deshabilitarlas desde tu navegador, aunque algunas funciones podrían dejar de operar correctamente.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Tus derechos</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO), así como revocar el consentimiento que nos hayas otorgado, escribiéndonos a hola@gramo.cafe. Atenderemos tu solicitud en los plazos que marca la ley.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Cambios a este aviso</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Cualquier modificación a este aviso de privacidad se publicará en esta misma página. Última actualización: julio de 2026.</p>
<!-- /wp:paragraph -->
BLOCKS
			,
		),
		'en'   => array(
			'title'            => 'Privacy Notice',
			'slug'             => 'privacy',
			'seo_short'        => 'Gramo Café privacy notice: what data we use and why.',
			'meta_description' => 'Gramo Café privacy notice: what personal data we collect when processing orders and forms, how we use it, and how to exercise your rights.',
			'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>Gramo Café ("Gramo"), located at C. Alicia 513, Jardines las Delicias, 62296 Cuernavaca, Morelos, Mexico, is responsible for the personal data you share with us through this site, under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">What we collect</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Contact details: name, phone number and email address, when you fill in a form or place an order.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Delivery details: address and directions, when you choose local delivery with pay on delivery.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Order details: products, amounts and dates, so we can prepare and follow up on your order.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>We do not collect financial data through this site: local orders are paid on delivery.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">How we use it</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>To process, deliver and follow up on your orders.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>To respond to the requests you send through our forms (contact, wholesale, subscriptions, careers).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>With your consent, to send you news about products and the house.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Who we share it with</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We do not sell or rent your personal data. We share it with third parties only when necessary to operate the service — for instance, with whoever delivers your order — or when the law requires it.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Cookies</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This site uses technical cookies necessary for it to work (for example, to remember your shopping cart). You can disable them in your browser, though some features may stop working correctly.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Your rights</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>You may exercise your rights of access, rectification, cancellation and objection (ARCO rights) at any time, and withdraw any consent you have given us, by writing to hola@gramo.cafe. We will respond within the terms set by law.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Changes to this notice</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Any changes to this privacy notice will be published on this page. Last updated: July 2026.</p>
<!-- /wp:paragraph -->
BLOCKS
			,
		),
	),

);
