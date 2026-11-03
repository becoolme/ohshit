---
title: Docker Desktop 4.98 fixes a kernel TCP flaw and a WSL 2 socket-restriction bypass
summary: Docker Desktop 4.98.0 fixes Linux IPv4 TCP use-after-free CVE-2026-98432 and CVE-2026-112917, a container bypass of AF_VSOCK restrictions on the WSL 2 backend. The latter also requires WSL 3.0.3 or later. The notes establish neither exploitation in the wild nor a host escape.
splash: Docker Desktop using affected VM networking; the AF_VSOCK issue concerns containers on the Windows WSL 2 backend
wipe: Upgrade Docker Desktop to 4.98.0; WSL 2 users must also update and verify WSL 3.0.3 or later
inTheWildNote: The vendor release notes do not report exploitation in the wild.
cves:
- id: CVE-2026-98432
  name: Linux IPv4 TCP use-after-free
  description: Docker includes the Linux TCP kernel fix in 4.98.0. The underlying flaw was public October 15; this entry covers the Desktop remediation batch.
- id: CVE-2026-112917
  name: WSL 2 AF_VSOCK restriction bypass
  description: A container on the WSL 2 backend can bypass communication restrictions; remediation requires Desktop 4.98.0 and WSL 3.0.3 or later. The notes do not supply a complete affected starting range.
fixed:
- product: Docker Desktop
  version: 4.98.0
- product: Windows Subsystem for Linux
  version: 3.0.3
  status: Additional requirement for the WSL 2 backend fix
timeline:
- date: Oct 15, 2026
  title: Linux publishes the underlying TCP vulnerability record
- date: Nov 3, 2026
  title: Docker Desktop 4.98.0 ships both fixes
checklist:
- title: Verify the Desktop application version
  hint: Install 4.98.0 or later through official channels and check the application version. Docker CLI/Engine versions do not identify the Desktop build; staged rollout can delay update availability.
- title: Update WSL too and check the backend
  hint: On the Windows WSL 2 backend, run wsl --update in PowerShell or Command Prompt and confirm at least 3.0.3 with wsl --version; restart Desktop or the host if prompted. A Linux distribution package version is not the WSL version.
sources:
- name: Docker Desktop 4.98.0 release notes
  url: https://docs.docker.com/desktop/release-notes/#4980
  primary: true
  says: November 3 fixes for both CVEs and the WSL 3.0.3 dependency.
- name: Linux CNA TCP vulnerability record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-98432
  primary: true
  says: Underlying October 15 disclosure and IPv4 TCP option-lifetime race; this is not a newly disclosed Linux flaw.
- name: Microsoft WSL command documentation
  url: https://learn.microsoft.com/en-us/windows/wsl/basic-commands
  primary: true
  says: Documents wsl --update, wsl --version and the PowerShell/Command Prompt execution context.
level: 3
date: '2026-11-03'
tags:
- Docker
- WSL
- isolation
inTheWild: unknown
---

These flaws and this release are separate from the [October Desktop batch](/incidents/docker-desktop-october/); do not change that batch's first fixed version from 4.97.0 to 4.98.0. L3 reflects kernel and isolation-boundary issues in a mainstream developer tool, not confirmed attacks.

AF_VSOCK supports host/VM communication. Docker states that a container can bypass a restriction, but gives no complete consequence, affected starting range, alternative mitigation or demonstrated host escape. The public CNA API for this CVE returned 404 during this check; its identifier and remediation dependency come from Docker's original release notes, read directly. Do not import host-access consequences from the different CVE-2025-9074 incident. Updating only container images or distribution packages inside WSL does not establish Desktop/WSL remediation.
