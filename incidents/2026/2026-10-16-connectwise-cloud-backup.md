---
title: "ConnectWise Cloud Backup's app secret got stolen, and attackers walked into Microsoft 365 tenants through the front door"
headline: "ConnectWise: one app secret opens too many tenant doors"
level: 4
date: 2026-10-16
updated: 2026-11-01
tags: [SaaS, OAuth, Microsoft 365]
ecosystems: [microsoft-365, entra-id]
summary: >-
  A stolen ConnectWise/SkyKick app secret enabled unauthorized M365 tenant access. By October 30,
  re-authorized tenants could back up and restore through a new application; reporting and notifications
  were still returning in phases. Tenant investigation remains necessary.
splash: "M365 tenants that authorized affected apps; Huntress saw ~1,000 sign-in targets and >300 successful sign-ins"
wipe: "Disable affected app connections, preserve Entra evidence, inspect app credentials and roles; re-consent only on vendor instructions"
inTheWild: "yes"
inTheWildNote: Huntress confirmed post-compromise activity in 2 tenants
oneLiner: >-
  The backup app already held keys to every customer's Microsoft 365; steal the app's own secret and you get
  all those keys at once, no phishing required.
timeline:
  - date: Oct 13–14, 2026
    title: Password spraying from the attacker's IP
  - date: Oct 14, 2026
    title: ConnectWise discovers the issue
  - date: Oct 15, 03:44–03:48 UTC
    title: Privilege changes and credential planting observed in one tenant
    body: Huntress later confirms similar post-compromise activity in a second tenant; it does not establish that the earlier changes and later public-IP sign-ins had the same operator.
  - date: Oct 15, 06:13–08:44 UTC
    title: Huntress observes vendor-credential application sign-ins
    body: The October 19 update extends the last observed successful sign-in to 08:44 UTC.
  - date: Oct 16, 2026
    title: Huntress and ConnectWise go public
    body: Huntress confirmed unauthorized sign-ins in 162 tenants by 19:00 UTC. THN later reported 173; that is not an independently verified total.
  - date: Oct 17, 07:00 UTC
    title: Seven app identities disabled; Cloud Backup suspended
    body: SaaS Security and Cloud Management are suspended as a precaution the next day.
  - date: Oct 19, 2026
    title: Huntress updates its telemetry and IP classifications
    body: Two tenants had confirmed post-compromise changes; shared Azure addresses and failed password sprays require separate interpretation.
  - date: Oct 21, 2026
    title: Phased restoration begins
  - date: Oct 21, 2026
    title: Microsoft attributes the compromise to Storm-0940
    body: ARTEX accelerated attempts against over 2,250 tenants; targeting does not establish data theft.
  - date: Oct 23, 2026, 14:00 UTC
    title: ConnectWise clarifies restoration is still being validated
    body: Backup-restore access is planned first, early the following week after successful validation; full service re-enrollment follows. Neither is confirmed available.
  - date: Oct 28, 16:00 UTC
    title: Re-enrollment opens through a new application
    body: Partners must reset their portal password, configure MFA and re-authorize every M365 tenant through ConnectWise Cloud Backup for M365.
  - date: Oct 30, 21:00 UTC
    title: Backups, restores and customer monitoring are available
    body: Phases 1 and 2 are complete for re-authorized tenants; reporting, export jobs, billing and notifications are not all restored. Verify a successful new snapshot rather than assuming re-authorization resumed backups.
checklist:
  - title: Identify and disable affected ConnectWise / SkyKick apps
    hint: "In Entra Enterprise applications, preserve local service-principal Object IDs and disable affected connections; do not delete the apps. Huntress lists seven application IDs: 506e08f9-6e9a-4da4-942b-a099a03644ae, 2399d300-6fca-4e6a-a686-399fefe75b83, 24205314-2b89-4e07-a2a4-579e898a5640, b78f6a77-d4e5-46fb-87e5-d1648bd02519, 0de14c77-b9b0-4137-9360-34878a929827, 412dcf96-176d-4b3a-a1b0-4981ad66971e, b2b55f5b-7758-4719-8d8f-88ae172e6bdb. Map names using its full table; include integrations no longer in use. Presence alone does not prove abuse"
  - title: Review sign-in and audit logs, extending to Oct 1 where available
    hint: Preserve Entra sign-in/audit and available Graph records without delaying containment. Use the Service principal sign-ins tab, not User sign-ins; review from Oct 1 where available, beyond published IPs
  - title: Check for new Global Admins
    hint: Review Entra directory-role assignments by service principals; after preserving evidence and disabling the app, remove privileges you did not intentionally grant
  - title: Check every app for new secrets or certificates
    hint: Review Enterprise applications and App registrations for unexpected secrets or certificates added since Oct 13. Preserve evidence, then remove unauthorized credentials; disabling ConnectWise alone does not remove these footholds
  - title: Correlate published indicators with application activity
    hint: "Microsoft lists six IPs and five User-Agents: 144.172.64.128, 144.172.64.99, 144.172.64.60, 187.15.88.186, 187.15.90.217, 187.15.89.186; its full IoC table supplies all User-Agents. The three VPN IPs need October 15\u201316 context. Huntress additionally discusses 144.172.94.243 and shared Azure ULA fde4:8dba:2600:37ce:6d26:200:a76:*. Huntress observed only .128 for public-IP app sign-ins and classifies the other RouterHosting addresses as failed user logins/sprays, while Microsoft links .99 and .60 to its broader campaign. Correlate actor, app and operation; a match alone does not prove compromise, and the ULA is also legitimate traffic"
  - title: Re-enroll through the new application and verify backups
    hint: Use Forgot password at login.cloudservices.connectwise.com, configure MFA, then follow the Trust Center instructions for each tenant using ConnectWise Cloud Backup for M365. Keep old disabled applications disabled unless ConnectWise specifically instructs otherwise. Check for a newly completed snapshot; re-authorization alone does not confirm recovery and the historical backup gap remains. A repeated password-reset status 500 needs cloud-support@connectwise.com assistance. Continue tenant investigation; re-enrollment does not remove persistence
sources:
  - name: ConnectWise Trust Center
    url: https://www.connectwise.com/company/trust/advisories
    says: October 30 phases 1 and 2 complete for re-authorized M365 tenants; use the new app, reset portal passwords, configure MFA and verify new snapshots. Old disabled apps stay disabled. Archives remain encrypted, isolated and preserved, with no indication of compromise
    primary: true
  - name: Huntress
    url: https://www.huntress.com/blog/vendor-credential-enables-unauthorized-access
    says: ~1,000 sign-in targets, 300+ successful, two with post-compromise changes; seven application IDs and qualified IP/User-Agent evidence
    primary: true
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/hackers-use-compromised-connectwise.html
    says: Reports 173 affected tenants without an independently confirmed total; quotes likely Directory.ReadWrite.All abuse
  - name: SecurityWeek
    url: https://www.securityweek.com/connectwise-suspends-cloud-services-in-response-to-cyberattack/
    says: Service suspension timeline
  - name: Microsoft Threat Intelligence
    url: https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/
    says: Attributes the compromise to Storm-0940; over 2,250 tenants targeted with ARTEX; preserve evidence and inspect downstream persistence
    primary: true
---

Backup apps need wide access to your tenant: they read every mailbox, every OneDrive and every Team. In
Microsoft 365 that access belongs to the vendor's **multi-tenant app**. So the vendor's app secret is a
master key to every customer who clicked "Accept".

Here, an attacker got hold of an **API secret for ConnectWise's Cloud Backup app** (the former SkyKick
product). The vendor-side credential was used to request Microsoft Graph tokens for consenting customer
tenants. ConnectWise disabled six Cloud Management identities alongside Cloud Backup; that does not establish abuse of all seven. Huntress reports abuse of the Teams, Exchange Online and SharePoint Online apps. The Teams app granted itself **Global Administrator** and added credentials to other applications.

Huntress saw activity in about 1,000 Entra tenants, more than 300 of them successful, and confirmed
post-compromise activity in two. THN’s earlier 173-tenant figure is unverified as a total and is not interchangeable with Huntress’s sign-in counts. Whether data was stolen is unknown. Graph directory reads leave no audit
trail, so "no evidence" here does not mean "nothing happened".

**Update, October 22:** Microsoft attributes the compromise to the China-aligned Storm-0940 actor and describes ARTEX-assisted targeting of more than 2,250 tenants. This is an attempted-access count, not a revised confirmed-victim total. Microsoft observed follow-on credential and role changes in some environments but says authentication alone does not prove data theft. Preserve evidence, disable affected connections, and inspect other application credentials for persistence before re-consenting. L4 remains appropriate.

**Update, October 24:** The vendor's October 23, 14:00 UTC notice clarifies that restoration testing and security validation are still underway. The October 21 start of phased restoration work did not mean customer capabilities were already available. ConnectWise anticipates finishing validation by the end of the weekend, enabling access to restore existing backups early the following week, then full service re-enrollment. These are conditional plans, not confirmed restoration dates. Keep affected app connections disabled until the vendor provides instructions for your service, and continue investigating each tenant; restoring the vendor service does not remove tenant-level persistence.

**Update, November 1 (UTC):** The October 28–30 vendor notices replace the earlier conditional recovery forecast. Backups and restores are available for re-authorized M365 tenants, and the customer portal and backup-monitoring dashboards have returned. Backup Health reporting, export jobs and billing features are still being restored; notifications follow the supporting services. Reset the portal password, configure MFA and authorize each tenant through the new **ConnectWise Cloud Backup for M365** application using the Trust Center instructions. Do not re-enable the old disabled applications without specific vendor direction. Confirm a successful new snapshot: enrollment does not erase the backup-history gap or replace investigation of tenant-level persistence. The vendor still reports no indication that preserved backup archives or other ConnectWise products were compromised; that is its investigation status, not an independent guarantee.
