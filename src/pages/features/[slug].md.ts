import { buildFeatureMarkdown, featurePages } from '../../data/appKnowledge';

export function getStaticPaths() {
  return featurePages.map((feature) => ({
    params: { slug: feature.slug },
    props: { feature },
  }));
}

export function GET({ props }: { props: { feature: (typeof featurePages)[number] } }) {
  return new Response(buildFeatureMarkdown(props.feature), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
