interface MarketingCopy {
  recognitionTitle: string;
  recognitionDescription: string;
  lightPollutionDescription: string;
}

const marketingCopy: Record<string, MarketingCopy> = {
  en: {
    recognitionTitle: 'Sky Recognition',
    recognitionDescription:
      'Identify a wide-field sky photo on-device, then open the recognized field in the star chart.',
    lightPollutionDescription:
      'Compare Bortle conditions, day-night layers, and observing context before choosing a site.',
  },
  zh: {
    recognitionTitle: '星空识别',
    recognitionDescription: '在设备端快速识别广角星空照片，并在星图中打开同一天区。',
    lightPollutionDescription:
      '结合波特尔等级、昼夜分界和观测条件，对比更适合出发的地点。',
  },
  'zh-tw': {
    recognitionTitle: '星空辨識',
    recognitionDescription: '在裝置端快速辨識廣角星空照片，並在星圖中開啟同一天區。',
    lightPollutionDescription:
      '結合波特爾等級、晝夜分界與觀測條件，比較更適合出發的地點。',
  },
  ja: {
    recognitionTitle: '星空写真解析',
    recognitionDescription:
      '広角の星空写真を端末上で解析し、認識した空をそのまま星図で開けます。',
    lightPollutionDescription:
      'ボートル階級、昼夜レイヤー、観測条件を比較して、観測地選びに役立てます。',
  },
  ko: {
    recognitionTitle: '별사진 인식',
    recognitionDescription:
      '광각 밤하늘 사진을 기기에서 분석하고, 인식한 영역을 별자리 지도에서 바로 엽니다.',
    lightPollutionDescription:
      '보틀 등급, 주야간 레이어, 관측 조건을 비교해 관측 장소를 선택할 수 있습니다.',
  },
  de: {
    recognitionTitle: 'Himmelsfoto-Erkennung',
    recognitionDescription:
      'Ein Weitwinkelbild des Nachthimmels direkt auf dem Gerät erkennen und dasselbe Feld in der Sternkarte öffnen.',
    lightPollutionDescription:
      'Vergleiche Bortle-Klasse, Tag-Nacht-Ebenen und Beobachtungsbedingungen, bevor du einen Standort auswählst.',
  },
  fr: {
    recognitionTitle: 'Reconnaissance du ciel',
    recognitionDescription:
      'Reconnaître une photo grand-angle du ciel sur l’appareil, puis ouvrir le même champ dans la carte du ciel.',
    lightPollutionDescription:
      'Comparez l’échelle de Bortle, les couches jour-nuit et le contexte d’observation avant de choisir un site.',
  },
  es: {
    recognitionTitle: 'Reconocimiento del cielo',
    recognitionDescription:
      'Reconoce una foto de cielo gran angular en el dispositivo y abre el mismo campo en el mapa celeste.',
    lightPollutionDescription:
      'Compara la escala de Bortle, las capas de día y noche y el contexto de observación antes de elegir un lugar.',
  },
  it: {
    recognitionTitle: 'Riconoscimento del cielo',
    recognitionDescription:
      'Riconosci sul dispositivo una foto grandangolare del cielo e apri lo stesso campo nella mappa stellare.',
    lightPollutionDescription:
      'Confronta scala di Bortle, livelli giorno-notte e condizioni di osservazione prima di scegliere un sito.',
  },
  ru: {
    recognitionTitle: 'Распознавание неба',
    recognitionDescription:
      'Распознайте широкоугольный снимок неба на устройстве и откройте тот же участок на карте звёзд.',
    lightPollutionDescription:
      'Сравните шкалу Бортля, слои дня и ночи и условия наблюдений перед выбором места.',
  },
  nl: {
    recognitionTitle: 'Sterrenhemelherkenning',
    recognitionDescription:
      'Herken een groothoekfoto van de sterrenhemel op het apparaat en open hetzelfde hemelveld in de sterrenkaart.',
    lightPollutionDescription:
      'Vergelijk de Bortle-klasse, dag-nachtlagen en waarneemomstandigheden voordat je een locatie kiest.',
  },
  pl: {
    recognitionTitle: 'Rozpoznawanie nieba',
    recognitionDescription:
      'Rozpoznaj szerokokątne zdjęcie nieba na urządzeniu i otwórz ten sam obszar na mapie nieba.',
    lightPollutionDescription:
      'Porównaj klasę Bortle’a, warstwy dnia i nocy oraz warunki obserwacji przed wyborem miejsca.',
  },
};

export const getMarketingCopy = (lang: string): MarketingCopy =>
  marketingCopy[lang] || marketingCopy.en;
