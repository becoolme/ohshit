---
title: "Arista confirms active exploitation of VeloCloud Orchestrator SQL injection"
level: 4
date: 2026-10-22
updated: 2026-10-23
tags: [Arista, VeloCloud, SD-WAN, exploited]
ecosystems: [velocloud]
summary: "CVE-2026-114625 lets an authenticated VeloCloud Orchestrator user gain operator privileges. Arista confirms attacks; hosted instances are patched, while on-premises operators must upgrade."
splash: "Web-reachable VCO below the listed fixes plus a valid portal session; Enterprise Read Only is sufficient"
wipe: "Upgrade to VCO 5.2.3.18, 6.1.3.10 or 6.4.2.12; restrict web access and investigate compromise"
inTheWild: yes
inTheWildNote: "Arista confirms exploitation; CISA added it to KEV on October 23"
cves:
  - id: CVE-2026-114625
    score: 9.9
    name: Authenticated SQL injection
    description: Even an Enterprise Read Only user can gain superuser operator privileges.
fixed:
  - { product: VCO 5.2, version: 5.2.3.18 }
  - { product: VCO 6.1, version: 6.1.3.10 }
  - { product: VCO 6.4, version: 6.4.2.12 }
timeline:
  - date: Oct 22, 2026
    title: Arista discloses exploitation and fixes
  - date: Oct 23, 2026
    title: CISA adds the vulnerability to KEV
    body: The entry flags forensic triage and gives October 26 as the federal remediation due date.
checklist:
  - title: Restrict access and upgrade on-premises VCO
    hint: Hosted and Dedicated VCO are already patched. On-prem web access is exposed by default; allow trusted admin networks only
  - title: Investigate suspicious access before discarding evidence
    hint: Preserve web, application, system and database logs and filesystem timestamps before remediation where feasible; check 74.82.197.86 and 38.54.50.151. A match alone does not prove compromise
  - title: Review administrator changes and unexpected outbound connections
    hint: Also hunt for webshells and backdoor daemons; block outbound ports VCO doesn't need
  - title: Track the CISA deadline and forensic triage requirement
    hint: Federal civilian agencies must follow the KEV entry and applicable BOD 26-04 guidance by October 26; other operators should prioritize exposed assets and preserve evidence
sources:
  - name: Arista security advisory 0199
    url: https://www.arista.com/en/support/advisories-notices/security-advisory/24838-security-advisory-0199
    primary: true
  - name: CISA KEV catalog, October 23
    url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
    says: CVE-2026-114625 added October 23; due October 26; forensic triage flagged
    primary: true
---

**L4:** confirmed exploitation of the SD-WAN management plane. Access requires a portal session and network reachability. Hosted and Dedicated VCO are already patched; Gateway and Edge are not affected by this flaw.

The score is CVSS 3.1; Arista also assigns CVSS 4.0 9.4. Victim totals and attack start dates are undisclosed. Patching does not establish that an already compromised host is clean. Four-component vendor versions are preserved without an interactive checker.

**October 23:** CISA added this CVE to its Known Exploited Vulnerabilities catalog, with an October 26 remediation due date and forensic triage flagged. The federal requirement is separate from the vendor's advice to all operators to patch promptly. This corroborates the already confirmed attacks; no new victim count is established.
