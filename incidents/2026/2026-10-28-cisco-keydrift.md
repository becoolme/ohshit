---
date: 2026-10-28
title: Talos discloses KeyDrift implants stealing key material from Cisco SD-WAN controllers
level: 4
tags:
  - Cisco
  - SD-WAN
  - KeyDrift
ecosystems:
  - network
summary: Talos reports UAT-11473 exploiting CVE-2026-20127 to install persistent controller implants and collect key material. This is a newly disclosed campaign using a previously patched flaw, not a new zero-day.
splash: Unpatched Catalyst SD-WAN Controller, Manager and Validator deployments; investigate exposed or previously compromised control components
wipe: Apply Cisco’s fixed releases, restrict control-component access, and investigate persistence with TAC before declaring recovery
inTheWild: yes
inTheWildNote: Cisco Talos reports exploitation and recovered controller implants.
cves:
  - id: CVE-2026-20127
    score: 10
    name: SD-WAN peering authentication bypass
    description: Crafted requests can give an unauthenticated remote attacker privileged access and permit network-configuration changes.
fixed:
  - product: Catalyst SD-WAN 20.9
    version: 20.9.8.2
  - product: Catalyst SD-WAN 20.12
    version: 20.12.5.3 / 20.12.6.1
  - product: Catalyst SD-WAN 20.15
    version: 20.15.4.2
  - product: Catalyst SD-WAN 20.18
    version: 20.18.2.1
  - product: Earlier and end-of-maintenance releases
    version: none
    status: Migrate using Cisco’s compatibility and upgrade matrices
timeline:
  - date: Feb 25, 2026
    title: Cisco publishes the authentication-bypass advisory and fixes
  - date: Oct 28, 2026
    title: Talos publishes the KeyDrift campaign analysis; Cisco updates its advisory
checklist:
  - title: Patch every affected control component
    hint: "Inventory Controller/vSmart, Manager/vManage and Validator/vBond. Use Cisco’s release table and compatibility matrix: 20.9.8.2, 20.12.5.3 or 20.12.6.1, 20.15.4.2, or 20.18.2.1 as appropriate. Migrate unsupported lines using Cisco’s compatibility and upgrade matrices."
  - title: Restrict management and peering access
    hint: For on-premises deployments, allow ports 22 and 830 only from known controller and required trusted IPs, and follow Cisco’s hardening guide for the remaining control-plane ports. Test topology requirements before changing rules. ACLs reduce exposure but do not replace patches.
  - title: Preserve evidence and investigate controller persistence
    hint: Review /var/log/auth.log for unexpected Accepted publickey for vmanage-admin events and validate every peer IP, role and timestamp against Manager inventory and maintenance records. Talos indicators include /etc/sv/sshd/ and /etc/sv/aaamgr/ run launchers, conf_sshd, rsshd, libdssl.so, aaamgrd, libcommon.so, /tmp/system-vdaemon, /var/tmp/vdaemon.bin and deleted /var/tmp/vdaemon.conf. No fixed external C2 IP/domain was recovered. A match alone is not proof. Collect request admin-tech from control components, activate incident response and contact Cisco TAC; patching alone does not establish that existing implants are gone.
sources:
  - name: Cisco Talos KeyDrift analysis
    url: https://blog.talosintelligence.com/uat-11473-keydrift/
    primary: true
    says: Documents recovered implants, key collection, targeting, indicators and response guidance.
  - name: Cisco PSIRT advisory
    url: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-rpa-EHchtZk
    primary: true
    says: Defines affected roles, fixed releases, temporary access restrictions and log checks.
  - name: Cisco Catalyst SD-WAN Hardening Guide
    url: https://sec.cloudapps.cisco.com/security/center/resources/Cisco-Catalyst-SD-WAN-HardeningGuide
    primary: true
    says: Deployment hardening guidance; coordinate restrictions with legitimate topology requirements.
---

Talos disclosed this campaign on October 28. PolyFlame provides persistent access inside controller processes; LittleFilch inspects decrypted control traffic and extracts material assessed to be IPsec data-plane keys. The affected products are control components, not every Cisco firewall. The advisory covers on-premises and Cisco-hosted deployments, regardless of configuration.

The entry flaw was disclosed in February. L4 reflects recovered implants and observed exploitation in the newly reported campaign. Talos assesses infrastructure overlap with Volt Typhoon’s Silent Train network; overlap does not establish that the groups are identical. No victim total or proof of decryption of all customer traffic is provided.

Use the vendor’s upgrade and investigation procedures together. The fixed-release table does not certify that a previously compromised controller is clean.
