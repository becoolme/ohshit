---
title: PLAID confirms KARTE data theft and suspends all projects
date: '2026-11-13'
updated: '2026-11-17'
level: 4
inTheWild: 'yes'
tags:
- Data breach
- Personal information
summary: PLAID confirmed exposure of 79,249 KARTE account email addresses, external integration credentials, and some customer-imported data. The shutdown affected all projects from November 13. The November 17 update gives no restart estimate.
splash: All KARTE projects, including web and app tracking, content delivery, Message campaigns, Datahub workflows and the administration console.
wipe: Check Plaid’s notice for your project, preserve integration logs and reconcile interrupted jobs before retrying them.
inTheWildNote: PLAID confirms the attacker exploited a server vulnerability and read data.
timeline:
- date: Nov 13, 2026 05:44 UTC
  title: Plaid announces staggered shutdown
  body: All KARTE projects are affected. In-progress email and data workflow jobs may stop partway.
- date: Nov 13, 2026 14:35 UTC
  title: Plaid reports customer notifications
  body: Plaid says it identified potentially exposed information and emailed affected customers.
- date: Nov 14, 2026 12:05 UTC
  title: Plaid continues investigating
  body: Plaid still gives no restart time.
- date: Nov 16, 2026
  title: PLAID confirms data exposure and entry path
  body: Exposed data includes KARTE account email addresses, external integration credentials and some customer imports. Numbers for the last two categories remain under investigation.
- date: Nov 17, 2026
  title: No restart date yet
  body: PLAID continues investigating by data category and contacting affected customers directly.
checklist:
- title: Revoke affected external integration credentials
  hint: Revoke affected secrets or access tokens on the connected service, review unexpected calls, and reissue and verify credentials using PLAID’s guidance.
- title: Confirm your project’s exposure
  hint: Follow the incident status and verify any email through your existing Plaid support channel. Ask for the affected project IDs, fields, time range and any required changes to integration credentials.
- title: Preserve logs and reconcile failed jobs
  hint: Save available application, integration and delivery logs. Check downstream records for partially delivered KARTE Message mail or Datahub transfers. Prevent duplicate side effects by replaying only missing work after recovery.
- title: Validate recovery
  hint: Wait for Plaid’s restart instructions before resuming workflows. Verify tracking, deliveries and integrations on a limited set of jobs first, then confirm the expected recipients and results.
sources:
- name: Plaid incident notice
  says: Confirms detected third-party access and the all-project shutdown.
  url: https://plaid.co.jp/news/20261113/
  primary: true
- name: KARTE incident status
  says: Tracks notifications, job impact and recovery status.
  url: https://status.karte.io/incidents/rs1gsmckc197
  primary: true
- name: PLAID November 16 breach confirmation
  url: https://plaid.co.jp/news/20261116/
  says: Documents server vulnerability, credential theft, exposure and customer notification.
  primary: true
- name: PLAID November 17 progress notice
  url: https://plaid.co.jp/notice/202611171100/
  says: Gives no restart estimate.
  primary: true
---

PLAID says an attacker exploited a server vulnerability to steal connection credentials, read data from certain databases and take over a PLAID account to access the administration console. The 79,249 figure counts account email addresses. Counts for external integration credentials and imported records remain under investigation. Personal information in imports depends on what each customer uploaded. The shutdown affected all projects, and the investigation assesses data exposure by customer.
