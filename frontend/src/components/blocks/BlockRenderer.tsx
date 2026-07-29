/**
 * blocksJson → React. Maps every gramo/* block to its design-system
 * component; core blocks render through CoreHtml. Consecutive core blocks
 * are grouped into one daylight prose room so a page of paragraphs reads as
 * a single lit reading surface rather than a stack of bands. Unknown blocks
 * render their html leaf when present and warn in development — drift stays
 * loud, never silent.
 */

import * as React from 'react';

import type { ParsedBlock } from '@/types/content';
import type { Locale } from '@/i18n/routes';

import { CoreHtml } from './CoreHtml';
import { HeroBlock } from './HeroBlock';
import { SplitImageBlock } from './SplitImageBlock';
import { GalleryBlock } from './GalleryBlock';
import { FeaturedCoffeesBlock } from './FeaturedCoffeesBlock';
import { MenuSectionBlock } from './MenuSectionBlock';
import { TestimonialsBlock } from './TestimonialsBlock';
import { CtaBandBlock } from './CtaBandBlock';
import { StatsBlock } from './StatsBlock';
import { FaqBlock } from './FaqBlock';
import { LocationsBlock } from './LocationsBlock';
import { InquiryFormBlock } from './InquiryFormBlock';

import * as styles from './BlockRenderer.module.scss';

export interface BlockComponentProps<A = Record<string, unknown>> {
  attributes: A;
  innerBlocks: ParsedBlock[];
  locale: Locale;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BLOCK_MAP: Record<string, React.ComponentType<BlockComponentProps<any>>> = {
  'gramo/hero': HeroBlock,
  'gramo/split-image': SplitImageBlock,
  'gramo/gallery': GalleryBlock,
  'gramo/featured-coffees': FeaturedCoffeesBlock,
  'gramo/menu-section': MenuSectionBlock,
  'gramo/testimonials': TestimonialsBlock,
  'gramo/cta-band': CtaBandBlock,
  'gramo/stats': StatsBlock,
  'gramo/faq': FaqBlock,
  'gramo/locations': LocationsBlock,
  'gramo/inquiry-form': InquiryFormBlock,
};

export function parseBlocks(json: string | null | undefined): ParsedBlock[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    return Array.isArray(parsed) ? (parsed as ParsedBlock[]) : [];
  } catch {
    return [];
  }
}

interface BlockRendererProps {
  blocks: ParsedBlock[];
  locale: Locale;
}

export function BlockRenderer({ blocks, locale }: BlockRendererProps): React.JSX.Element {
  const output: React.ReactNode[] = [];
  let prose: React.ReactNode[] = [];
  let proseStart = 0;

  const closeProseRoom = (): void => {
    if (prose.length === 0) return;
    output.push(
      <section className={styles.proseRoom} key={`prose-${proseStart}`}>
        {prose}
      </section>
    );
    prose = [];
  };

  blocks.forEach((block, index) => {
    const key = `${block.name}-${index}`;
    const Component = BLOCK_MAP[block.name];

    if (Component) {
      closeProseRoom();
      output.push(
        <Component
          key={key}
          attributes={block.attributes ?? {}}
          innerBlocks={block.innerBlocks ?? []}
          locale={locale}
        />
      );
      return;
    }

    if (typeof block.html === 'string') {
      if (block.html.trim() === '') return;
      if (prose.length === 0) proseStart = index;
      prose.push(<CoreHtml key={key} html={block.html} />);
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(`[gramo] unknown block with no html fallback: ${block.name}`);
    }
  });

  closeProseRoom();

  return <>{output}</>;
}
