import { absoluteUrl, featurePages } from '../data/appKnowledge';

export function GET() {
  const urls = [
    '/llms.txt',
    '/llms-full.txt',
    '/data/app.json',
    '/faq/',
    '/faq.md',
    ...featurePages.flatMap((feature) => [
      `/features/${feature.slug}/`,
      `/features/${feature.slug}.md`,
    ]),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${absoluteUrl(url)}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
