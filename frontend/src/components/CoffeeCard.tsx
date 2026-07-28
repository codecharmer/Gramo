/**
 * Coffee card — a paper plate in the catalog grammar: pigment key square,
 * serif name, small-caps data rows (origin · altitude), tasting notes as
 * small caps, price in tabular MXN numerals. The whole card links to the
 * coffee's detail page.
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { pathFor, type Locale } from '@/i18n/routes';
import { t } from '@/i18n/strings';
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
  const dataRow = [coffee.origin, coffee.altitude].filter(Boolean).join(' · ');

  return (
    <Link to={pathFor('coffee', locale, coffee.slug)} className={styles.card}>
      {image ? (
        <div className={styles.image}>
          <GatsbyImage image={image} alt={coffee.imageAlt ?? name} />
        </div>
      ) : (
        <div className={`${styles.imagePlaceholder} ${styles[pigment] ?? ''}`} aria-hidden="true" />
      )}

      <div className={styles.body}>
        <span className={`${styles.keySquare} ${styles[pigment] ?? ''}`} aria-hidden="true" />
        <h3 className={styles.name}>{name}</h3>
        {dataRow ? <p className={styles.dataRow}>{dataRow}</p> : null}
        {notes.length > 0 ? <p className={styles.notes}>{notes.join(' · ')}</p> : null}

        <p className={styles.priceRow}>
          {coffee.price != null ? (
            <span className={styles.price}>{formatMxn(coffee.price)}</span>
          ) : null}
          {!purchasable ? <span className={styles.stock}>{t('outOfStock', locale)}</span> : null}
        </p>
      </div>
    </Link>
  );
}
