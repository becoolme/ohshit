---
title: ClickHouse patches unauthenticated server code execution across four release lines
level: 3
date: 2026-10-30
tags: [ClickHouse, database, RCE]
summary: ClickHouse discloses CVE-2026-116366, a conditional unauthenticated network RCE. Four open-source release lines have fixes; the vendor says Cloud and BYOC are already patched. The triggering conditions and affected interface are not disclosed, and exploitation is unconfirmed.
splash: Network-reachable self-managed ClickHouse servers before the listed fixes; exact trigger conditions undisclosed
wipe: Upgrade to a fixed build on a supported release line; verify every server, including bundled deployments
inTheWild: unknown
inTheWildNote: No vendor exploitation confirmation; CISA's October 30 assessment lists none.
cves:
  - id: CVE-2026-116366
    score: 9.5
    name: Unauthenticated server RCE
    description: The vendor CNA identifies an integer overflow or wraparound; an unauthenticated network user can execute code under undisclosed conditions. The 9.5 score is CVSS v4.0.
fixed:
  - { product: ClickHouse 26.10 stable, version: 26.10.3.7, status: Patched }
  - { product: ClickHouse 26.9 stable, version: 26.9.27.3, status: Patched }
  - { product: ClickHouse 26.8 LTS, version: 26.8.36.3, status: Patched }
  - { product: ClickHouse 26.3 LTS, version: 26.3.62.3, status: Patched }
  - { product: Other open-source release lines, version: none, status: Move to a supported line }
timeline:
  - date: Oct 25, 2026
    title: Fixed stable packages released
    body: Package index dates 26.10.3.7 and 26.9.27.3 to this day; a package date is not the disclosure date.
  - date: Oct 26, 2026
    title: Fixed LTS packages released
    body: Package index dates 26.8.36.3 and 26.3.62.3 to this day.
  - date: Oct 30, 10:59 UTC
    title: Vendor records public disclosure
    body: The CNA public date and October 30 security changelog establish the disclosure day; the CVE record was published at 11:00 UTC.
checklist:
  - title: Upgrade every self-managed server
    hint: Use the official package repository or verified archives for the listed stable/LTS builds or later fixes on the same line. Check each running server and any application that bundles ClickHouse; upgrading a client alone does not update its server. Older unsupported lines must move to a supported line.
  - title: Limit network reachability while patching
    hint: Allow server access only from trusted application and administrative networks using your firewall or security groups. This reduces exposure; it is not a verified workaround. The advisory does not identify a vulnerable port or interface, so do not assume filtering one listener fixes the issue.
  - title: Confirm managed-service status separately
    hint: The security changelog says all ClickHouse Cloud and BYOC deployments have received the fix. This does not cover independently operated installations or establish that no earlier compromise occurred; retain relevant logs and investigate unexplained activity.
sources:
  - name: ClickHouse security changelog
    url: https://clickhouse.com/docs/resources/changelogs/security-changelog
    primary: true
  - name: ClickHouse CNA record and CISA assessment
    url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/116xxx/CVE-2026-116366.json
    primary: true
  - name: Official ClickHouse packages and release dates
    url: https://packages.clickhouse.com/
    primary: true
  - name: ClickHouse supported security-update lines
    url: https://github.com/ClickHouse/ClickHouse/blob/master/SECURITY.md
    primary: true
---

The disclosed scope warrants L3 because ClickHouse is a mainstream database and the vendor confirms unauthenticated code execution. Authentication and user interaction are not required in the CNA vector, but attack complexity is high. Neither that score nor network exposure establishes that every reachable installation can be exploited: the vendor has not described the additional conditions.

No public exploit or victim count is established by these sources. The CISA assessment in the record is an October 30 snapshot, not proof that attacks cannot occur. No incident-specific hunting indicators are published there. The vendor does not connect this flaw to the separate Brotli vulnerability; do not infer a shared cause from nearby release dates.
