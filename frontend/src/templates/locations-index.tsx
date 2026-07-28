/**
 * Locations index — the WP page's editorial blocks, then every intervened
 * space as LocationCard plates grouped under caps city headers, Cuernavaca
 * first.
 */

import * as React from 'react';
import { graphql, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { BlockRenderer, parseBlocks } from '@/components/blocks/BlockRenderer';
import { LocationCard, type LocationCardData } from '@/components/LocationCard';
import type { GramoPageContext } from './page';

import * as styles from './locations-index.module.scss';

interface LocationsIndexData {
  gramoPage: {
    title: string;
    blocksJson: string;
  } | null;
  allGramoLocation: { nodes: LocationCardData[] };
}

/** Cuernavaca leads; CDMX follows; anything else lands after, in data order. */
function cityRank(city: string | null): number {
  const normalized = (city ?? '').toLowerCase();
  if (normalized.includes('cuernavaca')) return 0;
  if (normalized.includes('cdmx') || normalized.includes('méxico') || normalized.includes('mexico')) {
    return 1;
  }
  return 2;
}

export default function LocationsIndexTemplate({
  data,
  pageContext,
}: PageProps<LocationsIndexData, GramoPageContext>): React.JSX.Element {
  const blocks = parseBlocks(data.gramoPage?.blocksJson);

  const groups = new Map<string, LocationCardData[]>();
  for (const node of data.allGramoLocation.nodes) {
    const city = node.city ?? '—';
    const group = groups.get(city) ?? [];
    group.push(node);
    groups.set(city, group);
  }
  const orderedCities = [...groups.keys()].sort((a, b) => cityRank(a) - cityRank(b));

  return (
    <Layout locale={pageContext.locale} translationPath={pageContext.translationPath}>
      <BlockRenderer blocks={blocks} locale={pageContext.locale} />

      {orderedCities.map((city) => (
        <section key={city} className={styles.cityGroup}>
          <div className={styles.inner}>
            <h2 className={styles.cityHeader}>{city}</h2>
            <div className={styles.grid}>
              {(groups.get(city) ?? []).map((location) => (
                <LocationCard
                  key={location.databaseId}
                  location={location}
                  locale={pageContext.locale}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
}

export function Head({
  data,
  pageContext,
  location,
}: HeadProps<LocationsIndexData, GramoPageContext>): React.JSX.Element {
  return (
    <SEO
      title={data.gramoPage?.title ?? 'Gramo Café'}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
    />
  );
}

export const query = graphql`
  query LocationsIndexById($databaseId: Int!) {
    gramoPage(databaseId: { eq: $databaseId }) {
      title
      blocksJson
    }
    allGramoLocation(sort: { menuOrder: ASC }) {
      nodes {
        databaseId
        slug
        title
        shortName
        city
        neighborhood
        address
        mapsUrl
        localImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 640, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
