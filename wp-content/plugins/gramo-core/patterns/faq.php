<?php
/**
 * Pattern: Preguntas frecuentes.
 *
 * Estructura: hero compacto + acordeón de preguntas + banda CTA.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'   => __( 'Preguntas frecuentes', 'gramo-core' ),
	'content' => '<!-- wp:gramo/hero {"eyebrow":"Ayuda","heading":"Preguntas frecuentes","height":"compact"} /-->

<!-- wp:gramo/faq {"heading":"Lo esencial","intro":"Respuestas breves a lo que más nos preguntan."} -->
<div class="wp-block-gramo-faq"><!-- wp:gramo/faq-item {"question":"¿Cómo funciona la reserva de café?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Eliges tu café, reservas en línea y lo recoges en barra el día acordado. Se paga al recoger.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"¿Cada cuánto tostáis?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Tostamos cada semana en pequeños lotes; tu bolsa siempre llega con fecha de tueste reciente.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item -->

<!-- wp:gramo/faq-item {"question":"¿Hacéis envíos?"} -->
<div class="wp-block-gramo-faq-item"><!-- wp:paragraph -->
<p>Por ahora trabajamos solo con recogida en barra, para servir el café en su mejor momento.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/faq-item --></div>
<!-- /wp:gramo/faq -->

<!-- wp:gramo/cta-band {"tone":"linen","heading":"¿Otra duda?","text":"Escríbenos y te respondemos con calma.","cta":{"label":"Contacto","url":"/contacto/"}} /-->',
);
