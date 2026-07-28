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
	const { mode, productIds, count, heading, intro } = attributes;

	const query =
		mode === 'manual'
			? {
					include: productIds.length ? productIds : [ 0 ],
					orderby: 'include',
			  }
			: { per_page: count };
	const { records, isResolving } = usePublishedPosts( 'product', query );

	const blockProps = useBlockProps( {
		className: 'gramo-coffees-editor',
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
								value: 'featured',
								label: __( 'Destacados', 'gramo-core' ),
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
							postType="product"
							selectedIds={ productIds }
							onChange={ ( next ) =>
								setAttributes( { productIds: next } )
							}
							emptyMessage={ __(
								'No se pudieron cargar los productos en el editor.',
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
					className="gramo-coffees-editor__heading"
					value={ heading }
					allowedFormats={ ALLOWED_FORMATS }
					placeholder={ __( 'Título de la sección…', 'gramo-core' ) }
					onChange={ ( next ) => setAttributes( { heading: next } ) }
				/>
				<RichText
					tagName="p"
					className="gramo-coffees-editor__intro"
					value={ intro }
					allowedFormats={ ALLOWED_FORMATS }
					placeholder={ __( 'Texto introductorio…', 'gramo-core' ) }
					onChange={ ( next ) => setAttributes( { intro: next } ) }
				/>
				{ isResolving && <Spinner /> }
				{ ! isResolving && records && records.length > 0 && (
					<div className="gramo-coffees-editor__grid">
						{ records.slice( 0, count ).map( ( record ) => (
							<div
								key={ record.id }
								className="gramo-coffees-editor__card"
							>
								<div className="gramo-coffees-editor__swatch" />
								<span className="gramo-coffees-editor__title">
									{ getRecordTitle( record ) }
								</span>
							</div>
						) ) }
					</div>
				) }
				{ ! isResolving && ( ! records || records.length === 0 ) && (
					<p className="gramo-coffees-editor__note">
						{ __(
							'No se pudieron cargar los cafés en la vista previa; se resuelven en la web pública.',
							'gramo-core'
						) }
					</p>
				) }
				{ mode === 'featured' && (
					<p className="gramo-coffees-editor__note">
						{ __(
							'Vista previa con los últimos productos; los destacados se resuelven en la web pública.',
							'gramo-core'
						) }
					</p>
				) }
			</div>
		</>
	);
}
