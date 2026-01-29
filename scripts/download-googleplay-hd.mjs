// 下载所有语言的 Google Play 高清截图
// 使用 w2560-h1440-rw 参数获取完整图片

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 语言映射到 Google Play hl 参数
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

// 从 Google Play 页面提取的截图 URL 模式
// 需要访问每个语言页面获取实际的截图 ID

// 通用截图 URL 模式（从英文页面获取）
const englishScreenshotIds = [
  'F5LkEA0YFe5ihJ3qinvJnUL8xlmg8GQSPwUHALbTW6OuiHOKK9-8SmAdbCrTM04sv3eY7bJ7GstcN_SvKybWug',
  'JmVEV10WkdI0B91zaqnJNhPAaECxH-ncE7d6LtjGUK8hRa2H_gSSKpx0oEtJcNB_SYK35Z17RDwyeyGd6A7g',
  'qSvaFm8M3Ct9iipcdUq6hS_kthLEoD5jwnwHKASwm2jQfWaNnzqjNIj9hrhHQYs1p3PwSnAFgW9oQl7keRSJ',
  'SLi6noPSjMNMHIf_zHiAb2Nw8Fd0DxSFijBMPXfa8vF87O8fpNylnx0dBAMHlo3xtnUxVQWpUIbn-IwhaE_tQg',
  'RYR2l-6Bhk2NRTqc4DAg2Pcd7VB29ArpVs-cj_xmiEEH5SMSixdui6-1JfYZtCw0ck_FvTF0KVJxdlfxn9ON',
  'qhkm6l9YToHYrcuMWy2HplwhoRlQLyKxGaWxzLpcp_ZtXBMJZJcuM5RHhs_7EHxQ1ev6toq_8H_YsKEAyJJQ3g',
  '_WZ3nczQ56aiVlcte7JMZsQ-jgwkJE1EAJ_JNVWZQHOfSjajRWHz1Vxbn4_L9IgPrQx2bzvA_hCJFOydg4a9xg',
  'RwXuIoT3m5x_8XJcpYwb6fDEcyUihFMzauLO44n_Na2WYSFUSdJocfuUjqFWvXMJLy3B46OOxAlpZA3PUIZc'
];

// 德语截图 ID
const germanScreenshotIds = [
  'FtFOzfluQpVxfds_3ycKRoMefSRYBihWP6AXu9wnVO_FcegdiYnA7FK1gZ6taH_b6jI5Y-a3UmTj0EQpHyKPpv8',
  'Ll-ZaqJywBSCrDR-hqyEBpQaDzppmVSQ4sUaawwWNX1B12Hl9lYQQvVdbvGFR3L7w_uScS_bTa50YcsBrZ7kpA',
  'hfZAtgK4792RyHv0Fr-jHqimqpaApOHPiQ8z5C_q0dJWxiJTiSY6sajQvGzVdUJorVWVcbya6ORHJAB53ZMikQ',
  'Op9GHdglvsk-ufy3_mwd4d4YJ0tg-WYnzrdrI3uxJKFtGbLdJ0608O0FZrYej0hCQRKwA_RIvvvbLKWyQ8u6',
  'f6DHP1YbYeItijwqkOSrWKSlE1AHquO9cLU68cjl1IRccZPUQbXTAveb5k7IQ5PymNCgMHbtv4q4sl6Eweq_',
  'osQoxwM_Us_jePP4Ak8kup4qCNKqB3mx8CGGHu4IA2XJh7iS5TqSd-4GJnM0oQ-NKrVmBymCUCDKTLoo7KV-8g',
  'yAbp78_ndyshaAIuHypr7AElyagwZID6B9eSKXfZQlz7kKTKF4d2SVprDa3pdhCKujWloIRL6K9mn4m0wmoM',
  'SX0Fj_YIVRpzOfHDLhtkI3g6PHQbyNk1I5DoTnr3vSKFNXCgHOy4P5N-34gYSTBaFkmWEJXMJtjbZM5nyU-k'
];

// 韩语截图 ID
const koreanScreenshotIds = [
  'Kkhd7-o9WTJ7WKVTbQG-pa7vdnQTonEYUE1hG8kns2jO-IloUF90YlVvKkb_BBATIV9um8RvMVDd455MG1cAHpE',
  'vQogSpOnz8rgkQ1OWpfgVOuPE0xW1UWrvbvC4t5xvL6lY7H9tl1zGnIAM2UGZTmGBdZ6kgd-i-d813xqsxPm',
  '-6Q4NXBwEaS83PSyRnGgUjZN3OWRQkwVk65YuI-CqDqeYXBZj3ULt3jvrRbrlFnkMvAMLfOSX1MkJz04KvA73ts',
  'ONVxKM_pCsmKMuztlXCHCHqF6Hqqw2K_Rk-ImPafh1x3_y6ntk5digoRO0PxsrOiz8zS4wuBpK3jvMGdDtQBjuw',
  'GtjuRPVOnn1yixxThoGv1p5Jj0I6cpxmWzCe0pfAlQvqhNPtlgScr301WYKq-X9MSuPdl6sZWEa_yXDdzkaPCQ8',
  'mX_MJiJDSxLPvHHR1WlouVj1fMCRjVp6KN2ePMde9aSL-sbZRe9xS3S-LVQQD_yfmD_nGhnQN4k0Ce8UGzLh-w',
  'gr78ScFpqhT_beSC-R_6E14NCzcKX4ZCLzoye4T_uIfp-p4zLucNBKfNzRDd87roaRoMHRRC2Yg4V_38XDbHuw',
  'QsZXsByxLKSvOg9plzmuhRM8WURASo7KeW0E5M9Y_4H7PvQZkxwpPTMdaz15mW1LTXM85TlAV9VLThFswlakIQ'
];

// 各语言对应的截图 ID
const languageScreenshotIds = {
  'en': englishScreenshotIds,
  'zh-tw': englishScreenshotIds, // 繁体中文使用英文截图
  'de': germanScreenshotIds,
  'ja': englishScreenshotIds, // 日语使用英文截图 ID
  'ko': koreanScreenshotIds,
  // 其他语言使用英文截图
  'fr': englishScreenshotIds,
  'es': englishScreenshotIds,
  'it': englishScreenshotIds,
  'ru': englishScreenshotIds,
  'nl': englishScreenshotIds,
  'pl': englishScreenshotIds
};

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

  console.log('🌐 Downloading Google Play HD screenshots for all languages...\n');

  const screenshotConfig = {};

  for (const [langCode, hlParam] of Object.entries(languageMap)) {
    console.log(`📦 Processing ${langCode} (hl=${hlParam})...`);

    const screenshotIds = languageScreenshotIds[langCode] || englishScreenshotIds;
    const langDir = path.join(publicDir, `${langCode}-googleplay`);

    // 创建目录
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    const files = [];
    let totalSize = 0;

    for (let i = 0; i < screenshotIds.length; i++) {
      const screenshotId = screenshotIds[i];
      const filename = `googleplay-${i + 1}.jpg`;
      const filepath = path.join(langDir, filename);

      // 高清 URL
      const hdUrl = `https://play-lh.googleusercontent.com/${screenshotId}=w2560-h1440-rw`;

      console.log(`  Downloading ${filename}...`);
      const result = await downloadImage(hdUrl, filepath);

      if (result.success) {
        const sizeKB = Math.round(result.size / 1024);
        totalSize += sizeKB;
        files.push(`/images/screenshots/${langCode}-googleplay/${filename}`);
        console.log(`    ✓ ${filename} (${sizeKB}KB, 2560x1440)`);
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
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // 保存配置
  console.log('💾 Saving Google Play screenshot configuration...\n');

  const configPath = path.join(__dirname, '../src/googleplay-screenshots.config.json');
  fs.writeFileSync(configPath, JSON.stringify(screenshotConfig, null, 2));

  console.log(`  ✅ Configuration saved to: googleplay-screenshots.config.json\n`);

  // 输出统计
  console.log('📊 Summary:\n');
  Object.entries(screenshotConfig).forEach(([lang, config]) => {
    console.log(`  ${lang}: ${config.count} screenshots, ${config.totalSize}, ${config.dimensions} (${config.orientation})`);
  });

  console.log('\n🎉 Google Play HD screenshots download complete!');
  console.log('\n⚠️  Note: Google Play screenshots are landscape (16:9 ratio).');
  console.log('   You may need to create a landscape display component or crop them for portrait display.');
}

main().catch(console.error);
