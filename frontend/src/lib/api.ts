/**
 * Shared REST base for the gramo/v1 endpoints (inquiry + order).
 *
 * The base URL works in both WordPress permalink styles:
 *   pretty     — https://cms.gramo.cafe/wp-json/gramo/v1
 *   rest_route — http://localhost:8888/index.php?rest_route=/gramo/v1
 *
 * In both cases appending `/inquiry` (or `/order`) directly to the trimmed
 * base yields a valid URL: for the rest_route style the query param simply
 * becomes `rest_route=/gramo/v1/inquiry`, which WordPress resolves the same
 * as the pretty path.
 */

const DEFAULT_BASE = 'http://localhost:8888/index.php?rest_route=/gramo/v1';

export function apiUrl(path: string): string {
  const base = (process.env.GATSBY_API_URL ?? DEFAULT_BASE).replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** POST a JSON payload; resolves the parsed body, rejects on network/HTTP error. */
export async function postJson<T>(path: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`gramo api ${path} failed: ${String(response.status)}`);
  }
  return (await response.json()) as T;
}
