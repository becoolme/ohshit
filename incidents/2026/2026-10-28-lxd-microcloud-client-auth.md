---
title: LXD and MicroCloud allow client impersonation with a trusted public certificate
date: 2026-10-28
level: 3
tags: [LXD, MicroCloud, authentication]
summary: An attacker reaching the HTTPS API can impersonate a trusted client using its public certificate, without its private key. Host-root access depends on the impersonated identity's privileges.
splash: Reachable LXD or MicroCloud APIs where an attacker obtains a trusted client's public certificate
wipe: Refresh both snaps on their existing channels and verify the installed versions
inTheWild: unknown
inTheWildNote: Canonical confirms the flaw; its notice does not report active exploitation.
cves:
  - id: CVE-2026-112816
    name: Unverified client certificate chain
    description: Authentication checks intermediate certificates instead of requiring proof from the leaf certificate.
fixed:
  - { product: LXD 6/stable, version: 6.10.1 }
  - { product: LXD 5.21/stable, version: 5.21.9 }
  - { product: LXD 5.0/stable, version: 5.0.11 }
  - { product: LXD 4.0/stable, version: 4.0.15 }
  - { product: MicroCloud 2/stable, version: 2.1.5 }
  - { product: MicroCloud 3/stable, version: 3.4.1 }
timeline:
  - date: Oct 28, 17:50 UTC
    title: Canonical publishes advisory
  - date: Oct 29, 2026
    title: Listed fixed snaps released
checklist:
  - title: Update and verify both components
    hint: Run sudo snap refresh lxd and sudo snap refresh microcloud where installed; inspect snap list lxd microcloud against the table. LXD stable-channel rollout is progressive; a successful refresh alone does not establish a patched version. If still below the fix, restrict API access and contact Canonical.
sources:
  - name: Canonical advisory and complete snap matrix
    url: https://discourse.ubuntu.com/t/security-advisory-critical-vulnerability-found-in-canonical-lxd-and-microcloud/90557
    primary: true
---

MicroCloud joining-member certificates can also be intercepted and reused. A certificate alone is insufficient without API reachability. L3 reflects a mainstream daemon authentication bypass; exploitation and victim counts are unconfirmed.
