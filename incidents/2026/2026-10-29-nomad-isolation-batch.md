---
title: Nomad patches three isolation flaws, including workload-to-host symlink attacks
level: 3
tags:
- Nomad
- isolation
- privilege-escalation
ecosystems:
- nomad
summary: HashiCorp fixes namespace disclosure and two workload-to-host symlink paths. Host impact depends on job permissions, driver or migration configuration and client-agent privileges. Upgrade Community to 2.1.0 or Enterprise to 2.1.0, 1.11.12 or 1.10.18.
splash: Nomad through 2.0.7; attacks need relevant ACL read or job permissions and path-specific configuration
wipe: Upgrade Community to 2.1.0; Enterprise to 2.1.0, 1.11.12 or 1.10.18; verify client agents too
inTheWild: unknown
inTheWildNote: The vendor bulletins do not report real-world exploitation.
cves:
- id: CVE-2026-102260
  score: 4.3
  name: Cross-namespace read authorization bypass
  description: A token with a relevant read capability in one namespace can disclose objects in other namespaces; single-namespace clusters are unaffected. This does not grant cross-namespace writes.
- id: CVE-2026-107347
  score: 8.4
  name: Symlink following during payload and executor-log writes
  description: A workload that plants allocation symlinks can redirect writes with client-agent privileges. Dispatch payloads require job submission and dispatch permissions; Linux exec/java executor logs require job submission. A root agent can expose the host to root code execution.
- id: CVE-2026-119168
  score: 8.8
  name: Symlink following during allocation data migration
  description: Submitting and updating a job with sticky ephemeral disk reuse on the same client can redirect permission and ownership changes to host directories through a planted symlink. No previous-allocation data reuse means this migration path is not exposed.
fixed:
- product: Nomad Community
  version: 2.1.0
- product: Nomad Enterprise 2.1
  version: 2.1.0
- product: Nomad Enterprise 1.11
  version: 1.11.12
- product: Nomad Enterprise 1.10
  version: 1.10.18
timeline:
- date: Oct 29, 2026
  title: HashiCorp publishes HCSEC-2026-51, -52 and -53
checklist:
- title: Upgrade the correct edition, including clients
  hint: Check nomad version on servers and client nodes; use Community 2.1.0 or the listed Enterprise fixes. The 1.11.12 and 1.10.18 backports are Enterprise targets, not Community patches.
- title: Identify which isolation boundaries are exposed
  hint: Review ACL tokens and namespace read capabilities; job submit/dispatch/update permissions; Linux exec/java drivers; sticky ephemeral_disk reuse and client-agent privileges. Single-namespace operation avoids only the disclosure issue, not the host symlink paths.
sources:
- name: HashiCorp HCSEC-2026-51
  url: https://discuss.hashicorp.com/t/hcsec-2026-51-nomad-vulnerable-to-cross-namespace-information-disclosure-in-multiple-endpoints/77929
  says: Vendor prerequisites and fixed versions for CVE-2026-102260.
  primary: true
- name: HashiCorp HCSEC-2026-52
  url: https://discuss.hashicorp.com/t/hcsec-2026-52-nomad-dispatch-payload-writes-can-escape-the-allocation-directory-through-symlinks/77930
  says: Vendor prerequisites and fixed versions for CVE-2026-107347.
  primary: true
- name: HashiCorp HCSEC-2026-53
  url: https://discuss.hashicorp.com/t/hcsec-2026-53-nomad-allocation-data-migration-may-allow-host-directory-permission-modification-via-symlink-following/77931
  says: Vendor prerequisites and fixed versions for CVE-2026-119168.
  primary: true
date: '2026-10-29'
---

These are three separate bugs in one Nomad release batch, not unauthenticated takeover of every cluster. Namespace reads are an ACL issue; host impact requires a malicious workload and the specific write or data-reuse path. Root-level impact requires suitable client-agent privileges and writable host targets. L3 reflects a mainstream scheduler with documented isolation failures; no victim count or active-exploitation claim is supplied.
