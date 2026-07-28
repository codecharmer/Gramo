/**
 * WordPress dependencies
 */
import { CheckboxControl, Spinner } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';

/**
 * Fetch published posts of a type through core-data.
 *
 * @param {string} postType Post type slug.
 * @param {Object} query    Extra REST query args (merged over the defaults).
 * @return {Object} The `useEntityRecords` result (`records`, `isResolving`…).
 */
export function usePublishedPosts( postType, query = {} ) {
	return useEntityRecords( 'postType', postType, {
		per_page: 100,
		status: 'publish',
		...query,
	} );
}

/**
 * Human title for a REST post record.
 *
 * @param {Object} record REST post record.
 * @return {string} Decoded title, or a Spanish fallback.
 */
export function getRecordTitle( record ) {
	const raw = record?.title?.rendered || record?.title?.raw || '';
	const text = decodeEntities( raw ).trim();
	return text || __( '(sin título)', 'gramo-core' );
}

/**
 * Checkbox list for manually selecting post IDs (reference blocks).
 *
 * @param {Object}   props              Component props.
 * @param {string}   props.postType     Post type slug to list.
 * @param {number[]} props.selectedIds  Currently selected IDs.
 * @param {Function} props.onChange     Receives the next array of IDs.
 * @param {string}   props.emptyMessage Message when nothing can be listed.
 */
export function PostCheckboxList( {
	postType,
	selectedIds = [],
	onChange,
	emptyMessage,
} ) {
	const { records, isResolving } = usePublishedPosts( postType );

	if ( isResolving ) {
		return <Spinner />;
	}

	if ( ! records || records.length === 0 ) {
		return (
			<p className="gramo-entity-picker__empty">
				{ emptyMessage ||
					__(
						'No hay contenidos disponibles para seleccionar.',
						'gramo-core'
					) }
			</p>
		);
	}

	const toggle = ( id, checked ) => {
		const next = checked
			? [ ...selectedIds, id ]
			: selectedIds.filter( ( current ) => current !== id );
		onChange( next );
	};

	return (
		<div className="gramo-entity-picker">
			{ records.map( ( record ) => (
				<CheckboxControl
					__nextHasNoMarginBottom
					key={ record.id }
					label={ getRecordTitle( record ) }
					checked={ selectedIds.includes( record.id ) }
					onChange={ ( checked ) => toggle( record.id, checked ) }
				/>
			) ) }
		</div>
	);
}
