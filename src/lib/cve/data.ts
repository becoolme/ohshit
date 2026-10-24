export interface CveRecord {
  id: string;
  published: string;
  modified: string;
  status: string;
  description: string;
  products: string[];
  score: number | null;
  cvssVersion: string | null;
  scoreSource: string | null;
  vector: string | null;
  weaknesses: string[];
  references: string[];
}
export interface CveSnapshot {
  schemaVersion: 1;
  syncedAt: string;
  windowStart: string;
  records: CveRecord[];
  kev: string[];
  kevUpdatedAt: string;
}
export const DAY = 86_400_000;
export const WINDOW_DAYS = 30;
export const severity = (score: number | null) => score === null ? 'unknown' : score >= 9 ? 'critical' : score >= 7 ? 'high' : score >= 4 ? 'medium' : score > 0 ? 'low' : 'none';
const validDate = (value: unknown): value is string => typeof value === 'string' && Number.isFinite(Date.parse(value));
const text = (value: unknown, max = 6000) => typeof value === 'string' ? value.slice(0, max) : '';
const unique = (values: string[]) => [...new Set(values.filter(Boolean))];
const date = (value: unknown) => {
  if (!validDate(value)) throw new Error('Invalid CVE date');
  return new Date(value.endsWith('Z') || /[+-]\d\d:\d\d$/.test(value) ? value : `${value}Z`).toISOString();
};
export function normalizeCve(raw: any): CveRecord {
  if (!/^CVE-\d{4}-\d{4,}$/.test(raw?.id)) throw new Error('Invalid CVE ID');
  let metric: any;
  for (const version of ['cvssMetricV40', 'cvssMetricV31', 'cvssMetricV30', 'cvssMetricV2']) {
    const entries = raw.metrics?.[version];
    if (Array.isArray(entries) && entries.length) {
      metric = entries.find((m: any) => m.type === 'Primary') ?? entries[0];
      break;
    }
  }
  const score = metric?.cvssData?.baseScore;
  if (score !== undefined && (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 10)) throw new Error('Invalid CVSS score');
  const products: string[] = [];
  for (const group of raw.affected ?? []) for (const item of group.affectedData ?? []) products.push([text(item.vendor, 150), text(item.product, 150)].filter(Boolean).join(' / '));
  const walk = (node: any) => {
    for (const match of node.cpeMatch ?? []) {
      if (!match.vulnerable) continue;
      const parts = text(match.criteria).split(/(?<!\\):/);
      if (parts.length >= 5) products.push(`${parts[3]} / ${parts[4]}`.replaceAll('_', ' ').replaceAll('\\', ''));
    }
    for (const child of node.nodes ?? []) walk(child);
  };
  if (!products.length) for (const config of raw.configurations ?? []) walk(config);
  return {
    id: raw.id, published: date(raw.published), modified: date(raw.lastModified), status: text(raw.vulnStatus, 80),
    description: text(raw.descriptions?.find((d: any) => d.lang === 'en')?.value ?? raw.descriptions?.[0]?.value),
    products: unique(products).slice(0, 30), score: score ?? null,
    cvssVersion: metric ? text(metric.cvssData?.version, 10) : null,
    scoreSource: metric ? text(metric.source, 200) : null, vector: metric ? text(metric.cvssData?.vectorString, 500) : null,
    weaknesses: unique((raw.weaknesses ?? []).flatMap((w: any) => (w.description ?? []).map((d: any) => text(d.value, 100)))),
    references: unique((raw.references ?? []).map((r: any) => text(r.url, 2000)).filter((url: string) => /^https?:\/\//i.test(url))).slice(0, 30),
  };
}
export function assertSnapshot(value: unknown): asserts value is CveSnapshot {
  const s = value as CveSnapshot;
  if (s?.schemaVersion !== 1 || !validDate(s.syncedAt) || !validDate(s.windowStart) || !validDate(s.kevUpdatedAt) || !Array.isArray(s.records) || !Array.isArray(s.kev)) throw new Error('Invalid CVE snapshot');
  const ids = new Set<string>();
  for (const r of s.records) {
    if (!r || !/^CVE-\d{4}-\d{4,}$/.test(r.id) || ids.has(r.id) || !validDate(r.published) || !validDate(r.modified) || typeof r.description !== 'string' || typeof r.status !== 'string' || (r.score !== null && (typeof r.score !== 'number' || !Number.isFinite(r.score) || r.score < 0 || r.score > 10))) throw new Error('Invalid CVE record');
    for (const key of ['products', 'weaknesses', 'references'] as const) if (!Array.isArray(r[key]) || !r[key].every(x => typeof x === 'string')) throw new Error('Invalid CVE list');
    for (const key of ['cvssVersion', 'scoreSource', 'vector'] as const) if (r[key] !== null && typeof r[key] !== 'string') throw new Error('Invalid CVE metric');
    ids.add(r.id);
  }
  if (!s.kev.every(id => /^CVE-\d{4}-\d{4,}$/.test(id))) throw new Error('Invalid KEV IDs');
}
