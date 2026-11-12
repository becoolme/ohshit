---
title: WFX Phantom uses stolen GitHub tokens to run a CI credential stealer
summary: Attackers used stolen developer and bot tokens to plant a shell stealer in GitHub repositories, then reverted commits and deleted runs. The stealer can collect runner memory and exchange OIDC tokens for cloud access. Newer samples upload through Telegram.
splash: GitHub repositories writable by stolen developer or bot tokens, where the injected workflow, script or package hook can run.
wipe: Contain suspect runs, revoke compromised tokens, rotate reachable secrets and inspect cloud trust and published artifacts.
inTheWildNote: StepSecurity observed execution. WebdriverIO recorded unauthorized bot commits.
level: 4
date: '2026-11-11'
tags:
- GitHub Actions
- CI/CD
- credential theft
inTheWild: 'yes'
timeline:
- date: Nov 10, 2026
  title: StepSecurity dates the start of the campaign
  body: Stolen GitHub tokens are used to probe repositories and push malicious changes.
- date: Nov 11, 12:30 UTC
  title: WebdriverIO contributor publicly documents two malicious bot commits
  body: The commits hook postinstall. Later the same day, a surviving Nextcloud Docker workflow log documents execution of another variant.
- date: Nov 12, 01:10 UTC
  title: Telegram appears as a backup in one sample
  body: The sample also points to a third HTTP collector.
- date: Nov 12, 2026
  title: StepSecurity publishes its campaign analysis
  body: It saw Telegram-only delivery from about 05:30 UTC and reported over 63,000 probe PR search results at 07:40 UTC. The search count does not measure successful compromises.
checklist:
- title: Contain suspicious GitHub access and runs
  hint: Pause affected workflows and releases, cancel active suspect runs, isolate affected self-hosted runners and preserve audit logs, run IDs, commit SHAs and network evidence. Revoke affected PATs, OAuth or GitHub App user authorizations and bot credentials. Remove unnecessary branch bypass and review where each token had write access.
- title: Correlate repository and network evidence
  hint: Use the indicator list below to inspect Git history, PR metadata, Actions audit trails and runner egress. Correlate missing run numbers with the specific commit and actor. A probe or isolated indicator is a lead. If execution is confirmed or likely, assume the job’s reachable credentials were exposed.
- title: Remove cloud persistence before replacing secrets
  hint: Suspend affected OIDC trusts and revoke sessions where supported. Check AWS CloudTrail and IAM for altered role trusts, new access keys and wfx-* sessions. Check Azure audit logs for unauthorized federated credentials and GCP logs for service-account impersonation. Remove unauthorized access, then rotate all reachable repository, organization, environment, registry and cloud secrets. For self-hosted runners, include credentials and tokens accessible on the host.
- title: Restore from trusted source and verify outputs
  hint: Remove the payload, restore protected branches and CI from verified commits, rebuild affected runners and verify releases, artifacts and caches against known-good outputs. Block the listed package versions and regenerate lockfiles from verified inputs. Resume release automation only after clean runs and audit checks. Restrict runner egress to required destinations and bind required checks to trusted sources where supported.
sources:
- name: StepSecurity original WFX Phantom analysis
  says: Documents observed variants, public execution evidence, affected release artifacts, collection endpoints and cloud persistence features.
  url: https://www.stepsecurity.io/blog/wfx-phantom-the-github-actions-secret-stealer
  primary: true
- name: WebdriverIO public revert PR
  says: Documents the bot’s unauthorized commits, the postinstall hook and proposed response.
  url: https://github.com/webdriverio/webdriverio/pull/16444
  primary: true
- name: Nextcloud Docker repository commit
  says: Shows the injected change to update.sh.
  url: https://github.com/nextcloud/docker/commit/b4353fc0b709226943b19e9793509be4a2c3a278
  primary: true
---

The campaign requires a valid token with repository write access and a path to execute the code. It modifies an existing workflow, creates a new workflow, appends to a script CI already calls, or adds a hidden script and hooks it into an npm lifecycle or build/test command. Workflow variants can explicitly pass secrets to the script. Script variants can read runner memory and credential stores when the job has access. Cloud escalation depends on the runner’s credentials and the permissions and trust attached to them. Required-check forgery exists in the payload but was disabled in the samples StepSecurity examined.

StepSecurity found some probe PRs attributed by GitHub to Fly.io’s GitHub App and identified the credentials as user-to-server tokens. It did not establish how they were obtained or find evidence of compromise of Fly.io infrastructure. The research identified overlaps with [October GhostAction](/incidents/ghostaction-returns/) without attributing both campaigns to one actor.

### Release artifacts to check

- Packagist `digitalelvis/neuronai-studio` **3.14.3** contains the script and npm postinstall hook. Composer installation alone does not invoke that hook; npm installation in the package directory can. StepSecurity recommends pinning **3.14.2** or earlier.
- Go module `github.com/onuragtas/docker-env` **v1.0.278** and **v1.0.280**, and `github.com/vkuznet/gocurl` **v0.0.0-20261111095532-8d5aad0cb0da**, carry the payload in workflow files. Normal Go builds do not execute GitHub workflow files. Check lock or checksum data and replace those versions with independently verified inputs.
- StepSecurity reports no affected WebdriverIO package release. Verify other releases produced between an injected commit and cleanup using clean source and build records.

### Indicators to correlate

- HTTP endpoints at `194.150.166[.]244:8080/exfil`, `18.143.168[.]96:8080/exfil` and `153.75.82[.]159:8080/exfil`. The older `193.32.204[.]199` endpoint was still present in some previously implanted GhostAction workflows. HTTP callback values included `b42d70a7aab9140ca19e8249` and `15f44heehnax8jdf41yx`.
- Telegram `api.telegram.org` with `sendDocument`, chat `-1004340163187` and bot IDs `8708988906`, `9196217635`, `9180059428`, `8902935164`, `8876515636`. Telegram-only samples set the HTTP callback to loopback.
- Probe PR `docs: dependency audit notes`, body `Routine dependency audit notes`, branch `wfx-docs`, file `docs/wfx-audit.md` and blob `ee6e5addfe591923fc385553cb66cf0d25634a6b`.
- Commit messages `ci: refresh build cache`, `ci: restore`, `ci: cleanup`, `chore: add ci helper`, `chore: add dependency audit workflow`, and `chore: initial commit` before the workflow in empty repositories.
- Branch patterns `chore/[a-z0-9]{8}` and `ci-check-[0-9]{4}`; paths matching `.ci-[a-z0-9]{6}.sh` and `.github/workflows/build-audit-[a-z0-9]{6}.yml`, or changes to existing workflow files, shell scripts or `package.json`.
- Steps `Pass runtime`, `Restore cache <4 characters>` or `Run audit`; variables `WF_CALLBACK`, `WF_CTOKEN`, `WF_EXFIL_*`, `WF_TG_BOTS`; staging path `.wfx-$$`; log strings `memscan_files`, `archive_bytes`, `deliver_retry`.
- Azure federated credentials named `wfx-ci-*`; AWS trust changes granting a wildcard AWS principal, and AWS sessions named `wfx-*`.
