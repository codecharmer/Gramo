# DESIGN.md — Gramo Café visual world

<!-- impeccable:design -->

## Direction contract

**THESIS: La Galería.** Gramo's own label art — the matte-black bags carrying
hand-illustrated poster work per lot — *is* the artwork. The site is the gallery
that hangs it: warm-black walls, pools of gallery light, museum wall labels, and
nothing else competing. It refuses the category's cream-paper-and-serif café
template, and it refuses decorating over the brand: the walls stay quiet so the
art can be loud.

**OWN-WORLD:** Warm near-black walls (`#141210`, the bags' own black) with bone
type and soft elliptical light pools; daylight rooms in warm bone (`#F1EDE4`)
for reading surfaces (journal, about, menu). Display type in a heavy rounded
geometric sans that echoes the GRAMO wordmark's roundness; body in a neutral
grotesk; captions and wall labels in small tracked caps. The only site-owned
accent is brass (`#B08A54`); saturated color enters **only inside the artwork
photography** — never as a page field, never as decoration.

**STORY:** A visitor lands in a dark room with one work lit — a Gramo bag,
photographed as an object — reads its wall label (origin, process, notes,
price), understands instantly that this is a roaster with real craft and real
personality, and moves to the shop or to a café.

**FIRST VIEWPORT (home):** Warm-black room, full height. The GRAMO wordmark small
at top-left in bone. Center-right: one bag lit by a soft elliptical pool, scaled
large. Left: a short display line ("Intervenimos espacios en donde hace falta
buen café") with a wall label beneath it — tracked caps eyebrow, one line of
data — and two actions: "Explorar café" (bone plate, black caps) and "Visita un
café" (hairline bone outline).

**FORM:** La Galería — user-chosen (2026-07-28) after rejecting both the
data-portrait concept and the played-straight canon. Grounded in the brand's own
assets: the 2024 wordmark and the label-art bag photography.

## Palette

| Token | Value | Role |
|---|---|---|
| `--gramo-wall` | `#141210` | Warm black — gallery walls, default ground |
| `--gramo-wall-deep` | `#0D0B0A` | Deeper black — vignette, footer, image mats |
| `--gramo-bone` | `#F1EDE4` | Bone — type on walls, daylight-room ground |
| `--gramo-bone-dim` | `rgb(241 237 228 / 62%)` | Secondary type on walls |
| `--gramo-ink` | `#1A1714` | Type on bone (daylight rooms) |
| `--gramo-brass` | `#B08A54` | The one site accent — links, focus, active |
| `--gramo-gray` | `#8A8177` | Hairlines, tertiary type |
| `--art-violet` | `#7B3FA0` | Artwork key (category dot only) |
| `--art-marigold` | `#E8A33D` | Artwork key |
| `--art-teal` | `#2E8F8A` | Artwork key |
| `--art-signal` | `#C7422F` | Artwork key |

Rules: the four artwork keys appear only as 8px category dots or 2px underlines
— never as fills, bands, or backgrounds. No gradients except the gallery light
pool (a single soft radial, ≤22% bone). Rooms alternate wall → daylight → wall;
the page always closes on wall black.

## Typography

- **Display:** Figtree Black / ExtraBold — rounded geometric, echoing the GRAMO
  wordmark's terminals. Tight leading (1.05), `text-wrap: balance`, sizes large
  and few. Never italic.
- **Body:** Archivo 400/500 — neutral grotesk, ~17px, leading 1.65, measure 65ch.
- **Wall labels / captions:** Archivo 600, uppercase, tracked `0.1em`,
  12–13px — the museum-label voice used for eyebrows, data rows, nav, buttons.
- **Data:** Archivo tabular numerals for prices, altitudes, hours.
- Self-hosted woff2 via Fontsource; only the weights above are loaded.

## The wall label (signature device)

Every work — coffee, café, journal entry — carries a wall label: a bone hairline
box or bottom-ruled block with tracked-caps title, then rows of `LABEL · value`
in caps/tabular pairs. This is the site's one repeated ornament and it replaces
generic cards. Coffee label rows: ORIGEN · PROCESO · ALTITUD · NOTAS · PRECIO.
Café label rows: DIRECCIÓN · HORARIO · TELÉFONO.

## Composition rules

- **One work per room.** Sections are full-viewport-ish rooms with a single
  subject; padding starts at 7rem desktop / 4rem mobile. Never a three-card grid
  of equal weight where a hang would do.
- **Spotlight, not full-bleed.** Product photography sits centered on the wall
  inside a light pool with generous margin; café photography may go wide but
  keeps a bone hairline mat.
- **Daylight rooms** (journal body, about, menu, forms) invert to bone ground
  with ink type for long reading; they open and close with a hairline rule.
- Menu keeps café-menu grammar in the daylight room: caps section headers,
  hairline rows, dotted leaders, tabular prices.
- The wordmark is used as an image asset (`logo-bone.png` / `logo-ink.png`),
  never re-typed in a substitute face.

## Motion

- Signature: on first scroll into a room, the light pool fades up (600ms) and
  the work scales 1.03 → 1 (900ms, ease-out) with its label rising 8px. Once.
- Hover: bone plate buttons invert; images lift ≤2px; 180ms.
- GSAP lazy-loaded, gated on `prefers-reduced-motion` (static lit state, all
  content visible without JS). No parallax beyond 8px, no ambient loops.

## Prohibitions

- No cream-paper-and-serif café template; no serif display anywhere.
- No saturated color as page fields, bands, or gradients — artwork only.
- No paper grain, hard offset shadows, tag/manifest props, or chart-portrait
  grammar (all rejected directions).
- No rounded-pill buttons, glassmorphism, or drop shadows as decoration.
- No stock photography; imagery is Gramo's own label art, bags, and rooms.

## Accessibility commitments

Bone on wall ≥ 13:1; ink on bone ≥ 13:1; brass reserved for ≥4.5:1 uses. Focus:
2px brass outline, 2px offset, always visible on the dark ground. Light pools
are decorative only — never the sole cue. Native `details/summary` accordions,
semantic landmarks, hreflang + JSON-LD per the SEO layer, reduced motion fully
honored.
