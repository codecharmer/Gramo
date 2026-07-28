<?php
/**
 * Schema-driven admin meta boxes — generated from {@see Schema}.
 *
 * Renders one «Detalles de Gramo» box per field-bearing post type (the Gramo
 * CPTs plus the WooCommerce product) with a control per schema field:
 * bilingual pairs side by side (ES/EN), wp.media pickers for image/gallery,
 * "repeater-lite" rows for list fields, a per-day hours grid, and post
 * pickers. Saving runs every submitted value through
 * {@see Schema::sanitize_value()} and writes the `_gramo_*` meta keys
 * (an empty sanitized value deletes the row).
 *
 * The JS behaviors (media pickers, repeater rows) live in assets/js/admin.js,
 * enqueued by {@see \Gramo\Core\Support\Assets} on these edit screens.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Content;

use Gramo\Core\Contracts\Bootable;
use WP_Post;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class MetaBoxes implements Bootable {

	private const NONCE_ACTION = 'gramo_schema_save';
	private const NONCE_FIELD  = 'gramo_schema_nonce';

	/** POST group for ES (primary) values: gramo_schema[<field>]. */
	private const GROUP = 'gramo_schema';

	/** POST group for EN siblings of bilingual fields: gramo_schema_en[<field>]. */
	private const GROUP_EN = 'gramo_schema_en';

	public function boot(): void {
		add_action( 'add_meta_boxes', array( $this, 'register_boxes' ) );
		add_action( 'save_post', array( $this, 'save' ) );
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Registration                                                           */
	/* ---------------------------------------------------------------------- */

	/**
	 * Add the schema box on every field-bearing post type (incl. Woo product).
	 */
	public function register_boxes( string $post_type ): void {
		if ( ! in_array( $post_type, Schema::field_bearing_types(), true ) ) {
			return;
		}
		if ( array() === Schema::fields( $post_type ) ) {
			return;
		}
		add_meta_box(
			'gramo-schema',
			__( 'Detalles de Gramo', 'gramo-core' ),
			array( $this, 'render_box' ),
			$post_type,
			'normal',
			'high'
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Rendering                                                              */
	/* ---------------------------------------------------------------------- */

	/**
	 * Render every schema field for the post's type as a form-table.
	 */
	public function render_box( WP_Post $post ): void {
		wp_nonce_field( self::NONCE_ACTION, self::NONCE_FIELD );

		echo '<table class="form-table gramo-schema-table" role="presentation"><tbody>';
		foreach ( Schema::fields( $post->post_type ) as $field => $def ) {
			$this->render_row( $post->ID, (string) $field, (array) $def );
		}
		echo '</tbody></table>';
	}

	/**
	 * One form-table row: label cell + control cell (+ help text).
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function render_row( int $post_id, string $field, array $def ): void {
		$type      = (string) ( $def['type'] ?? 'text' );
		$label     = (string) ( $def['label'] ?? $field );
		$help      = (string) ( $def['help'] ?? '' );
		$id        = 'gramo-field-' . $field;
		$has_label = in_array( $type, array( 'text', 'textarea', 'number', 'url', 'email', 'select', 'date', 'time', 'toggle', 'post_select' ), true );

		echo '<tr>';
		if ( $has_label ) {
			echo '<th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th>';
		} else {
			echo '<th scope="row">' . esc_html( $label ) . '</th>';
		}
		echo '<td>';

		if ( ! empty( $def['bilingual'] ) ) {
			$this->bilingual_control( $post_id, $field, $def, $id );
		} else {
			$this->control( $post_id, $field, $def, $id );
		}

		// Toggles print their help inline next to the checkbox.
		if ( '' !== $help && 'toggle' !== $type ) {
			echo '<p class="description">' . esc_html( $help ) . '</p>';
		} elseif ( 'hours' === $type && '' === $help ) {
			echo '<p class="description">' . esc_html__( 'Deja un día vacío para marcarlo como cerrado.', 'gramo-core' ) . '</p>';
		}

		echo '</td></tr>';
	}

	/**
	 * ES + EN inputs side by side for a bilingual field.
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function bilingual_control( int $post_id, string $field, array $def, string $id ): void {
		$es = (string) get_post_meta( $post_id, Schema::meta_key( $field ), true );
		$en = (string) get_post_meta( $post_id, Schema::meta_key_en( $field ), true );

		echo '<div class="gramo-bilingual">';
		echo '<div class="gramo-bilingual__col"><span class="gramo-bilingual__lang">ES</span>';
		$this->scalar_input( $def, $id, self::GROUP . '[' . $field . ']', $es );
		echo '</div>';
		echo '<div class="gramo-bilingual__col"><span class="gramo-bilingual__lang">EN</span>';
		$this->scalar_input( $def, $id . '-en', self::GROUP_EN . '[' . $field . ']', $en );
		echo '</div>';
		echo '</div>';
	}

	/**
	 * Dispatch a single (non-bilingual) field to its control renderer.
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function control( int $post_id, string $field, array $def, string $id ): void {
		$type  = (string) ( $def['type'] ?? 'text' );
		$name  = self::GROUP . '[' . $field . ']';
		$value = (string) get_post_meta( $post_id, Schema::meta_key( $field ), true );

		switch ( $type ) {
			case 'select':
				$this->select_input( $def, $id, $name, $value );
				break;
			case 'toggle':
				$this->toggle_input( $def, $id, $name, $value );
				break;
			case 'image':
				$this->image_input( $id, $name, $value );
				break;
			case 'gallery':
				$this->gallery_input( $name, $value );
				break;
			case 'list':
				$this->list_input( $def, $field, $value );
				break;
			case 'hours':
				$this->hours_input( $field, $value );
				break;
			case 'post_select':
				$this->post_select_input( $def, $id, $name, $value );
				break;
			default:
				$this->scalar_input( $def, $id, $name, $value );
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Controls                                                               */
	/* ---------------------------------------------------------------------- */

	/**
	 * text|url|email|number|date|time input, or a 4-row textarea.
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function scalar_input( array $def, string $id, string $name, string $value ): void {
		$type = (string) ( $def['type'] ?? 'text' );

		if ( 'textarea' === $type ) {
			printf(
				'<textarea id="%1$s" name="%2$s" rows="4" class="large-text">%3$s</textarea>',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_textarea( $value )
			);
			return;
		}

		if ( 'number' === $type ) {
			printf(
				'<input type="number" step="0.01" id="%1$s" name="%2$s" value="%3$s" class="regular-text">',
				esc_attr( $id ),
				esc_attr( $name ),
				esc_attr( $value )
			);
			return;
		}

		printf(
			'<input type="%1$s" id="%2$s" name="%3$s" value="%4$s" class="regular-text">',
			esc_attr( $type ),
			esc_attr( $id ),
			esc_attr( $name ),
			esc_attr( $value )
		);
	}

	/**
	 * Dropdown from the definition's `choices` (leading «—» unless it has one).
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function select_input( array $def, string $id, string $name, string $value ): void {
		$choices = (array) ( $def['choices'] ?? array() );

		printf( '<select id="%1$s" name="%2$s">', esc_attr( $id ), esc_attr( $name ) );
		if ( ! array_key_exists( '', $choices ) ) {
			echo '<option value="">&mdash;</option>';
		}
		foreach ( $choices as $key => $choice_label ) {
			printf(
				'<option value="%1$s" %2$s>%3$s</option>',
				esc_attr( (string) $key ),
				selected( $value, (string) $key, false ),
				esc_html( (string) $choice_label )
			);
		}
		echo '</select>';
	}

	/**
	 * Checkbox storing '1' / '' — help (or the label) rendered inline.
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function toggle_input( array $def, string $id, string $name, string $value ): void {
		$text = (string) ( $def['help'] ?? '' );
		if ( '' === $text ) {
			$text = (string) ( $def['label'] ?? '' );
		}
		printf(
			'<label for="%1$s"><input type="checkbox" id="%1$s" name="%2$s" value="1" %3$s> %4$s</label>',
			esc_attr( $id ),
			esc_attr( $name ),
			checked( '1', $value, false ),
			esc_html( $text )
		);
	}

	/**
	 * Single image: hidden attachment-ID input + preview, wired to wp.media.
	 * Same markup contract as the Ajustes SEO tab ([data-gramo-media]).
	 */
	private function image_input( string $id, string $name, string $value ): void {
		$attachment_id = (int) $value;
		$url           = $attachment_id > 0 ? wp_get_attachment_image_url( $attachment_id, 'thumbnail' ) : false;
		$src           = is_string( $url ) ? $url : '';

		echo '<div class="gramo-media" data-gramo-media>';
		printf(
			'<input type="hidden" id="%1$s" name="%2$s" value="%3$s" data-gramo-media-input>',
			esc_attr( $id ),
			esc_attr( $name ),
			esc_attr( $attachment_id > 0 ? (string) $attachment_id : '' )
		);
		printf(
			'<img class="gramo-media__preview" src="%1$s" alt="" %2$s>',
			esc_url( $src ),
			$src ? '' : 'hidden'
		);
		echo '<span class="gramo-media__buttons">';
		printf( '<button type="button" class="button gramo-media-select">%s</button> ', esc_html__( 'Seleccionar imagen', 'gramo-core' ) );
		printf( '<button type="button" class="button-link gramo-media-remove" %2$s>%1$s</button>', esc_html__( 'Quitar', 'gramo-core' ), $src ? '' : 'hidden' );
		echo '</span></div>';
	}

	/**
	 * Gallery: hidden JSON array of attachment IDs + thumbnail grid, wired to
	 * a multi-select wp.media frame ([data-gramo-gallery]).
	 */
	private function gallery_input( string $name, string $value ): void {
		$ids = json_decode( $value, true );
		$ids = is_array( $ids ) ? array_values( array_filter( array_map( 'intval', $ids ) ) ) : array();

		echo '<div class="gramo-gallery" data-gramo-gallery>';
		printf(
			'<input type="hidden" name="%1$s" value="%2$s" data-gramo-gallery-input>',
			esc_attr( $name ),
			esc_attr( array() === $ids ? '' : (string) wp_json_encode( $ids ) )
		);
		echo '<div class="gramo-gallery__grid" data-gramo-gallery-grid>';
		foreach ( $ids as $attachment_id ) {
			$url = wp_get_attachment_image_url( $attachment_id, 'thumbnail' );
			if ( ! is_string( $url ) ) {
				continue;
			}
			printf(
				'<span class="gramo-gallery__item" data-id="%1$d"><img src="%2$s" alt=""><button type="button" class="button-link gramo-gallery-remove" aria-label="%3$s">&times;</button></span>',
				(int) $attachment_id,
				esc_url( $url ),
				esc_attr__( 'Quitar', 'gramo-core' )
			);
		}
		echo '</div>';
		printf( '<button type="button" class="button gramo-gallery-add">%s</button>', esc_html__( 'Añadir imágenes', 'gramo-core' ) );
		echo '</div>';
	}

	/**
	 * Repeater-lite: existing rows + a <template> row ("__INDEX__" placeholder)
	 * cloned by admin.js. Row inputs: gramo_schema[<field>][<i>][<col>].
	 *
	 * @param array<string,mixed> $def Field definition (with `columns`).
	 */
	private function list_input( array $def, string $field, string $value ): void {
		$columns = (array) ( $def['columns'] ?? array() );
		$rows    = json_decode( $value, true );
		$rows    = is_array( $rows ) ? array_values( $rows ) : array();

		printf( '<div class="gramo-repeater" data-gramo-repeater data-next-index="%d">', count( $rows ) );
		echo '<div class="gramo-repeater__rows" data-gramo-repeater-rows>';
		foreach ( $rows as $index => $row ) {
			$this->list_row( $field, (string) $index, $columns, is_array( $row ) ? $row : array() );
		}
		echo '</div>';
		echo '<template class="gramo-repeater__template">';
		$this->list_row( $field, '__INDEX__', $columns, array() );
		echo '</template>';
		printf( '<button type="button" class="button gramo-repeater-add">%s</button>', esc_html__( 'Añadir fila', 'gramo-core' ) );
		echo '</div>';
	}

	/**
	 * One repeater row: an input per column + a remove button.
	 *
	 * @param string              $index   Row index (or the '__INDEX__' placeholder).
	 * @param array<string,mixed> $columns Column definitions.
	 * @param array<string,mixed> $row     Stored row values.
	 */
	private function list_row( string $field, string $index, array $columns, array $row ): void {
		echo '<div class="gramo-repeater__row">';
		foreach ( $columns as $col_key => $col_def ) {
			$col_def   = (array) $col_def;
			$col_key   = (string) $col_key;
			$col_label = (string) ( $col_def['label'] ?? $col_key );
			$col_type  = (string) ( $col_def['type'] ?? 'text' );
			$col_value = (string) ( $row[ $col_key ] ?? '' );
			$name      = self::GROUP . '[' . $field . '][' . $index . '][' . $col_key . ']';

			echo '<label class="gramo-repeater__col">';
			echo '<span class="gramo-repeater__col-label">' . esc_html( $col_label ) . '</span>';
			if ( 'number' === $col_type ) {
				printf( '<input type="number" step="0.01" name="%1$s" value="%2$s">', esc_attr( $name ), esc_attr( $col_value ) );
			} else {
				printf( '<input type="text" name="%1$s" value="%2$s">', esc_attr( $name ), esc_attr( $col_value ) );
			}
			echo '</label>';
		}
		printf(
			'<button type="button" class="button-link gramo-repeater-remove" aria-label="%s">&times;</button>',
			esc_attr__( 'Quitar', 'gramo-core' )
		);
		echo '</div>';
	}

	/**
	 * Seven-day grid of open/close time inputs (empty pair = closed).
	 */
	private function hours_input( string $field, string $value ): void {
		$stored = json_decode( $value, true );
		$stored = is_array( $stored ) ? $stored : array();

		echo '<div class="gramo-hours">';
		foreach ( $this->days() as $day => $day_label ) {
			$row   = is_array( $stored[ $day ] ?? null ) ? $stored[ $day ] : array();
			$open  = (string) ( $row['open'] ?? '' );
			$close = (string) ( $row['close'] ?? '' );
			$base  = self::GROUP . '[' . $field . '][' . $day . ']';

			echo '<div class="gramo-hours__row">';
			echo '<span class="gramo-hours__day">' . esc_html( $day_label ) . '</span>';
			printf(
				'<label><span>%1$s</span> <input type="time" name="%2$s" value="%3$s"></label>',
				esc_html__( 'Abre', 'gramo-core' ),
				esc_attr( $base . '[open]' ),
				esc_attr( $open )
			);
			printf(
				'<label><span>%1$s</span> <input type="time" name="%2$s" value="%3$s"></label>',
				esc_html__( 'Cierra', 'gramo-core' ),
				esc_attr( $base . '[close]' ),
				esc_attr( $close )
			);
			echo '</div>';
		}
		echo '</div>';
	}

	/**
	 * Dropdown of published posts of the definition's `post_type` (value = ID).
	 *
	 * @param array<string,mixed> $def Field definition.
	 */
	private function post_select_input( array $def, string $id, string $name, string $value ): void {
		$posts = get_posts(
			array(
				'post_type'   => (string) ( $def['post_type'] ?? 'post' ),
				'post_status' => 'publish',
				'numberposts' => 100,
				'orderby'     => 'title',
				'order'       => 'ASC',
			)
		);

		printf( '<select id="%1$s" name="%2$s">', esc_attr( $id ), esc_attr( $name ) );
		echo '<option value="">&mdash;</option>';
		foreach ( $posts as $item ) {
			if ( ! $item instanceof WP_Post ) {
				continue;
			}
			printf(
				'<option value="%1$d" %2$s>%3$s</option>',
				(int) $item->ID,
				selected( (int) $value, (int) $item->ID, false ),
				esc_html( get_the_title( $item ) )
			);
		}
		echo '</select>';
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Saving                                                                 */
	/* ---------------------------------------------------------------------- */

	/**
	 * Persist every schema field on save. All values pass through
	 * {@see Schema::sanitize_value()}; an empty result deletes the meta row.
	 */
	public function save( int $post_id ): void {
		if ( ! isset( $_POST[ self::NONCE_FIELD ] )
			|| ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST[ self::NONCE_FIELD ] ) ), self::NONCE_ACTION ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$post_type = (string) get_post_type( $post_id );
		if ( ! in_array( $post_type, Schema::field_bearing_types(), true ) ) {
			return;
		}
		$fields = Schema::fields( $post_type );
		if ( array() === $fields ) {
			return;
		}

		$submitted    = isset( $_POST[ self::GROUP ] ) && is_array( $_POST[ self::GROUP ] ) ? (array) wp_unslash( $_POST[ self::GROUP ] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- Sanitized via Schema::sanitize_value().
		$submitted_en = isset( $_POST[ self::GROUP_EN ] ) && is_array( $_POST[ self::GROUP_EN ] ) ? (array) wp_unslash( $_POST[ self::GROUP_EN ] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- Sanitized via Schema::sanitize_value().

		foreach ( $fields as $field => $def ) {
			$field = (string) $field;
			$def   = (array) $def;

			// A missing value (e.g. an unchecked toggle) sanitizes from ''.
			$clean = Schema::sanitize_value( $def, $submitted[ $field ] ?? '' );
			$this->persist( $post_id, Schema::meta_key( $field ), $clean );

			if ( ! empty( $def['bilingual'] ) ) {
				$clean_en = Schema::sanitize_value( $def, $submitted_en[ $field ] ?? '' );
				$this->persist( $post_id, Schema::meta_key_en( $field ), $clean_en );
			}
		}
	}

	/**
	 * update_post_meta, or delete_post_meta when the sanitized value is ''.
	 */
	private function persist( int $post_id, string $meta_key, string $value ): void {
		if ( '' === $value ) {
			delete_post_meta( $post_id, $meta_key );
			return;
		}
		update_post_meta( $post_id, $meta_key, $value );
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Helpers                                                                */
	/* ---------------------------------------------------------------------- */

	/**
	 * Storage day keys (Monday first) → short Spanish labels.
	 *
	 * @return array<string,string>
	 */
	private function days(): array {
		return array(
			'mon' => __( 'Lun', 'gramo-core' ),
			'tue' => __( 'Mar', 'gramo-core' ),
			'wed' => __( 'Mié', 'gramo-core' ),
			'thu' => __( 'Jue', 'gramo-core' ),
			'fri' => __( 'Vie', 'gramo-core' ),
			'sat' => __( 'Sáb', 'gramo-core' ),
			'sun' => __( 'Dom', 'gramo-core' ),
		);
	}
}
