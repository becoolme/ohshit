---
title: ARTEX operators steal iOS signing credentials and tamper with an app delivery bucket
level: 4
date: 2026-11-05
tags: [ARTEX, supply chain, code signing]
summary: Check Point reports ARTEX-driven theft from ten iOS signing shops, taking over 300 certificates/passwords, with three passing signing validation. A separate operation rewrote a crypto app delivery manifest after an API leaked AWS credentials, but no successful crypto theft was observed. These are distinct campaigns, not proof of an Apple platform breach.
splash: Operators of signing shops, application delivery buckets and credential stores exposed through vulnerable APIs or weak access controls
wipe: Audit signing keys and delivery manifests; revoke exposed credentials, remove public secrets and restore trusted app artifacts
inTheWild: yes
inTheWildNote: Check Point inspected exposed operator databases and reports executed compromises.
cves: []
fixed: []
timeline:
  - date: Oct 14–29, 2026
    title: Two consoles target ten signing shops
    body: Check Point dates the certificate-theft operation to this period.
  - date: Nov 5, 2026
    title: Check Point publishes operator-side research
    body: The signing theft and separate S3 manifest modification are observed compromises; attempted wallet drains do not establish stolen funds.
checklist:
  - title: Revoke exposed signing material and access credentials
    hint: Review .p12 stores, passwords, private-key access and provisioning profiles. Revoke affected certificates through the issuer and replace keys. Inspect frontend bundles for hardcoded administrator secrets and APIs for missing authorization; rotate exposed AWS credentials and restrict bucket writes. These are containment steps inferred from the observed paths, not a vendor patch.
  - title: Verify app delivery against a trusted baseline
    hint: Compare manifest.plist package URLs, index.html redirects and delivered IPA signatures with approved artifacts. Preserve logs before restoring; a restored manifest alone cannot rule out prior malicious delivery. The reported crypto wallet showed no transactions, not proof that every affected service was unharmed.
  - title: Hunt the complete published infrastructure set with context
    hint: 'Check Point lists these network pivots: 38.11.173.1–125, 38.11.221.1–125, 198.200.59.85–89; 103.122.245.194, 103.122.245.198, 103.122.245.199, 103.122.245.204, 103.122.245.214, 103.122.245.215, 103.122.245.216, 103.122.245.217, 103.122.245.218, 103.122.245.219; 192.236.172.197, 198.44.123.66, 204.44.66.81, 104.168.112.237. These are broader ARTEX clusters, not a confirmed certificate-campaign blocklist. A match or shared dev tag alone does not prove compromise or common control.'
sources:
  - name: Check Point Research original console investigation
    url: https://research.checkpoint.com/2026/hacking-on-autopilot-inside-artex-cybercrime-campaigns/
    primary: true
    says: November 5 report; campaign evidence, validation limits, delivery tampering and full infrastructure table.
  - name: Check Point accompanying research summary
    url: https://blog.checkpoint.com/research/inside-artex-how-autonomous-ai-agents-are-being-used-in-real-world-cyberattacks
    primary: true
    says: Same research origin, not independent corroboration; confirms certificate validation and separate campaign boundaries.
---

Check Point reports more than 300 certificates and passwords taken from signing shops; three passed its described usability checks. This compromises signing material, not Apple’s signing infrastructure. Names and final revocation status are undisclosed.

In a separate crypto operation, leaked AWS credentials enabled an app-distribution bucket rewrite; the owner later restored the manifest. The reported wallet stayed empty. Another operation extracted gaming credentials; its validity estimate came from sampling, not a confirmed count of newly compromised users.

L4 reflects observed credential theft and supply-chain modification. No shared actor is established with [WorkOS](/incidents/workos-internal-gtm/) or other ARTEX-linked incidents merely because the same tool appears.
