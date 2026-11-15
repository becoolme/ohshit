---
title: Kava Lend exploit drains most of the protocol’s KAVA lending pool
level: 4
date: '2026-11-14'
tags: [Kava Lend, DeFi, Lending pools]
ecosystems: [crypto]
summary: Kava confined the incident to Kava Lend. Bitquery traced 55.2 million KAVA borrowed through repeated loans against inflated BUSD collateral and estimated about $2.1 million in sale proceeds on BNB Chain.
splash: Kava Lend users, especially KAVA lenders, and users whose transfers depend on paused exchanges or the Axelar bridge.
wipe: Pause new Kava Lend deposits and borrowing, record your positions and check official notices before moving assets across chains.
inTheWild: 'yes'
inTheWildNote: Kava confirmed the incident. Bitquery traced the loans and ensuing sales.
timeline:
- date: Nov 14, 04:04–05:42 UTC
  title: Bitquery traces repeated borrowing and liquidation
  body: Two wallets used the BUSD pool to inflate collateral and borrowed about 55.2 million KAVA across 127 loans.
- date: Nov 14, 2026
  title: Kava confirms the incident is confined to Kava Lend
  body: Kava recognized the bridging and sale of KAVA on BNB Chain and ruled out unlimited minting. Partner exchanges paused deposits and withdrawals.
- date: Nov 14, 2026
  title: Kava pauses Axelar withdrawals as a precaution
  body: Kava paused the bridge and said a full incident report would follow. The traced sale route was through LayerZero.
- date: Nov 14, 16:20 UTC
  title: Bitquery observes a failed Relay order
  body: Relay showed a blocked order for 612,416 USDT with no payout. The record showed a possible return to the sender. Recovery by Kava or users was unverified.
checklist:
- title: Pause new exposure and record existing positions
  hint: Review deposits, debts, collateral and withdrawal history in the official Kava app. Save the relevant wallet addresses, transaction hashes and times. Follow Kava’s official incident updates before opening new positions or acting on recovery instructions.
- title: Check each transfer route before sending
  hint: Check the exchange’s KAVA deposit and withdrawal notices and the current status of the intended bridge. Kava paused Axelar withdrawals. Use official support channels for transfers already in flight and ignore unsolicited recovery offers.
- title: Correlate suspected exploit transactions
  hint: Start with the Kava wallets kava1uzx5924cqsutcw365ajs8kkc3rr4vtlyzms255 and kava1v2s266sll8ca5xrs06swmsc00nwwt7u77eufk4 and BNB Chain seller 0x37d732914f86cc6eb1e87419e3046a739f011042. Use Bitquery’s full record of 22 addresses, transaction hashes and the Relay order ID for the other roles and routes. Match network, timestamp and role. A match alone cannot establish ownership or compromise.
sources:
- name: Kava’s scope update via X’s public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FKAVA_CHAIN%2Fstatus%2F2121574325765476462
  primary: true
  says: Confirms the incident was confined to Kava Lend, acknowledges bridging and sales, and rules out unlimited minting.
- name: Kava’s Axelar update via X’s public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FKAVA_CHAIN%2Fstatus%2F2121605522520510950
  primary: true
  says: Reports the precautionary Axelar withdrawal pause and promises a full incident report.
- name: Bitquery’s Kava Lend investigation
  url: https://bitquery.io/investigations/kava-hack
  primary: true
  says: Reconstructs the borrowing and liquidation loop, sale proceeds and the failed Relay order. Includes role-labelled addresses and transactions.
- name: The Block’s reconstruction
  url: https://www.theblock.co/news/defi/2026-11-14-kava-lend-loses-roughly-3-8-million-to-hack-sending-kava-token-down-nearly-40-440350
  says: Reviews on-chain data, links the relevant source code and reproduces Kava’s exchange precautions.
---

Bitquery found that the attackers put a nearly empty BUSD market in a state where its interest calculation divided by a tiny positive supply. The supply index grew about 243,000-fold in three minutes. One wallet recycled the available BUSD into a second wallet’s account as collateral. The second wallet borrowed KAVA against those deposits. Repeated liquidations closed the debts after the first wallet had withdrawn the available BUSD, leaving little or none for the liquidation to seize. This is Bitquery’s reconstruction. Kava’s technical findings and any patched version were still pending.

Bitquery counts **55.2 million KAVA borrowed** across 127 loans and **53.9 million KAVA retained** after repaying other users’ loans, worth approximately **$3.7 million** at the pre-sale price. Its estimate of approximately **$2.1 million** measures the proceeds from sales on BNB Chain. The **612,416 USDT** order that Relay blocked is part of the traced proceeds. Kava had not published a final loss or repayment figure in the sources reviewed.

Kava treated the Axelar suspension as a precaution. The assets in the sale reconstruction crossed through LayerZero. A bridge pause alone does not identify the exploit path or the status of customer balances.
