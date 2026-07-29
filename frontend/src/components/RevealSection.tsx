/**
 * A room that lights once on first scroll into view. Wraps the shared
 * IntersectionObserver gate so list templates — which render a variable
 * number of rooms — can use it without calling hooks in a loop.
 */

import * as React from 'react';

import { useReveal } from '@/lib/reveal';

interface RevealSectionProps {
  className?: string;
  children: React.ReactNode;
}

export function RevealSection({ className, children }: RevealSectionProps): React.JSX.Element {
  const ref = useReveal<HTMLElement>();
  return (
    <section className={className} ref={ref}>
      {children}
    </section>
  );
}
