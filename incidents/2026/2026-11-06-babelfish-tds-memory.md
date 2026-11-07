---
title: Babelfish TDS handshake flaw can execute code before authentication
level: 3
date: '2026-11-06'
tags: [Babelfish, PostgreSQL, AWS, Aurora]
ecosystems: [postgresql]
summary: AWS fixes two TDS memory bugs in self-managed Babelfish and Aurora PostgreSQL with Babelfish. CVE-2026-119923 permits unauthenticated OS command execution as the database process user. CVE-2026-119924 requires a login. Restrict TCP 1433 and upgrade on the correct release line.
splash: Affected Babelfish deployments reachable over TDS. The handshake flaw requires no login. The RPC flaw requires authentication.
wipe: Restrict the TDS listener to trusted clients, upgrade the extension or Aurora cluster and apply pending maintenance.
inTheWild: unknown
inTheWildNote: AWS describes vulnerability impact and fixes. Its bulletin does not report exploitation.
cves:
- id: CVE-2026-119923
  score: 9.8
  name: Prelogin heap buffer overflow
  description: An unauthenticated remote client can send malformed TDS handshake input and potentially run OS commands as the database process user. AWS includes a related null-pointer finding in this record.
- id: CVE-2026-119924
  score: 8.1
  name: Out-of-bounds read in RPC parser
  description: An authenticated remote client can send a malformed TDS RPC request to read adjacent process memory or cause denial of service.
fixed:
- product: Babelfish for PostgreSQL 4.x
  version: 4.10.0
  status: Self-managed upstream fix
- product: Babelfish for PostgreSQL 5.x
  version: 5.6.0
  status: Self-managed upstream fix
- product: Babelfish for PostgreSQL 6.x
  version: 6.1.0
  status: Self-managed upstream fix
timeline:
- date: Nov 6, 2026
  title: AWS discloses the TDS handshake and RPC flaws
  body: The bulletin lists distinct login requirements, upstream extension targets and Aurora maintenance versions.
checklist:
- title: Find and restrict reachable Babelfish TDS listeners
  hint: Identify clusters with Babelfish enabled and the exact extension or engine version. Check firewall or RDS security-group rules for TCP 1433 by default, or the configured TDS port. Allow only required clients. Network restriction reduces exposure while you patch.
- title: Upgrade through the appropriate distribution
  hint: Use the linked upstream release and PostgreSQL-compatible upgrade instructions on self-managed deployments. On Aurora, use the matching engine and bundled Babelfish versions in the table below and apply pending maintenance. Check the running versions afterward and test TDS connectivity from a trusted client.
- title: Review suspicious database-host activity
  hint: Preserve network and database logs before changing the system. Look for unexpected TDS clients, crashes and unexpected child processes of the database service. Escalate evidence of code execution or memory access to incident response and scope any exposed credentials.
sources:
- name: AWS security bulletin 2026-166-AWS
  url: https://aws.amazon.com/security/security-bulletins/2026-166-aws/
  primary: true
  says: Lists affected Babelfish ranges, the separate prerequisites, upstream releases and Aurora version pairs.
- name: AWS CNA record for the handshake flaw
  url: https://cveawg.mitre.org/api/cve/CVE-2026-119923
  primary: true
  says: Describes potential database-user command execution, TDS-port restriction and the CVSS 3.1 score.
- name: AWS CNA record for the RPC flaw
  url: https://cveawg.mitre.org/api/cve/CVE-2026-119924
  primary: true
  says: Describes the authenticated memory read or denial of service and the CVSS 3.1 score.
---

The bugs affect the SQL Server-compatible TDS interface. AWS lists upstream Babelfish ranges 1.0–1.5, 2.1–2.15, 3.1–3.12, 4.0–4.8 and 5.1–5.4. Aurora has separate build-specific ranges and backports. Use the AWS bulletin for the full affected ranges and choose a supported upgrade path for the deployed engine.

The following pairs list Aurora PostgreSQL first and the bundled Babelfish version in parentheses. AWS lists these targets or later versions with pending maintenance applied.

| Aurora major | Patched targets |
| --- | --- |
| 13 | 13.9.16 (1.5.5), 13.23.3 (1.17.2) |
| 14 | 14.6.16 (2.3.5), 14.17.8 (2.12.4), 14.18.6 (2.13.3), 14.19.5 (2.14.2), 14.20.5 (2.15.2), 14.22.3 (2.16.1), 14.23.1 (2.17.0) |
| 15 | 15.10.8 (3.8.4), 15.12.8 (3.9.4), 15.13.6 (3.10.3), 15.14.5 (3.11.2), 15.15.5 (3.12.2), 15.17.3 (3.13.1), 15.18.1 (3.14.0) |
| 16 | 16.8.8 (4.5.5), 16.9.6 (4.6.3), 16.10.5 (4.7.2), 16.11.5 (4.8.2), 16.13.3 (4.9.1), 16.14.1 (4.10.0) |
| 17 | 17.4.8 (5.1.4), 17.5.6 (5.2.3), 17.6.5 (5.3.2), 17.7.5 (5.4.2), 17.9.3 (5.5.1), 17.10.1 (5.6.0) |
| 18 | 18.3.4 (6.0.2), 18.4.1 (6.1.0) |
