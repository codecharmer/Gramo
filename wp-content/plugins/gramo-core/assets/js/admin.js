/**
 * Gramo admin behaviors (dependency-free vanilla JS).
 *
 * Powers the schema meta boxes rendered by src/Content/MetaBoxes.php and the
 * Ajustes screen:
 *   - Single-image picker  [data-gramo-media]    (also used by the SEO tab).
 *   - Gallery picker       [data-gramo-gallery]  (wp.media, multiple).
 *   - Repeater-lite rows   [data-gramo-repeater] (<template> + __INDEX__).
 *
 * Localized data arrives via `gramoAdmin` (see src/Support/Assets.php).
 */
( function () {
	'use strict';

	var strings = ( window.gramoAdmin && window.gramoAdmin.strings ) || {};

	function hasMedia() {
		return typeof window.wp !== 'undefined' && typeof window.wp.media === 'function';
	}

	/**
	 * Best thumbnail URL for an attachment JSON from the media modal.
	 */
	function thumbUrl( attachment ) {
		if ( attachment.sizes && attachment.sizes.thumbnail && attachment.sizes.thumbnail.url ) {
			return attachment.sizes.thumbnail.url;
		}
		return attachment.url || '';
	}

	/* ------------------------------------------------------------------ */
	/* Single-image picker ([data-gramo-media])                           */
	/* ------------------------------------------------------------------ */

	function openSinglePicker( wrap ) {
		var frame = window.wp.media( {
			title: strings.selectImage || 'Seleccionar imagen',
			library: { type: 'image' },
			multiple: false,
			button: { text: strings.useImage || 'Usar esta imagen' }
		} );

		frame.on( 'select', function () {
			var attachment = frame.state().get( 'selection' ).first().toJSON();
			var input = wrap.querySelector( '[data-gramo-media-input]' );
			var preview = wrap.querySelector( '.gramo-media__preview' );
			var removeBtn = wrap.querySelector( '.gramo-media-remove' );

			if ( input ) {
				input.value = String( attachment.id );
			}
			if ( preview ) {
				preview.src = thumbUrl( attachment );
				preview.hidden = false;
			}
			if ( removeBtn ) {
				removeBtn.hidden = false;
			}
		} );

		frame.open();
	}

	function clearSinglePicker( wrap ) {
		var input = wrap.querySelector( '[data-gramo-media-input]' );
		var preview = wrap.querySelector( '.gramo-media__preview' );
		var removeBtn = wrap.querySelector( '.gramo-media-remove' );

		if ( input ) {
			input.value = '';
		}
		if ( preview ) {
			preview.src = '';
			preview.hidden = true;
		}
		if ( removeBtn ) {
			removeBtn.hidden = true;
		}
	}

	/* ------------------------------------------------------------------ */
	/* Gallery picker ([data-gramo-gallery])                              */
	/* ------------------------------------------------------------------ */

	function galleryIds( wrap ) {
		var input = wrap.querySelector( '[data-gramo-gallery-input]' );
		if ( ! input || ! input.value ) {
			return [];
		}
		try {
			var parsed = JSON.parse( input.value );
			return Array.isArray( parsed ) ? parsed.map( Number ).filter( Boolean ) : [];
		} catch ( e ) {
			return [];
		}
	}

	function writeGalleryIds( wrap, ids ) {
		var input = wrap.querySelector( '[data-gramo-gallery-input]' );
		if ( input ) {
			input.value = ids.length ? JSON.stringify( ids ) : '';
		}
	}

	function appendGalleryItem( wrap, id, url ) {
		var grid = wrap.querySelector( '[data-gramo-gallery-grid]' );
		if ( ! grid ) {
			return;
		}
		var item = document.createElement( 'span' );
		item.className = 'gramo-gallery__item';
		item.setAttribute( 'data-id', String( id ) );

		var img = document.createElement( 'img' );
		img.src = url;
		img.alt = '';
		item.appendChild( img );

		var btn = document.createElement( 'button' );
		btn.type = 'button';
		btn.className = 'button-link gramo-gallery-remove';
		btn.setAttribute( 'aria-label', strings.remove || 'Quitar' );
		btn.textContent = '×';
		item.appendChild( btn );

		grid.appendChild( item );
	}

	function openGalleryPicker( wrap ) {
		var frame = window.wp.media( {
			title: strings.selectImage || 'Seleccionar imagen',
			library: { type: 'image' },
			multiple: 'add',
			button: { text: strings.useImage || 'Usar esta imagen' }
		} );

		frame.on( 'select', function () {
			var ids = galleryIds( wrap );
			frame.state().get( 'selection' ).toJSON().forEach( function ( attachment ) {
				var id = Number( attachment.id );
				if ( ! id || ids.indexOf( id ) !== -1 ) {
					return;
				}
				ids.push( id );
				appendGalleryItem( wrap, id, thumbUrl( attachment ) );
			} );
			writeGalleryIds( wrap, ids );
		} );

		frame.open();
	}

	function removeGalleryItem( wrap, item ) {
		var id = Number( item.getAttribute( 'data-id' ) );
		var ids = galleryIds( wrap ).filter( function ( existing ) {
			return existing !== id;
		} );
		item.remove();
		writeGalleryIds( wrap, ids );
	}

	/* ------------------------------------------------------------------ */
	/* Repeater-lite ([data-gramo-repeater])                              */
	/* ------------------------------------------------------------------ */

	function addRepeaterRow( container ) {
		var template = container.querySelector( 'template' );
		var rows = container.querySelector( '[data-gramo-repeater-rows]' );
		if ( ! template || ! rows ) {
			return;
		}
		var index = parseInt( container.getAttribute( 'data-next-index' ) || '0', 10 );
		rows.insertAdjacentHTML( 'beforeend', template.innerHTML.split( '__INDEX__' ).join( String( index ) ) );
		container.setAttribute( 'data-next-index', String( index + 1 ) );

		var added = rows.lastElementChild;
		var first = added && added.querySelector( 'input' );
		if ( first ) {
			first.focus();
		}
	}

	/* ------------------------------------------------------------------ */
	/* Delegated events                                                   */
	/* ------------------------------------------------------------------ */

	document.addEventListener( 'click', function ( event ) {
		var target = event.target;
		if ( ! target || typeof target.closest !== 'function' ) {
			return;
		}
		var btn;
		var wrap;

		// Single image: select.
		btn = target.closest( '.gramo-media-select' );
		if ( btn ) {
			wrap = btn.closest( '[data-gramo-media]' );
			if ( wrap && hasMedia() ) {
				event.preventDefault();
				openSinglePicker( wrap );
			}
			return;
		}

		// Single image: remove.
		btn = target.closest( '.gramo-media-remove' );
		if ( btn ) {
			wrap = btn.closest( '[data-gramo-media]' );
			if ( wrap ) {
				event.preventDefault();
				clearSinglePicker( wrap );
			}
			return;
		}

		// Gallery: add images.
		btn = target.closest( '.gramo-gallery-add' );
		if ( btn ) {
			wrap = btn.closest( '[data-gramo-gallery]' );
			if ( wrap && hasMedia() ) {
				event.preventDefault();
				openGalleryPicker( wrap );
			}
			return;
		}

		// Gallery: remove one image.
		btn = target.closest( '.gramo-gallery-remove' );
		if ( btn ) {
			wrap = btn.closest( '[data-gramo-gallery]' );
			var item = btn.closest( '.gramo-gallery__item' );
			if ( wrap && item ) {
				event.preventDefault();
				removeGalleryItem( wrap, item );
			}
			return;
		}

		// Repeater: add row.
		btn = target.closest( '.gramo-repeater-add' );
		if ( btn ) {
			var container = btn.closest( '[data-gramo-repeater]' );
			if ( container ) {
				event.preventDefault();
				addRepeaterRow( container );
			}
			return;
		}

		// Repeater: remove row.
		btn = target.closest( '.gramo-repeater-remove' );
		if ( btn ) {
			var row = btn.closest( '.gramo-repeater__row' );
			if ( row ) {
				event.preventDefault();
				row.remove();
			}
		}
	} );
} )();
