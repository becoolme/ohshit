// One CVE list row as an HTML string. The index page renders the first page with it at build time and the
// client renders later pages with it, so crawlers and users get the same markup.
import { severity } from './data';
import { hasCvePage, productLine, type IndexRecord } from './search';

export interface RowContext {
  /** Path of the localized index, e.g. /zh/cves/, for CVEs without a static page. */
  indexPath: string;
  unscored: string;
  incident: string;
}
export interface RelatedIncident { title: string; url: string }

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Static page for KEV, critical and cited CVEs; otherwise a deep link that opens the index dialog. */
export function cveHref(r: Pick<IndexRecord, 'id' | 'kev' | 'score'>, cited: boolean, indexPath: string) {
  return hasCvePage(r, cited) ? `/cves/${r.id}/` : `${indexPath}?id=${r.id}`;
}

export function rowHtml(r: IndexRecord, incidents: RelatedIncident[], ctx: RowContext) {
  const products = productLine(r.products);
  const score = r.score === null ? ctx.unscored : r.score.toFixed(1);
  return `<article class="cve-row" data-id="${escape(r.id)}">`
    + `<div class="row-copy"><p class="row-title"><a class="row-link mono" href="${cveHref(r, incidents.length > 0, ctx.indexPath)}">${escape(r.id)}</a>`
    + (r.kev ? '<span class="cve-badge kev">KEV</span>' : '')
    + (incidents[0] ? `<a class="incident-tag" href="${escape(incidents[0].url)}" title="${escape(incidents[0].title)}">${escape(ctx.incident)} →</a>` : '')
    + '</p>'
    + (products ? `<p class="row-products mono">${escape(products)}</p>` : '')
    + `<p class="row-description">${escape(r.description)}</p></div>`
    + `<span class="cve-badge score sev-${severity(r.score)}"><span class="sr-only">CVSS </span>${score}</span>`
    + `<time class="row-date mono" datetime="${r.published}">${r.published.slice(0, 10)}</time>`
    + '<span class="row-arrow" aria-hidden="true">→</span></article>';
}
