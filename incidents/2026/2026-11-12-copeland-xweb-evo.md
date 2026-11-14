---
title: Copeland XWEB EVO flaws expose refrigeration controllers to remote takeover
level: 3
date: '2026-11-12'
tags: [Copeland, Dixell, XWEB EVO, OT]
summary: VulnCheck published 14 flaws in the unsupported XWEB EVO family and observed requests targeting two of them on its canaries. Legacy units can expose root command execution without a login, and predictable credentials remain in 5.8.8.
splash: Copeland and Dixell XWEB EVO units reachable over the network, including refrigeration management interfaces.
wipe: Remove direct internet access, isolate the controllers, review logs and settings, and plan migration to a supported system.
inTheWild: disputed
inTheWildNote: VulnCheck saw crafted requests on canaries. Production compromise is unconfirmed.
cves:
  - id: CVE-2026-124002
    score: 9.3
    name: Username command injection
    description: 5.2.3 to before 5.7.0. The login username is processed by the shell before authentication.
  - id: CVE-2026-124003
    score: 8.5
    name: Privileged Lua interpreter injection
    description: Before 5.6.2. The setuid-root interpreter can pass crafted arguments to the shell.
  - id: CVE-2026-124004
    score: 9.3
    name: Hardcoded Administrator backdoor
    description: Before 5.6.2. A hardcoded credential grants an Administrator session.
  - id: CVE-2026-124005
    score: 9.2
    name: Predictable daily administrator password
    description: 4.3.0 through 5.8.8. The daily credential can be calculated from the device MAC address and date.
  - id: CVE-2026-124006
    score: 9.2
    name: Predictable Linux root password
    description: Through 5.8.8. The root credential is deterministic and derives from the daily code on newer firmware.
  - id: CVE-2026-124007
    score: 9.2
    name: Password field command injection
    description: Before 5.6.2. Shell metacharacters in the password field can reach a command before authentication.
  - id: CVE-2026-124008
    score: 8.6
    name: Device template command injection
    description: 5.2.3 through 5.8.8. An authenticated caller can inject commands through template handling.
  - id: CVE-2026-124009
    score: 8.6
    name: Backup command injection
    description: 5.2.3 through 5.8.8. An authenticated caller can inject commands through the backup output path.
  - id: CVE-2026-124010
    score: 9.3
    name: Unauthenticated root command execution
    description: Before 5.6.2. A request to xwconsole.cgi can run commands as root without a login.
  - id: CVE-2026-124011
    score: 6.9
    name: MAC address and clock disclosure
    description: 5.6.2 through 5.8.8. An unauthenticated endpoint exposes inputs for deriving the daily password.
  - id: CVE-2026-124012
    score: 9.2
    name: Administrator daily-password bypass
    description: 5.6.2 through 5.8.8. The built-in Administrator account accepts the derived daily credential.
  - id: CVE-2026-124013
    score: 8.7
    name: Configuration import command injection
    description: 5.6.2 through 5.8.8. Authenticated callers can inject shell input in configuration import or restore.
  - id: CVE-2026-124014
    score: 8.8
    name: Unauthenticated configuration write
    description: The CNA lists 4.3.0 through 5.8.8. A caller can overwrite the system configuration without a login.
  - id: CVE-2026-124015
    score: 8.2
    name: Session bypass in password reset
    description: The CNA lists 5.6.2 through 5.8.8. An unauthenticated caller can reset an account flagged to change its password at next login.
fixed:
  - product: XWEB EVO through 5.8.8
    version: none
    status: End of software support. No release addresses the entire batch.
timeline:
  - date: Mar 16, 2026
    title: Copeland ends software support
    body: Copeland recommends XWEB PRO as the replacement and interim network restrictions for EVO.
  - date: Nov 12, 2026
    title: The CNA publishes 14 vulnerability records
    body: The batch covers command execution, predictable credentials, configuration access and password reset bypass.
  - date: Nov 12, 22:00 UTC
    title: A VulnCheck canary detects configuration-write attempts
    body: Requests matched CVE-2026-124014. VulnCheck counted 125 hits through November 13 at 06:16 UTC.
  - date: Nov 13, 03:41 UTC
    title: A second source probes the legacy root endpoint
    body: Four CVE-2026-124010 requests to the canaries asked the endpoint to run id, without a second stage reported.
  - date: Nov 13, 2026
    title: VulnCheck publishes its firmware analysis and telemetry
    body: The report describes lab reproduction and the two observed request patterns.
checklist:
  - title: Remove direct access to the controller
    hint: Work with facilities staff and the refrigeration contractor. Identify EVO model and firmware from inventory or its management console. Remove public port forwards and restrict inbound and outbound traffic on a dedicated network. Allow HTTPS management and necessary SSH access only from approved hosts via controlled remote access. Verify alarms and refrigeration monitoring still function.
  - title: Hunt for the requests recorded by VulnCheck
    hint: Search firewall, proxy and device logs for 202.61.138.117 (AS152194), unauthenticated POST to config.lua with action=set, and 177.4.12.11 (AS140227), unauthenticated GET to /cgi-bin/xwconsole.cgi with sh=id and User-Agent Mozilla/5.0. The canary rules are VULNCHECK CVE-2026-124014 Copeland XWEB EVO Unauthenticated config.lua Configuration Write Attempt and VULNCHECK CVE-2026-124010 Copeland XWEB EVO xwconsole.cgi Unauthenticated Root Command Execution Attempt. Compare /etc/xwebconfig.json with a trusted baseline and check for unexpected administrator sessions, SSH enablement and defrost or alarm changes. A match alone does not prove compromise.
  - title: Recover and replace affected EVO devices
    hint: Preserve available logs and settings. If compromise is suspected, coordinate safe isolation with the refrigeration contractor. Follow vendor guidance to recover with known-good firmware and configuration or replace the device. Rotate operator and remote-access credentials from a clean system. Copeland recommends moving to a supported XWEB PRO model. Verify current firmware and advisories for the replacement model before reconnecting it.
sources:
  - name: VulnCheck original XWEB EVO research
    url: https://www.vulncheck.com/blog/copeland-xweb-evo-unauthenticated-root
    says: Reports 14 findings, lab reproduction and two observed request patterns.
    primary: true
  - name: VulnCheck CNA record for CVE-2026-124014
    url: https://cveawg.mitre.org/api/cve/CVE-2026-124014
    says: Lists 4.3.0 through 5.8.8 as affected by configuration write.
    primary: true
  - name: VulnCheck CNA record for CVE-2026-124015
    url: https://cveawg.mitre.org/api/cve/CVE-2026-124015
    says: Lists 5.6.2 through 5.8.8 as affected by password-reset bypass.
    primary: true
  - name: Copeland XWEB EVO end-of-support bulletin
    url: https://webapps.copeland.com/dixell/Content/Pages/AdvertisingMaterials/ProductNews/XWEB%20EVO%20EoS%20-%20Product_Bulletin_March_2026.pdf
    says: Ends software support on March 16, 2026 and recommends migration and interim controls.
    primary: true
  - name: Copeland network security guidance
    url: https://webapps.copeland.com/Dixell/Content/Pages/Manuals/XWEB/SECURITYBESTPRACTICES/Product_Bulletin.pdf
    says: Advises removing internet access, filtering traffic and restricting SSH.
    primary: true
---

A reachable legacy XWEB EVO management interface can expose configuration writes or root command execution without an account. On firmware up to 5.8.8, the batch also includes predictable credentials and routes to administrative or root access. The research narrative describes some Lua paths as legacy-only, while the CNA records list CVE-2026-124008, CVE-2026-124009, CVE-2026-124014 and CVE-2026-124015 through 5.8.8. The published range for CVE-2026-124015 starts at 5.6.2. Use the CNA ranges for triage and ask Copeland about the exact model and build. Version 5.6.2 removes the specific xwconsole.cgi exposure according to its advisory, while the batch still affects newer builds.

VulnCheck describes opportunistic traffic against its canaries. This establishes attempts, while the number of compromised production units and any operational damage remain unknown. CERT-FR previously named Copeland and Dixell XWEB among controllers compromised in the [refrigeration attacks](/incidents/supermarket-refrigeration-wave/). The November probes do not identify which vulnerabilities were used in that operation.
