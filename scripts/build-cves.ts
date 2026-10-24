import { mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { readSnapshot } from '../src/lib/cve/store.ts';
import { toTuple, detailBucket, type Manifest } from '../src/lib/cve/search.ts';
import { severity } from '../src/lib/cve/data.ts';
export async function buildCves(source = resolve('data/cves'), output = resolve('public/data/cves')) {
  const snapshot = await readSnapshot(source);
  if (!snapshot) throw new Error('CVE snapshot missing: run npm run cve:sync first');
  const version = createHash('sha256').update(JSON.stringify(snapshot)).digest('hex').slice(0, 16);
  const directory = join(output, version), kev = new Set(snapshot.kev);
  await rm(output, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
  const chunks: string[] = [];
  for (let i = 0; i < snapshot.records.length; i += 4000) {
    const name = `index-${chunks.length}.json`;
    const json = JSON.stringify(snapshot.records.slice(i, i + 4000).map(r => toTuple(r, kev.has(r.id))));
    if (Buffer.byteLength(json) > 24 * 1024 * 1024) throw new Error('CVE index chunk exceeds static asset limit');
    await writeFile(join(directory, name), json);
    await writeFile(join(directory, `${name}.gz`), gzipSync(json, { level: 9 }));
    chunks.push(name);
  }
  const buckets = new Map<number, Record<string, unknown>>();
  for (const r of snapshot.records) {
    const key = detailBucket(r.id); if (!buckets.has(key)) buckets.set(key, {});
    buckets.get(key)![r.id] = { ...r, kev: kev.has(r.id) };
  }
  for (const [key, records] of buckets) {
    const json = JSON.stringify(records);
    if (Buffer.byteLength(json) > 24 * 1024 * 1024) throw new Error('CVE detail bucket exceeds static asset limit');
    await writeFile(join(directory, `details-${key}.json`), json);
  }
  const manifest: Manifest = { schemaVersion: 1, base: `/data/cves/${version}/`, chunks, syncedAt: snapshot.syncedAt, windowStart: snapshot.windowStart,
    stats: { total: snapshot.records.length, critical: snapshot.records.filter(r => severity(r.score) === 'critical').length, kev: snapshot.records.filter(r => kev.has(r.id)).length } };
  await writeFile(join(output, 'manifest.json'), JSON.stringify(manifest));
  console.log(`Built static CVE index: ${snapshot.records.length} records, ${chunks.length} chunks, ${buckets.size} detail buckets`);
}
if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) await buildCves();
