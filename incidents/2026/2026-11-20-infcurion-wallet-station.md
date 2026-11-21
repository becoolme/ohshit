---
title: Infcurion confirms Wallet Station intrusion and personal-data theft
level: 4
date: '2026-11-20'
tags:
- Data breach
- Payments
summary: Infcurion’s second Wallet Station notice reports up to approximately 250,000 leaked personal-information records, including passwords, account information and transaction history. Affected providers remain suspended; emergency checks may interrupt other providers too.
splash: Customers and merchants in affected Wallet Station services; up to approximately 250,000 personal-information records.
wipe: Check your provider’s notice, address exposed or reused passwords through trusted channels, and track emergency inspections and restoration.
inTheWild: 'yes'
inTheWildNote: Infcurion confirms unauthorized access and external disclosure of customer information.
timeline:
- date: Nov 19, 2026
  title: Infcurion detects unauthorized access
  body: The company says it confirmed access on November 19 and implemented containment measures through November 20.
- date: Nov 20, 2026
  title: Company publishes its first breach notice
  body: It confirms personal information left the system and reports blocking suspicious communications, stopping affected functions and pausing service for affected providers.
- date: Nov 20, 2026
  title: Second report quantifies the leak and expands emergency inspections
  body: Infcurion reports up to approximately 250,000 personal-information records, lists leaked fields and says emergency patches and access-route blocking were applied. Other providers will undergo checks by agreement; interruption duration and service restart remain undetermined.
checklist:
- title: Verify which service and notice apply to you
  hint: Check Infcurion’s second report and your Wallet Station provider’s official notice. The reported maximum is personal-information records, not a verified count of unique people. A complete provider list and individual exposure are not published; ask your provider which fields apply to you.
- title: Address password exposure through trusted channels
  hint: The second report lists passwords but does not state their storage format or mandate a universal reset. As a general precaution, use your provider’s verified reset instructions; if you reused that password elsewhere, change it there to a unique one. Monitor linked accounts and transaction records for anomalies and report them through established provider support. Do not use reset links in unsolicited messages.
- title: Avoid incident-themed phishing
  hint: Do not respond to unexpected calls, email or SMS, follow their URLs or enter PINs or passwords. Infcurion says it and providers will not ask for passwords by phone or email. Navigate independently to your provider’s established support channel to verify a message.
- title: Wait for a verified service-restoration notice
  hint: Affected providers’ services are stopped. Emergency inspections agreed with other providers may also cause downtime of undetermined duration. Infcurion gives no restart date; security measures, safety confirmation and provider consultation are prerequisites. Use approved alternatives and follow your provider’s official restoration instructions.
sources:
- name: Infcurion November 20 original issuer filing
  url: https://kabuyoho-sls-disclose.ifis.co.jp/9f3/140120261120583076.pdf
  primary: true
  says: Confirms Wallet Station intrusion and customer-information theft, containment and affected-provider suspension, no observed resulting misuse, and customer phishing guidance.
- name: Infcurion November 20 second issuer filing
  url: https://kabuyoho-sls-disclose.ifis.co.jp/d21/140120261120584369.pdf
  primary: true
  says: Full two-page original gives the approximate record maximum and four data categories; confirms emergency patches and planned checks at other providers, with no confirmed misuse or restart date.
updated: '2026-11-21'
---

Infcurion’s first notice confirmed intrusion and theft of personal information without quantifying the leak. Its November 20 second report now puts the maximum at approximately 250,000 personal-information records. This is not a deduplicated count of people, nor a financial-loss estimate.

The second report lists customer names, birth dates, phone numbers, sex, email addresses and passwords; payment-related account information, points balances and local-points balances; transaction dates/times, store names and transaction amounts; and merchant names and phone numbers. The password storage format and individual exposure are not specified. Scope remains under investigation.

The company says it detected heavy access on the night of November 19, blocked attack-source communications, applied emergency vulnerability patches, blocked the access route and stopped service for affected providers. No new unauthorized access has been observed since blocking, according to the company. The notice does not identify a CVE, publish indicators or a deployable patch version, or establish that every provider was compromised.

Other providers will also undergo emergency inspections after consultation, potentially causing interruptions of undetermined duration. Restoration still requires security measures, safety confirmation and agreement with providers, with no restart date. The company says affected providers have been individually informed; this does not establish that every affected customer has been notified. No resulting misuse has been observed at the time of the notice, which does not negate the confirmed data theft.

The newly disclosed scale and sensitive fields warrant L4. This incident remains distinct from [Infcurion’s downstream Notion AI exposure through Fireworks](/incidents/fireworks-cloud-customer-data/); that earlier exclusion of Infcurion-operated services does not cover this intrusion. The notices do not establish a shared attacker or entry path.
