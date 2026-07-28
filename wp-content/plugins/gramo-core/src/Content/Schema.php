<?php
/**
 * Content schema — the single source of truth for the structured content model.
 *
 * Declares every custom post type and every custom field once. Three consumers
 * generate everything else from these definitions so they can never drift:
 *
 *   - {@see PostTypes} registers the CPTs, the taxonomy, and `register_post_meta`
 *     for each field (bilingual fields register an `_en` sibling).
 *   - {@see MetaBoxes} renders the schema-driven admin UI (tabbed ES/EN, list
 *     "repeater-lite" rows, media pickers, hours grids).
 *   - {@see \Gramo\Core\Graphql\Fields} exposes each field through WPGraphQL
 *     (bilingual pairs surface as one `LocalizedText { es en }` object).
 *
 * Field definition keys:
 *   type      text|textarea|number|url|email|select|date|time|toggle|image|gallery|list|hours
 *   label     Spanish admin label (the whole admin is es-MX, engine convention).
 *   bilingual When true the field stores `_gramo_<key>` (ES) and `_gramo_<key>_en`.
 *   graphql   camelCase GraphQL field name.
 *   choices   For `select`: value => Spanish label.
 *   columns   For `list`: sub-field key => array{label:string,type:string} per row.
 *   help      Optional admin help text.
 *
 * Storage: scalars as strings ('1'/'' for toggle, attachment ID for image);
 * `list`, `hours`, and `gallery` as JSON strings in a single meta key.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Content;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Schema {

	/** Meta key prefix for every schema field. */
	public const META_PREFIX = '_gramo_';

	/** Suffix appended to the ES meta key for the English sibling. */
	public const EN_SUFFIX = '_en';

	/** Locale marker meta on pages/posts ('es' | 'en'). */
	public const LOCALE_META = '_gramo_locale';

	/** Peer post ID linking a page/post to its translation. */
	public const TRANSLATION_META = '_gramo_translation_of';

	/** Menu section taxonomy attached to gramo_menu_item. */
	public const MENU_SECTION_TAX = 'gramo_menu_section';

	/**
	 * Custom post type definitions.
	 *
	 * `graphql` names deliberately avoid WPGraphQL core collisions
	 * (`MenuItem` belongs to nav menus, hence `MenuEntry`).
	 *
	 * @return array<string,array<string,mixed>>
	 */
	public static function post_types(): array {
		return array(
			'gramo_location'    => array(
				'labels'      => array(
					'name'          => 'Ubicaciones',
					'singular_name' => 'Ubicación',
					'add_new_item'  => 'Añadir ubicación',
					'edit_item'     => 'Editar ubicación',
				),
				'menu_icon'   => 'dashicons-location-alt',
				'supports'    => array( 'title', 'thumbnail', 'page-attributes' ),
				'graphql'     => array( 'location', 'locations' ),
				'public'      => true,
				'has_archive' => false,
				'rewrite'     => array( 'slug' => 'ubicaciones' ),
			),
			'gramo_menu_item'   => array(
				'labels'      => array(
					'name'          => 'Menú',
					'singular_name' => 'Artículo del menú',
					'add_new_item'  => 'Añadir artículo',
					'edit_item'     => 'Editar artículo',
				),
				'menu_icon'   => 'dashicons-food',
				'supports'    => array( 'title', 'thumbnail', 'page-attributes' ),
				'graphql'     => array( 'menuEntry', 'menuEntries' ),
				'public'      => false,
				'show_ui'     => true,
				'has_archive' => false,
			),
			'gramo_team'        => array(
				'labels'      => array(
					'name'          => 'Equipo',
					'singular_name' => 'Miembro del equipo',
					'add_new_item'  => 'Añadir miembro',
					'edit_item'     => 'Editar miembro',
				),
				'menu_icon'   => 'dashicons-groups',
				'supports'    => array( 'title', 'thumbnail', 'page-attributes' ),
				'graphql'     => array( 'teamMember', 'teamMembers' ),
				'public'      => false,
				'show_ui'     => true,
				'has_archive' => false,
			),
			'gramo_testimonial' => array(
				'labels'      => array(
					'name'          => 'Testimonios',
					'singular_name' => 'Testimonio',
					'add_new_item'  => 'Añadir testimonio',
					'edit_item'     => 'Editar testimonio',
				),
				'menu_icon'   => 'dashicons-format-quote',
				'supports'    => array( 'title', 'page-attributes' ),
				'graphql'     => array( 'testimonial', 'testimonials' ),
				'public'      => false,
				'show_ui'     => true,
				'has_archive' => false,
			),
			'gramo_event'       => array(
				'labels'      => array(
					'name'          => 'Eventos',
					'singular_name' => 'Evento',
					'add_new_item'  => 'Añadir evento',
					'edit_item'     => 'Editar evento',
				),
				'menu_icon'   => 'dashicons-calendar-alt',
				'supports'    => array( 'title', 'thumbnail' ),
				'graphql'     => array( 'event', 'events' ),
				'public'      => true,
				'has_archive' => false,
				'rewrite'     => array( 'slug' => 'eventos' ),
			),
			'gramo_inquiry'     => array(
				'labels'       => array(
					'name'          => 'Solicitudes',
					'singular_name' => 'Solicitud',
				),
				'menu_icon'    => 'dashicons-email-alt',
				'supports'     => array( 'title' ),
				'graphql'      => null, // Private inbox: never exposed.
				'public'       => false,
				'show_ui'      => true,
				'has_archive'  => false,
				'capabilities' => array( 'create_posts' => 'do_not_allow' ),
			),
		);
	}

	/**
	 * Field definitions per post type ('product' covers the coffee catalogue).
	 *
	 * @return array<string,array<string,mixed>>
	 */
	public static function fields( string $post_type ): array {
		switch ( $post_type ) {
			case 'gramo_location':
				return array(
					'short_name'         => array(
						'type'    => 'text',
						'label'   => 'Nombre corto',
						'graphql' => 'shortName',
						'help'    => 'Ej. «Gramo 3». Se muestra en listados y mapas.',
					),
					'address'            => array(
						'type'    => 'text',
						'label'   => 'Dirección',
						'graphql' => 'address',
					),
					'neighborhood'       => array(
						'type'    => 'text',
						'label'   => 'Colonia',
						'graphql' => 'neighborhood',
					),
					'city'               => array(
						'type'    => 'select',
						'label'   => 'Ciudad',
						'graphql' => 'city',
						'choices' => array(
							'cuernavaca' => 'Cuernavaca',
							'cdmx'       => 'Ciudad de México',
						),
					),
					'postal_code'        => array(
						'type'    => 'text',
						'label'   => 'Código postal',
						'graphql' => 'postalCode',
					),
					'phone'              => array(
						'type'    => 'text',
						'label'   => 'Teléfono',
						'graphql' => 'phone',
					),
					'whatsapp'           => array(
						'type'    => 'url',
						'label'   => 'WhatsApp (URL)',
						'graphql' => 'whatsapp',
					),
					'hours'              => array(
						'type'    => 'hours',
						'label'   => 'Horario',
						'graphql' => 'hours',
						'help'    => 'Horario por día. Deja un día vacío para marcarlo como cerrado.',
					),
					'amenities'          => array(
						'type'    => 'list',
						'label'   => 'Servicios',
						'graphql' => 'amenities',
						'columns' => array(
							'label_es' => array(
								'label' => 'Servicio (ES)',
								'type'  => 'text',
							),
							'label_en' => array(
								'label' => 'Servicio (EN)',
								'type'  => 'text',
							),
						),
						'help'    => 'Ej. Wi-Fi, terraza, pet friendly, barra de filtrados.',
					),
					'maps_url'           => array(
						'type'    => 'url',
						'label'   => 'Google Maps (URL)',
						'graphql' => 'mapsUrl',
					),
					'latitude'           => array(
						'type'    => 'text',
						'label'   => 'Latitud',
						'graphql' => 'latitude',
					),
					'longitude'          => array(
						'type'    => 'text',
						'label'   => 'Longitud',
						'graphql' => 'longitude',
					),
					'gallery'            => array(
						'type'    => 'gallery',
						'label'   => 'Galería interior',
						'graphql' => 'gallery',
					),
					'description'        => array(
						'type'      => 'textarea',
						'label'     => 'Descripción',
						'bilingual' => true,
						'graphql'   => 'description',
					),
					'neighborhood_guide' => array(
						'type'      => 'textarea',
						'label'     => 'Guía del barrio',
						'bilingual' => true,
						'graphql'   => 'neighborhoodGuide',
						'help'      => 'Recomendaciones alrededor del café: qué visitar, dónde caminar.',
					),
				);

			case 'gramo_menu_item':
				return array(
					'name_en'     => array(
						'type'    => 'text',
						'label'   => 'Nombre (EN)',
						'graphql' => 'nameEn',
						'help'    => 'El título del artículo es el nombre en español.',
					),
					'description' => array(
						'type'      => 'textarea',
						'label'     => 'Descripción',
						'bilingual' => true,
						'graphql'   => 'description',
					),
					'price'       => array(
						'type'    => 'number',
						'label'   => 'Precio (MXN)',
						'graphql' => 'price',
					),
					'price_note'  => array(
						'type'      => 'text',
						'label'     => 'Nota de precio',
						'bilingual' => true,
						'graphql'   => 'priceNote',
						'help'      => 'Ej. «12 oz» o «por pieza».',
					),
					'variants'    => array(
						'type'    => 'list',
						'label'   => 'Variantes',
						'graphql' => 'variants',
						'columns' => array(
							'label_es' => array(
								'label' => 'Variante (ES)',
								'type'  => 'text',
							),
							'label_en' => array(
								'label' => 'Variante (EN)',
								'type'  => 'text',
							),
							'price'    => array(
								'label' => 'Precio',
								'type'  => 'number',
							),
						),
						'help'    => 'Tamaños o presentaciones con precio propio. Si hay variantes, el precio base es opcional.',
					),
					'dietary'     => array(
						'type'      => 'text',
						'label'     => 'Notas dietéticas',
						'bilingual' => true,
						'graphql'   => 'dietary',
						'help'      => 'Ej. «vegano, sin gluten».',
					),
					'featured'    => array(
						'type'    => 'toggle',
						'label'   => 'Destacado',
						'graphql' => 'featured',
					),
				);

			case 'gramo_team':
				return array(
					'role'      => array(
						'type'      => 'text',
						'label'     => 'Puesto',
						'bilingual' => true,
						'graphql'   => 'role',
					),
					'bio'       => array(
						'type'      => 'textarea',
						'label'     => 'Biografía',
						'bilingual' => true,
						'graphql'   => 'bio',
					),
					'instagram' => array(
						'type'    => 'url',
						'label'   => 'Instagram (URL)',
						'graphql' => 'instagram',
					),
				);

			case 'gramo_testimonial':
				return array(
					'quote'       => array(
						'type'      => 'textarea',
						'label'     => 'Cita',
						'bilingual' => true,
						'graphql'   => 'quote',
					),
					'attribution' => array(
						'type'      => 'text',
						'label'     => 'Contexto',
						'bilingual' => true,
						'graphql'   => 'attribution',
						'help'      => 'Ej. «Cliente de Gramo 2» — el título del testimonio es el nombre de la persona.',
					),
				);

			case 'gramo_event':
				return array(
					'title_en'        => array(
						'type'    => 'text',
						'label'   => 'Título (EN)',
						'graphql' => 'titleEn',
					),
					'description'     => array(
						'type'      => 'textarea',
						'label'     => 'Descripción',
						'bilingual' => true,
						'graphql'   => 'description',
					),
					'date'            => array(
						'type'    => 'date',
						'label'   => 'Fecha',
						'graphql' => 'date',
					),
					'time_start'      => array(
						'type'    => 'time',
						'label'   => 'Hora de inicio',
						'graphql' => 'timeStart',
					),
					'time_end'        => array(
						'type'    => 'time',
						'label'   => 'Hora de fin',
						'graphql' => 'timeEnd',
					),
					'location_id'     => array(
						'type'      => 'post_select',
						'label'     => 'Ubicación',
						'graphql'   => 'locationId',
						'post_type' => 'gramo_location',
					),
					'reservation_url' => array(
						'type'    => 'url',
						'label'   => 'Reservaciones (URL)',
						'graphql' => 'reservationUrl',
					),
				);

			case 'product':
				return array(
					'name_en'               => array(
						'type'    => 'text',
						'label'   => 'Nombre (EN)',
						'graphql' => 'nameEn',
					),
					'description_en'        => array(
						'type'    => 'textarea',
						'label'   => 'Descripción (EN)',
						'graphql' => 'descriptionEn',
						'help'    => 'La descripción en español es la descripción normal del producto.',
					),
					'origin'                => array(
						'type'    => 'text',
						'label'   => 'Origen',
						'graphql' => 'origin',
						'help'    => 'Ej. «Huatusco, Veracruz».',
					),
					'producer'              => array(
						'type'    => 'text',
						'label'   => 'Productor / finca',
						'graphql' => 'producer',
					),
					'altitude'              => array(
						'type'    => 'text',
						'label'   => 'Altitud',
						'graphql' => 'altitude',
						'help'    => 'Ej. «1,200–1,500 msnm».',
					),
					'variety'               => array(
						'type'    => 'text',
						'label'   => 'Variedad',
						'graphql' => 'variety',
					),
					'process'               => array(
						'type'      => 'text',
						'label'     => 'Proceso',
						'bilingual' => true,
						'graphql'   => 'process',
						'help'      => 'Ej. «Lavado» / «Washed».',
					),
					'roast_level'           => array(
						'type'    => 'select',
						'label'   => 'Nivel de tueste',
						'graphql' => 'roastLevel',
						'choices' => array(
							'ligero'       => 'Ligero',
							'medio'        => 'Medio',
							'medio-oscuro' => 'Medio oscuro',
							'oscuro'       => 'Oscuro',
						),
					),
					'tasting_notes'         => array(
						'type'    => 'list',
						'label'   => 'Notas de cata',
						'graphql' => 'tastingNotes',
						'columns' => array(
							'note_es' => array(
								'label' => 'Nota (ES)',
								'type'  => 'text',
							),
							'note_en' => array(
								'label' => 'Nota (EN)',
								'type'  => 'text',
							),
						),
					),
					'brew_methods'          => array(
						'type'    => 'list',
						'label'   => 'Métodos de preparación',
						'graphql' => 'brewMethods',
						'columns' => array(
							'method_es' => array(
								'label' => 'Método (ES)',
								'type'  => 'text',
							),
							'method_en' => array(
								'label' => 'Método (EN)',
								'type'  => 'text',
							),
						),
					),
					'harvest'               => array(
						'type'    => 'text',
						'label'   => 'Cosecha',
						'graphql' => 'harvest',
						'help'    => 'Ej. «2026».',
					),
					'availability'          => array(
						'type'    => 'select',
						'label'   => 'Disponibilidad',
						'graphql' => 'availability',
						'choices' => array(
							'permanente' => 'Permanente',
							'temporada'  => 'De temporada',
						),
					),
					'subscription_interval' => array(
						'type'    => 'select',
						'label'   => 'Intervalo de suscripción',
						'graphql' => 'subscriptionInterval',
						'choices' => array(
							''          => 'No es suscripción',
							'semanal'   => 'Semanal',
							'quincenal' => 'Quincenal',
							'mensual'   => 'Mensual',
						),
						'help'    => 'Solo para productos que representan un plan de suscripción.',
					),
				);

			default:
				return array();
		}
	}

	/**
	 * All post types that carry schema fields (CPTs + the Woo product).
	 *
	 * @return array<int,string>
	 */
	public static function field_bearing_types(): array {
		$types   = array_keys( self::post_types() );
		$types[] = 'product';
		return $types;
	}

	/**
	 * The ES meta key for a field ('_gramo_<key>').
	 */
	public static function meta_key( string $field ): string {
		return self::META_PREFIX . $field;
	}

	/**
	 * The EN meta key for a bilingual field ('_gramo_<key>_en').
	 */
	public static function meta_key_en( string $field ): string {
		return self::META_PREFIX . $field . self::EN_SUFFIX;
	}

	/**
	 * Whether a field type is stored as a JSON string.
	 */
	public static function is_json_type( string $type ): bool {
		return in_array( $type, array( 'list', 'hours', 'gallery' ), true );
	}

	/**
	 * Sanitize a submitted scalar/JSON value according to its field definition.
	 *
	 * @param array<string,mixed> $def   Field definition.
	 * @param mixed               $value Raw value.
	 */
	public static function sanitize_value( array $def, mixed $value ): string {
		$type = (string) ( $def['type'] ?? 'text' );

		switch ( $type ) {
			case 'textarea':
				return sanitize_textarea_field( (string) $value );
			case 'number':
				$raw = trim( (string) $value );
				return '' === $raw ? '' : (string) (float) $raw;
			case 'url':
				return esc_url_raw( (string) $value );
			case 'email':
				return sanitize_email( (string) $value );
			case 'toggle':
				return $value ? '1' : '';
			case 'select':
				$raw     = sanitize_text_field( (string) $value );
				$choices = (array) ( $def['choices'] ?? array() );
				return array_key_exists( $raw, $choices ) ? $raw : '';
			case 'date':
				$raw = sanitize_text_field( (string) $value );
				return preg_match( '/^\d{4}-\d{2}-\d{2}$/', $raw ) ? $raw : '';
			case 'time':
				$raw = sanitize_text_field( (string) $value );
				return preg_match( '/^\d{2}:\d{2}$/', $raw ) ? $raw : '';
			case 'image':
			case 'post_select':
				$id = (int) $value;
				return $id > 0 ? (string) $id : '';
			case 'gallery':
				$ids = is_array( $value ) ? $value : json_decode( (string) $value, true );
				$ids = is_array( $ids ) ? array_values( array_filter( array_map( 'intval', $ids ) ) ) : array();
				return array() === $ids ? '' : (string) wp_json_encode( $ids );
			case 'hours':
				return self::sanitize_hours( $value );
			case 'list':
				return self::sanitize_list( $def, $value );
			default:
				return sanitize_text_field( (string) $value );
		}
	}

	/**
	 * Sanitize an hours structure: day => {open, close} (missing/empty = closed).
	 *
	 * @param mixed $value Raw value (array or JSON string).
	 */
	private static function sanitize_hours( mixed $value ): string {
		$raw   = is_array( $value ) ? $value : json_decode( (string) $value, true );
		$raw   = is_array( $raw ) ? $raw : array();
		$days  = array( 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' );
		$clean = array();

		foreach ( $days as $day ) {
			$row   = is_array( $raw[ $day ] ?? null ) ? $raw[ $day ] : array();
			$open  = sanitize_text_field( (string) ( $row['open'] ?? '' ) );
			$close = sanitize_text_field( (string) ( $row['close'] ?? '' ) );
			if ( ! preg_match( '/^\d{2}:\d{2}$/', $open ) || ! preg_match( '/^\d{2}:\d{2}$/', $close ) ) {
				continue;
			}
			$clean[ $day ] = array(
				'open'  => $open,
				'close' => $close,
			);
		}

		return array() === $clean ? '' : (string) wp_json_encode( $clean );
	}

	/**
	 * Sanitize a list-of-rows structure against its column definitions.
	 *
	 * @param array<string,mixed> $def   Field definition (with `columns`).
	 * @param mixed               $value Raw value (array or JSON string).
	 */
	private static function sanitize_list( array $def, mixed $value ): string {
		$rows    = is_array( $value ) ? $value : json_decode( (string) $value, true );
		$rows    = is_array( $rows ) ? $rows : array();
		$columns = (array) ( $def['columns'] ?? array() );
		$clean   = array();

		foreach ( $rows as $row ) {
			if ( ! is_array( $row ) ) {
				continue;
			}
			$clean_row = array();
			$has_value = false;
			foreach ( $columns as $col_key => $col_def ) {
				$col_type = (string) ( ( (array) $col_def )['type'] ?? 'text' );
				$raw      = (string) ( $row[ $col_key ] ?? '' );
				$val      = 'number' === $col_type
					? ( '' === trim( $raw ) ? '' : (string) (float) $raw )
					: sanitize_text_field( $raw );
				if ( '' !== $val ) {
					$has_value = true;
				}
				$clean_row[ $col_key ] = $val;
			}
			if ( $has_value ) {
				$clean[] = $clean_row;
			}
		}

		return array() === $clean ? '' : (string) wp_json_encode( $clean );
	}
}
