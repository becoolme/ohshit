---
title: Blockaid warns of Step Drainer across crypto sites; Flap confirms a DNS attack
date: 2026-10-31
updated: 2026-11-01
level: 3
tags: [Step Drainer, DNS, crypto]
summary: Blockaid warns against interactions with Flap and Kintsu, then identifies ten more domains serving Step Drainer. Flap confirms a DNS attack, initially moves to flap.cool and later announces both domains are back online; the provider's involvement remains unconfirmed. No aggregate loss or victim count is established.
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
checklist:
  - title: Stop interacting with affected frontends
    hint: Blockaid's full two-post list is flap[.]sh, kintsu[.]xyz, stonkfun[.]xyz, pickle[.]finance, echelon[.]market, origami[.]finance, fluxbeam[.]xyz, stakepoint[.]app, supswap[.]xyz, longbow[.]cash, shprd[.]finance and apexdefi[.]xyz. Check browsing and wallet history; a domain match alone does not prove compromise. Flap initially advised using flap.cool and avoiding flap.sh even if it redirected, then announced that both entry points were back online. Verify the current announcement through each project’s established official channel before returning; Kintsu separately reports its real site restored but asks users to stay cautious while it investigates with its registrar. Neither statement clears the other listed domains.
  - title: Review anything you signed
    hint: Use trusted wallet or explorer tools to inspect approvals and transactions; revoke suspicious permissions through a trusted interface, never an affected site's recovery prompt. Kintsu asks users who connected or signed since approximately 00:00 UTC on October 31 to revoke approvals and move funds. Open the revocation tool independently through a known address, and verify any migration guidance with the project. Preserve transaction hashes for support. A wallet connection alone does not establish an asset transfer or exposed seed phrase; do not disclose your seed to purported recovery agents.
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
---

Blockaid links the ten additional sites to the same attack as its initial alert. Flap is still investigating whether its domain provider was involved; this does not establish a shared registrar or hosting-provider breach. L3 reflects confirmed malicious frontend delivery with unquantified outcomes, not proof of a smart-contract exploit or a particular loss total.

**November 1 follow-up:** Kintsu’s October 31 original warning attributes its DNS hijack to the registrar and asks anyone who connected or signed since approximately 00:00 UTC that day to revoke approvals and move funds. Its later complete post says the real site has been restored, while work with the registrar continues to confirm the cause. This adds a separate project restoration statement; it does not establish a confirmed shared registrar breach, recovery of all twelve domains, a final loss total or repayment. The approximately midnight threshold is precautionary guidance, not a proven attack-start time.
