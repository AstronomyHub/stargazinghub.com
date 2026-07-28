# Stargazing Hub Official Website

Official website and editorial media hub for **Stargazing Hub - Sky Live**
(天文通海外版), built with Bun and Astro.

## Product surfaces

- Localized product homepage in 12 languages
- App Store editorial brief and downloadable media kit
- Search-oriented feature guides with restrained implementation detail
- Responsive, accessible static output
- Structured data, sitemap, AI-readable product summaries, and legal pages

## 🌐 Supported Languages

- English (en) - Default
- 简体中文 (zh)
- 繁體中文 (zh-tw)
- Deutsch (de)
- 日本語 (ja)
- 한국어 (ko)
- Français (fr)
- Español (es)
- Italiano (it)
- Русский (ru)
- Nederlands (nl)
- Polski (pl)

## 🚀 Quick Start

### Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Visit http://localhost:4321
```

### Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

## 📁 Project Structure

```
├── src/
│   ├── pages/              # Route pages
│   │   ├── index.astro     # English homepage (default)
│   │   ├── zh/             # Chinese Simplified
│   │   ├── zh-tw/          # Chinese Traditional
│   │   ├── de/             # German
│   │   ├── ja/             # Japanese
│   │   ├── ko/             # Korean
│   │   ├── fr/             # French
│   │   ├── es/             # Spanish
│   │   ├── it/             # Italian
│   │   ├── ru/             # Russian
│   │   ├── nl/             # Dutch
│   │   └── pl/             # Polish
│   ├── components/         # Reusable components
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── DownloadSection.astro
│   │   └── Footer.astro
│   ├── layouts/            # Layout components
│   │   └── Layout.astro
│   ├── i18n/               # Translations
│   │   └── ui.ts           # UI translation strings
│   └── styles/             # Global styles
│       └── global.css
├── public/                 # Static assets
│   └── images/
│       └── icon.png        # App icon
├── dist/                   # Build output
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── package.json            # Project dependencies

```

## Design system

The active system is documented in [DESIGN.md](./DESIGN.md). Its direction is
an architect-designed observing station: mineral-black canvas, limestone text,
brass wayfinding, a twelve-column datum grid, and generous negative space.
Real product imagery leads every major surface.

## 📱 App Links

- **App Store**: https://apps.apple.com/us/app/stargazing-hub-sky-live/id1478601599
- **Google Play**: https://play.google.com/store/apps/details?id=com.twtapp

## Tech stack

- **Runtime**: Bun
- **Framework**: Astro 5.x
- **Styling**: Global design tokens and component-scoped CSS
- **Language**: TypeScript

## 📝 Adding a New Language

1. Add translations to `src/i18n/ui.ts`
2. Create a new directory in `src/pages/{lang}/`
3. Copy `index.astro` from another language directory
4. Update the `lang` variable in the frontmatter
5. Add the language option to `Layout.astro` language selector

## 🚢 Deployment

The site builds to static HTML files in the `dist/` directory and can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📄 License

Copyright © 2025 Stargazing Hub. All rights reserved.
