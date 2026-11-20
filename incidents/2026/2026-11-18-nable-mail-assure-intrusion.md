---
title: N-able confirms Mail Assure and SpamExperts Hosted Cloud server intrusion
date: 2026-11-18
updated: 2026-11-20
level: 4
tags:
  - N-able
  - SaaS
  - Email
  - Intrusion
summary: N-able confirms unauthorized server access in Mail Assure and SpamExperts Hosted Cloud, separate from N-central. Mail flow and filtering continue, while management, API, quarantine and logging remain offline. Partners are being emailed environment-specific instructions.
splash: Mail Assure and SpamExperts Hosted Cloud partners across the Americas, APAC and Europe
wipe: Read the partner-specific email, contact N-able support if it is missing, and track secure restoration on the official incident page.
inTheWild: yes
inTheWildNote: N-able confirms unauthorized access to a server in the hosted environment.
timeline:
  - date: Nov 16, 2026
    title: N-able initially treats disruption as a service issue
    body: Its later security update says customers were informed about a disruption on this date.
  - date: Nov 17, 03:00 UTC
    title: Public incident record starts
    body: Dashboard and supporting-service problems are initially investigated as an operational issue.
  - date: Nov 18, 03:05 UTC
    title: N-able confirms a security incident
    body: The vendor identifies unauthorized access to one server, disables UI/API access and says the incident is unrelated to N-central.
  - date: Nov 18, 20:18 UTC
    title: N-able confirms partner-specific communications
    body: Mail flow and filtering continue. UI, APIs, quarantine and logging remain offline; N-able asks partners without its email to contact Technical Support.
  - date: Nov 19, 00:01 UTC
    title: N-able starts testing remediation measures
    body: Some measures are in testing while others remain in progress. Dashboard, quarantine, logging, mailbox synchronization and API access must pass security validation in a controlled environment before returning online; portal and API access remain disabled.
  - date: Nov 19, 04:01 UTC
    title: N-able continues platform hardening alongside remediation testing
    body: Investigation and testing continue while additional security hardening is applied. Mail filtering operates normally; portal and API access remain disabled as a precaution.
  - date: Nov 20, 17:45 UTC
    title: N-able prepares for service restoration after validation progress
    body: The vendor reports that key remediation and security validation have advanced. Mail flow/filtering remain normal; portal and API access stay disabled until restoration begins. No restoration completion or final data-impact finding is announced.
checklist:
  - title: Obtain the instructions for your environment
    hint: Check for N-able’s direct Mail Assure/SpamExperts partner email. Its November 18 update says the required action depends on the environment; contact N-able Technical Support if you did not receive it.
  - title: Account for unavailable management and quarantine functions
    hint: The official record says customers may be unable to sign in, review logs, release quarantined messages or change domains. Mail flow and filtering continuing does not mean these supporting functions have recovered. Track the incident page for validated restoration.
  - title: Keep this incident separate from the N-central response
    hint: N-able explicitly says the events are unrelated. Follow the Mail Assure/SpamExperts instructions for these services and retain any N-central remediation independently; an N-central upgrade is not a stated fix for this hosted incident.
sources:
  - name: N-able public incident 202672
    url: https://uptime.n-able.com/event/202672/
    primary: true
    says: Confirms server intrusion, distinct N-central scope, continuing mail flow and partner communications.
  - name: N-able public dashboard data for incident 202672
    url: https://uptime.n-able.com/api/v1/private/dashboard/event/202672/
    primary: true
    says: Unauthenticated JSON used by the public status page; explicitly gives UTC timestamps and the full update history.
---

N-able’s public status record corrects its earlier operational explanation: unauthorized access occurred on one server in the Mail Assure and SpamExperts Hosted Cloud environment. The vendor says this is unrelated to the [N-central incident](/incidents/ncentral-hf2-attack-chains/). Its November 18 security confirmation is distinct from the earlier service disruption and the status record’s November 17 start time.

At 03:05 UTC on November 18, N-able said it had no evidence at that time that customer data, including tenants’ mailboxes, had been compromised. This was a point-in-time investigation statement, not proof that no exposure occurred. Later public updates continue the investigation without establishing a victim count, an entry vulnerability, a credential-exposure inventory or a final data-impact assessment.

The 20:18 UTC update says inbound and outbound mail flow and filtering have continued throughout. The management portal, APIs, quarantine and logging remain offline while restoration is validated. Earlier updates also identify mailbox synchronization among supporting services being restored. These availability statements do not establish tenant-mailbox compromise.

N-able says it has emailed partners about their environments and whether action is needed. Partners who did not receive that communication should contact Technical Support. A publicly reposted message describes more specific credential actions, but those details have not been verified against a readable original vendor communication here; obtain your own instructions directly. L4 reflects vendor-confirmed unauthorized access at a hosted email-service provider, with downstream scope still under investigation.

At 00:01 UTC on November 19, N-able reported that it had begun testing some remediation measures while work on others continued. It requires security validation in a controlled environment before bringing back the dashboard, quarantine, logging, mailbox synchronization or API access. Mail flow and filtering continue normally; portal and API access remain disabled during testing. This is remediation progress, not a restoration announcement or a final impact assessment.

At 04:01 UTC on November 19, N-able reported additional platform hardening alongside remediation testing and the continuing investigation. Filtering remains normal and portal/API access remains disabled; this update does not announce restoration or a final impact assessment.

At 17:45 UTC on November 20, N-able said remediation and security validation had advanced and it was preparing to restore services. Portal and API access remain disabled until restoration begins; mail flow and filtering continue normally. This is a preparation milestone, not confirmation that supporting services recovered or that the investigation ended.
