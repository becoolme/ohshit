---
title: Unsupported SonicWall GMS exposes internal files without authentication
level: 3
date: '2026-11-03'
tags: [SonicWall, GMS, information disclosure]
summary: SonicWall discloses unauthenticated internal-file access and a separate authenticated SQL-injection flaw in end-of-life GMS 9.5.2 and earlier on Windows and Linux. Network reachability is required. CISA’s November 3 assessment records no exploitation; a fixed build was not established from readable vendor material.
splash: Network-reachable SonicWall GMS 9.5.2 and earlier on Windows/Linux; SQL injection additionally requires authentication.
wipe: Restrict GMS to trusted management networks and plan retirement or migration with SonicWall; verify remediation through support.
inTheWild: unknown
inTheWildNote: CISA’s November 3 assessment records no exploitation; no verified attack report was found.
cves:
- id: CVE-2026-109593
  score: 9.1
  name: Unauthenticated internal-file disclosure
  description: A network-reachable attacker may read internal GMS files without authentication. The 9.1 score is CISA ADP’s CVSS 3.1 assessment.
- id: CVE-2026-109594
  score: 6.8
  name: Authenticated SQL injection
  description: Under unspecified conditions, an authenticated attacker may access or modify GMS database information. CISA ADP assigns CVSS 3.1 6.8 and a high-privilege prerequisite.
timeline:
- date: Nov 3, 2026
  title: SonicWall publishes both CVE records for the same GMS advisory
  body: The records identify Windows/Linux GMS 9.5.2 and earlier as affected and unsupported. CISA’s accompanying assessments record no exploitation.
checklist:
- title: Find and restrict reachable GMS management systems
  hint: Inventory GMS versions on Windows and Linux and check firewall, reverse-proxy and access-control rules. Remove public or untrusted access; permit only the administrative networks that need it. Authentication alone does not address the file-read flaw. Network restriction reduces exposure but does not fix the software.
- title: Plan retirement or migration through SonicWall support
  hint: The vendor’s CVE records identify these GMS versions as end-of-life. Ask SonicWall for the supported replacement and a configuration/database migration plan. The linked PSIRT page was a script-only shell during verification, so no fixed build or release threshold is asserted here; do not infer a safe release above 9.5.2.
- title: Investigate suspicious access using preserved records
  hint: Preserve GMS application, authentication, reverse-proxy and network logs before migration. Review unexpected source addresses, file-access activity and authenticated database requests with your security team. The readable records publish no exploit paths or dedicated indicators; do not treat a quiet log review as proof of safety. If exposure is confirmed, scope affected secrets before replacing them from a clean administrative system.
sources:
- name: SonicWall CNA record for CVE-2026-109593
  url: https://cveawg.mitre.org/api/cve/CVE-2026-109593
  primary: true
  says: SonicWall-authored affected versions, Windows/Linux platforms, unauthenticated network file-read description and unsupported tag. CISA ADP supplies CVSS 3.1 9.1 and a November 3 exploitation-none assessment.
- name: SonicWall CNA record for CVE-2026-109594
  url: https://cveawg.mitre.org/api/cve/CVE-2026-109594
  primary: true
  says: Same SNWLID-2026-0019 batch, end-of-life versions and conditional authenticated SQL injection. CISA ADP supplies CVSS 3.1 6.8 with high privileges and an exploitation-none assessment.
---

SonicWall’s November 3 records cover two flaws in Global Management System 9.5.2 and earlier on Windows and Linux. CVE-2026-109593 requires network access but no login; internal files may contain sensitive information. CVE-2026-109594 is a separate post-authentication database issue with additional conditions not specified in the readable description. It must not be presented as unauthenticated SQL injection or as a demonstrated exploit chain.

The records mark the affected software unsupported, and the SQL-injection description explicitly calls it end-of-life. The [linked PSIRT advisory](https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0019) returned only a script-rendered shell; no migration destination, fixed version or vendor-specific workaround was verified from that page. Network isolation and a support-led retirement plan are defensive precautions, not a claimed software fix.

CISA’s November 3 assessments record no exploitation, which is not a guarantee against later attacks. No actual victims, confirmed leak volume or published exploit was established in the reviewed primary material. L3 reflects unauthenticated file access in centralized firewall-management software; the cited records do not establish a compromise of SonicOS firewalls or every SonicWall product.
