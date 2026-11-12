---
title: FortiManager and FortiAnalyzer fix separate management-plane access flaws
tags:
- Fortinet
- FortiManager
- FortiAnalyzer
- RCE
summary: A reachable FortiManager FGFM port allows unauthenticated code execution on affected builds. A separate crafted HTTP request can execute code across FortiManager and FortiAnalyzer variants. Fortinet lists 8.0.3 as upcoming for that HTTP flaw.
splash: FortiManager with reachable FGFM, plus affected FortiManager and FortiAnalyzer variants reachable over HTTP.
wipe: Restrict FGFM and management HTTP to trusted peers. Match fixes to each CVE and verify upcoming builds with Fortinet.
level: 3
date: '2026-11-10'
inTheWild: unknown
cves:
- id: CVE-2026-126261
  score: 9.0
  name: FGFM authorization bypass
  description: An unauthenticated attacker that can reach the FortiManager FGFM port can send crafted FGFM packets to execute code or commands.
- id: CVE-2026-126170
  score: 9.8
  name: HTTP output encoding flaw
  description: A crafted HTTP request can allow unauthenticated code or command execution in affected FortiManager and FortiAnalyzer products, including cloud variants and FortiAnalyzer-BigData.
- id: CVE-2026-126229
  score: 9.1
  name: Cross-VDOM authorization bypass
  description: An authenticated administrator can access other VDOMs via crafted HTTP requests in affected FortiManager and FortiAnalyzer products, including cloud variants.
fixed: []
timeline:
- date: Nov 10, 2026
  title: Fortinet publishes FGFM and cross-VDOM advisories
  body: The two advisories describe different access paths and patch targets.
- date: Nov 11, 2026
  title: Fortinet publishes the separate HTTP code execution CVE record
  body: It lists affected 8.0 and 7.6 lines, and an affected FortiAnalyzer-BigData 7.6 line. Some fixes are listed as upcoming.
checklist:
- title: Restrict management access while arranging the upgrade
  hint: Allow FGFM only from required managed devices. Inspect TCP/541 and the IPv6 FGFM port in use, including TCP/542 where configured. Limit HTTP management to approved networks and confirm access through your upstream firewall. For hosted products, ask Fortinet to confirm the deployed build and remediation.
- title: Check the fix for each affected product and CVE
  hint: Inventory the installed product, edition and branch. Back up the configuration and use Fortinet’s supported upgrade path. Use the per-CVE versions below, verify every node after upgrading, and test managed-device connectivity and administrator isolation. Keep access restricted while a required fix is pending.
- title: Check for unexpected device registrations and management changes
  hint: Preserve management, HTTP proxy and firewall logs. Review unfamiliar device registrations, unexpected administrative actions and changes to management policies. If compromise is suspected, isolate the management plane, retain evidence and coordinate credential replacement and managed-device checks.
sources:
- url: https://filestore.fortinet.com/fortiguard/psirt/csaf_fgfm-elevation-before-registration-password-is-verified_fg-ir-26-275.json
  primary: true
  name: Fortinet FG-IR-26-275 CSAF
  says: FGFM code execution, affected branches and fixes.
- url: https://cveawg.mitre.org/api/cve/CVE-2026-126170
  primary: true
  name: Fortinet CNA CVE-2026-126170
  says: HTTP code execution scope and remediation, including upcoming targets.
- url: https://filestore.fortinet.com/fortiguard/psirt/csaf_authorization-bypass-through-user-controlled-key-in-dmserver_fg-ir-26-244.json
  primary: true
  name: Fortinet FG-IR-26-244 CSAF
  says: Cross-VDOM authorization flaw and FortiAnalyzer targets.
- url: https://cveawg.mitre.org/api/cve/CVE-2026-126229
  primary: true
  name: Fortinet CNA CVE-2026-126229
  says: Affected cloud and self-managed variants and per-branch fixes.
---

The November advisories describe separate paths. Compare the exact CVE, product and branch before upgrading.

- **CVE-2026-126261 (FGFM):** FortiManager 8.0.0, 7.6.0–7.6.7, 7.4.0–7.4.5 and 7.2.0–7.2.8 are affected. The corresponding fixes are **8.0.1**, **7.6.8**, **7.4.6** and **7.2.9**. The attacker must reach the FGFM service.
- **CVE-2026-126170 (HTTP code execution):** FortiManager and FortiAnalyzer 8.0.0–8.0.2, and their Cloud variants 8.0.1–8.0.2, are affected. For all four products, 7.6.0–7.6.7 are affected and **7.6.8** is the fix. The vendor lists **8.0.3** as upcoming for their 8.0 lines. FortiAnalyzer-BigData 7.6.0–7.6.2 is affected and **7.6.3** is listed as upcoming. Confirm availability with the vendor or your hosted service.
- **CVE-2026-126229 (cross-VDOM authorization):** For FortiManager and FortiAnalyzer, the CNA lists 8.0.0–8.0.1, 7.6.0–7.6.7, 7.4.0–7.4.11, 7.2.0–7.2.12 and all 7.0. For the two Cloud variants, the ranges are 8.0.1, 7.6.0–7.6.7, 7.4.1–7.4.11, 7.2.1–7.2.12 and all 7.0. The published targets are **8.0.2**, **7.6.8**, **7.4.12** and **7.2.13**. Ask Fortinet for a migration path from 7.0. This issue requires an authenticated administrator.

The [October hardening notice](/incidents/fortinet-security-hardening/) gave product-level guidance before the detailed advisories. In particular, the 8.0.2 target from that notice is still in the affected ranges for CVE-2026-126170. No verified exploitation or victim data was identified for these three CVEs.
