---
title: KVM nested SVM reset flaw exposes AMD host memory to guests
level: 3
date: '2026-11-18'
tags:
- Linux
- KVM
- VM escape
ecosystems:
- linux
summary: CVE-2026-99312 breaks guest isolation on unpatched AMD KVM hosts with nested virtualization enabled. Researchers demonstrated host-memory reads and writes; no malicious exploitation is reported. Patch the host kernel or disable nesting.
splash: Unpatched AMD KVM hosts with nesting enabled and an attacker with guest root or permission to create KVM VMs.
wipe: 'Run a fixed host kernel: 7.3.5, 6.18.64 or 6.12.118 on those upstream branches; otherwise disable AMD nesting and verify it after reboot.'
inTheWild: 'no'
inTheWildNote: Research demonstration and provider reproduction; no reported malicious exploitation.
cves:
- id: CVE-2026-99312
  score: 8.8
  name: Stale nested page-table pointer after INIT
  description: An INIT with paging disabled in a nested AMD guest leaves a stale MMU context, enabling a page-table use-after-free and host-memory access.
fixed:
- product: Upstream Linux 7.3
  branch: '7.3'
  version: 7.3.5
  status: Fixed
- product: Upstream Linux 6.18
  branch: '6.18'
  version: 6.18.64
  status: Fixed
- product: Upstream Linux 6.12
  branch: '6.12'
  version: 6.12.118
  status: Fixed
- product: Upstream Linux 5.15 / 6.1 / 6.6
  version: none
  status: No fixed upstream release verified; use mitigation or a vendor-confirmed backport
mitigation:
  file: /etc/modprobe.d/kvm.conf
  code: |
    options kvm_amd nested=0
  note: Resolve existing module/boot options first. A file edit does not change the running module; schedule a host reboot and verify nesting is disabled.
timeline:
- date: Oct 21, 2026
  title: Researcher reports to KVM maintainers
- date: Nov 2, 2026
  title: Upstream fix merged
  body: Commit c7c288d178cb0b78d3464a616b16b1aa0b316049; first tagged in 7.4-rc2 on November 9.
- date: Nov 17, 2026
  title: Stable fixes released
  body: 7.3.5, 6.18.64 and 6.12.118 carry the fix.
- date: Nov 18, 2026
  title: Terra publishes the research and CVE
- date: Nov 19, 2026
  title: DigitalOcean confirms reproduction and fleet remediation
  body: Its statement says Droplet customers need no action for this host-kernel fix.
checklist:
- title: Identify exposed hypervisors
  hint: On each host, run grep -m1 vendor_id /proc/cpuinfo, cat /sys/module/kvm_amd/parameters/nested and uname -r. AuthenticAMD plus nesting 1/Y needs review against the exact kernel package. Intel VMX and nesting 0/N exclude this path; changing guest CPU mode does not.
- title: Disable nesting until a fixed host kernel is running
  hint: Inspect nested options in /etc/modprobe.d/, /run/modprobe.d/, /usr/lib/modprobe.d/ and /lib/modprobe.d/. Set kvm_amd nested=0 without conflicting entries; verify with modprobe -c. Check /proc/cmdline for kvm_amd.nested=1 and remove it through the distribution bootloader configuration. Notify tenants using nested VMs, plan shutdown/evacuation and reboot the host; do not unload KVM beneath running VMs. Confirm the runtime parameter is 0/N.
- title: Install the distribution fix and verify the running kernel
  hint: Use the vendor CVE tracker for the exact kernel flavour and backport, install its fixed package, reboot and check uname -r. Upstream fixes are 7.3.5, 6.18.64 and 6.12.118 on their respective branches; 7.4-rc2 is a prerelease. Keep nesting off until the fix is running. Updating only the guest kernel does not repair the host.
sources:
- name: Terra Security original research
  url: https://www.terra.security/blog/kvm-guest-to-host-escape
  primary: true
  says: November 18 disclosure, technical cause and coordinated timeline.
- name: DigitalOcean reproduction and remediation
  url: https://www.digitalocean.com/blog/cve-2026-99312-kvm-patch
  primary: true
  says: Confirms the read/write demonstrations and says fleet remediation requires no Droplet customer action.
- name: Linux CNA record
  url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/99xxx/CVE-2026-99312.json
  primary: true
  says: 8.8 CVSS 3.1, affected commits, stable fixes and an attack scenario accessible to a non-root host KVM user.
- name: VirtFusion operator advisory
  url: https://docs.virtfusion.com/next/security/cve-2026-99312/
  primary: true
  says: Operational checks, persistent mitigation and reboot verification; distribution availability and ratings were checked November 19.
- name: Debian security tracker
  url: https://security-tracker.debian.org/tracker/CVE-2026-99312
  primary: true
  says: Bookworm/trixie security packages remain vulnerable; sid 7.3.5-1 is fixed at the November 20 check.
- name: Ubuntu security tracker
  url: https://ubuntu.com/security/CVE-2026-99312
  primary: true
  says: High priority on November 20; affected status depends on the kernel package, including HWE.
- name: Red Hat assessment
  url: https://access.redhat.com/security/cve/cve-2026-99312
  primary: true
  says: Current preliminary score 7.8; AMD nesting prerequisite and mitigation. The operator advisory still carries an older 5.6 snapshot.
---

An INIT reset while an AMD nested guest has paging disabled can leave the outer VM using a freed page-table pointer. Reuse of that page lets a guest construct mappings into host physical memory. Intel's VMX handling does not take this path. The cloud demonstration required root in the guest; the Linux CNA also describes a non-root host user with KVM VM-creation access. This is not an unauthenticated internet endpoint.

DigitalOcean confirms a read-only mapping of about 127 GB of host RAM and a separate 32-byte chosen write on an isolated AMD server without other customers. Those are test measurements, not a customer breach total. Host code execution has not been publicly demonstrated. No public exploit code or malicious exploitation is reported; L3 reflects a demonstrated isolation failure in a mainstream hypervisor.

The regression came from the CVE-2022-3344 fix. Upstream 6.1 and later and backports into 5.15.81/6.0.11 are affected until patched; distribution backports prevent a universal version cutoff. The table lists three verified upstream stable fixes and the older branches without a verified fixed release, not every distribution build. As checked November 20, Debian bookworm/trixie security kernels remain vulnerable while sid 7.3.5-1 is fixed. Ubuntu's generic 20.04 kernel is not affected but its HWE 5.15 package is vulnerable; do not infer safety from the release name. Check Red Hat’s current package status rather than assuming the operator advisory’s November 19 fix-deferred snapshot remains current. Ubuntu now rates priority High and Red Hat’s preliminary score is 7.8, superseding the Medium/5.6 snapshots in VirtFusion's November 19 page.

DigitalOcean says its fleet is addressed. Self-managed hosts still require the host fix or mitigation. There are no published detection indicators in these sources; a clean log search cannot establish that isolation held.
