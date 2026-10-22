/**
 * Lay a Chinese translation over an English incident. Pure, so it can be unit tested.
 * Throws when the translation is out of step with the English file, so a stale .zh.md fails the build
 * instead of quietly showing half-English or misaligned rows.
 */
type Obj = Record<string, unknown>;

function fail(path: string, message: string): never {
  throw new Error(`zh translation ${path}: ${message}`);
}

/** Every optional prose field the English item has must be translated too. */
function overlay<T extends object>(en: T, zh: Obj, keys: string[], path: string): T {
  const src = en as Obj;
  const out: Obj = { ...src };
  for (const k of keys) {
    if (src[k] === undefined || src[k] === '') continue;
    if (zh[k] === undefined || zh[k] === '') fail(`${path}.${k}`, 'missing, but the English file has it');
    out[k] = zh[k];
  }
  return out as T;
}

function overlayList<T extends object>(en: T[], zh: Obj[], keys: string[], path: string): T[] {
  if (en.length !== zh.length) fail(path, `has ${zh.length} items, English has ${en.length}`);
  return en.map((item, i) => overlay(item, zh[i], keys, `${path}[${i}]`));
}

export interface ProseFields {
  title: string;
  headline?: string;
  tags: string[];
  summary: string;
  splash: string;
  wipe: string;
  inTheWildNote?: string;
  oneLiner?: string;
  sourceException?: string;
  cves: { name: string; description: string; plain?: string }[];
  fixed: { product: string; status?: string }[];
  mitigation?: { code: string; note?: string };
  timeline: { date: string; title: string; body?: string }[];
  checklist: { title: string; hint?: string }[];
  sources: { name: string; says?: string }[];
}

export function localizeIncident<T extends ProseFields>(en: T, zh: Obj, id: string): T {
  const z = zh as Obj & Record<string, Obj[] | undefined>;
  const top = overlay(en, zh, ['title', 'headline', 'summary', 'splash', 'wipe', 'inTheWildNote', 'oneLiner', 'sourceException'], id);
  return {
    ...top,
    tags: (zh.tags as string[] | undefined) ?? en.tags,
    cves: overlayList(en.cves, z.cves ?? [], ['name', 'description', 'plain'], `${id}.cves`),
    fixed: overlayList(en.fixed, z.fixed ?? [], ['status'], `${id}.fixed`).map((row, i) => ({
      ...row,
      product: ((z.fixed ?? [])[i]?.product as string | undefined) ?? row.product,
    })),
    mitigation: en.mitigation && {
      ...overlay(en.mitigation, (zh.mitigation as Obj) ?? {}, ['note'], `${id}.mitigation`),
      code: ((zh.mitigation as Obj | undefined)?.code as string | undefined) ?? en.mitigation.code,
    },
    timeline: overlayList(en.timeline, z.timeline ?? [], ['date', 'title', 'body'], `${id}.timeline`),
    checklist: overlayList(en.checklist, z.checklist ?? [], ['title', 'hint'], `${id}.checklist`),
    sources: overlayList(en.sources, z.sources ?? [], ['says'], `${id}.sources`).map((s, i) => ({
      ...s,
      name: ((z.sources ?? [])[i]?.name as string | undefined) ?? s.name,
    })),
  } as T;
}
