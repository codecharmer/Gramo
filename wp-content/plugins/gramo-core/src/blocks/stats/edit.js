/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_FORMATS = [ 'core/italic' ];

export default function Edit( { attributes, setAttributes } ) {
	const { heading, items } = attributes;

	const blockProps = useBlockProps( {
		className: 'gramo-stats-editor',
	} );

	const updateItem = ( index, patch ) => {
		setAttributes( {
			items: items.map( ( item, i ) =>
				i === index ? { ...item, ...patch } : item
			),
		} );
	};

	const addItem = () => {
		setAttributes( {
			items: [ ...items, { value: '', suffix: '', label: '' } ],
		} );
	};

	const removeItem = ( index ) => {
		setAttributes( {
			items: items.filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h2"
				className="gramo-stats-editor__heading"
				value={ heading }
				allowedFormats={ ALLOWED_FORMATS }
				placeholder={ __( 'Título de la sección…', 'gramo-core' ) }
				onChange={ ( next ) => setAttributes( { heading: next } ) }
			/>
			{ items.length > 0 ? (
				<div className="gramo-stats-editor__grid">
					{ items.map( ( item, index ) => (
						<div key={ index } className="gramo-stats-editor__item">
							<div className="gramo-stats-editor__figure">
								{ item.value || '0' }
								<span className="gramo-stats-editor__suffix">
									{ item.suffix || '' }
								</span>
							</div>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Cifra', 'gramo-core' ) }
								value={ item.value || '' }
								onChange={ ( next ) =>
									updateItem( index, { value: next } )
								}
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Sufijo', 'gramo-core' ) }
								value={ item.suffix || '' }
								onChange={ ( next ) =>
									updateItem( index, { suffix: next } )
								}
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Etiqueta', 'gramo-core' ) }
								value={ item.label || '' }
								onChange={ ( next ) =>
									updateItem( index, { label: next } )
								}
							/>
							<Button
								variant="tertiary"
								isDestructive
								onClick={ () => removeItem( index ) }
							>
								{ __( 'Quitar', 'gramo-core' ) }
							</Button>
						</div>
					) ) }
				</div>
			) : (
				<p className="gramo-stats-editor__empty">
					{ __( 'Añade cifras clave del negocio.', 'gramo-core' ) }
				</p>
			) }
			<Button
				__next40pxDefaultSize
				variant="secondary"
				onClick={ addItem }
			>
				{ __( 'Añadir cifra', 'gramo-core' ) }
			</Button>
		</div>
	);
}
