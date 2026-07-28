/**
 * Attribute shapes of the 12 gramo/* blocks — hand-kept mirror of the
 * block.json contracts in wp-content/plugins/gramo-core/src/blocks/*.
 * Any block.json attribute change must be reflected here in the same PR.
 */

export interface BlockMedia {
  id: number;
  url: string;
  alt: string;
}

export interface BlockCta {
  label: string;
  url: string;
}

export interface HeroAttrs {
  eyebrow: string;
  heading: string;
  subheading: string;
  media: BlockMedia;
  primaryCta: BlockCta;
  secondaryCta: BlockCta;
  height: 'full' | 'tall' | 'compact';
}

export interface SplitImageAttrs {
  media: BlockMedia;
  imageSide: 'left' | 'right';
  eyebrow: string;
  heading: string;
}

export interface GalleryItem extends BlockMedia {
  caption?: string;
}

export interface GalleryAttrs {
  items: GalleryItem[];
  layout: 'grid' | 'strip';
  columns: number;
}

export interface FeaturedCoffeesAttrs {
  mode: 'featured' | 'manual';
  productIds: number[];
  count: number;
  heading: string;
  intro: string;
}

export interface MenuSectionAttrs {
  sectionSlug: string;
  sectionTermId: number;
  headingOverride: string;
  showPrices: boolean;
}

export interface TestimonialsAttrs {
  mode: 'latest' | 'manual';
  testimonialIds: number[];
  count: number;
  heading: string;
}

export interface CtaBandAttrs {
  heading: string;
  text: string;
  cta: BlockCta;
  tone: 'espresso' | 'linen' | 'dark';
  media: BlockMedia;
}

export interface StatsItem {
  value: string;
  suffix: string;
  label: string;
}

export interface StatsAttrs {
  heading: string;
  items: StatsItem[];
}

export interface FaqAttrs {
  heading: string;
  intro: string;
}

export interface FaqItemAttrs {
  question: string;
}

export interface LocationsAttrs {
  locationIds: number[];
  showMap: boolean;
  heading: string;
}

export interface InquiryFormAttrs {
  formType: 'general' | 'wholesale' | 'subscription' | 'catering' | 'events' | 'careers';
  heading: string;
  intro: string;
}
