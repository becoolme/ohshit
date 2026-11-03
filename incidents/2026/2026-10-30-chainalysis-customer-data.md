---
title: Chainalysis security maintenance affects additional products and KYT features
date: 2026-10-30
level: 3
tags:
- Chainalysis
- SaaS
- data breach
summary: Chainalysis paused Reactor, Data Solutions, Chain (Beta) and Rapid; Academy and Hexagate may be affected, and KYT has exceptions. Customer user IDs, names, emails and organization roles were accessed; no evidence yet of investigation content, cleartext passwords, MFA-secret or session-token access. Other KYT/Address Screening functions operate.
splash: 'Chainalysis customers: four products paused, possible Academy/Hexagate impact and KYT exceptions; identity-data scope under investigation'
wipe: Enable two-factor authentication, scrutinize unexpected login or reset prompts and obtain your organization's affected-record breakdown
inTheWild: 'yes'
inTheWildNote: Chainalysis confirms unauthorized access to systems, tools and customer identity data.
cves: []
fixed: []
timeline:
- date: Oct 30, 2026
  title: Chainalysis publishes its incident notice and customer email
- date: Nov 2, 2026
  title: Chainalysis takes selected products offline
  body: Reactor and Data Solutions are among products proactively disabled while external experts complete security assessments. The blog says compliance transaction monitoring continues under close monitoring; status-page exceptions are detailed below.
- date: Nov 2, 15:50 UTC
  title: Status page specifies transaction-monitoring exceptions
  body: KYT and Address Screening run as usual except for KYT Graph preview and its Reactor integration.
- date: Nov 2, 17:26 UTC
  title: Login issues may accompany maintenance
  body: Chainalysis warns that users may experience issues logging in while critical maintenance continues.
- date: Nov 2, 19:43 UTC
  title: More products and monitoring features affected
  body: Data Solutions, Chain (Beta) and Rapid join Reactor as temporarily unavailable; some Hexagate monitoring capabilities may be affected.
- date: Nov 3, 14:30 UTC
  title: Academy training may also be inaccessible
  body: The company adds its training platform to the security-maintenance impact; restoration work continues without a deadline.
checklist:
- title: Enable two-factor authentication
  hint: Ask your existing Chainalysis account manager for help if your organization has not enabled it. Check unexpected authentication or password-reset prompts through your normal sign-in route before responding.
- title: Confirm your organization's exposure
  hint: Follow the direct customer updates and request the promised record breakdown. Treat unsolicited recovery or recruiting messages cautiously; verify senders through an established contact rather than links in the message.
- title: Plan around the product-specific interruption
  hint: Check the official security-maintenance incident and your account manager before relying on Reactor, Data Solutions, Chain (Beta) or Rapid. Some Hexagate monitoring may be affected; KYT and Address Screening otherwise operate, except KYT Graph preview and Reactor integration. Login issues may occur. The November 3 14:30 UTC update also warns Academy training may be inaccessible; maintenance continues without a restoration deadline. Report suspicious activity to your IT/security team and follow established protocols.
sources:
- name: Chainalysis original notice and full customer email
  url: https://www.chainalysis.com/blog/security-incident-october-30/
  primary: true
- name: BleepingComputer report and company response
  url: https://www.bleepingcomputer.com/news/security/chainalysis-discloses-data-breach-from-offensive-agentic-techniques/amp/
- name: Chainalysis security-maintenance incident history
  url: https://status.chainalysis.com/incidents/wpnnvwyvcnkz
  says: Product-specific interruptions, KYT exceptions and possible login/Hexagate impact; November 3 14:30 UTC adds possible Academy inaccessibility.
  primary: true
updated: 2026-11-03
---

The company describes offensive agentic techniques but identifies no attack framework, CVE or complete access window. Its investigation has found no indication of access to graphs, notes, cases, transaction or query results, cleartext passwords, MFA secrets or session tokens; that is an interim assessment, not proof exposure was impossible. Patching and external investigation continue. Chainalysis explicitly separates this event from Binance's theft. L3 reflects confirmed customer-data access without an established mass-leak total.

**November 2 service update:** Chainalysis reports ongoing cyber threats associated with this incident. It has proactively disabled selected products, including Reactor and Data Solutions, pending further assessments with external security experts. Its blog says compliance transaction monitoring continues under close monitoring; the status-page exceptions below qualify that statement. These decisions do not establish new confirmed data exposure or completed containment; the investigation and organization-specific impact review continue.

**Product-specific status:** The November 2 status history qualifies the broader transaction-monitoring statement: KYT Graph preview and the KYT integration with Reactor are exceptions to normal KYT/Address Screening operation. It also identifies possible login issues, additional outages for Chain (Beta) and Rapid, and possible impact to some Hexagate monitoring. The November 3 14:30 UTC update adds that the Academy training platform may be inaccessible; maintenance continues. These availability effects do not establish additional data access or a completed recovery.
