/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const ALLOWED_FORMATS = [ 'core/italic' ];
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/list' ];
const TEMPLATE = [ [ 'core/paragraph' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { question } = attributes;

	const blockProps = useBlockProps( {
		className: 'gramo-faq-item-editor',
	} );

	return (
		<div { ...blockProps }>
			<div className="gramo-faq-item-editor__question-row">
				<RichText
					tagName="h3"
					className="gramo-faq-item-editor__question"
					value={ question }
					allowedFormats={ ALLOWED_FORMATS }
					placeholder={ __( 'Escribe la pregunta…', 'gramo-core' ) }
					onChange={ ( next ) => setAttributes( { question: next } ) }
				/>
				<span
					className="gramo-faq-item-editor__marker"
					aria-hidden="true"
				>
					+
				</span>
			</div>
			<div className="gramo-faq-item-editor__answer">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
				/>
			</div>
		</div>
	);
}
