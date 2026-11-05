---
title: Tata Motors iRA apps expose embedded credentials and vehicle-service authentication tokens
level: 3
date: '2026-11-04'
tags: [Tata Motors, iRA, mobile security]
summary: >-
  CERT-In discloses four flaws in iRA 2.0 through 26.7.3 and iRA.ev through 26.7.2: embedded credentials, WebView token exposure, logged tokens and ineffective certificate pinning. Update to 26.8.2 and 26.9.1 respectively. Each attack has different prerequisites; no confirmed exploitation or vehicle-control incident is reported.
splash: iRA 2.0 ≤26.7.3 / iRA.ev ≤26.7.2; package extraction, malicious WebView content, local log access or traffic interception
wipe: Update iRA 2.0 to 26.8.2 and iRA.ev to 26.9.1 through official stores; ask Tata to invalidate potentially exposed credentials and sessions.
inTheWild: unknown
inTheWildNote: CERT-In describes vulnerabilities, not confirmed exploitation or victim totals.
cves:
- id: CVE-2026-121144
  name: Embedded service credentials
  description: An unauthenticated remote attacker can extract hardcoded service-account credentials, API keys and authorization tokens from the application package and potentially access associated backend services.
- id: CVE-2026-121145
  name: WebView origin validation
  description: Malicious content delivered to the affected WebView can expose live bearer tokens and permit user impersonation. The CNA vector includes passive user interaction.
- id: CVE-2026-121146
  name: Authentication tokens in logs
  description: A local attacker who can access development/debugging logs can retrieve session tokens and impersonate the associated user.
- id: CVE-2026-121147
  name: Ineffective certificate pinning
  description: An attacker able to intercept network traffic may read or modify application/backend communications because pinning controls are ineffective.
fixed:
- product: Tata Motors iRA 2.0
  version: 26.8.2
- product: Tata Motors iRA.ev
  version: 26.9.1
timeline:
- date: Nov 4, 2026
  title: CERT-In publishes CIVN-2026-0537
  body: The high-severity advisory lists four CVEs, affected versions and separate app upgrade targets, crediting Pranav Rajendran.
checklist:
- title: Update the correct connected-vehicle app
  hint: Check the installed app's version in its information/settings screen. Use CERT-In's linked official Google Play or Apple App Store listings to install iRA 2.0 26.8.2 or iRA.ev 26.9.1, or a newer supported release. These are different apps; do not apply one app's version threshold to the other or install an APK from a message.
- title: Ask Tata support about exposed sessions and service credentials
  hint: Contact support through the established Tata app or official website if you used an affected version. Ask whether account/session tokens must be invalidated and whether embedded service credentials have been replaced server-side. An app update cannot by itself prove old tokens are invalid. The advisory does not specify a customer password-reset procedure or confirm that changing a password rotates service-account keys.
- title: Review unusual connected-service activity
  hint: Review available account, trip and vehicle-service activity through the official app and report unexplained actions to Tata support. Preserve relevant times and notifications; do not send bearer tokens or debug logs to unsolicited contacts. Limit access to development logs and avoid processing untrusted links in the old app while updating. No campaign-specific indicators or universal incident-response deadline are published.
sources:
- name: CERT-In CIVN-2026-0537 original advisory
  url: https://www.cert-in.org.in/s2cMainServlet?pageid=PUBVLNOTES01&VLCODE=CIVN-2026-0537
  primary: true
  says: November 4 public advisory defines all four flaws, distinct prerequisites, affected versions, fixed app versions and official store links. It does not establish successful real-world attacks or a vehicle-control incident.
- name: CERT-In CNA record for the WebView flaw
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121145
  primary: true
  says: Confirms malicious WebView content can expose live bearer tokens and potentially enable impersonation; the CVSS 4 vector includes passive user interaction. Repeats both upgrade targets.
---

The affected apps provide connected services for Tata Motors combustion-engine and electric vehicles, including vehicle information, trip records and remote commands. CERT-In warns about access and data modification with the impersonated user's privileges; it does not demonstrate arbitrary control of every vehicle or a backend-wide compromise.

The four flaws are separate paths, not a proven exploit chain. Extracting service credentials requires obtaining the application package, while the WebView issue requires malicious content to reach that component. Logged-token theft requires local access to the logs; certificate-pinning exploitation requires an interception position. These conditions should not be collapsed into a claim that every nearby or internet attacker can take over a car.

The official remedy is iRA 2.0 **26.8.2** and iRA.ev **26.9.1**. No affected-person count, campaign-specific IoCs, exploitation confirmation or assurance about previously exposed tokens is supplied. The rating reflects authentication exposure in broadly used connected-vehicle applications, including credentials extractable without an account.
