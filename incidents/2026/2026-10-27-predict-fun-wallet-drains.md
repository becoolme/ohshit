---
date: 2026-10-27
title: Predict.fun reports unauthorized wallet transfers; research traces drains signed with owner keys
level: 4
tags:
  - Predict.fun
  - wallets
  - credentials
ecosystems:
  - crypto
summary: Predict.fun acknowledges about 400,000 USDT in unauthorized transfers. Bitquery traces 29 wallets across October 22 and 27 and finds owner-key signatures, not calls exploiting market contracts. A third-party API documentation compromise remains a preliminary explanation.
splash: Predict.fun smart-wallet users, especially anyone who exported a Privy owner key for API trading; the precise exposure path is unknown
wipe: Stop using potentially exposed owner keys, move remaining assets to a fresh wallet from a clean device and contact official support
inTheWild: yes
inTheWildNote: Predict.fun acknowledges unauthorized transfers; Bitquery documents actual wallet drains.
cves: []
fixed: []
timeline:
  - date: Oct 22, 2026
    title: Bitquery retrospectively identifies an earlier drain wave
  - date: Oct 27, 2026
    title: A second wave becomes public; Predict.fun acknowledges unauthorized transfers
  - date: Oct 27, 2026
    title: Bitquery records a further drain after the platform statement
checklist:
  - title: Replace exposed owner keys rather than only changing an API token
    hint: If you exported a Privy owner key for a trading bot or API experiment, stop that bot and treat the owner key as exposed. From a clean device, move remaining assets to a newly created wallet whose key has not been copied into the exposed environment. Never enter the old seed or key into a recovery website. A password reset, wallet disconnect or allowance revocation alone does not invalidate a copied owner key.
  - title: Preserve transaction records and compare the investigation
    hint: Save wallet addresses, transaction hashes, bot configuration access logs and relevant browser history without sharing private keys. Bitquery lists 12 wallet/transaction references in its Where to look section; consult that full table. Key pivots include the reported receiving address 0x8b001d7378dbc19c1c62e39c0fc9ffad84182fba and Ethereum wallets 0xa3dc0ecd2f88dd1f4b0dde9e7ce33be732a0abbc and 0xd500a43442253a4b92a025f6604df2dd57d78e6f. Its gas-sponsor address belongs to a public service, not automatically the attacker. No attacker IP/domain list is supplied; a matching address or shared bridge alone is not proof of compromise.
  - title: Use official support for reimbursement and restored documentation
    hint: Bitquery reports a reimbursement commitment and that the documentation site was taken offline, but that does not prove payments completed or copied keys became safe. Check announcements through your existing official bookmark and preserve a support case. Do not use unsolicited refund links or resume bots with the same exposed key.
sources:
  - name: Predict.fun official acknowledgment
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fpredictdotfun%2Fstatus%2F2115089547528950108&omit_script=true
    primary: true
    says: Visible official text acknowledges about 400,000 USDT in unauthorized transfers; the documentation-provider explanation is truncated and is not treated as a proved root cause.
  - name: Bitquery original investigation
    url: https://www.bitquery.io/investigations/predict-fun-hack
    primary: true
    says: Traces owner-key-signed drains and distinguishes wallet theft from a market-contract exploit. Counts 397,708 USDT and 29 wallets; data ends October 27, not a current final loss audit.
---

Public disclosure was on October 27, although the researcher traces activity back to October 22. Bitquery reports 397,708 USDT taken from 29 wallets over two waves; the approximate monetary scale agrees with the platform acknowledgment. The exact wallet count and trace remain researcher-reported, unverified outside that investigation. Its observation window ends on October 27.

The observed signatures establish use of owner-key authority, not how those keys were obtained. Bitquery found no market-contract calls in the drains it examined. Its proposed connection to exported API keys and a third-party documentation site is an explanation, not a demonstrated key-theft mechanism or evidence that Privy itself was breached. L4 reflects confirmed unauthorized transfers.

A further drain after the statement illustrates why taking a documentation site offline cannot invalidate copied keys. The research reports a reimbursement pledge, not completed refunds. This is separate from the later Binance and Polymarket incidents; no shared attacker or root cause is established.
