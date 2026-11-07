---
title: IBM API Connect updates fix authentication bypass and remote code execution
level: 3
date: '2026-11-05'
tags: [IBM, API Connect, gateway, authentication]
summary: IBM's November 5 API Connect bulletins cover authentication bypasses and code execution, with some issues requiring no login. Upgrade API Connect 10.0.8.0–10.0.8.12 to 10.0.8.13 or V12 OnPrem 12.1.0.0–12.1.1.2 to 12.1.1.3. Individual CVEs differ by release line.
splash: Network-reachable IBM API Connect on affected 10.0.8 and V12 OnPrem builds. Authentication requirements differ by vulnerability.
wipe: Restrict untrusted access, apply the IBM fix for your release line and verify gateway configuration and administrative access.
inTheWild: unknown
inTheWildNote: IBM's bulletins describe vulnerability impact and patches without reporting exploitation.
cves:
- id: CVE-2026-17301
  score: 9.8
  name: Authentication bypass through signature verification
  description: An unauthenticated attacker can bypass authentication when the product verifies a cryptographic signature incorrectly. Both bulletins list the flaw.
- id: CVE-2026-17117
  score: 9.9
  name: Authenticated code execution through object attributes
  description: An authenticated attacker can change an attribute reserved for the system and may execute code. Both bulletins list the flaw.
- id: CVE-2026-17340
  score: 9.8
  name: Remote code execution through path traversal
  description: IBM's V12 bulletin lists path traversal leading to code execution and scores it as requiring no privileges.
- id: CVE-2026-17360
  score: 9.8
  name: Full administrative control through hard-coded credentials
  description: IBM's V12 bulletin says a remote attacker could gain administrative control through hard-coded credentials.
- id: CVE-2026-16720
  score: 9.8
  name: Access token acquisition through directory authentication
  description: Both bulletins list a connected-directory authentication flaw that can allow a remote attacker to obtain another user's access token.
fixed:
- product: IBM API Connect 10.0.8.0–10.0.8.12
  version: 10.0.8.13
  status: Use the V10 Fix Central package
- product: IBM API Connect V12 OnPrem 12.1.0.0–12.1.1.2
  version: 12.1.1.3
  status: Use the V12 OnPrem package and upgrade instructions
timeline:
- date: Nov 5, 2026
  title: IBM publishes separate V10 and V12 OnPrem security bulletins
  body: The bulletins give different CVE lists and branch-specific fixes.
checklist:
- title: Inventory the deployment and restrict untrusted access
  hint: Identify the exact API Connect release and review network access to management, portal and gateway interfaces. Restrict untrusted access where operationally feasible while preparing the upgrade. IBM lists no workaround.
- title: Upgrade the affected release line
  hint: Use the Fix Central link in the matching IBM bulletin and follow its upgrade instructions. Verify the running build across the deployment, then test authorized sign-in and gateway traffic.
- title: Review access and configuration changes
  hint: Preserve gateway, portal and management audit logs. Investigate unexpected token issuance, administrator actions, tenant changes and gateway configuration edits. If compromise is found, scope affected keys and sessions before revoking or rotating them.
sources:
- name: IBM API Connect V12 OnPrem bulletin
  url: https://www.ibm.com/support/pages/node/7295635
  primary: true
  says: Lists the 12.1.0.0–12.1.1.2 affected range, the 12.1.1.3 fix and its full CVE list.
- name: IBM API Connect V10 bulletin
  url: https://www.ibm.com/support/pages/node/7295637
  primary: true
  says: Lists the 10.0.8.0–10.0.8.12 affected range, the 10.0.8.13 fix and its full CVE list.
---

The November 5 advisories share some CVEs and have other CVEs specific to each release line. The entries above highlight critical authentication and execution paths. Use the bulletin for your release for the complete vulnerability list and the published prerequisites. The advisory scores are IBM's CVSS 3.1 base scores. IBM did not publish victim data or confirm active exploitation in these bulletins.
