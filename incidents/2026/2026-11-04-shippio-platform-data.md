---
title: Shippio confirms customer-data access, document downloads and unauthorized API credentials
level: 4
date: '2026-11-04'
tags: [Shippio, SaaS, credentials]
summary: Shippio confirms access to all customers’ company/contact records and about 1,300 document downloads. Attackers used credentials stored in an internal tool, created unauthorized accounts/API credentials across about 1,100 teams and uploaded malicious files. Service remains paused; users must verify exports and renew API access after reopening.
splash: Shippio Platform customers and invited users; shipment, document and internal-file exposure varies by category.
wipe: Keep integrations paused, verify exported data against originals, then re-login and obtain fresh API access after official reopening.
inTheWild: 'yes'
inTheWildNote: Shippio confirms intrusion, document downloads and unauthorized account/API credentials.
cves: []
fixed: []
timeline:
- date: Oct 30, 2026
  title: Unauthorized access to an internal business tool begins
  body: Shippio says credentials stored in that tool were subsequently used to access its systems; the detailed root cause remains under investigation.
- date: Nov 1, 10:30 UTC
  title: First reported platform-intrusion window begins
  body: The vendor gives approximately November 1 19:30 to November 2 17:00 Japan time, equivalent to November 1 10:30 through November 2 08:00 UTC, with repeated access.
- date: Nov 2, 01:40 UTC
  title: Platform enters maintenance mode after detection
  body: The vendor gives 10:40 Japan time; it blocks known routes, changes credentials and investigates restoration. This service pause does not establish that all unauthorized access ended at that time.
- date: Nov 4, 2026
  title: Public notice confirms exposure and response steps
  body: Findings are stated as of November 3 18:00, without repeating an explicit timezone for that cutoff. The notice confirms record access, about 1,300 downloads and account/API-credential changes affecting about 1,100 teams. Reopening remains undated.
checklist:
- title: Confirm your organization’s exposure through the established support channel
  hint: Ask your account administrator to review notices sent to accounts held as of October 30, including invited users. Contact support@shippio.zohodesk.jp through the vendor’s published notice about your affected shipments, downloaded documents and internal shared-file exposure. About 1,300 documents is not a count of affected people; about 1,100 teams describes unauthorized account/API-credential creation.
- title: Verify saved exports before using them operationally
  hint: Compare downloaded records, CSV files and API-imported data from before the pause with your own original documents before using them. Shippio confirms unauthorized settings changes, while saying it has not confirmed shipment business-data rewriting. Preserve discrepant files and timestamps and report them through established support; follow any later re-registration instructions.
- title: Re-authenticate and renew integration access after official reopening
  hint: Keep integrations paused until Shippio confirms safe reopening and relevant restrictions. All login states have been reset, so sign in again afterward. External API integrations must obtain fresh access tokens; API-key holders may also be asked to reissue keys after reopening. Do not treat that conditional key requirement as a confirmed blanket key revocation or restart jobs using old tokens.
- title: Avoid unexpected shipment attachments and credential requests
  hint: After reopening, do not open unfamiliar files attached to shipments; report them to support. Shippio says malicious uploads were removed and it found no evidence customers downloaded them. The company will not ask for passwords, authentication codes or API keys. Report unexpected reset emails and verify requests through the known notice rather than following links or attachments.
sources:
- name: Shippio original November 4 incident notice
  url: https://www.shippio.io/news/20261104/
  primary: true
  says: Full Japanese original read through a normal public HTTP request after the web reader failed. Confirms category-specific exposure, unauthorized accounts/API credentials, malicious uploads, containment and customer recovery instructions; reopening and detailed root cause remain pending.
---

Shippio says an internal business tool was accessed from October 30 and stored credentials were used to reach Shippio Platform. Its public November 4 notice describes repeated platform access between approximately November 1 19:30 and November 2 17:00 Japan time. Detection and the service pause occurred on November 2; that pause is not evidence that the entire intrusion window ended immediately. All known routes are now blocked, according to the company. It has not named the internal tool, a CVE or a fixed customer software version; no connection to other recent SaaS incidents is established.

Company names, team names, phone numbers and addresses were viewed for **all customers**. Shipment information and document filenames/types were viewed for almost all customers that had registered shipments. Approximately **1,300 document files were downloaded**, with their details still being investigated. Some internal shared files were viewed or taken and may contain customer information; other internal documents contained non-user personal information whose scope remains under investigation. User names/emails were accessible, but bulk acquisition has not been observed. Shippio says platform login passwords were held by an external authentication provider, not stored in its own systems, and were not acquired in this incident. These categories must not be collapsed into one confirmed-person total.

The company confirms unauthorized user accounts and API credentials affecting approximately **1,100 contracted teams**, settings writes and malicious shipment-file uploads. It reports no evidence customers downloaded those malicious files and no confirmed rewriting of shipment business data. It removed unauthorized accounts/credentials and malicious files, restored changed settings, disabled the internal tool and changed or invalidated related credentials. It reset all login states; further environment/data-access validation and regulatory reporting/consultation remain in progress. No misuse of leaked information has been confirmed, which is not proof none occurred.

L4 reflects confirmed broad customer-data access and attacker-controlled accounts/API credentials in a shared logistics platform. The company remains in maintenance mode without a reopening deadline. Customer notices began November 2; the public article is dated November 4. No financial-loss figure or complete recovery is established.
