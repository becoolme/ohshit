---
title: Convertr shared analytics script skims checkout payment details
level: 4
date: 2026-10-26
tags:
  - e-commerce
  - supply chain
  - card skimming
summary: Sansec found payment-data theft through Convertr’s shared tracker. It confirmed cleanup on October 27, but cached scripts may persist for 24 hours. The suspected Plausible entry flaw remains unconfirmed.
splash: Shoppers using checkout.convertr pages since October 24; merchant or shopper totals are not established
wipe: Ask your bank to replace exposed cards; merchants must verify cleanup, address caches and notify payment providers
inTheWild: yes
inTheWildNote: Sansec observed the injected payment skimmer; the initial exploit is unconfirmed.
cves:
  - id: CVE-2026-8467
    name: Suspected Plausible entry point
    description: An older /storybook RCE is a suspected route, not a confirmed cause of this intrusion.
fixed:
  - product: Plausible CE — suspected entry flaw only
    version: 3.2.1
    status: Upgrade alone does not reverse payment-data theft
timeline:
  - date: Oct 24, 2026
    title: Sansec detects checkout skimming
  - date: Oct 26, 2026
    title: Sansec publicly reports the shared-script compromise
  - date: Oct 27, 2026
    title: Sansec confirms the served tracker is clean
checklist:
  - title: Contact your bank if you paid on an affected checkout
    hint: Ask to block and replace the card; watch for misuse of the CPF taxpayer identifier.
  - title: Verify cleanup and handle cached scripts
    hint: Merchants should confirm cleanup with Convertr and notify payment providers. Browser caches can retain the payload for 24 hours; shoppers should clear the affected site cache before returning.
  - title: Hunt the current and historical indicators
    hint: "analytics.convertr.app.br/js/script.pageview-props.tagged-events.js; 1x0.is/ws and /ws/<base64>; SHA256 ee4618d24737eff785e5a267b55903d5ef6ff7ecbeb099347a67fee77734d7f7. Sansec lists 14 older domains: snf.is, kk.land, nmn.is, kof.one, anl.is, xsox.diy, eqp.is, shy.is, blz.is, tray.is, miorl.net, xwv.is, fasthook.app, antiddos-protection.net. Its full list includes six Discord webhook IDs and skimmer strings; historical indicators belong to the wider campaign, not necessarily Convertr. A match alone does not prove compromise."
  - title: Patch and investigate self-hosted Plausible CE
    hint: For >=3 and <3.2.1, deploy 3.2.1 or later, or temporarily block /storybook. Review endpoint logs and container activity; preserve evidence, rebuild compromised systems and rotate reachable secrets.
sources:
  - name: Sansec investigation
    url: https://sansec.io/research/convertr-plausible-supply-chain-attack
    primary: true
    says: October 26 disclosure, October 27 cleanup, full indicators and cache warning; initial entry unconfirmed.
  - name: Plausible advisory
    url: https://github.com/plausible/analytics/security/advisories/GHSA-mhcv-h7gf-57cf
    primary: true
    says: "Older suspected entry flaw: affected >=3,<3.2.1, patch 3.2.1, endpoint blocking and investigation."
  - name: BleepingComputer
    url: https://www.bleepingcomputer.com/news/security/hackers-hijack-convertr-analytics-script-to-steal-payment-card-data/
    says: Payment fields include number, expiry, CVV, name and CPF; recommends cache clearing.
---

This is a newly disclosed skimming incident, not a new disclosure of the older Plausible flaw. Sansec had no Convertr server logs to establish that entry route. L4 reflects observed payment-data theft. See Sansec’s complete indicator section for the broader group’s six Discord webhook paths and additional payload signatures.
