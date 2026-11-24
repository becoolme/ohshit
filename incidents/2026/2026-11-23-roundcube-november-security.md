---
title: Roundcube fixes twelve security issues and ends the 1.6 release line
level: 3
date: '2026-11-23'
tags:
- Roundcube
- Webmail
- Security updates
summary: Roundcube 1.6.22 and 1.7.7 fix twelve security issues, including Sieve injection, content-filter bypasses and unsafe TLS fallback. Earlier spellcheck and ImageMagick mitigations need another fix. Version 1.6.22 is the final 1.6 release; move to 1.7 for future security updates.
splash: Roundcube 1.6.x/1.7.x; individual issues depend on plugins, backends, PHP and crafted content.
wipe: Back up and upgrade to 1.7.7, or use final 1.6.22 while migrating promptly to 1.7.
inTheWild: unknown
inTheWildNote: The release announcements do not establish exploitation in the wild.
fixed:
- product: Roundcube 1.6
  branch: '1.6'
  version: 1.6.22
  status: Final 1.6 release; migrate to 1.7 for future fixes
- product: Roundcube 1.7
  branch: '1.7'
  version: 1.7.7
  status: Ongoing security release line
timeline:
- date: Nov 23, 2026
  title: Twelve security fixes released
  body: Roundcube publishes 1.6.22 and 1.7.7, with renewed spellcheck and ImageMagick fixes; 1.6 reaches its final release.
checklist:
- title: Back up and update every deployed copy
  hint: Back up data before upgrading, as the release notes recommend. Deploy 1.7.7 or final 1.6.22, including hosting-panel installations; check the deployed version rather than only the downloaded archive.
- title: Check the features your installation uses
  hint: Review ATD spellcheck, ImageMagick attachments, ManageSieve and the password plugin’s XIMSS driver. The attribute-allowlist fix specifically concerns PHP below 8.4. After upgrading, verify mail access, filtering and password changes on the features you enable; these are operational checks, not compromise indicators.
- title: Plan the move from 1.6 to 1.7
  hint: The maintainers say only 1.7 will receive future security fixes. Treat 1.6.22 as the final update for that line and schedule migration rather than expecting another 1.6 security release.
sources:
- name: Roundcube November 23 security announcement
  url: https://roundcube.net/news/2026/11/23/security-updates-1.6.22-and-1.7.7
  primary: true
  says: Lists twelve fixes, both updated versions and the end of the 1.6 release line.
- name: Roundcube 1.6.22 release notes
  url: https://github.com/roundcube/roundcubemail/releases/tag/1.6.22
  primary: true
  says: Confirms the fixes, recommends a backup and identifies this as the last 1.6 release.
- name: Roundcube 1.7.7 release notes
  url: https://github.com/roundcube/roundcubemail/releases/tag/1.7.7
  primary: true
  says: Confirms the same twelve security changes for the maintained 1.7 line.
---

The batch covers two Sieve-injection paths (comparator names and body/address/envelope fields), two CSS-isolation bypasses, an SVG remote-content bypass, CSS-proxy response disclosure, a namespace-prefixed attribute bypass on PHP below 8.4, TNEF decoder denial of service, password-plugin XIMSS XML injection and insecure IMAP/SMTP/ManageSieve fallback when a TLS-configured server reports no capabilities. It also revisits ATD spellcheck request injection and unsafe PDF/PostScript/SVG content passed to ImageMagick: earlier fixes do not replace these updates.

Exposure depends on the relevant feature, backend or content-processing path; this is not evidence that every installation exposes every issue. The announcements provide no CVE identifiers or numeric severity scores. L3 reflects a mainstream webmail application and security boundaries affected, without an established exploitation claim.
