/**
 * SSR pass: mirror the browser imports so styles land in the static HTML,
 * and stamp the html lang attribute from each page's locale context.
 */

import * as React from 'react';
import type { GatsbySSR } from 'gatsby';

import '@fontsource/figtree/700.css';
import '@fontsource/figtree/800.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';
import '@fontsource/archivo/600.css';
import './src/styles/global.scss';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes, pathname }) => {
  const isEnglish = typeof pathname === 'string' && (pathname === '/en' || pathname.startsWith('/en/'));
  setHtmlAttributes({ lang: isEnglish ? 'en' : 'es-MX' });
};

import { CartProvider } from './src/state/cart';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <CartProvider>{element}</CartProvider>
);
