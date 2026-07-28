/**
 * Location card — plate with the café's photograph, the short name in big
 * serif, the city as a pigment-coded caption (Cuernavaca = olive,
 * CDMX = bronze) and the address in small type. The card links to the
 * location detail page; an optional "Cómo llegar ↗" caps link-out to Google
 * Maps sits above the stretched link.
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { pathFor, type Locale } from '@/i18n/routes';
import { t } from '@/i18n/strings';

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

function cityPigmentClass(city: string | null): string {
  const normalized = (city ?? '').toLowerCase();
  if (normalized.includes('cuernavaca')) return styles.olive ?? '';
  return styles.bronze ?? '';
}

export function LocationCard({
  location,
  locale,
  showMapLink = false,
}: LocationCardProps): React.JSX.Element {
  const image = location.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const name = location.shortName ?? location.title;

  return (
    <article className={styles.card}>
      {image ? (
        <div className={styles.image}>
          <GatsbyImage image={image} alt={name} />
        </div>
      ) : (
        <div className={styles.imagePlaceholder} aria-hidden="true" />
      )}

      <div className={styles.body}>
        {location.city ? (
          <p className={`${styles.city} ${cityPigmentClass(location.city)}`}>{location.city}</p>
        ) : null}
        <h3 className={styles.name}>
          <Link to={pathFor('location', locale, location.slug)} className={styles.link}>
            {name}
          </Link>
        </h3>
        {location.address ? <p className={styles.address}>{location.address}</p> : null}

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
