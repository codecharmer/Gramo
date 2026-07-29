/**
 * gramo/cta-band — a full-width pigment band: espresso/dark tones sit on
 * the inked board with cream text, linen on deep paper with ink. Serif
 * heading, body copy, one copper plate action, and an optional photograph
 * mounted as a subtle right-side plate.
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useBlockMedia } from '@/hooks/useBlockMedia';
import { useReveal } from '@/lib/reveal';
import type { CtaBandAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './CtaBandBlock.module.scss';

export function CtaBandBlock({ attributes }: BlockComponentProps<CtaBandAttrs>): React.JSX.Element | null {
  const media = useBlockMedia();
  const ref = useReveal<HTMLElement>();
  const image = media.byUrl(attributes.media?.url) ?? media.byAttachmentId(attributes.media?.id);
  const tone = attributes.tone === 'linen' ? 'linen' : attributes.tone === 'dark' ? 'dark' : 'espresso';

  if (!attributes.heading && !attributes.text) return null;

  const cta = attributes.cta;
  const ctaEl =
    cta?.label && cta.url ? (
      cta.url.startsWith('/') ? (
        <Link to={cta.url} className={styles.cta}>
          {cta.label}
        </Link>
      ) : (
        <a href={cta.url} className={styles.cta}>
          {cta.label}
        </a>
      )
    ) : null;

  return (
    <section className={`${styles.band} ${styles[tone] ?? ''}`} ref={ref}>
      <div className={styles.inner}>
        <div className={styles.copy} data-reveal="label">
          {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}
          {attributes.text ? <p className={styles.text}>{attributes.text}</p> : null}
          {ctaEl}
        </div>

        {image ? (
          <div className={styles.plate}>
            <span className={styles.pool} data-reveal="pool" aria-hidden="true" />
            <div className={styles.plateImage} data-reveal="work">
              <GatsbyImage image={image} alt={attributes.media?.alt ?? ''} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
