---
title: MeetsMore confirms account intrusions and theft of scheduling data
date: '2026-11-16'
level: 4
tags: [Data breach, Account takeover, SaaS]
summary: MeetsMore reports 201 account intrusions followed by exploitation of a scheduling feature, potentially exposing up to 366,850 records. It patched the flaw November 12 and forced affected accounts to reset passwords. Its separate KARTE exposure has different data and guidance.
splash: MeetsMore customers and providers with accessed accounts or potentially exposed scheduled-request records; ProOne is excluded.
wipe: Follow affected-account reset instructions, replace reused passwords and reissue meeting links registered inside MeetsMore.
inTheWild: 'yes'
inTheWildNote: MeetsMore confirms unauthorized logins and exploitation of its scheduling feature.
timeline:
- date: Nov 11–12, 2026
  title: Account intrusions precede scheduling-data theft
  body: MeetsMore reports 812 login attempts, 201 accessed accounts and subsequent exploitation of the provider-availability feature using an accessed account.
- date: Nov 12, 2026
  title: MeetsMore blocks attackers, patches the flaw and resets affected accounts
  body: It invalidated affected passwords, signed those accounts out on every device and requested password resets. It also checked similar data-access functions.
- date: Nov 13, 2026
  title: Regulators and police notified
  body: MeetsMore reported to Japan's Personal Information Protection Commission and communications ministry and consulted police.
- date: Nov 16, 2026
  title: Public disclosure distinguishes account access from scheduling records
  body: Up to 366,850 potentially exposed records is not a confirmed unique-person count or a count of compromised accounts.
checklist:
- title: Reset affected accounts and replace reused passwords
  hint: Follow MeetsMore's individual notice through the official site; affected passwords were invalidated and sessions terminated. Use distinct passwords on other services where you reused the same one.
- title: Reissue meeting links registered inside MeetsMore
  hint: Providers should replace those URLs. Only linked external-calendar event titles were exposed through the feature; external-calendar meeting URLs are excluded from that leak.
- title: Verify notices through the correct incident channel
  hint: Notices come from no-reply@meetsmore.com, but verify through the official disclosure and its contact form https://meetsmore.zendesk.com/hc/ja/requests/new?ticket_form_id=64278782468377 . Do not give passwords or card numbers by phone, email or SMS, or follow purported password-entry links in incident emails. Watch for impersonation by phone, visits, SMS and email.
sources:
- name: MeetsMore November 16 original disclosure
  url: https://company.meetsmore.com/page/notice-20261116
  primary: true
  says: Distinguishes the 201 accessed accounts from up to 366,850 scheduling records, describes field scope, containment, resets and meeting-link replacement.
- name: MeetsMore November 18 KARTE notice
  url: https://company.meetsmore.com/page/notice-20261118-karte
  primary: true
  says: Explicitly identifies a separate breach at KARTE with different causes, paths and exposed data.
---

MeetsMore says an attacker used an accessed account to exploit its provider-availability feature on November 11–12. Up to 366,850 scheduling records may have leaked: addresses, phone numbers, member/request identifiers, internally registered meeting URLs and, for linked external calendars, event titles only. Names, emails, passwords and cards are excluded from this feature leak, not from every possible view through an accessed account.

The preceding 201 account intrusions could expose requesters' registered names, emails and phone numbers, request history including addresses, and messages. Provider accounts could expose profiles, messages, schedules and associated customers' names, addresses and requests. MeetsMore suspects credentials obtained elsewhere; it found no evidence of credentials leaking from its own systems. It confirmed neither profile changes, sent messages nor payment operations. No related misuse or secondary harm was confirmed as of disclosure. ProOne runs separately and is unaffected.

The vendor patched the server-side flaw; it published neither technical exploit details nor a customer-installable version. The record limit, login attempts and accessed accounts are different measures. Active exploitation and the disclosed data scope warrant the severity rating. This is separate from the [KARTE breach](/incidents/plaid-karte-saas-access/); do not apply that notice's no-reset guidance to accounts reset in this incident.
