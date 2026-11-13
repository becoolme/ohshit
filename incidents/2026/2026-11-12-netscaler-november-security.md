---
title: Citrix fixes 28 NetScaler ADC and Gateway flaws and a Console authentication bypass
level: 3
date: '2026-11-12'
tags:
- Citrix
- NetScaler
- VPN
- authentication
summary: A packet-processing overflow affects default NetScaler ADC and Gateway deployments. Other flaws depend on features such as VPN or AAA. An unauthenticated attacker who can reach NetScaler Console can bypass its login controls. Update ADC and Gateway before Console.
splash: Customer-managed NetScaler ADC, Gateway and Console, including ADC/Gateway in Secure Private Access Hybrid deployments.
wipe: Patch ADC and Gateway first, then upgrade NetScaler Console to 14.1-74.34 or later. Verify the firmware build for each product.
inTheWild: 'no'
inTheWildNote: Citrix reports no known exploitation and published no indicators for this batch.
cves:
- id: CVE-2026-120868
  score: 9.3
  name: Packet engine overflow
  description: Any ADC or Gateway configuration, including defaults. No authentication required.
- id: CVE-2026-107407
  score: 9.3
  name: SMPP overflow
  description: Requires an SMPP load-balancing or content-switching virtual server.
- id: CVE-2026-107408
  score: 9.3
  name: DNS memory corruption
  description: Requires DNS load balancing and recursive resolution.
- id: CVE-2026-107409
  score: 9.3
  name: DoH double free
  description: Requires DNS-over-HTTPS load balancing.
- id: CVE-2026-107410
  score: 9.3
  name: Push overflow
  description: Requires a PUSH load-balancing virtual server.
- id: CVE-2026-107411
  score: 8.7
  name: RTSP ALG overflow
  description: Requires an RTSP load-balancing virtual server or an LSN group using RTSP ALG.
- id: CVE-2026-107412
  score: 9.5
  name: Gateway and AAA memory overflows
  description: Unauthenticated path on Gateway or AAA virtual servers.
- id: CVE-2026-107413
  score: 8.7
  name: SAML overflow
  description: Requires a SAML authentication action.
- id: CVE-2026-107414
  score: 8.7
  name: WebAuth overflow
  description: Requires a WebAuth action.
- id: CVE-2026-107415
  score: 9.3
  name: Email OTP overflow
  description: Requires an email authentication action.
- id: CVE-2026-111340
  score: 8.7
  name: Knowledge-based authentication overflow
  description: Requires an LDAP action with KBAttribute or an email action.
- id: CVE-2026-111341
  score: 8.7
  name: Client-certificate overflow
  description: Requires a client-certificate authentication action.
- id: CVE-2026-111342
  score: 8.7
  name: LDAP authentication overflow
  description: Requires a Gateway or AAA virtual server.
- id: CVE-2026-111343
  score: 6.9
  name: Authentication request overflow
  description: Requires a Gateway or AAA virtual server.
- id: CVE-2026-111344
  score: 9.3
  name: Endpoint Analysis overflow
  description: Requires a VPN or AAA virtual server with Endpoint Analysis.
- id: CVE-2026-111345
  score: 6.9
  name: Request handling reboot loop
  description: Requires reachability to the ADC or Gateway on the data path.
- id: CVE-2026-111346
  score: 8.3
  name: HTTP/2 overflow
  description: Requires an HTTP or SSL virtual server with HTTP/2 enabled in its profile.
- id: CVE-2026-111347
  score: 8.7
  name: Base64 policy overflow
  description: Applies to bound B64DECODE policy expressions or Application Firewall configurations.
- id: CVE-2026-111348
  score: 6.9
  name: Authentication data in logs
  description: Requires local read access to /var/log/httperror.log after a logout occurred.
- id: CVE-2026-111349
  score: 6.9
  name: Application Firewall inspection overflow
  description: Requires an AppFW profile with one of the affected inspection protections.
- id: CVE-2026-120860
  score: 8.7
  name: Protocol load-balancing overflow
  description: Requires a Diameter, SIP-over-TCP, MQTT or RADIUS load-balancing virtual server.
- id: CVE-2026-120861
  score: 8.7
  name: GSLB and geolocation overflow
  description: Requires GSLB MEP, static proximity, automatic configuration synchronization or a geolocation responder policy.
- id: CVE-2026-120862
  score: 8.7
  name: SIP ALG and DNS logging overflow
  description: Requires SIP ALG on an LSN group or DNS answer-section security logging.
- id: CVE-2026-120863
  score: 8.7
  name: Management-plane overflow
  description: An untrusted host needs access to the NSIP or NSIP6 address.
- id: CVE-2026-120864
  score: 9.3
  name: ICA proxy overflow
  description: Requires a VPN Gateway, AAA virtual server or HDX content-redirection virtual server.
- id: CVE-2026-120865
  score: 8.7
  name: HTTP/3 overflow
  description: Requires an HTTP_QUIC load-balancing or content-switching virtual server.
- id: CVE-2026-120866
  score: 7.7
  name: BGP routing overflow
  description: Requires BGP with a neighbor lacking TCP-MD5 authentication. The attacker must be or spoof that neighbor.
- id: CVE-2026-120867
  score: 8.7
  name: SSL/TLS/DTLS overflow
  description: Requires a TLS 1.3 virtual server with ECH (including the listed Intel QAT case) or an SSL virtual server with a SafeNet HSM key.
- id: CVE-2026-120869
  score: 9.4
  name: Console authentication bypass
  description: An unauthenticated attacker who can reach the Console IP can access restricted resources.
fixed:
- product: NetScaler ADC and Gateway 14.1
  version: 14.1-73.57
- product: NetScaler ADC and Gateway 13.1
  version: 13.1-64.39
- product: NetScaler ADC 14.1-FIPS
  version: 14.1-73.58 FIPS
- product: NetScaler ADC 13.1-FIPS / 13.1-NDcPP
  version: 13.1-37.293
- product: NetScaler Console 14.1
  version: 14.1-74.34
timeline:
- date: Nov 12, 2026
  title: Citrix publishes firmware and Console advisories
  body: CERT-EU recommends prioritizing internet-facing Gateway and AAA appliances.
checklist:
- title: Patch ADC and Gateway first
  hint: Prioritize internet-facing Gateway and AAA appliances. Install 14.1-73.57 or 13.1-64.39, or the applicable FIPS/NDcPP build below. Apply updates across all affected nodes and plan for ICA sessions to reconnect.
- title: Patch Console and check licensing before its upgrade
  hint: Install Console 14.1-74.34 or later after ADC/Gateway. If moving from pre-14.1-51.x with legacy pooled or flexed file licensing, coordinate the LAS file extension with your Citrix contact or partner and apply it before upgrading Console.
- title: Check reachability and feature exposure
  hint: In the configuration, identify add vpn vserver and add authentication vserver entries. Use CTX697305 for protocol- and feature-specific checks. Restrict Console and NSIP/NSIP6 management access to trusted networks while rolling out patches.
- title: Verify traffic and retain diagnostics
  hint: Check the running build on each node. Test Gateway login, ICA reconnects, load-balanced services and Console management after the change. Preserve crash, reboot and access logs for investigation if anomalies persist.
sources:
- name: Citrix ADC and Gateway bulletin CTX697305
  url: https://support.citrix.com/external/article/CTX697305/citrix-netscaler-adc-and-citrix-netscale.html
  says: Lists the 28 CVEs, feature prerequisites and firmware builds.
  primary: true
- name: Citrix Console bulletin CTX697320
  url: https://support.citrix.com/external/article/CTX697320/citrix-netscaler-console-security-bullet.html
  says: Documents the Console bypass and its separate fix.
  primary: true
- name: Citrix NetScaler upgrade guidance
  url: https://community.citrix.com/techzone-blogs/110_security-updates/security-updates-for-netscaler-adc-netscaler-gateway-and-netscaler-console/
  says: Covers upgrade order, LAS licensing, ICA interruption and known exploitation status.
  primary: true
- name: CERT-EU advisory 2026-020
  url: https://cert.europa.eu/publications/security-advisories/2026-020/
  says: Prioritizes internet-facing Gateway and AAA appliances.
  primary: false
---

Cloud Software Group published two NetScaler bulletins in the same release. CTX697305 lists 28 CVEs in customer-managed ADC and Gateway appliances. Its packet-processing overflow, CVE-2026-120868 (CVSS 4.0 9.3), affects the default configuration and can be triggered without authentication. CVE-2026-107412 (9.5) applies to appliances with Gateway or AAA virtual servers, including SSL VPN, ICA Proxy, CVPN or RDP Proxy configurations. The vendor describes unpredictable behavior or denial of service for these overflows. CTX697320 separately fixes the Console authentication bypass, CVE-2026-120869 (9.4), which requires network access to the Console IP.

The ADC/Gateway advisory also applies to NetScaler instances used by Secure Private Access Hybrid deployments. Citrix says the Citrix-managed cloud services in this release already received updates. The vendor lists no indicators and reports no known exploitation of the newly announced vulnerabilities. This release is separate from the [September exploited NetScaler batch](https://support.citrix.com/external/article/CTX697096).

The default packet-processing path and the reachability of VPN gateways justify L3. Patch appliances even if the more narrowly configured features are absent. The [vendor’s upgrade guidance](https://community.citrix.com/techzone-blogs/110_security-updates/security-updates-for-netscaler-adc-netscaler-gateway-and-netscaler-console/) gives the order and legacy licensing exception process.
