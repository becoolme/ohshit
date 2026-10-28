---
title: JAL and JTA disclose external access to about 92,000 customers’ Amadeus reservation records
level: 4
date: 2026-10-28
tags:
- aviation
- third party
- data exposure
summary: JAL/JTA report traces of external access affecting about 92,000 customers in Amadeus. About 2,000 customers also had additional fields such as passport/contact details accessed. The airlines report no card-number/password compromise, confirmed misuse or flight disruption.
splash: Some JAL/JTA reservation records in Amadeus; access method and attacker are undisclosed
wipe: Watch for impersonation; use verified airline contacts and individual notices to assess your exposure
inTheWild: n/a
inTheWildNote: Confirmed unauthorized access; no specific software vulnerability disclosed.
timeline:
- date: Oct 23, 2026
  title: Amadeus informs the airlines
- date: Oct 28, 2026
  title: JAL and JTA publish the affected scope
- date: Oct 29, 2026 (scheduled)
  title: Dedicated inquiry desk opens
checklist:
- title: Check individual notices through verified channels
  hint: The airlines will contact affected customers. Open the official notice directly; the stated access-trace period is August 10, 2023–September 23, 2026, not a rule that every flight in that period is affected.
- title: Treat reservation-themed contacts cautiously
  hint: Verify unexpected emails, calls and websites through known JAL/JTA channels, especially if they quote your booking details. The notice says no credit card numbers or passwords were compromised.
- title: Use the dedicated inquiry desk once open
  hint: 'From October 29: Japan 0120-25-6050 or 03-4332-7280; overseas +81-3-4332-7280. Hours are 10:00–17:00 JST on weekdays excluding Japanese national holidays.'
sources:
- name: JAL/JTA official disclosure
  url: https://www.jal.co.jp/ja-jp/news/general/2026/other/261028.html?inbound=ar
  primary: true
  says: 'October 28 notice: affected fields, approximate populations, access-trace window, containment and customer contact.'
---

The vendor-confirmed total separates about 90,000 customers with booking code, name, flight date, sector and class from about 2,000 with additional fields such as email, phone, passport number, nationality, frequent-flyer number, airline, flight/ticket number and seat. It is not 92,000 passport records. L4 reflects the scale of personal-data exposure. Amadeus has completed security measures; the notice does not identify a root cause or establish ongoing access.
