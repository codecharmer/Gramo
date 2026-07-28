/**
 * gramo/split-image — editorial two-column portrait: plate-mounted image on
 * one side, serif-led copy (rendered inner core blocks) on the other.
 */

import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useBlockMedia } from '@/hooks/useBlockMedia';
import type { SplitImageAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';
import { CoreHtml } from './CoreHtml';

import * as styles from './SplitImageBlock.module.scss';

export function SplitImageBlock({
  attributes,
  innerBlocks,
}: BlockComponentProps<SplitImageAttrs>): React.JSX.Element {
  const media = useBlockMedia();
  const image = media.byUrl(attributes.media?.url) ?? media.byAttachmentId(attributes.media?.id);
  const imageRight = attributes.imageSide === 'right';

  return (
    <section className={`${styles.split} ${imageRight ? styles.imageRight : ''}`}>
      <div className={styles.inner}>
        {image ? (
          <figure className={styles.plate}>
            <GatsbyImage image={image} alt={attributes.media?.alt ?? ''} />
            {attributes.media?.alt ? (
              <figcaption className={styles.plateCaption}>{attributes.media.alt}</figcaption>
            ) : null}
          </figure>
        ) : (
          <div className={styles.platePlaceholder} aria-hidden="true" />
        )}

        <div className={styles.copy}>
          {attributes.eyebrow ? <p className={styles.eyebrow}>{attributes.eyebrow}</p> : null}
          {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}
          {innerBlocks.map((block, index) =>
            typeof block.html === 'string' ? (
              <CoreHtml key={`${block.name}-${index}`} html={block.html} />
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
