import type { GatsbyConfig } from 'gatsby';

/**
 * Build-time WPGraphQL endpoint. In CI this points at cms.gramo.cafe; locally
 * it defaults to the wp-env instance.
 */
export const WP_GRAPHQL_URL =
  process.env.WP_GRAPHQL_URL ?? 'http://localhost:8888/index.php?graphql';

const SITE_URL = process.env.SITE_URL ?? 'https://gramo.cafe';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Gramo Café',
    description:
      'Café de especialidad en Cuernavaca y Ciudad de México. Intervenimos espacios en donde hace falta buen café.',
    siteUrl: SITE_URL,
  },
  graphqlTypegen: false,
  trailingSlash: 'always',
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gramo Café',
        short_name: 'Gramo',
        start_url: '/',
        background_color: '#F2EBDD',
        theme_color: '#191410',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/en/404/', '/404/', '/pedido/**', '/en/order/**'],
      },
    },
  ],
};

export default config;
