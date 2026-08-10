import { storeReviews } from '../data/storeReviews';

export const reviewLocales = [
  'en',
  'zh',
  'zh-tw',
  'ja',
  'ko',
  'de',
  'fr',
  'es',
  'it',
  'ru',
  'nl',
  'pl',
] as const;

export type ReviewLocale = typeof reviewLocales[number];

interface ReviewPageCopy {
  title: string;
  subtitle: string;
  source: string;
  translatedFromEnglish: string;
  translatedFromChinese: string;
  ratingLabel: string;
  localeTag: string;
}

const pageCopy: Record<ReviewLocale, ReviewPageCopy> = {
  en: {
    title: 'Reviews from the app stores',
    subtitle: 'Public reviews with their author, date and original store link.',
    source: 'View original',
    translatedFromEnglish: 'Translated from English',
    translatedFromChinese: 'Translated from Simplified Chinese',
    ratingLabel: '5 out of 5 stars',
    localeTag: 'en-US',
  },
  zh: {
    title: '应用商店里的真实评价',
    subtitle: '保留评价人、日期和商店原文链接，方便随时核对。',
    source: '查看原文',
    translatedFromEnglish: '译自英文',
    translatedFromChinese: '译自简体中文',
    ratingLabel: '5 星评价',
    localeTag: 'zh-CN',
  },
  'zh-tw': {
    title: '應用商店裡的真實評價',
    subtitle: '保留評價者、日期與商店原文連結，方便隨時核對。',
    source: '查看原文',
    translatedFromEnglish: '譯自英文',
    translatedFromChinese: '譯自簡體中文',
    ratingLabel: '5 星評價',
    localeTag: 'zh-TW',
  },
  ja: {
    title: 'アプリストアに寄せられたレビュー',
    subtitle: '投稿者、日付、ストアの原文リンクを確認できます。',
    source: '原文を見る',
    translatedFromEnglish: '英語からの翻訳',
    translatedFromChinese: '簡体字中国語からの翻訳',
    ratingLabel: '5つ星のレビュー',
    localeTag: 'ja-JP',
  },
  ko: {
    title: '앱 스토어에 남겨진 리뷰',
    subtitle: '작성자, 날짜와 스토어 원문 링크를 함께 표시합니다.',
    source: '원문 보기',
    translatedFromEnglish: '영어 번역',
    translatedFromChinese: '중국어 간체 번역',
    ratingLabel: '별점 5점',
    localeTag: 'ko-KR',
  },
  de: {
    title: 'Bewertungen aus den App-Stores',
    subtitle: 'Mit Name, Datum und Link zur ursprünglichen Store-Bewertung.',
    source: 'Original ansehen',
    translatedFromEnglish: 'Aus dem Englischen übersetzt',
    translatedFromChinese: 'Aus dem vereinfachten Chinesisch übersetzt',
    ratingLabel: '5 von 5 Sternen',
    localeTag: 'de-DE',
  },
  fr: {
    title: 'Avis publiés sur les boutiques',
    subtitle: 'Avec le nom, la date et le lien vers l’avis original.',
    source: 'Voir l’original',
    translatedFromEnglish: 'Traduit de l’anglais',
    translatedFromChinese: 'Traduit du chinois simplifié',
    ratingLabel: '5 étoiles sur 5',
    localeTag: 'fr-FR',
  },
  es: {
    title: 'Reseñas publicadas en las tiendas',
    subtitle: 'Con autor, fecha y enlace a la reseña original.',
    source: 'Ver original',
    translatedFromEnglish: 'Traducido del inglés',
    translatedFromChinese: 'Traducido del chino simplificado',
    ratingLabel: '5 de 5 estrellas',
    localeTag: 'es-ES',
  },
  it: {
    title: 'Recensioni pubblicate negli store',
    subtitle: 'Con autore, data e link alla recensione originale.',
    source: 'Vedi originale',
    translatedFromEnglish: 'Tradotto dall’inglese',
    translatedFromChinese: 'Tradotto dal cinese semplificato',
    ratingLabel: '5 stelle su 5',
    localeTag: 'it-IT',
  },
  ru: {
    title: 'Отзывы в магазинах приложений',
    subtitle: 'С именем автора, датой и ссылкой на исходный отзыв.',
    source: 'Открыть оригинал',
    translatedFromEnglish: 'Перевод с английского',
    translatedFromChinese: 'Перевод с упрощенного китайского',
    ratingLabel: '5 звезд из 5',
    localeTag: 'ru-RU',
  },
  nl: {
    title: 'Reviews uit de appstores',
    subtitle: 'Met naam, datum en een link naar de oorspronkelijke review.',
    source: 'Bekijk origineel',
    translatedFromEnglish: 'Vertaald uit het Engels',
    translatedFromChinese: 'Vertaald uit het vereenvoudigd Chinees',
    ratingLabel: '5 van 5 sterren',
    localeTag: 'nl-NL',
  },
  pl: {
    title: 'Opinie ze sklepów z aplikacjami',
    subtitle: 'Z nazwą autora, datą i linkiem do oryginalnej opinii.',
    source: 'Zobacz oryginał',
    translatedFromEnglish: 'Tłumaczenie z angielskiego',
    translatedFromChinese: 'Tłumaczenie z chińskiego uproszczonego',
    ratingLabel: '5 na 5 gwiazdek',
    localeTag: 'pl-PL',
  },
};

const quotes: Record<ReviewLocale, readonly [string, string, string]> = {
  en: [
    'The forecast was accurate, the location was spot-on, and I successfully photographed the stars.',
    storeReviews[1].quote,
    storeReviews[2].quote,
  ],
  zh: [
    storeReviews[0].quote,
    '从详细星图到行星与卫星的实时追踪，让寻找天体变得很轻松。',
    '决定什么时候拍摄之前需要的信息，这里几乎都有，功能还不止这些。',
  ],
  'zh-tw': [
    '預報很準確，地點很精準，成功拍到星空。',
    '從詳細星圖到行星與衛星的即時追蹤，尋找天體變得很輕鬆。',
    '決定什麼時候拍攝之前需要的資訊，這裡幾乎都有，功能還不只這些。',
  ],
  ja: [
    '予報も場所も正確で、星空の撮影に成功しました。',
    '詳細な星図から惑星や人工衛星のリアルタイム追跡まで、天体を探すのがとても簡単です。',
    '撮影する時間を決める前に必要な情報がそろっていて、ほかにも多くの機能があります。',
  ],
  ko: [
    '예보와 장소가 정확해서 별 사진을 찍는 데 성공했습니다.',
    '상세한 별 지도부터 행성과 위성의 실시간 추적까지, 천체를 찾기가 아주 쉽습니다.',
    '촬영 시간을 정하기 전에 필요한 정보가 모두 있고, 그 밖의 기능도 많습니다.',
  ],
  de: [
    'Die Vorhersage und der Standort waren genau, und ich konnte den Sternenhimmel erfolgreich fotografieren.',
    'Von detaillierten Sternkarten bis zur Echtzeitverfolgung von Planeten und Satelliten wird die Orientierung am Himmel sehr einfach.',
    'Die App bietet alles, was man vor der Wahl des Aufnahmezeitpunkts wissen muss, und noch vieles mehr.',
  ],
  fr: [
    'Les prévisions et le lieu étaient précis, et j’ai réussi à photographier le ciel étoilé.',
    'Des cartes détaillées au suivi en temps réel des planètes et satellites, tout devient simple pour se repérer dans le ciel.',
    'L’application réunit tout ce qu’il faut savoir avant de choisir quand photographier, et bien plus encore.',
  ],
  es: [
    'El pronóstico y la ubicación fueron precisos, y pude fotografiar el cielo estrellado.',
    'Desde mapas estelares detallados hasta el seguimiento en tiempo real de planetas y satélites, orientarse en el cielo resulta muy fácil.',
    'Tiene todo lo necesario antes de decidir cuándo fotografiar, y muchas funciones más.',
  ],
  it: [
    'Le previsioni e il luogo erano precisi, e sono riuscito a fotografare il cielo stellato.',
    'Dalle mappe stellari dettagliate al tracciamento in tempo reale di pianeti e satelliti, orientarsi nel cielo diventa semplice.',
    'C’è tutto quello che serve prima di decidere quando fotografare, e molto altro ancora.',
  ],
  ru: [
    'Прогноз и место оказались точными, и мне удалось сфотографировать звездное небо.',
    'От подробных звездных карт до отслеживания планет и спутников в реальном времени, ориентироваться по небу очень легко.',
    'Здесь есть все, что нужно знать перед выбором времени съемки, и многое другое.',
  ],
  nl: [
    'De voorspelling en locatie waren nauwkeurig, en ik kon de sterrenhemel fotograferen.',
    'Van gedetailleerde sterrenkaarten tot realtime tracking van planeten en satellieten, navigeren langs de hemel wordt heel eenvoudig.',
    'De app bevat alles wat je nodig hebt voordat je bepaalt wanneer je gaat fotograferen, en nog veel meer.',
  ],
  pl: [
    'Prognoza i lokalizacja były dokładne, dzięki czemu udało mi się sfotografować gwiazdy.',
    'Od szczegółowych map nieba po śledzenie planet i satelitów w czasie rzeczywistym, orientacja na niebie staje się bardzo prosta.',
    'Aplikacja ma wszystko, czego potrzeba przed wyborem czasu fotografowania, i wiele więcej.',
  ],
};

const normalizeLocale = (language: string): ReviewLocale =>
  reviewLocales.includes(language as ReviewLocale) ? language as ReviewLocale : 'en';

export const getReviewPageCopy = (language: string) => pageCopy[normalizeLocale(language)];

export const getLocalizedReviews = (language: string) => {
  const locale = normalizeLocale(language);
  const localizedQuotes = quotes[locale];

  return storeReviews.map((review, index) => {
    const isOriginal =
      (locale === 'en' && review.originalLanguage === 'en')
      || (locale === 'zh' && review.originalLanguage === 'zh-Hans');
    const translationNote = review.originalLanguage === 'en'
      ? pageCopy[locale].translatedFromEnglish
      : pageCopy[locale].translatedFromChinese;

    return {
      ...review,
      localizedQuote: localizedQuotes[index],
      translationNote: isOriginal ? null : translationNote,
    };
  });
};
