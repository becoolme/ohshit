---
title: JAL/JTA and Cathay disclose unauthorized access to Amadeus reservation data
level: 4
date: 2026-10-28
updated: 2026-10-30
tags:
- aviation
- third party
- data exposure
summary: JAL/JTA report about 92,000 customers affected by Amadeus reservation-data access; about 2,000 had additional fields accessed. Cathay now reports around 53,000 affected bookings, a different unit that cannot be added to the customer count. No confirmed misuse or operational disruption is reported.
splash: Some JAL/JTA and Cathay records in Amadeus; Cathay reports misuse of a system-account login
wipe: Watch for impersonation; use verified airline contacts and individual notices to assess your exposure
inTheWild: n/a
inTheWildNote: Confirmed unauthorized access; no specific software vulnerability disclosed.
timeline:
- date: Oct 23, 2026
  title: Amadeus informs the airlines
- date: Oct 28, 2026
  title: JAL and JTA publish the affected scope
- date: Oct 29, 2026
  title: JAL/JTA dedicated inquiry desk opens
- date: Oct 30, 2026
  title: Cathay discloses its scope; JAL/JTA confirm customer notices sent
checklist:
- title: Check individual notices through verified channels
  hint: JAL/JTA say affected customers have been emailed. Open the official notice directly; the stated access-trace period is August 10, 2023–September 23, 2026, not a rule that every flight in that period is affected.
- title: Treat reservation-themed contacts cautiously
  hint: Verify unexpected emails, calls and websites through known JAL/JTA channels, especially if they quote your booking details. The notice says no credit card numbers or passwords were compromised.
- title: Use the JAL/JTA dedicated inquiry desk
  hint: 'From October 29: Japan 0120-25-6050 or 03-4332-7280; overseas +81-3-4332-7280. Hours are 10:00–17:00 JST on weekdays excluding Japanese national holidays.'
- title: Check Cathay notices separately
  hint: Read Cathay’s official October 30 notice through its website; individual notifications will follow once details are established. Use known Cathay contacts to verify unexpected requests quoting booking details.
sources:
- name: JAL/JTA official disclosure
  url: https://www.jal.co.jp/ja-jp/news/general/2026/other/261028.html?inbound=ar
  primary: true
  says: 'Originally disclosed October 28; October 30 revision confirms individual emails sent and the inquiry desk operating.'
- name: Cathay official Amadeus disclosure
  url: https://www.cathaypacific.com/cx/es_ES/latest-news/security-and-operational-changes/personal-data-security.html
  primary: true
  says: 'October 30: around 53,000 bookings, system-account credential access, containment and notifications.'
---

The vendor-confirmed total separates about 90,000 customers with booking code, name, flight date, sector and class from about 2,000 with additional fields such as email, phone, passport number, nationality, frequent-flyer number, airline, flight/ticket number and seat. It is not 92,000 passport records. L4 reflects the scale of personal-data exposure. Amadeus has completed security measures; the notice does not identify a root cause or establish ongoing access.

Cathay was informed on October 28 and received details on October 29. Its notice describes access between August 2023 and September 2026 using Amadeus system-account credentials. Most affected bookings exposed references, passenger names and flight details; a smaller subset potentially exposed contact details, travel-document or frequent-flyer numbers. There is no evidence of accessed payment information or data misuse. Amadeus reset a password and enhanced monitoring. Cathay’s systems and operations were unaffected. This expands the existing vendor event; it does not establish that every airline using Amadeus was affected.
