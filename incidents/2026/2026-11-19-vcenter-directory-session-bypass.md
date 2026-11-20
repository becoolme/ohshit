---
title: VMware vCenter authentication bypass exploited before November patches
level: 4
date: 2026-11-19
tags: [VMware, vCenter, zero-day, identity]
summary: Mandiant found CVE-2026-123890 exploited in September to obtain vCenter administrator sessions and steal signing keys. Broadcom's November advisory fixes this and four separate SDDC Manager/Windows Tools flaws. Patching does not remove stolen credentials or persistence.
splash: Unpatched vCenter reachable over its management network; separate SDDC Manager and Windows Tools prerequisites apply
wipe: Patch vCenter to 9.1.1.0200, 9.0.2.0200 or 8.0 U3m; investigate prior access and follow the full product matrix.
inTheWild: yes
inTheWildNote: Mandiant reports forensic evidence of BONESAW exploitation in early September.
cves:
  - id: CVE-2026-123890
    score: 9.8
    name: vCenter Directory Service authentication bypass
    description: Network access to the vulnerable vCenter service permits unauthenticated session-key disclosure and an administrator session. GTIG observed exploitation over DCE/RPC TCP 2012.
  - id: CVE-2026-123891
    score: 8.1
    name: SDDC Manager SQL injection
    description: An authenticated attacker can use crafted SQL to read or write the database without authorization.
  - id: CVE-2026-123892
    score: 7.2
    name: SDDC Manager authenticated command injection
    description: An authenticated attacker with high privileges can execute arbitrary commands on the appliance.
  - id: CVE-2026-123893
    score: 6.7
    name: SDDC Manager local privilege escalation
    description: An attacker with administrative privileges on SDDC Manager can elevate to root.
  - id: CVE-2026-123894
    score: 6.7
    name: Windows VMware Tools SAML signature bypass
    description: Access to a local privileged process in a Windows guest configured with Guest Alias mapping enables privilege escalation inside that guest, not a VM escape.
fixed:
  - {product: vCenter 9.1, version: 9.1.1.0200, status: Vendor-listed fixed build}
  - {product: vCenter 9.0, version: 9.0.2.0200, status: Vendor-listed fixed build}
  - {product: vCenter 8.0 / VCF 5.x vCenter component, version: 8.0 U3m, status: VCF 5.x requires the asynchronous patching process}
  - {product: vCenter 7.0, version: none, status: Extended-support customers must contact Broadcom; no public fixed build listed}
  - {product: SDDC Manager / VCF Installer 9.1, version: 9.1.1.0200, status: Recommended cumulative build; the three SDDC fixes were already present in 9.1.1.0}
  - {product: SDDC Manager / VCF Installer 9.0, version: 9.0.2.0100, status: Vendor-listed fixed build}
  - {product: SDDC Manager 5.x, version: 5.2.5, status: Vendor-listed fixed version}
  - {product: VMware Tools for Windows 13.x, version: 13.1.5.0, status: Vendor-listed fixed build}
  - {product: VMware Tools for Windows 11.x / 12.x, version: 12.5.5, status: Includes fixed 12.4.10 for 32-bit Windows}
timeline:
  - date: Nov 19, 2026
    title: Broadcom publishes VMSA-2026-0009 and GTIG discloses exploitation
    body: The five-issue advisory ships fixes. GTIG's report is dated November 19 and describes forensic evidence from early September; exploitation is not inferred from a PoC or a compiler timestamp.
  - date: Nov 20, 2026
    title: Broadcom revises the advisory
    body: Revision 0009.1 clarifies the affected VMware Tools versions. The current matrix lists vCenter 7.0 as affected and directs extended-support customers to Support; the FAQ also warns about upgrade compatibility and Windows Guest Alias prerequisites.
checklist:
  - title: Patch each affected component through its supported upgrade path
    hint: Read VMSA-2026-0009.1 and check vCenter's Summary tab or PowerCLI DefaultVIServer.Version/Build. Apply 9.1.1.0200, 9.0.2.0200 or 8.0 U3m; VCF 5.x uses KB 88287 and SDDC Manager 5.2.5. Telco deployments use KB 463116; vCenter 7.0 extended-support customers must contact Broadcom. These vCenter updates cannot use Quick Patch. Check interoperability and Back-in-Time restrictions before changing an in-progress upgrade; integrated appliances need their vendor's qualified guidance.
  - title: Update SDDC Manager and Windows guest Tools separately
    hint: SDDC Manager targets are 9.1.1.0200, 9.0.2.0100 and 5.2.5; 9.1.1.0 already contains the three SDDC fixes. For Windows Tools use 13.1.5.0 or 12.5.5, which includes 12.4.10 for 32-bit Windows. Inventory Tools in each VM's Summary tab and run VGAuthCLI.exe list as a guest administrator to inspect aliases. Disabling guest operations, stopping or uninstalling Tools is not a vendor workaround; patch it. Guest hardware upgrades are not required.
  - title: Preserve evidence and hunt across the whole intrusion path
    hint: GTIG publishes 11 suspected obfuscation-network IPs—103.147.251.5, 103.190.38.3, 118.174.128.34, 118.174.128.36, 118.174.128.38, 176.9.89.66, 185.71.15.109, 220.121.128.41, 222.108.77.44, 61.216.56.127 and 81.45.89.43—and six file indicators, ActiveSer.jsp, u.jsp, /tmp/123, /tmp/sss, /tmp/dbr and /usr/bin/vmtoolscs. Preserve appliance, SSO, VAMI, ESXi and network logs before remediation. Use the report's complete IOC tables and six YARA rules, including its additional staging/output artifacts; inspect /tmp/123.rar, /tmp/rar, /tmp/gdb_file, /tmp/123.key, /tmp/rsa_host_key, /tmp/ecdsa_host_key, /tmp/dss_host_key, /bin/env SUID changes, extracted_tenant_signer_* output, idp_key.pem, trusted_cert_2.pem, domain.txt, vmfs-pydist.tar.gz, vmfs_browser.py, hidden VMFS .a staging and o.tar.gz. Hunt sps-*@vsphere.local accounts, PUT /rest/appliance/access/ssh, root authorized_keys changes, SSH-2.0-pulsesecure_23345 listeners on TCP 53/33992, and unexpected Slack API C2. Slack is shared infrastructure; do not blanket-block it as an attacker-owned domain. A match is a lead, not proof; missing indicators do not establish a clean system.
  - title: Treat stolen signing keys and downstream access as incident response
    hint: If suspicious access is found, involve the response team and Broadcom Support to scope vmdir database and STS/SAML signing-key theft, rogue SSO accounts, vCenter master-key/database-credential theft, ESXi root keys and guest NTDS/SYSTEM/SECURITY data access. Preserve evidence, contain affected systems and coordinate trusted rebuilds and credential/key replacement for the confirmed scope. Installing a patch or changing one administrator password does not invalidate every stolen signing key or remove persistence.
  - title: Restrict management access and send logs outside the appliance
    hint: Allow only required management sources and ports, including TCP 2012, 443, 5480 and 22; apply external segmentation and egress controls rather than relying on the VAMI GUI firewall alone. Review GTIG's VCSA Hardening & Logging Tool and Defender's Guide, test the rules with formal change control, retain legitimate vCenter/ESX dependencies and forward denied connections and shell activity to a remote SIEM. Broadcom lists no workaround; these controls complement the patch.
sources:
  - name: Broadcom VMSA-2026-0009.1
    url: https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/39495
    primary: true
    says: First published November 19, updated November 20; five CVEs, product-specific prerequisites, cumulative fix matrix and no workarounds.
  - name: Broadcom VMSA-2026-0009 FAQ
    url: https://github.com/vmware/vcf-security-and-compliance-guidelines/blob/main/security-advisories/vmsa-2026-0009/README.md
    primary: true
    says: Distinct from July's CVE-2026-59309; explains extended support, Tools prerequisites, asynchronous patching, Quick Patch and Back-in-Time upgrade restrictions.
  - name: GTIG and Mandiant — ARMORY CASTLE Exploits vSphere
    url: https://cloud.google.com/blog/topics/threat-intelligence/armory-castle-exploits-vsphere
    primary: true
    says: Original November 19 incident-response analysis confirms September exploitation, describes BONESAW and lateral movement, and publishes hunting indicators and hardening guidance.
  - name: Broadcom Telco Cloud remediation
    url: https://knowledge.broadcom.com/external/article/463116/vmware-telco-cloud-response-to-vmsa20260.html
    primary: true
    says: Listed TCP/TCI versions use vCenter 8.0 U3m; unlisted or extended-support deployments need Support guidance.
---

CVE-2026-123890 lets an unauthenticated attacker who can reach vCenter's vulnerable Directory Service obtain an administrator session. GTIG describes a session-key disclosure in the SRP DCE/RPC interface on TCP 2012. The exposed session permits command execution and file retrieval through the Directory Service RPC interface. Enhanced Linked Mode is not required.

Mandiant found BONESAW used against a vCenter server in early September, even though that server had the July CVE-2026-59309 fix. These are distinct vulnerabilities. A July build timestamp in the recovered tool is not proof of July exploitation, because build metadata can be changed. The original GTIG article is dated November 19, despite some later news reports dating it November 20.

In the investigated intrusion, an earlier BeyondTrust compromise led through internal Linux appliances to vCenter. BONESAW stole the directory database and STS signing material and created SSO administrator access. SAWSNAKE used signing material for forged SAML authentication; subsequent activity reached ESXi hosts and extracted data from guest disks, including Active Directory database and registry material. This observed chain does not make BeyondTrust access a prerequisite for the vCenter bug. GTIG attributes the operation to ARMORY CASTLE, a suspected PRC-nexus actor formerly tracked as UNC5221; the report does not establish a victim count. L4 reflects confirmed real exploitation of a virtualization control plane, rather than demonstrated internet-wide compromise.

The same Broadcom advisory covers three separate SDDC Manager flaws and a Windows Tools flaw. The SDDC SQL issue requires an authenticated low-privilege role; the command-injection vector requires high privileges, and the local escalation requires administrative privileges. The Tools issue requires access to a local privileged process and Guest Alias mapping; it stays inside the Windows VM. Neither these flaws nor the vCenter flaw is described by Broadcom as a guest-to-host VM escape. ESX itself is not affected by this advisory, although the investigated attacker reached hosts after compromising the management plane. No exploitation of the other four CVEs is established by the GTIG account.

Use the exact product builds above, rather than a generic three-part version checker. The 9.1 SDDC SQL/command fixes first shipped in 9.1.0.0 and its local-escalation fix in 9.1.1.0; the current recommended cumulative build is 9.1.1.0200. This does not mean that vCenter 9.1.1.0 fixes its distinct authentication bypass. Broadcom lists no public vCenter 7.0 fixed build and advises extended-support customers to request support; older out-of-support versions should be presumed affected, not treated as safe because they are absent from the matrix.

Plan the patch without discarding its urgency: the FAQ says vCenter 8.0 U3m and 9.0.2.0200 block upgrades to VCF 9.1.1 because of Back-in-Time restrictions, with compatibility expected in 9.1.2. Check the supported sequence with Broadcom and the interoperability matrix. Management interfaces become unavailable during the update while running workloads continue; some new encryption/key-rotation operations are unavailable while vCenter is offline. Patching closes the entry point, but a prior theft of signing keys, credentials or guest data requires a separate containment and recovery response.
