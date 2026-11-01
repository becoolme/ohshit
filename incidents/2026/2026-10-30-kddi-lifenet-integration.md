---
title: KDDI and Lifenet report possible customer-data exposure through a linked system
level: 4
date: '2026-10-30'
tags:
- KDDI
- Lifenet
- data breach
summary: KDDI and Lifenet confirm unauthorized access through their linked system. Six categories total 22,541 potentially exposed records, not a verified unique-person count. Passwords, payment details and insurance-contract data are excluded by the joint notice.
splash: KDDI customer records reachable through Lifenet’s integration; exposed fields differ by record
wipe: Check your individual notice and reject requests for passwords or PINs; use the contact routes in the joint advisory
inTheWild: 'yes'
inTheWildNote: Unauthorized access confirmed; data theft and misuse remain unconfirmed.
cves: []
fixed: []
timeline:
- date: Oct 23, 2026
  title: Lifenet detects unauthorized access and alerts KDDI
- date: Oct 24, 2026
  title: KDDI blocks the integration access route
- date: Oct 30, 2026
  title: Joint notice details possible exposure and customer notifications
checklist:
- title: Check the fields in your own notification
  hint: Use the contact details in the joint PDF to confirm whether your record is affected; the six categories contain different combinations of names, postal codes, phone numbers, emails and member identifiers. Some may also include sex or date of birth.
- title: Reject personalized phishing and credential requests
  hint: The companies warn about suspicious email, SMS and calls to exposed contact details and say they will not ask for passwords or PINs. Verify any request through an established KDDI or Lifenet channel rather than replying to the message.
sources:
- name: KDDI and Lifenet joint notice
  url: https://newsroom.kddi.com/news/assets/2026/kddi_nr_s-82_4796/kddi_nr_s-82_4796_pdf_01.pdf
  primary: true
  says: Full two-page October30 notice, including six record categories, exclusions and customer guidance.
---

The notice identifies a weakness in a Lifenet integration function; it supplies no CVE or public patch. The six counts are 4,524, 226, 8,434, 3,662, 4,888 and 807. The companies report no secondary misuse so far and exclude identity-document data, other Lifenet systems and KDDI communications infrastructure. Some au life-insurance functions, including applications, remain under maintenance.
