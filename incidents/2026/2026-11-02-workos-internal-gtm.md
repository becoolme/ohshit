---
title: WorkOS internal sales tool breach exposes customer contacts and communications
level: 4
date: 2026-11-02
tags:
- WorkOS
- Data breach
- AI
summary: WorkOS confirms unauthorized access to an internal sales tool exposing contacts, communications and usage metadata. Its CEO links the attack to ARTEX and says production platform data was not accessed; the investigation continues.
splash: Organizations whose contacts, sales/support discussions or usage metadata were held in the affected WorkOS internal tool.
wipe: Verify notices with WorkOS, review your organization’s exposed records and guard against targeted phishing.
inTheWild: 'yes'
inTheWildNote: WorkOS confirms unauthorized access; its CEO identifies ARTEX involvement.
timeline:
- date: Oct 30, 2026
  title: WorkOS detects unauthorized access
  body: The affected application served internal sales teams.
- date: Nov 2, 2026
  title: WorkOS publishes breach bulletin
  body: External access to the application is disabled; independent incident responders are investigating the scope.
- date: Nov 3, 00:26 UTC
  title: CEO names ARTEX and describes containment
  body: The CEO says internal GTM systems were affected and no customer platform data was accessed. These are company statements during an ongoing investigation.
checklist:
- title: Confirm your organization’s exposure
  hint: Contact security@workos.com through an established channel. Ask which contact, account, communication and operational-metadata records were accessed; retain the notice and evidence.
- title: Verify unexpected requests independently
  hint: Check requests referencing real colleagues, sales calls, support cases or Slack discussions through a known contact before sending sensitive information or approving account changes.
- title: Review sensitive material previously shared
  hint: Review affected support and sales conversations for credentials or confidential attachments. Revoke and rotate secrets confirmed exposed; the public bulletin does not order a blanket production credential reset.
sources:
- name: WorkOS security bulletin
  url: https://workos.com/security/bulletins/october-30th-2026-data-security-incident
  says: Confirms internal sales-tool access, four data categories, containment and an ongoing independent investigation.
  primary: true
- name: WorkOS CEO statement on Hacker News
  url: https://news.ycombinator.com/item?id=50346301
  says: Names ARTEX; says production systems are secure and customer platform data was not accessed.
  primary: true
- name: Public API copy of the CEO statement
  url: https://hn.algolia.com/api/v1/items/50346301
  says: Readable copy with the original comment timestamp; the same statement, not independent corroboration.
  primary: true
---

The accessed categories include CRM identities and contact details, account histories, excerpts or summaries of sales/support/Slack discussions, and product-usage or connection/directory-health metadata. WorkOS has not published a victim count, entry-point details or a final report. The public bulletin describes an AI-assisted offensive framework; ARTEX is named separately by the CEO. This does not establish that WorkOS production authentication services were breached.
