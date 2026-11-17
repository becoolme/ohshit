---
title: Chainalysis security maintenance affects additional products and KYT features
date: 2026-10-30
level: 3
tags:
- Chainalysis
- SaaS
- data breach
summary: Chainalysis restored Reactor, Data Solutions and iAPI. Reactor users outside an approved network can now verify by email. Rapid and Academy remain unavailable. Confirmed access to customer data included user IDs, names, emails and organization roles.
splash: Chainalysis customers and their security teams, including Reactor users signing in from outside approved networks.
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
- date: Nov 3, 17:00 UTC
  title: Academy offers extra time for affected exams
  body: The company says affected certification or exam customers will receive additional time or deadline extensions as appropriate; system restoration continues.
- date: Nov 3, 19:56 UTC
  title: Customer Admin Portal functionality may also be unavailable
  body: Ongoing security maintenance may temporarily affect some Customer Admin Portal functions; the company does not announce complete restoration.
- date: Nov 3, 23:05 UTC
  title: Customer Admin Portal functionality restored
  body: Previously affected portal functionality is back; wider security maintenance and product restrictions continue. The incident now also lists Rapid Lookup.
- date: Nov 4, 08:28 UTC
  title: Knowledge Base access also affected
  body: Chainalysis adds its Knowledge Base to the ongoing security-maintenance impact; work to restore systems continues. This is an availability update, not confirmation of additional data access.
- date: Nov 7, 19:31 UTC
  title: Reactor, KYT and Address Screening return
  body: The company continues restoring customer access in phases.
- date: Nov 10–11, 2026
  title: Data Solutions, the Customer Admin Portal and iAPI return
  body: The company publishes separate restoration updates for the three services.
- date: Nov 14, 11:59 UTC
  title: Reactor gains email verification
  body: Outside approved networks, verify by email before signing in to the product. Rapid and Academy remain unavailable.
checklist:
- title: Enable two-factor authentication
  hint: Ask your existing Chainalysis account manager for help if your organization has not enabled it. Check unexpected authentication or password-reset prompts through your normal sign-in route before responding.
- title: Confirm your organization's exposure
  hint: Follow the direct customer updates and request the promised record breakdown. Treat unsolicited recovery or recruiting messages cautiously; verify senders through an established contact rather than links in the message.
- title: Plan around the product-specific interruption
  hint: Follow the password-reset and API-key guide at https://www.chainalysis.com/key-rotation/. Check the official security-maintenance incident and your account manager before relying on Reactor, Data Solutions, Chain (Beta) or Rapid. Some Hexagate monitoring may be affected; KYT and Address Screening otherwise operate, except KYT Graph preview and Reactor integration. Login issues may occur. The November 3 14:30 UTC update also warns Academy training may be inaccessible; maintenance continues without a restoration deadline. Report suspicious activity to your IT/security team and follow established protocols. At 17:00 UTC on November 3, the company offered extra time or exam-deadline extensions as appropriate. Ask your established account manager about your specific exam; do not assume every deadline automatically changes. The November 3 19:56 UTC update also warns of temporarily unavailable Customer Admin Portal functions. At 23:05 UTC, the company confirmed the previously affected portal functionality was restored. Check the incident detail and your account manager for remaining restrictions; this is not complete service or security recovery. The November 4 08:28 UTC update also identifies Knowledge Base access as affected; use established support or your account manager when documentation is unavailable.
sources:
- name: Chainalysis original notice and full customer email
  url: https://www.chainalysis.com/blog/security-incident-october-30/
  primary: true
- name: BleepingComputer report and company response
  url: https://www.bleepingcomputer.com/news/security/chainalysis-discloses-data-breach-from-offensive-agentic-techniques/amp/
- name: Chainalysis security-maintenance incident history
  url: https://status.chainalysis.com/incidents/wpnnvwyvcnkz
  says: Product-specific interruptions, KYT exceptions and possible login/Hexagate impact; November 3 14:30 UTC adds possible Academy inaccessibility. The 17:00 UTC update adds accommodations for affected certifications and exams. At 19:56 UTC it adds possible Customer Admin Portal functional unavailability; at 23:05 UTC it confirms that functionality restored. Rapid Lookup is also listed among affected investigation components. November 4 08:28 UTC adds Knowledge Base access impact while restoration continues.
  primary: true
updated: '2026-11-17'
---

The company describes offensive agentic techniques but identifies no attack framework, CVE or complete access window. Its investigation has found no indication of access to graphs, notes, cases, transaction or query results, cleartext passwords, MFA secrets or session tokens; that is an interim assessment, not proof exposure was impossible. Patching and external investigation continue. Chainalysis explicitly separates this event from Binance's theft. L3 reflects confirmed customer-data access without an established mass-leak total.

**November 2 service update:** Chainalysis reports ongoing cyber threats associated with this incident. It has proactively disabled selected products, including Reactor and Data Solutions, pending further assessments with external security experts. Its blog says compliance transaction monitoring continues under close monitoring; the status-page exceptions below qualify that statement. These decisions do not establish new confirmed data exposure or completed containment; the investigation and organization-specific impact review continue.

**Product-specific status:** The November 2 status history qualifies the broader transaction-monitoring statement: KYT Graph preview and the KYT integration with Reactor are exceptions to normal KYT/Address Screening operation. It also identifies possible login issues, additional outages for Chain (Beta) and Rapid, and possible impact to some Hexagate monitoring. The November 3 14:30 UTC update adds that the Academy training platform may be inaccessible; maintenance continues. These availability effects do not establish additional data access or a completed recovery.

**November 3 exam update:** At 17:00 UTC on November 3, the company offered extra time or exam-deadline extensions as appropriate. Ask your established account manager about your specific exam; do not assume every deadline automatically changes.

**November 3 administration update:** The November 3 19:56 UTC update also warns of temporarily unavailable Customer Admin Portal functions. At 23:05 UTC, the company confirmed the previously affected portal functionality was restored. Check the incident detail and your account manager for remaining restrictions; this is not complete service or security recovery. This does not establish additional confirmed data access or unavailability of every portal function.

**November 3, 23:05 UTC restoration:** The previously affected Customer Admin Portal functionality is restored. The same original update explicitly keeps broader security maintenance ongoing; the incident also lists Rapid Lookup alongside Reactor. This does not announce full product recovery, change the KYT exceptions, or resolve the data-scope investigation. Earlier exam accommodations and credential precautions remain applicable.

**November 4 documentation access:** At 08:28 UTC, the company added Knowledge Base access to the maintenance impact. Use established support or your account manager for unavailable documentation; this does not establish further data exposure or full restoration.

See the [incident history](https://status.chainalysis.com/incidents/wpnnvwyvcnkz) for current availability. Follow the company’s [password reset and API key reissue guide](https://www.chainalysis.com/key-rotation/). Reactor users outside approved networks should expect an email verification prompt followed by the product login.
