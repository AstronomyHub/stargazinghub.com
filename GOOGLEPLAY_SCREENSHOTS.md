# Google Play Screenshots

This project uses the current Google Play phone screenshots as the website
promo image source.

## Current Source

- Source: Google Play Developer API
- Shape: portrait, `1080x1920`
- Format in repo: WebP
- Count: 8 screenshots per supported site locale
- Config: `src/googleplay-screenshots.config.json`
- Assets: `src/assets/screenshots/{lang}-googleplay/googleplay-{1..8}.webp`

The checked-in screenshots are locale-specific. Chinese pages must use the
Google Play `zh-CN` images, and Traditional Chinese pages must use `zh-TW`.
Do not replace them with English overlay screenshots.

## Locale Mapping

| Site locale | Google Play locale |
| --- | --- |
| `en` | `en-US` |
| `zh` | `zh-CN` |
| `zh-tw` | `zh-TW` |
| `de` | `de-DE` |
| `es` | `es-ES` |
| `fr` | `fr-FR` |
| `it` | `it-IT` |
| `ja` | `ja-JP` |
| `ko` | `ko-KR` |
| `nl` | `nl-NL` |
| `pl` | `pl-PL` |
| `ru` | `ru-RU` |

## Website Usage

`Hero.astro` reads `src/googleplay-screenshots.config.json`, resolves the
locale-specific files from `src/assets/screenshots`, and lets Astro emit the
optimized public assets during build.

`public/images/screenshots/en-googleplay` is kept only as a legacy English
public mirror. New website code should use the config-driven `src/assets`
pipeline instead.

## Maintenance Notes

Google Play currently has 8 phone screenshots per locale. If Google Play adds
or removes screenshots, update both the asset folders and the config counts.

Do not run `npm run sync:promo-screenshots` to refresh production website
images. That script generates local overlay screenshots from App Store Connect
promo-copy assets and can overwrite the Google Play-derived files. It now
requires `ALLOW_LOCAL_PROMO_SCREENSHOTS=1` before it will write anything.
