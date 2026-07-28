/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { MediaField } from '../shared/media-attribute';

const ALLOWED_FORMATS = [ 'core/italic' ];
const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/quote',
	'core/buttons',
];
const TEMPLATE = [ [ 'core/paragraph' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { media, imageSide, eyebrow, heading } = attributes;

	const blockProps = useBlockProps( {
		className: `gramo-split-editor is-image-${ imageSide }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Imagen', 'gramo-core' ) }>
					<MediaField
						label={ __( 'Imagen', 'gramo-core' ) }
						value={ media }
						onChange={ ( next ) =>
							setAttributes( { media: next } )
						}
					/>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Lado de la imagen', 'gramo-core' ) }
						value={ imageSide }
						options={ [
							{
								value: 'left',
								label: __( 'Izquierda', 'gramo-core' ),
							},
							{
								value: 'right',
								label: __( 'Derecha', 'gramo-core' ),
							},
						] }
						onChange={ ( next ) =>
							setAttributes( { imageSide: next } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<figure className="gramo-split-editor__media">
					{ media?.url ? (
						<img src={ media.url } alt={ media.alt || '' } />
					) : (
						<div className="gramo-split-editor__placeholder">
							{ __(
								'Selecciona una imagen en el panel lateral.',
								'gramo-core'
							) }
						</div>
					) }
				</figure>
				<div className="gramo-split-editor__body">
					<RichText
						tagName="p"
						className="gramo-split-editor__eyebrow"
						value={ eyebrow }
						allowedFormats={ ALLOWED_FORMATS }
						placeholder={ __( 'Entradilla…', 'gramo-core' ) }
						onChange={ ( next ) =>
							setAttributes( { eyebrow: next } )
						}
					/>
					<RichText
						tagName="h2"
						className="gramo-split-editor__heading"
						value={ heading }
						allowedFormats={ ALLOWED_FORMATS }
						placeholder={ __(
							'Título de la sección…',
							'gramo-core'
						) }
						onChange={ ( next ) =>
							setAttributes( { heading: next } )
						}
					/>
					<div className="gramo-split-editor__content">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
