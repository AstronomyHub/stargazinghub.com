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

export const compassContent: Record<string, CompassContent> = { en };

export function getCompass(lang: string): CompassContent {
  return compassContent[lang] || compassContent.en;
}
