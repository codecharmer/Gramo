<?php
/**
 * Seed catalogue — WooCommerce products (Gramo Café).
 *
 * The real Gramo catalogue: origin coffees, matcha, and the monthly
 * subscriptions, with exact MXN prices verified against the brand's public
 * shop. Consumed by {@see \Gramo\Core\Setup\Installer::install_products()}.
 *
 * Shape notes:
 *  - `category` must be a slug declared in Installer::CATEGORIES.
 *  - `fields` carries the coffee sheet (origin, process, tasting notes…)
 *    through the {@see \Gramo\Core\Content\Schema} product fields; a `_en`
 *    suffix targets a bilingual field's English sibling.
 *  - `image_key` resolves to data/media/source/{image_key}.jpg — real product
 *    photography from the brand's own shop where available; a branded SVG
 *    placeholder is generated otherwise.
 *  - Out-of-stock lots seed with stock 0 so the storefront mirrors the shop.
 *  - Coffee names are brand names and stay verbatim, expletives included.
 *
 * @package Gramo\Core
 * @return array<int,array<string,mixed>>
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(

	// --- Café en grano: disponibles ------------------------------------.

	array(
		'name'              => 'Marvin\'s Face – Natural de Morelos',
		'slug'              => 'marvins-face',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 350.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-001',
		'short_description' => 'Natural de Morelos: té negro, té limón y flor de jazmín. Bolsa de 250 g.',
		'description'       => 'Un natural cultivado en Morelos, a 1,890 metros, por la familia Meléndez y Córtes. Typica de altura con un perfil que sorprende por lo delicado: té negro, té limón y flor de jazmín en una taza limpia y ligera.

Tueste medio, a cargo de Kurt W en Cuernavaca. Bolsa de 250 g en grano entero.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'marvins-face',
		'image_alt'         => 'Bolsa negra de Marvin\'s Face sobre una superficie oscura, con vegetación desenfocada al fondo.',
		'seo_short'         => 'Café natural de Morelos: Typica a 1,890 msnm con notas de té negro, té limón y jazmín. Tueste medio, 250 g.',
		'meta_description'  => 'Marvin\'s Face, natural de Morelos por Meléndez y Córtes: Typica a 1,890 msnm, notas de té negro, té limón y flor de jazmín. Tueste medio en Cuernavaca. 250 g.',
		'fields'            => array(
			'name_en'        => 'Marvin\'s Face – Natural from Morelos',
			'description_en' => 'A natural grown in Morelos at 1,890 metres by the Meléndez y Córtes family. High-grown Typica with a surprisingly delicate profile: black tea, lemongrass and jasmine blossom in a clean, light cup. Medium roast by Kurt W in Cuernavaca. 250 g whole bean.',
			'origin'         => 'Morelos, México',
			'producer'       => 'Meléndez y Córtes',
			'altitude'       => '1,890 msnm',
			'variety'        => 'Typica',
			'process'        => 'Natural',
			'process_en'     => 'Natural',
			'roast_level'    => 'medio',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Té negro',
					'note_en' => 'Black tea',
				),
				array(
					'note_es' => 'Té limón',
					'note_en' => 'Lemongrass',
				),
				array(
					'note_es' => 'Flor de jazmín',
					'note_en' => 'Jasmine blossom',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Espresso',
					'method_en' => 'Espresso',
				),
				array(
					'method_es' => 'Prensa francesa',
					'method_en' => 'French press',
				),
			),
		),
	),

	array(
		'name'              => 'Vincent Vega – Lavado de Colombia',
		'slug'              => 'vincent-vega',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 450.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-002',
		'short_description' => 'Lavado de Huila, Colombia: kiwi y lichi en taza. Bolsa de 250 g.',
		'description'       => 'Un lavado de Huila, Colombia, producido por Erick Bravo a 1,600 metros. Red Bourbon de proceso limpio y fruta insólita: kiwi y lichi, con la acidez brillante que uno espera de un buen Huila.

Tueste claro, firmado por Flowerchild, tostadores invitados desde California. Bolsa de 250 g en grano entero.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'vincent-vega',
		'image_alt'         => 'Bolsa negra de Vincent Vega sobre una mesa húmeda, con un jardín desenfocado detrás.',
		'seo_short'         => 'Lavado de Huila, Colombia: Red Bourbon a 1,600 msnm con notas de kiwi y lichi. Tueste claro por Flowerchild. 250 g.',
		'meta_description'  => 'Vincent Vega, lavado de Colombia por Erick Bravo: Red Bourbon de Huila a 1,600 msnm con notas de kiwi y lichi. Tueste claro de Flowerchild, California. 250 g.',
		'fields'            => array(
			'name_en'        => 'Vincent Vega – Washed Colombia',
			'description_en' => 'A washed coffee from Huila, Colombia, produced by Erick Bravo at 1,600 metres. Red Bourbon with a clean process and unusual fruit: kiwi and lychee, carried by the bright acidity you expect from a good Huila. Light roast by Flowerchild, guest roasters from California. 250 g whole bean.',
			'origin'         => 'Huila, Colombia',
			'producer'       => 'Erick Bravo',
			'altitude'       => '1,600 msnm',
			'variety'        => 'Red Bourbon',
			'process'        => 'Lavado',
			'process_en'     => 'Washed',
			'roast_level'    => 'ligero',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Kiwi',
					'note_en' => 'Kiwi',
				),
				array(
					'note_es' => 'Lichi',
					'note_en' => 'Lychee',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Chemex',
					'method_en' => 'Chemex',
				),
				array(
					'method_es' => 'Aeropress',
					'method_en' => 'Aeropress',
				),
			),
		),
	),

	array(
		'name'              => 'Bad Motherfucker – Lavado de Ecuador',
		'slug'              => 'bad-motherfucker',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 450.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-003',
		'short_description' => 'Lavado de Hacienda La Papaya, Ecuador: guayaba, naranja y uva. Bolsa de 250 g.',
		'description'       => 'De Hacienda La Papaya, la finca de Juan Peña en Ecuador, entre 1,800 y 2,100 metros. Typica Mejorado con un lavado poco común — inoculación de levadura — que abre la fruta por completo: guayaba, naranja y uva.

Tueste claro, a cargo de Hydrangea, tostadores invitados. Bolsa de 250 g en grano entero.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'bad-motherfucker',
		'image_alt'         => 'Bolsa blanca de Bad MF sobre una banca amarilla, al aire libre.',
		'seo_short'         => 'Lavado de Ecuador: Typica Mejorado de Hacienda La Papaya, con levadura inoculada. Guayaba, naranja y uva. 250 g.',
		'meta_description'  => 'Bad Motherfucker, lavado de Ecuador de Juan Peña, Hacienda La Papaya: Typica Mejorado a 1,800–2,100 msnm, lavado con inoculación de levadura. Guayaba, naranja y uva. 250 g.',
		'fields'            => array(
			'name_en'        => 'Bad Motherfucker – Washed Ecuador',
			'description_en' => 'From Hacienda La Papaya, Juan Peña\'s farm in Ecuador, between 1,800 and 2,100 metres. Typica Mejorado with an uncommon washed process — yeast inoculation — that opens the fruit right up: guava, orange and grape. Light roast by guest roasters Hydrangea. 250 g whole bean.',
			'origin'         => 'Hacienda La Papaya, Ecuador',
			'producer'       => 'Juan Peña',
			'altitude'       => '1,800–2,100 msnm',
			'variety'        => 'Typica Mejorado',
			'process'        => 'Lavado con inoculación de levadura',
			'process_en'     => 'Washed with yeast inoculation',
			'roast_level'    => 'ligero',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Guayaba',
					'note_en' => 'Guava',
				),
				array(
					'note_es' => 'Naranja',
					'note_en' => 'Orange',
				),
				array(
					'note_es' => 'Uva',
					'note_en' => 'Grape',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Chemex',
					'method_en' => 'Chemex',
				),
				array(
					'method_es' => 'Aeropress',
					'method_en' => 'Aeropress',
				),
			),
		),
	),

	array(
		'name'              => 'Overdose – Natural de Colima',
		'slug'              => 'overdose',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 350.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-004',
		'short_description' => 'Natural de Colima: chocolate con leche, fresa y yogurt. Bolsa de 250 g.',
		'description'       => 'Un natural mexicano de Colima, producido por Hugo Salazar a 1,450 metros. Typica y Bourbon en un perfil goloso y redondo: chocolate con leche, fresa y yogurt — el café de todos los días con algo más que contar.

Tueste medio por Kurt W. Bolsa de 250 g en grano entero.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'overdose',
		'image_alt'         => 'Bolsa blanca de Overdose junto a una jarra que sirve café en una taza azul.',
		'seo_short'         => 'Natural de Colima: Typica y Bourbon a 1,450 msnm con notas de chocolate con leche, fresa y yogurt. 250 g.',
		'meta_description'  => 'Overdose, natural de Colima por Hugo Salazar: Typica y Bourbon a 1,450 msnm con notas de chocolate con leche, fresa y yogurt. Tueste medio. Bolsa de 250 g.',
		'fields'            => array(
			'name_en'        => 'Overdose – Natural from Colima',
			'description_en' => 'A Mexican natural from Colima, produced by Hugo Salazar at 1,450 metres. Typica and Bourbon in a round, indulgent profile: milk chocolate, strawberry and yogurt — an everyday coffee with something extra to say. Medium roast by Kurt W. 250 g whole bean.',
			'origin'         => 'Colima, México',
			'producer'       => 'Hugo Salazar',
			'altitude'       => '1,450 msnm',
			'variety'        => 'Typica y Bourbon',
			'process'        => 'Natural',
			'process_en'     => 'Natural',
			'roast_level'    => 'medio',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Chocolate con leche',
					'note_en' => 'Milk chocolate',
				),
				array(
					'note_es' => 'Fresa',
					'note_en' => 'Strawberry',
				),
				array(
					'note_es' => 'Yogurt',
					'note_en' => 'Yogurt',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Espresso',
					'method_en' => 'Espresso',
				),
				array(
					'method_es' => 'Prensa francesa',
					'method_en' => 'French press',
				),
			),
		),
	),

	array(
		'name'              => 'La Batalla – Lavado de Veracruz',
		'slug'              => 'la-batalla',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 300.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-005',
		'short_description' => 'Lavado de Xico, Veracruz: almendra, caramelo y mantequilla. Bolsa de 250 g.',
		'description'       => 'Nuestro lavado de casa, cultivado en Xico, en la sierra cafetalera de Veracruz. Una taza amable y constante — almendra, caramelo y mantequilla — hecha para acompañar la mañana sin pedir permiso.

Tueste medio de Gramo Coffee Roasters, nuestro sello propio en la Ciudad de México. Bolsa de 250 g; también disponible en presentación de 1 kg.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'la-batalla',
		'image_alt'         => 'Dos manos sosteniendo la bolsa negra de La Batalla.',
		'seo_short'         => 'Lavado de Xico, Veracruz: almendra, caramelo y mantequilla. Tueste medio de Gramo Coffee Roasters. 250 g.',
		'meta_description'  => 'La Batalla, lavado de Xico, Veracruz: notas de almendra, caramelo y mantequilla. Tueste medio de Gramo Coffee Roasters, CDMX. Bolsa de 250 g en grano entero.',
		'fields'            => array(
			'name_en'        => 'La Batalla – Washed Veracruz',
			'description_en' => 'Our house washed coffee, grown in Xico, in the coffee highlands of Veracruz. A kind, steady cup — almond, caramel and butter — made to carry the morning without asking permission. Medium roast by Gramo Coffee Roasters, our own label in Mexico City. 250 g bag; also available in a 1 kg format.',
			'origin'         => 'Xico, Veracruz',
			'process'        => 'Lavado',
			'process_en'     => 'Washed',
			'roast_level'    => 'medio',
			'availability'   => 'permanente',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Almendra',
					'note_en' => 'Almond',
				),
				array(
					'note_es' => 'Caramelo',
					'note_en' => 'Caramel',
				),
				array(
					'note_es' => 'Mantequilla',
					'note_en' => 'Butter',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Espresso',
					'method_en' => 'Espresso',
				),
				array(
					'method_es' => 'Prensa francesa',
					'method_en' => 'French press',
				),
			),
		),
	),

	array(
		'name'              => '1 KG La Batalla – Lavado de Veracruz',
		'slug'              => 'la-batalla-1kg',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 750.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-006',
		'short_description' => 'La Batalla en formato de 1 kg: el lavado de casa para no quedarse sin café.',
		'description'       => 'La misma Batalla — lavado de Xico, Veracruz, con notas de almendra, caramelo y mantequilla — en bolsa de un kilo. Para casas donde el café se acaba rápido, oficinas y cafeteras generosas.

Tueste medio de Gramo Coffee Roasters, CDMX.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'la-batalla-1kg',
		'image_alt'         => 'Bolsa de papel kraft de un kilo de La Batalla, con el logotipo de Gramo impreso.',
		'seo_short'         => 'La Batalla en bolsa de 1 kg: lavado de Xico, Veracruz. Almendra, caramelo y mantequilla. Tueste medio.',
		'meta_description'  => 'La Batalla en formato de 1 kg: lavado de Xico, Veracruz con notas de almendra, caramelo y mantequilla. Tueste medio de Gramo Coffee Roasters, CDMX.',
		'fields'            => array(
			'name_en'        => '1 KG La Batalla – Washed Veracruz',
			'description_en' => 'The same Batalla — washed from Xico, Veracruz, with notes of almond, caramel and butter — in a one-kilo bag. For households where coffee goes fast, for offices, and for generous brewers. Medium roast by Gramo Coffee Roasters, CDMX.',
			'origin'         => 'Xico, Veracruz',
			'process'        => 'Lavado',
			'process_en'     => 'Washed',
			'roast_level'    => 'medio',
			'availability'   => 'permanente',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Almendra',
					'note_en' => 'Almond',
				),
				array(
					'note_es' => 'Caramelo',
					'note_en' => 'Caramel',
				),
				array(
					'note_es' => 'Mantequilla',
					'note_en' => 'Butter',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Espresso',
					'method_en' => 'Espresso',
				),
				array(
					'method_es' => 'Prensa francesa',
					'method_en' => 'French press',
				),
			),
		),
	),

	// --- Matcha y más ---------------------------------------------------.

	array(
		'name'              => 'Matcha Gramo – de Japón',
		'slug'              => 'matcha-gramo',
		'category'          => 'otros',
		'regular_price'     => 650.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-OTRO-001',
		'short_description' => 'Matcha puro de alto grado, traído de Japón. Lata de 100 g.',
		'description'       => 'Nuestro matcha de casa: puro, de alto grado y de origen japonés. El mismo que servimos en barra, para prepararlo en casa como más te guste — batido con agua o como matcha latte.

Presentación de 100 g.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'matcha-gramo',
		'image_alt'         => 'Bolsa color crema de Matcha Gramo entre plantas.',
		'seo_short'         => 'Matcha puro de alto grado, de Japón. El mismo que servimos en barra, en presentación de 100 g.',
		'meta_description'  => 'Matcha Gramo: matcha puro de alto grado traído de Japón, el mismo que servimos en nuestras barras. Presentación de 100 g para preparar en casa.',
		'fields'            => array(
			'name_en'        => 'Matcha Gramo – from Japan',
			'description_en' => 'Our house matcha: pure, high grade, and Japanese in origin. The same one we serve at the bar, ready to prepare at home however you like it — whisked with water or as a matcha latte. 100 g tin.',
			'origin'         => 'Japón',
			'availability'   => 'permanente',
		),
	),

	// --- Café en grano: lotes agotados (se muestran como tal) -----------.

	array(
		'name'              => 'Red Apple – Bourbon Rojo Lavado de Burundi',
		'slug'              => 'red-apple',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 450.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-007',
		'short_description' => 'Lavado de Kayanza, Burundi: frutos rojos, crema batida y manzana Pink Lady. Agotado.',
		'description'       => 'Un Bourbon Rojo lavado de Kayanza, Burundi, cultivado entre 1,850 y 2,100 metros. En taza: frutos rojos, crema batida y manzana Pink Lady — el lote que le dio nombre al café.

Bolsa de 250 g. Por ahora agotado; los lotes de temporada rotan conforme llegan.',
		'stock'             => 0,
		'manage_stock'      => true,
		'image_key'         => 'red-apple',
		'image_alt'         => 'Bolsa de café Red Apple, lavado de Burundi.',
		'seo_short'         => 'Bourbon Rojo lavado de Kayanza, Burundi: frutos rojos, crema batida y manzana Pink Lady. 250 g.',
		'meta_description'  => 'Red Apple, Bourbon Rojo lavado de Kayanza, Burundi, cultivado a 1,850–2,100 msnm. Notas de frutos rojos, crema batida y manzana Pink Lady. Bolsa de 250 g.',
		'fields'            => array(
			'name_en'        => 'Red Apple – Washed Red Bourbon from Burundi',
			'description_en' => 'A washed Red Bourbon from Kayanza, Burundi, grown between 1,850 and 2,100 metres. In the cup: red berries, whipped cream and Pink Lady apple — the lot that named the coffee. 250 g bag. Sold out for now; seasonal lots rotate as they arrive.',
			'origin'         => 'Kayanza, Burundi',
			'altitude'       => '1,850–2,100 msnm',
			'variety'        => 'Bourbon Rojo',
			'process'        => 'Lavado',
			'process_en'     => 'Washed',
			'roast_level'    => 'ligero',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Frutos rojos',
					'note_en' => 'Red berries',
				),
				array(
					'note_es' => 'Crema batida',
					'note_en' => 'Whipped cream',
				),
				array(
					'note_es' => 'Manzana Pink Lady',
					'note_en' => 'Pink Lady apple',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Chemex',
					'method_en' => 'Chemex',
				),
				array(
					'method_es' => 'Aeropress',
					'method_en' => 'Aeropress',
				),
			),
		),
	),

	array(
		'name'              => 'Grunge Coffee – Lavado de Etiopía',
		'slug'              => 'grunge-coffee',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 420.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-008',
		'short_description' => 'Lavado de Guji, Etiopía: mandarina, frambuesa y flores amarillas. Agotado.',
		'description'       => 'Un lavado de Guji, Etiopía, producido por Tagel Alemayehu con variedades Kurume y Dega. La taza es puro origen etíope: mandarina, frambuesa y flores amarillas, con esa transparencia que solo dan los lavados de altura.

Bolsa de 250 g. Por ahora agotado; los lotes de temporada rotan conforme llegan.',
		'stock'             => 0,
		'manage_stock'      => true,
		'image_key'         => 'grunge-coffee',
		'image_alt'         => 'Bolsa de café Grunge Coffee, lavado de Etiopía.',
		'seo_short'         => 'Lavado de Guji, Etiopía: Kurume y Dega con notas de mandarina, frambuesa y flores amarillas. 250 g.',
		'meta_description'  => 'Grunge Coffee, lavado de Guji, Etiopía, por Tagel Alemayehu: variedades Kurume y Dega, notas de mandarina, frambuesa y flores amarillas. Bolsa de 250 g.',
		'fields'            => array(
			'name_en'        => 'Grunge Coffee – Washed Ethiopia',
			'description_en' => 'A washed coffee from Guji, Ethiopia, produced by Tagel Alemayehu from Kurume and Dega varieties. The cup is pure Ethiopian origin: mandarin, raspberry and yellow flowers, with the clarity only high-grown washed lots deliver. 250 g bag. Sold out for now; seasonal lots rotate as they arrive.',
			'origin'         => 'Guji, Etiopía',
			'producer'       => 'Tagel Alemayehu',
			'variety'        => 'Kurume y Dega',
			'process'        => 'Lavado',
			'process_en'     => 'Washed',
			'roast_level'    => 'ligero',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Mandarina',
					'note_en' => 'Mandarin',
				),
				array(
					'note_es' => 'Frambuesa',
					'note_en' => 'Raspberry',
				),
				array(
					'note_es' => 'Flores amarillas',
					'note_en' => 'Yellow flowers',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Chemex',
					'method_en' => 'Chemex',
				),
				array(
					'method_es' => 'Aeropress',
					'method_en' => 'Aeropress',
				),
			),
		),
	),

	array(
		'name'              => 'Nevermind – Lavado de Burundi',
		'slug'              => 'nevermind',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 420.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-009',
		'short_description' => 'Lavado de Murumvya, Burundi: naranja, floral y uvas. Agotado.',
		'description'       => 'Un Bourbon Rojo lavado de Murumvya, Burundi. En taza, naranja y uvas sobre un fondo floral: un lavado africano clásico, elegante y sin estridencias.

Bolsa de 250 g. Por ahora agotado; los lotes de temporada rotan conforme llegan.',
		'stock'             => 0,
		'manage_stock'      => true,
		'image_key'         => 'nevermind',
		'image_alt'         => 'Bolsa de café Nevermind, lavado de Burundi.',
		'seo_short'         => 'Bourbon Rojo lavado de Murumvya, Burundi: naranja, notas florales y uvas. Bolsa de 250 g.',
		'meta_description'  => 'Nevermind, lavado de Murumvya, Burundi: Bourbon Rojo con notas de naranja, flores y uvas. Un lavado africano clásico y elegante. Bolsa de 250 g.',
		'fields'            => array(
			'name_en'        => 'Nevermind – Washed Burundi',
			'description_en' => 'A washed Red Bourbon from Murumvya, Burundi. In the cup, orange and grapes over a floral base: a classic African washed coffee, elegant and unshowy. 250 g bag. Sold out for now; seasonal lots rotate as they arrive.',
			'origin'         => 'Murumvya, Burundi',
			'variety'        => 'Bourbon Rojo',
			'process'        => 'Lavado',
			'process_en'     => 'Washed',
			'roast_level'    => 'ligero',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Naranja',
					'note_en' => 'Orange',
				),
				array(
					'note_es' => 'Floral',
					'note_en' => 'Floral',
				),
				array(
					'note_es' => 'Uvas',
					'note_en' => 'Grapes',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Chemex',
					'method_en' => 'Chemex',
				),
				array(
					'method_es' => 'Aeropress',
					'method_en' => 'Aeropress',
				),
			),
		),
	),

	array(
		'name'              => 'Honey Bunny – Natural Honey de Huatusco',
		'slug'              => 'honey-bunny',
		'category'          => 'cafe-en-grano',
		'regular_price'     => 350.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-CAFE-010',
		'short_description' => 'Natural honey de Huatusco, Veracruz: fresa, frutos rojos y yogurt. Agotado.',
		'description'       => 'Un honey de Huatusco, en la región cafetalera de Veracruz. El proceso deja fruta y dulzor por todas partes: fresa, frutos rojos y yogurt en una taza cremosa y fácil de querer.

Bolsa de 250 g. Por ahora agotado; los lotes de temporada rotan conforme llegan.',
		'stock'             => 0,
		'manage_stock'      => true,
		'image_key'         => 'honey-bunny',
		'image_alt'         => 'Bolsa de café Honey Bunny, natural honey de Huatusco.',
		'seo_short'         => 'Natural honey de Huatusco, Veracruz: fresa, frutos rojos y yogurt en taza. Bolsa de 250 g.',
		'meta_description'  => 'Honey Bunny, natural honey de Huatusco, Veracruz: notas de fresa, frutos rojos y yogurt en una taza cremosa. Bolsa de 250 g en grano entero.',
		'fields'            => array(
			'name_en'        => 'Honey Bunny – Natural Honey from Huatusco',
			'description_en' => 'A honey-processed coffee from Huatusco, in the coffee country of Veracruz. The process leaves fruit and sweetness everywhere: strawberry, red berries and yogurt in a creamy, easy-to-love cup. 250 g bag. Sold out for now; seasonal lots rotate as they arrive.',
			'origin'         => 'Huatusco, Veracruz',
			'process'        => 'Natural honey',
			'process_en'     => 'Natural honey',
			'roast_level'    => 'medio',
			'availability'   => 'temporada',
			'tasting_notes'  => array(
				array(
					'note_es' => 'Fresa',
					'note_en' => 'Strawberry',
				),
				array(
					'note_es' => 'Frutos rojos',
					'note_en' => 'Red berries',
				),
				array(
					'note_es' => 'Yogurt',
					'note_en' => 'Yogurt',
				),
			),
			'brew_methods'   => array(
				array(
					'method_es' => 'Filtrado (V60)',
					'method_en' => 'Pour over (V60)',
				),
				array(
					'method_es' => 'Espresso',
					'method_en' => 'Espresso',
				),
				array(
					'method_es' => 'Prensa francesa',
					'method_en' => 'French press',
				),
			),
		),
	),

	// --- Suscripciones --------------------------------------------------.

	array(
		'name'              => 'Suscripción de Café Mensual 250-300gr',
		'slug'              => 'suscripcion-mensual-250',
		'category'          => 'suscripciones',
		'regular_price'     => 399.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-SUB-001',
		'short_description' => 'Cada mes, un origen distinto en bolsa de 250–300 g, con stickers y sorpresas de la casa.',
		'description'       => 'La forma más sencilla de no quedarse sin café: cada mes te preparamos una bolsa de 250 a 300 gramos con un origen distinto, elegido por nuestro equipo entre lo que mejor está llegando a la tostadora.

Cada entrega viene acompañada de stickers y detalles de la casa. Sin permanencia: pausas o cancelas cuando quieras.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'suscripcion-mensual-250',
		'image_alt'         => 'Dos bolsas de café de Gramo sobre la barra de madera de una cafetería.',
		'seo_short'         => 'Suscripción mensual: 250–300 g de un origen distinto cada mes, con stickers y sorpresas de la casa.',
		'meta_description'  => 'Suscripción de café mensual Gramo: una bolsa de 250–300 g con un origen distinto cada mes, más stickers y detalles de la casa. Pausa o cancela cuando quieras.',
		'fields'            => array(
			'name_en'               => 'Monthly Coffee Subscription 250–300 g',
			'description_en'        => 'The simplest way to never run out of coffee: each month we pack a 250 to 300 gram bag of a different origin, chosen by our team from the best arriving at the roastery. Every delivery comes with stickers and small extras from the house. No lock-in: pause or cancel whenever you like.',
			'availability'          => 'permanente',
			'subscription_interval' => 'mensual',
		),
	),

	array(
		'name'              => 'Suscripción de Café Mensual 600gr',
		'slug'              => 'suscripcion-mensual-600',
		'category'          => 'suscripciones',
		'regular_price'     => 899.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-SUB-002',
		'short_description' => 'Cada mes, 600 g de café de orígenes distintos, con stickers y sorpresas de la casa.',
		'description'       => 'Para quienes toman café en serio — o en compañía: 600 gramos al mes, con orígenes que van rotando según lo que mejor está llegando a la tostadora.

Cada entrega viene acompañada de stickers y detalles de la casa. Sin permanencia: pausas o cancelas cuando quieras.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'suscripcion-mensual-600',
		'image_alt'         => 'Varias bolsas de café de Gramo alineadas junto a la ventana de una cafetería.',
		'seo_short'         => 'Suscripción mensual de 600 g: orígenes en rotación cada mes, con stickers y sorpresas de la casa.',
		'meta_description'  => 'Suscripción de café mensual Gramo de 600 g: orígenes distintos en rotación cada mes, más stickers y detalles de la casa. Pausa o cancela cuando quieras.',
		'fields'            => array(
			'name_en'               => 'Monthly Coffee Subscription 600 g',
			'description_en'        => 'For those who take their coffee seriously — or share it: 600 grams a month, with origins that rotate according to what is arriving best at the roastery. Every delivery comes with stickers and small extras from the house. No lock-in: pause or cancel whenever you like.',
			'availability'          => 'permanente',
			'subscription_interval' => 'mensual',
		),
	),

	array(
		'name'              => 'Suscripción de Café Mensual 1KG PREMIUM',
		'slug'              => 'suscripcion-mensual-1kg',
		'category'          => 'suscripciones',
		'regular_price'     => 1299.00,
		'price_is_estimate' => false,
		'sku'               => 'GRAMO-SUB-003',
		'short_description' => 'Un kilo al mes de nuestra selección premium, con stickers y sorpresas de la casa.',
		'description'       => 'La suscripción mayor: un kilo de café al mes de nuestra selección premium, con orígenes que rotan entre lo más destacado que pasa por la tostadora.

Cada entrega viene acompañada de stickers y detalles de la casa. Sin permanencia: pausas o cancelas cuando quieras.',
		'stock'             => 100,
		'manage_stock'      => true,
		'image_key'         => 'suscripcion-mensual-1kg',
		'image_alt'         => 'Bolsas de café en la barra de una cafetería, con una barista trabajando al fondo.',
		'seo_short'         => 'Suscripción premium: 1 kg al mes de nuestra selección, con orígenes en rotación y sorpresas de la casa.',
		'meta_description'  => 'Suscripción de café mensual premium Gramo: un kilo al mes de nuestra selección, con orígenes en rotación, stickers y detalles de la casa. Cancela cuando quieras.',
		'fields'            => array(
			'name_en'               => 'Monthly Coffee Subscription 1 KG Premium',
			'description_en'        => 'The big one: a kilo of coffee each month from our premium selection, with origins rotating through the most remarkable lots passing through the roastery. Every delivery comes with stickers and small extras from the house. No lock-in: pause or cancel whenever you like.',
			'availability'          => 'permanente',
			'subscription_interval' => 'mensual',
		),
	),

);
