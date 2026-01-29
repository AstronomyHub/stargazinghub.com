import fs from 'fs';
import path from 'path';

const languages = [
  'zh', 'zh-tw', 'de', 'ja', 'ko', 'fr', 'es', 'it', 'ru', 'nl', 'pl'
];

const pageTemplate = (lang) => `---
import Layout from '../../layouts/Layout.astro';
import Hero from '../../components/Hero.astro';
import Features from '../../components/Features.astro';
import Testimonials from '../../components/Testimonials.astro';
import DownloadSection from '../../components/DownloadSection.astro';
import Footer from '../../components/Footer.astro';
import { translations } from '../../i18n/ui';

const lang = '${lang}';
const t = translations[lang];
---

<Layout title="Stargazing Hub - Sky Live | Explore the Universe" lang={lang}>
  <main>
    <Hero t={t} lang={lang} />
    <Features t={t} />
    <Testimonials t={t} />
    <DownloadSection t={t} />
  </main>
  <Footer t={t} lang={lang} />
</Layout>
`;

// Generate pages for each language
const srcDir = new URL('../src/pages/', import.meta.url);

languages.forEach(lang => {
  const langDir = new URL(`${lang}/`, srcDir);
  const indexPath = new URL('index.astro', langDir);

  // Ensure directory exists
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  // Write the page
  fs.writeFileSync(indexPath, pageTemplate(lang), 'utf-8');
  console.log(`Generated: /${lang}/index.astro`);
});

console.log('\nAll language pages regenerated successfully!');
