/**
 * The gallery's one motion signature: on first scroll into a room the light
 * pool fades up and the work settles from 1.03 → 1 with its label rising
 * 8px. Once, then never again.
 *
 * The gate is built so the lit state is the default everywhere it matters:
 * the hidden state is only ever reachable through `data-lit="false"`, an
 * attribute that JavaScript writes on mount. Static HTML therefore ships
 * fully lit, and under `prefers-reduced-motion: reduce` the hook writes
 * `true` immediately without ever passing through the hidden state.
 *
 * Rooms carry the ref; the parts inside carry `data-reveal="pool|work|label"`
 * (see the `[data-lit]` rules in styles/global.scss).
 */

import * as React from 'react';

/** Attach to a room element; its `[data-reveal]` children light once. */
export function useReveal<T extends HTMLElement>(): React.RefObject<T> {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      element.dataset.lit = 'true';
      return undefined;
    }

    // A room already on screen when the page loads is lit immediately and
    // never enters the hidden state: animating the first viewport in would
    // hide the content the visitor came for and delay the largest paint.
    const box = element.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      element.dataset.lit = 'true';
      return undefined;
    }

    element.dataset.lit = 'false';

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        frame = window.requestAnimationFrame(() => {
          element.dataset.lit = 'true';
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
