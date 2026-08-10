const APP_STORE_ID = '1478601599';
export const MIN_LOCAL_RATING_COUNT = 30;

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
  requestedCountry: string;
  isReference: boolean;
  ratingValue: number | null;
  ratingCount: number | null;
  displayValue: string;
  displayCount: string;
  source: 'app-store' | 'unavailable';
}

const unavailableRating = (requestedCountry: string): AppStoreRating => ({
  country: requestedCountry,
  requestedCountry,
  isReference: false,
  ratingValue: null,
  ratingCount: null,
  displayValue: 'N/A',
  displayCount: '',
  source: 'unavailable',
});

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
  const requestedCountry = countryByLanguage[normalizedLanguage] || 'US';
  const cacheKey = `${normalizedLanguage}:${requestedCountry}`;

  if (!ratingCache.has(cacheKey)) {
    ratingCache.set(cacheKey, resolveDisplayRating(normalizedLanguage, requestedCountry));
  }

  return ratingCache.get(cacheKey)!;
};

const resolveDisplayRating = async (
  language: string,
  requestedCountry: string,
): Promise<AppStoreRating> => {
  const usRating = await fetchAppStoreRating(language, 'US', requestedCountry);
  if (
    usRating.source === 'app-store'
    && typeof usRating.ratingCount === 'number'
    && usRating.ratingCount >= MIN_LOCAL_RATING_COUNT
  ) {
    return {
      ...usRating,
      isReference: requestedCountry !== 'US',
    };
  }

  return unavailableRating(requestedCountry);
};

const fetchAppStoreRating = async (
  language: string,
  country: string,
  requestedCountry: string,
): Promise<AppStoreRating> => {
  try {
    const url = `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=${country}`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return unavailableRating(requestedCountry);
    }

    const payload = await response.json() as {
      results?: Array<{
        averageUserRating?: number;
        userRatingCount?: number;
      }>;
    };
    const app = payload?.results?.[0];
    const ratingValue = Number(app?.averageUserRating);
    const ratingCount = Number(app?.userRatingCount);

    if (!Number.isFinite(ratingValue) || ratingValue <= 0 || ratingValue > 5) {
      return unavailableRating(requestedCountry);
    }

    const normalizedRatingCount = Number.isFinite(ratingCount) && ratingCount >= 0
      ? ratingCount
      : null;

    return {
      country,
      requestedCountry,
      isReference: false,
      ratingValue,
      ratingCount: normalizedRatingCount,
      displayValue: formatRating(ratingValue),
      displayCount: normalizedRatingCount === null ? '' : formatCount(normalizedRatingCount, language),
      source: 'app-store',
    };
  } catch {
    return unavailableRating(requestedCountry);
  }
};
