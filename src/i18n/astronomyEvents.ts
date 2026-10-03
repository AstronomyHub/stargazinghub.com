import type { AstronomyEventName } from '../data/astronomyEvents';

const eventLocales = ['en', 'zh', 'zh-tw', 'de', 'ja', 'ko', 'fr', 'es', 'it', 'ru', 'nl', 'pl'] as const;
export type EventLocale = typeof eventLocales[number];

interface EventCopy {
  title: string;
  subtitle: string;
  checked: string;
  source: string;
  featureLink: string;
  localeTag: string;
  names: Record<AstronomyEventName, string>;
}

const eventCopy: Record<EventLocale, EventCopy> = {
  en: {
    title: 'Upcoming sky events',
    subtitle: 'Dates worth saving. Visibility depends on your location, weather and local sky conditions.',
    checked: 'Dates checked August 10, 2026',
    source: 'Source',
    featureLink: 'Plan with Stargazing Hub',
    localeTag: 'en-US',
    names: { totalSolarEclipse: 'Total solar eclipse', perseidsPeak: 'Perseid meteor shower peak', partialLunarEclipse: 'Partial lunar eclipse', geminidsPeak: 'Geminid meteor shower peak' },
  },
  zh: {
    title: '接下来值得关注的天象',
    subtitle: '记下值得关注的日期。能否看到，还要看所在地、天气和当时的天空条件。',
    checked: '日期核对于 2026 年 8 月 10 日',
    source: '数据来源',
    featureLink: '用天文通规划观测',
    localeTag: 'zh-CN',
    names: { totalSolarEclipse: '日全食', perseidsPeak: '英仙座流星雨极大', partialLunarEclipse: '月偏食', geminidsPeak: '双子座流星雨极大' },
  },
  'zh-tw': {
    title: '接下來值得關注的天象',
    subtitle: '記下值得關注的日期。能否看見，還要看所在地、天氣與當時的天空條件。',
    checked: '日期核對於 2026 年 8 月 10 日',
    source: '資料來源',
    featureLink: '用天文通規劃觀測',
    localeTag: 'zh-TW',
    names: { totalSolarEclipse: '日全食', perseidsPeak: '英仙座流星雨極大', partialLunarEclipse: '月偏食', geminidsPeak: '雙子座流星雨極大' },
  },
  de: {
    title: 'Kommende Himmelsereignisse',
    subtitle: 'Termine zum Vormerken. Die Sichtbarkeit hängt von Standort, Wetter und lokalen Bedingungen ab.',
    checked: 'Daten geprüft am 10. August 2026',
    source: 'Quelle',
    featureLink: 'Mit Stargazing Hub planen',
    localeTag: 'de-DE',
    names: { totalSolarEclipse: 'Totale Sonnenfinsternis', perseidsPeak: 'Maximum der Perseiden', partialLunarEclipse: 'Partielle Mondfinsternis', geminidsPeak: 'Maximum der Geminiden' },
  },
  ja: {
    title: 'これから見たい天文現象',
    subtitle: '覚えておきたい日付です。見え方は場所、天気、空の条件によって変わります。',
    checked: '日付確認：2026年8月10日',
    source: '出典',
    featureLink: 'Stargazing Hubで観測を計画',
    localeTag: 'ja-JP',
    names: { totalSolarEclipse: '皆既日食', perseidsPeak: 'ペルセウス座流星群が極大', partialLunarEclipse: '部分月食', geminidsPeak: 'ふたご座流星群が極大' },
  },
  ko: {
    title: '다가오는 천문 현상',
    subtitle: '기억해 둘 날짜입니다. 관측 가능 여부는 위치, 날씨와 하늘 상태에 따라 달라집니다.',
    checked: '날짜 확인: 2026년 8월 10일',
    source: '출처',
    featureLink: 'Stargazing Hub에서 관측 계획하기',
    localeTag: 'ko-KR',
    names: { totalSolarEclipse: '개기일식', perseidsPeak: '페르세우스자리 유성우 극대', partialLunarEclipse: '부분월식', geminidsPeak: '쌍둥이자리 유성우 극대' },
  },
  fr: {
    title: 'Prochains événements célestes',
    subtitle: 'Des dates à retenir. La visibilité dépend du lieu, de la météo et des conditions locales.',
    checked: 'Dates vérifiées le 10 août 2026',
    source: 'Source',
    featureLink: 'Planifier avec Stargazing Hub',
    localeTag: 'fr-FR',
    names: { totalSolarEclipse: 'Éclipse solaire totale', perseidsPeak: 'Pic des Perséides', partialLunarEclipse: 'Éclipse lunaire partielle', geminidsPeak: 'Pic des Géminides' },
  },
  es: {
    title: 'Próximos eventos celestes',
    subtitle: 'Fechas para guardar. La visibilidad depende de la ubicación, el tiempo y las condiciones locales.',
    checked: 'Fechas verificadas el 10 de agosto de 2026',
    source: 'Fuente',
    featureLink: 'Planificar con Stargazing Hub',
    localeTag: 'es-ES',
    names: { totalSolarEclipse: 'Eclipse solar total', perseidsPeak: 'Máximo de las Perseidas', partialLunarEclipse: 'Eclipse lunar parcial', geminidsPeak: 'Máximo de las Gemínidas' },
  },
  it: {
    title: 'Prossimi eventi celesti',
    subtitle: 'Date da ricordare. La visibilità dipende dal luogo, dal meteo e dalle condizioni locali.',
    checked: 'Date verificate il 10 agosto 2026',
    source: 'Fonte',
    featureLink: 'Pianifica con Stargazing Hub',
    localeTag: 'it-IT',
    names: { totalSolarEclipse: 'Eclissi solare totale', perseidsPeak: 'Picco delle Perseidi', partialLunarEclipse: 'Eclissi lunare parziale', geminidsPeak: 'Picco delle Geminidi' },
  },
  ru: {
    title: 'Ближайшие небесные события',
    subtitle: 'Даты, которые стоит сохранить. Видимость зависит от места, погоды и местных условий.',
    checked: 'Даты проверены 10 августа 2026 года',
    source: 'Источник',
    featureLink: 'Планировать в Stargazing Hub',
    localeTag: 'ru-RU',
    names: { totalSolarEclipse: 'Полное солнечное затмение', perseidsPeak: 'Максимум Персеид', partialLunarEclipse: 'Частное лунное затмение', geminidsPeak: 'Максимум Геминид' },
  },
  nl: {
    title: 'Komende hemelverschijnselen',
    subtitle: 'Data om te bewaren. Zichtbaarheid hangt af van locatie, weer en plaatselijke omstandigheden.',
    checked: 'Data gecontroleerd op 10 augustus 2026',
    source: 'Bron',
    featureLink: 'Plan met Stargazing Hub',
    localeTag: 'nl-NL',
    names: { totalSolarEclipse: 'Totale zonsverduistering', perseidsPeak: 'Maximum van de Perseïden', partialLunarEclipse: 'Gedeeltelijke maansverduistering', geminidsPeak: 'Maximum van de Geminiden' },
  },
  pl: {
    title: 'Nadchodzące zjawiska na niebie',
    subtitle: 'Daty, które warto zapisać. Widoczność zależy od miejsca, pogody i lokalnych warunków.',
    checked: 'Daty sprawdzono 10 sierpnia 2026',
    source: 'Źródło',
    featureLink: 'Planuj ze Stargazing Hub',
    localeTag: 'pl-PL',
    names: { totalSolarEclipse: 'Całkowite zaćmienie Słońca', perseidsPeak: 'Maksimum Perseidów', partialLunarEclipse: 'Częściowe zaćmienie Księżyca', geminidsPeak: 'Maksimum Geminidów' },
  },
};

const normalizeLocale = (language: string): EventLocale =>
  eventLocales.includes(language as EventLocale) ? language as EventLocale : 'en';

export const getAstronomyEventCopy = (language: string) => eventCopy[normalizeLocale(language)];
