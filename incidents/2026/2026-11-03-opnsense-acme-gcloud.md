---
title: OPNsense ACME plugin certificate privileges can become root command execution
level: 3
date: '2026-11-03'
tags:
- OPNsense
- ACME
- command injection
summary: The Google Cloud DNS module in OPNsense os-acme-client through 4.17 interpolates unescaped fields into a shell command. An authenticated user allowed to issue or renew certificates via WebGUI/API can execute code as root. Plugin 4.18 fixes it; this is not an unauthenticated flaw in every OPNsense installation.
splash: OPNsense with affected os-acme-client Google Cloud DNS validation; attacker needs certificate issue/renew privileges.
wipe: Update os-acme-client to 4.18 and review certificate-management access; Selfhost DNS users must re-enter the new API-key credentials.
inTheWild: unknown
inTheWildNote: The original plugin fix and CVE record do not establish active attacks or victims.
cves:
- id: CVE-2026-123025
  score: 9.4
  name: Google Cloud DNS validation command injection
  description: DnsGcloud::prepare() interpolates decoded gcloud_account/gcloud_project fields into a shell command. The CNA assigns CVSS 4.0 9.4 with low privileges required.
fixed:
- product: OPNsense os-acme-client plugin
  version: '4.18'
  status: Plugin changelog explicitly fixes Google Cloud DNS command injection; not an OPNsense core version
timeline:
- date: Nov 3, 2026
  title: Plugin 4.18 release PR publicly identifies the fix
  body: The original release PR names the Google Cloud DNS issue and reporter; its creation and merge are November 3.
- date: Nov 5, 2026
  title: CVE record describes root execution and privilege prerequisite
  body: The CNA documents affected plugin versions through 4.17 and authenticated certificate issue/renew rights.
checklist:
- title: Inventory plugin versions and certificate-management permissions
  hint: Check the installed os-acme-client version and Google Cloud DNS validation configuration in the OPNsense WebGUI, then audit users/API credentials allowed to issue or renew certificates. Network reachability alone is insufficient; the CVE requires those authenticated privileges.
- title: Install plugin 4.18 and review its migration note
  hint: 'Use the official OPNsense plugin update path for os-acme-client 4.18; verify the installed plugin version rather than comparing an OPNsense core version. The same release changes Selfhost DNS to API-key authentication: if you use Selfhost, enter its credentials again. This migration requirement is separate from the Google Cloud DNS flaw.'
- title: Review suspicious validation activity and protect exposed secrets
  hint: As a defensive precaution, preserve certificate-validation, WebGUI/API and system audit records before investigating unexpected certificate operations or commands. If compromise is suspected, scope root-level access and affected DNS/API secrets with your security team before rotating them from a clean system. The original records provide no dedicated IoCs, verified exploitation window or universal recovery script.
sources:
- name: OPNsense original 4.18 release PR API
  url: https://api.github.com/repos/opnsense/plugins/pulls/5873
  primary: true
  says: Public November 3 release PR identifies the Google Cloud DNS vulnerability and reporter.
- name: OPNsense plugin changelog
  url: https://raw.githubusercontent.com/opnsense/plugins/master/security/acme-client/pkg-descr
  primary: true
  says: Version 4.18 explicitly fixes command injection; also requires Selfhost DNS API-key credentials to be re-entered.
- name: Original CVE CNA record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-123025
  primary: true
  says: November 5 record specifies Google Cloud DNS, plugin through 4.17, authenticated issue/renew rights, root execution and CVSS 4.0 9.4.
---

The decoded Google Cloud DNS model fields gcloud_account and gcloud_project reach proc_open() through LeUtils::run_shell_command() without validation or shell escaping. A user trusted with certificate issuance or renewal can therefore cross the boundary into arbitrary root execution. Exposure depends on this plugin/module and the authenticated certificate-management capability; the sources do not establish unauthenticated compromise of OPNsense core.

The first public record reviewed is the November 3 plugin release PR, preceding the November 5 CVE assignment. The plugin changelog names 4.18 as the fix. No active exploitation, affected-customer count or vendor-specific compromise-recovery procedure is established. L3 reflects privilege escalation to root on a mainstream firewall platform, with the permission and module prerequisites stated explicitly.
