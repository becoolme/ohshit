---
title: PickGo intrusion exposes 7NOW delivery records through CBcloud
level: 4
date: '2026-11-02'
updated: '2026-11-03'
tags:
- PickGo
- 7NOW
- data breach
summary: 'CBcloud confirms intrusion into PickGo’s business service. Seven-Eleven Japan confirms 7NOW delivery data taken: 164,180 name-only records, 4,762 name/address records and 209 with phone/postcode too. Categories are not a unique-person total. 7NOW still operates; wider PickGo customer/driver exposure remains under investigation.'
splash: PickGo business customers/drivers potentially affected; confirmed 7NOW delivery-recipient records in Japan
wipe: Verify notices through 7NOW or CBcloud, reject delivery-themed scams, and ask which fields were affected
inTheWild: 'yes'
inTheWildNote: CBcloud confirms intrusion; Seven-Eleven confirms delivery records were taken.
cves: []
fixed: []
timeline:
- date: Nov 1, 2026
  title: CBcloud detects unauthorized access
  body: The company blocks access, disables misused accounts and fixes the exploited flaw.
- date: Nov 2, 2026
  title: PickGo business-service incident disclosed
  body: Customer and partner-driver information may have leaked; scope and counts are still being investigated.
- date: Nov 3, 2026
  title: Seven-Eleven confirms affected 7NOW delivery records
  body: Three field-specific record categories are disclosed; some order details were also taken. 7NOW continues operating.
checklist:
- title: Confirm your own affected delivery fields
  hint: Use the existing 7NOW app or known company website to contact 7NOW/CBcloud. Seven-Eleven says affected recipients will be notified progressively by SMS to their registered number. Ask which records/fields concern you; do not add the three categories as deduplicated people.
- title: Treat delivery-specific contact cautiously
  hint: 'Names, delivery addresses, some phone/postcode data and order details can make impersonation convincing. CBcloud warns against unexpected email, SMS and calls: do not follow their URLs or supply personal data; verify through a known company channel even when the sender knows an order.'
- title: Check service restrictions without assuming a full outage
  hint: CBcloud restricted some functions and access from outside Japan after blocking the attacker and fixing the exploited flaw. Seven-Eleven says 7NOW operates normally. Business users should confirm their own PickGo integration/operating limits through CBcloud support; no customer patch or restoration deadline is published.
sources:
- name: CBcloud first PickGo incident notice
  url: https://cb-cloud.com/news/AJZDw0h3
  primary: true
  says: Full publication text decoded from the public HTML article payload; publishedAt November 2. Confirms business-service intrusion, containment actions, possible customer/driver leakage and restrictions. Browser/web text view was blank.
- name: Seven-Eleven Japan November 3 original notice
  url: https://www.sej.co.jp/company/important/185116.html
  primary: true
  says: Confirms 7NOW field-specific records acquired, excludes card/login credentials, reports normal operation and no confirmed secondary misuse, SMS notices and regulator report.
---

CBcloud detected unauthorized access to PickGo’s business service on November 1 and published its first notice on November 2. It disabled misused accounts, blocked attacker communication and fixed the exploited flaw, without identifying a CVE or entry mechanism. Broader customer/partner-driver leakage is possible and still being scoped; the company says it found no malware contamination.

Seven-Eleven Japan’s November 3 notice confirms 7NOW recipient data was acquired: 164,180 records containing kana names, 4,762 with kana names and addresses, and 209 with names, addresses, phone numbers and postcodes. The notice does not establish whether categories overlap or provide a deduplicated person count, so no combined total is claimed. Some order dates, store names/addresses and item names were also obtained. Seven-Eleven says card data and login IDs/passwords were not leaked, and its authentication information/integration settings were not found exposed or altered.

7NOW continues to operate normally; this is a supplier incident, not confirmed intrusion into Seven-Eleven’s own systems. No secondary misuse was confirmed at the notice date. Seven-Eleven says it reported the matter to Japan’s Personal Information Protection Commission and will notify affected recipients by SMS. CBcloud’s wider restrictions do not mean every delivery service is offline. The confirmed large record exposure supports L4.
