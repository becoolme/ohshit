// Build-time view of the CVE snapshot for Astro pages. Reads the tracked data and the manifest that
// `npm run cve:build` generated, so pages and the client search always describe the same build.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readArchive, readSnapshot } from './store';
import { hasCvePage, type Manifest } from './search';
import type { CveRecord } from './data';
import { getIncidents } from '../incidents';

export type SiteCve = CveRecord & { kev: boolean };
export interface CveSite {
  manifest: Manifest;
  /** CVEs in the search window. */
  records: SiteCve[];
  /** Window records plus archived pages that have aged out of the window. */
  byId: Map<string, SiteCve>;
  /** Incident slugs that cite each CVE, newest incident first. */
  cited: Map<string, string[]>;
  /** IDs that get a static page: hasCvePage in the window, and every archived page. */
  pages: Set<string>;
  /** Other CVE pages to link from a CVE page: same vendor first, then neighbours by publish date. */
  related(id: string, max?: number): SiteCve[];
}

// Cloudflare static assets allow 20,000 files per deployment on the free plan. Archived pages are permanent,
// so this grows by roughly 1,500 a month; leave room for the ~400 other files.
const MAX_PAGES = 18_000;

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
    const archived = (await readArchive(resolve('data/cve-pages'))).map((r) => ({ ...r, kev: kev.has(r.id) }));
    const pages = new Set([...records.filter((r) => hasCvePage(r, cited.has(r.id))), ...archived].map((r) => r.id));
    if (pages.size > MAX_PAGES) throw new Error(`${pages.size} CVE pages exceed the ${MAX_PAGES} page budget; tighten hasCvePage`);
    const byId = new Map([...archived, ...records].map((r) => [r.id, r]));
    // Newest first, so page order is publish order and every page links to its neighbours.
    const pageList = [...byId.values()].filter((r) => pages.has(r.id)).sort((a, b) => b.published.localeCompare(a.published) || a.id.localeCompare(b.id));
    const position = new Map(pageList.map((r, i) => [r.id, i]));
    const byVendor = new Map<string, SiteCve[]>();
    for (const r of pageList) for (const v of vendors(r)) byVendor.set(v, [...(byVendor.get(v) ?? []), r]);
    const related = (id: string, max = 8) => {
      const r = byId.get(id), i = position.get(id);
      if (!r || i === undefined) return [];
      const distance = (o: SiteCve) => Math.abs(position.get(o.id)! - i);
      const sameVendor = [...new Set([...vendors(r)].flatMap((v) => byVendor.get(v) ?? []))].filter((o) => o.id !== id).sort((a, b) => distance(a) - distance(b)).slice(0, max / 2);
      const nearby = pageList.slice(Math.max(0, i - max), i + max + 1).filter((o) => o.id !== id && !sameVendor.includes(o)).sort((a, b) => distance(a) - distance(b));
      return [...sameVendor, ...nearby].slice(0, max).sort((a, b) => position.get(a.id)! - position.get(b.id)!);
    };
    return { manifest, records, byId, cited, pages, related };
  })());
}

const vendors = (r: SiteCve) => new Set(r.products.map((p) => p.split(' / ')[0].trim().toLowerCase()).filter((v) => v && !/^(unknown|n\/a|-)$/.test(v)));

export { productLine, scoreSourceLabel } from './search';
