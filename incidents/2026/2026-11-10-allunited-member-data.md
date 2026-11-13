---
title: AllUnited registration form flaw exposed club member data and credentials
level: 4
date: '2026-11-10'
tags: [AllUnited, SaaS, data breach]
summary: AllUnited says an attacker used a club registration form to reach a server and copy membership data, including IBANs and credentials. The provider fixed the flaw and announced a password reset. It has not published a count of affected individuals.
splash: Clubs, federations and communities using AllUnited, including their members, administrators and website registrants.
wipe: Reset AllUnited and reused passwords, verify payment requests, and coordinate member notifications through official channels.
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
checklist:
- title: Reset passwords from a trusted address
  hint: Open the official club portal or ClubApp directly and request a reset. Use the latest reset email you requested and check spam if needed. Change any reused password on other services and enable MFA where available. Contact the official support desk if a reset does not arrive; never send your password.
- title: Verify payment and account requests
  hint: Independently confirm requests for fees, bank changes or codes with the club using contact details you already trust. Watch for tailored phishing using addresses, birth dates or IBANs and report suspicious activity to the club or bank.
- title: Verify reporting and member notification arrangements
  hint: Check AllUnited’s incident page. The provider gave November 13 local deadlines of 10:00 for authorization of its joint filing and 19:15 for an organization’s own report. Confirm filing and member notification separately, including former members and other affected contacts. Use the affected-member selection in the Relations wizard and keep confirmation records.
sources:
- name: AllUnited incident timeline and FAQ
  url: https://www.allunited.nl/artikelen/datalek/
  primary: true
  says: Confirms the entry point, data copied, password handling and organization notification process.
- name: AllUnited Customer Care Center notice
  url: https://support.allunited.nl/support/solutions/articles/103000425650-beveiligingsincident-allunited-wat-er-is-gebeurd-en-wat-je-moet-doen
  primary: true
  says: Directs customers to the official incident and response page.
- name: Royal Dutch Cricket Association (KNCB) member notice
  url: https://kncb.nl/nieuws-belangrijk-je-via-de-kncb-bij-allunited-opgeslagen-gegevens-door-een-datalek-mogelijk-in-verkeerde-handen
  primary: true
  says: Confirms that the records of all players in its AllUnited system were copied.
---

AllUnited says an attacker exploited its software through a club website registration form on November 9. The attacker reached one server and copied database data for clubs and federations on the platform. The provider says it found and fixed the flaw on November 10. It did not identify a CVE or publish an affected software version.

Administrative records included names, emails, phone numbers and passwords the provider describes as encrypted. AllUnited says the attacker also obtained information about how that protection worked. Unchanged temporary passwords were stored in readable form. Member records could include addresses, dates of birth, contact details, IBANs and free-text notes. Website registrations included contact and birth details and IBANs. The fields vary by record. The Dutch cricket association says the records of all players in its AllUnited system were copied and that it reported the breach to the regulator. AllUnited said hundreds of organizations authorized a joint filing by November 12; that is not a count of individuals. The published notices do not establish account takeovers or financial losses.
