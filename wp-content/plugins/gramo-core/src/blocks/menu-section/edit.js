/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { sectionSlug, sectionTermId, headingOverride, showPrices } =
		attributes;

	const { records: terms, isResolving } = useEntityRecords(
		'taxonomy',
		'gramo_menu_section',
		{ per_page: 100, hide_empty: false }
	);

	const blockProps = useBlockProps( {
		className: 'gramo-menu-editor',
	} );

	const selectedTerm = ( terms || [] ).find(
		( term ) => term.id === sectionTermId || term.slug === sectionSlug
	);

	const onSelectTerm = ( value ) => {
		const term = ( terms || [] ).find(
			( candidate ) => String( candidate.id ) === value
		);
		setAttributes( {
			sectionTermId: term ? term.id : 0,
			sectionSlug: term ? term.slug : '',
		} );
	};

	const sectionName =
		headingOverride ||
		( selectedTerm ? decodeEntities( selectedTerm.name ) : '' ) ||
		sectionSlug ||
		__( 'Sección del menú', 'gramo-core' );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Sección', 'gramo-core' ) }>
					{ isResolving && <Spinner /> }
					{ ! isResolving && terms && terms.length > 0 && (
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'Sección del menú', 'gramo-core' ) }
							value={ String( sectionTermId || '' ) }
							options={ [
								{
									value: '',
									label: __( '— Selecciona —', 'gramo-core' ),
								},
								...terms.map( ( term ) => ( {
									value: String( term.id ),
									label: decodeEntities( term.name ),
								} ) ),
							] }
							onChange={ onSelectTerm }
						/>
					) }
					{ ! isResolving && ( ! terms || terms.length === 0 ) && (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'Slug de la sección', 'gramo-core' ) }
							help={ __(
								'No se pudieron cargar las secciones desde el editor; escribe el slug manualmente.',
								'gramo-core'
							) }
							value={ sectionSlug }
							onChange={ ( next ) =>
								setAttributes( {
									sectionSlug: next,
									sectionTermId: 0,
								} )
							}
						/>
					) }
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Título alternativo', 'gramo-core' ) }
						value={ headingOverride }
						onChange={ ( next ) =>
							setAttributes( { headingOverride: next } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Mostrar precios', 'gramo-core' ) }
						checked={ showPrices }
						onChange={ ( next ) =>
							setAttributes( { showPrices: next } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<h3 className="gramo-menu-editor__heading">{ sectionName }</h3>
				<ul className="gramo-menu-editor__rows">
					{ [ 1, 2, 3 ].map( ( row ) => (
						<li key={ row } className="gramo-menu-editor__row">
							<span className="gramo-menu-editor__dish" />
							{ showPrices && (
								<span className="gramo-menu-editor__price" />
							) }
						</li>
					) ) }
				</ul>
				<p className="gramo-menu-editor__note">
					{ __(
						'Los artículos de esta sección se cargan automáticamente en la web pública.',
						'gramo-core'
					) }
				</p>
			</div>
		</>
	);
}
