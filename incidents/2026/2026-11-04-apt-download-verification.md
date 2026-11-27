---
title: APT can install an unverified package as root after HTTP redirects and retries
level: 3
date: '2026-11-04'
tags:
- APT
- Debian
- Ubuntu
summary: CVE-2026-109518 lets an on-path attacker replace an APT package after verification through HTTP redirects, retries and hard-link reuse. Non-zero Acquire::Retries is required. Debian and Ubuntu now list fixed packages; Canonical documents a zero-retry upgrade path. No exploitation is established.
splash: APT clients using attacker-manipulable HTTP downloads, redirects/retries and non-zero Acquire::Retries.
wipe: Install your distribution’s fixed APT package through a trusted route; verify its security notice and installed version.
inTheWild: unknown
inTheWildNote: CISA’s November 4 assessment records no exploitation; no actual victims verified.
cves:
- id: CVE-2026-109518
  score: 7.7
  name: APT download verification bypass
  description: Hard-link reuse permits substitution after verification during HTTP redirect/retry handling; Canonical assigns CVSS 4.0 7.7.
fixed:
- product: Debian 13 trixie APT
  version: 3.0.4
  status: 'Debian security tracker: fixed'
- product: Debian 12 bookworm APT
  version: 2.6.2
  status: 'Debian security tracker: fixed'
- product: Debian unstable APT
  version: 3.3.6
  status: 'First fixed unstable build; current sid package is 3.3.8'
- product: Debian testing forky APT
  version: 3.3.6
  status: 'Fixed build recorded in November 6 testing migration notice; current forky package is 3.3.7'
- product: Ubuntu 26.10 APT
  version: 3.3.3ubuntu0.1
  status: USN, CVE page and current Canonical blog list fixed. Verify the actual repository candidate.
- product: Ubuntu 26.04 LTS APT
  version: 3.2.1ubuntu0.1
  status: Standard security support
- product: Ubuntu 24.04 LTS APT
  version: 2.8.4ubuntu0.1
  status: Standard security support
- product: Ubuntu 22.04 LTS APT
  version: 2.4.15ubuntu0.1
  status: Standard security support
- product: Ubuntu 20.04 LTS APT
  version: 2.0.12+esm1
  status: Ubuntu Pro / ESM
- product: Ubuntu 18.04 LTS APT
  version: 1.6.19+esm1
  status: Ubuntu Pro / ESM
- product: Ubuntu 16.04 LTS APT
  version: 1.2.36+esm1
  status: Ubuntu Pro / ESM with Legacy add-on
- product: Ubuntu 14.04 LTS APT
  version: 1.0.1ubuntu2.24+esm4
  status: Ubuntu Pro / ESM with Legacy add-on
timeline:
- date: Nov 4, 2026
  title: Debian and Canonical publish APT vulnerability and remediation records
  body: Debian lists fixed bookworm/trixie/unstable packages. Canonical describes the HTTP redirect/retry prerequisite; its public CVE page and CNA version records differ on release availability.
- date: Nov 4, 2026
  title: Canonical publishes USN and updates Ubuntu availability
  body: USN-8996-1 and the CVE page list eight fixed builds. The blog supplies Acquire::Retries=0 upgrade commands; early checks differed between publishing and fixed for 26.10; the current blog lists fixed, and users should verify the actual repository candidate.
- date: Nov 6, 2026
  title: Debian migration notice records fixed APT 3.3.6 in testing
  body: The notice records 3.3.6 replacing 3.3.5. This is the notice date, not an asserted exact migration time; testing-watch notifications are generated daily.
- date: Nov 14, 2026
  title: Debian migration notice records APT 3.3.7 in testing
  body: The later notice records 3.3.7 replacing 3.3.6. The security tracker now lists forky 3.3.7 fixed and sid 3.3.8 fixed; 3.3.7 is not presented as the first security fix.
checklist:
- title: Inventory APT and install the distribution fix
  hint: Check apt --version and apt-cache policy apt on hosts, base images and CI runners. Debian 13 needs 3.0.4, Debian 12 needs 2.6.2; unstable’s first fixed build is 3.3.6. Testing/forky received that fixed build too and currently lists 3.3.7 fixed; sid currently lists 3.3.8 fixed. Use a trusted administrative network/repository route to update apt and its matching packages. Keep distribution suffixes and vendor backports; do not install Debian packages on Ubuntu or infer that an upstream version proves a distribution build is fixed.
- title: Check HTTP sources, proxies and retry configuration
  hint: Review /etc/apt/sources.list, /etc/apt/sources.list.d/ and apt-config dump for HTTP repository URLs, proxies and Acquire::Retries. A non-zero value is required; 3 is the default starting with Debian 12 and Ubuntu 22.04. Older defaults do not imply safety if administrators enabled retries. Reduce exposure to untrusted network paths and use verified HTTPS repository/proxy endpoints where supported; never disable signature or TLS checks. Canonical now explicitly confirms that setting Acquire::Retries=0 prevents this retry path, including a malicious mirror; trusted HTTPS transport protects against an on-path attacker. HTTPS alone does not establish trust in a malicious mirror.
- title: Use Canonical’s zero-retry Ubuntu upgrade path
  hint: 'Canonical recommends sudo apt update && sudo apt upgrade -o Acquire::Retries=0. To target the APT source package instead: sudo apt update && sudo apt install -o Acquire::Retries=0 --only-upgrade ''?source-package(^apt$)''. Check all installed APT-source packages with apt list --installed ''?source-package(^apt$)'' and compare their full distribution versions with USN-8996-1. Ubuntu 20.04/18.04 need Pro/ESM; 16.04/14.04 also need the Legacy add-on. For 26.10, verify that 3.3.3ubuntu0.1 is actually offered: USN, the CVE page and the current blog all list this build as fixed. Use a trusted HTTPS mirror before patching where supported; do not disable verification.'
- title: Investigate suspicious package installations
  hint: Preserve APT/dpkg history, proxy/repository logs and package files around suspicious redirects or retries. Affected installs can execute package scripts as root; compare package provenance through trusted vendor records and investigate host persistence. No dedicated attack IoCs or victim total were verified; an unusual redirect alone does not prove compromise.
sources:
- name: Debian security tracker
  url: https://security-tracker.debian.org/tracker/CVE-2026-109518
  primary: true
  says: Lists bookworm 2.6.2 and trixie 3.0.4 fixed, with the unstable fix threshold 3.3.6. The current package table lists forky 3.3.7 and sid 3.3.8 fixed, replacing the earlier vulnerable forky snapshot.
- name: Canonical CVE page
  url: https://ubuntu.com/security/CVE-2026-109518
  primary: true
  says: CVE page now lists fixed Ubuntu 14.04–26.10 builds and required Pro/Legacy coverage; supersedes the earlier vulnerable statuses.
- name: Canonical CNA original record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-109518
  primary: true
  says: Affected/fixed thresholds and CVSS 4.0; CISA November 4 assessment records no exploitation. The previously unavailable USN is now readable.
- name: Canonical USN-8996-1
  url: https://ubuntu.com/security/notices/USN-8996-1
  primary: true
  says: November 4 release notice lists eight Ubuntu fixed packages, including ESM/Legacy requirements.
- name: Canonical APT remediation explanation
  url: https://ubuntu.com/blog/apt-vulnerability-fixes-available
  primary: true
  says: Zero-retry upgrade commands, HTTPS mitigation and installed-source-package check; the current table lists Ubuntu 26.10 fixed in 3.3.3ubuntu0.1, resolving the earlier publishing/fixed discrepancy.
- name: Debian testing migration notice for APT 3.3.6
  url: https://tracker.debian.org/news/1820074/apt-336-migrated-to-testing/
  primary: true
  says: November 6 daily notification records testing moving from 3.3.5 to 3.3.6; message time does not establish the exact migration time.
- name: Debian testing migration notice for APT 3.3.7
  url: https://tracker.debian.org/news/1823389/apt-337-migrated-to-testing/
  primary: true
  says: November 14 daily notification records testing moving from 3.3.6 to 3.3.7.
updated: '2026-11-27'
---

APT’s hard-link reuse during download redirects and retries lets a network-path attacker cause installation of an attacker-controlled, unverified package. A malicious mirror or proxy is within the stated threat model; this is not a claim that package signing keys or the Debian archive were compromised.

The attack needs an install/download with redirects, retries and a non-zero retry setting. Debian and Ubuntu defaults make newer releases exposed, but older releases can also be exposed under changed configuration. Canonical rates the flaw high; no actual exploitation or victim count is established.

Debian’s tracker supplies the distribution fixes listed above. At our earlier check, Ubuntu still marked releases vulnerable and USN-8996-1 returned 404. **November 4 availability update:** the USN is now readable and the CVE page lists the eight Ubuntu fixes above. For 26.10, early blog responses differed between publishing and fixed. At the November 27 recheck, the current blog, USN and CVE page all list 3.3.3ubuntu0.1 as fixed. Verify the actual repository candidate and installed version; do not assume rollout has reached every mirror. Older releases require the indicated Pro/ESM and Legacy coverage.

Canonical recommends disabling retries for the upgrade itself, including when defending against a malicious mirror. HTTPS to a trusted mirror protects against network-path manipulation; patching remains required. Snap installation uses a different system and is outside this APT flaw. The Debian mailing-list access challenge remains unresolved; no unread mailing-list content is used as evidence.


**Testing-branch follow-up:** The earlier snapshot listed forky’s 3.3.5 as vulnerable. Debian’s November 6 testing-watch message records migration from 3.3.5 to the fixed 3.3.6; its November 14 message records the subsequent 3.3.7 migration. These are daily notification dates, not exact migration instants. The current security tracker lists forky 3.3.7 and sid 3.3.8 fixed, while retaining 3.3.6 as the unstable security-fix threshold. Testing users should update through their own trusted Debian repositories and verify the actual installed package; this update does not imply that 3.3.7 was the first fixed version or change the HTTP/retry prerequisites.
