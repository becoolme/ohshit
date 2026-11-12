---
title: Across domain takeover exposed visitors to a wallet drainer
summary: Across says a registrar social-engineering attack redirected its website to a wallet drainer. Bitquery estimates about $348,000 taken from nine wallets on five chains. Across regained control and pledged to cover affected users.
splash: Visitors who signed malicious approvals or transactions on the compromised Across frontend on November 10.
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
- date: Nov 10, 2026
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
  hint: Use a trusted wallet interface or the approval checker named in Across’s official notice. Inspect recent permits, approvals and transfers on each network you used during the hijack. Revoke suspicious spending permissions promptly. Revocation does not reverse completed transfers.
- title: Preserve evidence and report through official channels
  hint: Save wallet addresses, timestamps, chain names and transaction hashes. Initiate contact through the verified Across account named in the notice. Keep recovery phrases and private keys private and ignore unsolicited recovery offers.
- title: Correlate tracing indicators
  hint: Bitquery’s address record lists 13 wallet addresses and two transaction hashes. The reported recipient pair is 0x2846e69d3298e99eddf2fd8116e952844da11fde and 0x0c7c656126aa62625fdd8051eb69dc14aee8d37b. Use the full record for chain-specific onward addresses. Check full addresses and event logs. A match alone does not establish compromise.
sources:
- name: Across initial notice, public copy
  says: Reproduces the official account’s registrar, containment and API/integration scope statement and links its follow-up approval guidance.
  url: https://teapawt.org/AcrossProtocol/status/2120278803318489362
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

The official [initial notice](https://x.com/AcrossProtocol/status/2120278803318489362) says the registrar attack gave a third party control of the domain. Across says its API and third-party integration users were outside the affected scope, although the team temporarily took the frontend and API offline during containment. The [restoration notice](https://x.com/AcrossProtocol/status/2120324818385912082) pledges to make affected users whole. The notices provide no completed compensation or final victim total.

Bitquery identified transfers between 19:02 and 21:53 UTC on Ethereum, Arbitrum, Base, BNB Chain and Optimism, with about $348,000 valued at transfer time. Its estimate uses a common 80/20 split and excludes transfers outside its data or method, including unpriced tokens in the dollar figure. A separate $294,000 figure matches the fee wallet balance, which includes older proceeds. Neither amount establishes the number of people affected or a compromise of the bridge contracts.
