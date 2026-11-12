---
title: Arcus subaccount accounting bug enabled a 2,234,391 USDG withdrawal
summary: Arcus says a newly created account inflated its recorded balance through transfers between its own subaccounts. It withdrew 2,234,391 USDG. The bridge held another roughly $3 million in requests, which were reversed. Arcus covered the shortfall from its treasury.
splash: Arcus exchange accounting for transfers between subaccounts. Arcus reports one exploiting account and no affected user balances.
wipe: Verify account activity and the official recovery status. Exchanges should review transfers involving the address Arcus disclosed.
inTheWildNote: Arcus confirms the unauthorized withdrawal and says it deployed an accounting fix.
level: 4
date: '2026-11-10'
updated: '2026-11-12'
tags:
- DeFi
- Arcus
- accounting
inTheWild: 'yes'
timeline:
- date: Nov 10, 2026
  title: A new account exploits subaccount transfers
  body: Arcus dates the start to approximately 10:07 PM ET on November 9 (03:07 UTC on November 10).
- date: Nov 10, 04:07 UTC
  title: Arcus pauses withdrawals
  body: The bridge had already limited further payouts.
- date: Nov 10, 04:37 UTC
  title: Arcus deploys the fix
  body: The team subsequently blocks the exploiting addresses.
- date: Nov 10, 09:26 UTC
  title: Arcus reopens withdrawals
  body: At 10:02 UTC it reverses the blocked withdrawal requests.
- date: Nov 10, 2026
  title: Arcus discloses the incident and covers the shortfall
  body: Arcus reports using its own treasury and tracking the withdrawn funds.
- date: Nov 11, 01:24 UTC
  title: Ethereum multisig transaction relays a return offer
  body: The message proposes returning 90% and keeping 10%, with a deadline of November 13 at 01:00 UTC. The transaction documents an offer.
checklist:
- title: Review account activity through the official interface
  hint: Compare balances, positions, orders and withdrawals with your records. If anything differs, preserve the transaction identifiers and contact official Arcus support.
- title: Monitor the address disclosed by Arcus
  hint: Exchanges and service providers should review transfers linked to 0xeFbf442599310E5CeE1A4EDd5c66334c5f30b3Dd. Follow your incident process and corroborate a match before taking action.
- title: Verify any recovery claim through Arcus
  hint: Users should never send funds, sign transactions or share credentials in response to messages about this offer. Exchange teams should corroborate addresses and transfers with official Arcus information and current on-chain records before acting.
sources:
- name: Arcus Labs incident report
  says: Confirms the accounting path, withdrawn funds, blocked requests, service restoration, treasury coverage and initial address.
  url: https://arcus.xyz/blog/arcus-incident-report-november-9-2026
  primary: true
- name: Ethereum Safe transaction carrying the return offer
  url: https://eth.blockscout.com/tx/0x36626c180029341a89ead3420d8fa56abac8639759db184c78fbf89bd2e651f5
  primary: true
  says: The November 11 Safe transaction records message data addressed to the wallet disclosed by Arcus and two other addresses, including the proposed terms and deadline.
- name: blockintAI original Arcus tracing report
  url: https://blockint.ai/blog/arcus-perps-exploit-robinhood-chain-relay-dai-btc-trail
  primary: true
  says: Traces nine USDG withdrawals totaling 2,234,391 USDG and their subsequent cross-chain movement and identifies the Safe transaction carrying the offer.
---

Arcus attributes the incident to an accounting error in transfers between a user’s own subaccounts. It has not published the exact triggering conditions or a user-side patch. The 2,234,391 USDG was paid out. The other roughly $3 million was only requested. Treasury coverage made up the shortfall while the withdrawn funds were still being tracked. Arcus says trading and withdrawals are operating normally and that other users’ balances, positions and orders were unaffected.

**November 11 recovery offer.** A message claiming to be from the Arcus team appeared on Ethereum and was repeated in a successful Safe transaction at **01:24 UTC**. It offered the recipient the option to return **90%** of the withdrawn funds and keep **10%**, with a deadline of **November 13 at 01:00 UTC**. The transaction establishes that the message was relayed, and Arcus’s incident report remains the source for the amount paid out and treasury coverage. There is no confirmed return in the sources reviewed. The Safe call addressed the wallet Arcus disclosed and two additional addresses. Receipt of that message alone does not establish the addresses’ ownership. Arcus users should verify any recovery notice through the official interface.
