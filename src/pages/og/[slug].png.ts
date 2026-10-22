import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../lib/og';
import { getIncidents, formatDate, type Incident } from '../../lib/incidents';
import type { Level } from '../../lib/levels';

export const getStaticPaths = (async () =>
  (await getIncidents()).map((i) => ({ params: { slug: i.id }, props: { i } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { i } = props as { i: Incident };
  const d = i.data;
  const top = d.cves.reduce<number | undefined>((m, c) => (c.score != null && (m == null || c.score > m) ? c.score : m), undefined);
  const meta = [formatDate(d.date, d.dateIsApproximate)];
  if (d.cves.length) meta.push(d.cves.length === 1 ? d.cves[0].id : `${d.cves.length} CVEs`);
  if (top != null) meta.push(`CVSS ${top.toFixed(1)}`);
  const png = await renderOg({
    title: d.headline ?? d.title,
    level: d.level as Level,
    kicker: `// CRIME SCENE: ${d.tags.join(' · ').toUpperCase()}`,
    meta,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
