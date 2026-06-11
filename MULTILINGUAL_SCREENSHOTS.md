# Multilingual Screenshots

The website screenshot pipeline is now Google Play-first for promo images.
Each supported site locale has its own checked-in Google Play phone screenshot
set under `src/assets/screenshots`.

## Active Screenshot Set

- 12 site locales are configured.
- Each locale has 8 files.
- Every file is `1080x1920` WebP.
- `zh` and `zh-tw` are not English fallbacks; they are pulled from the matching
  Google Play locales.

Configured locales:

```text
en, zh, zh-tw, de, es, fr, it, ja, ko, nl, pl, ru
```

## Runtime Selection

The active landing hero receives the page language and loads:

```text
src/googleplay-screenshots.config.json -> src/assets/screenshots/{lang}-googleplay
```

Astro then optimizes those source assets into hashed files in `dist/_astro`
during `npm run build`.

## Avoiding Regressions

The old documentation described horizontal Google Play screenshots and shared
English fallbacks. That is no longer correct.

Do not restore the deleted `googleplay-9.webp` or `googleplay-10.webp` files
unless those screenshots exist again in Google Play for every configured
locale.

Do not use the local promo screenshot generator for the live website images
unless the goal is explicitly to replace Google Play images with generated
overlay images.
