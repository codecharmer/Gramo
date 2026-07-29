/**
 * Formatting helpers for the stock-sheet voice: MXN prices in tabular
 * numerals and localized long dates.
 */

import type { Locale } from '@/i18n/routes';

/** "$450 MXN" — whole pesos stay whole, fractions keep two decimals. */
export function formatMxn(price: number): string {
  return `${formatPrice(price)} MXN`;
}

/** "$450" / "$52.50" — the bare stock-sheet price. */
export function formatPrice(price: number): string {
  const value = Number.isInteger(price) ? String(price) : price.toFixed(2);
  return `$${value}`;
}

/** Long-form date in the page's locale (es-MX / en-US). */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Human labels for the schema's enum fields.
 *
 * The backend stores slugs (`temporada`, `medio`) so editors pick from a
 * fixed list; the site shows the phrase a reader expects, in their language.
 * An unknown slug falls back to itself capitalized, so adding a choice in
 * WordPress degrades to something readable rather than blank.
 */
const ENUM_LABELS: Record<string, { es: string; en: string }> = {
  // Availability.
  permanente: { es: 'Permanente', en: 'Year-round' },
  temporada: { es: 'De temporada', en: 'Seasonal' },
  // Roast level.
  ligero: { es: 'Ligero', en: 'Light' },
  medio: { es: 'Medio', en: 'Medium' },
  'medio-oscuro': { es: 'Medio oscuro', en: 'Medium-dark' },
  oscuro: { es: 'Oscuro', en: 'Dark' },
  // Subscription interval.
  semanal: { es: 'Semanal', en: 'Weekly' },
  quincenal: { es: 'Quincenal', en: 'Fortnightly' },
  mensual: { es: 'Mensual', en: 'Monthly' },
};

export function enumLabel(slug: string | null | undefined, locale: Locale): string | null {
  if (!slug) return null;
  const entry = ENUM_LABELS[slug];
  if (entry) return locale === 'es' ? entry.es : entry.en;
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
