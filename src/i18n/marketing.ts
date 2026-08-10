import type { Language } from './ui';

export interface MarketingUi {
  demo: string;
  explore: string;
  allFeatures: string;
  tourTitle: string;
  tourBody: string;
  forecastNote: string;
  support: string;
  languages: string;
  appStoreRating: string;
}

export interface AccessibilityUi {
  skipToContent: string;
  primaryNavigation: string;
  downloadOptions: string;
  socialLinks: string;
  footerNavigation: string;
}

const accessibilityCopy: Record<Language, AccessibilityUi> = {
  en: {
    skipToContent: 'Skip to main content',
    primaryNavigation: 'Primary navigation',
    downloadOptions: 'Download Stargazing Hub',
    socialLinks: 'Social links',
    footerNavigation: 'Footer navigation',
  },
  zh: {
    skipToContent: '跳到主要内容',
    primaryNavigation: '主导航',
    downloadOptions: '下载天文通',
    socialLinks: '社交媒体链接',
    footerNavigation: '页脚导航',
  },
  'zh-tw': {
    skipToContent: '跳至主要內容',
    primaryNavigation: '主要導覽',
    downloadOptions: '下載天文通',
    socialLinks: '社群媒體連結',
    footerNavigation: '頁尾導覽',
  },
  ja: {
    skipToContent: 'メインコンテンツへ移動',
    primaryNavigation: 'メインナビゲーション',
    downloadOptions: 'Stargazing Hub をダウンロード',
    socialLinks: 'ソーシャルリンク',
    footerNavigation: 'フッターナビゲーション',
  },
  ko: {
    skipToContent: '주요 콘텐츠로 이동',
    primaryNavigation: '주요 탐색',
    downloadOptions: 'Stargazing Hub 다운로드',
    socialLinks: '소셜 미디어 링크',
    footerNavigation: '바닥글 탐색',
  },
  de: {
    skipToContent: 'Zum Hauptinhalt springen',
    primaryNavigation: 'Hauptnavigation',
    downloadOptions: 'Stargazing Hub herunterladen',
    socialLinks: 'Soziale Netzwerke',
    footerNavigation: 'Fußzeilennavigation',
  },
  fr: {
    skipToContent: 'Aller au contenu principal',
    primaryNavigation: 'Navigation principale',
    downloadOptions: 'Télécharger Stargazing Hub',
    socialLinks: 'Liens vers les réseaux sociaux',
    footerNavigation: 'Navigation du pied de page',
  },
  es: {
    skipToContent: 'Ir al contenido principal',
    primaryNavigation: 'Navegación principal',
    downloadOptions: 'Descargar Stargazing Hub',
    socialLinks: 'Enlaces de redes sociales',
    footerNavigation: 'Navegación del pie de página',
  },
  it: {
    skipToContent: 'Vai al contenuto principale',
    primaryNavigation: 'Navigazione principale',
    downloadOptions: 'Scarica Stargazing Hub',
    socialLinks: 'Link ai social media',
    footerNavigation: 'Navigazione a piè di pagina',
  },
  ru: {
    skipToContent: 'Перейти к основному содержанию',
    primaryNavigation: 'Основная навигация',
    downloadOptions: 'Скачать Stargazing Hub',
    socialLinks: 'Ссылки на социальные сети',
    footerNavigation: 'Навигация в нижней части страницы',
  },
  nl: {
    skipToContent: 'Naar de hoofdinhoud',
    primaryNavigation: 'Hoofdnavigatie',
    downloadOptions: 'Stargazing Hub downloaden',
    socialLinks: 'Links naar sociale media',
    footerNavigation: 'Voettekstnavigatie',
  },
  pl: {
    skipToContent: 'Przejdź do głównej treści',
    primaryNavigation: 'Główna nawigacja',
    downloadOptions: 'Pobierz Stargazing Hub',
    socialLinks: 'Linki do mediów społecznościowych',
    footerNavigation: 'Nawigacja w stopce',
  },
};

const copy: Record<Language, MarketingUi> = {
  en: {
    demo: 'Watch the app in 30 seconds',
    explore: 'Read the feature guide',
    allFeatures: 'Browse every feature',
    tourTitle: 'See the main features on screen',
    tourBody: 'The current English app screens show the stargazing forecast, light pollution map, sky photo recognition and sky map.',
    forecastNote: 'Forecasts help with planning. Weather and visibility can still change at the site.',
    support: 'Support',
    languages: 'Languages',
    appStoreRating: 'App Store rating',
  },
  zh: {
    demo: '看 30 秒功能演示',
    explore: '查看功能说明',
    allFeatures: '查看全部功能',
    tourTitle: '用 30 秒看主要功能',
    tourBody: '演示使用当前英文版界面，展示观星预报、光污染地图、星空照片识别和真实星图。',
    forecastNote: '预报用于规划，不能保证现场可见。天气和能见度仍可能变化。',
    support: '帮助与支持',
    languages: '语言',
    appStoreRating: 'App Store 评分',
  },
  'zh-tw': {
    demo: '看 30 秒功能示範',
    explore: '查看功能說明',
    allFeatures: '查看全部功能',
    tourTitle: '用 30 秒看主要功能',
    tourBody: '示範使用目前英文版介面，展示觀星預報、光害地圖、星空照片辨識和真實星圖。',
    forecastNote: '預報用於規劃，不能保證現場可見。天氣與能見度仍可能改變。',
    support: '協助與支援',
    languages: '語言',
    appStoreRating: 'App Store 評分',
  },
  ja: {
    demo: '30秒でアプリの機能を見る',
    explore: '機能ガイドを読む',
    allFeatures: 'すべての機能を見る',
    tourTitle: '主な機能を30秒で確認',
    tourBody: '現在の英語版画面で、観測予報、光害マップ、星空写真の認識、星図を紹介します。',
    forecastNote: '予報は計画の参考情報です。現地の天候や見え方は変わることがあります。',
    support: 'サポート',
    languages: '言語',
    appStoreRating: 'App Store評価',
  },
  ko: {
    demo: '30초 기능 영상 보기',
    explore: '기능 안내 보기',
    allFeatures: '모든 기능 보기',
    tourTitle: '30초로 주요 기능 확인',
    tourBody: '현재 영어 앱 화면에서 관측 예보, 광공해 지도, 밤하늘 사진 인식과 별 지도를 보여 줍니다.',
    forecastNote: '예보는 계획을 돕는 자료입니다. 현장의 날씨와 가시성은 달라질 수 있습니다.',
    support: '지원',
    languages: '언어',
    appStoreRating: 'App Store 평점',
  },
  de: {
    demo: 'Die App in 30 Sekunden ansehen',
    explore: 'Funktionsguide lesen',
    allFeatures: 'Alle Funktionen ansehen',
    tourTitle: 'Die wichtigsten Funktionen auf dem Bildschirm',
    tourBody: 'Aktuelle englische App-Ansichten zeigen Beobachtungsvorhersage, Lichtverschmutzungskarte, Fotoerkennung und Sternkarte.',
    forecastNote: 'Prognosen helfen bei der Planung. Wetter und Sicht vor Ort können sich ändern.',
    support: 'Support',
    languages: 'Sprachen',
    appStoreRating: 'App Store Bewertung',
  },
  fr: {
    demo: 'Voir l’app en 30 secondes',
    explore: 'Lire le guide de la fonction',
    allFeatures: 'Voir toutes les fonctions',
    tourTitle: 'Les fonctions principales à l’écran',
    tourBody: 'Les écrans anglais actuels montrent les prévisions d’observation, la carte de pollution lumineuse, la reconnaissance photo et la carte du ciel.',
    forecastNote: 'Les prévisions aident à planifier. La météo et la visibilité peuvent encore changer sur place.',
    support: 'Assistance',
    languages: 'Langues',
    appStoreRating: 'Note sur l’App Store',
  },
  es: {
    demo: 'Ver la app en 30 segundos',
    explore: 'Leer la guía de la función',
    allFeatures: 'Ver todas las funciones',
    tourTitle: 'Las funciones principales en pantalla',
    tourBody: 'Las pantallas actuales en inglés muestran el pronóstico de observación, el mapa de contaminación lumínica, el reconocimiento de fotos y el mapa celeste.',
    forecastNote: 'Los pronósticos ayudan a planificar. El tiempo y la visibilidad pueden cambiar en el lugar.',
    support: 'Ayuda',
    languages: 'Idiomas',
    appStoreRating: 'Valoración en App Store',
  },
  it: {
    demo: 'Guarda l’app in 30 secondi',
    explore: 'Leggi la guida alla funzione',
    allFeatures: 'Scopri tutte le funzioni',
    tourTitle: 'Le funzioni principali sullo schermo',
    tourBody: 'Le schermate attuali in inglese mostrano le previsioni per l’osservazione, la mappa dell’inquinamento luminoso, il riconoscimento delle foto e la mappa del cielo.',
    forecastNote: 'Le previsioni aiutano a pianificare. Meteo e visibilità possono cambiare sul posto.',
    support: 'Assistenza',
    languages: 'Lingue',
    appStoreRating: 'Valutazione su App Store',
  },
  ru: {
    demo: 'Посмотреть приложение за 30 секунд',
    explore: 'Открыть описание функции',
    allFeatures: 'Посмотреть все функции',
    tourTitle: 'Основные функции на экране',
    tourBody: 'Текущие экраны на английском показывают прогноз наблюдений, карту засветки, распознавание фотографий и карту неба.',
    forecastNote: 'Прогноз помогает планировать. Погода и видимость на месте могут измениться.',
    support: 'Поддержка',
    languages: 'Языки',
    appStoreRating: 'Оценка в App Store',
  },
  nl: {
    demo: 'Bekijk de app in 30 seconden',
    explore: 'Lees de functiegids',
    allFeatures: 'Bekijk alle functies',
    tourTitle: 'De belangrijkste functies in beeld',
    tourBody: 'De huidige Engelse appschermen tonen de observatieverwachting, lichtvervuilingskaart, fotoherkenning en sterrenkaart.',
    forecastNote: 'Voorspellingen helpen bij het plannen. Weer en zicht kunnen ter plaatse veranderen.',
    support: 'Ondersteuning',
    languages: 'Talen',
    appStoreRating: 'App Store beoordeling',
  },
  pl: {
    demo: 'Zobacz aplikację w 30 sekund',
    explore: 'Przeczytaj opis funkcji',
    allFeatures: 'Zobacz wszystkie funkcje',
    tourTitle: 'Główne funkcje na ekranie',
    tourBody: 'Aktualne angielskie ekrany pokazują prognozę obserwacji, mapę zanieczyszczenia światłem, rozpoznawanie zdjęć i mapę nieba.',
    forecastNote: 'Prognozy pomagają planować. Pogoda i widoczność na miejscu mogą się zmienić.',
    support: 'Pomoc',
    languages: 'Języki',
    appStoreRating: 'Ocena w App Store',
  },
};

export function getMarketingUi(language: string): MarketingUi {
  return copy[language as Language] ?? copy.en!;
}

export function getAccessibilityUi(language: string): AccessibilityUi {
  return accessibilityCopy[language as Language] ?? accessibilityCopy.en!;
}
