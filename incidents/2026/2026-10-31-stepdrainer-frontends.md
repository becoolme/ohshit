---
title: Blockaid warns of Step Drainer across crypto sites; Flap confirms a DNS attack
date: 2026-10-31
updated: 2026-11-01
level: 4
tags: [Step Drainer, DNS, crypto]
summary: Blockaid warns of Step Drainer across 12 crypto sites. Flap confirms DNS hijacking; Flap and Kintsu report restoration. Bitquery estimates $202,386 drained across six chains, excluding Solana/Aptos. Registrar root cause and full recovery remain unconfirmed.
splash: Visitors interacting with the affected crypto frontends, especially wallets asked to sign transactions or approvals
wipe: Avoid affected frontends and signing prompts; inspect prior wallet interactions through trusted wallet tools
inTheWild: yes
inTheWildNote: Blockaid reports active drainer delivery, not successful theft from every visitor.
cves: []
fixed: []
timeline:
  - date: Oct 31, 2026
    title: Blockaid warns about Flap and Kintsu, then lists ten additional sites
  - date: Oct 31, 2026
    title: Flap confirms DNS attack and announces domain migration
  - date: Oct 31, 2026
    title: Kintsu warns about registrar DNS hijacking, then reports its site restored
    body: The project retains a root-cause investigation and asks affected users to revoke approvals and move funds.
  - date: Oct 31, 2026
    title: Flap announces its official website and alternative domain are back online
    body: This is Flap’s restoration statement, not confirmation that the other affected sites have recovered.
  - date: Oct 31, 2026
    title: Bitquery publishes a cross-chain loss estimate
    body: Its count covers 32 wallets losing at least $1; it excludes Solana and Aptos and is not a final campaign total.
checklist:
  - title: Stop interacting with affected frontends
    hint: Blockaid's full two-post list is flap[.]sh, kintsu[.]xyz, stonkfun[.]xyz, pickle[.]finance, echelon[.]market, origami[.]finance, fluxbeam[.]xyz, stakepoint[.]app, supswap[.]xyz, longbow[.]cash, shprd[.]finance and apexdefi[.]xyz. Check browsing and wallet history; a domain match alone does not prove compromise. Flap initially advised using flap.cool and avoiding flap.sh even if it redirected, then announced that both entry points were back online. Verify the current announcement through each project’s established official channel before returning; Kintsu separately reports its real site restored but asks users to stay cautious while it investigates with its registrar. Neither statement clears the other listed domains.
  - title: Review anything you signed
    hint: Use trusted wallet or explorer tools to inspect approvals and transactions; revoke suspicious permissions through a trusted interface, never an affected site's recovery prompt. Kintsu asks users who connected or signed since approximately 00:00 UTC on October 31 to revoke approvals and move funds. Open the revocation tool independently through a known address, and verify any migration guidance with the project. Preserve transaction hashes for support. A wallet connection alone does not establish an asset transfer or exposed seed phrase; do not disclose your seed to purported recovery agents.
  - title: Check permissions and the complete research ledger
    hint: 'Review approvals on every chain used on October 30–31, Morpho account managers, and Monad Kintsu/Neverland/Uniswap positions. Bitquery lists 13 role-labelled references: 55% payout 0x012f89ff307568f8409bbe379ca92ed41bc4d386; 30% payout 0x7bf2037264efbff55bd52777772779c1d9e87695; 15% payout 0x5aff449b63c033df386af0c45384cd20c5918dbf; BNB collector 0x24497068ca4166ca32a04ae530ce00cf79755bd5; Robinhood collector 0x2323a3d19c6181b0e854209f405e6fdef6ad821d; Robinhood Morpho contract 0x40ea475e8b31fb8e86b9bd23b986d6e09cdadf7b; Ethereum collector 0x323719352ab49d3c8420f01e864fc115734ab956; Ethereum collector controller 0x7461a0c63caf04828778c6dd838bc9506b3c74dc; Robinhood contract controller 0xafb51dfeee427bf49b28ded45f8aac8881ccf448; Morpho transaction 0x33c529d75e195b27931a15285cb703575ff172163715c7c01785cc44d7c4e568; BNB split transaction 0x39b36904796f53ca801bbd393ba09b1169fe3b87462719a177efde2e30967379; 80% recipient in excluded, unlinked drains 0x984dd03a4219062c4e4c2db38d31535656b5cd91; Kintsu sMON contract, not an attacker wallet 0xa3227c5969757783154c60bf0bc1944180ed81b9. Match roles and chain; a match alone does not prove compromise. One recipient belongs to excluded, unlinked drains; the sMON address is a legitimate contract. See the source for the complete transaction history.'
sources:
  - name: Blockaid original Flap and Kintsu alert
    url: https://x.com/blockaid_/status/2116363035598266514
    primary: true
  - name: Blockaid expanded Step Drainer domain list
    url: https://x.com/blockaid_/status/2116368762488107157
    primary: true
  - name: Flap original DNS investigation and migration update
    url: https://x.com/flapdotsh/status/2116400269445509360
    primary: true
  - name: Flap original restoration announcement
    url: https://x.com/flapdotsh/status/2116433470276972590
    primary: true
    says: The readable public embed announces that the official website and alternative domain are back online.
  - name: Kintsu original warning, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FKintsu%2Fstatus%2F2116373486234902587&omit_script=true
    primary: true
    says: Readable opening attributes the DNS hijack to its registrar and gives the approximate interaction window and approval/fund guidance; ending truncates.
  - name: Kintsu original restoration update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FKintsu%2Fstatus%2F2116401713930289391&omit_script=true
    primary: true
    says: Complete post says the real site is restored and root cause is still being investigated with the registrar.
  - name: Bitquery original cross-chain investigation
    url: https://bitquery.io/investigations/name-com-dns-hijack
    primary: true
    says: Transaction-based estimate through October 31 18:30 UTC; sites inferred by chain/token, no confirmed registrar root cause.
---

Blockaid links the ten additional sites to the same attack as its initial alert. Flap is still investigating whether its domain provider was involved; this does not establish a shared registrar or hosting-provider breach. The initial L3 assessment reflected malicious delivery with unquantified outcomes; the research below supports L4 for observed wallet theft, not a smart-contract exploit.

**November 1 follow-up:** Kintsu’s October 31 original warning attributes its DNS hijack to the registrar and asks anyone who connected or signed since approximately 00:00 UTC that day to revoke approvals and move funds. Its later complete post says the real site has been restored, while work with the registrar continues to confirm the cause. This adds a separate project restoration statement; it does not establish a confirmed shared registrar breach, recovery of all twelve domains, a final loss total or repayment. The approximately midnight threshold is precautionary guidance, not a proven attack-start time.

**Research follow-up:** Bitquery estimates $202,386 across six chains, with 32 wallets losing at least $1 and 15 additional sub-dollar wallets. Its October 31 18:30 UTC cutoff excludes Solana/Aptos and unlinked drains; site attribution is inferred from chain/token, not recorded in transfers. About $56,600 in queued Kintsu stake is a historical snapshot, not confirmed frozen or repaid. Registrar root cause remains unconfirmed.
