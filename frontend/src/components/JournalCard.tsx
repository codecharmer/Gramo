/**
 * Journal card — an entry hung as a work: the featured photograph in a
 * hairline mat, then the wall label (an artwork-key dot with the category,
 * the title in the display face, FECHA · LECTURA rows).
 */

import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { pathFor, type Locale } from '@/i18n/routes';
import { t } from '@/i18n/strings';
import { formatDate } from '@/lib/format';
import { pigmentAt } from '@/lib/pigments';

import * as styles from './JournalCard.module.scss';

export interface JournalCardData {
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  readingTime: number | null;
  categories: Array<{ slug: string; name: string; nameEn: string | null } | null> | null;
  localImage: {
    childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
  } | null;
}

interface JournalCardProps {
  post: JournalCardData;
  locale: Locale;
  index?: number;
}

export function JournalCard({ post, locale, index = 0 }: JournalCardProps): React.JSX.Element {
  const pigment = pigmentAt(index);
  const image = post.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const category = (post.categories ?? []).find(Boolean) ?? null;
  const categoryLabel = category
    ? ((locale === 'en' ? category.nameEn : null) ?? category.name)
    : null;

  return (
    <Link to={pathFor('journal', locale, post.slug)} className={styles.work}>
      {image ? (
        <div className={styles.mat} data-reveal="work">
          <GatsbyImage image={image} alt={post.title} />
        </div>
      ) : null}

      <div className={styles.label} data-reveal="label">
        {categoryLabel ? (
          <p className={styles.category}>
            <span className={`${styles.dot} ${styles[pigment] ?? ''}`} aria-hidden="true" />
            {categoryLabel}
          </p>
        ) : null}

        <h3 className={styles.title}>{post.title}</h3>

        <dl className={styles.rows}>
          <div className={styles.row}>
            <dt className={styles.key}>{t('date', locale)}</dt>
            <dd className={styles.value}>{formatDate(post.date, locale)}</dd>
          </div>
          {post.readingTime ? (
            <div className={styles.row}>
              <dt className={styles.key}>{t('reading', locale)}</dt>
              <dd className={styles.value}>
                {post.readingTime} {t('readingTime', locale)}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </Link>
  );
}
