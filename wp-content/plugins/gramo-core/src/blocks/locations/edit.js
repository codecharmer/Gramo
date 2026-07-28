/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, Spinner, ToggleControl } from '@wordpress/components';
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
	const { locationIds, showMap, heading } = attributes;

	const query = locationIds.length
		? { include: locationIds, orderby: 'include' }
		: { per_page: 20 };
	const { records, isResolving } = usePublishedPosts(
		'gramo_location',
		query
	);

	const blockProps = useBlockProps( {
		className: 'gramo-locations-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Cafeterías', 'gramo-core' ) }>
					<p className="gramo-locations-editor__help">
						{ __(
							'Sin selección se muestran todas las ubicaciones.',
							'gramo-core'
						) }
					</p>
					<PostCheckboxList
						postType="gramo_location"
						selectedIds={ locationIds }
						onChange={ ( next ) =>
							setAttributes( { locationIds: next } )
						}
						emptyMessage={ __(
							'Las ubicaciones no están disponibles en el editor.',
							'gramo-core'
						) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Mostrar mapa', 'gramo-core' ) }
						checked={ showMap }
						onChange={ ( next ) =>
							setAttributes( { showMap: next } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="h2"
					className="gramo-locations-editor__heading"
					value={ heading }
					allowedFormats={ ALLOWED_FORMATS }
					placeholder={ __( 'Título de la sección…', 'gramo-core' ) }
					onChange={ ( next ) => setAttributes( { heading: next } ) }
				/>
				{ isResolving && <Spinner /> }
				{ ! isResolving && records && records.length > 0 && (
					<div className="gramo-locations-editor__grid">
						{ records.map( ( record ) => (
							<div
								key={ record.id }
								className="gramo-locations-editor__card"
							>
								{ showMap && (
									<div className="gramo-locations-editor__map">
										{ __( 'Mapa', 'gramo-core' ) }
									</div>
								) }
								<span className="gramo-locations-editor__title">
									{ getRecordTitle( record ) }
								</span>
							</div>
						) ) }
					</div>
				) }
				{ ! isResolving && ( ! records || records.length === 0 ) && (
					<p className="gramo-locations-editor__note">
						{ __(
							'Las ubicaciones se resuelven en la web pública.',
							'gramo-core'
						) }
					</p>
				) }
			</div>
		</>
	);
}
