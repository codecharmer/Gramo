/**
 * The bilingual route map — single source of truth for localized paths.
 *
 * ES is the primary locale at `/`; EN lives under `/en/`. Static routes are
 * declared here; dynamic content (pages, journal, coffees, locations) derives
 * its path from these prefixes. The SEO component and the language switcher
 * both read this map so hreflang pairs can never drift from real routes.
 */

export type Locale = 'es' | 'en';

export const LOCALES: Locale[] = ['es', 'en'];
export const DEFAULT_LOCALE: Locale = 'es';

/** Static route keys → per-locale paths. */
export const STATIC_ROUTES = {
  home: { es: '/', en: '/en/' },
  coffee: { es: '/cafe/', en: '/en/coffee/' },
  menu: { es: '/menu/', en: '/en/menu/' },
  locations: { es: '/ubicaciones/', en: '/en/locations/' },
  journal: { es: '/journal/', en: '/en/journal/' },
  cart: { es: '/pedido/', en: '/en/order/' },
  checkout: { es: '/pedido/confirmar/', en: '/en/order/checkout/' },
  orderConfirmed: { es: '/pedido/listo/', en: '/en/order/confirmed/' },
} as const;

export type StaticRouteKey = keyof typeof STATIC_ROUTES;

/** Content-type prefixes for dynamic nodes. */
export const PREFIXES = {
  coffee: { es: '/cafe/', en: '/en/coffee/' },
  location: { es: '/ubicaciones/', en: '/en/locations/' },
  journal: { es: '/journal/', en: '/en/journal/' },
  journalCategory: { es: '/journal/categoria/', en: '/en/journal/category/' },
  page: { es: '/', en: '/en/' },
} as const;

/** Build a localized path for a dynamic node. */
export function pathFor(
  type: keyof typeof PREFIXES,
  locale: Locale,
  slug: string
): string {
  return `${PREFIXES[type][locale]}${slug}/`;
}

/** The alternate-locale home for switcher fallbacks. */
export function homeFor(locale: Locale): string {
  return STATIC_ROUTES.home[locale];
}
