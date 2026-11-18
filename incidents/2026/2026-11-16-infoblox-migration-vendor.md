---
title: Infoblox confirms company data accessed through a compromised migration vendor
level: 3
date: 2026-11-16
tags: [Infoblox, SharePoint, third party, data breach]
summary: Infoblox confirmed unauthorized access to company information through a compromised migration vendor. The Register reports stolen staff data from a CEO email it reviewed and customer NIOS snapshots from sources. Counts and detailed scope remain unconfirmed publicly; product involvement is not indicated.
splash: Notified staff and potentially customers whose information was held in the affected company systems; exact scope remains unknown
wipe: Follow verified notifications, assess any exposed network snapshots, and watch for identity fraud and targeted phishing
inTheWild: 'yes'
inTheWildNote: Infoblox confirmed unauthorized company-information access to The Register.
timeline:
  - date: Nov 16, 21:53 UTC
    title: The Register publishes Infoblox's confirmation
    body: The company says it activated response procedures, engaged outside experts and sent notifications. The reporter reviewed a staff notification; victim totals and technical details remain undisclosed.
checklist:
  - title: Confirm whether your organization or household was notified
    hint: Use established Infoblox support or HR channels to verify affected records and offered assistance. The Register reports two years of credit monitoring for affected staff and dependents. Be alert to phishing, vishing and identity fraud; do not trust unsolicited messages claiming to enroll you.
  - title: Assess network configuration exposure with Infoblox
    hint: Ask whether your NIOS snapshots, Grid databases or logs were involved and what fields they contained. As general response guidance, preserve evidence, review exposed topology and access details, and rotate secrets only if confirmed exposed. The report does not establish a vulnerability in deployed NIOS or justify a blanket product upgrade or reset.
sources:
  - name: Infoblox spokesperson and staff notification reported by The Register
    url: https://www.theregister.com/security/2026/11/16/infoblox-customer-and-staff-data-exposed-in-sharepoint-breach/5310280
    primary: true
    says: Carries a direct company confirmation and describes a CEO email the reporter reviewed. SharePoint access and customer snapshot categories are separately attributed to sources; the company did not confirm detailed categories or totals publicly.
---

Infoblox confirmed a breach through an unnamed data-migration provider. According to The Register's sources, attackers used the provider's trusted SharePoint access and took customer NIOS recovery snapshots containing DNS/DHCP configurations, Grid databases and reporting logs. That detailed customer scope remains source-reported, not publicly confirmed by the vendor.

The reporter says a reviewed CEO email identifies employee and dependent contact, birth-date, Social Security and direct-deposit information. No affected-person or customer total is established. The company reports containment steps and outside assistance, with no indication that its products, cloud services, software updates or build/release processes were involved. This is not evidence of a Microsoft SharePoint vulnerability or a compromised software release. Confirmed access at a mainstream security supplier supports L3; mass impact and a wider supply-chain compromise are not established. Exact intrusion dates, vendor identity and final investigation results remain unknown.
