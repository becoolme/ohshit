---
title: "ConnectWise Cloud Backup's app secret got stolen, and attackers walked into Microsoft 365 tenants through the front door"
headline: "ConnectWise: steal one app secret, inherit 170 tenants"
level: 4
date: 2026-10-16
updated: 2026-10-24
tags: [SaaS, OAuth, Microsoft 365]
ecosystems: [microsoft-365, entra-id]
summary: >-
  An API secret for ConnectWise's multi-tenant backup app (formerly SkyKick) was stolen. Every Microsoft 365
  tenant that had consented to the app was suddenly reachable with the permissions customers had granted it.
  ConnectWise suspended several cloud services.
splash: "Microsoft 365 tenants using ConnectWise Cloud Backup or Cloud Management: 173 confirmed, ~1,000 touched"
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
  - date: Oct 15, 06:13–08:34 UTC
    title: Mass Microsoft Graph token grabs
    body: One abused Cloud Management app (“MS Teams”) gives itself Global Administrator in a tenant and adds secrets to other apps, including Huntress's.
  - date: Oct 16, 2026
    title: Huntress and ConnectWise go public
    body: 162 tenants confirmed by 19:00 UTC, later 173.
  - date: Oct 17, 07:00 UTC
    title: Seven app identities disabled; Cloud Backup suspended
    body: SaaS Security and Cloud Management are suspended as a precaution the next day.
  - date: Oct 21, 2026
    title: Phased restoration begins
  - date: Oct 21, 2026
    title: Microsoft attributes the compromise to Storm-0940
    body: ARTEX accelerated attempts against over 2,250 tenants; targeting does not establish data theft.
  - date: Oct 23, 2026, 14:00 UTC
    title: ConnectWise clarifies restoration is still being validated
    body: Backup-restore access is planned first, early the following week after successful validation; full service re-enrollment follows. Neither is confirmed available.
checklist:
  - title: Find the ConnectWise / SkyKick apps in Entra ID
    hint: Inventory application IDs and service-principal Object IDs, including integrations no longer in use
  - title: Review sign-in and audit logs, extending to Oct 1 where available
    hint: Preserve evidence before deleting apps; review service-principal sign-ins from Oct 1 where available, beyond known IPs
  - title: Check for new Global Admins
    hint: Role assignments made by service principals are the big tell
  - title: Check every app for new secrets or certificates
    hint: The attacker added credentials to other apps in the tenant
  - title: Re-consent only after ConnectWise restores service
    hint: Keep affected connections disabled until service-specific vendor instructions arrive. The October 23 notice plans backup-restore access before full re-enrollment, subject to testing; grant only the minimum permissions when instructed
sources:
  - name: ConnectWise Trust Center
    url: https://www.connectwise.com/company/trust/advisories
    says: October 23 restoration testing continues; backup-restore access first, full re-enrollment later; keep connections disabled. Archives remain encrypted, isolated and preserved, with no indication of compromise
    primary: true
  - name: Huntress
    url: https://www.huntress.com/blog/vendor-credential-enables-unauthorized-access
    says: ~1,000 tenants saw attacker activity, 300+ successful, 2 with confirmed post-compromise activity
    primary: true
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/hackers-use-compromised-connectwise.html
    says: 173 tenants confirmed; quotes Microsoft that Directory.ReadWrite.All was likely abused
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
product). They used it from the vendor's own home tenant to request Microsoft Graph tokens for customer
tenants. Six ConnectWise Cloud Management apps were abused as well. One of them gave itself **Global
Administrator** in a customer tenant and added secrets to other apps.

Huntress saw activity in about 1,000 Entra tenants, more than 300 of them successful, and confirmed
hands-on-keyboard activity in two. Whether data was stolen is unknown. Graph directory reads leave no audit
trail, so "no evidence" here does not mean "nothing happened".

**Update, October 22:** Microsoft attributes the compromise to the China-aligned Storm-0940 actor and describes ARTEX-assisted targeting of more than 2,250 tenants. This is an attempted-access count, not a revised confirmed-victim total. Microsoft observed follow-on credential and role changes in some environments but says authentication alone does not prove data theft. Preserve evidence, disable affected connections, and inspect other application credentials for persistence before re-consenting. L4 remains appropriate.

**Update, October 24:** The vendor's October 23, 14:00 UTC notice clarifies that restoration testing and security validation are still underway. The October 21 start of phased restoration work did not mean customer capabilities were already available. ConnectWise anticipates finishing validation by the end of the weekend, enabling access to restore existing backups early the following week, then full service re-enrollment. These are conditional plans, not confirmed restoration dates. Keep affected app connections disabled until the vendor provides instructions for your service, and continue investigating each tenant; restoring the vendor service does not remove tenant-level persistence.
