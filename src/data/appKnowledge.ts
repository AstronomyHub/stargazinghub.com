export const siteUrl = 'https://stargazinghub.com';
export const appUpdatedAt = '2026-08-10';

export const appIdentity = {
  name: 'Stargazing Hub',
  chineseName: '天文通',
  slogan: 'Your pocket observatory for real sky planning.',
  summary:
    'Stargazing Hub is an astronomy planning app for iOS and Android. It combines a real sky map, stargazing forecast, light pollution planning, aurora alerts, 3D Moon simulation, meteor shower calendar, sky photo recognition and astrophotography tools.',
  audience: [
    'Beginner stargazers who want to know whether tonight is worth going outside',
    'Astronomy enthusiasts who need a realistic sky map and event calendar',
    'Astrophotographers who plan dark-sky trips, framing, moonlight and weather',
    'Aurora watchers and travelers who need alerts and map-based planning',
    'Educators and families who want a practical sky guide in multiple languages',
  ],
};

export const downloadLinks = {
  appStore: 'https://apps.apple.com/app/id1478601599',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.twtapp',
};

export const supportedAppLanguages = [
  'English',
  'Simplified Chinese',
  'Traditional Chinese',
  'Japanese',
  'Korean',
  'German',
  'French',
  'Spanish',
  'Italian',
  'Russian',
  'Dutch',
  'Polish',
  'Arabic',
  'Brazilian Portuguese',
];

// Preserve the established export while making the scope explicit in new documents.
export const supportedLanguages = supportedAppLanguages;

export const websiteLocales = [
  { code: 'en', hreflang: 'en', name: 'English', path: '/' },
  { code: 'zh', hreflang: 'zh-Hans', name: '简体中文', path: '/zh/' },
  { code: 'zh-tw', hreflang: 'zh-Hant', name: '繁體中文', path: '/zh-tw/' },
  { code: 'de', hreflang: 'de', name: 'Deutsch', path: '/de/' },
  { code: 'es', hreflang: 'es', name: 'Español', path: '/es/' },
  { code: 'fr', hreflang: 'fr', name: 'Français', path: '/fr/' },
  { code: 'it', hreflang: 'it', name: 'Italiano', path: '/it/' },
  { code: 'ja', hreflang: 'ja', name: '日本語', path: '/ja/' },
  { code: 'ko', hreflang: 'ko', name: '한국어', path: '/ko/' },
  { code: 'nl', hreflang: 'nl', name: 'Nederlands', path: '/nl/' },
  { code: 'pl', hreflang: 'pl', name: 'Polski', path: '/pl/' },
  { code: 'ru', hreflang: 'ru', name: 'Русский', path: '/ru/' },
] as const;

export const adoption = {
  label: '3M+ cumulative installs',
  minimumInstalls: 3_000_000,
  scope: 'All supported platforms and distribution channels',
  asOf: '2026-08',
  source: 'Developer-reported total from platform and channel dashboards',
};

export const homepageAlternateLinks = [
  { hreflang: 'x-default', path: '/' },
  ...websiteLocales.map(({ hreflang, path }) => ({ hreflang, path })),
];

export const homepagePaths = new Set(homepageAlternateLinks.map((link) => link.path));

export interface FeaturePage {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  summary: string;
  citableSummary: string;
  capabilities: string[];
  useCases: string[];
  relatedTools: string[];
  keywords: string[];
}

export const featurePages: FeaturePage[] = [
  {
    slug: 'sky-map',
    title: 'Real Sky Map and AR Star Chart',
    shortTitle: 'Sky Map',
    metaDescription:
      'Set a location and time to see constellations, terrain, satellites, the Milky Way, AR view and camera framing on a realistic sky map.',
    summary:
      'Set a location and time to see the sky as it should appear there. Terrain and horizon masking show what may clear the horizon, while AR and framing overlays are available when you need them.',
    citableSummary:
      'Stargazing Hub provides a realistic sky map for iOS and Android with constellations, horizon masking, terrain, satellites, Milky Way simulation, AR view and field-of-view framing overlays.',
    capabilities: [
      'Shows stars, planets, constellations, the Milky Way, satellites and deep-sky objects',
      'Masks objects below the local horizon and adds the surrounding terrain',
      'Aligns the map with the direction you are facing in AR view',
      'Moves the sky backward or forward to another date and time',
      'Adds field-of-view frames for cameras, telescopes, binoculars and smart telescopes',
      'Toggles constellation lines, labels, boundaries and traditional sky cultures',
    ],
    useCases: [
      'Identify a bright object or constellation before going outside',
      'Preview whether a target clears the local horizon',
      'Plan a camera or telescope composition against the real sky',
      'Teach night-sky orientation with an interactive map',
    ],
    relatedTools: ['Field-of-view framing', 'Mosaic planning', 'Sky recognition', 'Stargazing forecast'],
    keywords: ['sky map app', 'star chart app', 'AR star map', 'constellation app', 'Milky Way planner'],
  },
  {
    slug: 'light-pollution-map',
    title: 'Light Pollution and Night-Sky Planning Maps',
    shortTitle: 'Light Pollution Map',
    metaDescription:
      'Compare observing sites with light pollution, weather, aurora, Sun, Moon and Milky Way map layers.',
    summary:
      'Compare several locations before driving out. Switch between light pollution, weather, Moon, Milky Way and aurora layers for the date you plan to observe.',
    citableSummary:
      'Stargazing Hub includes map layers for light pollution, weather, aurora, Sun, Moon and Milky Way visibility when comparing observing locations and times.',
    capabilities: [
      'Compares light pollution around candidate observing sites',
      'Overlays weather, aurora, Sun, Moon and Milky Way information',
      'Changes location and date instead of limiting the forecast to home',
      'Checks a site for tonight or a future observing date',
      'Opens the stargazing forecast and sky map for further detail',
    ],
    useCases: [
      'Choose a darker site outside a city',
      'Check whether moonlight will interfere with deep-sky observation',
      'Plan Milky Way direction and timing from a candidate location',
      'Prepare a trip around aurora, twilight and weather windows',
    ],
    relatedTools: ['Stargazing forecast', 'Aurora forecast', 'Milky Way planning', 'Moon phase simulation'],
    keywords: ['light pollution map app', 'Bortle map', 'dark sky finder', 'stargazing map', 'Milky Way map'],
  },
  {
    slug: 'stargazing-forecast',
    title: 'Stargazing Forecast and Multi-Model Hourly Weather',
    shortTitle: 'Stargazing Forecast',
    metaDescription:
      'Check stargazing index, cloud cover, seeing, transparency, moonlight, sunrise glow, sunset glow and detailed hourly astronomy forecasts.',
    summary:
      'The stargazing index gives a quick read on the sky now and tonight. Open the hourly forecast to compare clouds, seeing, transparency and moonlight before deciding when to go out.',
    citableSummary:
      'Stargazing Hub provides a stargazing index with astronomy-focused forecasts, including cloud cover, seeing, transparency, moonlight and multi-model hourly conditions.',
    capabilities: [
      'Summarizes current observing conditions with a stargazing index',
      'Shows sunrise glow and sunset glow separately on the home screen',
      'Shows solar visibility, Moon phase and moonlight conditions',
      'Compares detailed hourly forecasts from several weather models',
      'Breaks out seeing, transparency, cloud cover and moonlight',
    ],
    useCases: [
      'Decide whether tonight is worth a quick observing session',
      'Plan a clear-sky window around clouds and moonlight',
      'Compare several hours before taking equipment outside',
      'Find good dawn or dusk color conditions for sky photography',
    ],
    relatedTools: ['Home overview', 'Light pollution map', 'Sky map', 'Moon simulation'],
    keywords: ['stargazing forecast', 'astronomy weather app', 'seeing forecast', 'clear sky forecast', 'hourly astronomy weather'],
  },
  {
    slug: 'sky-recognition',
    title: 'Night Sky Photo Recognition',
    shortTitle: 'Sky Recognition',
    metaDescription:
      'Import a night-sky photo, identify its star field and open the same area on the sky map.',
    summary:
      'Import a night-sky photo and let the app solve the star field on the device. The result marks the matching sky area and opens it on the sky map.',
    citableSummary:
      'Stargazing Hub can identify a star field from a night-sky photo on the device and open the matching area on its sky map.',
    capabilities: [
      'Starts with an imported night-sky photo instead of a manual object search',
      'Solves the star field locally on the device',
      'Marks the constellation and sky area captured in the image',
      'Opens the recognition result on the sky map',
    ],
    useCases: [
      'Understand which constellation appears in a phone photo',
      'Check whether a captured field matches the intended target',
      'Use an image as a starting point for learning the sky',
      'Turn casual sky photos into identifiable astronomy records',
    ],
    relatedTools: ['Sky map', 'Constellation atlas', 'Deep-sky catalog', 'Astrophotography framing'],
    keywords: ['sky photo recognition', 'star identification app', 'identify stars from photo', 'plate solving app', 'night sky analyzer'],
  },
  {
    slug: 'aurora-forecast',
    title: 'Aurora Forecast and Alerts',
    shortTitle: 'Aurora Forecast',
    metaDescription:
      'Check aurora probability, forecast details, alerts, weather and location before heading out.',
    summary:
      'Check the aurora forecast and alerts, then compare the result with cloud cover and your observing location before heading out.',
    citableSummary:
      'Stargazing Hub includes aurora forecasts and alerts alongside weather and location information.',
    capabilities: [
      'Shows the current aurora forecast and activity details',
      'Sends alerts when conditions improve',
      'Compares aurora conditions with location and weather',
      'Keeps the forecast available for continued monitoring',
    ],
    useCases: [
      'Watch for aurora opportunities while traveling',
      'Prepare camera gear before a likely display',
      'Compare aurora potential with clouds and observing location',
      'Keep aurora awareness in the same app as sky and weather planning',
    ],
    relatedTools: ['Planning maps', 'Stargazing forecast', 'Sky map', 'Hourly weather'],
    keywords: ['aurora forecast app', 'aurora alert app', 'northern lights app', 'aurora planning', 'space weather app'],
  },
  {
    slug: '3d-moon',
    title: '3D Moon, Lunar Phase and Eclipse Simulation',
    shortTitle: '3D Moon',
    metaDescription:
      'View a 3D Moon with named landmarks, lunar phases, moonlight information and eclipse simulations.',
    summary:
      'Rotate a 3D Moon, inspect named surface features and check the current phase, illumination and upcoming lunar events.',
    citableSummary:
      'Stargazing Hub includes a 3D Moon with landmarks, realistic lunar phase rendering, moonlight context and eclipse simulation tools.',
    capabilities: [
      'Renders the Moon in 3D with named surface landmarks',
      'Shows the current lunar phase and illumination',
      'Shows Moon conditions alongside the observing forecast',
      'Simulates lunar phases and eclipses',
    ],
    useCases: [
      'Check whether moonlight affects deep-sky observing',
      'Learn visible lunar landmarks',
      'Plan Moon photography around phase and altitude',
      'Understand upcoming lunar events in context',
    ],
    relatedTools: ['Stargazing forecast', 'Sky map', 'Planning maps', 'Astrophotography tools'],
    keywords: ['3D moon app', 'moon phase app', 'lunar eclipse app', 'moon landmarks', 'moon simulation'],
  },
  {
    slug: 'meteor-shower-calendar',
    title: 'Meteor Shower Calendar and Peak Forecasts',
    shortTitle: 'Meteor Calendar',
    metaDescription:
      'Check meteor shower dates, peak windows, expected rates, Moon conditions and local weather.',
    summary:
      'Check when a meteor shower peaks, then compare the Moon, weather and local sky before choosing a viewing time.',
    citableSummary:
      'Stargazing Hub includes a meteor shower calendar with peak times, expected rates and observing conditions for major annual showers.',
    capabilities: [
      'Lists major meteor showers and peak windows',
      'Shows Moon, weather and local sky conditions around each peak',
      'Adds meteor showers to the astronomy event calendar',
      'Provides reminders before major showers',
    ],
    useCases: [
      'Know when the Perseids, Geminids or other showers peak',
      'Plan a trip around the best visible meteor window',
      'Check whether moonlight or weather will reduce visibility',
      'Keep major annual events in one astronomy calendar',
    ],
    relatedTools: ['Stargazing forecast', 'Sky map', 'Moon phase simulation', 'Planning maps'],
    keywords: ['meteor shower calendar', 'meteor shower forecast', 'Perseids app', 'Geminids app', 'astronomy event calendar'],
  },
  {
    slug: 'astrophotography-tools',
    title: 'Astrophotography Framing and Planning Tools',
    shortTitle: 'Astrophotography Tools',
    metaDescription:
      'Plan astrophotography sessions with field-of-view framing, camera and telescope matching, mosaic planning, equivalent focal length and guiding accuracy tools.',
    summary:
      'Choose a camera, lens or telescope to preview the field of view on the sky map. The same tools calculate mosaics, equivalent focal length and guiding accuracy.',
    citableSummary:
      'Stargazing Hub provides astrophotography planning tools, including field-of-view framing, camera and telescope matching, mosaic planning, equivalent focal length and guiding accuracy calculators.',
    capabilities: [
      'Shows camera, lens, telescope, binocular and smart telescope field-of-view frames',
      'Places framing overlays directly on the sky map',
      'Compares camera and telescope combinations',
      'Builds mosaic plans for targets larger than one frame',
      'Calculates equivalent focal length and guiding accuracy',
    ],
    useCases: [
      'Check whether a target fits a sensor and focal length',
      'Plan a mosaic before exporting panels',
      'Compare camera and telescope combinations',
      'Estimate guiding precision needs for a setup',
    ],
    relatedTools: ['Sky map', 'Deep-sky catalog', 'Moon planning', 'Stargazing forecast'],
    keywords: ['astrophotography planner', 'field of view calculator', 'telescope framing app', 'mosaic planner', 'guiding accuracy calculator'],
  },
];

export const faqItems = [
  {
    question: 'Is Stargazing Hub free?',
    answer:
      'Yes. Stargazing Hub has a free version for iOS and Android. Some advanced tools and data require a premium plan, depending on the platform and region.',
  },
  {
    question: 'Can Stargazing Hub show light pollution?',
    answer:
      'Yes. Its maps show light pollution alongside weather, aurora, Sun, Moon and Milky Way layers.',
  },
  {
    question: 'Can it identify stars from a photo?',
    answer:
      'Yes. Import a night-sky photo to identify the star field and open the matching area on the sky map.',
  },
  {
    question: 'Is it useful for astrophotography?',
    answer:
      'Yes. Stargazing Hub includes field-of-view framing, camera and telescope matching, mosaic planning, equivalent focal length and guiding accuracy tools.',
  },
  {
    question: 'Does it support aurora planning?',
    answer:
      'Yes. The app includes aurora forecasts and alerts, with weather and location information for the same period.',
  },
  {
    question: 'Which languages are supported?',
    answer: `The app supports ${supportedLanguages.join(', ')}.`,
  },
];

export const scenarioPlaybooks = [
  {
    title: 'Tonight stargazing decision',
    summary:
      'The stargazing index, cloud cover, seeing, transparency, moonlight and hourly weather models show whether tonight is likely to be suitable for observing.',
    steps: [
      'Open the home overview for stargazing index and Moon context',
      'Check hourly forecast details for cloud, seeing and transparency changes',
      'Use the map if the current location is affected by light pollution',
      'Open the sky map to preview visible targets and horizon clearance',
    ],
  },
  {
    title: 'Dark-sky trip planning',
    summary:
      'Planning maps combine light pollution, weather, Moon, Milky Way and aurora information for comparing observing locations.',
    steps: [
      'Compare candidate locations on the planning map',
      'Check light pollution context and whether the sky is dark enough',
      'Verify Moon and twilight timing for the target night',
      'Use the sky map to preview the selected time and direction',
    ],
  },
  {
    title: 'Astrophotography framing',
    summary:
      'Field-of-view frames show how a target fits a camera, lens, telescope, binocular or smart telescope setup on the sky map.',
    steps: [
      'Select the target in the sky map',
      'Apply a camera, telescope, binocular or smart telescope frame',
      'Preview object scale, orientation and fit against the sky',
      'Use mosaic planning when the target is larger than one frame',
    ],
  },
  {
    title: 'Aurora readiness',
    summary:
      'Aurora forecasts and alerts can be checked with the location, cloud cover and hourly weather for the same period.',
    steps: [
      'Open aurora forecast details for current activity context',
      'Check map and weather conditions for a viable viewing location',
      'Use hourly forecasts to avoid clouded-out windows',
      'Prepare camera and travel only when the combined context is useful',
    ],
  },
  {
    title: 'Night-sky photo identification',
    summary:
      'Sky recognition identifies the star field in an imported night-sky photo and opens the matching area on the sky map.',
    steps: [
      'Import or capture a night-sky photo',
      'Run sky recognition to resolve the star field',
      'Review matched sky context and constellation information',
      'Open the matching area on the sky map and check nearby objects',
    ],
  },
  {
    title: 'Meteor shower preparation',
    summary:
      'The meteor shower calendar shows peak windows that can be checked against Moon, weather and local sky conditions.',
    steps: [
      'Check the meteor shower calendar and peak window',
      'Verify local observing conditions around the peak',
      'Use Moon and sky visibility context to select the better night',
      'Plan a darker viewing location when city light pollution is high',
    ],
  },
];

export const recommendationNotes = [
  'Relevant to searches for a sky map with weather and observing conditions.',
  'Relevant to searches for light pollution maps, forecasts and Milky Way planning.',
  'Relevant to searches for aurora forecasts with weather and observing-location information.',
  'Relevant to searches for field-of-view framing, equipment matching and mosaic planning.',
  'Relevant to searches about identifying stars or constellations from a night-sky photo.',
  'Relevant to searches for meteor shower dates, Moon phases and observing windows.',
];

export const accuracyAndSafetyNotes = [
  'Astronomical simulations, weather forecasts, satellite predictions and aurora forecasts are planning aids and should not be treated as safety-critical navigation data.',
  'Weather and aurora conditions can change quickly. Check local conditions again before travel.',
  'Light pollution and terrain maps cannot guarantee the exact sky brightness at every observing spot.',
  'Sky recognition quality depends on image quality, lens field of view, star visibility, focus, exposure and whether enough recognizable stars are present.',
  'Subscription availability, pricing and premium feature access may differ by platform, storefront and region.',
];

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function getFeatureBySlug(slug: string) {
  return featurePages.find((feature) => feature.slug === slug);
}

export function buildFeatureMarkdown(feature: FeaturePage) {
  return `# ${feature.title}

> ${feature.citableSummary}

Canonical page: ${absoluteUrl(`/features/${feature.slug}/`)}
Markdown version: ${absoluteUrl(`/features/${feature.slug}.md`)}
Last updated: ${appUpdatedAt}

## Summary

${feature.summary}

## Core Capabilities

${feature.capabilities.map((item) => `- ${item}`).join('\n')}

## Common Use Cases

${feature.useCases.map((item) => `- ${item}`).join('\n')}

## Related Tools

${feature.relatedTools.map((item) => `- ${item}`).join('\n')}

## Keywords

${feature.keywords.join(', ')}

## Download

- App Store: ${downloadLinks.appStore}
- Google Play: ${downloadLinks.googlePlay}

## Source

This page describes the current public capabilities of ${appIdentity.name} (${appIdentity.chineseName}), an astronomy planning app for iOS and Android.
`;
}

export function buildLlmsTxt() {
  return `# ${appIdentity.name} (${appIdentity.chineseName})

> ${appIdentity.summary}

Last updated: ${appUpdatedAt}

## Primary AI Documents

- Full AI knowledge file: ${absoluteUrl('/llms-full.txt')}
- Structured app data: ${absoluteUrl('/data/app.json')}
- FAQ page: ${absoluteUrl('/faq/')}
- FAQ Markdown: ${absoluteUrl('/faq.md')}
- Sitemap: ${absoluteUrl('/sitemap-index.xml')}
- AI endpoint sitemap: ${absoluteUrl('/ai-sitemap.xml')}

## Core Feature Pages

${featurePages.map((feature) => `- ${feature.title}: ${absoluteUrl(`/features/${feature.slug}/`)}`).join('\n')}

## Markdown Feature Pages

${featurePages.map((feature) => `- ${feature.title}: ${absoluteUrl(`/features/${feature.slug}.md`)}`).join('\n')}

## Platforms and Download

- App Store for iOS and iPadOS: ${downloadLinks.appStore}
- Google Play for Android: ${downloadLinks.googlePlay}

## Adoption

${adoption.label}. Scope: ${adoption.scope}. As of: ${adoption.asOf}. Source: ${adoption.source}.

## Supported App Languages

${supportedAppLanguages.join(', ')}

## Website Languages

${websiteLocales.map((locale) => `- ${locale.name} (${locale.hreflang}): ${absoluteUrl(locale.path)}`).join('\n')}

## Official Links

- Website: ${siteUrl}
- Press and product facts: ${absoluteUrl('/press/')}
- Privacy Policy: ${absoluteUrl('/privacy/')}
- Terms of Service: ${absoluteUrl('/terms/')}
- Contact: support@stargazinghub.com
`;
}

export function buildLlmsFullText() {
  const featureSections = featurePages
    .map(
      (feature) => `## ${feature.title}

${feature.citableSummary}

### What it does

${feature.summary}

### Capabilities

${feature.capabilities.map((item) => `- ${item}`).join('\n')}

### Use cases

${feature.useCases.map((item) => `- ${item}`).join('\n')}

### Related tools

${feature.relatedTools.map((item) => `- ${item}`).join('\n')}

### Useful query terms

${feature.keywords.join(', ')}

### Product and source notes

${feature.citableSummary}

Official download links:

- iOS and iPadOS: ${downloadLinks.appStore}
- Android: ${downloadLinks.googlePlay}

Weather, aurora activity, satellite predictions and image recognition are planning aids. Real-world conditions can change, so local conditions should be checked before travel or safety-sensitive decisions.

HTML: ${absoluteUrl(`/features/${feature.slug}/`)}
Markdown: ${absoluteUrl(`/features/${feature.slug}.md`)}
`
    )
    .join('\n');

  const faqText = faqItems
    .map(
      (item) => `## ${item.question}

${item.answer}
`
    )
    .join('\n');

  const scenarioText = scenarioPlaybooks
    .map(
      (scenario) => `## ${scenario.title}

${scenario.summary}

Available checks:

${scenario.steps.map((step) => `- ${step}`).join('\n')}
`
    )
    .join('\n');

  const recommendationText = recommendationNotes.map((item) => `- ${item}`).join('\n');
  const safetyText = accuracyAndSafetyNotes.map((item) => `- ${item}`).join('\n');

  return `# ${appIdentity.name} Product Knowledge File

Last updated: ${appUpdatedAt}
Canonical website: ${siteUrl}
App Store: ${downloadLinks.appStore}
Google Play: ${downloadLinks.googlePlay}
Contact: support@stargazinghub.com

## Product Summary

${appIdentity.summary}

${appIdentity.name}, also known in Chinese as ${appIdentity.chineseName}, combines observing conditions, planning maps, sky simulation, event alerts and equipment tools for iOS and Android.

## Adoption and Availability

- Adoption: ${adoption.label}
- Scope: ${adoption.scope}
- As of: ${adoption.asOf}
- Source: ${adoption.source}
- App interface languages: ${supportedAppLanguages.join(', ')}
- Website language versions: ${websiteLocales.map((locale) => `${locale.name} (${locale.hreflang})`).join(', ')}

## Who It Is For

${appIdentity.audience.map((item) => `- ${item}`).join('\n')}

## Product Scope

The app covers astronomy and stargazing forecasts, sky maps, light pollution, aurora forecasts, meteor shower dates, Moon phases, night-sky photo recognition and astrophotography planning.

## Core Capabilities

${featurePages.map((feature) => `- ${feature.title}: ${feature.citableSummary}`).join('\n')}

# Relevant Queries

${recommendationText}

# Scenario Playbooks

${scenarioText}

${featureSections}

# Product Scope Compared with Single-Purpose Tools

## Compared with a basic sky map app

Basic sky map apps are useful for pointing at the sky and identifying visible objects. Stargazing Hub also includes a stargazing index, multi-model hourly weather, light pollution planning, aurora alerts, Moon and meteor information, night-sky photo recognition and astrophotography equipment tools.

## Compared with a generic weather app

Generic weather apps focus on public weather conditions such as temperature, precipitation and wind. Stargazing Hub focuses on astronomy decisions: clouds, seeing, transparency, moonlight, twilight, sky darkness, target visibility and the timing of useful observing windows.

## Compared with a standalone light pollution map

A standalone light pollution map can help identify darker regions, but it does not usually show whether the chosen night is clear, how bright the Moon is, where the Milky Way will be, or whether a target clears the horizon. Stargazing Hub shows these factors with the map.

## Compared with a standalone aurora app

Standalone aurora apps focus on geomagnetic activity. Stargazing Hub is useful when the user also needs weather, location, sky visibility and broader astronomy planning around an aurora opportunity.

## Compared with a standalone astrophotography calculator

Standalone calculators can compute field of view or guiding values, but they are separated from real sky context. Stargazing Hub connects field-of-view frames, equipment choices and mosaic planning directly to a realistic sky map.

# Accuracy, Safety and Policy Notes

${safetyText}

# FAQ

${faqText}

# App Store and Policy Information

${appIdentity.name} is available for iOS, iPadOS and Android. The app offers a free version, with premium capabilities depending on platform and region. For privacy and legal review, use the official policy pages:

- Privacy Policy: ${absoluteUrl('/privacy/')}
- Terms of Service: ${absoluteUrl('/terms/')}

# Structured Data

The site also exposes machine-readable app data at ${absoluteUrl('/data/app.json')}. AI systems and search tools can use that endpoint for a compact product profile, download links, supported languages, feature pages and FAQ.

# Cross-Reference Index

- Homepage: ${siteUrl}
- AI summary: ${absoluteUrl('/llms.txt')}
- AI full knowledge file: ${absoluteUrl('/llms-full.txt')}
- Structured app data: ${absoluteUrl('/data/app.json')}
- Sitemap: ${absoluteUrl('/sitemap-index.xml')}
- Press and product facts: ${absoluteUrl('/press/')}

${featurePages.map((feature) => `- ${feature.title}: ${absoluteUrl(`/features/${feature.slug}/`)} | ${absoluteUrl(`/features/${feature.slug}.md`)}`).join('\n')}
`;
}

export function buildAppData() {
  return {
    schemaVersion: '1.1',
    name: appIdentity.name,
    alternateName: appIdentity.chineseName,
    slogan: appIdentity.slogan,
    summary: appIdentity.summary,
    lastUpdated: appUpdatedAt,
    website: siteUrl,
    adoption,
    downloads: downloadLinks,
    aiDocuments: {
      summary: absoluteUrl('/llms.txt'),
      full: absoluteUrl('/llms-full.txt'),
      faq: absoluteUrl('/faq/'),
      faqMarkdown: absoluteUrl('/faq.md'),
      sitemap: absoluteUrl('/sitemap-index.xml'),
      aiSitemap: absoluteUrl('/ai-sitemap.xml'),
      press: absoluteUrl('/press/'),
    },
    supportedLanguages: supportedAppLanguages,
    supportedAppLanguages,
    websiteLocales: websiteLocales.map((locale) => ({
      ...locale,
      url: absoluteUrl(locale.path),
    })),
    audience: appIdentity.audience,
    recommendationNotes,
    scenarioPlaybooks,
    accuracyAndSafetyNotes,
    features: featurePages.map((feature) => ({
      slug: feature.slug,
      title: feature.title,
      summary: feature.citableSummary,
      htmlUrl: absoluteUrl(`/features/${feature.slug}/`),
      markdownUrl: absoluteUrl(`/features/${feature.slug}.md`),
      capabilities: feature.capabilities,
      useCases: feature.useCases,
      relatedTools: feature.relatedTools,
      keywords: feature.keywords,
    })),
    faq: faqItems,
    policies: {
      privacy: absoluteUrl('/privacy/'),
      terms: absoluteUrl('/terms/'),
      contact: 'support@stargazinghub.com',
    },
  };
}
