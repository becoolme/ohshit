---
title: "PingCAP confirms TiDB Cloud intrusion: a stolen service account roamed internal systems for a month"
headline: "TiDB Cloud: a stolen service account, a month inside"
level: 4
date: 2026-10-19
updated: 2026-11-01
tags: [cloud database, credentials, extortion]
ecosystems: [tidb, mysql]
summary: >-
  From Sep 9 to Oct 7 an intruder used stolen service-account credentials to copy account metadata, billing
  info, SQL editor text, encrypted API-key values and source code. Extortion group FulcrumSec claims 10.6 TB;
  PingCAP has not confirmed that.
splash: "TiDB Cloud customers' account, billing and SQL-editor data; no evidence customer databases were read"
wipe: "Rotate TiDB Cloud API keys, DB passwords and support-shared secrets; scrub SQL history and review access logs"
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
  - date: Oct 20, 2026
    title: PingCAP publishes customer key-rotation instructions
  - date: Oct 21, 2026
    title: NebuSec publishes its investigation
    body: Support-ticket credentials enabled access to diagnostic S3 data; the API-key table encryption key was not exposed.
  - date: Oct 23, 2026
    title: CEO confirms support-secret rotation is needed
    body: Customers should act before receiving individual impact notices.
checklist:
  - title: Rotate TiDB Cloud API keys
    hint: Organization owners should create replacement management keys under Organization Settings > API Keys, update and test dependent applications, then revoke old keys. Suspected misuse requires immediate revocation and contact with security@pingcap.com. The exported values were encrypted and the encryption key was not exposed; rotation is still recommended
  - title: Rotate database users and passwords
    hint: Especially any that ever appeared in the SQL editor
  - title: Scrub secrets from SQL editor history
    hint: Queries and error text were copied
  - title: Review org and project access logs
    hint: Review September 9–October 7 cloud identity and access logs for 146.70.173[.]219, 23.234.82[.]156, 23.234.83[.]80, 23.234.80[.]121, 138.199.43[.]96 and 23.234.81[.]225. Correlate Python-urllib/3.12, compute.instances.aggregatedList, google.cloud.bigquery.v2.JobService.InsertJob EXTRACT jobs, .json.gz staging, rclone and storage.objects.get responses 200/206. These operations also have legitimate uses; a match alone does not prove compromise. Use NebuSec’s complete table for per-IP dates and activity
  - title: Rotate credentials shared with support
    hint: Inventory support tickets, attachments, diagnostic logs and connection strings; rotate any embedded AWS keys, tokens, database passwords or other secrets. Do not wait for individual notification or send secrets to support again
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
  - name: NebuSec independent investigation
    url: https://nebusec.ai/research/pingcap-security-incident/
    primary: true
  - name: PingCAP CEO follow-up
    url: https://www.pingcap.com/trust-hub/security/ceo-note-october-2026/
    primary: true
  - name: PingCAP customer actions
    url: https://www.pingcap.com/trust-hub/security/customer-actions-october-2026/
    primary: true
---

PingCAP, the company behind the TiDB distributed database, says an intruder used **stolen service-account
credentials** to move around its internal systems from September 9 until it noticed on October 7.

According to PingCAP, the intruder copied:

- account and project metadata (names, emails, organisation, project and cluster IDs)
- **SQL editor text and error messages**
- billing and business information: contacts, contract terms, orders, pricing
- a table of **encrypted TiDB Cloud API-key values**. NebuSec later found the encryption key was not exposed; this protection does not extend to plaintext credentials in support materials
- PingCAP source code
- the later independent report also lists **AI interactions, gateway connection logs, support tickets and attachments**, diagnostic data, internal alert-chat history and membership lists, and infrastructure/orchestration backups; the mix varies by customer

PingCAP says it found **no evidence that data stored in customers' TiDB databases was accessed**, and no
command execution or persistence on the production systems it reviewed.

An extortion group, FulcrumSec, claims far more: 10.6 TB and 4.9 million files, with a 200 GB sample. Those
numbers are unverified. Some early posts also claimed 180,000+ affected organisations. We could not find
that figure in any credible source, so we dropped it.

**Follow-up, November 1 (UTC):** NebuSec’s October 21 report traces initial access to a compromised GitHub account, then exposed repository and Terraform credentials. Credentials collected from support tickets also opened diagnostic S3 data. The CEO’s October 23 note asks customers to rotate support-shared secrets, not just management API keys; individual impact assessments remain pending. The independent review found no evidence of production persistence or customer TiDB database access. That does not negate theft from internal and support systems.

For investigations, NebuSec lists six source IPs: `146.70.173[.]219`, `23.234.82[.]156`, `23.234.83[.]80`, `23.234.80[.]121`, `138.199.43[.]96`, `23.234.81[.]225`. Correlate September 9–October 7 identity and access records with `Python-urllib/3.12`, `compute.instances.aggregatedList`, BigQuery `google.cloud.bigquery.v2.JobService.InsertJob` EXTRACT jobs, `.json.gz` staging, `rclone`, and `storage.objects.get` responses 200/206. These tools and operations have legitimate uses; a match alone does not prove compromise. Resource identifiers and secrets were withheld from the report.
