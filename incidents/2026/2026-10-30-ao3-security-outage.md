---
title: AO3 confirms a security incident and expects a two-to-four-week outage
date: 2026-10-30
updated: 2026-11-06
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
  - date: Nov 1, 18:10 UTC
    title: AO3 shares an outage-scam warning
    body: The official RSS records this repost time; it adds safety guidance, not a new recovery estimate.
  - date: Nov 6, 00:05 UTC
    title: AO3 explains queued notifications and draft-preservation work
    body: Restoration and prevention work continue within the earlier estimate. Some notifications queued before the outage were released legitimately; the team is working to prevent draft deletion. AO3 remains down.
checklist:
  - title: Replace passwords reused elsewhere
    hint: Use each other service’s official app or existing bookmark to set a unique password. Do not wait for AO3 to reopen before securing those accounts. This precaution does not mean the database is confirmed stolen.
  - title: Follow official recovery channels
    hint: Read the AO3 official Tumblr and status page. Degraded or read-only service may appear before full restoration and may go offline again; the estimate is not a guaranteed reopening date. Verify unexpected messages through a known channel before sharing account information.
  - title: Reject private-access and tester scams
    hint: AO3 says there is no mirror into its servers or database and no official app. Offers of private access or public tester recruitment asking for personal details are scams. Volunteers do not request private payments; donations go through the official OTW donation form. Prefer trusted archives or social posts over unknown private drives and ZIP downloads.
  - title: Distinguish queued mail from a reopened service
    hint: The November 6 update says some subscription and kudos emails queued before the October outage were released by AO3. Their arrival does not mean AO3 has reopened. Check the official status page rather than following unfamiliar links. The team is working to preserve drafts, which is not a guarantee that every draft has been recovered; keep any local copies.
sources:
  - name: AO3 official security statement
    url: https://ao3org.tumblr.com/post/831861478301794304
    primary: true
    says: Read in full via the public official RSS; security disclosure is October 30, distinct from earlier maintenance notices.
  - name: AO3 official public RSS
    url: https://ao3org.tumblr.com/rss
    primary: true
    says: Includes the complete statement and dated prior maintenance updates; no database theft or deletion is confirmed.
  - name: AO3 official November1 safety repost
    url: https://ao3org.tumblr.com/post/832104414244487168
    primary: true
    says: Full repost read through the official public RSS, dated November1 at 18:10:08 UTC; website retrieval was unavailable.
  - name: AO3 official November6 restoration update
    url: https://ao3org.tumblr.com/post/832489177531695104
    primary: true
    says: Complete post read through the official RSS, timestamped November6 00:05:47 UTC; queued emails are legitimate, draft-preservation work continues and AO3 remains down.
---

If accessed, the user database could expose usernames, email addresses, IP addresses and password hashes. The operator warns that hashing does not fully protect weak or reused passwords. AO3 does not collect real names. The investigation has not established the entry point, affected-account count or database theft. L3 reflects a major platform’s confirmed security disruption, rather than a confirmed mass data leak.


**November 6 update:** AO3 says restoration and changes to prevent future incidents are proceeding well and the original return estimate still applies. Some subscription/kudos notices queued before the October outage were sent during recovery; the operator confirms those messages are legitimate. The team says it is actively working to prevent drafts from being deleted. These are recovery and communication updates, not confirmation of reopening, completed draft recovery or a resolved database-exposure investigation.
