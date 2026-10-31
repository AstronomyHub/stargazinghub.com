import { buildStargazingWeatherAppAndroidMarkdown } from '../data/stargazingWeatherAppAndroid';

export function GET() {
  return new Response(buildStargazingWeatherAppAndroidMarkdown(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
