---
title: Drupal Commerce fixes six flaws, including an actively exploited access bypass
date: 2026-10-28
level: 4
tags:
  - Drupal
  - Commerce
  - access bypass
ecosystems:
  - php
summary: Drupal confirms exploitation of Commerce Core route/field access bypass
  CVE-2026-118539. The October 28 batch fixes six flaws. Upgrade to 3.3.13 or
  8.x-2.41 and audit orders for inconsistencies.
splash: Drupal Commerce Core before 2.41 or 3.0.0–3.3.12; the exploited flaw
  needs no authenticated account
wipe: Upgrade Commerce Core to 3.3.13 or 8.x-2.41; audit orders and review
  enabled API integrations
inTheWild: yes
inTheWildNote: Drupal confirms active exploitation of CVE-2026-118539, not every
  flaw in the batch.
cves:
  - id: CVE-2026-118539
    name: Route and entity-field access bypass
    description: Insufficient access checks can financially harm the merchant;
      active exploitation confirmed.
  - id: CVE-2026-118540
    name: Unpublished variation disclosure
    description: JSON:API can expose unpublished variations of published products.
      Commerce 3.3.x is unaffected by this particular flaw.
  - id: CVE-2026-118541
    name: Cross-promotion coupon changes
    description: Users managing their own promotions can change other promotions’
      coupons when JSON:API or REST writes are enabled.
  - id: CVE-2026-118542
    name: Default-store access bypass
    description: Untrusted users with store creation or own-store edit permissions
      can change the default store and receive other orders.
  - id: CVE-2026-118543
    name: Commerce inbox CSRF
    description: A crafted page can trick a commerce administrator into dismissing
      shared notices, including security notifications.
  - id: CVE-2026-118544
    name: Variation field inference
    description: Repeated JSON:API queries can disclose fields on product variations
      the visitor cannot view.
fixed:
  - product: Commerce Core 3.x
    branch: "3"
    version: 3.3.13
  - product: Commerce Core 8.x-2.x
    version: 8.x-2.41
timeline:
  - date: Oct 28, 2026
    title: Six Commerce Core advisories and fixes published
    body: SA-CONTRIB-2026-254 confirms exploitation and recommends auditing orders.
checklist:
  - title: Upgrade the installed Commerce branch
    hint: Check composer show drupal/commerce and update to 3.3.13 or the
      Drupal-named 8.x-2.41 release. Deploy the updated lockfile and verify the
      running version; updating Drupal core alone does not patch this module.
  - title: Audit orders and API permissions
    hint: Follow SA-CONTRIB-2026-254’s order audit. Compare unexpected order changes
      with your payment and fulfillment records. Review JSON:API/REST write
      access, store permissions and unpublished product variations; these
      prerequisites differ across the other advisories.
sources:
  - name: Drupal SA-CONTRIB-2026-254
    url: https://www.drupal.org/sa-contrib-2026-254
    primary: true
  - name: Drupal SA-CONTRIB-2026-255
    url: https://www.drupal.org/sa-contrib-2026-255
    primary: true
  - name: Drupal SA-CONTRIB-2026-256
    url: https://www.drupal.org/sa-contrib-2026-256
    primary: true
  - name: Drupal SA-CONTRIB-2026-257
    url: https://www.drupal.org/sa-contrib-2026-257
    primary: true
  - name: Drupal SA-CONTRIB-2026-258
    url: https://www.drupal.org/sa-contrib-2026-258
    primary: true
  - name: Drupal SA-CONTRIB-2026-259
    url: https://www.drupal.org/sa-contrib-2026-259
    primary: true
---

The exploited flaw affects Commerce Core, not Drupal core. It is grouped with the five sibling advisories from the same release batch. No victim count or published static indicators are provided. L4 reflects confirmed exploitation; the other issues have different permissions and configuration prerequisites.
