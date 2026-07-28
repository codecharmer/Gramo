<?php
/**
 * Pattern: Mayoreo.
 *
 * Estructura: hero compacto + sección editorial + cifras + formulario de mayoreo.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'   => __( 'Mayoreo', 'gramo-core' ),
	'content' => '<!-- wp:gramo/hero {"eyebrow":"Mayoreo","heading":"Café para mesas que cuidan el detalle","height":"compact"} /-->

<!-- wp:gramo/split-image {"eyebrow":"Cómo trabajamos","heading":"Acompañamiento, no solo suministro"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Calibración, formación de barra y tueste a medida para restaurantes y cafeterías.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Entregas semanales de tueste reciente</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Formación continua para tu equipo</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Perfiles a la medida de tu carta</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/stats {"heading":"Nuestra red","items":[{"value":"40","suffix":"+","label":"mesas servidas"},{"value":"48","suffix":"h","label":"del tueste a tu barra"},{"value":"100","suffix":"%","label":"trazabilidad de origen"}]} /-->

<!-- wp:gramo/inquiry-form {"formType":"wholesale","heading":"Hablemos de tu proyecto","intro":"Cuéntanos qué sirves y te proponemos una selección."} /-->',
);
