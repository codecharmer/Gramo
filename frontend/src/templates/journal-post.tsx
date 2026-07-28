/**
 * Journal post — serif display title on paper with the category caps and a
 * dated caps line, the featured photograph as a plate, the block-composed
 * body, and three more recent same-locale posts. JSON-LD Article.
 */

import * as React from 'react';
import { graphql, type HeadProps, type PageProps } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { BlockRenderer, parseBlocks } from '@/components/blocks/BlockRenderer';
import { JournalCard, type JournalCardData } from '@/components/JournalCard';
import { t } from '@/i18n/strings';
import type { Locale } from '@/i18n/routes';
import { formatDate } from '@/lib/format';

import * as styles from './journal-post.module.scss';

interface JournalPostNode {
  databaseId: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string | null;
  readingTime: number | null;
  blocksJson: string;
  categories: Array<{ slug: string; name: string; nameEn: string | null } | null> | null;
  imageUrl: string | null;
  localImage: {
    childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
  } | null;
}

interface JournalPostData {
  gramoJournalPost: JournalPostNode | null;
  related: { nodes: JournalCardData[] };
}

interface JournalPostContext {
  databaseId: number;
  locale: Locale;
  translationPath: string | null;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

export default function JournalPostTemplate({
  data,
  pageContext,
}: PageProps<JournalPostData, JournalPostContext>): React.JSX.Element {
  const post = data.gramoJournalPost;
  const locale = pageContext.locale;

  if (!post) {
    return (
      <Layout locale={locale} translationPath={pageContext.translationPath}>
        <div />
      </Layout>
    );
  }

  const image = post.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const category = (post.categories ?? []).find(Boolean) ?? null;
  const blocks = parseBlocks(post.blocksJson);

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <article>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            {category ? (
              <p className={styles.category}>
                {(locale === 'en' ? category.nameEn : null) ?? category.name}
              </p>
            ) : null}
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.meta}>
              <span>{formatDate(post.date, locale)}</span>
              {post.readingTime ? (
                <span>
                  {post.readingTime} {t('readingTime', locale)}
                </span>
              ) : null}
            </p>
          </div>
        </header>

        {image ? (
          <div className={styles.plateWrap}>
            <figure className={styles.plate}>
              <GatsbyImage image={image} alt={post.title} loading="eager" />
            </figure>
          </div>
        ) : null}

        <div className={styles.body}>
          <BlockRenderer blocks={blocks} locale={locale} />
        </div>
      </article>

      {data.related.nodes.length > 0 ? (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedHeading}>{t('relatedPosts', locale)}</h2>
            <div className={styles.relatedGrid}>
              {data.related.nodes.map((node, index) => (
                <JournalCard key={node.databaseId} post={node} locale={locale} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </Layout>
  );
}

export function Head({
  data,
  pageContext,
  location,
}: HeadProps<JournalPostData, JournalPostContext>): React.JSX.Element {
  const post = data.gramoJournalPost;
  const description = post?.excerpt ? stripTags(post.excerpt) : null;

  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        datePublished: post.date,
        inLanguage: pageContext.locale === 'es' ? 'es-MX' : 'en',
        ...(post.imageUrl ? { image: post.imageUrl } : {}),
        ...(description ? { description } : {}),
        author: { '@type': 'Organization', name: 'Gramo Café' },
        publisher: { '@type': 'Organization', name: 'Gramo Café' },
      }
    : undefined;

  return (
    <SEO
      title={post?.title ?? 'Gramo Café'}
      description={description}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
      imageUrl={post?.imageUrl}
      jsonLd={jsonLd}
    />
  );
}

export const query = graphql`
  query JournalPostById($databaseId: Int!, $locale: String!) {
    gramoJournalPost(databaseId: { eq: $databaseId }) {
      databaseId
      slug
      title
      date
      excerpt
      readingTime
      blocksJson
      categories {
        slug
        name
        nameEn
      }
      imageUrl
      localImage {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 1200, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
    related: allGramoJournalPost(
      filter: { locale: { eq: $locale }, databaseId: { ne: $databaseId } }
      sort: { date: DESC }
      limit: 3
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
