import type { APIRoute } from 'astro';
import { renderOg } from '../../lib/og';
import { getCveSite } from '../../lib/cve/site';
import { WINDOW_DAYS } from '../../lib/cve/data';

export const GET: APIRoute = async () => {
  const { manifest } = await getCveSite();
  const png = await renderOg({
    title: `Every CVE from the last ${WINDOW_DAYS} days, searchable.`,
    kicker: '// CVE INDEX · SYNCED DAILY',
    meta: [`${manifest.stats.total.toLocaleString('en-US')} CVEs`, `${manifest.stats.critical.toLocaleString('en-US')} critical`, `${manifest.stats.kev} in CISA KEV`],
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
