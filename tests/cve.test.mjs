import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizeCve, assertSnapshot, severity } from '../src/lib/cve/data.ts';
import { syncCves } from '../src/lib/cve/sync.ts';
const raw = (id = 'CVE-2026-10000', extra = {}) => ({ id, published: '2026-10-20T12:00:00.000', lastModified: '2026-10-21T12:00:00.000', vulnStatus: 'Analyzed', descriptions: [{ lang: 'en', value: 'A <script>test</script> SQL injection in Widget' }], metrics: {}, ...extra });
const now = new Date('2026-10-24T12:00:00Z');
const snapshot = (rows = [normalizeCve(raw())]) => ({ schemaVersion: 1, syncedAt: '2026-10-23T12:00:00Z', windowStart: '2026-07-25T12:00:00Z', records: rows, kev: ['CVE-2026-10000'], kevUpdatedAt: '2026-10-23T00:00:00Z' });
const kev = { dateReleased: '2026-10-23T00:00:00Z', vulnerabilities: [{ cveID: 'CVE-2026-10000' }] };
test('normalization distinguishes unknown from zero and chooses CVSS version and primary source', () => {
  assert.equal(normalizeCve(raw()).score, null);
  const r = normalizeCve(raw(undefined, { metrics: { cvssMetricV40: [{ type: 'Secondary', source: 'CNA', cvssData: { baseScore: 9.5, version: '4.0' } }, { type: 'Primary', source: 'NVD', cvssData: { baseScore: 0, version: '4.0' } }], cvssMetricV31: [{ cvssData: { baseScore: 10 } }] } }));
  assert.equal(r.score, 0); assert.equal(r.cvssVersion, '4.0'); assert.equal(r.scoreSource, 'NVD'); assert.equal(severity(r.score), 'none');
  assert.equal(r.published, '2026-10-20T12:00:00.000Z');
  assert.throws(() => normalizeCve(raw(undefined, { published: 'not-a-date' })));
  assert.throws(() => normalizeCve(raw(undefined, { metrics: { cvssMetricV40: [{ cvssData: { baseScore: 11 } }] } })));
});
test('snapshot validation rejects duplicate IDs, malformed dates and invalid metrics', () => {
  const s = snapshot(); assertSnapshot(s);
  assert.throws(() => assertSnapshot({ ...s, records: [s.records[0], s.records[0]] }));
  assert.throws(() => assertSnapshot({ ...s, syncedAt: 'yesterday' }));
  assert.throws(() => assertSnapshot({ ...s, kev: ['INVALID'] }));
  assert.throws(() => assertSnapshot({ ...s, records: [{ ...s.records[0], score: NaN }] }));
});
test('initial sync paginates, removes rejected records, excludes future/expired records and publishes only validated data', async () => {
  const calls = [], waits = [];
  const fetcher = async url => {
    calls.push(url);
    if (url.includes('cisa.gov')) return Response.json(kev);
    const index = Number(new URL(url).searchParams.get('startIndex'));
    return Response.json({ startIndex: index, totalResults: 4, vulnerabilities: index === 0 ? [{ cve: raw() }, { cve: raw('CVE-2026-10001', { published: '2026-01-01', vulnStatus: 'Rejected' }) }] : [{ cve: raw('CVE-2026-10002', { published: '2026-01-01' }) }, { cve: raw('CVE-2026-10003', { published: '2026-12-01' }) }] });
  };
  const s = await syncCves({ now, fetcher, sleep: async ms => { waits.push(ms); } });
  assert.equal(s.records.length, 1); assert.equal(s.records[0].id, 'CVE-2026-10000'); assert.equal(s.syncedAt, now.toISOString()); assert.equal(calls.length, 3); assert.deepEqual(waits, [6500]);
  assert(new URL(calls[0]).searchParams.has('pubStartDate'));
});
test('incremental sync overlaps watermark, replaces revisions and removes newly rejected records', async () => {
  const before = snapshot([normalizeCve(raw()), normalizeCve(raw('CVE-2026-10001'))]);
  const fetcher = async url => {
    if (url.includes('cisa.gov')) return Response.json(kev);
    const p = new URL(url).searchParams;
    assert.equal(p.get('lastModStartDate'), '2026-10-22T12:00:00.000Z');
    return Response.json({ startIndex: 0, totalResults: 2, vulnerabilities: [{ cve: raw(undefined, { descriptions: [{ lang: 'en', value: 'Corrected' }] }) }, { cve: raw('CVE-2026-10001', { vulnStatus: 'Rejected' }) }] });
  };
  const result = await syncCves({ previous: before, now, fetcher, sleep: async () => {} });
  assert.equal(result.records.length, 1); assert.equal(result.records[0].description, 'Corrected'); assert.equal(before.records.length, 2);
});
test('sync retries throttling and fails on truncated pages or unavailable KEV instead of replacing data', async () => {
  let attempts = 0;
  const fetcher = async url => {
    if (url.includes('cisa.gov')) return Response.json(kev);
    attempts++; return attempts === 1 ? new Response('', { status: 429, headers: { 'Retry-After': '1' } }) : Response.json({ startIndex: 0, totalResults: 0, vulnerabilities: [] });
  };
  await syncCves({ now, fetcher, sleep: async () => {} }); assert.equal(attempts, 2);
  await assert.rejects(syncCves({ now, sleep: async () => {}, fetcher: async () => Response.json({ startIndex: 0, totalResults: 2, vulnerabilities: [] }) }), /Incomplete/);
  await assert.rejects(syncCves({ now, sleep: async () => {}, fetcher: async url => url.includes('cisa.gov') ? new Response('', { status: 403 }) : Response.json({ startIndex: 0, totalResults: 0, vulnerabilities: [] }) }), /403/);
});
import { mkdtemp, rm, readFile, writeFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { readSnapshot, writeSnapshot } from '../src/lib/cve/store.ts';
import { buildCves } from '../scripts/build-cves.ts';
import { toTuple, fromTuple, detailBucket, searchIndex } from '../src/lib/cve/search.ts';
test('static search combines severity, KEV and keywords; sorts missing scores last; clamps pages', () => {
  const rows = Array.from({ length: 35 }, (_, i) => fromTuple(toTuple(normalizeCve(raw(`CVE-2026-${10000 + i}`, i ? { metrics: { cvssMetricV31: [{ cvssData: { baseScore: 9.8, version: '3.1' } }] } } : {})), i === 0)));
  assert.equal(searchIndex(rows, { q: 'widget injection', severity: 'critical' }).total, 34);
  assert.equal(searchIndex(rows, { kev: true }).total, 1);
  assert.equal(searchIndex(rows, { severity: 'critical', kev: true }).total, 0);
  assert.equal(searchIndex(rows, { sort: 'score', page: 2 }).records.at(-1).score, null);
  assert.equal(searchIndex(rows, { page: 999 }).page, 2);
  assert.equal(searchIndex(rows, { q: 'absent' }).pages, 1);
  assert.equal(searchIndex(rows, { page: NaN }).page, 1);
});
test('snapshot store round-trips and refuses corrupt input without replacing previous data', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ohshit-cves-')), source = join(dir, 'data');
  try {
    assert.equal(await readSnapshot(source), undefined);
    await writeSnapshot(source, snapshot());
    assert.deepEqual(await readSnapshot(source), snapshot());
    await assert.rejects(writeSnapshot(source, { ...snapshot(), records: [snapshot().records[0], snapshot().records[0]] }));
    assert.deepEqual(await readSnapshot(source), snapshot());
    await writeFile(join(source, '2026-10-20.jsonl'), '');
    await assert.rejects(readSnapshot(source), /Incomplete/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('static assets contain complete versioned index chunks and matching detail buckets', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ohshit-cve-build-')), source = join(dir, 'source'), output = join(dir, 'assets');
  try {
    const s = snapshot([normalizeCve(raw()), normalizeCve(raw('CVE-2026-10001'))]);
    await writeSnapshot(source, s); await buildCves(source, output);
    const manifest = JSON.parse(await readFile(join(output, 'manifest.json'), 'utf8'));
    const version = manifest.base.split('/').filter(Boolean).at(-1);
    const tuples = JSON.parse(gunzipSync(await readFile(join(output, version, manifest.chunks[0] + '.gz'))).toString());
    assert.equal(tuples.length, 2); assert.equal(manifest.stats.total, 2); assert.equal(manifest.stats.kev, 1);
    for (const tuple of tuples) {
      const row = fromTuple(tuple), bucket = JSON.parse(await readFile(join(output, version, `details-${detailBucket(row.id)}.json`), 'utf8'));
      assert.equal(bucket[row.id].description, row.description); assert.equal(bucket[row.id].kev, row.kev);
    }
    const oldFiles = await readdir(output); await buildCves(source, output); assert.deepEqual(await readdir(output), oldFiles);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('sync archives aged-out CVE pages forever, keeps them updated and drops rejected ones', async () => {
  const old = (id, extra) => normalizeCve(raw(id, { published: '2026-09-01T00:00:00.000', ...extra }));
  const before = snapshot([normalizeCve(raw()), old('CVE-2026-10005'), old('CVE-2026-10006')]);
  const archive = [old('CVE-2026-10007', { published: '2026-06-01T00:00:00.000' }), old('CVE-2026-10008', { published: '2026-06-01T00:00:00.000' })];
  const fetcher = async url => url.includes('cisa.gov')
    ? Response.json({ ...kev, vulnerabilities: [{ cveID: 'CVE-2026-10005' }] })
    : Response.json({ startIndex: 0, totalResults: 2, vulnerabilities: [
      { cve: raw('CVE-2026-10007', { published: '2026-06-01T00:00:00.000', descriptions: [{ lang: 'en', value: 'Rescored' }] }) },
      { cve: raw('CVE-2026-10008', { published: '2026-06-01T00:00:00.000', vulnStatus: 'Rejected' }) }] });
  const result = await syncCves({ previous: before, now, fetcher, sleep: async () => {}, archive: { records: archive, keep: (r, k) => k.has(r.id) } });
  assert.deepEqual(result.records.map(r => r.id), ['CVE-2026-10000']);
  assert.deepEqual(result.archived.map(r => r.id), ['CVE-2026-10005', 'CVE-2026-10007']);
  assert.equal(result.archived[1].description, 'Rescored');
});
