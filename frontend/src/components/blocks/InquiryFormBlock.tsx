/**
 * gramo/inquiry-form — the underlined-field form of the world: small-caps
 * labels, copper focus underlines, errors in copper (never red). Submits
 * through useInquiry against `POST gramo/v1/inquiry` with the honeypot and
 * render-timestamp guards; success replaces the form with the caps message.
 */

import * as React from 'react';

import { useInquiry } from '@/hooks/useInquiry';
import { t } from '@/i18n/strings';
import type { InquiryFormAttrs } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './InquiryFormBlock.module.scss';

const COMPANY_TYPES = ['wholesale', 'catering', 'events'];

type FieldKey = 'name' | 'email' | 'phone' | 'company' | 'message';

export function InquiryFormBlock({
  attributes,
  locale,
}: BlockComponentProps<InquiryFormAttrs>): React.JSX.Element {
  const formType = attributes.formType ?? 'general';
  const { status, submit } = useInquiry(formType, locale);
  const [fields, setFields] = React.useState<Record<FieldKey, string>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [honeypot, setHoneypot] = React.useState('');
  const [errors, setErrors] = React.useState<Partial<Record<FieldKey, string>>>({});

  const showCompany = COMPANY_TYPES.includes(formType);

  const setField = (key: FieldKey) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const required: FieldKey[] = ['name', 'email', 'message'];
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    for (const key of required) {
      if (!fields[key].trim()) nextErrors[key] = t('formRequired', locale);
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    void submit({
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      company: fields.company.trim(),
      message: fields.message.trim(),
      honeypot,
    });
  };

  return (
    <section className={styles.inquiry}>
      <div className={styles.inner}>
        {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}
        {attributes.intro ? <p className={styles.intro}>{attributes.intro}</p> : null}

        {status === 'success' ? (
          <p className={styles.success} role="status">
            {t('formSuccess', locale)}
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`inq-name-${formType}`}>
                {t('formName', locale)}
              </label>
              <input
                id={`inq-name-${formType}`}
                className={styles.input}
                type="text"
                name="name"
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
                <label className={styles.label} htmlFor={`inq-email-${formType}`}>
                  {t('formEmail', locale)}
                </label>
                <input
                  id={`inq-email-${formType}`}
                  className={styles.input}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={setField('email')}
                  aria-invalid={Boolean(errors.email)}
                  required
                />
                {errors.email ? <p className={styles.error}>{errors.email}</p> : null}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={`inq-phone-${formType}`}>
                  {t('formPhone', locale)}
                </label>
                <input
                  id={`inq-phone-${formType}`}
                  className={styles.input}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={setField('phone')}
                />
              </div>
            </div>

            {showCompany ? (
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`inq-company-${formType}`}>
                  {t('formCompany', locale)}
                </label>
                <input
                  id={`inq-company-${formType}`}
                  className={styles.input}
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={fields.company}
                  onChange={setField('company')}
                />
              </div>
            ) : null}

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`inq-message-${formType}`}>
                {t('formMessage', locale)}
              </label>
              <textarea
                id={`inq-message-${formType}`}
                className={`${styles.input} ${styles.textarea}`}
                name="message"
                rows={6}
                value={fields.message}
                onChange={setField('message')}
                aria-invalid={Boolean(errors.message)}
                required
              />
              {errors.message ? <p className={styles.error}>{errors.message}</p> : null}
            </div>

            {/* Honeypot — humans never see or reach this field. */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor={`inq-hp-${formType}`}>Website</label>
              <input
                id={`inq-hp-${formType}`}
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
              {status === 'sending' ? t('formSending', locale) : t('formSend', locale)}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
