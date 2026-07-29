/**
 * gramo/testimonials — large serif-italic quotes with an oversized opening
 * quote mark in an alternating pigment, attribution in tracked caps beneath
 * a thin rule. `latest` takes the newest N; `manual` follows the editor's
 * id order.
 */

import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import type { LocalizedText } from '@/types/content';
import { useReveal } from '@/lib/reveal';
import type { TestimonialsAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './TestimonialsBlock.module.scss';

interface TestimonialNode {
  databaseId: number;
  title: string;
  quote: LocalizedText | null;
  attribution: LocalizedText | null;
}

interface QueryResult {
  allGramoTestimonial: { nodes: TestimonialNode[] };
}

function localized(text: LocalizedText | null | undefined, locale: 'es' | 'en'): string {
  if (!text) return '';
  return (locale === 'es' ? text.es : text.en) ?? text.es ?? '';
}

export function TestimonialsBlock({
  attributes,
  locale,
}: BlockComponentProps<TestimonialsAttrs>): React.JSX.Element | null {
  const ref = useReveal<HTMLElement>();
  const data = useStaticQuery<QueryResult>(graphql`
    query Testimonials {
      allGramoTestimonial(sort: { databaseId: DESC }) {
        nodes {
          databaseId
          title
          quote {
            es
            en
          }
          attribution {
            es
            en
          }
        }
      }
    }
  `);

  const all = data.allGramoTestimonial.nodes;
  const count = attributes.count > 0 ? attributes.count : 2;

  let testimonials: TestimonialNode[];
  if (attributes.mode === 'manual' && (attributes.testimonialIds ?? []).length > 0) {
    testimonials = attributes.testimonialIds
      .map((id) => all.find((node) => node.databaseId === id))
      .filter((node): node is TestimonialNode => Boolean(node));
  } else {
    testimonials = all.slice(0, count);
  }

  const visible = testimonials.filter((node) => localized(node.quote, locale) !== '');
  if (visible.length === 0) return null;

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className={styles.inner}>
        {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}

        <div className={styles.list}>
          {visible.map((node) => (
            <figure key={node.databaseId} className={styles.item} data-reveal="label">
              <blockquote className={styles.quote}>
                <p>{localized(node.quote, locale)}</p>
              </blockquote>
              {localized(node.attribution, locale) ? (
                <figcaption className={styles.attribution}>
                  {localized(node.attribution, locale)}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
