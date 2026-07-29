/**
 * Location card — a café hung as a work: the photograph inside a bone
 * hairline mat, then the museum wall label (DIRECCIÓN · ZONA) with an
 * optional "Cómo llegar ↗" link-out. The name is a stretched link over the
 * whole work; the maps link floats above it.
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { pathFor, type Locale } from '@/i18n/routes';
import { t, type StringKey } from '@/i18n/strings';

import * as styles from './LocationCard.module.scss';

export interface LocationCardData {
  databaseId: number;
  slug: string;
  title: string;
  shortName: string | null;
  city: string | null;
  neighborhood: string | null;
  address: string | null;
  mapsUrl: string | null;
  localImage: {
    childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
  } | null;
}

interface LocationCardProps {
  location: LocationCardData;
  locale: Locale;
  showMapLink?: boolean;
}

export function LocationCard({
  location,
  locale,
  showMapLink = false,
}: LocationCardProps): React.JSX.Element {
  const image = location.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const name = location.shortName ?? location.title;

  const rows: Array<[StringKey, string | null]> = [
    ['address', location.address],
    ['neighborhood', location.neighborhood],
  ];

  return (
    <article className={styles.work}>
      {image ? (
        <div className={styles.mat} data-reveal="work">
          <GatsbyImage image={image} alt={name} />
        </div>
      ) : null}

      <div className={styles.label} data-reveal="label">
        {location.city ? <p className={styles.city}>{location.city}</p> : null}

        <h3 className={styles.name}>
          <Link to={pathFor('location', locale, location.slug)} className={styles.link}>
            {name}
          </Link>
        </h3>

        <dl className={styles.rows}>
          {rows.map(([key, value]) =>
            value ? (
              <div key={key} className={styles.row}>
                <dt className={styles.key}>{t(key, locale)}</dt>
                <dd className={styles.value}>{value}</dd>
              </div>
            ) : null
          )}
        </dl>

        {showMapLink && location.mapsUrl ? (
          <a
            href={location.mapsUrl}
            className={styles.mapsLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('gettingThere', locale)} ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
