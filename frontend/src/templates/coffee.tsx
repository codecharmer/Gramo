/**
 * Coffee detail — one gallery room: the bag lit large in a pool of light on
 * the left, its museum wall label on the right (origin, process, altitude,
 * price), tasting notes as caps chips on 2px artwork-key underlines, and the
 * brew methods. The description inverts to a daylight reading room; three
 * other works close the page. JSON-LD Product for search.
 */

import * as React from 'react';
import { graphql, type HeadProps, type PageProps } from 'gatsby';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { CoreHtml } from '@/components/blocks/CoreHtml';
import { CoffeeCard, type CoffeeCardData } from '@/components/CoffeeCard';
import { useCart } from '@/state/cart';
import { t, type StringKey } from '@/i18n/strings';
import type { Locale } from '@/i18n/routes';
import { enumLabel, formatMxn } from '@/lib/format';
import { pigmentAt } from '@/lib/pigments';
import { useReveal } from '@/lib/reveal';
import type { LocalizedText } from '@/types/content';

import * as styles from './coffee.module.scss';

interface CoffeeDetailNode {
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
  tastingNotes: Array<{ noteEs: string | null; noteEn: string | null } | null> | null;
  brewMethods: Array<{ methodEs: string | null; methodEn: string | null } | null> | null;
  harvest: string | null;
  availability: string | null;
  subscriptionInterval: string | null;
  gramoSeo: { description: string | null; short: string | null } | null;
  price: number | null;
  purchasable: boolean | null;
  imageUrl: string | null;
  imageAlt: string | null;
  localImage: {
    childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
  } | null;
}

interface CoffeeData {
  gramoCoffee: CoffeeDetailNode | null;
  related: { nodes: CoffeeCardData[] };
}

interface CoffeeContext {
  databaseId: number;
  locale: Locale;
  translationPath: string | null;
}

function AddToCart({ coffee, locale }: { coffee: CoffeeDetailNode; locale: Locale }): React.JSX.Element {
  const { add } = useCart();
  const [added, setAdded] = React.useState(false);
  const purchasable = coffee.purchasable === true && coffee.price != null;

  const handleAdd = (): void => {
    if (!purchasable || coffee.price == null) return;
    add({
      productId: coffee.databaseId,
      slug: coffee.slug,
      title: (locale === 'en' ? coffee.nameEn : null) ?? coffee.title,
      price: coffee.price,
      imageUrl: coffee.imageUrl,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button type="button" className={styles.addButton} onClick={handleAdd} disabled={!purchasable}>
      {!purchasable
        ? t('outOfStock', locale)
        : added
          ? t('addedToCart', locale)
          : t('addToCart', locale)}
    </button>
  );
}

export default function CoffeeTemplate({
  data,
  pageContext,
}: PageProps<CoffeeData, CoffeeContext>): React.JSX.Element {
  const coffee = data.gramoCoffee;
  const locale = pageContext.locale;
  const roomRef = useReveal<HTMLElement>();
  const relatedRef = useReveal<HTMLElement>();

  if (!coffee) {
    return (
      <Layout locale={locale} translationPath={pageContext.translationPath}>
        <div />
      </Layout>
    );
  }

  const name = (locale === 'en' ? coffee.nameEn : null) ?? coffee.title;
  const image = coffee.localImage?.childImageSharp?.gatsbyImageData ?? null;
  const notes = (coffee.tastingNotes ?? [])
    .map((note) => (locale === 'en' ? (note?.noteEn ?? note?.noteEs) : note?.noteEs))
    .filter((note): note is string => Boolean(note));
  const methods = (coffee.brewMethods ?? [])
    .map((method) => (locale === 'en' ? (method?.methodEn ?? method?.methodEs) : method?.methodEs))
    .filter((method): method is string => Boolean(method));

  const process = (locale === 'en' ? coffee.process?.en : null) ?? coffee.process?.es ?? null;
  const sheet: Array<[StringKey, string | null]> = [
    ['origin', coffee.origin],
    ['producer', coffee.producer],
    ['altitude', coffee.altitude],
    ['variety', coffee.variety],
    ['process', process],
    ['roast', enumLabel(coffee.roastLevel, locale)],
    ['harvest', coffee.harvest],
    ['availability', enumLabel(coffee.availability, locale)],
  ];

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <article className={styles.room} ref={roomRef}>
        <div className={styles.roomInner}>
          <figure className={styles.work}>
            <span className={styles.pool} data-reveal="pool" aria-hidden="true" />
            {image ? (
              <div className={styles.workImage} data-reveal="work">
                <GatsbyImage image={image} alt={coffee.imageAlt ?? name} loading="eager" />
              </div>
            ) : (
              <div className={styles.workPlaceholder} data-reveal="work" aria-hidden="true" />
            )}
          </figure>

          <div className={styles.data} data-reveal="label">
            {coffee.origin ? <p className={styles.eyebrow}>{coffee.origin}</p> : null}
            <h1 className={styles.title}>{name}</h1>

            <div className={styles.buyRow}>
              {coffee.price != null ? (
                <p className={styles.price}>{formatMxn(coffee.price)}</p>
              ) : null}
              <AddToCart coffee={coffee} locale={locale} />
            </div>

            <dl className={styles.sheet}>
              {sheet.map(([key, value]) =>
                value ? (
                  <div key={key} className={styles.sheetRow}>
                    <dt className={styles.sheetLabel}>{t(key, locale)}</dt>
                    <dd className={styles.sheetValue}>{value}</dd>
                  </div>
                ) : null
              )}
            </dl>

            {notes.length > 0 ? (
              <div className={styles.notes}>
                <h2 className={styles.subheading}>{t('tastingNotes', locale)}</h2>
                <ul className={styles.chips}>
                  {notes.map((note, index) => (
                    <li key={note} className={`${styles.chip} ${styles[pigmentAt(index)] ?? ''}`}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {methods.length > 0 ? (
              <div className={styles.methods}>
                <h2 className={styles.subheading}>{t('brewMethods', locale)}</h2>
                <p className={styles.methodList}>{methods.join(' · ')}</p>
              </div>
            ) : null}
          </div>
        </div>
      </article>

      {locale === 'en' && coffee.descriptionEn ? (
        <section className={styles.description}>
          <div className={styles.descriptionInner}>
            <p>{coffee.descriptionEn}</p>
          </div>
        </section>
      ) : coffee.content ? (
        <section className={styles.descriptionProse}>
          <CoreHtml html={coffee.content} />
        </section>
      ) : null}

      {data.related.nodes.length > 0 ? (
        <section className={styles.related} ref={relatedRef}>
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedHeading}>{t('relatedCoffees', locale)}</h2>
            <div className={styles.relatedGrid}>
              {data.related.nodes.map((node, index) => (
                <CoffeeCard key={node.databaseId} coffee={node} locale={locale} index={index} />
              ))}
            </div>
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
}: HeadProps<CoffeeData, CoffeeContext>): React.JSX.Element {
  const coffee = data.gramoCoffee;
  const locale = pageContext.locale;
  const name = coffee ? ((locale === 'en' ? coffee.nameEn : null) ?? coffee.title) : 'Gramo Café';

  const jsonLd = coffee
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        ...(coffee.imageUrl ? { image: coffee.imageUrl } : {}),
        ...(coffee.origin ? { countryOfOrigin: coffee.origin } : {}),
        brand: { '@type': 'Brand', name: 'Gramo Café' },
        ...(coffee.price != null
          ? {
              offers: {
                '@type': 'Offer',
                price: coffee.price,
                priceCurrency: 'MXN',
                availability:
                  coffee.purchasable === true
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
              },
            }
          : {}),
      }
    : undefined;

  return (
    <SEO
      title={name}
      description={coffee?.gramoSeo?.description ?? (locale === 'en' ? coffee?.descriptionEn : null)}
      locale={locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
      imageUrl={coffee?.imageUrl}
      jsonLd={jsonLd}
    />
  );
}

export const query = graphql`
  query CoffeeById($databaseId: Int!) {
    gramoCoffee(databaseId: { eq: $databaseId }) {
      databaseId
      slug
      title
      nameEn
      descriptionEn
      content
      origin
      producer
      altitude
      variety
      process {
        es
        en
      }
      roastLevel
      tastingNotes {
        noteEs
        noteEn
      }
      brewMethods {
        methodEs
        methodEn
      }
      harvest
      availability
      subscriptionInterval
      gramoSeo {
        description
        short
      }
      price
      purchasable
      imageUrl
      imageAlt
      localImage {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 1000, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
    related: allGramoCoffee(
      filter: { databaseId: { ne: $databaseId } }
      sort: { title: ASC }
      limit: 3
    ) {
      nodes {
        databaseId
        slug
        title
        nameEn
        origin
        altitude
        price
        stockStatus
        purchasable
        subscriptionInterval
        categories
        tastingNotes {
          noteEs
          noteEn
        }
        imageAlt
        localImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 640, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
