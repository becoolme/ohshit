---
title: "Ivanti Connect Secure zero-day chain: unauthenticated root on fully patched VPN boxes, again"
headline: "Ivanti Connect Secure: root on a patched VPN, for the nth time"
level: 4
date: 2026-10-13
tags: [zero-day, VPN, edge device]
ecosystems: [ivanti]
summary: >-
  Attacker UTA0576 chained an auth bypass, a file write and a privilege escalation to take over VPN appliances
  running the latest release, then went after AD credentials, LAPS passwords and BitLocker keys. CISA added it
  to KEV the same day.
splash: "Internet-facing Ivanti Connect Secure 22.8R2.4, 25.1.1.1, 25.1.2.2 and earlier"
wipe: "Patch to 22.8R2.5 / 25.1.1.2 / 25.1.3.x, run Ivanti's external Integrity Checker, rotate every credential that touched the box"
inTheWild: "yes"
inTheWildNote: Exploited since early October; in CISA KEV
oneLiner: >-
  Send one magic header to skip the login, write a file through an update CGI, then use a local bug to become
  root: three steps, zero passwords, on the box that guards your network.
cves:
  - id: CVE-2026-104935
    score: 8.6
    name: Auth bypass + arbitrary file write
    description: >-
      Covers two of the three chained bugs: an authentication bypass via the X-DSCGI-PATH header and a file
      write in wu.cgi that leads to code execution.
    plain: the bouncer lets in anyone wearing a lanyard, and the lanyard is printed on the door.
fixed:
  - { product: Ivanti Connect Secure 22.8, version: 22.8R2.5 }
  - { product: Ivanti Connect Secure 25.1, version: 25.1.1.2 / 25.1.3.0 / 25.1.3.1 }
  - { product: Privilege escalation in dsinvoked, version: none, status: "No CVE, no patch at disclosure. Fix promised “in coming weeks”" }
timeline:
  - date: Oct 1, 2026
    title: Earliest exploitation
    body: According to Defused Cyber honeypots and Volexity's Koessel. Volexity's blog says Oct 3.
  - date: Oct 5, 2026
    title: Volexity starts investigating a compromised appliance
    body: The box ran 22.8R2.4, the latest release at the time.
  - date: Oct 13, 2026
    title: Ivanti patches; Volexity publishes; CISA adds it to KEV
  - date: Oct 14, 2026
    title: Previdian logs 105 exploit attempts from 50 IPs
  - date: Oct 16, 2026
    title: CISA deadline for US federal agencies
checklist:
  - title: Patch every Connect Secure appliance
    hint: 22.8R2.5 or 25.1.1.2 / 25.1.3.x
  - title: Run the external Integrity Checker Tool
    hint: The attacker tampered with logs to fool the internal one
  - title: Reset AD service accounts the VPN uses
    hint: LDAP bind accounts were a target
  - title: Rotate LAPS passwords and BitLocker recovery keys
    hint: Both were pulled from AD
  - title: Hunt for Kerberoasting
    hint: Unusual TGS requests from the VPN's IP since Oct 1
  - title: Plan for the unpatched privesc
    hint: Restrict management access and watch for Ivanti's follow-up fix
sources:
  - name: Volexity
    url: https://www.volexity.com/blog/2026/10/13/a-series-of-unauthenticated-events-chained-exploitation-of-ivanti-connect-secure-zero-days/
    says: Full chain analysis, actor UTA0576, timeline, IOCs
    primary: true
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/cisa-urges-immediate-ivanti-connect.html
    says: CISA KEV entry and deadline; fixed versions
  - name: BleepingComputer
    url: https://www.bleepingcomputer.com/news/security/ivanti-warns-of-connect-secure-zero-day-exploited-in-attacks/
    says: Ivanti advisory coverage
  - name: CyberScoop
    url: https://cyberscoop.com/ivanti-connect-secure-zero-day-actively-exploited/
    says: Exploitation context
---

Volexity found the attacker, tracked as **UTA0576**, on a Connect Secure appliance running **22.8R2.4**,
the latest version at the time. The chain:

1. **Auth bypass** through the `X-DSCGI-PATH` header
2. **File write → code execution** in `wu.cgi` (1 and 2 together are CVE-2026-104935, CVSS 8.6)
3. **Privilege escalation** in `dsinvoked`, which has no public CVE and **was still unpatched at disclosure**

The attacker left no web shell. It simply re-exploited the box for every command and tampered with logs to
get past Ivanti's internal Integrity Checker. From there it went after LDAP/AD credentials, LAPS passwords
and BitLocker keys, and ran Kerberoasting.

Volexity has medium confidence that the actor used LLMs to build its tooling, and low confidence that it is
criminal rather than espionage. Ivanti's own advisory was not reachable for our review. The fixed-version
list comes from secondary press, so double-check it against Ivanti's portal.
