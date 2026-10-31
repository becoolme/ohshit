---
title: Northflank tells all users to rotate secrets after a security incident
level: 4
date: 2026-10-30
updated: 2026-10-31
tags: [Northflank, cloud, credentials]
summary: Northflank tells all users to assume environment variables are compromised and rotate workload, secret-group and global credentials immediately. Its notice reports multiple users confirming AI-key use; investigation remains open, with no published root cause or victim count.
splash: All Northflank users with credentials in workloads, secret groups or global secrets
wipe: Disable or rotate all exposed keys, update dependent workloads and disable public access to addons where enabled
inTheWild: yes
inTheWildNote: Northflank reports multiple users confirming AI-key use; total scope remains unknown.
cves: []
fixed: []
timeline:
  - date: Oct 30, 11:43 UTC
    title: Wiz alert prompts investigation
  - date: Oct 30, 13:40 UTC
    title: Northflank publicly requests immediate rotation
  - date: Oct 30, 15:12 UTC
    title: Postgres and MongoDB secret rotation enabled for all users
  - date: Oct 30, 19:28 UTC
    title: Broad rotation guidance remains; investigation ongoing
  - date: Oct 30, 23:38 UTC
    title: Provider-side revocation and abuse reporting reiterated
  - date: Oct 31, 01:04 UTC
    title: Audit logs enabled for every customer, including free users
  - date: Oct 31, 13:34 UTC
    title: MySQL and Redis secret rotation enabled for all customers
  - date: Oct 31, 22:32 UTC
    title: Minio addon secret rotation enabled for all customers
checklist:
  - title: Replace credentials at their issuing services
    hint: From a trusted environment, disable or rotate keys stored in workloads, secret groups and global secrets; update dependent applications. Editing an environment-variable value alone does not revoke the old key. Review provider usage and billing for abuse.
  - title: Finish database credential rotation
    hint: For Postgres and MongoDB, the addon API creates replacement credentials but keeps old ones valid until finalisation. Update clients, verify connections, then finalise the rotation to remove old credentials; do not assume enabling rotation completed revocation. MySQL and Redis now also support rotation, with the distinct steps below.
  - title: Choose the MySQL rotation scope
    hint: Usernames stay unchanged. The default user-facing mode rotates user passwords; full mode also rotates internal passwords and restarts the addon. Both modes keep old passwords until finalisation. Update clients before finalising; user-facing finalisation disconnects affected sessions, while full finalisation restarts the addon.
  - title: Plan the Redis restart and client reconnects
    hint: Redis rotation restarts the addon and revokes old credentials in one step; clients must reconnect with the new password. Redeploy linked services yourself. Do not call the finalisation endpoint for Redis. Nonpersistent Redis is unsupported, and Sentinel requires at least three replicas; check your deployment before starting.
  - title: Rotate Minio addon credentials
    hint: Northflank now enables secret rotation for Minio addons for all customers. Use the addon rotation controls, update every client using those credentials and verify that old credentials no longer work. The notice does not specify restart or finalisation semantics for Minio; do not assume the MySQL or Redis procedure applies.
  - title: Restrict exposed addons
    hint: Disable addon public access where enabled, as Northflank requests; follow the official status notice for recovery updates.
  - title: Review available audit and provider logs
    hint: Northflank has enabled audit logs for all tiers. Review those logs alongside AI-provider usage and billing; report suspicious usage to Northflank support and the relevant provider. Log availability does not establish complete historical coverage or prove that an account is unaffected.
sources:
  - name: Northflank original incident updates
    url: https://status.northflank.com/cmvv0rn5a092f14rutwccodpp
    primary: true
  - name: Northflank addon rotation API
    url: https://northflank.com/docs/v1/api/project/addons/rotate-addon-secrets?tab=api
    primary: true
  - name: Northflank rotation finalisation API
    url: https://northflank.com/docs/v1/api/project/addons/finalise-addon-secret-rotation?tab=api
    primary: true
  - name: Northflank live status updates
    url: https://status.northflank.com/
    primary: true
---

The platform-wide precaution is not proof every secret was stolen. The operator has not disclosed an entry point, attacker identity or complete exposure window. Network-policy patches are reported, but the notice does not declare containment complete or identify a software version that fixes customer exposure. Rotating only database credentials leaves other stored keys in scope.
