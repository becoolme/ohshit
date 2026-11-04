---
title: Docker Desktop fixes TCP/WSL flaws; GKE publishes TCP escape remediation
summary: Desktop 4.98.0 fixes CVE-2026-98432 and the WSL 2 AF_VSOCK bypass CVE-2026-112917; WSL also needs 3.0.3+. Google now lists GKE TCP container-escape risk and five COS patch builds; GKE 1.37/Ubuntu fixes are pending. These GKE consequences do not establish a Desktop host escape or exploitation in the wild.
splash: Affected Docker Desktop/WSL 2 deployments and GKE Standard/Autopilot clusters with vulnerable COS or Ubuntu kernels
wipe: Update Desktop 4.98.0 and WSL 3.0.3+; GKE operators must patch control plane/nodes per GCP-2026-078 and restrict TCP access
inTheWildNote: The vendor release notes do not report exploitation in the wild.
cves:
- id: CVE-2026-98432
  name: Linux IPv4 TCP use-after-free
  description: Docker includes the Linux TCP kernel fix in 4.98.0. The underlying flaw was public October 15; this entry covers the Desktop remediation batch. Google’s November 4 GKE bulletin separately describes node-root/container-escape and kernel-panic consequences, local unprivileged triggering and reachable TCP listeners for network attacks.
- id: CVE-2026-112917
  name: WSL 2 AF_VSOCK restriction bypass
  description: A container on the WSL 2 backend can bypass communication restrictions; remediation requires Desktop 4.98.0 and WSL 3.0.3 or later. The notes do not supply a complete affected starting range.
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
timeline:
- date: Oct 15, 2026
  title: Linux publishes the underlying TCP vulnerability record
- date: Nov 3, 2026
  title: Docker Desktop 4.98.0 ships both fixes
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
level: 3
date: '2026-11-03'
tags:
- Docker
- WSL
- isolation
inTheWild: unknown
updated: '2026-11-04'
---

These flaws and this release are separate from the [October Desktop batch](/incidents/docker-desktop-october/); do not change that batch's first fixed version from 4.97.0 to 4.98.0. L3 reflects kernel and isolation-boundary issues in a mainstream developer tool, not confirmed attacks.

AF_VSOCK supports host/VM communication. Docker states that a container can bypass a restriction, but gives no complete consequence, affected starting range, alternative mitigation or demonstrated host escape. The public CNA API for this CVE returned 404 during this check; its identifier and remediation dependency come from Docker's original release notes, read directly. Do not import host-access consequences from the different CVE-2025-9074 incident. Updating only container images or distribution packages inside WSL does not establish Desktop/WSL remediation.

**November 4 GKE deployment update:** Google’s GCP-2026-078 covers the same Linux TCP CVE on GKE Standard and Autopilot. Google describes kernel panic or container escape with root execution on the node. A container process needs no special capabilities; the network path instead requires access to a TCP listener on nodes, Pods or the control plane’s IP-based endpoint and IPv4-option packets. Trusted-source access restrictions address the network path, not the local container path.

Google supplies five Container-Optimized OS thresholds above and requires upgrading both control plane and nodes. GKE 1.37 and Ubuntu node-image patches are still in progress. These deployment-specific consequences do not prove a host escape through Desktop, do not change the WSL bypass’s documented scope and do not establish the cause of the separate Northflank incident. No exploitation claim is added. The existing L3 rating is retained for mainstream kernel/isolation remediation without verified attacks.
