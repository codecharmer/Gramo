/**
 * gramo/featured-coffees — a portrait row of coffee plates. `featured` mode
 * shows the first N purchasable non-subscription coffees; `manual` mode
 * follows the editor's productIds order. Cards are the shared CoffeeCard.
 */

import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { CoffeeCard, type CoffeeCardData } from '@/components/CoffeeCard';
import type { FeaturedCoffeesAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './FeaturedCoffeesBlock.module.scss';

interface QueryResult {
  allGramoCoffee: { nodes: CoffeeCardData[] };
}

export function FeaturedCoffeesBlock({
  attributes,
  locale,
}: BlockComponentProps<FeaturedCoffeesAttrs>): React.JSX.Element | null {
  const data = useStaticQuery<QueryResult>(graphql`
    query FeaturedCoffees {
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
  `);

  const all = data.allGramoCoffee.nodes;
  const count = attributes.count > 0 ? attributes.count : 3;

  let coffees: CoffeeCardData[];
  if (attributes.mode === 'manual' && (attributes.productIds ?? []).length > 0) {
    coffees = attributes.productIds
      .map((id) => all.find((coffee) => coffee.databaseId === id))
      .filter((coffee): coffee is CoffeeCardData => Boolean(coffee));
  } else {
    coffees = all
      .filter((coffee) => coffee.purchasable === true && !coffee.subscriptionInterval)
      .slice(0, count);
  }

  if (coffees.length === 0) return null;

  return (
    <section className={styles.featured}>
      <div className={styles.inner}>
        {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}
        {attributes.intro ? <p className={styles.intro}>{attributes.intro}</p> : null}

        <div className={styles.row}>
          {coffees.map((coffee, index) => (
            <CoffeeCard key={coffee.databaseId} coffee={coffee} locale={locale} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
