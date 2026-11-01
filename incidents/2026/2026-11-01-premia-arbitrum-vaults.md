---
title: Blockaid reports an ongoing Premia vault exploit on Arbitrum
level: 4
date: 2026-11-01
updated: 2026-11-01
tags: [Premia, Arbitrum, DeFi]
ecosystems: [crypto]
summary: Blockaid reports an active Premia exploit on Arbitrum, with about $400,500 drained across roughly two transactions at the time of its alert. It describes empty option pools, flash loans and option purchases that lock vault collateral before its withdrawal as liquidity. No final loss total or verified fix is established.
splash: Premia v3 on Arbitrum; a later researcher report identifies six WBTC, WETH and ARB call/put vaults
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
  - date: Nov 1, 2026
    title: Researchers report six vaults and two successful drain transactions
    body: PandaSecurity reports directly reading Arbitrum receipts; this expands the earlier three-vault sample without establishing a vendor-confirmed final scope or fix.
checklist:
  - title: Pause new exposure to the affected deployment
    hint: Check Premia's established official channels for affected vaults and containment before depositing or opening new positions on Arbitrum. The readable alert does not identify a safe vault list or a deployed fix; other chains are not established as affected.
  - title: Preserve your own vault records
    hint: Keep transaction hashes, vault addresses and position records for official support. Do not sign recovery transactions from unsolicited messages or disclose seed phrases. The alert does not establish that every depositor lost funds or that user private keys were stolen.
  - title: Compare your vault history with the published indicators
    hint: "On Arbitrum, Blockaid labels exploiter wallet 0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd and contract 0x577168C8c6fA937495C3D6961f1d7D734b2d785f. Its sample transaction is 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac. The three victim vaults linked are 0x45dF5EA836A15B561937Ae8373ab9eE984aea531, 0xbae43c546DFADC69576aE73C68e0694A54F08e1B and 0xD46993F25D298ebbCD31E941156C66f7e628A52a. Inspect your transactions and positions through your established explorer; a match alone does not prove compromise or loss, and absence from this partial victim list does not establish safety."
  - title: Check the expanded research ledger
    hint: "PandaSecurity lists 11 addresses and transaction hashes: sender 0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd; attack contract 0x577168C8c6fA937495C3D6961f1d7D734b2d785f; setup 0xe3c263fcae544954367998e48e13112875cfd38a3b9a240e7818bb96313831f5; drains 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac and 0xd7e8086df0570c5389ca27eb9bcdff290e810c094155b410a42e5bad2b3244ff; WBTC/WETH/ARB call vaults 0x45dF5EA836A15B561937Ae8373ab9eE984aea531, 0xbae43c546DFADC69576aE73C68e0694A54F08e1B and 0xDC631d88dbB5eb39f5c4Bf8B4e5298d098912fFf; corresponding put vaults 0x6A1FC0E1c60BA6564CDe4910A425F1F1a1d18C1F, 0xD46993F25D298ebbCD31E941156C66f7e628A52a and 0xBe3E229319f86f5ee96ee1dc0b6d55e8b68a439e. Compare your positions and retained receipts; a match alone does not prove compromise or loss. These are researcher-labelled roles, not an attacker-ownership finding for every address or a complete safety list."
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
  - name: PandaSecurity original Premia research
    url: https://dev.to/pandasecurity/premia-exploit-empty-option-pools-drained-six-vaults-32ai
    primary: true
    says: Reports public-node receipt observations for two drains and six vaults; distinguishes those observations from relayed valuations and unconfirmed root-cause analysis.
---

Blockaid attributes the withdrawals to an exploit of the vault and options flow, rather than reporting an unexplained transfer alone. The alert's snapshot supports L4 for active exploitation. It does not establish a final root cause, total affected deposits, attacker identity, completed containment or compensation. The precautions above are general exposure-reduction guidance; no vendor-approved exit procedure was verified.

**November 1 address update:** Blockaid’s next post links two exploiter addresses, one example transaction and three victim vaults. All six linked indicators are reproduced above. These vaults are examples, not a verified complete scope or a list of safe contracts. The explorer address pages returned access errors after normal redirects; the labels come from Blockaid, not an independent on-chain assessment. The earlier approximate $400,500 snapshot is retained; differing media valuations are not a reconciled final total.

**November 1 research update:** PandaSecurity reports six affected call/put vaults, with setup at 03:14:37 UTC followed by successful drains at 03:15:39 and 03:15:40 UTC. Its receipt analysis counts net outflows of 3.644104 WBTC, 43.472546 WETH, 46,215.428616 ARB and 48,479.36 USDC.e. These are researcher observations, not a vendor reconciliation. The report relays differing valuations of about $437,000 and $464,600; those are not amounts to add to Blockaid’s earlier estimate. Exact root cause, final scope and remediation remain unconfirmed.
