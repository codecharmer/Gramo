/**
 * Shapes of the sourced content nodes (mirrors the gramo-core GraphQL layer).
 * These are the node payloads created in gatsby-node's sourceNodes.
 */

export interface LocalizedText {
  es: string | null;
  en: string | null;
}

export interface MediaRef {
  id: number | null;
  url: string | null;
  alt: string | null;
  width?: number | null;
  height?: number | null;
}

export interface HoursRange {
  open: string | null;
  close: string | null;
}

export interface OpeningHours {
  mon?: HoursRange | null;
  tue?: HoursRange | null;
  wed?: HoursRange | null;
  thu?: HoursRange | null;
  fri?: HoursRange | null;
  sat?: HoursRange | null;
  sun?: HoursRange | null;
}

export interface TranslationLink {
  databaseId: number;
  slug: string;
  locale: string;
}

export interface NavItem {
  label: LocalizedText;
  path: string;
}

export interface GramoSettingsNode {
  nav: NavItem[];
  footer: NavItem[];
  footerNote: LocalizedText;
  announcement: {
    enabled: boolean;
    text: LocalizedText;
    url: string | null;
  };
  social: {
    instagram: string | null;
    facebook: string | null;
    spotify: string | null;
    linktree: string | null;
    whatsappCommunity: string | null;
  };
  business: {
    name: string | null;
    tagline: string | null;
    phone: string | null;
    phoneLink: string | null;
    whatsapp: string | null;
    email: string | null;
    instagramHandle: string | null;
  };
}

export interface CoffeeNode {
  databaseId: number;
  slug: string;
  title: string;
  nameEn: string | null;
  descriptionEn: string | null;
  content: string | null;
  origin: string | null;
  producer: string | null;
  altitude: string | null;
  variety: string | null;
  process: LocalizedText | null;
  roastLevel: string | null;
  tastingNotes: Array<{ noteEs: string | null; noteEn: string | null }>;
  brewMethods: Array<{ methodEs: string | null; methodEn: string | null }>;
  harvest: string | null;
  availability: string | null;
  subscriptionInterval: string | null;
  price: number | null;
  regularPrice: number | null;
  stockStatus: string | null;
  purchasable: boolean;
  imageUrl: string | null;
  imageAlt: string | null;
  categories: string[];
}

export interface LocationNode {
  databaseId: number;
  slug: string;
  title: string;
  shortName: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  postalCode: string | null;
  phone: string | null;
  whatsapp: string | null;
  hours: OpeningHours | null;
  amenities: Array<{ labelEs: string | null; labelEn: string | null }>;
  mapsUrl: string | null;
  latitude: string | null;
  longitude: string | null;
  gallery: MediaRef[];
  description: LocalizedText | null;
  neighborhoodGuide: LocalizedText | null;
  imageUrl: string | null;
  menuOrder: number;
}

export interface MenuSectionNode {
  databaseId: number;
  slug: string;
  name: string;
  nameEn: string | null;
}

export interface MenuEntryNode {
  databaseId: number;
  slug: string;
  title: string;
  nameEn: string | null;
  description: LocalizedText | null;
  price: number | null;
  priceNote: LocalizedText | null;
  variants: Array<{ labelEs: string | null; labelEn: string | null; price: string | null }>;
  dietary: LocalizedText | null;
  featured: boolean;
  sectionSlugs: string[];
  menuOrder: number;
}

export interface TeamMemberNode {
  databaseId: number;
  slug: string;
  title: string;
  role: LocalizedText | null;
  bio: LocalizedText | null;
  instagram: string | null;
  imageUrl: string | null;
}

export interface TestimonialNode {
  databaseId: number;
  slug: string;
  title: string;
  quote: LocalizedText | null;
  attribution: LocalizedText | null;
}

export interface EventNode {
  databaseId: number;
  slug: string;
  title: string;
  titleEn: string | null;
  description: LocalizedText | null;
  date: string | null;
  timeStart: string | null;
  timeEnd: string | null;
  locationId: number | null;
  reservationUrl: string | null;
}

export interface PageNode {
  databaseId: number;
  slug: string;
  title: string;
  locale: 'es' | 'en';
  isFront: boolean;
  translation: TranslationLink | null;
  blocksJson: string;
  seoDescription: string | null;
}

export interface JournalPostNode {
  databaseId: number;
  slug: string;
  title: string;
  locale: 'es' | 'en';
  date: string;
  excerpt: string | null;
  readingTime: number;
  translation: TranslationLink | null;
  blocksJson: string;
  categories: Array<{ slug: string; name: string; nameEn: string | null }>;
  imageUrl: string | null;
}

/** A parsed block from blocksJson. */
export interface ParsedBlock {
  name: string;
  attributes?: Record<string, unknown>;
  innerBlocks?: ParsedBlock[];
  html?: string;
}
