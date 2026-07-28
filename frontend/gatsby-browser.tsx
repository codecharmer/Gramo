/**
 * Browser runtime: fonts + global styles. Fonts are self-hosted woff2 via
 * Fontsource; only the weights the design system uses are loaded.
 */

import '@fontsource/figtree/700.css';
import '@fontsource/figtree/800.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';
import '@fontsource/archivo/600.css';
import './src/styles/global.scss';

import * as React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import { CartProvider } from './src/state/cart';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <CartProvider>{element}</CartProvider>
);
