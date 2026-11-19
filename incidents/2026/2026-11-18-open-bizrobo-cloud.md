---
title: OPEN confirms BizRobo!mini authentication-server access in cloud intrusion
date: 2026-11-18
level: 4
tags:
  - OPEN
  - BizRobo
  - SaaS
  - Credentials
summary: OPEN confirms unauthorized cloud access, including a BizRobo!mini authentication server storing IDs and passwords for about 560 companies and 1,000 accounts. Other servers/services were also accessed. Data impact remains under investigation; November 21 maintenance is planned.
splash: BizRobo!mini customers on the accessed authentication server; other services in the same cloud remain under investigation
wipe: Follow OPEN’s maintenance notice, verify account-specific guidance with support, and avoid suspicious login requests.
inTheWild: yes
inTheWildNote: OPEN confirms unauthorized access to its cloud and BizRobo!mini authentication server.
timeline:
  - date: Nov 12, 2026
    title: Unauthorized cloud access occurs
    body: OPEN later identifies third-party access to the cloud environment operating its services.
  - date: Nov 16, 2026
    title: Security alert prompts investigation and isolation
    body: OPEN isolates the affected environment and starts investigating scope.
  - date: Nov 17, 2026
    title: Authentication-server access is confirmed
    body: The customer notice dates confirmation of BizRobo!mini authentication-server access to this day.
  - date: Nov 18, 2026
    title: OPEN discloses the incident and regulator report
    body: The vendor reports to Japan’s Personal Information Protection Commission and says the service remains usable.
  - date: Nov 21, 2026 (scheduled)
    title: Emergency maintenance is planned
    body: Affected customers will receive details separately; this is a plan, not completed remediation.
checklist:
  - title: Obtain the maintenance and account-specific notice
    hint: Check OPEN’s official customer communication for November 21 emergency maintenance. For this incident, the published contact is support-atm@open.co.jp; verify through the existing vendor relationship before sharing sensitive information.
  - title: Reject suspicious login or attachment requests
    hint: OPEN warns of messages impersonating it or related organizations. Do not follow suspicious URLs, open attachments or enter IDs/passwords supplied through such messages; use established support channels.
  - title: Track the investigation and preserve relevant records
    hint: Retain account and support records while asking OPEN whether your environment needs further action. Authentication-server access does not establish a final list of stolen credentials, plaintext storage or compromise of RPA-connected business systems.
sources:
  - name: OPEN original customer incident notice
    url: https://open-group.co.jp/info/2026/11/202611-unauthorized-access/
    primary: true
    says: Gives chronology, authentication information/server scope, isolation, planned November 21 maintenance and phishing precautions.
  - name: OPEN original Japanese stock-exchange disclosure
    url: https://www.release.tdnet.info/inbs/140120261117582184.pdf
    primary: true
    says: Confirms unauthorized access to the authentication server and other cloud services; scope figures describe stored customer accounts, not a confirmed exfiltration total.
---

OPEN’s November 18 notices confirm intrusion into the cloud used by subsidiary OPEN Inc. Its authentication server stored BizRobo!mini IDs and passwords for about 560 companies and 1,000 accounts; these approximate figures describe the server’s customer population, not a verified count of stolen passwords. Access to other servers and services is also confirmed, so the investigation is broader than that account set.

The company isolated affected infrastructure and stopped unused cloud environments and attacker-created resources. BizRobo!mini remains usable according to OPEN; isolation and continued availability do not establish completed remediation. The entry route, full data impact and password-storage format are not disclosed. L4 reflects vendor-confirmed intrusion involving a hosted authentication service, without asserting a confirmed credential dump.
