---
title: Progress discloses 15 WS_FTP Server flaws, including unauthenticated credential exposure
level: 3
tags:
- WS_FTP
- RCE
- authentication
ecosystems:
- windows
summary: Progress publishes 15 Windows WS_FTP Server CVEs, including CVSS 10.0 credential exposure and configuration-dependent command execution. Install 2024.0.7 or 2025.0.4 to cover the batch; the command-execution paths have different privilege prerequisites.
splash: Windows WS_FTP Server below 2024.0.7 or 2025.0.4; exposure varies by component, configuration and account privileges
wipe: Install 2024.0.7 (9.0.7) or 2025.0.4 (10.0.4); move retired versions to a supported line
inTheWild: unknown
inTheWildNote: The cited vendor records do not confirm exploitation or publish victim counts.
cves:
- id: CVE-2026-84294
  score: 7.7
  name: Ad Hoc Transfer file read
  description: Authenticated users can read files beyond the intended directory.
- id: CVE-2026-84295
  score: 10
  name: Unauthenticated administrative credential exposure
  description: A remote attacker without a login can obtain sensitive data, potentially including administrative credentials.
- id: CVE-2026-84296
  score: 6.8
  name: SSH MFA bypass
  description: Authenticated users can bypass MFA through incorrect association of authentication factors between accounts.
- id: CVE-2026-90861
  score: 6.6
  name: Password exposure in activity logs
  description: An administrator can obtain another user’s clear-text password and potentially broader administrative access.
- id: CVE-2026-90862
  score: 4.3
  name: Web Transfer MFA bypass
  description: An attacker who knows a user’s password can access certain account files without completing MFA.
- id: CVE-2026-90863
  score: 9.1
  name: Missing Manager authorization
  description: A delegated Host Administrator can exceed assigned scope, potentially executing elevated commands on the host.
- id: CVE-2026-90864
  score: 9.1
  name: Host Administrator path bypass
  description: A delegated Host Administrator can read or modify files outside the authorized path.
- id: CVE-2026-90865
  score: 9
  name: FTP notification command injection
  description: Certain configurations permit elevated command execution through notification variables; the vendor vector needs no login but has high attack complexity.
- id: CVE-2026-90866
  score: 9.1
  name: Virtual-folder confinement bypass
  description: A delegated Host Administrator can escape virtual-folder scope, potentially reaching code execution.
- id: CVE-2026-90867
  score: 8.1
  name: Web Admin access control
  description: Remote authentication attempts can reach administrative functionality because of improper access control; this alone does not establish successful authentication.
- id: CVE-2026-90868
  score: 9.9
  name: Configuration-dependent command injection
  description: The vendor rates this code-execution path as requiring low privileges under certain configurations; it is not an unauthenticated RCE claim.
- id: CVE-2026-90869
  score: 7.5
  name: Pre-authentication SSH denial of service
  description: A remote attacker knowing a valid account’s enrolled SSH public key can terminate the shared SSH service.
- id: CVE-2026-90870
  score: 5.3
  name: Ad Hoc Transfer resource exhaustion
  description: Unreleased receiver sessions can exhaust resources and degrade service without authentication.
- id: CVE-2026-90871
  score: 5.3
  name: Transfer file deletion via traversal
  description: An unauthenticated attacker can affect files outside transfer directories; the vendor title identifies file deletion.
- id: CVE-2026-90872
  score: 6.6
  name: Manager server-side script injection
  description: An authenticated Manager administrator can execute commands as the WS_FTP Server IIS worker process.
fixed:
- product: WS_FTP Server 2024
  version: 2024.0.7
  status: 9.0.7; covers the batch, but the line is now in Sunset
- product: WS_FTP Server 2025
  version: 2025.0.4
  status: 10.0.4; active line
timeline:
- date: Sep 3, 2026
  title: 2024.0.6 and 2025.0.3 release
  body: These fix the 84294–84296 subgroup, not the full later batch.
- date: Oct 1, 2026
  title: 2024.0.7 and 2025.0.4 release
- date: Oct 29, 2026
  title: Progress publishes 15 CVE records describing the flaws
checklist:
- title: Check the server version and install the complete fix
  hint: Use Progress Customer and Community Product Downloads. Install 2024.0.7/9.0.7 or 2025.0.4/10.0.4; 2024.0.6 and 2025.0.3 fix only the earlier three CVEs. Confirm the running server version afterward; this is WS_FTP Server, not the Professional client.
- title: Plan the supported upgrade path
  hint: 'The 2024 line is in Sunset with no new service packs/hotfixes; 2022 and older are retired. Follow Progress’s upgrade guide: 2020 or newer can upgrade directly; 2018 or earlier must first move to 2020. Verify PowerShell script execution is enabled for the installer and the operating system is supported. Failover upgrades from before 10.0.0 require registry synchronization between nodes so shared secrets remain decryptable.'
sources:
- name: 'Progress CNA: CVE-2026-84294'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-84294
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-84295'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-84295
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-84296'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-84296
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90861'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90861
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90862'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90862
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90863'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90863
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90864'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90864
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90865'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90865
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90866'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90866
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90867'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90867
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90868'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90868
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90869'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90869
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90870'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90870
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90871'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90871
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: 'Progress CNA: CVE-2026-90872'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90872
  says: Vendor-issued description, CVSS 3.1 prerequisites and affected/fixed version boundaries.
  primary: true
- name: Progress 2024 release history
  url: https://docs.progress.com/bundle/wsftp-server-release-notes-2024/page/Whats-New-in-WS_FTP-Server-2024.html
  says: Maps 2024.0.6/2024.0.7 to 9.0.6/9.0.7 and September 3/October 1 release dates.
  primary: true
- name: Progress 2025 release history
  url: https://docs.progress.com/bundle/wsftp-server-release-notes-2025/page/Whats-New-in-WS_FTP-Server-2025.html
  says: Maps 2025.0.3/2025.0.4 to 10.0.3/10.0.4 and the same release dates.
  primary: true
- name: Progress upgrade guide
  url: https://docs.progress.com/bundle/wsftp-server-release-notes-2025/page/Upgrading.html
  says: Installer, supported upgrade paths, PowerShell requirement and failover registry synchronization.
  primary: true
- name: Progress support lifecycle
  url: https://community.progress.com/s/products/ws-ftp/product-lifecycle
  says: 2024 is in Sunset, 2022 is Retired, and Sunset gets no new hotfixes/service packs.
  primary: true
date: '2026-10-29'
---

The public CVE disclosure is October 29; the fixing service packs were available earlier. This is one advisory batch with 15 CVEs, not 15 separate incidents. L3 reflects a widely deployed file-transfer server and critical disclosed issues; the sources do not establish exploitation.

CVE-2026-84295 exposes sensitive information, potentially administrative credentials, without authentication. Do not describe every critical item as unauthenticated RCE: CVE-2026-90868 needs low privileges; 90863, 90864 and 90866 need delegated Host Administrator access; 90865 is configuration-dependent with a high-complexity vector. The public records do not identify every setting needed for command injection, so an assumed default configuration is not a reliable exemption.

The vendor’s linked Salesforce advisory was not retrievable; its own CNA records provide the primary descriptions and patch boundaries, corroborated by first-party release histories. No public attacker indicators or victim totals are supplied.
