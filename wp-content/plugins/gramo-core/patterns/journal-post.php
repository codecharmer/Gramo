<?php
/**
 * Pattern: Entrada del diario.
 *
 * Estructura editorial para el diario: entrada, subtítulo, cita y cierre.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	'title'   => __( 'Entrada del diario', 'gramo-core' ),
	'content' => '<!-- wp:paragraph -->
<p>Un párrafo de apertura breve que sitúa la historia: el lote, la finca o la idea que motiva esta entrada.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Lo que encontramos en taza</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Desarrolla aquí la nota principal: proceso, perfil de tueste y cómo lo estamos sirviendo en barra.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>El buen café no tiene prisa; se deja acompañar.</p>
<!-- /wp:paragraph --><cite>Equipo Gramo</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>Cierre con una invitación serena: probarlo en barra o reservarlo para casa.</p>
<!-- /wp:paragraph -->',
);
