# Reviewing incident PRs

How to review, fix and merge the pull requests that [JOB.md](JOB.md) opens. The rules for what an incident
should say are in JOB.md, [CONTRIBUTING.md](CONTRIBUTING.md) and [`docs/translation-zh.md`](docs/translation-zh.md).
This file covers checking a PR against them and getting it onto `main`. Merging deploys the site, so anything
you merge is live within minutes.

## 0. Set up

1. `git checkout main && git pull`, then `gh pr list --state open`.
2. Review the oldest PR first. Later runs dedup against earlier PRs, so their "Considered and skipped" lists
   assume the earlier ones will land.
3. If the job's branch is checked out somewhere you shouldn't disturb, work in a detached worktree in a
   scratch directory instead of switching branches:
   `git fetch origin && git worktree add --detach <dir> origin/<branch>`.

## 1. Read the PR

- `gh pr view <n>` for the description, `git diff origin/main...origin/<branch>` for the change.
- The diff must touch only `incidents/**`. Code, schema, test or JOB.md changes don't belong in an incident
  PR; take them out and raise them separately.
- One commit per incident, named `Add <slug>` or `Update <slug>: <what changed>`. Branch
  `incidents/<yyyy-mm-dd>` or `incidents/<yyyy-mm-dd>-<hhmm>`. No `Co-Authored-By` lines or AI attribution in
  commits or the description.
- The description has New / Updated / Considered and skipped / Unsure. Read "Unsure" first: that's where the
  author told you to look.

## 2. Check the facts against the sources

Open the primary sources yourself. Don't trust the PR's summary of them. For every changed file, check:

- **Versions:** each `fixed` version matches the vendor advisory, and no supported branch is missing.
- **Dates and times:** `date` is the public disclosure day. A timeline time appears only if the source gives
  the time **and** its timezone. A bare "16:57" on a forum post means date only.
- **Ids and numbers:** CVE and GHSA ids, CVSS scores and victim counts are as the source states them. A
  figure from a single outlet is marked unverified.
- **In the wild:** `yes` needs the vendor, CISA KEV or an IR firm. If a source retracted or corrected a claim
  (for example, a compromise later called a failed attempt), the file shows both the claim and the
  correction and says whether the status still holds on other evidence.
- **Prerequisites:** what an attack needs (auth, guest share, special hardware, non-default config) is in
  `splash` and the body. If it's missing, read the original report and add it. This is what readers need most.
- **Sources:**
  - Every claim traces to a listed source.
  - `primary: true` is only on pages the author could actually read.
  - `sourceException` is only there because no primary source exists or could be reached. If the article
    links to a mailing list or advisory, chase it, and use an archive such as MARC when the original is behind
    a bot check. Never solve or bypass a bot check.
- **Dedup:**
  - Search `incidents/**` and the other open PRs for the PR's CVE/GHSA ids, vendor and product.
  - A second file for the same event is a blocker. Move its facts into the existing incident and drop the
    new file.
  - Never rename or delete an existing slug.

## 3. Check the writing

- **Updates keep what's still true.** Diff `summary`, `wipe` and checklist items line by line. Rewrites
  that drop fixed versions, deadlines or runtime-specific steps are the most common regression.
- **`updated:`** is today (UTC) on every updated file; `date` never changes.
- **Timeline:** oldest first, new entries inserted in date order rather than appended, `~` and scheduled
  entries last.
- **Checklist:** every item has a `hint` with where to look or how. A hunting item lists **all** published
  IoCs (source and C2 IPs, domains, hashes, paths, User-Agents) and says a match alone isn't proof.
- **Reader prose:** no frontmatter field names or values (`inTheWild: yes`, `fixed`) in the body, `summary`
  or notes.
- **Own words:** nothing pasted from the advisory beyond short quoted phrases. Facts are serious; jokes only
  in `headline`, `plain` and hints.
- **People:** refer to people by name or role. Don't infer pronouns.
- **Chinese overlay:**
  - The `.zh.md` changed in the same commit as the English file.
  - Every array has the same number of items as in English, or the build fails.
  - The content says the same thing; check that the numbers, versions and IoCs match.

## 4. Decide

| Finding | Action |
| --- | --- |
| Small, clear fixes (wording, a missing hint, a wrong timezone, an order error) | Fix it yourself on the PR branch |
| Missing facts you can verify now from a primary source | Add them yourself on the PR branch |
| A wrong fact in the PR | Fix it and say what changed in the merge note |
| Duplicate of an existing incident or another open PR | Fold it into the existing one, drop the duplicate file |
| Not newsworthy (under L3, marketing, single rumour) | Drop that incident from the PR; close the PR if nothing is left |
| Can't verify a central claim | Hold it: remove the claim or the incident, list it as skipped |

Don't send fixes back to the job as review comments. The next run won't read them. Fix the PR, then change
JOB.md if the mistake is likely to happen again (see step 7).

## 5. Fix

- Push fixes to the PR's own branch, never to `main` alone:
  `git push origin HEAD:<branch>` from your worktree.
- Add one commit per incident you touch, named like the job's (`Update <slug>: <what you fixed>`). Don't
  rewrite the job's commits and don't force-push.
- Change English and Chinese together. Run `npm test`; rely on CI's `build` check when the local Node is too
  old for `npm run build`.
- Re-read your diff once against the sources before pushing.

## 6. Merge

1. Wait for the `build` check on the PR's latest commit to pass. Never merge on red or pending.
2. `gh pr merge <n> --rebase --delete-branch`. Rebase keeps one commit per incident on `main`.
3. If the next PR now conflicts, rebase it onto `main` in a worktree, re-run `npm test`, push, and wait for
   CI again.
4. After the last merge, `git checkout main && git pull --ff-only` and check that `main`'s CI run passed (it
   deploys).
5. Remove scratch worktrees: `git worktree remove <dir>`.

## 7. Feed back into JOB.md

Every fix you made is a rule the job didn't follow or didn't have. After merging:

- If JOB.md already covers it, leave JOB.md alone; it was a one-off.
- If JOB.md doesn't cover it, add a short, concrete rule in the step where the job would apply it, with the
  reason. Commit as `JOB.md: <what>` straight to `main`.
- Keep REVIEW.md in step: a new JOB.md rule is a new thing to check here.
