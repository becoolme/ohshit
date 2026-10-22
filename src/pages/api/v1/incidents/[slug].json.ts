import type { APIRoute, GetStaticPaths } from 'astro';
import { getIncidents, toApi, type Incident } from '../../../../lib/incidents';

export const getStaticPaths = (async () => {
  const list = await getIncidents();
  return list.map((incident) => ({ params: { slug: incident.id }, props: { incident } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const i = (props as { incident: Incident }).incident;
  const d = i.data;
  const body = {
    ...toApi(i, site),
    headline: d.headline ?? null,
    one_liner: d.oneLiner ?? null,
    in_the_wild_note: d.inTheWildNote ?? null,
    cves: d.cves,
    mitigation: d.mitigation ?? null,
    timeline: d.timeline,
    sources: d.sources,
    body_markdown: i.body ?? '',
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
