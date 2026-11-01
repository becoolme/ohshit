---
title: Troves confirms an xWBTC/WBTC vault exploit and pauses three vaults
level: 4
date: '2026-10-31'
tags:
- Troves
- Starknet
- DeFi
summary: Troves reports a preliminary loss of about 8.6 BTC from its xWBTC/WBTC vault on Starknet. It says legacy-contract and LST rebalancer permissions were revoked and three vaults paused. Other vaults show no identified impact so far; a final postmortem and recovery remain pending.
splash: Troves xWBTC/WBTC depositors on Starknet; xSTRK/STRK and xstrkBTC/strkBTC are also paused as a precaution
wipe: Avoid new deposits to paused vaults, preserve position records and follow verified Troves updates
inTheWild: 'yes'
inTheWildNote: Troves confirms an exploit and a preliminary loss, not just an unexplained transfer.
cves: []
fixed: []
ecosystems:
- crypto
timeline:
- date: Oct 31, 2026
  title: Troves confirms a vault exploit and an approximately 8.6 BTC preliminary loss
- date: Oct 31, 2026
  title: Operator reports permission revocation, three pauses and a recovery bounty
  body: The visible posts report roughly 40 minutes to revoke permissions and a 1 WBTC offer; the full bounty conditions are not visible in the embed.
checklist:
- title: Avoid new exposure to paused vaults
  hint: Check the established Troves channels for xWBTC/WBTC, xSTRK/STRK and xstrkBTC/strkBTC status. Pausing other vaults is precautionary, not proof they were drained. No verified safe reopening or depositor exit procedure is established here.
- title: Keep records and reject recovery impersonators
  hint: Preserve your vault address, share balance and transaction hashes. Do not send funds, seed phrases or new signatures to unsolicited recovery contacts. The 1 WBTC offer concerns recovering stolen assets; it is not a depositor claim fee or a confirmed refund.
- title: Review the published transaction and address ledger
  hint: 'Panda Security lists Starknet exploit transaction 0x0634307777205294f636d481808a7b9a9e208415a26dd19c8ada269b9332e330; sender 0x42dc2ebccae3e55ce3747d2974c801fb3e0facf8d7f4810012a0986a89da5e3; helper 0x13705ea5f9e591ff6ffe3926bf22fceb19317c049838de09750a60259d38c72; vault 0x2ea99b4971d3c277fa4a9b4beb7d4d7d169e683393a29eef263d5d57b4380a; WBTC token 0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac; and Ethereum recovery address 0x91926046e148c66869d71B9Fa37306e82DDc8934. These roles differ: the vault, token and recovery address are not attacker accounts. Compare retained transaction records; a match alone does not establish compromise or loss. Never send a recovery payment based on this list.'
- title: Remove permissions when retiring contracts
  hint: Protocol teams should enumerate live privileged roles during upgrades, revoke replaced contracts and verify the resulting permissions before restoring service. Panda Security describes an old rebalancer retaining access; its illustrative Solidity snippet is not the exploited Cairo code.
sources:
- name: Troves incident statement, official public embed
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Ftrovesfi%2Fstatus%2F2116541963755475375&omit_script=true
  primary: true
  says: Readable opening confirms October31 exploit, approximate loss and preliminary scope; later text is truncated.
- name: Troves containment update, official public embed
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Ftrovesfi%2Fstatus%2F2116579889986068900&omit_script=true
  primary: true
  says: Readable opening reports permission revocation and all three paused vaults; later text is truncated.
- name: Troves scope clarification, official public embed
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Ftrovesfi%2Fstatus%2F2116606204680249415&omit_script=true
  primary: true
  says: Complete clarification retains preliminary loss and promises verified updates and a postmortem.
- name: Troves recovery offer, official public embed
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Ftrovesfi%2Fstatus%2F2116545053191774295&omit_script=true
  primary: true
  says: Readable opening confirms a 1 WBTC recovery offer; full terms and recovery-wallet link are truncated.
- name: Panda Security original transaction analysis
  url: https://dev.to/pandasecurity/troves-exploit-a-retired-rebalancer-drained-857-wbtc-2009
  primary: true
  says: Researcher reports reading a Starknet receipt and transfer events, publishes six ledger entries and distinguishes observed transfers from the operator loss estimate.
---

Panda Security attributes the path to a retired rebalancer with surviving vault permissions. Its receipt analysis reports about 6.32 WBTC reaching the sender in the examined transaction; that is not a reconciliation of the approximately 8.6 BTC operator estimate. The researcher leaves the exact vulnerable function and legacy-rebalancer address unconfirmed. Vendor statements describe containment, not a completed audit or restitution.
