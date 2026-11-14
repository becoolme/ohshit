---
title: Pool Party reports roughly $215,000 lost from 15 pools on Arbitrum and Base
date: 2026-11-13
level: 4
tags: [DeFi, Smart contract, Arbitrum, Base]
summary: Pool Party says an attacker manipulated recorded positions in pool snapshot contracts and drained 12 Arbitrum pools and three Base pools. The team estimates losses of $215,000 and says it deployed a fix on the four chains named in its announcement.
splash: Liquidity providers in the affected Pool Party pools on Arbitrum and Base.
wipe: Verify your positions and transaction history through official Pool Party channels. Keep the records for the team’s forthcoming response plan.
inTheWild: 'yes'
inTheWildNote: The Pool Party team reports that an attacker exploited the snapshot contract and withdrew funds from 15 pools.
timeline:
  - date: Nov 13, 01:34–03:38 UTC
    title: Attacker drains 15 pools
    body: The team reports unauthorized withdrawals from 12 pools on Arbitrum and three on Base.
  - date: Nov 13, 18:13:22 UTC
    title: An on-chain message signed Pool Party offers a bounty
    body: The message on Arbitrum offers 10% and asks the recipient to return the remaining amount, about $193,500, within 24 hours.
  - date: Nov 13, 18:23 UTC
    title: Pool Party discloses the incident
    body: The initial post estimates losses at $215,000. Follow-up posts in the same thread describe the snapshot flaw and report a fix on Arbitrum, Base, Polygon and Robinhood Chain.
checklist:
  - title: Record any affected positions
    hint: Check your pool addresses, chain and balances against your own on-chain history. Save deposit and withdrawal transaction hashes and share them through independently verified Pool Party support if requested.
  - title: Verify official recovery instructions
    hint: The team said it would publish a postmortem and a plan for affected users. Verify future instructions through the project’s known channels before connecting a wallet or signing anything. Keep seed phrases private.
  - title: Verify the reported fix before adding funds
    hint: Confirm the network and pool with the team’s official channels. The announcement identifies the networks with a fix but gives no replacement contract addresses or verification transactions.
sources:
  - name: Pool Party incident thread
    url: https://x.com/PoolParty_xyz/status/2121307902430359906
    says: Original team statement on the attack, loss estimate, response and announced fix. Direct access returned HTTP 403.
  - name: Public archive of the Pool Party team's thread
    url: https://teapaw.org/PoolParty_xyz/status/2121307902430359906
    primary: true
    says: Readable copy of the original statement and the team’s follow-up posts.
  - name: Arbitrum transaction carrying the bounty offer
    url: https://arbiscan.io/tx/0x991c1766f529d44de7700e06b7e219cd07612faae76b1c64eedfc6dcf195f950
    primary: true
    says: Records the send time, recipient and return offer signed Pool Party team.
---

Pool Party says a flaw in the snapshot contract that records user positions let an attacker alter their recorded position. The team describes a 10 USDC deposit followed by withdrawal of the pool’s funds. It reports no losses on Polygon or Robinhood Chain and says the snapshot fix is live on all four chains. The statement provides no deployment transactions or independent verification.

The team identified `0x2075c17abbd077cf6406736bb7047ed446ab7f8f` as the attacker address and says it traced the funds to a conversion to XMR and reported the incident to law enforcement and exchanges. An address match alone does not establish ownership or compromise. The announced loss is an estimate. The team has yet to disclose completed recovery or compensation.

An Arbitrum transaction carries an offer signed by the Pool Party team. It asks the recipient to return about $193,500 within 24 hours and offers to let them retain 10%. The transaction records the offer. Recovery remains unverified.
