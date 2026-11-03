---
title: Nojima reports about seven million exposed member records and forces password resets
summary: Nojima confirms about seven million member records leaked from its online store and used-phone buyback site, excluding former members. Names, contacts, birth dates, gender, login IDs and passwords described as encrypted were exposed. The sites do not store credit-card data. Suspected affected accounts face forced password resets.
splash: Members of Nojima Online and its used-phone buyback site; about seven million records, not a verified unique-person count
wipe: Reset to a unique password through the known Nojima site; replace reused passwords elsewhere and watch for impersonation
inTheWildNote: Nojima confirms November 1 unauthorized access and member-data leakage.
timeline:
- date: Nov 1, 2026
  title: Unauthorized access detected and data leakage confirmed
- date: Nov 2, 2026
  title: Company publishes its notice covering about seven million records
  body: The two services are suspended; containment includes blocking external access, and regulatory reports are being prepared.
- date: Nov 3, 2026
  title: Forced password reset and reset procedure announced
checklist:
- title: Reset through the known official site
  hint: Navigate from Nojima Online to its password-reset page, enter your registered email and phone number, then use the resulting reset email. Choose a unique password; avoid unsolicited message links.
- title: Replace reused passwords on other services
  hint: The company describes passwords as encrypted without specifying an algorithm. As a precaution, change reused passwords, prioritizing email and important accounts, and enable available MFA.
- title: Watch for impersonation using exposed details
  hint: Names, addresses, phone numbers and birth dates can support targeted emails, SMS or calls. Avoid unverified links and attachments; verify through known official channels and retain suspicious messages.
sources:
- name: Nojima original incident notice (PDF)
  url: https://www.nojima.co.jp/wp-content/uploads/2026/11/fa47750556e505f2ddb83dc080a6420f.pdf
  primary: true
  says: 'November 2 notice: November 1 leakage, about seven million records and fields, exclusion of former members, no stored credit-card data, service suspension and investigation.'
- name: Nojima Online password-reset notice
  url: https://contents.online.nojima.co.jp/oshirase20261102/
  primary: true
  says: 'Updated November 3: forced resets for suspected affected users and the reset procedure.'
level: 4
date: '2026-11-02'
updated: '2026-11-03'
tags:
- Nojima
- data breach
- credentials
inTheWild: 'yes'
---

The full field list is names in kanji/kana, birth dates, gender, postal codes, addresses, phone numbers, login IDs, passwords described by the company as encrypted, and email addresses. The notice counts about seven million records and excludes former members; it does not establish a deduplicated victim count. Nojima says these two sites do not retain credit-card data, not that every financial service or system is unaffected.

The company is investigating cause, scope and subsequent misuse. It identifies no password-protection algorithm, exploited vulnerability or restoration deadline. Its November 2 notice says police were consulted and reports to the Personal Information Protection Commission and other bodies were being prepared, not already submitted. Await an official safety/reopening notice; the reset notice alone does not establish full service restoration. L4 reflects the company-confirmed mass data leakage.
