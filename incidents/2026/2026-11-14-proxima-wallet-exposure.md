---
title: Proxima reports $200,000–$250,000 in affected wallet funds
level: 4
date: '2026-11-14'
tags: [Proxima, Solana, Wallet security]
ecosystems: [crypto]
summary: Proxima reported a breach that may have exposed wallets created, imported or exported through its trading app during the preceding 15 days. It estimated $200,000–$250,000 in affected funds and promised to reimburse affected SOL balances.
splash: Wallets created, imported or exported through Proxima in the 15 days before the November 14 notice.
wipe: Stop deposits and automated activity on potentially exposed addresses, save transaction records and verify any reimbursement directly in Proxima.
inTheWild: 'yes'
inTheWildNote: Proxima confirmed a breach that affected wallet funds. The access path is unverified.
timeline:
- date: Nov 14, 2026
  title: Proxima reports affected wallet funds
  body: Co-founder Theo estimates $200,000–$250,000 in affected funds, under 5% of total funds.
- date: Nov 14, 2026
  title: Proxima narrows wallet scope and describes the refund plan
  body: The team identifies a 15-day window, says it made some transfers to secure funds in fresh wallets and promises to reimburse affected SOL balances when the app reopens.
checklist:
- title: Stop using potentially exposed addresses
  hint: Review wallets created, imported or exported through Proxima during the stated window. Stop new deposits and automated strategies on those addresses. When the app is available, check My Wallet for the Compromised label. If you control an exposed key elsewhere, move assets you can still access to an independently generated wallet from a trusted device.
- title: Check reimbursement through your account
  hint: Open Proxima directly through proxima.tools. The announced plan credits affected SOL balances to fresh funding wallets in the account. Check the credited amount and address against your own records. Avoid private messages offering refunds and never share a recovery phrase or private key.
- title: Keep evidence of unexpected transfers
  hint: Save wallet addresses, transaction signatures, times and balances. Compare them with your account history and any transfers Proxima identifies as its own protective moves. Report unexplained activity through the support channel linked from the official site.
sources:
- name: Proxima co-founder’s initial statement via X’s public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2F0xTheo__%2Fstatus%2F2121495544203755809
  primary: true
  says: Reports the SigNoz link and estimates $200,000–$250,000 in affected funds, under 5% of total funds.
- name: Proxima co-founder’s November 14 follow-up via X’s public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2F0xTheo__%2Fstatus%2F2121579940671844400
  primary: true
  says: Shows the original post and the team’s SigNoz attribution. The full text on wallet scope and reimbursement is in the next source.
- name: Public copy of Proxima’s follow-up
  url: https://teapawt.org/0xTheo__/status/2121579940671844400
  says: Preserves the complete text of the same Proxima statement.
- name: Proxima terms and official channels
  url: https://proxima.tools/terms/
  primary: true
  says: Describes managed-wallet keys, the official application and support channels, and precautions against requests for secrets.
---

Proxima generates and stores keys for wallets it manages and signs transactions for users through the app. The team says the potentially exposed group consists of wallets created, imported or exported through Proxima during the preceding 15 days. It reports that token supply and EVM balances were unaffected and that some later movements came from the team's own efforts to secure funds in new wallets.

Proxima attributes the breach to a vulnerability involving its monitoring provider, SigNoz, that reached a specific layer of Proxima infrastructure. The announcement does not identify a vulnerability ID, affected SigNoz deployment or fixed version. SigNoz has not publicly confirmed that explanation in the sources reviewed.

The **$200,000–$250,000** estimate is the team's figure for funds affected. A transfer can reflect theft or the team's protective actions. The promise to credit SOL to fresh funding wallets describes planned reimbursement, and completed payouts remain unverified.
