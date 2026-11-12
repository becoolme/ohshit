---
title: N-able ships N-central hotfix after Able2Shell public exploit disclosures
summary: N-able released N-central 2026.4 HF2 after public proof-of-concept disclosures. It reports scanning and says HF2 addresses the identified unauthenticated paths. Further fixes are pending for authenticated or conditional flaws.
splash: N-central servers, especially internet-facing on-premises installs. Hosted and on-premises customers need Agent and Probe updates.
wipe: Keep on-premises servers off the internet until HF2 build 2026.4.1.26 is installed. Upgrade Agents before Probes.
inTheWildNote: N-able reports scanning linked to the PoC and no indications of hosted-server compromise.
level: 3
date: '2026-11-09'
tags:
- N-able
- N-central
- RMM
inTheWild: disputed
timeline:
- date: Nov 9, 2026
  title: Researcher publishes vulnerabilities
  body: N-able dates the public disclosure to November 9.
- date: Nov 10, 2026
  title: N-able publishes HF2 release notes
  body: Build 2026.4.1.26 supersedes 2026.4 and HF1.
- date: Nov 11, 2026
  title: N-able reports hosted servers back online
  body: N-able says it patched hosted servers and is preparing another hotfix.
checklist:
- title: Isolate and update the management server
  hint: Follow the vendor upgrade path for your deployed build. Keep on-premises N-central inaccessible from the internet until HF2 is installed and the build is verified. Hosted server upgrades are handled by N-able.
- title: Upgrade Agents before Probes
  hint: Install the Agent packages first, verify the Patch Management Engine update pushed automatically, and then update Probes. Confirm Agent-to-Probe communication and functions such as offline patch caching.
- title: Investigate possible exposure and track further fixes
  hint: Preserve server access, authentication and endpoint activity logs. Review unexpected requests and changes with N-able support where exposure is suspected. Monitor the official status and hotfix notes for follow-up patches.
sources:
- name: N-able HF2 release notes
  says: Gives the server build, supported upgrade path and Agent/Probe compatibility requirements.
  url: https://status.n-able.com/2026/11/10/n-central-2026-4-hf2-release-notes/
  primary: true
- name: N-able November 11 response
  says: Describes public PoCs, scanning, hosted recovery and remaining work.
  url: https://www.n-able.com/it/blog/update-on-n-central-2026-4-hf2-and-ongoing-security-response
  primary: true
cves:
- name: Multiple XXE issues
  description: Multiple XML external entity issues.
  id: CVE-2026-125883
- name: Multiple OGNL injections
  description: Several paths allow injection of OGNL expressions.
  id: CVE-2026-125878
- name: Local root escalation
  description: A writable syslog-ng configuration enables local escalation to root.
  id: CVE-2026-125879
- name: Stored cross-site scripting
  description: Stored script injection via MMS3 patch metadata in an admin context.
  id: CVE-2026-125880
- name: Server-side request forgery
  description: A schema hint can influence requests during service-import schema validation.
  id: CVE-2026-125881
- name: File repository upload traversal
  description: A repository upload traversal can lead to remote code execution.
  id: CVE-2026-125882
- name: Local privilege escalation via IPC
  description: Insecure interprocess communication channels can elevate local privileges.
  id: CVE-2026-91000
fixed:
- product: N-central 2026.4 HF2
  version: 2026.4.1.26
---

N-able says HF2 addresses all unauthenticated paths it had identified. The remaining disclosed paths require an account, often with elevated access, or other conditions. The company lists CVE-2026-125883, CVE-2026-125878 through CVE-2026-125882, and CVE-2026-91000 in its November 11 response. Consult the vendor for per-flaw status as follow-up patches are published. Scanning of public PoCs supports L3. The vendor has not established exploitation in an individual customer environment in this update.
