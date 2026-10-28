---
title: bitcoinjs-lib patches six fee-accounting, block-validation and parsing flaws
level: 3
date: 2026-10-26
updated: 2026-10-28
tags:
  - Bitcoin
  - JavaScript
  - PSBT
summary: Six advisories cover understated miner fees, invalid block checks and parsing denial of service. Upgrade to 5.2.3 / 6.1.10 / 7.0.5 for the full batch. Loss requires downstream reliance and, for excess fees, a valid transaction broadcast and accepted by the network; real-world exploitation is unconfirmed.
splash: Apps accepting untrusted PSBTs, transactions or blocks and relying on bitcoinjs-lib fee, parsing or validation APIs
wipe: Upgrade to 5.2.3 / 6.1.10 / 7.0.5, verify resolved parser dependencies and independently validate inputs
inTheWild: unknown
inTheWildNote: Advisories demonstrate defects but do not establish real-world exploitation.
cves:
  - id: CVE-2026-107846
    name: Undetected Merkle duplication
    description: Forged transaction lists can pass block-root checks.
  - id: GHSA-88jr-9qj4-ccm4
    name: Transaction parsing denial of service
    description: Repeated integer reads copy whole buffers in affected v7 dependency trees.
  - id: GHSA-8247-5gp7-95qh
    name: Block parsing denial of service
    description: The v7 Uint8Array parser repeatedly copies remaining block data.
  - id: GHSA-4mfv-5394-26c7
    name: Conflicting PSBT UTXO records
    description: Signing and fee accounting can resolve inconsistent input values.
  - id: GHSA-h52v-8xwg-7j95
    name: Missing finalized PSBT input values
    description: Missing UTXO records can count as zero and understate fees.
  - id: GHSA-4vm8-79jj-j6w4
    name: Invalid proof-of-work targets
    description: Header checks can accept invalid compact targets; application impact depends on reliance.
fixed:
  - product: bitcoinjs-lib 5
    branch: "5"
    version: 5.2.3
    status: Covers all six advisories
  - product: bitcoinjs-lib 6
    branch: "6"
    version: 6.1.10
    status: Covers all six advisories
  - product: bitcoinjs-lib 7
    branch: "7"
    version: 7.0.5
    status: Covers all six advisories
  - product: Affected versions below 5
    version: none
    status: Upgrade to a patched line; no in-line backport
timeline:
  - date: Oct 26, 2026
    title: Six security advisories published
    body: Different defects have different fix thresholds; use the complete-batch versions above.
  - date: Oct 28, 2026
    title: Review verifies CVE-2026-107846 on the Merkle advisory
checklist:
  - title: Update every resolved copy and rebuild consumers
    hint: Use npm ls bitcoinjs-lib and the lockfile. The fee fixes alone are 5.2.2 / 6.1.9 / 7.0.4; those remain affected by the proof-of-work-target flaw. Use 5.2.3 / 6.1.10 / 7.0.5 for the whole batch.
  - title: Independently validate PSBT input amounts
    hint: Verify prevouts for every input, reject disagreeing witnessUtxo/nonWitnessUtxo records, and require amounts even on finalized inputs. Check the actual miner fee before broadcast; do not disable maximumFeeRate as a workaround.
  - title: Treat block helpers as partial validation
    hint: Reject mutated Merkle trees and invalid compact targets; enforce the network proof-of-work limit and chain-specific difficulty separately. A true checkProofOfWork result is not complete consensus validation.
  - title: Bound and isolate untrusted parsing
    hint: Limit input sizes and use separate parsing workers. On v7 verify nested uint8array-tools >=0.0.10, varuint-bitcoin >=2.0.1 and bip174 >=3.0.1; dependency updates alone do not fix the independent block-suffix copy.
sources:
  - name: bitcoinjs-lib — Undetected Merkle duplication
    url: https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-8vv3-6qpc-gpw6
    primary: true
    says: CVE-2026-107846, Merkle-duplication PoC and fixes 5.2.1 / 6.1.8 / 7.0.2.
  - name: bitcoinjs-lib — Transaction parsing denial of service
    url: https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-88jr-9qj4-ccm4
    primary: true
    says: v7 parser exposure and 7.0.3 fix; no valid mined block required.
  - name: bitcoinjs-lib — Block parsing denial of service
    url: https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-8247-5gp7-95qh
    primary: true
    says: v7 parser exposure and 7.0.3 fix; no valid mined block required.
  - name: bitcoinjs-lib — Conflicting PSBT UTXO records
    url: https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-4mfv-5394-26c7
    primary: true
    says: PSBT prerequisites, no automatic coin theft, fixed in 5.2.2 / 6.1.9 / 7.0.4.
  - name: bitcoinjs-lib — Missing finalized PSBT input values
    url: https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-h52v-8xwg-7j95
    primary: true
    says: PSBT prerequisites, no automatic coin theft, fixed in 5.2.2 / 6.1.9 / 7.0.4.
  - name: bitcoinjs-lib — Invalid proof-of-work targets
    url: https://github.com/bitcoinjs/bitcoinjs-lib/security/advisories/GHSA-4vm8-79jj-j6w4
    primary: true
    says: Adds the final batch thresholds 5.2.3 / 6.1.10 / 7.0.5; no backports below v5.
---

The fee defects affect applications trusting imported, updated or combined PSBT metadata. Excess value becomes a miner fee, not automatically a payment to the PSBT author, and the defects cannot manufacture signatures. Missing-amount handling also affects already finalized inputs.

The missing-value flaw begins in v5.1.0, conflicting-record handling in v5.2.0, Merkle validation in v2.3.0 and proof-of-work checking in v2.2.0; v6 and v7 release candidates are included where the advisories specify them. Both copying defects affect v7 through 7.0.2; untrusted parsing can stall the synchronous event loop before validation.

These library bugs do not establish a Bitcoin Core consensus compromise or a confirmed loss. L3 reflects public reproductions and downstream financial/availability risks. This is distinct from the [Electrum malicious-server incident](/incidents/electrum-fee-bump/).

**Update, October 28:** Review verified that the Merkle-duplication advisory GHSA-8vv3-6qpc-gpw6 now lists CVE-2026-107846. These identify the same flaw; the batch still contains six vulnerabilities. The review date does not establish when the identifier was assigned.
