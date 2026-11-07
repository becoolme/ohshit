---
title: Research links TRON wallet thefts to a shared fee network; iPhone cause remains unproven across victims
level: 4
date: '2026-11-05'
updated: '2026-11-07'
tags:
- TRON
- Wallet theft
- Seed phrases
summary: Bitquery estimates at least $4.06M USDT taken through 43 collectors from 365 TRON wallets, including 89 losing only TRX, plus 65 wallets on eight other chains. These are unverified
  research counts, not unique people. One case matches an iPhone account; the wider device, app and attack cause remain unproven.
splash: Self-custody wallets whose keys or seed phrases may be exposed; no platform-wide iPhone or Trust Wallet compromise is established.
wipe: Use a trusted device and a new seed for exposed wallets; preserve evidence, report stolen transfers and keep mobile systems updated.
inTheWild: 'yes'
inTheWildNote: Traced theft patterns; most victims’ devices and attack causes remain unknown.
cves: []
fixed: []
timeline:
- date: Oct 5–Nov 4, 2026
  title: Research traces TRON theft-pattern transfers
  body: The report bounds its wallet counts to this period; links are financial relationships, not proof of one operator or device exploit.
- date: Nov 5, 2026
  title: Bitquery publishes its investigation and correction
  body: The fee wallet received its first money before becoming live 19 minutes later, correcting an earlier sequence. Other-chain valuations use October 25 closing prices; later transfers
    and TON losses are outside its measured scope.
- date: Nov 6, 2026
  title: Trust Wallet publishes iOS safety guidance
  body: The company recommends current iOS and keeping recovery phrases and private keys out of phone notes and images. Its guidance gives no case-specific finding.
checklist:
- title: Respond to suspected seed exposure across all chains
  hint: From a trusted device, create a wallet with a new seed and secure any remaining assets on every chain using the exposed seed. Do not reuse an exposed seed on a reinstalled app.
    Keep seed phrases out of phone photos, notes, screenshots and cloud backups. Install current mobile OS and wallet updates through official channels; this report does not establish
    one universal vulnerable app or a new vendor-fixed version.
- title: Preserve and report the theft record
  hint: Keep wallet addresses, transaction hashes, times, amounts and device evidence. Promptly report through the established channels of Tether and any exchange that received the transfers;
    freezing or recovery is not guaranteed. Unknown TRX top-ups followed by rapid outflows warrant investigation, but dust/address-poisoning and legitimate exchange sweeps also exist.
    Never send seed phrases or fees to unsolicited recovery contacts.
- title: Use the complete role-labelled address record
  hint: 'Fee wallet TUYFAa8hHjeEW6bPqBJ4v3RjQR2uKM1Svk; matched-case collector TNJPXRWEptdSzbC1pYGp8suyTao4qddJe6; Ethereum hub 0x007147f598748749486041f5798b0b1379e13097. The report’s
    address record lists 17 full addresses and one transaction hash; use all of them with their stated roles, not just these starting points. It includes legitimate exchange/bridge/mint
    contracts and uncertain endpoints: these are not all attacker wallets or a blanket blocklist. Preserve transaction evidence and verify labels; a match alone cannot prove ownership,
    compromise or a common actor.'
sources:
- name: Bitquery original TRON and cross-chain investigation
  url: https://www.bitquery.io/investigations/iphone-wallet-drain-tron-usdt
  primary: true
  says: November 5 analysis, corrected funding sequence, wallet-level counts, bounded cross-chain tracing, full address/transaction record and explicit limits on iPhone/app attribution.
    Figures are not independently confirmed.
- name: Security Alliance incident-response roundup
  url: https://radar.securityalliance.org/seal-weekly-stats-28-oct-3-nov-2026/
  primary: true
  says: Reports six iOS wallet-compromise reports and approximately $127,000 in reported losses. Overlap with the Bitquery dataset is unknown.
- name: Trust Wallet iOS safety guidance
  url: https://trustwallet.com/blog/security/ios-update-crypto-wallet-security
  primary: true
  says: Recommends current iOS and keeping keys and recovery phrases out of phone notes and images. Provides no case-specific root-cause finding.
---

The TRON count is 365 addresses, not 365 confirmed iPhone users; 276 lost USDT and 89 lost only TRX. A shared fee wallet ties transactions together but could serve multiple buyers of an attack kit. Three collectors have a weaker link: their 24 victims and 530,131 USDT are included in the estimate. The report correlates one theft with a published iPhone narrative by amount and timing, without device forensics proving the wider cause. It cannot establish a Trust Wallet flaw, general iPhone compromise or a link to the separate Poisoned Source campaign. Its at-least-$103K other-chain estimate uses a different valuation basis and is not a deduplicated additional-person count. Do not turn the traced $1.86M JustLend deposit or $1.51M LI.FI route into extra theft totals; not all routed balances are established stolen funds.

SEAL’s November 4 report records six iOS wallet-compromise reports and about $127,000 in reported losses from October 28 through November 3, across multiple Trust Wallets and one Uniswap Wallet. The overlap with Bitquery’s cluster is unknown, so keep the estimates separate. Trust Wallet’s November 6 guidance discusses Coruna and DarkSword as risks for older iOS builds and recommends updating the device and keeping keys and recovery phrases out of notes and images. It gives no finding about the cause or operator of this theft network.
