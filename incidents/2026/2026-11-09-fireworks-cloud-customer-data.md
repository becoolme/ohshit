---
title: Fireworks cloud intrusion exposed customer data including Notion AI transcripts
summary: Fireworks disclosed a later intrusion through its R&D cloud provider and confirmed access to some customer datasets and incomplete weights. Notion found Insights chat transcripts for fewer than 1% of workspaces and notified affected customers.
splash: Fireworks customers named in exposure notices and notified Notion workspaces with affected Insights transcripts.
wipe: Review vendor notices and exposed data. Revoke and rotate credentials included in affected datasets or chats.
inTheWildNote: Fireworks and Notion confirmed unauthorized access to affected customer data.
level: 4
date: '2026-11-09'
updated: 2026-11-13
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
- date: Nov 12, 2026
  title: Notion customer RECEPTIONIST describes its own possible exposure
  body: The company identified information about 53 people outside the company and employee data in the affected records. It plans individual emails and a regulatory report.
- date: Nov 13, 2026
  title: Notion reports action on exposed API keys
  body: Notion says it revoked exposed Notion API keys on November 11 and reported exposed third-party keys to their issuers on November 12.
checklist:
- title: Review the data named in Fireworks notices
  hint: Use your incident notice or the contact listed on the security bulletin. Identify affected datasets, model material, metadata or billing records. Revoke and rotate exposed secrets at their issuers and review associated activity.
- title: Review affected transcripts inside Notion
  hint: If notified, a workspace owner can open the sidebar, select ? and then Security incident review to review and export affected transcripts. Share the review link with affected members. Treat affected chats as exposed and rotate passwords, API keys and other credentials they contain.
- title: Verify RECEPTIONIST notices through the company
  hint: The company says individual notices will come from @receptionist.co.jp. For an unexpected message, verify through pr@receptionist.co.jp as published in the November 12 filing. Watch for impersonation using inquiry details.
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
- name: RECEPTIONIST November 12 issuer filing
  says: Identifies possible exposure in the customer’s own Notion AI records and describes notifications, excluded data and unaffected services.
  url: https://tdnet-pdf.kabutan.jp/20261112/140120261112577184.pdf
  primary: true
---

Fireworks says an October 23 incident at its R&D cloud host enabled access to its development machines on October 24. Its investigation found affected resource metadata and billing details, including addresses, payment history, balances and credit usage. Fireworks says payment card numbers were outside scope. It temporarily disabled self-serve dataset uploads and downloads for Batch Inference and dataset-based training. It reports no detected impact to Inference, Training SDK or Nexus in its investigation to date.

Notion says it disconnected from Fireworks by November 3 following a notification about synthetic test data. Fireworks notified Notion again on November 6 and confirmed a separate dataset on November 8. Notion says most affected workspaces’ transcripts lacked author or workspace labels and contained no tool-call results. The chat text itself could contain identifying information or secrets. Notion disabled Insights and continues investigating. The sources do not establish an incident-wide count of affected people.

In its November 11 notice, Japanese security company LRM says Notion notified it the day before. The company is reviewing a subset of its October 5–24 Insights records and found names of business contacts in the text. It is notifying those contacts individually and reports no system credentials in its reviewed records. That finding applies to LRM’s records. Other notified workspace owners should review their own exports, notify people whose information appears, and rotate any exposed credentials. LRM says its own services were outside the intrusion. The record count and whether outsiders obtained LRM’s records remain under investigation.

RECEPTIONIST says Notion notified it on November 10. Its November 12 filing identifies records from October 5–23 containing information about **53 people outside the company**, plus employee information. Depending on the person, the records may include names, company names, phone numbers, email addresses and inquiry details. The company excludes credit card and bank account information from those records. It is treating the records as exposed while it has yet to establish that a third party obtained them. The company plans individual emails and a report to Japan's Personal Information Protection Commission and reports no known misuse. RECEPTIONIST says its own services and customer data stored in them were outside this incident.

Notion’s update confirms it found API keys in affected messages. It revoked exposed Notion API keys it found on November 11 and reported the third-party API keys it found to their issuers on November 12. A report to an issuer does not establish revocation. Workspace owners should verify revocation with each issuer, replace the keys and check usage logs between exposure and revocation.
