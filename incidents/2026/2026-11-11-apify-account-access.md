---
title: Apify preliminary report details stolen tokens, cached sessions and account-reset steps
level: 4
date: '2026-11-11'
updated: '2026-11-27'
tags:
- Apify
- SaaS
- data breach
- credentials
summary: Apify’s preliminary report describes a staff API token and stolen cached sessions used to read account records and some stored data. Full records included password hashes and 2FA secrets. Affected tokens and proxy passwords were rotated. Follow notices, reset password/2FA where instructed and check GitHub logs. The investigation continues.
splash: Apify customers whose accounts or data were accessed, and workflows that used revoked OAuth connections
wipe: Follow notices for password/2FA resets; replace rotated tokens and proxy passwords, restrict storage access and check account/GitHub logs.
inTheWild: 'yes'
inTheWildNote: Apify confirmed unauthorized access to internal systems and customer accounts.
timeline:
- date: Nov 9–10, 2026
  title: An unauthorized party accesses Apify systems
  body: Apify later said the attacker used a compromised credential to obtain some account credentials and access the associated accounts.
- date: Nov 10, 18:00 UTC
  title: Network-rule changes close the internal access path
  body: The preliminary report says an unrelated fix closed the network route before the incident was recognized. Already stolen credentials continued working until rotations on November 11–12.
- date: Nov 11, 12:13 UTC
  title: Apify detects the activity
  body: The status page records detection at 12:13 UTC. The later preliminary report dates network-path closure to November 10 and credential rotations to November 11–12.
- date: Nov 11, 14:20 UTC
  title: Apify revokes GitHub connection tokens and removes deploy keys
  body: The preliminary report says GitHub tokens were in the cache; it reports no sign of use but recommends checking GitHub security logs.
- date: Nov 11, 19:46 UTC
  title: Apify publishes its first notice
  body: Apify reports internal access and precautionary revocation of some third-party OAuth connections, including GitHub.
- date: Nov 12, 11:08 UTC
  title: Apify describes the credential misuse
  body: It says it saw no further attacker activity since November 11 and had rotated critical internal secrets and notified the relevant authorities.
- date: Nov 12, 16:16 UTC
  title: Apify confirms customer notifications
  body: Apify says it has contacted customers whose personal information or stored data was accessed and will contact others if identified.
- date: Nov 13, 16:36 UTC
  title: Apify reports changes to token storage and internal controls
  body: Apify says it now stores API tokens only as hashes and has tightened network access between internal services and strengthened internal authentication.
- date: Nov 16, 17:54 UTC
  title: Apify closes suspected entry point and moves to monitoring
  body: Apify rotated more internal credentials, found no evidence of additional unauthorized access and plans a preliminary report by November 20.
- date: Nov 20, 16:58 UTC
  title: Preliminary report published while the investigation continues
  body: The status page marks the incident resolved but explicitly leaves investigation and the full report open. The report describes internal cache/session access, affected account records, rotated tokens and proxy passwords, and password/2FA instructions. It reports no detected attacker activity since November 12, later than the earlier status statement’s November 11 cutoff.
checklist:
- title: Check Apify’s notice for your account
  hint: Verify the notification through official Apify support if needed. Follow the account-specific instructions and record which data or credentials the notice identifies. Apify says every account identified as affected received an email; no email means it has not identified your account, not that all future findings are ruled out. Monitor for later notices while the investigation continues.
- title: Reset password and 2FA when your notice requires it
  hint: If Apify says authentication data including your password hash was read, update the password as a precaution through your trusted Console bookmark. For accounts whose full records were read, the report says 2FA secrets and recovery codes were also read; set up 2FA again if asked, or enable it if absent. Follow the account-specific reset instructions; a salted bcrypt hash not being plaintext does not make an exposed hash harmless.
- title: Contain suspicious Apify account activity
  hint: Preserve records of unexpected sign-ins, Actor runs, integration changes and API activity, including new webhooks, Actors and schedule edits. Apify says it backed up and removed attacker-created objects in a few accounts and contacted their owners. Correlate changes with your legitimate configuration rather than treating every object as malicious. Revoke or rotate exposed or suspicious credentials in the official console, replace them in CI secrets, scripts and dependent services, and test with the replacements. Review associated services for unexpected access.
- title: Restrict access to Apify storage
  hint: In Apify Console, go to Settings → Login & Privacy (Security & Privacy for organizations) and set General resource access to Restricted. Check each storage resource’s share settings for overrides, and test dependent workflows with a valid token that has access.
- title: Reconnect private GitHub repositories
  hint: Open an Actor built from GitHub in Apify, choose Change provider, select GitHub and authorize once per account and organization. GitHub connection tokens were in the cache and their revocation also removed deploy keys. Apify reports no sign they were used, but recommends checking https://github.com/settings/security-log for unfamiliar activity. Reconnect other integrations, including Zapier, n8n and Make, when prompted after precautionary OAuth rotations, then verify scheduled runs.
- title: Store new API tokens when they are issued
  hint: Apify rotated affected API tokens and proxy passwords without advance notice, which broke some production jobs. Replace old values in applications, CI, proxy clients and scheduled jobs, reconnect integrations when prompted and test the workflows. API tokens and session keys are now stored only as hashes; new API tokens are visible only at creation. Save them in your secret manager. If you lose one, create a replacement, update dependent systems and delete the lost token.
sources:
- name: Apify security incident updates
  url: https://status.apify.com/incidents/sxd1dj5j6749
  says: Official timeline, credential misuse, OAuth revocations, customer notifications, token storage changes and advice to restrict storage access.
  primary: true
- name: Apify general resource access documentation
  url: https://docs.apify.com/account/collaboration/general-resource-access
  says: Documents the Console paths, per-resource overrides and API authentication requirements.
  primary: true
- name: Apify preliminary November 2026 incident report
  url: https://trust.apify.com/resources?s=ief8itmfzyi5m4pst51sd&name=preliminary-report-security-incident-11-/-26
  says: Full five-page public PDF downloaded through the Trust Center’s View/Download control and read. Describes the staff-token/networking/cache/admin-tool path, data categories, control changes and customer resets; distinguishes network closure from later credential invalidation and reports no detected activity since November 12.
  primary: true
---

Apify says an unauthorized third party reached parts of its internal systems and used a compromised credential to obtain some account credentials and access the associated accounts. By November 12, Apify had notified customers whose personal information or stored data was accessed. The notices give account-specific details. The early public notices left the affected customer count and complete data scope open; the preliminary report below adds categories without publishing a total.

Apify cut off the access path, added monitoring, rotated critical internal secrets and revoked some third-party OAuth connections as a precaution. The company says it has found no evidence that those connections provided the attack path. Actors built from private GitHub repositories may need reauthorization. The early notices said Apify would rotate affected user tokens and notify users when identified. Its preliminary report now confirms rotations; the full root-cause and completed-remediation report remains pending.

On November 13, Apify said the investigation was ongoing and that it had switched to storing only API token hashes. The company recommends restricting storage access for all customers because anyone with the storage ID can read a resource while access is open. This is a precaution; Apify has not identified open storage as the route used in the intrusion. Verify incident messages through Apify Support and do not share passwords, two-factor codes or payment details.

On November 16, Apify said it had fixed the most likely entry point and hardened each stage of the attack path on November 11–13. It extended hashing and encryption, further restricted privileged access and rotated more internal credentials. The investigation continues and Apify reports no evidence of additional unauthorized access.


**November 20 preliminary report:** The attacker started with working Apify API tokens, including a higher-privilege staff token, then used a previously unknown networking-service vulnerability to reach an internal session cache. Stolen sessions, including privileged staff sessions, enabled bulk account-record reads through internal admin tools. Some stored data was read for a small subset of active accounts. The report does not explain how the initial working tokens were obtained, name the actor, give a total affected-account count or assign a CVE.

The report separates the network route from credential reuse: an unrelated engineer-reported fix tightened network rules and closed the internal route on November 10 at 18:00 UTC, before the team recognized the intrusion. Already stolen credentials remained usable until rotations on November 11–12. The status page records detection at November 11 12:13 UTC; the preliminary report lists incident-response start at 12:00 UTC. The sources do not explain the 13-minute difference. Earlier status updates said no further attacker activity had been seen since November 11; the later report instead says none has been detected since November 12. Neither statement establishes that all earlier access was harmless.

For accounts whose full records were read, the report confirms access to salted bcrypt password hashes, 2FA secrets and recovery codes. Where a card was on file, the read record included cardholder name, expiry and last four digits; Apify says it never stores full card numbers or plaintext account passwords. It says encrypted secret Actor input fields and secret environment variables were not exposed. Those exclusions do not erase the confirmed access to other account records, sessions, API tokens or the subset’s stored data.

Apify says it ended all Console sessions, rotated affected API tokens and proxy passwords, revoked GitHub connections and rotated integration OAuth credentials. It now hashes API tokens and session keys and hashes or encrypts proxy passwords, 2FA secrets and recovery codes. GitHub connection tokens were present in the cache; their revocation at November 11 14:20 UTC also removed deploy keys. The vendor reports no sign of their use and nevertheless recommends checking GitHub security logs. Owners whose full authentication records were read should follow the password and 2FA reset instructions in their notices; customers must replace rotated credentials in their own workflows. The November 20 status entry is marked resolved while explicitly saying the investigation remains ongoing and a full report will follow.
