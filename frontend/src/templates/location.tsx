/**
 * Location detail — a wall-black title block, the café photographed inside a
 * bone hairline mat, the wall label (address, phone, WhatsApp, a link-out to
 * Maps — never an embed), opening hours as a hairline table and amenities as
 * caps chips. The café's story and the neighborhood guide invert to daylight
 * reading rooms. JSON-LD CafeOrCoffeeShop with address/geo/hours.
 */

import * as React from 'react';
import { graphql, type HeadProps, type PageProps } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { useBlockMedia } from '@/hooks/useBlockMedia';
import { useReveal } from '@/lib/reveal';
import { t, type StringKey } from '@/i18n/strings';
import type { Locale } from '@/i18n/routes';
import type { HoursRange, LocalizedText, OpeningHours } from '@/types/content';

import * as styles from './location.module.scss';

interface LocationDetailNode {
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
  amenities: Array<{ labelEs: string | null; labelEn: string | null } | null> | null;
  mapsUrl: string | null;
  gramoSeo: { description: string | null; short: string | null } | null;
  latitude: string | null;
  longitude: string | null;
  galleryUrls: Array<string | null> | null;
  description: LocalizedText | null;
  neighborhoodGuide: LocalizedText | null;
  imageUrl: string | null;
  localImage: {
    childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
  } | null;
}

interface LocationData {
  gramoLocation: LocationDetailNode | null;
}

interface LocationContext {
  databaseId: number;
  locale: Locale;
  translationPath: string | null;
}

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
type DayKey = (typeof DAY_ORDER)[number];

const DAY_STRING: Record<DayKey, StringKey> = {
  mon: 'dayMon',
  tue: 'dayTue',
  wed: 'dayWed',
  thu: 'dayThu',
  fri: 'dayFri',
  sat: 'daySat',
  sun: 'daySun',
};

const DAY_SCHEMA: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

function localized(text: LocalizedText | null | undefined, locale: Locale): string {
  if (!text) return '';
  return (locale === 'es' ? text.es : text.en) ?? text.es ?? '';
}

function dayRange(hours: OpeningHours | null, day: DayKey): HoursRange | null {
  const range = hours?.[day];
  return range?.open && range.close ? range : null;
}

function hasAnyHours(hours: OpeningHours | null): boolean {
  return DAY_ORDER.some((day) => dayRange(hours, day) !== null);
}

function waLink(value: string): string {
  if (value.startsWith('http')) return value;
  return `https://wa.me/${value.replace(/\D/g, '')}`;
}

export default function LocationTemplate({
  data,
  pageContext,
}: PageProps<LocationData, LocationContext>): React.JSX.Element {
  const media = useBlockMedia();
  const detailRef = useReveal<HTMLElement>();
  const galleryRef = useReveal<HTMLElement>();
  const node = data.gramoLocation;
  const locale = pageContext.locale;

  if (!node) {
    return (
      <Layout locale={locale} translationPath={pageContext.translationPath}>
        <div />
      </Layout>
    );
  }

  const name = node.shortName ?? node.title;
  const image = node.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const amenities = (node.amenities ?? [])
    .map((item) => (locale === 'en' ? (item?.labelEn ?? item?.labelEs) : item?.labelEs))
    .filter((label): label is string => Boolean(label));
  const description = localized(node.description, locale);
  const guide = localized(node.neighborhoodGuide, locale);
  const galleryImages = (node.galleryUrls ?? [])
    .filter((url): url is string => Boolean(url))
    .map((url) => ({ url, image: media.byUrl(url), alt: media.altFor(url) }))
    .filter((item) => item.image !== null);

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <header className={styles.board}>
        <div className={styles.boardInner}>
          {node.city ? <p className={styles.eyebrow}>{node.city}</p> : null}
          <h1 className={styles.title}>{name}</h1>
          {node.neighborhood ? <p className={styles.neighborhood}>{node.neighborhood}</p> : null}
        </div>
      </header>

      <section className={styles.detail} ref={detailRef}>
        <div className={styles.detailInner}>
          <div className={styles.column}>
            {image ? (
              <figure className={styles.plate} data-reveal="work">
                <GatsbyImage image={image} alt={name} loading="eager" />
              </figure>
            ) : null}

            <div className={styles.contact} data-reveal="label">
              <h2 className={styles.sheetHeader}>{t('contact', locale)}</h2>
              <dl className={styles.rows}>
                {node.address ? (
                  <div className={styles.row}>
                    <dt className={styles.key}>{t('address', locale)}</dt>
                    <dd className={styles.value}>{node.address}</dd>
                  </div>
                ) : null}
                {node.neighborhood ? (
                  <div className={styles.row}>
                    <dt className={styles.key}>{t('neighborhood', locale)}</dt>
                    <dd className={styles.value}>{node.neighborhood}</dd>
                  </div>
                ) : null}
                {node.phone ? (
                  <div className={styles.row}>
                    <dt className={styles.key}>{t('phone', locale)}</dt>
                    <dd className={styles.value}>
                      <a href={`tel:${node.phone.replace(/[^\d+]/g, '')}`} className={styles.contactLink}>
                        {node.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {node.whatsapp ? (
                  <div className={styles.row}>
                    <dt className={styles.key}>WhatsApp</dt>
                    <dd className={styles.value}>
                      <a
                        href={waLink(node.whatsapp)}
                        className={styles.contactLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {node.whatsapp}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              {node.mapsUrl ? (
                <a
                  href={node.mapsUrl}
                  className={styles.mapsLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t('gettingThere', locale)} ↗
                </a>
              ) : null}
            </div>
          </div>

          <div className={styles.column} data-reveal="label">
            <h2 className={styles.sheetHeader}>{t('hours', locale)}</h2>
            {hasAnyHours(node.hours) ? (
              <dl className={styles.hours}>
                {DAY_ORDER.map((day) => {
                  const range = dayRange(node.hours, day);
                  return (
                    <div key={day} className={styles.hoursRow}>
                      <dt className={styles.hoursDay}>{t(DAY_STRING[day], locale)}</dt>
                      <dd className={styles.hoursRange}>
                        {range ? `${range.open ?? ''}–${range.close ?? ''}` : t('closed', locale)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            ) : (
              <p className={styles.hoursUnavailable}>
                {node.mapsUrl ? (
                  <a href={node.mapsUrl} rel="noopener noreferrer" target="_blank">
                    {t('hoursUnavailable', locale)}
                  </a>
                ) : (
                  t('hoursUnavailable', locale)
                )}
              </p>
            )}

            {amenities.length > 0 ? (
              <>
                <h2 className={styles.sheetHeader}>{t('amenities', locale)}</h2>
                <ul className={styles.chips}>
                  {amenities.map((label) => (
                    <li key={label} className={styles.chip}>
                      {label}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

          </div>
        </div>
      </section>

      {description ? (
        <section className={styles.story}>
          <div className={styles.storyInner}>
            <p className={styles.description}>{description}</p>
          </div>
        </section>
      ) : null}

      {galleryImages.length > 0 ? (
        <section className={styles.gallery} ref={galleryRef}>
          <div className={styles.galleryInner}>
            {galleryImages.map((item) =>
              item.image ? (
                <figure key={item.url} className={styles.galleryPlate} data-reveal="work">
                  <GatsbyImage image={item.image} alt={item.alt} />
                  {item.alt ? <figcaption className={styles.galleryCaption}>{item.alt}</figcaption> : null}
                </figure>
              ) : null
            )}
          </div>
        </section>
      ) : null}

      {guide ? (
        <section className={styles.guide}>
          <div className={styles.guideInner}>
            <h2 className={styles.guideHeader}>{t('neighborhoodGuide', locale)}</h2>
            <p className={styles.guideBody}>{guide}</p>
          </div>
        </section>
      ) : null}
    </Layout>
  );
}

export function Head({
  data,
  pageContext,
  location,
}: HeadProps<LocationData, LocationContext>): React.JSX.Element {
  const node = data.gramoLocation;
  const locale = pageContext.locale;
  const name = node ? (node.shortName ?? node.title) : 'Gramo Café';

  let jsonLd: Record<string, unknown> | undefined;
  if (node) {
    const openingHours = DAY_ORDER.map((day) => {
      const range = node.hours?.[day];
      return range?.open && range.close
        ? {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: DAY_SCHEMA[day],
            opens: range.open,
            closes: range.close,
          }
        : null;
    }).filter(Boolean);

    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CafeOrCoffeeShop',
      name: `Gramo Café — ${name}`,
      servesCuisine: 'Coffee',
      ...(node.address
        ? {
            address: {
              '@type': 'PostalAddress',
              streetAddress: node.address,
              ...(node.city ? { addressLocality: node.city } : {}),
              ...(node.postalCode ? { postalCode: node.postalCode } : {}),
              addressCountry: 'MX',
            },
          }
        : {}),
      ...(node.latitude && node.longitude
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: node.latitude,
              longitude: node.longitude,
            },
          }
        : {}),
      ...(node.phone ? { telephone: node.phone } : {}),
      ...(node.mapsUrl ? { hasMap: node.mapsUrl } : {}),
      ...(openingHours.length > 0 ? { openingHoursSpecification: openingHours } : {}),
    };
  }

  return (
    <SEO
      title={name}
      description={node?.gramoSeo?.description ?? (node ? localized(node.description, locale) || null : null)}
      locale={locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
      imageUrl={node?.imageUrl}
      jsonLd={jsonLd}
    />
  );
}

export const query = graphql`
  query LocationById($databaseId: Int!) {
    gramoLocation(databaseId: { eq: $databaseId }) {
      databaseId
      slug
      title
      shortName
      address
      neighborhood
      city
      postalCode
      phone
      whatsapp
      hours {
        mon {
          open
          close
        }
        tue {
          open
          close
        }
        wed {
          open
          close
        }
        thu {
          open
          close
        }
        fri {
          open
          close
        }
        sat {
          open
          close
        }
        sun {
          open
          close
        }
      }
      amenities {
        labelEs
        labelEn
      }
      mapsUrl
      gramoSeo {
        description
        short
      }
      latitude
      longitude
      galleryUrls
      description {
        es
        en
      }
      neighborhoodGuide {
        es
        en
      }
      imageUrl
      localImage {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 1000, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
`;
