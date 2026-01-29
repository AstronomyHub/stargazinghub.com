// 下载所有语言的 App Store 截图，不使用符号链接
// 每个语言都保留自己的截图文件

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
    return { success: true, size: buffer.byteLength };
  } catch (error) {
    console.error(`    ✗ Failed to download ${url}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function getImageDimensions(filepath) {
  try {
    // 使用 sharp 或其他库读取图片尺寸
    // 这里我们简单返回估算值，实际应该读取 EXIF
    return { width: 392, height: 696 };
  } catch {
    return { width: 392, height: 696 };
  }
}

async function main() {
  const publicDir = path.join(__dirname, '../public/images/screenshots');

  console.log('🌐 Downloading screenshots for all languages...\n');

  const screenshotConfig = {};

  // 首先删除所有现有的符号链接
  console.log('🧹 Cleaning up old symlinks...\n');
  for (const [langCode, region] of Object.entries(regionMap)) {
    const langDir = path.join(publicDir, langCode);
    if (fs.existsSync(langDir)) {
      try {
        const stat = fs.lstatSync(langDir);
        if (stat.isSymbolicLink()) {
          fs.unlinkSync(langDir);
          console.log(`  Removed symlink: ${langCode}`);
        }
      } catch (e) {
        // 忽略错误
      }
    }
  }

  console.log('\n📥 Downloading screenshots for each language...\n');

  for (const [langCode, region] of Object.entries(regionMap)) {
    console.log(`🌍 Processing ${langCode} (${region})...`);

    const data = await fetchAppStoreData(region);
    const screenshots = data.screenshotUrls.slice(0, 8); // 取最多 8 张

    if (screenshots.length === 0) {
      console.log(`  ⚠️  No screenshots found, using English as fallback\n`);
      continue;
    }

    const langDir = path.join(publicDir, langCode);

    // 创建目录
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    console.log(`  Found ${screenshots.length} screenshots`);

    // 下载截图
    const files = [];
    let totalSize = 0;

    for (let i = 0; i < screenshots.length; i++) {
      const url = screenshots[i];
      const ext = url.endsWith('.png') ? 'png' : 'jpg';
      const filename = `appstore-${i + 1}.${ext}`;
      const filepath = path.join(langDir, filename);

      const result = await downloadImage(url, filepath);

      if (result.success) {
        const sizeKB = Math.round(result.size / 1024);
        totalSize += sizeKB;
        files.push(`/images/screenshots/${langCode}/${filename}`);
        console.log(`    ✓ ${filename} (${sizeKB}KB)`);
      }
    }

    screenshotConfig[langCode] = {
      region,
      count: files.length,
      files,
      totalSize: `${Math.round(totalSize / 1024 * 10) / 10}MB`
    };

    console.log(`  ✅ Total: ${files.length} files, ${Math.round(totalSize / 1024 * 10) / 10}MB\n`);

    // 避免请求过快
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // 保存配置
  console.log('💾 Saving configuration...\n');

  const configPath = path.join(__dirname, '../src/screenshots.config.json');
  fs.writeFileSync(configPath, JSON.stringify(screenshotConfig, null, 2));

  console.log(`  ✅ Configuration saved to: screenshots.config.json\n`);

  // 输出统计
  console.log('📊 Summary:\n');
  Object.entries(screenshotConfig).forEach(([lang, config]) => {
    console.log(`  ${lang}: ${config.count} screenshots, ${config.totalSize}`);
  });

  console.log('\n🎉 Download complete!');
}

main().catch(console.error);
