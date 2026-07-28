/**
 * Order confirmation — the received order's number in tabular numerals
 * under a big serif thank-you, with the COD reminder. The number arrives
 * via navigation state, falling back to sessionStorage on reload.
 */

import * as React from 'react';
import { Link, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { STATIC_ROUTES } from '@/i18n/routes';
import { t } from '@/i18n/strings';
import { ORDER_NUMBER_STORAGE_KEY } from './checkout';
import type { CommerceContext } from './cart';

import * as styles from './order-confirmed.module.scss';

interface OrderLocationState {
  orderNumber?: string;
}

export default function OrderConfirmedTemplate({
  pageContext,
  location,
}: PageProps<Record<string, never>, CommerceContext>): React.JSX.Element {
  const locale = pageContext.locale;
  const stateNumber = (location.state as OrderLocationState | null)?.orderNumber ?? null;
  const [orderNumber, setOrderNumber] = React.useState<string | null>(stateNumber);

  React.useEffect(() => {
    if (orderNumber) return;
    try {
      const stored = window.sessionStorage.getItem(ORDER_NUMBER_STORAGE_KEY);
      if (stored) setOrderNumber(stored);
    } catch {
      // Storage unavailable — the page still confirms without the number.
    }
  }, [orderNumber]);

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <section className={styles.confirmed}>
        <div className={styles.inner}>
          <h1 className={styles.title}>{t('orderConfirmed', locale)}</h1>

          {orderNumber ? (
            <p className={styles.orderNumber}>
              <span className={styles.orderLabel}>{t('orderNumber', locale)}</span>
              <span className={styles.orderValue}>#{orderNumber}</span>
            </p>
          ) : null}

          <p className={styles.codNote}>{t('codNote', locale)}</p>

          <Link to={STATIC_ROUTES.coffee[locale]} className={styles.continueLink}>
            {t('continueShopping', locale)}
          </Link>
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
      title={t('orderConfirmed', pageContext.locale)}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
      noindex
    />
  );
}
