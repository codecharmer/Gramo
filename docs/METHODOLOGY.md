# Build Methodology — Reserve-&-Pickup Commerce Sites

A transferable playbook distilled from the Gramo build. It exists so the **next**
brand's site is assembly, not archaeology: the same architecture, the same build
sequence, the same seeder and deploy engine — you change only data, design tokens,
and branding.

Read this top-to-bottom once. Thereafter, work from §7 (build sequence) and
§9 (per-brand checklist), and keep §8 (the gotcha catalogue) open — it is the part
that eliminates guesswork.

Throughout, the placeholder brand is **Gramo**; substitute your real brand. Wherever
you see `gramo` / `Gramo\Core` / `GRAMO_` / `gramo-core`, rename consistently.

---

## 1. What this methodology produces

A launch-ready WooCommerce storefront for a small food/retail brand that takes
**reservations for in-store pickup** (no shipping, no real-time card capture
required to launch), with:

- A block theme (Full Site Editing) carrying **all** presentation.
- A single custom plugin carrying **all** business logic.
- One-command content seeding (products, categories, pages, nav, media, branding).
- Reproducible deploy to a cPanel/VPS via a parameterised script.
- Optional SMS/WhatsApp order workflow, SEO schema, and an ops dashboard.

The split is the whole point: **theme = presentation, plugin = logic, data files =
content.** Nothing brand-specific is hardcoded in templates.

---

## 2. Stack & the decisions already made (don't re-litigate)

| Decision | Choice | Why |
|---|---|---|
| CMS | WordPress 6.8+ / 7.0, block theme + FSE | Client-editable, no page-builder lock-in |
| Styling source of truth | `theme.json` v3 + a small hand-authored `theme.css` | Tokens drive everything; CSS only for what theme.json can't express |
| Commerce | WooCommerce, **HPOS**, block cart/checkout | First-party, block-native checkout |
| Payments | **WooCommerce Stripe Gateway** (test mode for demos) + Cash-on-pickup (COD) | WooPayments is **not available in Mexico**; Stripe is. COD needs no keys |
| Business logic | One plugin, PSR-4, `Bootable` service container | Logic survives theme swaps; testable; one boot path |
| Local dev | `@wordpress/env` (Docker) only | No bespoke Docker Compose to maintain |
| Deploy | `setup-vps-deploy.sh` WordPress site-type → cPanel VPS | Same script as the rest of the fleet; rsync + bootstrap |
| Third-party plugins | Composer + [wpackagist](https://wpackagist.org); dirs git-ignored, `composer.lock` committed | Reproducible, version-pinned, no vendoring; `composer install` in local/CI/deploy |
| Secrets | `wp-config.php` constants (runtime) + GitHub secrets (deploy) | Never in the DB, never in git |
| Pre-launch gating | Restricted Site Access (10up) | Whole site behind login until go-live |

Ground rules that pay off later:

- **Content is code.** Every product, page, category, nav item and its copy lives in
  `data/*.php` and is installed by the seeder. Templates contain *zero* brand copy.
- **Secrets are constants, not options.** Config accessors read a constant first, then
  fall back to a DB option. Secrets live only as constants (out of DB backups).
- **Idempotent everything.** The seeder is safe to re-run; it marks what it created and
  never clobbers hand-made content unless `--force`.

---

## 3. Repository shape

```
gramo/
├─ .wp-env.json                 # local env: WP core, plugins, theme, mappings, config
├─ .wp-env.override.json        # git-ignored: local secrets (Twilio/Stripe test keys)
├─ .gitignore                   # ignores Composer-managed plugin dirs; keeps *-core (§8)
├─ composer.json                # root: wpackagist plugins + dev tooling + platform.php
├─ composer.lock                # committed — pins exact third-party plugin versions
├─ package.json                 # @wordpress/scripts build (opt-in), lint
├─ docs/
│  └─ METHODOLOGY.md            # this file
└─ wp-content/
   ├─ themes/gramo/              # PRESENTATION ONLY
   │  ├─ theme.json             # design tokens (palette, type, spacing) ← per brand
   │  ├─ theme.css / editor.css # hand-authored runtime CSS
   │  ├─ parts/                 # header, header-transparent, footer, footer-minimal
   │  ├─ templates/             # front-page, archive-product, single-product, cart, …
   │  ├─ patterns/              # composed sections (hero, story, grid, …) ← per brand copy
   │  ├─ inc/                   # setup, assets, patterns, block-styles, block-bindings
   │  └─ assets/                # css, js, fonts, images, build/
   └─ plugins/
      ├─ gramo-core/             # ALL LOGIC (the reusable engine, §5)
      │  ├─ gramo-core.php       # bootstrap: constants + autoload + boot
      │  ├─ composer.json       # PSR-4 "Gramo\\Core\\": "src/"
      │  ├─ src/…               # services (see §5)
      │  └─ data/               # products.php, pages.php, navigation.php, media/ ← per brand
      ├─ woocommerce/                  # Composer-managed (wpackagist), git-ignored
      ├─ woocommerce-gateway-stripe/   # Composer-managed (wpackagist), git-ignored
      └─ restricted-site-access/       # Composer-managed (wpackagist), git-ignored
```

---

## 4. The two layers: Engine vs Brand

The single most useful mental model. **The engine is copied verbatim and renamed. The
brand layer is rewritten.**

### Engine — copy & rename, don't redesign

| File / area | What it is |
|---|---|
| `gramo-core.php` | Bootstrap: defines `GRAMO_CORE_*` constants, prefers Composer autoload else falls back to `Support\Autoloader`, boots the container on `plugins_loaded`:20 |
| `src/Plugin.php` | The service container: one ordered `service_classes()` list; instantiates each and calls `boot()` once |
| `src/Contracts/Bootable.php` | The `boot(): void` interface every service implements |
| `src/Support/Autoloader.php` | PSR-4 fallback loader (runs without `composer install`) |
| `src/Setup/Installer.php` | The seeder engine: categories → products → pages → navigation → WC pages → branding, all idempotent (§6) |
| `src/Setup/MediaImporter.php` | `ensure(image_key)` → real photo at `data/media/source/{key}.{jpg,png,webp}` or a generated branded SVG placeholder |
| `src/Setup/Options.php` | Config accessors: `group()` merges defaults+DB option; secret groups override from constants |
| `src/Setup/Activator.php`, `Settings.php` | Activation flags; admin settings screen |
| `src/Cli/Commands.php` | `wp gramo install / seed-products / install-pages / import-media / reset` |
| `src/Woo/*`, `src/Ordering/*` | HPOS support, inventory, pickup scheduler + order meta |
| `src/Sms/*` | Twilio client, order notifications, inbound webhook, logger |
| `src/Seo/*`, `src/Rest/*`, `src/Admin/*` | Schema/meta tags, REST routes, ops dashboard |
| theme `templates/`, `parts/` (structure), `inc/` | Structural scaffolding — layout, not copy |
| `setup-vps-deploy.sh` (WordPress site-type) | The deploy engine (§7) |

### Brand — rewrite for the new business

| File / area | What changes |
|---|---|
| `data/products.php` | The real catalogue: names, prices, SKUs, descriptions, tags, categories, `image_key` |
| `data/pages.php` | Every page's real copy |
| `data/navigation.php` | Menus |
| `data/media/source/*` | Real photography (drop-in; keyed by `image_key`) |
| `theme.json` | Palette, fonts, spacing, radii — the entire visual identity |
| `theme.css` / patterns copy | Section layouts + any brand copy inside patterns |
| `Installer::CATEGORIES` | The category taxonomy for this brand |
| `Options` defaults | Business facts: name, address, hours, pickup slots, locale, timezone |
| Plugin header, constants, namespace, text-domain | `gramo` / `Gramo\Core` / `GRAMO_` |
| Deploy args + GitHub secrets | Domain, DB coordinates, admin, site title |

If you find yourself editing an **engine** file for brand reasons, stop — it probably
belongs in a `data/*.php` file or `theme.json`. That drift is what this doc prevents.

---

## 5. The plugin engine in detail

**Bootstrap → container → services.** `gramo-core.php` defines constants, loads the
autoloader, and on `plugins_loaded` priority 20 calls `Plugin::instance()->boot()`.
`Plugin::boot()` walks a single ordered list and calls `boot()` on each service:

```
Setup\Options, Setup\Settings, Support\Assets,      // config & assets first
Woo\Support, Woo\Inventory,                          // commerce foundation
Ordering\PickupScheduler, Ordering\OrderMeta,        // reserve & pickup
Sms\Logger, Sms\OrderNotifications, Sms\InboundController,
Seo\MetaTags, Seo\SchemaGraph,
Rest\Routes, Cli\Commands,
Admin\Dashboard, Admin\ProductionCalendar, Admin\Reports
```

Order matters: config and commerce foundation boot before anything that depends on
them. Adding a feature = add one `Bootable` class and one line here. Removing one =
delete the line. Nothing else reaches into the boot path.

**Why a plugin, not the theme:** the theme can be redesigned or replaced without
touching ordering, SMS, SEO, or the seeder. The theme stays presentation-only.

---

## 6. The seeder methodology

One command provisions the whole storefront and is safe to re-run.

- **`Installer::install_all()`** runs, in order: options → **branding** (logo) →
  categories → products → pages → navigation → WC page assignment. Each step is
  idempotent; `force => true` overwrites seeded content; every created post/term is
  stamped with marker meta (`_gramo_seeded*`) so `reset` and re-runs are safe and never
  touch hand-made content.
- **Categories** are a `CATEGORIES` constant (slug → name/description). When you change
  the taxonomy later, add a `LEGACY_CATEGORIES` map (old slug → new) so existing
  installs migrate product assignments in place instead of orphaning them; and update
  name/description for terms you created (never for hand-made ones).
- **Products** (`data/products.php`) are an ordered array; each declares
  `slug, category, regular_price, price_is_estimate, sku, short_description,
  description, tags, attributes, stock, image_key, image_alt, seo_short,
  meta_description`. Real prices → `price_is_estimate => false`.
- **Media** (`MediaImporter::ensure`): if a real photo exists at
  `data/media/source/{image_key}.{jpg,png,webp}` it is sideloaded; otherwise a branded
  SVG placeholder is generated so **every** product has an image. Placeholder colours
  mirror `theme.json` — keep them in step.
- **Branding** seeds the site logo into the `custom_logo` theme mod (a DB-only value
  the header's `core/site-logo` reads), so a fresh install doesn't fall back to the
  site title. `reset` clears it.

CLI surface: `wp gramo install` (everything), `seed-products`, `install-pages`,
`import-media`, `reset --yes`.

---

## 7. End-to-end build sequence

1. **Scaffold.** Copy the engine (§4) into a new repo. Rename `gramo`→`gramo`,
   `Gramo\Core`→`Gramo\Core`, `GRAMO_`→`GRAMO_`, text-domain, plugin header.
   Set `composer.json` `config.platform.php` to your target (e.g. `8.3.0`).
2. **Local env.** Declare third-party plugins in `composer.json` (wpackagist +
   `composer/installers` + `extra.installer-paths`), then `composer install` to
   materialise them into `wp-content/plugins/`. Point `.wp-env.json` at those local
   paths plus `gramo-core`; map the theme + plugin dirs. `npx wp-env start` (needs the
   plugins on disk first). Put local Twilio/Stripe **test** secrets in
   `.wp-env.override.json` (git-ignored).
3. **Design tokens.** Fill `theme.json`: palette, fonts (self-host), spacing, radii.
   **Rename any digit-leading preset slugs** (`2xl`→`xxl`) — WordPress silently drops
   them (§8).
4. **Content.** Author `data/products.php`, `data/pages.php`, `data/navigation.php`;
   drop real photos into `data/media/source/`; set `Installer::CATEGORIES` and the
   `Options` business defaults (address, hours, pickup slots, locale, timezone).
5. **Seed & iterate.** `wp gramo install`. Build patterns/templates against real seeded
   content. Verify locally at mobile + desktop.
6. **Third-party plugins are already Composer-managed** (step 2). Confirm the managed
   dirs are git-ignored and `composer.lock` is committed; `composer install` reproduces
   them anywhere. Pin exact versions for a live site; use carets for a fresh build.
7. **Provision the server.** Create the DB + DB user in cPanel; note the real prefix.
   Set GitHub secrets: `WP_DB_NAME`, `WP_DB_USER`, `WP_DB_PASSWORD`, `WP_DB_HOST`,
   `WP_ADMIN_PASSWORD`. Ensure the server PHP matches the plugin's `Requires PHP`.
8. **First deploy (bootstrap).** Run `setup-vps-deploy.sh` with the WordPress site-type
   and `--wp-bootstrap` (installs core via `curl|tar`, writes `wp-config.php`, installs,
   seeds). See flags below.
9. **Post-bootstrap fixups** (until folded into the script — see §8): add memory defines
   + `.user.ini`, write `.htaccess`, add the NGINX logged-in cache bypass, restore any
   secret constants (Stripe/Twilio), purge cache.
10. **Gate + verify.** Enable Restricted Site Access; run the §10 checklist.

Deploy flags (WordPress site-type): `--wp-theme --wp-plugins --wp-build --wp-activate
--wp-seed-command --wp-reseed --wp-bootstrap --wp-site-url --wp-site-title
--wp-admin-user --wp-admin-email --wp-locale --wp-install-plugins --wp-db-name
--wp-db-user --wp-db-host --wp-flush-cache`. The DB **password is never a flag**
(shell-history / `ps` leak) — it comes from the `WP_DB_PASSWORD` env / GitHub secret.
`rsync --delete` is scoped to the named theme/plugin dirs only — uploads, `wp-config.php`
and core are never touched.

---

## 8. The gotcha catalogue (this is the guesswork you're eliminating)

### Local / environment
- **`composer install` fails on PHP mismatch.** Pin `config.platform.php` in *both*
  composer.json files to your target so a different local PHP doesn't block install.
- **wp-env plugin sources.** With Composer managing plugins into `wp-content/plugins/`,
  point `.wp-env.json` at those **local paths** (run `composer install` before
  `wp-env start`, or the paths don't exist yet). List WooCommerce **before** the core
  plugin. (Avoid the `.zip` "latest" URL — it can serve a **beta**; Composer + a
  committed lock pins the version instead.)
- **Docker CLI errors** (`docker-credential-desktop` / `spawn docker ENOENT`): symlink
  the `docker*` binaries from Docker.app into `/usr/local/bin`; recurs after Docker
  Desktop self-updates.

### Theme / design
- **theme.json silently drops digit-leading preset slugs** (`2xl`, `3xs`) — the CSS
  vars are never emitted. Name them `xxl`, `xxxs`, etc.
- **Renaming preset slugs only fixes theme *files*.** Seeded page content in
  `post_content` stores its own copies of `has-…` / `var:preset|…` tokens — migrate them
  in the DB with delimiter-bounded `REPLACE()` (never the bare word, or you corrupt
  prose).
- **Header logo.** `core/site-logo` reads the DB-only `custom_logo` mod → seed it. A
  logo supplied as a solid-background raster must be **keyed to transparency** (ramp
  alpha by luminance to preserve soft edges); invert it in CSS for a dark hero.
- **WooCommerce injects mini-cart + customer-account into block headers** via Block
  Hooks — they won't appear in your header part but *will* render. They're buttons/links
  whose SVGs use `fill: currentColor`; style them or they vanish on a dark hero.
- **Set overlay colours on `core/navigation`** or the opened mobile menu is unstyled
  (invisible text).
- **A transparent (homepage) header that scrolls away** is `position:absolute`, not
  sticky — don't gate its light styling on `.is-scrolled`.

### Seeder / content
- **Never use `sanitize_file_name()` for internal path building.** On WP 7.0+ it treats
  known document extensions as filenames (`"pages"` → `"unnamed-file.pages"`, an iWork
  extension) and your data loader silently returns `[]`. Use a strict `[a-z0-9_-]`
  whitelist.
- **`get_page_by_path($slug, OBJECT, 'product')` also matches attachments.** Products
  whose name equals an attachment title get silently skipped in existence checks — query
  `wp_posts` by `post_type` directly.
- **SVG placeholders fail to upload:** `wp_upload_bits()` validates against
  `get_allowed_mime_types()`, which omits `image/svg+xml` — the placeholder branch fails
  silently and the product ends up with **no** image. Add an `upload_mimes` filter around
  that single call and remove it immediately.
- **Regenerating placeholders needs two deletes:** the on-disk `.svg` *and* the
  media-map cache entry. Clearing one alone silently reuses the old art.
- **Keep the placeholder palette in step with `theme.json`.** A stale palette constant
  ships every placeholder in the wrong scheme.
- **The real catalogue must live in the seed data, not just the local DB.** If you
  reorganise products only in the DB, every fresh deploy ships the old/invented
  catalogue and production silently diverges.

### Ordering / commerce
- **Order-type-dependent code must not hook `woocommerce_init`** (fires at `init:0`,
  *before* WooCommerce registers order types at `init:5`). Use `init:20`. Getting this
  wrong makes `WC_Order_Factory` throw → a **site-wide 500 on the first order**.
- **`woocommerce_register_additional_checkout_field` is singular** (the plural never
  exists).
- **Admin "test send" must check `$result['success']`**, not `false === $result` — an
  array return is always truthy, so failures otherwise report success.

### Deploy
- **`package.json` `postinstall` with backticks** is executed as command substitution by
  `sh -c` in CI — it literally runs whatever is in the backticks. No backticks; make the
  build step opt-in.
- **`wp core download` OOMs** on a 128M cPanel/WP-Toolkit PHP — bootstrap with
  `curl … | tar` and export `WP_CLI_PHP_ARGS='-d memory_limit=512M'`.
- **DB coordinates:** cPanel prefixes DB name/user with the account (`gramo_gramo`); the
  MySQL user needs a working `@localhost` grant. Confirm the real `table_prefix` before
  writing `wp-config` or WP sees a blank install.
- **`wp config create` is stock** — it does **not** include secret constants or memory
  defines. Whatever your app reads from constants (SMS/payment secrets) and the memory
  defines must be injected by the bootstrap step, or they're missing after every config
  (re)build.
- **Don't hand-vendor third-party plugins — manage them with Composer.** Committing a
  plugin's tree fights `.gitignore` (the `vendor/`, `build/`, `*.min.js` rules meant for
  *your* source strip its shipped runtime files, so a git deploy or fresh clone gets a
  **broken** plugin — rsync-from-local hides it). Instead use wpackagist: add
  `composer/installers`, an `extra.installer-paths` for `type:wordpress-plugin`, and
  `require` each `wpackagist-plugin/<slug>`. Git-ignore the installed dirs, commit
  `composer.lock`, and run `composer install` in local, CI and deploy. The deploy must
  `composer install` at the **repo root** (materialises the plugins) before rsync, and
  must **not** run `composer install` *inside* a prebuilt plugin dir (they ship their own
  `vendor/` — guard with `[ -d "$SRC/vendor" ] && continue`). Note WordPress's own
  onboarding silently installs marketing plugins (Jetpack, WooPayments, TikTok/Snapchat/
  Reddit, Google Listings…) — audit `wp plugin list` and manage only what you intend.

### Production / cPanel ops
- **FPM memory default (128M) is too low** for WooCommerce (+ Jetpack) → front-end 500s;
  a request that redirects early (e.g. RSA) can *mask* it. Fix with **both** a docroot
  `.user.ini` (`memory_limit = 512M`) and `WP_MEMORY_LIMIT`/`WP_MAX_MEMORY_LIMIT` defines;
  then reload FPM.
- **`.htaccess` must exist** with the standard `# BEGIN WordPress` rewrite block (owned
  by the site user) or every URL except `/` 404s. A root-run `wp rewrite flush --hard`
  does **not** reliably create the file — write it, then `chown`.
- **The NGINX vhost needs the WordPress logged-in cache bypass**
  (`if ($http_cookie ~ "wordpress_logged_in_…") { set $skip 1; }`). cPanel only adds it
  when WordPress is detected at the docroot *at vhost-generation time* — if the vhost was
  generated before WP existed, it caches the anonymous redirect and serves it to
  logged-in users (looks exactly like an auth bug). Install it as a user include (survives
  regeneration). Purge: `rm -rf /var/cache/ea-nginx/proxy/<user>/*; nginx -s reload`.
  Diagnose cache vs code by re-requesting with a `?nocache=…` query string.
- **Mail routing.** If the domain uses an external mail provider (M365/Google) it must be
  in `/etc/remotedomains`, **not** `/etc/localdomains` — otherwise exim delivers to a
  local mailbox and `wp_mail()` returns `true` while every message (order emails, password
  resets) vanishes silently. Fix SPF too (it is strictly space-delimited).
- **Secrets in `wp-config` are wiped by any config rebuild** and are **not** restored by
  the bootstrap — keep the working values in `.wp-env.override.json` and re-add them as
  `--type=constant` after any rebuild.

### SMS / WhatsApp / payments
- **Config source order:** secrets are read from constants first, DB option second; the
  option row keeps the non-secret flags, secrets stay constant-only (out of DB backups).
- **WhatsApp sandbox is demo-only:** every recipient must `join <code>`; enrollment
  **expires ~3 days** (error **63015** = rejoin needed); only enrolled numbers receive.
  "Sent" in your log means Twilio *accepted* it, not that WhatsApp *delivered* it — check
  the provider's message status/error code for the truth. Production needs a real WhatsApp
  sender or SMS (A2P 10DLC registration).
- **Normalise phone numbers to E.164 explicitly.** Don't rely on the provider guessing
  the country (it defaults to US +1). Keep anything starting with `+`; otherwise prepend
  the order's billing-country dialing code (default to the brand's country, e.g. +52).
- **WooPayments is unavailable in Mexico** (and many countries) — use the **WooCommerce
  Stripe Gateway** (connects to the merchant's own Stripe account; test mode + card
  `4242…` for demos with no charge). COD ("pay at pickup") needs no keys and is the
  zero-setup mock-order path.

---

## 9. Per-brand customization checklist

Rename & identity
- [ ] Global rename `gramo`→`gramo`, `Gramo\Core`→`Gramo\Core`, `GRAMO_`→`GRAMO_`,
      text-domain, plugin + theme headers, `composer.json` PSR-4 namespace.
- [ ] `theme.json`: palette, fonts (self-hosted), spacing, radii; no digit-leading slugs.
- [ ] Logo → transparent PNG in `data/media/source/`; seeded via branding step.
- [ ] Favicon / site icon (seed it too — don't leave it hand-set).

Content (`data/*.php`)
- [ ] `products.php` — real catalogue, real prices (`price_is_estimate => false`), SKUs,
      tags, attributes, `image_key`, SEO fields.
- [ ] `pages.php`, `navigation.php` — real copy and menus.
- [ ] `data/media/source/` — real photography keyed by `image_key`.
- [ ] `Installer::CATEGORIES` — the brand's taxonomy (+ `LEGACY_CATEGORIES` if it evolves).
- [ ] `Options` defaults — name, address, hours, pickup slots, timezone, locale.
- [ ] Patterns: replace any brand copy embedded in section patterns.

Infra
- [ ] cPanel DB + user created; real prefix noted.
- [ ] GitHub secrets set (DB × 4, admin password).
- [ ] Server PHP matches `Requires PHP`.
- [ ] Third-party plugins declared in `composer.json`; managed dirs git-ignored; `composer.lock` committed.
- [ ] Deploy args filled (domain, site title, admin, locale).

---

## 10. Pre-launch verification checklist

- [ ] `wp gramo install` on a clean DB reproduces the whole site (no manual DB edits).
- [ ] Every product has an image (real or placeholder); no orphaned categories.
- [ ] Every internal link resolves (footer, nav, category tiles) — no 404s.
- [ ] Anonymous → gated (RSA 302); authenticated → 200 on `/`, `/menu`, `/shop`, a
      category, a product.
- [ ] Place a COD order → reaches `processing`, stock decrements, notification fires and
      **delivers** (verify provider status, not just "sent").
- [ ] Provider webhook reachable through the gate (its own signature check, not RSA).
- [ ] Order + password-reset emails actually arrive off-server (check routing + SPF).
- [ ] Memory: full page renders (no 500); `.htaccess` present; cache bypass for logged-in.
- [ ] Lighthouse / accessibility / contrast / focus states / reduced-motion pass.
- [ ] Payment path decided: COD live; Stripe in **test** mode until real keys.

---

## 11. Known open items to fold back into the engine

These were fixed by hand on Gramo; bake them into the engine so the next brand gets
them for free:

- Bootstrap should inject **secret constants** (SMS/payment) and the **memory defines**
  into `wp config create`, and write the `.user.ini` and `.htaccess`.
- Deploy should install the **NGINX logged-in cache bypass** as a user include.
- `TwilioClient` should **normalise phones to E.164** (billing-country aware, brand default).
- The **favicon/site-icon** should be seeded like the logo.
- ~~Vendor the Stripe gateway + RSA~~ **Done:** third-party plugins are Composer-managed
  (wpackagist) in the starter, and the deploy script `composer install`s them at the root
  before rsync.
```
