import { getCollection, type CollectionEntry } from 'astro:content';
import { LEVELS, type Level } from './levels';
import { localizeIncident } from './localize';
import type { Lang } from './i18n';
export { smellIndex, daysSinceLast, SMELL_WINDOW_DAYS } from './metrics';

export type Incident = CollectionEntry<'incidents'> & {
  /** The Chinese entry whose body to render, when the page is Chinese and a translation exists. */
  translation?: CollectionEntry<'incidentsZh'>;
};

/** Newest first. For "zh", prose fields are swapped for the translation where one exists. */
export async function getIncidents(lang: Lang = 'en'): Promise<Incident[]> {
  const all: Incident[] = await getCollection('incidents');
  all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.data.level - a.data.level);
  if (lang === 'en') return all;
  const zh = new Map((await getCollection('incidentsZh')).map((e) => [e.id, e]));
  for (const id of zh.keys()) if (!all.some((i) => i.id === id)) throw new Error(`zh translation ${id}: no English incident`);
  return all.map((i) => {
    const t = zh.get(i.id);
    return t ? { ...i, data: localizeIncident(i.data, t.data, i.id), translation: t } : i;
  });
}

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const fmtMonth = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatDate(d: Date, approximate = false): string {
  return approximate ? fmtMonth.format(d) : fmt.format(d);
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
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
    source_exception: d.sourceException ?? null,
    cves: d.cves.map((c) => ({ id: c.id, score: c.score ?? null, name: c.name })),
    fixed: d.fixed,
    checklist: d.checklist,
    sources: d.sources.map((s) => ({ name: s.name, url: s.url, primary: s.primary })),
  };
}
