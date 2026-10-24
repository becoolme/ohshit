import type { APIRoute } from 'astro';
import { getIncidents, isoDate } from '../lib/incidents';
import { LANGS, HTML_LANG, localePath } from '../lib/i18n';
import { getCveSite } from '../lib/cve/site';

export const GET: APIRoute = async ({ site }) => {
  const list = await getIncidents('zh');
  const lastmod = (i: (typeof list)[number]) => i.data.updated ?? i.data.date;
  const newest = list.reduce<Date | undefined>((m, i) => (!m || lastmod(i) > m ? lastmod(i) : m), undefined);
  const cves = await getCveSite();
  // Untranslated Chinese pages point their canonical at the English page, so leave them out.
  const pages = [
    { path: '/', lastmod: newest, langs: LANGS },
    { path: '/cves/', lastmod: new Date(cves.manifest.syncedAt), langs: LANGS },
    ...list.map((i) => ({ path: `/incidents/${i.id}/`, lastmod: lastmod(i), langs: i.translation ? LANGS : (['en'] as const) })),
    // CVE pages are English only.
    ...[...cves.pages].map((id) => ({ path: `/cves/${id}/`, lastmod: new Date(cves.byId.get(id)!.modified), langs: ['en'] as const })),
  ];
  const url = (path: string, lang: (typeof LANGS)[number]) => new URL(localePath(lang, path), site).href;
  const entries = pages.flatMap((p) =>
    p.langs.map((lang) => {
      const alts =
        p.langs.length > 1
          ? p.langs.map((l) => `\n    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${url(p.path, l)}"/>`).join('') +
            `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url(p.path, 'en')}"/>`
          : '';
      return `  <url>\n    <loc>${url(p.path, lang)}</loc>${p.lastmod ? `\n    <lastmod>${isoDate(p.lastmod)}</lastmod>` : ''}${alts}\n  </url>`;
    }),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
