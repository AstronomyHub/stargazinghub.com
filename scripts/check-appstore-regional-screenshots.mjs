// 检查 App Store 不同区域的截图
// App Store 使用区域代码而不是语言代码

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 语言到 App Store 区域的映射
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

async function fetchScreenshotsForRegion(region) {
  const url = `https://itunes.apple.com/lookup?id=${appId}&country=${region}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results[0]) {
      const app = data.results[0];
      const screenshots = app.screenshotUrls || [];

      return {
        region,
        country: app.country || region,
        screenshotCount: screenshots.length,
        screenshots: screenshots.slice(0, 5) // 只取前5张
      };
    }

    return { region, error: 'No results' };
  } catch (error) {
    return { region, error: error.message };
  }
}

async function main() {
  console.log('🔍 Checking App Store screenshots for different regions...\n');

  const results = [];

  for (const [langCode, region] of Object.entries(regionMap)) {
    const result = await fetchScreenshotsForRegion(region);
    results.push({ langCode, ...result });
    console.log(`✓ Checked ${langCode} (${region}): ${result.screenshotCount || 0} screenshots`);
  }

  console.log('\n📊 Results Summary:\n');
  results.forEach(r => {
    console.log(`${r.langCode} (${r.region}): ${r.screenshotCount || 0} screenshots`);
    if (r.screenshots && r.screenshots.length > 0) {
      console.log(`  First: ${r.screenshots[0].substring(0, 80)}...`);
    }
  });

  // 保存结果到 JSON 文件
  const outputPath = path.join(__dirname, '../public/images/screenshots/region-mapping.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputPath}`);
}

main().catch(console.error);
