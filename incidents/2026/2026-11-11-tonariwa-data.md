---
title: TONARIWA compromise exposes personal information held for two client companies
date: 2026-11-11
level: 3
tags: [data breach, SaaS, LINE]
summary: Dentsu Digital found unauthorized access and privilege escalation using leaked TONARIWA infrastructure management credentials. It shut down the platform and confirmed personal data exfiltration involving two clients. The number of affected people is under investigation.
splash: TONARIWA clients, their end users and LINE Official Account integrations connected to the platform
wipe: Coordinate LINE token revocation and reissue with Dentsu Digital. Preserve logs and confirm your organization’s exposure.
inTheWild: "n/a"
timeline:
  - date: Nov 10, 2026
    title: Dentsu Digital confirms unauthorized access and privilege escalation
    body: The intruder used leaked infrastructure management credentials.
  - date: Nov 11, 2026
    title: Dentsu Digital discloses the intrusion and platform suspension
    body: Japan Post separately warns of possible exposure and puts its Posukuma LINE service into emergency maintenance.
  - date: Nov 12, 2026
    title: Dentsu Digital confirms data exfiltration for two clients
    body: Logs show data left the platform. The provider is still determining the record count and checking other clients.
  - date: Nov 13, 2026
    title: Pasona confirms exposure of some data shared with TONARIWA
    body: Pasona uses the system for LINE communication with job seekers and is determining which individuals and fields were affected.
checklist:
  - title: Coordinate revocation and reissue of LINE tokens
    hint: Identify LINE Official Accounts and dependent services connected to TONARIWA. Confirm who controls each channel with Dentsu Digital, use LINE’s instructions to revoke and reissue revocable tokens. Stateless tokens are valid for 15 minutes and expire without a revocation step. Verify old tokens are invalid or expired, then test approved integrations.
  - title: Check your exposure and preserve evidence
    hint: Ask Dentsu Digital which tenants, fields and time ranges it found in the affected data. Preserve administrative, export and LINE integration logs and review unexpected access or messages. Use the findings to prepare individual notices and coordinate with the provider.
  - title: Verify messages and use alternate service channels
    hint: Open the organization's website from a known address to verify suspicious LINE messages, texts or calls. Japan Post directs Posukuma users to its corporate site during the suspension.
sources:
  - name: Dentsu Digital initial notice
    url: https://www.dentsudigital.co.jp/news/updates/services/2026-1111-001111
    primary: true
    says: Details the infrastructure credential leak, privilege escalation and initial response.
  - name: Dentsu Digital second notice
    url: https://www.dentsudigital.co.jp/news/updates/services/2026-1112-001112
    primary: true
    says: Confirms exfiltration at two clients and describes isolation, credential work and recovery planning.
  - name: Japan Post customer notice
    url: https://www.post.japanpost.jp/newsrelease/pressrelease/685401036.html
    primary: true
    says: Describes the affected LINE survey integration and emergency maintenance.
  - name: Pasona customer notice
    url: https://www.pasonacareer.jp/info/20261113t/
    primary: true
    says: Confirms exposure of some information shared with the provider.
  - name: LINE Developers channel access token guide
    url: https://developers.line.biz/en/docs/basics/channel-access-token/
    primary: true
    says: Describes token types and links to their revocation procedures.
---

Dentsu Digital says stolen management credentials were used to access TONARIWA infrastructure and gain greater privileges. It revoked the credentials used, blocked the access path and isolated the environment by stopping all servers. It is coordinating revocation or reissue of the separate LINE integration credentials.

On November 12 the provider said its logs showed data extraction involving two client companies. It listed names, dates of birth, contact information and administrative account information such as LINE access tokens among the data at issue. It excluded card and bank account information and reported no known misuse at that point. Individual record counts remain unknown. The confirmed extraction, service suspension and possible integration credential exposure warrant L3 while the wider impact is being investigated.

Pasona confirmed some linked job-seeker information leaked and reported finding no signs of access to its own applicant management systems at the time. Japan Post reported possible exposure involving its Posukuma LINE survey integration. It had not verified unauthorized acquisition in its notice. Dentsu Digital is investigating restoration and preparing alternatives for customers.
