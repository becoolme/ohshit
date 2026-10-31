---
title: "Ivanti Connect Secure zero-day chain: unauthenticated root on fully patched VPN boxes, again"
headline: "Ivanti Connect Secure: root on a patched VPN, for the nth time"
level: 4
date: 2026-10-13
updated: 2026-10-31
tags: [zero-day, VPN, edge device]
ecosystems: [ivanti]
summary: >-
  Attacker UTA0576 chained an auth bypass, a file write and a privilege escalation to take over VPN appliances
  running the latest release, then went after AD credentials, LAPS passwords and BitLocker keys. CISA added it
  to KEV the same day.
splash: "Reachable ICS 22.8 through R2.5, 25.1.1 through .2 or 25.1.2 through .2; 25.1.3 migration requires its new platform"
wipe: "Update to 22.8R2.6 / 25.1.1.3 or an applicable 25.1.3 platform; investigate compromise and rotate exposed credentials"
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
  - id: CVE-2026-111357
    score: 8.8
    name: Local privilege escalation
    description: A locally authenticated attacker can escalate privileges; chained exploitation is confirmed.
  - id: CVE-2026-118527
    score: 4.3
    name: Predictable upload filenames
    description: A remotely authenticated attacker can upload controlled content to a known disk location.
fixed:
  - { product: Ivanti Connect Secure 22.8, version: 22.8R2.6 }
  - { product: Ivanti Connect Secure 25.1.1, version: 25.1.1.3 }
  - { product: Ivanti Connect Secure 25.1.3 new platform, version: 25.1.3.0, status: Vendor says this platform is unaffected; migration requirements apply }
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
  - date: Oct 29, 2026
    title: Ivanti patches two additional chain flaws
    body: Volexity identifies the formerly unnumbered privilege escalation as CVE-2026-111357.
  - date: Oct 30, 2026
    title: CISA adds CVE-2026-111357 and CVE-2026-118527 to KEV
    body: Federal deadlines are November 2 and November 13 respectively; the former requires forensic triage.
checklist:
  - title: Patch every Connect Secure appliance
    hint: Use 22.8R2.6 or 25.1.1.3; earlier fixes do not cover the full chain. Ivanti prefers migration from 22.8 to 25.1. The 25.1.3 platform is unaffected but requires ISA4500/6500/8500 hardware or newly built virtual/cloud devices from its template. Both 22.7 and 22.8 reach end of life January 31, 2027.
  - title: Run the external Integrity Checker Tool
    hint: Run the vendor checker regularly, but a clean result cannot exclude this memory-based chain. Preserve evidence and arrange network and memory forensics if compromise is suspected; follow Ivanti Recovery Steps through its advisory.
  - title: Reset AD service accounts the VPN uses
    hint: LDAP bind accounts were a target
  - title: Rotate LAPS passwords and BitLocker recovery keys
    hint: Both were pulled from AD
  - title: Hunt for Kerberoasting
    hint: Unusual TGS requests from the VPN's IP since Oct 1
  - title: Track the additional federal deadlines
    hint: For covered federal systems, CVE-2026-111357 is due November 2 with forensic triage required; CVE-2026-118527 is due November 13. These do not extend the original October 16 deadline. Restrict management access while completing remediation.
  - title: Hunt for the published network indicator
    hint: Volexity's downloadable list contains one IP, 108.165.147[.]64. Check appliance and upstream logs for it and requests to /dana-na/auth/url_default/welcome.cgi with X-DSCGI-PATH targeting /home/webserver/htdocs/dana/fb/smb/wu.cgi or /home/runtime/tmp/<MD5(filename)>. Review the linked analysis for its additional file artifacts; a match alone is not proof, and absent logs do not establish safety.
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
  - name: Ivanti updated vendor advisory
    url: https://hub.ivanti.com/s/article/Security-Advisory-Ivanti-Connect-Secure-CVE-2026-104935?language=en_US
    primary: true
    says: Full October 29 update read in public browser, including per-CVE versions and platform migration requirements.
  - name: CISA KEV original catalog
    url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
    primary: true
  - name: Volexity complete downloadable IoC list
    url: https://github.com/volexity/threat-intel/blob/main/2026/2026-10-13%20Ivanti/iocs.csv
    primary: true
---

Volexity found the attacker, tracked as **UTA0576**, on a Connect Secure appliance running **22.8R2.4**,
the latest version at the time. The chain:

1. **Auth bypass** through the `X-DSCGI-PATH` header
2. **File write → code execution** in `wu.cgi` (1 and 2 together are CVE-2026-104935, CVSS 8.6)
3. **Privilege escalation** in `dsinvoked`, which has no public CVE and **was still unpatched at disclosure**

The attacker left no web shell. It simply re-exploited the box for every command and tampered with logs to
get past Ivanti's internal Integrity Checker. From there it went after LDAP/AD credentials, LAPS passwords
and BitLocker keys, and deployed a Kerberos tool capable of Kerberoasting. The report does not establish that the accompanying credential-test script used that capability.

Volexity has medium confidence that the actor used LLMs to build its tooling, and low confidence that it is
criminal rather than espionage. At the original review, Ivanti's advisory was unreachable and the version
list relied on secondary press. The current vendor-verified table and update below replace that evidence gap.

**October 31 update:** The description above records the initial disclosure. Volexity's October 29 update and Ivanti now confirm a patch for the formerly unnumbered privilege escalation, CVE-2026-111357; Ivanti also adds CVE-2026-118527. CISA listed both on October 30. The earlier patch thresholds and “unpatched” status are superseded by the current table. Ivanti's full advisory is now readable and confirms limited-customer exploitation of the three-flaw chain. This is not a new incident or proof that patching removes an existing compromise.
