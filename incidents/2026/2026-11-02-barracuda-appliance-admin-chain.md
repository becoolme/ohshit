---
title: Barracuda ESG authentication bypass can combine with a root command-injection flaw
level: 4
date: '2026-11-02'
updated: 2026-11-12
tags:
- edge device
- auth bypass
- RCE
summary: Barracuda disclosed an ESG configuration-import bypass and a timezone command-injection flaw shared by six appliance products. Restrict management access, update firmware and verify the product-specific security patch; a firmware version alone is not enough.
splash: Reachable appliance admin interfaces; command injection alone requires an authenticated administrator
wipe: Restrict admin access; install current firmware and verify the vendor patch for each appliance
inTheWild: 'yes'
inTheWildNote: CISA listed both Barracuda flaws in KEV on November 10.
ecosystems:
- barracuda
cves:
- id: CVE-2026-116606
  score: 9.3
  name: ESG configuration-import authentication bypass
  description: Before ESG 9.4.0.030, an unauthenticated remote attacker can restore a crafted compatible backup and alter global configuration. Mandiant rates this CVSS 4.0 9.3.
- id: CVE-2026-111560
  score: 8.6
  name: Timezone command injection
  description: An authenticated administrator can put shell metacharacters into the timezone configuration; later processing executes commands as root. CVSS 4.0 8.6.
fixed:
- product: ESG
  version: Latest firmware + BNSF-40425 (9.4.017+); BNSF-40430 (<9.4.017)
  status: Verify patch installation; vendor does not give one safe firmware threshold for both flaws
- product: Load Balancer ADC
  version: Latest firmware + BNADC-16586
  status: Verify patch installation; vendor does not give one safe firmware threshold for both flaws
- product: Message Archiver (BMA)
  version: Latest firmware + BNMA-32468
  status: Verify patch installation; vendor does not give one safe firmware threshold for both flaws
- product: WAF Control Center (WCC)
  version: Latest firmware + BNWF-60060
  status: Verify patch installation; vendor does not give one safe firmware threshold for both flaws
- product: Web Application Firewall (WAF)
  version: Latest firmware + BNADC-16586
  status: Verify patch installation; vendor does not give one safe firmware threshold for both flaws
- product: Web Security Gateway (WSG)
  version: Latest firmware + BNYF-24789
  status: Verify patch installation; vendor does not give one safe firmware threshold for both flaws
timeline:
- date: Oct 15, 2026
  title: Command-injection issue reported
  body: Date in Mandiant’s disclosure timeline, not the public disclosure date.
- date: Oct 22, 2026
  title: Configuration-import issue reported
  body: Date in Mandiant’s disclosure timeline.
- date: Nov 2, 2026
  title: Barracuda and Mandiant publish both advisories
- date: Nov 5, 19:30 UTC
  title: Barracuda corrects the ESG authentication requirement
  body: The vendor now explicitly says CVE-2026-116606 requires access to the administrative UI, not authentication. The timezone flaw still requires administrator access; product and patch scope are unchanged.
- date: Nov 10, 2026
  title: CISA adds CVE-2026-111560 and CVE-2026-116606 to KEV
  body: The catalog confirms known exploitation. The catalog due date for applicable U.S. federal civilian agencies is November 13, 2026. Follow vendor remediation and CISA BOD 26-04 forensic triage guidance.
checklist:
- title: Remove public access to management interfaces
  hint: Limit administration to trusted internal networks with network access controls. Review firewall/NAT exposure for each appliance; normal mail or application traffic is a separate service.
- title: Update firmware and confirm the matching security patch
  hint: Use the device’s firmware page to find the latest release. Several sequential upgrades may be needed on old devices. Verify every patch identifier in the table; contact support@barracuda.com if installation cannot be confirmed.
- title: Check automatic patching and apply missing patches
  hint: Enable automatic patch reception if disabled, or follow Barracuda Campus instructions to apply the product-specific patch manually. Do not assume downloading firmware installed every security patch.
- title: Review configuration and privileged activity
  hint: As a precaution, compare recent backup imports, timezone changes and administrator activity with approved changes. Preserve appliance logs and contact support about unexplained changes; the disclosures publish no attack IoCs or compromise-specific recovery procedure.
sources:
- name: Barracuda product advisory
  url: https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection
  primary: true
  says: November 2 publication; six products, patch IDs and management-access guidance. The explicit November 5 14:30 EST correction resolves the earlier authentication-label conflict for CVE-2026-116606.
- name: Mandiant MNDT-2026-0042
  url: https://raw.githubusercontent.com/mandiant/Vulnerability-Disclosures/master/2026/MNDT-2026-0042.md
  primary: true
  says: ESG before 9.4.0.030; no authentication required for crafted backup import.
- name: Mandiant MNDT-2026-0041
  url: https://raw.githubusercontent.com/mandiant/Vulnerability-Disclosures/master/2026/MNDT-2026-0041.md
  primary: true
  says: Authenticated-admin timezone command injection; six affected product/version ranges.
- name: CISA Known Exploited Vulnerabilities Catalog
  url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
  primary: true
  says: CISA adds CVE-2026-111560 and CVE-2026-116606 to KEV on November 10, with a November 13 due date.
---

Barracuda says the two flaws can be combined to obtain root access when an attacker can reach the administrative interface. Only ESG is listed as affected by the authentication bypass. Do not extend that unauthenticated chain to every other product.

Mandiant identifies the command-injection exposure as ESG through 9.4.0.27, ADC through 6.4.0, WAF through 11.0.1, WSG through 16.1.100.100, BMA through 5.5.4.0 and WCC through 2.2.1. The timezone flaw by itself requires administrator authentication. The ESG import bypass has a separate affected range: before 9.4.0.030.

The vendor originally labelled both vulnerabilities as requiring administrator authentication, contradicting its pre-authentication description and Mandiant’s ESG finding. At **19:30 UTC on November 5** (14:30 EST), Barracuda explicitly corrected CVE-2026-116606 to require **administrative-UI reachability, not authentication**. This resolves the label conflict, rather than identifying another flaw or attack. The timezone issue still requires administrator access. Treat reachability of the management service as exposure; an existing administrator login is not a dependable protection against the ESG chain.

The patch identifiers above are copied from Barracuda, including BNADC-16586 for both ADC and WAF. The firmware range for one CVE does not establish a safe release for every product or replace patch verification. CISA subsequently confirmed known exploitation of both vulnerabilities, which warrants L4. The listing does not identify victims or establish that both flaws were chained in a specific attack.

The catalog confirms known exploitation. The catalog due date for applicable U.S. federal civilian agencies is November 13, 2026. Follow vendor remediation and CISA BOD 26-04 forensic triage guidance.
