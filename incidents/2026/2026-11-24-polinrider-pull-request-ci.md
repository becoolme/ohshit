---
title: PolinRider hidden in force-pushed pull requests ran in CircuitVerse CI; 40 installers withdrawn
level: 4
date: '2026-11-24'
tags:
- Supply chain
- GitHub Actions
- PolinRider
summary: A maintainer disclosed malicious October 19 force-pushes into AsyncAPI, CircuitVerse and Open Food Facts PRs. CircuitVerse confirms its desktop CI ran the loader and deleted 40 artifacts. No malicious merge was found in the reviewed PRs; Open Food Facts execution remains unconfirmed despite CI runs.
splash: CI runners and developers that ran poisoned PR builds/configs or allowed their VS Code folder-open tasks; suspect CircuitVerse artifacts.
wipe: Stop using affected PR artifacts, investigate exposed runners/devices, rotate exposed credentials from a clean device and gate fork CI.
inTheWild: 'yes'
inTheWildNote: CircuitVerse confirms CI loader execution; downstream installer execution is unknown.
cves: []
fixed: []
timeline:
- date: Oct 19, 2026
  title: Malicious commits are briefly force-pushed into fork PRs
  body: The AsyncAPI windows were 01:39–02:08 and 05:31–06:12 UTC. Clean commits were restored, leaving clean final diffs. CircuitVerse and Open Food Facts received related commits.
- date: Nov 24, 2026
  title: AsyncAPI maintainer publishes static analysis and cross-project findings
  body: Public analysis gist metadata dates creation to November 24. This disclosure concerns the October PR wave, not the earlier July AsyncAPI npm incident or the first discovery of PolinRider.
- date: Nov 25, 2026
  title: Maintainers confirm response and artifact removal
  body: CircuitVerse confirms loader execution and deletion of 40 build artifacts; its workflow-hardening PR is open. Open Food Facts rotates a potentially relevant secret but does not confirm the failed builds reached the loader.
- date: Nov 26, 2026
  title: StepSecurity publishes broader campaign analysis
  body: Reports decoding related loaders and five historical server IPs, with its wallet dataset cut off November 25 at 20:22 UTC. Its broader repository counts are not independently confirmed here.
checklist:
- title: Remove trust in the affected build artifacts and preserve evidence
  hint: 'Review CircuitVerse issue #1586 for the ten malicious PRs and ten workflow-run IDs; maintainers deleted all 40 artifacts. Stop using retained or redistributed copies from those runs, preserve hashes/download history and investigate any device that executed them. The reports do not establish which end users downloaded them or that each installer binary was independently analyzed.'
- title: Inspect every historical PR head and local checkout
  hint: Use the maintainer’s complete commit/run tables, including force-pushed-away commits, rather than only merged code or the final diff. Check package.json for node api.js && prefixes, api.js, jest.config.js, postcss.config.js, .vscode/tasks.json and settings.json, eslint-check / folderOpen tasks, public/fonts/fa-solid.lkf or .lfk (also hunt .orc/.llf fake fonts), public/fonts/README.md, branch_structure.json and temp_auto_push.bat. Do not run suspicious code to test it; a marker or unsigned commit alone is not proof of compromise.
- title: Hunt the complete network and loader indicators
  hint: 'More than ten indicators are published; use the full linked analysis and StepSecurity tables with their roles. Server IPs: 95.135.181.84, 95.135.181.151, 103.179.143.219, 23.27.13.72, 166.88.134.75; plain HTTP on TCP443 paths /0x/cls and /0x/ls. Wallet: 0x1eef0849eda15d87f64e51c73c8442cf3c8bcef3. Legitimate lookup services: 1rpc.io/eth, eth.drpc.org, ethereum-rpc.publicnode.com, eth-mainnet.public.blastapi.io, eth.blockscout.com/api; ETH_RPC_URL can override RPC. Headers: Sec-V: A8-&&, Sec-V: A8-8113, X-Payload-B64; Chrome131/Windows User-Agent. Inspect background node -e and globals _V, _H, _H2, _t_s, _t_u, global.r/global.m and global[''!''] variant tags 8-&& / 8-8113. Hashes and other roles are listed below. A match alone does not prove compromise; legitimate RPC services are not attacker infrastructure.'
- title: Contain executed payloads and replace exposed credentials
  hint: If execution is confirmed, isolate the runner or developer device, preserve process command lines and logs, and use a clean device to revoke/replace exposed GitHub tokens, OAuth grants, SSH keys, npm and cloud credentials. Check the account security log and other reachable repositories for forced history rewrites. Removing the visible hook or one process does not rule out downloaded background stages or editor persistence; rebuild a confirmed infected environment before trusting it. Fork-token restrictions do not prevent code execution.
- title: Gate untrusted CI and prevent artifact publication
  hint: 'Require approval for all external contributors’ fork workflows, not only first-time contributors. Never run PR-head code with privileged pull_request_target secrets. Publish installers only from trusted branches/releases, reduce token permissions and re-review the latest push after a force-push. CircuitVerse PR #1591 proposes an upload gate comparing head.repo.full_name with github.repository, including deleted-fork safety; it remains open, not an already released fix. Keep VS Code Restricted Mode for unreviewed workspaces. Blocking npm lifecycle scripts alone does not stop build/dev/Jest/PostCSS or folder-open execution.'
sources:
- name: AsyncAPI maintainer incident index
  url: https://gist.github.com/derberg/0b4b21fb0a33148c3a13ef3211414b33
  primary: true
  says: Original incident overview, removed PRs, approval protection and bounded merged-PR scan; public gists created November 24.
- name: Maintainer static payload analysis
  url: https://gist.github.com/derberg/1d438e1c3f08d43e41b25bb77aa3f0eb
  primary: true
  says: Static decoding, hashes, triggers, Ethereum lookup and background stages; did not contact servers or establish downloaded-stage behavior.
- name: CircuitVerse maintainer confirmation
  url: https://github.com/CircuitVerse/cv-frontend-vue/issues/1586
  primary: true
  says: Maintainer confirms loader ran, no affected malicious merge, deletion of 40 artifacts and no reported repository-secret exposure.
- name: CircuitVerse proposed workflow hardening
  url: https://github.com/CircuitVerse/cv-frontend-vue/pull/1591
  primary: true
  says: 'Open PR: restrict artifact upload to trusted branches/releases and lower permissions; not merged at verification.'
- name: Open Food Facts incident and response
  url: https://github.com/openfoodfacts/openfoodfacts-explorer/issues/2267
  primary: true
  says: Four failed CI runs on malicious commits; whether the loader step was reached is unknown. Maintainer reports rotating the only potentially relevant secret.
- name: StepSecurity original PolinRider research
  url: https://www.stepsecurity.io/blog/polinrider-malware-open-source-pull-requests
  primary: true
  says: November 26 technical analysis, historical C2/complete indicators, link to fake-interview wallets and broader unverified repository measurements.
---

The November 24 maintainer disclosure covers an October 19 PR wave. The account Eternity0207 may itself have been compromised; unsigned commits and changed committer names do not establish who controlled it. This is distinct from July’s AsyncAPI npm-package compromise. The malicious commits reused legitimate messages/dates and hid long JavaScript lines after hundreds of tabs. A later clean final diff did not erase earlier local or CI execution.

AsyncAPI required fork-workflow approval, so no payload jobs ran there. CircuitVerse’s maintainer confirms the loader ran in desktop-build CI across its affected fork PRs, and that all 40 artifacts were deleted. Its proposed hardening remains open. The maintainer says the main branch and reviewed branches, including the account’s previously merged PR, are clean. The original scan found no payload in 145 merged PRs across the account’s 217 PRs; this is a bounded scan, not a guarantee about every past file version. The installer artifacts were built on exposed runners; no independently verified end-user infection count or binary-by-binary payload finding is available.

Open Food Facts ran CI on four malicious commits, but all four runs failed and the report could not establish whether pnpm build reached node api.js. Its maintainer rotated a potentially relevant secret that normally was not read. That precaution does not prove theft. Fork pull_request jobs’ read-only token and lack of repository secrets limited access, but did not make arbitrary build code safe. L4 reflects confirmed malicious execution in CircuitVerse CI, not a proven registry-wide or GitHub-platform compromise.

Static decoding shows an Ethereum transaction supplies two server addresses. The loader downloads code over plain HTTP on port 443 and starts detached Node processes that can outlive build/test completion. Subsequent stage behavior was not established by the maintainer’s static analysis; broader PolinRider victims’ credential theft and editor persistence reports should not be treated as observed outcomes for each of these three projects. StepSecurity associates the lookup wallet with HuntRole/AccuraSoftHire; a wallet relationship does not establish attribution to a named person or state. Its 576-repository/311-account measurement is an unverified research estimate, not an audited victim census.

The complete referenced records include all malicious commit SHAs and CI runs. Key SHA-256 hashes are:

| File | SHA-256 |
| --- | --- |
| api.js, AsyncAPI/CircuitVerse | `b02a81974810532fff8f76903e09b20431857bfaff00f2473421f4a4fb8162b5` |
| api.js, Open Food Facts variant | `41a69ba3946396d2d1c15f2e43be705f0793e8773dee0f3dda89a541d31c00d9` |
| CircuitVerse fake font | `3ae470cabb9412bf5f0e64e1f71b458e14eb10b19070845597d5b8230b27d552` |
| Malicious AsyncAPI package.json | `8d463b9511a97b3f73f00acdc2b5ea7ffea64546c93c6898fb70e97f4737b391` |

The original decoder also records XOR keys `q4FZkxX{!h,Sr3=@` and `y-p_>d$0B&@^1aQk` and obfuscated identifiers `y7`, `s8`, `rv$mIJCKYxZ`. Use these to correlate preserved files, not as a reason to execute a sample. Blocking one IP cannot contain a loader whose on-chain server changes. No universal fixed product version is supplied; response is execution- and workflow-specific.
