---
title: Fluidkey takes services offline after unauthorized user transactions
level: 4
date: 2026-11-19
tags: [Fluidkey, wallet, crypto]
summary: Fluidkey confirms a user security incident and says unauthorized transactions stopped after services went offline at 18:05 UTC. Bitquery traces relayer payouts across six chains, but its loss estimate is not a vendor-confirmed total. The cause and recovery outcome remain unresolved.
splash: Fluidkey users with accounts involved in the incident; affected-user scope and the attack mechanism remain unknown
wipe: Follow Fluidkey's warning to avoid its website/app during investigation; retain transaction evidence and verify any recovery instructions.
inTheWild: yes
inTheWildNote: Fluidkey acknowledges a security incident and unauthorized user transactions.
timeline:
  - date: Nov 19, 18:05 UTC
    title: Fluidkey takes services offline
    body: In its later statement, Fluidkey says no unauthorized transactions occurred after this shutdown. It is working with SEAL 911 on investigation and fund tracing and promises a postmortem.
  - date: Nov 20, 2026
    title: Bitquery publishes its original transaction analysis
    body: The researcher follows payouts on six chains and separates attacker-linked, uncertain and likely user-owned destinations. Its findings do not establish how the relayer was induced to send transactions.
checklist:
  - title: Respect the pause and verify instructions before using the service
    hint: Fluidkey's November 19 initial notice asks users not to interact with its website or app during investigation. Consult updates from the established Fluidkey account and official support channels. Do not infer that a reachable homepage or an idle relayer means recovery is complete; the available statements do not announce a safe resumption.
  - title: Preserve transaction evidence without labelling every withdrawal as theft
    hint: As a precaution, retain chain names, transaction hashes, timestamps, assets and destination addresses for your own accounts. Bitquery's report lists 22 addresses in its complete wallet record, including legitimate infrastructure and likely user destinations as well as suspected attacker wallets; use its role labels and full table, not a blanket denylist. The relayer contract is 0x8090a9db6aca56ffa186c75ca0787b18af1058a0; its Ethereum signer is 0x7997e87480f17aadbbb5fdb02546261da4d982da and Base signer is 0x2b40fe2e6772c99e114f3e835fca1dace9a0854a. A transaction involving those addresses alone does not prove theft or compromise, and absence from the report does not prove safety.
  - title: Treat recovery messages as unverified until checked independently
    hint: As a precaution, use established project channels to verify any proposed recovery or migration process before signing transactions or sharing sensitive material. Never send a seed phrase or private spending key to someone offering reimbursement. The readable official statement promises investigation and a postmortem, not completed refunds or a universal key-rotation procedure.
sources:
  - name: Fluidkey initial incident statement
    url: https://x.com/fluidkey/status/2123481430634492278
    primary: true
    says: Full initial statement read through X's public oEmbed endpoint; confirms an incident affecting users and advises against website/app interaction during investigation.
  - name: Fluidkey service-shutdown update
    url: https://x.com/fluidkey/status/2123510970165436704
    primary: true
    says: Public oEmbed exposes the complete opening paragraphs on the 18:05 UTC shutdown, no subsequent unauthorized transactions and SEAL 911 investigation. Later text is truncated and is not relied upon here.
  - name: Bitquery — Fluidkey hack
    url: https://bitquery.io/investigations/fluidkey-hack
    primary: true
    says: Original six-chain transaction analysis read in full, including its attribution method, wallet-role table and explicit limits; its dollar estimate is not an official loss tally.
---

Fluidkey's initial November 19 statement acknowledges a security incident affecting users and asks them not to interact with its website or app while it investigates. The complete opening paragraphs of its later statement say it took all services offline at 18:05 UTC, saw no unauthorized transactions after that time, was working with SEAL 911 on investigation and fund tracing, and would publish a postmortem. Direct X pages were inaccessible; these statements were read through X's public oEmbed endpoint. The remainder of the later post is truncated there, so no further instructions are inferred from it.

Bitquery's November 20 original analysis follows the relayer's payouts on Ethereum, Base, BNB Chain, Optimism, Arbitrum and Polygon. It classifies roughly $1.58 million as reaching attacker-linked wallets, with a possible upper range near $1.64 million when uncertain destinations are included. These remain **unverified loss estimates from one investigation**, not Fluidkey's confirmed total. It separately identifies about $349,000 in transfers to wallets with prior histories, some likely ordinary withdrawals. Adding every relayer payout together would therefore overstate the evidence for theft. Its figures exclude unpriced assets and Gnosis; its classifications can be revised.

The researcher traces relayer activity through 18:04:59 UTC on November 19 and reports no subsequent transactions by its November 20 07:35 UTC check. That bounded observation agrees with the shutdown statement; it does not establish permanent containment. Transfers into Tornado Cash are not evidence of recovery or repayment. The team's investigation and root-cause report remain outstanding in the sources read here.

Neither the transfers nor the product's self-custody design establish whether the incident began with malicious browser code, server compromise, a stolen key or a contract defect. This is a user-funds incident acknowledged by Fluidkey, not a confirmed vulnerability in Safe generally, and no attacker identity or affected-person count is established. L4 reflects acknowledged unauthorized user transactions; it does not depend on treating the researcher's estimate as a confirmed loss.

For investigation, preserve the role distinctions in Bitquery's **22-address record**. In addition to the three legitimate relayer addresses in the checklist, it lists scout/gas addresses `0x9140837ca5020c42fcbcb29a1af74293d6e5b9dc` and `0x72873fa107aba9310f220660a1e64e31b4de5cf2`; payout/collector/gas/swap addresses `0xeb6ed5a926a653ade23b62e9a582d2262f3f0980`, `0x9e5143a57ef1b609ef4b96248374e8cfdca940ae`, `0xf37e4220636e797cf1e10ef0f9c11a4e103792fc`, `0xdc70810d767b3109d8afa9678561738bdb4a2984`, `0x9e5ff0a62fb0a6ec15574315cafb782fc63fa1ee`, `0xe42d211940438803c8f441ef7080c68f9bce73c9` and `0x5afec19fb1d0e1a2a92ab0f3ccca246c59120021`; and Tornado-deposit addresses `0xd3a9d27ad80ff9528e158bffa9752f8a88024eea`, `0xc4ab6dcd6542973048d374e1b1129cd534c7dba9`, `0x4b98363885ebf124018e5d779aea033d9d04c95b`, `0x6fad29bc41f3391c99ed61416d22ca23b7f6d01a`, `0xd915dec9402c1aa9f508b8371375c140ab9e0c4c` and `0xf5e261c18cb87dc1a6ee58f61fa6b64b58f20e50`. Its record also includes two scouted/drained accounts, `0x746fb37befb7b827cc050f62f45f7de4edfdd6e7` and `0x03573cbe72c503155411201215aadbc4b6c65059`, a likely user's own destination `0x1f3211e62bb3a8446fa9d8f69a5c380362b6d3a3` and a KuCoin deposit address `0x6a3ec2a1485123bb6ffcaa05bc2260aae3d95e99`. This is a research record with mixed roles, not a list of 22 attackers.
