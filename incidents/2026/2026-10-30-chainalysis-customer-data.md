---
title: Chainalysis takes Reactor and Data Solutions offline during ongoing incident response
date: 2026-10-30
level: 3
tags:
- Chainalysis
- SaaS
- data breach
summary: Chainalysis has taken Reactor and Data Solutions offline for additional security assessments. Compliance transaction monitoring remains operational under enhanced monitoring. Customer identity data was accessed; the vendor still reports no evidence of access to investigation content, credentials or session tokens.
splash: 'Chainalysis customers: Reactor and Data Solutions are offline; customer identity-data scope remains under investigation'
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
  body: Reactor and Data Solutions are among products proactively disabled while external experts complete security assessments. Compliance transaction monitoring continues operating under close monitoring.
checklist:
- title: Enable two-factor authentication
  hint: Ask your existing Chainalysis account manager for help if your organization has not enabled it. Check unexpected authentication or password-reset prompts through your normal sign-in route before responding.
- title: Confirm your organization's exposure
  hint: Follow the direct customer updates and request the promised record breakdown. Treat unsolicited recovery or recruiting messages cautiously; verify senders through an established contact rather than links in the message.
- title: Plan around the product-specific interruption
  hint: Check direct Chainalysis customer updates with your account manager before relying on Reactor or Data Solutions. They are offline for further assessments; no restoration deadline is given. Compliance transaction monitoring continues operating, which does not establish that the incident is resolved. Report suspicious communications or activity to your IT/security team and follow your organization’s established protocols.
sources:
- name: Chainalysis original notice and full customer email
  url: https://www.chainalysis.com/blog/security-incident-october-30/
  primary: true
- name: BleepingComputer report and company response
  url: https://www.bleepingcomputer.com/news/security/chainalysis-discloses-data-breach-from-offensive-agentic-techniques/amp/
updated: 2026-11-03
---

The company describes offensive agentic techniques but identifies no attack framework, CVE or complete access window. Its investigation has found no indication of access to graphs, notes, cases, transaction or query results, cleartext passwords, MFA secrets or session tokens; that is an interim assessment, not proof exposure was impossible. Patching and external investigation continue. Chainalysis explicitly separates this event from Binance's theft. L3 reflects confirmed customer-data access without an established mass-leak total.

**November 2 service update:** Chainalysis reports ongoing cyber threats associated with this incident. It has proactively disabled selected products, including Reactor and Data Solutions, pending further assessments with external security experts. Compliance transaction monitoring continues operating under close monitoring. These decisions do not establish new confirmed data exposure or completed containment; the investigation and organization-specific impact review continue.
