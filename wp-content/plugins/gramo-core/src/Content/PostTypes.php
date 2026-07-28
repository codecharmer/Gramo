<?php
/**
 * Post type, taxonomy, and meta registration — generated from {@see Schema}.
 *
 * Registers the structured CPTs (locations, menu, team, testimonials, events,
 * inquiries), the menu-section taxonomy, every schema field as post meta
 * (bilingual fields register their `_en` sibling), the translation-pair meta on
 * pages and posts, and exposes the WooCommerce product to WPGraphQL as `Coffee`.
 *
 * Presentation of these fields in the admin lives in {@see MetaBoxes}; GraphQL
 * exposure lives in {@see \Gramo\Core\Graphql\Fields}.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Content;

use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class PostTypes implements Bootable {

	public function boot(): void {
		add_action( 'init', array( $this, 'register_post_types' ), 5 );
		add_action( 'init', array( $this, 'register_taxonomies' ), 5 );
		add_action( 'init', array( $this, 'register_meta' ), 6 );
		add_filter( 'register_post_type_args', array( $this, 'expose_product_as_coffee' ), 10, 2 );
	}

	/**
	 * Register every CPT declared in the schema.
	 */
	public function register_post_types(): void {
		foreach ( Schema::post_types() as $post_type => $def ) {
			$labels = (array) ( $def['labels'] ?? array() );
			$args   = array(
				'labels'       => $labels,
				'public'       => (bool) ( $def['public'] ?? false ),
				'show_ui'      => (bool) ( $def['show_ui'] ?? ( $def['public'] ?? false ) ),
				'show_in_rest' => false, // Headless via GraphQL; the classic editor UI is schema meta boxes.
				'menu_icon'    => (string) ( $def['menu_icon'] ?? 'dashicons-admin-post' ),
				'supports'     => (array) ( $def['supports'] ?? array( 'title' ) ),
				'has_archive'  => (bool) ( $def['has_archive'] ?? false ),
				'rewrite'      => $def['rewrite'] ?? false,
			);

			if ( isset( $def['capabilities'] ) ) {
				$args['capabilities'] = (array) $def['capabilities'];
				$args['map_meta_cap'] = true;
			}

			$graphql = $def['graphql'] ?? null;
			if ( is_array( $graphql ) ) {
				$args['show_in_graphql']     = true;
				$args['graphql_single_name'] = (string) $graphql[0];
				$args['graphql_plural_name'] = (string) $graphql[1];
			}

			register_post_type( $post_type, $args );
		}
	}

	/**
	 * Menu sections (café / té / pastelería / temporada / cocina — seeded later).
	 */
	public function register_taxonomies(): void {
		register_taxonomy(
			Schema::MENU_SECTION_TAX,
			array( 'gramo_menu_item' ),
			array(
				'labels'              => array(
					'name'          => 'Secciones del menú',
					'singular_name' => 'Sección del menú',
				),
				'public'              => false,
				'show_ui'             => true,
				'show_admin_column'   => true,
				'hierarchical'        => true,
				'show_in_rest'        => false,
				'show_in_graphql'     => true,
				'graphql_single_name' => 'menuSection',
				'graphql_plural_name' => 'menuSections',
			)
		);
	}

	/**
	 * Register every schema field as post meta, plus the translation-pair meta.
	 */
	public function register_meta(): void {
		foreach ( Schema::field_bearing_types() as $post_type ) {
			foreach ( Schema::fields( $post_type ) as $field => $def ) {
				$this->register_field_meta( $post_type, $field, $def );
			}
		}

		// Translation pairs on block-composed content (pages + journal posts).
		foreach ( array( 'page', 'post' ) as $post_type ) {
			register_post_meta(
				$post_type,
				Schema::LOCALE_META,
				array(
					'type'              => 'string',
					'single'            => true,
					'default'           => 'es',
					'show_in_rest'      => false,
					'sanitize_callback' => static fn( $value ): string => in_array( $value, array( 'es', 'en' ), true ) ? (string) $value : 'es',
					'auth_callback'     => static fn(): bool => current_user_can( 'edit_posts' ),
				)
			);
			register_post_meta(
				$post_type,
				Schema::TRANSLATION_META,
				array(
					'type'              => 'integer',
					'single'            => true,
					'default'           => 0,
					'show_in_rest'      => false,
					'sanitize_callback' => 'absint',
					'auth_callback'     => static fn(): bool => current_user_can( 'edit_posts' ),
				)
			);
		}
	}

	/**
	 * Expose WooCommerce products to WPGraphQL as Coffee/coffees.
	 *
	 * Product data (price, stock) resolves through wc_get_product() in the
	 * GraphQL layer — WooGraphQL is intentionally not used.
	 *
	 * @param array<string,mixed> $args      Registration args.
	 * @param string              $post_type Post type being registered.
	 * @return array<string,mixed>
	 */
	public function expose_product_as_coffee( array $args, string $post_type ): array {
		if ( 'product' !== $post_type ) {
			return $args;
		}
		$args['show_in_graphql']     = true;
		$args['graphql_single_name'] = 'coffee';
		$args['graphql_plural_name'] = 'coffees';
		return $args;
	}

	/**
	 * Register one schema field (and its EN sibling when bilingual) as post meta.
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function register_field_meta( string $post_type, string $field, array $def ): void {
		$keys = array( Schema::meta_key( $field ) );
		if ( ! empty( $def['bilingual'] ) ) {
			$keys[] = Schema::meta_key_en( $field );
		}

		foreach ( $keys as $meta_key ) {
			register_post_meta(
				$post_type,
				$meta_key,
				array(
					'type'              => 'string',
					'single'            => true,
					'default'           => '',
					'show_in_rest'      => false,
					'sanitize_callback' => static fn( $value ): string => Schema::sanitize_value( $def, $value ),
					'auth_callback'     => static fn(): bool => current_user_can( 'edit_posts' ),
				)
			);
		}
	}
}
