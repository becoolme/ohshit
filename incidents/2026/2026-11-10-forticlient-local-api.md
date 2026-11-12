---
title: FortiClient local API lets a malicious webpage reach code execution
date: '2026-11-10'
level: 3
tags:
- Fortinet
- FortiClient
- endpoint
summary: CVE-2026-121529 lets a remote attacker execute code or commands through FortiClient’s local API when a victim interacts with attacker-controlled content. The discoverer reproduced it with FortiPAM enabled.
splash: Affected FortiClient Mac, Windows and Windows PAM builds. The browser path was demonstrated with FortiPAM enabled.
wipe: Update affected 7.4 installs to 7.4.8 or later and affected Windows or Windows PAM 7.2 installs to 7.2.15 or later.
inTheWild: unknown
inTheWildNote: The discoverer reproduced the flaw. In-the-wild exploitation remains unconfirmed.
cves:
- id: CVE-2026-121529
  score: 9.1
  name: Local API origin validation error
  description: An unauthenticated remote attacker can execute code or commands through the local API with victim interaction.
fixed:
- product: FortiClient Mac, Windows and Windows PAM 7.4
  version: 7.4.8
- product: FortiClient Windows and Windows PAM 7.2
  version: 7.2.15
timeline:
- date: Nov 10, 2026
  title: Fortinet discloses the FortiClient local API flaw
  body: FG-IR-26-194 and the Fortinet CVE record describe code execution that requires victim interaction.
- date: Nov 11, 2026
  title: CSIRT Panamá publishes the update matrix
  body: The alert lists 7.4.8 for Windows, Windows PAM and Mac, and 7.2.15 for Windows and Windows PAM.
checklist:
- title: Inventory and upgrade affected endpoints
  hint: Use FortiClient EMS or endpoint inventory to identify OS, edition, branch and build. Upgrade affected Mac, Windows and Windows PAM 7.4 installs to 7.4.8 or later and affected Windows and Windows PAM 7.2 installs to 7.2.15 or later. Verify each endpoint’s installed version after rollout.
- title: Check Windows exposure signals
  hint: The discoverer suggests looking for a listener on TCP 9191 and a running FortiVRS.exe. Treat them as exposure signals. Their presence alone does not prove compromise, and absence does not replace checking the installed build.
- title: Investigate suspicious endpoint activity
  hint: While rolling out updates, prioritize FortiPAM workstations and investigate suspicious browsing followed by unexpected process launches or commands from the local FortiClient service. Isolate affected hosts, retain browser and endpoint telemetry and revoke credentials accessible to a compromised host.
sources:
- name: Fortinet CNA record
  url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/121xxx/CVE-2026-121529.json
  says: Vendor-submitted disclosure gives the interaction requirement, 9.1 score and narrower Windows PAM list.
  primary: true
- name: Kevin Joensen’s original disclosure
  url: https://www.linkedin.com/feed/update/urn:li:activity:7526030567436345345/
  says: The discoverer describes the browser-to-local-service path with FortiPAM enabled, Windows exposure indicators and a wider Windows PAM range.
  primary: true
- name: CSIRT Panamá advisory
  url: https://cert.pa/?p=6288
  says: Public CERT alert reproduces the patch matrix and the vendor’s exploitation status at disclosure.
  primary: false
---

Fortinet disclosed an origin validation flaw in the FortiClient local API. The discoverer demonstrated that a malicious web page could reach the local service and execute code on a workstation with FortiPAM enabled. The attacker needs victim interaction. An inbound connection to the workstation from the internet is unnecessary for the demonstrated browser path.

Fortinet’s CVE record lists Mac 7.4.0–7.4.7, Windows 7.4.0–7.4.7 and 7.2.0–7.2.14, and Windows PAM builds 7.4.7 and 7.2.14. The discoverer and CSIRT Panamá list a wider range for Windows PAM, 7.4.0–7.4.7 and 7.2.0–7.2.14. Apply the published updates across the wider Windows PAM ranges while confirming edition and branch with Fortinet. The Windows listener and process described by the discoverer can flag an installation for version checks. An investigation of endpoint activity is needed to establish compromise.
