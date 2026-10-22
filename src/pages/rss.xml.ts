import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getIncidents } from '../lib/incidents';
import { LEVELS, type Level } from '../lib/levels';
import { SITE } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const list = await getIncidents();
  return rss({
    title: 'OhShit! Security incidents',
    description: SITE.description,
    site: site!,
    items: list.map((i) => ({
      title: `[L${i.data.level} ${LEVELS[i.data.level as Level].name}] ${i.data.title}`,
      link: `/incidents/${i.id}/`,
      pubDate: i.data.date,
      description: `${i.data.summary}\n\nHow to wipe: ${i.data.wipe}`,
      categories: i.data.tags,
    })),
  });
};
