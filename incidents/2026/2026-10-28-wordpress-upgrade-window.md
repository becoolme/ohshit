---
title: WordPress patches upgrade-window RCE as attackers probe staged installers
date: 2026-10-28
level: 4
tags: [WordPress, RCE, race condition]
ecosystems: [php]
summary: WordPress 7.1.4 fixes an unauthenticated upgrade-window RCE and other security issues. Wordfence observes exploitation attempts, not confirmed successful intrusions; the RCE needs a full-package update and publicly executable staging files.
splash: Unpatched WordPress 4.7–7.1.3 during full-package updates with a web-accessible, PHP-executable staging tree
wipe: Install 7.1.4 or the branch security backport; protect staging access during updates and verify the deployed version
inTheWild: yes
inTheWildNote: Wordfence reports active attempts; successful intrusions are not established.
cves:
  - id: CVE-2026-119977
    score: 8.1
    name: Unauthenticated staged-installer race
    description: An attacker can run server code by reaching temporary installer files before update cleanup; no account is required.
fixed:
  - { product: WordPress 7.1, branch: "7.1", version: 7.1.4 }
  - { product: WordPress 7.0, branch: "7.0", version: 7.0.8 }
  - { product: WordPress 6.9, branch: "6.9", version: 6.9.11 }
  - { product: WordPress 6.8, branch: "6.8", version: 6.8.12 }
  - { product: WordPress 6.7, branch: "6.7", version: 6.7.11 }
  - { product: WordPress 6.6, branch: "6.6", version: 6.6.11 }
  - { product: WordPress 6.5, branch: "6.5", version: 6.5.14 }
  - { product: WordPress 6.4, branch: "6.4", version: 6.4.14 }
  - { product: WordPress 6.3, branch: "6.3", version: 6.3.14 }
  - { product: WordPress 6.2, branch: "6.2", version: 6.2.15 }
  - { product: WordPress 6.1, branch: "6.1", version: 6.1.16 }
  - { product: WordPress 6.0, branch: "6.0", version: 6.0.18 }
  - { product: WordPress 5.9, branch: "5.9", version: 5.9.20 }
  - { product: WordPress 5.8, branch: "5.8", version: 5.8.19 }
  - { product: WordPress 5.7, branch: "5.7", version: 5.7.21 }
  - { product: WordPress 5.6, branch: "5.6", version: 5.6.23 }
  - { product: WordPress 5.5, branch: "5.5", version: 5.5.24 }
  - { product: WordPress 5.4, branch: "5.4", version: 5.4.25 }
  - { product: WordPress 5.3, branch: "5.3", version: 5.3.27 }
  - { product: WordPress 5.2, branch: "5.2", version: 5.2.30 }
  - { product: WordPress 5.1, branch: "5.1", version: 5.1.28 }
  - { product: WordPress 5.0, branch: "5.0", version: 5.0.31 }
  - { product: WordPress 4.9, branch: "4.9", version: 4.9.35 }
  - { product: WordPress 4.8, branch: "4.8", version: 4.8.34 }
  - { product: WordPress 4.7, branch: "4.7", version: 4.7.39 }
  - { product: WordPress 4.6 and earlier, version: none, status: No security updates; migrate }
timeline:
  - date: Oct 28, 2026
    title: WordPress publishes the security release
  - date: Oct 29, 2026
    title: Wordfence reports staged-installer exploitation attempts
checklist:
  - title: Patch every installation and verify completion
    hint: Use Dashboard → Updates → Update Now, then verify the running release. Check automatic updates actually completed. Only the latest WordPress branch is actively supported; older branches receive courtesy security backports. Migrate 4.6 and earlier.
  - title: Protect the update window
    hint: Where you control the web server, deny public HTTP access to wp-content/upgrade before updating and verify the restriction. Do not delay patching if you cannot configure this. Wordfence users need Extended Protection for direct PHP requests; paid tiers received the rule October 28, Free receives it November 27. A rule is not a replacement for the update.
  - title: Investigate prior exposure
    hint: Review web logs for unexpected PHP requests under wp-content/upgrade, including staged setup-config.php; check unfamiliar administrators, plugins and PHP files, and scan after updating. Preserve suspicious evidence for investigation. A request match alone does not prove code execution; the report publishes no attacker IP or hash list.
sources:
  - name: WordPress security release
    url: https://wordpress.org/news/2026/10/wordpress-7-1-4/
    primary: true
  - name: WordPress detailed release and branch backports
    url: https://wordpress.org/documentation/wordpress-version/version-7-1-4/
    primary: true
  - name: Wordfence original research and remediation
    url: https://www.wordfence.com/blog/2026/10/wordpress-7-1-4-security-release-rce/
    primary: true
  - name: Wordfence vulnerability record
    url: https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-core/wordpress-core-470-713-unauthenticated-upgrade-window-staged-installer-remote-code-execution?asset_slug=wordpress
    primary: true
  - name: NHS England CC-4884
    url: https://digital.nhs.uk/cyber-alerts/2026/cc-4884
    primary: true
---

The October 28 release groups stored XSS, Interactivity API, disclosure and authorization fixes with the installer race and a certificate-trust update. Their permissions and affected branches differ; the unauthenticated RCE prerequisite must not be applied to every sibling issue.

The attacker must locate the temporary tree and finish before cleanup, typically seconds in Wordfence's testing. An idle WordPress installation is not continuously exposed through this race. L4 reflects active targeting of a widely deployed platform, not a demonstrated mass compromise. No victim count is established.
