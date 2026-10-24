import { severity, type CveRecord } from './data.ts';
export type IndexRecord = Pick<CveRecord, 'id' | 'published' | 'modified' | 'description' | 'products' | 'score' | 'weaknesses'> & { kev: boolean };
export type IndexTuple = [string, string, string, number | null, string, string[], string[], boolean];
export interface Manifest {
  schemaVersion: 1; base: string; chunks: string[]; syncedAt: string; windowStart: string;
  stats: { total: number; critical: number; kev: number };
}
export function toTuple(record: CveRecord, kev: boolean): IndexTuple { return [record.id, record.published, record.modified, record.score, record.description, record.products, record.weaknesses, kev]; }
export function fromTuple(r: IndexTuple): IndexRecord { return { id: r[0], published: r[1], modified: r[2], score: r[3], description: r[4], products: r[5], weaknesses: r[6], kev: r[7] }; }
export function detailBucket(id: string): number { let n = 2166136261; for (const c of id) n = Math.imul(n ^ c.charCodeAt(0), 16777619); return (n >>> 0) % 128; }
export function searchText(r: IndexRecord) { return `${r.id} ${r.description} ${r.products.join(' ')} ${r.weaknesses.join(' ')}`.toLowerCase(); }
export interface Query { q?: string; severity?: string; kev?: boolean; sort?: string; page?: number; }
export function searchIndex(records: IndexRecord[], query: Query, texts = records.map(searchText)) {
  const terms = (query.q ?? '').toLowerCase().trim().slice(0, 200).split(/\s+/).filter(Boolean).slice(0, 20);
  const rows = records.filter((r, i) => (!query.kev || r.kev) && (!query.severity || severity(r.score) === query.severity) && terms.every(t => texts[i].includes(t)));
  rows.sort((a, b) => query.sort === 'score' ? (b.score ?? -1) - (a.score ?? -1) || b.published.localeCompare(a.published) || a.id.localeCompare(b.id) : (query.sort === 'modified' ? b.modified.localeCompare(a.modified) : b.published.localeCompare(a.published)) || a.id.localeCompare(b.id));
  const total = rows.length, pages = Math.max(1, Math.ceil(total / 30));
  const page = Math.min(pages, Math.max(1, Number.isFinite(query.page) ? Math.floor(query.page!) : 1));
  return { records: rows.slice((page - 1) * 30, page * 30), total, pages, page };
}
/** CVEs that get a static page at /cves/<id>/: known exploited, critical, or cited by an incident. */
export function hasCvePage(r: { kev: boolean; score: number | null }, cited = false) { return r.kev || (r.score ?? 0) >= 9 || cited; }
/** "Oracle / Java SE · +2" from vendor/product pairs, without CNA placeholders like "Unknown" or "n/a". */
export function productLine(products: string[], max = 2) {
  const clean = products.map(p => p.split(' / ').filter(x => x && !/^(unknown|n\/a|-)$/i.test(x.trim())).join(' / ')).filter(Boolean);
  const unique = [...new Set(clean)];
  const shown = unique.slice(0, max).join(' · ');
  return unique.length > max ? `${shown} · +${unique.length - max}` : shown;
}
/** NVD names CNAs by UUID; show those as "CNA" rather than an opaque id. */
export const scoreSourceLabel = (source: string | null) => !source ? '—' : /^[0-9a-f-]{36}$/i.test(source) ? 'CNA' : source;
