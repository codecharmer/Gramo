<?php
/**
 * Gutenberg block registration for the headless editor.
 *
 * Registers every compiled block found under build/blocks/ (each directory
 * holds the block.json emitted by `npm run build:blocks`), prepends the
 * "Gramo" block category, and restricts the page/post editors to the Gramo
 * blocks plus a curated set of core text blocks. When the build output is
 * missing, an admin notice asks for a compile instead of failing silently.
 *
 * The blocks are editor-only: attributes live in the block comment and the
 * Gatsby frontend renders them from the parsed comment JSON.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Content;

use Gramo\Core\Contracts\Bootable;
use WP_Block_Editor_Context;
use WP_Block_Type_Registry;
use WP_Post;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Blocks implements Bootable {

	/** Core blocks kept available alongside the Gramo blocks in page/post editors. */
	private const ALLOWED_CORE_BLOCKS = array(
		'core/paragraph',
		'core/heading',
		'core/list',
		'core/list-item',
		'core/quote',
		'core/image',
		'core/buttons',
		'core/button',
		'core/separator',
	);

	private bool $build_missing = false;

	public function boot(): void {
		add_action( 'init', array( $this, 'register_blocks' ), 10 );
		add_action( 'admin_notices', array( $this, 'maybe_render_build_notice' ) );
		add_filter( 'block_categories_all', array( $this, 'add_block_category' ) );
		add_filter( 'allowed_block_types_all', array( $this, 'restrict_allowed_blocks' ), 10, 2 );
	}

	/**
	 * Register every compiled block. Remembers the missing-build state so the
	 * admin notice can surface it.
	 */
	public function register_blocks(): void {
		$manifests = glob( GRAMO_CORE_DIR . 'build/blocks/*/block.json' );

		if ( ! is_array( $manifests ) || array() === $manifests ) {
			$this->build_missing = true;
			return;
		}

		foreach ( $manifests as $manifest ) {
			register_block_type( dirname( $manifest ) );
		}
	}

	/**
	 * Warn administrators when the block build output is absent.
	 */
	public function maybe_render_build_notice(): void {
		if ( ! $this->build_missing || ! current_user_can( 'manage_options' ) ) {
			return;
		}

		echo '<div class="notice notice-warning"><p>';
		echo esc_html__( 'Los bloques de Gramo no están compilados. Ejecuta npm run build:blocks.', 'gramo-core' );
		echo '</p></div>';
	}

	/**
	 * Prepend the Gramo block category so the blocks lead the inserter.
	 *
	 * @param array<int,array<string,mixed>> $categories Registered categories.
	 * @return array<int,array<string,mixed>>
	 */
	public function add_block_category( array $categories ): array {
		array_unshift(
			$categories,
			array(
				'slug'  => 'gramo',
				'title' => __( 'Gramo', 'gramo-core' ),
			)
		);

		return $categories;
	}

	/**
	 * Limit page/post editors to the Gramo blocks plus curated core blocks.
	 * Every other editor context keeps its incoming value untouched.
	 *
	 * @param bool|string[]           $allowed_block_types Incoming filter value.
	 * @param WP_Block_Editor_Context $editor_context      Current editor context.
	 * @return bool|string[]
	 */
	public function restrict_allowed_blocks( $allowed_block_types, WP_Block_Editor_Context $editor_context ) {
		if ( ! $editor_context->post instanceof WP_Post ) {
			return $allowed_block_types;
		}

		if ( ! in_array( $editor_context->post->post_type, array( 'page', 'post' ), true ) ) {
			return $allowed_block_types;
		}

		$gramo_blocks = array();
		foreach ( array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() ) as $block_name ) {
			if ( str_starts_with( $block_name, 'gramo/' ) ) {
				$gramo_blocks[] = $block_name;
			}
		}

		return array_merge( $gramo_blocks, self::ALLOWED_CORE_BLOCKS );
	}
}
