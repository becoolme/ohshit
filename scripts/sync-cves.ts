import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { syncCves } from '../src/lib/cve/sync.ts';
import { readSnapshot, writeSnapshot } from '../src/lib/cve/store.ts';
const directory = resolve('data/cves');
const previous = await readSnapshot(directory);
const snapshot = await syncCves({ previous, apiKey: process.env.NVD_API_KEY, onProgress: (loaded, total) => console.log(`NVD: ${loaded}/${total}`) });
await writeSnapshot(directory, snapshot);
const before = new Map(previous?.records.map(r => [r.id, JSON.stringify(r)]) ?? []);
let added = 0, updated = 0;
for (const r of snapshot.records) { const old = before.get(r.id); if (!old) added++; else if (old !== JSON.stringify(r)) updated++; before.delete(r.id); }
const counts = { records: snapshot.records.length, added, updated, removed: before.size, synced_at: snapshot.syncedAt };
console.log(JSON.stringify(counts));
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, Object.entries(counts).map(([k,v]) => `${k}=${v}\n`).join(''));
