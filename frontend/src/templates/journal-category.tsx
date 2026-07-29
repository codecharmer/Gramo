/**
 * Journal category — the index grid narrowed to one category per locale.
 * The header takes the category's display name from any post that carries
 * it (nameEn for the EN routes), falling back to the slug.
 */

import * as React from 'react';
import { graphql, Link, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { JournalCard, type JournalCardData } from '@/components/JournalCard';
import { RevealSection } from '@/components/RevealSection';
import { STATIC_ROUTES, type Locale } from '@/i18n/routes';
import { t } from '@/i18n/strings';

import * as styles from './journal-category.module.scss';

interface JournalCategoryData {
  allGramoJournalPost: { nodes: JournalCardData[] };
}

interface JournalCategoryContext {
  categorySlug: string;
  locale: Locale;
  translationPath: string | null;
}

function categoryName(
  posts: JournalCardData[],
  slug: string,
  locale: Locale
): string {
  for (const post of posts) {
    const match = (post.categories ?? []).find((category) => category?.slug === slug);
    if (match) return ((locale === 'en' ? match.nameEn : null) ?? match.name) || slug;
  }
  return slug;
}

export default function JournalCategoryTemplate({
  data,
  pageContext,
}: PageProps<JournalCategoryData, JournalCategoryContext>): React.JSX.Element {
  const locale = pageContext.locale;
  const posts = data.allGramoJournalPost.nodes;
  const name = categoryName(posts, pageContext.categorySlug, locale);

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to={STATIC_ROUTES.journal[locale]} className={styles.back}>
            {t('journalTitle', locale)}
          </Link>
          <h1 className={styles.title}>{name}</h1>
        </div>
      </header>

      <RevealSection className={styles.gridSection}>
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <JournalCard key={post.databaseId} post={post} locale={locale} index={index} />
          ))}
        </div>
      </RevealSection>
    </Layout>
  );
}

export function Head({
  data,
  pageContext,
  location,
}: HeadProps<JournalCategoryData, JournalCategoryContext>): React.JSX.Element {
  const name = categoryName(
    data.allGramoJournalPost.nodes,
    pageContext.categorySlug,
    pageContext.locale
  );
  return (
    <SEO
      title={name}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
    />
  );
}

export const query = graphql`
  query JournalCategory($categorySlug: String!, $locale: String!) {
    allGramoJournalPost(
      filter: {
        locale: { eq: $locale }
        categories: { elemMatch: { slug: { eq: $categorySlug } } }
      }
      sort: { date: DESC }
    ) {
      nodes {
        databaseId
        slug
        title
        date
        readingTime
        categories {
          slug
          name
          nameEn
        }
        localImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 640, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
