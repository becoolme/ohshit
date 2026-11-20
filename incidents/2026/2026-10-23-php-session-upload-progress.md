---
title: PHP fixes session serializer mismatch RCE; shared stores can expose separate applications
headline: The emergency flush missed one unusual pipe
level: 3
date: 2026-10-23
tags:
- PHP
- RCE
- sessions
ecosystems:
- php
summary: PHP fixed CVE-2026-115560 in 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36. Upload progress can write sessions that a different serializer reads as objects. Separate applications sharing session storage can be affected without a runtime setting change. Explicitly enabled upload progress still requires consistent serializers.
splash: Upload progress + shared session data written as php_binary/php_serialize and read as php + an application gadget chain
wipe: Upgrade to 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 or 8.6.0; keep upload progress disabled or align every shared-store reader/writer
inTheWild: unknown
inTheWildNote: PHP publishes reproduction details, but does not report exploitation in the wild.
cves:
- id: CVE-2026-115560
  name: Session serializer mismatch deserialization
  description: Upload-progress data written with php_binary or php_serialize can become objects when the same session is read as php. RCE needs an available object gadget chain; runtime switching is only one possible setup.
  score: 9.2
fixed:
- product: PHP 8.6
  branch: '8.6'
  version: 8.6.0
  status: Patched; explicit upload-progress enablement still requires matching serializers
- product: PHP 8.5
  branch: '8.5'
  version: 8.5.13
  status: Patched; explicit upload-progress enablement still requires matching serializers
- product: PHP 8.4
  branch: '8.4'
  version: 8.4.28
  status: Patched; explicit upload-progress enablement still requires matching serializers
- product: PHP 8.3
  branch: '8.3'
  version: 8.3.37
  status: Patched; explicit upload-progress enablement still requires matching serializers
- product: PHP 8.2
  branch: '8.2'
  version: 8.2.36
  status: Patched; explicit upload-progress enablement still requires matching serializers
- product: PHP 8.1 and older
  version: none
  status: Unsupported upstream; older releases may also be affected. Use a maintained vendor backport or migrate.
mitigation:
  file: php.ini
  code: 'session.upload_progress.enabled=0

    '
  note: Apply administratively before request parsing and restart workers. ini_set() is too late; check every pool, virtual host and CLI writer sharing the store.
timeline:
- date: Oct 23, 2026
  title: PHP publishes an informational notice and mitigation
  body: A full advisory and fix are planned for the regular release cycle; exact versions and severity are not yet stated.
- date: Nov 19, 2026
  title: PHP ships the fix and expands the documented exposure
  body: The full advisory rates the issue CVSS 4.0 9.2 and confirms cross-application serializer mismatches. Upload progress is now disabled by default, but an explicit enablement overrides that default.
checklist:
- title: Upgrade every deployed PHP runtime
  hint: Install 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 or 8.6.0, rebuild images and restart PHP-FPM / Apache workers. Check the web runtime as well as php -v; use vendor-supported backports for embedded products.
- title: Keep upload progress disabled unless it is needed
  hint: 'Set session.upload_progress.enabled=0 administratively in every writer configuration. Inspect php.ini, FPM pools, virtual hosts and application overrides: explicit enablement overrides the patched default. Do not rely on ini_set() or upload-progress cleanup.'
- title: Audit every reader and writer of a shared session store
  hint: Compare session.serialize_handler, session.save_path, session IDs and file permissions across applications, FPM pools, virtual hosts and CLI jobs. If upload progress stays enabled, all users of that store must use the same serializer, even after updating; separate pools alone do not isolate storage.
- title: Isolate formats and migrate existing session records
  hint: Use separate storage where applications need different formats. Migrate or expire old records before changing formats; do not read existing records with a new serializer.
- title: Retain the earlier PHP2Shell fixes
  hint: The October 21 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35 releases addressed the earlier two CVEs. They do not fix this serializer mismatch; deploy the newer versions above.
sources:
- name: PHP informational advisory, October 23
  url: https://www.php.net/archive/2026.php#2026-10-23-1
  says: Unusual configuration required; disable session upload progress until the next regular fix
  primary: true
- name: PHP full serializer-mismatch advisory, November 19
  url: https://github.com/php/php-src/security/advisories/GHSA-658j-r8rw-q6mx
  says: Affected versions, CVSS 4.0 9.2, shared-store prerequisites, reproduced command execution and post-update configuration requirements
  primary: true
- name: PHP November 19 releases and ChangeLog
  url: https://www.php.net/ChangeLog-8.php
  says: Confirms the fix in 8.2.36, 8.3.37, 8.4.28, 8.5.13 and 8.6.0
  primary: true
updated: '2026-11-20'
---

This is separate from the two [PHP2Shell vulnerabilities](/incidents/php2shell/) patched on October 21. It remains rated L3 because PHP is widely deployed and the full advisory demonstrates code execution, but exploitation depends on a particular session configuration and an application gadget chain. No in-the-wild exploitation is established by this advisory.

**Correction after the November 19 full advisory:** Our earlier account said applications that never changed their serializer at runtime were outside scope. That was too narrow. A runtime switch is only one route: separate applications, FPM pools, virtual hosts or CLI processes with different fixed settings can expose the same mismatch when they share session storage and session IDs with sufficient access permissions.

An attacker must be able to submit a multipart upload using `php_binary` or `php_serialize`, and a later or concurrent reader must access the same session using `php`. For RCE, the reader also needs suitable deserialization classes. With the `files` handler, shared directories, IDs and permissions matter. The feature dates to PHP 5.4.0; the `php_serialize` writer variant needs 5.5.4 or later. Unsupported older versions may remain affected.

The November releases disable upload progress by default and reject runtime session-setting changes while it is enabled. They do not enforce matching serializers across separate configurations. If any writer explicitly re-enables upload progress, align every reader and writer that can access its sessions, or isolate the stores. Set disablement before request parsing; application-level `ini_set()` is too late. Expire or migrate existing records before switching formats.

The [November PHP security release batch](/incidents/php-november-security/) also fixes other issues with different prerequisites. Disabling upload progress does not substitute for that update.
