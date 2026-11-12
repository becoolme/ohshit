---
title: Movable Type Dynamic Publishing can execute PHP from a crafted request
level: 3
date: '2026-11-11'
tags: [Movable Type, CMS, RCE]
summary: An unauthenticated request can cause affected Movable Type Dynamic Publishing sites to run PHP. Six Apart released 8.8.7, 8.0.14 and Premium 2.19. Movable Type 9 is outside the advisory’s scope.
splash: Movable Type 8.8 and 8.0, Premium 2.x and unsupported 8.4 and 7 sites running affected Dynamic Publishing configurations.
wipe: Install the matching update or migrate from older unsupported releases. Audit template includes and test dynamic pages after upgrading.
inTheWild: unknown
cves:
- id: CVE-2026-117687
  score: 6.9
  name: PHP code injection in Dynamic Publishing
  description: A crafted request can cause PHP execution through affected template processing. JVN assigns CVSS 4.0 6.9 and CVSS 3.0 7.3.
fixed:
- {product: Movable Type and Advanced 8.8, branch: '8.8', version: 8.8.7}
- {product: Movable Type and Advanced 8.0, branch: '8.0', version: 8.0.14, status: Exceptional fix after end of support}
- {product: Movable Type Premium and Advanced Edition, version: '2.19'}
- {product: Movable Type 8.4 and 7, version: none, status: End of life}
timeline:
- date: Nov 11, 2026
  title: Six Apart and JVN publish the vulnerability and fixed versions
  body: Six Apart ships 8.8.7, 8.0.14 and Premium 2.19 and documents differences in PHP handling.
checklist:
- title: Identify affected sites and update
  hint: Inventory Movable Type and Premium versions and check which sites use Dynamic Publishing. Obtain the matching edition and build from Six Apart. For 8.4 and 7 plan migration to a supported line. The exceptional 8.0.14 fix does not restore ongoing 8.0 support.
- title: Limit exposure while scheduling the update
  hint: Where feasible take affected dynamic routes offline or restrict access to trusted networks. Review DynamicTemplateAllowPHP in mt-config.cgi. JVN recommends 0 to limit template PHP, but verify the version-specific include exceptions in Six Apart’s notes and apply the update.
- title: Test templates and investigate suspicious requests
  hint: In staging, check include and widget settings, error pages and templates that rely on PHP before restoring public traffic. Review web and PHP logs for unexpected activity around dynamic routes. If compromise is suspected, preserve logs, isolate the site and check for unexpected PHP files or processes before replacing exposed credentials.
sources:
- name: Six Apart security release
  url: https://www.sixapart.jp/movabletype/news/2026/11/11-1100.html
  primary: true
  says: Confirms all three released versions, the exceptional 8.0 fix and template behavior.
- name: JVN coordinated disclosure
  url: https://jvn.jp/en/jp/JVN11786640/index.html
  primary: true
  says: Provides affected editions, remote request prerequisite, scoring and the interim configuration recommendation.
- name: Six Apart 8.8.7 release notes
  url: https://movabletype.org/documentation/appendices/release-notes/8.8.7.html
  primary: true
  says: Explains precisely which PHP include exceptions remain after the update.
---

Affected templates can execute PHP produced by some tags, the `mteval` modifier or error-page processing. The request path applies to Dynamic Publishing. JVN lists Movable Type 8.8.6 and 8.0.13 and earlier in their respective branches, including Advanced, and Premium 2.18 and earlier in 2.x, including Advanced Edition. It also identifies unsupported 8.4 and 7 as affected. Neither source establishes active exploitation.

Six Apart documents exceptions in 8.8.7 and Premium builds based on it. PHP in output loaded through `MTInclude`, `MTIncludeBlock`, `MTWidgetSet` or `MTWidgetManager` may still execute when the relevant server-side include setting is enabled, or when the site's include method is PHP and `ssi="1"` is used on `MTInclude` or `MTIncludeBlock`. Those exceptions can apply even with `DynamicTemplateAllowPHP 0`. The release also preserves existing handling of PHP written directly into templates. Verify the settings and behavior on the build you deploy.
