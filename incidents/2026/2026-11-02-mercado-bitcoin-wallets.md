---
title: Mercado Bitcoin confirms a security incident; researchers trace multi-chain wallet drains
level: 4
date: '2026-11-02'
tags:
- Mercado Bitcoin
- exchange
- wallets
ecosystems:
- crypto
summary: Mercado Bitcoin confirms a security incident and pauses deposits and withdrawals. Bitquery estimates $48.5M across 10 chains and reports continuing deposit-address sweeps; its figures are unverified. The exchange says customers suffered no loss and no data leaked. The entry point is unknown.
splash: Mercado Bitcoin customers and integrations using its deposit addresses; exchange hot wallets are implicated
wipe: Respect the deposit/withdrawal pause; do not reuse saved deposit addresses until official recovery guidance confirms them
inTheWild: 'yes'
inTheWildNote: Exchange confirms an incident; Bitquery reports unauthorized wallet transfers.
cves: []
fixed: []
timeline:
- date: Nov 2, 2026
  title: Exchange acknowledges a security incident and preventive transfer pause
  body: Its official statement says the incident in one system was contained quickly, customers suffered no loss and no data leaked. BitNotícias reproduces the full statement including the temporary deposit/withdrawal suspension.
- date: Nov 2, 2026
  title: Bitquery publishes a ten-chain investigation with a later observation cutoff
  body: Its Ethereum observations run through 15:46 UTC, with other chains checked between 14:16 and 15:47 UTC. The report estimates $48.5M and 35,853 Ethereum deposit addresses swept through at least 15:44 UTC. These are unverified research figures, not an exchange-confirmed loss or customer count.
checklist:
- title: Keep deposits paused and recheck saved addresses
  hint: Do not send funds to a saved Mercado Bitcoin deposit address while transfers are suspended. Check the established exchange app and official channels for explicit recovery and address instructions before restarting automated payouts or exchange integrations. Bitquery reports signed transfers from deposit addresses; changing your login password alone does not secure exchange-controlled keys.
- title: Verify balances and preserve transaction evidence
  hint: Record your account statement, affected network, deposit address, transaction hash, amount and time. Contact Mercado Bitcoin through its established support channel about missing credits or pending withdrawals. The exchange’s no-customer-loss statement is not independent verification that every balance or transfer is settled; address counts are not customer counts.
- title: Monitor the published wallet set with its attribution limits
  hint: 'Bitquery’s section 13 lists 13 addresses, including source wallets, suspected recipients, later destinations and a separate unconfirmed BitMart-labelled source. Main reported recipients: EVM 0xe485e7a70b1131216cb47ca4555c4bbb2c742478; Bitcoin 19qGpsHvzh1t6pVi526XNNkh6hW6prDZp; Solana 3YX6WHncP1Ra4AotE9YLawFt4nPmxyux288FWXkEW97J; Tron TEX3HuDRHRa3tnYpy96M4UfSx62VhDyA5L; Stellar GDXYRI6IONQA5YTGRLQ6O3FGJ2BWXPJTTQPUXFPSEXSRKBZLFKMZSOLP. Use the full research record for the other eight and each role. A match alone does not establish compromise, wallet ownership or attribution.'
- title: Reject unsolicited recovery requests
  hint: Open the exchange through an existing bookmark or app. Do not follow refund links in replies or direct messages, disclose passwords, MFA codes or wallet recovery phrases, or send a payment to unlock a balance. Confirm any support request through the official channel.
sources:
- name: Mercado Bitcoin official statement
  url: https://x.com/MercadoBitcoin/status/2117239507263132056
  primary: true
  says: Readable public embed confirms the incident, rapid containment claim, no customer loss and no data leak. It truncates at the deposits/withdrawals sentence; the full suspension wording is reproduced by BitNotícias.
- name: Bitquery original multi-chain investigation
  url: https://bitquery.io/investigations/mercado-bitcoin-hack
  primary: true
  says: Original on-chain research estimates $48.5M, 35,853 Ethereum deposit addresses and $7.3M frozen, with observations through November 2 afternoon UTC. These unverified figures and wallet labels do not establish the entry point or final loss.
- name: BitNotícias report with the exchange statement
  url: https://bitnoticias.com.br/noticias/mercado-bitcoin-ataque-hacker/
  says: Reproduces the exchange’s temporary deposit/withdrawal pause and no-customer-loss statement; attributes the earlier preliminary $40M-plus estimate to Hypernative, rather than independently proving that amount.
---

Mercado Bitcoin’s public acknowledgement establishes a platform security incident, rather than just an unexplained transfer or an individual customer account theft. It does not disclose how the intruder entered, a compromised software version, the final financial impact or a recovery deadline. No published patch or user password-reset requirement is established by the statements read.

Bitquery reports hot-wallet outflows on ten chains and deposit-address sweeps continuing after the exchange’s rapid-containment statement. Its estimate is **unverified**: some source-wallet ownership comes from labels, behaviour and timing, particularly on Solana, Tron and Stellar. The $48.5M uses transfer-time prices and excludes tokens without a price; $1.21M comes from a thinly traded EVA token, and the report gives $47.2M when excluding it. Neither figure is an exchange-confirmed final loss.

The reported 35,853 Ethereum deposit addresses represent addresses, not unique customers. A transfer signed by an address does not distinguish stolen private keys from misuse of a signing service. The research’s master-key and shared-supplier suggestions are hypotheses, not established causes; its separate $298k outflow and BitMart label do not establish that BitMart was breached or that the cases share a supplier.

Bitquery estimates $7.3M frozen by Tether and Paxos at its observation cutoff. Frozen funds are not returned funds, and funds left in a wallet are not necessarily recoverable. The report’s FAQ rounds the issuer components to $5.9M and $1.5M, which do not sum exactly to its $7.3M headline; retain that uncertainty rather than treating the figures as an audited total. The exchange’s customer-protection statement and its containment claim remain vendor claims, distinct from the researcher’s observations. No connection to the [Binance incident](/incidents/binance-wallet-investigation/) is established.
