---
title: Mirae Asset Securities confirms customer account numbers and workforce data leaked
level: 4
date: 2026-11-07
tags: [Mirae Asset Securities, Brokerage, Data breach]
summary: Mirae Asset Securities confirmed the exposure of account numbers for about 3,800 customers and personal data for about 35,255 current and former staff and contractors. The broker shut down the affected mobile-web login service and isolated the groupware server. Both entry paths remain under investigation.
splash: About 3,800 customers and 35,255 staff, former staff and contractors of South Korea’s Mirae Asset Securities.
wipe: Change your brokerage login password on the official site and review activity in MAPS. Verify workforce requests through known contacts.
inTheWild: 'yes'
inTheWildNote: The broker confirms external attacks and data leakage from two services.
timeline:
  - date: Nov 4, 2026
    title: External access targets the mobile-web login service
    body: The broker reports abnormal access to its phone-verification login flow and says the only exposed customer field was the brokerage account number.
  - date: Nov 5, 2026
    title: External attack targets the mi-global groupware
    body: The broker confirms workforce data leaked and says it disconnected the affected server after discovering the incident.
  - date: Nov 7, 2026
    title: The broker publishes separate customer and workforce notices
    body: The notices identify the affected groups and data fields, describe containment and give reporting instructions.
checklist:
  - title: Change your brokerage login password and check account activity
    hint: Open the official Mirae Asset Securities site directly and change your Cyber ID password. In the official MAPS app, check recent orders, executions, deposits, withdrawals and transfers. Report an unrecognized transaction or disclosed authentication information promptly via the official notice. The notice lists the regular hotline at 1588-6800, weekdays 08:00–18:00 Korea time from November 9 after the temporary November 7 desk.
  - title: Verify workforce requests through known contacts
    hint: Confirm work requests using contact details you already had. Skip suspicious links, attachments and software. Keep passwords and verification codes private. For groupware exposure details, contact the broker through the channels in the workforce notice. Report suspicious contact or harm to 1588-6800. If you reused a potentially exposed password, replace it on the other services with unique passwords.
  - title: Verify the sender before acting on an account message
    hint: A caller or message may quote your account number, name or employee ID. Go directly to the broker’s website or app. Keep your password, OTP and SMS verification code private. The two notices also point affected people to Korea’s Personal Information Dispute Mediation Committee at kopico.go.kr or 1833-6972 for dispute mediation.
sources:
  - name: Mirae Asset Securities customer breach notice
    url: https://trading.securities.miraeasset.com/bbs/board/message/view.do?categoryId=66&messageCategoryId=0&messageId=2344058&messageNumber=442
    primary: true
    says: Confirms the mobile-web login incident, about 3,800 affected customers, the account-number-only scope and steps for customers.
  - name: Mirae Asset Securities workforce breach notice
    url: https://trading.securities.miraeasset.com/bbs/board/message/view.do?categoryId=66&messageCategoryId=0&messageId=2344060&messageNumber=444
    primary: true
    says: Confirms the groupware incident, about 35,255 affected people, the variable field exposure, isolation and reporting guidance.
---

On November 7, Mirae Asset Securities disclosed intrusions affecting two services on consecutive days. Its customer notice says an external party accessed the mobile website’s phone-verification login flow on November 4. About 3,800 customers’ brokerage account numbers leaked. The broker says account-holder names and other customer fields were outside that exposure. It suspended the login service after discovering the leak and kept it disconnected from external access while investigating.

The November 5 attack affected the broker’s mi-global groupware. The workforce notice counts about 35,255 people, including former employees and contractors. The exposed data consisted mainly of names and employee IDs, with email addresses, mobile numbers and passwords described as encrypted exposed for some people. The fields vary by person. The notice gives no password protection scheme or evidence that the exposed passwords were recovered in usable form. The broker disconnected the affected server, kept groupware and related mobile services isolated from external access, and expanded checks to other internet-accessible internal systems.

The two notices count different groups, and the company does not give a deduplicated total. They provide no technical entry mechanism, shared-attacker attribution, confirmed financial losses or reopening time for the affected login and groupware services.
