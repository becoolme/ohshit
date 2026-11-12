---
title: FortiAuthenticator fixes two unauthenticated bypasses and five related vulnerabilities
level: 3
date: '2026-11-10'
tags:
- Fortinet
- FortiAuthenticator
- Authentication bypass
summary: Fortinet fixed two unauthenticated access bypasses and five other FortiAuthenticator flaws. Versions 8.0.0–8.0.3 and 6.6.0–6.6.10 are affected. The hard-coded password flaw requires conditions outside the attacker’s control.
splash: Network-reachable FortiAuthenticator 8.0.0–8.0.3 and 6.6.0–6.6.10. Some flaws additionally require authentication.
wipe: Upgrade FortiAuthenticator to 8.0.4 or 6.6.11 or later in the installed release line, then verify authentication flows.
inTheWild: unknown
inTheWildNote: No in-the-wild exploitation was verified for these seven CVEs.
cves:
- id: CVE-2026-126251
  score: 9.1
  name: Authorization bypass
  description: A network attacker without credentials can bypass authentication and gain access.
- id: CVE-2026-126257
  score: 9.0
  name: Hard-coded password
  description: An unauthenticated attacker can bypass credential validation under conditions outside the attacker’s control.
- id: CVE-2026-126240
  score: 8.2
  name: LDAP query injection
  description: An authenticated attacker can bypass authentication if the upstream identity provider is malicious or compromised, or lets the user control the NameID or equivalent SAML username attribute.
- id: CVE-2026-126241
  score: 8.8
  name: SQL injection
  description: An authenticated attacker can run unauthorized SQL commands on the underlying database.
- id: CVE-2026-126244
  score: 7.5
  name: Unthrottled resource allocation
  description: An unauthenticated attacker can exhaust resources and cause a denial of service.
- id: CVE-2026-126249
  score: 7.2
  name: Privilege escalation
  description: An authenticated attacker with high privileges can escalate privileges, according to the vendor vector and advisory.
- id: CVE-2026-126252
  score: 8.3
  name: Collector Agent SQL injection
  description: An authenticated attacker can execute unauthorized code or commands through SQL injection in the Collector Agent.
fixed:
- product: FortiAuthenticator 8.0
  branch: '8.0'
  version: 8.0.4
- product: FortiAuthenticator 6.6
  branch: '6.6'
  version: 6.6.11
timeline:
- date: Nov 10, 2026
  title: Fortinet publishes the product advisories
  body: Seven FortiAuthenticator entries specify the same affected ranges and fixed releases.
- date: Nov 11, 2026
  title: Fortinet publishes the two bypass CVE records
  body: The CNA records confirm the fixes and differentiate the authorization and password flaws.
checklist:
- title: Inventory appliances and limit network reachability
  hint: Check the firmware version in the management console or asset inventory. While scheduling the upgrade, review firewall rules and restrict management and other appliance access to approved networks and required integrations.
- title: Upgrade each node and verify sign-ins
  hint: Use Fortinet’s supported upgrade path for the installed line. Install 8.0.4 or later on 8.0, or 6.6.11 or later on 6.6. Confirm the running firmware on each node and test the identity flows in use, including SAML or LDAP where applicable.
- title: Investigate unexpected authentication activity
  hint: Preserve FortiAuthenticator audit and authentication logs and correlate with upstream identity-provider logs. Review unfamiliar source addresses, unexpected sign-ins and changes to accounts or access policies. If compromise is confirmed, revoke affected sessions and rotate exposed credentials after containment.
sources:
- name: FortiGuard PSIRT feed
  url: https://filestore.fortinet.com/fortiguard/rss/ir.xml
  says: Lists the November 10 advisories and links to Fortinet’s CSAF files.
  primary: true
- name: Fortinet CNA authorization bypass record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-126251
  says: Records the affected branches, scoring and fixed releases.
  primary: true
- name: Fortinet CNA hard-coded password record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-126257
  says: Describes the conditional unauthenticated bypass and same fixes.
  primary: true
---

FortiAuthenticator is Fortinet’s identity and authentication appliance. The two critical findings both allow unauthorized access from the network without a login according to Fortinet’s CVSS vectors. CVE-2026-126257 depends on circumstances the attacker does not control. The materials do not specify the precise condition, request or endpoint. The LDAP injection is distinct and requires an authenticated attacker and a specific upstream identity-provider configuration or compromise.

Fortinet’s [machine-readable advisories](https://filestore.fortinet.com/fortiguard/rss/ir.xml) show identical affected intervals and upgrade targets for the seven CVEs listed here. The regular PSIRT pages could not be opened during verification. This is the FortiAuthenticator batch and does not assess other Fortinet products. The reviewed material does not establish victims, data access or active exploitation.
