/**
 * WordPress dependencies
 */
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

const EMPTY_VALUE = { id: 0, url: '', alt: '' };

/**
 * Image attribute field: select / replace / remove with a thumbnail preview.
 *
 * The value is the comment-serialized media object `{ id, url, alt }` used by
 * the hero, split-image, and cta-band blocks.
 *
 * @param {Object}   props          Component props.
 * @param {Object}   props.value    Current media value.
 * @param {Function} props.onChange Receives the next media value.
 * @param {string}   props.label    Field label.
 */
export function MediaField( { value = EMPTY_VALUE, onChange, label } ) {
	const instanceId = useInstanceId( MediaField, 'gramo-media-field' );
	const media = { ...EMPTY_VALUE, ...value };
	const hasImage = Boolean( media.url );

	return (
		<BaseControl
			__nextHasNoMarginBottom
			id={ instanceId }
			label={ label }
			className="gramo-media-field"
		>
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={ [ 'image' ] }
					value={ media.id }
					onSelect={ ( selected ) =>
						onChange( {
							id: selected.id || 0,
							url: selected.url || '',
							alt: selected.alt || '',
						} )
					}
					render={ ( { open } ) => (
						<div className="gramo-media-field__stage">
							{ hasImage && (
								<img
									className="gramo-media-field__preview"
									src={ media.url }
									alt={ media.alt }
								/>
							) }
							<div className="gramo-media-field__actions">
								<Button
									__next40pxDefaultSize
									id={ instanceId }
									variant="secondary"
									onClick={ open }
								>
									{ hasImage
										? __(
												'Reemplazar imagen',
												'gramo-core'
										  )
										: __(
												'Seleccionar imagen',
												'gramo-core'
										  ) }
								</Button>
								{ hasImage && (
									<Button
										__next40pxDefaultSize
										variant="tertiary"
										isDestructive
										onClick={ () =>
											onChange( { ...EMPTY_VALUE } )
										}
									>
										{ __( 'Quitar', 'gramo-core' ) }
									</Button>
								) }
							</div>
						</div>
					) }
				/>
			</MediaUploadCheck>
		</BaseControl>
	);
}
