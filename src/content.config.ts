import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { incidentSchema } from './lib/incident-schema';

/**
 * One Markdown file per incident lives in /incidents/<year>/<yyyy-mm-dd>-<slug>.md.
 * The frontmatter is validated against this schema on every build, so a bad
 * pull request fails CI instead of breaking the site. See CONTRIBUTING.md.
 */
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
  schema: incidentSchema,
});

export const collections = { incidents };
