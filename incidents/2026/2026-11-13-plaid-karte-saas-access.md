---
title: Plaid suspends KARTE projects after detecting unauthorized access
date: '2026-11-13'
level: 4
inTheWild: 'yes'
tags:
- Data breach
- Personal information
summary: Plaid began shutting down all KARTE projects after detecting third-party access. It emailed customers whose data may have been exposed and was still investigating the scope on November 14.
splash: All KARTE projects, including web and app tracking, content delivery, Message campaigns, Datahub workflows and the administration console.
wipe: Check Plaid’s notice for your project, preserve integration logs and reconcile interrupted jobs before retrying them.
inTheWildNote: Plaid confirmed unauthorized access. Possible data exposure is still being investigated.
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
checklist:
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
---

Plaid has not published the initial access method, the exposed data categories or a count of affected customers. The company described the exposure as possible. All projects were in scope for the shutdown, with no public finding that all project data was exposed.
