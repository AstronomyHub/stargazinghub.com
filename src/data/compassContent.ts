// Compass Altimeter 产品页文案。英文先行,其余语言之后补(getCompass 回退 en)。
// 与巨大的 i18n/ui.ts 解耦:产品页字符串集中在此,便于工作流翻译。

export const compassLinks = {
  appStore: 'https://apps.apple.com/app/id6752685064',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.knockdream.compass',
  goldenHour: 'https://lightpollutionmap.app/golden-hour',
};

// 产品页将要本地化到的语言(URL:en=/compass-altimeter/,其余=/{lang}/compass-altimeter/)
export const compassLocales = ['en', 'zh', 'zh-tw', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'ru'] as const;

export const compassHreflang: Record<string, string> = {
  en: 'en', zh: 'zh-Hans', 'zh-tw': 'zh-Hant', de: 'de', es: 'es', fr: 'fr',
  it: 'it', ja: 'ja', ko: 'ko', nl: 'nl', pl: 'pl', ru: 'ru',
};

export function compassPath(lang: string): string {
  return lang === 'en' ? '/compass-altimeter/' : `/${lang}/compass-altimeter/`;
}

// 产品页的 hreflang alternate 列表(只含已生成的语言,避免指向 404)
export function compassAlternateLinks(builtLocales: readonly string[]): Array<{ hreflang: string; path: string }> {
  const links: Array<{ hreflang: string; path: string }> = [{ hreflang: 'x-default', path: '/compass-altimeter/' }];
  for (const lang of builtLocales) {
    links.push({ hreflang: compassHreflang[lang] || lang, path: compassPath(lang) });
  }
  return links;
}

export interface CompassFeature { icon: string; title: string; desc: string; }
export interface CompassWidget { img: string; title: string; desc: string; }
export interface CompassContent {
  meta: { title: string; description: string };
  eyebrow: string;
  fromTeam: string;
  title: string;
  subtitle: string;
  ctaFree: string;
  badges: string[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: CompassFeature[];
  widgetsTitle: string;
  widgetsSubtitle: string;
  widgets: CompassWidget[];
  useCasesTitle: string;
  useCases: string[];
  goldenTitle: string;
  goldenDesc: string;
  goldenCta: string;
  privacyTitle: string;
  privacyDesc: string;
  closingTitle: string;
  closingDesc: string;
  backToHub: string;
}

const en: CompassContent = {
  meta: {
    title: 'Compass Altimeter: Sun & Moon — Altitude, Compass & Golden Hour',
    description:
      'A clean, pro-grade altitude and compass app with Sun & Moon positions and golden-hour planning. GPS + barometric fusion for fast, accurate readings. Free on iOS & Android, from the Stargazing Hub team.',
  },
  eyebrow: 'Free · iOS & Android',
  fromTeam: 'From the Stargazing Hub team',
  title: 'Compass Altimeter: Sun & Moon',
  subtitle:
    'A clean, pro-grade altitude & compass tool. GPS + barometric fusion for fast, accurate live readings — built for hiking, landscape photography and stargazing.',
  ctaFree: 'Free download',
  badges: ['GPS + barometer fusion', 'True / magnetic north', 'Golden & blue hour', 'Privacy-first'],
  featuresTitle: 'Everything you need, nothing you don’t',
  featuresSubtitle: 'Precise readings and clean design — the essentials done right.',
  features: [
    { icon: 'altitude', title: 'Live altitude', desc: 'GPS + barometric fusion with a real-time accuracy readout. Set a base point to track ascent and descent.' },
    { icon: 'compass', title: 'Precise compass', desc: 'True or magnetic north with localized N/E/S/W text, subtle haptics, magnetic-interference detection and calibration tips.' },
    { icon: 'sunmoon', title: 'Sun & Moon', desc: 'Elevation and azimuth, sunrise/sunset and moonrise/moonset for any spot — plan light and shadow.' },
    { icon: 'camera', title: 'Photography aide', desc: 'Golden hour and blue hour with compass bearings, so you know exactly where the light will fall.' },
    { icon: 'coords', title: 'Coordinates', desc: 'Switch between decimal degrees and DMS, with one-tap copy for sharing or logging.' },
    { icon: 'pressure', title: 'Live pressure', desc: 'Real-time barometric pressure in hPa, mmHg, inHg or psi.' },
  ],
  widgetsTitle: 'Home-screen widgets',
  widgetsSubtitle: 'Glanceable Sun, Moon and golden-hour info, right on your home screen.',
  widgets: [
    { img: '/compass/widget-golden.png', title: 'Golden hour', desc: 'Today’s golden & blue-hour windows at a glance.' },
    { img: '/compass/widget-times.png', title: 'Sun & Moon times', desc: 'Sunrise, sunset, moonrise and moonset.' },
    { img: '/compass/widget-moon.png', title: 'Moon phase', desc: 'Current phase and illumination.' },
  ],
  useCasesTitle: 'Made for the outdoors',
  useCases: ['Hiking & exploration', 'Landscape photography timing', 'Astronomy & education', 'Travel & altitude logging'],
  goldenTitle: 'Plan the light before you go',
  goldenDesc:
    'Pair the app with our free Golden Hour & Light Direction tool — exact golden and blue-hour times plus the compass bearing of the light, for any city or spot.',
  goldenCta: 'Open the Golden Hour tool',
  privacyTitle: 'Private by design',
  privacyDesc:
    'Location is used only while you’re in the app, for altitude and Sun/Moon math — no continuous background tracking. Preferences stay on your device; no personal data is uploaded.',
  closingTitle: 'Carry the sky in your pocket',
  closingDesc: 'Altitude, direction, Sun and Moon — fast, accurate and beautifully simple.',
  backToHub: 'Stargazing Hub',
};

const zh: CompassContent = {
  "meta": {
    "title": "海拔指南针 · 日月轨迹：海拔、指南针与黄金时刻",
    "description": "简洁专业的海拔与指南针应用，集成日月位置与黄金时刻规划。GPS + 气压计融合，读数快速又精准。iOS 与 Android 免费使用，由天文通团队出品。"
  },
  "eyebrow": "免费 · iOS 与 Android",
  "fromTeam": "来自天文通团队",
  "title": "海拔指南针 · 日月轨迹",
  "subtitle": "简洁而专业的海拔与指南针工具。GPS + 气压计融合，实时读数快速精准 —— 专为徒步、风光摄影与观星打造。",
  "ctaFree": "免费下载",
  "badges": [
    "GPS + 气压计融合",
    "真北 / 磁北",
    "黄金与蓝色时刻",
    "隐私优先"
  ],
  "featuresTitle": "该有的全都有，多余的一概没有",
  "featuresSubtitle": "精准读数，简洁设计 —— 把基本功能做到位。",
  "features": [
    {
      "icon": "altitude",
      "title": "实时海拔",
      "desc": "GPS + 气压计融合，附带实时精度读数。设定基准点，随时追踪上升与下降。"
    },
    {
      "icon": "compass",
      "title": "精准指南针",
      "desc": "真北或磁北可选，方位文字本地化（东南西北），细腻震动反馈，磁干扰检测与校准提示。"
    },
    {
      "icon": "sunmoon",
      "title": "日月轨迹",
      "desc": "任意地点的太阳高度角与方位角、日出日落、月出月落 —— 提前规划光影。"
    },
    {
      "icon": "camera",
      "title": "摄影助手",
      "desc": "黄金时刻与蓝色时刻配合罗盘方位，让你精准掌握光线落点。"
    },
    {
      "icon": "coords",
      "title": "坐标显示",
      "desc": "在十进制度与 DMS 之间自由切换，一键复制，便于分享或记录。"
    },
    {
      "icon": "pressure",
      "title": "实时气压",
      "desc": "实时气压读数，支持 hPa、mmHg、inHg 或 psi。"
    }
  ],
  "widgetsTitle": "主屏小组件",
  "widgetsSubtitle": "日、月与黄金时刻信息，一眼尽收主屏。",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "黄金时刻",
      "desc": "一眼看清今日黄金与蓝色时刻时段。"
    },
    {
      "img": "/compass/widget-times.png",
      "title": "日月时刻",
      "desc": "日出、日落、月出与月落。"
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "月相",
      "desc": "当前月相与照明度。"
    }
  ],
  "useCasesTitle": "为户外而生",
  "useCases": [
    "徒步与探索",
    "风光摄影时机把握",
    "天文与科普教育",
    "旅行与海拔记录"
  ],
  "goldenTitle": "出发前，先规划好光线",
  "goldenDesc": "搭配我们免费的「黄金时刻与光线方向」工具一同使用 —— 精确查询任意城市或地点的黄金与蓝色时刻，以及光线的罗盘方位。",
  "goldenCta": "打开黄金时刻工具",
  "privacyTitle": "从设计之初守护隐私",
  "privacyDesc": "位置信息仅在你使用应用时调用，用于海拔与日月计算 —— 绝不在后台持续追踪。偏好设置保存在你的设备上，不上传任何个人数据。",
  "closingTitle": "把天空装进口袋",
  "closingDesc": "海拔、方向、太阳与月亮 —— 快速、精准，简约而美。",
  "backToHub": "天文通"
};
const zhTw: CompassContent = {
  "meta": {
    "title": "海拔指南針：太陽與月亮 — 海拔、指南針與黃金時刻",
    "description": "一款簡潔專業的海拔與指南針工具，整合太陽與月亮位置及黃金時刻規劃。GPS 加氣壓計融合，快速精準地讀取數據。iOS 與 Android 免費使用，由天文通團隊出品。"
  },
  "eyebrow": "免費 · iOS 與 Android",
  "fromTeam": "天文通團隊出品",
  "title": "海拔指南針：太陽與月亮",
  "subtitle": "簡潔又專業的海拔與指南針工具。結合 GPS 與氣壓計融合技術，即時呈現快速精準的讀數 — 專為登山健行、風景攝影與觀星打造。",
  "ctaFree": "免費下載",
  "badges": [
    "GPS 加氣壓計融合",
    "真北 / 磁北",
    "黃金與藍色時刻",
    "隱私至上"
  ],
  "featuresTitle": "該有的一應俱全，多餘的通通省略",
  "featuresSubtitle": "精準讀數搭配簡潔設計 — 把基本功做到位。",
  "features": [
    {
      "icon": "altitude",
      "title": "即時海拔",
      "desc": "GPS 加氣壓計融合，附即時精度顯示。設定基準點即可追蹤上升與下降高度。"
    },
    {
      "icon": "compass",
      "title": "精準指南針",
      "desc": "支援真北或磁北，搭配在地化的 N/E/S/W 方位文字、細膩觸覺回饋、磁場干擾偵測與校準提示。"
    },
    {
      "icon": "sunmoon",
      "title": "太陽與月亮",
      "desc": "任何地點的仰角與方位角、日出日落與月出月落 — 讓你掌握光影變化。"
    },
    {
      "icon": "camera",
      "title": "攝影助手",
      "desc": "黃金時刻與藍色時刻搭配指南針方位，讓你精準預判光線灑落的方向。"
    },
    {
      "icon": "coords",
      "title": "座標",
      "desc": "可在十進位度數與 DMS 之間切換，一鍵複製即可分享或記錄。"
    },
    {
      "icon": "pressure",
      "title": "即時氣壓",
      "desc": "即時氣壓讀數，支援 hPa、mmHg、inHg 或 psi 單位。"
    }
  ],
  "widgetsTitle": "主畫面小工具",
  "widgetsSubtitle": "太陽、月亮與黃金時刻資訊一目了然，就在你的主畫面上。",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "黃金時刻",
      "desc": "一眼掌握今日的黃金與藍色時刻時段。"
    },
    {
      "img": "/compass/widget-times.png",
      "title": "太陽與月亮時間",
      "desc": "日出、日落、月出與月落。"
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "月相",
      "desc": "目前月相與照明比例。"
    }
  ],
  "useCasesTitle": "為戶外而生",
  "useCases": [
    "登山健行與探索",
    "風景攝影時機掌握",
    "天文觀測與教學",
    "旅行與海拔記錄"
  ],
  "goldenTitle": "出發前先規劃好光線",
  "goldenDesc": "搭配我們免費的「黃金時刻與光線方向」工具 — 任何城市或地點都能查到精確的黃金與藍色時刻時間，以及光線的指南針方位。",
  "goldenCta": "開啟黃金時刻工具",
  "privacyTitle": "從設計之初就重視隱私",
  "privacyDesc": "定位資訊僅在你使用 App 時用於海拔與太陽 / 月亮運算 — 不會在背景持續追蹤。所有偏好設定都保留在你的裝置上，不會上傳任何個人資料。",
  "closingTitle": "把整片天空裝進口袋",
  "closingDesc": "海拔、方向、太陽與月亮 — 快速、精準，而且簡潔得恰到好處。",
  "backToHub": "天文通"
};
const de: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: Sonne & Mond — Höhe, Kompass & Golden Hour",
    "description": "Eine klare, professionelle Höhen- und Kompass-App mit Sonnen- und Mondständen sowie Golden-Hour-Planung. GPS + barometrische Fusion für schnelle, präzise Messwerte. Kostenlos für iOS & Android, vom Team von Stargazing Hub."
  },
  "eyebrow": "Kostenlos · iOS & Android",
  "fromTeam": "Vom Team von Stargazing Hub",
  "title": "Compass Altimeter: Sonne & Mond",
  "subtitle": "Ein klares, professionelles Höhen- & Kompass-Tool. GPS + barometrische Fusion für schnelle, präzise Live-Messwerte — gemacht zum Wandern, für die Landschaftsfotografie und Sternenbeobachtung.",
  "ctaFree": "Kostenlos herunterladen",
  "badges": [
    "GPS + Barometer-Fusion",
    "Geografischer / magnetischer Norden",
    "Golden & Blue Hour",
    "Datenschutz an erster Stelle"
  ],
  "featuresTitle": "Alles, was du brauchst — und nichts, was stört",
  "featuresSubtitle": "Präzise Messwerte und klares Design — das Wesentliche, richtig gemacht.",
  "features": [
    {
      "icon": "altitude",
      "title": "Live-Höhe",
      "desc": "GPS + barometrische Fusion mit Echtzeit-Genauigkeitsanzeige. Lege einen Bezugspunkt fest und verfolge Auf- und Abstieg."
    },
    {
      "icon": "compass",
      "title": "Präziser Kompass",
      "desc": "Geografischer oder magnetischer Norden mit lokalisierter N/O/S/W-Anzeige, dezentem haptischem Feedback, Erkennung magnetischer Störungen und Kalibrierungshinweisen."
    },
    {
      "icon": "sunmoon",
      "title": "Sonne & Mond",
      "desc": "Höhe und Azimut, Sonnenauf- und -untergang sowie Mondauf- und -untergang für jeden Ort — plane Licht und Schatten."
    },
    {
      "icon": "camera",
      "title": "Foto-Assistent",
      "desc": "Golden Hour und Blue Hour samt Kompasspeilung, damit du genau weißt, wo das Licht hinfällt."
    },
    {
      "icon": "coords",
      "title": "Koordinaten",
      "desc": "Wechsle zwischen Dezimalgrad und DMS, mit Kopieren per Fingertipp zum Teilen oder Protokollieren."
    },
    {
      "icon": "pressure",
      "title": "Live-Luftdruck",
      "desc": "Barometrischer Luftdruck in Echtzeit in hPa, mmHg, inHg oder psi."
    }
  ],
  "widgetsTitle": "Homescreen-Widgets",
  "widgetsSubtitle": "Sonne, Mond und Golden Hour auf einen Blick — direkt auf deinem Homescreen.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "Golden Hour",
      "desc": "Die Golden- & Blue-Hour-Zeitfenster von heute auf einen Blick."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "Sonnen- & Mondzeiten",
      "desc": "Sonnenaufgang, Sonnenuntergang, Mondaufgang und Monduntergang."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "Mondphase",
      "desc": "Aktuelle Phase und Beleuchtung."
    }
  ],
  "useCasesTitle": "Gemacht für draußen",
  "useCases": [
    "Wandern & Entdecken",
    "Timing für die Landschaftsfotografie",
    "Astronomie & Bildung",
    "Reisen & Höhenprotokollierung"
  ],
  "goldenTitle": "Plane das Licht, bevor du losziehst",
  "goldenDesc": "Kombiniere die App mit unserem kostenlosen Tool für Golden Hour & Lichtrichtung — exakte Golden- und Blue-Hour-Zeiten plus die Kompasspeilung des Lichts, für jede Stadt und jeden Ort.",
  "goldenCta": "Golden-Hour-Tool öffnen",
  "privacyTitle": "Datenschutz von Grund auf",
  "privacyDesc": "Dein Standort wird nur genutzt, während du die App verwendest — für Höhen- und Sonne/Mond-Berechnungen, ohne durchgehendes Tracking im Hintergrund. Deine Einstellungen bleiben auf deinem Gerät; es werden keine personenbezogenen Daten hochgeladen.",
  "closingTitle": "Trag den Himmel in deiner Tasche",
  "closingDesc": "Höhe, Richtung, Sonne und Mond — schnell, präzise und wunderbar einfach.",
  "backToHub": "Stargazing Hub"
};
const es: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: Sol y Luna — Altitud, brújula y hora dorada",
    "description": "Una app de altitud y brújula limpia y de nivel profesional, con las posiciones del Sol y la Luna y planificación de la hora dorada. Fusión de GPS y barómetro para lecturas rápidas y precisas. Gratis en iOS y Android, del equipo de Stargazing Hub."
  },
  "eyebrow": "Gratis · iOS y Android",
  "fromTeam": "Del equipo de Stargazing Hub",
  "title": "Compass Altimeter: Sol y Luna",
  "subtitle": "Una herramienta de altitud y brújula limpia y de nivel profesional. Fusión de GPS y barómetro para lecturas en vivo rápidas y precisas, pensada para el senderismo, la fotografía de paisaje y la observación de estrellas.",
  "ctaFree": "Descarga gratis",
  "badges": [
    "Fusión de GPS y barómetro",
    "Norte verdadero / magnético",
    "Hora dorada y hora azul",
    "La privacidad primero"
  ],
  "featuresTitle": "Todo lo que necesitas, nada que sobre",
  "featuresSubtitle": "Lecturas precisas y un diseño limpio: lo esencial, bien hecho.",
  "features": [
    {
      "icon": "altitude",
      "title": "Altitud en vivo",
      "desc": "Fusión de GPS y barómetro con indicador de precisión en tiempo real. Fija un punto base para seguir el ascenso y el descenso."
    },
    {
      "icon": "compass",
      "title": "Brújula precisa",
      "desc": "Norte verdadero o magnético con texto N/E/S/O localizado, vibración sutil, detección de interferencias magnéticas y consejos de calibración."
    },
    {
      "icon": "sunmoon",
      "title": "Sol y Luna",
      "desc": "Elevación y azimut, salida y puesta del Sol y de la Luna en cualquier punto: planifica la luz y las sombras."
    },
    {
      "icon": "camera",
      "title": "Asistente de fotografía",
      "desc": "Hora dorada y hora azul con orientaciones de la brújula, para saber exactamente dónde caerá la luz."
    },
    {
      "icon": "coords",
      "title": "Coordenadas",
      "desc": "Alterna entre grados decimales y DMS, con copia en un toque para compartir o registrar."
    },
    {
      "icon": "pressure",
      "title": "Presión en vivo",
      "desc": "Presión barométrica en tiempo real en hPa, mmHg, inHg o psi."
    }
  ],
  "widgetsTitle": "Widgets para la pantalla de inicio",
  "widgetsSubtitle": "El Sol, la Luna y la hora dorada de un vistazo, directamente en tu pantalla de inicio.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "Hora dorada",
      "desc": "Las ventanas de hora dorada y hora azul de hoy, de un vistazo."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "Horarios del Sol y la Luna",
      "desc": "Salida y puesta del Sol y de la Luna."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "Fase lunar",
      "desc": "Fase actual e iluminación."
    }
  ],
  "useCasesTitle": "Hecha para el aire libre",
  "useCases": [
    "Senderismo y exploración",
    "Timing para fotografía de paisaje",
    "Astronomía y educación",
    "Viajes y registro de altitud"
  ],
  "goldenTitle": "Planifica la luz antes de salir",
  "goldenDesc": "Combina la app con nuestra herramienta gratuita de Hora Dorada y Dirección de la Luz: horarios exactos de la hora dorada y la hora azul, además de la orientación de la luz en la brújula, para cualquier ciudad o lugar.",
  "goldenCta": "Abrir la herramienta de Hora Dorada",
  "privacyTitle": "Privada por diseño",
  "privacyDesc": "La ubicación se usa solo mientras estás en la app, para los cálculos de altitud y del Sol y la Luna, sin seguimiento continuo en segundo plano. Tus preferencias permanecen en tu dispositivo; no se sube ningún dato personal.",
  "closingTitle": "Lleva el cielo en tu bolsillo",
  "closingDesc": "Altitud, dirección, Sol y Luna: rápido, preciso y de una sencillez preciosa.",
  "backToHub": "Stargazing Hub"
};
const fr: CompassContent = {
  "meta": {
    "title": "Compass Altimeter : Soleil & Lune — Altitude, boussole et golden hour",
    "description": "Une application d'altitude et de boussole épurée et professionnelle, avec les positions du Soleil et de la Lune et la planification de la golden hour. Fusion GPS + baromètre pour des mesures rapides et précises. Gratuite sur iOS et Android, par l'équipe Stargazing Hub."
  },
  "eyebrow": "Gratuit · iOS et Android",
  "fromTeam": "Par l'équipe Stargazing Hub",
  "title": "Compass Altimeter : Soleil & Lune",
  "subtitle": "Un outil d'altitude et de boussole épuré et professionnel. Fusion GPS + baromètre pour des mesures en direct rapides et précises — conçu pour la randonnée, la photo de paysage et l'observation des étoiles.",
  "ctaFree": "Télécharger gratuitement",
  "badges": [
    "Fusion GPS + baromètre",
    "Nord vrai / magnétique",
    "Golden hour et blue hour",
    "Respect de la vie privée"
  ],
  "featuresTitle": "Tout ce qu'il vous faut, rien de superflu",
  "featuresSubtitle": "Des mesures précises et un design épuré — l'essentiel, bien fait.",
  "features": [
    {
      "icon": "altitude",
      "title": "Altitude en direct",
      "desc": "Fusion GPS + baromètre avec affichage de la précision en temps réel. Définissez un point de référence pour suivre montées et descentes."
    },
    {
      "icon": "compass",
      "title": "Boussole précise",
      "desc": "Nord vrai ou magnétique avec repères N/E/S/O localisés, retours haptiques subtils, détection des interférences magnétiques et conseils de calibrage."
    },
    {
      "icon": "sunmoon",
      "title": "Soleil & Lune",
      "desc": "Élévation et azimut, lever/coucher du soleil et lever/coucher de la lune pour n'importe quel lieu — anticipez lumière et ombres."
    },
    {
      "icon": "camera",
      "title": "Assistant photo",
      "desc": "Golden hour et blue hour avec orientations à la boussole, pour savoir exactement d'où viendra la lumière."
    },
    {
      "icon": "coords",
      "title": "Coordonnées",
      "desc": "Basculez entre degrés décimaux et DMS, avec copie en un geste pour partager ou consigner."
    },
    {
      "icon": "pressure",
      "title": "Pression en direct",
      "desc": "Pression barométrique en temps réel en hPa, mmHg, inHg ou psi."
    }
  ],
  "widgetsTitle": "Widgets pour l'écran d'accueil",
  "widgetsSubtitle": "Le Soleil, la Lune et la golden hour d'un coup d'œil, directement sur votre écran d'accueil.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "Golden hour",
      "desc": "Les créneaux de golden hour et blue hour du jour, en un clin d'œil."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "Horaires Soleil & Lune",
      "desc": "Lever et coucher du soleil, lever et coucher de la lune."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "Phase lunaire",
      "desc": "Phase actuelle et illumination."
    }
  ],
  "useCasesTitle": "Pensé pour le plein air",
  "useCases": [
    "Randonnée et exploration",
    "Timing de la photo de paysage",
    "Astronomie et pédagogie",
    "Voyage et suivi d'altitude"
  ],
  "goldenTitle": "Préparez la lumière avant de partir",
  "goldenDesc": "Associez l'application à notre outil gratuit Golden Hour & Direction de la lumière — horaires exacts de la golden hour et de la blue hour, plus l'orientation à la boussole de la lumière, pour n'importe quelle ville ou lieu.",
  "goldenCta": "Ouvrir l'outil Golden Hour",
  "privacyTitle": "La confidentialité dès la conception",
  "privacyDesc": "La localisation n'est utilisée que pendant que vous êtes dans l'application, pour les calculs d'altitude et de position du Soleil et de la Lune — aucun suivi continu en arrière-plan. Vos préférences restent sur votre appareil ; aucune donnée personnelle n'est transmise.",
  "closingTitle": "Le ciel dans votre poche",
  "closingDesc": "Altitude, orientation, Soleil et Lune — rapide, précis et d'une élégante simplicité.",
  "backToHub": "Stargazing Hub"
};
const it: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: Sole e Luna — Altitudine, bussola e ora d'oro",
    "description": "Un'app di altitudine e bussola essenziale e di livello professionale, con le posizioni di Sole e Luna e la pianificazione dell'ora d'oro. Fusione GPS + barometro per misurazioni rapide e precise. Gratis su iOS e Android, dal team di Stargazing Hub."
  },
  "eyebrow": "Gratis · iOS e Android",
  "fromTeam": "Dal team di Stargazing Hub",
  "title": "Compass Altimeter: Sole e Luna",
  "subtitle": "Uno strumento di altitudine e bussola essenziale e di livello professionale. Fusione GPS + barometro per misurazioni dal vivo rapide e precise, pensata per escursionismo, fotografia di paesaggio e osservazione delle stelle.",
  "ctaFree": "Download gratuito",
  "badges": [
    "Fusione GPS + barometro",
    "Nord vero / magnetico",
    "Ora d'oro e ora blu",
    "Privacy al primo posto"
  ],
  "featuresTitle": "Tutto ciò che ti serve, niente di superfluo",
  "featuresSubtitle": "Misurazioni precise e design pulito: l'essenziale, fatto come si deve.",
  "features": [
    {
      "icon": "altitude",
      "title": "Altitudine dal vivo",
      "desc": "Fusione GPS + barometro con indicatore di precisione in tempo reale. Imposta un punto di riferimento per tracciare salite e discese."
    },
    {
      "icon": "compass",
      "title": "Bussola precisa",
      "desc": "Nord vero o magnetico con sigle N/E/S/O localizzate, feedback aptico discreto, rilevamento delle interferenze magnetiche e suggerimenti per la calibrazione."
    },
    {
      "icon": "sunmoon",
      "title": "Sole e Luna",
      "desc": "Altezza e azimut, alba/tramonto e levata/tramonto della Luna per qualsiasi luogo: pianifica luce e ombra."
    },
    {
      "icon": "camera",
      "title": "Assistente fotografico",
      "desc": "Ora d'oro e ora blu con l'azimut della bussola, così sai esattamente da dove arriverà la luce."
    },
    {
      "icon": "coords",
      "title": "Coordinate",
      "desc": "Passa dai gradi decimali al formato DMS, con copia con un tocco per condividere o annotare."
    },
    {
      "icon": "pressure",
      "title": "Pressione dal vivo",
      "desc": "Pressione barometrica in tempo reale in hPa, mmHg, inHg o psi."
    }
  ],
  "widgetsTitle": "Widget per la schermata Home",
  "widgetsSubtitle": "Sole, Luna e ora d'oro a colpo d'occhio, direttamente sulla tua schermata Home.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "Ora d'oro",
      "desc": "Le finestre di ora d'oro e ora blu di oggi a colpo d'occhio."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "Orari di Sole e Luna",
      "desc": "Alba, tramonto, levata e tramonto della Luna."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "Fase lunare",
      "desc": "Fase attuale e illuminazione."
    }
  ],
  "useCasesTitle": "Fatta per l'aria aperta",
  "useCases": [
    "Escursionismo ed esplorazione",
    "Tempistica per la fotografia di paesaggio",
    "Astronomia e didattica",
    "Viaggi e registro dell'altitudine"
  ],
  "goldenTitle": "Pianifica la luce prima di partire",
  "goldenDesc": "Abbina l'app al nostro strumento gratuito Ora d'oro e Direzione della luce: orari esatti di ora d'oro e ora blu più l'azimut della luce, per qualsiasi città o luogo.",
  "goldenCta": "Apri lo strumento Ora d'oro",
  "privacyTitle": "Privacy by design",
  "privacyDesc": "La posizione viene usata solo mentre sei nell'app, per i calcoli di altitudine e di Sole/Luna: nessun tracciamento continuo in background. Le preferenze restano sul tuo dispositivo; nessun dato personale viene caricato.",
  "closingTitle": "Porta il cielo in tasca",
  "closingDesc": "Altitudine, direzione, Sole e Luna: rapidi, precisi e splendidamente semplici.",
  "backToHub": "Stargazing Hub"
};
const ja: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: Sun & Moon — 高度・コンパス・ゴールデンアワー",
    "description": "高度とコンパスをプロ仕様で、シンプルに。太陽と月の位置やゴールデンアワーのプランニングにも対応。GPSと気圧センサーの融合で、すばやく正確に計測します。iOS / Android で無料。Stargazing Hub チームがお届けします。"
  },
  "eyebrow": "無料 · iOS & Android",
  "fromTeam": "Stargazing Hub チームより",
  "title": "Compass Altimeter: Sun & Moon",
  "subtitle": "シンプルで本格的な高度＆コンパスツール。GPSと気圧センサーの融合で、すばやく正確なリアルタイム計測を実現。登山、風景写真、星空観察のために生まれました。",
  "ctaFree": "無料ダウンロード",
  "badges": [
    "GPS + 気圧センサー融合",
    "真北 / 磁北",
    "ゴールデン＆ブルーアワー",
    "プライバシー第一"
  ],
  "featuresTitle": "必要なものだけを、しっかりと",
  "featuresSubtitle": "正確な計測とすっきりしたデザイン。本質をきちんと押さえました。",
  "features": [
    {
      "icon": "altitude",
      "title": "リアルタイム高度",
      "desc": "GPSと気圧センサーを融合し、精度をその場で表示。基準点を設定すれば、登りも下りもしっかり追跡できます。"
    },
    {
      "icon": "compass",
      "title": "高精度コンパス",
      "desc": "真北・磁北に対応し、東西南北をローカライズ表示。さりげない触覚フィードバック、磁気干渉の検知、キャリブレーションのヒントも備えています。"
    },
    {
      "icon": "sunmoon",
      "title": "太陽と月",
      "desc": "任意の地点の高度と方位角、日の出・日の入り、月の出・月の入りを表示。光と影を計画的に。"
    },
    {
      "icon": "camera",
      "title": "撮影サポート",
      "desc": "ゴールデンアワーとブルーアワーをコンパス方位とともに表示。光が差し込む方向がひと目でわかります。"
    },
    {
      "icon": "coords",
      "title": "座標表示",
      "desc": "十進度数とDMSをワンタッチで切り替え。コピーして共有や記録にもすぐ使えます。"
    },
    {
      "icon": "pressure",
      "title": "リアルタイム気圧",
      "desc": "気圧をhPa、mmHg、inHg、psiでリアルタイムに表示。"
    }
  ],
  "widgetsTitle": "ホーム画面ウィジェット",
  "widgetsSubtitle": "太陽、月、ゴールデンアワーの情報を、ホーム画面でひと目でチェック。",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "ゴールデンアワー",
      "desc": "今日のゴールデン＆ブルーアワーの時間帯がひと目でわかります。"
    },
    {
      "img": "/compass/widget-times.png",
      "title": "太陽と月の時刻",
      "desc": "日の出、日の入り、月の出、月の入り。"
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "月相",
      "desc": "現在の月相と輝面比。"
    }
  ],
  "useCasesTitle": "アウトドアのために",
  "useCases": [
    "登山＆探検",
    "風景写真のタイミング合わせ",
    "天文学＆教育",
    "旅行＆高度の記録"
  ],
  "goldenTitle": "出かける前に、光を計画する",
  "goldenDesc": "無料の「ゴールデンアワー＆光の方向」ツールと組み合わせれば、どの都市・どの場所でも、正確なゴールデン＆ブルーアワーの時刻と、光が差し込むコンパス方位がわかります。",
  "goldenCta": "ゴールデンアワーツールを開く",
  "privacyTitle": "設計からプライバシーを大切に",
  "privacyDesc": "位置情報はアプリ利用中のみ、高度や太陽・月の計算のために使用します。バックグラウンドでの継続的な追跡は行いません。設定はお使いの端末内にとどまり、個人データがアップロードされることはありません。",
  "closingTitle": "空をポケットに",
  "closingDesc": "高度、方位、太陽と月。すばやく、正確に、そして美しいほどシンプルに。",
  "backToHub": "Stargazing Hub"
};
const ko: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: 해와 달 — 고도, 나침반, 골든아워",
    "description": "해와 달의 위치와 골든아워 플래닝까지 담은 깔끔하고 전문가급 고도·나침반 앱. GPS + 기압 융합으로 빠르고 정확한 측정을 제공합니다. Stargazing Hub 팀이 만든 iOS·Android 무료 앱."
  },
  "eyebrow": "무료 · iOS & Android",
  "fromTeam": "Stargazing Hub 팀이 만들었습니다",
  "title": "Compass Altimeter: 해와 달",
  "subtitle": "깔끔하고 전문가급인 고도·나침반 도구. GPS + 기압 융합으로 빠르고 정확한 실시간 측정을 제공합니다 — 등산, 풍경 사진, 별 관측을 위해 만들어졌습니다.",
  "ctaFree": "무료 다운로드",
  "badges": [
    "GPS + 기압계 융합",
    "진북 / 자북",
    "골든아워 & 블루아워",
    "프라이버시 우선"
  ],
  "featuresTitle": "필요한 건 모두, 군더더기는 없이",
  "featuresSubtitle": "정확한 측정과 깔끔한 디자인 — 핵심을 제대로 담았습니다.",
  "features": [
    {
      "icon": "altitude",
      "title": "실시간 고도",
      "desc": "GPS + 기압 융합과 실시간 정확도 표시. 기준점을 설정해 상승과 하강을 추적하세요."
    },
    {
      "icon": "compass",
      "title": "정밀 나침반",
      "desc": "진북 또는 자북, 현지화된 N/E/S/W 표시, 은은한 햅틱, 자기 간섭 감지와 보정 가이드까지."
    },
    {
      "icon": "sunmoon",
      "title": "해와 달",
      "desc": "어느 지점이든 고도와 방위각, 일출·일몰, 월출·월몰을 확인하고 빛과 그림자를 미리 계획하세요."
    },
    {
      "icon": "camera",
      "title": "사진 도우미",
      "desc": "골든아워와 블루아워를 나침반 방위와 함께 보여주어, 빛이 어디로 떨어질지 정확히 알 수 있습니다."
    },
    {
      "icon": "coords",
      "title": "좌표",
      "desc": "십진수 도(度)와 DMS 간 전환, 원터치 복사로 손쉽게 공유하거나 기록하세요."
    },
    {
      "icon": "pressure",
      "title": "실시간 기압",
      "desc": "hPa, mmHg, inHg, psi 단위로 보여주는 실시간 기압."
    }
  ],
  "widgetsTitle": "홈 화면 위젯",
  "widgetsSubtitle": "해, 달, 골든아워 정보를 홈 화면에서 한눈에.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "골든아워",
      "desc": "오늘의 골든아워 & 블루아워 시간대를 한눈에."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "해와 달 시각",
      "desc": "일출, 일몰, 월출, 월몰."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "달의 위상",
      "desc": "현재 위상과 조도."
    }
  ],
  "useCasesTitle": "야외를 위해 만들어졌습니다",
  "useCases": [
    "등산 & 탐험",
    "풍경 사진 타이밍 잡기",
    "천문학 & 교육",
    "여행 & 고도 기록"
  ],
  "goldenTitle": "떠나기 전에 빛을 계획하세요",
  "goldenDesc": "무료 골든아워 & 빛 방향 도구와 함께 사용하세요 — 어느 도시나 지점이든 정확한 골든아워·블루아워 시간과 빛의 나침반 방위를 알려줍니다.",
  "goldenCta": "골든아워 도구 열기",
  "privacyTitle": "설계부터 프라이버시 중심",
  "privacyDesc": "위치 정보는 앱을 사용하는 동안에만 고도와 해·달 계산을 위해 사용됩니다 — 백그라운드에서 지속 추적하지 않습니다. 설정은 기기에 저장되며, 개인 정보는 업로드되지 않습니다.",
  "closingTitle": "하늘을 주머니에 담으세요",
  "closingDesc": "고도, 방향, 해와 달 — 빠르고 정확하며 더없이 간결하게.",
  "backToHub": "Stargazing Hub"
};
const nl: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: Sun & Moon — Hoogte, kompas & gouden uur",
    "description": "Een strakke, professionele hoogtemeter- en kompas-app met zon- en maanstanden en planning voor het gouden uur. GPS + barometrische fusie voor snelle, nauwkeurige metingen. Gratis voor iOS & Android, van het team van Stargazing Hub."
  },
  "eyebrow": "Gratis · iOS & Android",
  "fromTeam": "Van het team van Stargazing Hub",
  "title": "Compass Altimeter: Sun & Moon",
  "subtitle": "Een strakke, professionele hoogtemeter en kompas. GPS + barometrische fusie voor snelle, nauwkeurige live-metingen — gemaakt voor wandelen, landschapsfotografie en sterrenkijken.",
  "ctaFree": "Gratis downloaden",
  "badges": [
    "GPS + barometer-fusie",
    "Geografisch / magnetisch noorden",
    "Gouden & blauw uur",
    "Privacy voorop"
  ],
  "featuresTitle": "Alles wat je nodig hebt, niets overbodigs",
  "featuresSubtitle": "Nauwkeurige metingen en een strak ontwerp — de basis perfect uitgevoerd.",
  "features": [
    {
      "icon": "altitude",
      "title": "Live hoogte",
      "desc": "GPS + barometrische fusie met een nauwkeurigheidsindicatie in realtime. Stel een referentiepunt in om stijging en daling te volgen."
    },
    {
      "icon": "compass",
      "title": "Nauwkeurig kompas",
      "desc": "Geografisch of magnetisch noorden met gelokaliseerde N/O/Z/W-letters, subtiele haptische feedback, detectie van magnetische storing en kalibratietips."
    },
    {
      "icon": "sunmoon",
      "title": "Zon & maan",
      "desc": "Hoogte en azimut, zonsopkomst/-ondergang en maansopkomst/-ondergang voor elke plek — plan licht en schaduw."
    },
    {
      "icon": "camera",
      "title": "Hulp bij fotografie",
      "desc": "Gouden uur en blauw uur met kompaspeilingen, zodat je precies weet waar het licht zal vallen."
    },
    {
      "icon": "coords",
      "title": "Coördinaten",
      "desc": "Wissel tussen decimale graden en DMS, met kopiëren in één tik om te delen of vast te leggen."
    },
    {
      "icon": "pressure",
      "title": "Live luchtdruk",
      "desc": "Barometrische luchtdruk in realtime in hPa, mmHg, inHg of psi."
    }
  ],
  "widgetsTitle": "Widgets voor je beginscherm",
  "widgetsSubtitle": "In één oogopslag info over zon, maan en het gouden uur, direct op je beginscherm.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "Gouden uur",
      "desc": "De gouden en blauwe uren van vandaag in één oogopslag."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "Zon- & maantijden",
      "desc": "Zonsopkomst, zonsondergang, maansopkomst en maansondergang."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "Maanstand",
      "desc": "Huidige maanfase en verlichting."
    }
  ],
  "useCasesTitle": "Gemaakt voor buiten",
  "useCases": [
    "Wandelen & verkennen",
    "Timing voor landschapsfotografie",
    "Astronomie & onderwijs",
    "Reizen & hoogte vastleggen"
  ],
  "goldenTitle": "Plan het licht voordat je vertrekt",
  "goldenDesc": "Combineer de app met onze gratis tool voor het gouden uur en de lichtrichting — exacte tijden van het gouden en blauwe uur plus de kompaspeiling van het licht, voor elke stad of plek.",
  "goldenCta": "Open de tool voor het gouden uur",
  "privacyTitle": "Privacy door ontwerp",
  "privacyDesc": "Je locatie wordt alleen gebruikt terwijl je in de app bent, voor de berekening van hoogte en zon-/maanstanden — geen continue tracking op de achtergrond. Voorkeuren blijven op je apparaat; er worden geen persoonlijke gegevens geüpload.",
  "closingTitle": "Draag de hemel in je broekzak",
  "closingDesc": "Hoogte, richting, zon en maan — snel, nauwkeurig en prachtig eenvoudig.",
  "backToHub": "Stargazing Hub"
};
const pl: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: Słońce i Księżyc — wysokość, kompas i złota godzina",
    "description": "Przejrzysta, profesjonalna aplikacja do pomiaru wysokości i kompas z pozycjami Słońca i Księżyca oraz planowaniem złotej godziny. Fuzja GPS i czujnika ciśnienia zapewnia szybkie, dokładne odczyty. Bezpłatna na iOS i Androida, od zespołu Stargazing Hub."
  },
  "eyebrow": "Bezpłatnie · iOS i Android",
  "fromTeam": "Od zespołu Stargazing Hub",
  "title": "Compass Altimeter: Słońce i Księżyc",
  "subtitle": "Przejrzyste, profesjonalne narzędzie do pomiaru wysokości i kompas. Fuzja GPS i czujnika ciśnienia zapewnia szybkie, dokładne odczyty na żywo — stworzona z myślą o turystyce górskiej, fotografii krajobrazowej i obserwacji nieba.",
  "ctaFree": "Pobierz za darmo",
  "badges": [
    "Fuzja GPS i barometru",
    "Północ rzeczywista / magnetyczna",
    "Złota i niebieska godzina",
    "Prywatność na pierwszym miejscu"
  ],
  "featuresTitle": "Wszystko, czego potrzebujesz — bez zbędnych dodatków",
  "featuresSubtitle": "Precyzyjne odczyty i czysty design — to, co najważniejsze, zrobione jak należy.",
  "features": [
    {
      "icon": "altitude",
      "title": "Wysokość na żywo",
      "desc": "Fuzja GPS i czujnika ciśnienia z odczytem dokładności w czasie rzeczywistym. Ustaw punkt odniesienia, aby śledzić podejścia i zejścia."
    },
    {
      "icon": "compass",
      "title": "Precyzyjny kompas",
      "desc": "Północ rzeczywista lub magnetyczna z lokalnymi oznaczeniami N/E/S/W, subtelnymi wibracjami, wykrywaniem zakłóceń magnetycznych i wskazówkami kalibracji."
    },
    {
      "icon": "sunmoon",
      "title": "Słońce i Księżyc",
      "desc": "Wysokość i azymut, wschody i zachody Słońca oraz Księżyca dla dowolnego miejsca — planuj światło i cień."
    },
    {
      "icon": "camera",
      "title": "Pomocnik fotografa",
      "desc": "Złota i niebieska godzina wraz z kierunkami kompasu, dzięki czemu dokładnie wiesz, skąd padnie światło."
    },
    {
      "icon": "coords",
      "title": "Współrzędne",
      "desc": "Przełączaj się między stopniami dziesiętnymi a DMS, z kopiowaniem jednym dotknięciem do udostępniania lub zapisu."
    },
    {
      "icon": "pressure",
      "title": "Ciśnienie na żywo",
      "desc": "Ciśnienie atmosferyczne w czasie rzeczywistym w hPa, mmHg, inHg lub psi."
    }
  ],
  "widgetsTitle": "Widżety na ekran główny",
  "widgetsSubtitle": "Informacje o Słońcu, Księżycu i złotej godzinie na pierwszy rzut oka, prosto na ekranie głównym.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "Złota godzina",
      "desc": "Dzisiejsze okna złotej i niebieskiej godziny w mgnieniu oka."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "Godziny Słońca i Księżyca",
      "desc": "Wschód i zachód Słońca oraz wschód i zachód Księżyca."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "Faza Księżyca",
      "desc": "Aktualna faza i stopień oświetlenia."
    }
  ],
  "useCasesTitle": "Stworzona na świeże powietrze",
  "useCases": [
    "Turystyka górska i eksploracja",
    "Wybór pory na fotografię krajobrazową",
    "Astronomia i edukacja",
    "Podróże i rejestrowanie wysokości"
  ],
  "goldenTitle": "Zaplanuj światło, zanim wyruszysz",
  "goldenDesc": "Połącz aplikację z naszym bezpłatnym narzędziem Złota godzina i kierunek światła — dokładne godziny złotej i niebieskiej godziny oraz kierunek padania światła według kompasu dla dowolnego miasta lub miejsca.",
  "goldenCta": "Otwórz narzędzie Złota godzina",
  "privacyTitle": "Prywatność u podstaw",
  "privacyDesc": "Lokalizacja jest używana tylko wtedy, gdy korzystasz z aplikacji — do obliczeń wysokości oraz pozycji Słońca i Księżyca, bez ciągłego śledzenia w tle. Preferencje pozostają na Twoim urządzeniu; żadne dane osobowe nie są przesyłane.",
  "closingTitle": "Noś niebo w kieszeni",
  "closingDesc": "Wysokość, kierunek, Słońce i Księżyc — szybko, dokładnie i pięknie prosto.",
  "backToHub": "Stargazing Hub"
};
const ru: CompassContent = {
  "meta": {
    "title": "Compass Altimeter: высота, компас и солнце с луной",
    "description": "Лаконичное приложение профессионального уровня: высота над уровнем моря, компас, положение Солнца и Луны, планирование золотого часа. Объединяет GPS и барометр для быстрых и точных показаний. Бесплатно на iOS и Android от команды Stargazing Hub."
  },
  "eyebrow": "Бесплатно · iOS и Android",
  "fromTeam": "От команды Stargazing Hub",
  "title": "Compass Altimeter: Солнце и Луна",
  "subtitle": "Лаконичный измеритель высоты и компас профессионального уровня. GPS и барометр объединяются ради быстрых и точных показаний в реальном времени — для походов, пейзажной съёмки и наблюдения за звёздами.",
  "ctaFree": "Скачать бесплатно",
  "badges": [
    "GPS + барометр",
    "Истинный / магнитный север",
    "Золотой и синий час",
    "Конфиденциальность прежде всего"
  ],
  "featuresTitle": "Всё нужное и ничего лишнего",
  "featuresSubtitle": "Точные показания и чистый дизайн — главное, сделанное как надо.",
  "features": [
    {
      "icon": "altitude",
      "title": "Высота в реальном времени",
      "desc": "Объединение GPS и барометра с индикатором точности в реальном времени. Задайте опорную точку и отслеживайте подъём и спуск."
    },
    {
      "icon": "compass",
      "title": "Точный компас",
      "desc": "Истинный или магнитный север с локализованными буквами С/В/Ю/З, мягкой вибрацией, обнаружением магнитных помех и подсказками по калибровке."
    },
    {
      "icon": "sunmoon",
      "title": "Солнце и Луна",
      "desc": "Высота и азимут, восход и заход Солнца и Луны для любой точки — планируйте свет и тени."
    },
    {
      "icon": "camera",
      "title": "Помощник фотографа",
      "desc": "Золотой и синий час вместе с направлением по компасу — вы точно знаете, куда упадёт свет."
    },
    {
      "icon": "coords",
      "title": "Координаты",
      "desc": "Переключайтесь между десятичными градусами и DMS, копируйте их одним касанием, чтобы поделиться или сохранить."
    },
    {
      "icon": "pressure",
      "title": "Давление в реальном времени",
      "desc": "Атмосферное давление в реальном времени в hPa, mmHg, inHg или psi."
    }
  ],
  "widgetsTitle": "Виджеты на главном экране",
  "widgetsSubtitle": "Информация о Солнце, Луне и золотом часе одним взглядом — прямо на главном экране.",
  "widgets": [
    {
      "img": "/compass/widget-golden.png",
      "title": "Золотой час",
      "desc": "Сегодняшние окна золотого и синего часа с одного взгляда."
    },
    {
      "img": "/compass/widget-times.png",
      "title": "Время Солнца и Луны",
      "desc": "Восход и заход Солнца, восход и заход Луны."
    },
    {
      "img": "/compass/widget-moon.png",
      "title": "Фаза Луны",
      "desc": "Текущая фаза и освещённость."
    }
  ],
  "useCasesTitle": "Создано для открытого воздуха",
  "useCases": [
    "Походы и исследования",
    "Время для пейзажной съёмки",
    "Астрономия и обучение",
    "Путешествия и учёт высоты"
  ],
  "goldenTitle": "Спланируйте свет заранее",
  "goldenDesc": "Дополните приложение нашим бесплатным инструментом «Золотой час и направление света» — точное время золотого и синего часа плюс направление света по компасу для любого города или места.",
  "goldenCta": "Открыть инструмент «Золотой час»",
  "privacyTitle": "Конфиденциальность с самого начала",
  "privacyDesc": "Геолокация используется только когда вы в приложении — для расчёта высоты и положения Солнца и Луны, без постоянного отслеживания в фоне. Настройки остаются на вашем устройстве; личные данные никуда не передаются.",
  "closingTitle": "Небо всегда в вашем кармане",
  "closingDesc": "Высота, направление, Солнце и Луна — быстро, точно и красиво просто.",
  "backToHub": "Stargazing Hub"
};

export const compassContent: Record<string, CompassContent> = { en, zh, 'zh-tw': zhTw, de, es, fr, it, ja, ko, nl, pl, ru };

export function getCompass(lang: string): CompassContent {
  return compassContent[lang] || compassContent.en;
}
