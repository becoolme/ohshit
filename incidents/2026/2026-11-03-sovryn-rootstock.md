---
title: Sovryn reports Rootstock lending and AMM attacks; withdrawals remain paused
level: 4
date: '2026-11-03'
tags:
- Sovryn
- Rootstock
- DeFi
ecosystems:
- crypto
summary: Sovryn confirms lending/margin outflows of 604,575.19 XUSD and 4.02792509 WRBTC, plus a separate AMM payout of 541,455.998472 XUSD. Blocked escrow and treasury-held assets are not recovered attacker funds. Do not interact with contracts, including alternate interfaces; withdrawals remain paused and final losses are unreconciled.
splash: Sovryn lending, borrowing, margin and XUSD/WRBTC AMM users on Rootstock; technical prerequisites remain unpublished
wipe: Avoid Sovryn contract interactions; preserve position records and await verified security, accounting and recovery instructions
inTheWild: 'yes'
inTheWildNote: Sovryn confirms attacker payouts and pauses; final user losses remain unreconciled.
cves: []
fixed: []
timeline:
- date: Oct 31, 08:34 UTC
  title: First identified lending/margin attack transaction
  body: The report records additional transactions at 15:50–15:53 UTC; final user losses remain unreconciled.
- date: Oct 31, 19:52 UTC
  title: Team learns of the first incident
  body: Core paused at 20:10 UTC, lending pools at 20:17–20:19; at 21:39 UTC two accounts were blocked, preserving seven delayed withdrawals.
- date: Nov 1, 18:42 UTC
  title: Separate XUSD/WRBTC AMM incident
  body: The observed payout is separate from the first incident; the report does not establish a common operator.
- date: Nov 1, 20:42:39 UTC
  title: Emergency fee changes completed
  body: At 22:06–22:07 UTC, already controlled RBTC/ZUSD moved to Exchequer custody, not recovery from the attacker.
- date: Nov 2, 14:32 UTC
  title: Affected AMM pool delisted
- date: Nov 3, 2026
  title: Project publishes its incident and recovery report
  body: Protective work and independent review continue; no distribution formula or reopening date is announced.
checklist:
- title: Stop using affected Sovryn contracts
  hint: Follow the project’s do-not-use guidance for lending, borrowing, margin and associated contracts, even through alternative interfaces. Lending-pool withdrawals remain paused; do not attempt a workaround based only on a functioning UI. No verified customer patch or safe exit procedure is published.
- title: Preserve position records and verify recovery announcements
  hint: 'General preservation guidance: retain loan, collateral, lending-pool/LP balances and transaction IDs. Reach Sovryn Discord through established project links; official updates are in #announcements and questions in #general. No reopening date, distribution formula or final per-user losses are announced. Reject unsolicited DMs, seed requests and refund/migration approvals.'
- title: Compare the four published tracing addresses with retained transactions
  hint: The report lists Rootstock first-incident addresses 0x740a2ecba7c291473d88ed8ae7a310c3c32d8d4a and 0x643234de31619ded5496ba30d0b6b97791e959fd; Rootstock/Ethereum second-incident address 0x101d1dc6e2164d6091ace64701e301f4535665ba; Bitcoin second-incident payout bc1qtzt5vy5qssteyn2ky7u472754a8jgtx9cxzs9m. A match alone is not proof of your compromise or loss, or one operator controlling all addresses. Preserve chain/network context and report through established channels.
sources:
- name: Sovryn November 3 original incident report
  url: https://forum.sovryn.com/t/sovryn-incident-report-31-october-1-november-2026/3609
  primary: true
  says: 'Full project report: distinct outflow/payout measures, blocked escrow, protocol custody, pauses, tracing addresses and no final loss allocation or reopening date. Publication time lacks timezone; date only.'
---

Sovryn’s November 3 report confirms attacks on Rootstock lending/margin contracts on October 31 and a separate XUSD/WRBTC AMM incident on November 1. The disclosure date here is the readable project report, not the attack date. Technical entry conditions are withheld while protective work continues; no CVE, completed fix or shared attacker is established. Confirmed protocol payouts support L4. This is separate from the older BOB staking-contract incident.

The first incident’s net outflow is 604,575.19 XUSD plus 4.02792509 WRBTC, including a 0.00186 WRBTC financing fee and excluding 66,134.071550 XUSD blocked in seven delayed withdrawals. The project values that defined outflow at about $914,000 using XUSD=$0.995 and BTC=$77,500, not live prices. The second incident’s 541,455.998472 XUSD payout is a different accounting measure; their sum is not a finalized user-loss allocation.

The blocked escrow remains unpaid at the November 3, 13:54:11 UTC check. Transfers of 9.030667 RBTC and 14,085.357109 ZUSD into Exchequer custody preserved assets already controlled by the protocol; they are not recovered stolen funds or distributed compensation. A downstream 5.1 BTC payout at block 974167 (November 1, 19:33:54 UTC) and 0.136089812171370854 ETH are conversions of earlier proceeds, not additional losses; a later bridge-liquidity reimbursement is not a second attacker payment.

Lending, borrowing, margin and lending-pool withdrawals remain paused, and the interface is in maintenance. Independent security review, corrective work and loan/collateral/pool reconciliation precede reopening. The report publishes no recovery formula or reopening date; treasury custody does not settle final allocation.
