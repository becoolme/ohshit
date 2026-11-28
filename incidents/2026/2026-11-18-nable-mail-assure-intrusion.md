---
title: N-able confirms Mail Assure and SpamExperts Hosted Cloud server intrusion
date: 2026-11-18
updated: 2026-11-28
level: 4
tags:
  - N-able
  - SaaS
  - Email
  - Intrusion
summary: N-able patched CVE-2026-134624 after its Mail Assure/SpamExperts Hosted Cloud intrusion, separate from N-central. It reports all hosted services operational November 25 after phased recovery; mail flow continued. Its earlier finding was limited to one server after remediation; root cause and final data impact remain open.
splash: Hosted Cloud partners; older builds expose an LDAP relay-check SSRF to authenticated, high-privilege API users
wipe: Confirm build 20261121.1943 or later with N-able, follow partner-specific actions, and validate each restored service and integration.
inTheWild: yes
inTheWildNote: N-able confirms server intrusion; CISA separately lists CVE-2026-134624 as exploited.
cves:
  - id: CVE-2026-134624
    score: 9.3
    name: LDAP synchronization relay-check SSRF
    description: The connection check accepts arbitrary internal hosts/ports and crafted service traffic from an authenticated API user. N-able's CVSS 4.0 vector requires high privileges; this is not a standalone unauthenticated RCE claim.
fixed:
  - product: MailAssure / SpamExperts
    version: '20261121.1943'
    status: Vendor CNA affected-build boundary; Hosted Cloud remediation confirmed separately
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
  - date: Nov 21, 23:44 UTC
    title: Dashboard and API access restored
    body: N-able moves to monitoring, with services returning in phases and approximately an hour of active stability monitoring planned. Mail flow and filtering remain operational; further customer communications are promised.
  - date: Nov 22, 19:10 UTC
    title: N-able publishes the SSRF CVE and affected-build boundary
    body: The vendor CNA identifies builds before 20261121.1943 and rates CVE-2026-134624 at CVSS 4.0 9.3, with high API privileges required.
  - date: Nov 22, 19:30 UTC
    title: N-able confirms remediation and engages independent forensics
    body: The vendor says it found no evidence of exploitation beyond the initially identified hosted server after remediation and promises a root-cause analysis within two weeks. The investigation remains open.
  - date: Nov 23, 2026
    title: CISA adds CVE-2026-134624 to KEV
    body: Covered US federal agencies have a November 26 remediation deadline and forensic-triage requirements. This confirms exploitation of the flaw, without identifying the initial entry path of this hosted incident.
  - date: Nov 25, 22:00 UTC
    title: N-able reports full hosted-service restoration
    body: The public incident record moves to resolved and says all services are operational after restoration and monitoring. Outstanding customer issues go to Support; no root-cause report or final data-impact finding accompanies this update.
checklist:
  - title: Confirm the corrected build for the deployment you actually use
    hint: Ask N-able to confirm build 20261121.1943 or later for MailAssure/SpamExperts. The November 22 statement confirms Hosted Cloud remediation; do not install an N-central hotfix for this service. For Local Cloud, check Server > Settings and the configured weekly software update schedule, then have support verify the running build and security-update delivery. Do not infer that a hosted rollout patched a separately managed deployment.
  - title: Obtain the instructions for your environment
    hint: Check for N-able’s direct Mail Assure/SpamExperts partner email. Its November 18 update says the required action depends on the environment; contact N-able Technical Support if you did not receive it.
  - title: Verify restored functions in your environment
    hint: N-able reports all Hosted Cloud services operational as of November 25 at 22:00 UTC. Test portal/API access, quarantine, logs and mailbox synchronization in your own environment; route remaining issues to Technical Support. Service recovery does not clear earlier exposure or replace the environment-specific security actions.
  - title: Revalidate privileged API integrations and LDAP connection checks
    hint: Inventory API users able to configure relay LDAP synchronization, verify their privileges and review unexpected internal destinations with N-able. Follow the environment-specific partner notice for any credential or token replacement, then test affected API/OAuth integrations and LDAP synchronization; the readable November 22 public statement does not enumerate which customer credentials were exposed or reset. Preserve relevant logs before changes and escalate suspicious activity to support; an unusual request alone is not proof of compromise.
  - title: Apply the KEV response requirements where they govern your organization
    hint: CISA added CVE-2026-134624 on November 23 with a November 26 deadline for covered US federal agencies and mandatory forensic triage. Follow the vendor mitigations and applicable BOD 26-04 cloud-service and forensic-triage guidance linked in the KEV entry; discontinue use where required if mitigation is unavailable. Other operators should prioritize the same patch and investigation without treating that federal date as a universal legal deadline.
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
    says: Unauthenticated JSON used by the public status page; gives UTC timestamps and full history, including the November 25 all-services-operational resolution. The operational resolution supplies no final forensic findings.
  - name: N-able November 22 Mail Assure incident update
    url: https://www.n-able.com/blog/mail-assure-incident-update
    primary: true
    says: Confirms remediation, dashboard/API restoration, no observed exploitation beyond one hosted server since remediation, independent DFIR and a promised root-cause analysis; investigation remains open.
  - name: N-able CNA record for CVE-2026-134624
    url: https://cveawg.mitre.org/api/cve/CVE-2026-134624
    primary: true
    says: Vendor-authored record supplies the LDAP connection-check SSRF, affected custom-build boundary and CVSS 4.0 9.3 high-privilege vector; the linked advisory portal did not render readable content.
  - name: CISA Known Exploited Vulnerabilities catalog
    url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
    primary: true
    says: Lists the SSRF as exploited on November 23, with a November 26 federal deadline, forensic triage and cloud-service guidance.
  - name: Spam Experts Local Cloud monitoring and changes
    url: https://documentation.n-able.com/spamexperts/userguide/Content/se/lc/lc-monitor-change.htm
    primary: true
    says: Describes vendor-managed software updates on customer-owned Local Cloud hardware and the configurable weekly update schedule under Server > Settings.
---

N-able’s public status record corrects its earlier operational explanation: unauthorized access occurred on one server in the Mail Assure and SpamExperts Hosted Cloud environment. The public status record covers the Americas, APAC and Europe. The vendor says this is unrelated to the [N-central incident](/incidents/ncentral-hf2-attack-chains/). Its November 18 security confirmation is distinct from the earlier service disruption and the status record’s November 17 start time.

At 03:05 UTC on November 18, N-able said it had no evidence at that time that customer data, including tenants’ mailboxes, had been compromised. This was a point-in-time investigation statement, not proof that no exposure occurred. Later updates continue the investigation. The November 22 CVE identifies a vulnerability, but the reviewed primary sources do not establish the initial entry path, victim count, credential-exposure inventory or final data impact.

The 20:18 UTC update says inbound and outbound mail flow and filtering have continued throughout. At that point, the management portal, APIs, quarantine and logging remained offline while restoration was validated. Earlier updates also identify mailbox synchronization among supporting services being restored. These availability statements do not establish tenant-mailbox compromise.

N-able says it has emailed partners about their environments and whether action is needed. Partners who did not receive that communication should contact Technical Support. A publicly reposted message describes more specific credential actions, but those details have not been verified against a readable original vendor communication here; obtain your own instructions directly. L4 reflects vendor-confirmed unauthorized access at a hosted email-service provider, with downstream scope still under investigation.

At 00:01 UTC on November 19, N-able reported that it had begun testing some remediation measures while work on others continued. It requires security validation in a controlled environment before bringing back the dashboard, quarantine, logging, mailbox synchronization or API access. Mail flow and filtering continue normally; portal and API access remain disabled during testing. This is remediation progress, not a restoration announcement or a final impact assessment.

At 04:01 UTC on November 19, N-able reported additional platform hardening alongside remediation testing and the continuing investigation. Filtering remains normal and portal/API access remains disabled; this update does not announce restoration or a final impact assessment.

At 17:45 UTC on November 20, N-able said remediation and security validation had advanced and it was preparing to restore services. Portal and API access remain disabled until restoration begins; mail flow and filtering continue normally. This is a preparation milestone, not confirmation that supporting services recovered or that the investigation ended.

At 23:44 UTC on November 21, N-able announced that dashboard and API access had returned and moved the incident to monitoring. It described phased service restoration and planned approximately an hour of active stability monitoring, while promising further customer communications. The update does not explicitly confirm that quarantine, logging and mailbox synchronization have all returned, nor provide a final data-impact assessment. The older outage statements above describe their respective dates, rather than the current dashboard/API status.

N-able’s November 22 14:30 EST update says the identified vulnerability has been remediated and reports no evidence of exploitation beyond the initially identified hosted server since remediation. Independent DFIR is assisting; a fuller root-cause analysis is promised within two weeks. This is a bounded vendor finding, not a final clearance. It rounds dashboard/API restoration to November 21 23:45 UTC, while the status JSON records the announcement at 23:44:43 UTC; both refer to the same restoration, not two outages.

The vendor-authored CVE record describes an LDAP synchronization connection check used when configuring a relay. Before build 20261121.1943, an authenticated API user can probe arbitrary internal hosts/ports and send crafted traffic to services there. Its CVSS 4.0 score is 9.3 and the vector requires high privileges. It does not itself establish unauthenticated access, code execution or mailbox theft. The Hosted Cloud breach finding and the software build boundary have different scopes; Local Cloud operators should verify applicability and actual patch delivery with support.

CISA added CVE-2026-134624 to KEV on November 23. That is independent official confirmation that this flaw has been exploited, but it does not establish that it was the initial entry point into the single hosted server. The November 26 deadline and forensic-triage requirements apply to covered federal agencies; they are not a customer recovery-completion date.

At 22:00 UTC on November 25, the public incident record moved to resolved and reported all Hosted Cloud services operational following restoration and monitoring. It directs outstanding customer issues to Support. This supersedes the earlier phased-recovery status: the older November 21 update alone did not confirm every supporting function, but the later notice reports full service restoration. The record’s older top-level description still mentions offline services; its dated resolution is the later operational update. Recovery does not establish a final data-impact assessment or complete the separately promised root-cause analysis.
