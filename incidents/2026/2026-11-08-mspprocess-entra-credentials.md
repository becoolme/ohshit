---
title: "MSP Process intrusion exposes Microsoft Entra integration credentials"
level: 4
date: 2026-11-08
tags: [msp, entra, gdap, credentials, breach]
ecosystems: [microsoft-365, entra]
summary: >-
  MSP Process confirmed an intrusion and says it notified affected partners. A customer-posted copy of its
  notice says an attacker reached storage holding Entra application secrets, an administrator refresh token
  and delegated tenant information. The notice reports credential abuse in customer tenants.
splash: "MSPs using MSP Process with Microsoft Partner Center and their clients with delegated Entra integrations."
wipe: "Delete connected app secrets, revoke the consenting admin's sessions, and hunt for persistence in partner and client tenants."
inTheWild: "yes"
inTheWildNote: "MSP Process confirmed an intrusion. A reposted customer notice reports tenant abuse."
timeline:
  - date: "Nov 7, 09:56 UTC"
    title: "Attacker accesses integration storage"
    body: "The customer-posted notice places access between 09:56 and about 14:40 UTC."
  - date: "Nov 7, 19:05 UTC"
    title: "Stolen storage key stops working"
    body: "The customer-posted notice says MSP Process removed the attacker's access and rotated its platform credentials."
  - date: "Nov 8, 2026"
    title: "Customer notice surfaces and MSP Process confirms the intrusion"
    body: "Founder Patrick Leonard says the company notified affected partners and is still investigating."
checklist:
  - title: "Cut off the affected integration"
    hint: >-
      In the partner tenant, go to Entra ID → App registrations → Certificates & secrets and delete every
      client secret on each app connected to MSP Process. Coordinate with client tenant admins to disable
      affected enterprise apps during containment. Wait for vendor guidance before reconnecting.
  - title: "Revoke the consenting administrator's sessions"
    hint: >-
      In Entra ID → Users, select the account that granted consent and choose Revoke sessions. For accounts
      showing compromise, block sign-in during investigation, reset passwords, remove unauthorized MFA
      methods and revoke sessions. Existing access tokens or application sessions can persist temporarily.
  - title: "Preserve logs and hunt across partner and client tenants"
    hint: >-
      Export Entra audit and sign-in logs from Nov 7, 09:00 UTC onward. Search service principal sign-ins by
      the connected app IDs and review privileged user sign-ins, unexpected password resets, authentication
      changes including Temporary Access Passes, new app or service principal credentials, new users,
      directory role assignments and app consents. Check Exchange audit logs for inbox rules and forwarding.
      Petra reported activity from shared Azure IP 172.169.63[.]30. A match alone does not prove compromise.
  - title: "Remove attacker access and coordinate recovery"
    hint: >-
      Remove unauthorized secrets, certificates, MFA methods, accounts, roles, consents, rules and
      forwarding after preserving evidence. Contact MSP Process via a known support channel with affected
      tenant and app IDs and relevant timestamps. Notify affected clients and confirm each tenant's cleanup
      before re-enabling the integration.
sources:
  - name: "MSP Process founder's public response"
    url: https://www.reddit.com/r/msp/comments/1xqkpva/comment/19sax55tiu9pe/
    primary: true
    says: "Confirms the attack, notifications to affected partners by email and SMS, and an ongoing investigation."
  - name: "Customer-posted copy of the MSP Process notice"
    url: https://www.reddit.com/r/msp/comments/1xqkpva/msp_process_got_popped_check_your_tenants/?sort=top
    says: "Describes the storage access window, credential exposure, downstream abuse and containment steps."
  - name: "Petra incident observation"
    url: https://www.reddit.com/r/msp/comments/1xqkpva/comment/19saw6yal131g/
    primary: true
    says: "Observed unusual service principal activity from a shared Azure IP and says attribution is inconclusive."
  - name: "Microsoft Entra emergency access revocation guidance"
    url: https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access
    primary: true
    says: "Explains user session revocation and why some access may persist until tokens or sessions expire."
---

The customer-posted notice describes an attacker reaching an MSP Process storage account after entering
an internal server. The affected integration uses Microsoft Partner Center's granular delegated admin
privileges (GDAP) for Authenticator, password reset and contact synchronization. The storage held Entra
app IDs and client secrets, the refresh token for the administrator who connected the integration, and
a list of client tenants and their delegated roles.

With a stolen client secret, an attacker can obtain an app token without signing in as a user or
passing user MFA. The possible actions depend on which application permissions the MSP granted.
The notice lists permissions to manage applications, grant app roles, write user records, reset
passwords and change authentication methods. The notice reports use against client tenants of at least
two MSPs and does not establish the total number of affected tenants or what was copied for each partner.

MSP Process founder Patrick Leonard publicly confirmed that the company sent notices and was still
investigating. The initial entry method and full scope remain unknown. Removing the original secret
stops its use for new tokens. It leaves any credentials or permissions the attacker added in place,
so check both the partner tenant and each connected client tenant.
