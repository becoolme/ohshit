---
title: Blockaid reports an ongoing Premia vault exploit on Arbitrum
level: 4
date: 2026-11-01
updated: 2026-11-01
tags: [Premia, Arbitrum, DeFi]
ecosystems: [crypto]
summary: Blockaid reports an active Premia exploit on Arbitrum, with about $400,500 drained across roughly two transactions at the time of its alert. It describes empty option pools, flash loans and option purchases that lock vault collateral before its withdrawal as liquidity. No final loss total or verified fix is established.
splash: Premia vaults and their depositors on Arbitrum; Blockaid names three victim vaults without establishing the complete affected set
wipe: Avoid new exposure to Premia vaults on Arbitrum until verified containment; preserve transaction records and check official updates
inTheWild: yes
inTheWildNote: Blockaid reports actual vault drains and describes the exploit as ongoing at its alert.
cves: []
fixed: []
timeline:
  - date: Nov 1, 2026
    title: Blockaid reports an ongoing Arbitrum vault exploit
    body: Approximately $400,500 across about two transactions is a preliminary researcher estimate, not a reconciled final loss.
  - date: Nov 1, 2026
    title: Blockaid publishes exploiter addresses and three victim-vault links
    body: The follow-up adds a sample transaction, not a final loss figure or a verified fix.
checklist:
  - title: Pause new exposure to the affected deployment
    hint: Check Premia's established official channels for affected vaults and containment before depositing or opening new positions on Arbitrum. The readable alert does not identify a safe vault list or a deployed fix; other chains are not established as affected.
  - title: Preserve your own vault records
    hint: Keep transaction hashes, vault addresses and position records for official support. Do not sign recovery transactions from unsolicited messages or disclose seed phrases. The alert does not establish that every depositor lost funds or that user private keys were stolen.
  - title: Compare your vault history with the published indicators
    hint: "On Arbitrum, Blockaid labels exploiter wallet 0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd and contract 0x577168C8c6fA937495C3D6961f1d7D734b2d785f. Its sample transaction is 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac. The three victim vaults linked are 0x45dF5EA836A15B561937Ae8373ab9eE984aea531, 0xbae43c546DFADC69576aE73C68e0694A54F08e1B and 0xD46993F25D298ebbCD31E941156C66f7e628A52a. Inspect your transactions and positions through your established explorer; a match alone does not prove compromise or loss, and absence from this partial victim list does not establish safety."
sources:
  - name: Blockaid original Premia alert
    url: https://x.com/blockaid_/status/2116745378674463229
    primary: true
    says: Public embed contains the Arbitrum exploit description, approximate amount and transaction count; later content is truncated.
  - name: Official public embed of Blockaid's alert
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fblockaid_%2Fstatus%2F2116745378674463229&omit_script=true
    primary: true
  - name: Blockaid original address follow-up, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fblockaid_%2Fstatus%2F2116745382231515416&omit_script=true
    primary: true
    says: Complete post labels two exploiter addresses, an example transaction and three victim vaults; ordinary link redirects expose the Arbiscan targets.
---

Blockaid attributes the withdrawals to an exploit of the vault and options flow, rather than reporting an unexplained transfer alone. The alert's snapshot supports L4 for active exploitation. It does not establish a final root cause, total affected deposits, attacker identity, completed containment or compensation. The precautions above are general exposure-reduction guidance; no vendor-approved exit procedure was verified.

**November 1 address update:** Blockaid’s next post links two exploiter addresses, one example transaction and three victim vaults. All six linked indicators are reproduced above. These vaults are examples, not a verified complete scope or a list of safe contracts. The explorer address pages returned access errors after normal redirects; the labels come from Blockaid, not an independent on-chain assessment. The earlier approximate $400,500 snapshot is retained; differing media valuations are not a reconciled final total.
