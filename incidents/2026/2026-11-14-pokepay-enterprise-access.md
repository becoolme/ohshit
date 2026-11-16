---
title: Pokepay Enterprise suspends payments after unauthorized access
level: 4
date: 2026-11-14
tags: [Pokepay, Payments, Data exposure]
summary: Pocket Change confirmed unauthorized access to Pokepay Enterprise and suspended the platform. Payments later resumed in stages. Tokyo’s Kita Ward is investigating possible exposure of Hokupay merchant application data, including bank account details.
splash: Pokepay Enterprise issuers and users, including regional payment apps and university co-op electronic money.
wipe: Check payment and top-up status with your issuer. Reconcile balances and payouts, and report unexplained activity through official channels.
inTheWild: 'yes'
inTheWildNote: Pocket Change confirmed third-party access to Pokepay Enterprise.
timeline:
  - date: Nov 14, 2026
    title: Pocket Change suspends Pokepay Enterprise
    body: Pocket Change confirms third-party access and pauses all Enterprise services. Its separate shop offering stays open.
  - date: Nov 15, 2026
    title: The platform resumes with some top-ups restricted
    body: Pocket Change restores Enterprise service while it continues securing external integrations. Fuku App and Hokupay restore payments separately. Kita Ward reports possible exposure of merchant application data.
  - date: Nov 16, 2026
    title: Hokupay reopens more top-up options
    body: Kita Ward reports that credit-card and convenience-store top-ups are available again. Direct bank-account top-ups remain paused in that update.
checklist:
  - title: Check the status of your own payment app
    hint: Use the app or issuer's official notice before retrying payments or top-ups. Check transaction history and balance first to avoid submitting an unresolved payment twice.
  - title: Reconcile merchant payments and payouts
    hint: Compare POS records and payout statements with deposits for the outage and recovery dates. Hokupay merchants should verify any request to change payout details directly with the issuer using a known contact.
  - title: Report a missing balance or unfamiliar transaction
    hint: Keep receipts and transaction references. Contact the issuer through its published support channel. Fuku App directs users to its incident FAQ and support form.
sources:
  - name: Pokepay initial suspension notice
    url: https://pokepay.jp/ja/entries/142
    says: Confirms unauthorized access and the Enterprise shutdown, and distinguishes the shop offering.
    primary: true
  - name: Pokepay Enterprise reopening notice
    url: https://pokepay.jp/ja/entries/144
    says: Confirms platform reopening on November 15 and lists external features still restricted at the time.
    primary: true
  - name: Fuku App reopening update and FAQ
    url: https://fukuappli.jp/inspection-faq-20261115/
    says: Explains which functions resumed and how users can report balance or payment discrepancies.
    primary: true
  - name: Kita Ward Hokupay incident notice
    url: https://www.city.kita.lg.jp/business/industry/1011327/1027058.html
    says: Describes the possible merchant data exposure and the return of some top-up methods on November 16.
    primary: true
  - name: University of Tokyo Co-op notice
    url: https://www.utcoop.or.jp/news/news-366669/
    says: Confirms a temporary suspension of its electronic money service.
    primary: true
---

Pocket Change uses Pokepay Enterprise to support electronic money programs run by other organizations. The company paused the platform after detecting unauthorized access on November 14. Fuku App and the University of Tokyo Co-op reported outages. Pocket Change continued adding safeguards for external integrations when the platform reopened, and the issuers published their own recovery status. Fuku App reported that credit-card and Seven Bank ATM top-ups resumed, with BankPay direct bank-account top-ups still paused.

Kita Ward says a third party may have obtained Hokupay merchant applications containing a representative’s date of birth, address, phone number and email address, along with the merchant’s payout bank account details. The ward is investigating the scope. Fuku App said it had not confirmed a leak of its users’ personal information. The notices did not establish the intrusion path or report confirmed financial losses.
