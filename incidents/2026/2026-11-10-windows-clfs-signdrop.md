---
title: SignDrop proof of concept targets Windows CLFS authentication to gain SYSTEM
summary: A researcher released a local privilege escalation proof of concept that uses CLFS authentication file creation and a privileged Defender operation. Testing was reported on selected Windows 11 26H2 and Windows Server 2025 builds.
splash: Windows hosts on which an attacker can run local code and CLFS authentication is in learning or enforcement mode, per the researcher.
wipe: Inventory CLFS authentication modes, keep protections enabled and monitor Microsoft for a confirmed fix.
inTheWildNote: Researcher proof of concept. The sources reviewed do not confirm attacks in the wild.
level: 3
date: '2026-11-10'
tags:
- Windows
- CLFS
- privilege escalation
inTheWild: unknown
timeline:
- date: Nov 10, 2026
  title: Researcher publishes SignDrop repository and technical notes
  body: The public repository history records publication on November 10 UTC. The researcher reports a local path to SYSTEM.
checklist:
- title: Inventory the configured CLFS mode without running the proof of concept
  hint: Use endpoint inventory or run reg query HKLM\SYSTEM\CurrentControlSet\Services\CLFS\Authentication /v Mode to read the current mode. Microsoft defines 0 as enforcement and 1 as learning; the researcher reports those modes as relevant. Missing or different values and other builds need separate assessment.
- title: Reduce local execution exposure and investigate suspicious privilege changes
  hint: Restrict untrusted executable launches with existing application controls. Review EDR process and file telemetry for unexpected SYSTEM execution, related CLFS log and .cnpf authentication files, and security-tool changes. Correlate the sequence before declaring compromise and preserve evidence if it is suspicious.
- title: Keep CLFS protections and track Microsoft guidance
  hint: Leave authentication and endpoint protections enabled. Microsoft documents that CLFS authentication helps prevent tampering before logs are parsed. Track the Microsoft Security Update Guide for an advisory and test the vendor’s fix when available.
sources:
- name: SignDrop researcher repository
  says: Provides the reported attack chain, prerequisites and testing claims.
  url: https://github.com/MSNightmare/SignDrop
  primary: true
- name: Microsoft CLFS authentication documentation
  says: Defines mode values and explains the purpose of the protection.
  url: https://support.microsoft.com/en-us/servicing/os/windows/2025/03/common-log-file-system-clfs-authentication-mitigation
  primary: true
---

The researcher describes a file creation issue in clfs.sys. A standard local user sets up a CLFS log and associated container, then causes a privileged Defender operation to open it. The chain uses creation of a CLFS authentication file under a privileged context to demonstrate SYSTEM execution. The public notes name Windows 11 26H2, Windows 11 26H2 Experimental and Windows Server 2025 Experimental as test targets.

The mode test is a triage signal from the researcher. The available material does not establish all affected builds or an installed-base percentage. No Microsoft advisory assigning a CVE or a SignDrop-specific fixed build was verified in this review. Microsoft’s CLFS documentation describes the existing mitigation, including a learning period that begins when the system first starts with the relevant driver version. Microsoft documents values 2 and 3 as disabled modes. Keep current protections enabled while evaluating the researcher’s claims.
