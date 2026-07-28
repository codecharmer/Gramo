/**
 * Journal card — plate with the post's featured image, category as a
 * pigment caps caption, serif title, and a dated caps footer with reading
 * time. Links to the post.
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
    <Link to={pathFor('journal', locale, post.slug)} className={styles.card}>
      {image ? (
        <div className={styles.image}>
          <GatsbyImage image={image} alt={post.title} />
        </div>
      ) : null}

      <div className={styles.body}>
        {categoryLabel ? (
          <p className={`${styles.category} ${styles[pigment] ?? ''}`}>{categoryLabel}</p>
        ) : null}
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.meta}>
          <span>{formatDate(post.date, locale)}</span>
          {post.readingTime ? (
            <span>
              {post.readingTime} {t('readingTime', locale)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
