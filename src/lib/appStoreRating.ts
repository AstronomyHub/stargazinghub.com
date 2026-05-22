const APP_STORE_ID = '1478601599';

const countryByLanguage: Record<string, string> = {
  en: 'US',
  zh: 'CN',
  'zh-tw': 'TW',
  de: 'DE',
  es: 'ES',
  fr: 'FR',
  it: 'IT',
  ja: 'JP',
  ko: 'KR',
  nl: 'NL',
  pl: 'PL',
  ru: 'RU',
};

export interface AppStoreRating {
  country: string;
  ratingValue: number;
  ratingCount: number;
  displayValue: string;
  displayCount: string;
  source: 'app-store' | 'fallback';
}

const fallbackRating: AppStoreRating = {
  country: 'US',
  ratingValue: 4.7,
  ratingCount: 0,
  displayValue: '4.7',
  displayCount: '',
  source: 'fallback',
};

const ratingCache = new Map<string, Promise<AppStoreRating>>();

const formatRating = (rating: number) => (Math.round(rating * 10) / 10).toFixed(1);

const formatCount = (count: number, language: string) => {
  if (!Number.isFinite(count) || count <= 0) {
    return '';
  }

  return new Intl.NumberFormat(language).format(count);
};

const normalizeLanguage = (language: string) => language.toLowerCase();

export const getAppStoreRating = async (language = 'en'): Promise<AppStoreRating> => {
  const normalizedLanguage = normalizeLanguage(language);
  const country = countryByLanguage[normalizedLanguage] || 'US';
  const cacheKey = `${normalizedLanguage}:${country}`;

  if (!ratingCache.has(cacheKey)) {
    ratingCache.set(cacheKey, fetchAppStoreRating(normalizedLanguage, country));
  }

  return ratingCache.get(cacheKey)!;
};

const fetchAppStoreRating = async (language: string, country: string): Promise<AppStoreRating> => {
  try {
    const url = `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=${country}`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      return { ...fallbackRating, country };
    }

    const payload = await response.json();
    const app = payload?.results?.[0];
    const ratingValue = Number(app?.averageUserRating);
    const ratingCount = Number(app?.userRatingCount);

    if (!Number.isFinite(ratingValue) || ratingValue <= 0) {
      return { ...fallbackRating, country };
    }

    return {
      country,
      ratingValue,
      ratingCount: Number.isFinite(ratingCount) ? ratingCount : 0,
      displayValue: formatRating(ratingValue),
      displayCount: formatCount(ratingCount, language),
      source: 'app-store',
    };
  } catch {
    return { ...fallbackRating, country };
  }
};
