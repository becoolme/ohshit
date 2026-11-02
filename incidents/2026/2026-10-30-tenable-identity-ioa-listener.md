---
title: Tenable Identity Exposure fixes SYSTEM command injection in its AD events listener
level: 3
date: '2026-10-30'
tags:
- Active Directory
- Tenable
- RCE
summary: 'Tenable Identity Exposure fixes three flaws, including authenticated command injection that can run as SYSTEM on the PDC emulator. Upgrade to 3.93.6 or 3.77.18, then uninstall and reinstall the IoA script on domain controllers: upgrading alone retains the vulnerable listener.'
splash: Identity Exposure <=3.93.5 / <=3.77.17; command injection requires an authenticated account with IoA configuration write access
wipe: Upgrade to 3.93.6 or 3.77.18, then reinstall the IoA script on domain controllers; check custom RSA certificates before upgrading
inTheWild: unknown
inTheWildNote: The advisory reports fixes, not confirmed real-world exploitation.
cves:
- id: CVE-2026-119314
  score: 9.9
  name: AD events-listener command injection
  description: An authenticated low-privileged attacker with write access to IoA configuration can run commands as SYSTEM on the PDC emulator; score is CVSS 3.1.
- id: CVE-2026-119315
  score: 4.3
  name: GraphQL resource exhaustion
  description: An authenticated low-privileged user can submit queries that consume excessive server resources; CVSS 3.1.
- id: CVE-2026-119316
  score: 4.1
  name: Secure Relay linking-key log disclosure
  description: Failed Secure Relay installation writes its linking key to a local error log readable by a user with host access; CVSS 3.1.
fixed:
- product: Identity Exposure 3.93
  branch: '3.93'
  version: 3.93.6
  status: Patched; IoA script reinstall also required
- product: Identity Exposure 3.77
  branch: '3.77'
  version: 3.77.18
  status: Patched; IoA script reinstall also required
timeline:
- date: Oct 30, 2026
  title: TNS-2026-34 and both fixed releases published
  body: Release notes require reinstalling the IoA script after upgrading and checking custom TLS certificate key sizes beforehand.
checklist:
- title: Prepare the correct fixed release
  hint: Use the Tenable Downloads Portal for Identity Exposure 3.93.6 or 3.77.18 as appropriate to your deployment. Before upgrading, verify custom TLS certificates and their issuing CA use RSA keys of at least 2048 bits; the bundled Node.js 24 rejects shorter keys. Follow the linked on-premises release notes.
- title: Reinstall the IoA script after upgrading
  hint: On the domain controllers, follow the release procedure to uninstall Indicators of Attack with Register-TenableIOA.ps1 -Uninstall, then install it again. A platform upgrade alone leaves the old IoA events listener installed; verify the refreshed listener is deployed before treating the command-injection fix as applied.
- title: Review configuration writers and relay installation logs
  hint: Review accounts able to write IoA configuration and unexpected changes or command execution on the PDC emulator. Restrict access to failed Secure Relay installation logs, preserve relevant evidence, and work with established Tenable support to replace any exposed linking key. A log entry or failed installation alone is not proof of exploitation.
sources:
- name: Tenable original TNS-2026-34 advisory
  url: https://www.tenable.com/security/tns-2026-34
  primary: true
- name: Tenable full 2026 on-premises release notes
  url: https://docs.tenable.com/release-notes/Content/identity-exposure/onprem/2026.htm
  primary: true
---

The primary advisory lists versions 3.93.5 and earlier and 3.77.17 and earlier as affected. The release notes narrow the command-injection prerequisite to an account able to write the IoA configuration; this is not an unauthenticated domain-controller takeover. The advisory gives CVSS 3.1 scores of 9.9, 4.3 and 4.1, and separate CVSS 4.0 scores of 9.4, 5.3 and 5.6.

Both fixed-release notes require the post-upgrade IoA uninstall/reinstall and warn about custom RSA certificates below 2048 bits. They also describe a separate internal-request error-message disclosure fix without assigning another CVE on this advisory page. No exploitation, victim count or incident-specific indicator list is provided. Review permissions and credential exposure as well as the installed product version.
