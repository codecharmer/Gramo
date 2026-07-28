/**
 * gramo/locations — the intervened spaces as LocationCard plates, in
 * menuOrder. An id list narrows the set; `showMap` adds a caps "Cómo
 * llegar ↗" link-out per card instead of any live map embed.
 */

import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { LocationCard, type LocationCardData } from '@/components/LocationCard';
import type { LocationsAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './LocationsBlock.module.scss';

interface QueryResult {
  allGramoLocation: { nodes: LocationCardData[] };
}

export function LocationsBlock({
  attributes,
  locale,
}: BlockComponentProps<LocationsAttrs>): React.JSX.Element | null {
  const data = useStaticQuery<QueryResult>(graphql`
    query BlockLocations {
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
  `);

  const ids = attributes.locationIds ?? [];
  const locations =
    ids.length > 0
      ? data.allGramoLocation.nodes.filter((node) => ids.includes(node.databaseId))
      : data.allGramoLocation.nodes;

  if (locations.length === 0) return null;

  return (
    <section className={styles.locations}>
      <div className={styles.inner}>
        {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}

        <div className={styles.grid}>
          {locations.map((location) => (
            <LocationCard
              key={location.databaseId}
              location={location}
              locale={locale}
              showMapLink={attributes.showMap === true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
