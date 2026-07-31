<?php
/**
 * Pattern: Página de inicio.
 *
 * Estructura: hero + imagen y texto + cafés destacados + testimonios + banda CTA.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'   => __( 'Inicio', 'gramo-core' ),
	'content' => '<!-- wp:gramo/hero {"eyebrow":"Tostadores de especialidad","heading":"Café con la calma de lo bien hecho","subheading":"Tostamos en pequeños lotes y servimos en barra, del origen a la taza.","primaryCta":{"label":"Ver cafés","url":"/tienda/"},"secondaryCta":{"label":"Visítanos","url":"/ubicaciones/"}} /-->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"El obrador","heading":"Tostado en pequeños lotes"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Cada semana seleccionamos, tostamos y catamos. Nada llega a la barra sin pasar por la mesa de cata.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/featured-coffees {"heading":"Cafés de temporada","intro":"Una selección breve, en rotación constante."} /-->

<!-- wp:gramo/cta-band {"heading":"Reserva tu café de esta semana","text":"Pedido por adelantado, recogida en barra.","cta":{"label":"Reservar","url":"/reservar/"}} /-->',
);
