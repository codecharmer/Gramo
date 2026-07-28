/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const ALLOWED_FORMATS = [ 'core/italic' ];
const ALLOWED_BLOCKS = [ 'gramo/faq-item' ];
const TEMPLATE = [ [ 'gramo/faq-item' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { heading, intro } = attributes;

	const blockProps = useBlockProps( {
		className: 'gramo-faq-editor',
	} );

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h2"
				className="gramo-faq-editor__heading"
				value={ heading }
				allowedFormats={ ALLOWED_FORMATS }
				placeholder={ __( 'Preguntas frecuentes…', 'gramo-core' ) }
				onChange={ ( next ) => setAttributes( { heading: next } ) }
			/>
			<RichText
				tagName="p"
				className="gramo-faq-editor__intro"
				value={ intro }
				allowedFormats={ ALLOWED_FORMATS }
				placeholder={ __( 'Texto introductorio…', 'gramo-core' ) }
				onChange={ ( next ) => setAttributes( { intro: next } ) }
			/>
			<div className="gramo-faq-editor__items">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
				/>
			</div>
		</div>
	);
}
