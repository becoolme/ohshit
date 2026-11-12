---
title: Fireworks cloud intrusion exposed customer data including Notion AI transcripts
summary: Fireworks disclosed a later intrusion through its R&D cloud provider and confirmed access to some customer datasets and incomplete weights. Notion found Insights chat transcripts for fewer than 1% of workspaces and notified affected customers.
splash: Fireworks customers named in exposure notices and notified Notion workspaces with affected Insights transcripts.
wipe: Review vendor notices and exposed data. Revoke and rotate credentials included in affected datasets or chats.
inTheWildNote: Fireworks and Notion confirmed unauthorized access to affected customer data.
level: 4
date: '2026-11-09'
updated: 2026-11-12
tags:
- AI
- SaaS
- data breach
inTheWild: 'yes'
timeline:
- date: Oct 9, 2026
  title: Fireworks publishes an earlier security bulletin
  body: Fireworks initially confirms access to stored secrets used in workflows including evaluation jobs.
- date: Oct 23–24, 2026
  title: Cloud provider incident leads to Fireworks development access
  body: Fireworks detects an unauthorized workload on October 24 and starts containment.
- date: Nov 9, 2026
  title: Fireworks and Notion publish scope findings
  body: Fireworks details additional data categories. Notion describes the Insights transcript exposure and notification process.
- date: Nov 11, 2026
  title: Notified customer LRM describes the data in its own workspace
  body: LRM says it was notified on November 10. It found business-contact names in potentially exposed Insights records and reports no system credentials in the records it reviewed.
checklist:
- title: Review the data named in Fireworks notices
  hint: Use your incident notice or the contact listed on the security bulletin. Identify affected datasets, model material, metadata or billing records. Revoke and rotate exposed secrets at their issuers and review associated activity.
- title: Review affected transcripts inside Notion
  hint: If notified, a workspace owner can open the sidebar, select ? and then Security incident review to review and export affected transcripts. Share the review link with affected members. Treat affected chats as exposed and rotate passwords, API keys and other credentials they contain.
sources:
- name: Fireworks November 9 bulletin
  says: Describes the October cloud-provider intrusion, data categories, mitigation and ongoing investigation.
  url: https://fireworks.ai/security/bulletins/october-2026-security-incident-update
  primary: true
- name: Notion security notice
  says: Explains the affected Insights transcripts, workspace notifications and credential guidance.
  url: https://www.notion.com/en-gb/security/advisories/security-incident-involving-a-third-party-ai-vendor
  primary: true
- name: LRM first-party customer notice
  url: https://www.lrm.jp/info/news/info_20261111/
  says: Identifies the affected customer’s record window, observed business information and notification process.
  primary: true
---

Fireworks says an October 23 incident at its R&D cloud host enabled access to its development machines on October 24. Its investigation found affected resource metadata and billing details, including addresses, payment history, balances and credit usage. Fireworks says payment card numbers were outside scope. It temporarily disabled self-serve dataset uploads and downloads for Batch Inference and dataset-based training. It reports no detected impact to Inference, Training SDK or Nexus in its investigation to date.

Notion says it disconnected from Fireworks by November 3 following a notification about synthetic test data. Fireworks notified Notion again on November 6 and confirmed a separate dataset on November 8. Notion says most affected workspaces’ transcripts lacked author or workspace labels and contained no tool-call results. The chat text itself could contain identifying information or secrets. Notion disabled Insights and continues investigating. The sources do not establish a count of affected people.

In its November 11 notice, Japanese security company LRM says Notion notified it the day before. The company is reviewing a subset of its October 5–24 Insights records and found names of business contacts in the text. It is notifying those contacts individually and reports no system credentials in its reviewed records. That finding applies to LRM’s records. Other notified workspace owners should review their own exports, notify people whose information appears, and rotate any exposed credentials. LRM says its own services were outside the intrusion. The record count and whether outsiders obtained LRM’s records remain under investigation.
