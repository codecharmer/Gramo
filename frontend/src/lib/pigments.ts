/**
 * The four hand-laid chart pigments, rotated wherever a list of items needs
 * a key square or underline (cards, stats, tasting-note chips).
 */

export const PIGMENTS = ['walnut', 'olive', 'bronze', 'copper'] as const;

export type Pigment = (typeof PIGMENTS)[number];

export function pigmentAt(index: number): Pigment {
  return PIGMENTS[((index % PIGMENTS.length) + PIGMENTS.length) % PIGMENTS.length] ?? 'walnut';
}
