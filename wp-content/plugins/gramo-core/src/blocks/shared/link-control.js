/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const EMPTY_VALUE = { label: '', url: '' };

/**
 * Simple CTA fields (label + URL) for the comment-serialized CTA objects used
 * by the hero and cta-band blocks.
 *
 * @param {Object}   props          Component props.
 * @param {Object}   props.value    Current CTA value `{ label, url }`.
 * @param {Function} props.onChange Receives the next CTA value.
 * @param {string}   props.label    Group label.
 */
export function CtaFields( { value = EMPTY_VALUE, onChange, label } ) {
	const cta = { ...EMPTY_VALUE, ...value };

	return (
		<div className="gramo-cta-fields">
			{ label ? (
				<p className="gramo-cta-fields__legend">{ label }</p>
			) : null }
			<TextControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={ __( 'Texto del botón', 'gramo-core' ) }
				value={ cta.label }
				onChange={ ( nextLabel ) =>
					onChange( { ...cta, label: nextLabel } )
				}
			/>
			<TextControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={ __( 'Enlace (URL)', 'gramo-core' ) }
				type="url"
				value={ cta.url }
				onChange={ ( nextUrl ) => onChange( { ...cta, url: nextUrl } ) }
			/>
		</div>
	);
}
