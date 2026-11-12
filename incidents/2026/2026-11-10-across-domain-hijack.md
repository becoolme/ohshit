---
title: Across domain takeover exposed visitors to a wallet drainer
summary: Across says a registrar social-engineering attack redirected its website to a wallet drainer. Bitquery estimates about $348,000 taken from nine wallets on five chains. Across regained control and pledged to cover affected users.
splash: Visitors who connected a wallet or signed an approval, message or transaction on the compromised Across frontend on November 10.
wipe: From a trusted wallet interface, revoke suspicious approvals on each affected chain and report transaction hashes to Across.
inTheWildNote: Across confirmed the takeover. Bitquery traced transfers during the phishing window.
level: 4
date: '2026-11-10'
tags:
- Across
- wallet drainer
- DNS
inTheWild: 'yes'
timeline:
- date: Nov 10, 22:13 UTC
  title: Across reports the registrar takeover
  body: Across dates the takeover to approximately 18:45 UTC. The team says Cloudflare pulled DNS records after the site was flagged.
- date: Nov 11, 01:16 UTC
  title: Across confirms restoration
  body: The team says it controls the domain again, promises compensation and plans a postmortem.
- date: Nov 11, 2026
  title: Bitquery verifies its tracing figures
  body: It attributes about $348,000 across nine wallets based on the timing and shared recipient split.
checklist:
- title: Check every connected wallet and chain
  hint: Open Revoke.cash directly and load the wallet used on Across. Select each network, search by the spenders below, and check direct approvals and Permit2 allowances. Revoke matching rows, confirm the on-chain transactions with the network’s gas token, then verify zero or removed allowances. Unused signed permits may be invisible. If you signed during the incident, Across recommends moving remaining assets to a fresh wallet after revoking visible approvals. Direct transfers are final.
- title: Preserve evidence and report through official channels
  hint: Save wallet addresses, timestamps, chain names and transaction hashes. Initiate contact through the verified Across account named in the notice. Keep recovery phrases and private keys private and ignore unsolicited recovery offers.
- title: Correlate tracing indicators
  hint: Bitquery’s address record lists 13 wallet addresses and two transaction hashes. The reported recipient pair is 0x2846e69d3298e99eddf2fd8116e952844da11fde and 0x0c7c656126aa62625fdd8051eb69dc14aee8d37b. The complete address and transaction record appears below. Check full addresses and event logs. A match alone does not establish compromise.
sources:
- name: Across initial notice, public copy
  says: Reproduces the official account’s registrar, containment and API/integration scope statement and links its follow-up approval guidance.
  url: https://teapawt.org/AcrossProtocol/status/2120278803318489362
  primary: true
- name: Across user action notice, public copy
  says: Names the approval checker, revocation guide and official reporting channel.
  url: https://teapawt.org/AcrossProtocol/status/2120278805084295328
  primary: true
- name: Across detailed wallet recovery guide
  says: Lists spender contracts, receiving addresses, Permit2 checks and how to verify revocation.
  url: https://docs.google.com/document/d/1IW3_cSr9fANfxHSXgVnzQ89Bitqv00Xbk-8bhx3L3kM/export?format=txt
  primary: true
- name: Across restoration notice, public copy
  says: Reproduces the team’s restoration and reimbursement commitment.
  url: https://teapawt.org/AcrossProtocol/status/2120324818385912082
  primary: true
- name: Bitquery original on-chain investigation
  says: Explains wallet attribution, valuation, fee-wallet distinction, and limitations.
  url: https://bitquery.io/investigations/across-protocol-domain-hijack
  primary: true
---

The official [initial notice](https://x.com/AcrossProtocol/status/2120278803318489362) says the registrar attack gave a third party control of the domain. Across says its API and third-party integration users were outside the affected scope, although the team temporarily took the frontend and API offline during containment. The [restoration notice](https://x.com/AcrossProtocol/status/2120324818385912082) pledges to make affected users whole. The [user action notice](https://teapawt.org/AcrossProtocol/status/2120278805084295328) explains how to revoke permissions and report affected wallets. The notices provide no completed compensation or final victim total.

Bitquery identified transfers between 19:02 and 21:53 UTC on Ethereum, Arbitrum, Base, BNB Chain and Optimism, with about $348,000 valued at transfer time. Its estimate uses a common 80/20 split and excludes transfers outside its data or method, including unpriced tokens in the dollar figure. A separate $294,000 figure matches the fee wallet balance, which includes older proceeds. Neither amount establishes the number of people affected or a compromise of the bridge contracts.

Bitquery’s reported addresses and transaction hashes, in report order. Addresses include downstream services and are evidence for correlation.

```text
0x2846e69d3298e99eddf2fd8116e952844da11fde
0x0c7c656126aa62625fdd8051eb69dc14aee8d37b
0x38d7e8b3c9561caf096c06c62c7561f8ab6e514c
0xa490cde73adcd40475025ee8710f3a5ab7393194
0xf10a482fbc02195f2dafca5d9dfd19c871b0f4a5
0x0f67a21780699bb5c5e6b5f986c0bab26bfffe5c
0x09360fe2e18fdfa49beb7592b9f24f94c5465533
0xf229f808fe21911f8bcc24ebb30a85bd2e4c00f0
G47n6dbUor1WFweLvKPrUi5beW4yjRoFG3cJZU6a4uSa
2K7fueB3tqYBb5Z2Ubnnpf2rF3sJr1fJDKXtsocTAWmk
5HQZd9ovzAF1TLnHRAq1zcSnXC9HAp3EwhoxMHvo8rxB
0xbca05d20dbb271fd607e69fdc8d955be3bfc8120
3EQ9Rqrtvco4nKmskv2jQRXvWKkpUGfAQs
0x2610f11fd3cde7113f83e7137853972ba98d8360b3d91eed6d5807f947a8bd38
0x19c5460db37f5cc2bde6f8f644892a5348a1519d2aa97f720091e982134a8ae1
```

Across’s wallet recovery guide lists the following spenders by network. The guide says these addresses can be reused on other chains. Check Permit2 allowances on Ink and both direct and Permit2 approvals on BNB Chain.

```text
Ethereum  0x46a2a474d4c22bf1ae4f8fa55da7a58673472be2
Ethereum  0xdbd7fbe5b7cd56f99c059dc24052009d2626125c
Base  0x5ff35703c22533398d5c7ce7acd32a04ac8462da
Arbitrum  0x2ff67cddd9ff45e0b47957d9d7c19b0732f9c514
Arbitrum  0x373c415ef034bb620e8d720afd2ace26bca13529
Ink  0xdcd65e3a8f3b73c7e2f40dbab1fb95dbef871d6c
Plasma  0x3ef438c34ce51a697a24247fe033c4562c94f0fd
BNB Chain  0x0c894c253c62eda066197011efd73b632dc96263

Receiving addresses listed by Across
0x2846e69d3298e99eddf2fd8116e952844da11fde
0x0c7c656126aa62625fdd8051eb69dc14aee8d37b
0x3ef438c34ce51a697a24247fe033c4562c94f0fd
0xa0e6c7d79b74d1a6d366dd11309b6faafda05ac5

Permit2 contract for context
0x000000000022d473030f116ddee9f6b43ac78ba3
```
