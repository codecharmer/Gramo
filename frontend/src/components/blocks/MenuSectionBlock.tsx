/**
 * gramo/menu-section — the stock-sheet: a caps section header over
 * dotted-leader rows (name … price in tabular numerals), descriptions and
 * price notes in small type, variants as sub-rows, dietary flags in olive
 * small caps. `showPrices: false` turns the sheet into a plain list.
 */

import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import type { LocalizedText } from '@/types/content';
import { formatPrice } from '@/lib/format';
import type { MenuSectionAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './MenuSectionBlock.module.scss';

interface SectionNode {
  databaseId: number;
  slug: string;
  name: string;
  nameEn: string | null;
}

interface EntryNode {
  databaseId: number;
  title: string;
  nameEn: string | null;
  menuOrder: number | null;
  description: LocalizedText | null;
  price: number | null;
  priceNote: LocalizedText | null;
  variants: Array<{ labelEs: string | null; labelEn: string | null; price: string | null } | null> | null;
  dietary: LocalizedText | null;
  sectionSlugs: Array<string | null> | null;
}

interface QueryResult {
  allGramoMenuSection: { nodes: SectionNode[] };
  allGramoMenuEntry: { nodes: EntryNode[] };
}

function localized(text: LocalizedText | null | undefined, locale: 'es' | 'en'): string {
  if (!text) return '';
  return (locale === 'es' ? text.es : text.en) ?? text.es ?? '';
}

export function MenuSectionBlock({
  attributes,
  locale,
}: BlockComponentProps<MenuSectionAttrs>): React.JSX.Element | null {
  const data = useStaticQuery<QueryResult>(graphql`
    query MenuSheet {
      allGramoMenuSection {
        nodes {
          databaseId
          slug
          name
          nameEn
        }
      }
      allGramoMenuEntry(sort: { menuOrder: ASC }) {
        nodes {
          databaseId
          title
          nameEn
          menuOrder
          description {
            es
            en
          }
          price
          priceNote {
            es
            en
          }
          variants {
            labelEs
            labelEn
            price
          }
          dietary {
            es
            en
          }
          sectionSlugs
        }
      }
    }
  `);

  const section = data.allGramoMenuSection.nodes.find((node) => node.slug === attributes.sectionSlug);
  const entries = data.allGramoMenuEntry.nodes.filter((entry) =>
    (entry.sectionSlugs ?? []).includes(attributes.sectionSlug)
  );

  if (!section && entries.length === 0) return null;

  const showPrices = attributes.showPrices !== false;
  const heading =
    attributes.headingOverride ||
    (section ? ((locale === 'en' ? section.nameEn : null) ?? section.name) : attributes.sectionSlug);

  return (
    <section className={styles.sheet}>
      <div className={styles.inner}>
        <h2 className={styles.header}>{heading}</h2>

        <ul className={styles.rows}>
          {entries.map((entry) => {
            const name = (locale === 'en' ? entry.nameEn : null) ?? entry.title;
            const description = localized(entry.description, locale);
            const priceNote = localized(entry.priceNote, locale);
            const dietary = localized(entry.dietary, locale);
            const variants = (entry.variants ?? []).filter(
              (variant): variant is NonNullable<typeof variant> => Boolean(variant)
            );

            return (
              <li key={entry.databaseId} className={styles.row}>
                <div className={styles.leader}>
                  <span className={styles.name}>{name}</span>
                  {showPrices && entry.price != null ? (
                    <span className={styles.price}>
                      {formatPrice(entry.price)}
                      {priceNote ? <span className={styles.priceNote}> {priceNote}</span> : null}
                    </span>
                  ) : null}
                </div>

                {description ? <p className={styles.description}>{description}</p> : null}
                {dietary ? <p className={styles.dietary}>{dietary}</p> : null}

                {variants.length > 0 ? (
                  <ul className={styles.variants}>
                    {variants.map((variant, index) => {
                      const label =
                        (locale === 'en' ? variant.labelEn : null) ?? variant.labelEs ?? '';
                      return (
                        <li key={`${entry.databaseId}-${index}`} className={styles.leader}>
                          <span className={styles.variantLabel}>{label}</span>
                          {showPrices && variant.price ? (
                            <span className={styles.price}>{variant.price}</span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
