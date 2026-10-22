import type { APIRoute } from 'astro';
import { getIncidents, smellIndex, toApi } from '../../../lib/incidents';

export const GET: APIRoute = async ({ site }) => {
  const list = await getIncidents();
  const body = {
    version: 1,
    generated_at: new Date().toISOString(),
    smell_index: smellIndex(list),
    count: list.length,
    data: list.map((i) => toApi(i, site)),
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
