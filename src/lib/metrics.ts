import type { Level } from './levels.ts';

type DatedIncident = { data: { date: Date; level: number } };
export const SMELL_WINDOW_DAYS = 7;

export function smellIndex(list: DatedIncident[], now = new Date(), days = SMELL_WINDOW_DAYS): Level {
  const recent = list.filter((i) => {
    const age = now.getTime() - i.data.date.getTime();
    return age >= 0 && age <= days * 864e5;
  });
  return recent.reduce<Level>((level, i) => Math.max(level, i.data.level) as Level, 1);
}

export function daysSinceLast(list: DatedIncident[], now = new Date()): number {
  const latest = Math.max(...list.map((i) => i.data.date.getTime()).filter((date) => date <= now.getTime()));
  return Number.isFinite(latest) ? Math.floor((now.getTime() - latest) / 864e5) : 0;
}
