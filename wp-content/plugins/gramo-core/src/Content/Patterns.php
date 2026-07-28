<?php
/**
 * Block pattern registration — full-page starters for the editors.
 *
 * Convention: every PHP file in the plugin's /patterns directory returns an
 * `array{title:string,content:string}`. The file name (without extension)
 * becomes the pattern slug suffix — `patterns/home.php` registers as
 * `gramo/home` — and every pattern lands in the `gramo-paginas` category.
 * Files that do not return the expected shape are skipped silently.
 *
 * The pattern content is composed exclusively of gramo/* blocks and the core
 * blocks whitelisted in {@see Blocks}; real copy is applied later by the
 * content seeder — these are structural page starters.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Content;

use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Patterns implements Bootable {

	public function boot(): void {
		add_action( 'init', array( $this, 'register_patterns' ), 12 );
	}

	/**
	 * Register the pattern category and every pattern file.
	 */
	public function register_patterns(): void {
		if ( ! function_exists( 'register_block_pattern' ) ) {
			return;
		}

		register_block_pattern_category(
			'gramo-paginas',
			array( 'label' => __( 'Páginas de Gramo', 'gramo-core' ) )
		);

		$files = glob( GRAMO_CORE_DIR . 'patterns/*.php' );
		if ( ! is_array( $files ) ) {
			return;
		}

		foreach ( $files as $file ) {
			$pattern = include $file;

			if ( ! is_array( $pattern ) || empty( $pattern['title'] ) || empty( $pattern['content'] ) ) {
				continue;
			}

			register_block_pattern(
				'gramo/' . basename( $file, '.php' ),
				array(
					'title'      => (string) $pattern['title'],
					'content'    => (string) $pattern['content'],
					'categories' => array( 'gramo-paginas' ),
				)
			);
		}
	}
}
