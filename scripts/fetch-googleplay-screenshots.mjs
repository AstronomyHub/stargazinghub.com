// 从 Google Play 页面提取并下载高清截图
// 使用 w2560-h1440-rw 参数获取完整图片

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const languageMap = {
  'en': 'en',
  'zh': 'zh_CN',
  'zh-tw': 'zh_TW',
  'de': 'de',
  'ja': 'ja',
  'ko': 'ko',
  'fr': 'fr',
  'es': 'es',
  'it': 'it',
  'ru': 'ru',
  'nl': 'nl',
  'pl': 'pl'
};

async function fetchGooglePlayScreenshots(hl) {
  const url = `https://play.google.com/store/apps/details?id=com.twtapp&hl=${hl}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    // 提取所有截图 URL
    const screenshotRegex = /https:\/\/play-lh\.googleusercontent\.com\/([a-zA-Z0-9_-]+)=w526-h296-rw/g;
    const matches = [...html.matchAll(screenshotRegex)];

    // 提取唯一的截图 ID
    const screenshotIds = [...new Set(matches.map(m => m[1]))];

    return screenshotIds;
  } catch (error) {
    console.error(`  ✗ Error fetching for ${hl}:`, error.message);
    return [];
  }
}

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return { success: true, size: buffer.byteLength };
  } catch (error) {
    console.error(`    ✗ Failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  const publicDir = path.join(__dirname, '../public/images/screenshots');

  console.log('🌐 Fetching Google Play screenshots from all language pages...\n');

  const screenshotConfig = {};
  const allScreenshotIds = {};

  // 第一步：获取所有语言的截图 ID
  for (const [langCode, hlParam] of Object.entries(languageMap)) {
    console.log(`🔍 Fetching ${langCode} (hl=${hlParam}) screenshot IDs...`);

    const screenshotIds = await fetchGooglePlayScreenshots(hlParam);
    allScreenshotIds[langCode] = screenshotIds;

    console.log(`  Found ${screenshotIds.length} unique screenshots\n`);
  }

  // 第二步：下载高清截图
  console.log('\n📥 Downloading HD screenshots (2560x1440)...\n');

  for (const [langCode, screenshotIds] of Object.entries(allScreenshotIds)) {
    if (screenshotIds.length === 0) {
      console.log(`⚠️  Skipping ${langCode} - no screenshots found\n`);
      continue;
    }

    const langDir = path.join(publicDir, `${langCode}-googleplay`);

    // 创建目录
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    const files = [];
    let totalSize = 0;

    for (let i = 0; i < Math.min(screenshotIds.length, 8); i++) {
      const screenshotId = screenshotIds[i];
      const filename = `googleplay-${i + 1}.jpg`;
      const filepath = path.join(langDir, filename);

      // 高清 URL
      const hdUrl = `https://play-lh.googleusercontent.com/${screenshotId}=w2560-h1440-rw`;

      console.log(`  ${langCode}: Downloading ${filename}...`);
      const result = await downloadImage(hdUrl, filepath);

      if (result.success) {
        const sizeKB = Math.round(result.size / 1024);
        totalSize += sizeKB;
        files.push(`/images/screenshots/${langCode}-googleplay/${filename}`);
        console.log(`    ✓ ${filename} (${sizeKB}KB)`);
      }
    }

    screenshotConfig[langCode] = {
      source: 'googleplay',
      count: files.length,
      files,
      totalSize: `${Math.round(totalSize / 1024 * 10) / 10}MB`,
      dimensions: '2560x1440',
      orientation: 'landscape'
    };

    console.log(`  ✅ ${langCode}: ${files.length} files, ${Math.round(totalSize / 1024 * 10) / 10}MB\n`);

    // 避免请求过快
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // 保存配置
  console.log('💾 Saving Google Play screenshot configuration...\n');

  const configPath = path.join(__dirname, '../src/googleplay-screenshots.config.json');
  fs.writeFileSync(configPath, JSON.stringify(screenshotConfig, null, 2));

  console.log(`  ✅ Configuration saved to: googleplay-screenshots.config.json\n`);

  // 比较各语言的截图是否不同
  console.log('📊 Comparing screenshots across languages:\n');
  const enIds = allScreenshotIds['en'];
  Object.entries(allScreenshotIds).forEach(([lang, ids]) => {
    if (lang === 'en') return;

    const sameCount = ids.filter(id => enIds.includes(id)).length;
    const different = sameCount < ids.length;

    console.log(`  ${lang}: ${different ? '✓ Different' : '✗ Same'} (${sameCount}/${ids.length} match English)`);
  });

  console.log('\n🎉 Download complete!');
  console.log('\n📝 Note: Google Play screenshots are landscape (2560x1440, 16:9 ratio).');
  console.log('   Current phone frame is portrait (9:16 ratio).');
  console.log('   Consider creating a landscape showcase component or using a different frame style.');
}

main().catch(console.error);
