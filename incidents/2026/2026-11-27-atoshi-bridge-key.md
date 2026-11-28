---
title: ATOSHI confirms bridge-key compromise and theft of 201.05 million ATOS
level: 4
date: 2026-11-27
tags: [ATOSHI, bridge, key-compromise]
summary: ATOSHI confirms an attacker used a compromised bridge private key to transfer and sell about 201.05 million ERC-20 ATOS. The team preliminarily attributes the key loss to Telegram phishing of a developer and advises users to stop trading and bridging while it investigates.
splash: ATOSHI's Ethereum-side bridge router and associated internal wallet; ATOS traders and bridge users should follow the stop-use notice.
wipe: Stop ATOS buying, selling, trading and bridging until official clearance; verify recovery instructions through established official channels.
inTheWild: yes
inTheWildNote: ATOSHI confirms unauthorized bridge access, token transfers and subsequent sales.
timeline:
  - date: Nov 27, 2026
    title: Bridge key is used to transfer and sell ATOS
    body: ATOSHI says an attacker reached its Ethereum-side router after a bridge private key was compromised. Its preliminary explanation is a Telegram phishing link opened by a developer.
  - date: Nov 27, 19:34 UTC
    title: ATOSHI publishes its security notice
    body: The official channel reports roughly 201.05 million ERC-20 ATOS transferred and sold, asks users to stop ATOS transactions, and says investigation and remediation assessment are priorities.
checklist:
  - title: Pause ATOS transactions
    hint: Follow the official notice to stop buying, selling, trading and bridging ATOS until ATOSHI issues further instructions. Do not test whether the affected bridge still works by sending funds. The notice does not confirm a safe replacement router or completed containment.
  - title: Verify every update through the official channel
    hint: Open the established ATOSHI official Telegram channel and compare any recovery instruction with its public security notice. Avoid unsolicited links, recovery agents and requests for wallet secrets. The announced phishing route is preliminary; it is not evidence that every Telegram message or user wallet was compromised.
  - title: Preserve evidence and separate token movements from losses
    hint: Retain your transaction hashes, chain, asset, amount, destination and any suspicious messages for official support. About 201.05 million refers to ERC-20 ATOS units transferred and sold, not dollars or a victim count. The notice publishes no malicious address, URL, hash or other attacker-specific indicator; an unrelated transfer or lack of a match cannot establish compromise or safety.
  - title: Wait for verified remediation and recovery details
    hint: Monitor official updates for key revocation or rotation, restored bridge authorization, a safe resumption notice and any recovery terms. The team lists securing infrastructure, investigating scope and evaluating remedies as priorities, not completed outcomes. No reimbursement, recovered amount or final loss total is confirmed in this notice.
sources:
  - name: ATOSHI official security announcement
    url: https://t.me/s/atoshichannel/724
    primary: true
    says: Original November 27 statement from the verified project channel; confirms the bridge-key incident and ATOS transfers/sales, gives a preliminary phishing explanation, and requests a pause in ATOS transactions. The public message timestamp specifies UTC.
---

ATOSHI reports a compromise involving an internal wallet associated with its mainnet bridge. According to the team's preliminary findings, a developer opened a phishing link shared through Telegram, exposing a bridge private key. The attacker then accessed the Ethereum-side router, transferred roughly 201.05 million ERC-20 ATOS and sold them. The team also reports a substantial token-price decline, without quantifying it in the notice.

This is a confirmed bridge-infrastructure incident, rated L4 for actual unauthorized asset transfers. It does not establish that every holder's personal wallet, the entire mainnet or unrelated services were compromised. The disclosed token quantity must not be presented as a dollar loss. Media estimates of sale proceeds and price declines are not a verified final loss or compensation figure here.

The announcement calls for users to avoid all ATOS trading and bridge transactions pending further official updates. It lists containment, scope investigation and evaluation of recovery measures as immediate priorities. It does not say that the compromised key has been revoked, that the bridge is safe to resume, or that funds have been recovered. The technical root cause and full impact remain under investigation; there is no published user-side software fix in this notice.
