---
title: Northflank tells all users to rotate secrets after a security incident
level: 4
date: 2026-10-30
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
checklist:
  - title: Replace credentials at their issuing services
    hint: From a trusted environment, disable or rotate keys stored in workloads, secret groups and global secrets; update dependent applications. Editing an environment-variable value alone does not revoke the old key. Review provider usage and billing for abuse.
  - title: Finish database credential rotation
    hint: Northflank enabled rotation for Postgres and MongoDB. Its addon API creates replacement credentials but keeps old ones valid until finalisation. Update clients, verify connections, then finalise the rotation to remove old credentials; do not assume enabling rotation completed revocation.
  - title: Restrict exposed addons
    hint: Disable addon public access where enabled, as Northflank requests; follow the official status notice for recovery updates.
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
---

The platform-wide precaution is not proof every secret was stolen. The operator has not disclosed an entry point, attacker identity or complete exposure window. Network-policy patches are reported, but the notice does not declare containment complete or identify a software version that fixes customer exposure. Rotating only database credentials leaves other stored keys in scope.
