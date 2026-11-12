---
title: Leaked CROSS POINT API key exposed one customer’s membership data
summary: I’LL confirmed unauthorized retrieval of member records through a customer-specific API key. It blocked the source and reissued API keys for all customers. The affected member count is unknown.
splash: One CROSS POINT customer’s member records were accessible through its leaked API key. Integrations using revoked keys require updates.
wipe: Update integration secrets, verify synchronization and review member API requests.
inTheWildNote: I’LL confirmed that a third party used a leaked key to retrieve member data.
level: 3
date: '2026-11-09'
tags:
- CROSS POINT
- API keys
- data breach
inTheWild: 'yes'
timeline:
- date: Nov 7, 2026
  title: I’LL detects unauthorized API access in Japan
  body: The vendor revokes and reissues the affected key and blocks the source. The detection date is in Japan time.
- date: Nov 9, 13:15 UTC
  title: Vendor completes reissuance for all customers
  body: The vendor gives 22:15 Japan time and says it strengthened detection.
- date: Nov 9, 23:31 UTC
  title: Vendor publishes its investigation and response
  body: The announcement is dated November 10 in Japan and confirms that one customer organization was affected.
checklist:
- title: Update integrations with reissued credentials
  hint: Get the replacement through your established I’LL support channel. Update the secret store and dependent POS, ecommerce and membership jobs. Confirm approved requests succeed, old keys are rejected, and reconcile failed operations before replaying them to avoid duplicating member or points changes.
- title: Scope unauthorized retrieval
  hint: Preserve member API and integration logs. Review calls using the old key for unexpected sources, unusual volume or member lookups. Coordinate with I’LL to confirm which records were retrieved and notify affected members through established channels.
- title: Limit and monitor replacement keys
  hint: Store keys securely, reduce permissions to those required by each integration and schedule rotation. Members should verify unexpected points or purchase messages through the merchant’s official channel.
sources:
- name: I’LL CROSS POINT incident notice
  says: Confirms abuse of a customer-specific key, the affected fields, all-customer key reissuance and continuing investigation.
  url: https://www.ill.co.jp/info/261110/
  primary: true
---

I’LL says the attacker used one customer’s legitimate API key after it leaked and obtained member data through the member information API. The vendor attributes the access to credential abuse and reports no direct database intrusion, tampering or software flaw. It found no signs of disclosure at other customers as of the notice. The affected organization, the number of member records and how the key leaked remain undisclosed.

The accessed data includes names, dates of birth, gender, postal and contact details, member numbers and tiers, points balances, in-store loyalty card numbers, online member IDs, and purchase statistics such as total spend, purchase counts and first or last purchase dates. The vendor says the affected system did not store payment-card data or login passwords. The product-wide key rotation applies to all customers and the confirmed data retrieval concerns one customer organization.
