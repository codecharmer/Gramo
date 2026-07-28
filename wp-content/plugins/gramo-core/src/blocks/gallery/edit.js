/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { items, layout, columns } = attributes;

	const blockProps = useBlockProps( {
		className: `gramo-gallery-editor is-layout-${ layout }`,
	} );

	const onSelectImages = ( selection ) => {
		const next = ( selection || [] ).map( ( media ) => {
			const existing = items.find( ( item ) => item.id === media.id );
			return {
				id: media.id || 0,
				url: media.url || '',
				alt: media.alt || '',
				caption:
					existing?.caption ||
					( typeof media.caption === 'string' ? media.caption : '' ),
			};
		} );
		setAttributes( { items: next } );
	};

	const updateCaption = ( index, caption ) => {
		setAttributes( {
			items: items.map( ( item, i ) =>
				i === index ? { ...item, caption } : item
			),
		} );
	};

	const removeItem = ( index ) => {
		setAttributes( {
			items: items.filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Disposición', 'gramo-core' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Formato', 'gramo-core' ) }
						value={ layout }
						options={ [
							{
								value: 'grid',
								label: __( 'Retícula', 'gramo-core' ),
							},
							{
								value: 'strip',
								label: __( 'Tira horizontal', 'gramo-core' ),
							},
						] }
						onChange={ ( next ) =>
							setAttributes( { layout: next } )
						}
					/>
					{ layout === 'grid' && (
						<RangeControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'Columnas', 'gramo-core' ) }
							min={ 2 }
							max={ 4 }
							value={ columns }
							onChange={ ( next ) =>
								setAttributes( { columns: next } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ items.length > 0 ? (
					<div
						className="gramo-gallery-editor__items"
						style={
							layout === 'grid'
								? {
										gridTemplateColumns: `repeat(${ columns }, 1fr)`,
								  }
								: undefined
						}
					>
						{ items.map( ( item, index ) => (
							<figure
								key={ item.id || index }
								className="gramo-gallery-editor__item"
							>
								<img src={ item.url } alt={ item.alt || '' } />
								<TextControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label={ __( 'Pie de foto', 'gramo-core' ) }
									hideLabelFromVision
									placeholder={ __(
										'Pie de foto…',
										'gramo-core'
									) }
									value={ item.caption || '' }
									onChange={ ( next ) =>
										updateCaption( index, next )
									}
								/>
								<Button
									className="gramo-gallery-editor__remove"
									variant="tertiary"
									isDestructive
									onClick={ () => removeItem( index ) }
								>
									{ __( 'Quitar', 'gramo-core' ) }
								</Button>
							</figure>
						) ) }
					</div>
				) : (
					<p className="gramo-gallery-editor__empty">
						{ __(
							'Añade imágenes para componer la galería.',
							'gramo-core'
						) }
					</p>
				) }
				<MediaUploadCheck>
					<MediaUpload
						multiple
						gallery
						addToGallery={ items.length > 0 }
						allowedTypes={ [ 'image' ] }
						value={ items.map( ( item ) => item.id ) }
						onSelect={ onSelectImages }
						render={ ( { open } ) => (
							<Button
								__next40pxDefaultSize
								variant="secondary"
								onClick={ open }
							>
								{ items.length > 0
									? __( 'Editar galería', 'gramo-core' )
									: __( 'Añadir imágenes', 'gramo-core' ) }
							</Button>
						) }
					/>
				</MediaUploadCheck>
			</div>
		</>
	);
}
