---
title: OpenSSH on musl Linux can accept long passwords for key-only accounts when PAM is disabled
level: 4
date: 2026-11-05
updated: 2026-11-12
tags: [OpenSSH, Alpine Linux, Authentication bypass]
summary: Previdian observed OpenSSH bypass attempts and reports root access on an Alpine honeypot. The flaw requires reachable musl sshd, password auth, no PAM, a '*' target and another local $5$/$6$ hash. Use OpenSSH 10.6p2 or the Alpine backport and restart sshd. No production compromise is established.
splash: Reachable musl sshd, no PAM, password login, '*' target and local $5$/$6$ hash. Reproduced after a failure in the same connection.
wipe: Install your Alpine branch's fixed OpenSSH package and restart sshd; otherwise disable PasswordAuthentication and verify the effective configuration.
inTheWild: yes
inTheWildNote: CISA listed the bypass in KEV on November 9. Previdian reported honeypot root access.
cves:
  - id: CVE-2026-123158
    score: 8.1
    name: musl password-hash error marker bypass
    description: The CNA identifies the same conditional password bypass; this does not extend exposure to glibc or PAM-enabled builds.
fixed:
  - { product: Portable OpenSSH upstream workaround, version: 10.6p2 }
  - { product: Alpine edge openssh, version: 10.6_p2-r0 }
  - { product: Alpine 3.24 openssh, version: 10.3_p1-r2 }
  - { product: Alpine 3.23 openssh, version: 10.2_p1-r1 }
  - { product: Alpine 3.22 openssh, version: 10.0_p1-r11 }
  - { product: Alpine 3.21 openssh, version: 9.9_p2-r1, status: EOL branch; exceptional security fix }
  - { product: Alpine 3.20 openssh, version: 9.7_p1-r6, status: EOL branch; exceptional security fix }
  - { product: Alpine 3.19 openssh, version: 9.6_p1-r3, status: EOL branch; exceptional security fix }
  - { product: Alpine 3.18 openssh, version: 9.3_p2-r4, status: EOL branch; exceptional security fix }
  - { product: Alpine 3.17 openssh, version: 9.1_p1-r7, status: EOL branch; exceptional security fix }
  - { product: Alpine 3.16 openssh, version: 9.0_p1-r6, status: EOL branch; exceptional security fix }
timeline:
  - date: Nov 5, 2026
    title: OpenSSH releases 10.6p2 and Alpine publishes branch backports
    body: The workaround prevents password authentication bypass through sshd; Alpine documents precise account prerequisites, cloud-image exposure, package versions and mandatory daemon restart. No CVE is assigned in the read Alpine notice.
  - date: Nov 5, 2026
    title: CNA assigns CVE-2026-123158 to the same bypass
    body: The published record identifies the musl/no-PAM flaw; Alpine’s earlier text still says no identifier had been assigned when written. Red Hat confirms its glibc/PAM product builds are unaffected.
  - date: Nov 6, 2026
    title: Previdian detects attempts and reports root access on an Alpine honeypot
    body: The initial public sensor report records eight attempts from one IP. Its CEO separately reports a successful root session to The Hacker News.
  - date: Nov 6, 2026
    title: StepSecurity reproduces the failed first attempt in the same connection
    body: An Alpine 3.24 VM and container both rejected an overlong first attempt. A later attempt could bypass authentication after a failure. The bypass failed after installing 10.3_p1-r2 and restarting sshd.
  - date: Nov 7, 2026
    title: Sensor dashboard shows more attempts
    body: Previdian’s updated snapshot lists 17 attempts across four sensors from 11 source IPs geolocated to eight countries.
  - date: Nov 9, 2026
    title: CISA adds CVE-2026-123158 to KEV
    body: The catalog confirms known exploitation. The catalog due date for applicable U.S. federal civilian agencies is November 12, 2026. Follow vendor remediation and CISA BOD 26-04 forensic triage guidance.
checklist:
  - title: Update the server package and restart the running daemon
    hint: On Alpine use apk upgrade -U -a and compare apk info -v openssh-server or openssh-server-pam with your branch's row above, then run rc-service sshd restart. Package installation alone leaves the old daemon running. Rebuild affected images and replace or update running instances; a newly fixed image does not patch an existing VM. Exceptional fixes for 3.21 and older do not restore general support.
  - title: Disable password logins if you cannot patch immediately
    hint: First test key login and retain the current session. Back up sshd configuration, set PasswordAuthentication no in the effective configuration, including applicable Match blocks, run sshd -t and restart sshd. Verify sshd -T and representative user/source Match contexts, then test a fresh key login. Alpine 3.19+ defaults read sshd_config.d; older releases may ignore a drop-in, so do not rely on that file alone. Keep SSH restricted while verifying.
  - title: Check every account and cloud-image prerequisite
    hint: Locally inspect account password-field types without publishing hashes. The vulnerable target has '*' and another local account has a $5$ or $6$ hash. Include directory-service users resolved through musl-nscd (nslcd, winbind or sssd) that have no shadow entry, as the advisory warns. openssh-server-pam is still affected with UsePAM no. Default PermitRootLogin prohibit-password protects root but not other permitted key-only users. Tiny-cloud images 3.18.11–3.24.3 can become exposed when any such hash is added; their alpine user has passwordless doas. Containers without sshd, effective PasswordAuthentication no and PAM with UsePAM yes are excluded by the advisory.
  - title: Preserve authentication evidence and investigate unexpected logins
    hint: Review /var/log/messages for sshd Accepted password entries naming accounts that have no password. Correlate any preceding Failed password for the same account in the same session. A probe that attempts only one password per connection may miss the flaw. Preserve logs and inspect doas use, new users, files and authorized_keys changes. A log match needs context and absence is not proof of safety. If unauthorized login cannot be ruled out, isolate and treat the host as compromised; patching does not remove established access. Previdian reported source IP 89.116.89[.]18 and the commands id, uname and hostname in its honeypot observations. Check both successful authentication and associated command execution. A match alone does not prove compromise.
sources:
  - name: Alpine original password-authentication-bypass advisory
    url: https://alpinelinux.org/posts/2026-11-05-openssh-password-authentication-bypass/
    primary: true
    says: Exact prerequisites, 257–1024-byte input, all ten branch package versions, cloud-image conditions, restart and investigation guidance; no CVE assigned at publication.
  - name: OpenSSH official 10.6p2 release notes
    url: https://www.openssh.org/releasenotes.html
    primary: true
    says: November 5 release works around password authentication bypass in musl Linux with PAM disabled; considers the root cause outside sshd but exploitable through it.
  - name: MITRE CNA record for CVE-2026-123158
    url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/123xxx/CVE-2026-123158.json
    primary: true
    says: Published November 5; CVSS 3.1 8.1, Linux musl without PAM, upstream workaround before 10.6p2.
  - name: Red Hat product applicability assessment
    url: https://access.redhat.com/security/cve/cve-2026-123158
    primary: true
    says: Red Hat builds use glibc and PAM; listed products are not affected.
  - name: Previdian first-party sensor report
    url: https://previdian.com/CVE-2026-123158
    primary: true
    says: The initial public report lists eight attempts from one IP. The November 7 snapshot shows 17 attempts across four sensors from 11 source IPs geolocated to eight countries. The dashboard does not establish their outcomes.
  - name: The Hacker News statement from Previdian’s CEO
    url: https://thehackernews.com/2026/11/hackers-exploited-openssh-sshole-flaw.html?m=1
    says: Relays the firm’s successful root access on an Alpine honeypot and quotes the source IP and reconnaissance commands.
  - name: StepSecurity Alpine 3.24 lab reproduction
    url: https://www.stepsecurity.io/blog/cve-2026-123158-sshhole-openssh-musl-password-bypass
    primary: true
    says: Verifies the before and after package revisions, authentication sequence, logs and client input limit.
  - name: Original discoverer's reproduction notes
    url: https://github.com/oz9un/sshole
    primary: true
    says: Documents two password prompts in the same connection.
  - name: CISA Known Exploited Vulnerabilities Catalog
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    primary: true
    says: CISA adds CVE-2026-123158 to KEV on November 9, with a November 12 due date.
---

Alpine describes a failure when musl's crypt() returns an error marker for an overlong password and sshd compares it with an account's stored '*' field. A reachable attacker who knows the target username can authenticate with a 257–1024-byte password if password authentication is enabled, PAM is not used and another local account supplies a $5$ or $6$ password hash. The discoverer’s reproduction requires a failed password attempt earlier in the same connection. This is not a universal OpenSSH or Alpine compromise. Accounts locked with '!' are excluded; root still needs PermitRootLogin yes for direct password entry, while another affected account may obtain root through its own privileges.

Alpine lists affected releases 3.16–3.24 and edge. Its tiny-cloud images are safe initially but may become exposed after an administrator adds a qualifying password hash; the preconfigured alpine account has passwordless doas. Cloud-init images configured with password authentication disabled and containers with no sshd are outside that path. Upstream 10.6p2 is a workaround, while stable Alpine branches retain older upstream version numbers with patched package revisions. No version checker is supplied for these distribution-specific versions. The initial notices establish the flaw and remediation. They predate the sensor report below.

**Identifier follow-up:** The CNA has now been checked and links this flaw to **CVE-2026-123158**. Its brief description gives 256–1024 characters; Alpine’s detailed explanation requires over 256 bytes and explicitly gives **257–1024 bytes**, retained above. The identifier does not change the account prerequisites, patched package revisions or restart requirement. Red Hat’s not-affected assessment applies to its product builds, not every Linux installation.

**November 6 exploitation evidence.** Previdian’s initial public sensor report lists eight attempts from one source IP. Its CEO separately told The Hacker News that one reached root on a honeypot running Alpine and OpenSSH, and reported non-interactive reconnaissance. Observed attempts and successful access to the monitoring environment justify L4. On November 7 the public dashboard shows 17 attempts across four sensors from 11 source IPs geolocated to eight countries. The counts describe sensor observations. The findings establish neither production victims nor changes to vendor prerequisites or fix versions.

StepSecurity independently reproduced that sequence in an Alpine 3.24 VM and container using `10.3_p1-r1`. The bypass failed after installing `10.3_p1-r2` and restarting sshd. Its client and askpass setup could deliver at most 1023 bytes. Alpine still documents a server range of 257–1024 bytes. GitHub tracks the same issue as [GHSA-4fcc-vm97-gx3x](https://github.com/advisories/GHSA-4fcc-vm97-gx3x).

The catalog confirms known exploitation. The catalog due date for applicable U.S. federal civilian agencies is November 12, 2026. Follow vendor remediation and CISA BOD 26-04 forensic triage guidance.
