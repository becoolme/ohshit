---
title: Prestige confirms roadside-assistance data theft involving up to 5.5 million records
level: 4
date: '2026-11-02'
updated: '2026-11-07'
tags:
- Prestige
- data breach
- roadside assistance
summary: The suspended roadside-assistance system held up to 5.5 million affected records, including duplicates. Exposed data includes contact, vehicle, accident and some bank details, plus three cases of card-number leakage. Rescue operations continue. Zurich Japan confirms exposure. BMW Japan is checking its scope.
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
- date: Nov 6, 2026
  title: Second report confirms card numbers in three cases
  body: Some call-intake records contained card numbers that were exfiltrated. Issuers have been informed; customer measures are being coordinated. No resulting unauthorized use is confirmed.
- date: Nov 6, 2026
  title: BMW Japan and Zurich Japan publish customer notices
  body: BMW Japan is checking fields and customer counts. Zurich Japan confirms that records from earlier outsourced assistance cases were included.
checklist:
- title: Confirm whether your assistance records are affected
  hint: Use your insurer or roadside-assistance provider’s established app, website or support number. Ask whether Prestige Core Solution handled your case and what fields are involved. Prestige says it will coordinate affected-customer notices with client companies; the maximum record count is not the number of people affected.
- title: Use the affected provider’s published incident line
  hint: BMW Japan customers can call 0120-269-437 from 09:00 to 19:00 on weekdays or 09:00 to 18:00 on weekends and holidays, Japan time. Zurich Japan customers can call 0120-860-697 from 09:00 to 17:00 on weekdays, excluding holidays and year-end closures, Japan time.
- title: Reject impersonated support and credential requests
  hint: The company warns of calls, email and SMS impersonating Prestige, group companies or insurers. Do not follow unexpected URLs or disclose passwords, bank PINs or card numbers. Confirm any request through a known provider contact; the company says it will not ask for those credentials by phone or email in connection with this incident.
- title: Preserve notices and check affected financial accounts
  hint: 'If your provider confirms bank-account information was included, monitor statements and contact the bank through its official channel about unfamiliar activity. Preserve suspicious messages and records for your provider or security team. The November 6 report confirms card numbers in three cases and says issuers have been notified. Check card statements for unfamiliar charges and contact the issuer through its established channel about suspicious activity. Customer communications and measures are being coordinated with issuers; no resulting unauthorized use has been confirmed.'
- title: Confirm assistance availability through your provider
  hint: The affected IT system was stopped, while roadside services continue through alternative operations. Ask your provider how to request assistance now; the notice gives no system-restoration date or customer software patch.
sources:
- name: Prestige International original company notice (Japanese PDF)
  url: https://www.prestigein.com/Portals/0/pdf/NEWS/news_20261102_01.pdf
  primary: true
  says: November 2 two-page notice confirms exfiltration, maximum duplicated record count, data fields, continued access/system shutdown and alternative roadside operations; final cause and unique-person total remain under investigation.
- name: Prestige November 6 second report (Japanese original PDF)
  url: https://www.prestigein.com/Portals/0/pdf/NEWS/news_20261106_01.pdf
  primary: true
  says: Confirms three cases of card-number leakage from intake records, issuer notifications, customer precautions and continued alternative operations.
- name: Prestige November 6 second report (official English translation PDF)
  url: https://www.prestigein.com/Portals/0/pdf/NEWS/news_20261106_01_en.pdf
  primary: true
  says: Same disclosure, not independent corroboration; Japanese original prevails.
- name: BMW Japan and BMW Japan Finance November 6 customer notice
  url: https://www.bmw.co.jp/ja/topics/announcement/202611-01.html
  primary: true
  says: Confirms the intrusion at its roadside-assistance provider, investigation of BMW-specific fields and counts, and its customer contact.
- name: Zurich Japan November 6 customer notice
  url: https://www.zurich.co.jp/aboutus/news/news/2026/1106/
  primary: true
  says: Confirms data from previously outsourced roadside-assistance cases was included and gives the contract cutoff and contact details.
---

Prestige International confirms that an intruder accessed its group business system and removed customer information handled by subsidiary Prestige Core Solution (PCS). The affected system receives and arranges roadside assistance for client companies. This is confirmed exfiltration, rather than merely an allegation of an exposed server.

The maximum is roughly **5.5 million records including duplicates**; the number of unique individuals remains under review. Fields include names, addresses, telephone numbers, email addresses, vehicle registration/chassis information, accident or breakdown intake information, and some bank-account information. Some partner-company information may also be included and is being checked. No credit-card leakage or resulting secondary misuse had been confirmed as of November 2; the November 6 confirmation below supersedes that card-data assessment.

Misused credentials were invalidated after detection on October 29. Access continued, prompting the October 30 shutdown. The company is investigating cause and scope with external specialists; reporting to Japan’s Personal Information Protection Commission and consultation with police are underway. It plans system changes and stronger monitoring, and will coordinate affected-customer notices with client companies. No initial-access vulnerability, final unique-person count or restoration deadline is disclosed. Roadside-assistance work continues through alternative operations despite the affected system being stopped. The confirmed mass disclosure supports L4.

**November 6 scope correction:** The November 2 notice had not confirmed credit-card leakage. The second report now confirms **three cases of card-number leakage**, recorded in some call-intake records and included in exfiltrated information. This does not establish three unique people, a new additive incident total, or exposure of card security codes. Issuers have been notified; customer contact and protective measures will be coordinated with them. The company still reports no confirmed secondary misuse and continues roadside assistance through alternative operations while the affected system is suspended.

**November 6 customer notices.** BMW Japan and BMW Japan Finance identify PCS as the contractor for their affected roadside-assistance and related operations. Their notice lists possible fields for the supplier’s system overall. The fields and count specific to BMW customers remain under investigation. BMW Japan says it reported to Japan’s Personal Information Protection Commission on November 2. Zurich Japan confirms its customer data was included and limits the affected scope to roadside-assistance cases outsourced to PCS through January 31, 2026. Neither customer notice gives a separate count. BMW relays the supplier’s earlier assessment that card leakage had yet to be confirmed. Prestige’s second report confirms three cases across the supplier incident and does not identify the client companies involved.
