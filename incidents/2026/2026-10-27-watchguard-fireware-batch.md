---
title: WatchGuard fixes 17 Fireware flaws across cluster, management, AD and proxy boundaries
level: 3
date: 2026-10-27
tags:
- WatchGuard
- firewall
- RCE
ecosystems:
- watchguard
summary: WatchGuard’s October 27 Fireware batch includes cluster root-action injection, SIP proxy RCE, AD-response overflows and configuration leaks. Preconditions differ; the vendor reports no known exploitation. Update to the model-appropriate fixed release.
splash: Fireware deployments with affected management, FireCluster, SIP/Access Portal, AD or other configured features; prerequisites vary
wipe: Install Fireware 2026.4 or 12.12.4 as appropriate; T15/T35 use 12.5.22; isolate management and cluster networks
inTheWild: 'no'
inTheWildNote: WatchGuard reports no known in-the-wild exploitation for these 17 advisories.
cves:
- id: CVE-2026-90465
  name: FireCluster root action invocation
  description: A cluster-interconnect attacker, including a compromised peer or on-path attacker, can invoke privileged management actions on a FireCluster member.
- id: CVE-2026-93862
  name: FireCluster sync denial of service
  description: An attacker on the cluster interconnect can repeatedly crash synchronization on a FireCluster deployment.
- id: CVE-2026-90464
  name: Diagnostic command file overwrite
  description: An authenticated Device Monitor or higher role with CLI access can write numeric content to arbitrary paths or kernel parameters as root.
- id: CVE-2026-112710
  name: AD response heap overflow, second flaw
  description: Requires AD authentication configuration and control/interception of configured AD-server traffic; a crafted response can crash the service or execute code.
- id: CVE-2026-112709
  name: AD response heap overflow
  description: Requires AD authentication configuration and control/interception of configured AD-server traffic; a crafted response can crash the service or execute code.
- id: CVE-2026-93434
  name: SSH authentication XPath injection
  description: An unauthenticated caller reaching management SSH can extract configuration secrets.
- id: CVE-2026-113881
  name: Mobile VPN enforcement overflow
  description: An authenticated Mobile VPN user can crash or execute code as an unprivileged process when Network Access Control is enabled.
- id: CVE-2026-90442
  name: Certificate management overflow
  description: An authenticated attacker with management-interface access can crash certd and potentially execute code.
- id: CVE-2026-82332
  name: AuthPoint MFA session hijack
  description: Requires local appliance access, AuthPoint integration and persuading a victim to accept an MFA push; not an unauthenticated Internet MFA bypass.
- id: CVE-2026-103594
  name: FireCloud Gateway configuration overflow
  description: Requires a FireCloud Gateway and TLS-decrypted man-in-the-middle access between it and WatchGuard Cloud; altered WireGuard configuration may cause DoS or code execution.
- id: CVE-2026-104381
  name: FireCluster BOVPN tunnel termination
  description: An attacker on the cluster synchronization segment can prematurely terminate tunnels when FireCluster and at least one BOVPN tunnel are configured.
- id: CVE-2026-93865
  name: FireCluster management-IP root action injection
  description: An unauthenticated network caller reaching the FireCluster management IP can invoke privileged administrative actions when clustering is enabled.
- id: CVE-2026-103593
  name: Logging certificate stack overflow
  description: Requires FIPS mode, an external log server and an adjacent attacker able to impersonate/intercept that server; a crafted certificate can execute code as root.
- id: CVE-2026-93857
  name: SIP proxy pre-authentication overflow
  description: An unauthenticated request through a policy using the configured SIP proxy can execute code.
- id: CVE-2026-111107
  name: Management login denial of service
  description: An unauthenticated caller reaching management can repeatedly crash its service and interrupt administrator sessions; traffic processing is unaffected.
- id: CVE-2026-93866
  name: Access Portal integer overflow
  description: An unauthenticated caller can cause a heap out-of-bounds write through WebSocket handling when Access Portal is enabled.
- id: CVE-2026-93864
  name: Local firewall-daemon file overwrite
  description: A local low-privilege process can plant a filesystem object and trigger a list update to overwrite files as root; content is partly constrained.
fixed:
- product: Fireware newer release family
  version: '2026.4'
- product: Fireware 12.x standard platforms
  version: 12.12.4
- product: Fireware T15/T35
  version: 12.5.22
timeline:
- date: Oct 27, 2026
  title: WatchGuard publishes the 17 Fireware advisories
checklist:
- title: Update every applicable appliance and cluster peer
  hint: 'Check the model and running Fireware build, then install 2026.4, 12.12.4 or T15/T35 12.5.22 through official channels. Feature-specific affected ranges differ: WireGuard starts at 2026.2/12.12; VPN enforcement at 2025.1/12.9; AuthPoint at 2025.1/12.7. Follow each advisory rather than a single generic version check.'
- title: Restrict management and cluster access
  hint: 'General containment: allow only trusted administrators to reach HTTPS/SSH management; keep cluster synchronization isolated from untrusted peers and network paths. Cluster-IP root action injection and interconnect-only flaws have different reachability.'
- title: Review the configured attack paths
  hint: Inventory SIP proxy policies, Access Portal, AD authentication, FIPS external logging, FireCloud Gateway, VPN Network Access Control and AuthPoint. The AD flaws require control/interception of AD traffic; WireGuard requires TLS-decrypted interception of cloud configuration.
- title: Assess suspicious behavior with supporting evidence
  hint: 'General investigation: preserve configuration and available logs, inspect unexpected privileged actions, CLI changes, service crashes and exposed secrets. No attacker IoCs are published; these behavioral leads or a crash alone do not prove compromise.'
sources:
- name: WatchGuard CVE-2026-90465
  url: https://psirt.watchguard.com/CVE-2026-90465
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-93862
  url: https://psirt.watchguard.com/CVE-2026-93862
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-90464
  url: https://psirt.watchguard.com/CVE-2026-90464
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-112710
  url: https://psirt.watchguard.com/CVE-2026-112710
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-112709
  url: https://psirt.watchguard.com/CVE-2026-112709
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-93434
  url: https://psirt.watchguard.com/CVE-2026-93434
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-113881
  url: https://psirt.watchguard.com/CVE-2026-113881
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-90442
  url: https://psirt.watchguard.com/CVE-2026-90442
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-82332
  url: https://psirt.watchguard.com/CVE-2026-82332
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-103594
  url: https://psirt.watchguard.com/CVE-2026-103594
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-104381
  url: https://psirt.watchguard.com/CVE-2026-104381
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-93865
  url: https://psirt.watchguard.com/CVE-2026-93865
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-103593
  url: https://psirt.watchguard.com/CVE-2026-103593
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-93857
  url: https://psirt.watchguard.com/CVE-2026-93857
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-111107
  url: https://psirt.watchguard.com/CVE-2026-111107
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-93866
  url: https://psirt.watchguard.com/CVE-2026-93866
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
- name: WatchGuard CVE-2026-93864
  url: https://psirt.watchguard.com/CVE-2026-93864
  primary: true
  says: Feature prerequisites, affected platforms, solution and no-known-exploitation statement.
---

L3 reflects multiple security-boundary failures in mainstream edge appliances. This is not a universal unauthenticated Internet-to-root chain: AD, cluster interconnect, FIPS logging, local access and cloud interception are distinct prerequisites. The SSH configuration-read, SIP proxy and enabled FireCluster management-IP issues deserve their own exposure checks. No victim count is established. The same date’s Mobile VPN Windows-client issue is a different product and is not included in this 17-flaw count.
