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
	const {
		eyebrow,
		heading,
		subheading,
		media,
		primaryCta,
		secondaryCta,
		height,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `gramo-hero-editor is-height-${ height }`,
		style: media?.url
			? { backgroundImage: `url(${ media.url })` }
			: undefined,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Imagen de fondo', 'gramo-core' ) }>
					<MediaField
						label={ __( 'Imagen', 'gramo-core' ) }
						value={ media }
						onChange={ ( next ) =>
							setAttributes( { media: next } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Llamadas a la acción', 'gramo-core' ) }>
					<CtaFields
						label={ __( 'Botón principal', 'gramo-core' ) }
						value={ primaryCta }
						onChange={ ( next ) =>
							setAttributes( { primaryCta: next } )
						}
					/>
					<CtaFields
						label={ __( 'Botón secundario', 'gramo-core' ) }
						value={ secondaryCta }
						onChange={ ( next ) =>
							setAttributes( { secondaryCta: next } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Diseño', 'gramo-core' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Altura', 'gramo-core' ) }
						value={ height }
						options={ [
							{
								value: 'full',
								label: __( 'Pantalla completa', 'gramo-core' ),
							},
							{
								value: 'tall',
								label: __( 'Alta', 'gramo-core' ),
							},
							{
								value: 'compact',
								label: __( 'Compacta', 'gramo-core' ),
							},
						] }
						onChange={ ( next ) =>
							setAttributes( { height: next } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="gramo-hero-editor__scrim">
					<div className="gramo-hero-editor__content">
						<RichText
							tagName="p"
							className="gramo-hero-editor__eyebrow"
							value={ eyebrow }
							allowedFormats={ ALLOWED_FORMATS }
							placeholder={ __( 'Entradilla…', 'gramo-core' ) }
							onChange={ ( next ) =>
								setAttributes( { eyebrow: next } )
							}
						/>
						<RichText
							tagName="h2"
							className="gramo-hero-editor__heading"
							value={ heading }
							allowedFormats={ ALLOWED_FORMATS }
							placeholder={ __(
								'Titular principal…',
								'gramo-core'
							) }
							onChange={ ( next ) =>
								setAttributes( { heading: next } )
							}
						/>
						<RichText
							tagName="p"
							className="gramo-hero-editor__subheading"
							value={ subheading }
							allowedFormats={ ALLOWED_FORMATS }
							placeholder={ __( 'Subtítulo…', 'gramo-core' ) }
							onChange={ ( next ) =>
								setAttributes( { subheading: next } )
							}
						/>
						{ primaryCta?.label || secondaryCta?.label ? (
							<div className="gramo-hero-editor__ctas">
								{ primaryCta?.label ? (
									<span className="gramo-hero-editor__cta is-primary">
										{ primaryCta.label }
									</span>
								) : null }
								{ secondaryCta?.label ? (
									<span className="gramo-hero-editor__cta is-secondary">
										{ secondaryCta.label }
									</span>
								) : null }
							</div>
						) : null }
					</div>
				</div>
			</div>
		</>
	);
}
