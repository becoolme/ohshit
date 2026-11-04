---
title: HPE Fabric Composer patches 46 flaws, including unauthenticated administrator access
level: 3
date: '2026-11-03'
tags:
- HPE
- Fabric Composer
- networking
ecosystems:
- networking
summary: HPE fixes 46 Fabric Composer flaws, including remote administrator access through CLI credentials and adjacent-network code execution. Upgrade 7.4.x to 7.4.1+ or 7.3.x to 7.3.5+ and restrict management interfaces. Reviewed sources do not confirm exploitation.
splash: Fabric Composer management deployments through 7.4.0 / 7.3.4; individual flaws require remote, adjacent or local access
wipe: Upgrade 7.4.x to 7.4.1+ or 7.3.x to 7.3.5+; move obsolete branches to supported releases and isolate management
inTheWild: unknown
inTheWildNote: No confirmed exploitation in reviewed sources; HPE reports no public exploit code.
cves:
- id: CVE-2026-95731
  score: 9.8
  name: CLI hardcoded credentials enable administrator access
  description: CLI hardcoded credentials enable administrator access. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95732
  score: 9.6
  name: OS authentication bypass permits code execution
  description: OS authentication bypass permits code execution. Requires adjacent-network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95733
  score: 9.6
  name: Component flaw permits code execution
  description: Component flaw permits code execution. Requires adjacent-network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95734
  score: 8.8
  name: API exposes stored credentials beyond the caller’s authority
  description: API exposes stored credentials beyond the caller’s authority. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95735
  score: 8.7
  name: Certificate validation flaw exposes credentials under additional preconditions
  description: Certificate validation flaw exposes credentials under additional preconditions. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95736
  score: 8.3
  name: Certificate validation flaws expose sensitive traffic under additional preconditions
  description: Certificate validation flaws expose sensitive traffic under additional preconditions. Requires adjacent-network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95737
  score: 8.2
  name: OS flaw raises an already privileged local account’s privileges
  description: OS flaw raises an already privileged local account’s privileges. Requires local access and a high-privilege account; no user interaction is required.
- id: CVE-2026-95738
  score: 8.1
  name: Authentication bypass grants administrator access under additional preconditions
  description: Authentication bypass grants administrator access under additional preconditions. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95739
  score: 8.1
  name: Insufficient API login limits permit brute force under additional preconditions
  description: Insufficient API login limits permit brute force under additional preconditions. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95740
  score: 8
  name: Certificate validation flaw exposes server communications under additional preconditions
  description: Certificate validation flaw exposes server communications under additional preconditions. Requires adjacent-network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95741
  score: 8
  name: Missing API integrity checks permit privilege escalation
  description: Missing API integrity checks permit privilege escalation. Requires remote network access and a low-privilege account; user interaction is required.
- id: CVE-2026-95742
  score: 7.8
  name: OS file-write flaw creates or replaces files with elevated privileges
  description: OS file-write flaw creates or replaces files with elevated privileges. Requires local access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95743
  score: 7.8
  name: OS flaws elevate a local low-privilege account
  description: OS flaws elevate a local low-privilege account. Requires local access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95744
  score: 7.7
  name: Interface flaw exposes protected traffic under additional preconditions
  description: Interface flaw exposes protected traffic under additional preconditions. Requires adjacent-network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95745
  score: 7.5
  name: API denial of service disables management services
  description: API denial of service disables management services. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95746
  score: 7.5
  name: API authentication bypass grants unauthorized access under additional preconditions
  description: API authentication bypass grants unauthorized access under additional preconditions. Requires adjacent-network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95747
  score: 7.5
  name: SSH flaw exposes internal services under additional preconditions
  description: SSH flaw exposes internal services under additional preconditions. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95748
  score: 7.5
  name: SQL injection permits arbitrary database commands
  description: SQL injection permits arbitrary database commands. Requires adjacent-network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95749
  score: 7.5
  name: Missing integrity checks permit code execution
  description: Missing integrity checks permit code execution. Requires remote network access and no prior authentication; user interaction is required.
- id: CVE-2026-95750
  score: 7.5
  name: Certificate validation flaw exposes credentials under additional preconditions
  description: Certificate validation flaw exposes credentials under additional preconditions. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95751
  score: 7.4
  name: API certificate validation flaw permits authentication bypass under additional preconditions
  description: API certificate validation flaw permits authentication bypass under additional preconditions. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95752
  score: 7.1
  name: Local API flaw permits privilege escalation
  description: Local API flaw permits privilege escalation. Requires local access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95753
  score: 7.1
  name: API flaw exposes traffic from managed switches
  description: API flaw exposes traffic from managed switches. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95755
  score: 6.8
  name: Certificate validation flaws expose management traffic under additional preconditions
  description: Certificate validation flaws expose management traffic under additional preconditions. Requires adjacent-network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95756
  score: 6.6
  name: API command injection raises an administrator’s OS privileges under additional preconditions
  description: API command injection raises an administrator’s OS privileges under additional preconditions. Requires remote network access and a high-privilege account; no user interaction is required.
- id: CVE-2026-95757
  score: 6.5
  name: Local API authentication bypass writes files to configured remote servers
  description: Local API authentication bypass writes files to configured remote servers. Requires local access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95758
  score: 6.5
  name: API authorization bypass permits protected-resource modification
  description: API authorization bypass permits protected-resource modification. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95759
  score: 6.5
  name: API flaws suppress audit records of attacker activity
  description: API flaws suppress audit records of attacker activity. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95760
  score: 6.4
  name: API flaw permits privilege escalation under additional preconditions
  description: API flaw permits privilege escalation under additional preconditions. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95761
  score: 5.9
  name: Certificate validation flaw exposes sensitive information
  description: Certificate validation flaw exposes sensitive information. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95762
  score: 5.9
  name: API session expiration flaw preserves administrator access under additional preconditions
  description: API session expiration flaw preserves administrator access under additional preconditions. Requires remote network access and a high-privilege account; no user interaction is required.
- id: CVE-2026-95763
  score: 5.9
  name: Certificate validation flaw exposes transferred files and remote-server credentials under additional preconditions
  description: Certificate validation flaw exposes transferred files and remote-server credentials under additional preconditions. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95764
  score: 5.7
  name: API certificate validation flaw exposes sensitive information
  description: API certificate validation flaw exposes sensitive information. Requires adjacent-network access and no prior authentication; user interaction is required.
- id: CVE-2026-95765
  score: 5.4
  name: Web management interface exposes sensitive information
  description: Web management interface exposes sensitive information. Requires remote network access and no prior authentication; user interaction is required.
- id: CVE-2026-95766
  score: 5.3
  name: Information disclosure exposes data to a low-privilege account
  description: Information disclosure exposes data to a low-privilege account. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95767
  score: 5.3
  name: API exposes sensitive system information
  description: API exposes sensitive system information. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95768
  score: 5.3
  name: API flaw exposes sensitive information under additional preconditions
  description: API flaw exposes sensitive information under additional preconditions. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95769
  score: 5.3
  name: API permits audit-record client-address spoofing
  description: API permits audit-record client-address spoofing. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95770
  score: 4.7
  name: OS flaw exposes local sensitive data under additional preconditions
  description: OS flaw exposes local sensitive data under additional preconditions. Requires local access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95771
  score: 4.3
  name: API endpoint exposes limited system information
  description: API endpoint exposes limited system information. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95772
  score: 4.2
  name: API race corrupts configuration state
  description: API race corrupts configuration state. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95773
  score: 3.8
  name: Local denial of service disrupts other workloads on the host
  description: Local denial of service disrupts other workloads on the host. Requires local access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95774
  score: 3.7
  name: Remote information disclosure exposes sensitive data
  description: Remote information disclosure exposes sensitive data. Requires remote network access and no prior authentication; no user interaction is required.
- id: CVE-2026-95775
  score: 3.3
  name: OS file disclosure permits limited local reads
  description: OS file disclosure permits limited local reads. Requires local access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95776
  score: 3.1
  name: API path traversal reads limited OS files under additional preconditions
  description: API path traversal reads limited OS files under additional preconditions. Requires remote network access and a low-privilege account; no user interaction is required.
- id: CVE-2026-95777
  score: 3.1
  name: Management interface exposes stored sensitive data
  description: Management interface exposes stored sensitive data. Requires remote network access and a low-privilege account; no user interaction is required.
fixed:
- product: HPE Networking Fabric Composer 7.4.x
  branch: '7.4'
  version: 7.4.1
  status: Supported
- product: HPE Networking Fabric Composer 7.3.x
  branch: '7.3'
  version: 7.3.5
  status: Supported
- product: End-of-maintenance / end-of-support branches
  version: none
  status: Move to a supported release
timeline:
- date: Nov 3, 16:00 UTC
  title: HPE publishes HPESBNW05172 revision 1
  body: The official CSAF records this publication time and lists all 46 vulnerabilities, fixed branches and management-isolation advice.
checklist:
- title: Restrict both CLI and web management access now
  hint: Apply HPE’s dedicated layer-2 segment/VLAN and/or layer-3-and-above firewall policies. Limit access to authorized management hosts and enable accounting of user activity and resource usage. This reduces exposure while you arrange the update; it does not remove the flaws.
- title: Inventory the deployed branch and apply its fixed release
  hint: Use the appliance’s installed-version information and the HPE Networking Support Portal. Update 7.4.x deployments to 7.4.1 or later, and 7.3.x to 7.3.5 or later; follow the vendor upgrade documentation. EoM releases are presumed affected; EoS exposure is unassessed and those branches are not evaluated or patched. Migrate obsolete deployments to a supported release.
- title: Verify the installed version and retain management evidence
  hint: 'After the upgrade, check the reported installed version and confirm CLI/web firewall restrictions remain effective. General incident-response guidance: preserve available authentication, API and network records and investigate unexpected administrative access, switch-traffic access or configuration changes. HPE identifies audit suppression and client-address spoofing flaws, so clean local audit records alone cannot establish absence of compromise. Escalate suspicious activity to HPE SIRT through the advisory’s reporting channel; the bulletin supplies no attack indicators or confirmed victim count.'
sources:
- name: HPE HPESBNW05172 revision 1
  url: https://support.hpe.com/hpesc/public/docDisplay?docId=hpesbnw05172en_us&docLocale=en_US
  primary: true
  says: 'Full November 3 bulletin: 46 CVEs, supported fixes, obsolete-release caveats, individual prerequisites and management isolation. No public exploit code known to HPE at publication.'
- name: HPE official CSAF bulletin
  url: https://csaf.arubanetworking.hpe.com/2026/hpe_networking_-_hpesbnw05172.json
  primary: true
  says: Machine-readable version of the same bulletin, not an independent report; confirms publication at 16:00 UTC, scores and access requirements.
---

HPE’s November 3 bulletin groups 46 vulnerabilities in the same Fabric Composer release batch. It covers CVE-2026-95731 through CVE-2026-95777 except CVE-2026-95754, which is not listed. The highest score is 9.8. The risk to a datacenter management plane, including unauthenticated administrative access and adjacent-network code execution, supports L3; a critical score alone does not establish widespread exploitation.

The remote CLI credential issue is distinct from the two critical adjacent-network issues. Other flaws require accounts, local access, user interaction or additional circumstances outside the attacker’s control. The individual entries preserve the access, privilege and interaction requirements from HPE’s CVSS data; unspecified additional preconditions must not be assumed to be default configuration. Exposure depends on reachability of the relevant interface, not simply possession of any HPE device. Other HPE Networking products not listed in the bulletin are unaffected.

HPE identifies the affected versions as 7.4.0 and below and 7.3.4 and below. The fixed supported branches are 7.4.1+ and 7.3.5+. Obsolete versions need migration: end-of-maintenance versions are presumed affected, while end-of-support exposure has not been assessed. Network isolation is temporary risk reduction, not a replacement for upgrading.

All findings came from HPE’s internal research. HPE says it knew of no public discussion or exploit code at publication; that statement is not confirmation that exploitation never occurred. The reviewed material provides no confirmed exploitation, breach scope, victim count, recovery event or published attack indicators.
