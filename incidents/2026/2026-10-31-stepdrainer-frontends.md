---
title: Blockaid warns of Step Drainer across crypto sites; Flap confirms a DNS attack
date: 2026-10-31
level: 3
tags: [Step Drainer, DNS, crypto]
summary: Blockaid warns against interactions with Flap and Kintsu, then identifies ten more domains serving Step Drainer. Flap confirms a DNS attack and moves to flap.cool; the provider's involvement remains unconfirmed. No aggregate loss or victim count is established.
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
checklist:
  - title: Stop interacting with affected frontends
    hint: Blockaid's full two-post list is flap[.]sh, kintsu[.]xyz, stonkfun[.]xyz, pickle[.]finance, echelon[.]market, origami[.]finance, fluxbeam[.]xyz, stakepoint[.]app, supswap[.]xyz, longbow[.]cash, shprd[.]finance and apexdefi[.]xyz. Check browsing and wallet history; a domain match alone does not prove compromise. Flap says use its announced flap.cool directly and avoid flap.sh, even if it redirects. Verify updates through each project's established official channel before returning.
  - title: Review anything you signed
    hint: Use trusted wallet or explorer tools to inspect approvals and transactions; revoke suspicious permissions through a trusted interface, never an affected site's recovery prompt. Preserve transaction hashes for support. A wallet connection alone does not establish an asset transfer or exposed seed phrase; do not disclose your seed to purported recovery agents.
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
---

Blockaid links the ten additional sites to the same attack as its initial alert. Flap is still investigating whether its domain provider was involved; this does not establish a shared registrar or hosting-provider breach. L3 reflects confirmed malicious frontend delivery with unquantified outcomes, not proof of a smart-contract exploit or a particular loss total.
