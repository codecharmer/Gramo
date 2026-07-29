# Deployment

Gramo is two deployables sharing one repository and one server account, in
**separate document roots** so neither can overwrite the other:

| Half | Lives at | Document root | Workflow |
|---|---|---|---|
| Headless WordPress | `cms.gramo.cafe` | `/home/gramo/public_cms` | `.github/workflows/deploy.yml` |
| Static Gatsby site | `gramo.cafe` | `/home/gramo/public_html` | `.github/workflows/deploy-frontend.yml` |

Both deploy from `master` on GitHub Actions over SSH to the cPanel VPS
(72.167.225.151, account `gramo`). Path filters keep them independent: a
frontend-only change never redeploys WordPress, and vice versa.

## How a change reaches production

**Code:** push to `master`. The matching workflow builds and rsyncs.

**Content:** an editor publishes in WordPress → `Gramo\Core\Deploy\RebuildTrigger`
fires a `repository_dispatch` (`content-updated`) at the repo → the frontend
workflow rebuilds and republishes the static site. There is also a
"Publicar sitio" button in the admin bar for an immediate rebuild.

This requires `GRAMO_GITHUB_PAT` in `wp-config.php` to hold a fine-grained
GitHub token with **Contents: read and write** on `codecharmer/Gramo` only.
Until that constant holds a real token the site simply does not auto-rebuild;
nothing else breaks, and the admin notice says so.

## What the backend workflow does

1. `composer install` materializes the wpackagist plugins (WooCommerce,
   WPGraphQL) — they are build output, never committed.
2. Builds the editor blocks through the npm workspace (`gramo-core`).
3. Bootstraps WordPress core on first run only (when `wp-config.php` is
   absent): downloads core with `curl | tar` — `wp core download` OOMs on
   cPanel's 128M PHP — then `wp config create`, `wp core install`, the `es_MX`
   language pack, and `/%postname%/` permalinks.
4. Rsyncs **only** the theme and the four plugin directories. WordPress core,
   `wp-config.php`, and `wp-content/uploads` are never touched, so media and
   credentials on the server are safe.
5. Activates the theme and plugins. Order matters: `gramo-core` declares
   `Requires Plugins: woocommerce`, so WooCommerce and WPGraphQL activate
   first.
6. Seeds content **once**, guarded by `/home/gramo/public_cms/.wp-content-seeded`
   so a later deploy can never overwrite what the client has edited. Use
   `--wp-reseed` (re-running the setup script) to deliberately seed again.

## What the frontend workflow does

1. Waits for `https://cms.gramo.cafe/graphql` to answer (up to five minutes) —
   a backend deploy may still be finishing.
2. `gatsby build` against the live backend, then asserts the output has pages.
3. Rsyncs `frontend/public/` into `public_html`, excluding `.well-known/`,
   `cgi-bin/`, `.htaccess`, and `.user.ini` so AutoSSL renewals keep working.
4. Fixes ownership/permissions, clears the cPanel NGINX cache, and smoke-tests
   that `https://gramo.cafe/` returns 200.

## Server facts worth knowing

- The `cms` subdomain's document root had to be moved out of `public_html`
  (cPanel creates it inside by default). If the subdomain is ever recreated,
  check `/var/cpanel/userdata/gramo/cms.gramo.cafe` and rebuild the vhost —
  a nested docroot would let the frontend's `rsync --delete` wipe WordPress.
- `.htaccess` and `.user.ini` in `public_cms` are server-owned, not deployed.
  The former carries the WordPress rewrite block (without it `/graphql` 404s)
  plus denies on `wp-config.php`/`xmlrpc.php`; the latter raises PHP memory.
- wp-cli on the server needs `WP_CLI_PHP_ARGS='-d memory_limit=512M'`.

## Secrets

GitHub repository secrets (set by `setup-vps-deploy.sh`): `SSH_HOST`,
`SSH_PORT`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`, `DEPLOY_PATH`,
`WP_DB_NAME`, `WP_DB_USER`, `WP_DB_PASSWORD`, `WP_DB_HOST`,
`WP_ADMIN_PASSWORD`.

`wp-config.php` constants (server-side, never in git): `GRAMO_TWILIO_SID`,
`GRAMO_TWILIO_ACCOUNT_SID`, `GRAMO_TWILIO_AUTH_TOKEN`, `GRAMO_TWILIO_FROM`,
`GRAMO_TWILIO_MESSAGING_SID`, `GRAMO_TWILIO_CHANNEL`, `GRAMO_SMS_DRY_RUN`,
`GRAMO_GITHUB_PAT`, `GRAMO_GITHUB_REPO`, `GRAMO_FRONTEND_URL`,
`WP_ENVIRONMENT_TYPE`.

Twilio ships in dry-run: the whole notification workflow runs and logs, but
nothing is sent until real credentials replace the empty constants and
`GRAMO_SMS_DRY_RUN` is set to `false`.

## Known constraints

- **WordPress page slugs are globally unique**, so a translation pair cannot
  share one. The Spanish menu page owns `menu`; its English pair is
  `our-menu`, and `src/i18n/routes.ts` points at the real URL. If you add a
  pair whose two languages want the same slug, WordPress will silently append
  `-2` — check the route map afterwards.
- **NGINX gzip is enabled server-wide** through `/etc/nginx/conf.d/zz-gzip.conf`
  (cPanel ships it commented out in `nginx.conf`, which it regenerates). This
  affects every vhost on the box, not just Gramo.
- `public_html/.htaccess` carries the compression, caching and security headers
  for the static site; `public_cms/.htaccess` carries the WordPress rewrite
  block. Both are server-owned and not deployed from the repo — recreate them
  from this document if the docroots are ever rebuilt.
