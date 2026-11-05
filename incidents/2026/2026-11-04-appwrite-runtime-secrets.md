---
title: Appwrite runtime attack exposes internal credentials; 1,022 projects told to rotate secrets
level: 4
date: '2026-11-04'
tags: [Appwrite, cloud, credentials, runtime]
summary: Appwrite confirms runtime exploitation and one customer's code access and brief modification. A separate token could read Frankfurt-hosted Function and Site secrets for about 11 hours; 1,022 projects are notified. No reads through that token were found, but audit logs are incomplete. Rotate listed secrets; self-hosters need 2.7.1.
splash: Notified Cloud projects on Frankfurt compute, including some other-region Sites; self-hosters allowing untrusted deployments.
wipe: Rotate affected secrets and redeploy; self-hosters upgrade to 2.7.1 and rotate the exposed executor secret where applicable.
inTheWild: 'yes'
inTheWildNote: Appwrite confirms runtime exploitation; bulk environment-variable reads remain unproven.
fixed:
- product: Appwrite self-hosted security release
  version: 2.7.1
  status: Includes the root-cause fix; credential rotation is still needed where exposed
- product: Bundled Open Runtimes executor
  version: 1.3.1
  status: Replaces executor 1.1.2 in the Appwrite security release
timeline:
- date: Oct 30–31, 2026
  title: Attacker first compromises one customer's application
  body: Appwrite attributes this initial access to the customer's own code and setup, separately from the later platform vulnerability.
- date: Nov 1, 2026, 03:53 UTC
  title: Attacker's own project reaches internal runtime-service credentials
  body: Unsafe handling of customer-written files exposes the Frankfurt service's configuration. Three credentials are used; another token could read Function and Site configurations, including environment variables.
- date: Nov 1, 2026, 04:06–13:33 UTC
  title: Credentials are used against one customer and platform services
  body: Appwrite reports reading the customer's function code and logs, executing a function and replacing its code for 31 seconds. Storage probes and an inactive content-delivery change are also identified.
- date: Nov 1, 2026, 14:46 UTC
  title: Routine service replacement invalidates the broad read token
  body: The possible exposure window ends. No use of that token is established, but incomplete provider audit logs prevent ruling out reads.
- date: Nov 2, 2026
  title: Security monitoring detects the attack and containment follows
  body: Within hours, Appwrite blocks the attacker's accounts and projects, ships the fix and replaces exposed credentials. Scope investigation continues through November 4.
- date: Nov 4, 2026
  title: Appwrite publishes its report and starts notifying 1,022 projects
  body: Customers are told to rotate affected secret variables and redeploy. Self-hosted release 2.7.1 brings the root-cause fix with executor 1.3.1.
checklist:
- title: Identify the projects and secret variables in your notification
  hint: Check Appwrite's email through your established account channel. Scope requires a Function or Site running on Frankfurt compute between November 1 at 03:53 and 14:46 UTC, a variable set before 14:46, and a name marking it as a secret. Some other-region projects' Sites use this compute. Public-by-design variables are excluded; 1,022 is a project count, not a confirmed theft or person count. If scope is unclear, use security@appwrite.io through the official report.
- title: Replace downstream secrets, redeploy and revoke old values
  hint: Treat every affected secret variable as exposed. Create replacement keys, tokens, passwords or database credentials at the issuing service; update each affected Function or Site and redeploy so running copies receive them. Revoke the old values. For Appwrite API keys, create a minimally scoped replacement in the project's API Keys sidebar, update and redeploy, then delete the old key. Appwrite cannot rotate customers' third-party secrets for them.
- title: Patch self-hosted Appwrite and rotate the executor secret
  hint: Back up data and follow the linked 2.7.1 release upgrade instructions. With a custom docker-compose.yml, set openruntimes-executor to openruntimes/executor:1.3.1 and run docker compose up -d. If anyone not fully trusted could deploy Functions or Sites, after upgrading set a new _APP_EXECUTOR_SECRET in .env and run docker compose up -d to recreate the API, workers and executor together. The release instructs upgrades to run docker compose exec appwrite migrate; there are no schema changes from 2.7.0. This patch does not undo prior credential access.
- title: Review issuing-service activity and preserve relevant evidence
  hint: Preserve deployment, function, authentication and downstream-service logs. Review the services that issued each affected secret for unfamiliar activity since November 1 at 03:53 UTC, including executions and code changes. Appwrite publishes no dedicated IP, domain or hash indicators in these two sources. Absence of an indicator or suspicious log entry cannot establish safety; the vendor's missing provider audit records specifically prevent excluding reads. Reply through the established notification thread if suspicious activity is found.
sources:
- name: Appwrite November 4 incident report
  url: https://appwrite.io/blog/post/incident-report-sites-functions-runtime-vulnerability
  primary: true
  says: Confirms runtime exploitation, the separate storage flaw, observed use against one customer, the Frankfurt exposure window and 1,022 notified projects. Explains incomplete audit evidence, containment and customer secret rotation with redeployment.
- name: Appwrite 2.7.1 security release
  url: https://github.com/appwrite/appwrite/releases/tag/2.7.1
  primary: true
  says: Read through the public GitHub release API as well as the release page. Specifies executor 1.1.2 to 1.3.1, symlink and unchecked log-ID handling, executor-secret access, untrusted-deployer prerequisite, upgrade and secret-rotation steps.
- name: Appwrite API-key documentation
  url: https://appwrite.io/docs/partners/project/api-keys
  primary: true
  says: Explains creating a minimally scoped key from the project sidebar and replacing application credentials before deleting the old key.
---

Appwrite's November 4 disclosure separates a targeted customer compromise from a platform attack. Initial access on October 30–31 came through that customer's own application. On November 1, code deployed in the attacker's own Appwrite project then exploited unsafe runtime-file handling to read internal service credentials. Appwrite confirms actual use of three credentials, including reading one customer's function code and logs, running a function and changing its code for 31 seconds before restoring it. Active platform exploitation warrants L4; the report does not establish theft from every notified project.

A different access token could read the configuration of Functions and Sites on Frankfurt compute, including secrets, from 03:53 to 14:46 UTC on November 1. Frankfurt also serves Sites for some projects whose primary region is elsewhere. Appwrite is notifying owners of 1,022 projects meeting its runtime, variable-time and secret-name conditions. That count does not mean 1,022 separate organizations or confirmed secret thefts. The vendor found no evidence of environment-variable reads, but the provider's audit log is incomplete and irrecoverable; its alternative configuration, workload and interactive-session records cannot reveal reads. Customers must rotate affected secrets as a precaution.

In the same session, a separate storage API flaw allowed a write outside the attacker's project storage. Appwrite reports only the attacker's own test file written through that flaw, now deleted, and says provider logs show no reads of other customers' files. An unauthorized content-delivery configuration change never became active. These findings should not be expanded into a confirmed general storage breach.

The Cloud incident is contained according to Appwrite: attacker access is blocked, exposed service credentials are replaced and refused, and the root cause is fixed. The company reports rejecting planted links and non-plain runtime/build files, adding container security profiles, separating unprivileged customer workloads from platform services, splitting shared credentials and replacing signing/encryption keys. Re-encryption of stored data is still in progress. None of these actions rotates customers' third-party secrets automatically.

Self-hosted release 2.7.1 updates Open Runtimes executor 1.1.2 to 1.3.1. The release describes symlinks in execution/build logs, output or cache, plus an unchecked runtime log ID, allowing access to executor-container files and its environment, including `_APP_EXECUTOR_SECRET`. That secret permits direct executor-API calls, and the executor controls host Docker. The stated prerequisite is allowing an untrusted party to deploy Functions or Sites. The vendor recommends upgrading and then rotating that secret where applicable; it does not claim self-hosted customers were victims of the Cloud attack. No CVE or complete older-branch support matrix is asserted by these sources.
