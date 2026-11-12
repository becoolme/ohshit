---
title: Red Hat Quay flaws expose registry signing and cross-tenant robot tokens
date: '2026-11-11'
level: 3
tags:
- Red Hat
- Quay
- containers
- registry
summary: One Quay flaw lets an unauthenticated client with access to /keys install a registry signing key. Another lets a user who can create a namespace steal robot tokens from matching tenants. Either path can expose or alter private images.
splash: Quay registries exposing /keys to untrusted clients and shared registries that let users create namespaces
wipe: Restrict /keys, deploy updates for both CVEs, audit signing keys and images, and rotate exposed robot tokens.
inTheWild: unknown
inTheWildNote: Red Hat’s disclosures do not report successful exploitation.
cves:
- id: CVE-2026-123710
  score: 9.8
  name: Registry token-signing key takeover
  description: An unauthenticated client that can reach /keys can use an anonymous token to register an approved signing key and forge tokens for any repository.
- id: CVE-2026-110697
  score: 9.9
  name: Cross-tenant robot token exposure
  description: An authenticated user able to create a namespace can use an underscore as a wildcard to retrieve robot account tokens from matching namespaces.
timeline:
- date: Nov 11, 2026
  title: Red Hat discloses two Quay vulnerabilities
  body: The two advisories describe abuse of signing-key rotation and theft of robot tokens across tenants.
- date: Nov 11, 2026
  title: Red Hat publishes updated Quay images
  body: The errata identify fixes for particular release streams. Red Hat also says Quay.io has been fixed for the robot-token issue.
checklist:
- title: Restrict access to the key service
  hint: At the reverse proxy or load balancer, allow only trusted internal components to reach /keys. Verify from an untrusted network that the route is blocked and from internal services that required access still works.
- title: Upgrade and verify coverage for both CVEs
  hint: Match the release and image digest to the erratum for CVE-2026-123710. Red Hat’s separate CVE-2026-110697 bulletin names these same Quay 3 releases as fixed: 3.9.28, 3.10.28, 3.12.24, 3.14.10, 3.15.9, 3.16.7, 3.17.7 and 3.18.3. Ask Red Hat to confirm coverage for other streams.
- title: Audit service signing keys and image changes
  hint: Preserve audit logs and inventory approved keys. Check service_key_rotate and service_key_delete events for a null expiration_date and correlate with expected key management. Remove unrecognized approved keys after closing the route. Investigate unusual pulls, pushes, digest changes and replaced tags. Redeploy affected workloads from verified digests if image integrity was compromised.
- title: Limit namespace creation and rotate exposed robot tokens
  hint: While patching, restrict who can create names containing underscores. Identify matching namespaces, revoke and replace potentially exposed robot tokens in Quay and update their CI and cluster secrets. Monitor pulls and pushes against expected robot usage.
sources:
- name: Red Hat signing-key advisory
  url: https://access.redhat.com/security/cve/CVE-2026-123710
  says: Describes the anonymous token path, affected packages, route restriction and audit events.
  primary: true
- name: Red Hat robot-token advisory
  url: https://access.redhat.com/security/cve/CVE-2026-110697
  says: Describes prerequisites, fixed versions, Quay.io status and interim mitigations.
  primary: true
- name: Red Hat RHSA-2026:99021
  url: https://access.redhat.com/errata/RHSA-2026:99021
  says: Lists CVE-2026-123710 in the 3.9.28 image erratum.
  primary: true
- name: Red Hat RHSA-2026:99022
  url: https://access.redhat.com/errata/RHSA-2026:99022
  says: Lists CVE-2026-123710 in the 3.16.7 image erratum.
  primary: true
- name: Red Hat RHSA-2026:99023
  url: https://access.redhat.com/errata/RHSA-2026:99023
  says: Lists CVE-2026-123710 in the 3.15.9 image erratum.
  primary: true
- name: Red Hat RHSA-2026:99024
  url: https://access.redhat.com/errata/RHSA-2026:99024
  says: Lists CVE-2026-123710 in the 3.14.10 image erratum.
  primary: true
- name: Red Hat RHSA-2026:99025
  url: https://access.redhat.com/errata/RHSA-2026:99025
  says: Lists CVE-2026-123710 in the 3.10.28 image erratum.
  primary: true
- name: Red Hat RHSA-2026:99026
  url: https://access.redhat.com/errata/RHSA-2026:99026
  says: Lists CVE-2026-123710 in the 3.17.7 image erratum.
  primary: true
- name: Red Hat RHSA-2026:99027
  url: https://access.redhat.com/errata/RHSA-2026:99027
  says: Lists CVE-2026-123710 in the 3.12.24 image erratum.
  primary: true
- name: Red Hat RHSA-2026:99019
  url: https://access.redhat.com/errata/RHSA-2026:99019
  says: Lists CVE-2026-123710 in the 3.18.3 image erratum.
  primary: true
---

Red Hat disclosed two separate authorization failures in Quay. CVE-2026-123710 lets a client reach the key rotation service with an anonymous registry token accepted as a rotation credential. The client can install a signing key without expiry, then mint tokens with access to private repositories or replace tags. The exposed route is /keys. Red Hat lists affected packages in Quay 3 and Quay 5. The November 11 errata linked below explicitly list the signing-key fix in 3.9.28, 3.10.28, 3.12.24, 3.14.10, 3.15.9, 3.16.7, 3.17.7 and 3.18.3. Consult the errata or Red Hat support for other streams.

CVE-2026-110697 requires an authenticated user who can create a namespace with an underscore. The underscore acts as a wildcard in robot-account lookup, returning credentials for another matching namespace. Red Hat confirms a Quay.io fix for this robot-token issue. For self-managed installations, verify both CVEs separately when selecting a build. Limit access during the rollout and review image digests and credentials before trusting affected artifacts.
