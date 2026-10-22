---
title: "PingCAP confirms TiDB Cloud intrusion: a stolen service account roamed internal systems for a month"
headline: "TiDB Cloud: a stolen service account, a month inside"
level: 4
date: 2026-10-19
tags: [cloud database, credentials, extortion]
ecosystems: [tidb, mysql]
summary: >-
  From Sep 9 to Oct 7 an intruder used stolen service-account credentials to copy account metadata, billing
  info, SQL editor text, encrypted API-key values and source code. Extortion group FulcrumSec claims 10.6 TB;
  PingCAP has not confirmed that.
splash: "TiDB Cloud customers' account, billing and SQL-editor data; no evidence customer databases were read"
wipe: "Rotate TiDB Cloud API keys and DB passwords, scrub secrets from SQL editor history, review access logs"
inTheWild: "n/a"
inTheWildNote: An intrusion, not a bug; access paths blocked by Oct 14
cves: []
timeline:
  - date: Sep 9, 2026
    title: Unauthorized access begins
    body: The intruder logs in with stolen service-account credentials.
  - date: Oct 7, 2026
    title: Detected; PingCAP starts disabling compromised accounts
    body: More credentials are deleted by Oct 10.
  - date: Oct 12–13, 2026
    title: An external firm reports four vulnerabilities
  - date: Oct 14, 2026
    title: All four fixed and retested; every known access path blocked
  - date: Oct 19, 2026
    title: PingCAP publishes its security update
    body: >-
      FulcrumSec claims 10.6 TB, 4.9M files, about two months of access and a replication feed every six
      hours. None of that is confirmed.
checklist:
  - title: Rotate TiDB Cloud API keys
    hint: The exported table held encrypted key values; treat them as exposed
  - title: Rotate database users and passwords
    hint: Especially any that ever appeared in the SQL editor
  - title: Scrub secrets from SQL editor history
    hint: Queries and error text were copied
  - title: Review org and project access logs
    hint: Look for logins and API calls you can't explain since Sep 9
  - title: Watch for targeted phishing
    hint: Contact names, emails and contract details were taken
sources:
  - name: PingCAP security update
    url: https://www.pingcap.com/trust-hub/security/security-update-october-2026/
    says: Confirms the dates, the data categories and the four fixed vulnerabilities. No evidence data in customer databases was touched
    primary: true
  - name: Dark Reading
    url: https://www.darkreading.com/cloud-security/tidb-breach-flawed-cloud-security
    says: Reports FulcrumSec's 10.6 TB and 200 GB sample claims (unverified)
  - name: TokenPost
    url: https://www.tokenpost.com/news/technology/35907
    says: "Crypto exchange angle: Bitget says it only stored public trade logs"
---

PingCAP, the company behind the TiDB distributed database, says an intruder used **stolen service-account
credentials** to move around its internal systems from September 9 until it noticed on October 7.

According to PingCAP, the intruder copied:

- account and project metadata (names, emails, organisation, project and cluster IDs)
- **SQL editor text and error messages**
- billing and business information: contacts, contract terms, orders, pricing
- a table of **encrypted TiDB Cloud API-key values**. Whether any usable credentials were exposed is still under review
- PingCAP source code

PingCAP says it found **no evidence that data stored in customers' TiDB databases was accessed**, and no
command execution or persistence on the production systems it reviewed.

An extortion group, FulcrumSec, claims far more: 10.6 TB and 4.9 million files, with a 200 GB sample. Those
numbers are unverified. Some early posts also claimed 180,000+ affected organisations. We could not find
that figure in any credible source, so we dropped it.
