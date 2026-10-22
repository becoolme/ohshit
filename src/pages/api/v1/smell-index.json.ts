import type { APIRoute } from 'astro';
import { getIncidents, smellIndex, daysSinceLast, isoDate, SMELL_WINDOW_DAYS } from '../../../lib/incidents';
import { LEVELS } from '../../../lib/levels';

export const GET: APIRoute = async () => {
  const list = await getIncidents();
  const level = smellIndex(list);
  const body = {
    level,
    level_name: LEVELS[level].slug,
    advice: LEVELS[level].advice,
    window_days: SMELL_WINDOW_DAYS,
    latest_incident: list[0]?.id ?? null,
    latest_date: list[0] ? isoDate(list[0].data.date) : null,
    days_since_last: daysSinceLast(list),
    generated_at: new Date().toISOString(),
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
