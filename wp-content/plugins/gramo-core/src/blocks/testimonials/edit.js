/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	Spinner,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	getRecordTitle,
	PostCheckboxList,
	usePublishedPosts,
} from '../shared/entity-picker';

const ALLOWED_FORMATS = [ 'core/italic' ];

export default function Edit( { attributes, setAttributes } ) {
	const { mode, testimonialIds, count, heading } = attributes;

	const query =
		mode === 'manual'
			? {
					include: testimonialIds.length ? testimonialIds : [ 0 ],
					orderby: 'include',
			  }
			: { per_page: count };
	const { records, isResolving } = usePublishedPosts(
		'gramo_testimonial',
		query
	);

	const blockProps = useBlockProps( {
		className: 'gramo-testimonials-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Selección', 'gramo-core' ) }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Modo', 'gramo-core' ) }
						value={ mode }
						options={ [
							{
								value: 'latest',
								label: __( 'Más recientes', 'gramo-core' ),
							},
							{
								value: 'manual',
								label: __( 'Selección manual', 'gramo-core' ),
							},
						] }
						onChange={ ( next ) => setAttributes( { mode: next } ) }
					/>
					{ mode === 'manual' ? (
						<PostCheckboxList
							postType="gramo_testimonial"
							selectedIds={ testimonialIds }
							onChange={ ( next ) =>
								setAttributes( { testimonialIds: next } )
							}
							emptyMessage={ __(
								'Los testimonios no están disponibles en el editor.',
								'gramo-core'
							) }
						/>
					) : (
						<RangeControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __( 'Cantidad', 'gramo-core' ) }
							min={ 1 }
							max={ 6 }
							value={ count }
							onChange={ ( next ) =>
								setAttributes( { count: next } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="h2"
					className="gramo-testimonials-editor__heading"
					value={ heading }
					allowedFormats={ ALLOWED_FORMATS }
					placeholder={ __( 'Título de la sección…', 'gramo-core' ) }
					onChange={ ( next ) => setAttributes( { heading: next } ) }
				/>
				{ isResolving && <Spinner /> }
				<div className="gramo-testimonials-editor__grid">
					{ ( ! isResolving && records && records.length > 0
						? records.slice( 0, count )
						: [ null, null, null ]
					).map( ( record, index ) => (
						<figure
							key={ record ? record.id : index }
							className="gramo-testimonials-editor__card"
						>
							<span className="gramo-testimonials-editor__mark">
								“
							</span>
							<span className="gramo-testimonials-editor__line" />
							<span className="gramo-testimonials-editor__line is-short" />
							<figcaption className="gramo-testimonials-editor__source">
								{ record
									? getRecordTitle( record )
									: __( 'Testimonio', 'gramo-core' ) }
							</figcaption>
						</figure>
					) ) }
				</div>
				<p className="gramo-testimonials-editor__note">
					{ __(
						'El texto de cada cita se resuelve en la web pública.',
						'gramo-core'
					) }
				</p>
			</div>
		</>
	);
}
