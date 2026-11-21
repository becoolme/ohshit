---
title: Spring Security fixes conditional SpEL code execution and five related security flaws
level: 3
date: '2026-11-19'
tags:
- Spring Security
- Java
- RCE
summary: Spring Security’s November 19 advisories fix six flaws, led by code execution when external input is bound to an ELRequestMatcher property. Other issues affect reactive authentication, WebAuthn, RSocket, IP rules and OAuth2 secrets. Exposure depends on the feature and configuration.
splash: Affected Spring Security applications using the vulnerable binding, authentication, RSocket, IP-matching or client-registration paths.
wipe: Upgrade to the vendor’s fixed release for your line; older fixes and four-part alternatives require enterprise support.
inTheWild: unknown
inTheWildNote: The reviewed Spring advisories do not establish real-world exploitation.
cves:
- id: CVE-2026-59273
  name: ELRequestMatcher expression execution
  description: External input bound to an ELRequestMatcher bean property can execute unrestricted SpEL in the application process.
- id: CVE-2026-59329
  name: Reactive username timing disclosure
  description: A reachable reactive authentication endpoint using AbstractUserDetailsReactiveAuthenticationManager or a subclass can reveal valid usernames through response timing.
- id: CVE-2026-59330
  name: WebAuthn cloned-authenticator detection failure
  description: On 7.0.0–7.0.8 and 7.1.0–7.1.2, Webauthn4JRelyingPartyOperations fails to reject a non-incrementing signature counter; an attacker must already have a cloned authenticator producing valid assertions.
- id: CVE-2026-59331
  name: RSocket authentication memory exhaustion
  description: Reachable RSocket endpoints retaining BasicAuthenticationPayloadExchangeConverter as the AuthenticationPayloadInterceptor converter can allocate excessive memory from crafted metadata.
- id: CVE-2026-59333
  name: Cross-family IP access-rule bypass
  description: On 7.1.0–7.1.2, configured IP restrictions can match across IPv4/IPv6 families when the network stack presents a different family with matching leading bytes.
- id: CVE-2026-59400
  name: OAuth2 client-secret disclosure
  description: ClientRegistration.toString() includes the client secret; logging, concatenation or exception output can expose it to an unintended destination.
fixed:
- product: Spring Security 7.1
  version: 7.1.3
  status: OSS
- product: Spring Security 7.1 enterprise alternative
  version: 7.1.2.1
  status: Enterprise Support Only
- product: Spring Security 7.0
  version: 7.0.9
  status: OSS
- product: Spring Security 7.0 enterprise alternative
  version: 7.0.8.1
  status: Enterprise Support Only
- product: Spring Security 6.5
  version: 6.5.13
  status: Enterprise Support Only
- product: Spring Security 6.4
  version: 6.4.20
  status: Enterprise Support Only
- product: Spring Security 5.8
  version: 5.8.29
  status: Enterprise Support Only
- product: Spring Security 5.7
  version: 5.7.27
  status: Enterprise Support Only
timeline:
- date: Nov 19, 2026
  title: Spring publishes six Spring Security advisories
  body: The vendor lists feature-specific prerequisites and fixed releases, including enterprise-only alternatives.
checklist:
- title: Inventory the resolved version and vulnerable features
  hint: Inspect Maven dependency:tree or Gradle dependencies for the deployed spring-security artifacts. Trace external binding to ELRequestMatcher properties, reachable reactive/RSocket authentication, WebAuthn operations, IP-based rules and ClientRegistration output; dependency presence alone does not prove exploitability.
- title: Use the correct fixed release and support channel
  hint: Use 7.1.3 or 7.0.9 from OSS, or the corresponding enterprise release listed below. Older listed fixes require enterprise support; unsupported lines should migrate to a fixed supported line. Rebuild and redeploy, then verify the resolved runtime version and test authentication, authorization and RSocket behavior.
- title: Check configuration-specific exposure
  hint: For RCE, verify attacker-controlled input can reach the matcher property. RSocket risk requires the default converter path; WebAuthn risk requires an already cloned valid authenticator. IP-rule risk requires cross-family address presentation. Review the individual advisories rather than assuming every Spring application is remotely exploitable.
- title: Review possible client-secret output
  hint: Search approved logging and exception paths for ClientRegistration output without copying secrets into tickets. As general incident-response guidance, restrict exposed logs and rotate affected OAuth2 client secrets if disclosure is found. An upgrade prevents future output but does not erase previous logs; do not infer that a secret was stolen merely because the dependency was present.
sources:
- name: Spring Security CVE-2026-59273
  url: https://spring.io/security/cve-2026-59273/
  primary: true
  says: External input bound to an ELRequestMatcher bean property can execute unrestricted SpEL in the application process.
- name: Spring Security CVE-2026-59329
  url: https://spring.io/security/cve-2026-59329/
  primary: true
  says: A reachable reactive authentication endpoint using AbstractUserDetailsReactiveAuthenticationManager or a subclass can reveal valid usernames through response timing.
- name: Spring Security CVE-2026-59330
  url: https://spring.io/security/cve-2026-59330/
  primary: true
  says: On 7.0.0–7.0.8 and 7.1.0–7.1.2, Webauthn4JRelyingPartyOperations fails to reject a non-incrementing signature counter; an attacker must already have a cloned authenticator producing valid assertions.
- name: Spring Security CVE-2026-59331
  url: https://spring.io/security/cve-2026-59331/
  primary: true
  says: Reachable RSocket endpoints retaining BasicAuthenticationPayloadExchangeConverter as the AuthenticationPayloadInterceptor converter can allocate excessive memory from crafted metadata.
- name: Spring Security CVE-2026-59333
  url: https://spring.io/security/cve-2026-59333/
  primary: true
  says: On 7.1.0–7.1.2, configured IP restrictions can match across IPv4/IPv6 families when the network stack presents a different family with matching leading bytes.
- name: Spring Security CVE-2026-59400
  url: https://spring.io/security/cve-2026-59400/
  primary: true
  says: ClientRegistration.toString() includes the client secret; logging, concatenation or exception output can expose it to an unintended destination.
---

The RCE requires an application to bind untrusted input to an ELRequestMatcher-typed bean property; unrestricted reflection and method calls in SpEL then run with the application’s privileges. This is not a claim that ordinary request matching alone permits code execution. L3 reflects a mainstream security library with conditional RCE; these advisories do not establish observed victims or exploitation.

Affected ranges differ. For the RCE and client-secret issue, Spring lists 7.1.0–7.1.2, 7.0.0–7.0.8, 6.5.0–6.5.12, 6.4.0–6.4.19, 5.8.0–5.8.28 and 5.7.26 or earlier. Reactive timing lists 5.7.0–5.7.26 for the oldest range, with the other listed ranges unchanged. RSocket additionally spans 6.0.0–6.4.19, and lists 5.7.0–5.7.26. WebAuthn affects only the listed 7.0 and 7.1 ranges; cross-family IP matching affects only 7.1.0–7.1.2. Do not apply one flaw’s affected range to all six.

The table retains all eight vendor-listed fixes without converting enterprise versions into OSS releases. The advisories require upgrading and state no additional mitigation is needed after the fix. Local exposure review and historical-log investigation are general operational guidance, not an additional vendor-mandated universal reset.
