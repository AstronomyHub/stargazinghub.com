export type StoreReviewStore = 'app-store' | 'google-play';

export interface StoreReview {
  reviewId: string;
  store: StoreReviewStore;
  storefront: 'CN' | 'US';
  rating: 5;
  author: string;
  originalLanguage: 'zh-Hans' | 'en';
  quote: string;
  date: string;
  version: string;
  sourceUrl: string;
  verifiedAt: string;
}

/**
 * A small, manually verified snapshot of public store reviews.
 * Keep quotes faithful to the source and re-verify before changing them.
 */
export const storeReviews = [
  {
    reviewId: '14070115062',
    store: 'app-store',
    storefront: 'CN',
    rating: 5,
    author: 'Lyttt6',
    originalLanguage: 'zh-Hans',
    quote: '预报很准确，地点很精准，成功拍到星空',
    date: '2026-05-16',
    version: '3.1.3',
    sourceUrl: 'https://apps.apple.com/cn/app/id1478601599?see-all=reviews',
    verifiedAt: '2026-08-10',
  },
  {
    reviewId: '14087560792',
    store: 'app-store',
    storefront: 'US',
    rating: 5,
    author: 'Amberlampsmalone',
    originalLanguage: 'en',
    quote:
      'From detailed star maps to real-time tracking of planets and satellites, it makes celestial navigation effortless.',
    date: '2026-05-20',
    version: '3.1.4',
    sourceUrl:
      'https://apps.apple.com/us/app/stargazing-hub-sky-live/id1478601599?see-all=reviews',
    verifiedAt: '2026-08-10',
  },
  {
    reviewId: '59262101-2564-41e9-b3b6-33f4175d963e',
    store: 'google-play',
    storefront: 'US',
    rating: 5,
    author: 'Fiha Tabassum',
    originalLanguage: 'en',
    quote:
      'It has everything you might need to know before deciding when to shoot and much more.',
    date: '2025-11-21',
    version: '2.5.0',
    sourceUrl:
      'https://play.google.com/store/apps/details?id=com.twtapp&hl=en&gl=US&showAllReviews=true',
    verifiedAt: '2026-08-10',
  },
] as const satisfies readonly StoreReview[];
