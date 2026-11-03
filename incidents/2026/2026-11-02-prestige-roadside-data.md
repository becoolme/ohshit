---
title: Prestige confirms roadside-assistance data theft involving up to 5.5 million records
level: 4
date: '2026-11-02'
tags:
- Prestige
- data breach
- roadside assistance
summary: 'Prestige confirms data theft from its subsidiary’s roadside-assistance system: up to 5.5 million records including duplicates, not people. Exposed fields include contact, vehicle and accident details, plus some bank-account information. The system is stopped; assistance continues through alternative operations.'
splash: Users of roadside assistance handled by Prestige Core Solution for client companies
wipe: Verify notices through your assistance provider; reject unexpected credential requests and monitor affected accounts
inTheWild: 'yes'
inTheWildNote: Prestige confirms unauthorized access and external removal of customer data.
cves: []
fixed: []
timeline:
- date: Oct 29, 2026
  title: Unauthorized access detected
  body: Prestige invalidates misused credentials and begins responding.
- date: Oct 30, 2026
  title: System stopped after continued access
  body: Roadside-assistance operations continue through alternative processes.
- date: Nov 2, 2026
  title: Company discloses confirmed data theft
  body: Up to roughly 5.5 million records including duplicates; unique individuals and final scope remain under investigation.
checklist:
- title: Confirm whether your assistance records are affected
  hint: Use your insurer or roadside-assistance provider’s established app, website or support number. Ask whether Prestige Core Solution handled your case and what fields are involved. Prestige says it will coordinate affected-customer notices with client companies; the maximum record count is not the number of people affected.
- title: Reject impersonated support and credential requests
  hint: The company warns of calls, email and SMS impersonating Prestige, group companies or insurers. Do not follow unexpected URLs or disclose passwords or bank PINs. Confirm any request through a known provider contact; the company says it will not ask for those credentials by phone or email in connection with this incident.
- title: Preserve notices and check affected financial accounts
  hint: 'If your provider confirms bank-account information was included, monitor statements and contact the bank through its official channel about unfamiliar activity. Preserve suspicious messages and records for your provider or security team. This is a precaution: Prestige has not confirmed secondary misuse or credit-card leakage.'
- title: Confirm assistance availability through your provider
  hint: The affected IT system was stopped, while roadside services continue through alternative operations. Ask your provider how to request assistance now; the notice gives no system-restoration date or customer software patch.
sources:
- name: Prestige International original company notice (Japanese PDF)
  url: https://www.prestigein.com/Portals/0/pdf/NEWS/news_20261102_01.pdf
  primary: true
  says: November 2 two-page notice confirms exfiltration, maximum duplicated record count, data fields, continued access/system shutdown and alternative roadside operations; final cause and unique-person total remain under investigation.
---

Prestige International confirms that an intruder accessed its group business system and removed customer information handled by subsidiary Prestige Core Solution (PCS). The affected system receives and arranges roadside assistance for client companies. This is confirmed exfiltration, rather than merely an allegation of an exposed server.

The maximum is roughly **5.5 million records including duplicates**; the number of unique individuals remains under review. Fields include names, addresses, telephone numbers, email addresses, vehicle registration/chassis information, accident or breakdown intake information, and some bank-account information. Some partner-company information may also be included and is being checked. No credit-card leakage or resulting secondary misuse had been confirmed at the notice date; neither statement rules out later findings.

Misused credentials were invalidated after detection on October 29. Access continued, prompting the October 30 shutdown. The company is investigating cause and scope with external specialists; reporting to Japan’s Personal Information Protection Commission and consultation with police are underway. It plans system changes and stronger monitoring, and will coordinate affected-customer notices with client companies. No initial-access vulnerability, final unique-person count or restoration deadline is disclosed. Roadside-assistance work continues through alternative operations despite the affected system being stopped. The confirmed mass disclosure supports L4.
