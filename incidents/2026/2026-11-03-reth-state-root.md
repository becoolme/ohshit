---
title: Reth trie bug can omit new state entries; upstream and downstream fixes are available
level: 3
date: 2026-11-03
updated: 2026-11-06
tags: [Reth, Ethereum, integrity]
summary: Reth's trie iterator could skip a new leaf and compute an incorrect incremental state root. Upstream 2.10.0, Base 1.5.3, op-reth 2.8.1 and Morph 1.4.1 contain the fix; Celo, Mantle, BNB and Gravity merged scoped backports. Full ranges and other downstream releases need verification; no exploitation or fund loss is established.
splash: Nodes and applications using an affected Reth trie implementation; exposure depends on the actual fork and pinned revision.
wipe: Upgrade to a chain-compatible build containing Reth fix 8572c88; verify downstream pins and validate node state after restarting.
inTheWild: unknown
inTheWildNote: No exploitation or fund loss is established in the reviewed original fix records.
cves: []
fixed:
  - product: Upstream Reth
    version: 2.10.0
    status: Contains the trie fix; use a build compatible with the operated chain
  - product: OP Stack op-reth
    version: 2.8.1
    status: Tagged lockfile contains op-v2.6.0-2 backport; release notes mention only a separate RPC fix
  - product: Base Mainnet and Sepolia node release
    version: 1.5.3
    status: Base recommends upgrading; release notes explicitly link the state-root fix
  - product: Morph morph-reth
    version: 1.4.1
    status: Released hotfix; pins morph-l2/reth v2.5.2-morph.1 with the upstream-equivalent fix
timeline:
  - date: Nov 3, 21:00 UTC
    title: Upstream merges the iterator-boundary fix
    body: PR 28264 merges as 8572c88 and includes an incremental-root regression test.
  - date: Nov 5, 2026
    title: Celo and Mantle merge scoped backports
    body: Celo updates its celo/reth-v1.0 fork pin; Mantle backports onto its production mantle-v1.6.2 line. Other branches require separate verification.
  - date: Nov 5, 2026
    title: Reth 2.10.0, op-reth 2.8.1 and Base 1.5.3 contain the fix
    body: Upstream lists the trie correction; the op-reth release tag pins its backport despite RPC-only release notes. Base recommends its new build for Mainnet and Sepolia and links the same fix.
  - date: Nov 6, 02:19 UTC
    title: BNB Reth merges its main-line backport
    body: PR 254 merges as 3b2bd020; it backports the same upstream iterator correction and regression test.
  - date: Nov 6, 02:40 UTC
    title: BNB Reth merges a separate v2.8 integration backport
    body: PR 255 merges as 141cc278 into fix/bsc-static-file-td-611. This establishes a branch-specific patch, not a released safe-version threshold.
  - date: Nov 6, 2026
    title: Morph releases morph-reth 1.4.1
    body: The hotfix pins the corrected fork and adds a regression test. All Morph nodes, including followers, should upgrade; no database migration or resync is required.
  - date: Nov 6, 2026
    title: Gravity merges a source backport
    body: PR 464 merges as c407bd9 into main. This is a verified source patch, not a released safe-version threshold.
checklist:
  - title: Identify the client and the actual Reth revision
    hint: Inventory the running binary or container, chain, fork, image digest and dependency lockfile. Look for upstream merge 8572c88fe04fb2213d86f020ed9e72e612abb097 or the vendor's equivalent backport. A version from another fork is not a reliable threshold; the complete affected range is not established here.
  - title: Install the matching released fix and restart the node
    hint: Use official upstream Reth 2.10.0 or the Base 1.5.3 release as appropriate. Upstream rates the release high priority for builders and non-builders; Base covers Mainnet and Sepolia and gives no deadline. OP Stack operators can use op-reth 2.8.1, whose tagged lockfile includes the backport. Verify published artifacts and signatures before replacing the binary or image, then confirm the running version after restart. Reth publishes signing fingerprint 50FB 7CC5 5B2E 8AFA 59FE 03B7 AA5E D56A 7FBF 253E.
  - title: Confirm Celo, Mantle and OP Stack backport coverage
    hint: Celo PR 369 moves celo/reth-v1.0 to reth pin 74cc8bbce7631c3586ab446460590fef6630d258; it says main needs a separate cherry-pick. Mantle PR 237 targets production mantle-v1.6.2 and identifies dev/mantle-v1.6.3 and dev/mantle-v1.7.0 for follow-up. Ask each vendor for a released build carrying its patch. For op-reth 2.8.1, rust/Cargo.lock pins reth-trie to op-v2.6.0-2 / 3c5f2f11c4e5a5647e6e911cd131ccf1bada4f25, the upstream-equivalent backport. PR 23924 and the release tag confirm inclusion even though its notes mention only eth_capabilities. Verify the running artifact, not just the release-note wording.
  - title: Check node integrity before relying on its responses
    hint: Preserve mismatch logs, affected block numbers and build identifiers. As a defensive validation step, compare synchronization and affected state roots against an independently trusted, patched provider; investigate persistent mismatches through the chain's official recovery procedure. The reviewed fix records do not prescribe a universal database deletion or resync procedure. Protocol and RPC operators should verify their own providers' build coverage before relying on state data.
  - title: Verify both BNB Reth patch lines before selecting a build
    hint: BNB Reth PR 254 merged into main as 3b2bd02006ef8970c862d2af5dbc98a92f58d57d; PR 255 merged into fix/bsc-static-file-td-611 as 141cc278068cb60d1045957709ad88d7bfdbed1f. Match your actual branch to the appropriate equivalent patch and ask BNB Chain for its released artifact. These PRs alone establish neither a fixed release number nor that all BNB validators or users were exposed.
  - title: Roll out the Morph 1.4.1 hotfix across every node
    hint: Use the official v1.4.1 binaries or ghcr.io/morph-l2/morph-reth:v1.4.1, followers included. The release retains the database format, flags, RPC and chain configuration; perform a rolling restart, with no migration or resync. Rollback means restoring the prior binary. Source builders must allow or mirror morph-l2/reth tag v2.5.2-morph.1, replacing the upstream source. The PR recommends testing a Hoodi follower with --engine.state-root-fallback and a layer1-mode validator before rollout. No matching morph-geth release is required.
  - title: Verify Gravity source coverage separately from release availability
    hint: Gravity PR 464 merged c407bd9 into main, backporting upstream 8572c88 and its regression test. Match the actual deployed revision and obtain the supported artifact from Gravity; do not infer a packaged fixed version or fleet-wide deployment from the source merge alone.
sources:
  - name: Reth original fix PR
    url: https://github.com/paradigmxyz/reth/pull/28264
    primary: true
    says: Public November3 iterator-boundary correction and regression test; merged as 8572c88.
  - name: Reth fix PR API
    url: https://api.github.com/repos/paradigmxyz/reth/pulls/28264
    primary: true
    says: Records public creation and November3 21:00:09 UTC merge time.
  - name: Reth 2.10.0 release
    url: https://github.com/paradigmxyz/reth/releases/tag/v2.10.0
    primary: true
    says: November5 release lists the trie seek-boundary fix and publishes artifact-signing information.
  - name: Base 1.5.3 release
    url: https://github.com/base/base/releases/tag/v1.5.3
    primary: true
    says: Explicitly links Reth PR28264, recommends upgrading Base Mainnet and Sepolia, and names no deadline.
  - name: Celo original backport PR API
    url: https://api.github.com/repos/celo-org/celo-kona/pulls/369
    primary: true
    says: Explains omitted-leaf mechanism, fork pin, regression checks and the separate main-branch follow-up; HTML retrieval returned a shell.
  - name: Mantle original backport PR
    url: https://github.com/mantle-xyz/reth/pull/237
    primary: true
    says: Documents the affected pinned revision and production-line backport; development branches need separate work.
  - name: OP Stack op-reth 2.8.1 release notes
    url: https://github.com/ethereum-optimism/optimism/releases/tag/op-reth%2Fv2.8.1
    primary: true
    says: Describes an eth_capabilities correction; trie-fix inclusion is independently established by the tagged lockfile and original backport records.
  - name: OP Stack dependency backport PR API
    url: https://api.github.com/repos/ethereum-optimism/optimism/pulls/23924
    primary: true
    says: Merged November5 as 7220729, the op-reth2.8.1 release commit; pins fork tag op-v2.6.0-2.
  - name: OP Reth original trie backport API
    url: https://api.github.com/repos/ethereum-optimism/reth/pulls/32
    primary: true
    says: Backports upstream8572c88 as 3c5f2f11, with only a test-import adjustment.
  - name: op-reth 2.8.1 tagged dependency lockfile
    url: https://raw.githubusercontent.com/ethereum-optimism/optimism/op-reth/v2.8.1/rust/Cargo.lock
    primary: true
    says: The published tag pins reth-trie to op-v2.6.0-2 and commit3c5f2f11c4e5a5647e6e911cd131ccf1bada4f25.
  - name: BNB Reth main backport PR API
    url: https://api.github.com/repos/bnb-chain/reth/pulls/254
    primary: true
    says: November 6 02:19:15 UTC merge 3b2bd020 into main; same upstream correction and regression test.
  - name: BNB Reth v2.8 integration backport API
    url: https://api.github.com/repos/bnb-chain/reth/pulls/255
    primary: true
    says: November 6 02:40:58 UTC merge 141cc278 into fix/bsc-static-file-td-611; separate branch integration, not a packaged release.
  - name: Morph morph-reth 1.4.1 release
    url: https://github.com/morph-l2/morph-reth/releases/tag/v1.4.1
    primary: true
    says: Released trie hotfix, corrected fork pin, all-node upgrade, artifacts and rolling-restart guidance.
  - name: Morph original hotfix PR 228
    url: https://github.com/morph-l2/morph-reth/pull/228
    primary: true
    says: Explains exact pinned fork, serial-path exposure, regression test and pre-rollout validation.
  - name: Gravity original backport PR 464
    url: https://github.com/Galxe/gravity-reth/pull/464
    primary: true
    says: Merged upstream-equivalent correction as c407bd9 into main on November 6; no packaged safe version established.
---

The iterator combines stored trie branches with newly hashed state entries. Its previous shortcut could skip a seek when the stored branch was deeper than the seek prefix, leaving a newly inserted leaf out of the incremental root. The patch permits that shortcut only when the keys are equal. The upstream regression test and Celo's backport explanation describe this concrete correctness failure.

Reth 2.10.0 lists PR 28264, and Base 1.5.3 explicitly says it prevents a state-root mismatch through that same patch. Celo and Mantle published narrower backports tied to their own dependency pins. A merged backport does not establish that every deployed node or every branch already runs it. The op-reth 2.8.1 tag also contains the backport: its release commit merges PR 23924 and rust/Cargo.lock pins the corrected fork revision. Its release notes only mention an unrelated RPC correction, so those notes alone would miss this fix. Full vulnerable-version ranges and other downstream packaged-release thresholds remain incomplete.

L3 reflects an integrity bug in a widely used execution-client family and an actionable operator update. These original records do not establish an attacker stealing assets, remote code execution, a chain-wide compromise or confirmed user losses. Claims about paused bridges or incorrect proof responses require their own original evidence and are not used to expand the verified scope here.

**November 6 BNB backports:** BNB Reth merged the upstream-equivalent correction on main and separately on its v2.8 integration branch. Verify the actual fork/commit in the deployed artifact; a merged source patch is not evidence of a released build or fleet-wide deployment. These technical records do not establish a chain-wide incident, confirmed user loss or the extent of BNB Chain exposure.

**November 6 Morph and Gravity follow-up:** Morph’s released morph-reth 1.4.1 hotfix uses upstream Reth 2.5.2 plus the trie fix through morph-l2/reth v2.5.2-morph.1, avoiding an immediate full upstream upgrade. Its release requires upgrading every node, including followers, without a database migration or resync. Gravity separately merged its equivalent correction on main; no fixed Gravity release number was established. These records expand patch coverage, not evidence of theft or a chain-wide compromise.
