/**
 * Menu page — a small caps board strip naming the sheet, then the WP page's
 * blocks (the gramo/menu-section blocks carry the stock-sheet itself).
 */

import * as React from 'react';
import { graphql, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { BlockRenderer, parseBlocks } from '@/components/blocks/BlockRenderer';
import { t } from '@/i18n/strings';
import type { GramoPageContext } from './page';

import * as styles from './menu.module.scss';

interface MenuData {
  gramoPage: {
    title: string;
    blocksJson: string;
  } | null;
}

export default function MenuTemplate({
  data,
  pageContext,
}: PageProps<MenuData, GramoPageContext>): React.JSX.Element {
  const blocks = parseBlocks(data.gramoPage?.blocksJson);
  // The page's own hero already opens the room when the editor placed one;
  // a second wall-black title block would only repeat it.
  const hasHero = blocks[0]?.name === 'gramo/hero';

  return (
    <Layout locale={pageContext.locale} translationPath={pageContext.translationPath}>
      {hasHero ? null : (
        <header className={styles.board}>
          <div className={styles.boardInner}>
            <h1 className={styles.title}>
              {data.gramoPage?.title ?? t('menuTitle', pageContext.locale)}
            </h1>
          </div>
        </header>
      )}

      <BlockRenderer blocks={blocks} locale={pageContext.locale} />
    </Layout>
  );
}

export function Head({
  data,
  pageContext,
  location,
}: HeadProps<MenuData, GramoPageContext>): React.JSX.Element {
  return (
    <SEO
      title={data.gramoPage?.title ?? t('menuTitle', pageContext.locale)}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
    />
  );
}

export const query = graphql`
  query MenuPageById($databaseId: Int!) {
    gramoPage(databaseId: { eq: $databaseId }) {
      title
      blocksJson
    }
  }
`;
