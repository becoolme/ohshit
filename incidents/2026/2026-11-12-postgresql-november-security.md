---
title: PostgreSQL fixes 52 vulnerabilities across server, replication and backup tools
level: 3
date: 2026-11-12
tags: [PostgreSQL, Database, Security update]
summary: PostgreSQL 18.7, 17.12, 16.16, 15.20 and 14.25 fix 52 vulnerabilities. Some let database object creators, a compromised replication publisher or a crafted backup archive reach OS code execution. PostgreSQL 14.25 is the final upstream release for 14.
splash: Older PostgreSQL 14–18 servers and client tools. Exposure depends on database privileges, replication setup or the backup being restored.
wipe: Patch servers and client tools. Take a new full backup if you use incrementals, and plan migration off PostgreSQL 14.
inTheWild: unknown
inTheWildNote: The upstream release and advisories reviewed do not report confirmed exploitation.
fixed:
- { product: PostgreSQL 18, version: '18.7' }
- { product: PostgreSQL 17, version: '17.12' }
- { product: PostgreSQL 16, version: '16.16' }
- { product: PostgreSQL 15, version: '15.20' }
- { product: PostgreSQL 14, version: '14.25', status: Final upstream release }
cves:
- id: CVE-2026-120143
  score: 8.8
  name: Trigger cursor use after free
  description: A database object creator can use a cursor over a trigger transition table to run code as the database server's OS user.
- id: CVE-2026-120145
  score: 8.8
  name: Logical replication authorization gap
  description: A compromised publisher can target subscriber system catalogs to run code as the subscriber server's OS user when the subscription is owned by a database superuser.
- id: CVE-2026-116314
  score: 8.8
  name: Code execution during archive restore
  description: Running a vulnerable pg_restore on a crafted non-plain archive can execute code under the OS account running the restore.
- id: CVE-2026-116330
  score: 8.8
  name: psql command injection via tar restore script
  description: A compromised source server can influence a tar dump so that running its restore.sql with psql executes code as the client OS user.
- id: CVE-2026-116322
  score: 5.3
  name: Pre-authentication PostgreSQL 18 restart
  description: A network client can cause a server restart by timing a cancellation request to race with the authentication timeout. This flaw affects major version 18 only.
timeline:
- date: Nov 12, 2026
  title: PostgreSQL publishes the fixes and ends upstream support for version 14
  body: The project ships updates for stable branches 14–18 and includes applicable fixes in PostgreSQL 19 RC 2.
checklist:
- title: Patch running servers and every copy of the affected client tools
  hint: Run SHOW server_version on each primary and standby, and check pg_dump, pg_restore and psql versions in backup images and automation. For a minor update, stop the server, install the fixed binaries for its branch, restart and verify the running version. Managed deployments should check the provider’s rollout and version on each instance.
- title: Review SQL privileges, logical replication and restore inputs
  hint: Prioritize servers where untrusted roles can create objects and subscribers that use superuser-owned subscriptions. Inspect subscription ownership and publisher trust. Restrict database network access and avoid restoring untrusted archives. Treat a suspected execution path as an incident on the corresponding server or restore host.
- title: Refresh backups and apply the release’s maintenance steps
  hint: If you use incremental backups, take a fresh full backup after the update, use it as the next baseline and verify a restore. Check the release notes for affected GIN indexes, pg_trgm GiST indexes using gist_trgm_ops, B-tree indexes on lengthless bpchar, TOAST errors and partition constraints. Review any skipped releases for additional steps.
- title: Schedule the PostgreSQL 14 major upgrade
  hint: Apply 14.25 to existing 14 instances and plan a supported-major migration. Test the upgrade and rollback using a verified backup and the target version’s upgrade guide.
sources:
- name: PostgreSQL release announcement
  url: https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/
  primary: true
  says: Lists all 52 issues, release versions, end of support for 14 and post-update tasks.
- name: PostgreSQL 18.7 release notes
  url: https://www.postgresql.org/docs/release/18.7/
  primary: true
  says: Describes branch-specific changes and additional maintenance steps.
---
The November 12 PostgreSQL batch addresses database privilege boundaries, memory safety, replication and administrative utilities. The project publishes the [complete list of 52 CVEs](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/#security-issues), with a separate affected-version table for each advisory.

The server-side paths differ. [CVE-2026-120143](https://www.postgresql.org/support/security/CVE-2026-120143/) needs an object creator. [CVE-2026-120145](https://www.postgresql.org/support/security/CVE-2026-120145/) needs a compromised publisher and a subscription owned by a superuser. [CVE-2026-116322](https://www.postgresql.org/support/security/CVE-2026-116322/) is reachable before login and can restart a vulnerable PostgreSQL 18 server.

Upgrade the client tools wherever they run. [CVE-2026-116314](https://www.postgresql.org/support/security/CVE-2026-116314/) affects the host that runs pg_restore on a crafted non-plain archive. [CVE-2026-116330](https://www.postgresql.org/support/security/CVE-2026-116330/) affects the host running psql on the restore script inside a tar dump from a compromised server. A minor server upgrade can be done in place without pg_upgrade or a dump and reload. The release's backup and index instructions still apply.

L3 reflects the breadth of the affected PostgreSQL installations and the potential for OS code execution under the stated prerequisites. The reviewed upstream material does not identify compromised deployments or report in-the-wild exploitation.
