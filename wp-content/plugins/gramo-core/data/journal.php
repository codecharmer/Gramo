<?php
/**
 * Seed content — Journal (bilingual post pairs + shared categories).
 *
 * Four editorial pieces grounded in verified brand facts only: the house
 * coffee from Xico, the bar's brewing method (generic technique), the
 * locations-as-films philosophy, and the naming story behind the catalogue.
 * Consumed by {@see \Gramo\Core\Setup\ContentSeeder::install_journal()}.
 *
 * Content is Gutenberg block markup (core text blocks + gramo/split-image +
 * gramo/cta-band closers), authored es-MX first with natural English pairs.
 *
 * @package Gramo\Core
 * @return array<string,mixed>
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(

	'categories' => array(
		array(
			'slug'    => 'origenes',
			'name'    => 'Orígenes',
			'name_en' => 'Origins',
		),
		array(
			'slug'    => 'barismo',
			'name'    => 'Barismo',
			'name_en' => 'Brewing',
		),
		array(
			'slug'    => 'casa',
			'name'    => 'Casa',
			'name_en' => 'House Notes',
		),
	),

	'posts'      => array(

		// ------------------------------------------------------------------
		// (a) La Batalla — the house washed coffee from Xico, Veracruz.
		// ------------------------------------------------------------------
		array(
			'pair'       => 'la-batalla-xico',
			'date'       => '2026-06-10',
			'categories' => array( 'origenes' ),
			'es'         => array(
				'title'            => 'La Batalla: un lavado de Xico, Veracruz',
				'slug'             => 'la-batalla-un-lavado-de-xico-veracruz',
				'excerpt'          => 'La historia de nuestro café de casa: un lavado de la sierra de Veracruz con notas de almendra, caramelo y mantequilla.',
				'seo_short'        => 'La historia de La Batalla, nuestro lavado de casa cultivado en Xico, Veracruz.',
				'meta_description' => 'La Batalla es el café de casa de Gramo: un lavado de Xico, Veracruz, con notas de almendra, caramelo y mantequilla, tostado por Gramo Coffee Roasters en CDMX.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>Toda barra necesita un café que no falle. No el lote exótico que se agota en tres semanas, ni el experimento de proceso que divide opiniones: el café que está ahí todas las mañanas, igual de bueno el lunes que el domingo. En Gramo, ese café se llama La Batalla, y viene de Xico, Veracruz.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Xico, donde el café crece entre niebla</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Xico es un pueblo de la sierra central de Veracruz, en una de las regiones cafetaleras más antiguas de México. Ahí el café no es novedad ni moda: es paisaje. Las fincas suben por las laderas entre neblina y vegetación espesa, y el clima —lluvia generosa, calor moderado, noches frescas— hace despacio lo que en otros lugares hay que forzar: madurar la cereza con calma.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>De esa sierra baja La Batalla. Nos gusta que nuestro café de todos los días sea veracruzano por una razón sencilla: si vamos a servir una taza cientos de veces por semana, que cuente algo del país donde la servimos.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Qué significa «lavado»</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La Batalla es un café de proceso lavado. Después de la cosecha, la cereza se despulpa y el grano fermenta en agua hasta desprender el mucílago; luego se lava y se seca. Es el proceso más transparente que existe: no añade sabores de fermentación ni dulzores prestados, deja que el grano diga exactamente lo que es.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Por eso los lavados son la mejor carta de presentación de un origen. Cuando un lavado es bueno, es porque el café —la tierra, la altura, el cuidado del productor— es bueno. No hay dónde esconderse.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">La taza: almendra, caramelo, mantequilla</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>El perfil de La Batalla se resume en tres notas que se explican solas: almendra, caramelo y mantequilla. Es una taza dulce sin ser empalagosa, con cuerpo redondo y un final limpio que invita a la segunda. Nada grita; todo acompaña.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>El tueste es medio y corre por cuenta de Gramo Coffee Roasters, nuestro sello propio en la Ciudad de México. Un tueste pensado para el uso real: funciona en la V60 de la casa, en la prensa francesa heredada y en la máquina de espresso, sin exigir báscula de precisión ni cursos previos.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>El café de todos los días no tiene por qué ser el menos interesante. Solo tiene que ser el más honesto.</p>
<!-- /wp:paragraph --><cite>Equipo Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2 class="wp-block-heading">En bolsa de 250 gramos o de kilo</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La Batalla vive en dos presentaciones: la bolsa de 250 gramos, para quien lo va conociendo, y la de un kilo, para las casas donde el café se acaba antes que la semana. Es, deliberadamente, el café más accesible de nuestro catálogo — porque el punto de partida de una cultura de café no puede ser un lujo.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>Si todavía no lo has probado, empieza por ahí: es la puerta de entrada a todo lo demás que pasa por nuestra tostadora.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"heading":"Prueba La Batalla","text":"El lavado de casa, en bolsa de 250 g o de 1 kg.","cta":{"label":"Ver en la tienda","url":"/cafe/"}} /-->
BLOCKS
				,
			),
			'en'         => array(
				'title'            => 'La Batalla: a washed coffee from Xico, Veracruz',
				'slug'             => 'la-batalla-a-washed-coffee-from-xico-veracruz',
				'excerpt'          => 'The story of our house coffee: a washed lot from the Veracruz highlands with notes of almond, caramel and butter.',
				'seo_short'        => 'The story of La Batalla, our house washed coffee grown in Xico, Veracruz.',
				'meta_description' => 'La Batalla is Gramo\'s house coffee: a washed lot from Xico, Veracruz, with notes of almond, caramel and butter, roasted by Gramo Coffee Roasters in Mexico City.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>Every bar needs a coffee that doesn't miss. Not the exotic lot that sells out in three weeks, nor the process experiment that divides the room: the coffee that shows up every morning, as good on a Monday as on a Sunday. At Gramo, that coffee is called La Batalla, and it comes from Xico, Veracruz.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Xico, where coffee grows in the mist</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Xico is a town in the central highlands of Veracruz, in one of Mexico's oldest coffee regions. Coffee there is neither novelty nor trend: it is landscape. Farms climb the hillsides through fog and thick vegetation, and the climate — generous rain, moderate heat, cool nights — does slowly what elsewhere has to be forced: it ripens the cherry at its own pace.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>La Batalla comes down from that sierra. We like our everyday coffee being from Veracruz for a simple reason: if we're going to serve a cup hundreds of times a week, it should say something about the country we serve it in.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">What "washed" means</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La Batalla is a washed-process coffee. After harvest, the cherry is depulped and the bean ferments in water until the mucilage lets go; then it is washed and dried. It is the most transparent process there is: it adds no fermentation flavours, borrows no sweetness — it lets the bean say exactly what it is.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>That's why washed coffees are an origin's best introduction. When a washed lot is good, it's because the coffee itself — the land, the altitude, the producer's care — is good. There is nowhere to hide.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The cup: almond, caramel, butter</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La Batalla's profile comes down to three notes that explain themselves: almond, caramel and butter. It's a sweet cup without being cloying, round in body, with a clean finish that asks for a second. Nothing shouts; everything accompanies.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The roast is medium, handled by Gramo Coffee Roasters, our own label in Mexico City. It's a roast built for real life: it works in the household V60, the inherited French press and the espresso machine, without demanding a precision scale or prior coursework.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>The everyday coffee doesn't have to be the least interesting one. It just has to be the most honest.</p>
<!-- /wp:paragraph --><cite>Team Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2 class="wp-block-heading">In a 250 gram bag, or by the kilo</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La Batalla lives in two formats: the 250 gram bag, for those getting to know it, and the kilo, for households where the coffee runs out before the week does. It is, deliberately, the most accessible coffee in our catalogue — because the starting point of a coffee culture cannot be a luxury.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>If you haven't tried it yet, start there: it's the doorway to everything else that passes through our roastery.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"heading":"Try La Batalla","text":"The house washed coffee, in 250 g or 1 kg bags.","cta":{"label":"Shop coffee","url":"/cafe/"}} /-->
BLOCKS
				,
			),
		),

		// ------------------------------------------------------------------
		// (b) How the bar brews a pour over — generic technique editorial.
		// ------------------------------------------------------------------
		array(
			'pair'       => 'filtrado-en-barra',
			'date'       => '2026-06-24',
			'categories' => array( 'barismo' ),
			'es'         => array(
				'title'            => 'Cómo preparamos un filtrado en barra',
				'slug'             => 'como-preparamos-un-filtrado-en-barra',
				'excerpt'          => 'Receta y método de nuestro café filtrado: proporción, molienda, agua y paciencia, paso a paso.',
				'seo_short'        => 'El método del filtrado en barra, paso a paso: proporción, molienda, agua y tiempo.',
				'meta_description' => 'Cómo se prepara un café filtrado en barra: proporción café-agua, molienda, temperatura, floración y vertidos, explicado paso a paso para repetirlo en casa.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>El filtrado es la preparación más desnuda que existe: agua caliente, café molido y un filtro de papel. No hay presión, no hay leche, no hay dónde disimular. Por eso es la taza que más nos gusta servir — y la que mejor cuenta un café. Esta es la lógica con la que lo trabajamos en barra, explicada para que puedas repetirla en casa.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">La proporción: el punto de partida</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Todo empieza con una proporción, no con una receta mágica. Un buen rango para arrancar es 1:15 a 1:16 — un gramo de café por cada 15 o 16 de agua. En la práctica: 15 gramos de café para una taza de 240 mililitros. Desde ahí se ajusta al gusto: más café para una taza más intensa, más agua para una más ligera.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Molienda y agua</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La molienda para filtrado va en un punto medio: parecida a la sal de mar, ni polvo ni piedritas. Si la taza sale amarga y pesada, muele más grueso; si sale aguada y ácida, muele más fino. Es la palanca más poderosa que tienes.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>El agua importa tanto como el café: si no te la beberías sola, no la uses para preparar. La temperatura ideal vive entre los 92 y 96 grados — en la práctica, agua que hirvió y descansó medio minuto.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">El método, paso a paso</h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>Enjuaga el filtro con agua caliente. Quita el sabor a papel y precalienta todo.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Agrega el café molido y nivela la cama con un golpecito suave.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Floración: vierte el doble del peso del café en agua (30 g de agua para 15 g de café) y espera de 30 a 45 segundos. El café fresco se infla y libera gas; ese burbujeo es buena señal.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Vierte el resto del agua en dos o tres tandas, en círculos lentos del centro hacia afuera, sin tocar el filtro.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>El tiempo total debe rondar entre 2:30 y 3:30 minutos. Mucho más rápido: muele más fino. Mucho más lento: muele más grueso.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Probar antes que medir</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Los números son andamio, no dogma. La única prueba que cuenta ocurre en la taza: ¿está dulce?, ¿se distinguen las notas?, ¿dan ganas de otro sorbo? Si la respuesta es sí, tu receta es correcta aunque contradiga el manual. Si es no, cambia una sola variable a la vez — molienda primero — y vuelve a probar.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>Un buen filtrado no se mide con báscula sino con la pregunta más simple: ¿quiero otra taza?</p>
<!-- /wp:paragraph --><cite>Equipo Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>Y si un día quieres ver el proceso de cerca, pide un filtrado en cualquiera de nuestras barras y quédate junto a la mesa: el método completo dura menos de cuatro minutos y se entiende mejor en vivo que en cualquier texto.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"tone":"linen","heading":"Café para tu método","text":"Grano de origen, tostado para filtrado.","cta":{"label":"Ver cafés","url":"/cafe/"}} /-->
BLOCKS
				,
			),
			'en'         => array(
				'title'            => 'How we brew a pour over at the bar',
				'slug'             => 'how-we-brew-a-pour-over-at-the-bar',
				'excerpt'          => 'Our filter coffee method: ratio, grind, water and patience, step by step.',
				'seo_short'        => 'The bar\'s pour-over method, step by step: ratio, grind, water and time.',
				'meta_description' => 'How a pour over is brewed at the bar: coffee-to-water ratio, grind size, water temperature, bloom and pours, explained step by step so you can repeat it at home.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>The pour over is the most naked preparation there is: hot water, ground coffee and a paper filter. No pressure, no milk, nowhere to hide. That's why it's the cup we most like to serve — and the one that tells a coffee's story best. This is the logic we work with at the bar, laid out so you can repeat it at home.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The ratio: your starting point</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Everything starts with a ratio, not a magic recipe. A good opening range is 1:15 to 1:16 — one gram of coffee for every 15 or 16 of water. In practice: 15 grams of coffee for a 240 millilitre cup. From there, adjust to taste: more coffee for a more intense cup, more water for a lighter one.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Grind and water</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The pour-over grind sits in the middle: something like sea salt, neither powder nor pebbles. If the cup comes out bitter and heavy, grind coarser; if it's thin and sour, grind finer. It's the most powerful lever you have.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Water matters as much as coffee: if you wouldn't drink it on its own, don't brew with it. The ideal temperature lives between 92 and 96 degrees Celsius — in practice, water that boiled and rested for half a minute.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The method, step by step</h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>Rinse the filter with hot water. It removes the paper taste and preheats everything.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Add the ground coffee and level the bed with a gentle tap.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Bloom: pour twice the coffee's weight in water (30 g of water for 15 g of coffee) and wait 30 to 45 seconds. Fresh coffee swells and releases gas; that bubbling is a good sign.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Pour the remaining water in two or three stages, in slow circles from the centre outwards, without touching the filter.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Total brew time should land between 2:30 and 3:30 minutes. Much faster: grind finer. Much slower: grind coarser.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Taste before you measure</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The numbers are scaffolding, not dogma. The only test that counts happens in the cup: is it sweet? Can you tell the notes apart? Does it ask for another sip? If the answer is yes, your recipe is right even if it contradicts the manual. If it's no, change one variable at a time — grind first — and taste again.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>A good pour over isn't measured on a scale but by the simplest question: do I want another cup?</p>
<!-- /wp:paragraph --><cite>Team Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>And if one day you want to watch the process up close, order a pour over at any of our bars and stay by the table: the whole method takes under four minutes and makes more sense live than in any text.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"tone":"linen","heading":"Coffee for your method","text":"Origin beans, roasted for filter.","cta":{"label":"Shop coffee","url":"/cafe/"}} /-->
BLOCKS
				,
			),
		),

		// ------------------------------------------------------------------
		// (c) Locations-as-films philosophy, through the real landmarks.
		// ------------------------------------------------------------------
		array(
			'pair'       => 'intervenir-espacios',
			'date'       => '2026-07-08',
			'categories' => array( 'casa' ),
			'es'         => array(
				'title'            => 'Intervenir espacios: de La Tallera a Casa Gaia',
				'slug'             => 'intervenir-espacios-de-la-tallera-a-casa-gaia',
				'excerpt'          => 'Por qué cada Gramo se piensa como una película: la filosofía detrás de nuestras ocho ubicaciones.',
				'seo_short'        => 'La filosofía de Gramo: cada café se piensa como una película, del set al soundtrack.',
				'meta_description' => 'Intervenimos espacios en donde hace falta buen café: la historia de cómo cada Gramo — La Tallera, Casa Gaia, Teopanzolco, la librería Gandhi — se concibe como una película.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>Hay una frase que usamos desde el principio y que sigue siendo la mejor descripción de lo que hacemos: <em>intervenimos espacios en donde hace falta buen café</em>. No abrimos sucursales; entramos en lugares que ya tienen una historia y les añadimos la nuestra, procurando no pisar la que estaba primero.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Cada ubicación, una película</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Gramo nació de un fundador que venía del cine y otra que venía del diseño gráfico, y eso definió el método: cada ubicación se concibe como una película. Hay un set — el espacio y lo que ya vivía en él —, hay utilería — la barra, las tazas, los objetos que la habitan — y hay soundtrack, porque un lugar también se escucha. Cuando los tres elementos están en su sitio, el café deja de ser un mostrador y se vuelve una escena.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/split-image {"eyebrow":"El método","heading":"Set, utilería, soundtrack"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Primero escuchamos el lugar: qué era, qué es, qué le falta. Después decidimos qué papel juega ahí el café. La barra nunca llega a imponerse; llega a completar.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Del garaje a los museos</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La primera película fue modesta: una barra en un garaje de Cuernavaca, en plena pandemia, junto a Pacífica Panadería en Tulipán 302. De ahí salió el primer Gramo, que hoy vive en versión jardín en Jardines las Delicias.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Las siguientes escenas subieron la apuesta. Gramo 2 se instaló junto a La Tallera, la antigua casa-estudio de David Alfaro Siqueiros convertida en museo: café a la sombra de uno de los muralistas mayores. Gramo 3 entró al Museo Casa Gaia, la antigua casa de Cantinflas en el centro de Cuernavaca, donde la alberca guarda un mural de Diego Rivera y las salas, obra de Tamayo y Toledo; ahí la barra también sirve vino y, algunas noches, jazz en vivo. Gramo 4 abrió en el Centro Cultural Teopanzolco, con la zona arqueológica al lado — pocas tazas se toman con vista a una pirámide.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">La ciudad como segundo acto</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>En la Ciudad de México, el guion siguió igual: buscar lugares con vida propia. Gramo 5 es una barra dentro de la Librería Gandhi de Paseo de las Palmas — libros y café, la coproducción más natural del mundo. Gramo 6, el más reciente, comparte espacio en Polanco con Laguna Cipryen, una boutique de fragancias: aroma de un lado del pasillo, aroma del otro. Y los kioscos 2GO, en Cuernavaca y en Bosques, son la versión de carretera: la misma película, en corto.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>No abrimos sucursales; rodamos en locación.</p>
<!-- /wp:paragraph --><cite>Equipo Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Lo que no cambia</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Cambia el set, cambia la utilería, cambia el soundtrack. Lo que no cambia es lo que se sirve: el mismo café, tratado con el mismo cuidado, en el jardín, en el museo o en el kiosco. Esa es la regla de la casa — la única que no se negocia en ninguna locación.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>Si aún no conoces todas las escenas, el mapa está abierto: ocho ubicaciones entre Cuernavaca y la Ciudad de México, cada una con su propia función.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"heading":"Conoce nuestras ubicaciones","text":"Ocho espacios intervenidos entre Cuernavaca y CDMX.","cta":{"label":"Ver ubicaciones","url":"/ubicaciones/"}} /-->
BLOCKS
				,
			),
			'en'         => array(
				'title'            => 'Intervening spaces: from La Tallera to Casa Gaia',
				'slug'             => 'intervening-spaces-from-la-tallera-to-casa-gaia',
				'excerpt'          => 'Why every Gramo is conceived like a film: the philosophy behind our eight locations.',
				'seo_short'        => 'The Gramo philosophy: every café is conceived like a film, from set to soundtrack.',
				'meta_description' => 'We take good coffee to the spaces missing it: how each Gramo — La Tallera, Casa Gaia, Teopanzolco, the Gandhi bookstore — is conceived like a film.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>There's a phrase we've used from the beginning that remains the best description of what we do: <em>we intervene spaces that are missing good coffee</em>. We don't open branches; we enter places that already have a story and add ours to it, careful not to step on the one that was there first.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Every location, a film</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Gramo was founded by one person who came from film and another who came from graphic design, and that defined the method: every location is conceived like a film. There's a set — the space and what already lived in it —, there are props — the bar, the cups, the objects that inhabit it — and there's a soundtrack, because a place is also something you hear. When all three are in position, the café stops being a counter and becomes a scene.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/split-image {"eyebrow":"The method","heading":"Set, props, soundtrack"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>First we listen to the place: what it was, what it is, what it's missing. Then we decide what part coffee plays there. The bar never arrives to impose; it arrives to complete.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:heading -->
<h2 class="wp-block-heading">From the garage to the museums</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The first film was a modest one: a bar in a Cuernavaca garage, at the height of the pandemic, next to Pacífica Panadería on Tulipán 302. Out of it came the first Gramo, which today lives on in garden form in Jardines las Delicias.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The next scenes raised the stakes. Gramo 2 set up beside La Tallera, the former home and studio of David Alfaro Siqueiros, now a museum: coffee in the shadow of one of the great muralists. Gramo 3 moved into Museo Casa Gaia, the former home of Cantinflas in central Cuernavaca, where the pool holds a Diego Rivera mural and the galleries keep works by Tamayo and Toledo; there the bar pours wine too and, some nights, live jazz. Gramo 4 opened at the Teopanzolco Cultural Centre, the archaeological zone right alongside — few cups are drunk with a view of a pyramid.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The city as second act</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>In Mexico City the script stayed the same: find places with a life of their own. Gramo 5 is a bar inside the Gandhi bookstore on Paseo de las Palmas — books and coffee, the most natural co-production in the world. Gramo 6, the newest, shares its Polanco space with Laguna Cipryen, a fragrance boutique: aroma on one side of the aisle, aroma on the other. And the 2GO kiosks, in Cuernavaca and in Bosques, are the road-movie version: the same film, in short form.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>We don't open branches; we shoot on location.</p>
<!-- /wp:paragraph --><cite>Team Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2 class="wp-block-heading">What doesn't change</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The set changes, the props change, the soundtrack changes. What doesn't change is what gets served: the same coffee, treated with the same care, in the garden, in the museum, at the kiosk. That's the house rule — the only one that isn't negotiable on any location.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>If you haven't seen every scene yet, the map is open: eight locations between Cuernavaca and Mexico City, each running its own show.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"heading":"Visit our locations","text":"Eight intervened spaces between Cuernavaca and CDMX.","cta":{"label":"See locations","url":"/en/locations/"}} /-->
BLOCKS
				,
			),
		),

		// ------------------------------------------------------------------
		// (d) The naming story — Pulp Fiction and Nirvana on the shelf.
		// ------------------------------------------------------------------
		array(
			'pair'       => 'nombres-de-cancion',
			'date'       => '2026-07-22',
			'categories' => array( 'casa' ),
			'es'         => array(
				'title'            => 'Por qué nuestros cafés se llaman como canciones y películas',
				'slug'             => 'por-que-nuestros-cafes-se-llaman-como-canciones-y-peliculas',
				'excerpt'          => 'Vincent Vega, Nevermind, Honey Bunny: la historia detrás de los nombres de nuestro catálogo.',
				'seo_short'        => 'La historia detrás de los nombres de nuestros cafés: Pulp Fiction y Nirvana en la repisa.',
				'meta_description' => 'Vincent Vega, Bad Motherfucker, Nevermind, Grunge Coffee: por qué los cafés de Gramo llevan nombres de Pulp Fiction y de canciones de Nirvana.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>Tarde o temprano alguien lo pregunta en barra, casi siempre con la bolsa en la mano: «¿por qué el café se llama <em>Vincent Vega</em>?». Y la respuesta corta es la mejor: porque en esta casa el café y el cine llegaron juntos.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Una casa fundada en un rodaje detenido</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Gramo existe porque una pandemia detuvo los rodajes. Salo venía del cine; Sara, del diseño gráfico. Cuando el trabajo se paró, montaron una barra de café en un garaje de Cuernavaca, y aquella barra se volvió el primer Gramo. La estética de la casa quedó marcada desde entonces: los espacios se piensan como películas y los cafés, como los créditos de una.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">El reparto: Pulp Fiction</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Buena parte de la repisa sale de una sola película. <em>Vincent Vega</em>, nuestro lavado de Colombia, lleva el nombre del personaje de John Travolta. <em>Honey Bunny</em>, el honey de Huatusco, es la ladrona de la primera escena — y el nombre le queda doblemente bien, porque el proceso honey va en el nombre del café. <em>Marvin's Face</em> y <em>Bad Motherfucker</em> completan el reparto; quien haya visto la película sabe exactamente de qué escena viene cada uno, y quien no, tiene tarea para el fin de semana.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">El soundtrack: Nirvana</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>La otra mitad de los nombres se escucha en vez de verse. <em>Nevermind</em>, nuestro lavado de Burundi, toma el título del disco con el que Nirvana cambió la década. <em>Grunge Coffee</em>, el lavado de Etiopía, lleva el género en el nombre. Y por la tostadora han pasado lotes bautizados <em>Love Buzz</em> y <em>Pennyroyal</em> — más pistas del mismo disco duro.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>Un nombre no cambia lo que hay en la bolsa, pero sí cómo la recuerdas.</p>
<!-- /wp:paragraph --><cite>Equipo Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Por qué funciona</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>El café de especialidad tiene un problema de lenguaje: fichas técnicas impecables que nadie recuerda. Altitudes, variedades, procesos — información necesaria, pero difícil de querer. Un nombre con historia hace el trabajo contrario: te da algo de qué agarrarte. Es más fácil volver por «el Vincent Vega» que por «el lavado de Huila de 1,600 metros», aunque sean exactamente el mismo café.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>La ficha técnica sigue ahí, completa, para quien la busca: productor, altitud, variedad, proceso y notas, en cada bolsa y en cada página del catálogo. El nombre es solo la puerta de entrada — y nos gusta que la puerta tenga algo de música.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>El catálogo rota, así que el reparto cambia con las cosechas. Lo que no cambia es la regla de la casa: primero el café tiene que ser bueno; el nombre llega después, cuando el lote ya se lo ganó.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"heading":"Conoce el reparto completo","text":"Los cafés de la casa, con ficha técnica y todo.","cta":{"label":"Ver el catálogo","url":"/cafe/"}} /-->
BLOCKS
				,
			),
			'en'         => array(
				'title'            => 'Why our coffees are named after songs and films',
				'slug'             => 'why-our-coffees-are-named-after-songs-and-films',
				'excerpt'          => 'Vincent Vega, Nevermind, Honey Bunny: the story behind the names in our catalogue.',
				'seo_short'        => 'The story behind our coffee names: Pulp Fiction and Nirvana on the shelf.',
				'meta_description' => 'Vincent Vega, Bad Motherfucker, Nevermind, Grunge Coffee: why Gramo\'s coffees carry names from Pulp Fiction and Nirvana songs.',
				'content'          => <<<'BLOCKS'
<!-- wp:paragraph -->
<p>Sooner or later someone asks at the bar, usually with the bag already in hand: "why is the coffee called <em>Vincent Vega</em>?" And the short answer is the best one: because in this house, coffee and cinema arrived together.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">A house founded on a halted shoot</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Gramo exists because a pandemic stopped the film shoots. Salo came from cinema; Sara, from graphic design. When the work stopped, they set up a coffee bar in a Cuernavaca garage, and that bar became the first Gramo. The house aesthetic was set from then on: spaces are conceived like films, and the coffees like their closing credits.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The cast: Pulp Fiction</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A good share of the shelf comes from a single film. <em>Vincent Vega</em>, our washed Colombia, carries the name of John Travolta's character. <em>Honey Bunny</em>, the honey-processed lot from Huatusco, is the robber from the opening scene — and the name fits twice over, since the honey process is right there in it. <em>Marvin's Face</em> and <em>Bad Motherfucker</em> complete the cast; anyone who has seen the film knows exactly which scene each one comes from, and anyone who hasn't has homework for the weekend.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The soundtrack: Nirvana</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The other half of the names is heard rather than seen. <em>Nevermind</em>, our washed Burundi, takes its title from the record with which Nirvana changed the decade. <em>Grunge Coffee</em>, the washed Ethiopia, wears the genre in its name. And lots christened <em>Love Buzz</em> and <em>Pennyroyal</em> have passed through the roastery — more tracks from the same hard drive.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>A name doesn't change what's in the bag, but it does change how you remember it.</p>
<!-- /wp:paragraph --><cite>Team Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Why it works</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Specialty coffee has a language problem: impeccable spec sheets nobody remembers. Altitudes, varieties, processes — necessary information, but hard to love. A name with a story does the opposite job: it gives you something to hold on to. It's easier to come back for "the Vincent Vega" than for "the washed Huila at 1,600 metres", even though they're exactly the same coffee.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The spec sheet is still there, complete, for whoever wants it: producer, altitude, variety, process and notes, on every bag and every page of the catalogue. The name is just the doorway — and we like our doorways with a little music in them.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>The catalogue rotates, so the cast changes with the harvests. What doesn't change is the house rule: first the coffee has to be good; the name comes later, once the lot has earned it.</p>
<!-- /wp:paragraph -->

<!-- wp:gramo/cta-band {"heading":"Meet the full cast","text":"The house coffees, spec sheets included.","cta":{"label":"Browse the catalogue","url":"/cafe/"}} /-->
BLOCKS
				,
			),
		),

	),
);
