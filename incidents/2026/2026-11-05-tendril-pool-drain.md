---
title: TENDRIL sell hook drains USDT liquidity from its PancakeSwap V2 pool
level: 4
date: '2026-11-05'
tags: [TENDRIL, BNB Chain, DeFi, PancakeSwap]
summary: Researchers traced a sell-hook exploit in TENDRIL on BNB Chain. The affected PancakeSwap V2 pair lost about 555,671 USDT net in one transaction. An attributed beneficiary received about 308,959 USDT in the transaction. Those amounts measure different flows. A project fix or restitution remains unverified.
splash: The affected TENDRIL/USDT PancakeSwap V2 pool on BNB Chain. An ordinary seller could trigger the vulnerable hook.
wipe: Avoid the affected pool pending verified remediation. Preserve transaction evidence and check the exact contract addresses.
inTheWild: 'yes'
inTheWildNote: ExVul, CertiK and BlockintAI identify the same executed pool-drain transaction.
timeline:
  - date: Nov 4, 16:02 UTC
    title: A sale burns tokens from the pair before its swap
    body: The exploit transaction synchronizes the depleted TENDRIL reserve before the remaining sell input arrives and removes almost all of the pool’s USDT.
  - date: Nov 5, 05:58 UTC
    title: ExVul publishes a sell-hook analysis
    body: ExVul identifies the affected pair and token, the transaction and addresses associated with the exploit.
  - date: Nov 5, 2026
    title: Other researchers separate pool outflow from beneficiary receipts
    body: CertiK estimates about $555,000 in net losses. BlockintAI measures about 555,671 USDT net out of the pool and about 308,959 USDT sent to the attributed beneficiary.
checklist:
  - title: Pause interactions with the affected pair
    hint: Check the pair and token addresses below before trading or adding liquidity on BNB Chain. Follow verified project or venue notices for any migration or restoration. Ignore unsolicited recovery links and signatures.
  - title: Match the transaction and preserve the evidence
    hint: 'Pair 0x5de082471f2a9f01a61e467a32837dee830d99e0, token 0xb1afdfd850da168f2cc9f742e11cdda5273973d2, exploit contract 0xc8cb6a2aa825a576e1470479046056fe414ee0f8, deployer 0xb81e4aafa347b27112b7f6f5de6cf7cd516021ff and attributed profit beneficiary 0xb87cf5ab84d0ab9545358cd30229627305331373. The drain transaction is 0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059. ExVul and BlockintAI publish 13 full addresses and transaction hashes across their reports, including the six identifiers here. Use BlockintAI’s address and source lists for the funding, deployment and preparatory transaction references. Save your own public address, amounts and transaction hashes for support. An address match alone cannot establish compromise or ownership.'
  - title: Check custom sell hooks before deploying
    hint: Reproduce ordinary unprivileged sells in a fork test. Remove reserve updates that debit the pool’s own tokens before swap inputs arrive, and test that a seller cannot change pair balances or recorded reserves through a tax controller during a swap.
sources:
  - name: ExVul original exploit alert
    url: https://x.com/exvulsec/status/2118221337617383455
    primary: true
    says: Original alert read in a public copy. Identifies the ordinary-sell trigger, reserve update and role-labelled addresses.
  - name: CertiK original exploit alert
    url: https://x.com/CertiKAlert/status/2118242639212658985
    primary: true
    says: Original alert read in a public copy. Identifies the sell-hook path and estimates about $555,000 in net losses.
  - name: BlockintAI transaction and balance analysis
    url: https://blockint.ai/blog/tendril-bnb-chain-exploit-tornado-funded-profit-still-parked
    primary: true
    says: Independently reads the transaction and reports the pool’s net USDT outflow, beneficiary receipt, timing and funding context.
  - name: TenArmor initial alert
    url: https://x.com/TenArmorAlert/status/2118237717574390001
    primary: true
    says: Original alert read in a public copy. Initially estimated a loss of about $309,000 for the same transaction.
---

TENDRIL’s sell hook let an unprivileged seller trigger a controller to burn TENDRIL held by the pair and synchronize the lower reserve before the rest of the seller’s tokens arrived. The distorted reserves let the subsequent swap take nearly all of the pool’s USDT. The reported defect is in the token’s custom sell logic. The evidence concerns this pair on BNB Chain.

ExVul reports roughly 550,000 USDT in pool losses and CertiK estimates roughly $555,000 in net loss. TenArmor’s initial alert estimated about $309,000 in losses without publishing its calculation. BlockintAI measures about 555,671 USDT net out of the pair and about 308,959 USDT transferred to the attributed beneficiary in the same transaction. The beneficiary transfer alone does not establish final attacker profit. No project-confirmed final loss, replacement contract or compensation was established in the reviewed disclosures. Public copies are available for the [ExVul alert](https://teapaw.org/exvulsec/status/2118221337617383455), [CertiK alert](https://teapaw.org/CertiKAlert/status/2118242639212658985) and [TenArmor alert](https://teapaw.org/TenArmorAlert/status/2118237717574390001).
