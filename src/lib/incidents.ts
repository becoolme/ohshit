import { getCollection, type CollectionEntry } from 'astro:content';
import { LEVELS, type Level } from './levels';

export type Incident = CollectionEntry<'incidents'>;

export async function getIncidents(): Promise<Incident[]> {
  const all = await getCollection('incidents');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.data.level - a.data.level);
}

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const fmtMonth = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatDate(d: Date, approximate = false): string {
  return approximate ? fmtMonth.format(d) : fmt.format(d);
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export const SMELL_WINDOW_DAYS = 7;

/** Highest level among incidents from the last `days` days (L1 if it has been quiet). */
export function smellIndex(list: Incident[], now = new Date(), days = SMELL_WINDOW_DAYS): Level {
  const recent = list.filter((i) => now.getTime() - i.data.date.getTime() <= days * 864e5);
  return recent.length ? (Math.max(...recent.map((i) => i.data.level)) as Level) : 1;
}

export function daysSinceLast(list: Incident[], now = new Date()): number {
  if (!list.length) return 0;
  return Math.max(0, Math.floor((now.getTime() - list[0].data.date.getTime()) / 864e5));
}

/** The public JSON shape. Keep this stable: it is the API contract. */
export function toApi(i: Incident, site?: URL) {
  const d = i.data;
  return {
    id: i.id,
    url: site ? new URL(`/incidents/${i.id}/`, site).href : `/incidents/${i.id}/`,
    title: d.title,
    level: d.level,
    level_name: LEVELS[d.level as Level].slug,
    date: isoDate(d.date),
    date_is_approximate: d.dateIsApproximate,
    updated: d.updated ? isoDate(d.updated) : null,
    tags: d.tags,
    ecosystems: d.ecosystems,
    summary: d.summary,
    splash: d.splash,
    wipe: d.wipe,
    in_the_wild: d.inTheWild,
    cves: d.cves.map((c) => ({ id: c.id, score: c.score ?? null, name: c.name })),
    fixed: d.fixed,
    checklist: d.checklist,
    sources: d.sources.map((s) => ({ name: s.name, url: s.url, primary: s.primary })),
  };
}
