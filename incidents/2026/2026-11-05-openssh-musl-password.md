---
title: OpenSSH on musl Linux can accept long passwords for key-only accounts when PAM is disabled
level: 3
date: 2026-11-05
updated: 2026-11-07
tags: [OpenSSH, Alpine Linux, Authentication bypass]
summary: Alpine confirms a password bypass in reachable sshd using musl without PAM. It requires password authentication, a target account with a '*' password field and another account with a $5$/$6$ hash. OpenSSH 10.6p2 and Alpine backports block it; restart sshd after updating or disabling password authentication.
splash: Reachable musl Linux sshd without PAM, password logins enabled, target '*' account and another local $5$/$6$ password hash
wipe: Install your Alpine branch's fixed OpenSSH package and restart sshd; otherwise disable PasswordAuthentication and verify the effective configuration.
inTheWild: unknown
inTheWildNote: Vendor confirms the bypass; the read notices do not establish attacks in the wild.
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
checklist:
  - title: Update the server package and restart the running daemon
    hint: On Alpine use apk upgrade -U -a and compare apk info -v openssh-server or openssh-server-pam with your branch's row above, then run rc-service sshd restart. Package installation alone leaves the old daemon running. Rebuild affected images and replace or update running instances; a newly fixed image does not patch an existing VM. Exceptional fixes for 3.21 and older do not restore general support.
  - title: Disable password logins if you cannot patch immediately
    hint: First test key login and retain the current session. Back up sshd configuration, set PasswordAuthentication no in the effective configuration, including applicable Match blocks, run sshd -t and restart sshd. Verify sshd -T and representative user/source Match contexts, then test a fresh key login. Alpine 3.19+ defaults read sshd_config.d; older releases may ignore a drop-in, so do not rely on that file alone. Keep SSH restricted while verifying.
  - title: Check every account and cloud-image prerequisite
    hint: Locally inspect account password-field types without publishing hashes. The vulnerable target has '*' and another local account has a $5$ or $6$ hash. Include directory-service users resolved through musl-nscd (nslcd, winbind or sssd) that have no shadow entry, as the advisory warns. openssh-server-pam is still affected with UsePAM no. Default PermitRootLogin prohibit-password protects root but not other permitted key-only users. Tiny-cloud images 3.18.11–3.24.3 can become exposed when any such hash is added; their alpine user has passwordless doas. Containers without sshd, effective PasswordAuthentication no and PAM with UsePAM yes are excluded by the advisory.
  - title: Preserve authentication evidence and investigate unexpected logins
    hint: Review /var/log/messages for sshd Accepted password entries naming accounts that have no password. Preserve logs and inspect doas use, new users, files and authorized_keys changes. A log match needs context and absence is not proof of safety. If unauthorized login cannot be ruled out, isolate and treat the host as compromised; patching does not remove established access.
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
---

Alpine describes a failure when musl's crypt() returns an error marker for an overlong password and sshd compares it with an account's stored '*' field. A reachable attacker who knows the target username can authenticate with a 257–1024-byte password if password authentication is enabled, PAM is not used and another local account supplies a $5$ or $6$ password hash. This is not a universal OpenSSH or Alpine compromise. Accounts locked with '!' are excluded; root still needs PermitRootLogin yes for direct password entry, while another affected account may obtain root through its own privileges.

Alpine lists affected releases 3.16–3.24 and edge. Its tiny-cloud images are safe initially but may become exposed after an administrator adds a qualifying password hash; the preconfigured alpine account has passwordless doas. Cloud-init images configured with password authentication disabled and containers with no sshd are outside that path. Upstream 10.6p2 is a workaround, while stable Alpine branches retain older upstream version numbers with patched package revisions. No version checker is supplied for these distribution-specific versions. The notices establish the flaw and remediation, not observed exploitation or a victim count.

**Identifier follow-up:** The CNA has now been checked and links this flaw to **CVE-2026-123158**. Its brief description gives 256–1024 characters; Alpine’s detailed explanation requires over 256 bytes and explicitly gives **257–1024 bytes**, retained above. The identifier does not change the account prerequisites, patched package revisions or restart requirement. Red Hat’s not-affected assessment applies to its product builds, not every Linux installation.
