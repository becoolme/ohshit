import type { APIRoute } from 'astro';
import { renderOg } from '../../lib/og';
import { getIncidents, smellIndex } from '../../lib/incidents';
import { LEVELS } from '../../lib/levels';

export const GET: APIRoute = async () => {
  const list = await getIncidents();
  const level = smellIndex(list);
  const png = await renderOg({
    title: 'Every security incident on the internet, graded by stench.',
    kicker: `// SHIT INDEX TODAY: L${level} ${LEVELS[level].name.toUpperCase()}`,
    level,
    meta: [`${list.length} incidents`, 'JSON API · MCP · RSS'],
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
