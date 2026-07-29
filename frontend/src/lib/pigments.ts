/**
 * The four artwork keys, rotated wherever a list of works needs a category
 * dot or a 2px underline (coffee labels, journal labels, stats, tasting
 * notes). Per DESIGN.md these are the only saturated colours outside the
 * artwork photography, and they never appear as fills or bands.
 */

export const PIGMENTS = ['violet', 'marigold', 'teal', 'signal'] as const;

export type Pigment = (typeof PIGMENTS)[number];

export function pigmentAt(index: number): Pigment {
  return PIGMENTS[((index % PIGMENTS.length) + PIGMENTS.length) % PIGMENTS.length] ?? 'violet';
}
