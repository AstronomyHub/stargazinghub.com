import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 语言映射：我们支持的语言 -> Google Play hl 参数
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

// Google Play 截图 URL（英文版本）
const screenshotUrls = [
  'https://play-lh.googleusercontent.com/P9_N2mbjipmRr7gCXGKt8yoCPEXlKxpY1aqeDXNcBkKlei1kVwSsaDN9DclDe6EuGUBhNk7FfLRpYE_AfA1lsg=w526-h296-rw',
  'https://play-lh.googleusercontent.com/ilzT_eb0DAsJsUcSSfcJQFntLgZPe-JFEjq8yo0K_EDcwLsv0-22qpqmMrpvrLFOIO8BGb0hJtpQiAllJ5r0=w526-h296-rw',
  'https://play-lh.googleusercontent.com/RAeGNs6_fG5tetniwv-8UpGuz0EfVS7qeIqM0xoRM5RviZqFsX09TNFR5Ezt4DL0Zp39qd-fYBH616fEElFUhA=w526-h296-rw',
  'https://play-lh.googleusercontent.com/M5oPirlCTwjvZM01grOoPiWWRD54SCSII-ABsjscmkoYZ3l7en6x8ZFnfJVHjFk-x5FDkFLkQWGStUmX46x9Fw=w526-h296-rw',
  'https://play-lh.googleusercontent.com/ZeuDH84kaZ8042HmlFL2AxPh1fD3fg_b6tPdQ68_T-Slxk24ICNaifHBydZIyB2I2jVulRWztxr8242ybhipPA=w526-h296-rw',
  'https://play-lh.googleusercontent.com/X7BgbGkvk7lwE8RG6i0UO70bG_f8d28HPZtRQTSVk-RHQiFmiFOg8grc7e9MTmuG0k7ppWnV4Uj7tf6DPIfwzCU=w526-h296-rw',
  'https://play-lh.googleusercontent.com/9Bu4g0icwHquYepPsd8JHuYS3t8vbttbHL7ZTFP_dUl2iIZ4NU4eW1GfcXUQntmR9_qjvcuFMDikQ9eY-ty1DQ=w526-h296-rw',
  'https://play-lh.googleusercontent.com/CJPQeeZKfc3j1KxFW7C1kN_mzBgFHaJb4sWRBxCS8-339VWFLqGg2BZGhBNkihBfYxD1AOYDQZrhTBh7XTqxM8o=w526-h296-rw'
];

// 下载函数
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`  ✓ Downloaded: ${path.basename(filepath)}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed to download ${url}:`, error.message);
    return false;
  }
}

// 主函数
async function main() {
  const publicDir = path.join(__dirname, '../public/images/screenshots');

  // 创建基础目录
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('🌐 Starting Google Play screenshots download...\n');

  // Google Play 截图通常是横屏的，且不同语言可能相同
  // 我们先下载英文版，然后检查其他语言是否有不同的截图

  for (const [langCode, hlParam] of Object.entries(languageMap)) {
    console.log(`📦 Processing language: ${langCode} (hl=${hlParam})`);

    const langDir = path.join(publicDir, langCode);

    // 创建语言目录
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    // 为该语言下载截图
    let downloaded = 0;
    for (let i = 0; i < screenshotUrls.length; i++) {
      const filename = `googleplay-${i + 1}.jpg`;
      const filepath = path.join(langDir, filename);

      const success = await downloadImage(screenshotUrls[i], filepath);
      if (success) downloaded++;
    }

    console.log(`  ✅ Downloaded ${downloaded}/${screenshotUrls.length} screenshots for ${langCode}\n`);

    // 避免请求过快
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('🎉 Download complete!');
  console.log('\n📊 Summary:');
  console.log('- Google Play screenshots are horizontal (526x296px, 16:9 ratio)');
  console.log('- App Store screenshots are vertical (392x696px, 9:16 ratio)');
  console.log('- You may need to adjust the display component for horizontal images');
}

main().catch(console.error);
