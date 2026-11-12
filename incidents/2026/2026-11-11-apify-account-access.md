---
title: Apify confirms unauthorized account access and exposure of some customer data
level: 4
date: '2026-11-11'
updated: '2026-11-12'
tags:
- Apify
- SaaS
- data breach
- credentials
summary: An attacker used a compromised credential to obtain some account credentials and access associated Apify accounts on November 9–10. Apify says it notified customers whose personal information or stored data was accessed. The investigation is ongoing.
splash: Apify customers whose accounts or data were accessed, and workflows that used revoked OAuth connections
wipe: Follow Apify’s notice, contain exposed credentials, check account activity and reconnect affected integrations.
inTheWild: 'yes'
inTheWildNote: Apify confirmed unauthorized access to internal systems and customer accounts.
timeline:
- date: Nov 9–10, 2026
  title: An unauthorized party accesses Apify systems
  body: Apify later said the attacker used a compromised credential to obtain some account credentials and access the associated accounts.
- date: Nov 11, 12:13 UTC
  title: Apify detects the activity
  body: The company says it cut off the access path and started investigating.
- date: Nov 11, 19:46 UTC
  title: Apify publishes its first notice
  body: Apify reports internal access and precautionary revocation of some third-party OAuth connections, including GitHub.
- date: Nov 12, 11:08 UTC
  title: Apify describes the credential misuse
  body: It says it saw no further attacker activity since November 11 and had rotated critical internal secrets and notified the relevant authorities.
- date: Nov 12, 16:16 UTC
  title: Apify confirms customer notifications
  body: Apify says it has contacted customers whose personal information or stored data was accessed and will contact others if identified.
checklist:
- title: Check Apify’s notice for your account
  hint: Verify the notification through official Apify support if needed. Follow the account-specific instructions and record which data or credentials the notice identifies. If none has arrived, monitor for a later notice while the investigation continues.
- title: Contain suspicious Apify account activity
  hint: Preserve records of unexpected sign-ins, Actor runs, integration changes and API activity. Revoke or rotate exposed or suspicious credentials in the official console, replace them in CI secrets, scripts and dependent services, and test with the replacements. Review associated services for unexpected access.
- title: Reconnect private GitHub repositories
  hint: Open an Actor built from GitHub in Apify, choose Change provider, select GitHub and authorize once per account and organization. Reconnect other integrations when prompted and verify scheduled runs.
sources:
- name: Apify security incident updates
  url: https://status.apify.com/incidents/sxd1dj5j6749
  says: Official timeline, credential misuse, OAuth revocations and confirmation of customer notifications.
  primary: true
---

Apify says an unauthorized third party reached parts of its internal systems and used a compromised credential to obtain some account credentials and access the associated accounts. By November 12, Apify had notified customers whose personal information or stored data was accessed. The notices give account-specific details. The public incident report leaves the affected customer count and complete data scope open.

Apify cut off the access path, added monitoring, rotated critical internal secrets and revoked some third-party OAuth connections as a precaution. The company says it has found no evidence that those connections provided the attack path. Actors built from private GitHub repositories may need reauthorization. Apify said it would rotate affected user tokens and notify users when it identifies them. The company plans to publish a postmortem after remediation.
