---
title: Cacoo shut down after credential misuse and theft of about 792 support records
level: 4
date: 2026-11-16
tags: [Cacoo, SaaS, Data breach, Credentials]
summary: Nulab says an attacker misused company credentials in Cacoo’s production environment and took about 792 support records. Cacoo was offline at disclosure. Nulab had found no unauthorized access to customer data in Backlog or its other services.
splash: Cacoo users lost access during containment. Confirmed data exposure involves people whose Cacoo support records were taken.
wipe: Check Nulab’s status page before resuming Cacoo work. Verify any breach notice through Nulab support and watch for targeted phishing.
inTheWild: 'yes'
inTheWildNote: Nulab confirmed unauthorized access and theft of Cacoo support records.
timeline:
  - date: Nov 14, 2026
    title: Nulab detects misuse of company credentials
    body: Nulab invalidates the credentials involved and blocks access from the attack source.
  - date: Nov 14, 09:45 UTC
    title: Cacoo goes offline for containment
    body: Nulab takes the service down to limit the incident and check that it can resume safely.
  - date: Nov 15, 2026
    title: Nulab extends emergency maintenance
    body: All Cacoo features remain unavailable. Nulab withdraws the original end time while it checks the system.
  - date: Nov 16, 2026
    title: Nulab confirms data theft and clarifies the scope
    body: Nulab estimates about 792 Cacoo support records were taken. Backlog remains available and runs in a separate environment.
  - date: Nov 16, 2026
    title: Nulab starts notifying affected customers
    body: Nulab says it is contacting customers individually and has reported the incident to Japan’s Personal Information Protection Commission.
checklist:
  - title: Verify any notification about your support records
    hint: Open Nulab’s contact form from the official notice and ask which records and fields were involved. Keep the original message and any related support ticket so you can verify the details.
  - title: Check payment or account requests through a known channel
    hint: Avoid links and attachments in unexpected messages that cite this breach. Contact Nulab directly about a support request and verify unexpected card activity in your issuer’s app or with the number on the card.
  - title: Check the status before restarting Cacoo workflows
    hint: Use the Cacoo maintenance entry linked in the sources to confirm service recovery. Once Nulab announces reopening, verify access to the boards and integrations your team uses before resuming queued work.
sources:
  - name: Nulab’s initial Cacoo security notice
    url: https://nulab.com/ja/info/20261116_cacoo_01/
    says: Confirms credential misuse, theft of support records and the containment and notification status.
    primary: true
  - name: Nulab’s emergency maintenance extension
    url: https://nulab.com/ja/info/20261115-cacoo/
    says: Gives the shutdown time in Japan time and confirms that all Cacoo features were unavailable.
    primary: true
  - name: Nulab’s Backlog and other services notice
    url: https://nulab.com/ja/info/20261116_cacoo_backlog/
    says: Explains environment separation and what Nulab had found about customer access in other services.
    primary: true
  - name: Cacoo maintenance status
    url: https://nulab.statuspal.io/incidents/411742
    says: Tracks the service outage and records its start at 09:45 UTC.
    primary: true
---

The attacker used Nulab credentials to reach the production environment of Cacoo, its online whiteboard and diagramming service. Nulab disabled the credentials, blocked the source of the attack and began replacing related credentials. Nulab is working with external specialists to determine how the credentials were obtained and what else the attacker could access. The service had no confirmed reopening time at the November 16 disclosure. Nulab said it had stepped up monitoring across its services.

The approximately 792 affected support records included names, email addresses, phone numbers and addresses. Some included the last four digits of a credit card. This is a preliminary count of records. Nulab did not give a count of unique people, and its notice did not establish exposure of full card numbers or board contents. In a same-day update, Nulab said it had begun contacting affected customers and had filed its report with Japan’s Personal Information Protection Commission.
