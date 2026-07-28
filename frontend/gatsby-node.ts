/**
 * Gramo sourcing + page creation.
 *
 * Custom sourcing (no gatsby-source-wordpress — its companion WP plugin is
 * unmaintained): typed graphql-request queries against the gramo-core
 * WPGraphQL layer create plain nodes, and every referenced image (featured
 * images, gallery refs, block media attributes, wp-image-N tags inside core
 * block HTML) is pulled through createRemoteFileNode so gatsby-plugin-image
 * owns the pipeline (AVIF/WebP, placeholders, dimensions).
 *
 * Bilingual routing: ES pages/posts render at `/`, EN peers at `/en/…`,
 * derived from the translation-pair data. A missing translation is omitted,
 * never substituted.
 */

import type { GatsbyNode } from 'gatsby';
import { GraphQLClient } from 'graphql-request';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import path from 'node:path';

import { WP_GRAPHQL_URL } from './gatsby-config';
import {
  COFFEES_QUERY,
  LOCATIONS_QUERY,
  MENU_QUERY,
  PAGES_QUERY,
  PEOPLE_QUERY,
  POSTS_QUERY,
  SETTINGS_QUERY,
} from './src/sourcing/queries';
import type { ParsedBlock } from './src/types/content';
import { pathFor, STATIC_ROUTES } from './src/i18n/routes';

const NODE_TYPES = {
  settings: 'GramoSettings',
  coffee: 'GramoCoffee',
  location: 'GramoLocation',
  menuSection: 'GramoMenuSection',
  menuEntry: 'GramoMenuEntry',
  teamMember: 'GramoTeamMember',
  testimonial: 'GramoTestimonial',
  event: 'GramoEvent',
  page: 'GramoPage',
  post: 'GramoJournalPost',
  media: 'GramoMedia',
} as const;

/** Collected during sourcing: unique image URLs → attachment id (when known). */
interface MediaHit {
  url: string;
  attachmentId: number | null;
  alt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

function walkBlocksForMedia(blocks: ParsedBlock[], hits: Map<string, MediaHit>): void {
  for (const block of blocks) {
    const attrs = (block.attributes ?? {}) as AnyRecord;

    const maybeAdd = (candidate: unknown): void => {
      if (
        candidate &&
        typeof candidate === 'object' &&
        typeof (candidate as AnyRecord).url === 'string' &&
        (candidate as AnyRecord).url !== ''
      ) {
        const media = candidate as AnyRecord;
        hits.set(String(media.url), {
          url: String(media.url),
          attachmentId: Number(media.id) > 0 ? Number(media.id) : null,
          alt: typeof media.alt === 'string' ? media.alt : '',
        });
      }
    };

    maybeAdd(attrs.media);
    if (Array.isArray(attrs.items)) {
      for (const item of attrs.items) {
        maybeAdd(item);
      }
    }

    if (typeof block.html === 'string' && block.html.includes('<img')) {
      const imgRegex = /<img[^>]*class="[^"]*wp-image-(\d+)[^"]*"[^>]*src="([^"]+)"|<img[^>]*src="([^"]+)"[^>]*class="[^"]*wp-image-(\d+)[^"]*"/g;
      let match: RegExpExecArray | null;
      while ((match = imgRegex.exec(block.html)) !== null) {
        const url = match[2] ?? match[3];
        const id = match[1] ?? match[4];
        if (url) {
          hits.set(url, {
            url,
            attachmentId: id ? Number(id) : null,
            alt: '',
          });
        }
      }
    }

    if (block.innerBlocks?.length) {
      walkBlocksForMedia(block.innerBlocks, hits);
    }
  }
}

function parseBlocksJson(json: string | null | undefined): ParsedBlock[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? (parsed as ParsedBlock[]) : [];
  } catch {
    return [];
  }
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  // Explicit types so empty content never breaks queries, and File links
  // resolve through localFileId fields.
  actions.createTypes(/* GraphQL */ `
    type GramoLocalized {
      es: String
      en: String
    }
    type GramoHoursRange {
      open: String
      close: String
    }
    type GramoHours {
      mon: GramoHoursRange
      tue: GramoHoursRange
      wed: GramoHoursRange
      thu: GramoHoursRange
      fri: GramoHoursRange
      sat: GramoHoursRange
      sun: GramoHoursRange
    }
    type GramoLabelPair {
      labelEs: String
      labelEn: String
    }
    type GramoNoteRow {
      noteEs: String
      noteEn: String
    }
    type GramoMethodRow {
      methodEs: String
      methodEn: String
    }
    type GramoVariantRow {
      labelEs: String
      labelEn: String
      price: String
    }
    type GramoTranslationRef {
      databaseId: Int
      slug: String
      locale: String
    }
    type GramoCategoryRef {
      slug: String
      name: String
      nameEn: String
    }
    type GramoNavItem {
      label: GramoLocalized
      path: String
    }
    type GramoAnnouncement {
      enabled: Boolean
      text: GramoLocalized
      url: String
    }
    type GramoSocial {
      instagram: String
      facebook: String
      spotify: String
      linktree: String
      whatsappCommunity: String
    }
    type GramoBusiness {
      name: String
      tagline: String
      phone: String
      phoneLink: String
      whatsapp: String
      email: String
      instagramHandle: String
    }
    type GramoSettings implements Node {
      nav: [GramoNavItem]
      footer: [GramoNavItem]
      footerNote: GramoLocalized
      announcement: GramoAnnouncement
      social: GramoSocial
      business: GramoBusiness
    }
    type GramoMedia implements Node {
      attachmentId: Int
      url: String!
      alt: String
      localFile: File @link(from: "localFileId")
    }
    type GramoCoffee implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      nameEn: String
      descriptionEn: String
      content: String
      origin: String
      producer: String
      altitude: String
      variety: String
      process: GramoLocalized
      roastLevel: String
      tastingNotes: [GramoNoteRow]
      brewMethods: [GramoMethodRow]
      harvest: String
      availability: String
      subscriptionInterval: String
      price: Float
      regularPrice: Float
      stockStatus: String
      purchasable: Boolean
      imageUrl: String
      imageAlt: String
      categories: [String]
      localImage: File @link(from: "localImageId")
    }
    type GramoLocation implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      menuOrder: Int
      shortName: String
      address: String
      neighborhood: String
      city: String
      postalCode: String
      phone: String
      whatsapp: String
      hours: GramoHours
      amenities: [GramoLabelPair]
      mapsUrl: String
      latitude: String
      longitude: String
      galleryUrls: [String]
      description: GramoLocalized
      neighborhoodGuide: GramoLocalized
      imageUrl: String
      localImage: File @link(from: "localImageId")
    }
    type GramoMenuSection implements Node {
      databaseId: Int!
      slug: String!
      name: String!
      nameEn: String
    }
    type GramoMenuEntry implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      menuOrder: Int
      nameEn: String
      description: GramoLocalized
      price: Float
      priceNote: GramoLocalized
      variants: [GramoVariantRow]
      dietary: GramoLocalized
      featured: Boolean
      sectionSlugs: [String]
    }
    type GramoTeamMember implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      role: GramoLocalized
      bio: GramoLocalized
      instagram: String
      imageUrl: String
      localImage: File @link(from: "localImageId")
    }
    type GramoTestimonial implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      quote: GramoLocalized
      attribution: GramoLocalized
    }
    type GramoEvent implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      titleEn: String
      description: GramoLocalized
      date: String
      timeStart: String
      timeEnd: String
      locationId: Int
      reservationUrl: String
    }
    type GramoPage implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      locale: String!
      isFront: Boolean!
      translation: GramoTranslationRef
      blocksJson: String!
    }
    type GramoJournalPost implements Node {
      databaseId: Int!
      slug: String!
      title: String!
      locale: String!
      date: String!
      excerpt: String
      readingTime: Int
      translation: GramoTranslationRef
      blocksJson: String!
      categories: [GramoCategoryRef]
      imageUrl: String
      localImage: File @link(from: "localImageId")
    }
  `);
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createNodeId,
  createContentDigest,
  getCache,
  reporter,
}) => {
  const { createNode } = actions;
  const client = new GraphQLClient(WP_GRAPHQL_URL, { errorPolicy: 'all' });

  reporter.info(`[gramo] sourcing from ${WP_GRAPHQL_URL}`);

  const [settings, coffees, locations, menu, people, pages, posts] = await Promise.all([
    client.request<AnyRecord>(SETTINGS_QUERY),
    client.request<AnyRecord>(COFFEES_QUERY),
    client.request<AnyRecord>(LOCATIONS_QUERY),
    client.request<AnyRecord>(MENU_QUERY),
    client.request<AnyRecord>(PEOPLE_QUERY),
    client.request<AnyRecord>(PAGES_QUERY),
    client.request<AnyRecord>(POSTS_QUERY),
  ]);

  const mediaHits = new Map<string, MediaHit>();
  /** URL → created File node id (filled as remote files land). */
  const fileIdByUrl = new Map<string, string>();

  const remoteFile = async (url: string): Promise<string | null> => {
    const existing = fileIdByUrl.get(url);
    if (existing) return existing;
    try {
      const fileNode = await createRemoteFileNode({
        url,
        createNode,
        createNodeId,
        getCache,
      });
      fileIdByUrl.set(url, fileNode.id);
      return fileNode.id;
    } catch (error) {
      reporter.warn(`[gramo] image failed: ${url} (${String(error)})`);
      return null;
    }
  };

  const makeNode = (type: string, key: string, payload: AnyRecord): void => {
    createNode({
      ...payload,
      id: createNodeId(`${type}-${key}`),
      internal: {
        type,
        contentDigest: createContentDigest(payload),
      },
    });
  };

  // ---- Settings (single node). --------------------------------------------
  makeNode(NODE_TYPES.settings, 'singleton', settings.gramoSettings ?? {});

  // ---- Coffees. -----------------------------------------------------------
  for (const node of settingsSafeArray(coffees, 'coffees')) {
    const imageUrl: string | null = node.featuredImage?.node?.sourceUrl ?? null;
    const localImageId = imageUrl ? await remoteFile(imageUrl) : null;
    makeNode(NODE_TYPES.coffee, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      nameEn: node.nameEn,
      descriptionEn: node.descriptionEn,
      content: node.content,
      origin: node.origin,
      producer: node.producer,
      altitude: node.altitude,
      variety: node.variety,
      process: node.process,
      roastLevel: node.roastLevel,
      tastingNotes: node.tastingNotes ?? [],
      brewMethods: node.brewMethods ?? [],
      harvest: node.harvest,
      availability: node.availability,
      subscriptionInterval: node.subscriptionInterval,
      price: node.price,
      regularPrice: node.regularPrice,
      stockStatus: node.stockStatus,
      purchasable: Boolean(node.purchasable),
      imageUrl,
      imageAlt: node.featuredImage?.node?.altText ?? '',
      categories: (node.terms?.nodes ?? []).map((t: AnyRecord) => t.slug),
      localImageId,
    });
  }

  // ---- Locations. ---------------------------------------------------------
  for (const node of settingsSafeArray(locations, 'locations')) {
    const imageUrl: string | null = node.featuredImage?.node?.sourceUrl ?? null;
    const localImageId = imageUrl ? await remoteFile(imageUrl) : null;
    for (const media of node.gallery ?? []) {
      if (media?.url) {
        mediaHits.set(media.url, {
          url: media.url,
          attachmentId: media.id ?? null,
          alt: media.alt ?? '',
        });
      }
    }
    makeNode(NODE_TYPES.location, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      menuOrder: node.menuOrder ?? 0,
      shortName: node.shortName,
      address: node.address,
      neighborhood: node.neighborhood,
      city: node.city,
      postalCode: node.postalCode,
      phone: node.phone,
      whatsapp: node.whatsapp,
      hours: node.hours,
      amenities: node.amenities ?? [],
      mapsUrl: node.mapsUrl,
      latitude: node.latitude,
      longitude: node.longitude,
      galleryUrls: (node.gallery ?? []).map((m: AnyRecord) => m.url).filter(Boolean),
      description: node.description,
      neighborhoodGuide: node.neighborhoodGuide,
      imageUrl,
      localImageId,
    });
  }

  // ---- Menu. --------------------------------------------------------------
  for (const node of menu.menuSections?.nodes ?? []) {
    makeNode(NODE_TYPES.menuSection, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      name: node.name,
      nameEn: node.nameEn,
    });
  }
  for (const node of menu.menuEntries?.nodes ?? []) {
    makeNode(NODE_TYPES.menuEntry, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      menuOrder: node.menuOrder ?? 0,
      nameEn: node.nameEn,
      description: node.description,
      price: node.price,
      priceNote: node.priceNote,
      variants: node.variants ?? [],
      dietary: node.dietary,
      featured: Boolean(node.featured),
      sectionSlugs: (node.menuSections?.nodes ?? []).map((t: AnyRecord) => t.slug),
    });
  }

  // ---- Team, testimonials, events. ----------------------------------------
  for (const node of people.teamMembers?.nodes ?? []) {
    const imageUrl: string | null = node.featuredImage?.node?.sourceUrl ?? null;
    const localImageId = imageUrl ? await remoteFile(imageUrl) : null;
    makeNode(NODE_TYPES.teamMember, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      role: node.role,
      bio: node.bio,
      instagram: node.instagram,
      imageUrl,
      localImageId,
    });
  }
  for (const node of people.testimonials?.nodes ?? []) {
    makeNode(NODE_TYPES.testimonial, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      quote: node.quote,
      attribution: node.attribution,
    });
  }
  for (const node of people.events?.nodes ?? []) {
    makeNode(NODE_TYPES.event, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      titleEn: node.titleEn,
      description: node.description,
      date: node.date,
      timeStart: node.timeStart,
      timeEnd: node.timeEnd,
      locationId: node.locationId,
      reservationUrl: node.reservationUrl,
    });
  }

  // ---- Pages + posts (block content: collect media from blocksJson). ------
  for (const node of pages.pages?.nodes ?? []) {
    walkBlocksForMedia(parseBlocksJson(node.blocksJson), mediaHits);
    makeNode(NODE_TYPES.page, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      locale: node.locale === 'en' ? 'en' : 'es',
      isFront: Boolean(node.isFrontPage),
      translation: node.translation,
      blocksJson: node.blocksJson ?? '[]',
    });
  }

  for (const node of posts.posts?.nodes ?? []) {
    walkBlocksForMedia(parseBlocksJson(node.blocksJson), mediaHits);
    const imageUrl: string | null = node.featuredImage?.node?.sourceUrl ?? null;
    const localImageId = imageUrl ? await remoteFile(imageUrl) : null;
    makeNode(NODE_TYPES.post, String(node.databaseId), {
      databaseId: node.databaseId,
      slug: node.slug,
      title: node.title,
      locale: node.locale === 'en' ? 'en' : 'es',
      date: node.date,
      excerpt: node.excerpt,
      readingTime: node.readingTime ?? 1,
      translation: node.translation,
      blocksJson: node.blocksJson ?? '[]',
      categories: (node.categories?.nodes ?? []).map((c: AnyRecord) => ({
        slug: c.slug,
        name: c.name,
        nameEn: c.nameEn,
      })),
      imageUrl,
      localImageId,
    });
  }

  // ---- Media referenced by blocks/galleries. ------------------------------
  for (const hit of mediaHits.values()) {
    const localFileId = await remoteFile(hit.url);
    makeNode(NODE_TYPES.media, hit.url, {
      attachmentId: hit.attachmentId,
      url: hit.url,
      alt: hit.alt,
      localFileId,
    });
  }

  reporter.info(
    `[gramo] sourced: ${String((coffees.coffees?.nodes ?? []).length)} coffees, ` +
      `${String((locations.locations?.nodes ?? []).length)} locations, ` +
      `${String((menu.menuEntries?.nodes ?? []).length)} menu entries, ` +
      `${String((pages.pages?.nodes ?? []).length)} pages, ` +
      `${String((posts.posts?.nodes ?? []).length)} posts, ` +
      `${String(mediaHits.size)} block images`
  );
};

function settingsSafeArray(payload: AnyRecord, key: string): AnyRecord[] {
  return payload?.[key]?.nodes ?? [];
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const templates = {
    page: path.resolve('src/templates/page.tsx'),
    journalIndex: path.resolve('src/templates/journal-index.tsx'),
    journalPost: path.resolve('src/templates/journal-post.tsx'),
    journalCategory: path.resolve('src/templates/journal-category.tsx'),
    coffeeIndex: path.resolve('src/templates/coffee-index.tsx'),
    coffee: path.resolve('src/templates/coffee.tsx'),
    locationsIndex: path.resolve('src/templates/locations-index.tsx'),
    location: path.resolve('src/templates/location.tsx'),
    menu: path.resolve('src/templates/menu.tsx'),
    cart: path.resolve('src/templates/cart.tsx'),
    checkout: path.resolve('src/templates/checkout.tsx'),
    orderConfirmed: path.resolve('src/templates/order-confirmed.tsx'),
  };

  interface PagesQueryResult {
    allGramoPage: { nodes: AnyRecord[] };
    allGramoJournalPost: { nodes: AnyRecord[] };
    allGramoCoffee: { nodes: AnyRecord[] };
    allGramoLocation: { nodes: AnyRecord[] };
  }

  const result = await graphql<PagesQueryResult>(/* GraphQL */ `
    {
      allGramoPage {
        nodes {
          databaseId
          slug
          locale
          isFront
          translation {
            slug
            locale
          }
        }
      }
      allGramoJournalPost {
        nodes {
          databaseId
          slug
          locale
          translation {
            slug
            locale
          }
          categories {
            slug
          }
        }
      }
      allGramoCoffee {
        nodes {
          databaseId
          slug
        }
      }
      allGramoLocation {
        nodes {
          databaseId
          slug
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild('[gramo] createPages query failed', result.errors as Error);
    return;
  }

  const { allGramoPage, allGramoJournalPost, allGramoCoffee, allGramoLocation } = result.data;

  /**
   * Slugs owned by dedicated templates rather than the generic block-page
   * template (the WP page still supplies their editorial block content).
   */
  const TEMPLATE_SLUGS: Record<string, keyof typeof templates> = {
    menu: 'menu',
    cafe: 'coffeeIndex',
    coffee: 'coffeeIndex',
    ubicaciones: 'locationsIndex',
    locations: 'locationsIndex',
    journal: 'journalIndex',
  };

  // ---- WP pages (block-composed). -----------------------------------------
  for (const node of allGramoPage.nodes) {
    const locale = node.locale === 'en' ? 'en' : 'es';
    const isFront = Boolean(node.isFront);
    const base = locale === 'en' ? '/en/' : '/';
    const pagePath = isFront ? base : `${base}${node.slug}/`;
    const translationPath = node.translation
      ? node.translation.locale === 'en'
        ? node.translation.slug
          ? `/en/${node.translation.slug}/`
          : '/en/'
        : `/${node.translation.slug}/`
      : null;

    const templateKey = TEMPLATE_SLUGS[String(node.slug)] ?? 'page';

    createPage({
      path: pagePath,
      component: templates[templateKey],
      context: {
        databaseId: node.databaseId,
        locale,
        translationPath: isFront && node.translation ? (locale === 'es' ? '/en/' : '/') : translationPath,
      },
    });
  }

  // ---- Journal posts + categories. ----------------------------------------
  const categorySlugs = new Map<string, true>();
  for (const node of allGramoJournalPost.nodes) {
    const locale = node.locale === 'en' ? 'en' : 'es';
    const pagePath = pathFor('journal', locale, String(node.slug));
    const translationPath = node.translation
      ? pathFor('journal', node.translation.locale === 'en' ? 'en' : 'es', String(node.translation.slug))
      : null;

    createPage({
      path: pagePath,
      component: templates.journalPost,
      context: { databaseId: node.databaseId, locale, translationPath },
    });

    for (const cat of node.categories ?? []) {
      if (cat?.slug) categorySlugs.set(String(cat.slug), true);
    }
  }

  for (const slug of categorySlugs.keys()) {
    for (const locale of ['es', 'en'] as const) {
      createPage({
        path: pathFor('journalCategory', locale, slug),
        component: templates.journalCategory,
        context: {
          categorySlug: slug,
          locale,
          translationPath: pathFor('journalCategory', locale === 'es' ? 'en' : 'es', slug),
        },
      });
    }
  }

  // ---- Coffee + location detail pages (one node → both locales). ----------
  for (const node of allGramoCoffee.nodes) {
    for (const locale of ['es', 'en'] as const) {
      createPage({
        path: pathFor('coffee', locale, String(node.slug)),
        component: templates.coffee,
        context: {
          databaseId: node.databaseId,
          locale,
          translationPath: pathFor('coffee', locale === 'es' ? 'en' : 'es', String(node.slug)),
        },
      });
    }
  }

  for (const node of allGramoLocation.nodes) {
    for (const locale of ['es', 'en'] as const) {
      createPage({
        path: pathFor('location', locale, String(node.slug)),
        component: templates.location,
        context: {
          databaseId: node.databaseId,
          locale,
          translationPath: pathFor('location', locale === 'es' ? 'en' : 'es', String(node.slug)),
        },
      });
    }
  }

  // ---- Commerce routes (static UI, both locales). -------------------------
  const commerce: Array<[keyof typeof STATIC_ROUTES, keyof typeof templates]> = [
    ['cart', 'cart'],
    ['checkout', 'checkout'],
    ['orderConfirmed', 'orderConfirmed'],
  ];
  for (const [routeKey, templateKey] of commerce) {
    for (const locale of ['es', 'en'] as const) {
      createPage({
        path: STATIC_ROUTES[routeKey][locale],
        component: templates[templateKey],
        context: {
          locale,
          translationPath: STATIC_ROUTES[routeKey][locale === 'es' ? 'en' : 'es'],
        },
      });
    }
  }
};
