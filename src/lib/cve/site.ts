// Build-time view of the CVE snapshot for Astro pages. Reads the tracked data and the manifest that
// `npm run cve:build` generated, so pages and the client search always describe the same build.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readSnapshot } from './store';
import { hasCvePage, type Manifest } from './search';
import type { CveRecord } from './data';
import { getIncidents } from '../incidents';

export type SiteCve = CveRecord & { kev: boolean };
export interface CveSite {
  manifest: Manifest;
  records: SiteCve[];
  byId: Map<string, SiteCve>;
  /** Incident slugs that cite each CVE, newest incident first. */
  cited: Map<string, string[]>;
  /** IDs that get a static page; see hasCvePage. */
  pages: Set<string>;
}

// Cloudflare static assets allow 20,000 files per deployment on the free plan; keep well clear of it.
const MAX_PAGES = 12_000;

let site: Promise<CveSite> | undefined;
export function getCveSite(): Promise<CveSite> {
  return (site ??= (async () => {
    const snapshot = await readSnapshot(resolve('data/cves'));
    if (!snapshot) throw new Error('CVE snapshot missing: run npm run cve:sync first');
    let manifest: Manifest;
    try { manifest = JSON.parse(await readFile(resolve('public/data/cves/manifest.json'), 'utf8')); }
    catch { throw new Error('CVE assets missing: run npm run cve:build first'); }
    if (manifest.syncedAt !== snapshot.syncedAt) throw new Error('CVE assets are stale: run npm run cve:build');
    const kev = new Set(snapshot.kev);
    const records = snapshot.records.map((r) => ({ ...r, kev: kev.has(r.id) }));
    const cited = new Map<string, string[]>();
    for (const i of await getIncidents()) for (const c of i.data.cves) if (c.id.startsWith('CVE-')) cited.set(c.id, [...(cited.get(c.id) ?? []), i.id]);
    const pages = new Set(records.filter((r) => hasCvePage(r, cited.has(r.id))).map((r) => r.id));
    if (pages.size > MAX_PAGES) throw new Error(`${pages.size} CVE pages exceed the ${MAX_PAGES} page budget; tighten hasCvePage`);
    return { manifest, records, byId: new Map(records.map((r) => [r.id, r])), cited, pages };
  })());
}

export { productLine, scoreSourceLabel } from './search';
