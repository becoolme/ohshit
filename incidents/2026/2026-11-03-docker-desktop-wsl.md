---
title: TCP fixes extend from Docker Desktop and GKE to XenServer hosts and appliances
summary: Desktop 4.98.0 and WSL 3.0.3+ fixes remain; GKE has five COS thresholds with 1.37/Ubuntu patches pending. Citrix now lists XenServer 8.4/9 management-network host compromise via the same TCP CVE, plus guest and PXE issues. Apply host channel updates, WLB 2026.1.1+ and Conversion Manager 2026.2.0. No verified attacks are claimed.
splash: Vulnerable Desktop/WSL and GKE; XenServer 8.4/9 hosts, WLB and Conversion Manager with management, guest or PXE exposure.
wipe: Desktop 4.98.0 + WSL 3.0.3+; GKE per GCP-2026-078; XenServer channel updates, WLB 2026.1.1+, Conversion Manager 2026.2.0.
inTheWildNote: The vendor release notes do not report exploitation in the wild.
cves:
- id: CVE-2026-98432
  name: Linux IPv4 TCP use-after-free
  description: Docker includes the Linux TCP kernel fix in 4.98.0. The underlying flaw was public October 15; this entry covers Desktop remediation and related GKE guidance. Google’s November 4 GKE bulletin separately describes node-root/container-escape and kernel-panic consequences, local unprivileged triggering and reachable TCP listeners for network attacks.
- id: CVE-2026-112917
  name: WSL 2 AF_VSOCK restriction bypass
  description: A container on the WSL 2 backend can bypass communication restrictions; remediation requires Desktop 4.98.0 and WSL 3.0.3 or later. The notes do not supply a complete affected starting range.
- id: CVE-2026-102703
  name: Xen guest grant-copy memory access
  description: Citrix lists privileged guest-to-host compromise. Xen XSA-523 explains that confused frame numbers and grant references allow a malicious guest to read or write other domains' memory, including Dom0.
- id: CVE-2026-97631
  name: XenServer PXE or guest Secure Boot issue
  description: Citrix groups this identifier with flaws allowing an unauthenticated same-network attacker to compromise a VM during initial PXE boot, or a guest administrator to bypass that guest's Secure Boot policy. The bulletin does not map each individual consequence to each identifier.
- id: CVE-2026-45447
  name: XenServer PXE or guest Secure Boot issue
  description: Citrix groups this identifier with flaws allowing an unauthenticated same-network attacker to compromise a VM during initial PXE boot, or a guest administrator to bypass that guest's Secure Boot policy. The bulletin does not map each individual consequence to each identifier.
- id: CVE-2024-38797
  name: XenServer PXE or guest Secure Boot issue
  description: Citrix groups this identifier with flaws allowing an unauthenticated same-network attacker to compromise a VM during initial PXE boot, or a guest administrator to bypass that guest's Secure Boot policy. The bulletin does not map each individual consequence to each identifier.
- id: CVE-2024-38796
  name: XenServer PXE or guest Secure Boot issue
  description: Citrix groups this identifier with flaws allowing an unauthenticated same-network attacker to compromise a VM during initial PXE boot, or a guest administrator to bypass that guest's Secure Boot policy. The bulletin does not map each individual consequence to each identifier.
- id: CVE-2022-36764
  name: XenServer PXE or guest Secure Boot issue
  description: Citrix groups this identifier with flaws allowing an unauthenticated same-network attacker to compromise a VM during initial PXE boot, or a guest administrator to bypass that guest's Secure Boot policy. The bulletin does not map each individual consequence to each identifier.
- id: CVE-2022-36763
  name: XenServer PXE or guest Secure Boot issue
  description: Citrix groups this identifier with flaws allowing an unauthenticated same-network attacker to compromise a VM during initial PXE boot, or a guest administrator to bypass that guest's Secure Boot policy. The bulletin does not map each individual consequence to each identifier.
fixed:
- product: Docker Desktop
  version: 4.98.0
- product: Windows Subsystem for Linux
  version: 3.0.3
  status: Additional requirement for the WSL 2 backend fix
- product: GKE 1.36 Container-Optimized OS
  version: 1.36.5-gke.1982000
  status: Upgrade control plane and nodes; does not cover Ubuntu images
- product: GKE 1.35 Container-Optimized OS
  version: 1.35.9-gke.1505000
  status: Upgrade control plane and nodes; does not cover Ubuntu images
- product: GKE 1.34 Container-Optimized OS
  version: 1.34.12-gke.1539000
  status: Upgrade control plane and nodes; does not cover Ubuntu images
- product: GKE 1.33 Container-Optimized OS
  version: 1.33.13-gke.2207000
  status: Upgrade control plane and nodes; does not cover Ubuntu images
- product: GKE 1.32 Container-Optimized OS
  version: 1.32.13-gke.2906000
  status: Upgrade control plane and nodes; does not cover Ubuntu images
- product: GKE 1.37 / Ubuntu node images
  version: none
  status: Patches in progress; no fixed build supplied in this bulletin
- product: XenServer Workload Balancing
  version: 2026.1.1
  status: Appliance fix for the TCP CVE; also apply host updates
- product: XenServer Conversion Manager
  version: 2026.2.0
  status: Appliance fix for the TCP CVE; also apply host updates
timeline:
- date: Oct 15, 2026
  title: Linux publishes the underlying TCP vulnerability record
- date: Nov 3, 2026
  title: Docker Desktop 4.98.0 ships both fixes
- date: Nov 3, 2026
  title: Citrix publishes XenServer host and appliance remediation
  body: CTX697256 covers the same TCP CVE plus guest grant-copy and PXE/Secure Boot issues. Host fixes reach both update channels for 8.4/9; WLB 2026.1.1 and Conversion Manager 2026.2.0 fix their TCP exposure.
- date: Nov 4, 2026
  title: Google publishes GCP-2026-078 for the same TCP CVE
  body: Standard and Autopilot are impacted. Five COS thresholds are listed; patches for GKE 1.37 and Ubuntu images remain in progress. This is a platform remediation update, not a new underlying CVE disclosure.
checklist:
- title: Verify the Desktop application version
  hint: Install 4.98.0 or later through official channels and check the application version. Docker CLI/Engine versions do not identify the Desktop build; staged rollout can delay update availability.
- title: Update WSL too and check the backend
  hint: On the Windows WSL 2 backend, run wsl --update in PowerShell or Command Prompt and confirm at least 3.0.3 with wsl --version; restart Desktop or the host if prompted. A Linux distribution package version is not the WSL version.
- title: Patch GKE control plane and every affected node pool
  hint: In the GKE console, inventory control-plane/node versions and the node image type. Upgrade control plane and nodes to the matching GCP-2026-078 COS build above or later. Check installed versions after rollout. The bulletin permits a newer release-channel patch in the same minor version. Do not apply COS thresholds to Ubuntu nodes; GKE 1.37 and Ubuntu image fixes are still in progress, so track the bulletin/support for a released build.
- title: Restrict GKE TCP reachability while awaiting rollout
  hint: Limit TCP listeners on nodes, Pods and the control plane’s IP-based endpoint to trusted sources using firewall rules and control-plane authorized networks. Google says this removes network exposure, but an unprivileged container process can still trigger the flaw locally without CAP_NET_RAW; firewalling alone does not remove that path. Review untrusted workload access and upgrade the kernel-bearing nodes, not only application images.
- title: Apply XenServer host updates through the supported update tools
  hint: Inventory XenServer 8.4/9 pools and the management network. Citrix has pushed fixes to both Early Access and Normal channels; use XenCenter or the xe CLI to synchronize and apply the latest cumulative updates from your chosen channel to every host, then complete the tool's post-update actions and verify installed updates. For isolated pools, download the official offline bundle on an internet-connected system and transfer/upload it through the documented workflow. Do not directly modify dom0 update components. Restrict management access while arranging updates; this does not address the separate malicious-guest path.
- title: Update XenServer management appliances and review guest exposure
  hint: Obtain Workload Balancing 2026.1.1 or later and Conversion Manager 2026.2.0 from XenServer Downloads and verify their versions separately from host updates. CTX697256 places the TCP path on the management network; privileged guest access is needed for its guest-to-host issue, while the PXE/Secure Boot group has same-network boot-stage or guest-administrator prerequisites. Review who can administer guests and reach PXE networks. XSA-523 has no known mitigation for the grant-copy flaws; network isolation alone is not a replacement for host patches. The cited bulletins publish no dedicated attack indicators or confirmed victim count.
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
- name: Google GKE GCP-2026-078 original bulletin
  url: https://docs.cloud.google.com/kubernetes-engine/docs/security-bulletins#gcp-2026-078
  primary: true
  says: November 4 TCP exploit prerequisites, Standard/Autopilot scope, five COS thresholds, GKE 1.37/Ubuntu pending and control-plane/node upgrade guidance.
- name: Citrix XenServer CTX697256 security bulletin
  url: https://support.citrix.com/external/article/CTX697256/xenserver-security-update-for-multiple-i.html
  primary: true
  says: November 3 vendor batch lists eight CVEs, distinct management-network/guest/PXE prerequisites, both affected host release lines and appliance thresholds. Fixes are in both host update channels; no verified attacks or host build threshold stated.
- name: XenServer 8.4 host update guide
  url: https://docs.xenserver.com/us/en/xenserver/8/update.html
  primary: true
  says: Cumulative channel and offline update workflows using XenCenter or xe; direct modification of dom0 update components is unsupported.
- name: XenServer 9 host update guide
  url: https://docs.xenserver.com/us/en/xenserver/9/update.html
  primary: true
  says: Host/pool channel and offline update workflows for the other affected release line.
- name: Xen XSA-523 grant-copy advisory
  url: https://xenbits.xenproject.org/xsa/advisory-523.html
  primary: true
  says: November 3 public advisory explains CVE-2026-102703 and separate CVE-2026-102704, arbitrary cross-domain memory access including Dom0, affected Xen versions and no known mitigation. Citrix's cited batch names only CVE-2026-102703 of these two.
level: 3
date: '2026-11-03'
tags:
- Docker
- WSL
- isolation
inTheWild: unknown
updated: '2026-11-05'
---

These flaws and this release are separate from the [October Desktop batch](/incidents/docker-desktop-october/); do not change that batch's first fixed version from 4.97.0 to 4.98.0. L3 reflects kernel and isolation-boundary issues in a mainstream developer tool, not confirmed attacks.

AF_VSOCK supports host/VM communication. Docker states that a container can bypass a restriction, but gives no complete consequence, affected starting range, alternative mitigation or demonstrated host escape. The public CNA API for this CVE returned 404 during this check; its identifier and remediation dependency come from Docker's original release notes, read directly. Do not import host-access consequences from the different CVE-2025-9074 incident. Updating only container images or distribution packages inside WSL does not establish Desktop/WSL remediation.

**November 4 GKE deployment update:** Google’s GCP-2026-078 covers the same Linux TCP CVE on GKE Standard and Autopilot. Google describes kernel panic or container escape with root execution on the node. A container process needs no special capabilities; the network path instead requires access to a TCP listener on nodes, Pods or the control plane’s IP-based endpoint and IPv4-option packets. Trusted-source access restrictions address the network path, not the local container path.

Google supplies five Container-Optimized OS thresholds above and requires upgrading both control plane and nodes. GKE 1.37 and Ubuntu node-image patches are still in progress. These deployment-specific consequences do not prove a host escape through Desktop, do not change the WSL bypass’s documented scope and do not establish the cause of the separate Northflank incident. No exploitation claim is added. The existing L3 rating is retained for mainstream kernel/isolation remediation without verified attacks.

**November 5 XenServer follow-up:** Citrix's November 3 CTX697256 covers the already-listed TCP CVE on **XenServer 8.4 and XenServer 9**, plus Workload Balancing before **2026.1.1** and Conversion Manager before **2026.2.0**. An unauthenticated attacker needs access to the **management network** for the described host/appliance compromise; the vendor does not describe this as arbitrary internet access. Install the latest cumulative updates in the selected host channel as well as the appliance releases. The appliance thresholds alone do not patch the hypervisor, and the bulletin supplies no single fixed host build.

The same vendor batch also lists **CVE-2026-102703**, for which a privileged guest user may compromise the host. Upstream XSA-523 describes grant-copy validation errors that let a malicious guest read/write other domains' memory, including Dom0, and gives no known mitigation. XSA-523 also discusses CVE-2026-102704; Citrix's cited bulletin does not list that second identifier, so its XenServer applicability is not inferred here.

Six further identifiers—**CVE-2026-97631, CVE-2026-45447, CVE-2024-38797, CVE-2024-38796, CVE-2022-36764 and CVE-2022-36763**—are grouped as compromise of a VM during initial PXE network boot by an unauthenticated same-network attacker, or bypass of that guest's Secure Boot policy by its administrator. Those are separate prerequisites and effects, not eight unauthenticated host-compromise flaws. No confirmed XenServer exploitation or victim count is established by these sources. The existing L3 rating, Desktop/WSL requirements, five GKE COS thresholds and pending GKE 1.37/Ubuntu fixes remain applicable; XenServer remediation is not evidence of a Docker escape or the cause of Northflank's breach.
