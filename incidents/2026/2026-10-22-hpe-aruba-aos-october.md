---
title: HPE patches 72 ArubaOS vulnerabilities, including eight CVSS 10 authentication bypass and RCE flaws
level: 3
date: '2026-10-22'
tags:
- HPE
- ArubaOS
- RCE
summary: HPE bulletin HPESBNW05162 fixes 72 CVEs across AOS-8 and AOS-10. Eight score CVSS 10.0; attacks include unauthenticated management and PAPI paths. HPE reports no known public exploit code at disclosure.
splash: Reachable AOS-8 / AOS-10 interfaces; some RCE paths have unspecified preconditions outside attacker control
wipe: Install AOS 10.8.1.2 / 10.7.2.7 / 10.4.1.14 / 8.13.3.1 / 8.10.0.24 as applicable; isolate management
inTheWild: unknown
inTheWildNote: HPE reports no known public exploit code; the advisory does not establish exploitation
cves:
- id: CVE-2026-79844
  score: 10.0
  name: AOS-10 authentication bypass to RCE
  description: Some preconditions outside attacker control are unspecified.
- id: CVE-2026-79845
  score: 10.0
  name: AOS-10 PAPI authentication bypass
  description: Unauthenticated access can grant administrative control.
- id: CVE-2026-79846
  score: 10.0
  name: AOS-8 command injection
  description: Some preconditions outside attacker control are unspecified.
- id: CVE-2026-79847
  score: 10.0
  name: AOS-10 buffer overflow
  description: Crafted packets can execute privileged code.
- id: CVE-2026-79848
  score: 10.0
  name: AOS-8 SQL injection to RCE
  description: Unauthenticated SQL injection can execute operating-system commands.
- id: CVE-2026-79849
  score: 10.0
  name: AOS-8 SQL injection to RCE
  description: Unauthenticated SQL injection can execute operating-system commands.
- id: CVE-2026-79850
  score: 10.0
  name: AOS-8 authentication bypass to RCE
  description: Unauthenticated bypass can execute commands as root.
- id: CVE-2026-79851
  score: 10.0
  name: AOS-10 buffer overflow
  description: Unauthenticated input can execute privileged code.
fixed:
- product: AOS-10.8
  version: 10.8.1.2
  status: Patched
- product: AOS-10.7
  version: 10.7.2.7
  status: Patched
- product: AOS-10.4
  version: 10.4.1.14
  status: Patched
- product: AOS-8.13
  version: 8.13.3.1
  status: Patched
- product: AOS-8.10
  version: 8.10.0.24
  status: Patched
timeline:
- date: Oct 22, 2026
  title: HPE publishes HPESBNW05162 revision 1
  body: Fixes cover 72 CVEs; the eight maximum-score issues are listed here.
checklist:
- title: Upgrade every affected controller, conductor, gateway and access point
  hint: Match the installed AOS family to the five releases above; HPE support hosts packages and release-specific guidance
- title: Restrict management and review protocol exposure
  hint: Put CLI and web management on a dedicated VLAN or behind firewall policy; inventory PAPI exposure, including UDP 8211 paths described in the bulletin
- title: Replace unsupported software and keep audit logs
  hint: HPE presumes end-of-maintenance releases affected and has not assessed end-of-support exposure; migrate to supported releases and enable activity accounting
sources:
- name: HPE HPESBNW05162 signed text
  url: https://csaf.arubanetworking.hpe.com/2026/hpe_networking_-_hpesbnw05162.txt
  says: 'Original vendor bulletin: CVEs, prerequisites, fixed releases and mitigations'
  primary: true
- name: HPE support portal
  url: https://support.hpe.com/hpesc/public/docDisplay?docId=hpesbnw05162en_us&docLocale=en_US
  says: Canonical bulletin page; signed text read because portal did not render
- name: Canadian Centre for Cyber Security AV26-1079
  url: https://www.cyber.gc.ca/en/alerts-advisories/hpe-security-advisory-av26-1079
  says: October 22 notice independently lists the same five version thresholds
---

This is an urgent L3 patch batch for enterprise wireless infrastructure. Impact depends on the interface and product: some paths require adjacent access or privileges, while the eight maximum-score CVEs include unauthenticated network attacks. HPE leaves certain prerequisites unspecified; a severity score alone does not prove every deployment is remotely exploitable.

The table lists the eight CVSS 10.0 entries, not all 72. Other HPE products are outside this bulletin; unsupported AOS releases still require attention. This is separate from HPE's [ClearPass PHP2Shell advisory](/incidents/php2shell/).
