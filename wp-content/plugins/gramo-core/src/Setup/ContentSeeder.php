<?php
/**
 * Content seeder v2 — bilingual pairs and structured CPT data.
 *
 * Extends the engine's content-is-code approach to the headless model:
 *
 *   - Pages and journal posts seed as TRANSLATION PAIRS: each entry in
 *     `data/pages.php` / `data/journal.php` declares `es` and `en` versions
 *     (full Gutenberg block markup); both posts are created, stamped with
 *     `_gramo_locale`, and linked bidirectionally via `_gramo_translation_of`.
 *   - Structured CPTs (locations, menu items, team, testimonials, events)
 *     seed from generic entries whose `fields` map onto the
 *     {@see \Gramo\Core\Content\Schema} definitions — values pass through
 *     `Schema::sanitize_value()`, so the data files use the same shapes the
 *     admin UI produces.
 *   - Site settings (`data/settings.php`) install only when the option rows
 *     are absent, so a client's later edits are never clobbered.
 *
 * Same guarantees as the engine seeder: idempotent (existing content is
 * skipped unless `force`), every created object carries the `_gramo_seeded`
 * marker, and reset never touches hand-made content.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Setup;

use Gramo\Core\Content\Schema;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class ContentSeeder {

	/**
	 * Seed every v2 content type. Called from Installer::install_all().
	 *
	 * @return array<string,mixed> Report keyed by content type.
	 */
	public static function install_all( bool $force ): array {
		return array(
			'locations'    => self::install_cpt( 'gramo_location', 'locations', $force ),
			'menu'         => self::install_menu( $force ),
			'team'         => self::install_cpt( 'gramo_team', 'team', $force ),
			'testimonials' => self::install_cpt( 'gramo_testimonial', 'testimonials', $force ),
			'events'       => self::install_cpt( 'gramo_event', 'events', $force ),
			'pairs'        => self::install_page_pairs( $force ),
			'journal'      => self::install_journal( $force ),
			'settings'     => self::install_site_settings(),
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Generic schema-driven CPT seeding                                      */
	/* ---------------------------------------------------------------------- */

	/**
	 * Seed one CPT from a data file of generic entries:
	 * { title, slug, order?, media?, fields: { schema_key => value, schema_key_en => value } }.
	 *
	 * `media` names a data/media/source file for the featured image. Field
	 * values use the same shapes the admin produces (arrays for list/hours/
	 * gallery are fine — Schema::sanitize_value() normalizes them). A field key
	 * ending in `_en` targets the EN sibling of a bilingual schema field.
	 *
	 * @return array<string,int>
	 */
	public static function install_cpt( string $post_type, string $data_file, bool $force ): array {
		$report  = array(
			'created' => 0,
			'updated' => 0,
			'skipped' => 0,
			'failed'  => 0,
		);
		$entries = self::data( $data_file );
		$schema  = Schema::fields( $post_type );

		foreach ( $entries as $entry ) {
			$entry = (array) $entry;
			$title = sanitize_text_field( (string) ( $entry['title'] ?? '' ) );
			$slug  = sanitize_title( (string) ( $entry['slug'] ?? $title ) );
			if ( '' === $slug ) {
				++$report['failed'];
				continue;
			}

			$existing_id = self::find_by_slug( $post_type, $slug );
			if ( $existing_id > 0 && ! $force ) {
				++$report['skipped'];
				continue;
			}

			$post_id = wp_insert_post(
				array(
					'ID'          => $existing_id,
					'post_type'   => $post_type,
					'post_status' => 'publish',
					'post_title'  => $title,
					'post_name'   => $slug,
					'menu_order'  => (int) ( $entry['order'] ?? 0 ),
				),
				true
			);
			if ( is_wp_error( $post_id ) || 0 === $post_id ) {
				++$report['failed'];
				continue;
			}
			$existing_id > 0 ? ++$report['updated'] : ++$report['created'];

			update_post_meta( $post_id, Installer::MARKER_META, 1 );
			self::apply_fields( (int) $post_id, $schema, (array) ( $entry['fields'] ?? array() ) );
			self::maybe_set_thumbnail( (int) $post_id, (string) ( $entry['media'] ?? '' ), $title );

			// Menu items attach to their section; handled by install_menu().
			if ( isset( $entry['_terms'] ) && is_array( $entry['_terms'] ) ) {
				foreach ( $entry['_terms'] as $taxonomy => $term_slugs ) {
					wp_set_object_terms( (int) $post_id, (array) $term_slugs, (string) $taxonomy );
				}
			}
		}

		return $report;
	}

	/**
	 * Apply product schema fields (the coffee sheet) from a products.php entry.
	 *
	 * Public bridge for {@see Installer::install_products()}: products seed
	 * through the WooCommerce CRUD, but their origin/process/tasting-note meta
	 * uses the same schema pipeline as the structured CPTs.
	 *
	 * @param array<string,mixed> $fields Entry values keyed by schema field.
	 */
	public static function apply_product_fields( int $product_id, array $fields ): void {
		if ( $product_id <= 0 || array() === $fields ) {
			return;
		}
		self::apply_fields( $product_id, Schema::fields( 'product' ), $fields );
	}

	/**
	 * Write schema fields (and EN siblings) from a data entry.
	 *
	 * @param array<string,array<string,mixed>> $schema Field definitions.
	 * @param array<string,mixed>               $fields Entry values.
	 */
	private static function apply_fields( int $post_id, array $schema, array $fields ): void {
		foreach ( $fields as $key => $value ) {
			$is_en    = str_ends_with( (string) $key, '_en_pair' ) ? false : str_ends_with( (string) $key, Schema::EN_SUFFIX );
			$base_key = $is_en ? substr( (string) $key, 0, -strlen( Schema::EN_SUFFIX ) ) : (string) $key;

			// A data key matches either a schema field directly (ES) or a
			// bilingual field's EN sibling; native `_en`-named schema fields
			// (e.g. product name_en) match directly first.
			if ( isset( $schema[ $key ] ) ) {
				$def      = $schema[ $key ];
				$meta_key = Schema::meta_key( (string) $key );
			} elseif ( $is_en && isset( $schema[ $base_key ] ) && ! empty( $schema[ $base_key ]['bilingual'] ) ) {
				$def      = $schema[ $base_key ];
				$meta_key = Schema::meta_key_en( $base_key );
			} else {
				continue;
			}

			// Gallery entries may name media source files instead of IDs.
			if ( 'gallery' === ( $def['type'] ?? '' ) && is_array( $value ) ) {
				$value = self::resolve_media_list( $value );
			}
			if ( 'image' === ( $def['type'] ?? '' ) && is_string( $value ) && ! is_numeric( $value ) ) {
				$value = MediaImporter::ensure( $value, '' );
			}

			$clean = Schema::sanitize_value( $def, $value );
			if ( '' === $clean ) {
				delete_post_meta( $post_id, $meta_key );
			} else {
				// Slashed on the way in: update_post_meta() unslashes, which
				// would otherwise strip escapes out of JSON-encoded values.
				update_post_meta( $post_id, $meta_key, wp_slash( $clean ) );
			}
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Menu (sections taxonomy + items)                                       */
	/* ---------------------------------------------------------------------- */

	/**
	 * Seed menu sections and their items from data/menu.php:
	 * { sections: [{slug,name,name_en,order?}], items: [<cpt entry> + section] }.
	 *
	 * @return array<string,mixed>
	 */
	public static function install_menu( bool $force ): array {
		$data     = self::data( 'menu', false );
		$sections = (array) ( $data['sections'] ?? array() );
		$items    = (array) ( $data['items'] ?? array() );

		$section_report = array(
			'created'  => 0,
			'existing' => 0,
		);

		foreach ( $sections as $section ) {
			$section = (array) $section;
			$slug    = sanitize_title( (string) ( $section['slug'] ?? '' ) );
			$name    = sanitize_text_field( (string) ( $section['name'] ?? '' ) );
			if ( '' === $slug || '' === $name ) {
				continue;
			}

			$existing = get_term_by( 'slug', $slug, Schema::MENU_SECTION_TAX );
			if ( $existing instanceof \WP_Term ) {
				$term_id = (int) $existing->term_id;
				++$section_report['existing'];
			} else {
				$created = wp_insert_term( $name, Schema::MENU_SECTION_TAX, array( 'slug' => $slug ) );
				if ( is_wp_error( $created ) ) {
					continue;
				}
				$term_id = (int) $created['term_id'];
				update_term_meta( $term_id, Installer::MARKER_META, 1 );
				++$section_report['created'];
			}

			$name_en = sanitize_text_field( (string) ( $section['name_en'] ?? '' ) );
			if ( '' !== $name_en ) {
				update_term_meta( $term_id, \Gramo\Core\I18n\Translations::TERM_NAME_EN, $name_en );
			}
		}

		// Items ride the generic CPT path with their section as a term.
		$prepared = array();
		foreach ( $items as $item ) {
			$item = (array) $item;
			if ( isset( $item['section'] ) ) {
				$item['_terms'] = array( Schema::MENU_SECTION_TAX => array( sanitize_title( (string) $item['section'] ) ) );
			}
			$prepared[] = $item;
		}

		$item_report = self::install_entries( 'gramo_menu_item', $prepared, $force );

		return array(
			'sections' => $section_report,
			'items'    => $item_report,
		);
	}

	/**
	 * Seed prepared entries through the generic CPT path without re-reading a
	 * data file.
	 *
	 * @param array<int,array<string,mixed>> $entries Prepared entries.
	 * @return array<string,int>
	 */
	private static function install_entries( string $post_type, array $entries, bool $force ): array {
		// Reuse install_cpt's core by writing through a shared implementation.
		$report = array(
			'created' => 0,
			'updated' => 0,
			'skipped' => 0,
			'failed'  => 0,
		);
		$schema = Schema::fields( $post_type );

		foreach ( $entries as $entry ) {
			$title = sanitize_text_field( (string) ( $entry['title'] ?? '' ) );
			$slug  = sanitize_title( (string) ( $entry['slug'] ?? $title ) );
			if ( '' === $slug ) {
				++$report['failed'];
				continue;
			}

			$existing_id = self::find_by_slug( $post_type, $slug );
			if ( $existing_id > 0 && ! $force ) {
				++$report['skipped'];
				continue;
			}

			$post_id = wp_insert_post(
				array(
					'ID'          => $existing_id,
					'post_type'   => $post_type,
					'post_status' => 'publish',
					'post_title'  => $title,
					'post_name'   => $slug,
					'menu_order'  => (int) ( $entry['order'] ?? 0 ),
				),
				true
			);
			if ( is_wp_error( $post_id ) || 0 === $post_id ) {
				++$report['failed'];
				continue;
			}
			$existing_id > 0 ? ++$report['updated'] : ++$report['created'];

			update_post_meta( $post_id, Installer::MARKER_META, 1 );
			self::apply_fields( (int) $post_id, $schema, (array) ( $entry['fields'] ?? array() ) );
			self::maybe_set_thumbnail( (int) $post_id, (string) ( $entry['media'] ?? '' ), $title );

			if ( isset( $entry['_terms'] ) && is_array( $entry['_terms'] ) ) {
				foreach ( $entry['_terms'] as $taxonomy => $term_slugs ) {
					wp_set_object_terms( (int) $post_id, (array) $term_slugs, (string) $taxonomy );
				}
			}
		}

		return $report;
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Translation pairs (pages + journal)                                    */
	/* ---------------------------------------------------------------------- */

	/**
	 * Seed page pairs from data/pages.php:
	 * { pair, template?, is_front?, es: {title,slug,content,...}, en: {...} }.
	 *
	 * @return array<string,int>
	 */
	public static function install_page_pairs( bool $force ): array {
		$report = array(
			'created' => 0,
			'updated' => 0,
			'skipped' => 0,
			'failed'  => 0,
		);

		foreach ( self::data( 'pages' ) as $pair ) {
			$pair = (array) $pair;
			if ( ! isset( $pair['es'] ) || ! is_array( $pair['es'] ) ) {
				continue; // Legacy flat entries are handled by Installer::install_pages().
			}

			$es_id = self::seed_pair_side( 'page', (array) $pair['es'], 'es', $pair, $force, $report );
			$en_id = isset( $pair['en'] ) && is_array( $pair['en'] )
				? self::seed_pair_side( 'page', (array) $pair['en'], 'en', $pair, $force, $report )
				: 0;

			self::link_pair( $es_id, $en_id );

			if ( ! empty( $pair['is_front'] ) && $es_id > 0 ) {
				update_option( 'show_on_front', 'page' );
				update_option( 'page_on_front', $es_id );
			}
		}

		return $report;
	}

	/**
	 * Seed journal pairs + shared categories from data/journal.php:
	 * { categories: [{slug,name,name_en}], posts: [{pair, categories: [slugs],
	 *   date?, media?, es:{title,slug,content,excerpt?}, en:{...}}] }.
	 *
	 * @return array<string,mixed>
	 */
	public static function install_journal( bool $force ): array {
		$data       = self::data( 'journal', false );
		$categories = (array) ( $data['categories'] ?? array() );
		$posts      = (array) ( $data['posts'] ?? array() );

		$cat_ids = array();
		foreach ( $categories as $cat ) {
			$cat  = (array) $cat;
			$slug = sanitize_title( (string) ( $cat['slug'] ?? '' ) );
			$name = sanitize_text_field( (string) ( $cat['name'] ?? '' ) );
			if ( '' === $slug || '' === $name ) {
				continue;
			}
			$existing = get_term_by( 'slug', $slug, 'category' );
			if ( $existing instanceof \WP_Term ) {
				$term_id = (int) $existing->term_id;
			} else {
				$created = wp_insert_term( $name, 'category', array( 'slug' => $slug ) );
				if ( is_wp_error( $created ) ) {
					continue;
				}
				$term_id = (int) $created['term_id'];
				update_term_meta( $term_id, Installer::MARKER_META, 1 );
			}
			$name_en = sanitize_text_field( (string) ( $cat['name_en'] ?? '' ) );
			if ( '' !== $name_en ) {
				update_term_meta( $term_id, \Gramo\Core\I18n\Translations::TERM_NAME_EN, $name_en );
			}
			$cat_ids[ $slug ] = $term_id;
		}

		$report = array(
			'created' => 0,
			'updated' => 0,
			'skipped' => 0,
			'failed'  => 0,
		);

		foreach ( $posts as $pair ) {
			$pair  = (array) $pair;
			$es_id = self::seed_pair_side( 'post', (array) ( $pair['es'] ?? array() ), 'es', $pair, $force, $report );
			$en_id = isset( $pair['en'] ) && is_array( $pair['en'] )
				? self::seed_pair_side( 'post', (array) $pair['en'], 'en', $pair, $force, $report )
				: 0;

			self::link_pair( $es_id, $en_id );

			$term_ids = array();
			foreach ( (array) ( $pair['categories'] ?? array() ) as $slug ) {
				$slug = sanitize_title( (string) $slug );
				if ( isset( $cat_ids[ $slug ] ) ) {
					$term_ids[] = $cat_ids[ $slug ];
				}
			}
			foreach ( array( $es_id, $en_id ) as $post_id ) {
				if ( $post_id > 0 && array() !== $term_ids ) {
					wp_set_post_categories( $post_id, $term_ids );
				}
			}
		}

		return array(
			'categories' => count( $cat_ids ),
			'posts'      => $report,
		);
	}

	/**
	 * Insert one language side of a pair.
	 *
	 * @param array<string,mixed> $side   Language entry (title/slug/content/...).
	 * @param array<string,mixed> $pair   The full pair entry.
	 * @param array<string,int>   $report Mutated tally.
	 */
	private static function seed_pair_side( string $post_type, array $side, string $locale, array $pair, bool $force, array &$report ): int {
		$title = sanitize_text_field( (string) ( $side['title'] ?? '' ) );
		$slug  = sanitize_title( (string) ( $side['slug'] ?? $title ) );
		if ( '' === $slug ) {
			return 0;
		}

		$existing_id = self::find_by_slug( $post_type, $slug );
		if ( $existing_id > 0 && ! $force ) {
			++$report['skipped'];
			return $existing_id;
		}

		$postarr = array(
			'ID'           => $existing_id,
			'post_type'    => $post_type,
			'post_status'  => 'publish',
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_content' => (string) ( $side['content'] ?? '' ),
		);
		if ( isset( $side['excerpt'] ) ) {
			$postarr['post_excerpt'] = sanitize_textarea_field( (string) $side['excerpt'] );
		}
		if ( isset( $pair['date'] ) ) {
			$postarr['post_date'] = sanitize_text_field( (string) $pair['date'] ) . ' 09:00:00';
		}

		$post_id = self::without_kses( static fn() => wp_insert_post( $postarr, true ) );
		if ( is_wp_error( $post_id ) || 0 === $post_id ) {
			++$report['failed'];
			return 0;
		}
		$existing_id > 0 ? ++$report['updated'] : ++$report['created'];
		$post_id = (int) $post_id;

		update_post_meta( $post_id, Installer::MARKER_META, 1 );
		update_post_meta( $post_id, Schema::LOCALE_META, $locale );

		$template = (string) ( $pair['template'] ?? '' );
		if ( 'page' === $post_type ) {
			update_post_meta( $post_id, '_wp_page_template', '' !== $template ? $template : 'default' );
		}

		foreach ( array(
			'seo_short'        => Installer::SEO_SHORT,
			'meta_description' => Installer::META_DESC,
		) as $data_key => $meta_key ) {
			$value = sanitize_text_field( (string) ( $side[ $data_key ] ?? '' ) );
			if ( '' !== $value ) {
				update_post_meta( $post_id, $meta_key, $value );
			}
		}

		self::maybe_set_thumbnail( $post_id, (string) ( $pair['media'] ?? '' ), $title );

		return $post_id;
	}

	/**
	 * Link both sides of a pair (idempotent).
	 */
	private static function link_pair( int $es_id, int $en_id ): void {
		if ( $es_id <= 0 || $en_id <= 0 ) {
			return;
		}
		update_post_meta( $es_id, Schema::TRANSLATION_META, $en_id );
		update_post_meta( $en_id, Schema::TRANSLATION_META, $es_id );
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Site settings                                                          */
	/* ---------------------------------------------------------------------- */

	/**
	 * Install option groups from data/settings.php only when absent, so
	 * client edits survive re-seeding.
	 *
	 * "Absent" includes a row that still holds the pristine schema defaults:
	 * {@see Options::install_defaults()} runs earlier in the install and
	 * creates every option row, so a literal null-check would mean the seed
	 * data never lands. Any deviation from the defaults is a client edit and
	 * is kept untouched.
	 *
	 * @return array<string,string>
	 */
	public static function install_site_settings(): array {
		$data     = self::data( 'settings', false );
		$defaults = Options::defaults();
		$report   = array();

		foreach ( array(
			Options::SITE     => 'site',
			Options::BUSINESS => 'business',
		) as $option => $key ) {
			$values = (array) ( $data[ $key ] ?? array() );
			if ( array() === $values ) {
				$report[ $key ] = 'empty';
				continue;
			}
			$existing = get_option( $option, null );
			$pristine = null === $existing
				|| ( is_array( $existing ) && ( $defaults[ $option ] ?? null ) === $existing );
			if ( $pristine ) {
				update_option( $option, $values );
				$report[ $key ] = 'installed';
			} else {
				$report[ $key ] = 'kept';
			}
		}

		return $report;
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Helpers                                                                */
	/* ---------------------------------------------------------------------- */

	/**
	 * Load a data file; returns a list by default or the raw array shape.
	 *
	 * @return array<int|string,mixed>
	 */
	private static function data( string $name, bool $as_list = true ): array {
		$file = GRAMO_CORE_DIR . 'data/' . $name . '.php';
		if ( ! is_readable( $file ) ) {
			return array();
		}
		$data = include $file;
		if ( ! is_array( $data ) ) {
			return array();
		}
		return $as_list ? array_values( $data ) : $data;
	}

	/**
	 * Find a seeded post by slug within a post type (any status).
	 */
	private static function find_by_slug( string $post_type, string $slug ): int {
		$found = get_posts(
			array(
				'post_type'     => $post_type,
				'name'          => $slug,
				'post_status'   => 'any',
				'numberposts'   => 1,
				'fields'        => 'ids',
				'no_found_rows' => true,
			)
		);
		return array() === $found ? 0 : (int) $found[0];
	}

	/**
	 * Attach a featured image from a data/media/source key when provided.
	 */
	private static function maybe_set_thumbnail( int $post_id, string $media_key, string $alt ): void {
		if ( '' === $media_key ) {
			return;
		}
		$attachment_id = MediaImporter::ensure( $media_key, $alt );
		if ( $attachment_id > 0 ) {
			set_post_thumbnail( $post_id, $attachment_id );
		}
	}

	/**
	 * Resolve a gallery list that may mix attachment IDs and media source keys.
	 *
	 * @param array<int,mixed> $value Raw gallery entry.
	 * @return array<int,int>
	 */
	private static function resolve_media_list( array $value ): array {
		$ids = array();
		foreach ( $value as $item ) {
			if ( is_numeric( $item ) ) {
				$ids[] = (int) $item;
				continue;
			}
			$id = MediaImporter::ensure( (string) $item, '' );
			if ( $id > 0 ) {
				$ids[] = $id;
			}
		}
		return $ids;
	}

	/**
	 * Run a callback with kses filtering suspended (trusted block markup).
	 *
	 * @template T
	 * @param callable():T $callback
	 * @return T
	 */
	private static function without_kses( callable $callback ): mixed {
		$had = false !== has_filter( 'content_save_pre', 'wp_filter_post_kses' );
		if ( $had ) {
			kses_remove_filters();
		}
		try {
			return $callback();
		} finally {
			if ( $had ) {
				kses_init_filters();
			}
		}
	}
}
