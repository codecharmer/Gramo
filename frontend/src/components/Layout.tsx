/**
 * Site shell — announcement hairline, a quiet wall strip of a header, and
 * the wall-deep footer. The wordmark is always the real 2024 asset, never
 * re-typed: bone glyphs, because the shell is wall-black on every page.
 * Locale comes from pageContext so nav labels and the ES · EN switch
 * resolve per language.
 */

import * as React from 'react';
import { Link } from 'gatsby';

import { useSettings } from '@/hooks/useSettings';
import { useCart } from '@/state/cart';
import { homeFor, STATIC_ROUTES, type Locale } from '@/i18n/routes';
import { t } from '@/i18n/strings';
import logoBone from '@/images/logo-bone.png';

import * as styles from './Layout.module.scss';

interface LayoutProps {
  locale: Locale;
  translationPath?: string | null;
  children: React.ReactNode;
}

function localized(text: { es: string | null; en: string | null } | null | undefined, locale: Locale): string {
  if (!text) return '';
  return (locale === 'es' ? text.es : text.en) ?? text.es ?? '';
}

/** Localize a nav path written in ES form when rendering the EN chrome. */
function localizePath(path: string, locale: Locale): string {
  if (locale === 'es') return path;
  const map: Record<string, string> = {
    '/': '/en/',
    '/cafe/': '/en/coffee/',
    '/menu/': '/en/our-menu/',
    '/ubicaciones/': '/en/locations/',
    '/nosotros/': '/en/about/',
    '/journal/': '/en/journal/',
    '/suscripciones/': '/en/subscriptions/',
    '/mayoreo/': '/en/wholesale/',
    '/empleo/': '/en/careers/',
    '/contacto/': '/en/contact/',
    '/proceso/': '/en/process/',
    '/privacidad/': '/en/privacy/',
  };
  return map[path] ?? `/en${path}`;
}

export function Layout({ locale, translationPath, children }: LayoutProps): React.JSX.Element {
  const settings = useSettings();
  const { count, hydrated } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const announcement = settings.announcement;
  const switchTarget = translationPath ?? homeFor(locale === 'es' ? 'en' : 'es');

  return (
    <div className={styles.shell}>
      <a href="#contenido" className="skip-link">
        {t('skipToContent', locale)}
      </a>

      {announcement.enabled && localized(announcement.text, locale) !== '' ? (
        <div className={styles.announcement} role="region" aria-label="Aviso">
          {announcement.url ? (
            <a href={announcement.url}>{localized(announcement.text, locale)}</a>
          ) : (
            <span>{localized(announcement.text, locale)}</span>
          )}
        </div>
      ) : null}

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to={homeFor(locale)} className={styles.wordmark}>
            <img src={logoBone} alt="Gramo" width={130} height={26} />
          </Link>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="nav-principal"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? t('menuClose', locale) : t('menuOpen', locale)}
          </button>

          <nav
            id="nav-principal"
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
            aria-label={locale === 'es' ? 'Navegación principal' : 'Main navigation'}
          >
            {settings.nav.map((item) => (
              <Link
                key={item.path}
                to={localizePath(item.path, locale)}
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                onClick={() => setMenuOpen(false)}
              >
                {localized(item.label, locale)}
              </Link>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <p className={styles.localeSwitch}>
              {locale === 'es' ? (
                <>
                  <span className={styles.localeCurrent} aria-current="true">
                    ES
                  </span>
                  <span className={styles.localeSep} aria-hidden="true">
                    ·
                  </span>
                  <Link to={switchTarget} className={styles.localeOther} aria-label={t('switchLocale', locale)}>
                    EN
                  </Link>
                </>
              ) : (
                <>
                  <Link to={switchTarget} className={styles.localeOther} aria-label={t('switchLocale', locale)}>
                    ES
                  </Link>
                  <span className={styles.localeSep} aria-hidden="true">
                    ·
                  </span>
                  <span className={styles.localeCurrent} aria-current="true">
                    EN
                  </span>
                </>
              )}
            </p>

            <Link to={STATIC_ROUTES.cart[locale]} className={styles.cartLink}>
              <span>{t('cart', locale)}</span>
              <span className={styles.cartCount} aria-hidden={!hydrated || count === 0}>
                {hydrated && count > 0 ? count : ''}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main id="contenido">{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <img
              className={styles.footerWordmark}
              src={logoBone}
              alt=""
              aria-hidden="true"
              width={260}
              height={52}
            />
            {settings.business.tagline ? (
              <p className={styles.footerTagline}>{settings.business.tagline}</p>
            ) : null}
          </div>

          <nav className={styles.footerNav} aria-label={locale === 'es' ? 'Enlaces del pie' : 'Footer links'}>
            <p className={styles.footerColHeading}>{locale === 'es' ? 'Navegar' : 'Browse'}</p>
            {settings.footer.map((item) => (
              <Link key={item.path} to={localizePath(item.path, locale)} className={styles.footerLink}>
                {localized(item.label, locale)}
              </Link>
            ))}
          </nav>

          <div className={styles.footerSocial}>
            <p className={styles.footerColHeading}>{locale === 'es' ? 'Seguir' : 'Follow'}</p>
            {settings.social.instagram ? (
              <a href={settings.social.instagram} rel="noopener noreferrer" target="_blank">
                Instagram
              </a>
            ) : null}
            {settings.social.spotify ? (
              <a href={settings.social.spotify} rel="noopener noreferrer" target="_blank">
                Spotify
              </a>
            ) : null}
            {settings.social.whatsappCommunity ? (
              <a href={settings.social.whatsappCommunity} rel="noopener noreferrer" target="_blank">
                WhatsApp
              </a>
            ) : null}
          </div>
        </div>

        <div className={styles.footerNote}>
          <span>{localized(settings.footerNote, locale)}</span>
          <span>© {new Date().getFullYear()} Gramo Café · Cuernavaca · CDMX</span>
        </div>
      </footer>
    </div>
  );
}
