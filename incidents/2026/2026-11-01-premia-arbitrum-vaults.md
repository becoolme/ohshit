---
title: Blockaid reports an ongoing Premia vault exploit on Arbitrum
level: 4
date: 2026-11-01
tags: [Premia, Arbitrum, DeFi]
ecosystems: [crypto]
summary: Blockaid reports an active Premia exploit on Arbitrum, with about $400,500 drained across roughly two transactions at the time of its alert. It describes empty option pools, flash loans and option purchases that lock vault collateral before its withdrawal as liquidity. No final loss total or verified fix is established.
splash: Premia vaults and their depositors on Arbitrum; the precise set of affected vaults is not identified in the readable alert
wipe: Avoid new exposure to Premia vaults on Arbitrum until verified containment; preserve transaction records and check official updates
inTheWild: yes
inTheWildNote: Blockaid reports actual vault drains and describes the exploit as ongoing at its alert.
cves: []
fixed: []
timeline:
  - date: Nov 1, 2026
    title: Blockaid reports an ongoing Arbitrum vault exploit
    body: Approximately $400,500 across about two transactions is a preliminary researcher estimate, not a reconciled final loss.
checklist:
  - title: Pause new exposure to the affected deployment
    hint: Check Premia's established official channels for affected vaults and containment before depositing or opening new positions on Arbitrum. The readable alert does not identify a safe vault list or a deployed fix; other chains are not established as affected.
  - title: Preserve your own vault records
    hint: Keep transaction hashes, vault addresses and position records for official support. Do not sign recovery transactions from unsolicited messages or disclose seed phrases. The alert does not establish that every depositor lost funds or that user private keys were stolen.
sources:
  - name: Blockaid original Premia alert
    url: https://x.com/blockaid_/status/2116745378674463229
    primary: true
    says: Public embed contains the Arbitrum exploit description, approximate amount and transaction count; later content is truncated.
  - name: Official public embed of Blockaid's alert
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fblockaid_%2Fstatus%2F2116745378674463229&omit_script=true
    primary: true
---

Blockaid attributes the withdrawals to an exploit of the vault and options flow, rather than reporting an unexplained transfer alone. The alert's snapshot supports L4 for active exploitation. It does not establish a final root cause, total affected deposits, attacker identity, completed containment or compensation. The precautions above are general exposure-reduction guidance; no vendor-approved exit procedure was verified.
