---
title: VMware patches 23 platform flaws, including ESX network RCE and a distinct vCenter bypass
level: 3
date: '2026-11-24'
tags:
- VMware
- ESX
- vCenter
- RCE
summary: VMSA-2026-0011 fixes 23 flaws across VMware products, including network-access ESX code execution and a new vCenter authentication bypass. Guest, backup-repository and administrator prerequisites differ. ESX 9.0 still awaits fixes for two privileged flaws; no exploitation is established by these sources.
splash: Unpatched VMware management services, hosts and guests; Avi issues require authenticated or administrative access.
wipe: Apply the product-specific matrix; update guest Tools separately and track the two ESX 9.0 pending fixes.
inTheWild: unknown
inTheWildNote: No exploitation established for this batch; the earlier vCenter CVE is distinct.
cves:
- id: CVE-2026-123903
  score: 9.8
  name: vCenter authentication bypass
  description: Network reachability to vCenter permits unauthorized access through Directory Service; Enhanced Linked Mode is not required.
- id: CVE-2026-123904
  score: 7.5
  name: vCenter archive file write
  description: Access to the backup repository enables root file writes during archive processing and potentially code execution.
- id: CVE-2026-123905
  score: 7.5
  name: vmdir denial of service
  description: Network access permits disruption of Directory Service.
- id: CVE-2026-123906
  score: 7.5
  name: vmdir denial of service
  description: Network access permits disruption of Directory Service.
- id: CVE-2026-123907
  score: 7.5
  name: vmdir denial of service
  description: Network access permits disruption of Directory Service.
- id: CVE-2026-123908
  score: 6.7
  name: vpxd privilege escalation
  description: A compromised vpxd service account can gain root through a service script.
- id: CVE-2026-123909
  score: 5.2
  name: Distributed Switch policy failure
  description: A local VM actor can evade intended vDS security policy enforcement.
- id: CVE-2026-123910
  score: 9.8
  name: ESX I/O filter heap overwrite
  description: Network access to ESX permits host code execution; guest access is not required.
- id: CVE-2026-123911
  score: 9.8
  name: ESX I/O filter use-after-free
  description: Network access to ESX permits host code execution; guest access is not required.
- id: CVE-2026-123912
  score: 9.3
  name: XHCI USB controller overwrite
  description: Guest administrator access can reach VMX code execution; ESX confines this to its VMX sandbox, while Workstation/Fusion may permit host execution.
- id: CVE-2026-123913
  score: 8.2
  name: VMkernel stack overflow
  description: Existing privileges inside VMX are required for privilege escalation.
- id: CVE-2026-123914
  score: 6.7
  name: ESX configuration-store bypass
  description: Requires root on an ESX host with Secure Boot enabled to tamper with the configuration store.
- id: CVE-2026-123915
  score: 6.3
  name: ESX signature-verification bypass
  description: A privileged attacker can retain malicious files across host reboots; ESX 9.0 patch remains pending.
- id: CVE-2026-123916
  score: 5.5
  name: Guest RPC denial of service
  description: A non-administrator inside a VM can crash that VM’s VMX process using crafted RPC.
- id: CVE-2026-123918
  score: 5.5
  name: Tools VGAuth denial of service
  description: A non-administrator inside a VM can trigger a VMX crash; Windows and Linux Tools require separate updates.
- id: CVE-2026-123919
  score: 6.7
  name: Avi insecure deserialization
  description: Local Controller administrator access can lead to root code execution.
- id: CVE-2026-123920
  score: 6.7
  name: Avi local privilege escalation
  description: Local Controller administrator access can escalate to root.
- id: CVE-2026-123921
  score: 6.6
  name: Avi command injection
  description: Network reachability and Avi administrator privileges enable Controller command execution.
- id: CVE-2026-123922
  score: 4.9
  name: Avi password-hash disclosure
  description: Network reachability and administrator privileges permit reading password hashes.
- id: CVE-2026-123923
  score: 3.4
  name: Avi routing-interface credential reuse
  description: A Service Engine administrator can access its routing management interface with an installation-shared credential.
- id: CVE-2026-123924
  score: 3.6
  name: Avi sensitive-information disclosure
  description: Controller administrator privileges permit access beyond intended resources; the FAQ identifies SSH credentials.
- id: CVE-2026-123925
  score: 3.8
  name: Avi directory traversal
  description: Network reachability and administrator privileges permit accessing and deleting files outside the intended directory.
- id: CVE-2026-123926
  score: 6.5
  name: Avi authenticated information disclosure
  description: A network-reachable authenticated account can access resources beyond its intended privileges.
fixed:
- product: vCenter 9.1
  version: 9.1.2
  status: Cumulative fixed release
- product: vCenter 9.0
  version: 9.0.2.0300
  status: Express patch
- product: vCenter 8.0
  version: 8.0 U3m
  status: Also fixes the previous vCenter batch
- product: ESX 9.1
  version: ESXi-9.1.2.0-25946735
  status: All seven ESX issues
- product: ESX 9.0
  version: ESXi-9.0.2.0200-25953133
  status: Five issues fixed; CVE-2026-123914 and CVE-2026-123915 remain Patch Pending
- product: ESX 8.0
  version: ESXi80U3m-25926933
  status: All seven ESX issues
- product: vCenter / ESX 7.0
  version: none
  status: Public matrix directs extended-support customers to Broadcom Support
- product: VCF 5.x components
  version: 5.2.5
  status: Apply vCenter and ESX 8.0 U3m with KB 88287 asynchronous patching; SDDC Manager alone is insufficient
- product: Workstation / Fusion
  version: 26H1u1
  status: Both guest-device/RPC issues
- product: VMware Tools 13.x
  version: 13.1.10.0
  status: Windows/Linux vendor package
- product: VMware Tools 11.x / 12.x
  version: 12.5.6.0
  status: Includes 12.4.11 for 32-bit Windows; Linux distributions deliver their own open-vm-tools fixes
- product: Avi Load Balancer
  version: 32.1.4
  status: Recommended; resolves all eight Avi issues
- product: Avi earlier-branch partial fixes
  version: 31.2.3 / 30.2.7
  status: 31.2.3 fixes 123919/123921; 30.2.7 fixes 123920 on 30.x; remaining issues require the matrix
- product: Avi 123926-only hotfixes
  version: 32.1.3-2p1 / 32.1.2-2p3
  status: First for 32.1.3, second for 32.1.1–32.1.2 and 31.x per FAQ; 30.x/22.x not impacted by this CVE
timeline:
- date: Nov 24, 2026
  title: Broadcom publishes VMSA-2026-0011
  body: New 23-CVE advisory and supplemental FAQ describe separate component fixes and deployment prerequisites.
checklist:
- title: Inventory components and patch through their supported paths
  hint: Check vCenter and each host’s Summary tab; PowerCLI exposes DefaultVIServer.Version/Build and Get-VMHost | Select-Object Name,Version,Build. Apply the table above, include vSAN Witness appliances and their hosting ESX, and use KB 463501 for listed Telco releases (vCenter 8.0 U3m; ESX 80U3m on TCP 5.0.x/5.1.x). Contact Support for unlisted or extended-support versions and integrated-system vendors for qualified updates. ESX 9.0 CVE-2026-123914/123915 remain pending, despite the FAQ’s broad cumulative-fix wording.
- title: Plan host restarts and refresh each VMX process
  hint: Check the interoperability matrix, including vSAN. These updates cannot use vCenter Quick Patch or ESX Live Patch. Evacuate hosts into maintenance mode before patching and restarting; shut down guests that cannot migrate. VMX fixes take effect after VM power-on or vMotion to an updated host, not merely a guest OS reboot. Update Workstation/Fusion to 26H1u1 and Tools inside each Windows/Linux guest separately; virtual hardware upgrades are not required.
- title: Use the ESXi 8.x interim firewall procedure only for its two I/O filter flaws
  hint: KB 463535 limits IOFilterVP TCP 9080 to vCenter. As root on an ESXi 8.x host, run esxcli network firewall ruleset set -r iofiltervp --allowed-all false; add the real vCenter IP with esxcli network firewall ruleset allowedip add -r iofiltervp -i <vCenter-IP>; verify with esxcli network firewall ruleset allowedip list -r iofiltervp. Validate cluster/storage connectivity under change control. This is only for CVE-2026-123910/123911 on 8.x, not a workaround for the whole batch or the pending 9.0 flaws; patch promptly.
- title: Restrict exposure without treating partial mitigations as complete fixes
  hint: Limit management-network access and backup-repository write access to required systems/accounts. Removing an unused XHCI controller only mitigates CVE-2026-123912; test first because guest USB and console input can break. Review vDS policies with Get-VDPortgroup | Get-VDSecurityPolicy, retaining Reject defaults unless workloads require dedicated exceptions. Avi 32.1.4 is the complete eight-issue target; partial branch patches are not interchangeable. Check the older vCenter incident for VMSA-2026-0009 SDDC Manager fixes and handle VMSA-2026-0010 separately.
sources:
- name: Broadcom VMSA-2026-0011
  url: https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/39626
  primary: true
  says: 'November 24 initial advisory: 23 CVEs, product-specific matrices, two ESX 9.0 fixes pending, ESXi 8.x workaround reference.'
- name: Broadcom supplemental FAQ
  url: https://github.com/vmware/vcf-security-and-compliance-guidelines/blob/main/security-advisories/vmsa-2026-0011/README.md
  primary: true
  says: Distinguishes the earlier bypass, guest/VMX prerequisites, partial Avi fixes, independent Tools updates and operational patch requirements; the advisory remains authoritative.
- name: Broadcom KB 463535
  url: https://knowledge.broadcom.com/external/article/463535
  primary: true
  says: Full interim ESXi 8.x IOFilterVP firewall procedure for TCP 9080 and the two network RCE flaws.
- name: Broadcom KB 463501
  url: https://knowledge.broadcom.com/external/article/463501
  primary: true
  says: Telco vCenter 8.0 U3m coverage, ESX 80U3m for TCP 5.0.x/5.1.x, Support guidance for unlisted versions.
---

Broadcom’s November 24 VMSA-2026-0011 is a new 23-vulnerability batch. The vCenter bypass CVE-2026-123903 is distinct from the exploited [CVE-2026-123890 incident](/incidents/vcenter-directory-session-bypass/). L3 reflects critical flaws in widely deployed platforms; the reviewed sources do not establish active exploitation, victim counts or a public exploit for this batch. Do not transfer the earlier incident’s exploitation status to these CVEs.

The most urgent paths need network access to ESX’s I/O filter service or vCenter’s Directory Service. They do not require a guest foothold or Enhanced Linked Mode. Other paths have different prerequisites: backup-repository access, a compromised vpxd account, guest administrator or VMX privileges, ESX root access, or authenticated/administrative Avi access. XHCI code execution stays inside ESX’s VMX sandbox; Workstation/Fusion may expose the host. This is not evidence of a demonstrated exploit chain combining the flaws.

Use the advisory’s response matrices over simplified FAQ summaries. ESX 9.0 still has no published fix for CVE-2026-123914 and CVE-2026-123915. CVE-2026-123912 is 9.3 on Workstation/Fusion; the ESX matrix prints 8.4 while the FAQ says 8.5. That source discrepancy does not change the required patch. The matrix recommends cumulative releases; older versions that fixed CVE-2026-123916 alone—VCF 9.1.1/5.2.4, ESX 8.0 U3j and Workstation/Fusion 26H1—do not cover the other issues.

Avi 32.1.4 fixes all eight Avi CVEs. Its 31.2.3, 30.2.7 and 123926-specific hotfixes cover only the listed subsets. The FAQ extends 32.1.2-2p3 to 31.x for CVE-2026-123926, while the matrix explicitly lists 32.1.1–32.1.2; 31.x operators should confirm their upgrade path with Support instead of treating the hotfix as universal. Earlier 30.x and 22.x are unaffected by that one CVE, not by the entire batch.

There is no batch-wide workaround. Despite the FAQ’s general wording, the advisory links KB 463535 for the two ESXi 8.x I/O filter RCEs; its full firewall procedure is reproduced in the checklist. Patching vCenter alone leaves ESX, desktop hypervisors and in-guest Tools outstanding. Already-patched vCenter 8.0 U3m need not be reinstalled, but vCenter 9.1 requires 9.1.2. VCF 5.x requires asynchronous component patching even if SDDC Manager is already 5.2.5.
