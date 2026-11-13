---
title: SMBC Consumer Finance confirms loan-guarantee data theft affecting up to 320,118 customers
level: 4
date: '2026-11-05'
updated: '2026-11-13'
tags: [SMBC Consumer Finance, data breach, consumer lending]
summary: SMBC Consumer Finance confirms personal data was sent out of its loan-guarantee system. The upper bound is 320,118 customers. Exposed fields include driver's license numbers, income and loan-guarantee details. The company blocked access and suspended the system while it investigates.
splash: Customers whose loan or application data was handled by SMBC Consumer Finance's guarantee system for partner lenders.
wipe: Verify notices through the lender or guarantor, watch for suspicious loan applications and report possible impersonation promptly.
inTheWild: 'yes'
inTheWildNote: SMBC Consumer Finance confirmed unauthorized access and outbound personal data.
timeline:
- date: Nov 2, 2026
  title: Guarantor detects unauthorized access and blocks it the same day
  body: SMBC Consumer Finance discovers the outbound transfer of personal data during its investigation.
- date: Nov 5, 2026
  title: Guarantor and partner banks disclose the incident
  body: SMBC Consumer Finance gives an upper bound of 320,118 customers. Docomo SMTB Net Bank identifies up to 122,635 of its card-loan customers within that scope. Tsukuba Bank suspends new Asjoy applications.
- date: Nov 6, 2026
  title: Guarantor adds a toll-free customer line
  body: The new number is 0120-362-167. The existing number is 03-5677-9228. Both operate daily from 09:00 to 18:00 Japan time.
- date: Nov 10, 2026
  title: The guarantor starts sending individual SMS notices
  body: SMBC Consumer Finance publishes sender number 0005000365 and urges customers to verify suspicious messages through an independent official channel.
- date: Nov 13, 2026
  title: Docomo SMTB Net Bank confirms phased SMS and postal notices
  body: The bank’s update gives a maximum of 122,643 card-loan customer records and reports no confirmed secondary harm.
checklist:
- title: Confirm whether your loan data was involved
  hint: Check your lender's official incident notice or ask SMBC Consumer Finance at 0120-362-167 or 03-5677-9228, daily from 09:00 to 18:00 Japan time. The guarantor has started sending SMS notices. Docomo SMTB Net Bank customers may also receive postal notices. Keep any notice and verify its contents through a channel you open yourself.
- title: Verify any message about a loan, debt or guarantee
  hint: Open your lender's app or website directly. Ignore requests for personal information in unexpected calls, email or SMS. Leave any links unopened. Tsukuba Bank says it never requests PINs, internet banking passwords or one-time codes through those channels.
- title: Report suspected identity misuse
  hint: If you see a loan, credit inquiry or account activity you do not recognize, preserve the record and contact your lender through its established fraud channel. Report suspicious contact to the guarantor's hotline or the police. Tsukuba Asjoy applicants should check the bank's notice or call its customer desk at 029-859-8111 on weekdays from 09:00 to 17:00 Japan time, excluding year-end holidays.
sources:
- name: SMBC Consumer Finance November 5 incident disclosure (Japanese PDF)
  url: https://www.smbc-cf.com/news/data/2026/11/news_20261105_1.pdf
  primary: true
  says: Confirms the outbound transfer, personal data, maximum customer count, same-day access block and temporary suspension.
- name: SMBC Consumer Finance November 6 customer hotline update
  url: https://www.smbc-cf.com/news/564.html
  primary: true
  says: Adds a toll-free number and gives daily opening hours for both customer lines.
- name: SMBC Consumer Finance November 10 SMS notice
  url: https://www.smbc-cf.com/news/565.html
  primary: true
  says: Confirms SMS notices have started and gives the sender number and anti-phishing guidance.
- name: Docomo SMTB Net Bank customer notice, updated November 13
  url: https://www.netbk.co.jp/contents/company/info/2026/1105_006601.html
  primary: true
  says: Gives the updated record count and the initial customer estimate, confirms notifications and reports no confirmed access to its banking systems.
- name: Tsukuba Bank November 5 customer notice
  url: https://www.tsukubabank.co.jp/cms/article/76ee6818987f5e1c31d22e2302d6e0e18688c745/
  primary: true
  says: Confirms that its customer data was involved and that it suspended new Asjoy applications.
---

SMBC Consumer Finance guarantees loans for regional banks, credit unions and online banks, and provides web application forms to some partners. It confirmed that an intruder accessed the system used for that guarantee business and that personal data was sent outside it. The maximum of **320,118 customers** is the guarantor's estimate while it determines the final scope. Docomo SMTB Net Bank initially reported up to **122,635 people** with its card loans in the same incident. Its November 13 update reports up to **122,643 records**. The bank does not reconcile the counts, which should not be added. The bank reports no confirmed unauthorized access to its own banking systems. Tsukuba Bank confirmed that its customers were among those affected and paused new applications for its Asjoy card-loan product.

The guarantor lists names, sex, dates of birth, addresses, home and mobile phone numbers, email addresses, driver's license numbers, employment information such as work phone numbers and annual income, and contract information such as institution codes, customer numbers, guarantee amounts and start dates. The company excludes images of identity documents. Its November 5 notice reports no confirmed secondary harm as of publication. The entry method, final scope and a date for restarting the guarantee system remain unresolved in the notices.
