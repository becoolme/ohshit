---
title: "Lighter pauses withdrawals after a trader’s API key leaks"
level: 4
date: 2026-11-16
updated: 2026-11-17
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
  - date: Nov 16, 18:31 UTC
    title: Lighter resumes deposits and withdrawals
    body: Lighter’s official announcement says both returned to normal after its Security Council disabled Guardian mode.
  - date: Nov 16, 20:03 UTC
    title: Lighter stops returning transaction signatures
    body: The official API channel says Sig and L1Sig now return empty strings and directs integrators to track transactions by hash and status.
checklist:
  - title: Revoke suspected API credentials and pause affected trading automation
    hint: Use Lighter’s API key inventory to identify the affected key. Use Lighter’s ChangePubKey flow to replace the affected signing key at its existing index with L1 authorization. Verify the old key no longer works or contact support. Revoke affected read-only tokens separately and update your bots and secret stores.
  - title: Review account and integration activity
    hint: Preserve trade, order, transfer and withdrawal history and relevant bot logs. Check for unfamiliar activity and key changes, and report suspicious records to Lighter through its official channels.
  - title: Verify service recovery before retrying withdrawals
    hint: Check Lighter’s official updates for confirmation. Treat unsolicited recovery links and requests for private keys or seed phrases as phishing.
  - title: Update transaction tracking for empty signature fields
    hint: Treat Sig and L1Sig inside transaction info as empty strings. Check tx, txFromL1TxHash, txs, accountTxs, blockTxs, block, blocks and account WebSocket consumers. Identify transactions by hash and inspect status. Test reconciliation and retry handling before resuming automation.
sources:
  - name: Lighter deposit and withdrawal restoration announcement
    url: https://t.me/lighter_announcements/484
    says: Confirms deposits and withdrawals returned to normal after deactivation of Guardian mode.
    primary: true
  - name: Lighter initial notice
    url: https://publish.twitter.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FLighter_xyz%2Fstatus%2F2122284181422284986
    says: Confirms the withdrawal and pool creation pause while Lighter investigated.
    primary: true
  - name: Lighter investigation update
    url: https://publish.twitter.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FLighter_xyz%2Fstatus%2F2122311006604984497
    says: Identifies a trader API key leak, describes Guardian mode and states that the protocol and smart contracts were unaffected.
    primary: true
  - name: Lighter API key reference
    url: https://docs.lighter.xyz/api/api-keys
    says: Documents API key inspection and separate revocation for read-only tokens.
    primary: true
  - name: Lighter API key integration guide
    url: https://docs.lighter.xyz/developers/integration-guides/api-keys
    says: Explains key registration and which requests also require L1 authorization.
    primary: true
  - name: DeFi Prime report with links to Lighter’s notices
    url: https://defiprime.com/lighter-pauses-withdrawals-after-api-key-leak
    says: Reports the planned contract upgrade and the withdrawal reopening target.
  - name: Bitquery on-chain investigation
    url: https://www.bitquery.io/investigations/lighter-hack
    says: Traces the observed USDC withdrawal and later movements. The transfer is evidence of an observed amount.
    primary: true
  - name: Lighter transaction response update
    url: https://t.me/s/lighter_api_updates/202
    says: Confirms empty Sig and L1Sig fields and describes the affected responses and tracking guidance.
    primary: true
---

Lighter attributed the incident to a leaked API key for one trader’s account. The operator described its activation of Guardian mode on its smart contract as a precaution. The announcement did not explain how the key was exposed, how it was used, or how that access led to the withdrawal. Lighter said its protocol and smart contracts were unaffected. The operator planned a contract upgrade and aimed to reopen withdrawals on November 16. The subsequent official update confirms deposit and withdrawal recovery.

Lighter’s documentation says an API key alone can make a secure withdrawal back to the account’s originating L1 address. Fast withdrawals and transfers to another L1 owner also require L1 authorization. The operator’s explanation did not identify which path was used.

Bitquery traced an Ethereum withdrawal of about 10.39 million USDC to `0xb3fffca23d4444ee73349825acd84f7b5020e387` and a subsequent swap into ETH. Its report links to the transaction and downstream addresses. The observed withdrawal amount does not establish the aggregate loss. Lighter did not confirm reports of a second affected trader account or provide an aggregate loss figure in the cited updates.

At 18:31 UTC on November 16, Lighter said deposits and withdrawals had returned to normal after its Security Council disabled Guardian mode. Check your account and network before retrying. The restoration notice gives no aggregate recovered amount or pool-creation status.

Lighter’s API channel announced on November 16 that transaction responses now return empty strings in the `Sig` and `L1Sig` fields inside `info`. This applies to transaction and block endpoints and account WebSocket channels. Integrators should track transactions by `hash` and check their state with `status`, as directed by the official update.
