---
title: Docker Desktop 4.97.0 fixes credential logging and a VM networking flaw
level: 3
date: 2026-10-26
tags:
- Docker
- credentials
- virtualization
ecosystems:
- docker
summary: Docker Desktop 4.97.0 fixes third-party credential logging and a kernel networking flaw reachable from a container. It also cleans existing host logs/crash dumps; older copied or shared diagnostics need separate cleanup.
splash: Docker Desktop before 4.97.0; readable logs/diagnostics or container access to the affected VM networking path
wipe: Update Docker Desktop to 4.97.0; sanitize copied diagnostics and rotate any exposed third-party credentials
inTheWild: unknown
inTheWildNote: Docker’s release notes do not report malicious exploitation.
cves:
- id: CVE-2026-114409
  name: Third-party credentials logged in cleartext
  description: Insufficient IPC redaction exposes third-party API keys/OAuth tokens to readers of local logs or diagnostic bundles; these are not Docker account tokens.
- id: CVE-2026-99999
  name: VM network-stack corruption
  description: A container can abuse bad IPv4 checksum metadata through TUN or AF_PACKET to corrupt the VM network stack; the notes do not establish a host escape.
fixed:
- product: Docker Desktop
  version: 4.97.0
  status: Includes existing host-log/crash-dump cleanup
timeline:
- date: Oct 26, 2026
  title: Docker Desktop 4.97.0 released
checklist:
- title: Verify the Desktop application version
  hint: Update through Docker’s official release channels and verify 4.97.0 in Docker Desktop. A docker client/Engine version alone does not identify the Desktop application build.
- title: Find exported logs and diagnostics
  hint: Delete or sanitize bundles generated/shared with 4.96.x or earlier and logs copied elsewhere. Earlier 4.94.0/4.95.0 changes covered known logging paths but could leave historical credentials behind.
- title: Revoke credentials if they were exposed
  hint: 'General response guidance: assess who could read the affected files, revoke/rotate exposed third-party API keys or OAuth tokens, and review provider activity. Preserve necessary evidence before cleanup.'
sources:
- name: Docker security announcements
  url: https://docs.docker.com/security/security-announcements/
  primary: true
  says: Two fixes and historical diagnostics cleanup requirements.
- name: Docker Desktop 4.97.0 release notes
  url: https://docs.docker.com/desktop/release-notes/#4970
  primary: true
  says: October 26 release; distinguishes credential logging from VM network-stack corruption.
---

L3 reflects security-boundary failures in a mainstream developer tool. Neither a confirmed host takeover nor a victim count is established. The separate [eMudhra trust-store response](/incidents/emudhra-ca/) still requires attention; this release batch concerns different flaws.
