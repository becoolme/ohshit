import rss from '@astrojs/rss';
import { getIncidents } from './incidents';
import { type Level } from './levels';
import { UI, localePath, type Lang } from './i18n';

const WIPE: Record<Lang, string> = { en: 'How to wipe: ', zh: '怎么擦：' };

export async function incidentFeed(lang: Lang, site: URL) {
  const t = UI[lang];
  const list = await getIncidents(lang);
  return rss({
    title: t.site.rssTitle,
    description: t.site.description,
    site,
    customData: `<language>${lang === 'zh' ? 'zh-cn' : 'en'}</language>`,
    items: list.map((i) => ({
      title: `[L${i.data.level} ${t.levels[i.data.level as Level].name}] ${i.data.title}`,
      link: localePath(lang, `/incidents/${i.id}/`),
      pubDate: i.data.date,
      description: `${i.data.summary}\n\n${WIPE[lang]}${i.data.wipe}`,
      categories: i.data.tags,
    })),
  });
}
