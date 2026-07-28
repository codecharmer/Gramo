/**
 * Checkout — pay-on-delivery order form: contact fields, pickup/delivery
 * fulfillment (delivery reveals a required address and the fee note), order
 * notes, and the COD note in a bronze-outlined plate. Submits the cart to
 * `POST gramo/v1/order` with the Guard fields; success clears the cart and
 * navigates to the confirmation with the order number (location state +
 * sessionStorage fallback).
 */

import * as React from 'react';
import { Link, navigate, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { useCart } from '@/state/cart';
import { STATIC_ROUTES } from '@/i18n/routes';
import { t } from '@/i18n/strings';
import { postJson } from '@/lib/api';
import { formatMxn } from '@/lib/format';
import type { CommerceContext } from './cart';

import * as styles from './checkout.module.scss';

export const ORDER_NUMBER_STORAGE_KEY = 'gramo-order-number';

type FieldKey = 'name' | 'phone' | 'email' | 'address';

interface OrderResponse {
  ok: boolean;
  orderNumber: string;
}

export default function CheckoutTemplate({
  pageContext,
}: PageProps<Record<string, never>, CommerceContext>): React.JSX.Element {
  const locale = pageContext.locale;
  const { lines, hydrated, subtotal, clear } = useCart();

  const [fields, setFields] = React.useState<Record<FieldKey, string>>({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [fulfillment, setFulfillment] = React.useState<'pickup' | 'delivery'>('pickup');
  const [notes, setNotes] = React.useState('');
  const [honeypot, setHoneypot] = React.useState('');
  const [errors, setErrors] = React.useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'error'>('idle');
  const mountedAt = React.useRef(Math.floor(Date.now() / 1000));

  const setField = (key: FieldKey) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    if (!fields.name.trim()) nextErrors.name = t('formRequired', locale);
    if (!fields.phone.trim()) nextErrors.phone = t('formRequired', locale);
    if (fulfillment === 'delivery' && !fields.address.trim()) {
      nextErrors.address = t('formRequired', locale);
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || lines.length === 0) return;

    setStatus('sending');
    void (async () => {
      try {
        const response = await postJson<OrderResponse>('/order', {
          items: lines.map((line) => ({ productId: line.productId, qty: line.qty })),
          customer: {
            name: fields.name.trim(),
            phone: fields.phone.trim(),
            email: fields.email.trim(),
          },
          fulfillment: {
            type: fulfillment,
            ...(fulfillment === 'delivery' ? { address: fields.address.trim() } : {}),
            ...(notes.trim() ? { notes: notes.trim() } : {}),
          },
          locale,
          _gramo_t: mountedAt.current,
          _gramo_hp: honeypot,
        });

        const orderNumber = String(response.orderNumber ?? '');
        try {
          window.sessionStorage.setItem(ORDER_NUMBER_STORAGE_KEY, orderNumber);
        } catch {
          // Storage may be unavailable; location state still carries the number.
        }
        clear();
        void navigate(STATIC_ROUTES.orderConfirmed[locale], { state: { orderNumber } });
      } catch {
        setStatus('error');
      }
    })();
  };

  return (
    <Layout locale={locale} translationPath={pageContext.translationPath}>
      <section className={styles.checkout}>
        <div className={styles.inner}>
          <h1 className={styles.title}>{t('checkoutTitle', locale)}</h1>

          <p className={styles.codNote}>{t('codNote', locale)}</p>

          {!hydrated ? null : lines.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>{t('cartEmpty', locale)}</p>
              <Link to={STATIC_ROUTES.coffee[locale]} className={styles.continueLink}>
                {t('continueShopping', locale)}
              </Link>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{t('subtotal', locale)}</span>
                  <span className={styles.summaryValue}>{formatMxn(subtotal)}</span>
                </div>
              </div>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{t('checkoutContact', locale)}</legend>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="co-name">
                    {t('formName', locale)}
                  </label>
                  <input
                    id="co-name"
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={setField('name')}
                    aria-invalid={Boolean(errors.name)}
                    required
                  />
                  {errors.name ? <p className={styles.error}>{errors.name}</p> : null}
                </div>

                <div className={styles.twoUp}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="co-phone">
                      {t('formPhone', locale)}
                    </label>
                    <input
                      id="co-phone"
                      className={styles.input}
                      type="tel"
                      autoComplete="tel"
                      value={fields.phone}
                      onChange={setField('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      required
                    />
                    {errors.phone ? <p className={styles.error}>{errors.phone}</p> : null}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="co-email">
                      {t('formEmail', locale)}
                    </label>
                    <input
                      id="co-email"
                      className={styles.input}
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={setField('email')}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{t('checkoutFulfillment', locale)}</legend>

                <div className={styles.radios}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="fulfillment"
                      value="pickup"
                      checked={fulfillment === 'pickup'}
                      onChange={() => setFulfillment('pickup')}
                    />
                    <span>{t('fulfillmentPickup', locale)}</span>
                  </label>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="fulfillment"
                      value="delivery"
                      checked={fulfillment === 'delivery'}
                      onChange={() => setFulfillment('delivery')}
                    />
                    <span>{t('fulfillmentDelivery', locale)}</span>
                  </label>
                </div>

                {fulfillment === 'delivery' ? (
                  <>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="co-address">
                        {t('deliveryAddress', locale)}
                      </label>
                      <textarea
                        id="co-address"
                        className={`${styles.input} ${styles.textarea}`}
                        rows={3}
                        autoComplete="street-address"
                        value={fields.address}
                        onChange={setField('address')}
                        aria-invalid={Boolean(errors.address)}
                        required
                      />
                      {errors.address ? <p className={styles.error}>{errors.address}</p> : null}
                    </div>
                    <p className={styles.deliveryNote}>{t('deliveryFeeNote', locale)}</p>
                  </>
                ) : null}

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="co-notes">
                    {t('orderNotes', locale)}
                  </label>
                  <textarea
                    id="co-notes"
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </div>
              </fieldset>

              {/* Honeypot — humans never see or reach this field. */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="co-hp">Website</label>
                <input
                  id="co-hp"
                  type="text"
                  name="_gramo_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              {status === 'error' ? (
                <p className={styles.error} role="alert">
                  {t('formError', locale)}
                </p>
              ) : null}

              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? t('formSending', locale) : t('placeOrder', locale)}
              </button>
            </form>
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
      title={t('checkoutTitle', pageContext.locale)}
      locale={pageContext.locale}
      pathname={location.pathname}
      translationPath={pageContext.translationPath}
      noindex
    />
  );
}
