import { appUpdatedAt, downloadLinks, faqItems } from '../data/appKnowledge';

export function GET() {
  const body = `# Stargazing Hub FAQ

Last updated: ${appUpdatedAt}
Canonical page: https://stargazinghub.com/faq/

${faqItems
  .map(
    (item) => `## ${item.question}

${item.answer}
`
  )
  .join('\n')}

## Download

- App Store: ${downloadLinks.appStore}
- Google Play: ${downloadLinks.googlePlay}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
