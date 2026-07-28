/**
 * Cart — the order as plate rows: thumbnail, title, accessible ± quantity
 * stepper, tabular line totals and remove. Subtotal closes the sheet with
 * the delivery-fee note; checkout is the one copper action. Client-only
 * state renders after hydration so static HTML never mismatches.
 */

import * as React from 'react';
import { Link, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { useCart } from '@/state/cart';
import { pathFor, STATIC_ROUTES, type Locale } from '@/i18n/routes';
import { t } from '@/i18n/strings';
import { formatMxn } from '@/lib/format';

import * as styles from './cart.module.scss';

export interface CommerceContext {
  locale: Locale;
  translationPath: string | null;
}

export default function CartTemplate({
  pageContext,
}: PageProps<Record<string, never>, CommerceContext>): React.JSX.Element {
  const locale = pageContext.locale;
  const { lines, hydrated, setQty, remove, subtotal } = useCart();

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <section className={styles.cart}>
        <div className={styles.inner}>
          <h1 className={styles.title}>{t('cart', locale)}</h1>

          {!hydrated ? null : lines.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>{t('cartEmpty', locale)}</p>
              <Link to={STATIC_ROUTES.coffee[locale]} className={styles.continueLink}>
                {t('continueShopping', locale)}
              </Link>
            </div>
          ) : (
            <>
              <ul className={styles.lines}>
                {lines.map((line) => (
                  <li key={line.productId} className={styles.line}>
                    {line.imageUrl ? (
                      <img
                        src={line.imageUrl}
                        alt=""
                        className={styles.thumb}
                        loading="lazy"
                        width={72}
                        height={72}
                      />
                    ) : (
                      <span className={styles.thumbPlaceholder} aria-hidden="true" />
                    )}

                    <div className={styles.lineBody}>
                      <Link to={pathFor('coffee', locale, line.slug)} className={styles.lineTitle}>
                        {line.title}
                      </Link>
                      <p className={styles.linePrice}>{formatMxn(line.price)}</p>
                    </div>

                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepButton}
                        onClick={() => setQty(line.productId, line.qty - 1)}
                        aria-label={t('qtyDecrease', locale)}
                      >
                        −
                      </button>
                      <span className={styles.qty} aria-label={t('quantity', locale)}>
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        className={styles.stepButton}
                        onClick={() => setQty(line.productId, line.qty + 1)}
                        aria-label={t('qtyIncrease', locale)}
                      >
                        +
                      </button>
                    </div>

                    <p className={styles.lineTotal}>{formatMxn(line.price * line.qty)}</p>

                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => remove(line.productId)}
                    >
                      {t('remove', locale)}
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.summary}>
                <div className={styles.subtotalRow}>
                  <span className={styles.subtotalLabel}>{t('subtotal', locale)}</span>
                  <span className={styles.subtotalValue}>{formatMxn(subtotal)}</span>
                </div>
                <p className={styles.deliveryNote}>{t('deliveryFeeNote', locale)}</p>
                <Link to={STATIC_ROUTES.checkout[locale]} className={styles.checkoutButton}>
                  {t('checkoutTitle', locale)}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export function Head({
  pageContext,
  location,
}: HeadProps<Record<string, never>, CommerceContext>): React.JSX.Element {
  return (
    <SEO
      title={t('cart', pageContext.locale)}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
      noindex
    />
  );
}
