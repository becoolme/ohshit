---
title: Control Web Panel discloses nine flaws across user-panel and root API boundaries
level: 3
date: '2026-11-02'
tags:
- hosting
- auth bypass
- RCE
summary: Nine CWP disclosures cover an authentication bypass, file inclusion/write, command injection and SQL injection. Several API bugs require access to a loopback service. Update to the current vendor release and verify all applicable fixes; 1.12 alone does not cover the batch.
splash: Older CWP user panels; several root API bugs additionally require access to the loopback API
wipe: Update CWP through its supported channel; verify the nine fixes and restrict user-panel and API reachability
inTheWild: unknown
inTheWildNote: The disclosures do not establish exploitation in the wild.
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
fixed:
- product: Control Web Panel current vendor release
  version: '1.30'
  status: Vendor release dated October 31; CNA affected bounds are 1.12, 1.16 or 1.30. Confirm the installed update covers all nine CVEs
timeline:
- date: Sep 8, 2026
  title: Vendor releases CWP 1.12
  body: The changelog says security improvements without mapping these CVEs.
- date: Oct 31, 2026
  title: Vendor releases CWP 1.30
  body: The current changelog includes further user-panel and internal API hardening.
- date: Nov 2, 2026
  title: VulnCheck publishes nine related CVE records
  body: Detailed public disclosure date, distinct from the earlier release dates.
checklist:
- title: Upgrade the actual CWP installation
  hint: Use Settings > CWP Settings > CWP updates and the supported update channel. The vendor’s Update page shows installed/latest versions and an update log. Confirm the version and completed update afterward; ask support to verify coverage of all nine CVEs. Do not stop at the 1.12 auth-bypass boundary.
- title: Restrict user-panel and internal API access
  hint: As a precaution, limit panel access to trusted management paths. Check that loopback API services are not exposed through public binds, proxies or forwarding. Local callers or server-side request paths may still reach loopback; public-panel filtering alone does not fix API bugs.
- title: Preserve and review panel activity
  hint: As a precaution, retain panel/web access logs and compare requests involving module, phpini_editor, protected_directory and the API routes listed below with approved activity. Review unexpected file, account, configuration or database changes. Route names are vulnerable surfaces, not proof of exploitation; the advisories publish no attack IoCs.
- title: Escalate unexplained privileged changes
  hint: Preserve evidence and involve your hosting provider or incident responder if unapproved commands or root-level changes are found. Patching does not undo an existing compromise. The disclosures do not supply a forensic cleanup procedure.
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
---

The batch affects a hosting control panel, so it merits L3 even without confirmed attacks. All scores shown are VulnCheck’s CVSS 4.0 scores. No deployment count or successful attack is established by these records.

The user-panel authentication flaw is separate from the file and command-execution bugs. CVE-2026-73695 and CVE-2026-73697 are scored as requiring low privileges. The records do not demonstrate that every installation permits a complete unauthenticated chain to root; do not assume such a chain from the scores alone.

The remaining API issues are an additional boundary: CVE-2026-77877 through CVE-2026-77881 concern a loopback service. Their vectors are local, even where the description calls the resulting execution remote. An attacker must be able to reach that service. Missing-token routes include /v1/restoredatabase/, /generaluser/, /last_access/, /valid_user/, /valid_token/ and /user_panel_dashboard/. These are not published attack indicators.

CNA affected bounds differ: 1.12 for the redirect flaw; 1.16 for file inclusion, phpini_editor, protected_directory, access_token() and /newpass/; 1.30 for missing API authentication, database restore and blind SQL injection. The vendor changelog lists 1.30 as released October 31 but does not map every CVE to its fix, and does not provide a 1.16 entry. Use the current supported vendor update and confirm coverage rather than treating 1.12 as sufficient. The two-component version labels are the vendor/CNA labels; no version checker is offered.
