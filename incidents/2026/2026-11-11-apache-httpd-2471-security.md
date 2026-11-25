---
title: Apache HTTP Server 2.4.71 fixes an HTTP/2 heap corruption flaw
summary: Apache 2.4.71 fixes HTTP/2 RCE affecting httpd 2.4.55–2.4.70 and standalone mod_h2 2.0.8–2.0.42, plus mod_md/mod_vhost_alias flaws. Broadcom lists VCF/Aria Operations and HCX 9.1.x patches pending; its product-specific workarounds disable HTTP/2 and require node-by-node verification.
splash: HTTP/2-enabled affected Apache servers, Axis devices and listed VCF/Aria Operations/HCX appliances; other CVEs require their modules.
wipe: Use httpd 2.4.71 or verified backports; for pending appliance fixes, follow the vendor-specific HTTP/2 workaround and verify every node.
inTheWildNote: Apache published fixes. The sources reviewed do not confirm real-world exploitation.
level: 3
date: '2026-11-11'
updated: '2026-11-25'
tags:
- Apache HTTP Server
- HTTP/2
- RCE
inTheWild: unknown
timeline:
- date: Nov 11, 2026
  title: Apache releases 2.4.71 and publishes three fixes
  body: The upstream advisory identifies CVE-2026-119618 as critical. The mod_md and mod_vhost_alias fixes ship in the same release.
- date: Nov 12, 2026
  title: Canonical and Red Hat publish distribution guidance
  body: Canonical lists fixed packages for five Ubuntu releases affected by the HTTP/2 flaw. Red Hat identifies affected RHEL 9, RHEL 10 and JBoss Core Services 1 products and describes their update paths.
- date: Nov 16, 2026
  title: Axis publishes a workaround for affected network devices
  body: Axis lists AXIS OS 6.50.5.10 and later, recommends temporarily disabling both forms of HTTP/2 and says firmware fixes are in development.
- date: Nov 19, 2026
  title: Broadcom identifies affected Operations and HCX appliances
  body: VMSA-2026-0010 lists patches pending for VCF Operations 9.x, Aria Operations 8.18.x/VCF 5.x and HCX 9.1.x, with separate Operations and HCX workarounds.
checklist:
- title: Inventory the running HTTP/2 configuration
  hint: Use httpd -v or apache2 -v, the package manager, and httpd -M or apache2ctl -M. Check effective Protocols settings for every virtual host and direct origin listener, including h2 over TLS and h2c. Check separately for an externally installed mod_h2.
- title: Install the supported fix and verify the running instance
  hint: Upgrade source builds to httpd 2.4.71 or later. For distro packages, check the vendor’s advisory for the exact fixed package release. Replace an affected standalone module with a supported patched build, then run a configuration check, restart or redeploy the service, and verify the active binary and module.
- title: Disable HTTP/2 on unpatched listeners
  hint: Where an update must wait, remove h2 and h2c from the effective Protocols settings or disable mod_http2. Check configuration and reload; verify that neither direct nor proxied requests negotiate HTTP/2 with the affected listener. Test required traffic. This reduces exposure to the HTTP/2 flaw; the other two modules still require the update if affected.
- title: Verify the Ubuntu package or Red Hat erratum
  hint: On Ubuntu, run dpkg-query -W apache2 apache2-bin and compare the results with the USN-9090-1 versions for your release. The 20.04 LTS fix requires Ubuntu Pro. On Red Hat, select the erratum for your product and update channel from its CVE record. On RHEL 9 or 10, use rpm -q mod_http2 to identify the installed package and compare its release with the applicable erratum. Restart or redeploy after patching and verify the running instance.
- title: Mitigate affected Axis network devices
  hint: On the device, open System → Plain config and find System.HTTP2.AllowH2 and System.HTTP2.AllowH2c. Disable both and save. Refresh or restart if needed, then verify the settings and test required traffic. Restore HTTP/2 only after Axis release notes confirm that your model and firmware track include the fix.
- title: Mitigate every affected Operations analytic node
  hint: Read KB 463005 and use its attached cve-2026-119618-v2.sh, rather than an unverified script copy. Enable SSH for all analytic nodes via https://<primary-node>/admin; copy the script to /root on the primary and log in as root. Ensure SSH port 22 is reachable on every node and root access works using the shared root password or root SSH keys. Run bash /root/cve-2026-119618-v2.sh --check --node <primary-node>; if any node is AFFECTED, run the same command with --apply and confirm. It inventories primary, replica, data and witness nodes; Cloud Proxy nodes are not affected. Require every affected node to report workaround applied, not just a zero result from one node. The script backs up configuration, runs httpd -t, restarts Apache and checks HTTP/2 is off; inspect failures and /var/log/cve-2026-119618.log. A failed reachability check changes no nodes; a configuration/restart failure restores that node and stops, leaving later nodes unmodified. Brief access interruptions and a slower UI are possible; vendor says collectors, agents and API remain functional. After every upgrade rerun --check and reapply until the vendor confirms a fixed appliance build. --revert only reverses script changes; follow the KB manual rollback for manual edits, and restore HTTP/2 only after a verified fix.
- title: Apply the separate HCX Manager workaround and verify both listeners
  hint: For HCX Manager 9.1.x, read KB 463022, take a backup or snapshot, SSH to the appliance and switch to root. Download the attached block-http2.sh from that KB, copy it to /tmp and run sh /tmp/block-http2.sh. It backs up Apache configuration, removes h2 and restarts Apache. From an HTTP/2-capable workstation, run curl --http2 https://<HCX-Manager-IP>/hybridity/api/endpointInfo -k -v and curl --http2 https://<HCX-Manager-IP>:9443 -k -v; both must show HTTP/1.x. The -k option is only part of this protocol diagnostic and does not validate TLS identity. Broadcom says ongoing migrations and network extensions are unaffected. An Operations script, upstream httpd update, or the separate VMSA-2026-0011 vCenter/ESX patches is not confirmation that HCX is remediated.
sources:
- name: Apache 2.4.71 security advisories
  says: Lists the three CVEs, affected versions and release date.
  url: https://httpd.apache.org/security/vulnerabilities_24.html#2.4.71
  primary: true
- name: Apache CNA record
  says: Confirms the race, RCE consequence and affected upstream and standalone versions.
  url: https://cveawg.mitre.org/api/cve/CVE-2026-119618
  primary: true
- name: Standalone mod_h2 maintainer repository
  says: The standalone repository is archived; the maintainer points users to Apache httpd.
  url: https://github.com/icing/mod_h2
  primary: true
- name: Red Hat CVE-2026-119618 analysis
  says: Describes the reachable HTTP/2 prerequisite and the thread-safety failure.
  url: https://access.redhat.com/security/cve/cve-2026-119618
  primary: true
- name: Canonical USN-9090-1
  says: Lists the fixed Ubuntu packages and identifies which Ubuntu releases are affected by the HTTP/2 flaw.
  url: https://ubuntu.com/security/notices/USN-9090-1
  primary: true
- name: Red Hat RHSB-2026-017
  says: Identifies affected Red Hat products and the separate mod_http2 package.
  url: https://access.redhat.com/security/vulnerabilities/RHSB-2026-017
  primary: true
- name: Axis security advisory for CVE-2026-119618
  says: Lists affected AXIS OS versions and the HTTP/2 settings to disable while firmware fixes are in development.
  url: https://www.axis.com/dam/public/permalink/294609/cve-2026-119618pdf-en-US_294609.pdf
  primary: true
- name: Broadcom VMSA-2026-0010
  url: https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/39625
  primary: true
  says: 'November 19 appliance impact matrix: Operations and HCX patches pending; network-access RCE and separate workaround KBs.'
- name: Broadcom Operations workaround KB 463005
  url: https://knowledge.broadcom.com/external/article/463005
  primary: true
  says: Full analytic-node script/manual procedures, Cloud Proxy exclusion, validation, rollback/failure handling and reapplication after upgrades; page gives no explicit update date.
- name: Broadcom HCX workaround KB 463022
  url: https://knowledge.broadcom.com/external/article/463022
  primary: true
  says: HCX Manager 9.1.x backup, attached script and HTTP/1.x validation on ports 443/9443; no ongoing migration/network-extension impact claimed.
cves:
- name: HTTP/2 heap corruption
  description: A race in mod_http2 assign_headers() can lead to remote code execution.
  id: CVE-2026-119618
- name: mod_md child-process crash
  description: A null pointer dereference can crash a child process while handling HTTP requests.
  id: CVE-2026-106023
- name: mod_vhost_alias stack overwrite
  description: The module can overwrite one byte on the stack.
  id: CVE-2026-109163
fixed:
- product: Apache HTTP Server
  version: 2.4.71
- product: Ubuntu 26.10 apache2 packages
  version: 2.4.68-1ubuntu6.2
- product: Ubuntu 26.04 LTS apache2 packages
  version: 2.4.66-2ubuntu2.8
- product: Ubuntu 24.04 LTS apache2 packages
  version: 2.4.58-1ubuntu8.19
- product: Ubuntu 22.04 LTS apache2 packages
  version: 2.4.52-1ubuntu4.27
- product: Ubuntu 20.04 LTS apache2 packages
  version: 2.4.41-4ubuntu3.23+esm11
  status: Ubuntu Pro required
- product: VCF Operations 9.x / Aria Operations 8.18.x / VCF 5.x Aria component
  version: none
  status: Patch pending in VMSA-2026-0010; use KB 463005, not an upstream package substitution
- product: VCF Operations HCX Manager 9.1.x
  version: none
  status: Patch pending; use KB 463022 and verify both ports 443 and 9443
---

CVE-2026-119618 is a race in the HTTP/2 header handling code. A remote client that can reach an affected HTTP/2 listener can trigger memory corruption, with potential code execution in the server process. Apache lists httpd 2.4.55 through 2.4.70 and standalone mod_h2 2.0.8 through 2.0.42. Red Hat identifies servers with h2 or h2c enabled as exposed to this flaw. The standalone project is archived. Use the patched module shipped with Apache httpd, or a downstream build whose vendor confirms the fix.

Apache also fixed a mod_md child-process crash affecting 2.4.30 through 2.4.70 and a mod_vhost_alias one-byte stack overwrite affecting 2.4.69 and 2.4.70. These flaws depend on their respective modules. A downstream backport can retain an older-looking version number, so verify the package release against its advisory.

Canonical’s USN-9090-1 backports the CVE-2026-119618 fix to the five Ubuntu releases in the table. The bulletin also provides fixes for other CVEs on older Ubuntu releases. Those older releases are outside the scope of this HTTP/2 flaw. Red Hat lists RHEL 9, RHEL 10 and JBoss Core Services 1 as directly affected and provides fixes and guidance by product and update channel.

Axis says CVE-2026-119618 can give a remote unauthenticated attacker administrative access to affected Axis network devices running AXIS OS 6.50.5.10 or later. Its November 16 advisory says it knows of no exploitation in its products and gives a workaround while fixes are in development. Upstream Apache’s fixed release is 2.4.71. For Axis hardware, check the firmware release notes for the applicable model and track.

Broadcom’s November 19 VMSA-2026-0010 applies the same CVE to embedded Apache in VCF Operations 9.x, Aria Operations 8.18.x (including the VCF 5.x component), and VCF Operations HCX Manager 9.1.x. Its current matrix still lists patches pending. The upstream 2.4.71 fix does not establish availability of a supported VMware appliance patch. Use KB 463005 for Operations analytic nodes and KB 463022 for HCX; their scripts and validation scopes differ. Operations upgrades replace the Apache configuration and re-enable HTTP/2, so repeat verification and mitigation until a vendor-fixed appliance release is confirmed. These are additional affected products and actionable vendor instructions for the existing Apache incident, not a new vulnerability or proof of exploitation.
