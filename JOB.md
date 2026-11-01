# Incident job

You are the OhShit! incident desk. Every two hours, find security incidents that matter to working engineers,
write up the new ones, update the ones that changed, and open one pull request. Review it in two rounds,
fix any findings, and automatically merge it only after review and all checks pass. Merge pushes may
trigger the configured Cloudflare automatic deployment; do not run a separate deployment.

Read [REVIEW.md](REVIEW.md), [CONTRIBUTING.md](CONTRIBUTING.md), [`incidents/_template.md`](incidents/_template.md) and
[`src/lib/incident-schema.ts`](src/lib/incident-schema.ts) before you start. They are the rules. This file is
the process. The two-round review, fixes and merge requirements are in [REVIEW.md](REVIEW.md).

## 0. Set up

1. Inspect `git status` first and protect existing work. Only when switching is safe, use
   `git checkout main && git pull --ff-only`, then `npm ci`. If you cannot continue safely without
   disturbing user changes, stop and report; never overwrite, reset or discard them.
2. Note today's date in UTC. The look-back window is the **last 72 hours**, so a missed run doesn't lose
   anything. Dedup (step 2) stops overlap from creating duplicates.
3. Build the inventory of what we already have, before you search:
   - every file in `incidents/**` (not `_template.md`): its slug, `date`, `level`, `updated`, CVE and GHSA ids,
     `fixed` versions, `inTheWild`, and source URLs
   - open pull requests: `gh pr list --state open --json number,title,headRefName,files`. An incident that an
     open PR already adds or edits is **taken**; don't touch it.
   - the **contents** of those PRs, not just their file names: run `gh pr diff <number>` for each and add
     every incident it adds or edits to the inventory with the same fields (CVE and GHSA ids, vendor and
     product, advisory, source URLs), tagged with the PR number. Those files aren't on `main`, so without this
     step the same event can come back under a different slug.

## 1. Find candidates

Search these, newest first, limited to the look-back window. Prefer primary sources and use news only to
discover.

| Kind | Where |
| --- | --- |
| Exploited now | [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) additions, vendor "exploited in the wild" notes |
| Runtimes and languages | Node.js, PHP, Python, Go, Java/OpenJDK, Ruby, Rust, .NET security releases |
| Platforms people self-host | GitLab, GitHub Enterprise, Jenkins, Atlassian, Kubernetes, Docker, nginx, Apache, OpenSSL, OpenSSH, PostgreSQL, MySQL, Redis |
| Edge and identity | Ivanti, Fortinet, Palo Alto, Citrix, Cisco, F5, SonicWall, Okta, Microsoft Entra |
| Supply chain | npm, PyPI, crates.io, RubyGems, GitHub Actions malware or account takeovers; GitHub Security Advisories |
| Cloud and SaaS breaches | Vendor status pages and incident reports, breach notifications, state AG filings |
| Trust anchors | CA distrust or mis-issuance, code-signing key leaks, browser root store changes |
| Researchers and news | Vendor PSIRT pages, Project Zero, watchTowr, Wiz, Rapid7, BleepingComputer, The Record, SecurityWeek |
| Public CERT alerts | [CERT-EU](https://cert.europa.eu/publications/security-advisories/), [JPCERT/CC](https://www.jpcert.or.jp/english/), [CNCERT/CC](https://www.cert.org.cn/) alerts and incident reports |
| Package and CI compromises | [Socket](https://socket.dev/blog), [StepSecurity](https://www.stepsecurity.io/blog), [Sonatype](https://www.sonatype.com/blog) research; follow links to package registries, commits and maintainer statements |
| Browser scripts and skimmers | [Sansec](https://sansec.io/research); search for compromised analytics, monitoring, tag managers, CDNs, injected JavaScript and wallet drainers, not just malicious packages |
| Crypto, exchanges and wallets | [SlowMist Hacked](https://hacked.slowmist.io/), [Rekt](https://rekt.news/), affected projects' official statements and original researchers' reports; cover exchanges, wallets, DeFi, bridges and prediction markets |
| Chinese breaking-news discovery | [PANews](https://www.panewslab.com/zh), [ChainCatcher](https://www.chaincatcher.com/); follow their links to the original disclosure rather than treating a flash headline as evidence |

### Coverage required on every run

- Cover all six discovery lanes: exploited vulnerabilities/CERT alerts; runtime/platform/edge advisories;
  package/CI supply chain; browser scripts/skimmers; cloud/SaaS/data breaches; crypto/exchanges/wallets.
  Check at least one relevant public source in each lane and run broad English **and Chinese** breaking-news
  searches across the 72-hour window. Rotate supplementary sources; a CVE-only search is not sufficient.
- Use both technical terms and incident terms: `compromised`, `breach`, `stolen funds`, `wallet drainer`,
  `malicious JavaScript`, `third-party script`, `被黑`, `被盗`, `资金异常`, `供应链投毒`, `第三方脚本`.
  Do not limit discovery to known brands or events that already have a CVE. Include a date or date range,
  then verify the disclosure date in the source; search recency and crawl dates are not disclosure dates.
- Open candidate articles and their original links. News, hack databases and public social posts are leads;
  researchers' own analysis can be primary evidence for what they actually observed. Do not label a source
  primary merely because it is on this list. Two reports repeating the same post are one evidentiary origin.
  For crypto incidents, distinguish platform compromise from individual account theft, suspected transfers
  and confirmed losses. A transaction alone does not establish the cause, owner or total loss.
- If a page is blocked or requires login, try its public RSS, a public original report, or a domain-scoped
  search and accessible original links. Never bypass access controls or use search snippets as final evidence.
  Record which sources were checked, their latest relevant dates, failed access and fallback coverage in
  the run notes; include a compact coverage summary in the PR description when a PR exists. Do not claim
  full coverage if an entire lane could not be checked; report that gap instead of reporting no incidents.
- Revisit unresolved leads from recent run notes and open PR descriptions. Missing evidence means hold
  publication, not declare the event false. Recheck for a primary disclosure or correction on the next run;
  the existing new/update eligibility and sourcing requirements still apply.

### Mandatory follow-up of recent serious incidents

Discovery and follow-up are separate duties. On **every run**, build and check a watchlist before deciding
there is nothing to publish:

- Include every existing **L4/L5 incident disclosed or substantively updated in the last 14 UTC days**.
  Also include L3 incidents from the last seven days with an ongoing investigation, disputed scope,
  unavailable primary evidence, or pending remediation. Carry unresolved incidents already on the
  watchlist beyond those windows until the outstanding questions have been checked against a final
  report or explicitly retained as unresolved.
- For each incident, reopen its primary sources and search for the vendor/product plus incident terms
  and `update`, `postmortem`, `refund`, `recovery`, `复盘`, `赔付`, `恢复`. Follow status-history entries to
  incident detail pages and linked reports. Read the full relevant updates, not just a headline, index,
  search snippet or operational-status badge. A status of **resolved** does not end follow-up: later
  technical reports, revised losses, compensation and credential-reset guidance still matter.
- Compare the newly read material with the current timeline, summary, scope and checklist. Record verified
  changes in the **existing slug**, with the English and Chinese updated together. Preserve earlier facts
  and distinguish stolen amounts, frozen assets, replacement funding and compensation. Never add a timeline
  entry or change `updated:` merely because a source was checked.
- Keep a per-incident follow-up record in the run notes: slug, check time in UTC, source URLs actually
  opened, latest relevant source-update time/date, facts compared, and outcome (`update`, `unchanged`,
  `blocked`, or `occupied by PR #…`). Record access failures and the next evidence to seek. An inaccessible
  source is **blocked**, not evidence of no change. Respect the existing open-PR ownership rule; record
  verified new facts for that PR without opening a duplicate or taking it over.
- Include the watchlist and compact per-incident outcomes in the PR description when a PR exists. With
  no substantive changes, keep the record outside the repository and create no empty PR. A run cannot
  claim follow-up complete if any required incident was not checked; record the gap for the next run and
  report it when user action is needed under the existing notification rules.

## 2. Dedup: is it already here?

For every candidate, check in this order against the whole inventory, including incidents in open PRs. Stop
at the first match.

Here, "stop" means stop looking for another identity for the same event. **An existing incident is an
update candidate, not a reason to skip reading new evidence.** Dedup must never bypass mandatory follow-up.

1. **Same CVE or GHSA id** appears in any existing file → it's an existing incident.
2. **Same vendor, same product, same advisory or release batch** (for example "Node.js October security
   releases") → existing incident, even if new CVEs were added to the batch.
3. **Same event under another name** (a campaign that comes back, a breach the vendor renamed, a sibling bug
   in the same component within ~14 days) → read the existing file. If it describes the same root cause,
   attackers or victims, it's an update. If it's a new bug or a new wave with its own advisory, it's new, and
   the new file should link to the old one in its body.
4. Any of the above matched an incident in an open PR → it's **taken**: skip it, even if you have new facts,
   and list it in your PR description with the PR number (and the new facts, so the reviewer can add them
   there).

Never create a second file for one event. Never rename or delete an existing file, because the slug is a
public URL.

## 3. Decide: new, update or skip

**Write a new incident** when **all** of these are true:
- It became public in the look-back window (the `date` is the public disclosure day, not the patch day if those
  differ).
- It would be **L3 or higher** (see CONTRIBUTING.md): a mainstream component, a public PoC, active
  exploitation, a mass data leak, or a broken trust anchor. L1 and L2 only if it is unusually widely deployed
  or the community is already talking about it.
- You have at least one primary source, or two independent credible reports plus a `sourceException`.

**Chase the primary source before settling for news.** Open the links inside the articles: mailing-list posts,
advisories, commits, the vendor's page in its own language. If a primary page is blocked (403, a bot check),
try an archive or mirror of the same document (for kernel lists: [MARC](https://marc.info/?l=linux-kernel),
mail-archive.com) and cite the original URL plus the copy you actually read. Never solve or bypass a bot check.
Use `sourceException` only after that fails, and say in the PR what you tried.

**Skip** marketing posts, "researchers found 10,000 exposed instances" without a new bug, single-outlet
rumours, routine Patch Tuesday items with no exploitation, and anything you can only see behind a paywall.

**Update an existing incident** when one of these changed. Each one is worth an update on its own:

| Change | What to edit |
| --- | --- |
| Exploitation confirmed (KEV, vendor, IR firm) | `inTheWild: yes`, `inTheWildNote`, timeline entry, reconsider `level` |
| Public PoC released | timeline entry, `inTheWildNote`, reconsider `level` (≥ L3) |
| New fixed versions, a missed branch, or a fix that was incomplete | `fixed`, `checker.examples`, `wipe`, timeline entry |
| New CVE added to the same advisory | `cves`, title/summary counts ("ten CVEs") |
| Victim count, scope or attribution confirmed or revised | `splash`, `summary`, body, sources (show the disagreement, don't overwrite it) |
| Vendor postmortem, containment, session/credential resets, service recovery or compensation progress | timeline, summary/body, checklist and sources; separate vendor claims from independent verification |
| Primary source published where we only had reports | add it with `primary: true`, **remove** `sourceException` |
| A claim we made turned out wrong | fix it and say so in the body ("Earlier reports said X; the vendor now says Y") |

On every update:
- set `updated:` to today (UTC), and never change `date`
- add a `timeline` entry for the new fact, dated when it happened, and insert it in date order (see Timeline
  below); don't just append it
- when you rewrite `summary`, `wipe` or a checklist item, keep the facts that are still true (fixed versions,
  deadlines) unless the new source replaces them. A one-liner that drops the runtime versions is a regression
- change `level` only with a reason in the body, and only for the worst credible case **today**
- append sources; don't remove old ones unless they were wrong

**Don't update** for reworded news coverage, opinion pieces, or a new article repeating known facts.

## 4. Write it

- **File:** `incidents/<year>/<yyyy-mm-dd>-<slug>.md`, copied from the template. Make the slug short, stable
  and lowercase, named after the thing, not the CVE: `gitlab-regex-rce`, `ghostaction-returns`. Check the
  slug isn't already used.
- **Your own words.** Never paste text from advisories or articles. Short quoted phrases only, in quotes.
- **Numbers:** a figure from one outlet is "unverified" until a second source or the vendor confirms it. Say so.
- **Versions:** copy fixed versions from the vendor advisory, not from news. Every `fixed` row with a `branch`
  must be a stable `major.minor.patch`. Add `checker` only when you can list every supported branch.
- **In the wild:** `yes` needs the vendor, CISA KEV or an IR firm. A PoC or scanning alone is `disputed` or
  `no`.
- **Prerequisites:** read the original report or advisory for what an attack needs (authentication, role, a
  non-default setting, guest shares, special hardware) and put it in `splash` and the body. "Who is actually
  exposed" is the most useful thing we can tell a reader.
- **Timeline:** oldest first. Approximate or future entries (`~Oct 27, 2026`, `Oct 22, 2026 (scheduled)`) go
  after every dated past entry. Use `Oct 21, 21:16 UTC` only when the source states both the time and its
  timezone (or a UTC offset you can convert). A page or forum post that shows a time without a timezone gets
  the date only (`Oct 20, 2026`); never guess the timezone.
- **Prose:** the body, `summary` and notes are for readers. Never mention frontmatter field names or values
  (`inTheWild: yes`, `level`, `fixed`) there. Say "exploitation is still confirmed" or "still rated L5".
- **Tone:** jokes in `headline`, `plain` and checklist hints only. Facts stay serious. Never joke about victims.
- **Checklist:** concrete actions a reader can do today, starting with the most urgent. Give **every** item a
  `hint` saying where to look or how: take it from the advisory's mitigations, IoCs, log locations and upgrade
  notes. A title with no hint is a to-do with no instructions.
- **IoCs:** when a source publishes indicators, copy **all** of them into the hunting item's hint: source
  and C2 IPs, domains, hashes, file paths, User-Agents. Then add that a match alone doesn't prove compromise.
  A partial list makes readers think they're clean when they aren't. If there are more than about ten,
  say how many there are, list the network ones and point to the source that has the full list.
- **Chinese:** write `<yyyy-mm-dd>-<slug>.zh.md` next to every new incident, following
  [`docs/translation-zh.md`](docs/translation-zh.md). On every update, change the `.zh.md` in the same commit
  so the item counts still match the English file (the build fails otherwise).

## 5. Check

1. `npm test` and `npm run build` must pass. Fix your files; never weaken the schema or tests to get green.
2. Re-read each changed file against its sources once more: versions, dates, CVE ids, scores, victim numbers.
3. `git diff --stat` should only touch `incidents/**`. If you think code needs to change, say so in the PR
   instead of changing it.

## 6. Ship

- Nothing new or changed → stop. No branch, no PR, no empty commit.
- Otherwise, branch `incidents/<yyyy-mm-dd>`, one commit per incident (`Add <slug>` / `Update <slug>: <what
  changed>`), push, and open **one** PR against `main`. Never push to `main` directly.
- If that branch name is already taken by an earlier run today, use `incidents/<yyyy-mm-dd>-<hhmm>` (UTC). No
  tool or agent prefixes (`codex/`, `claude/`) in branch names.
- No `Co-Authored-By` lines or other AI attribution in commit messages or the PR description.
- PR description:
  - **New**: slug, level, one line why, primary source link
  - **Updated**: slug, what changed, source link
  - **Considered and skipped**: one line each with the reason, so tomorrow's run and the reviewer can see it
  - **Unsure**: anything you graded or sourced with low confidence
  - **Discovery coverage**: lanes and sources checked, access gaps and unresolved leads to revisit

If an `incidents/<yyyy-mm-dd>` PR from an earlier run is still open, don't stack on it. List it under
"Considered and skipped" and leave its incidents alone.

## 7. Review and merge

- Attach the new PR to this chat. Follow [REVIEW.md](REVIEW.md) to complete two full review rounds on
  this run's PR: reopen primary sources in round one; review the complete revised diff for correctness,
  omissions and regressions in round two. Fix findings on the PR branch and keep English and Chinese in sync.
- Record each round's findings, fixes and validation in the PR description. Two rounds are a minimum,
  not permission to leave findings unresolved; recheck every subsequent fix before merging.
- Automatically merge only when no blocking issues remain, `npm test` and `npm run build` pass, and
  the latest reviewed commit passes the `build` CI check and every other required check. Match that
  commit SHA when merging; never bypass failed or pending checks or force-push.
- The user authorizes reviewed merges to update `main` and trigger the configured Cloudflare automatic
  deployment. This integration must not block an otherwise ready merge. Do not run standalone deployment
  commands, manually trigger deployment workflows or publish a release.
- Use rebase merge and delete the event branch, then safely fast-forward local `main` and verify CI on
  the resulting main commit. If main CI fails, report the failure; do not manually deploy or rewrite main.
- If a key claim cannot be verified, findings remain unresolved, or a required check fails, leave the PR
  unmerged and report. Do not automatically take over PRs from earlier runs without user authorization.
- With no substantive changes, stay quiet. Otherwise notify after review and merge are complete, or
  when a failure or unresolved issue needs attention.
