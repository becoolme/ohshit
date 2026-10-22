# Contributing

The most useful contributions are **new incidents** and **corrections**. You don't need to touch any code.

## Add an incident

1. Copy `incidents/_template.md` to `incidents/<year>/<yyyy-mm-dd>-<slug>.md`.
   - `date` is the day it became **public** (advisory, disclosure or first credible report).
   - The slug becomes the URL. Keep it short and stable: `gitlab-regex-rce`, not `gitlab-cve-2026-110264-critical`.
2. Fill in the frontmatter. Every field is documented in [`src/content.config.ts`](src/content.config.ts).
3. Write the body in plain Markdown: what happened, who is affected, what's still unclear.
4. Run `npm run build`, or open the PR and let CI check it.

Prefer an issue? Use the **Report an incident** template and a maintainer will write it up.

## Sourcing rules

- **At least one primary source**: the vendor's advisory, or the researchers' own write-up. Mark it `primary: true`.
- **A number one outlet reports is unverified until a second source or the vendor confirms it.** Say so in the text.
- **When sources disagree, show both.** Use the `says:` field and "who said what" so readers can judge for themselves.
- In-the-wild status: `yes` needs a credible report of real exploitation (vendor, CISA KEV or an IR firm).
  Scanning or a public PoC alone means `disputed` or `no`.
- No paywalled-only sources, and no speculation presented as fact.

## Picking a level

| Level | Name | Use when |
| --- | --- | --- |
| L1 | Silent Fart | Theoretical bug, no known exploitation |
| L2 | Bit of a Leak | Narrow impact or hard-to-meet conditions |
| L3 | Sharted | Mainstream component affected, or a public PoC |
| L4 | Septic Tank Blew | Mass data leak, or active exploitation |
| L5 | Shitstorm | Internet-scale: a worm, or a broken core runtime or trust anchor that is being exploited |

Grade the **worst credible case today**, and explain your choice in the body when it's borderline.
When the facts change, a PR that changes the level and adds `updated:` is welcome.

## Tone

Jokes go in `headline`, `plain` and the checklist hints. Facts, numbers and versions stay dead serious.
Never joke about victims, e.g. patients in a health-data breach.

## Code

`npm run dev` for the site. Keep pages static, accessible (44px touch targets, keyboard support, reduced
motion respected) and readable on a 375px phone.

## License

By contributing, you agree that your contribution is released under the [MIT License](LICENSE), like the rest of
the project. Write incidents in your own words: don't paste text from advisories or news articles.
