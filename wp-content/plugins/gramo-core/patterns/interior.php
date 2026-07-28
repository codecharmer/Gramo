<?php
/**
 * Pattern: Página interior (nosotros / proceso).
 *
 * Estructura: hero compacto + dos secciones editoriales + cifras + galería + banda CTA.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'   => __( 'Página interior', 'gramo-core' ),
	'content' => '<!-- wp:gramo/hero {"eyebrow":"Nuestra casa","heading":"Un oficio que se aprende despacio","height":"compact"} /-->

<!-- wp:gramo/split-image {"eyebrow":"Origen","heading":"Relaciones largas, cosechas cortas"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Trabajamos con fincas que conocemos por su nombre. Compramos poco, pagamos bien y volvemos cada año.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/split-image {"imageSide":"right","eyebrow":"Proceso","heading":"El tueste como medida"} -->
<div class="wp-block-gramo-split-image"><!-- wp:paragraph -->
<p>Perfiles suaves que respetan la fruta y el dulzor natural de cada lote.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:gramo/split-image -->

<!-- wp:gramo/stats {"heading":"En cifras","items":[{"value":"12","suffix":"","label":"orígenes en rotación"},{"value":"90","suffix":"kg","label":"tueste semanal"},{"value":"2","suffix":"","label":"barras abiertas"}]} /-->

<!-- wp:gramo/gallery /-->

<!-- wp:gramo/cta-band {"tone":"linen","heading":"Pásate por la barra","text":"El café se entiende mejor en persona.","cta":{"label":"Cómo llegar","url":"/ubicaciones/"}} /-->',
);
