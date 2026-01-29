// 下载各语言/区域的 App Store 截图

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 语言映射到 App Store 区域代码
const regionMap = {
  'en': 'us',
  'zh': 'cn',
  'zh-tw': 'tw',
  'de': 'de',
  'ja': 'jp',
  'ko': 'kr',
  'fr': 'fr',
  'es': 'es',
  'it': 'it',
  'ru': 'ru',
  'nl': 'nl',
  'pl': 'pl'
};

const appId = '1478601599';

async function fetchAppStoreData(region) {
  const url = `https://itunes.apple.com/lookup?id=${appId}&country=${region}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results[0]) {
      const app = data.results[0];
      return {
        region,
        screenshotUrls: app.screenshotUrls || [],
        iPadScreenshotUrls: app.ipadScreenshotUrls || []
      };
    }

    return { region, screenshotUrls: [], iPadScreenshotUrls: [] };
  } catch (error) {
    console.error(`  ✗ Error fetching ${region}:`, error.message);
    return { region, screenshotUrls: [], iPadScreenshotUrls: [] };
  }
}

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`    ✗ Failed to download ${url}:`, error.message);
    return false;
  }
}

async function main() {
  const publicDir = path.join(__dirname, '../public/images/screenshots');

  console.log('🌐 Starting regional screenshot download...\n');

  // 首先检查哪些区域有不同的截图
  console.log('📊 Step 1: Checking which regions have unique screenshots...\n');

  const regionalData = {};

  for (const [langCode, region] of Object.entries(regionMap)) {
    const data = await fetchAppStoreData(region);

    // 只保存前5张截图
    const screenshots = data.screenshotUrls.slice(0, 5);

    regionalData[langCode] = {
      region,
      screenshotCount: screenshots.length,
      screenshots
    };

    console.log(`  ${langCode} (${region}): ${screenshots.length} screenshots`);
  }

  // 检查哪些语言有相同的截图
  console.log('\n🔍 Step 2: Identifying unique screenshot sets...\n');

  const screenshotSets = {};
  const defaultScreenshots = regionalData['en'].screenshots;

  // 创建 URL 的哈希用于比较
  const hashScreenshots = (screenshots) => screenshots.join('|');

  for (const [langCode, data] of Object.entries(regionalData)) {
    const hash = hashScreenshots(data.screenshots);

    if (!screenshotSets[hash]) {
      screenshotSets[hash] = {
        languages: [],
        screenshots: data.screenshots
      };
    }

    screenshotSets[hash].languages.push(langCode);
  }

  // 输出结果
  for (const [hash, set] of Object.entries(screenshotSets)) {
    if (set.languages.length > 1) {
      console.log(`  Same screenshots: ${set.languages.join(', ')} (${set.screenshots.length} images)`);
    } else {
      console.log(`  Unique screenshots: ${set.languages[0]} (${set.screenshots.length} images)`);
    }
  }

  // 下载截图（只为有独特截图的语言下载）
  console.log('\n📥 Step 3: Downloading unique screenshot sets...\n');

  const downloadedSets = new Set();

  for (const [langCode, data] of Object.entries(regionalData)) {
    const hash = hashScreenshots(data.screenshots);

    // 如果这个截图集已经下载过，创建符号链接
    if (downloadedSets.has(hash)) {
      const refLang = screenshotSets[hash].languages[0];
      const langDir = path.join(publicDir, langCode);

      // 删除旧目录（如果存在）
      if (fs.existsSync(langDir)) {
        fs.rmSync(langDir, { recursive: true });
      }

      // 创建符号链接
      const refDir = path.join(publicDir, refLang);
      fs.symlinkSync(refLang, langDir);

      console.log(`  ${langCode}: → Linked to ${refLang}`);
      continue;
    }

    // 下载截图
    const langDir = path.join(publicDir, langCode);

    // 删除旧目录（如果存在）
    if (fs.existsSync(langDir)) {
      if (fs.lstatSync(langDir).isSymbolicLink()) {
        fs.unlinkSync(langDir);
      } else {
        fs.rmSync(langDir, { recursive: true });
      }
    }

    fs.mkdirSync(langDir, { recursive: true });

    let downloaded = 0;
    for (let i = 0; i < data.screenshots.length; i++) {
      const url = data.screenshots[i];
      const ext = url.endsWith('.png') ? 'png' : 'jpg';
      const filename = `appstore-${i + 1}.${ext}`;
      const filepath = path.join(langDir, filename);

      const success = await downloadImage(url, filepath);
      if (success) downloaded++;
    }

    console.log(`  ${langCode}: Downloaded ${downloaded}/${data.screenshots.length} screenshots`);
    downloadedSets.add(hash);
  }

  // 保存映射配置
  console.log('\n💾 Step 4: Saving screenshot configuration...\n');

  const screenshotConfig = {};

  for (const [langCode, data] of Object.entries(regionalData)) {
    screenshotConfig[langCode] = {
      count: data.screenshotCount,
      files: data.screenshots.map((_, i) => `/images/screenshots/${langCode}/appstore-${i + 1}.jpg`)
    };
  }

  // 特殊处理中文（PNG 格式）
  if (regionalData['zh']) {
    screenshotConfig['zh'].files = regionalData['zh'].screenshots.map((url, i) => {
      const ext = url.endsWith('.png') ? 'png' : 'jpg';
      return `/images/screenshots/zh/appstore-${i + 1}.${ext}`;
    });
  }

  const configPath = path.join(__dirname, '../src/screenshots.config.json');
  fs.writeFileSync(configPath, JSON.stringify(screenshotConfig, null, 2));

  console.log(`  ✅ Configuration saved to: screenshots.config.json`);

  console.log('\n🎉 Download complete!');
  console.log('\n📊 Summary:');
  console.log(`- ${Object.keys(screenshotSets).length} unique screenshot sets`);
  console.log(`- ${Object.keys(regionalData).length} languages configured`);
}

main().catch(console.error);
