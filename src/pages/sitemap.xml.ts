import type { APIRoute } from 'astro';
import { getIncidents, isoDate } from '../lib/incidents';

export const GET: APIRoute = async ({ site }) => {
  const list = await getIncidents();
  const lastmod = (i: (typeof list)[number]) => i.data.updated ?? i.data.date;
  const newest = list.reduce<Date | undefined>((m, i) => (!m || lastmod(i) > m ? lastmod(i) : m), undefined);
  const urls = [
    { loc: new URL('/', site).href, lastmod: newest },
    ...list.map((i) => ({ loc: new URL(`/incidents/${i.id}/`, site).href, lastmod: lastmod(i) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${isoDate(u.lastmod)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
