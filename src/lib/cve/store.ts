import { mkdir, readFile, readdir, writeFile, rename, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { assertRecords, assertSnapshot, type CveRecord, type CveSnapshot } from './data.ts';
export async function readSnapshot(directory: string): Promise<CveSnapshot | undefined> {
  let metadata;
  try { metadata = JSON.parse(await readFile(join(directory, 'metadata.json'), 'utf8')); }
  catch (error: any) {
    if (error.code !== 'ENOENT') throw error;
    try { if ((await readdir(directory)).length) throw new Error('CVE metadata missing from existing snapshot'); }
    catch (directoryError: any) { if (directoryError.code !== 'ENOENT') throw directoryError; }
    return undefined;
  }
  const records = [];
  for (const file of (await readdir(directory)).filter(f => /^\d{4}-\d{2}-\d{2}\.jsonl$/.test(f)).sort()) {
    for (const line of (await readFile(join(directory, file), 'utf8')).split('\n').filter(Boolean)) records.push(JSON.parse(line));
  }
  const { recordCount, ...fields } = metadata;
  const snapshot = { ...fields, records };
  assertSnapshot(snapshot);
  if (recordCount !== records.length) throw new Error('Incomplete stored CVE snapshot');
  snapshot.records.sort((a, b) => b.published.localeCompare(a.published) || a.id.localeCompare(b.id));
  return snapshot;
}
export async function writeSnapshot(directory: string, snapshot: CveSnapshot): Promise<void> {
  assertSnapshot(snapshot);
  await mkdir(dirname(directory), { recursive: true });
  const temporary = `${directory}.staging-${process.pid}`, backup = `${directory}.backup-${process.pid}`;
  await mkdir(temporary); // Do not reuse another run's staging directory.
  let moved = false, activated = false;
  try {
    const days = new Map<string, string[]>();
    for (const record of snapshot.records) {
      const key = record.published.slice(0, 10);
      if (!days.has(key)) days.set(key, []);
      days.get(key)!.push(JSON.stringify(record));
    }
    for (const [day, rows] of days) await writeFile(join(temporary, `${day}.jsonl`), rows.sort().join('\n') + '\n');
    const { records, ...metadata } = snapshot;
    await writeFile(join(temporary, 'metadata.json'), JSON.stringify({ ...metadata, recordCount: records.length }, null, 2) + '\n');
    await readSnapshot(temporary);
    try { await rename(directory, backup); moved = true; } catch (error: any) { if (error.code !== 'ENOENT') throw error; }
    await rename(temporary, directory); activated = true;
  } catch (error) {
    if (moved && !activated) await rename(backup, directory);
    throw error;
  } finally {
    await rm(temporary, { recursive: true, force: true });
    if (activated && moved) await rm(backup, { recursive: true });
  }
}

// Archived CVE pages: one JSONL file per publish month, kept forever.
export async function readArchive(directory: string): Promise<CveRecord[]> {
  let files: string[];
  try { files = (await readdir(directory)).filter(f => /^\d{4}-\d{2}\.jsonl$/.test(f)).sort(); }
  catch (error: any) { if (error.code === 'ENOENT') return []; throw error; }
  const records = [];
  for (const file of files) for (const line of (await readFile(join(directory, file), 'utf8')).split('\n').filter(Boolean)) records.push(JSON.parse(line));
  assertRecords(records);
  return records;
}
export async function writeArchive(directory: string, records: CveRecord[]): Promise<void> {
  assertRecords(records);
  await mkdir(directory, { recursive: true });
  const months = new Map<string, string[]>();
  for (const r of records) {
    const key = r.published.slice(0, 7);
    if (!months.has(key)) months.set(key, []);
    months.get(key)!.push(JSON.stringify(r));
  }
  for (const [month, rows] of months) await writeFile(join(directory, `${month}.jsonl`), rows.sort().join('\n') + '\n');
  for (const file of await readdir(directory)) if (/^\d{4}-\d{2}\.jsonl$/.test(file) && !months.has(file.slice(0, 7))) await rm(join(directory, file));
}
