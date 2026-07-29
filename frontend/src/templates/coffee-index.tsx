/**
 * Coffee catalog — the WP "cafe" page's editorial blocks followed by the
 * full catalog: "Cafés" (single-purchase) and "Suscripciones" (recurring)
 * as CoffeeCard plate grids.
 */

import * as React from 'react';
import { graphql, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { BlockRenderer, parseBlocks } from '@/components/blocks/BlockRenderer';
import { CoffeeCard, type CoffeeCardData } from '@/components/CoffeeCard';
import { RevealSection } from '@/components/RevealSection';
import { t } from '@/i18n/strings';
import type { GramoPageContext } from './page';

import * as styles from './coffee-index.module.scss';

interface CoffeeIndexData {
  gramoPage: {
    title: string;
    blocksJson: string;
  } | null;
  allGramoCoffee: { nodes: CoffeeCardData[] };
}

export default function CoffeeIndexTemplate({
  data,
  pageContext,
}: PageProps<CoffeeIndexData, GramoPageContext>): React.JSX.Element {
  const blocks = parseBlocks(data.gramoPage?.blocksJson);
  const coffees = data.allGramoCoffee.nodes.filter((coffee) => !coffee.subscriptionInterval);
  const subscriptions = data.allGramoCoffee.nodes.filter((coffee) =>
    Boolean(coffee.subscriptionInterval)
  );

  return (
    <Layout locale={pageContext.locale} translationPath={pageContext.translationPath}>
      <BlockRenderer blocks={blocks} locale={pageContext.locale} />

      {coffees.length > 0 ? (
        <RevealSection className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.sectionHeading}>{t('coffeesSection', pageContext.locale)}</h2>
            <div className={styles.grid}>
              {coffees.map((coffee, index) => (
                <CoffeeCard
                  key={coffee.databaseId}
                  coffee={coffee}
                  locale={pageContext.locale}
                  index={index}
                />
              ))}
            </div>
          </div>
        </RevealSection>
      ) : null}

      {subscriptions.length > 0 ? (
        <RevealSection className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.sectionHeading}>
              {t('subscriptionsSection', pageContext.locale)}
            </h2>
            <div className={styles.grid}>
              {subscriptions.map((coffee, index) => (
                <CoffeeCard
                  key={coffee.databaseId}
                  coffee={coffee}
                  locale={pageContext.locale}
                  index={index}
                />
              ))}
            </div>
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
}: HeadProps<CoffeeIndexData, GramoPageContext>): React.JSX.Element {
  return (
    <SEO
      title={data.gramoPage?.title ?? t('coffeesSection', pageContext.locale)}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
    />
  );
}

export const query = graphql`
  query CoffeeIndexById($databaseId: Int!) {
    gramoPage(databaseId: { eq: $databaseId }) {
      title
      blocksJson
    }
    allGramoCoffee(sort: { title: ASC }) {
      nodes {
        databaseId
        slug
        title
        nameEn
        origin
        altitude
        price
        stockStatus
        purchasable
        subscriptionInterval
        categories
        tastingNotes {
          noteEs
          noteEn
        }
        imageAlt
        localImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 640, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
