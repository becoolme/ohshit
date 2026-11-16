---
title: NHN Dooray confirms account takeovers and data theft after password reset and API abuse
level: 4
date: 2026-11-13
tags: [Dooray, SaaS, Data breach, API keys]
summary: NHN Dooray says an attacker took over some accounts by repeatedly guessing password reset codes. A separate Open API flaw exposed some API keys that were then used for unauthorized calls. Dooray confirmed data theft and revoked all existing Service API and Admin API keys.
splash: Some Dooray customer accounts and people named in NHN Dooray work records. API integrations for private and public customers were suspended.
wipe: Reset compromised passwords, enable two-factor authentication, and wait for Dooray’s instructions to reissue revoked keys before restoring integrations.
inTheWild: 'yes'
inTheWildNote: NHN Dooray confirmed account takeovers, unauthorized API calls and data theft.
timeline:
  - date: Nov 12–13, 2026
    title: Attackers access Dooray accounts and call its API
    body: NHN Dooray later reports that password reset codes were guessed and leaked API keys were used.
  - date: Nov 13, 2026
    title: Dooray suspends the Service API and Admin API
    body: Dooray revokes all existing keys for both APIs, disrupting integrations and automation. It reports the incident to the Korea Internet and Security Agency.
  - date: Nov 14, 2026
    title: Dooray confirms data theft and begins notifying affected people
    body: Dooray identifies possible data fields, directs people to their individual notices for the actual fields, and says it has reported the leak to South Korea’s Personal Information Protection Commission.
checklist:
  - title: Secure affected accounts
    hint: Reset passwords on confirmed compromised accounts immediately through the usual Dooray sign-in page. Follow Dooray’s recommendation to change other Dooray account passwords and enable two-factor authentication where it is off. Ask your admin to review unusual password resets and sign-ins.
  - title: Inventory integrations that used revoked keys
    hint: Find Service API and Admin API credentials in automation, secret stores and connected tools. Inspect available API logs for unexpected calls. Dooray says it will email admins when the APIs reopen. Verify that message against the provider’s notice, issue replacement keys as directed, and test integrations before resuming queued jobs.
  - title: Confirm which data was taken and report suspicious activity
    hint: Check Dooray’s individual notification for your affected fields. Verify unexpected requests independently and avoid giving out passwords or verification codes. Use help@dooray.com or 1800-3629, listed in the provider’s notice, if you suspect further harm.
sources:
  - name: Dooray’s November 13 API suspension notice
    url: 'https://doorayhelp.oc.nhncloud.com/dooray/hc/notice/137/?lang=ko'
    says: Explains the key revocations, affected integrations and how admins will hear about resumption.
    primary: true
  - name: Dooray’s November 14 breach notice
    url: 'https://doorayhelp.oc.nhncloud.com/dooray/hc/notice/139/?lang=ko'
    says: Confirms the two attack paths, data theft, response steps and account protection guidance.
    primary: true
---

NHN Dooray runs a collaboration platform for private and public organizations. According to the provider, the attacker repeatedly entered codes in the password recovery flow until verification succeeded, then changed passwords and signed in. A flaw in the Open API also exposed some keys, and the provider confirmed outside callers used those keys. It blocked the IP addresses used in the attack, strengthened reset verification, revoked existing Service API and Admin API keys, and suspended both APIs.

Potentially exposed customer data includes project, drive, messenger and calendar material, as well as employee account IDs, names, external email addresses, phone numbers, departments, ranks, roles and company names. NHN Dooray also reported exposure involving personal data in its own work records, with possible fields including names, email addresses, mobile or other phone numbers, positions, departments and company names. Individual notices describe the actual fields involved. The notice does not give a total for affected people or organizations, confirm whether public-sector customers suffered data theft, or give an API reopening date.
