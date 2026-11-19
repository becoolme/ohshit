---
title: Reental RNT Lend drained after privileged contract upgrades
date: 2026-11-18
level: 4
tags:
  - DeFi
  - Polygon
  - RNT Lend
summary: Blockaid reports malicious upgrades to RNT Lend’s stablecoin markets. Bitquery estimates $954,703 removed, including funds outside the initial pool drain, and says property tokens were clawed back. Who controlled the admin key remains unproven.
splash: Reental RNT Lend stablecoin lenders and affected managed wallets/Safes on Polygon
wipe: Avoid new RNT Lend deposits or repayments pending verified remediation; retain records and contact Reental.
inTheWild: yes
inTheWildNote: Blockaid reports an exploit; Bitquery traces admin upgrades and fund removal.
timeline:
  - date: Nov 18, 2026
    title: Blockaid reports malicious aToken upgrades
    body: The early roughly $454K estimate covers only part of the activity.
  - date: Nov 18, 16:17 UTC
    title: Bitquery snapshots the expanded drain
    body: Its attributed estimate is $954,703 in stablecoins; returned property tokens are separate from stablecoin recovery.
checklist:
  - title: Avoid sending more funds into affected markets
    hint: Bitquery found the pool unpaused and repayments exposed at its November 18 snapshot. Confirm a verified Reental fix before new deposits or repayments.
  - title: Preserve records and obtain project instructions
    hint: Keep transaction and position records; ask Reental about claims and withdrawal access. Returned property tokens do not establish stablecoin reimbursement.
  - title: Consult the full evidence list
    hint: Bitquery’s record has 16 addresses and five transaction hashes covering the pool, markets, admin, bots, Safes and bridges. Use the full linked list; a match alone proves neither compromise nor shared ownership.
sources:
  - name: Blockaid original alert
    url: https://x.com/blockaid_/status/2123033403553689899
    primary: true
    says: Full public embed reports an admin upgrade enabling unrestricted aToken withdrawals and an early roughly $454K drain.
  - name: Bitquery original investigation
    url: https://bitquery.io/investigations/reental-rnt-lend-drain
    primary: true
    says: Expands scope, separates clawed-back property tokens and gives snapshot, attribution and ownership limitations.
---

Privileged upgrades made RNT Lend’s USDT0/USDC markets drainable, according to Blockaid and Bitquery. Bitquery attributes $454,825 to two bots and about $499,877 to the keyholder; rounded subtotals need not sum exactly. Its $49.34M property-token valuation uses pool prices, and those tokens were clawed back—not an additional permanent loss.

Bitquery cannot establish whether the key was stolen or used by an insider. Its November 18 snapshot is not a current restoration guarantee. Confirmed malicious upgrades and fund removal support L4; a project postmortem and final accounting remain outstanding.

The expanded $954,703 total remains unverified by a second source or Reental; treat it as Bitquery’s estimate.
