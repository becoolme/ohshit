import { formatDateIn, type Lang } from './i18n.ts';
import type { OgInput } from './og.ts';

type IncidentData = {
  title: string;
  headline?: string;
  level: NonNullable<OgInput['level']>;
  date: Date;
  dateIsApproximate?: boolean;
  tags: string[];
  cves: { id: string; score?: number }[];
};

/** The input must already contain the incident's localized content. */
export function incidentOg(d: IncidentData, lang: Lang): OgInput {
  const top = d.cves.reduce<number | undefined>((m, c) => c.score != null && (m == null || c.score > m) ? c.score : m, undefined);
  const meta = [formatDateIn(lang, d.date, d.dateIsApproximate)];
  if (d.cves.length) meta.push(d.cves.length === 1 ? d.cves[0].id : lang === 'zh' ? `${d.cves.length} 个 CVE` : `${d.cves.length} CVEs`);
  if (top != null) meta.push(`CVSS ${top.toFixed(1)}`);
  return {
    lang,
    title: d.headline ?? d.title,
    level: d.level,
    kicker: `// ${lang === 'zh' ? '案发现场' : 'CRIME SCENE'}: ${d.tags.join(' · ').toUpperCase()}`,
    meta,
  };
}
