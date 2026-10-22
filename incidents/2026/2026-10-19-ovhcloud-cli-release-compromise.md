---
title: OVHcloud CLI release binaries replaced with credential-stealing builds on GitHub
headline: "OVHcloud CLI: same release tag, different plumbing"
level: 4
tags:
  - supply chain
  - GitHub
  - credentials
ecosystems:
  - ovhcloud
summary: A hijacked GitHub account replaced binaries on OVHcloud CLI releases 0.11.0–0.15.0. Investigators place the replacement window at 12:47–14:21 UTC on October 19. Source builds and Docker images were not replaced; running a poisoned binary exposes machine-readable secrets.
splash: Users who downloaded affected OVHcloud CLI release assets during the October 19 replacement window
wipe: Isolate affected hosts, rotate readable credentials from a clean machine, and reinstall the verified 0.16.0 release
inTheWild: yes
inTheWildNote: Malicious release assets distributed through the official repository
fixed:
  - product: OVHcloud CLI
    version: 0.16.0
    status: Clean immutable release with attestation
timeline:
  - date: Oct 19, 12:47–14:21 UTC
    title: Existing GitHub release assets replaced and then removed
  - date: Oct 19, 17:16 UTC
    title: Clean 0.16.0 release published with immutable assets
checklist:
  - title: Check install and CI download history for October 19
  - title: Isolate machines that executed a replaced binary
  - title: Rotate every readable credential from a trusted machine
  - title: Install 0.16.0 and verify provenance and pinned hashes
sources:
  - name: "OVHcloud repository issue #300"
    url: https://github.com/ovh/ovhcloud-cli/issues/300
    primary: true
    says: Reporter documents replaced release assets and build metadata
  - name: OVHcloud 0.16.0 release
    url: https://github.com/ovh/ovhcloud-cli/releases/tag/v0.16.0
    primary: true
    says: Published October 19; immutable release with attestation
  - name: OpenSourceMalware
    url: https://opensourcemalware.com/blog/glassworm-hacks-ovh-clouds-cli-tool
    primary: true
    says: Reconstructs UTC exposure window; source builds and Docker unaffected; GlassWorm attribution remains an assessment
date: 2026-10-19
---

A version pin alone did not prevent exposure: attackers changed the files behind existing release URLs. Reinstalling removes the binary, but cannot revoke secrets it already read. The number of downloads and the full initial-access path remain unknown. L4 reflects malicious distribution of a cloud administration tool.
