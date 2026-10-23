---
title: "Arista confirms active exploitation of VeloCloud Orchestrator SQL injection"
level: 4
date: 2026-10-22
tags: [Arista, VeloCloud, SD-WAN, exploited]
ecosystems: [velocloud]
summary: "CVE-2026-114625 lets an authenticated VeloCloud Orchestrator user gain operator privileges. Arista confirms attacks; hosted instances are patched, while on-premises operators must upgrade."
splash: "VCO 5.2, 6.1 and 6.4 below the listed fixes; unsupported versions are unassessed"
wipe: "Upgrade to VCO 5.2.3.18, 6.1.3.10 or 6.4.2.12; restrict web access and investigate compromise"
inTheWild: yes
inTheWildNote: "Arista advisory 0199 confirms active exploitation"
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
checklist:
  - title: Restrict access and upgrade on-premises VCO
    hint: Hosted and Dedicated VCO are already patched. On-prem web access is exposed by default; allow trusted admin networks only
  - title: Investigate suspicious access before discarding evidence
    hint: Preserve web, application, system and database logs; check 74.82.197.86 and 38.54.50.151
  - title: Review administrator changes and unexpected outbound connections
    hint: Also hunt for webshells and backdoor daemons; block outbound ports VCO doesn't need
sources:
  - name: Arista security advisory 0199
    url: https://www.arista.com/en/support/advisories-notices/security-advisory/24838-security-advisory-0199
    primary: true
---

**L4:** confirmed exploitation of the SD-WAN management plane. Access requires a portal session and network reachability. Hosted and Dedicated VCO are already patched; Gateway and Edge are not affected by this flaw.

The score is CVSS 3.1; Arista also assigns CVSS 4.0 9.4. Victim totals and attack start dates are undisclosed. Patching does not establish that an already compromised host is clean. Four-component vendor versions are preserved without an interactive checker.
