/**
 * gramo/stats — the data-portrait moment: big serif numerals over tracked
 * caps labels, each stat on its own rotating pigment underline. Numeric
 * values count up once on first view (IntersectionObserver +
 * requestAnimationFrame, no library); under prefers-reduced-motion the
 * final values render statically. SSR always carries the final values.
 */

import * as React from 'react';

import { pigmentAt } from '@/lib/pigments';
import type { StatsAttrs, StatsItem } from './types';
import type { BlockComponentProps } from './BlockRenderer';

import * as styles from './StatsBlock.module.scss';

const COUNT_DURATION_MS = 900;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function StatValue({ value, start }: { value: string; start: boolean }): React.JSX.Element {
  const numeric = /^\d+(\.\d+)?$/.test(value.trim()) ? Number(value.trim()) : null;
  const decimals = numeric != null && value.includes('.') ? (value.split('.')[1]?.length ?? 0) : 0;
  const [display, setDisplay] = React.useState<number | null>(numeric);

  React.useEffect(() => {
    if (numeric == null || !start || prefersReducedMotion()) return undefined;

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number): void => {
      const progress = Math.min(1, (now - t0) / COUNT_DURATION_MS);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(numeric * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    setDisplay(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [numeric, start]);

  if (numeric == null) return <>{value}</>;
  return <>{(display ?? numeric).toFixed(decimals)}</>;
}

export function StatsBlock({ attributes }: BlockComponentProps<StatsAttrs>): React.JSX.Element | null {
  const items = (attributes.items ?? []).filter((item): item is StatsItem => Boolean(item?.value));
  const ref = React.useRef<HTMLElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.inner}>
        {attributes.heading ? <h2 className={styles.heading}>{attributes.heading}</h2> : null}

        <dl className={styles.row}>
          {items.map((item, index) => (
            <div key={`${item.label}-${index}`} className={styles.item}>
              <dd className={`${styles.value} ${styles[pigmentAt(index)] ?? ''}`}>
                <StatValue value={item.value} start={inView} />
                {item.suffix ? <span className={styles.suffix}>{item.suffix}</span> : null}
              </dd>
              <dt className={styles.label}>{item.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
