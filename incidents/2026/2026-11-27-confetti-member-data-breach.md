---
title: Confetti confirms member-data breach; former members and some card-member passwords in scope
level: 4
date: 2026-11-27
tags: [data breach, ticketing, Japan]
ecosystems: [confetti]
summary: Confetti’s operator confirms member information leaked after unauthorized server access. Potential exposure includes former members, partial card details for some members and passwords for some Confetti Card members. Counts and full scope remain under investigation; password storage format is unspecified.
splash: Current and former Confetti members; payment fields and Confetti Card passwords affect subsets
wipe: Follow operator notices, watch for impersonation and protect any reused password as a precaution
inTheWild: 'yes'
inTheWildNote: Operator confirms unauthorized server access and member information leaving its systems.
timeline:
- date: Nov 26, 2026
  title: Suspicious access detected and investigation begins
  body: After detecting suspicious access, the operator found indications that a third party may have obtained member data later that day.
- date: Nov 27, 2026
  title: Operator confirms information outflow and publishes an initial scope
  body: Longrun Planning says it is switching affected servers and taking measures against the vulnerability used for access. Individual notifications will follow as findings are confirmed; counts and full impact remain under investigation.
checklist:
- title: Check exposure even if you have left Confetti
  hint: The notice includes former members. Read Longrun Planning’s original notice and subsequent updates, and contact its personal-information desk at otoiawase@confetti-web.com to clarify your registered data and notification status. Individual notifications are planned in sequence, not confirmed complete.
- title: Protect reused passwords as a precaution
  hint: Passwords are listed only for some Confetti Card members; the notice does not say whether they were hashed or plaintext. If you reused that password elsewhere, change it on those services through trusted bookmarks. Follow official instructions for Confetti access and resets; no mandatory mass reset is announced.
- title: Treat payment and identity requests with caution
  hint: Do not provide passwords, card numbers or PINs in response to unsolicited email, SMS or calls; the operator says it will not ask for these by email or phone. As a precaution, check card statements and contact the issuer through an established channel if you suspect misuse. The notice lists partial card numbers and other card fields for some members, not confirmed exposure of full card numbers or PINs.
- title: Verify follow-up remediation before relying on recovery
  hint: Track the original incident page for the server change, vulnerability measures and additional customer actions. These are reported as ongoing; the initial notice gives no CVE, fixed version, detailed exploit prerequisite or completed recovery claim. Avoid unsolicited recovery or refund links.
sources:
- name: Longrun Planning November 27 initial Confetti incident notice
  url: https://longrun.biz/important/1122/
  primary: true
  says: Confirms unauthorized access and member-data outflow, separates broad member information from subset payment/password fields, and describes investigation, server changes, vulnerability measures and planned individual notices.
---

Longrun Planning, which operates the Japanese ticket service Confetti, confirms that a third party accessed its server and member information flowed outside the company. The November 27 initial notice says suspicious access was discovered on November 26. The entry point and authentication requirements are not explained, although the operator says it is taking measures against the vulnerability used for access.

The notice combines information **confirmed to have leaked or potentially leaked**. Its broad member-information category covers **all members, including former members**: email addresses, login IDs, names, names in kana, telephone numbers, postal codes and dates of birth. For **some members**, it lists addresses, gender, partial credit-card numbers, card brands, expiry dates and cardholder names. For **some Confetti Card members**, it additionally lists passwords. The fields involved depend on each customer’s registered information. These are separate scope groups; neither the subset payment data nor the passwords should be generalized to every member.

The number of affected people or records, the final affected-customer scope and impact on information beyond the listed fields are still being checked. The notice does not identify the password storage format, confirm full card-number or PIN exposure, or quantify misuse. L4 reflects the confirmed intrusion and broad potential member-data scope, including payment and authentication fields; it is not a claim that every listed field for every member was stolen or that a published membership total equals the breach count.

The operator reports server switching and vulnerability countermeasures in progress, with individual notifications to follow confirmed findings. It has not published a CVE, safe software version, public attack indicators or a completed forensic or recovery report. Password reuse and card-statement checks above are precautionary recommendations, not a claim that the operator has ordered every customer to reset or replace a card. Further findings and customer instructions are to be published on the incident page or other official channels.
