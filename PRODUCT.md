# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Coffee lovers in Cuernavaca, Morelos and Mexico City (locals and visitors) discovering and returning to Gramo's cafés (8 locations across both cities): browsing coffee and locations on mobile, ordering beans/products online with pay-on-delivery, reading the journal. Secondary: wholesale prospects (cafés/restaurants/offices) and job seekers (the brand runs a real CV pipeline). Bilingual — Spanish (es-MX) primary, English secondary (interview-confirmed).

## Product Purpose

The digital home of Gramo, a luxury small-batch coffee brand from Cuernavaca. Success = the site feels as considered as the coffee (quiet-luxury register), converts visits into café visits, online COD orders, and subscription/wholesale inquiries, and is fully editable by non-technical staff from WordPress.

## Positioning

Boutique craft-coffee brand competing visually with Blue Bottle, Verve, Aesop-level design — handcrafted, warm, exclusive, timeless; explicitly NOT corporate or trendy. Local Cuernavaca roots with an international design standard.

## Operating Context

Headless WordPress (content + WooCommerce, cms.gramo.cafe) consumed by a static Gatsby frontend at gramo.cafe. Editors work only in WP admin: pages and journal are composed with a curated set of Gutenberg blocks; structured content uses custom meta boxes (no ACF — interview-confirmed). Spanish and English are linked translation-pair posts. Orders pay on delivery (COD) at launch; no card gateway yet. Staff receive Twilio SMS/WhatsApp alerts for inquiries and orders (dry-run until API keys provided). Deployed via GitHub Actions to a cPanel VPS.

## Capabilities and Constraints

- Pages: Home, About, Coffee, Menu, Locations, Our Process, Subscriptions, Wholesale, Journal, Careers, Contact, 404, Privacy.
- Content: coffees (origin/roast/tasting/brew), menu items with prices, café locations (hours/amenities/map/gallery), team, testimonials, events, journal.
- Commerce: WooCommerce, MXN, COD at launch; card payments, gift cards, loyalty, mobile ordering are FUTURE (do not build now, do not block later).
- Bilingual es-MX (primary) + EN on every content surface; missing translations are omitted, never substituted with the other language.
- Stack fixed by brief: Gatsby + React + TypeScript + SCSS Modules + GSAP (sparing), WPGraphQL-driven, static generation; Gutenberg block editing rendered via a block→React map; Lighthouse 100 targets; WCAG AA + reduced motion.
- Twilio via wp-config constants; no keys yet (dry-run mode).
- Undecided (future): reservations, franchise portal, customer accounts, AI recommender.

## Brand Commitments

Name: Gramo (Gramo Café). Home base: Cuernavaca, Morelos; presence in CDMX. Personality (binding, from brief): warm, sophisticated, premium, minimal, quiet luxury, handcrafted, exclusive, timeless. Palette direction (binding): deep espresso, warm black, soft ivory, natural cream; walnut, muted olive, warm gray, bronze; copper accent — never bright saturated colors. Typography direction: elegant serif headings + clean sans body, editorial whitespace. Mood references (binding, not to copy): Japanese café aesthetics, Scandinavian interiors, natural wood/stone/concrete/brass, warm light, slow coffee. Real brand voice on record (evidence, to reconcile in design): playful, culture-literate product naming (film/music references), jazz nights, "intervenimos espacios" — the new site's quiet-luxury register must carry this personality without corporate flattening; keep real product names verbatim.

## Evidence on Hand

**Gramo Café is a real, operating brand** (user-confirmed: source photos and addresses from Google). Verified public facts (2026-07-28, via Linktree/press/shop):

- 8 locations: Gramo 1 (C. Alicia 513, Jardines las Delicias, Cuernavaca), Gramo 2 (Marte 10, Jardines de Cuernavaca), Gramo 2GO (Av. Diana 70, Delicias), Gramo 3 (Blvd. Lic. Benito Juárez 102, Cuernavaca Centro), Gramo 4 (Río Balsas 22, Vista Hermosa), Gramo 2GO Bosques (Secretaría de Marina 520, Cuajimalpa, CDMX), Gramo 5 (Av. Paseo de las Palmas 840, Lomas de Chapultepec, CDMX), Gramo 6 (Lamartine 339, Polanco, CDMX).
- Taglines in use: "Intervenimos espacios en donde hace falta buen café"; shop: "La vida es muy corta para tomar mal café".
- Social/digital: Instagram @gramo.cafe, Spotify playlist, WhatsApp community, digital wallet loyalty card, pickup app for 2GO, jazz-night reservations (Gramo 3), CV submission form (careers).
- Existing Shopify shop (gramocafe.com): single-origin beans $300–$750 MXN/kg with playful culture-referencing names (La Batalla, Nevermind, Vincent Vega, Grunge Coffee...), monthly subscriptions $399–$1,299 MXN, cold-latte subscription from $200 MXN, matcha.
- Menu reality: espresso, filtrados, cold brew, multiple origins, té, chai; signature iced flat white; pastries supplied by sister bakery Pacífica (@pacifica.mx).
- Photography: user authorizes sourcing from Google (brand's own listing/social imagery); prefer the brand's actual photos, tasteful coffee photography as gap-filler.
- Per-location opening hours not yet captured — pull from Google Maps listings during content seeding; do not invent.
- Domain gramo.cafe exists and points at the VPS. Real menu prices beyond the shop not yet captured — use shop prices where real, mark the rest as editable placeholders.

## Product Principles

1. Every surface editable from WordPress — content lives in the CMS, never hardcoded in the frontend.
2. Quiet luxury: restraint over spectacle — whitespace, typography, and photography carry the design; animation is seasoning.
3. Static-first performance — anything buildable at compile time is; runtime calls only for cart/checkout/forms.
4. Bilingual parity — ES and EN are both first-class; no machine-translation filler.
5. Engine over plugins — capabilities live in gramo-core (code-registered, testable) rather than plugin sprawl.

## Accessibility & Inclusion

WCAG AA, full keyboard navigation, visible focus states, screen-reader-friendly landmarks and alt text, prefers-reduced-motion honored.
