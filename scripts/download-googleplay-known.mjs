// 使用已知的 Google Play 截图 URL 下载高清版本
// 从 webReader 获取的实际 URL

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 从 webReader 实际获取的截图 URL（去掉尺寸参数）
const screenshotUrls = {
  'ja': [
    'F5LkEA0YFe5ihJ3qinvJnUL8xlmg8GQSPwUHALbTW6OuiHOKK9-8SmAdbCrTM04sv3eY7bJ7GstcN_SvKybWug',
    'JmVEV10WkdI0B91zaqnJNhPAaECxH-ncE7d6LtjGUK8hRa2H_gSSKpx0oEtJcNB_SYK35Z17RDwyeyGd6A7g',
    'qSvaFm8M3Ct9iipcdUq6hS_kthLEoD5jwnwHKASwm2jQfWaNnzqjNIj9hrhHQYs1p3PwSnAFgW9oQl7keRSJ',
    'SLi6noPSjMNMHIf_zHiAb2Nw8Fd0DxSFijBMPXfa8vF87O8fpNylnx0dBAMHlo3xtnUxVQWpUIbn-IwhaE_tQg',
    'RYR2l-6Bhk2NRTqc4DAg2Pcd7VB29ArpVs-cj_xmiEEH5SMSixdui6-1JfYZtCw0ck_FvTF0KVJxdlfxn9ON',
    'qhkm6l9YToHYrcuMWy2HplwhoRlQLyKxGaWxzLpcp_ZtXBMJZJcuM5RHhs_7EHxQ1ev6toq_8H_YsKEAyJJQ3g',
    '_WZ3nczQ56aiVlcte7JMZsQ-jgwkJE1EAJ_JNVWZQHOfSjajRWHz1Vxbn4_L9IgPrQx2bzvA_hCJFOydg4a9xg',
    'RwXuIoT3m5x_8XJcpYwb6fDEcyUihFMzauLO44n_Na2WYSFUSdJocfuUjqFWvXMJLy3B46OOxAlpZA3PUIZc'
  ],
  'de': [
    'FtFOzfluQpVxfds_3ycKRoMefSRYBihWP6AXu9wnVO_FcegdiYnA7FK1gZ6taH_b6jI5Y-a3UmTj0EQpHyKPpv8',
    'Ll-ZaqJywBSCrDR-hqyEBpQaDzppmVSQ4sUaawwWNX1B12Hl9lYQQvVdbvGFR3L7w_uScS_bTa50YcsBrZ7kpA',
    'hfZAtgK4792RyHv0Fr-jHqimqpaApOHPiQ8z5C_q0dJWxiJTiSY6sajQvGzVdUJorVWVcbya6ORHJAB53ZMikQ',
    'Op9GHdglvsk-ufy3_mwd4d4YJ0tg-WYnzrdrI3uxJKFtGbLdJ0608O0FZrYej0hCQRKwA_RIvvvbLKWyQ8u6',
    'f6DHP1YbYeItijwqkOSrWKSlE1AHquO9cLU68cjl1IRccZPUQbXTAveb5k7IQ5PymNCgMHbtv4q4sl6Eweq_',
    'osQoxwM_Us_jePP4Ak8kup4qCNKqB3mx8CGGHu4IA2XJh7iS5TqSd-4GJnM0oQ-NKrVmBymCUCDKTLoo7KV-8g',
    'yAbp78_ndyshaAIuHypr7AElyagwZID6B9eSKXfZQlz7kKTKF4d2SVprDa3pdhCKujWloIRL6K9mn4m0wmoM',
    'SX0Fj_YIVRpzOfHDLhtkI3g6PHQbyNk1I5DoTnr3vSKFNXCgHOy4P5N-34gYSTBaFkmWEJXMJtjbZM5nyU-k'
  ],
  'ko': [
    'Kkhd7-o9WTJ7WKVTbQG-pa7vdnQTonEYUE1hG8kns2jO-IloUF90YlVvKkb_BBATIV9um8RvMVDd455MG1cAHpE',
    'vQogSpOnz8rgkQ1OWpfgVOuPE0xW1UWrvbvC4t5xvL6lY7H9tl1zGnIAM2UGZTmGBdZ6kgd-i-d813xqsxPm',
    '-6Q4NXBwEaS83PSyRnGgUjZN3OWRQkwVk65YuI-CqDqeYXBZj3ULt3jvrRbrlFnkMvAMLfOSX1MkJz04KvA73ts',
    'ONVxKM_pCsmKMuztlXCHCHqF6Hqqw2K_Rk-ImPafh1x3_y6ntk5digoRO0PxsrOiz8zS4wuBpK3jvMGdDtQBjuw',
    'GtjuRPVOnn1yixxThoGv1p5Jj0I6cpxmWzCe0pfAlQvqhNPtlgScr301WYKq-X9MSuPdl6sZWEa_yXDdzkaPCQ8',
    'mX_MJiJDSxLPvHHR1WlouVj1fMCRjVp6KN2ePMde9aSL-sbZRe9xS3S-LVQQD_yfmD_nGhnQN4k0Ce8UGzLh-w',
    'gr78ScFpqhT_beSC-R_6E14NCzcKX4ZCLzoye4T_uIfp-p4zLucNBKfNzRDd87roaRoMHRRC2Yg4V_38XDbHuw',
    'QsZXsByxLKSvOg9plzmuhRM8WURASo7KeW0E5M9Y_4H7PvQZkxwpPTMdaz15mW1LTXM85TlAV9VLThFswlakIQ'
  ]
};

// 其他语言使用日语截图（作为默认）
const defaultScreenshotIds = screenshotUrls['ja'];

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

  console.log('🌐 Downloading Google Play HD screenshots (2560x1440)...\n');

  const screenshotConfig = {};

  // 处理有特定截图的语言
  for (const [langCode, screenshotIds] of Object.entries(screenshotUrls)) {
    console.log(`📦 Processing ${langCode}...`);

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

      const result = await downloadImage(hdUrl, filepath);

      if (result.success) {
        const sizeKB = Math.round(result.size / 1024);
        totalSize += sizeKB;
        files.push(`/images/screenshots/${langCode}-googleplay/${filename}`);
        console.log(`  ✓ ${filename} (${sizeKB}KB, 2560x1440)`);
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
  console.log('💾 Saving configuration...\n');

  const configPath = path.join(__dirname, '../src/googleplay-screenshots.config.json');
  fs.writeFileSync(configPath, JSON.stringify(screenshotConfig, null, 2));

  console.log(`  ✅ Configuration saved to: googleplay-screenshots.config.json\n`);

  console.log('🎉 Download complete!');
  console.log('\n📝 Note: Google Play screenshots are landscape (2560x1440, 16:9 ratio).');
  console.log('   You need to create a landscape display component for these screenshots.');
}

main().catch(console.error);
