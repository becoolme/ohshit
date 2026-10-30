---
title: Hana-cupid discloses a member-data breach potentially affecting 4.24 million records
level: 4
date: 2026-10-28
tags: [Hana-cupid, data breach, credentials]
summary: Hana-cupid confirms member-data leakage. Up to 4,238,242 records may be affected, including login IDs, email addresses and protected passwords. Payment details are excluded.
splash: Internet Hana-cupid and Business Hana-cupid members registered directly with an email address
wipe: Reset your password through the official site, replace reused passwords elsewhere and watch for phishing
inTheWild: yes
inTheWildNote: The operator confirms unauthorized access and data leakage.
cves: []
fixed: []
timeline:
  - date: Oct 14–15, 2026
    title: Unauthorized access occurs
  - date: Oct 19, 2026
    title: Investigation confirms leakage
  - date: Oct 28, 2026
    title: Public notice and customer notifications begin
checklist:
  - title: Check your membership and reset your password
    hint: Use the account-recovery page from your official i879.com bookmark. The notice excludes external marketplace, telephone-only and member-florist purchases without direct email registration.
  - title: Replace reused passwords and reject suspicious messages
    hint: Give every account a unique password. Open the official site yourself instead of following unexpected email links; never provide passwords or authentication codes to an unsolicited contact.
sources:
  - name: Hana-cupid breach notice and FAQ
    url: https://www.hana-cupid.co.jp/news/news/20261028/index.html
    primary: true
    says: Confirms leakage; the published count is potentially affected records, not independently verified unique victims.
---

The operator says passwords were stored irreversibly, but does not identify the algorithm or parameters. It recommends password changes and reports no confirmed secondary misuse. Names, addresses, phone numbers and card data are excluded. Attack paths were blocked; investigation continues. L4 reflects the scale of the credential-data exposure.
