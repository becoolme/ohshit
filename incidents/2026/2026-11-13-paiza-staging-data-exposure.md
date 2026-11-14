---
title: Paiza says a staging access gap put up to 902,576 records at risk
summary: Paiza says its staging environment used a fixed access password and could be reached externally by former staff or others who previously had access. Up to 902,576 records were reachable before Paiza restricted network access. Paiza has not confirmed data exfiltration.
splash: Paiza users and business contacts whose data was copied into the staging environment between 2013 and August 13, 2026.
wipe: Verify any notice with Paiza and watch for phishing using profile or recruitment details. Restrict staging access and review offboarding.
tags:
- Data exposure
- Staging
- Japan
date: '2026-11-13'
level: 3
inTheWild: unknown
timeline:
- date: Jul 17, 2026
  title: Paiza investigates after an inquiry from authorities
  body: The company finds an access-control gap in its staging environment. It dates exposure to the period from setup in 2013 until the August access restriction.
- date: Aug 13, 2026
  title: Paiza restricts access to internal routes
  body: Paiza says it completed the network change and subsequently revised internal security guidance.
- date: Nov 13, 2026
  title: Paiza discloses the exposure
  body: The company reports up to 902,576 externally reachable records and says it has sent notices to potentially affected people whose contact details it holds.
checklist:
- title: Verify your notice and watch for targeted contact
  hint: Reach Paiza through a known official channel or privacy-contact@paiza.co.jp. Confirm unexpected recruitment or training messages before sharing credentials or personal data.
- title: Check staging credentials, network access and data copies
  hint: If you operate a similar environment, rotate long-lived shared credentials, remove former staff access, restrict network entry to authorized internal routes, audit access logs and verify masking on each class of production data before copying it again.
sources:
- name: Paiza’s November 13 notice
  says: Details the access gap, possible scope, network change, notification and follow-up measures.
  url: https://www.paiza.co.jp/news/20261113/access-management-notice/
  primary: true
---

Paiza copied production data into its test environment after applying masking to fields including names, home addresses, phone numbers, primary email addresses and passwords. It identified periods when some fields were not masked. The potentially reachable dataset includes identifiers such as GitHub IDs, profile and skills assessment data, recruitment activity, some contact addresses and business contacts. Paiza gives affected periods by field in its notice.

The company gives a maximum number of records, with no confirmed exfiltration or downstream misuse. It says it will strengthen offboarding, revisit masking standards and conduct regular security assessments.
