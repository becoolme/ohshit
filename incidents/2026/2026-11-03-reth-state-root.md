---
title: Reth trie bug can omit new state entries; upstream and Base fixes are available
level: 3
date: 2026-11-03
tags: [Reth, Ethereum, integrity]
summary: Reth's trie iterator could skip a newly inserted leaf and compute an incorrect incremental state root. Upstream 2.10.0 and Base 1.5.3 include the fix; Celo and Mantle merged scoped backports. Full affected ranges and other downstream release coverage need verification. The fix records establish no exploitation or fund loss.
splash: Nodes and applications using an affected Reth trie implementation; exposure depends on the actual fork and pinned revision.
wipe: Upgrade to a chain-compatible build containing Reth fix 8572c88; verify downstream pins and validate node state after restarting.
inTheWild: unknown
inTheWildNote: No exploitation or fund loss is established in the reviewed original fix records.
cves: []
fixed:
  - product: Upstream Reth
    version: 2.10.0
    status: Contains the trie fix; use a build compatible with the operated chain
  - product: Base Mainnet and Sepolia node release
    version: 1.5.3
    status: Base recommends upgrading; release notes explicitly link the state-root fix
timeline:
  - date: Nov 3, 21:00 UTC
    title: Upstream merges the iterator-boundary fix
    body: PR 28264 merges as 8572c88 and includes an incremental-root regression test.
  - date: Nov 5, 2026
    title: Celo and Mantle merge scoped backports
    body: Celo updates its celo/reth-v1.0 fork pin; Mantle backports onto its production mantle-v1.6.2 line. Other branches require separate verification.
  - date: Nov 5, 2026
    title: Reth 2.10.0 and Base 1.5.3 include the fix
    body: Upstream lists the trie seek-boundary correction. Base recommends its new build for Mainnet and Sepolia and explicitly links the same fix.
checklist:
  - title: Identify the client and the actual Reth revision
    hint: Inventory the running binary or container, chain, fork, image digest and dependency lockfile. Look for upstream merge 8572c88fe04fb2213d86f020ed9e72e612abb097 or the vendor's equivalent backport. A version from another fork is not a reliable threshold; the complete affected range is not established here.
  - title: Install the matching released fix and restart the node
    hint: Use official upstream Reth 2.10.0 or the Base 1.5.3 release as appropriate. Base's release covers Mainnet and Sepolia and gives no deadline. Verify published artifacts and signatures before replacing the binary or image, then confirm the running version after restart. Reth publishes signing fingerprint 50FB 7CC5 5B2E 8AFA 59FE 03B7 AA5E D56A 7FBF 253E.
  - title: Confirm Celo, Mantle and OP Stack backport coverage
    hint: Celo PR 369 moves celo/reth-v1.0 to reth pin 74cc8bbce7631c3586ab446460590fef6630d258; it says main needs a separate cherry-pick. Mantle PR 237 targets production mantle-v1.6.2 and identifies dev/mantle-v1.6.3 and dev/mantle-v1.7.0 for follow-up. Ask each vendor for a released build carrying its patch. The reviewed op-reth 2.8.1 notes describe an eth_capabilities fix and do not establish trie-fix inclusion; verify the pinned source rather than assuming that release resolves this issue.
  - title: Check node integrity before relying on its responses
    hint: Preserve mismatch logs, affected block numbers and build identifiers. As a defensive validation step, compare synchronization and affected state roots against an independently trusted, patched provider; investigate persistent mismatches through the chain's official recovery procedure. The reviewed fix records do not prescribe a universal database deletion or resync procedure. Protocol and RPC operators should verify their own providers' build coverage before relying on state data.
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
    says: Describes an eth_capabilities correction; these notes alone do not verify the separate trie fix.
---

The iterator combines stored trie branches with newly hashed state entries. Its previous shortcut could skip a seek when the stored branch was deeper than the seek prefix, leaving a newly inserted leaf out of the incremental root. The patch permits that shortcut only when the keys are equal. The upstream regression test and Celo's backport explanation describe this concrete correctness failure.

Reth 2.10.0 lists PR 28264, and Base 1.5.3 explicitly says it prevents a state-root mismatch through that same patch. Celo and Mantle published narrower backports tied to their own dependency pins. A merged backport does not establish that every deployed node or every branch already runs it. Full vulnerable-version ranges and downstream packaged-release thresholds remain incomplete.

L3 reflects an integrity bug in a widely used execution-client family and an actionable operator update. These original records do not establish an attacker stealing assets, remote code execution, a chain-wide compromise or confirmed user losses. Claims about paused bridges or incorrect proof responses require their own original evidence and are not used to expand the verified scope here.
