---
title: GitHub flags Univer Sheets Pivot Chart npm release 1.5.0 as malware
level: 3
date: '2026-11-16'
tags: [Univer, npm, supply chain]
ecosystems: [node]
summary: GitHub lists @univerjs-pro/sheets-pivot-chart 1.5.0 as malware. npm no longer lists that release for installation. Check affected builds, rebuild with verified packages and rotate accessible credentials.
splash: Applications, CI runners and development hosts that installed or ran @univerjs-pro/sheets-pivot-chart 1.5.0.
wipe: Remove the flagged version, rebuild on clean infrastructure and rotate credentials available to affected hosts.
inTheWild: unknown
inTheWildNote: GitHub flagged the release. No downstream compromise is confirmed in the advisory.
cves:
- id: GHSA-h6jf-g8cj-x4v3
  name: Malicious Sheets Pivot Chart release
  description: GitHub identifies 1.5.0 as malware and advises treating machines that installed or ran it as compromised.
timeline:
- date: Nov 14, 09:49 UTC
  title: npm records publication of 1.5.0
- date: Nov 16, 00:14 UTC
  title: GitHub publishes a malware advisory
  body: npm retains the publication timestamp. The version has disappeared from its installable release list, which now points latest to 1.4.0.
checklist:
- title: Identify affected builds
  hint: Search npm, pnpm and Yarn lockfiles, registry logs, software bills of materials and artifact metadata for @univerjs-pro/sheets-pivot-chart 1.5.0. Include CI workers, custom Worker bundles and transitive installs. A lockfile match warrants investigation and cannot establish execution on its own.
- title: Isolate affected hosts and rotate credentials
  hint: Isolate developer machines and runners that installed or ran the version. Preserve lockfiles, logs and cached artifact hashes. From a clean machine, revoke and replace exposed registry, repository, cloud and signing credentials as applicable. Inspect issuer and deployment logs for unexpected use.
- title: Replace affected artifacts and deployments
  hint: Pin a verified compatible package set and exclude 1.5.0 from resolution. npm currently lists 1.4.0 as latest for this package. Quarantine suspect caches and outputs, rebuild on clean infrastructure and replace browser or worker bundles that included 1.5.0.
sources:
- name: GitHub malware advisory
  url: https://github.com/advisories/GHSA-h6jf-g8cj-x4v3
  primary: true
  says: Identifies the affected npm version and recommends removal and credential rotation.
- name: npm package metadata
  url: https://registry.npmjs.org/@univerjs-pro%2fsheets-pivot-chart
  primary: true
  says: Records the earlier 1.5.0 publication and currently points latest to 1.4.0.
- name: npm per-version download data
  url: https://api.npmjs.org/versions/%40univerjs-pro%2Fsheets-pivot-chart/last-week
  primary: true
  says: Reported 458 downloads of 1.5.0 in the rolling period checked on November 16.
- name: Univer Pivot Charts documentation
  url: https://docs.univer.ai/guides/sheets/features/pivot-chart
  primary: true
  says: Documents the package as part of its spreadsheet pivot chart integration.
---

Univer documents this npm package for spreadsheet integrations. GitHub’s advisory names only **`@univerjs-pro/sheets-pivot-chart@1.5.0`**. Check the exact package name and version in each build because other Univer packages have their own release records.

The npm registry retains the November 14 publication timestamp. On November 16, the version metadata endpoint returned 404 for 1.5.0, and the package’s latest tag pointed to the earlier 1.4.0 release. GitHub lists no patched version. npm’s per-version endpoint recorded **458 downloads** of 1.5.0 during its rolling reporting period. The count can include repeat downloads and cannot establish the number of installations or compromised systems.

GitHub recommends treating machines that installed or ran the version as compromised. Its advisory gives no payload details, indicators or findings about the publisher account. Removing the version addresses future installs. Check and clean existing hosts and outputs separately.
