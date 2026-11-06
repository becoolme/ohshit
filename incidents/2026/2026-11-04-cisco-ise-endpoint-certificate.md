---
title: Cisco ISE authorization flaw lets unauthenticated attackers obtain endpoint certificates
level: 3
date: '2026-11-04'
tags:
- Cisco
- ISE
- authorization bypass
summary: Cisco ISE and ISE-PIC can issue an endpoint identity certificate to an unauthenticated remote attacker through an authorization bypass, regardless of configuration. Cisco lists patches across five ISE branches and reports no known malicious use; this is not a confirmed server takeover or universal network-access bypass.
splash: Network-reachable Cisco ISE or ISE-PIC on an affected release, regardless of configuration; ISE-PIC support ends at 3.4.
wipe: Install the matching Cisco patch, verify every deployment node and review suspicious certificate issuance through established security procedures.
inTheWild: unknown
inTheWildNote: Cisco PSIRT reports no known malicious use in its November 4 advisory.
cves:
- id: CVE-2026-20241
  score: 5.3
  name: Endpoint certificate authorization bypass
  description: A crafted remote request bypasses authorization to obtain an endpoint identity certificate without authentication. Cisco assigns CVSS 3.1 5.3; the advisory does not establish arbitrary server execution or every downstream certificate privilege.
fixed:
- product: Cisco ISE / ISE-PIC 3.1
  version: 3.1 Patch 12
  status: First fixed patch listed by Cisco; ISE-PIC ends at 3.4
- product: Cisco ISE / ISE-PIC 3.2
  version: 3.2 Patch 11
  status: First fixed patch listed by Cisco; ISE-PIC ends at 3.4
- product: Cisco ISE / ISE-PIC 3.3
  version: 3.3 Patch 12
  status: First fixed patch listed by Cisco; ISE-PIC ends at 3.4
- product: Cisco ISE / ISE-PIC 3.4
  version: 3.4 Patch 7
  status: First fixed patch listed by Cisco; ISE-PIC ends at 3.4
- product: Cisco ISE 3.5
  version: 3.5 Patch 4
  status: First fixed patch listed by Cisco; no ISE-PIC 3.5 release
timeline:
- date: Nov 4, 16:00 UTC
  title: Cisco publishes the authorization-bypass advisory
  body: ISE and ISE-PIC are affected regardless of configuration; Cisco provides fixed patches and no workaround. The 19:56 UTC revision only adds the researcher’s middle name.
checklist:
- title: Inventory every ISE and ISE-PIC deployment node
  hint: Check installed version and patch level in the deployment inventory or administration interface; match each node to its branch. Do not assume an unused feature or non-default configuration excludes the flaw.
- title: Install the branch-specific fixed patch
  hint: 'Use Cisco’s official downloads and ISE Upgrade Guides: 3.1 Patch 12, 3.2 Patch 11, 3.3 Patch 12, 3.4 Patch 7 or ISE 3.5 Patch 4. Verify patch installation and deployment health on every node. ISE-PIC ends at 3.4; plan a supported migration with Cisco instead of assuming a 3.5 PIC upgrade exists. No workaround is published.'
- title: Review certificate issuance as a defensive precaution
  hint: Preserve relevant request, certificate-issuance and administration logs; compare unexpected endpoint certificates with authorized enrollment through your security team. If unauthorized issuance is confirmed, use your established PKI process to revoke affected certificates and assess what access they granted. This is defensive guidance; Cisco supplies no incident-specific indicators or confirmed victim count.
sources:
- name: Cisco original ISE advisory
  url: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ise-cert-mE9BD5GO
  primary: true
  says: First public November 4 16:00 GMT; affected configuration, CVE/CVSS, five fixed branches, ISE-PIC lifecycle, no workaround and no known malicious use. Version 1.1 changes researcher attribution only.
---

Cisco attributes the flaw to improper authorization checks. The verified outcome is obtaining an endpoint identity certificate; the advisory does not specify which networks would trust that certificate or prove arbitrary access to every relying service. L3 reflects an unauthenticated flaw in a mainstream identity platform, not confirmed exploitation.

The advisory says these fixes are also included in the September 2026 ISE hardening release. That earlier packaging does not change this flaw’s November 4 public disclosure date. Upgrade using the supported procedure for the actual branch; do not confuse this certificate issue with separate ISE command-execution vulnerabilities.
