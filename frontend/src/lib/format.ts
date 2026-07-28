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
