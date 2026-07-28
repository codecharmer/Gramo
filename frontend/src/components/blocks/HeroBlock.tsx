/**
 * gramo/hero — the espresso-black board opening. Serif display over the
 * inked field, tracked caption eyebrow, plate-mounted photograph on the
 * right, copper plate action. The contract's first viewport lives here.
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useBlockMedia } from '@/hooks/useBlockMedia';
import type { HeroAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './HeroBlock.module.scss';

function CtaLink({
  label,
  url,
  kind,
}: {
  label: string;
  url: string;
  kind: 'primary' | 'secondary';
}): React.JSX.Element | null {
  if (!label || !url) return null;
  const className = kind === 'primary' ? styles.ctaPrimary : styles.ctaSecondary;
  if (url.startsWith('/')) {
    return (
      <Link to={url} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={url} className={className}>
      {label}
    </a>
  );
}

export function HeroBlock({ attributes }: BlockComponentProps<HeroAttrs>): React.JSX.Element {
  const media = useBlockMedia();
  const image = media.byUrl(attributes.media?.url) ?? media.byAttachmentId(attributes.media?.id);
  const height = attributes.height ?? 'full';

  return (
    <section className={`${styles.hero} ${styles[height] ?? ''}`}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          {attributes.eyebrow ? <p className={styles.eyebrow}>{attributes.eyebrow}</p> : null}
          {attributes.heading ? <h1 className={styles.heading}>{attributes.heading}</h1> : null}
          {attributes.subheading ? <p className={styles.subheading}>{attributes.subheading}</p> : null}
          <div className={styles.actions}>
            <CtaLink label={attributes.primaryCta?.label} url={attributes.primaryCta?.url} kind="primary" />
            <CtaLink label={attributes.secondaryCta?.label} url={attributes.secondaryCta?.url} kind="secondary" />
          </div>
        </div>

        {image ? (
          <figure className={styles.plate}>
            <GatsbyImage image={image} alt={attributes.media?.alt ?? ''} loading="eager" />
            {attributes.media?.alt ? (
              <figcaption className={styles.plateCaption}>{attributes.media.alt}</figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
