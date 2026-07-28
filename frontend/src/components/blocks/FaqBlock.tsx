/**
 * gramo/faq — ledger-row accordions from gramo/faq-item inner blocks:
 * native <details>/<summary> (keyboard support for free) styled in the
 * world's grammar — 1px ink rules, a plus that rotates to × on open.
 */

import * as React from 'react';

import type { ParsedBlock } from '@/types/content';
import type { FaqAttrs, FaqItemAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';
import { CoreHtml } from './CoreHtml';

import * as styles from './FaqBlock.module.scss';

function faqItemBody(item: ParsedBlock): React.JSX.Element[] {
  return (item.innerBlocks ?? [])
    .map((block, index) =>
      typeof block.html === 'string' ? (
        <CoreHtml key={`${block.name}-${index}`} html={block.html} />
      ) : null
    )
    .filter((node): node is React.JSX.Element => node !== null);
}

export function FaqBlock({
  attributes,
  innerBlocks,
}: BlockComponentProps<FaqAttrs>): React.JSX.Element | null {
  const items = innerBlocks.filter((block) => block.name === 'gramo/faq-item');
  if (items.length === 0) return null;

  return (
    <section className={styles.faq}>
      <div className={styles.inner}>
        {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}
        {attributes.intro ? <p className={styles.intro}>{attributes.intro}</p> : null}

        <div className={styles.list}>
          {items.map((item, index) => {
            const question = String((item.attributes as FaqItemAttrs | undefined)?.question ?? '');
            if (!question) return null;
            return (
              <details key={`faq-${index}`} className={styles.item}>
                <summary className={styles.summary}>
                  <span className={styles.question}>{question}</span>
                  <span className={styles.marker} aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className={styles.body}>{faqItemBody(item)}</div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
