---
title: MetaM support-server attack exposes customer conversations, including Coinone records
date: 2026-11-14
updated: 2026-11-17
level: 4
tags: [data breach, customer support, South Korea, crypto]
summary: Coinone confirms an attacker accessed its support contractor MetaM’s servers and viewed or took customer support records. Fields varied by conversation and could include identity details or passwords supplied to support. Coinone found no indications of direct access to its account, trading or wallet systems. Mega MGC Coffee separately confirms 30 exposed mobile phone numbers.
splash: Customers whose conversations were stored on affected MetaM systems, including Coinone customers who contacted support
wipe: Change passwords shared with support, review account activity and withdrawal addresses, and verify incident messages independently.
inTheWild: yes
timeline:
  - date: Nov 12, 2026
    title: Coinone learns of unauthorized access to MetaM servers
    body: Coinone dates the unauthorized access and its notification from the contractor to November 12. It moved outsourced support to email and blocked access paths.
  - date: Nov 13, 2026
    title: MetaM reports the incident to KISA
    body: MetaM’s reproduced notice dates its report to the Korea Internet and Security Agency to November 13.
  - date: Nov 14, 2026
    title: MetaM announces exposure in some outsourced support systems
    body: The public reproduction of the notice describes unauthorized viewing or removal of phone numbers and conversations and an ongoing scope investigation.
  - date: Nov 15, 2026
    title: Coinone identifies potentially exposed support data
    body: Coinone lists 11 possible data fields and says it is preparing individual notices or a lookup service. It excludes customers with no support history and gives no affected-customer count.
  - date: Nov 17, 2026
    title: Mega MGC Coffee confirms exposure of 30 mobile phone numbers
    body: The brand was notified on November 15 and plans to contact confirmed or potentially affected customers by November 18.
checklist:
  - title: Change any password you shared with Coinone support
    hint: Open the official app or site directly. In the app, choose More → Information/Security → Change password. On the website, use My Page → Personal information management → Change password. Change reused passwords on other services and verify your second factor.
  - title: Review logins, orders and withdrawal addresses
    hint: In the official app, open Deposits/Withdrawals → Address book management, or on the website open Deposits/Withdrawals → Withdrawal address book. If you see an unauthorized login, order or withdrawal attempt, use Account lock in the same security or personal-information menu and report it through Coinone’s notice.
  - title: Verify incident follow-up through known channels
    hint: Open the exchange or other service’s official site for notices. Coinone says it never asks by phone, text or email for a password, OTP, verification code, transfer or change of wallet address. Ignore unsolicited links and attachments. Save suspicious messages and transaction details and contact your financial institution if money was moved. Coinone’s notice lists 118 for KISA privacy reports and 1332 for South Korea’s Financial Supervisory Service.
  - title: Scope contractor access if your organization uses MetaM
    hint: Ask MetaM which support environments and record types were affected. Preserve support, identity and network logs, revoke credentials present in exposed conversations, and coordinate individual notifications with the vendor after confirming scope.
  - title: Verify individual Mega MGC Coffee notices
    hint: Use the support channel listed in the official brand notice to verify texts. Check payment methods and recent activity in the app. If you detect suspicious activity, contact the brand and the relevant financial institution. Keep payment details and verification codes private on calls and texts.
sources:
  - name: Coinone customer notice
    url: https://coinone.co.kr/info/notice/5950
    primary: true
    says: Confirms contractor-server access, lists potentially exposed fields, distinguishes Coinone’s own systems and gives account protection steps.
  - name: Public reproduction of MetaM’s November 14 notice
    url: https://infobits.tistory.com/705
    says: Reproduces the contractor’s popup notice on service scope, server isolation, customer notifications and the continuing investigation.
  - name: Mega MGC Coffee official incident notice
    url: https://www.mega-mgccoffee.com/common/img/metaem_popup_ver3.png
    primary: true
    says: Confirms exposure of 30 mobile numbers and describes other possible fields, notifications and containment.
---

Coinone says an external attacker accessed servers that MetaM operated for outsourced support. Stored support information was viewed or taken. Coinone’s exchange accounts, trading and wallet systems operate separately. Coinone found no indication of direct intrusion into those systems, and its notice gives no confirmed asset-loss figure. Coinone says all logins require a second factor.

Coinone lists the phone number used for support, name, email address, date of birth, bank account number, password, resident registration number, identity document issuance date, home address, wallet address and transaction ID (TXID). These are fields customers may have supplied during chat or phone support. Coinone says the fields vary by person, and customers with no support history are outside the reported scope. A wallet address or TXID alone does not grant control of funds.

MetaM’s reproduced notice says it isolated affected or suspected servers, blocked known attack IPs, rotated administrator credentials and reported the incident to KISA. The initial access method, number of affected customers and total scope across clients remain under investigation. L4 reflects confirmed unauthorized access to live support records and the sensitivity of data in the affected systems.

In its November 17 notice, Mega MGC Coffee confirmed exposure of 30 mobile phone numbers belonging to people who phoned its support center. Phone numbers in call records and mobile numbers and emails supplied with franchise inquiries through its website may also be affected. The brand says the system holding names, conversation contents, recordings and refund account information was protected from attacker access and had found no evidence that those records leaked. MetaM blocked the attack route on November 12 and notified the brand on November 15. The notice schedules individual notifications by November 18. The count covers the mobile numbers this brand has confirmed as exposed.
