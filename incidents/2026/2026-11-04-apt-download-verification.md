---
title: APT can install an unverified package as root after HTTP redirects and retries
level: 3
date: '2026-11-04'
tags:
- APT
- Debian
- Ubuntu
summary: CVE-2026-109518 lets an on-path attacker replace an APT package after verification through HTTP redirects, resumed downloads and hard-link reuse. Non-zero Acquire::Retries is required. Debian fixes are available; Ubuntu’s CVE page still lists releases vulnerable. No exploitation is established.
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
  status: 'Debian tracker: fixed; forky still lists 3.3.5 vulnerable'
- product: Ubuntu APT
  version: none
  status: CVE page still lists 14.04–26.10 vulnerable; CNA names thresholds but linked USN is unavailable. Verify an actual release before relying on it.
timeline:
- date: Nov 4, 2026
  title: Debian and Canonical publish APT vulnerability and remediation records
  body: Debian lists fixed bookworm/trixie/unstable packages. Canonical describes the HTTP redirect/retry prerequisite; its public CVE page and CNA version records differ on release availability.
checklist:
- title: Inventory APT and install the distribution fix
  hint: Check apt --version and apt-cache policy apt on hosts, base images and CI runners. Debian 13 needs 3.0.4, Debian 12 needs 2.6.2; unstable lists 3.3.6. Use a trusted administrative network/repository route to update apt and its matching packages. Keep distribution suffixes and vendor backports; do not install Debian packages on Ubuntu or infer that an upstream version proves a distribution build is fixed.
- title: Check HTTP sources, proxies and retry configuration
  hint: Review /etc/apt/sources.list, /etc/apt/sources.list.d/ and apt-config dump for HTTP repository URLs, proxies and Acquire::Retries. A non-zero value is required; 3 is the default starting with Debian 12 and Ubuntu 22.04. Older defaults do not imply safety if administrators enabled retries. Reduce exposure to untrusted network paths and use verified HTTPS repository/proxy endpoints where supported; never disable signature or TLS checks. This is exposure reduction, not a proven substitute for patching.
- title: Resolve Ubuntu package availability through the vendor
  hint: Canonical’s CNA names fixed thresholds, while its CVE page still marks releases vulnerable and USN-8996-1 returned 404. Follow the official Ubuntu CVE page and your release’s security notices/repository candidate; obtain support confirmation if needed. Do not treat a reserved version threshold as proof the update is distributed.
- title: Investigate suspicious package installations
  hint: Preserve APT/dpkg history, proxy/repository logs and package files around suspicious redirects or retries. Affected installs can execute package scripts as root; compare package provenance through trusted vendor records and investigate host persistence. No dedicated attack IoCs or victim total were verified; an unusual redirect alone does not prove compromise.
sources:
- name: Debian security tracker
  url: https://security-tracker.debian.org/tracker/CVE-2026-109518
  primary: true
  says: Lists bookworm 2.6.2, trixie 3.0.4 and unstable 3.3.6 fixed; forky 3.3.5 vulnerable.
- name: Canonical CVE page
  url: https://ubuntu.com/security/CVE-2026-109518
  primary: true
  says: Explains network-path, redirects, retries and configuration defaults; still lists Ubuntu releases vulnerable.
- name: Canonical CNA original record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-109518
  primary: true
  says: Detailed affected/fixed version thresholds and CVSS 4.0; CISA November 4 assessment records no exploitation. Referenced Ubuntu USN returned 404.
---

APT can collapse distinct package downloads onto one URI after a redirect. Reusing hard links while retrying lets a network-path attacker substitute an already-verified package before installation. A malicious mirror or proxy is within the stated threat model; this is not a claim that package signing keys or the Debian archive were compromised.

The attack needs an install/download with redirects, retries and a non-zero retry setting. Debian and Ubuntu defaults make newer releases exposed, but older releases can also be exposed under changed configuration. Canonical rates the flaw high; no actual exploitation or victim count is established. The mainstream package manager and potential root execution support L3.

Debian’s tracker supplies the three distribution fixes listed above. Canonical’s CNA additionally describes older Debian and Ubuntu version thresholds; those are not proof that a supported distribution update is available. Its current Ubuntu page still lists affected releases, and the linked USN returned 404. Debian mailing-list originals presented an access challenge; no challenge was bypassed, and no unread mailing-list text is used as evidence.
