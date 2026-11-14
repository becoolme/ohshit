---
title: ARTEX operators steal iOS signing credentials and tamper with an app delivery bucket
level: 4
date: 2026-11-05
updated: 2026-11-14
tags: [ARTEX, supply chain, code signing]
summary: Check Point reports an ARTEX operator targeted ten iOS signing shops and took over 300 certificates with their passwords. Three passed validation; the number of breached shops is unknown. A separate operation rewrote a crypto app delivery manifest after an API leaked AWS credentials, with no observed crypto theft. No Apple platform breach was reported.
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
  - date: Nov 13, 2026
    title: FBI publishes ARTEX detection and hardening guidance
    body: The bulletin compiles indicators from multiple operations without revising the scope of the two app supply-chain campaigns. It recommends checking exposed administration interfaces, API authorization and secrets embedded in builds.
checklist:
  - title: Revoke exposed signing material and access credentials
    hint: Review .p12 stores, passwords, private-key access and provisioning profiles. Revoke affected certificates through the issuer and replace keys. Inspect frontend bundles for hardcoded administrator secrets and APIs for missing authorization; rotate exposed AWS credentials and restrict bucket writes. These are containment steps inferred from the observed paths, not a vendor patch.
  - title: Verify app delivery against a trusted baseline
    hint: Compare manifest.plist package URLs, index.html redirects and delivered IPA signatures with approved artifacts. Preserve logs before restoring; a restored manifest alone cannot rule out prior malicious delivery. The reported crypto wallet showed no transactions, not proof that every affected service was unharmed.
  - title: Check the infrastructure reported by Check Point
    hint: 'Check Point lists these network pivots: 38.11.173.1–125, 38.11.221.1–125, 198.200.59.85–89; 103.122.245.194, 103.122.245.198, 103.122.245.199, 103.122.245.204, 103.122.245.214, 103.122.245.215, 103.122.245.216, 103.122.245.217, 103.122.245.218, 103.122.245.219; 192.236.172.197, 198.44.123.66, 204.44.66.81, 104.168.112.237. These are broader ARTEX clusters, not a confirmed certificate-campaign blocklist. A match or shared dev tag alone does not prove compromise or common control.'
  - title: Correlate suspicious activity with the FBI bulletin
    hint: Check portal and API logs for sequential enumeration, egress logs for unusual data transfers, and unexpected web paths for .aspx or .jsp files. The bulletin lists 24 historical IPs from other ARTEX operations (38.244.50.120, 144.172.64.60, 144.172.64.99, 144.172.64.128, 187.15.88.186, 187.15.90.217, 187.15.89.186, 101.53.80.20, 205.214.59.31, 124.155.252.63, 154.201.79.246, 23.248.249.90, 23.158.220.98, 103.248.148.84, 203.160.133.172, 209.209.85.38, 199.19.95.66, 199.19.95.67, 199.19.95.68, 91.92.240.238, 85.11.168.45, 178.16.54.129, 31.77.229.35, 85.11.167.52) and the reseller domain xcai.pro. Investigate unexpected calls to api.anthropic.com, api.deepseek.com, open.bigmodel.cn or api.x.ai alongside other suspicious activity. Use the bulletin to identify the campaigns behind each indicator and its CSV to import the list. Corroborate matches before blocking; one match does not prove compromise.
sources:
  - name: Check Point Research original console investigation
    url: https://research.checkpoint.com/2026/hacking-on-autopilot-inside-artex-cybercrime-campaigns/
    primary: true
    says: November 5 report; campaign evidence, validation limits, delivery tampering and full infrastructure table.
  - name: Check Point accompanying research summary
    url: https://blog.checkpoint.com/research/inside-artex-how-autonomous-ai-agents-are-being-used-in-real-world-cyberattacks
    primary: true
    says: Same research origin, not independent corroboration; confirms certificate validation and separate campaign boundaries.
  - name: FBI ARTEX bulletin FLASH-20261113-001
    url: https://www.ic3.gov/CSA/2026/261113.pdf
    primary: true
    says: Provides historical indicators, detection advice and mitigations across campaigns without revising the scope of the signing theft.
  - name: FBI companion indicator table
    url: https://www.ic3.gov/CSA/2026/261113.csv
    primary: true
    says: Lists downloadable historical indicators and advises correlating them with other findings.
---

Check Point reports more than 300 certificates and passwords taken from signing shops; three passed its described usability checks. This compromises signing material, not Apple’s signing infrastructure. These research counts are not independently verified; affected organizations and final revocation status are undisclosed. The earlier summary described ten shops as theft victims. Check Point reported ten targets and did not say how many were breached.

In a separate crypto operation, leaked AWS credentials enabled an app-distribution bucket rewrite; the owner later restored the manifest. The reported wallet stayed empty. Another operation extracted gaming credentials; its validity estimate came from sampling, not a confirmed count of newly compromised users.

L4 reflects observed credential theft and supply-chain modification. No shared actor is established with [WorkOS](/incidents/workos-internal-gtm/) or other ARTEX-linked incidents merely because the same tool appears.

The November 13 FBI bulletin cites Check Point and summarizes other ARTEX operations. It provides no evidence that one actor ran those operations and no update on certificate revocation or financial losses for the campaigns here. On public portals, enforce server-side authorization on each data request and rate-limit endpoints. Scan configuration, CI pipelines and build artifacts for secrets. Restrict distribution and deployment administration to trusted networks.
