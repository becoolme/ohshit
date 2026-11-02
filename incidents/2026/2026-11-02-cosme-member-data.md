---
title: '@cosme confirms a leak of about 3 million members’ personal details'
level: 4
date: '2026-11-02'
tags:
- data breach
- Japan
- consumer accounts
summary: istyle says unauthorized access to @cosme exposed about 3 million members’ details, including addresses, birth dates and skin/hair types. It says passwords and credit-card data were not included. Former members can be affected; individual notifications are expected to finish on November 6 while investigation continues.
splash: '@cosme Common ID members at the time of unauthorized access, including people who have since left'
wipe: Check official notices and beware targeted email, SMS and calls; use the published support address for questions
inTheWild: 'yes'
inTheWildNote: istyle confirms unauthorized access and member information leakage.
timeline:
- date: Oct 28, 2026
  title: istyle confirms that member details leaked through unauthorized access
- date: Nov 2, 2026
  title: Public notice describes about 3 million affected people and ongoing investigation
- date: Nov 6, 2026 (scheduled)
  title: Individual notifications expected to finish
checklist:
- title: Check the notice even if you left @cosme
  hint: Read the notice through your usual @cosme website or app. istyle includes people who were members when the unauthorized access occurred and says it will use retained contact details; notification is planned to finish November 6, not already complete.
- title: Treat messages using leaked details cautiously
  hint: Do not open suspicious links or enter personal information in response to unsolicited email, SMS or calls. istyle says its notification emails come from cosme.net and never request passwords or credit-card information. A familiar name or sender domain alone does not authenticate a message.
- title: Use the published incident support route
  hint: 'For questions, use security-support@cosme.net from the original notice and check spam filtering for replies. Monitor official updates: the cause and full scope remain under investigation, and no observed misuse does not guarantee none will occur.'
sources:
- name: istyle original November 2 notice
  url: https://www.istyle.co.jp/news/info/2026/11/1102.html
  primary: true
- name: '@cosme original customer notice'
  url: https://www.cosme.net/help/info/id/17117
  primary: true
cves: []
fixed: []
---

The exposed fields listed by istyle are an automatically assigned user ID (not the login identifier), nickname, names in kanji/kana, postal code, address, phone number, email, gender, birth date, skin type and hair type. Not every field is necessarily present for every person. The company says login passwords and credit-card data are excluded and that no resulting misuse is known to it so far.

istyle has reported to Japan’s Personal Information Protection Commission and is investigating the cause and scope with an outside security company. It has not published an entry point or a complete exposure interval. Detection on October 28 is distinct from the November 2 public notice; this is a confirmed large personal-data leak, not evidence of payment-card theft.
