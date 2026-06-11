import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

if (process.env.ALLOW_LOCAL_PROMO_SCREENSHOTS !== '1') {
  console.error([
    'Refusing to overwrite Google Play-derived website screenshots.',
    'This script renders local promo overlays and writes into src/assets/screenshots/*-googleplay.',
    'Set ALLOW_LOCAL_PROMO_SCREENSHOTS=1 only when intentionally replacing the checked-in Google Play assets.',
  ].join('\n'));
  process.exit(1);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');

const ascPromoDir =
  process.env.ASC_PROMO_DIR ||
  '/Users/xuchangrong/development/twt_flutter/.asc';
const sourcePromoDir =
  process.env.SOURCE_PROMO_DIR ||
  '/Users/xuchangrong/development/twt_flutter/screenshots/preview/zh-Hans-iphone69/mainland_1080x1920';

const outputRoot = path.join(repoRoot, 'src/assets/screenshots');
const publicEnOutput = path.join(repoRoot, 'public/images/screenshots/en-googleplay');

const localeMap = [
  ['en', 'en-US'],
  ['zh', 'zh-Hans'],
  ['zh-tw', 'zh-Hant'],
  ['de', 'de-DE'],
  ['es', 'es-ES'],
  ['fr', 'fr-FR'],
  ['it', 'it'],
  ['ja', 'ja'],
  ['ko', 'ko'],
  ['nl', 'nl-NL'],
  ['pl', 'pl'],
  ['ru', 'ru'],
];

const xmlEscape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const isCjk = (char) => /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff\uac00-\ud7af]/u.test(char);
const isWide = (char) => isCjk(char) || /[А-Яа-яЁё]/u.test(char);

const measureText = (text, fontSize) => {
  let width = 0;
  for (const char of text) {
    if (char === ' ') {
      width += fontSize * 0.32;
    } else if (isCjk(char)) {
      width += fontSize * 0.98;
    } else if (isWide(char)) {
      width += fontSize * 0.64;
    } else if (/[A-Z0-9]/.test(char)) {
      width += fontSize * 0.62;
    } else {
      width += fontSize * 0.52;
    }
  }
  return width;
};

const tokenize = (text) => {
  if (!text.includes(' ') || [...text].some(isCjk)) {
    return [...text];
  }
  return text.split(/(\s+)/).filter(Boolean);
};

const wrapAtSize = (text, fontSize, maxWidth) => {
  const tokens = tokenize(text);
  const lines = [];
  let line = '';

  for (const token of tokens) {
    const separator = line && !/^\s+$/.test(token) && ![...line].some(isCjk) ? '' : '';
    const next = `${line}${separator}${token}`;
    if (line && measureText(next.trim(), fontSize) > maxWidth) {
      lines.push(line.trim());
      line = token.trimStart();
    } else {
      line = next;
    }
  }

  if (line.trim()) {
    lines.push(line.trim());
  }

  return lines;
};

const fitLines = (text, baseFontSize, minFontSize, maxWidth, maxLines) => {
  for (let size = baseFontSize; size >= minFontSize; size -= 2) {
    const lines = wrapAtSize(text, size, maxWidth);
    if (lines.length <= maxLines && lines.every((line) => measureText(line, size) <= maxWidth)) {
      return { lines, size };
    }
  }

  const size = minFontSize;
  const rawLines = wrapAtSize(text, size, maxWidth);
  const lines = rawLines.slice(0, maxLines);
  if (rawLines.length > maxLines) {
    let last = lines.at(-1) || '';
    while (last.length > 1 && measureText(`${last}…`, size) > maxWidth) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = `${last}…`;
  }
  return { lines, size };
};

const tspans = (lines, x, firstY, fontSize, lineHeight) =>
  lines
    .map((line, index) => {
      const y = index === 0 ? firstY : firstY + index * lineHeight;
      return `<tspan x="${x}" y="${y}">${xmlEscape(line)}</tspan>`;
    })
    .join('');

const localeFontFamily = (siteLang) => {
  if (siteLang === 'ja') {
    return '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "PingFang SC", sans-serif';
  }
  if (siteLang === 'ko') {
    return '"Apple SD Gothic Neo", "Nanum Gothic", "PingFang SC", sans-serif';
  }
  if (siteLang === 'zh' || siteLang === 'zh-tw') {
    return '"PingFang SC", "PingFang TC", "Songti SC", "Songti TC", sans-serif';
  }
  return '"SF Pro Display", "Avenir Next", "Helvetica Neue", Arial, sans-serif';
};

const buildOverlaySvg = ({ siteLang, copy }) => {
  const x = 118;
  const maxWidth = 845;
  const title = fitLines(copy.title, 72, 54, maxWidth, 2);
  const subtitle = fitLines(copy.subtitle, 36, 29, maxWidth, 2);
  const titleLineHeight = Math.round(title.size * 1.12);
  const subtitleLineHeight = Math.round(subtitle.size * 1.24);
  const titleStartY = 168;
  const subtitleStartY = titleStartY + titleLineHeight * title.lines.length + 28;
  const accentY = subtitleStartY + subtitleLineHeight * subtitle.lines.length + 44;
  const fontFamily = localeFontFamily(siteLang);

  return `
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#030713" stop-opacity="1"/>
      <stop offset="0.74" stop-color="#030713" stop-opacity="1"/>
      <stop offset="1" stop-color="#030713" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7dd3fc"/>
      <stop offset="0.5" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#f0abfc"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.42"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="1080" height="520" fill="url(#topFade)"/>
  <circle cx="875" cy="130" r="180" fill="#0ea5e9" opacity="0.08"/>
  <circle cx="210" cy="80" r="150" fill="#a855f7" opacity="0.08"/>
  <g font-family='${fontFamily}' filter="url(#softShadow)">
    <text x="${x}" y="96" font-size="31" font-weight="700" letter-spacing="0" fill="#9bdcff">${xmlEscape(copy.tag)}</text>
    <text font-size="${title.size}" font-weight="800" letter-spacing="0" fill="#ffffff">
      ${tspans(title.lines, x, titleStartY, title.size, titleLineHeight)}
    </text>
    <text font-size="${subtitle.size}" font-weight="500" letter-spacing="0" fill="#d9e7ff">
      ${tspans(subtitle.lines, x, subtitleStartY, subtitle.size, subtitleLineHeight)}
    </text>
  </g>
  <rect x="${x}" y="${accentY}" width="210" height="5" rx="2.5" fill="url(#accent)" opacity="0.95"/>
</svg>`;
};

const renderScreenshot = async ({ inputPath, outputPath, siteLang, copy }) => {
  const overlay = Buffer.from(buildOverlaySvg({ siteLang, copy }));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath)
    .resize(1080, 1920, { fit: 'cover' })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 86, effort: 5 })
    .toFile(outputPath);
};

const readPromoCopy = async (ascLocale) => {
  const jsonPath = path.join(ascPromoDir, `promo-screenshots.${ascLocale}.json`);
  const parsed = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  if (!Array.isArray(parsed.recipe?.copy)) {
    throw new Error(`Missing recipe.copy in ${jsonPath}`);
  }
  return parsed.recipe.copy;
};

for (const [siteLang, ascLocale] of localeMap) {
  const copyItems = await readPromoCopy(ascLocale);
  const outputDir = path.join(outputRoot, `${siteLang}-googleplay`);

  for (const [index, copy] of copyItems.entries()) {
    const inputPath = path.join(sourcePromoDir, copy.file);
    const outputPath = path.join(outputDir, `googleplay-${index + 1}.webp`);
    await renderScreenshot({ inputPath, outputPath, siteLang, copy });
  }

  console.log(`Generated ${copyItems.length} screenshots for ${siteLang} from ${ascLocale}`);
}

await fs.rm(publicEnOutput, { recursive: true, force: true });
await fs.mkdir(publicEnOutput, { recursive: true });
for (let index = 1; index <= 10; index += 1) {
  await fs.copyFile(
    path.join(outputRoot, `en-googleplay/googleplay-${index}.webp`),
    path.join(publicEnOutput, `googleplay-${index}.webp`),
  );
}
console.log('Synced public English screenshots.');
