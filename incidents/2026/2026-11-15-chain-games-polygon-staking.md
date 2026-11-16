---
title: "Chain Games disables Polygon delegation after 37.98 million CHAIN is drained"
level: 4
date: 2026-11-15
tags: [crypto, Polygon, staking]
summary: >-
  Chain Games says attackers used a reward-accounting flaw to withdraw 37,977,463 CHAIN from its Polygon delegation vault. The team disabled delegation across all validators and pledged to make affected participants whole.
splash: "Delegators and validators using the affected Chain Games Polygon staking system with transferable delegation tokens."
wipe: "Stop deposits and delegation. Reconcile positions against Polygon block 97338356 and wait for the verified fix and official recovery instructions."
inTheWild: yes
inTheWildNote: "The project confirmed unauthorized withdrawals and reproduced the reward flaw."
timeline:
  - date: Nov 15, 03:23 UTC
    title: Attackers inflate delegation balances and drain the staking vault
    body: Chain Games traces withdrawals between about 03:23 and 04:38 UTC to validator 13’s delegation pool.
  - date: Nov 15, 21:34 UTC
    title: Chain Games disables delegation across all 16 validators
    body: The team says restake calls now revert on the affected contracts and confirmed this by simulating the attack after the change.
  - date: Nov 15, 23:39 UTC
    title: Chain Games discloses the exploit and commits to compensating affected participants
    body: The project publishes the snapshot block and says staking will stay closed until a fixed contract is deployed and verified.
checklist:
  - title: Stop depositing or delegating to the affected Polygon staking contracts
    hint: Pause automated deposits and restaking. Wait for the project to announce and verify a replacement contract before submitting new transactions.
  - title: Reconcile your pre-exploit staking position
    hint: Save wallet addresses and transaction receipts. Compare staked amounts, pending unstakes and unclaimed rewards with Polygon block 97338356. Keep records of discrepancies for official support. The project says affected positions cannot be withdrawn until recovery. Avoid repeated withdrawal attempts.
  - title: Verify compensation and reopening instructions with Chain Games
    hint: Check the project’s official channels directly. Treat unsolicited reimbursement links as suspicious. Never disclose wallet recovery phrases or private keys.
sources:
  - name: Chain Games postmortem (public text export)
    url: https://docs.google.com/document/d/1Ov98lxPuy-I_5aZROVVvoY4mGhcu5MoFANSo7rdtOmM/export?format=txt
    says: Details the accounting flaw, staking-vault withdrawals, affected validators, containment, snapshot and planned fix.
    primary: true
  - name: Chain Games announcement (public copy)
    url: https://teapawt.org/RealChainGames/status/2122112343970808002
    says: Preserves the announcement time, scope, compensation commitment and link to the full postmortem.
    primary: true
---

The affected Polygon staking contracts used transferable delegation tokens. Chain Games traced the bug to the token transfer hook, which updated a legacy reward checkpoint while `restake()` read a different checkpoint. A fresh recipient could claim historical rewards it had never earned. Repeating transfers and restaking inflated delegation shares, which the attackers unbonded and redeemed for CHAIN from the staking vault.

Chain Games reports **37,977,463 CHAIN withdrawn**. In its accounting, the main attacker withdrew 36,007,148 CHAIN and sold that portion for 20,345 USDC. All exploit withdrawals came from validator 13’s delegation pool. The postmortem says the vault was left with about 59 CHAIN and legitimate delegators could not withdraw their positions. All 16 validators shared the affected code. The project says the Polygon PoS bridge and the CHAIN token contracts on Ethereum and Polygon were unaffected. It traced a separate 26,461,048 CHAIN bridge withdrawal on Ethereum to an arbitrage purchase and a matching Polygon burn. That transfer is separate from the staking-vault withdrawals. The Ethereum staking contract and a separate older Polygon staking contract that does not use transferable delegation tokens were also outside the affected system.

The team says it disabled delegation with `setDelegationEnabled(false)` and verified that the attack’s restake step reverted afterward. Its simulation showed that locking the StakeManager alone still allowed restaking to mint tokens. The planned fix will settle rewards for both sender and recipient before changing balances and use the same reward value and checkpoint for transfers, restaking and withdrawals. Chain Games says it will replay the attack on a Polygon fork before deploying the fix.

The project’s pre-attack snapshot at Polygon block **97338356** covers 78 delegators across 128 positions and the stakes of nine validators. It lists **38,338,653 CHAIN owed**, including stake, pending unstakes and unclaimed rewards. The project says it is tracing funds and preparing a compensation plan. The snapshot gives its accounting for amounts owed. Actual disbursements and the reopening date were unconfirmed in the cited notices.
