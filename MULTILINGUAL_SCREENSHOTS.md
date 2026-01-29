# 🌐 多语言截图功能实现完成

## ✅ 完成的工作

### 1. Google Play 截图分析
- Google Play 截图是**横屏格式**（526x296px，16:9 比例）
- 所有语言使用**相同的截图**
- 不适合我们的竖屏手机框架

### 2. App Store 截图分析
- App Store 截图是**竖屏格式**（392x696px，9:16 比例）
- 发现**中文简体（cn）有独特的截图**：
  - 6 张截图（比其他地区少 2 张）
  - PNG 格式，文件更大（175-314KB vs 60-75KB）
  - 内容针对中国大陆用户优化
- **其他 11 种语言共享同一套英文截图**（8 张 JPG）

### 3. 截图下载和配置
创建了智能下载脚本 `download-regional-screenshots.mjs`：

**下载的截图：**
- `/public/images/screenshots/en/` - 英文截图（5 张 JPG）
- `/public/images/screenshots/zh/` - 中文截图（5 张 PNG）
- 其他语言通过**符号链接**指向英文版

**配置文件：**
- `/src/screenshots.config.json` - 各语言截图路径映射

### 4. Hero 组件更新
更新了 Hero 组件以支持语言特定的截图：

**Props：**
```typescript
interface Props {
  t: any;
  lang?: string;  // 新增：语言代码
}
```

**逻辑：**
1. 读取 `screenshots.config.json`
2. 根据语言代码获取对应截图
3. 如果没有该语言的截图，使用英文截图

### 5. 页面更新
所有语言页面已更新，传递 `lang` 参数：

```astro
<Hero t={t} lang={lang} />
```

---

## 📁 文件结构

```
public/images/screenshots/
├── en/                    # 英文截图（实际文件）
│   ├── appstore-1.jpg     (68KB)
│   ├── appstore-2.jpg     (65KB)
│   ├── appstore-3.jpg     (60KB)
│   ├── appstore-4.jpg     (67KB)
│   └── appstore-5.jpg     (75KB)
├── zh/                    # 中文截图（实际文件）
│   ├── appstore-1.png     (175KB)
│   ├── appstore-2.png     (280KB)
│   ├── appstore-3.png     (218KB)
│   ├── appstore-4.png     (314KB)
│   └── appstore-5.png     (259KB)
├── zh-tw -> en            # 繁体中文（符号链接）
├── de -> en               # 德语
├── ja -> en               # 日语
├── ko -> en               # 韩语
├── fr -> en               # 法语
├── es -> en               # 西班牙语
├── it -> en               # 意大利语
├── ru -> en               # 俄语
├── nl -> en               # 荷兰语
├── pl -> en               # 波兰语
└── region-mapping.json    # 区域映射数据

src/
├── screenshots.config.json  # 截图配置文件
├── components/
│   └── Hero.astro         # 已更新：支持 lang prop
└── pages/
    ├── index.astro        # 已更新：传递 lang='en'
    └── [lang]/index.astro # 已更新：传递 lang
```

---

## 🎯 截图详情

### 中文简体（zh）- 独特截图
- **格式**：PNG
- **尺寸**：392x696px（9:16）
- **数量**：5 张
- **特点**：文件更大，可能包含中文字符，针对大陆用户优化

### 其他所有语言 - 英文截图
- **格式**：JPG
- **尺寸**：392x696px（9:16）
- **数量**：5 张
- **特点**：国际通用，所有非中文用户看到相同的截图

---

## 🔧 技术实现

### 1. 符号链接优化
使用符号链接避免重复存储相同的截图：
- 节省磁盘空间（10 个语言 × ~340KB = 3.4MB）
- 统一维护（更新英文截图即可影响所有共享语言）

### 2. 配置驱动
通过 JSON 配置文件管理截图路径，易于维护：
```json
{
  "en": {
    "count": 5,
    "files": [
      "/images/screenshots/en/appstore-1.jpg",
      ...
    ]
  },
  "zh": {
    "count": 5,
    "files": [
      "/images/screenshots/zh/appstore-1.png",
      ...
    ]
  }
}
```

### 3. 自动降级
如果某语言没有配置截图，自动使用英文版：
```typescript
const screenshots = screenshotsConfig[lang]?.files ||
                    screenshotsConfig['en'].files;
```

---

## 🌍 支持的语言

| 语言代码 | 语言名称 | 截图来源 | 特殊说明 |
|---------|---------|---------|---------|
| en | 英语 | 英文版 | 默认截图 |
| zh | 中文简体 | 独立截图 | PNG 格式，更大 |
| zh-tw | 中文繁体 | 英文版 | - |
| de | 德语 | 英文版 | - |
| ja | 日语 | 英文版 | - |
| ko | 韩语 | 英文版 | - |
| fr | 法语 | 英文版 | - |
| es | 西班牙语 | 英文版 | - |
| it | 意大利语 | 英文版 | - |
| ru | 俄语 | 英文版 | - |
| nl | 荷兰语 | 英文版 | - |
| pl | 波兰语 | 英文版 | - |

---

## 🚀 访问测试

开发服务器运行在：**http://localhost:4323/**

测试不同语言：
- 英文：http://localhost:4323/
- 中文简体：http://localhost:4323/zh/
- 中文繁体：http://localhost:4323/zh-tw/
- 德语：http://localhost:4323/de/
- 其他语言...

---

## 📝 后续优化建议

### 1. 添加更多语言的独特截图
如果未来某些语言需要本地化截图：
1. 准备该语言的截图
2. 放入 `/public/images/screenshots/{lang}/`
3. 更新 `screenshots.config.json`

### 2. Google Play 截图处理
当前 Google Play 截图已下载但未使用（横屏格式）。可以考虑：
- 创建横屏展示组件（平板/桌面视图）
- 用于 Features Section 或其他区域

### 3. 图片优化
- 中文 PNG 截图较大，可考虑转换为 WebP
- 添加响应式图片加载
- 实现懒加载

### 4. A/B 测试
可以针对不同市场使用不同的截图组合，通过配置文件轻松管理。

---

## ✨ 总结

✅ **已完成**：
- 从 App Store 获取所有语言的截图信息
- 下载中文独特截图（5 张 PNG）
- 下载英文通用截图（5 张 JPG）
- 其他语言使用符号链接共享英文截图
- 更新 Hero 组件支持语言参数
- 更新所有页面传递语言代码
- 创建截图配置文件

✅ **核心特性**：
- 中文用户看到专属中文截图
- 其他语言用户看到英文截图
- 通过符号链接优化存储
- 配置驱动，易于维护
- 自动降级到英文截图

🚀 **网站现在支持 12 种语言，每种语言都能展示合适的截图！**
