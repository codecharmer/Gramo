/**
 * Media resolved for block content: every image referenced from blocksJson
 * was pulled through the sharp pipeline at build time as a GramoMedia node.
 * This hook exposes lookup by URL or attachment ID so block components swap
 * raw URLs for GatsbyImage data.
 */

import { graphql, useStaticQuery } from 'gatsby';
import type { IGatsbyImageData } from 'gatsby-plugin-image';

interface MediaNode {
  url: string;
  attachmentId: number | null;
  alt: string | null;
  localFile: {
    childImageSharp: { gatsbyImageData: IGatsbyImageData } | null;
  } | null;
}

export interface BlockMediaLookup {
  byUrl: (url: string | null | undefined) => IGatsbyImageData | null;
  byAttachmentId: (id: number | null | undefined) => IGatsbyImageData | null;
  altFor: (url: string | null | undefined) => string;
}

export function useBlockMedia(): BlockMediaLookup {
  const data = useStaticQuery<{ allGramoMedia: { nodes: MediaNode[] } }>(graphql`
    query AllBlockMedia {
      allGramoMedia {
        nodes {
          url
          attachmentId
          alt
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  `);

  const nodes = data.allGramoMedia.nodes;
  const urlMap = new Map<string, MediaNode>();
  const idMap = new Map<number, MediaNode>();
  for (const node of nodes) {
    urlMap.set(node.url, node);
    if (node.attachmentId) idMap.set(node.attachmentId, node);
  }

  return {
    byUrl: (url) => (url ? (urlMap.get(url)?.localFile?.childImageSharp?.gatsbyImageData ?? null) : null),
    byAttachmentId: (id) => (id ? (idMap.get(id)?.localFile?.childImageSharp?.gatsbyImageData ?? null) : null),
    altFor: (url) => (url ? (urlMap.get(url)?.alt ?? '') : ''),
  };
}
