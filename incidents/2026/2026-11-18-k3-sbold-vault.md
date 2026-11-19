---
title: K3 Capital pauses sBOLD after a multimillion-dollar vault drain
date: 2026-11-18
level: 4
tags:
  - DeFi
  - Ethereum
  - sBOLD
summary: K3 Capital paused its sBOLD vault after malicious activity. Blockaid estimated about $3.43M drained; Bitquery later counted 97 transactions and about $3.42M. Liquity says V2 itself is unaffected. The attack-path accounts differ.
splash: Depositors in K3 Capital’s independent Ethereum sBOLD vault; Liquity V2 is separately scoped
wipe: Do not deposit into sBOLD; retain position records and await K3’s verified remediation and recovery instructions.
inTheWild: yes
inTheWildNote: K3 confirms malicious activity and a pause; researchers report the vault drain.
timeline:
  - date: Nov 18, 2026
    title: K3 pauses contracts; Liquity warns against deposits
    body: The project investigates malicious activity. Liquity distinguishes the independently operated vault from V2.
  - date: Nov 18, 16:14 UTC
    title: Bitquery records its investigation snapshot
    body: Its analysis counts 97 drain transactions and about $3.42M; these are research estimates, not a final project accounting.
checklist:
  - title: Stop new sBOLD deposits
    hint: Liquity explicitly says not to deposit until further notice. K3 reports a pause, without a reopening or recovery announcement.
  - title: Retain evidence and verify recovery instructions
    hint: Keep wallet, transaction and position records. Follow K3’s official channels; a pause does not establish recovered funds or compensation.
  - title: Use the complete research record when investigating
    hint: Bitquery’s record lists 24 addresses and one transaction hash, including the vault, drain contracts, bots and legitimate pool/router addresses. Use the full linked record; a match alone does not prove compromise or common ownership.
sources:
  - name: K3 Capital original notice
    url: https://x.com/k3_capital/status/2123040539578970305
    primary: true
    says: Readable public embed confirms malicious activity investigation and paused contracts.
  - name: Liquity original scope and deposit warning
    url: https://x.com/LiquityProtocol/status/2123053380893573433
    primary: true
    says: Readable full public embed says sBOLD is independently operated and V2 is not affected.
  - name: Bitquery original transaction investigation
    url: https://bitquery.io/investigations/k3-capital-sbold-hack
    primary: true
    says: Counts 97 transactions, about $3.42M and no trove liquidations; deployed-code version was not checked.
  - name: Blockaid original preliminary alert
    url: https://x.com/blockaid_/status/2123036162847613184
    primary: true
    says: Readable excerpt describes self-liquidation and about $3.43M; long-post embed truncates the remaining text.
---

K3 confirms malicious activity and paused contracts. Liquity says the independent sBOLD vault is affected, not Liquity V2. Confirmed exploitation and deposit exposure support L4.

Bitquery estimates about $3.42M across 97 transactions; Blockaid’s preliminary alert estimated about $3.43M. These are attributed estimates, not K3’s final loss total. Blockaid describes self-liquidation; Bitquery found no trove liquidations and instead describes direct WETH transfers exploiting share valuation. Bitquery did not check the deployed code version, so its audit comparison does not prove an old fix was absent. A project postmortem and final recovery accounting remain outstanding.
