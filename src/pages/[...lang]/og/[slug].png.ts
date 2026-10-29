import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '../../../lib/og';
import { getIncidents, type Incident } from '../../../lib/incidents';
import { LANGS, type Lang } from '../../../lib/i18n';
import { incidentOg } from '../../../lib/incident-og';
import type { Level } from '../../../lib/levels';

export const getStaticPaths = (async () => {
  const paths = [];
  for (const lang of LANGS) {
    for (const i of await getIncidents(lang)) {
      paths.push({ params: { lang: lang === 'en' ? undefined : lang, slug: i.id }, props: { i, lang } });
    }
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { i, lang } = props as { i: Incident; lang: Lang };
  const png = await renderOg(incidentOg({ ...i.data, level: i.data.level as Level }, lang));
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
