---
date: 2026-10-29
title: zkLink confirms an ongoing exploit against Nova Arbitrator contracts on Ethereum and Optimism
level: 4
tags:
  - zkLink Nova
  - bridge
  - Ethereum
  - Optimism
ecosystems:
  - crypto
summary: zkLink confirms an exploit targeting Nova Arbitrator contracts on Ethereum and Optimism. SlowMist reports bridge withdrawals and points to message-state handling. The vendor has not provided a final loss total or verified fix in the notice read.
splash: Users with assets in zkLink Nova bridge custody; the vendor names Arbitrator contracts on Ethereum and Optimism
wipe: Avoid adding exposure to the affected bridge while containment is unresolved; preserve transaction records and follow official updates
inTheWild: yes
inTheWildNote: zkLink explicitly acknowledges an ongoing exploit against its Arbitrator contracts.
cves: []
fixed: []
timeline:
  - date: Oct 29, 2026
    title: zkLink confirms ongoing exploitation and says containment is in progress
  - date: Oct 29, 2026
    title: SlowMist publishes its preliminary message-state analysis
checklist:
  - title: Avoid new exposure while containment is unresolved
    hint: The project’s notice says engineers are containing an ongoing exploit; it does not certify a completed fix or safe restart. As a precaution, avoid new deposits or transfers through the affected Nova bridge until official status and contract scope are clarified. Do not assume a working interface or successful deposit means reserves are safe.
  - title: Preserve custody and transaction evidence
    hint: Record your deposit transaction hashes, source chain, asset, amount and destination wallet. SlowMist’s visible original post identifies Arbitrator.claimMessage and transient finalizeMessageHash as the suspected fault; it does not provide a complete readable address/hash list in the embed. Do not use inferred attacker addresses as a complete detection list or test the flaw against live contracts. A match alone is not proof of compromise.
  - title: Verify recovery notices before signing
    hint: Use the project’s established official website and verified announcement channels to check containment and any recovery instructions. The notice read does not establish a refund process or completed reimbursement; reject unsolicited claim pages and never share seed phrases. Do not infer that funds on every named chain were stolen.
sources:
  - name: zkLink official exploit acknowledgment
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FzkLink_Official%2Fstatus%2F2115731883313254565&omit_script=true
    primary: true
    says: The visible text names ongoing exploitation of Nova Arbitrator contracts on Ethereum and Optimism and says containment is underway; the remainder is truncated.
  - name: SlowMist original analysis
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FSlowMist_Team%2Fstatus%2F2115635114638250409&omit_script=true
    primary: true
    says: The visible research post estimates about $783,100 and identifies uncleared transient message state in claimMessage; the longer technical continuation is truncated.
  - name: SlowMist Hacked event index
    url: https://hacked.slowmist.io/
    says: Discovery index for this same event; not independent confirmation of the original SlowMist analysis.
---

The vendor acknowledgment establishes a real exploit, supporting L4 even while the full technical report is unavailable. SlowMist attributes the failure to Arbitrator.claimMessage retaining transient message state without a fresh authenticated callback. That is a research assessment, not a published vendor post-mortem.

SlowMist estimates about $783,100. This is an early researcher estimate, unverified outside that investigation, not a final vendor-confirmed loss, a current reserve balance or a reimbursement figure. The official notice names Ethereum and Optimism but does not quantify loss separately on either chain.

The available primary text does not establish a completed patch, a paused bridge, recovery payments or a safe reopening time. The precaution against adding bridge exposure is editorial containment advice derived from the vendor’s ongoing-exploit warning, not a claim that the project has ordered a specific withdrawal procedure.
