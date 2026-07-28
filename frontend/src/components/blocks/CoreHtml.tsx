/**
 * Renders a core-block HTML leaf from blocksJson: parses the rendered
 * WordPress markup into React, keeps the semantic elements, and swaps any
 * wp-image-N <img> for GatsbyImage when the build resolved it.
 */

import * as React from 'react';
import parse, { domToReact, Element, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import { GatsbyImage } from 'gatsby-plugin-image';

import { useBlockMedia } from '@/hooks/useBlockMedia';

import * as styles from './CoreHtml.module.scss';

interface CoreHtmlProps {
  html: string;
}

export function CoreHtml({ html }: CoreHtmlProps): React.JSX.Element | null {
  const media = useBlockMedia();

  if (!html.trim()) return null;

  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (!(node instanceof Element)) return undefined;

      if (node.name === 'img') {
        const src = node.attribs.src ?? '';
        const classMatch = /wp-image-(\d+)/.exec(node.attribs.class ?? '');
        const imageData =
          (classMatch ? media.byAttachmentId(Number(classMatch[1])) : null) ?? media.byUrl(src);
        if (imageData) {
          return (
            <GatsbyImage
              image={imageData}
              alt={node.attribs.alt ?? media.altFor(src)}
              className={styles.image}
            />
          );
        }
        return undefined;
      }

      // External links open safely.
      if (node.name === 'a' && /^https?:\/\//.test(node.attribs.href ?? '') && !(node.attribs.href ?? '').includes('gramo.cafe')) {
        return (
          <a href={node.attribs.href} rel="noopener noreferrer" target="_blank">
            {domToReact(node.children as DOMNode[], options)}
          </a>
        );
      }

      return undefined;
    },
  };

  return <div className={styles.prose}>{parse(html, options)}</div>;
}
