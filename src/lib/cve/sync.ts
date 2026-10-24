import { DAY, WINDOW_DAYS, normalizeCve, assertSnapshot, type CveSnapshot, type CveRecord } from './data.ts';
const NVD = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const KEV = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
export interface SyncOptions { previous?: CveSnapshot; now?: Date; apiKey?: string; fetcher?: typeof fetch; sleep?: (ms: number) => Promise<void>; onProgress?: (loaded: number, total: number) => void; }
export async function scanCves(options: Omit<SyncOptions, 'previous'> & { since?: string }, onPage: (records: CveRecord[]) => Promise<void>) {
  const { now = new Date(), apiKey, fetcher = fetch, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), onProgress, since } = options;
  const end = now.toISOString(), start = new Date(now.getTime() - WINDOW_DAYS * DAY).toISOString();
  const incremental = since && Date.parse(since) <= now.getTime() && now.getTime() - Date.parse(since) < 119 * DAY;
  const changedSince = incremental ? new Date(Date.parse(since!) - DAY).toISOString() : start;
  let lastRequest = false;
  const request = async (url: string, isNvd: boolean) => {
    for (let attempt = 0; attempt < 4; attempt++) {
      if (isNvd && lastRequest) await sleep(apiKey ? 700 : 6500);
      if (isNvd) lastRequest = true;
      const response = await fetcher(url, { headers: apiKey && isNvd ? { apiKey } : {}, signal: AbortSignal.timeout(60_000) });
      if (response.ok) return response.json();
      if ((response.status === 429 || response.status >= 500) && attempt < 3) {
        const retry = response.headers.get('retry-after');
        const wait = retry ? (/^\d+$/.test(retry) ? Number(retry) * 1000 : Date.parse(retry) - Date.now()) : 15_000 * 2 ** attempt;
        await sleep(Math.min(120_000, Math.max(15_000, Number.isFinite(wait) ? wait : 15_000)));
        continue;
      }
      throw new Error(`CVE sync source returned HTTP ${response.status}`);
    }
    throw new Error('CVE sync retries exhausted');
  };
  let index = 0, total = 0;
  do {
    const params = new URLSearchParams({ resultsPerPage: '2000', startIndex: String(index) });
    params.set(incremental ? 'lastModStartDate' : 'pubStartDate', changedSince);
    params.set(incremental ? 'lastModEndDate' : 'pubEndDate', end);
    const data = await request(`${NVD}?${params}`, true);
    if (!Array.isArray(data.vulnerabilities) || !Number.isInteger(data.totalResults) || data.totalResults < 0 || data.startIndex !== index) throw new Error('Invalid NVD pagination');
    total = data.totalResults;
    if (data.vulnerabilities.length === 0 && index < total) throw new Error('Incomplete NVD response');
    await onPage(data.vulnerabilities.map((item: any) => normalizeCve(item.cve)));
    index += data.vulnerabilities.length;
    onProgress?.(index, total);
    if (index > 200_000) throw new Error('NVD sync exceeds record safety limit');
  } while (index < total);
  const kev = await request(KEV, false);
  if (!Array.isArray(kev.vulnerabilities) || !kev.dateReleased || !kev.vulnerabilities.every((v: any) => /^CVE-\d{4}-\d{4,}$/.test(v.cveID))) throw new Error('Invalid CISA KEV feed');
  return { syncedAt: end, windowStart: start, kev: kev.vulnerabilities.map((v: any) => v.cveID) as string[], kevUpdatedAt: new Date(kev.dateReleased).toISOString() };
}
// Build a complete replacement snapshot only after all source requests succeed.
export async function syncCves({ previous, ...options }: SyncOptions = {}): Promise<CveSnapshot> {
  if (previous) assertSnapshot(previous);
  const records = new Map((previous?.records ?? []).map(r => [r.id, r]));
  const meta = await scanCves({ ...options, since: previous?.syncedAt }, async page => {
    for (const r of page) if (r.status === 'Rejected') records.delete(r.id); else records.set(r.id, r);
  });
  const snapshot: CveSnapshot = { schemaVersion: 1, ...meta, records: [...records.values()].filter(r => r.published >= meta.windowStart && r.published <= meta.syncedAt).sort((a, b) => b.published.localeCompare(a.published) || a.id.localeCompare(b.id)) };
  assertSnapshot(snapshot);
  return snapshot;
}
