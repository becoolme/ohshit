---
title: myColorado confirms uploaded documents were accessed; roughly 100,000 users estimated affected
level: 4
date: '2026-11-23'
tags:
- Data exposure
- Digital identity
- myColorado
summary: Colorado’s November 25 update confirms access primarily to uploaded documents such as passports, vehicle registrations and insurance cards. Roughly 100,000 users are estimated involved; matching continues. Payment information was not involved. Individual notices are expected from November 27; the app remains offline.
splash: Users uploading files to myColorado’s myCards and Documents; roughly 100,000 users estimated involved, not a final count.
wipe: Keep physical ID; change reused passwords, enable two-step authentication, follow credit-protection guidance and verify individual notices.
inTheWild: 'yes'
inTheWildNote: Colorado confirms platform-data access; individual exposure is still being investigated.
cves: []
fixed: []
timeline:
- date: Nov 18, 2026
  title: State detects unauthorized platform-data access and takes the app offline
  body: Colorado says it quickly shut down the app and began investigating. The notice gives no exact hour or timezone.
- date: Nov 23, 2026
  title: Colorado publicly discloses its investigation
  body: The OIT announcement is dated November 23 in contemporaneous reporting; detection on November 18 is not the disclosure date.
- date: Nov 24, 2026
  title: Official outage update keeps the app unavailable
  body: The state is assessing cause, scope and protections and promises individual notifications after its investigation. Its FAQ estimates possible impact to 50,000–150,000 people, not all 2.1M users; the FAQ itself has no separate update date.
- date: Nov 25, 2026
  title: State identifies uploaded-document scope and refines its estimate
  body: Access primarily involved user-uploaded PDFs and photographs in myCards and Documents, including passports, vehicle registrations and insurance cards. Roughly 100,000 users are estimated involved; payment information was not. File-specific notices are expected to start November 27; restoration remains undated.
checklist:
- title: Use physical identification and official service alternatives
  hint: 'Follow the state’s outage guidance: carry a physical driver license or state ID, including for travel, and use myDMV.colorado.gov for license and vehicle-registration services. Use links from the official myColorado home page for other state portals; a cached digital ID does not establish service restoration.'
- title: Verify the planned document-specific notification
  hint: The state expects direct notifications to begin November 27, identifying the files involved for each person. Keep checking mycolorado.gov and preserve dated notices. Roughly 100,000 remains an estimate while documents are matched to users; it does not identify which of your files was accessed.
- title: Verify incident-related requests through established channels
  hint: Open the official myColorado site yourself or use its linked customer-support channel. Do not give credentials or identity documents to unsolicited messages offering app restoration or a supposed mandatory incident check; ask state support to verify any unclear instruction.
- title: Replace reused passwords and strengthen authentication
  hint: 'Follow the November 25 state guidance: change other-account passwords reused with myColorado or the associated email account, starting with email, banking and mobile-carrier accounts. Use unique passwords and enable two-step authentication, preferably an authenticator or passkey where offered. This advice does not establish password theft.'
- title: Protect credit and preserve evidence of unusual activity
  hint: The state recommends freezes or locks with Equifax, Experian, TransUnion and Innovis. Use official channels and distinguish a credit freeze from lock products with different terms; follow the official page’s usa.gov/credit-freeze link. Payment information was not involved, but monitor bank/card activity and contact institutions using the number on the card, not an unsolicited message. Save screenshots, email, texts, phone numbers and transactions for any bank, law-enforcement or FTC report.
sources:
- name: Colorado official myColorado outage update and FAQ
  url: https://mycolorado.state.co.us/home
  primary: true
  says: 'November 24 earlier estimate and November 25 update: uploaded-document scope, roughly 100,000 users with matching ongoing, no payment information, notices planned from November 27, and password, authentication, credit and evidence-preservation guidance.'
- name: KRDO contemporaneous report
  url: https://krdo.com/news/2026/11/24/mycolorado-app-offline-as-state-investigates-cybersecurity-incident/
  primary: false
  says: November 24 report identifies the state’s November 23 public update and repeats its service alternatives; not independent forensic confirmation.
updated: '2026-11-26'
---

Colorado’s official FAQ confirms that an unauthorized user accessed platform data. The state is still determining whose information was affected and had not then published the data categories, cause, attacker identity or a confirmed record count. Its initial estimate concerned 50,000–150,000 individuals’ data; approximately 2.1 million registered users is the app’s overall user base, not a victim count. The confirmed intrusion, potential scale and digital-identity service disruption support L4 without treating every user as exposed.

The November 24 outage update says teams are investigating and fixing the vulnerability before a safe return. No fixed app version or restoration deadline is supplied. The statement also says there is no current reason to believe it is part of a broader attack; that is the state’s assessment, not proof of attribution. Individual notifications and protective steps are promised once the scope is known.

The state directs users to physical identification and official agency portals while the app is unavailable. Some cached digital IDs may display offline; that behavior does not show that the incident is contained or the online service has returned. The linked OIT press-release and general safety pages were inaccessible during verification; the full official home-page update and FAQ were readable, with KRDO establishing the November 23 public-announcement date. No legal deadline or mandatory credential reset is inferred from the notice.

**November 25 update.** The state now confirms that access primarily involved user-uploaded PDFs and photographs in myCards and Documents, including passports, vehicle registrations and insurance cards. Roughly 100,000 users’ data was involved, with staff still matching documents to individuals, so this is not a final count. It says payment information was not involved; this does not establish that all identity documents or other personal information were safe. Direct notices identifying each affected user’s files are expected to start November 27. That is a planned start date, not a deadline for completing notices or restoring the app.

The state is testing security enhancements; the app remains unavailable without a confirmed restoration timeline. Unusual usage patterns on November 18 triggered automated threat detection in the state’s AWS environment, which does not establish a compromise of the AWS platform. The new password and credit-protection steps are precautionary, not evidence of password or payment-data theft. The earlier physical-ID, official-portal and anti-phishing guidance remains applicable.
