---
title: SonicOS seven-flaw batch includes exploited SSLVPN SAML/MFA bypass
level: 4
date: '2026-11-06'
tags:
- SonicWall
- SonicOS
- SSLVPN
summary: SonicWall fixes seven SonicOS flaws; CISA confirms exploitation of CVE-2026-19868. It bypasses SAML and its MFA using valid alternate-method credentials when SSLVPN SAML login
  is enabled. Gen7 and Gen8 fixes are 7.3.4-7013 and 8.2.3-8015; the other flaws have distinct prerequisites and impacts.
splash: Gen7 SonicOS ≤7.3.3-7015 or Gen8 ≤8.2.2-8015; exploited bypass needs SSLVPN SAML and valid alternate-method credentials.
wipe: Upgrade Gen7 to 7.3.4-7013+ or Gen8 to 8.2.3-8015+, then review VPN authentication and suspicious sessions.
inTheWild: 'yes'
inTheWildNote: CISA KEV confirms CVE-2026-19868 exploitation; not confirmation for the other six flaws.
cves:
- id: CVE-2026-19868
  score: 7.1
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
  score: 5.2
  name: Weak platform password hashing
  description: Existing local access to a virtual appliance may expose a platform credential limited to a subset of platform settings.
fixed:
- product: SonicOS Gen7 hardware and NSv
  version: 7.3.4-7013
  status: Vendor fixed build
- product: SonicOS Gen8 hardware and NSv
  version: 8.2.3-8015
  status: Vendor fixed build
timeline:
- date: Nov 6, 2026
  title: SonicWall publishes the seven-flaw advisory
  body: The vendor investigates potential exploitation of the SSLVPN bypass and urges upgrade; no workaround is provided.
- date: Nov 6, 2026
  title: CISA adds the SSLVPN bypass to KEV
  body: The catalog lists November 20 as the federal remediation due date; it does not supply victim counts or establish exploitation of the six other flaws.
checklist:
- title: Install the correct platform firmware
  hint: Inventory hardware/NSv generation and the exact running SonicOS build in the administrative interface. Obtain the matching Gen7 7.3.4-7013 or Gen8 8.2.3-8015 (or later vendor-supported
    build) through official SonicWall channels. Preserve a configuration backup and follow the platform upgrade procedure; verify the running build and VPN connectivity afterward. Do
    not infer safety from a higher marketing version alone.
- title: Review SSLVPN authentication and sessions
  hint: Check whether SAML is enabled for SSLVPN login and which alternate methods and identities remain usable. Preserve VPN authentication, identity-provider and firewall logs; correlate
    successful VPN sessions with expected SAML/MFA events and investigate unfamiliar identities, source addresses or times. An absence of SAML events alone does not prove exploitation.
    Scope suspicious access and revoke affected sessions or replace exposed credentials through a clean administrative path. The vendor lists no workaround; MFA settings alone are not
    a substitute for firmware fixes.
- title: Check the other affected interfaces separately
  hint: Review management-interface exposure, TACACS+ dependencies and NSv local access with the security team. Limit unnecessary administrative reachability as a precaution, while upgrading.
    The seven flaws are one advisory batch, not a proven exploit chain; no dedicated attack indicators or exact incident log signatures are published in the reviewed advisory.
sources:
- name: SonicWall SNWLID-2026-0014 original advisory
  url: https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0014
  primary: true
  says: 'Read in the rendered browser: seven flaws, individual scores/prerequisites, both hardware/NSv generations and exact fixed builds; no workaround.'
- name: SonicWall CNA record for the exploited bypass
  url: https://cveawg.mitre.org/api/cve/CVE-2026-19868
  primary: true
  says: First public November 6; alternate valid credentials can bypass SAML/MFA in affected Gen7/Gen8 SonicOS.
- name: CISA KEV catalog
  url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
  primary: true
  says: November 6 addition confirms known exploitation of CVE-2026-19868; November 20 federal due date, ransomware use unknown.
---

The exploited path requires SSLVPN login with SAML enabled and valid credentials for another authentication method. It is not an unauthenticated bypass of every SonicWall service. The separate management flaws include user interaction in their scoring; the overflow descriptions claim application denial of service, not remote code execution. The local credential issue concerns virtual appliances.

The advisory covers Gen7 and Gen8 hardware firewalls and NSv deployments on supported hypervisors/clouds. Use its platform table for the exact appliance. CISA confirms exploitation of one member of this batch, while SonicWall describes its investigation as potential exploitation. Neither source publishes a victim total, incident-specific indicators or proof that all seven flaws have been chained. This is distinct from the older GMS disclosure held by PR #82.
