/**
 * Journal index — the newest post as a large feature plate, the rest as a
 * JournalCard grid, with a caps category-filter row linking to the
 * per-category pages. Posts are the current locale only, newest first.
 */

import * as React from 'react';
import { graphql, Link, type HeadProps, type PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { JournalCard, type JournalCardData } from '@/components/JournalCard';
import { RevealSection } from '@/components/RevealSection';
import { pathFor, STATIC_ROUTES } from '@/i18n/routes';
import { t } from '@/i18n/strings';
import { formatDate } from '@/lib/format';
import type { GramoPageContext } from './page';

import * as styles from './journal-index.module.scss';

interface JournalPostListNode extends JournalCardData {
  excerpt: string | null;
}

interface JournalIndexData {
  gramoPage: {
    title: string;
  } | null;
  allGramoJournalPost: { nodes: JournalPostListNode[] };
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

export default function JournalIndexTemplate({
  data,
  pageContext,
}: PageProps<JournalIndexData, GramoPageContext>): React.JSX.Element {
  const locale = pageContext.locale;
  const posts = data.allGramoJournalPost.nodes;
  const [feature, ...rest] = posts;

  const categories = new Map<string, { name: string; nameEn: string | null }>();
  for (const post of posts) {
    for (const category of post.categories ?? []) {
      if (category?.slug && !categories.has(category.slug)) {
        categories.set(category.slug, { name: category.name, nameEn: category.nameEn });
      }
    }
  }

  const featureImage = feature?.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const featureCategory = feature ? ((feature.categories ?? []).find(Boolean) ?? null) : null;

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>{data.gramoPage?.title ?? t('journalTitle', locale)}</h1>

          {categories.size > 0 ? (
            <nav className={styles.filters} aria-label={locale === 'es' ? 'Categorías' : 'Categories'}>
              <Link to={STATIC_ROUTES.journal[locale]} className={styles.filterActive}>
                {t('allPosts', locale)}
              </Link>
              {[...categories.entries()].map(([slug, category]) => (
                <Link key={slug} to={pathFor('journalCategory', locale, slug)} className={styles.filter}>
                  {(locale === 'en' ? category.nameEn : null) ?? category.name}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </header>

      {feature ? (
        <RevealSection className={styles.featureSection}>
          <Link
            to={pathFor('journal', locale, feature.slug)}
            className={`${styles.feature} ${featureImage ? '' : styles.featureSolo}`}
          >
            {featureImage ? (
              <div className={styles.featureImage} data-reveal="work">
                <GatsbyImage image={featureImage} alt={feature.title} loading="eager" />
              </div>
            ) : null}
            <div className={styles.featureBody} data-reveal="label">
              {featureCategory ? (
                <p className={styles.featureCategory}>
                  {(locale === 'en' ? featureCategory.nameEn : null) ?? featureCategory.name}
                </p>
              ) : null}
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              {feature.excerpt ? (
                <p className={styles.featureExcerpt}>{stripTags(feature.excerpt)}</p>
              ) : null}
              <p className={styles.featureMeta}>
                <span>{formatDate(feature.date, locale)}</span>
                {feature.readingTime ? (
                  <span>
                    {feature.readingTime} {t('readingTime', locale)}
                  </span>
                ) : null}
              </p>
            </div>
          </Link>
        </RevealSection>
      ) : null}

      {rest.length > 0 ? (
        <RevealSection className={styles.gridSection}>
          <div className={styles.grid}>
            {rest.map((post, index) => (
              <JournalCard key={post.databaseId} post={post} locale={locale} index={index} />
            ))}
          </div>
        </RevealSection>
      ) : null}
    </Layout>
  );
}

export function Head({
  data,
  pageContext,
  location,
}: HeadProps<JournalIndexData, GramoPageContext>): React.JSX.Element {
  return (
    <SEO
      title={data.gramoPage?.title ?? t('journalTitle', pageContext.locale)}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
    />
  );
}

export const query = graphql`
  query JournalIndex($databaseId: Int!, $locale: String!) {
    gramoPage(databaseId: { eq: $databaseId }) {
      title
    }
    allGramoJournalPost(filter: { locale: { eq: $locale } }, sort: { date: DESC }) {
      nodes {
        databaseId
        slug
        title
        date
        excerpt
        readingTime
        categories {
          slug
          name
          nameEn
        }
        localImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1200, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
