---
title: "Lighter pauses withdrawals after a trader’s API key leaks"
level: 4
date: 2026-11-16
tags: [crypto, credential-theft, dex]
summary: >-
  Lighter suspended withdrawals and new pool creation and attributed the incident to an API key leaked from one trader’s account. Bitquery traced a withdrawal of about 10.39 million USDC. The exchange has not confirmed an aggregate loss.
splash: "The trader account identified by Lighter and all users affected by the temporary withdrawal and pool creation pause."
wipe: "Revoke suspected API keys, audit account activity and verify withdrawal availability through official Lighter channels."
inTheWild: yes
inTheWildNote: "Lighter attributed the incident to a leaked API key for one trader’s account."
timeline:
  - date: Nov 16, 2026
    title: A wallet withdraws about 10.39 million USDC on Ethereum
    body: Bitquery traced the withdrawal and the subsequent swap into ETH.
  - date: Nov 16, 2026
    title: Lighter suspends withdrawals and new pool creation
    body: The exchange says its investigation points to a compromised external party.
  - date: Nov 16, 2026
    title: Lighter identifies a leaked API key and enables Guardian mode
    body: The operator attributed the incident to one trader’s account and said the protocol and smart contracts were unaffected.
checklist:
  - title: Revoke suspected API credentials and pause affected trading automation
    hint: Use the official account interface or contact Lighter support to invalidate the affected key. Remove it from bots and secret stores, then issue a replacement through a trusted workflow.
  - title: Review account and integration activity
    hint: Preserve trade, order, transfer and withdrawal history and relevant bot logs. Check for unfamiliar activity and key changes, and report suspicious records to Lighter through its official channels.
  - title: Verify service recovery before retrying withdrawals
    hint: Check Lighter’s official updates for confirmation. Treat unsolicited recovery links and requests for private keys or seed phrases as phishing.
sources:
  - name: Lighter initial notice
    url: https://x.com/Lighter_xyz/status/2122284181422284986
    says: Confirms the withdrawal and pool creation pause while Lighter investigated.
    primary: true
  - name: Lighter investigation update
    url: https://x.com/Lighter_xyz/status/2122311006604984497
    says: Identifies a trader API key leak, describes Guardian mode and states that the protocol and smart contracts were unaffected.
    primary: true
  - name: Bitquery on-chain investigation
    url: https://www.bitquery.io/investigations/lighter-hack
    says: Traces the observed USDC withdrawal and later movements. The transfer is evidence of an observed amount.
    primary: true
---

Lighter attributed the incident to a leaked API key for one trader’s account. The operator described its activation of Guardian mode on its smart contract as a precaution. The announcement did not explain how the key was exposed, how it was used, or how that access led to the withdrawal. Lighter said its protocol and smart contracts were unaffected.

Bitquery traced an Ethereum withdrawal of about 10.39 million USDC and a subsequent swap into ETH. The observed withdrawal amount does not establish the aggregate loss. Lighter did not confirm reports of a second affected trader account or provide an aggregate loss figure in the cited updates.
