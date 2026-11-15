---
title: Control Web Panel password recovery flaws can expose accounts and hosting data
level: 3
date: '2026-11-13'
tags: [Control Web Panel, authentication, hosting]
summary: VulnCheck disclosed two CWP flaws affecting builds before 1.30.6. An exposed recovery endpoint can send a reset token to an attacker-controlled host if a mail scanner follows the poisoned link. A recovery token and a predictable legacy signature can also bypass remote API authorization.
splash: CWP before 1.30.6 with reachable password recovery or remote API routes. The two paths have different token requirements.
wipe: Update through the supported channel, restrict recovery and API access, and investigate unexpected resets, API calls and cron jobs.
inTheWild: unknown
inTheWildNote: VulnCheck documents the attack paths. Public sources did not establish exploitation.
cves:
- id: CVE-2026-124020
  score: 9.2
  name: Password-reset link poisoning
  description: The recovery route accepts a supplied Host value when building a reset link. A mail scanner that follows it can disclose a live token, allowing a password reset.
- id: CVE-2026-124021
  score: 9.2
  name: Recovery token accepted by remote API
  description: A recovery token and a predictable legacy signature can authorize remote API calls that should require an API key.
fixed:
- product: Control Web Panel
  version: 1.30.6
  status: First fixed build according to VulnCheck. Use the latest supported build for your installation.
timeline:
- date: Nov 10, 2026
  title: CWP publishes version 1.30.6
  body: The vendor changelog dates the build that VulnCheck identifies as fixed.
- date: Nov 13, 2026
  title: VulnCheck publishes both CVE records
  body: The CNA documents the poisoned reset link and the separate remote API authorization bypass.
checklist:
- title: Update and verify the installed build
  hint: Use Settings > CWP Settings > CWP updates and the supported update channel. Confirm the installed webpanel version is at least 1.30.6 after the update. Test password recovery and authorized API integrations.
- title: Reduce reachability while preparing the update
  hint: Limit access to user-panel and remote API routes where operationally possible. Check reverse proxies accept only known panel hostnames and enforce the intended Host value. Keep mail scanning enabled and use the fixed build to address token validation.
- title: Investigate unexpected resets and API activity
  hint: Preserve panel, proxy, mail-security and API logs. Correlate requests to /v1/lostpass/, /login/index.php?acc=newpass and /cronjobsusers/ with approved resets and scheduled jobs. Check unexplained account-list or account-detail access, account changes and file writes. A route match alone does not prove exploitation.
- title: Contain confirmed or suspected account compromise
  hint: Revoke exposed recovery tokens, sessions and API credentials where supported, reset affected passwords from a trusted system, and inspect the affected account’s crontab and web roots for unauthorized changes. Engage incident response if account data or password hashes may have been retrieved.
sources:
- name: VulnCheck CVE-2026-124020 record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-124020
  primary: true
  says: Gives the initial publication, affected versions, CVSS 4.0 score and reset-link and mail-scanner prerequisites.
- name: VulnCheck CVE-2026-124021 record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-124021
  primary: true
  says: Gives the initial publication, affected versions, CVSS 4.0 score and remote API authorization and data-access effects.
- name: Control Web Panel changelog
  url: https://control-webpanel.com/changelog
  primary: true
  says: Dates the 1.30.6 release and lists later builds.
---

The first path begins at the reachable password recovery endpoint. Its generated link can point to a host set by the requester. VulnCheck describes automated mail scanning as a way for the requester to receive the live token. Redeeming a token can change the target account’s password and provide access to the hosting account’s file manager and cron features.

The second path requires a valid recovery token and a predictable signature accepted by a legacy API check. VulnCheck says the authorized calls can schedule commands as the affected hosting account or read account-list and detail routes that return usernames, contact email addresses and password hashes. The disclosed effects do not establish host root access or that anyone extracted these records. Both displayed scores are CVSS 4.0.

These issues concern recovery-token handling on the remote API and user panel. See the earlier [CWP user-panel and loopback API chain](/incidents/cwp-user-panel-api/) for its separate prerequisites and fixes.
