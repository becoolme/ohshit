---
title: Inje University reports 24,011 personal-data records exposed in teaching server attack
date: 2026-11-13
level: 4
tags: [data breach, education, South Korea]
summary: South Korea’s Inje University says an attack on servers for its flipped-learning site exposed 24,011 records with student or employee IDs, names, email addresses and mobile numbers. The university disconnected the affected servers after a Ministry of Education alert.
splash: Inje University students and employees whose records were held on the flipped-learning system
wipe: Check the university’s exposure lookup, verify unexpected messages independently and report suspected misuse.
inTheWild: yes
timeline:
  - date: Nov 12, 2026
    title: Ministry of Education alerts Inje University
    body: The university says it learned of the attack from the ministry and immediately disconnected the affected servers from the network.
  - date: Nov 13, 2026
    title: Inje University discloses 24,011 exposed records
    body: The notice lists affected fields, describes the response and links to an individual exposure lookup.
checklist:
  - title: Check your exposure through the university
    hint: Open the incident notice through inje.ac.kr and follow its link to privacy.inje.ac.kr. For help contact privacy@inje.ac.kr or 055-320-3767 on weekdays from 09:00 to 17:00 local time.
  - title: Verify requests before acting on them
    hint: Use a known university or financial institution contact to check unexpected calls, emails or texts. Avoid their links, attachments and app installation requests. Treat requests mentioning your student or employee ID as unverified until checked.
  - title: Report suspected identity misuse or a financial loss
    hint: Save the messages, caller numbers and transaction details. In South Korea contact the police at 112 or your financial institution to request a payment hold where appropriate. The university also lists the privacy reporting service at 118.
sources:
  - name: Inje University breach notice
    url: https://cms.inje.ac.kr/animalhealth/community/injescholarship.do?boardIdx=29009&mode=view
    primary: true
    says: Lists the record count and fields, dates the ministry alert, describes containment and gives lookup and reporting instructions.
---

Inje University traced the exposure to an external attack on servers associated with its flipped-learning class site. Its notice lists 24,011 records. Affected fields were student numbers, employee numbers, names, email addresses and mobile numbers. The university excluded prospective applicants and says passwords, government identifiers and sensitive information were outside the exposed fields. It gave no count of distinct people and did not identify the intrusion method or the date access began.

The university says it physically disconnected the relevant servers from the network, collected evidence and reported the scope to the Ministry of Education. It lists further monitoring, inspection and closure of systems associated with the site. The L4 rating reflects the size of the confirmed record exposure.
