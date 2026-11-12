---
title: FortiMail fixes five critical flaws in request handling, HA and encrypted mail
tags:
- Fortinet
- FortiMail
- RCE
summary: Fortinet’s November batch fixes three unauthenticated code execution paths and two identity-based encryption account or session takeovers. Update self-managed FortiMail. Fortinet says it fixed these five issues in FortiMail Cloud on October 5.
splash: Reachable FortiMail HTTP or HA services on affected builds. The HA join bug applies to 8.0 and 7.6 only.
wipe: Upgrade to 8.0.2, 7.6.7 or 7.4.9 or later on the matching line. Migrate 7.2 to a fixed release.
level: 3
date: '2026-11-10'
inTheWild: unknown
cves:
- id: CVE-2026-126147
  score: 9.8
  name: Path traversal
  description: An unauthenticated attacker can use crafted requests to execute code or commands.
- id: CVE-2026-126148
  score: 9.8
  name: HA join command injection
  description: Crafted high availability join request packets can execute code or commands without a login. The advisory applies only to the 8.0 and 7.6 branches.
- id: CVE-2026-126164
  score: 9.4
  name: SQL injection
  description: An unauthenticated attacker can use crafted requests to execute unauthorized code or commands.
- id: CVE-2026-126155
  score: 9.1
  name: IBE session takeover
  description: A crafted HTTP request can grant an unauthenticated attacker an authenticated identity-based encryption webmail session to read or send encrypted mail as a recipient.
- id: CVE-2026-126156
  score: 9.1
  name: IBE account takeover
  description: A crafted HTTP request can let an unauthenticated attacker take over an arbitrary identity-based encryption recipient account.
fixed:
- product: FortiMail 8.0
  branch: '8.0'
  version: 8.0.2
- product: FortiMail 7.6
  branch: '7.6'
  version: 7.6.7
- product: FortiMail 7.4
  branch: '7.4'
  version: 7.4.9
- product: FortiMail 7.2
  version: none
  status: Migrate to a fixed release
timeline:
- date: Oct 5, 2026
  title: Fortinet reports patching its cloud service
  body: The November advisories retrospectively date the FortiMail Cloud remediation to October 5.
- date: Nov 10, 2026
  title: Fortinet publishes the critical FortiMail advisories
  body: The advisories list affected builds, fixes and the separate HA and encrypted mail prerequisites.
checklist:
- title: Reduce reachability while arranging the upgrade
  hint: Check firewall rules for access to FortiMail web interfaces and HA traffic. Limit administration and HA access to trusted management clients and cluster peers. If you can temporarily restrict encrypted webmail access, coordinate with mail operators to avoid breaking legitimate delivery or recipient access.
- title: Back up, patch and verify every self-managed unit
  hint: Back up the configuration before upgrading. In System > Maintenance > Firmware or the vendor support portal, use the upgrade path for the installed branch. Migrate 7.2 to a fixed release. Afterward verify firmware on every HA member and test mail flow, IBE and failover as applicable.
- title: Investigate suspicious access and mail activity
  hint: Preserve appliance, proxy and firewall logs. Check for unexpected HTTP access, encrypted mail sessions, recipient account changes and unfamiliar HA join traffic. If compromise is suspected, contain the unit, preserve evidence and coordinate session revocation and credential rotation with Fortinet support.
sources:
- url: https://filestore.fortinet.com/fortiguard/psirt/csaf_improper-limitation-of-a-pathname-to-a-restricted-directory_fg-ir-26-199.json
  primary: true
  name: Fortinet CSAF FG-IR-26-199
  says: Vendor scope, score and remediation for CVE-2026-126147.
- url: https://filestore.fortinet.com/fortiguard/psirt/csaf_improper-neutralization-of-special-elements-used-in-an-os-command_fg-ir-26-200.json
  primary: true
  name: Fortinet CSAF FG-IR-26-200
  says: Vendor scope, score and remediation for CVE-2026-126148.
- url: https://filestore.fortinet.com/fortiguard/psirt/csaf_improper-neutralization-of-special-elements-used-in-an-sql-command_fg-ir-26-216.json
  primary: true
  name: Fortinet CSAF FG-IR-26-216
  says: Vendor scope, score and remediation for CVE-2026-126164.
- url: https://filestore.fortinet.com/fortiguard/psirt/csaf_incorrect-authorization_fg-ir-26-207.json
  primary: true
  name: Fortinet CSAF FG-IR-26-207
  says: Vendor scope, score and remediation for CVE-2026-126155.
- url: https://filestore.fortinet.com/fortiguard/psirt/csaf_authorization-bypass-through-user-controlled-key_fg-ir-26-208.json
  primary: true
  name: Fortinet CSAF FG-IR-26-208
  says: Vendor scope, score and remediation for CVE-2026-126156.
---

The five critical FortiMail advisories cover different paths. The path traversal and SQL injection allow code or command execution through crafted requests. The HA issue requires access to send crafted cluster join requests. The two IBE issues use HTTP and affect recipient account or webmail session handling.

All five cover 8.0.0–8.0.1 and 7.6.0–7.6.6. Four also cover 7.4.0–7.4.8 and all 7.2 builds. CVE-2026-126148 is the HA exception and does not affect those older lines. The vendor advises migration from 7.2 to a fixed release for the other four. Fortinet’s separate FortiMail Cloud statement applies to the five issues covered here. Check your deployment type before acting.

The reviewed sources do not establish exploitation or a victim count. This entry covers the five critical FortiMail advisories from this batch. FortiAuthenticator is covered in a [separate entry](/incidents/fortiauthenticator-november-security/).
