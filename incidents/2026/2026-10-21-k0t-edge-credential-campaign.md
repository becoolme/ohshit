---
title: k0t edge-device campaign exposed over 70,000 credentials and established persistent network access
level: 4
date: '2026-10-21'
tags:
- Fortinet
- GlobalProtect
- credentials
summary: Group-IB and NyxLab report a distinct credential dataset and observed intrusions involving exposed FortiGate, FortiWeb and GlobalProtect devices. Over 70,000 credentials are not a count of victims; ransomware affiliations remain unconfirmed.
splash: FortiGate weak passwords; vulnerable FortiWeb; GlobalProtect override cookies with a reused portal/gateway certificate
wipe: Patch affected appliances, restrict access, investigate persistence and rotate exposed appliance and directory credentials
inTheWild: 'yes'
inTheWildNote: Group-IB and NyxLab observed persistent access and data exfiltration
cves:
- id: CVE-2025-64446
  name: FortiWeb initial-access path
  description: Campaign tooling exploits FortiWeb, not FortiGate, through this vulnerability.
- id: CVE-2026-0257
  name: GlobalProtect authentication-bypass path
  description: Requires authentication override cookies and vulnerable certificate configuration; the campaign forged cookies using the portal certificate.
timeline:
- date: Oct 21, 2026
  title: Group-IB and NyxLab publish their joint investigation
- date: Feb–Jun 2026 (approximate)
  title: Many observed FortiGate compromises date to this period
checklist:
- title: Patch appliances and restrict administrative access
  hint: Inventory FortiWeb and GlobalProtect configurations against the referenced vendor advisories; FortiGate attacks also used password brute force
- title: Investigate edge access and credential exposure
  hint: Review unexpected administrators, configuration exports, trusted-host changes and unusual VPN logins; rotate appliance and directory secrets after containment
- title: Hunt campaign infrastructure and persistence
  hint: 'The report lists 15 network indicator rows and 21 file hashes; also includes alknene.shop in the body. Network hosts/endpoints: mesh.buttruyen.com, 62.60.131.43, Meshcentral.girydsfsggvb.com, 62.60.135.64, agent.afahimsa.top, 193.149.187.81:1287, 64.94.85.14, 168.100.11.99, 162.33.178.213:8888, sthyjk.com:8443, alknene.shop, 162.33.179.249, 193.24.123.162, 193.149.176.50, radesashar.com, 193.169.194.21. Read its complete IoC tables for hashes, full URLs, /meshagents query and clear-thinking_61.92.4_INSTALL.exe paths. Correlate unauthorized RMM, AdaptixC2 and Rclone activity; a match alone does not prove compromise'
sources:
- name: Group-IB and NyxLab joint investigation
  url: https://www.group-ib.com/blog/stray-cat-network-edge/
  says: Observed exploitation, distinct credential dataset, persistence, exfiltration and defensive indicators
  primary: true
- name: The Hacker News
  url: https://thehackernews.com/2026/10/hackers-breach-enterprise-firewalls-and.html
  says: Reports the campaign on October 23; original research was published October 21
- name: Palo Alto Networks CVE-2026-0257 advisory
  url: https://security.paloaltonetworks.com/CVE-2026-0257
  says: 'Required configuration and mitigations: dedicated cookie certificate or disable authentication override'
  primary: true
---

The researchers found negligible overlap with the earlier FortiBleed credential dataset. Links to FortiBleed and ransomware groups remain assessments, not proven common operators. Exact victim attribution is incomplete. This report documents newly disclosed campaign evidence rather than a new vulnerability.

For GlobalProtect, check Network → GlobalProtect → Portals/Gateways → Agent authentication settings. Disable authentication override or generate a new dedicated cookie certificate; do not reuse a portal/gateway certificate. Upgrade every portal and gateway using the vendor's version-specific table.
