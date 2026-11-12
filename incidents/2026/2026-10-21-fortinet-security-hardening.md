---
title: "Fortinet urges priority upgrades across five product families before detailed advisories"
level: 3
date: 2026-10-21
updated: 2026-11-12
tags: [Fortinet, edge, patching]
ecosystems: [fortinet]
summary: "Fortinet first announced priority updates in October. November disclosures clarify product-specific fixes and show FortiManager and FortiAnalyzer 8.0.2 still affected by a separate HTTP flaw."
splash: "FortiOS, FortiManager, FortiAnalyzer, FortiMail and FortiAuthenticator"
wipe: "Back up configurations. Match your product and branch to the detailed CVE advisories before upgrading."
inTheWild: unknown
inTheWildNote: "The announcement provides no exploitation evidence or individual CVE details"
fixed:
  - { product: FortiOS 8.0, version: 8.0.2 }
  - { product: FortiOS 7.6, version: 7.6.8 }
  - { product: FortiOS 7.4, version: 7.4.13 }
  - { product: FortiOS 7.2, version: 7.2.14 }
  - { product: FortiManager 8.0, version: 8.0.2, status: October target; CVE-2026-126170 still affects this build }
  - { product: FortiManager 7.6, version: 7.6.8 }
  - { product: FortiManager 7.4, version: 7.4.12 }
  - { product: FortiManager 7.2, version: 7.2.13 }
  - { product: FortiAnalyzer 8.0, version: 8.0.2, status: October target; CVE-2026-126170 still affects this build }
  - { product: FortiAnalyzer 7.6, version: 7.6.8 }
  - { product: FortiAnalyzer 7.4, version: 7.4.12 }
  - { product: FortiAnalyzer 7.2, version: 7.2.13 }
  - { product: FortiMail 8.0, version: 8.0.2 }
  - { product: FortiMail 7.6, version: 7.6.7 }
  - { product: FortiMail 7.4, version: 7.4.9 }
  - { product: FortiMail 7.2, version: none, status: Migrate to 7.4 or later }
  - { product: FortiAuthenticator 8.0, version: 8.0.4 }
  - { product: FortiAuthenticator 6.6, version: 6.6.11 }
timeline:
  - date: Oct 21, 2026
    title: Priority upgrade notice published
  - date: Nov 10, 2026
    title: Fortinet publishes detailed product advisories
    body: The product-level October guidance is supplemented by individual CVE scope and fixed versions.
  - date: Nov 11, 2026
    title: Fortinet CNA records an HTTP code execution flaw affecting 8.0.2
    body: FortiManager and FortiAnalyzer 8.0.3 are listed as upcoming targets for CVE-2026-126170.
  - date: Oct 22, 2026 (scheduled)
    title: Coordinated firmware rollout
checklist:
  - title: Back up and upgrade
    hint: Back up the configuration and prioritize internet-facing appliances. Migrate FortiMail 7.2 to a patched release. Check the per-CVE notes below before deciding your appliance is covered.
  - title: Restrict administrative interfaces to trusted addresses
    hint: HTTPS and SSH admin from trusted IPs only, or off on external interfaces. FortiManager should never face the internet
  - title: Review administrative access and configuration changes
    hint: Enforce MFA on admin accounts; look for odd logins and changes nobody approved
sources:
  - name: Fortinet CISO announcement
    url: https://www.fortinet.com/blog/ciso-collective/fortinet-releases-security-hardening-release-for-multiple-products
    primary: true
  - name: FortiGuard PSIRT advisory feed
    url: https://filestore.fortinet.com/fortiguard/rss/ir.xml
    primary: true
  - name: Fortinet CNA record for CVE-2026-126170
    url: https://cveawg.mitre.org/api/cve/CVE-2026-126170
    primary: true
---

**L3:** widely deployed edge and identity products require priority updates. Availability varies by platform; verify downloads and upgrade paths. The October announcement did not specify individual CVEs, technical impact or exploitation. Fortinet describes proactive AI-assisted discovery. The October notice scheduled details for November 10.

The November advisories now describe [FortiAuthenticator](/incidents/fortiauthenticator-november-security/), [FortiMail](/incidents/fortimail-november-critical/) and [FortiManager and FortiAnalyzer](/incidents/fortimanager-november-access/) separately. The version table reflects the October notice. In the later CVE-2026-126170 record, both self-managed management products are still affected at 8.0.2, and Fortinet lists 8.0.3 as upcoming. Verify availability and restrict management access while awaiting any required patch. The detailed entry gives Fortinet’s workaround for enabled JSON API access.
