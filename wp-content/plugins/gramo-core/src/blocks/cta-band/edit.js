/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { CtaFields } from '../shared/link-control';
import { MediaField } from '../shared/media-attribute';

const ALLOWED_FORMATS = [ 'core/italic' ];

export default function Edit( { attributes, setAttributes } ) {
	const { heading, text, cta, tone, media } = attributes;

	const hasImage = Boolean( media?.url );
	const blockProps = useBlockProps( {
		className: `gramo-cta-band-editor is-tone-${ tone }${
			hasImage ? ' has-image' : ''
		}`,
		style: hasImage
			? { backgroundImage: `url(${ media.url })` }
			: undefined,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Ajustes', 'gramo-core' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Tono', 'gramo-core' ) }
						value={ tone }
						options={ [
							{
								value: 'espresso',
								label: __( 'Espresso', 'gramo-core' ),
							},
							{
								value: 'linen',
								label: __( 'Lino', 'gramo-core' ),
							},
							{
								value: 'dark',
								label: __( 'Oscuro', 'gramo-core' ),
							},
						] }
						onChange={ ( next ) => setAttributes( { tone: next } ) }
					/>
					<CtaFields
						label={ __( 'Botón', 'gramo-core' ) }
						value={ cta }
						onChange={ ( next ) => setAttributes( { cta: next } ) }
					/>
					<MediaField
						label={ __(
							'Imagen de fondo (opcional)',
							'gramo-core'
						) }
						value={ media }
						onChange={ ( next ) =>
							setAttributes( { media: next } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="gramo-cta-band-editor__inner">
					<RichText
						tagName="h2"
						className="gramo-cta-band-editor__heading"
						value={ heading }
						allowedFormats={ ALLOWED_FORMATS }
						placeholder={ __( 'Mensaje principal…', 'gramo-core' ) }
						onChange={ ( next ) =>
							setAttributes( { heading: next } )
						}
					/>
					<RichText
						tagName="p"
						className="gramo-cta-band-editor__text"
						value={ text }
						allowedFormats={ ALLOWED_FORMATS }
						placeholder={ __(
							'Texto de acompañamiento…',
							'gramo-core'
						) }
						onChange={ ( next ) => setAttributes( { text: next } ) }
					/>
					{ cta?.label ? (
						<span className="gramo-cta-band-editor__button">
							{ cta.label }
						</span>
					) : null }
				</div>
			</div>
		</>
	);
}
