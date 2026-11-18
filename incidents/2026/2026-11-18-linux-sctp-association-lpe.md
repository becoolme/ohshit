---
title: Linux SCTP flaw lets locally executing attackers reach host root in researcher tests
level: 3
date: 2026-11-18
tags:
  - Linux
  - kernel
  - SCTP
  - containers
ecosystems:
  - linux
summary: Xint reports an SCTP association lifetime bug introduced in Linux 4.15. Researchers chained existing code execution to host root, including from a Docker container in their tested configuration. The original report identifies neither a CVE nor a fixed kernel.
splash: Linux hosts where attacker-controlled code can reach the vulnerable SCTP path; container restrictions matter
wipe: Block unused SCTP module loading, assess already-loaded or built-in SCTP, and track your distribution’s kernel fix.
inTheWild: unknown
inTheWildNote: The original reports researcher tests, not confirmed attacks against victims.
fixed:
  - product: Linux SCTP association lifetime bug
    version: none
    status: No fixed kernel identified in the original disclosure; check distribution guidance
mitigation:
  file: /etc/modprobe.d/disable-sctp.conf
  code: |
    install sctp /bin/false
  note: For hosts that do not need SCTP. Blocks loading through modprobe only; it neither unloads an already-loaded module nor disables built-in SCTP.
timeline:
  - date: Nov 18, 2026
    title: Xint discloses the SCTP bug alongside nginx research
    body: Researchers report host-root escalation and a Docker escape in their tested setup, withholding most reproduction details pending a kernel patch.
checklist:
  - title: Assess SCTP reachability on the host
    hint: Check your kernel configuration, installed and loaded modules, application dependencies and container restrictions. A container image or nginx version alone cannot establish host-kernel exposure.
  - title: Block unused SCTP module loading
    hint: On hosts that do not need SCTP, use the published modprobe configuration below. Already-loaded or built-in SCTP needs a separate host-specific plan; this setting alone does not disable it.
  - title: Track and deploy the distribution’s kernel remediation
    hint: The original does not name a fixed kernel or a CVE. Monitor your kernel supplier and Xint’s update page; validate the supplier’s remediation and activation requirements when available.
  - title: Close the initial code-execution path too
    hint: For nginx deployments, follow the linked November security-batch guidance. Updating nginx closes those entry paths but does not itself fix the separate SCTP kernel bug.
sources:
  - name: Xint nginx2root research, section 6
    url: https://xint.io/blog/nginx2root-remote-code-execution
    primary: true
    says: Describes the SCTP lifetime error, introduction in Linux 4.15, tested host-root escalation and the limitations of blocking module loading.
---

Xint describes a separate Linux kernel vulnerability in its [nginx November-batch research](/incidents/nginx-november-batch/). A waiting SCTP send operation can free an association after it has moved to another socket, leading to a use-after-free or double free. Xint dates its introduction to Linux 4.15 in 2018; it does not supply a complete distribution-specific affected range or a fixed kernel in this disclosure.

This is a local privilege-escalation path. The researchers first obtained code execution as an nginx worker, then used kernel memory disclosure and an arbitrary kernel function call to reach root. They also obtained host root from nginx inside a Docker container in their test setup. Reachability depends on the kernel, available modules and container restrictions; the result does not establish that every Docker deployment is exploitable.

Many distributions can automatically load SCTP when a program opens an SCTP socket. On hosts that do not use it, Xint recommends the module-loading control above. It is deliberately limited: loaded modules and kernels with SCTP built in remain outside that control. Assess those hosts separately with your kernel supplier, accounting for applications that actually need the protocol.

The original withholds most reproduction details pending a kernel patch and reports no confirmed victim activity. L3 reflects a demonstrated privilege escalation in a mainstream kernel. Kernel compromise can affect the host and its other containers because they share that kernel; this is potential impact, not a reported victim count. Follow the independent nginx fixes as well, and track the kernel supplier’s eventual remediation.
