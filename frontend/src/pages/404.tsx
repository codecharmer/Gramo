/**
 * 404 — bilingual not-found on the espresso board. The locale comes from
 * the requested path (`/en/` prefix), so the message and the way home match
 * the visitor's language.
 */

import * as React from 'react';
import { Link, type HeadProps, type PageProps } from 'gatsby';

import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { homeFor, type Locale } from '@/i18n/routes';
import { t } from '@/i18n/strings';

import * as styles from './404.module.scss';

function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

export default function NotFoundPage({ location }: PageProps): React.JSX.Element {
  const locale = localeFromPath(location.pathname);

  return (
    <Layout locale={locale}>
      <section className={styles.board}>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>{t('notFoundTitle', locale)}</h1>
          <p className={styles.body}>{t('notFoundBody', locale)}</p>
          <Link to={homeFor(locale)} className={styles.homeLink}>
            {t('backHome', locale)}
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export function Head({ location }: HeadProps): React.JSX.Element {
  const locale = localeFromPath(location.pathname);
  return <SEO title={t('notFoundTitle', locale)} locale={locale} pathname={location.pathname} noindex />;
}
