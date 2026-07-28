<?php
/**
 * Structured block JSON for the headless frontend.
 *
 * Registers `blocksJson: String` on Page and Post: the raw block markup is
 * parsed with `parse_blocks()` and normalized into a shape the Gatsby
 * BlockRenderer consumes directly:
 *
 *   - `gramo/*` blocks  → { name, attributes, innerBlocks } where attributes
 *     are merged over the block.json defaults from the registry, so the
 *     frontend never needs to know a default value.
 *   - core blocks       → { name, html } leaves rendered with render_block(),
 *     which resolves image markup, list nesting, and button wrappers.
 *   - whitespace blocks (null name) are dropped.
 *
 * This replaces wp-graphql-content-blocks deliberately: the block set is
 * save-null/attribute-only, so parsed comments are complete, and the ~100
 * lines here carry no third-party compatibility risk.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Headless;

use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class EditorBlocks implements Bootable {

	public function boot(): void {
		add_action( 'graphql_register_types', array( $this, 'register' ) );
	}

	public function register(): void {
		if ( ! function_exists( 'register_graphql_field' ) ) {
			return;
		}

		foreach ( array( 'Page', 'Post' ) as $graphql_type ) {
			register_graphql_field(
				$graphql_type,
				'blocksJson',
				array(
					'type'        => 'String',
					'description' => __( 'Bloques del contenido como JSON normalizado para el frontend.', 'gramo-core' ),
					'resolve'     => static function ( $post ): string {
						$id = 0;
						if ( is_object( $post ) ) {
							if ( isset( $post->databaseId ) ) { // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
								$id = (int) $post->databaseId; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase -- WPGraphQL model property.
							} elseif ( isset( $post->ID ) ) {
								$id = (int) $post->ID;
							}
						}
						$content = (string) get_post_field( 'post_content', $id );
						$blocks  = self::normalize_blocks( parse_blocks( $content ) );
						$json    = wp_json_encode( $blocks );
						return false === $json ? '[]' : $json;
					},
				)
			);
		}
	}

	/**
	 * Normalize a parsed block tree for the frontend.
	 *
	 * @param array<int,array<string,mixed>> $blocks Output of parse_blocks().
	 * @return array<int,array<string,mixed>>
	 */
	public static function normalize_blocks( array $blocks ): array {
		$out = array();

		foreach ( $blocks as $block ) {
			$name = (string) ( $block['blockName'] ?? '' );
			if ( '' === $name ) {
				continue; // Whitespace-only artifacts of parse_blocks().
			}

			if ( str_starts_with( $name, 'gramo/' ) ) {
				$out[] = array(
					'name'        => $name,
					'attributes'  => self::attributes_with_defaults( $name, (array) ( $block['attrs'] ?? array() ) ),
					'innerBlocks' => self::normalize_blocks( (array) ( $block['innerBlocks'] ?? array() ) ),
				);
				continue;
			}

			$out[] = array(
				'name' => $name,
				'html' => render_block( $block ),
			);
		}

		return $out;
	}

	/**
	 * Merge saved attributes over the block.json defaults from the registry.
	 *
	 * @param array<string,mixed> $attrs Saved attributes.
	 * @return array<string,mixed>
	 */
	private static function attributes_with_defaults( string $name, array $attrs ): array {
		$registered = \WP_Block_Type_Registry::get_instance()->get_registered( $name );
		if ( null === $registered || ! is_array( $registered->attributes ) ) {
			return $attrs;
		}

		$defaults = array();
		foreach ( $registered->attributes as $key => $def ) {
			if ( is_array( $def ) && array_key_exists( 'default', $def ) ) {
				$defaults[ $key ] = $def['default'];
			}
		}

		return array_merge( $defaults, $attrs );
	}
}
