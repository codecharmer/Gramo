/**
 * Ambient module declarations for non-TS imports (SCSS modules).
 * Class maps are string records; `noUncheckedIndexedAccess` keeps dynamic
 * lookups (`styles[variant]`) honest with `?? ''` fallbacks at call sites.
 */

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export = classes;
}
