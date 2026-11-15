---
title: GoQSystem confirms theft of order data affecting 4.37 million people
summary: Attackers exploited a vulnerability in GoQSystem’s contact form and took order data affecting 4,367,390 people across 1,694 merchant companies. The provider removed the form and kept IP restrictions on its admin console.
splash: Buyers and recipients whose orders were held in the affected GoQSystem merchant accounts. Older orders are also in scope.
wipe: Get your affected orders from GoQSystem, notify customers through known channels and verify partner integrations before resuming normal processing.
date: '2026-11-12'
updated: 2026-11-15
level: 4
tags: [GoQSystem, SaaS, Ecommerce, Data breach]
inTheWild: 'yes'
inTheWildNote: GoQSystem confirmed contact-form exploitation and order data theft.
timeline:
- date: Nov 10–11, 2026
  title: Intruder accesses the order-management system
  body: GoQSystem blocks the access route and temporarily suspends the service on November 11.
- date: Nov 12, 2026
  title: GoQSystem confirms order data theft
  body: Emergency measures let the provider reopen the service with access limited by connection source.
- date: Nov 13, 2026
  title: GoQSystem identifies the entry point and scope
  body: A vulnerable contact form was exploited and has been removed. The provider counts 4,984,595 affected orders across 1,694 companies and 4,367,390 people.
- date: Nov 14, 2026
  title: Provider lists integrations that require merchant action
  body: Its status table marks Rakuten, BASE and STORES as requiring action and GoQ Logi as partially suspended.
- date: Nov 15, 2026
  title: GoQSystem warns of impersonation
  body: The provider publishes its genuine domains and says it has no confirmed cases of harm from lookalike sites at the time of the notice.
checklist:
- title: Identify affected orders and notify customers
  hint: Ask support@goqsystem.com how to download your affected order list. Include buyers and delivery recipients when reconciling the list with your own order records. Preserve related access and export logs, and coordinate notices and reporting using Japan’s Personal Information Protection Commission guidance linked in the second notice.
- title: Verify storefront and warehouse integrations
  hint: Check the vendor’s API status page before resuming processing. Follow the partner-specific instructions for any service that requires action. For Rakuten, verify the API approval and refresh the license key, then import missed orders and reconcile inventory errors. For BASE, remove the old GoQSystem app in the developer account and set it up again. For STORES, obtain fresh refresh tokens for order management and inventory separately. Use Amazon Seller Central directly for FBA shipments while the GoQ Logi integration is suspended.
- title: Verify delivery and account messages independently
  hint: Check unfamiliar delivery or payment requests in the original order page or through the carrier. For merchant logins, open your bookmark and confirm the host is order.goqsystem.com. If you entered a password on a lookalike, change it promptly through the genuine console and contact support@goqsystem.com.
sources:
- name: GoQSystem November 12 incident notice
  url: https://goq.co.jp/security-incident.html
  primary: true
  says: Confirms intrusion, extraction, data fields and restricted service recovery.
- name: GoQSystem November 13 scope and response
  url: https://goq.co.jp/security-incident-2.html
  primary: true
  says: Gives affected companies, orders and people, identifies the vulnerable form and describes merchant response.
- name: GoQSystem API connection status
  url: https://goq.co.jp/api-connection-status.html
  primary: true
  says: Lists partner status and merchant recovery steps.
- name: GoQSystem November 15 impersonation warning
  url: https://goq.co.jp/similar-sites.html
  primary: true
  says: Lists genuine login domains and steps for reporting or responding to lookalikes.
---

GoQSystem centralizes order processing for online merchants. GoQSystem traced the intrusion to a vulnerability in its contact form. Its reports give no further exploit details. The provider removed the form and says admin-console IP restrictions will remain in effect while it validates security.

The stolen data includes buyer and recipient names, addresses, phone numbers, email addresses and order details. The affected orders include records from before the November 10–11 intrusion. GoQSystem does not hold credit card data and excluded it from the leak. The November 13 totals count companies, orders and individuals separately. The provider planned to send affected merchants download instructions on November 14–15.

The first notice reported no further intrusion or known misuse at that time. The later impersonation warning gives no evidence of an active fake-site campaign. Buyers and recipients can verify whether their order was affected through the merchant’s established contact channel.
