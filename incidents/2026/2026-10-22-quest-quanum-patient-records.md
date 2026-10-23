---
title: Quest Diagnostics reports unauthorized access to Quanum patient records; scope remains unknown
level: 4
date: '2026-10-22'
tags:
- Quest Diagnostics
- healthcare
- data breach
summary: Quest discovered unauthorized access to Quanum LSM on October 21 and disclosed it on October 22. It believes patient records were accessed, but has not established affected-patient totals or exact data fields. Core operations continue while LSM access is paused.
splash: Patient data in Quanum LSM; direct customer LIS / EMR interfaces are unaffected according to Quest
wipe: Use approved paper requisitions or Quanum eLabs while LSM is paused; follow Quest notices for affected-patient notifications
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
  title: Client notice describes suspended systems and alternatives
  body: Quest confirms PHI / PII involvement, with exact fields still under investigation, and says the incident is unrelated to PHP.
checklist:
- title: Use Quest-approved ordering and results channels
  hint: Quanum LSM clients can use paper requisitions or eLabs; existing direct LIS / EMR customers can continue through those unaffected interfaces
- title: Preserve continuity without duplicating orders
  hint: Reconcile outstanding LSM orders and results through the provider workflow; use Quest National Customer Services for missing results and the Connectivity Help Desk for eLabs support
- title: Follow official patient and provider notifications
  hint: Use the Quanum notice and FAQs; Quest will identify affected patients and issue notices. Do not assume every Quest patient was affected
sources:
- name: Quest Diagnostics SEC Form 8-K
  url: https://www.sec.gov/Archives/edgar/data/1022079/000094787126000941/ss6979200_8k.htm
  says: October 21 discovery; patient-record access believed; investigation ongoing; signed October 22
  primary: true
- name: Quest Quanum notice and FAQs
  url: https://www.questdiagnostics.com/links/quanum-notice
  says: LSM paused; Essential Insights and LabHQ paused as a precaution; PHI / PII involved, unaffected LIS / EMR interfaces and interim workflows
  primary: true
- name: SEC filing index
  url: https://www.sec.gov/Archives/edgar/data/1022079/000094787126000941/0000947871-26-000941-index.htm
  says: Filed October 22, establishing disclosure date rather than discovery date
---

L4 reflects a confirmed intrusion into a major healthcare service and the vendor's assessment that patient records were accessed. It does not establish a mass-victim count. The attack method, exact records and number of affected people remain unknown. This is a separate incident from Quest's older breaches.

Essential Insights and LabHQ were also paused as a precaution; Quest says no data was accessed there. The notice still contains a tentative restoration reference to October 23. That is not confirmation that service has been restored.
