---
title: AllUnited registration form flaw exposed club member data and credentials
level: 4
date: '2026-11-10'
updated: '2026-11-28'
tags: [AllUnited, SaaS, data breach]
summary: AllUnited confirms a joint regulator filing for 478 clubs, further integration recovery and a November 30 reporting/notification fallback. Clubs notifying people themselves must also cover registrations without a contact record ID. The breach exposed membership data and credentials; the affected-person count remains unknown.
splash: Clubs, federations and communities using AllUnited, including their members, administrators and website registrants.
wipe: Reset AllUnited and reused passwords, confirm reporting before November 30, and notify both contact records and registrations without a contact record ID.
inTheWild: 'yes'
inTheWildNote: AllUnited confirms a software flaw was exploited and database records were copied.
timeline:
- date: Nov 9, 2026
  title: An attacker reaches an AllUnited server through a club registration form
  body: AllUnited says the attacker copied data from its database.
- date: Nov 10, 2026
  title: AllUnited detects and fixes the flaw and notifies customer organizations
  body: It reports the breach to the Dutch Data Protection Authority and announces password invalidation and removal of readable temporary passwords.
- date: Nov 11, 2026
  title: Password reset delivery resumes after delays
  body: AllUnited reports the email backlog cleared. It also temporarily disables API links to five sports federations.
- date: Nov 12, 2026
  title: AllUnited updates the coordinated reporting process
  body: It gives clubs separate November 13 cutoffs for authorizing its joint filing or submitting their own report.
- date: Nov 13, 2026
  title: AllUnited extends joint reporting and restores the KNHB connection
  body: The provider says it has started sending confirmation emails delayed by a Microsoft outage. Links to KNLTB, KNGU, KNSB and Atletiekunie are still disabled.
- date: Nov 13, 2026
  title: AllUnited sets weekend approval and final filing arrangements
  body: Organizations can accept the confirmation email by November 16 at 07:00 local time. AllUnited plans the final filing for Monday and weekend notices where requested and authorized.
- date: Nov 14, 2026
  title: AllUnited restores its KNGU integration
  body: The Dutch gymnastics federation’s integration is active again. Member registrations, cancellations and edits made during the outage will flow through on the next sync.
- date: Nov 17, 2026
  title: Atletiekunie and KNSB integrations resume
  body: AllUnited says these links now work alongside KNHB and KNGU. Data exchange resumes when the interface runs.
- date: Nov 18, 2026
  title: AllUnited confirms a collective filing for 478 clubs
  body: The provider says clubs that joined and accepted the confirmation are included. It reports an external investigation is still underway; 478 is an organization count, not a victim count.
- date: Nov 20, 2026
  title: Four integrations remain disabled
  body: AllUnited lists KNLTB, KNZB, NTFU and Sportlink as still unavailable. An authentication error on these interfaces is expected while they are disabled.
- date: Nov 23, 2026
  title: KNBB reports notifications, password resets and retention changes
  body: The billiards federation says it notified members and former members, required new passwords, deleted records for people whose membership ended more than two years earlier and removed direct payment links from reminder invoices. These are KNBB’s actions, not completion of all clubs’ notifications.
- date: Nov 24, 2026
  title: AllUnited sets a November 30 fallback for reporting and notifications
  body: Following a November 23 email requested by the Dutch Data Protection Authority, organizations that handled reporting or notifications themselves must confirm their actions and responsibility in writing before November 30. Without that confirmation, AllUnited says it will add the organization to its November 16 collective filing and start emailing members, former members and other contacts from November 30.
- date: Nov 24, 2026
  title: A second selection covers registrations missing from the contact list
  body: AllUnited says the original affected-member selection omits registrations without a contact record ID, whose data may also be involved. Organizations sending notices themselves must use both selections; those that already mailed the first only need to mail the new one.
- date: ~Nov 27, 2026
  title: AllUnited warns clubs about board-member impersonation and gift-card requests
  body: A warning labelled November 27 reports phishing sent to general club inboxes. The page’s last-updated header still says November 24 and its weekday label is inconsistent, so the posting date is approximate; no UTC time is inferred.
checklist:
- title: Reset passwords from a trusted address
  hint: Open the official club portal or ClubApp directly and request a reset. Use the latest reset email you requested and check spam if needed. Change any reused password on other services and enable MFA where available. Contact the official support desk if a reset does not arrive; never send your password.
- title: Verify payment and account requests
  hint: Independently confirm requests for fees, bank changes or codes with the club using contact details you already trust. Watch for tailored phishing using addresses, birth dates or IBANs and report suspicious activity to the club or bank. AllUnited now reports messages impersonating a board member, such as the chair, sent to general club inboxes. A short availability question is followed by requests to buy gift cards and send codes to a personal email address. A familiar display name with a different sender address, often Gmail or Hotmail, is a warning sign. Do not reply; call or message the person using a known number. Share the warning with the board, volunteers and everyone who reads shared club mailboxes. The linked vendor guide also recommends checking statements for unfamiliar debits and immediately contacting the bank and Fraudehelpdesk if you already paid or supplied information; do not follow a message’s login or payment link.
- title: Confirm reporting and notification arrangements before November 30
  hint: Read the November 24 update on AllUnited’s incident page. If your organization filed with the Dutch Data Protection Authority or notified affected people itself, write to info@allunited.nl before November 30 confirming exactly what you did and that you take responsibility for it. Without written confirmation, AllUnited says it will add the organization to its November 16 collective filing and email members, former members and other contacts from November 30. Confirm filing and notification separately and retain your confirmation, consent and filing reference; inclusion does not prove every notice has been delivered. If arrangements or a missed deadline are unclear, contact AllUnited and the authority through official channels.
- title: Include registrations that have no contact record ID
  hint: If your organization sends its own notices, use both “Betrokken leden datalek” and “Gelekte inschrijvingen die geen relatie zijn”. In Relaties > Selectie wizard, open Selecties beheren > Selectie importeren, choose the latter selection, then Importeer > Bewaren. Ask your system administrator if Selecties beheren is missing. Back in Selectie wizard choose that selection > Verder > E-mail, write and check the message, then Versturen. If you already mailed the first selection, only the new selection needs another mailing. A relation/contact record ID here is an AllUnited record identifier, not a telephone number.
- title: Reconcile restored integrations and track those still disabled
  hint: The November 17 and 20 notices list KNHB, KNGU, Atletiekunie and KNSB as restored. Run the normal interface and reconcile registrations, cancellations and edits against club records; KNGU changes made during the outage should flow through without re-entry. Contact AllUnited support about discrepancies. KNLTB, KNZB, NTFU and Sportlink remain disabled in the November 20 update; authentication errors while disabled are expected. Check the latest official notice before treating an error as a new compromise or assuming all links are restored.
sources:
- name: AllUnited incident timeline and FAQ
  url: https://www.allunited.nl/artikelen/datalek/
  primary: true
  says: Confirms the breach and password handling; November 17–20 integration status, the 478-club filing, and November 24 reporting fallback and missing-registration notification steps. The dated updates supersede older FAQ entries on restored links. A new warning labelled November 27 reports board-member impersonation and gift-card phishing; its posting-date labels are inconsistent.
- name: AllUnited Customer Care Center notice
  url: https://support.allunited.nl/support/solutions/articles/103000425650-beveiligingsincident-allunited-wat-er-is-gebeurd-en-wat-je-moet-doen
  primary: true
  says: Directs customers to the official incident and response page.
- name: Royal Dutch Cricket Association (KNCB) member notice
  url: https://kncb.nl/nieuws-belangrijk-je-via-de-kncb-bij-allunited-opgeslagen-gegevens-door-een-datalek-mogelijk-in-verkeerde-handen
  primary: true
  says: Confirms that the records of all players in its AllUnited system were copied.
- name: AllUnited phishing guide for clubs and members
  url: https://support.allunited.nl/support/solutions/articles/103000425621-zo-werkt-phishing-uitleg-voor-clubs-en-leden
  primary: true
  says: Recommends independent verification, statement checks and urgent bank/Fraudehelpdesk contact after payment or information disclosure. Its example names, amounts and sender address are fictional, not attack IoCs.
- name: KNBB November 23 response update
  url: https://www.poolbiljarten.nl/update-datalek-all-united-wat-is-er-gebeurd-en-welke-stappen-zijn-genomen/
  primary: true
  says: Reports member/former-member notifications, new passwords, regulator/police reports, a two-year former-member retention limit, deletion of records for people who left more than two years earlier and removal of direct payment links from reminder invoices. These statements apply to KNBB.
---

AllUnited says an attacker exploited its software through a club website registration form on November 9. The attacker reached one server and copied database data for clubs and federations on the platform. The provider says it found and fixed the flaw on November 10. It did not identify a CVE or publish an affected software version.

Administrative records included names, emails, phone numbers and passwords the provider describes as encrypted. AllUnited says the attacker also obtained information about how that protection worked. Unchanged temporary passwords were stored in readable form. Member records could include addresses, dates of birth, contact details, IBANs and free-text notes. Website registrations included contact and birth details and IBANs. The fields vary by record. The Dutch cricket association says the records of all players in its AllUnited system were copied and that it reported the breach to the regulator. AllUnited said hundreds of organizations authorized a joint filing by November 12; that is not a count of individuals. The published notices do not establish account takeovers or financial losses.

The November 13 evening update clarifies that authorization requires accepting the confirmation email. AllUnited says organizations that accepted before 19:00 local time that day will be included. The remaining organizations can accept by 07:00 local time on November 16. AllUnited plans to file the final report on Monday and send weekend notices where organizations both authorized and requested them. That update did not establish that filing or notification had finished; later notices below confirm the collective filing and introduce new notification arrangements.

On November 14, AllUnited said its connection to KNGU had resumed. For gymnastics clubs, membership changes made during the interruption will be included in the next synchronization. On November 17, Atletiekunie and KNSB also resumed, alongside KNHB. The November 20 update still lists KNLTB, KNZB, NTFU and Sportlink as disabled. These dated notices supersede the older FAQ that still lists KNSB and Atletiekunie as unavailable; restored data exchange does not establish that the security investigation is complete.

AllUnited’s November 18 update confirms a collective report for 478 clubs that joined and accepted its confirmation. This is a count of organizations represented in that filing, not a count of all affected organizations or individuals. The provider says it has reported to police and an external investigation remains underway. Its November 24 notice dates the collective filing to November 16.

The November 24 update says a November 23 email, sent at the Dutch Data Protection Authority’s request, asks organizations that handled their own regulator report or notifications to confirm their actions and responsibility in writing to info@allunited.nl before November 30. If AllUnited receives no written confirmation before that date, it says it will add the organization to the collective report and start emailing its members, former members and other contacts from November 30. This is the provider’s announced fallback, not evidence that those future notices have already been delivered.

A second November 24 notice corrects a gap in the original notification selection: “Betrokken leden datalek” only includes people with an AllUnited relation/contact record ID. Registrations not yet converted into contact records are excluded even though their data may be involved. Organizations handling notifications themselves must also import and email “Gelekte inschrijvingen die geen relatie zijn”. Those that already emailed the first group only need to notify the new group. Neither the new selection nor the filing count establishes a total number of affected people.

AllUnited now reports clubs receiving phishing emails that impersonate a board member and target general club mailboxes. The scam starts with a brief availability question, then asks for gift-card purchases and codes sent to a personal address. The vendor recommends not replying, independently contacting the purported sender at a known number and sharing the warning with the board, volunteers and shared-mailbox readers. Its warning is labelled November 27, but the weekday and unchanged November 24 page header make the exact posting date uncertain. This confirms reported scam attempts; it does not establish that stolen AllUnited records caused them, that an AllUnited account sent them or that a recipient lost money.

The linked AllUnited phishing guide gives fictional examples of club-payment, login-correction and bank impersonation messages. Its example names, amounts and sender address are not evidence of actual attacks or indicators to block. Members should open the club website independently, check statements for unfamiliar debits and contact their bank and Fraudehelpdesk immediately if they have already paid or supplied information. Ask the bank about reversing suspicious debits rather than following a purported “safe account” transfer request.

A November 23 update on KNBB’s pool-billiards site reports its own response: current members were notified by email and its website, and former members through AllUnited email. It says passwords were changed, new passwords were required, reports were made to the regulator and police, former-member retention was limited to two years and records for people who left more than two years earlier were deleted. KNBB also removed direct iDEAL/Wero payment links from reminder invoices. These are that federation’s reported controls, not a universal two-year retention rule, proof that copied data was erased or proof that every AllUnited customer completed notification.
