---
title: FortiOS fixes three critical flaws in routing and high availability
date: '2026-11-10'
level: 3
tags:
- FortiOS
- routing
- HA
ecosystems:
- fortinet
summary: Fortinet disclosed critical flaws affecting OSPF, iBGP and some FortiOS high-availability deployments. Upgrade to 8.0.2, 7.6.8, 7.4.13 or 7.2.14 or later in the corresponding branch to cover all three.
splash: Affected FortiOS devices using OSPF, configured iBGP neighbors, FGSP with standalone-config-sync or autoscale.
wipe: Inventory exposed routing and HA interfaces, follow the applicable upgrade path, and verify routing and cluster health.
inTheWild: unknown
inTheWildNote: The Fortinet records reviewed here provide no evidence of exploitation.
cves:
- id: CVE-2026-126253
  score: 9.3
  name: OSPF authentication bypass
  description: An unauthenticated attacker with adjacent OSPF access can send crafted requests that broadcast link-state advertisements.
- id: CVE-2026-126254
  score: 9.6
  name: iBGP propagation of malformed attributes
  description: A configured iBGP neighbor can send crafted input that propagates malicious or malformed attributes to connected routers.
- id: CVE-2026-126259
  score: 9.0
  name: HA authentication bypass
  description: An unauthenticated attacker who can reach affected HA traffic can send crafted packets to run commands as super admin when FGSP with standalone-config-sync or autoscale is in use.
fixed:
- product: FortiOS 8.0
  version: 8.0.2
- product: FortiOS 7.6
  version: 7.6.8
- product: FortiOS 7.4
  version: 7.4.13
- product: FortiOS 7.2
  version: 7.2.14
- product: FortiOS 7.0
  version: none
  status: Migrate to a supported fixed branch
timeline:
- date: Nov 10, 2026
  title: Fortinet publishes routing advisories
  body: FG-IR-26-267 and FG-IR-26-268 describe the OSPF and iBGP flaws.
- date: Nov 11, 2026
  title: Fortinet publishes the three CNA records
  body: The records give affected versions and separate the HA-only fix from the routing fixes on 8.0.
checklist:
- title: Identify and prioritize exposed devices
  hint: Run get system status on every unit. Check which interfaces run OSPF, which neighbors use iBGP, and whether FGSP with standalone-config-sync or autoscale is enabled. Restrict routing and HA traffic to trusted links or peers using your existing network controls while planning the upgrade.
- title: Back up and upgrade the affected branches
  hint: Back up configurations and follow Fortinet’s model-specific upgrade path for all cluster members. For all three flaws, use FortiOS 8.0.2, 7.6.8, 7.4.13 or 7.2.14 or later in the respective branch. If you run 7.0, plan migration to a supported fixed branch. Verify the installed versions, routing adjacencies, route tables and HA health after the change.
- title: Investigate unexpected routing or admin changes
  hint: Preserve routing, HA and admin logs if you find unexplained route advertisements, peer resets or configuration changes. Compare route and config snapshots with your known-good baseline. If evidence points to privileged access, isolate the affected unit, investigate lateral access and rotate exposed credentials from a trusted system.
sources:
- name: Fortinet PSIRT FG-IR-26-267 CSAF
  url: https://filestore.fortinet.com/fortiguard/psirt/csaf_authentication-bypass-by-primary-weakness_fg-ir-26-267.json
  says: Original OSPF advisory date and FortiOS fixes.
  primary: true
- name: Fortinet PSIRT FG-IR-26-268 CSAF
  url: https://filestore.fortinet.com/fortiguard/psirt/csaf_numeric-truncation-error_fg-ir-26-268.json
  says: Original iBGP advisory date and FortiOS fixes.
  primary: true
- name: Fortinet CNA CVE-2026-126253
  url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/126xxx/CVE-2026-126253.json
  says: OSPF requirements, score and structured 7.0 range.
  primary: true
- name: Fortinet CNA CVE-2026-126254
  url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/126xxx/CVE-2026-126254.json
  says: Configured iBGP neighbor requirement and affected ranges.
  primary: true
- name: Fortinet CNA CVE-2026-126259
  url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/126xxx/CVE-2026-126259.json
  says: HA prerequisites, affected ranges and the HA-only 8.0.1 fix.
  primary: true
---

These CVEs are part of the detailed advisories following [Fortinet’s October priority upgrade notice](/incidents/fortinet-security-hardening/). The OSPF path requires adjacent access, the BGP path requires a configured iBGP peer, and the HA path requires access to HA packets on an affected FGSP deployment with standalone-config-sync or an autoscale deployment.

For the routing flaws, FortiOS 8.0.0–8.0.1, 7.6.0–7.6.7, 7.4.0–7.4.12 and 7.2.0–7.2.13 are affected. FortiOS 8.0.1 fixes the HA flaw on the 8.0 branch. Install 8.0.2 for the routing fixes. The affected HA versions in the 7.6, 7.4 and 7.2 branches match the routing ranges. The Fortinet CNA records additionally list 7.0.1–7.0.19 for OSPF and 7.0.0–7.0.19 for HA in their structured version tables, without a 7.0 fix. Fortinet’s OSPF advisory also references FortiSASE. Managed-service customers should check their tenant status with Fortinet.
