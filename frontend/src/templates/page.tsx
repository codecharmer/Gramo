/**
 * Generic block-composed page template: renders a WP page's blocksJson
 * through the BlockRenderer. Serves every editorial page (home, about,
 * process, subscriptions, wholesale, careers, contact, privacy).
 */

import * as React from 'react';
import { graphql, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO, organizationJsonLd } from '@/components/SEO';
import { BlockRenderer, parseBlocks } from '@/components/blocks/BlockRenderer';
import type { Locale } from '@/i18n/routes';

interface PageData {
  gramoPage: {
    databaseId: number;
    title: string;
    slug: string;
    isFront: boolean;
    blocksJson: string;
    gramoSeo: { description: string | null; short: string | null } | null;
  } | null;
}

export interface GramoPageContext {
  databaseId: number;
  locale: Locale;
  translationPath: string | null;
}

export default function PageTemplate({
  data,
  pageContext,
}: PageProps<PageData, GramoPageContext>): React.JSX.Element {
  const page = data.gramoPage;
  const blocks = parseBlocks(page?.blocksJson);

  return (
    <Layout locale={pageContext.locale} translationPath={pageContext.translationPath}>
      <BlockRenderer blocks={blocks} locale={pageContext.locale} />
    </Layout>
  );
}

export function Head({
  data,
  pageContext,
  location,
}: HeadProps<PageData, GramoPageContext>): React.JSX.Element {
  const page = data.gramoPage;
  return (
    <SEO
      title={page?.isFront ? 'Gramo Café' : (page?.title ?? 'Gramo Café')}
      description={page?.gramoSeo?.description ?? page?.gramoSeo?.short ?? null}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
      jsonLd={page?.isFront ? organizationJsonLd() : undefined}
    />
  );
}

export const query = graphql`
  query GramoPageById($databaseId: Int!) {
    gramoPage(databaseId: { eq: $databaseId }) {
      databaseId
      title
      slug
      isFront
      blocksJson
      gramoSeo {
        description
        short
      }
    }
  }
`;
