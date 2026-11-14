---
title: JNSA narrows potential exposure to 8,388 records and rules out leaked login credentials
level: 3
date: '2026-11-06'
updated: 2026-11-14
tags: [JNSA, data breach, security training]
summary: The Japan Network Security Association says 8,388 records may have been exposed after an intrusion into its security knowledge-check service, down from an initial maximum of 15,128. Potentially exposed data includes administrator contact details. JNSA ruled out exposure of user IDs and passwords.
splash: Administrators and organizations whose contact or registration data was held by JNSA’s Information Security Knowledge Check service.
wipe: Verify notices through JNSA or your training administrator. Watch for impersonation using administrator names and email addresses.
inTheWild: 'yes'
inTheWildNote: JNSA confirmed unauthorized access and identified 8,388 potentially exposed records.
timeline:
- date: Nov 4, 2026
  title: JNSA confirms unauthorized access and suspends the service
  body: The service page dates the suspension to the evening of November 4. External specialists assist the investigation.
- date: Nov 6, 2026
  title: JNSA discloses the incident and its provisional scope
  body: Up to 15,128 records may have been exposed. The association plans to notify users individually once they are identified.
- date: Nov 9, 2026
  title: JNSA reports the incident to its local police
  body: The police report followed JNSA’s November 6 report to Japan’s Personal Information Protection Commission.
- date: Nov 13, 2026
  title: JNSA revises the scope of possible exposure
  body: JNSA identifies 8,388 potentially exposed records, rules out exposure of user IDs and passwords and says it will notify affected users in stages. The service has no restart date.
- date: '~Oct 30, 2026'
  title: Possible start of unauthorized access
  body: JNSA's investigation places the possible start around the evening of October 30.
checklist:
- title: Warn staff about fake reset notices
  hint: Use internal channels to tell registered users what is known and where to report suspicious messages. Avoid unexpected attachments and links. JNSA says it will not ask you to enter or change credentials through a link in an email. Verify notices at jnsa.org or use the incident contact sec@jnsa.org.
- title: Follow JNSA recovery and notification instructions
  hint: Keep a copy of any notice and ask JNSA or your organization's training administrator whether your account was included. The service is suspended. Use its official site for a recovery announcement and use a unique password if JNSA announces an official reset process.
sources:
- name: JNSA November 6 first incident report (Japanese PDF)
  url: https://www.jnsa.org/dl/annual/20261106.pdf
  primary: true
  says: Confirms unauthorized access and suspension, estimates the potentially affected records and describes fields, investigation and notification plans.
- name: JNSA Information Security Knowledge Check service
  url: https://slb.jnsa.org/
  primary: true
  says: Displays the service suspension notice.
- name: JNSA November 13 second incident report (Japanese PDF)
  url: https://www.jnsa.org/dl/annual/20261113.pdf
  primary: true
  says: Revises the count and data fields, confirms reports to authorities, and gives notification and reopening plans.
---

The service lets organizations enroll staff in a security knowledge assessment and review their results. JNSA confirmed an intrusion on November 4. Its first report says **up to 15,128 records may have been exposed**. Possible fields include administrator names, company names and email addresses, organization location, headcount and industry, the number of participating users, and user IDs and hashed passwords. JNSA says organizations can use a participant ID in place of a name for non-administrator users.

JNSA has engaged external specialists. The first report does not establish the intrusion path, hashing method or extent of any data transfer. JNSA plans individual notifications after identifying potentially affected users.

**November 13 update.** JNSA identified 8,388 records that may have been exposed and confirmed user IDs and passwords were outside the leak scope. The remaining fields are administrator names, company names and email addresses, plus organization location, staff count, industry and number of users. JNSA counts records and has yet to establish how much data left the system. It reported to Japan’s Personal Information Protection Commission on November 6 and local police on November 9. JNSA will contact potentially affected users in stages and decide when to reopen after validating security and implementing preventive measures.
