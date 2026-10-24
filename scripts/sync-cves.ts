import { appendFile, readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { syncCves } from '../src/lib/cve/sync.ts';
import { hasCvePage } from '../src/lib/cve/search.ts';
import { readArchive, readSnapshot, writeArchive, writeSnapshot } from '../src/lib/cve/store.ts';
const directory = resolve('data/cves'), archiveDirectory = resolve('data/cve-pages');
// CVEs cited in incident frontmatter (`cves: - id: CVE-…`) have pages too, so they are archived as well.
const cited = new Set<string>();
for (const file of await readdir(resolve('incidents'), { recursive: true })) {
  if (!file.endsWith('.md')) continue;
  const frontmatter = (await readFile(join('incidents', file), 'utf8')).split(/^---$/m)[1] ?? '';
  for (const m of frontmatter.matchAll(/^\s*-\s*id:\s*['"]?(CVE-\d{4}-\d{4,})/gm)) cited.add(m[1]);
}
const previous = await readSnapshot(directory);
const archive = await readArchive(archiveDirectory);
const snapshot = await syncCves({
  previous, apiKey: process.env.NVD_API_KEY, onProgress: (loaded, total) => console.log(`NVD: ${loaded}/${total}`),
  archive: { records: archive, keep: (r, kev) => hasCvePage({ kev: kev.has(r.id), score: r.score }, cited.has(r.id)) },
});
const { archived, ...current } = snapshot;
await writeSnapshot(directory, current);
await writeArchive(archiveDirectory, archived);
const before = new Map(previous?.records.map(r => [r.id, JSON.stringify(r)]) ?? []);
let added = 0, updated = 0;
for (const r of current.records) { const old = before.get(r.id); if (!old) added++; else if (old !== JSON.stringify(r)) updated++; before.delete(r.id); }
const counts = { records: current.records.length, added, updated, removed: before.size, archived: archived.length, synced_at: current.syncedAt };
console.log(JSON.stringify(counts));
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, Object.entries(counts).map(([k,v]) => `${k}=${v}\n`).join(''));
