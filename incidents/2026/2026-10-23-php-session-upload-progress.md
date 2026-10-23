---
title: "PHP warns of an unpatched session upload-progress RCE under unusual serializer settings"
headline: "The emergency flush missed one unusual pipe"
level: 3
date: 2026-10-23
tags: [PHP, RCE, unpatched]
ecosystems: [php]
summary: >-
  CVE-2026-115560 is an additional PHP RCE risk when upload progress is enabled and application code switches the session serializer from php_binary or php_serialize to php before session_start(). Disable upload progress pending the next regular fix.
splash: "Upload progress enabled + configured php_binary/php_serialize switched to php by ini_set() before session_start()"
wipe: "Set session.upload_progress.enabled=0; keep the October 21 PHP2Shell patches installed. Full fix pending"
inTheWild: unknown
inTheWildNote: "PHP's informational notice does not report exploitation"
cves:
  - id: CVE-2026-115560
    name: Session upload-progress RCE with a runtime serializer switch
    description: "Requires upload progress plus php_binary/php_serialize configuration changed to php at runtime before session_start()."
fixed:
  - product: PHP session upload progress
    version: none
    status: "Fix planned for the next regular bugfix release; version range not yet published"
mitigation:
  file: php.ini
  code: |
    session.upload_progress.enabled=0
  note: "Apply in server configuration and restart workers; retain this setting if already applied for PHP2Shell."
timeline:
  - date: Oct 23, 2026
    title: PHP publishes an informational notice and mitigation
    body: "A full advisory and fix are planned for the regular release cycle; exact versions and severity are not yet stated."
checklist:
  - title: Disable upload progress on exposed applications
    hint: "Set session.upload_progress.enabled=0 in server configuration and restart workers; keep an existing disablement in place"
  - title: Check configuration and session initialization together
    hint: "Find php_binary/php_serialize settings and ini_set('session.serialize_handler', 'php') calls before session_start(); applications that never switch at runtime are outside this path"
  - title: Keep PHP2Shell patches and follow the next PHP release
    hint: "8.5.12 / 8.4.27 / 8.3.36 / 8.2.35 address the earlier two CVEs; they do not replace this new mitigation"
sources:
  - name: PHP informational advisory, October 23
    url: https://www.php.net/archive/2026.php#2026-10-23-1
    says: "Unusual configuration required; disable session upload progress until the next regular fix"
    primary: true
---

This is a separate advisory from the two [PHP2Shell vulnerabilities](/incidents/php2shell/) patched on October 21. PHP calls the required configuration unlikely in practice, so the narrower exposure is rated L3.

Applications that never change their session serializer at runtime can keep upload progress enabled. The full affected-version range, severity score and first patched release remain unpublished. Do not interpret an older PHP2Shell version check as clearance for this issue.
