---
title: CAPCOM ID breach exposes 11,774,247 email and account-metadata records
level: 4
date: 2026-10-22
tags:
- Capcom
- breach
- accounts
ecosystems:
- capcom
summary: Capcom confirms 11,774,247 exposed email and account-metadata records. Within that total, 43 records include additional profile data and 196 accounts had passwords changed without authorization. A follow-up confirms e-Capcom store data exposure for 19 of those 196 accounts in Japan.
splash: CAPCOM ID members worldwide; record count is not a verified count of unique people
wipe: Watch for phishing; review account access and use official support for unexpected changes
inTheWild: 'yes'
inTheWildNote: Capcom confirms unauthorized access and password changes
timeline:
- date: Oct 19, 2026
  title: Intrusion detected and confirmed
- date: Oct 20, 2026
  title: Data exposure and unauthorized password changes confirmed
- date: Oct 21, 2026
  title: Police and privacy regulator notified
- date: Oct 22, 2026
  title: Public disclosure
- date: Oct 23, 2026
  title: Capcom confirms e-Capcom store exposure
  body: Store account pages were accessed for 19 of the 196 accounts with unauthorized password changes. Capcom says it completed its scope investigation and will continue monitoring.
checklist:
- title: Avoid links and attachments in unexpected Capcom messages
  hint: Verify messages through the known site or app. Knowledge of your name or order does not authenticate a sender.
- title: Review CAPCOM ID access and contact official support about changes
  hint: Sign in through the known entry point and review profile details, orders and shipping addresses. Report unexpected changes through the regional support channel in the notice.
- title: Follow affected-customer notifications through official channels
  hint: Retain any individual notice from Capcom and check which data fields apply to you. Watch for messages or calls impersonating store support.
sources:
- name: Capcom disclosure (Japanese original)
  url: https://www.capcom.co.jp/ir/news/html/261022.html
  primary: true
- name: Capcom official English translation
  url: https://www.capcom.co.jp/ir/english/news/html/e261022.html
  primary: true
- name: Capcom second notice (Japanese original)
  url: https://www.capcom.co.jp/ir/news/html/261023.html
  primary: true
  says: Confirms the store data fields for 19 accounts, individual notifications and completion of the scope investigation.
updated: '2026-11-07'
---

**L4:** a confirmed mass disclosure. Metadata includes account creation, last login, login count and last-login IP. The 43 additional profiles include birth date, gender, country/region and nickname; both smaller groups are subsets, not extra victims.

Capcom reset the 196 changed passwords. It has not confirmed leakage of customers' original passwords; credit-card data was excluded. Services remain available. The attack method was addressed but not publicly described, and affected customers will be contacted.

On October 23, Capcom confirmed that e-Capcom store account pages were accessed for 19 of those 196 accounts, all in Japan. Exposed fields include names and phonetic spellings, phone numbers, postcodes, addresses, gender, dates of birth, purchase histories, support inquiry histories and members’ address books. Capcom excluded credit-card data and found no additional disclosure in the other accounts due to the unauthorized password changes. The 19 accounts are a subset of the 196. Capcom says it finished its scope investigation, will continue monitoring related services and will contact affected customers individually.
