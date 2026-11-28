---
title: Yamagata Bank’s CrossMeetz service breached through login-page PDF flaw; 22 requests exposed
level: 3
date: 2026-11-27
tags: [data breach, banking, Japan]
ecosystems: [crossmeetz]
summary: Yamagata Bank confirms a pre-login PDF-display flaw in NSSOL’s CrossMeetz exposed service/authentication data and 22 foreign-remittance requests from 10 corporate customers. The service is suspended; NSSOL reports blocking the source and fixing the flaw.
splash: Yamagata Bank’s CrossMeetz login-page PDF function; 10 corporate customers’ remittance requests
wipe: Follow the bank’s notices; verify suspicious payment messages through established contacts
inTheWild: 'yes'
inTheWildNote: NSSOL confirms an application vulnerability was exploited to read server information.
timeline:
- date: Nov 24, 2026
  title: Intrusion into one bank’s service environment
  body: NSSOL dates the unauthorized access to the night of November 24; no exact time or timezone is stated.
- date: Nov 25, 2026
  title: Data access confirmed and service suspended
  body: NSSOL confirmed the readout that morning, blocked communications from the source, fixed the vulnerability and suspended the affected bank’s service that day.
- date: Nov 27, 2026
  title: NSSOL and Yamagata Bank disclose the breach
  body: The bank identifies a pre-login PDF-display flaw and 22 exposed requests from 10 corporate customers. It is individually explaining the exposure; restart awaits safety checks and consultation.
checklist:
- title: Confirm whether your bank’s service is affected
  hint: Yamagata Bank’s Foreign Exchange WEB Service is suspended. Contact its International Business team at 023-634-7548 (notice hours 09:00–17:00) for individual foreign-remittance handling and exposure notices. Neither notice publishes a customer-side patch, CVE or affected version.
- title: Independently verify unexpected remittance requests
  hint: Do not respond to suspicious calls or emails. Use previously established bank and counterparty contacts to verify payment instructions, account changes or requests referencing remittance details; report suspected misuse to the bank.
- title: Confirm provider remediation before restoring access
  hint: Bank operators should coordinate with NSSOL on the reported source blocking and application fix. The notice makes restart conditional on safety confirmation and discussion with the bank; it does not announce recovery or a mandatory customer password reset.
sources:
- name: NSSOL November 27 incident notice
  url: https://www.nssol.nipponsteel.com/press/2026/20261127_173000.html
  primary: true
  says: Confirms application-flaw exploitation in one bank environment, exposed service and authentication information and 22 remittance requests, containment and service suspension.
- name: Yamagata Bank November 27 customer notice
  url: https://www.yamagatabank.co.jp/release/pdf/3470.pdf
  primary: true
  says: Identifies the bank, login-page PDF-display flaw before login, 10 corporate customers and 22 remittance requests, no confirmed direct server/database intrusion or fraudulent transfers, and individual handling while service is suspended.
---

NSSOL says an attacker exploited an application vulnerability in the environment serving **one financial institution** using its CrossMeetz foreign-exchange internet service. Server information was read from outside. The provider reports no unauthorized access to environments serving other banks, and says it separately contacted those banks and completed necessary measures. Yamagata Bank’s own November 27 notice identifies it as the affected bank and locates the flaw in the login page’s PDF-display feature, attacked before login. The bank reports no confirmed direct unauthorized access to the server or database: this does not contradict information being read through the vulnerable application. Neither disclosure establishes a compromise of every CrossMeetz customer; further exploit requirements are not specified.

The exposed service information includes user IDs, login history and connection details such as IP address, operating system and browser. Authentication information includes stored password representations from which the original password cannot be confirmed, and expired one-time passwords. NSSOL says this service-information group contains no names, addresses or email addresses, cannot by itself identify customers and cannot be used to log in. It does not specify the password algorithm; this is not evidence of plaintext password disclosure or an independent guarantee against offline recovery.

A separate group covers **22 foreign-remittance requests from 10 corporate customers**, according to the bank. The request count is not a count of unique people. It includes requester names, addresses, telephone numbers and debit-account numbers; beneficiary names, addresses, bank names and receiving-account numbers; remittance amounts and reasons; and attachment filenames only. The exclusion of names and addresses in the service-information group does not apply to these remittance records. No attachment-content exposure or total affected-user count is confirmed. The bank reports no confirmed fraudulent transfers, unauthorized logins or other secondary harm from this incident as of November 27.

As of the November 27 disclosure, NSSOL had not confirmed secondary harm from misuse of the data. It says affected remittance customers are receiving individual explanations from the bank. Investigation continues. NSSOL plans consultation and reporting to authorities with advice from outside experts; service restart will be decided with the bank after safety is confirmed. No public indicators, detailed incident-recovery procedure or customer credential-reset instruction are supplied.
