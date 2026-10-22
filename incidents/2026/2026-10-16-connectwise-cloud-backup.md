---
title: "ConnectWise Cloud Backup's app secret got stolen, and attackers walked into Microsoft 365 tenants through the front door"
headline: "ConnectWise: steal one app secret, inherit 170 tenants"
level: 4
date: 2026-10-16
tags: [SaaS, OAuth, Microsoft 365]
ecosystems: [microsoft-365, entra-id]
summary: >-
  An API secret for ConnectWise's multi-tenant backup app (formerly SkyKick) was stolen. Every Microsoft 365
  tenant that had consented to the app was suddenly reachable with the permissions customers had granted it.
  ConnectWise suspended several cloud services.
splash: "Microsoft 365 tenants using ConnectWise Cloud Backup or Cloud Management: 173 confirmed, ~1,000 touched"
wipe: "Remove or re-consent the ConnectWise apps, review Entra sign-ins from 144.172.64.x, check for new Global Admins and app secrets"
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
checklist:
  - title: Find the ConnectWise / SkyKick apps in Entra ID
    hint: Enterprise applications → filter by publisher
  - title: Review sign-in and audit logs since Oct 13
    hint: IOCs 144.172.64.128, 144.172.64.99, 144.172.64.60
  - title: Check for new Global Admins
    hint: Role assignments made by service principals are the big tell
  - title: Check every app for new secrets or certificates
    hint: The attacker added credentials to other apps in the tenant
  - title: Re-consent only after ConnectWise restores service
    hint: Grant the minimum permissions the backup actually needs
sources:
  - name: ConnectWise Trust Center
    url: https://www.connectwise.com/company/trust/advisories
    says: Discovered Oct 14; backup archives encrypted and isolated, no sign they were compromised
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
