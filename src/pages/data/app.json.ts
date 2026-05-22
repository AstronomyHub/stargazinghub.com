import { buildAppData } from '../../data/appKnowledge';

export function GET() {
  return new Response(JSON.stringify(buildAppData(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
