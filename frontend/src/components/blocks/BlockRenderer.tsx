/**
 * blocksJson → React. Maps every gramo/* block to its design-system
 * component; core blocks render through CoreHtml. Unknown blocks render
 * their html leaf when present (neutral wrapper) and warn in development —
 * drift stays loud, never silent.
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
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.name}-${index}`;

        const Component = BLOCK_MAP[block.name];
        if (Component) {
          return (
            <Component
              key={key}
              attributes={block.attributes ?? {}}
              innerBlocks={block.innerBlocks ?? []}
              locale={locale}
            />
          );
        }

        if (typeof block.html === 'string') {
          return <CoreHtml key={key} html={block.html} />;
        }

        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn(`[gramo] unknown block with no html fallback: ${block.name}`);
        }
        return null;
      })}
    </>
  );
}
