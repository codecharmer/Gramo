<?php
/**
 * WPGraphQL exposure of the structured content model — generated from
 * {@see \Gramo\Core\Content\Schema}.
 *
 * Registers the shared object types (LocalizedText, GramoMediaRef, opening
 * hours), then walks the schema and registers one GraphQL field per schema
 * field on the matching type (Location, MenuEntry, TeamMember, Testimonial,
 * Event, Coffee). Bilingual pairs surface as a single `LocalizedText { es en }`
 * object; JSON-stored lists surface as typed row objects generated from their
 * column definitions.
 *
 * The WooCommerce product (exposed as `Coffee`) additionally resolves live
 * commerce data (price, stock) through `wc_get_product()` — WooGraphQL is
 * intentionally not used. Journal posts get a `readingTime` resolver.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Graphql;

use Gramo\Core\Content\Schema;
use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Fields implements Bootable {

	public function boot(): void {
		add_action( 'graphql_register_types', array( $this, 'register' ) );
	}

	/**
	 * Register shared types, schema-driven fields, and the extra resolvers.
	 */
	public function register(): void {
		if ( ! function_exists( 'register_graphql_object_type' ) || ! function_exists( 'register_graphql_field' ) ) {
			return;
		}

		$this->register_shared_types();
		$this->register_schema_fields();
		$this->register_coffee_commerce_fields();
		$this->register_reading_time();
		$this->register_site_settings();
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Shared types                                                           */
	/* ---------------------------------------------------------------------- */

	private function register_shared_types(): void {
		register_graphql_object_type(
			'LocalizedText',
			array(
				'description' => __( 'Un texto en ambos idiomas del sitio.', 'gramo-core' ),
				'fields'      => array(
					'es' => array( 'type' => 'String' ),
					'en' => array( 'type' => 'String' ),
				),
			)
		);

		register_graphql_object_type(
			'GramoMediaRef',
			array(
				'description' => __( 'Referencia a un adjunto de la biblioteca de medios.', 'gramo-core' ),
				'fields'      => array(
					'id'     => array( 'type' => 'Int' ),
					'url'    => array( 'type' => 'String' ),
					'alt'    => array( 'type' => 'String' ),
					'width'  => array( 'type' => 'Int' ),
					'height' => array( 'type' => 'Int' ),
				),
			)
		);

		register_graphql_object_type(
			'GramoHoursRange',
			array(
				'description' => __( 'Horario de apertura de un día.', 'gramo-core' ),
				'fields'      => array(
					'open'  => array( 'type' => 'String' ),
					'close' => array( 'type' => 'String' ),
				),
			)
		);

		$day_fields = array();
		foreach ( array( 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ) as $day ) {
			$day_fields[ $day ] = array( 'type' => 'GramoHoursRange' );
		}
		register_graphql_object_type(
			'GramoOpeningHours',
			array(
				'description' => __( 'Horario semanal; un día ausente significa cerrado.', 'gramo-core' ),
				'fields'      => $day_fields,
			)
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Schema-driven fields                                                   */
	/* ---------------------------------------------------------------------- */

	private function register_schema_fields(): void {
		foreach ( Schema::field_bearing_types() as $post_type ) {
			$graphql_type = $this->graphql_type_name( $post_type );
			if ( null === $graphql_type ) {
				continue;
			}

			foreach ( Schema::fields( $post_type ) as $field => $def ) {
				$this->register_schema_field( $graphql_type, $field, $def );
			}
		}
	}

	/**
	 * The WPGraphQL type name for a post type, or null when not exposed.
	 */
	private function graphql_type_name( string $post_type ): ?string {
		if ( 'product' === $post_type ) {
			return 'Coffee';
		}
		$def     = Schema::post_types()[ $post_type ] ?? array();
		$graphql = $def['graphql'] ?? null;
		if ( ! is_array( $graphql ) || ! isset( $graphql[0] ) ) {
			return null;
		}
		return ucfirst( (string) $graphql[0] );
	}

	/**
	 * Register one schema field on its GraphQL type.
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function register_schema_field( string $graphql_type, string $field, array $def ): void {
		$name = (string) ( $def['graphql'] ?? '' );
		if ( '' === $name ) {
			return;
		}

		$type     = (string) ( $def['type'] ?? 'text' );
		$meta_key = Schema::meta_key( $field );

		if ( ! empty( $def['bilingual'] ) ) {
			register_graphql_field(
				$graphql_type,
				$name,
				array(
					'type'    => 'LocalizedText',
					'resolve' => static function ( $post ) use ( $field ): array {
						$id = self::post_id( $post );
						return array(
							'es' => (string) get_post_meta( $id, Schema::meta_key( $field ), true ),
							'en' => (string) get_post_meta( $id, Schema::meta_key_en( $field ), true ),
						);
					},
				)
			);
			return;
		}

		switch ( $type ) {
			case 'number':
				$config = array(
					'type'    => 'Float',
					'resolve' => static function ( $post ) use ( $meta_key ): ?float {
						$raw = (string) get_post_meta( self::post_id( $post ), $meta_key, true );
						return '' === $raw ? null : (float) $raw;
					},
				);
				break;

			case 'toggle':
				$config = array(
					'type'    => 'Boolean',
					'resolve' => static fn( $post ): bool => '' !== (string) get_post_meta( self::post_id( $post ), $meta_key, true ),
				);
				break;

			case 'post_select':
				$config = array(
					'type'    => 'Int',
					'resolve' => static function ( $post ) use ( $meta_key ): ?int {
						$id = (int) get_post_meta( self::post_id( $post ), $meta_key, true );
						return $id > 0 ? $id : null;
					},
				);
				break;

			case 'image':
				$config = array(
					'type'    => 'GramoMediaRef',
					'resolve' => static function ( $post ) use ( $meta_key ): ?array {
						$id = (int) get_post_meta( self::post_id( $post ), $meta_key, true );
						return self::media_ref( $id );
					},
				);
				break;

			case 'gallery':
				$config = array(
					'type'    => array( 'list_of' => 'GramoMediaRef' ),
					'resolve' => static function ( $post ) use ( $meta_key ): array {
						$ids  = json_decode( (string) get_post_meta( self::post_id( $post ), $meta_key, true ), true );
						$ids  = is_array( $ids ) ? $ids : array();
						$refs = array();
						foreach ( $ids as $id ) {
							$ref = self::media_ref( (int) $id );
							if ( null !== $ref ) {
								$refs[] = $ref;
							}
						}
						return $refs;
					},
				);
				break;

			case 'hours':
				$config = array(
					'type'    => 'GramoOpeningHours',
					'resolve' => static function ( $post ) use ( $meta_key ): array {
						$hours = json_decode( (string) get_post_meta( self::post_id( $post ), $meta_key, true ), true );
						return is_array( $hours ) ? $hours : array();
					},
				);
				break;

			case 'list':
				$row_type = $this->register_row_type( $graphql_type, $name, (array) ( $def['columns'] ?? array() ) );
				$config   = array(
					'type'    => array( 'list_of' => $row_type ),
					'resolve' => static function ( $post ) use ( $meta_key ): array {
						$rows = json_decode( (string) get_post_meta( self::post_id( $post ), $meta_key, true ), true );
						$rows = is_array( $rows ) ? $rows : array();
						$out  = array();
						foreach ( $rows as $row ) {
							if ( ! is_array( $row ) ) {
								continue;
							}
							$mapped = array();
							foreach ( $row as $key => $value ) {
								$mapped[ self::camel( (string) $key ) ] = (string) $value;
							}
							$out[] = $mapped;
						}
						return $out;
					},
				);
				break;

			default:
				$config = array(
					'type'    => 'String',
					'resolve' => static function ( $post ) use ( $meta_key ): ?string {
						$raw = (string) get_post_meta( self::post_id( $post ), $meta_key, true );
						return '' === $raw ? null : $raw;
					},
				);
				break;
		}

		register_graphql_field( $graphql_type, $name, $config );
	}

	/**
	 * Register (once) the row object type for a `list` field and return its name.
	 *
	 * @param array<string,array<string,mixed>> $columns Column definitions.
	 */
	private function register_row_type( string $graphql_type, string $field_name, array $columns ): string {
		$type_name = $graphql_type . ucfirst( $field_name ) . 'Item';

		$fields = array();
		foreach ( $columns as $col_key => $col_def ) {
			$col_type                                   = (string) ( ( (array) $col_def )['type'] ?? 'text' );
			$fields[ self::camel( (string) $col_key ) ] = array(
				'type' => 'number' === $col_type ? 'Float' : 'String',
			);
		}

		register_graphql_object_type(
			$type_name,
			array(
				'description' => __( 'Fila de una lista estructurada de Gramo.', 'gramo-core' ),
				'fields'      => $fields,
			)
		);

		return $type_name;
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Coffee commerce + journal extras                                       */
	/* ---------------------------------------------------------------------- */

	private function register_coffee_commerce_fields(): void {
		$commerce = array(
			'price'        => array(
				'type'    => 'Float',
				'resolve' => static function ( $post ): ?float {
					$product = self::product( $post );
					if ( null === $product ) {
						return null;
					}
					$price = (string) $product->get_price();
					return '' === $price ? null : (float) $price;
				},
			),
			'regularPrice' => array(
				'type'    => 'Float',
				'resolve' => static function ( $post ): ?float {
					$product = self::product( $post );
					if ( null === $product ) {
						return null;
					}
					$price = (string) $product->get_regular_price();
					return '' === $price ? null : (float) $price;
				},
			),
			'stockStatus'  => array(
				'type'    => 'String',
				'resolve' => static function ( $post ): ?string {
					$product = self::product( $post );
					return null === $product ? null : (string) $product->get_stock_status();
				},
			),
			'purchasable'  => array(
				'type'    => 'Boolean',
				'resolve' => static function ( $post ): bool {
					$product = self::product( $post );
					return null !== $product && $product->is_purchasable() && $product->is_in_stock();
				},
			),
		);

		foreach ( $commerce as $name => $config ) {
			register_graphql_field( 'Coffee', $name, $config );
		}
	}

	private function register_reading_time(): void {
		register_graphql_field(
			'Post',
			'readingTime',
			array(
				'type'        => 'Int',
				'description' => __( 'Minutos de lectura estimados (200 ppm).', 'gramo-core' ),
				'resolve'     => static function ( $post ): int {
					$content = (string) get_post_field( 'post_content', self::post_id( $post ) );
					$words   = str_word_count( wp_strip_all_tags( $content ) );
					return max( 1, (int) ceil( $words / 200 ) );
				},
			)
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Site settings root field                                               */
	/* ---------------------------------------------------------------------- */

	private function register_site_settings(): void {
		register_graphql_object_type(
			'GramoNavItem',
			array(
				'description' => __( 'Enlace de navegación del sitio.', 'gramo-core' ),
				'fields'      => array(
					'label' => array( 'type' => 'LocalizedText' ),
					'path'  => array( 'type' => 'String' ),
				),
			)
		);

		register_graphql_object_type(
			'GramoAnnouncement',
			array(
				'description' => __( 'Barra de aviso del sitio.', 'gramo-core' ),
				'fields'      => array(
					'enabled' => array( 'type' => 'Boolean' ),
					'text'    => array( 'type' => 'LocalizedText' ),
					'url'     => array( 'type' => 'String' ),
				),
			)
		);

		register_graphql_object_type(
			'GramoSocial',
			array(
				'description' => __( 'Redes sociales del sitio.', 'gramo-core' ),
				'fields'      => array(
					'instagram'         => array( 'type' => 'String' ),
					'facebook'          => array( 'type' => 'String' ),
					'spotify'           => array( 'type' => 'String' ),
					'linktree'          => array( 'type' => 'String' ),
					'whatsappCommunity' => array( 'type' => 'String' ),
				),
			)
		);

		register_graphql_object_type(
			'GramoBusinessInfo',
			array(
				'description' => __( 'Datos de contacto del negocio.', 'gramo-core' ),
				'fields'      => array(
					'name'            => array( 'type' => 'String' ),
					'tagline'         => array( 'type' => 'String' ),
					'phone'           => array( 'type' => 'String' ),
					'phoneLink'       => array( 'type' => 'String' ),
					'whatsapp'        => array( 'type' => 'String' ),
					'email'           => array( 'type' => 'String' ),
					'instagramHandle' => array( 'type' => 'String' ),
				),
			)
		);

		register_graphql_object_type(
			'GramoSettings',
			array(
				'description' => __( 'Ajustes globales del sitio editables en WordPress.', 'gramo-core' ),
				'fields'      => array(
					'nav'          => array( 'type' => array( 'list_of' => 'GramoNavItem' ) ),
					'footer'       => array( 'type' => array( 'list_of' => 'GramoNavItem' ) ),
					'footerNote'   => array( 'type' => 'LocalizedText' ),
					'announcement' => array( 'type' => 'GramoAnnouncement' ),
					'social'       => array( 'type' => 'GramoSocial' ),
					'business'     => array( 'type' => 'GramoBusinessInfo' ),
				),
			)
		);

		register_graphql_field(
			'RootQuery',
			'gramoSettings',
			array(
				'type'        => 'GramoSettings',
				'description' => __( 'Ajustes globales de Gramo (navegación, pie, aviso, redes, negocio).', 'gramo-core' ),
				'resolve'     => static function (): array {
					$site     = \Gramo\Core\Setup\Options::site();
					$business = \Gramo\Core\Setup\Options::business();

					$to_nav = static function ( array $items ): array {
						$out = array();
						foreach ( $items as $item ) {
							$out[] = array(
								'label' => array(
									'es' => $item['label_es'],
									'en' => $item['label_en'],
								),
								'path'  => $item['path'],
							);
						}
						return $out;
					};

					return array(
						'nav'          => $to_nav( \Gramo\Core\Setup\Options::parse_link_lines( (string) ( $site['nav_lines'] ?? '' ) ) ),
						'footer'       => $to_nav( \Gramo\Core\Setup\Options::parse_link_lines( (string) ( $site['footer_lines'] ?? '' ) ) ),
						'footerNote'   => array(
							'es' => (string) ( $site['footer_note_es'] ?? '' ),
							'en' => (string) ( $site['footer_note_en'] ?? '' ),
						),
						'announcement' => array(
							'enabled' => ! empty( $site['announcement_enabled'] ),
							'text'    => array(
								'es' => (string) ( $site['announcement_es'] ?? '' ),
								'en' => (string) ( $site['announcement_en'] ?? '' ),
							),
							'url'     => (string) ( $site['announcement_url'] ?? '' ),
						),
						'social'       => array(
							'instagram'         => (string) ( $site['social_instagram'] ?? '' ),
							'facebook'          => (string) ( $site['social_facebook'] ?? '' ),
							'spotify'           => (string) ( $site['social_spotify'] ?? '' ),
							'linktree'          => (string) ( $site['social_linktree'] ?? '' ),
							'whatsappCommunity' => (string) ( $site['whatsapp_community'] ?? '' ),
						),
						'business'     => array(
							'name'            => (string) ( $business['name'] ?? '' ),
							'tagline'         => (string) ( $business['tagline'] ?? '' ),
							'phone'           => (string) ( $business['phone'] ?? '' ),
							'phoneLink'       => (string) ( $business['phone_link'] ?? '' ),
							'whatsapp'        => (string) ( $business['whatsapp'] ?? '' ),
							'email'           => (string) ( $business['email'] ?? '' ),
							'instagramHandle' => (string) ( $business['instagram_handle'] ?? '' ),
						),
					);
				},
			)
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Helpers                                                                */
	/* ---------------------------------------------------------------------- */

	/**
	 * Database ID from a WPGraphQL Post model (or anything post-like).
	 *
	 * @param mixed $post WPGraphQL model.
	 */
	private static function post_id( mixed $post ): int {
		if ( is_object( $post ) ) {
			if ( isset( $post->databaseId ) ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
				return (int) $post->databaseId; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
			}
			if ( isset( $post->ID ) ) {
				return (int) $post->ID;
			}
		}
		return 0;
	}

	/**
	 * The WooCommerce product behind a Coffee, when WooCommerce is active.
	 *
	 * @param mixed $post WPGraphQL model.
	 */
	private static function product( mixed $post ): ?\WC_Product {
		if ( ! function_exists( 'wc_get_product' ) ) {
			return null;
		}
		$product = wc_get_product( self::post_id( $post ) );
		return $product instanceof \WC_Product ? $product : null;
	}

	/**
	 * snake_case → camelCase for list column keys.
	 */
	private static function camel( string $key ): string {
		return lcfirst( str_replace( ' ', '', ucwords( str_replace( '_', ' ', $key ) ) ) );
	}

	/**
	 * Resolve an attachment ID into the GramoMediaRef shape, or null.
	 *
	 * @return array{id:int,url:string,alt:string,width:int,height:int}|null
	 */
	private static function media_ref( int $attachment_id ): ?array {
		if ( $attachment_id <= 0 ) {
			return null;
		}
		$src = wp_get_attachment_image_src( $attachment_id, 'full' );
		if ( ! is_array( $src ) || empty( $src[0] ) ) {
			return null;
		}
		return array(
			'id'     => $attachment_id,
			'url'    => (string) $src[0],
			'alt'    => (string) get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
			'width'  => (int) $src[1],
			'height' => (int) $src[2],
		);
	}
}
