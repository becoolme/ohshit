---
title: CrossMeetz bank environment breached through an application flaw; 22 remittance requests exposed
level: 3
date: 2026-11-27
tags: [data breach, banking, Japan]
ecosystems: [crossmeetz]
summary: NSSOL confirmed exploitation of an application flaw in one bank’s CrossMeetz environment. Exposed data includes service and authentication records plus 22 corporate foreign-remittance requests. The bank’s service is suspended; the provider reports blocking the source and fixing the flaw.
splash: One unnamed bank’s CrossMeetz service environment and corporate foreign-remittance customers
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
  title: NSSOL discloses the breach and affected data
  body: The bank is individually explaining the exposure to customers whose foreign-remittance requests were affected. Restart awaits safety checks and consultation with the bank.
checklist:
- title: Confirm whether your bank’s service is affected
  hint: Contact the bank through its usual corporate-banking channel and follow its individual service and exposure notices. NSSOL does not name the bank or publish a customer-side patch, CVE or affected software version.
- title: Independently verify unexpected remittance requests
  hint: Do not respond to suspicious calls or emails. Use previously established bank and counterparty contacts to verify payment instructions, account changes or requests referencing remittance details; report suspected misuse to the bank.
- title: Confirm provider remediation before restoring access
  hint: Bank operators should coordinate with NSSOL on the reported source blocking and application fix. The notice makes restart conditional on safety confirmation and discussion with the bank; it does not announce recovery or a mandatory customer password reset.
sources:
- name: NSSOL November 27 incident notice
  url: https://www.nssol.nipponsteel.com/press/2026/20261127_173000.html
  primary: true
  says: Confirms application-flaw exploitation in one bank environment, exposed service and authentication information and 22 remittance requests, containment and service suspension.
---

NSSOL says an attacker exploited an application vulnerability in the environment serving **one unnamed financial institution** using its CrossMeetz foreign-exchange internet service. Server information was read from outside. The provider reports no unauthorized access to environments serving other banks, and says it separately contacted those banks and completed necessary measures. The notice does not establish a compromise of every CrossMeetz customer or disclose the flaw’s technical prerequisites.

The exposed service information includes user IDs, login history and connection details such as IP address, operating system and browser. Authentication information includes stored password representations from which the original password cannot be confirmed, and expired one-time passwords. NSSOL says this service-information group contains no names, addresses or email addresses, cannot by itself identify customers and cannot be used to log in. It does not specify the password algorithm; this is not evidence of plaintext password disclosure or an independent guarantee against offline recovery.

A separate group covers **22 corporate foreign-remittance requests**, not 22 confirmed unique people or companies. It includes requester names, addresses, telephone numbers and debit-account numbers; beneficiary names, addresses, bank names and receiving-account numbers; remittance amounts and reasons; and attachment filenames only. The exclusion of names and addresses in the service-information group does not apply to these remittance records. No attachment-content exposure, stolen funds or total affected-user count is confirmed in the notice.

As of the November 27 disclosure, NSSOL had not confirmed secondary harm from misuse of the data. It says affected remittance customers are receiving individual explanations from the bank. Investigation continues. NSSOL plans consultation and reporting to authorities with advice from outside experts; service restart will be decided with the bank after safety is confirmed. No public indicators, detailed incident-recovery procedure or customer credential-reset instruction are supplied.
