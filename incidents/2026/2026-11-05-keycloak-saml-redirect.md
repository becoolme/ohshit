---
title: Keycloak SAML redirect signature bypass permits federated-account takeover
level: 3
date: '2026-11-05'
tags:
- Keycloak
- SAML
- authentication
summary: Keycloak processes percent-encoded SAML parameter names that its signature checker overlooks, allowing unsigned messages to take over federated accounts. Upstream 26.8.2 includes the fix. Red Hat Build of Keycloak is affected, but its reviewed record supplies no fixed build; Red Hat Single Sign-On 7 is listed unaffected.
splash: Affected Keycloak SAML HTTP-Redirect identity-broker flows; an attacker needs network access, not an authenticated account.
wipe: Upgrade upstream Keycloak to 26.8.2; Red Hat customers must follow product-specific errata rather than assume the upstream version applies.
inTheWild: unknown
inTheWildNote: The reviewed vendor records do not establish exploitation or a victim count.
cves:
- id: CVE-2026-117691
  score: 9.1
  name: SAML HTTP-Redirect signature bypass
  description: Message processing accepts encoded parameter names while signature verification checks literal names. Red Hat supplies a draft CVSS 3.1 score of 9.1.
fixed:
- product: Upstream Keycloak
  version: 26.8.2
  status: Release explicitly lists CVE-2026-117691 / issue54714
timeline:
- date: Nov 5, 2026
  title: Upstream release and Red Hat record disclose the SAML flaw
  body: Keycloak 26.8.2 lists the fix; Red Hat describes unauthenticated federated-account takeover and distinguishes affected downstream products.
checklist:
- title: Identify affected SAML broker deployments
  hint: Inventory Keycloak servers, container images and configured identity providers; review flows using SAML HTTP-Redirect. The flaw concerns federated users and the affected binding, not every OIDC login. Red Hat lists Build of Keycloak as affected and Single Sign-On 7 as unaffected for this CVE.
- title: Apply the release appropriate to your distribution
  hint: Upstream operators should use official Keycloak 26.8.2 artifacts and read the release-linked migration guide before upgrading; confirm the actual running version after restarting or rolling out containers. Red Hat customers should check their product errata or support for a fixed build. The reviewed Red Hat record provides no accepted mitigation or downstream fixed-version threshold.
- title: Review suspicious federated sign-ins
  hint: As a defensive investigation step, preserve identity-broker, authentication and application audit records; review unexpected federated sessions and privilege use with your security team. If unauthorized sessions are found, revoke them through established response procedures. The vendor records publish no dedicated indicators or attack window; quiet logs do not prove safety.
sources:
- name: Keycloak original 26.8.2 release
  url: https://www.keycloak.org/2026/11/keycloak-2682-released
  primary: true
  says: November5 release lists issue54714/CVE-2026-117691 and points to migration guidance.
- name: Red Hat original CVE data
  url: https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-117691.json
  primary: true
  says: Original mechanism, draft9.1 CVSS3.1, affected Build of Keycloak, unaffected Single Sign-On7 and no accepted mitigation.
- name: Keycloak issue API
  url: https://api.github.com/repos/keycloak/keycloak/issues/54714
  primary: true
  says: November5 public issue names encoded-parameter signature bypass and broker login as any user; its body is empty.
---

The signature checker and SAML message processor disagree about encoded query-parameter names. A crafted unsigned message can consequently be processed in place of a signed message, giving access as a federated user and to that user's roles/data. This is a network-reachable authentication bypass; an existing authenticated attacker account is not required. The reviewed originals do not establish the full vulnerable-version range, active exploitation or confirmed victims.

Keycloak lists this fix in the broader 26.8.2 release. This article covers the newly disclosed SAML root cause; that release also contains other security fixes with their own conditions. Red Hat rates this flaw Important and publishes a draft CVSS 3.1 score of 9.1. Its downstream product labels do not establish that an upstream artifact is a supported Red Hat replacement. L3 reflects a concrete identity-boundary failure in a mainstream identity server.
