# Gramo

Bilingual (es-MX / EN) headless WordPress + Gatsby site for [Gramo Café](https://linktr.ee/gramo.cafe), a specialty coffee brand from Cuernavaca, Morelos with cafés in Cuernavaca and Mexico City.

- **Frontend** — `frontend/` · Gatsby 5, React, TypeScript, SCSS Modules, GSAP. Statically built, served at `gramo.cafe`.
- **Backend** — `wp-content/` · headless WordPress at `cms.gramo.cafe`: WPGraphQL, WooCommerce (pay-on-delivery), and the `gramo-core` plugin, which owns the entire content model.
- Content is composed with **Gutenberg blocks** (a curated set of custom `gramo/*` blocks) and rendered in Gatsby through a block→React component map. Spanish and English exist as linked translation-pair posts.

## Architecture

```
wp-content/
├── plugins/gramo-core/     # All business logic: CPTs, blocks, GraphQL, i18n,
│                           # COD ordering, inquiry forms, Twilio SMS, SEO, seeder
└── themes/gramo/           # Minimal FSE admin-shell theme (public frontend is Gatsby)
frontend/                   # Gatsby site (sources WPGraphQL at build time)
```

Principles: theme presents (admin only), plugin decides; secrets are `wp-config.php` constants, never DB rows; content is seeded from code (`wp gramo install`, idempotent); Composer-managed plugins (`woocommerce`, `wp-graphql`) are build output, not committed.

## Local development

Requirements: Docker, Node 22 (`.nvmrc`), Composer, PHP 8.3 for vendor tooling (or run tools via `docker run php:8.3-cli-alpine`).

```bash
composer install          # PHP tooling + wpackagist plugins
npm install               # workspaces: theme, gramo-core blocks, frontend
npx wp-env start          # local WordPress at :8888 (admin/password)
npm run env:install-content   # seed content: wp gramo install
```

GraphQL endpoint: `http://localhost:8888/index.php?graphql`

## Quality gates

```bash
composer lint       # phpcs (WordPress-Core + Extra)
composer analyze    # phpstan level 6
npm run lint        # JS + SCSS
```

CI runs these on push to `master`. Deployment is via GitHub Actions (see `.github/workflows/`): backend rsyncs theme + plugins to the VPS, frontend builds Gatsby and rsyncs `public/`.

## Documentation

- `docs/METHODOLOGY.md` — the engine playbook this project is built on.
- `PRODUCT.md` — product record (users, brand commitments, evidence).
