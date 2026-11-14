---
title: Keisei Railway investigates possible exposure of up to 3.37 million Skyliner records
date: '2026-11-13'
level: 4
inTheWild: 'yes'
tags:
- Data breach
- Personal information
summary: Keisei Electric Railway confirmed unauthorized access to the Skyliner seat reservation system. Up to about 3.37 million Ticketless customer records may have been obtained.
splash: Skyliner Ticketless customers and passengers with tickets affected by the reservation shutdown.
wipe: Change any reused Skyliner password and verify incident notices through Keisei. Check station procedures if you already paid.
inTheWildNote: Keisei confirmed unauthorized access. Acquisition of customer records remains possible.
timeline:
- date: Nov 11, 2026
  title: Unauthorized access to reservation system
  body: Keisei places the incident late on November 11 in Japan.
- date: Nov 12, 2026
  title: Keisei announces ticketing suspension
  body: The company publishes station instructions for customers who already paid.
- date: Nov 13, 2026
  title: Keisei announces possible data exposure
  body: The operator says it has suspended the seat reservation system and will notify affected customers individually by email.
checklist:
- title: Replace reused passwords
  hint: If you used your Skyliner password on other services, replace it there now and enable multi-factor authentication where available. Reset the Skyliner password through the official service when it reopens.
- title: Verify messages and contact Keisei directly
  hint: Use the notice on Keisei’s website or call its incident desk at 090-3248-4609. Avoid links requesting passwords or payment details in unexpected refund notices.
- title: Check ticket and refund instructions
  hint: For paid Ticketless or face-recognition Skyliner tickets, the November 12 notice says to buy a replacement at a ticket window or machine and tell station staff about the earlier purchase. Keisei said it would process refunds later, and said credit card refunds may take time to appear.
sources:
- name: Keisei incident notice
  says: Confirms unauthorized access, gives the upper bound and lists the potentially exposed fields.
  url: https://new-www.keisei.co.jp/cms/files/keisei/MASTER/0110/zDQUntkx.pdf
  primary: true
- name: Keisei ticketing notice in English
  says: Lists suspended services and instructions for passengers who already paid.
  url: https://www.keisei.co.jp/cms/files/keisei/MASTER/0510/85T6hvQT.pdf
  primary: true
---

The possibly affected fields are user IDs, passwords, names in kana, phone numbers and email addresses. Keisei describes the passwords as encrypted but gives no storage details. The estimate is an upper bound on records. Keisei has not published a confirmed extraction count or the entry point. Station windows and ticket machines continue selling Skyliner tickets.
