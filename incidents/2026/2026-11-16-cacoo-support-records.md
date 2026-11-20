---
title: Cacoo confirms 765 stolen support records and investigates two more exposure categories
level: 4
date: 2026-11-16
updated: 2026-11-20
tags: [Cacoo, SaaS, Data breach, Credentials]
summary: Nulab revises confirmed stolen support records from about 792 to 765. Another 890 PayPal billing records and 310 internal-investigation records may have been exposed, some with credentials. The entry path involved video calls; Cacoo remains offline without a restart date.
splash: Cacoo outage; 765 stolen support records, 890 possibly exposed legacy PayPal billing records and 310 internal-investigation records.
wipe: Rotate credentials named in Nulab notices; verify messages through support, watch for phishing, and check status before resuming Cacoo work.
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
  - date: Nov 18, 2026
    title: Nulab revises the confirmed count and identifies two possible exposures
    body: The 792-record estimate becomes 765 confirmed support records. Another 890 billing records and 310 internal-investigation records were accessible; actual viewing or acquisition remains under investigation. Some of the latter contain credentials.
  - date: Nov 18, 2026
    title: Video-call entry path disabled; Cacoo remains offline
    body: Nulab traces the stolen company credentials to the video-call mechanism, stops that feature and applies countermeasures. Payment integration credentials are invalidated; replacement of other potentially exposed credentials continues. No reopening date is set.
checklist:
  - title: Check notices for credentials in the newly identified records
    hint: Verify your individual notice through https://help-center.nulab.com/contact . The 310-record category includes credentials for some customers, not every Cacoo account. Follow the notice for affected credentials; as general precaution, revoke or rotate any exposed credential at its issuer and review associated access. The possibly stolen PayPal integration credential has been invalidated; that does not establish that all customer credentials have been replaced.
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
  - name: Nulab November 18 second Cacoo notice
    url: https://nulab.com/ja/info/20261118_cacoo_02/
    says: Revises confirmed support records, separates two possible exposures and describes the video-call entry path, credential response and continued outage.
    primary: true
  - name: Nulab November 18 original three-page issuer filing
    url: https://kabuyoho-sls-disclose.ifis.co.jp/7a5/140120261118582953.pdf
    says: Provides the same revised fields, counts and notification/containment status with an official support contact.
    primary: true
  - name: Current Cacoo incident detail
    url: https://nulab.statuspal.io/incidents/412382
    says: Current incident detail still shows Cacoo unavailable, with a November 18 update and November 14 09:45 UTC start.
    primary: true
---

The attacker used Nulab credentials to reach the production environment of Cacoo, its online whiteboard and diagramming service. Nulab disabled the credentials, blocked the source of the attack and began replacing related credentials. At its initial disclosure, Nulab was working with external specialists to determine how the credentials were obtained and what else the attacker could access. The service had no confirmed reopening time at the November 16 disclosure. Nulab said it had stepped up monitoring across its services.

The initial estimate of approximately 792 affected support records included names, email addresses, phone numbers and addresses. Some included the last four digits of a credit card. This is a preliminary count of records. Nulab did not give a count of unique people, and its notice did not establish exposure of full card numbers or board contents. In a same-day update, Nulab said it had begun contacting affected customers and had filed its report with Japan’s Personal Information Protection Commission.

Nulab’s November 18 notice replaces the preliminary 792 count with **765 confirmed stolen support records**; it says affected customers in that category have been contacted. Fields remain names, email, phone and address, with card last-four digits in some records. Two additional categories are possible exposures, not confirmed theft: **890 legacy-plan PayPal billing records** (name, email, phone, amount and plan), and **310 records from earlier internal investigations** (name/email and, for some customers, credentials). Do not sum them into unique people. Nulab says the billing data was accessible but has not confirmed it was viewed; it is checking with the payment provider. The other category’s acquisition remains under investigation, and individual notices for the new categories began November 18.

The investigation traces company-credential theft to Cacoo’s video-call mechanism. Nulab stopped the feature, applied countermeasures and invalidated abused credentials and the potentially stolen payment integration credential; replacement of other potentially exposed credentials continues. It has not confirmed unauthorized access to the database storing Cacoo diagrams/account information or to Backlog/other-service customer data. These qualified findings do not exclude the separate 310-record credential exposure. Cacoo remains unavailable in the current incident detail; neither the second notice nor that status entry supplies a restart date.
