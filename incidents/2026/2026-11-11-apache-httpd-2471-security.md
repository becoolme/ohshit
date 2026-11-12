---
title: Apache HTTP Server 2.4.71 fixes an HTTP/2 heap corruption flaw
summary: Apache fixed a race in mod_http2 that can allow remote code execution. Upstream httpd 2.4.55–2.4.70 and standalone mod_h2 2.0.8–2.0.42 are affected. The release fixes two other flaws in mod_md and mod_vhost_alias.
splash: Apache servers that accept HTTP/2 via affected mod_http2 code. The other two CVEs affect different modules.
wipe: Install httpd 2.4.71 or a verified vendor backport. Disable HTTP/2 where the fix cannot be applied promptly.
inTheWildNote: Apache published fixes. The sources reviewed do not confirm real-world exploitation.
level: 3
date: '2026-11-11'
tags:
- Apache HTTP Server
- HTTP/2
- RCE
inTheWild: unknown
timeline:
- date: Nov 11, 2026
  title: Apache releases 2.4.71 and publishes three fixes
  body: The upstream advisory identifies CVE-2026-119618 as critical. The mod_md and mod_vhost_alias fixes ship in the same release.
checklist:
- title: Inventory the running HTTP/2 configuration
  hint: Use httpd -v or apache2 -v, the package manager, and httpd -M or apache2ctl -M. Check effective Protocols settings for every virtual host and direct origin listener, including h2 over TLS and h2c. Check separately for an externally installed mod_h2.
- title: Install the supported fix and verify the running instance
  hint: Upgrade source builds to httpd 2.4.71 or later. For distro packages, check the vendor’s advisory for the exact fixed package release. Replace an affected standalone module with a supported patched build, then run a configuration check, restart or redeploy the service, and verify the active binary and module.
- title: Disable HTTP/2 on unpatched listeners
  hint: Where an update must wait, remove h2 and h2c from the effective Protocols settings or disable mod_http2. Check configuration and reload; verify that neither direct nor proxied requests negotiate HTTP/2 with the affected listener. Test required traffic. This reduces exposure to the HTTP/2 flaw; the other two modules still require the update if affected.
sources:
- name: Apache 2.4.71 security advisories
  says: Lists the three CVEs, affected versions and release date.
  url: https://httpd.apache.org/security/vulnerabilities_24.html#2.4.71
  primary: true
- name: Apache CNA record
  says: Confirms the race, RCE consequence and affected upstream and standalone versions.
  url: https://cveawg.mitre.org/api/cve/CVE-2026-119618
  primary: true
- name: Standalone mod_h2 maintainer repository
  says: The standalone repository is archived; the maintainer points users to Apache httpd.
  url: https://github.com/icing/mod_h2
  primary: true
- name: Red Hat CVE-2026-119618 analysis
  says: Describes the reachable HTTP/2 prerequisite and the thread-safety failure.
  url: https://access.redhat.com/security/cve/cve-2026-119618
  primary: true
cves:
- name: HTTP/2 heap corruption
  description: A race in mod_http2 assign_headers() can lead to remote code execution.
  id: CVE-2026-119618
- name: mod_md child-process crash
  description: A null pointer dereference can crash a child process while handling HTTP requests.
  id: CVE-2026-106023
- name: mod_vhost_alias stack overwrite
  description: The module can overwrite one byte on the stack.
  id: CVE-2026-109163
fixed:
- product: Apache HTTP Server
  version: 2.4.71
---

CVE-2026-119618 is a race in the HTTP/2 header handling code. A remote client that can reach an affected HTTP/2 listener can trigger memory corruption, with potential code execution in the server process. Apache lists httpd 2.4.55 through 2.4.70 and standalone mod_h2 2.0.8 through 2.0.42. Red Hat identifies servers with h2 or h2c enabled as exposed to this flaw. The standalone project is archived. Use the patched module shipped with Apache httpd, or a downstream build whose vendor confirms the fix.

Apache also fixed a mod_md child-process crash affecting 2.4.30 through 2.4.70 and a mod_vhost_alias one-byte stack overwrite affecting 2.4.69 and 2.4.70. These flaws depend on their respective modules. A downstream backport can retain an older-looking version number, so verify the package release against its advisory.
