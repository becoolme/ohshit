---
title: AO3 confirms a security incident and expects a two-to-four-week outage
date: 2026-10-30
level: 3
tags: [AO3, security incident, outage]
summary: AO3 confirms a security incident and expects at least two weeks of downtime, possibly four. It does not currently believe its user database was stolen but cannot rule that out. The operator says works and other AO3 data have not been deleted; donor data is held separately and was not exposed.
splash: AO3 users, especially anyone reusing an AO3 password on another service
wipe: Replace reused passwords on other sites; follow official recovery notices and reject unsolicited account-recovery requests
inTheWild: unknown
inTheWildNote: Security incident confirmed; user-database theft and the entry point remain unconfirmed.
cves: []
fixed: []
timeline:
  - date: Oct 29, 07:34 UTC
    title: AO3 announces maintenance downtime
  - date: Oct 29, 17:45 UTC
    title: Restoration estimate expands to around two to four weeks
  - date: Oct 30, 01:48 UTC
    title: Operator publicly confirms a security incident
    body: Database theft cannot be ruled out; reused-password changes are recommended as a precaution.
checklist:
  - title: Replace passwords reused elsewhere
    hint: Use each other service’s official app or existing bookmark to set a unique password. Do not wait for AO3 to reopen before securing those accounts. This precaution does not mean the database is confirmed stolen.
  - title: Follow official recovery channels
    hint: Read the AO3 official Tumblr and status page. Degraded or read-only service may appear before full restoration and may go offline again; the estimate is not a guaranteed reopening date. Verify unexpected messages through a known channel before sharing account information.
sources:
  - name: AO3 official security statement
    url: https://ao3org.tumblr.com/post/831861478301794304
    primary: true
    says: Read in full via the public official RSS; security disclosure is October 30, distinct from earlier maintenance notices.
  - name: AO3 official public RSS
    url: https://ao3org.tumblr.com/rss
    primary: true
    says: Includes the complete statement and dated prior maintenance updates; no database theft or deletion is confirmed.
---

If accessed, the user database could expose usernames, email addresses, IP addresses and password hashes. The operator warns that hashing does not fully protect weak or reused passwords. AO3 does not collect real names. The investigation has not established the entry point, affected-account count or database theft. L3 reflects a major platform’s confirmed security disruption, rather than a confirmed mass data leak.
