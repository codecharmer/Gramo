/**
 * gramo/hero — the gallery room you land in. Warm-black wall, a
 * wordmark-scale display line with its wall label beneath, two actions
 * (bone plate + hairline outline), and one work lit by a soft elliptical
 * pool on the right. The contract's first viewport lives here.
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useBlockMedia } from '@/hooks/useBlockMedia';
import { useReveal } from '@/lib/reveal';
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
  const ref = useReveal<HTMLElement>();
  const image = media.byUrl(attributes.media?.url) ?? media.byAttachmentId(attributes.media?.id);
  const height = attributes.height ?? 'full';

  return (
    <section className={`${styles.hero} ${styles[height] ?? ''}`} ref={ref}>
      <div className={`${styles.inner} ${image ? '' : styles.solo}`}>
        <div className={styles.copy} data-reveal="label">
          {attributes.heading ? <h1 className={styles.heading}>{attributes.heading}</h1> : null}

          {attributes.eyebrow || attributes.subheading ? (
            <div className={styles.label}>
              {attributes.eyebrow ? <p className={styles.eyebrow}>{attributes.eyebrow}</p> : null}
              {attributes.subheading ? (
                <p className={styles.subheading}>{attributes.subheading}</p>
              ) : null}
            </div>
          ) : null}

          <div className={styles.actions}>
            <CtaLink label={attributes.primaryCta?.label} url={attributes.primaryCta?.url} kind="primary" />
            <CtaLink label={attributes.secondaryCta?.label} url={attributes.secondaryCta?.url} kind="secondary" />
          </div>
        </div>

        {image ? (
          <figure className={styles.work}>
            <span className={styles.pool} data-reveal="pool" aria-hidden="true" />
            <div className={styles.workImage} data-reveal="work">
              <GatsbyImage image={image} alt={attributes.media?.alt ?? ''} loading="eager" />
            </div>
            {attributes.media?.alt ? (
              <figcaption className={styles.workCaption} data-reveal="label">
                {attributes.media.alt}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
