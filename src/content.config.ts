import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One Markdown file per incident lives in /incidents/<year>/<yyyy-mm-dd>-<slug>.md.
 * The frontmatter is validated against this schema on every build, so a bad
 * pull request fails CI instead of breaking the site. See CONTRIBUTING.md.
 */
const date = z.coerce.date();

const incidents = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/_*.md'],
    base: './incidents',
    // "2026/2026-10-21-php2shell.md" -> "php2shell"
    generateId: ({ entry }) =>
      entry
        .split('/')
        .pop()!
        .replace(/\.md$/, '')
        .replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: z.object({
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
  }),
});

export const collections = { incidents };
