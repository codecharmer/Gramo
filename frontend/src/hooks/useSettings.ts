/**
 * Site settings from the sourced GramoSettings singleton.
 */

import { graphql, useStaticQuery } from 'gatsby';

import type { GramoSettingsNode } from '@/types/content';

interface QueryResult {
  gramoSettings: GramoSettingsNode | null;
}

const EMPTY: GramoSettingsNode = {
  nav: [],
  footer: [],
  footerNote: { es: '', en: '' },
  announcement: { enabled: false, text: { es: '', en: '' }, url: null },
  social: {
    instagram: null,
    facebook: null,
    spotify: null,
    linktree: null,
    whatsappCommunity: null,
  },
  business: {
    name: 'Gramo Café',
    tagline: null,
    phone: null,
    phoneLink: null,
    whatsapp: null,
    email: null,
    instagramHandle: null,
  },
};

export function useSettings(): GramoSettingsNode {
  const data = useStaticQuery<QueryResult>(graphql`
    query SiteSettings {
      gramoSettings {
        nav {
          label {
            es
            en
          }
          path
        }
        footer {
          label {
            es
            en
          }
          path
        }
        footerNote {
          es
          en
        }
        announcement {
          enabled
          text {
            es
            en
          }
          url
        }
        social {
          instagram
          facebook
          spotify
          linktree
          whatsappCommunity
        }
        business {
          name
          tagline
          phone
          phoneLink
          whatsapp
          email
          instagramHandle
        }
      }
    }
  `);

  return data.gramoSettings ?? EMPTY;
}
