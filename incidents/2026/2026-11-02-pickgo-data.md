---
title: PickGo supplier intrusion exposes 7NOW and Demae-can delivery records
level: 4
date: '2026-11-02'
updated: '2026-11-04'
tags:
- PickGo
- 7NOW
- data breach
summary: PickGo’s intrusion exposed 7NOW records (164,180 names; 4,762 name/address; 209 also phone/postcode) and Demae-can records (799 names; 794 addresses; 33 phone/postcode). Counts are not unique people. 7NOW operates; Demae-can restored its integration. Wider customer/driver scope remains under investigation.
splash: PickGo customers/drivers potentially affected; confirmed 7NOW and Demae-can delivery records in Japan
wipe: Verify notices through 7NOW or CBcloud, reject delivery-themed scams, and ask which fields were affected
inTheWild: 'yes'
inTheWildNote: CBcloud confirms intrusion; Seven-Eleven confirms delivery records were taken.
cves: []
fixed: []
timeline:
- date: Nov 1, 2026
  title: CBcloud detects unauthorized access
  body: The company blocks access, disables misused accounts and fixes the exploited defect.
- date: Nov 2, 2026
  title: PickGo business-service incident disclosed
  body: Customer and partner-driver information may have leaked; scope and counts are still being investigated.
- date: Nov 2, 2026
  title: Demae-can suspends then restores its CBcloud integration
  body: The later company notice says integration resumed after confirmation of the exploited-defect fix and its own communication checks. Bare local times are not converted.
- date: Nov 3, 2026
  title: Seven-Eleven confirms affected 7NOW delivery records
  body: Three field-specific record categories are disclosed; some order details were also taken. 7NOW continues operating.
- date: Nov 3, 2026
  title: Demae-can confirms its delivery-record exposure
  body: 799 name records, 794 address records and 33 phone/postcode records are reported separately; email notifications and a regulator report are announced.
- date: Nov 3, 2026
  title: CBcloud defines the wider possible customer and driver data scope
  body: Its second report lists maximum possible fields, varying by company, excludes payment information and login passwords, and says domestic access remains available while some overseas access is restricted. No supplier-wide count is given.
checklist:
- title: Confirm your own affected delivery fields
  hint: Use the existing 7NOW app or known company website to contact 7NOW/CBcloud. Seven-Eleven says affected recipients will be notified progressively by SMS to their registered number. Ask which records/fields concern you; do not add the three categories as deduplicated people. Demae-can says it will notify affected customers progressively at their registered email address; use its known service channel to ask about your records.
- title: Check business and driver records against the expanded field list
  hint: Ask CBcloud through its known support channel which registration, order and assigned-driver fields concern you. The second report lists possible driver contact details, vehicle number, delivery-time location and vehicle/profile image URLs; those URLs expire five minutes after issuance. This is the maximum possible scope, not confirmation every field was taken.
- title: Treat delivery-specific contact cautiously
  hint: 'Names, delivery addresses, some phone/postcode data and order details can make impersonation convincing. CBcloud warns against unexpected email, SMS and calls: do not follow their URLs or supply personal data; verify through a known company channel even when the sender knows an order.'
- title: Check service restrictions without assuming a full outage
  hint: CBcloud restricted some functions and access from outside Japan after blocking the attacker and fixing the exploited defect. Seven-Eleven says 7NOW operates normally. Business users should confirm their own PickGo integration/operating limits through CBcloud support; no customer patch or restoration deadline is published. The second report says access from within Japan remains available as before, with some restrictions on access from outside Japan. Demae-can says its own connection was restored on November 2 after checks; this does not establish recovery of every PickGo customer.
sources:
- name: CBcloud first PickGo incident notice
  url: https://cb-cloud.com/news/AJZDw0h3
  primary: true
  says: Full publication text decoded from the public HTML article payload; publishedAt November 2. Confirms business-service intrusion, containment actions, possible customer/driver leakage and restrictions. Browser/web text view was blank.
- name: Seven-Eleven Japan November 3 original notice
  url: https://www.sej.co.jp/company/important/185116.html
  primary: true
  says: Confirms 7NOW field-specific records acquired, excludes card/login credentials, reports normal operation and no confirmed secondary misuse, SMS notices and regulator report.
- name: Demae-can November 3 original notice
  url: https://corporate.demae-can.co.jp/pr/info/20261103.html
  primary: true
  says: Confirms field-specific delivery records, additional order data, integration suspension/restoration, email notices and regulator report; no confirmed secondary misuse.
- name: CBcloud second PickGo incident notice
  url: https://cb-cloud.com/news/MC7mDLUO
  primary: true
  says: November 3 original article decoded from its public HTML payload. Maximum possible customer/order/driver fields vary by company; no payment information or login passwords taken; domestic access available, some overseas restrictions.
---

CBcloud detected unauthorized access to PickGo’s business service on November 1 and published its first notice on November 2. It disabled misused accounts, blocked attacker communication and fixed the exploited defect, without identifying a CVE or entry mechanism. Broader customer/partner-driver leakage is possible and still being scoped; the company says it found no malware contamination.

Seven-Eleven Japan’s November 3 notice confirms 7NOW recipient data was acquired: 164,180 records containing kana names, 4,762 with kana names and addresses, and 209 with names, addresses, phone numbers and postcodes. The notice does not establish whether categories overlap or provide a deduplicated person count, so no combined total is claimed. Some order dates, store names/addresses and item names were also obtained. Seven-Eleven says card data and login IDs/passwords were not leaked, and its authentication information/integration settings were not found exposed or altered.

7NOW continues to operate normally; this is a supplier incident, not confirmed intrusion into Seven-Eleven’s own systems. No secondary misuse was confirmed at the notice date. Seven-Eleven says it reported the matter to Japan’s Personal Information Protection Commission and will notify affected recipients by SMS. CBcloud’s wider restrictions do not mean every delivery service is offline. The confirmed large record exposure supports L4.


**Demae-can update:** Its November 3 original confirms 799 recipient-name records, 794 addresses through street number, and 33 phone/postcode records; these are field categories, not an additive or unique-person total. Some store names, store addresses/phones, order notes, item names and fee details were also acquired. It excludes credit-card data and login IDs/passwords, reports no identified exposure/alteration of its authentication or integration configuration, and no confirmed secondary misuse. It reported to Japan’s Personal Information Protection Commission and will notify registered emails. Its CBcloud connection was paused and restored on November 2 after defect-fix confirmation and communication checks; no timezone is supplied for the hours. These figures are separate from 7NOW and cannot establish supplier-wide totals or intrusion into either customer’s own systems.

**CBcloud second report:** The November 3 notice defines the maximum possible scope, varying by company: company name; registered contact name, address, phone and email; order ID and amount; collection/delivery location names, addresses and contact names/phones; and assigned-driver names, phones, emails, vehicle numbers, delivery-time locations and URLs for vehicle/profile images. The company says image URLs become inaccessible five minutes after issuance. It excludes bank-account/card payment information and login passwords. These possible supplier-held fields do not replace the separately confirmed 7NOW/Demae-can figures or establish a supplier-wide count. Domestic access remains available as before, with some overseas-access restrictions; this does not imply every integration or every function has recovered.
