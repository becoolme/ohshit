---
title: WPPConnect releases carry a credential and WhatsApp session stealer
level: 4
date: '2026-11-16'
updated: '2026-11-25'
tags: [WPPConnect, npm, Docker, supply chain]
ecosystems: [node]
summary: Malicious WPPConnect code shipped through its release pipeline in two npm packages, a GitHub nightly and Docker images. It collects process secrets and WhatsApp session data for a Telegram bot. npm no longer lists the two malicious releases; the publishing investigation remains open.
splash: Hosts that ran the affected WhatsApp automation library, server, nightly or container images.
wipe: Pin the prior npm versions and verify image digests. Rebuild from clean artifacts, rotate accessible secrets and revoke linked WhatsApp sessions.
inTheWild: 'yes'
inTheWildNote: Researchers confirmed malicious public releases. The number of affected hosts is unknown.
cves:
- id: GHSA-rj96-rg6c-9hw8
  name: Malicious WPPConnect library release
  description: Importing library 2.4.1 loads a module that collects host data and session tokens.
- id: GHSA-96hm-h5v4-92fq
  name: Malicious WPPConnect server release
  description: Starting server 2.10.82 loads a similar module. Its library dependency provides a second execution path.
timeline:
- date: Nov 15, 22:34 UTC
  title: Malicious commits land on the library branch
  body: StepSecurity traced the module and its import to unsigned commits on the default branch. The release workflow then ran.
- date: Nov 15, 23:31 UTC
  title: npm publishes library 2.4.1
  body: It becomes latest and carries a valid provenance attestation for the malicious build.
- date: Nov 16, 02:48–03:09 UTC
  title: Container images and the server package ship
  body: Docker images tagged 2.10.82 and 2.10.83 contain the payload. npm publishes server 2.10.82 at 03:09 UTC.
- date: Nov 16, 04:00 UTC
  title: Researcher publicly reports both npm releases
  body: The project’s default branches were force-pushed shortly after the issues opened. Both affected npm versions were deprecated. The library’s latest tag returned to 2.4.0. The server’s 2.10.82 was never tagged latest.
- date: Nov 17, 2026
  title: GitHub publishes two malware advisories
  body: GitHub lists the affected npm versions. These remain separately identifiable from the Docker and nightly artifacts.
- date: Nov 22, 18:09 UTC
  title: Project member reports registry removal, with build provenance unresolved
  body: joaosouz4dev reports library latest at 2.4.6 and 2.4.1 no longer listed. The member found no original indicators in a bounded artifact inspection, but could not verify the build source or the authenticated push identity.
checklist:
- title: Stop affected processes and identify the exact artifacts
  hint: Check lockfiles, installed modules, release downloads and local or deployed container digests. Look for npm 2.4.1 and 2.10.82, Docker 2.10.82 and 2.10.83, and library nightlies obtained between November 15 22:35 UTC and November 16 03:53 UTC. Also check 2.4.3 and related pipeline artifacts; StepSecurity additionally recommends checking library 2.4.2 as a precaution, without establishing it as malicious.
- title: Rebuild using the earlier releases and pin transitive dependencies
  hint: Use library 2.4.0 and server 2.10.81. Set an npm override for @wppconnect-team/wppconnect if it is transitive, recreate the lockfile from a trusted baseline and verify the resolved versions in CI. If using Docker, verify that 2.10.81 matches sha256:7c882ee934a5663a107b5f5a0382bfd8b1fb95150cd21ab35cd8ff9cea70d1f8 instead of trusting a floating tag.
- title: Rotate secrets and revoke WhatsApp sessions
  hint: From a clean host, rotate secrets present in the process environment and working-directory configuration. Review activity for the affected accounts. Log out the affected WhatsApp linked devices, invalidate stored session data and re-pair only after the clean rebuild.
- title: Hunt for known collection and upload indicators
  hint: Check DNS and proxy logs for api[.]telegram[.]org and api[.]ipify[.]org. Correlate Telegram sendDocument requests for bot ID 9034051102 and chat ID 7343578055 with the affected process. StepSecurity lists more than ten indicators, including file paths, hashes and image digests. Both network services have legitimate uses, so a match alone does not prove compromise.
- title: Verify installed copies despite registry removal
  hint: The current registry omits library 2.4.1 and server 2.10.82, but this cannot remove installed modules, cached tarballs, nightlies or deployed images. Do not treat the newer latest tags as security clearance; retain the artifact checks, clean rebuild and credential/session revocation above.
sources:
- name: StepSecurity original artifact and release-pipeline investigation
  url: https://www.stepsecurity.io/blog/wppconnect-compromised-malicious-releases-steal-secrets-and-whatsapp-sessions
  primary: true
  says: Verifies payload behavior, release and image provenance, Docker digests, and containment gaps.
- name: WPPConnect library public disclosure
  url: https://github.com/wppconnect-team/wppconnect/issues/2968
  primary: true
  says: Original repository report documents the npm artifacts, trigger paths and collection targets.
- name: GitHub library malware advisory
  url: https://github.com/advisories/GHSA-rj96-rg6c-9hw8
  says: Identifies library 2.4.1 and its import-time behavior.
- name: GitHub server malware advisory
  url: https://github.com/advisories/GHSA-96hm-h5v4-92fq
  says: Identifies server 2.10.82 and its startup behavior.
- name: npm registry metadata for the library
  url: https://registry.npmjs.org/@wppconnect-team%2Fwppconnect
  primary: true
  says: Records historical publication times; the November 25 snapshot has latest 2.4.6 and no 2.4.1 version entry.
- name: npm registry metadata for the server
  url: https://registry.npmjs.org/@wppconnect%2Fserver
  primary: true
  says: The November 25 snapshot has latest 2.10.97, no 2.10.82 version entry, and a ^2.4.6 library dependency.
- name: Project member follow-up, November 22
  url: https://github.com/wppconnect-team/wppconnect/issues/2968#issuecomment-7083381178
  primary: true
  says: Reports library removal and limited marker checks; build source, push identity and the access/publishing investigation remain unresolved.
---

The module runs on import in the WhatsApp automation library and at startup in the server. It reads environment variables, files such as `.env` and `config.json`, and WhatsApp token files from the working directory. It looks up the host’s public IP, then attempts to send collected data to a Telegram bot. At the time of the malicious release, server 2.10.82’s `^2.3.6` library dependency could also resolve the malicious library unless pinned; the current registry state is described below.

StepSecurity found that the library’s valid npm provenance pointed to the compromised build, while the later Git tag pointed to different source. It verified the two affected Docker images and a GitHub nightly artifact. The floating image tags `latest`, `2` and `2.10` pointed to the 2.10.83 image until 03:54 UTC on November 16. Treat the `main` tag before 07:31 UTC that day as unverified. Package pipeline logs also reference library 2.4.3 and server 2.10.83, which were absent from the npm registry metadata examined. Check locally cached artifacts even after the registry rollback.

The 155 downloads that StepSecurity cited cover only part of the affected library’s time as npm latest. They cannot establish the number of installations, executions or successful uploads. The preliminary containment record also leaves control of the publishing account and revocation of the Telegram credentials unresolved.

On November 22, project member joaosouz4dev said the library’s 2.4.6 artifact lacked the original indicators in a bounded inspection, but its registry entry lacked a source commit and provenance attestation. The member did not identify who authenticated the unsigned pushes or which credential was used; association with an account is not attribution. The issue remains open.

The November 25 registry snapshot confirms library `latest` at 2.4.6 and server `latest` at 2.10.97; neither original malicious version appears in its package’s version map. The server now depends on library `^2.4.6`. Unlike the library entry, the server entry supplies a Git commit and provenance-attestation metadata. None of these metadata observations independently establishes that a replacement is clean or that the publishing access was secured. Earlier rollback/deprecation details describe the historical response; removal cannot clean previously obtained artifacts.
