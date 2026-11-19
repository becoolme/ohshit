---
title: Rakuten Securities reports possible customer-data theft from a test environment
level: 4
date: 2026-11-17
tags: [Rakuten Securities, data breach, test environment]
summary: Rakuten Securities reports possible exposure of detailed personal and financial data for up to 4.47 million accounts and identifiers for up to 11.25 million accounts. Password/PIN exposure and resulting unauthorized transactions are not confirmed. The company blocked access and is investigating.
splash: Current and former Rakuten Securities accounts represented in the affected test-environment data; individual notices define exposure
wipe: Open the official notice directly, set up a passkey and consider temporary trading or withdrawal restrictions in security settings
inTheWild: n/a
inTheWildNote: Vendor reports intrusion; the entry method and extent of data theft remain unconfirmed.
timeline:
  - date: Nov 11, 2026
    title: Investigation identifies a possible data outflow
    body: Rakuten Securities dates the suspected exposure of test-environment information to this day.
  - date: Nov 16, 2026
    title: The company detects suspicious access and blocks the affected area
    body: It reports access blocking and corrections; the cause and detailed sequence remain under investigation.
  - date: Nov 17, 2026
    title: Rakuten Securities publishes the affected data categories
    body: It has identified affected customers and plans individual notifications, with two upper-bound account counts.
checklist:
  - title: Verify the notice through Rakuten Securities directly
    hint: Open the official customer notice from a trusted bookmark or the company's website. It says its notification emails contain no URLs and it does not request personal or login information by telephone. Do not follow links or supply details in suspicious emails, SMS, calls or mail. Support is 0120-862-274, weekdays 08:30–17:00 and weekends 09:00–17:00; the notice does not specify a timezone for these hours.
  - title: Set up the vendor's passkey login
    hint: Open the passkey guide linked from the official notice at https://www.rakuten-sec.co.jp/web/security/passkey/guide/ and complete setup through the genuine service if it is not already configured. This protects future login attempts; it does not recover copied data.
  - title: Consider temporary transaction and withdrawal restrictions
    hint: Sign in through the official website, open security settings and review the vendor's temporary trading/service suspension controls at https://www.rakuten-sec.co.jp/web/security/account_lock/ . Choose restrictions appropriate to your account; the notice offers this option rather than announcing that all accounts have been frozen.
sources:
  - name: Rakuten Securities original customer notice
    url: https://www.rakuten-sec.co.jp/smartphone/info/info20261117-02.html
    primary: true
    says: Gives two maximum account counts, fields, uncertain exfiltration, containment, planned notifications, passkey and restriction guidance, and the customer support number.
  - name: Rakuten Securities original November 17 press release
    url: https://www.rakuten-sec.co.jp/web/company/newsrelease/pdf/press2026111702.pdf
    primary: true
    says: Confirms the November 11/16/17 chronology, test-environment scope, both information groups and the lack of confirmed password/PIN exposure or resulting unauthorized transactions.
---

Rakuten Securities says unauthorized access may have exposed data held in a test environment, including information about former customers. This is a vendor-confirmed incident with possible large-scale exposure of sensitive financial and personal data, which supports L4. It has not established that every listed record was stolen, identified an entry vulnerability or published a final root cause.

The notice lists two maximum account populations. Up to 4.47 million accounts may involve branch/customer codes, securities login IDs, names and kana names, birth dates, addresses, phone numbers, email, employer, withdrawal-bank details (institution, account number and holder), self-reported income and financial assets, assets by product and last login date. Up to 11.25 million accounts may involve branch/customer codes and securities login IDs. These login IDs differ from Rakuten IDs. The notice does not explain overlap between the two populations; do not add them into a unique-customer total.

The company has not confirmed exposure of login passwords, PINs or other information needed for transactions, or related unauthorized access or trading resulting from this incident. That does not remove phishing risks from exposed identifiers or personal information. It says it identified affected customers and will contact them individually; notification is not described as complete. Access blocking and corrections are containment steps, not independent verification that copied information has been recovered.
