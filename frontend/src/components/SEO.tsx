/**
 * Head-API SEO component: localized metadata, canonical + hreflang pairs
 * (only when a real translation exists), OpenGraph/Twitter, and JSON-LD.
 */

import * as React from 'react';

import type { Locale } from '@/i18n/routes';

const SITE_URL = 'https://gramo.cafe';
const SITE_NAME = 'Gramo Café';

interface SeoProps {
  title: string;
  description?: string | null;
  locale: Locale;
  pathname: string;
  translationPath?: string | null;
  imageUrl?: string | null;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  locale,
  pathname,
  translationPath,
  imageUrl,
  jsonLd,
  noindex = false,
}: SeoProps): React.JSX.Element {
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
  const ogLocale = locale === 'es' ? 'es_MX' : 'en_US';

  return (
    <>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      {translationPath ? (
        <>
          <link rel="alternate" hrefLang={locale === 'es' ? 'es-MX' : 'en'} href={url} />
          <link
            rel="alternate"
            hrefLang={locale === 'es' ? 'en' : 'es-MX'}
            href={`${SITE_URL}${translationPath}`}
          />
          <link
            rel="alternate"
            hrefLang="x-default"
            href={locale === 'es' ? url : `${SITE_URL}${translationPath}`}
          />
        </>
      ) : null}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={ogLocale} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </>
  );
}

/** Sitewide Organization + CafeOrCoffeeShop graph for the home pages. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#org`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        sameAs: [
          'https://www.instagram.com/gramo.cafe/',
          'https://www.facebook.com/gramo.cafe/',
        ],
      },
      {
        '@type': 'CafeOrCoffeeShop',
        '@id': `${SITE_URL}/#cafe`,
        name: SITE_NAME,
        servesCuisine: 'Coffee',
        url: `${SITE_URL}/`,
        parentOrganization: { '@id': `${SITE_URL}/#org` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cuernavaca',
          addressRegion: 'Morelos',
          addressCountry: 'MX',
        },
      },
    ],
  };
}
