/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

const ALLOWED_FORMATS = [ 'core/italic' ];

const FORM_TYPE_OPTIONS = [
	{ value: 'general', label: __( 'General', 'gramo-core' ) },
	{ value: 'wholesale', label: __( 'Mayoreo', 'gramo-core' ) },
	{ value: 'subscription', label: __( 'Suscripción', 'gramo-core' ) },
	{ value: 'catering', label: __( 'Catering', 'gramo-core' ) },
	{ value: 'events', label: __( 'Eventos', 'gramo-core' ) },
	{ value: 'careers', label: __( 'Empleo', 'gramo-core' ) },
];

export default function Edit( { attributes, setAttributes } ) {
	const { formType, heading, intro } = attributes;
	const instanceId = useInstanceId( Edit, 'gramo-inquiry' );

	const blockProps = useBlockProps( {
		className: 'gramo-inquiry-editor',
	} );

	const typeLabel =
		FORM_TYPE_OPTIONS.find( ( option ) => option.value === formType )
			?.label || formType;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Formulario', 'gramo-core' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Tipo de solicitud', 'gramo-core' ) }
						value={ formType }
						options={ FORM_TYPE_OPTIONS }
						onChange={ ( next ) =>
							setAttributes( { formType: next } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<span className="gramo-inquiry-editor__badge">
					{ typeLabel }
				</span>
				<RichText
					tagName="h2"
					className="gramo-inquiry-editor__heading"
					value={ heading }
					allowedFormats={ ALLOWED_FORMATS }
					placeholder={ __( 'Título del formulario…', 'gramo-core' ) }
					onChange={ ( next ) => setAttributes( { heading: next } ) }
				/>
				<RichText
					tagName="p"
					className="gramo-inquiry-editor__intro"
					value={ intro }
					allowedFormats={ ALLOWED_FORMATS }
					placeholder={ __( 'Texto introductorio…', 'gramo-core' ) }
					onChange={ ( next ) => setAttributes( { intro: next } ) }
				/>
				<div className="gramo-inquiry-editor__form">
					<label
						className="gramo-inquiry-editor__field"
						htmlFor={ `${ instanceId }-name` }
					>
						<span>{ __( 'Nombre', 'gramo-core' ) }</span>
						<input
							id={ `${ instanceId }-name` }
							type="text"
							disabled
							readOnly
						/>
					</label>
					<label
						className="gramo-inquiry-editor__field"
						htmlFor={ `${ instanceId }-email` }
					>
						<span>
							{ __( 'Correo electrónico', 'gramo-core' ) }
						</span>
						<input
							id={ `${ instanceId }-email` }
							type="email"
							disabled
							readOnly
						/>
					</label>
					<label
						className="gramo-inquiry-editor__field"
						htmlFor={ `${ instanceId }-message` }
					>
						<span>{ __( 'Mensaje', 'gramo-core' ) }</span>
						<textarea
							id={ `${ instanceId }-message` }
							rows="4"
							disabled
							readOnly
						/>
					</label>
					<button type="button" disabled>
						{ __( 'Enviar solicitud', 'gramo-core' ) }
					</button>
				</div>
			</div>
		</>
	);
}
