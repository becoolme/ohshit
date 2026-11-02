---
title: Northflank reports control-plane secret exposure and requires key rotation
level: 4
date: 2026-10-30
updated: 2026-11-02
tags: [Northflank, cloud, credentials]
summary: Northflank says evidence points to control-plane secrets, with no sign of workload or workload-data access. It reports unauthorized AI-key use and requires all integration and project secrets to be rotated. Forward-deployed and dedicated control planes are reportedly unaffected; independent forensics remain ongoing.
splash: Northflank control-plane secrets; the vendor excludes forward-deployed and dedicated control planes
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
  - date: Oct 31, 23:31 UTC
    title: RabbitMQ rotation enabled for all customers
  - date: Nov 2, 11:09 UTC
    title: Control-plane scope and ongoing independent forensics disclosed
    body: Northflank believes the vector was contained within an hour of the first alert and reports no sign of subsequent attacker presence or workload-data access. It excludes forward-deployed and dedicated control planes, reiterates rotation of all integration and project secrets, and says customers have reported AI-key abuse.
checklist:
  - title: Replace credentials at their issuing services
    hint: From a trusted environment, disable or rotate keys stored in workloads, secret groups and global secrets; update dependent applications. Include all integration and project secrets, even without suspicious activity. Prioritize AI-provider keys, cloud and payment credentials, private keys, database credentials and other service credentials. Editing an environment-variable value alone does not revoke the old key. Review provider usage and billing for abuse.
  - title: Finish database credential rotation
    hint: For Postgres and MongoDB, the addon API creates replacement credentials but keeps old ones valid until finalisation. Update clients, verify connections, then finalise the rotation to remove old credentials; do not assume enabling rotation completed revocation. MySQL and Redis now also support rotation, with the distinct steps below.
  - title: Choose the MySQL rotation scope
    hint: Usernames stay unchanged. The default user-facing mode rotates user passwords; full mode also rotates internal passwords and restarts the addon. Both modes keep old passwords until finalisation. Update clients before finalising; user-facing finalisation disconnects affected sessions, while full finalisation restarts the addon.
  - title: Plan the Redis restart and client reconnects
    hint: Redis rotation restarts the addon and revokes old credentials in one step; clients must reconnect with the new password. Redeploy linked services yourself. Do not call the finalisation endpoint for Redis. Nonpersistent Redis is unsupported, and Sentinel requires at least three replicas; check your deployment before starting.
  - title: Plan MinIO rotation and backup handling
    hint: Rotation restarts every node and finishes in one step; do not call finalisation. Only the secret key changes; the access key, existing users and their access keys stay valid. Review those separately and update clients. Old-key console sessions, temporary credentials and presigned URLs stop working. A pre-rotation backup restores the old secret key, so rotate again after such a restore.
  - title: Choose RabbitMQ scope, then finalise
    hint: Default user-facing mode changes account usernames and passwords; full also rotates the Erlang cookie and pauses the entire addon, interrupting connections. Failure can leave it paused; retries retain the saved mode. Both modes keep old accounts until finalisation. Update clients first, then finalise to remove old accounts; finalisation does not pause again, but some old sessions can remain open, so check and close them.
  - title: Sign in again and reconnect revoked integrations
    hint: Where able to act for customers, Northflank says it revoked Northflank access tokens and sessions, VCS integrations, cross-account IAM roles and service accounts. Sign in again and reconnect affected integrations through your established Northflank access route. This does not replace rotating credentials at their issuing services.
  - title: Check disconnected BYOC clusters with support
    hint: Northflank separately reports patching CVE-2026-98432 across its fleet, including BYOC clusters with an active integration. If your BYOC cluster is no longer connected, contact support@northflank.com. This patch is not a published explanation of the breach or a replacement for secret rotation.
  - title: Restrict exposed addons
    hint: Disable addon public access where enabled, as Northflank requests; follow the official status notice for recovery updates.
  - title: Review available audit and provider logs
    hint: Northflank has enabled audit logs for all tiers. Review those logs alongside AI-provider usage and billing; contact your AI provider directly about unexpected usage or spending and report suspicious usage to Northflank support (support@northflank.com or your existing direct channel). Log availability does not establish complete historical coverage or prove that an account is unaffected.
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

The rotation precaution does not prove every secret was stolen. Northflank says evidence focuses on control-plane secrets, with no sign that workloads or their data were accessed; it says forward-deployed and dedicated control planes were unaffected. Confirm your deployment type with support if uncertain. Its belief that the vector was contained within an hour of the first alert is not a guarantee that stolen keys can no longer be abused. Independent forensic review is ongoing, with a root-cause report planned after findings are confirmed; the entry point, attacker identity, full exposure window and victim count remain unpublished.

The fleet patch for CVE-2026-98432 is described separately, not as the cause or a credential-recovery fix. Northflank also reports intermittent degradation during its own key rotation and hardening. Rotating only database credentials leaves other stored keys in scope.
