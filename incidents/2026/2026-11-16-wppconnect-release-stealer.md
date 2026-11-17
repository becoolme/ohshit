---
title: WPPConnect releases carry a credential and WhatsApp session stealer
level: 4
date: '2026-11-16'
tags: [WPPConnect, npm, Docker, supply chain]
ecosystems: [node]
summary: Malicious WPPConnect code shipped through its release pipeline in two npm packages, a GitHub nightly and Docker images. It collects process secrets and WhatsApp session data for a Telegram bot. npm rolled back its latest tags.
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
  body: The project’s default branches were force-pushed shortly after the issues opened. npm moved the latest tags back and deprecated the two affected versions.
- date: Nov 17, 2026
  title: GitHub publishes two malware advisories
  body: GitHub lists the affected npm versions. These remain separately identifiable from the Docker and nightly artifacts.
checklist:
- title: Stop affected processes and identify the exact artifacts
  hint: Check lockfiles, installed modules, release downloads and local or deployed container digests. Look for npm 2.4.1 and 2.10.82, Docker 2.10.82 and 2.10.83, and nightlies from the affected window. Also check 2.4.3 and related pipeline artifacts as described in StepSecurity’s report.
- title: Rebuild using the earlier releases and pin transitive dependencies
  hint: Use library 2.4.0 and server 2.10.81. Set an npm override for @wppconnect-team/wppconnect if it is transitive, recreate the lockfile from a trusted baseline and verify the resolved versions in CI. If using Docker, verify the known-good digest for 2.10.81 in the research report instead of trusting a floating tag.
- title: Rotate secrets and revoke WhatsApp sessions
  hint: From a clean host, rotate secrets present in the process environment and working-directory configuration. Review activity for the affected accounts. Log out the affected WhatsApp linked devices, invalidate stored session data and re-pair only after the clean rebuild.
- title: Hunt for known collection and upload indicators
  hint: Check DNS and proxy logs for api[.]telegram[.]org and api[.]ipify[.]org. Correlate Telegram sendDocument requests for bot ID 9034051102 and chat ID 7343578055 with the affected process. StepSecurity lists more than ten indicators, including file paths, hashes and image digests. Both network services have legitimate uses, so a match alone does not prove compromise.
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
  says: Shows the publication time, rollback to 2.4.0 and deprecation warning on 2.4.1.
- name: npm registry metadata for the server
  url: https://registry.npmjs.org/@wppconnect%2Fserver
  primary: true
  says: Shows the publication time, 2.10.81 latest tag, dependency range and deprecation warning on 2.10.82.
---

The module runs on import in the WhatsApp automation library and at startup in the server. It reads environment variables, files such as `.env` and `config.json`, and WhatsApp token files from the working directory. It looks up the host’s public IP, then attempts to send collected data to a Telegram bot. A server dependency range of `^2.3.6` for the library also allows a vulnerable install unless the resolved version is pinned.

StepSecurity found that the library’s valid npm provenance pointed to the compromised build, while the later Git tag pointed to different source. It verified the two affected Docker images and a GitHub nightly artifact. The floating image tags `latest`, `2` and `2.10` pointed to the 2.10.83 image until 03:54 UTC on November 16. Treat the `main` tag before 07:31 UTC that day as unverified. Package pipeline logs also reference library 2.4.3 and server 2.10.83, which were absent from the npm registry metadata examined. Check locally cached artifacts even after the registry rollback.

The 155 downloads that StepSecurity cited cover only part of the affected library’s time as npm latest. They cannot establish the number of installations, executions or successful uploads. The preliminary containment record also leaves control of the publishing account and revocation of the Telegram credentials unresolved.
