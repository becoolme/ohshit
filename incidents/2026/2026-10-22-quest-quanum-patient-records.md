---
title: Quest Diagnostics reports unauthorized access to Quanum patient records; scope remains unknown
level: 4
date: '2026-10-22'
updated: 2026-10-24
tags:
- Quest Diagnostics
- healthcare
- data breach
summary: Quest discovered unauthorized access to Quanum LSM on October 21 and disclosed it on October 22. It believes patient records were accessed, but has not established affected-patient totals or exact data fields. Quest confirmed service restoration on October 23; the data-scope investigation continues.
splash: Patient data in Quanum LSM; direct customer LIS / EMR interfaces are unaffected according to Quest
wipe: Use restored Quanum LSM; contact the Connectivity Help Desk for credential-reset help and follow official affected-patient notices
inTheWild: n/a
inTheWildNote: Unauthorized access confirmed; record scope is still being investigated
timeline:
- date: Oct 21, 2026
  title: Quest discovers unauthorized Quanum LSM access
  body: The company initiates containment and an investigation with external specialists.
- date: Oct 22, 2026
  title: Quest discloses the incident in an SEC filing
  body: Certain patient records were likely accessed; the company reports no material business disruption.
- date: Oct 23, 2026
  title: Client notice confirms restoration and ongoing data investigation
  body: At 19:00 ET (23:00 UTC), Quest says LSM and precautionarily paused systems are restored. PHI / PII scope remains under investigation; the incident is unrelated to PHP.
checklist:
- title: Use Quest-approved ordering and results channels
  hint: Quanum LSM is restored; direct LIS / EMR interfaces remain unaffected. For credential-reset assistance, contact the IT Connectivity Help Desk at 1-800-697-9302
- title: Preserve continuity without duplicating orders
  hint: Reconcile interim eLabs orders and results with restored LSM; Quest says results from eLabs orders are also available in LSM
- title: Follow official patient and provider notifications
  hint: Use the Quanum notice and FAQs; Quest will identify affected patients and issue notices. Do not assume every Quest patient was affected
sources:
- name: Quest Diagnostics SEC Form 8-K
  url: https://www.sec.gov/Archives/edgar/data/1022079/000094787126000941/ss6979200_8k.htm
  says: October 21 discovery; patient-record access believed; investigation ongoing; signed October 22
  primary: true
- name: Quest Quanum notice and FAQs
  url: https://www.questdiagnostics.com/links/quanum-notice
  says: October 23 19:00 ET update confirms LSM, Essential Insights and LabHQ restored; PHI / PII scope remains under investigation and direct LIS / EMR interfaces were unaffected
  primary: true
- name: SEC filing index
  url: https://www.sec.gov/Archives/edgar/data/1022079/000094787126000941/0000947871-26-000941-index.htm
  says: Filed October 22, establishing disclosure date rather than discovery date
---

L4 reflects a confirmed intrusion into a major healthcare service and the vendor's assessment that patient records were accessed. It does not establish a mass-victim count. The attack method, exact records and number of affected people remain unknown. This is a separate incident from Quest's older breaches.

Essential Insights and LabHQ were paused as a precaution; Quest says no data was accessed there. Its October 23, 19:00 ET update confirms that LSM and these systems have been restored. This supersedes the earlier tentative restoration estimate; it does not establish the full scope of patient-record access.
