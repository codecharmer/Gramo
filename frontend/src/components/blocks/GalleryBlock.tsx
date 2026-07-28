/**
 * gramo/gallery — archival plates in a grid (2–4 columns) or a horizontal
 * scroll-snap strip. Every image resolves through the sharp pipeline via
 * useBlockMedia; captions sit in tracked caps beneath each plate.
 */

import * as React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useBlockMedia } from '@/hooks/useBlockMedia';
import type { GalleryAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './GalleryBlock.module.scss';

export function GalleryBlock({ attributes }: BlockComponentProps<GalleryAttrs>): React.JSX.Element | null {
  const media = useBlockMedia();
  const items = attributes.items ?? [];

  if (items.length === 0) return null;

  const layout = attributes.layout === 'strip' ? 'strip' : 'grid';
  const columns = Math.min(4, Math.max(2, attributes.columns || 3));

  return (
    <section className={styles.gallery}>
      <div
        className={`${styles.items} ${layout === 'strip' ? styles.strip : styles.grid}`}
        style={{ '--gallery-columns': columns } as React.CSSProperties}
      >
        {items.map((item, index) => {
          const image = media.byUrl(item.url) ?? media.byAttachmentId(item.id);
          if (!image) return null;
          return (
            <figure key={`${item.url}-${index}`} className={styles.plate}>
              <GatsbyImage image={image} alt={item.alt ?? media.altFor(item.url)} />
              {item.caption ? (
                <figcaption className={styles.caption}>{item.caption}</figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
