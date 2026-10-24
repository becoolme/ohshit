/// <reference lib="webworker" />
import { fromTuple, searchIndex, searchText, type IndexRecord, type IndexTuple, type Manifest, type Query } from './search';
let loaded: Promise<void> | undefined, manifest: Manifest, records: IndexRecord[], texts: string[], latest = 0;
async function initialize() {
  const response = await fetch('/data/cves/manifest.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error('CVE manifest unavailable');
  const current: Manifest = await response.json();
  if (current.schemaVersion !== 1 || !/^\/data\/cves\/[a-f0-9]{16}\/$/.test(current.base) || !Array.isArray(current.chunks)) throw new Error('Invalid CVE manifest');
  const chunks: IndexRecord[][] = new Array(current.chunks.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(3, current.chunks.length) }, async () => {
    while (next < current.chunks.length) {
      const index = next++, name = current.chunks[index];
      if (!/^index-\d+\.json$/.test(name)) throw new Error('Invalid CVE chunk');
      const compressed = typeof DecompressionStream !== 'undefined';
      const r = await fetch(`${current.base}${name}${compressed ? '.gz' : ''}`);
      if (!r.ok || !r.body) throw new Error('CVE index unavailable');
      // Some static hosts mark .gz with Content-Encoding; fetch has already decoded those responses.
      const autoDecoded = /(?:^|,)\s*gzip\s*(?:,|$)/i.test(r.headers.get('content-encoding') ?? '');
      const body = compressed && !autoDecoded ? new Response(r.body.pipeThrough(new DecompressionStream('gzip'))) : r;
      chunks[index] = (await body.json() as IndexTuple[]).map(fromTuple);
    }
  }));
  const loadedRecords = chunks.flat();
  if (loadedRecords.length !== current.stats.total) throw new Error('Incomplete CVE index');
  manifest = current; records = loadedRecords; texts = records.map(searchText);
}
self.onmessage = async (event: MessageEvent<{ id: number; query: Query }>) => {
  const { id, query } = event.data; latest = id;
  try {
    loaded ??= initialize(); await loaded;
    if (id !== latest) return;
    self.postMessage({ id, data: { ...searchIndex(records, query, texts), ...manifest } });
  } catch {
    loaded = undefined; // Retry can load the current manifest after a deployment or network interruption.
    if (id === latest) self.postMessage({ id, error: 'CVE index unavailable' });
  }
};
