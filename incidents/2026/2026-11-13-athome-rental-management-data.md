---
title: At Home confirms 6,901 rental management records were obtained by an intruder
summary: At Home now confirms an intruder obtained 6,901 rental management records, including contact and contract information. Its November 25 follow-up expands the disclosed fields and says the administration site reopened November 16 after security checks. No secondary misuse or impact on other services was confirmed.
splash: Tenants, property owners and business contacts entered by affected member agencies in At Home’s rental management service.
wipe: Verify notices with your agency or At Home and independently confirm requests to change rental payments.
tags:
- Data breach
- Property management
- Japan
date: '2026-11-13'
updated: '2026-11-28'
level: 3
inTheWild: 'yes'
inTheWildNote: At Home confirms unauthorized access and acquisition of the affected personal records.
timeline:
- date: Nov 9, 2026
  title: An unauthorized party logs into the administration site
  body: At Home later identifies records submitted by some member real estate agencies as potentially exposed.
- date: Nov 12, 2026
  title: At Home reports the incident to authorities
  body: The company reports to Japan’s Personal Information Protection Commission, JIPDEC and JUAS.
- date: Nov 13, 2026
  title: At Home publishes its initial findings
  body: The company gives a provisional count of 6,901 records and says it is identifying and contacting affected agencies and other parties.
- date: Nov 16, 2026
  title: Administration site reopens after security checks
  body: The November 25 report says At Home checked access history, strengthened access security and confirmed safety before reopening.
- date: Nov 25, 2026
  title: Second report confirms acquisition of 6,901 records
  body: The count is unchanged. At Home expands the field list, says all actions listed in its first report are complete, and reports no confirmed secondary misuse or impact on other services.
checklist:
- title: Confirm whether your record is in scope
  hint: Ask the agency that manages your property or contact At Home at 050-5538-0939 through the number published in the notice. Agencies should confirm their own scope and retain relevant access and notification records. The November 25 report confirms acquisition, rather than merely possible exposure; 6,901 is a record count, not a deduplicated person count.
- title: Verify rent or contract requests before acting
  hint: Use the phone number or contact listed in your existing contract to confirm unexpected messages about rent, renewal or bank details. Report suspected impersonation to your agency and, if you paid, contact your bank.
- title: Verify restored administration access and review permissions
  hint: Agencies should use their established management-site bookmark or contact At Home to confirm legitimate access following the November 16 reopening. Review administrator accounts, access permissions and login history. The provider reports stronger access security and continuing work on authentication/login methods, administrator permissions, detection and monitoring; it does not publish a specific user-side patch or password-reset procedure.
sources:
- name: At Home’s November 13 incident notice
  says: Lists the unauthorized login, provisional count, exposed fields, containment and support contact.
  url: https://www.athome.co.jp/corporate/news/topics/oshirase-202611/
  primary: true
- name: At Home’s November 25 second report
  says: Confirms third-party acquisition of the same 6,901 records, expands the data fields, reports completion of initial response actions and November 16 reopening, and describes continuing security improvements.
  url: https://www.athome.co.jp/corporate/news/topics/oshirase2-202611/
  primary: true
---

At Home initially reported possible exposure after the November 9 unauthorized login. Its November 25 second report confirms that a third party obtained the affected personal information. The count remains **6,901 records**; it is not a confirmed number of unique people.

The expanded fields include names and phonetic names, birth dates, individual/corporate classification, telephone and mobile numbers, addresses/locations, email addresses, business names, contact-person names and business activities. Contract information includes building and unit identifiers, contract status and counts, billing methods and notes, among other fields. The November 13 notice said no bank-account information leak had been confirmed and the system did not hold credit card data; at that disclosure, no publication or misuse had been confirmed either. The follow-up says identity-document information such as driver’s licenses is not a registration field, and no leak of similar images containing personal information was confirmed. These are the provider’s stated limits, not an independent finding that all sensitive data is safe.

At Home says all response actions listed in the first report are complete, including blocking the source, investigating the cause, reviewing logs, identifying/notifying affected parties and reporting to authorities. It reports reopening the administration site on **November 16** after checking access history and safety and strengthening access security. As of the November 25 report, it had not confirmed secondary misuse or an impact on other services. It describes continuing improvements to authentication/login, administrator account and permission management, detection/monitoring and security operations. A detailed entry mechanism and specific user-side patch or reset procedure remain unpublished in these notices.
