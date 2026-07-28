<?php
/**
 * Seed content — Menú (secciones + artículos).
 *
 * Consumed by {@see \Gramo\Core\Setup\ContentSeeder::install_menu()}.
 * Prices are real menu prices in MXN verified against the brand's public
 * delivery listings (which may carry platform markup — editors adjust in
 * Menú as needed). Pastelería pieces intentionally carry no price: none was
 * verifiable, and we never guess prices.
 *
 * Descriptions stay deliberately spare: only what the real menu states, plus
 * neutral definitional copy for universal drinks. Composed dishes whose
 * ingredients are not public are left without a description for editors to
 * complete.
 *
 * @package Gramo\Core
 * @return array<string,mixed>
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(

	'sections' => array(
		array(
			'slug'    => 'cafe',
			'name'    => 'Café',
			'name_en' => 'Coffee',
		),
		array(
			'slug'    => 'bebidas',
			'name'    => 'Bebidas',
			'name_en' => 'Drinks',
		),
		array(
			'slug'    => 'alimentos',
			'name'    => 'Alimentos',
			'name_en' => 'Food',
		),
		array(
			'slug'    => 'pasteleria',
			'name'    => 'Pastelería',
			'name_en' => 'Pastry',
		),
	),

	'items'    => array(

		// --- Café -------------------------------------------------------.
		array(
			'title'   => 'Café del Día',
			'slug'    => 'cafe-del-dia',
			'section' => 'cafe',
			'order'   => 10,
			'fields'  => array(
				'name_en'        => 'Coffee of the Day',
				'description'    => 'Café negro estilo americano.',
				'description_en' => 'Black coffee, American style.',
				'price'          => 65,
				'featured'       => true,
			),
		),
		array(
			'title'   => 'Espresso',
			'slug'    => 'espresso',
			'section' => 'cafe',
			'order'   => 20,
			'fields'  => array(
				'name_en' => 'Espresso',
				'price'   => 70,
			),
		),
		array(
			'title'   => 'Filtrado',
			'slug'    => 'filtrado',
			'section' => 'cafe',
			'order'   => 30,
			'fields'  => array(
				'name_en'        => 'Pour Over',
				'description'    => 'Café negro filtrado, preparado en barra.',
				'description_en' => 'Black filter coffee, brewed at the bar.',
				'price'          => 80,
				'featured'       => true,
			),
		),
		array(
			'title'   => 'Flat White',
			'slug'    => 'flat-white',
			'section' => 'cafe',
			'order'   => 40,
			'fields'  => array(
				'name_en' => 'Flat White',
				'price'   => 80,
			),
		),
		array(
			'title'   => 'Capuccino',
			'slug'    => 'capuccino',
			'section' => 'cafe',
			'order'   => 50,
			'fields'  => array(
				'name_en' => 'Cappuccino',
				'price'   => 90,
			),
		),
		array(
			'title'   => 'Mocha',
			'slug'    => 'mocha',
			'section' => 'cafe',
			'order'   => 60,
			'fields'  => array(
				'name_en' => 'Mocha',
				'price'   => 95,
			),
		),
		array(
			'title'   => 'Latte',
			'slug'    => 'latte',
			'section' => 'cafe',
			'order'   => 70,
			'fields'  => array(
				'name_en'        => 'Latte',
				'description'    => 'De 16 oz, con base a elegir.',
				'description_en' => 'A 16 oz latte with your choice of base.',
				'price'          => 100,
				'price_note'     => '16 oz',
				'price_note_en'  => '16 oz',
			),
		),

		// --- Bebidas ----------------------------------------------------.
		array(
			'title'   => 'Chocolate',
			'slug'    => 'chocolate',
			'section' => 'bebidas',
			'order'   => 10,
			'fields'  => array(
				'name_en' => 'Hot Chocolate',
				'price'   => 85,
			),
		),
		array(
			'title'   => 'Cáscara Mojito',
			'slug'    => 'cascara-mojito',
			'section' => 'bebidas',
			'order'   => 20,
			'fields'  => array(
				'name_en'        => 'Cascara Mojito',
				'description'    => 'Cáscara de café, limón, mascabado, menta y agua mineral.',
				'description_en' => 'Coffee-cherry cascara, lime, muscovado, mint and sparkling water.',
				'price'          => 95,
				'featured'       => true,
			),
		),
		array(
			'title'   => 'Cáscara Funky',
			'slug'    => 'cascara-funky',
			'section' => 'bebidas',
			'order'   => 30,
			'fields'  => array(
				'name_en'        => 'Cascara Funky',
				'description'    => 'Cáscara de café con jengibre.',
				'description_en' => 'Coffee-cherry cascara with ginger.',
				'price'          => 95,
			),
		),
		array(
			'title'   => 'Chai',
			'slug'    => 'chai',
			'section' => 'bebidas',
			'order'   => 40,
			'fields'  => array(
				'name_en' => 'Chai',
				'price'   => 95,
			),
		),
		array(
			'title'   => 'Chai Sucio',
			'slug'    => 'chai-sucio',
			'section' => 'bebidas',
			'order'   => 50,
			'fields'  => array(
				'name_en'        => 'Dirty Chai',
				'description'    => 'Chai con un shot de espresso.',
				'description_en' => 'Chai with a shot of espresso.',
				'price'          => 95,
			),
		),
		array(
			'title'   => 'Golden Milk',
			'slug'    => 'golden-milk',
			'section' => 'bebidas',
			'order'   => 60,
			'fields'  => array(
				'name_en' => 'Golden Milk',
				'price'   => 95,
			),
		),
		array(
			'title'   => 'Matcha',
			'slug'    => 'matcha',
			'section' => 'bebidas',
			'order'   => 70,
			'fields'  => array(
				'name_en' => 'Matcha',
				'price'   => 95,
			),
		),
		array(
			'title'   => 'Cold Brew',
			'slug'    => 'cold-brew',
			'section' => 'bebidas',
			'order'   => 80,
			'fields'  => array(
				'name_en' => 'Cold Brew',
				'price'   => 95,
			),
		),

		// --- Alimentos --------------------------------------------------.
		array(
			'title'   => 'Ensalada Uno',
			'slug'    => 'ensalada-uno',
			'section' => 'alimentos',
			'order'   => 10,
			'fields'  => array(
				'name_en' => 'Salad One',
				'price'   => 190,
			),
		),
		array(
			'title'   => 'Ensalada Dos',
			'slug'    => 'ensalada-dos',
			'section' => 'alimentos',
			'order'   => 20,
			'fields'  => array(
				'name_en' => 'Salad Two',
				'price'   => 190,
			),
		),
		array(
			'title'   => 'Toast Aguacate',
			'slug'    => 'toast-aguacate',
			'section' => 'alimentos',
			'order'   => 30,
			'fields'  => array(
				'name_en' => 'Avocado Toast',
				'price'   => 170,
			),
		),
		array(
			'title'   => 'Toast Brie con Hogaza',
			'slug'    => 'toast-brie-con-hogaza',
			'section' => 'alimentos',
			'order'   => 40,
			'fields'  => array(
				'name_en' => 'Brie Toast on Sourdough Loaf',
				'price'   => 150,
			),
		),
		array(
			'title'   => 'Pan Pita con Queso',
			'slug'    => 'pan-pita-con-queso',
			'section' => 'alimentos',
			'order'   => 50,
			'fields'  => array(
				'name_en' => 'Pita Bread with Cheese',
				'price'   => 130,
			),
		),
		array(
			'title'   => 'Yogurt Uno',
			'slug'    => 'yogurt-uno',
			'section' => 'alimentos',
			'order'   => 60,
			'fields'  => array(
				'name_en' => 'Yogurt One',
				'price'   => 130,
			),
		),
		array(
			'title'   => 'Yogurt Dos',
			'slug'    => 'yogurt-dos',
			'section' => 'alimentos',
			'order'   => 70,
			'fields'  => array(
				'name_en' => 'Yogurt Two',
				'price'   => 130,
			),
		),
		array(
			'title'   => 'Blend Nueces',
			'slug'    => 'blend-nueces',
			'section' => 'alimentos',
			'order'   => 80,
			'fields'  => array(
				'name_en' => 'Nut Blend',
				'price'   => 95,
			),
		),
		array(
			'title'   => 'Blend Aceitunas',
			'slug'    => 'blend-aceitunas',
			'section' => 'alimentos',
			'order'   => 90,
			'fields'  => array(
				'name_en' => 'Olive Blend',
				'price'   => 95,
			),
		),
		array(
			'title'   => 'Croissant de Champiñón',
			'slug'    => 'croissant-de-champinon',
			'section' => 'alimentos',
			'order'   => 100,
			'fields'  => array(
				'name_en' => 'Mushroom Croissant',
				'price'   => 150,
			),
		),
		array(
			'title'   => 'Croissant de Espinaca',
			'slug'    => 'croissant-de-espinaca',
			'section' => 'alimentos',
			'order'   => 110,
			'fields'  => array(
				'name_en' => 'Spinach Croissant',
				'price'   => 150,
			),
		),
		array(
			'title'   => 'Croissant de Provolone',
			'slug'    => 'croissant-de-provolone',
			'section' => 'alimentos',
			'order'   => 120,
			'fields'  => array(
				'name_en' => 'Provolone Croissant',
				'price'   => 156,
			),
		),

		// --- Pastelería (sin precios verificables) ----------------------.
		array(
			'title'   => 'Choco Monte',
			'slug'    => 'choco-monte',
			'section' => 'pasteleria',
			'order'   => 10,
			'fields'  => array(
				'name_en'        => 'Choco Monte',
				'description'    => 'La pieza insignia de Gramo 3.',
				'description_en' => 'The signature piece at Gramo 3.',
				'featured'       => true,
			),
		),
		array(
			'title'   => 'Pan dulce de Pacífica',
			'slug'    => 'pan-dulce-de-pacifica',
			'section' => 'pasteleria',
			'order'   => 20,
			'fields'  => array(
				'name_en'        => 'Sweet Breads from Pacífica',
				'description'    => 'Panqué de limón con amapola, rol de almendra y rol de canela, de nuestra panadería hermana Pacífica.',
				'description_en' => 'Lemon-poppy seed loaf, almond roll and cinnamon roll from our sister bakery, Pacífica.',
			),
		),

	),
);
