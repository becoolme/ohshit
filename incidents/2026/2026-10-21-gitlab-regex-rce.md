---
title: "GitLab patches its second CVSS 10.0 regex-compiler RCE in nine days, and this one reaches back to GitLab 7.0"
headline: "GitLab: two perfect 10s, one regex engine, nine days apart"
level: 4
date: 2026-10-21
updated: 2026-10-31
tags: [GitLab, RCE, self-managed]
ecosystems: [gitlab, ruby]
summary: >-
  CISA now confirms exploitation of CVE-2026-97229, the Oct 12 GitLab regex RCE. The separate CVSS 10.0
  CVE-2026-110264 still requires the Oct 21 fixes for GitLab 7.0 onwards; an Oct 12 patch alone is insufficient.
  The older flaw has a public PoC. Upgrade GitLab and affected Ruby applications; investigate exposed servers.
splash: "Self-managed GitLab CE/EE 7.0+; other Ruby apps only when compiling attacker-controlled patterns"
wipe: "Upgrade to 19.5.1 / 19.4.3 / 19.3.6 / 19.2.9 / 19.1.9 / 19.0.10 / 18.11.13. Ruby apps: 4.0.9 / 3.4.12 / 3.3.13"
inTheWild: "yes"
inTheWildNote: CISA confirms exploitation of CVE-2026-97229; not a confirmation for CVE-2026-110264
oneLiner: >-
  Feed GitLab a regular expression shaped just wrong and the engine's size maths wraps around, so it builds
  instructions that run the attacker's commands as the git user.
cves:
  - id: CVE-2026-110264
    score: 10.0
    name: Integer overflow in regex compilation
    description: >-
      Fixed Oct 21. An unauthenticated user can run code on the server "under certain conditions" that GitLab
      has not described. Affects 7.0 onwards. Reported by joaxcar via HackerOne.
    plain: the plumbing counted the pipes wrong, and now there's a pipe straight into the server room.
  - id: CVE-2026-97229
    score: 10.0
    name: Integer overflow in the CI/CD regex compiler
    description: >-
      Fixed Oct 12 in 19.2.8 / 19.3.5 / 19.4.2. A crafted regex in .gitlab-ci.yml passes validation as US-ASCII,
      then overflows when Onigmo recompiles it for UTF-8. Rapid7 reproduced it and published a PoC; it needs
      commit access to a public project, which open sign-up gives anyone.
fixed:
  - { product: GitLab 19.5, branch: "19.5", version: 19.5.1 }
  - { product: GitLab 19.4, branch: "19.4", version: 19.4.3, status: Includes DB migrations }
  - { product: GitLab 19.3, branch: "19.3", version: 19.3.6, status: Includes DB migrations }
  - { product: GitLab 19.2, branch: "19.2", version: 19.2.9, status: Backport (critical fix only) }
  - { product: GitLab 19.1, branch: "19.1", version: 19.1.9, status: Backport (critical fix only) }
  - { product: GitLab 19.0, branch: "19.0", version: 19.0.10, status: Backport (critical fix only) }
  - { product: GitLab 7.0 – 18.11, branch: "*", version: 18.11.13, status: "Backport. Anything older: upgrade to 18.11.13 or later" }
checker:
  runtime: GitLab
  command: sudo gitlab-rake gitlab:env:info | grep -i version
  examples: ["19.5.0", "19.5.1", "19.4.2", "19.3.6", "19.2.8", "18.11.12", "17.5.2"]
timeline:
  - date: Sep 23, 2026
    title: GitLab fixes two 9.9 code-execution bugs that need a login
    body: CVE-2026-93577 and CVE-2026-89078.
  - date: Oct 2, 2026
    title: Self-hosted AI Gateway gets a 9.9 template-sandbox escape
    body: CVE-2026-90970, fixed in gateway 19.2.4 / 19.3.2 / 19.4.1. Same month, different component.
  - date: Oct 12, 2026
    title: CVE-2026-97229 fixed in 19.2.8, 19.3.5 and 19.4.2
  - date: Oct 13, 2026
    title: Rapid7 reproduces CVE-2026-97229 and publishes a PoC
  - date: Oct 21, 2026
    title: CVE-2026-110264 fixed in seven release lines, plus 11 other security fixes
    body: >-
      GitLab says 12 issues in total; some press says 11. Also fixed: CVE-2026-15723 (8.2, SAML/LDAP
      auto-link account takeover) and CVE-2026-112212 (7.5, OAuth/OIDC discovery cache poisoning).
  - date: Oct 23, 03:11 UTC
    title: Ruby publishes upstream fixes and exposure guidance
    body: Ruby 4.0.9, 3.4.12 and 3.3.13 contain all three underlying fixes; 4.0.8 misses the newest overflow.
  - date: Oct 28, 2026
    title: Alpine reports attempted exploitation and rebuild
  - date: Oct 29, 2026
    title: CISA adds CVE-2026-97229 to KEV
    body: The FCEB remediation deadline is November 1; CISA flags this entry for forensic triage. This confirms exploitation of the Oct 12 flaw, not the Oct 21 sibling.
  - date: Oct 30, 2026
    title: Alpine publishes reopened-service recovery steps
checklist:
  - title: Preserve evidence and triage exposed GitLab servers
    hint: CISA flags CVE-2026-97229 for forensic triage. Scope affected instances; when possible preserve volatile data and relevant logs before patching, record collection details, then patch, contain and investigate unauthorized access or persistence. FCEB agencies must meet the November 1 KEV deadline; other operators should prioritize remediation now. Do not treat a successful upgrade as proof that no intrusion occurred.
  - title: Find every self-managed GitLab
    hint: Including forgotten Omnibus VMs and Docker images
  - title: Upgrade to the fixed version for your line
    hint: The Oct 12 patch is not enough. Plan downtime for 19.4.3 / 19.3.6 on single-node setups
  - title: Close self-registration if you don't need it
    hint: Open sign-up turned the Oct 12 bug from "needs an account" into "anyone"
  - title: Use GitLab's detections for both regex flaws
    hint: 'The Oct 12 advisory links onigmo_native_worker_crash, graphql_cilint_hostile_regexp, ci_regexp_oversized_non_ascii_path, ci_regexp_guard_rejection, ci_lint_workhorse_worker_crash and ci_lint_scripted_client_error_burst; retain the Oct 21 Org mode render error burst rule too. On Omnibus preserve application_json.log, api_json.log, graphql_json.log and production_json.log under /var/log/gitlab/gitlab-rails/, plus /var/log/gitlab/gitlab-workhorse/current, /var/log/gitlab/puma/puma_stderr.log and /var/log/gitlab/sidekiq/current. Correlate alerts by actor, time and correlation_id; a match alone is not proof of compromise. The rules contain lab examples, not confirmed attacker IPs.'
  - title: Rotate CI/CD variables and runner tokens if you were exposed
    hint: Code runs as the git user, which can read them
  - title: Update a self-hosted AI Gateway too
    hint: CVE-2026-90970 needs gateway 19.2.4 / 19.3.2 / 19.4.1
  - title: Update other Ruby applications that compile untrusted patterns
    hint: Upgrade to Ruby 4.0.9 / 3.4.12 / 3.3.13; otherwise stop compiling attacker-controlled strings via Regexp.new, union, compile or interpolation. Regexp.timeout and pattern-length limits do not reliably protect these paths
  - title: Patch Ruby separately in custom GitLab builds
    hint: Source installs and custom images need Ruby 3.3.13 / 3.4.12 / 4.0.9 or later in the appropriate line, in addition to GitLab updates. Re-pull alpinelinux/gitlab:19.3.6 if using that tag; only its October 27 image includes Ruby 3.3.13. Verify the running image and Ruby rather than trusting the tag.
  - title: Restore Alpine GitLab access safely
    hint: Use the official reopened-service notice. Reset the password and any reuse elsewhere; re-enroll 2FA and discard old recovery codes. Verify new SSH host fingerprints against that notice before accepting them; uploaded SSH/GPG user keys were retained. Replace access tokens, feed URLs and private reply addresses. Refill project and schedule variables using new credentials; renew integration, webhook, mirror and OAuth secrets.
sources:
  - name: GitLab patch release 19.5.1
    url: https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/
    says: CVE-2026-110264 critical 10.0 on CE and EE, affects 7.0 onwards, 12 fixes in total, no workaround
    primary: true
  - name: GitLab patch release 19.4.2
    url: https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/
    says: CVE-2026-97229 fixed Oct 12
    primary: true
  - name: Rapid7
    url: https://www.rapid7.com/blog/post/etr-cve-2026-97229-critical-unauthenticated-remote-code-execution-in-gitlab/
    says: Reproduced 97229 on 19.4.1 CE and published a PoC. "Unauthenticated" needs commit access to a public project
    primary: true
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/critical-gitlab-flaw-cvss-100-could.html
    says: Says 11 fixes; joaxcar's fourth regex-engine RCE in a month; not in CISA KEV as of Oct 22
  - name: Ruby upstream regexp fixes
    url: https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/
    says: Three Onigmo fixes address four GitLab CVEs; other Ruby apps compiling attacker-controlled patterns also need the upstream releases
    primary: true
  - name: CISA KEV catalog
    url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
    primary: true
    says: CVE-2026-97229 added October 29; due November 1, forensic triage Yes, ransomware use Unknown.
  - name: CISA forensic triage implementation guidance
    url: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk
    primary: true
    says: Evidence preservation, critical patching, containment and analysis steps; per-step target timelines are recommendations.
  - name: GitLab detection onigmo_native_worker_crash
    url: https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/onigmo_native_worker_crash.md
    primary: true
    says: Vendor detection logic, log locations and correlation limits; synthetic examples are not attacker IoCs.
  - name: GitLab detection graphql_cilint_hostile_regexp
    url: https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/graphql_cilint_hostile_regexp.md
    primary: true
    says: Vendor detection logic, log locations and correlation limits; synthetic examples are not attacker IoCs.
  - name: GitLab detection ci_regexp_oversized_non_ascii_path
    url: https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/ci_regexp_oversized_non_ascii_path.md
    primary: true
    says: Vendor detection logic, log locations and correlation limits; synthetic examples are not attacker IoCs.
  - name: GitLab detection ci_regexp_guard_rejection
    url: https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/ci_regexp_guard_rejection.md
    primary: true
    says: Vendor detection logic, log locations and correlation limits; synthetic examples are not attacker IoCs.
  - name: GitLab detection ci_lint_workhorse_worker_crash
    url: https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/ci_lint_workhorse_worker_crash.md
    primary: true
    says: Vendor detection logic, log locations and correlation limits; synthetic examples are not attacker IoCs.
  - name: GitLab detection ci_lint_scripted_client_error_burst
    url: https://gitlab.com/gitlab-security-oss/tldr/-/raw/main/Detections/platforms/GitLab/Vulnerability%20Detections/ci_lint_scripted_client_error_burst.md
    primary: true
    says: Vendor detection logic, log locations and correlation limits; synthetic examples are not attacker IoCs.
  - name: Alpine attempted-exploitation incident report
    url: https://alpinelinux.org/posts/GitLab-security-incident-CVE-2026-97229.html
    primary: true
  - name: Alpine reopened-service recovery notice
    url: https://alpinelinux.org/posts/GitLab-reopened-after-security-incident.html
    primary: true
---

GitLab runs user-supplied regular expressions in many places: CI rules, code owners, push rules, markup
rendering. It compiles them with **Onigmo**, the regex engine behind Ruby, which GitLab ships and patches in
its own packages. Twice this month, researchers found a spot where Onigmo's size calculation **overflows**,
so the compiler emits broken bytecode that an attacker can turn into code execution as the `git` user.

- **Oct 12, CVE-2026-97229:** reached through a crafted `.gitlab-ci.yml` on GitLab 19.2–19.4. Rapid7
  published a working PoC the next day. The vendor calls it unauthenticated. In practice the attacker needs
  to commit to a public project, which is trivial if your instance allows open sign-up.
- **Oct 21, CVE-2026-110264:** a different overflow in the same compiler that reaches back to **GitLab 7.0
  (2014)**. GitLab has not said which conditions an attacker needs, so you can't configure your way out.
  **If you patched on Oct 12, you still need this upgrade.**

### Why L4

CISA added CVE-2026-97229 to KEV on October 29, superseding our earlier statement that neither flaw had confirmed exploitation. This evidence concerns the October 12 sibling; it does not confirm attacks using CVE-2026-110264. L4 remains appropriate for active exploitation of a mainstream platform. The cited evidence does not establish a worm or internet-scale compromise that would warrant L5. GitLab.com and Dedicated were patched before disclosure; self-managed operators still need the newer package fixes listed above.

FCEB agencies have a November 1 remediation deadline for CVE-2026-97229, with forensic triage required by its KEV entry. That deadline is a federal requirement, not a grace period for other operators. Preserve evidence where possible, patch promptly and investigate possible prior access. CISA lists ransomware involvement as unknown; no victim count is supplied.

**October 23 — upstream Ruby:** The same bugs also affect applications that compile attacker-controlled strings into patterns. Ruby 4.0.9, 3.4.12 and 3.3.13 contain all three fixes behind GitLab's four regex CVEs, including the two September issues already noted above. Ruby 4.0.8 lacks the CVE-2026-110264 fix. Developer-written static patterns are outside this exposure. Neither regex timeouts nor pattern-length caps reliably prevent it; stop accepting untrusted patterns until upgraded.

The table and checker cover GitLab packages, which ship their own patched Ruby. Upgrading an unrelated system Ruby does not replace the GitLab package upgrade. Ruby has not requested separate CVE identifiers for these fixes and asks users to track the GitLab identifiers instead.

**Alpine update:** Alpine reports October 20–21 exploit attempts, with no evidence of successful execution but insufficient logs to exclude it. It rebuilt GitLab and found no tampering in checked packages or releases; signing keys were never stored there. Its custom image remained vulnerable after a GitLab-only upgrade because it used unpatched system Ruby. This attempted attack does not negate CISA’s separate exploitation confirmation.
