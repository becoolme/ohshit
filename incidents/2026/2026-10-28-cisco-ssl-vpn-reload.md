---
title: Cisco confirms exploitation of an ASA/FTD SSL VPN reload flaw
level: 4
date: '2026-10-28'
tags:
- Cisco
- VPN
- DoS
ecosystems:
- cisco
summary: CVE-2026-76418 lets an unauthenticated attacker force ASA/FTD reloads through SSL VPN when the relevant tunnel group uses secondary authentication. Cisco confirms active exploitation and publishes fixed releases.
splash: Vulnerable ASA/FTD with reachable SSL remote access VPN and secondary authentication in the relevant tunnel group
wipe: Install the matching ASA/FTD fixed release; assess Cisco’s conditional mitigation if patching is delayed
inTheWild: 'yes'
inTheWildNote: Cisco PSIRT reports active exploitation in October 2026.
cves:
- id: CVE-2026-76418
  score: 8.6
  name: SSL VPN secondary-authentication denial of service
  description: An unauthenticated SSL VPN request can trigger an unexpected device reload. Successful login is unnecessary; the reported impact is denial of service, not code execution.
fixed:
- product: Cisco ASA 9.16 and earlier
  version: 9.16.4.104
  status: Patched
- product: Cisco ASA 9.18
  version: 9.18.4.96
  status: Patched
- product: Cisco ASA 9.20
  version: 9.20.4.50
  status: Patched
- product: Cisco ASA 9.22
  version: 9.22.3.200
  status: Patched
- product: Cisco ASA 9.23
  version: 9.23.1.48
  status: Patched
- product: Cisco ASA 9.24
  version: 9.24.1.27
  status: Patched
- product: Cisco ASA 9.24 alternative train
  version: 9.24.10.1
  status: Patched
- product: Cisco FTD 7.0 and earlier
  version: 7.0.11
  status: Patched
- product: Cisco FTD 7.2
  version: 7.2.13
  status: Patched
- product: Cisco FTD 7.4
  version: 7.4.9
  status: Patched
- product: Cisco FTD 7.6
  version: 7.6.7
  status: Patched
- product: Cisco FTD 7.7
  version: 7.7.14
  status: Patched
- product: Cisco FTD 10.0
  version: 10.0.3
  status: Patched
- product: Cisco FTD 10.1
  version: 10.1.1
  status: Patched
timeline:
- date: Oct 28, 19:15 UTC
  title: Cisco publishes fixes and confirms exploitation
checklist:
- title: Upgrade the matching product and release train
  hint: Use Cisco Software Checker with product, platform and installed version; select the corresponding target below and verify the running release after upgrading.
- title: Check every relevant tunnel group
  hint: Inspect webvpn enable and secondary-authentication-server-group. With tunnel-group-list enable, inspect all groups including DefaultWEBVPNGroup; without it, inspect DefaultWEBVPNGroup. On FTD, check deployed FMC/FDM policy and device configuration.
- title: Evaluate the vendor mitigation before changing authentication
  hint: If DefaultWEBVPNGroup has no secondary authentication, Cisco suggests no tunnel-group-list enable. If it does, Cisco suggests no secondary-authentication-server-group on that group. Removing secondary authentication weakens security; validate impact first. These are temporary mitigations, not substitutes for patching.
sources:
- name: Cisco PSIRT advisory
  url: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-tunnel-dos-s6mgkb75
  primary: true
  says: Exploitation confirmed; affected configuration, release matrix and conditional mitigations.
- name: Cisco CNA record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-76418
  primary: true
  says: CVSS 3.1 score 8.6, unauthenticated reload impact and exploitation statement.
- name: Cisco CSAF release data
  url: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-tunnel-dos-s6mgkb75/csaf/cisco-sa-asaftd-tunnel-dos-s6mgkb75.json
  primary: true
  says: Machine-readable copy of the advisory and fixed-release matrix.
---

Cisco’s exploitation confirmation warrants L4. The authentication setting is a prerequisite, not a requirement for attacker credentials. No victim count or attacker IoCs are supplied. The vendor labels the configuration changes temporary mitigations despite the advisory’s “no workarounds” banner. Hiding the group list is insufficient when the default group itself uses secondary authentication.
