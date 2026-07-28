# DESIGN.md — Gramo Café visual world

<!-- impeccable:design -->

## Direction contract

**THESIS:** Gramo's craft is measurable — origin, altitude, process, roast, eight
intervened spaces — so the site draws its proof as hand-inked data portraits
(the Du Bois 1900 grammar) instead of the category's latte-art hero + three-card
grid, which it refuses.

**OWN-WORLD:** Aged ivory board and espresso-black inked fields; flat hand-laid
chart pigments — walnut, muted olive, bronze, one copper accent; engraved-era
serif display over tracked small-caps grotesk captions; every section opens with
a chart-form invented for its question (altitude spirals, intervention maps,
origin-to-cup lines); photography mounted as captioned archival plates, never
full-bleed bleached heroes.

**STORY:** A visitor understands within one viewport that Gramo is a specialty
roaster with real data behind every bag, believes it because the numbers are
drawn like art, and acts — explores the coffee or visits a café.

**FIRST VIEWPORT (home):** Espresso-black board, full width. Left: GRAMO stamped
in cream serif caps with the tagline "Intervenimos espacios en donde hace falta
buen café" and two actions — "Explorar café" (copper plate button), "Visita un
café" (outlined). Right: the brand's own data portrait — eight intervened
spaces as a stepped square map (Cuernavaca/CDMX), with a bronze count-line of
origins in the catalog. Below the fold the board gives way to ivory paper.

**FORM:** Coffee Data Portraits — user-chosen fused challenger
(dubois-data-portraits, seed key c25057d1) over the assigned Roaster's Manifest;
staging: portrait-per-section editorial, no filament zoom.

## Palette (tokens are provisional until the first build settles them)

| Token | Value | Role |
|---|---|---|
| `--gramo-paper` | `#F2EBDD` | Ivory board — page ground |
| `--gramo-paper-deep` | `#E7DCC8` | Plate/panel fill on paper |
| `--gramo-board` | `#191410` | Espresso-black inked board (hero fields, footer) |
| `--gramo-ink` | `#241B14` | Text on paper |
| `--gramo-cream` | `#EFE6D4` | Text/lines on board |
| `--gramo-walnut` | `#6E4A2F` | Chart pigment 1 |
| `--gramo-olive` | `#67653F` | Chart pigment 2 |
| `--gramo-bronze` | `#96713D` | Chart pigment 3 / secondary accent |
| `--gramo-copper` | `#B4633A` | The one hot pigment — primary action, active states |
| `--gramo-gray` | `#8B7F6E` | Warm gray — rules, captions, disabled |

Color strategy: full palette, four named chart pigments laid flat at region
scale (a hero board, a pigment-filled chart block), never bright saturated
hues, never gradients. Light ivory ground overall (morning-daylight café use);
the espresso board is a field within it, not a dark mode.

## Typography

- **Display serif:** Libre Caslon Display / Libre Caslon Text (italic for
  editorial accents) — Caslon is period-true to the 1900 print world and reads
  quiet-luxury without the AI-default faces (Fraunces/Playfair/Cormorant are
  banned here).
- **Body + UI grotesk:** Archivo (regular/medium/semibold).
- **Data labels + captions:** Archivo Narrow, uppercase, tracked `0.08em` —
  the silkscreen/caption voice of the chart grammar. Tabular numerals for data.
- Self-hosted woff2 only, `font-display: swap`, latin + latin-ext subsets.
- Scale: display steps are large and few (fluid clamp); captions small and
  tracked; body 17–18px equivalent, generous leading.

## Composition rules

- Sections are **portraits**: each opens with its question set as a serif
  headline + a small-caps caption line, then the chart-form or plate that
  answers it. One idea per portrait; generous board margins (the page breathes
  like a mounted exhibition).
- Charts invent their form per question and are drawn as SVG with hand-inked
  weight (2–3px strokes, slightly imperfect joins, flat pigment fills, small
  tracked caption labels + thin leader lines). Never a charting library look.
- Photography = **plates**: mounted with a paper edge, small-caps caption and
  thin rule beneath; duotone-warm treatment acceptable; no full-bleed washed
  hero photography.
- Bilingual grammar: ES leads at text size, EN never shown simultaneously
  (separate routes); data labels stay ES on both locales only where they are
  proper names (tasting notes translate).
- Tables (menu, hours) use the stock-sheet voice: Archivo Narrow caps headers,
  dotted leaders, tabular numerals, pigment squares as section keys.

## Components

- Buttons: rectangular "inked plates" — copper fill with cream caps
  (primary), 1.5px ink outline (secondary); pressed = ink fill. No rounded
  pills, no shadows-as-decoration.
- Cards (coffee/journal/location): paper plates with a pigment key square, the
  serif title, small-caps data rows (origin · altitude · process), price in
  tabular numerals. Hover: plate lifts 2px with a hard offset ink shadow
  (printed-board depth, not blur).
- Accordion (FAQ): ledger rows with a plus that rotates to ×; rules stay 1px ink.
- Forms: underlined fields on paper with small-caps labels; focus = copper
  underline thickening. Errors in copper, never red.
- Nav: thin board strip — wordmark left (serif caps), small-caps links, a
  copper cart count square. Language switch: `ES · EN` small caps.

## Motion

- Signature: charts ink themselves once on first scroll into view (SVG
  stroke-draw, 600–900ms, ease-out), then rest. Stats count up once.
- Everything else: fades/translate ≤16px; hover lifts. GSAP lazy-loaded, fully
  disabled under `prefers-reduced-motion` (content always visible without JS).
- No parallax deeper than 8px; no looping ambient animation.

## Prohibitions

- No bright saturated hues, no gradients, no glassmorphism, no rounded-pill UI.
- No full-bleed washed hero photo with centered white serif (the refused rut).
- No chart-library defaults (gridlines-on-white, legend chips); every data
  graphic is drawn in the world's inked grammar.
- No cream-and-terracotta AI-default drift: copper is `#B4633A` used sparingly
  as action/accent, never a page wash.
- The board texture stays subtle (paper grain ≤4% noise); never skeuomorphic
  torn edges or coffee-stain clichés.

## Accessibility commitments

Contrast: ink on paper 12+:1; cream on board 11+:1; copper on paper ≥4.5:1 for
text-size uses (buttons carry cream text on copper ≥4.5:1). Focus states: 2px
copper outline offset 2px. All charts carry text equivalents (the data is HTML
tables or captioned lists under the SVG). WCAG AA + reduced motion honored.
