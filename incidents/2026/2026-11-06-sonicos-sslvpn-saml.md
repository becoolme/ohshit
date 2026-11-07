---
date: '2026-11-06'
title: SonicOS seven-flaw batch includes exploited SSLVPN SAML/MFA bypass
level: 4
tags:
- SonicWall
- SonicOS
- SSLVPN
summary: SonicWall fixes seven SonicOS flaws; CISA confirms exploitation of CVE-2026-19868. It bypasses SAML and its MFA using valid alternate-method credentials when SSLVPN SAML login is enabled. Gen7 and Gen8 fixes are 7.3.4-7013 and 8.2.3-8015; the other flaws have distinct prerequisites and impacts.
splash: Gen7 SonicOS ≤7.3.3-7015 or Gen8 ≤8.2.2-8015; exploited bypass needs SSLVPN SAML and valid alternate-method credentials.
wipe: Upgrade Gen7 to 7.3.4-7013+ or Gen8 to 8.2.3-8015+, then review VPN authentication and suspicious sessions.
inTheWild: 'yes'
inTheWildNote: CISA lists CVE-2026-19868 in KEV. Exploitation of the other six remains unconfirmed.
cves:
- id: CVE-2026-19868
  score: 7.5
  name: SSLVPN SAML authentication enforcement bypass
  description: Valid credentials for an alternate authentication method can bypass SAML controls, including SAML-enforced MFA, when SAML is enabled for SSLVPN login.
- id: CVE-2026-107155
  score: 8.8
  name: Permissive management cross-domain policy
  description: Under specific conditions, a remote unauthenticated attacker can perform unauthorized management operations; the score includes user interaction.
- id: CVE-2026-107154
  score: 8.8
  name: Management session validation
  description: Under specific conditions, a remote unauthenticated attacker can perform unauthorized management operations; the score includes user interaction.
- id: CVE-2026-82308
  score: 7.5
  name: SSL-VPN pre-authentication heap overflow
  description: A remote unauthenticated attacker may cause application-level denial of service in SSL-VPN. The advisory does not claim code execution.
- id: CVE-2026-77708
  score: 5.9
  name: TACACS+ pre-authentication stack overflow
  description: Under specific conditions, a remote unauthenticated attacker may cause application-level denial of service in the TACACS+ authentication client.
- id: CVE-2026-77709
  score: 5.9
  name: TACACS+ pre-authentication heap overflow
  description: Under specific conditions, a remote unauthenticated attacker may cause application-level denial of service in the TACACS+ authentication client.
- id: CVE-2026-19703
  score: 5.1
  name: Weak platform password hashing
  description: Existing high-privilege local access to a virtual appliance may expose a platform credential limited to a subset of platform settings.
fixed:
- product: SonicOS Gen7 hardware and NSv
  version: 7.3.4-7013
  status: Vendor fixed build
- product: SonicOS Gen8 hardware and NSv
  version: 8.2.3-8015
  status: Vendor fixed build
timeline:
- date: Nov 6, 18:40–19:06 UTC
  title: SonicWall discloses the seven CVEs
  body: The CNA records identify the same advisory batch. Their public disclosure timestamps span 18:40 to 19:06 UTC.
- date: Nov 6, 2026
  title: CISA adds the SSLVPN bypass to KEV
  body: The catalog lists November 20 as the federal remediation due date. Ransomware use is unknown.
checklist:
- title: Install the correct platform firmware
  hint: Check the hardware or NSv generation and exact running build in the administrative interface. The vendor lists Gen7 7.3.4-7013 as the minimum fix and 7.3.4-7015 as a later build. Use Gen8 8.2.3-8015 or a later supported build. Back up the configuration, check the model-specific upgrade path and test VPN connectivity after upgrading. Gen7 NSv on 7.0.1 requires a fresh install when moving to 7.1.x or later.
- title: Review SSLVPN authentication and sessions
  hint: Check whether SAML is enabled for SSLVPN login and which alternate methods and identities remain usable. Preserve VPN authentication, identity-provider and firewall logs. Correlate successful VPN sessions with expected SAML and MFA events. Investigate unusual users, source addresses and times, then revoke affected sessions and rotate exposed credentials from a clean admin system. Missing SAML events alone are insufficient evidence.
- title: Check management, TACACS+ and virtual-appliance exposure
  hint: Limit management and unnecessary VPN reachability while arranging the upgrade. Check TACACS+ dependencies and privileged NSv access separately. For Gen6 and older end-of-support firewalls, plan migration with SonicWall. The Gen7 and Gen8 builds do not apply to those devices.
sources:
- name: SonicWall support notice
  url: https://www.sonicwall.com/support/notices/kA1VN000002eBLN0A2
  primary: true
  says: November 3 advance notice, updated November 6. The table gives the exact affected and fixed builds for physical and virtual Gen7 and Gen8 firewalls.
- name: SonicOS Gen7 7.3.4-7015 release notes
  url: https://www.sonicwall.com/support/technical-documentation/docs/sonicos-7.3-release_notes/Content/sonicos-7-3-4-7015.htm
  primary: true
  says: Documents the later Gen7 build and the NSv upgrade constraint from 7.0.1.
- name: SonicOS Gen8 8.2.3-8015 release notes
  url: https://www.sonicwall.com/support/technical-documentation/docs/sonicos8-release_notes/Content/SonicOS-8-2-3-8015.htm
  primary: true
  says: Lists the hardware and NSv firmware and confirms the SSLVPN alternate-authentication fix.
- name: SonicWall CNA record for CVE-2026-19868
  url: https://cveawg.mitre.org/api/cve/CVE-2026-19868
  primary: true
  says: SonicWall identifies this issue in SNWLID-2026-0014. The score shown is CISA ADP CVSS 3.1.
- name: SonicWall CNA record for CVE-2026-107155
  url: https://cveawg.mitre.org/api/cve/CVE-2026-107155
  primary: true
  says: SonicWall identifies this issue in SNWLID-2026-0014. The score shown is CISA ADP CVSS 3.1.
- name: SonicWall CNA record for CVE-2026-107154
  url: https://cveawg.mitre.org/api/cve/CVE-2026-107154
  primary: true
  says: SonicWall identifies this issue in SNWLID-2026-0014. The score shown is CISA ADP CVSS 3.1.
- name: SonicWall CNA record for CVE-2026-82308
  url: https://cveawg.mitre.org/api/cve/CVE-2026-82308
  primary: true
  says: SonicWall identifies this issue in SNWLID-2026-0014. The score shown is CISA ADP CVSS 3.1.
- name: SonicWall CNA record for CVE-2026-77708
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77708
  primary: true
  says: SonicWall identifies this issue in SNWLID-2026-0014. The score shown is CISA ADP CVSS 3.1.
- name: SonicWall CNA record for CVE-2026-77709
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77709
  primary: true
  says: SonicWall identifies this issue in SNWLID-2026-0014. The score shown is CISA ADP CVSS 3.1.
- name: SonicWall CNA record for CVE-2026-19703
  url: https://cveawg.mitre.org/api/cve/CVE-2026-19703
  primary: true
  says: SonicWall identifies this issue in SNWLID-2026-0014. The score shown is CISA ADP CVSS 3.1.
- name: CISA Known Exploited Vulnerabilities catalog
  url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
  primary: true
  says: Confirms known exploitation of CVE-2026-19868 and gives the November 20 federal due date.
---

The exploited path requires SSLVPN with SAML login and valid credentials for an alternate method. That path can skip the expected SAML controls, including SAML-enforced MFA. CISA confirms exploitation of CVE-2026-19868. The reviewed records provide no victim count or incident-specific indicators.

The other CVEs cover two management-interface flaws, an SSL-VPN denial of service, two conditional TACACS+ denial-of-service paths and weak password hashing on virtual appliances. The management scores include user interaction. The virtual-appliance issue requires local access and CISA's assessment includes high privileges. The overflow reports describe denial of service.

SonicWall announced the batch on November 3 and published the individual CVE details on November 6. The linked PSIRT detail page returned no readable text during this check. The vendor support notice and release notes establish the firmware thresholds, while the SonicWall CNA records supply the individual descriptions. CISA ADP supplies the listed CVSS 3.1 scores. This batch concerns SonicOS firewall firmware.
