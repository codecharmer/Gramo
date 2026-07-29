/**
 * Coffee card — a work hung on the wall, not a box. The bag photograph sits
 * spotlit in a pool of gallery light; beneath it the museum wall label:
 * an artwork-key dot, the name in the display face, then ORIGEN · ALTITUD ·
 * NOTAS · PRECIO as tracked-caps rows with tabular values. The whole work
 * links to the coffee's room.
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { pathFor, type Locale } from '@/i18n/routes';
import { t, type StringKey } from '@/i18n/strings';
import { formatMxn } from '@/lib/format';
import { pigmentAt } from '@/lib/pigments';

import * as styles from './CoffeeCard.module.scss';

export interface CoffeeCardData {
  databaseId: number;
  slug: string;
  title: string;
  nameEn: string | null;
  origin: string | null;
  altitude: string | null;
  price: number | null;
  stockStatus: string | null;
  purchasable: boolean | null;
  subscriptionInterval: string | null;
  categories: Array<string | null> | null;
  tastingNotes: Array<{ noteEs: string | null; noteEn: string | null } | null> | null;
  imageAlt: string | null;
  localImage: {
    childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
  } | null;
}

interface CoffeeCardProps {
  coffee: CoffeeCardData;
  locale: Locale;
  index?: number;
}

export function CoffeeCard({ coffee, locale, index = 0 }: CoffeeCardProps): React.JSX.Element {
  const pigment = pigmentAt(index);
  const name = (locale === 'en' ? coffee.nameEn : null) ?? coffee.title;
  const image = coffee.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const purchasable = coffee.purchasable === true;
  const notes = (coffee.tastingNotes ?? [])
    .map((note) => (locale === 'en' ? (note?.noteEn ?? note?.noteEs) : note?.noteEs))
    .filter((note): note is string => Boolean(note));

  const rows: Array<[StringKey, string | null]> = [
    ['origin', coffee.origin],
    ['altitude', coffee.altitude],
    ['notes', notes.length > 0 ? notes.join(' · ') : null],
    ['price', coffee.price != null ? formatMxn(coffee.price) : null],
  ];

  return (
    <Link to={pathFor('coffee', locale, coffee.slug)} className={styles.work}>
      <div className={styles.frame}>
        <span className={styles.pool} data-reveal="pool" aria-hidden="true" />
        {image ? (
          <div className={styles.photo} data-reveal="work">
            <GatsbyImage image={image} alt={coffee.imageAlt ?? name} />
          </div>
        ) : (
          <div className={styles.photoPlaceholder} data-reveal="work" aria-hidden="true" />
        )}
      </div>

      <div className={styles.label} data-reveal="label">
        <p className={styles.name}>
          <span className={`${styles.dot} ${styles[pigment] ?? ''}`} aria-hidden="true" />
          <span>{name}</span>
        </p>

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

        {!purchasable ? <p className={styles.soldOut}>{t('outOfStock', locale)}</p> : null}
      </div>
    </Link>
  );
}
