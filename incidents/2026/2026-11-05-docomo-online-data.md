---
title: NTT DOCOMO confirms online-shop and My docomo data leakage affecting up to 300,000 records
level: 4
date: 2026-11-05
tags:
- NTT DOCOMO
- Data breach
- SaaS
summary: DOCOMO’s third notice lists leaked identity-document numbers, subscription and tariff details among up to about 300,000 records; some also include bank-account, representative, employer or parenting-program information. Most My docomo procedures began reopening November 9. The Online Shop and listed exceptions stayed under maintenance in the fourth notice.
splash: Customers with information held by DOCOMO Online Shop or My docomo; exact affected records and fields are still being investigated
wipe: Verify your notice through established DOCOMO support, reject impersonation messages, and check official maintenance updates before retrying procedures.
inTheWild: 'yes'
inTheWildNote: DOCOMO confirms unauthorized access and customer-information leakage.
timeline:
- date: Nov 4, 2026
  title: DOCOMO confirms unauthorized external access
  body: Its later notice identifies both the Online Shop and My docomo as affected.
- date: Nov 5, 2026
  title: Services halted and second notice confirms data leakage
  body: Procedures on both services were stopped early that morning. The second notice estimates up to about 300,000 affected records; maintenance continues with no restoration estimate.
- date: Nov 6, 2026
  title: Third notice expands the confirmed field list
  body: All affected customers have identity, contact and subscription fields listed; some also have bank-account, representative, employer or parenting-program information exposed. The maximum remains about 300,000 records, and maintenance has no restoration estimate.
- date: Nov 9, 2026
  title: DOCOMO starts restoring most My docomo procedures
  body: The fourth notice reports mitigations for the identified access path and a phased restart. The Online Shop and listed My docomo procedures remain under maintenance in the notice.
checklist:
- title: Verify your affected records through established support
  hint: Keep your direct notice and use DOCOMO's existing official website or Information Center, rather than contact details in an unexpected message. The company will notify affected customers when details are known; ask which fields and records concern you. The stated maximum is not a final unique-person count. The third notice adds a dedicated official line, 0120-451-360 (09:00–20:00 in Japan); verify it on the linked DOCOMO notice. Ask specifically about identity-document numbers, bank details and any representative or employer records.
- title: Reject DOCOMO-themed requests for credentials or payment details
  hint: The notice warns of impersonation by email, SMS and telephone. Do not follow supplied URLs, open attachments or provide personal information, passwords or card details. Verify requests independently through your usual DOCOMO app, bookmark or support route even if the sender knows your name or phone number.
- title: Check official maintenance status before resuming account procedures
  hint: Check the fourth notice for the Online Shop and the specific My docomo procedure you need. Use established support if it remains unavailable. Resuming procedures does not establish that previously copied data has been recovered.
sources:
- name: NTT DOCOMO second original incident notice
  url: https://www.docomo.ne.jp/info/notice/page/261105_03_m.html
  primary: true
  says: November 5 notice confirms external access, leakage up to about 300,000 records, example fields, continuing maintenance and pending scope/cause. It does not claim all DOCOMO services or customer accounts were breached.
- name: NTT DOCOMO third original incident notice
  url: https://www.docomo.ne.jp/info/notice/page/261106_00_m.html
  primary: true
  says: November 6 third notice, as of 18:00 Japan local time, gives the expanded field list and dedicated support line; maximum about 300,000 records, continuing maintenance, no newly identified leakage after access blocking.
- name: NTT DOCOMO fourth incident notice
  url: https://www.docomo.ne.jp/info/notice/page/261109_00_m.html
  primary: true
  says: Reports the phased My docomo restart, lists exceptions and retains the approximate 300,000-record upper bound.
- name: DOCOMO Imadoco Search service notice
  url: https://imadoco.tda.docomo.ne.jp/news/news20261106.html
  primary: true
  says: Its November 10 update confirms Imadoco Search procedures in My docomo resumed November 9.
updated: '2026-11-15'
---

DOCOMO says it detected unauthorized access on November 4 and stopped procedures on its Online Shop and My docomo on November 5. Its second notice confirms customer-information leakage and lists names, addresses, birth dates, mobile numbers and contact telephone numbers among the fields. The estimate is a maximum of about 300,000 records, not a finalized victim count; details will be sent to affected customers.

The November 6 notice reported no further leakage after DOCOMO blocked access. At that point it had not disclosed an entry route, a CVE or a restoration date. The containment observation does not establish recovery of previously copied data. Do not infer that passwords or card information were taken, or that those categories have been ruled out. This concerns the named web services and does not establish an intrusion into every DOCOMO system or a cause for a separate mobile-network outage.

**November 6 third notice:** The list for all affected customers includes names, birth dates and ages; addresses, contact telephone numbers and emails; identity-document numbers; mobile numbers and contract-start dates; and tariff plans, options and discounts. Some customers additionally have legal/procedural representatives’ names and contacts, employer/corporate names and locations, bank names/branches/account numbers/account-holder names, or parenting-support program information exposed. These categories are not separate additive victim totals. The company retains the same approximate maximum and has not established the complete intrusion route or a reopening time. A bank-account number is not a bank-login password; the notice does not establish financial theft. If your banking fields were involved, contact your bank through its established channel about unexpected activity and appropriate monitoring.

**November 9 fourth notice:** DOCOMO says most My docomo procedures began returning at about 15:00 Japan time after mitigations for the access path it had identified. At publication, the Online Shop and listed My docomo exceptions still had no reopening date. The exceptions include selected security and device-protection actions, re-enabling DOCOMO content payments or d払い payment and transfer functions, family discounts, combined billing, switching from ahamo and JAL Mobile options. The November 10 Imadoco Search notice separately confirms that its My docomo procedures resumed on November 9. DOCOMO retained the maximum of about 300,000 records and said the cause, access path and final scope were still under investigation.
