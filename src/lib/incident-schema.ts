import { z } from 'astro/zod';
import { parseVersion, checkVersion } from './versions.ts';

const date = z.coerce.date();

export const incidentSchema = z.object({
  title: z.string().min(10).max(160),
  /** Short punchline shown on the detail page hero. */
  headline: z.string().max(90).optional(),
  /** 1 Silent Fart … 5 Shitstorm. See src/lib/levels.ts. */
  level: z.number().int().min(1).max(5),
  /** When the incident became public (disclosure / advisory date). */
  date,
  /** Set when "date" is only known to the month. */
  dateIsApproximate: z.boolean().default(false),
  updated: date.optional(),
  tags: z.array(z.string()).min(1).max(5),
  ecosystems: z.array(z.string()).default([]),
  /** 1–2 sentences for the feed card. */
  summary: z.string().max(360),
  /** Who is affected, as one short line. */
  splash: z.string().max(140),
  /** The one-line fix, as one short line. */
  wipe: z.string().max(160),
  inTheWild: z.enum(['yes', 'no', 'disputed', 'unknown', 'n/a']).default('unknown'),
  /** One short line explaining the in-the-wild status. */
  inTheWildNote: z.string().max(90).optional(),
  /** "The one-sentence version": how the attack works, in plain words. */
  oneLiner: z.string().max(400).optional(),
  cves: z
    .array(
      z.object({
        id: z.string().regex(/^(CVE-\d{4}-\d{4,}|GHSA-[\w-]+)$/),
        score: z.number().min(0).max(10).optional(),
        name: z.string(),
        description: z.string(),
        plain: z.string().optional(),
      }),
    )
    .default([]),
  /**
   * Fixed versions, one row per release branch. `branch` is the version prefix
   * ("8.4", "22"); `version` is the first safe release, or "none" for EOL lines.
   * `branch: "*"` catches every version no other branch matches (e.g. "older: upgrade to X").
   */
  fixed: z
    .array(
      z.object({
        product: z.string(),
        branch: z.string().optional(),
        version: z.string(),
        status: z.string().optional(),
      }),
    )
    .default([]),
  /** Turns the fixed table into an interactive "are you standing in it?" checker. */
  checker: z
    .object({
      runtime: z.string(),
      command: z.string(),
      examples: z.array(z.string()).min(2).max(10),
    })
    .optional(),
  mitigation: z
    .object({ file: z.string(), code: z.string(), note: z.string().optional() })
    .optional(),
  timeline: z.array(z.object({ date: z.string(), title: z.string(), body: z.string().optional() })).default([]),
  checklist: z.array(z.object({ title: z.string(), hint: z.string().optional() })).min(1),
  /** Explain the evidence gap when no primary source is available. */
  sourceException: z.string().trim().min(20).optional(),
  /** Claims that sources disagree on. Shown as "who said what". */
  sources: z
    .array(
      z.object({
        name: z.string(),
        url: z.url(),
        says: z.string().optional(),
        primary: z.boolean().default(false),
      }),
    )
    .min(1),
}).superRefine((data, ctx) => {
  const issue = (path: (string | number)[], message: string) => ctx.addIssue({ code: 'custom', path, message });
  const hasPrimary = data.sources.some((source) => source.primary);
  if (!hasPrimary && !data.sourceException) issue(['sources'], 'Include a primary source or explain sourceException.');
  if (data.sourceException && new Set(data.sources.map((source) => source.url)).size < 2) {
    issue(['sources'], 'A sourcing exception needs at least two distinct reports.');
  }
  if (hasPrimary && data.sourceException) issue(['sourceException'], 'Remove the exception when a primary source is available.');
  if (data.updated && data.updated < data.date) issue(['updated'], 'Updated must be on or after disclosure.');

  const seen = new Set<string>();
  data.fixed.forEach((row, i) => {
    if (!row.branch) {
      if (data.checker && row.version !== 'none') issue(['fixed', i, 'branch'], 'Checker thresholds need an explicit branch.');
      return;
    }
    if (seen.has(row.branch)) issue(['fixed', i, 'branch'], 'Duplicate checker branch.');
    seen.add(row.branch);
    if (row.branch !== '*' && !/^\d+(?:\.\d+){0,2}$/.test(row.branch)) {
      issue(['fixed', i, 'branch'], 'Use a numeric prefix or *.');
    }
    if (row.version === 'none') return;
    const version = parseVersion(row.version);
    if (!version || version.parts.length !== 3 || version.prerelease || row.version !== version.parts.join('.')) {
      issue(['fixed', i, 'version'], 'Checker thresholds must be stable major.minor.patch versions.');
    } else if (row.branch !== '*' && row.version !== row.branch && !row.version.startsWith(row.branch + '.')) {
      issue(['fixed', i, 'version'], 'Fixed version must belong to its branch.');
    }
  });
  if (data.checker) {
    if (!data.fixed.some((row) => row.branch && row.version !== 'none')) issue(['fixed'], 'A checker needs a patched branch.');
    const branches = data.fixed.filter((row) => row.branch).map((row) => ({ branch: row.branch!, version: row.version }));
    data.checker.examples.forEach((example, i) => {
      const result = checkVersion(example, branches, data.checker!.runtime);
      if (result.kind === 'invalid' || result.kind === 'incomplete') issue(['checker', 'examples', i], 'Use a complete, valid version.');
    });
  }
});

/**
 * A Chinese translation lives next to the English file as <file>.zh.md. It only carries the fields a
 * reader sees as prose; dates, levels, versions, URLs and CVE ids always come from the English file.
 * Arrays must line up with the English ones item for item. See src/lib/localize.ts.
 */
export const incidentZhSchema = z.object({
  title: z.string().min(4).max(160),
  headline: z.string().max(90).optional(),
  /** Optional: replaces the English tags when present. */
  tags: z.array(z.string()).min(1).max(5).optional(),
  summary: z.string().max(360),
  splash: z.string().max(140),
  wipe: z.string().max(160),
  inTheWildNote: z.string().max(90).optional(),
  oneLiner: z.string().max(400).optional(),
  sourceException: z.string().trim().min(10).optional(),
  cves: z.array(z.object({ name: z.string(), description: z.string(), plain: z.string().optional() })).default([]),
  fixed: z.array(z.object({ product: z.string().optional(), status: z.string().optional() })).default([]),
  mitigation: z.object({ note: z.string().optional(), code: z.string().optional() }).optional(),
  timeline: z.array(z.object({ date: z.string(), title: z.string(), body: z.string().optional() })).default([]),
  checklist: z.array(z.object({ title: z.string(), hint: z.string().optional() })).min(1),
  sources: z.array(z.object({ name: z.string().optional(), says: z.string().optional() })).min(1),
});
