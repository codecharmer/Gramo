<?php
/**
 * Pattern: Contacto.
 *
 * Estructura: hero compacto + sección editorial + formulario general + ubicaciones.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'   => __( 'Contacto', 'gramo-core' ),
	'content' => '<!-- wp:gramo/hero {"eyebrow":"Contacto","heading":"Estamos cerca","height":"compact"} /-->

<!-- wp:gramo/split-image {"eyebrow":"Escríbenos","heading":"Una conversación, sin prisa"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Para pedidos, visitas al obrador o cualquier duda sobre nuestros cafés.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/inquiry-form {"heading":"Cuéntanos","intro":"Respondemos en uno o dos días laborables."} /-->

<!-- wp:gramo/locations {"heading":"Nuestras barras"} /-->',
);
