---
title: Research links TRON wallet thefts to a shared fee network; iPhone cause remains unproven across victims
level: 4
date: '2026-11-05'
updated: '2026-11-14'
tags:
- TRON
- Wallet theft
- Seed phrases
summary: Bitquery’s November 12 update estimates at least 5.42M USDT taken from 454 TRON addresses through November 11, including 1.36M after November 4. PublicAML’s November 5–7 estimate covers overlapping activity. One theft matches a published iPhone account. The wider causes remain unknown.
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
- date: Nov 4, 2026
  title: SEAL summarizes iOS wallet compromise reports
  body: Six reports account for about $127,000 in reported losses. Overlap with the Bitquery cluster is unknown.
- date: Nov 5, 2026
  title: Bitquery publishes its investigation and correction
  body: The fee wallet received its first money before becoming live 19 minutes later, correcting an earlier sequence. Other-chain valuations use October 25 closing prices; later transfers
    and TON losses are outside its measured scope.
- date: Nov 6, 2026
  title: Trust Wallet publishes iOS safety guidance
  body: The company recommends current iOS and keeping recovery phrases and private keys out of phone notes and images. Its guidance gives no case-specific finding.
- date: Nov 7, 20:40 UTC
  title: PublicAML traces further transfers
  body: It links three new collectors to the same fee wallet and estimates at least 734,424 USDT left 21 TRON addresses from November 5 at 19:36 to November 7 at 17:02 UTC. Onward transfers and freeze requests are tracked separately.
- date: Nov 12, 2026
  title: Bitquery expands its TRON dataset
  body: The revised analysis estimates at least 5.42M USDT across 454 TRON addresses through November 11. It attributes 1.36M USDT to activity after November 4.
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
- title: Trace the additional November 5–7 collectors
  hint: PublicAML lists new collectors TJbCvACEpEMVwi2zYGXuoT2HSBnFLosVLz, TAgpYPQNdA9SCFfe2RgkaH8kkb7JZTaDcV and TJCY7r7shYmy3yWncGB9MvwWa8QS6du2C5. Its 35-address record also lists intermediaries, affected wallets and an unlabelled recipient. Check the stated roles before acting. A match alone cannot establish compromise or ownership.
sources:
- name: Bitquery original TRON and cross-chain investigation
  url: https://www.bitquery.io/investigations/iphone-wallet-drain-tron-usdt
  primary: true
  says: November 5 analysis and November 12 update, with revised wallet-level estimates, cross-chain tracing, role-labelled addresses and attribution limits.
    Figures are not independently confirmed.
- name: Security Alliance incident-response roundup
  url: https://radar.securityalliance.org/seal-weekly-stats-28-oct-3-nov-2026/
  primary: true
  says: Reports six iOS wallet-compromise reports and approximately $127,000 in reported losses. Overlap with the Bitquery dataset is unknown.
- name: Trust Wallet iOS safety guidance
  url: https://trustwallet.com/blog/security/ios-update-crypto-wallet-security
  primary: true
  says: Recommends current iOS and keeping keys and recovery phrases out of phone notes and images. Provides no case-specific root-cause finding.
- name: PublicAML follow-up TRON tracing
  url: https://publicaml.org/iphone-wallet-drain-tron/
  primary: true
  says: Independently reads chain data, documents November 5–7 transfers, its counting rule and 35 addresses with roles, and reports freeze requests. Does not verify devices, attack method, ownership or a completed freeze.
---

In the original November 5 analysis, the TRON count was 365 addresses, not 365 confirmed iPhone users; 276 lost USDT and 89 lost only TRX. A shared fee wallet ties transactions together but could serve multiple buyers of an attack kit. Three collectors have a weaker link: their 24 victims and 530,131 USDT are included in the estimate. The report correlates one theft with a published iPhone narrative by amount and timing, without device forensics proving the wider cause. It cannot establish a Trust Wallet flaw, general iPhone compromise or a link to the separate Poisoned Source campaign. Its separate estimate covers 65 wallets on eight other chains and at least $103K at a different valuation basis. That count does not establish 65 additional people. Do not turn the traced $1.86M JustLend deposit or $1.51M LI.FI route into extra theft totals; not all routed balances are established stolen funds.

SEAL’s November 4 report records six iOS wallet-compromise reports and about $127,000 in reported losses from October 28 through November 3, across multiple Trust Wallets and one Uniswap Wallet. The overlap with Bitquery’s cluster is unknown, so keep the estimates separate. Trust Wallet’s November 6 guidance discusses Coruna and DarkSword as risks for older iOS builds and recommends updating the device and keeping keys and recovery phrases out of notes and images. It gives no finding about the cause or operator of this theft network.

**November 7 tracing.** PublicAML ties three new collectors to Bitquery’s fee wallet and estimates outflows of at least 734,424 USDT from 21 addresses. One transfer moved 601,751.60 USDT at 17:02:27 UTC on November 7. About four minutes later the fee wallet sent that collector 30 TRX. The researcher counts an address when a single payment to a collector empties its USDT balance. Keep this estimate separate from Bitquery’s earlier window. PublicAML also traced 744,448 USDT through intermediaries to an unlabelled address. That figure includes previously counted funds and does not represent additional losses. PublicAML says it requested freezes. No freeze or recovery was confirmed. The follow-up does not identify the affected devices, apps or attack mechanism, or establish a single controller for the linked addresses.

**November 12 revised analysis.** Bitquery linked 55 collectors to its fee-wallet cluster, including 12 added after November 4. It estimates at least 5.42 million USDT taken from 454 TRON addresses from October 5 to November 11, of which 1.36 million USDT was taken after November 4. The new period counts USDT and excludes TRX losses. Its last observed fee-wallet payment for the campaign was at 15:43 UTC on November 11. The November 7 transfer of roughly 601,752 USDT appears in both Bitquery’s revised total and PublicAML’s November 5–7 report. Keep the totals separate to avoid double counting. The update provides further transaction evidence while leaving device, app and attack attribution unresolved for most affected addresses.
