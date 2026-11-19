---
title: Gonka Ethereum bridge exploit drains reserves and mints unbacked WGNK
date: 2026-11-18
level: 4
tags:
  - DeFi
  - Ethereum
  - Gonka
  - Bridge
summary: Blockaid reports a Gonka bridge key rotation, reserve drain and unbacked WGNK minting, estimating about $1.05M realized. TraceFast separately counts about $884,800 in stablecoin withdrawals and 22M WGNK minted. Final cause, loss and recovery remain unverified.
splash: Users of Gonka’s Ethereum bridge, its stablecoin reserves and WGNK backing
wipe: Avoid new bridge exposure pending verified remediation; retain transaction records and follow official incident updates.
inTheWild: yes
inTheWildNote: Blockaid reports an ongoing exploit; TraceFast independently describes withdrawals.
timeline:
  - date: Nov 18, 18:01 UTC
    title: TraceFast reports stablecoin withdrawals
    body: Its original report lists 884,150.87 USDT and 647.74 USDC withdrawn, followed by 22M WGNK minted at 18:02 UTC.
  - date: Nov 18, 2026
    title: Blockaid reports a bridge exploit
    body: It estimates about $1.05M realized across roughly five transactions and describes the activity as ongoing at alert time.
checklist:
  - title: Pause new bridge exposure while status is unresolved
    hint: Treat this as precautionary guidance. Obtain a verified project remediation notice before bridging or relying on WGNK backing; a changed group key alone does not prove a safe recovery.
  - title: Keep transaction and balance evidence
    hint: TraceFast names 0x6650a1cb0c3b970a0e4ced26984fe06db7844d80. Preserve relevant transactions, but an address match alone does not establish ownership or compromise. Its original linked reference is retained in the source post.
  - title: Verify loss and recovery claims separately
    hint: Track official Gonka updates. Stablecoin outflows, unbacked token issuance and realized proceeds are different quantities; do not add the two research estimates together or infer reimbursement.
sources:
  - name: Blockaid original Gonka alert
    url: https://x.com/blockaid_/status/2123121171390415065
    primary: true
    says: Full readable public embed reports a rotated epoch BLS group key, depleted reserves, unbacked minting and a preliminary realized-value estimate.
  - name: TraceFast original transaction findings
    url: https://x.com/tracefast_xyz/status/2123122333300977732
    primary: true
    says: Full readable public embed gives the address, UTC withdrawals/minting and observed amounts; not a final project loss statement.
---

Blockaid attributes the drain to a replacement epoch BLS group key, but does not establish how the replacement was authorized. TraceFast reports stablecoin outflows and token minting; those observations alone do not prove a stolen signing key or a specific software bug.

The approximately $1.05M realized-value estimate and approximately $884,800 stablecoin count have different scopes; no verified reconciliation or final project accounting is available here. The reports concern the Ethereum bridge, not proof that every Gonka node or Ethereum consensus was compromised. Reported active reserve theft supports L4. Containment and restored backing remain unverified.
