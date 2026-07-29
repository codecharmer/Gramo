/**
 * gramo/split-image — a daylight room for editorial copy: the photograph in
 * a hairline mat on one side, the copy on the other. When the editor left
 * the media empty the room becomes a two-column spread instead — heading on
 * the left, prose on the right — so the wall never carries a blank mat.
 */

import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useBlockMedia } from '@/hooks/useBlockMedia';
import { useReveal } from '@/lib/reveal';
import type { SplitImageAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';
import { CoreHtml } from './CoreHtml';

import * as styles from './SplitImageBlock.module.scss';

export function SplitImageBlock({
  attributes,
  innerBlocks,
}: BlockComponentProps<SplitImageAttrs>): React.JSX.Element {
  const media = useBlockMedia();
  const ref = useReveal<HTMLElement>();
  const image = media.byUrl(attributes.media?.url) ?? media.byAttachmentId(attributes.media?.id);
  const imageRight = attributes.imageSide === 'right';

  const heading = (
    <>
      {attributes.eyebrow ? <p className={styles.eyebrow}>{attributes.eyebrow}</p> : null}
      {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}
    </>
  );

  const prose = innerBlocks.map((block, index) =>
    typeof block.html === 'string' ? (
      <CoreHtml key={`${block.name}-${index}`} html={block.html} />
    ) : null
  );

  if (!image) {
    return (
      <section className={`${styles.split} ${styles.solo}`} ref={ref}>
        <div className={styles.inner}>
          <div className={styles.soloHead} data-reveal="label">
            {heading}
          </div>
          <div className={styles.soloBody} data-reveal="label">
            {prose}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.split} ${imageRight ? styles.imageRight : ''}`} ref={ref}>
      <div className={styles.inner}>
        <figure className={styles.plate} data-reveal="work">
          <GatsbyImage image={image} alt={attributes.media?.alt ?? ''} />
          {attributes.media?.alt ? (
            <figcaption className={styles.plateCaption}>{attributes.media.alt}</figcaption>
          ) : null}
        </figure>

        <div className={styles.copy} data-reveal="label">
          {heading}
          {prose}
        </div>
      </div>
    </section>
  );
}
