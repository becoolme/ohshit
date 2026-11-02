---
date: 2026-10-29
updated: 2026-11-02
title: zkLink reports emergency containment after Nova bridge exploit; researchers trace a second wave
level: 4
tags:
  - zkLink Nova
  - bridge
  - Ethereum
  - Optimism
ecosystems:
  - crypto
summary: zkLink reports suspended Nova block production and emergency-patched contracts. Parapet Labs traces a permissionless relay exploit and a second wave on Optimism, Base, Blast and Mantle. Its historical findings do not verify the vendor’s later patch or a safe restart; final losses remain unconfirmed.
splash: Users with assets in zkLink Nova bridge custody; the vendor names Arbitrator contracts on Ethereum and Optimism
wipe: Avoid adding exposure to the affected bridge while containment is unresolved; preserve transaction records and follow official updates
inTheWild: yes
inTheWildNote: zkLink explicitly acknowledges an ongoing exploit against its Arbitrator contracts.
cves: []
fixed: []
timeline:
  - date: Oct 28, 2026, 22:21:35 UTC
    title: Parapet traces the original Ethereum escrow drain
    body: The report estimates about $743,000 at exploit-time prices; it is not a final cross-chain total.
  - date: Oct 29, 2026, 07:16:11 UTC
    title: Researcher traces a second wave targeting four secondary chains
    body: Parapet reports about 24.76 ETH plus token inventories taken on Optimism, Base, Blast and Mantle through the same flaw.
  - date: Oct 29, 2026
    title: zkLink confirms ongoing exploitation and says containment is in progress
  - date: Oct 29, 2026
    title: SlowMist publishes its preliminary message-state analysis
  - date: Oct 29, 2026
    title: zkLink reports suspended block production and emergency contract patches
    body: The public original embed confirms these measures; the following withdrawal-related sentence is truncated. No safe restart or independently verified patch is established by the visible text.
checklist:
  - title: Avoid new exposure while containment is unresolved
    hint: The project reports suspended block production and emergency patches, but the readable notice does not verify patch effectiveness or a safe restart. As a precaution, avoid new deposits or transfers through the affected Nova bridge until official status and contract scope are clarified. Do not assume a working interface or successful deposit means reserves are safe.
  - title: Preserve custody and transaction evidence
    hint: Record your deposit transaction hashes, source chain, asset, amount and destination wallet. SlowMist’s visible original post identifies Arbitrator.claimMessage and transient finalizeMessageHash as the suspected fault; it does not provide a complete readable address/hash list in the embed. Do not use inferred attacker addresses as a complete detection list or test the flaw against live contracts. A match alone is not proof of compromise.
  - title: Verify recovery notices before signing
    hint: Use the project’s established official website and verified announcement channels to check containment and any recovery instructions. The notice read does not establish a refund process or completed reimbursement; reject unsolicited claim pages and never share seed phrases. Do not infer that funds on every named chain were stolen.
  - title: Review the full research ledger and test containment
    hint: Parapet’s Impact, Key contracts, Second wave and References sections contain more than ten addresses and transaction hashes, with attacker, receiver, helper and legitimate bridge roles separated. Use that full ledger, not a partial denylist; an address match alone is not proof of compromise. For bridge operators, pin the canonical message service per gateway, consume transient validation state per claim and test withdrawal pause coverage on a fork. These are researcher recommendations, not confirmation that zkLink deployed that exact patch.
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
  - name: zkLink emergency-measures follow-up, public original embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FzkLink_Official%2Fstatus%2F2115792847098216545&omit_script=true
    primary: true
    says: Visible text confirms suspended Nova block production and emergency-patched affected contracts; the withdrawal-related continuation is truncated.
  - name: Parapet Labs zkLink Nova original post-mortem
    url: https://parapetlabs.net/blog/zklink-nova-exploit-post-mortem/
    primary: true
    says: Replays the exploit on a fork, traces the original drain and four-chain second wave, and provides full address/transaction references. Its unpatched-status assessment is explicitly as of October29 around 10:00 UTC.
---

The vendor acknowledgment establishes a real exploit, supporting L4. SlowMist attributes the failure to Arbitrator.claimMessage retaining transient message state without a fresh authenticated callback. That is a research assessment, not a published vendor post-mortem. Parapet Labs now supplies a readable original technical report: a publicly callable whitelisted relayer, a privileged call to a caller-selected target and reusable transient validation state combined to allow forged withdrawal roots without privileged access.

SlowMist estimates about $783,100. This is an early researcher estimate, unverified outside that investigation, not a final vendor-confirmed loss, a current reserve balance or a reimbursement figure. The official notice names Ethereum and Optimism but does not quantify loss separately on either chain.

Parapet estimates about $743,000 for the original Ethereum drain at exploit-time prices, then reports a separate second wave taking about 24.76 ETH plus token inventories on Optimism, Base, Blast and Mantle. Do not add these unlike units to SlowMist’s earlier estimate or call any one figure the final total. Parapet assesses Linea’s different executor as outside this specific vector; its historical balance and exposure table is not a current reserve audit.

The vendor’s October 29 follow-up reports suspended Nova block production and emergency-patched affected contracts. Its visible public embed cuts off during the withdrawal-related measure, so the complete withdrawal scope and later conditions are not established here. Parapet’s assessment that contracts remained unpatched is dated around 10:00 UTC that day; it does not test the vendor’s subsequent patch claim. Neither a safe reopening time nor recovery payments are verified. The precaution against adding bridge exposure is editorial containment advice derived from the vendor’s ongoing-exploit warning, not a claim that the project has ordered a specific withdrawal procedure.
