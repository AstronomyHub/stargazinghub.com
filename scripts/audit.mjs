import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const DIST_DIR = 'dist';
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

console.log('🔍 Starting Strict Audit for Stargazing Hub...\n');

if (!fs.existsSync(INDEX_HTML)) {
  console.error('❌ CRITICAL: Build output not found!');
  process.exit(1);
}

const html = fs.readFileSync(INDEX_HTML, 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

let score = {
  performance: 100,
  accessibility: 100,
  bestPractices: 100,
  seo: 100
};

// --- 1. PERFORMANCE AUDIT ---
console.log('⚡️ Checking Performance...');
// Check for WebP usage
const images = doc.querySelectorAll('img');
let webpCount = 0;
let jpgCount = 0;
let missingAlt = 0;

images.forEach(img => {
  if (img.src.endsWith('.webp')) webpCount++;
  if (img.src.endsWith('.jpg') || img.src.endsWith('.png')) jpgCount++;
  if (!img.alt) missingAlt++;
});

console.log(`   - Found ${webpCount} WebP images`);
console.log(`   - Found ${jpgCount} Legacy images (PNG/JPG)`);

if (webpCount === 0) {
  console.log('   ❌ FAIL: No WebP images found in HTML (Did you rebuild?)');
  score.performance -= 20;
} else if (jpgCount > 5) { // Allow a few icons
  console.log('   ⚠️ WARN: Still using many legacy formats');
  score.performance -= 5;
} else {
  console.log('   ✅ PASS: Modern image formats used');
}

// Check LCP Image Size (approximate check of the file)
const heroImage = images[0]?.src; // Assuming first image is hero
if (heroImage && !heroImage.startsWith('http')) {
  const imgPath = path.join('dist', heroImage);
  if (fs.existsSync(imgPath)) {
    const stats = fs.statSync(imgPath);
    const sizeKB = stats.size / 1024;
    console.log(`   - Hero Image Size: ${sizeKB.toFixed(2)} KB`);
    if (sizeKB > 100) {
      console.log('   ⚠️ WARN: LCP Image > 100KB');
      score.performance -= 5;
    } else {
      console.log('   ✅ PASS: LCP Image optimized (<100KB)');
    }
  }
}

// --- 2. ACCESSIBILITY AUDIT ---
console.log('\n♿️ Checking Accessibility...');
if (missingAlt > 0) {
  console.log(`   ❌ FAIL: ${missingAlt} images missing 'alt' text`);
  score.accessibility -= 10;
} else {
  console.log('   ✅ PASS: All images have alt text');
}

const htmlLang = doc.documentElement.getAttribute('lang');
if (htmlLang) {
  console.log(`   ✅ PASS: HTML lang attribute present (${htmlLang})`);
} else {
  console.log('   ❌ FAIL: HTML lang attribute missing');
  score.accessibility -= 10;
}

const metaViewport = doc.querySelector('meta[name="viewport"]');
if (metaViewport) {
  console.log('   ✅ PASS: Viewport meta tag present');
} else {
  console.log('   ❌ FAIL: Viewport meta tag missing');
  score.accessibility -= 10; // Also affects Best Practices
}

// --- 3. SEO AUDIT ---
console.log('\n🔍 Checking SEO...');
const title = doc.querySelector('title');
const description = doc.querySelector('meta[name="description"]');
const canonical = doc.querySelector('link[rel="canonical"]');
const robots = fs.existsSync(path.join(DIST_DIR, 'robots.txt'));
const sitemap = fs.existsSync(path.join(DIST_DIR, 'sitemap-index.xml'));

if (title && title.textContent.length > 0) console.log('   ✅ PASS: Title tag present');
else { console.log('   ❌ FAIL: Title missing'); score.seo -= 10; }

if (description) console.log('   ✅ PASS: Meta description present');
else { console.log('   ❌ FAIL: Description missing'); score.seo -= 10; }

if (canonical) console.log('   ✅ PASS: Canonical link present');
else { console.log('   ❌ FAIL: Canonical missing'); score.seo -= 10; }

if (robots) console.log('   ✅ PASS: robots.txt found');
else { console.log('   ❌ FAIL: robots.txt missing'); score.seo -= 5; }

if (sitemap) console.log('   ✅ PASS: sitemap found');
else { console.log('   ❌ FAIL: sitemap missing'); score.seo -= 5; }

// --- 4. BEST PRACTICES ---
console.log('\n🏆 Checking Best Practices...');
// Check for console.log/errors left in built JS (simplified check)
const jsFiles = fs.readdirSync(path.join(DIST_DIR, '_astro')).filter(f => f.endsWith('.js'));
let hasConsoleLog = false;
jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(DIST_DIR, '_astro', file), 'utf8');
  if (content.includes('console.log(')) hasConsoleLog = true;
});

if (hasConsoleLog) {
  console.log('   ⚠️ WARN: console.log found in production JS');
  // strict lighthouse doesn't always fail this, but it's bad practice
} else {
  console.log('   ✅ PASS: No console.log in bundles');
}

// Check JSON-LD
const jsonLd = doc.querySelector('script[type="application/ld+json"]');
if (jsonLd) {
    console.log('   ✅ PASS: JSON-LD Structured Data present');
} else {
    console.log('   ❌ FAIL: JSON-LD missing');
    score.seo -= 5;
}


// --- SUMMARY ---
console.log('\n📊 PREDICTED LIGHTHOUSE SCORES:');
console.log(`   Performance:   ${score.performance}`);
console.log(`   Accessibility: ${score.accessibility}`);
console.log(`   Best Practices:${score.bestPractices}`);
console.log(`   SEO:           ${score.seo}`);

if (score.performance === 100 && score.accessibility === 100 && score.seo === 100) {
  console.log('\n🎉 CONGRATS! Site is ready for a perfect score.');
} else {
  console.log('\n⚠️ Issues found. See logs above.');
}
