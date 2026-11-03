---
title: Ten Control Web Panel flaws include a demonstrated user-panel-to-root chain
level: 3
date: '2026-11-02'
updated: 2026-11-03
tags:
- hosting
- auth bypass
- RCE
summary: CWP research now covers ten CVEs and demonstrates an unauthenticated user-panel-to-root chain on an older build. After 1.12, local API flaws still need fixes. Research places the final fix at 1.29; CNA bounds say 1.30. Install vendor-recommended 1.30.1 LTS or later; no in-the-wild exploitation is established.
splash: Older CWP user panels; several root API bugs additionally require access to the loopback API
wipe: Install vendor-recommended CWP 1.30.1 LTS or later; restrict panels and loopback API access, and investigate earlier anomalies
inTheWild: unknown
inTheWildNote: Lab chain and public PoC are documented; in-the-wild attacks are not established.
ecosystems:
- cwp
cves:
- id: CVE-2026-73695
  score: 8.7
  name: Local PHP file inclusion
  description: Before 1.16, the module parameter in services/users/index.php can escape its include directory; the CNA rates this low-privileged access.
- id: CVE-2026-73696
  score: 9.3
  name: Execution after login redirect
  description: Before 1.12, a login redirect does not stop PHP execution, letting unauthenticated requests reach protected user-panel functions.
- id: CVE-2026-73697
  score: 8.7
  name: phpini_editor file write and commands
  description: Before 1.16, module access permits unconstrained file writes through acc=update and shell injection through acc=addlabelphpiniadv; CNA rates privileges required as low.
- id: CVE-2026-77876
  score: 9.3
  name: protected_directory command injection
  description: Before 1.16, the file POST parameter in acc=deletedp reaches a shell command in the user-panel context.
- id: CVE-2026-77877
  score: 8.6
  name: Missing loopback API authentication
  description: Before 1.30, callers that can reach the loopback API can invoke root-privileged routes without an access token.
- id: CVE-2026-77878
  score: 8.6
  name: Database-restore API command injection
  description: Before 1.30, a reachable /v1/restoredatabase/ route passes a POST file path into a root shell command.
- id: CVE-2026-77879
  score: 8.5
  name: API authentication SQL injection
  description: Before 1.16, authorization_code and client_id are interpolated into a root MySQL query in access_token(); loopback API access is required.
- id: CVE-2026-77880
  score: 8.6
  name: Password-route root command injection
  description: Before 1.16, the loopback /newpass/ route uses an unescaped POST user value in a root shell command.
- id: CVE-2026-77881
  score: 6.9
  name: Loopback blind SQL injection
  description: Before 1.30, the user parameter in /user_panel_dashboard/, later /valid_token/, enters a root database query; loopback API access is required.
- id: CVE-2026-104080
  score: 8.6
  name: valid_token root command injection
  description: CNA says before 1.30, callers reaching loopback /valid_token/ can inject shell metacharacters through user into a root command; the research places its fix at 1.29.
fixed:
- product: Control Web Panel current vendor release
  version: 1.30.1
  status: Vendor-recommended November 3 LTS; research minimum 1.29 differs from some CNA 1.30 bounds
timeline:
- date: Sep 8, 2026
  title: Vendor releases CWP 1.12
  body: The changelog says security improvements without mapping these CVEs.
- date: Oct 31, 2026
  title: Vendor releases CWP 1.30
  body: The current changelog includes further user-panel and internal API hardening.
- date: Nov 2, 2026
  title: VulnCheck publishes ten related CVE records
  body: Detailed public disclosure date, distinct from the earlier release dates.
- date: Nov 3, 2026
  title: Vendor releases 1.30.1 LTS and recommends it for every server
  body: Further hardens API-key checks, internal calls, one-time login links and update downloads; default mail trust networks also narrow.
- date: Nov 3, 2026
  title: Full research demonstrates the chain and explains staged fixes
  body: Research reproduces unauthenticated-to-root access on CWP7 webpanel 1.8 already patched for CVE-2025-48703, and includes CVE-2026-104080. It validates fixed code in 1.30; the split between 1.27/1.29 relies on the changelog.
checklist:
- title: Upgrade the actual CWP installation
  hint: Use Settings > CWP Settings > CWP updates and the supported update channel. The vendor’s Update page shows installed/latest versions and an update log. Choose the now-published 1.30.1 LTS or an applicable later release. Confirm the version and completed update afterward; ask support to verify coverage of all ten CVEs. Do not stop at the 1.12 auth-bypass boundary.
- title: Restrict user-panel and internal API access
  hint: As a precaution, limit panel access to trusted management paths. Check that loopback API services are not exposed through public binds, proxies or forwarding. Local callers or server-side request paths may still reach loopback; public-panel filtering alone does not fix API bugs.
- title: Preserve and review panel activity
  hint: As a precaution, retain panel/web access logs and compare requests involving module, phpini_editor, protected_directory and the API routes listed below with approved activity. Review unexpected file, account, configuration or database changes. Route names are vulnerable surfaces, not proof of exploitation; the report supplies exploit examples, not a confirmed malicious campaign IoC set.
- title: Escalate unexplained privileged changes
  hint: Preserve evidence and involve your hosting provider or incident responder if unapproved commands or root-level changes are found. Patching does not undo an existing compromise. The disclosures do not supply a forensic cleanup procedure.
- title: Verify API and mail behavior after updating
  hint: Version 1.30.1 hardens API keys and one-time login links. Check whether /usr/local/cwp/.conf/api_strict_guard_off disables the strict API guard and confirm integrations still require authorization; do not restore functionality by disabling protection. If mail trust changes from old defaults to 127.0.0.0/8, configure SMTP authentication on other private-network machines. Test legitimate integrations and mail delivery.
sources:
- name: Control Web Panel changelog
  url: https://control-webpanel.com/changelog
  primary: true
  says: Vendor release dates, current update workflow and security changes; no per-CVE patch mapping.
- name: VulnCheck CVE-2026-73695
  url: https://cveawg.mitre.org/api/cve/CVE-2026-73695
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-73696
  url: https://cveawg.mitre.org/api/cve/CVE-2026-73696
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-73697
  url: https://cveawg.mitre.org/api/cve/CVE-2026-73697
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-77876
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77876
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-77877
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77877
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-77878
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77878
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-77879
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77879
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-77880
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77880
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-77881
  url: https://cveawg.mitre.org/api/cve/CVE-2026-77881
  primary: true
  says: November 2 CNA disclosure; affected range, prerequisites and CVSS 4.0 score.
- name: VulnCheck CVE-2026-104080
  url: https://cveawg.mitre.org/api/cve/CVE-2026-104080
  primary: true
  says: November 2 publication; separate valid_token command injection, loopback prerequisite and affected bound before 1.30.
- name: VulnCheck full CWP2Shell research
  url: https://www.vulncheck.com/blog/control-web-panel-pre-auth-module-dispatch-rce
  primary: true
  says: November 3 technical report, ten-CVE chain, public PoC and staged patch analysis. Fixed code checked in 1.30; 1.27/1.29 split from vendor changelog.
---

The hosting-panel scope, public PoC and laboratory chain support L3; they do not establish attacks in the wild. Scores remain the CNA's CVSS 4.0 scores. The November 3 full report includes CVE-2026-104080, omitted from our earlier nine-item coverage: this batch has ten CVEs. The public disclosure date remains November 2, when the records were published.

**Attack prerequisites:** VulnCheck reproduces unauthenticated-to-root access in a CWP7 webpanel 1.8/AlmaLinux 9 lab, despite the build containing the old CVE-2025-48703 fix. The user panel on port 2083 continues executing after a redirect; a valid hosting-account name locates its modules. File-write, include and command paths combine into account-level execution, then reach the root API on 127.0.0.1:2302. That API must be reachable: a local vector alone is not arbitrary internet root RCE. Version 1.12 closes the unauthenticated entry, but later affected builds can still let local hosting accounts escalate. Our earlier caution came from individual records; the full report now demonstrates a chain on a specific build, not every configuration.

**Staged fixes and disagreement:** CNA bounds are 1.12 for the redirect; 1.16 for file inclusion, phpini_editor, protected_directory, access_token() and /newpass/; and 1.30 for missing API authentication, database restore, blind SQL injection and valid_token command injection. The researcher places the final four fixes in 1.27/1.29 and recommends at least 1.29. It actually decoded and validated 1.30, assigning the earlier two-release split from the changelog rather than independently validating each build. The vendor currently recommends 1.30.1 LTS for every server. Keep that higher recommendation rather than claiming all sources agree 1.29 is the first safe build. Two-component webpanel versions follow the sources; no version checker is offered.

The relevant missing-token loopback routes include /v1/restoredatabase/, /generaluser/, /last_access/, /valid_user/, /valid_token/ and /user_panel_dashboard/. They are investigative surfaces, not evidence of an attack. The report supplies laboratory exploit examples; their filenames are not an exhaustive malicious-campaign indicator set.

**Current update and regression checks:** Version 1.30.1 LTS additionally requires API keys on every port-2304 API v1 call, limits internal migration routes to the server, and hardens account actions, one-time login links and HTTPS update downloads. Confirm /usr/local/cwp/.conf/api_strict_guard_off has not disabled the strict guard. Test integrations and mail after updating: servers still on the old default trust list move to 127.0.0.0/8, so other private-network applications need SMTP authentication. A footer-only 1.30.2 label has no corresponding full release entry; it does not replace the explicitly recommended LTS here.
