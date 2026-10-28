# Reviewing incident PRs

How to review, fix and merge the pull requests that [JOB.md](JOB.md) opens. The rules for what an incident
should say are in JOB.md, [CONTRIBUTING.md](CONTRIBUTING.md) and [`docs/translation-zh.md`](docs/translation-zh.md).
This file covers two rounds of review, fixes and automatic merge onto `main`. The scheduled job runs every
six hours and may review and merge the PR it creates in that run. Other PRs require user authorization.
The user authorizes merge pushes to trigger the configured Cloudflare automatic deployment. Do not run
standalone deployment commands, manually trigger deployment workflows or publish releases.

## 0. Set up

1. Inspect `git status` and protect existing work before switching. When safe, use
   `git checkout main && git pull --ff-only`, then `gh pr list --state open`.
2. Review the PR created by this run, or the PRs the user explicitly requested. Leave unrelated open PRs
   alone and include their full diffs in the dedup inventory. When authorized to review several PRs,
   review the oldest first.
3. If the job's branch is checked out somewhere you shouldn't disturb, work in a detached worktree in a
   scratch directory instead of switching branches:
   `git fetch origin && git worktree add --detach <dir> origin/<branch>`.
   If no safe checkout is available, stop and report; never overwrite, reset or discard user changes.

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

Don't send fixes back to the job as review comments. The next run won't read them. Fix the PR, then report
any missing rule that could prevent the mistake recurring (see step 8).

## 5. Fix

- Push fixes to the PR's own branch, never to `main` alone:
  `git push origin HEAD:<branch>` from your worktree.
- Add one commit per incident you touch, named like the job's (`Update <slug>: <what you fixed>`). Don't
  rewrite the job's commits and don't force-push.
- Change English and Chinese together. Run `npm test` and `npm run build` with a supported Node version;
  an old local runtime is not a reason to skip validation. Never weaken tests or schema to get green.
- Re-read your diff once against the sources before pushing.

## 6. Complete two review rounds

1. **Round one:** Apply steps 1–5 to the complete PR diff. Reopen the primary sources yourself and verify
   versions, dates, IDs, victim figures, prerequisites, exploitation evidence and actionable remediation.
   Fix every finding on the PR branch.
2. **Round two:** Review the complete revised diff again, including the fixes. Repeat the source and
   writing checks; check for omissions, regressions, duplicates and English/Chinese mismatches. Fix any
   new findings and rerun validation after changes.
3. Record both rounds' findings, fixes, remaining uncertainties and test/build results in the PR
   description. Record a clean round explicitly. Two rounds are the minimum: keep correcting and
   rechecking until no blocking findings remain. An unverifiable central claim blocks merge unless it
   is removed and the remaining incident still meets the sourcing and newsworthiness rules.
4. Review the final diff and identify its exact head SHA. Any later change, including conflict resolution,
   needs review and fresh checks on the resulting commit before merge.

## 7. Merge after review and checks

1. Confirm both review rounds are complete and all findings are resolved. `npm test` and `npm run build`
   must pass; wait for the `build` CI check and every other required check on the latest reviewed commit
   to pass. Never merge on red or pending, bypass checks, or use administrator overrides.
2. Merging onto `main` may trigger the configured Cloudflare automatic deployment; the user explicitly
   authorizes this behavior. Do not hold an otherwise ready PR because of that integration. Do not run
   standalone deployment commands, manually trigger deployment workflows or publish releases.
3. Automatically merge the authorized PR with
   `gh pr merge <n> --rebase --delete-branch --match-head-commit <reviewed-head-sha>`.
   Rebase preserves the event and review-fix commits. Never push directly to `main` or force-push.
4. If conflicts prevent merging, resolve them on the PR branch without rewriting published history,
   review the resulting complete diff, rerun tests/build and wait for fresh CI. If you cannot do this
   safely, leave the PR open and report. Do not modify unrelated PRs.
5. Safely return to `main`, run `git pull --ff-only`, and confirm CI passed for the exact resulting main
   commit. Report any failure; do not manually deploy or rewrite main to repair it automatically.
6. Remove only scratch worktrees created for this review, after preserving any work they contain.
7. Notify with the PR link, review/fix summary and validation outcome after completion, or report a
   failure or unresolved issue that prevents completion. No substantive change means no PR or notification.

## 8. Feed back into JOB.md

Every fix you made is a rule the job didn't follow or didn't have. After merging:

- If JOB.md already covers it, leave JOB.md alone; it was a one-off.
- If JOB.md doesn't cover it, report a short, concrete proposed rule and its reason. The scheduled job
  only changes `incidents/**`; documentation changes require a separately authorized task and must not
  be committed directly to `main` by the job.
- When documentation updates are authorized, keep JOB.md and REVIEW.md in step: a new job rule is a new
  thing to check here.
