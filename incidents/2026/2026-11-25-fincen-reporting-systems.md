---
title: FinCEN takes systems offline after unauthorized access, extending some filing deadlines
level: 3
date: '2026-11-25'
tags: [FinCEN, government, incident response]
ecosystems: [saas]
summary: FinCEN confirms unauthorized access to a limited subset of systems and has taken some offline. Its BSA E-Filing website remains operational with some services unavailable. Covered filings due November 18–December 29 move to December 30; data exposure remains undisclosed.
splash: Covered SDTM financial institutions, beneficial-ownership reporters and FinCEN ID updaters facing service disruption
wipe: Check FIN-2026-R002 eligibility, track deferred filings and continue monitoring; use the unaffected hotline for urgent information
inTheWild: 'yes'
inTheWildNote: FinCEN confirms unauthorized access; the entry path and any data exposure are undisclosed.
timeline:
- date: Nov 24, 2026
  title: FinCEN issues limited reporting relief
  body: FIN-2026-R002 extends specified submissions otherwise due November 18–December 29 to December 30. The order describes a service disruption without identifying its cause.
- date: Nov 25, 2026
  title: Unauthorized access is publicly confirmed
  body: Reuters reports a FinCEN official’s confirmation. The undated public alert describes precautionary shutdowns and partial availability. Four banking regulators issue matching, limited supervisory relief and recommend that institutions document delayed submissions and attempted filing dates.
checklist:
- title: Check which submissions qualify for relief
  hint: Read FIN-2026-R002. It covers financial institutions that used SDTM for BSA reports as of November 18, plus companies required to submit beneficial-ownership reports and individuals required to update a FinCEN ID. Covered submissions otherwise due November 18 through December 29 must be filed no later than December 30, 2026; this is not a blanket extension for every filer.
- title: Keep a controlled queue of deferred reports
  hint: Record the original deadline, filing type, relief eligibility, submission problems and attempted submission dates for each delayed report, as the November 25 joint supervisory statement recommends. Check the official BSA E-Filing alert for availability and any revised instructions; the agency has not supplied a full restoration date. Direct technical questions to https://bsaefiling.fincen.gov/help-ticket and questions about the order to https://www.fincen.gov/contact.
- title: Continue monitoring and escalate urgent information
  hint: FIN-2026-R002 preserves all other applicable AML/CFT obligations, including ongoing monitoring for suspicious transactions. For expedited delivery of suspicious-activity information to law enforcement, use the unaffected Financial Institutions Hotline at 1-866-556-3974. Do not treat delayed filing as permission to stop monitoring.
sources:
- name: FinCEN BSA E-Filing public service-disruption alert
  url: https://bsaefiling.fincen.gov/
  primary: true
  says: Confirms unauthorized access to a limited subset, precautionary system shutdowns, partial availability and an unaffected urgent-information hotline; the alert is undated.
- name: Public alert feed used by the FinCEN homepage
  url: https://bsaefiling.fincen.gov/api/prod/alerts/public
  primary: true
  says: Readable official alert text served to the public homepage; no attack date, affected data or attacker is identified.
- name: FinCEN Order FIN-2026-R002
  url: https://www.fincen.gov/sites/default/files/100/ORDER-FIN-2026-R002.pdf
  primary: true
  says: November 24 order defines eligible filers and deadline window, preserves other AML/CFT obligations and provides hotline and support routes.
- name: Reuters report quoting a FinCEN official
  url: https://www.streetinsider.com/Reuters/US%2BFinCEN%2Btakes%2Bsome%2Bsystems%2Boffline%2Bafter%2Bcyber%2Bincident%2C%2Bofficial%2Bsays/27399689.html
  says: Dated November 25 reporting establishes public confirmation of the cybersecurity incident rather than treating the earlier relief order as a breach disclosure.
- name: Federal Reserve, FDIC, NCUA and OCC joint supervisory statement
  url: https://www.federalreserve.gov/supervisionreg/srletters/SR2610a1.pdf
  primary: true
  says: November 25 statement covers late BSA/SAR filing caused by the disruption for supervised institutions using SDTM as of November 18, recommends documentation and preserves other obligations.
---

FinCEN, the US Treasury bureau responsible for financial-crime reporting, confirms that an unauthorized party accessed a limited subset of its systems. It took some systems offline as a precaution. Its public alert says the BSA E-Filing website remains operational, although some services may be unavailable, and gives no full recovery date.

The agency has not identified the accessed systems, entry method, attacker, attack date or whether information was viewed or taken. The availability of sensitive financial information within FinCEN’s broader mission does not establish that suspicious-activity reports, beneficial-ownership records or any particular database were exposed. Reuters quotes a FinCEN official saying Treasury is working with the FBI, CISA and outside forensic examiners. Separately, a person familiar with the matter told Reuters there was no evidence of a breach of the BSA or beneficial-ownership databases while analysis remained ongoing; that is an attributed preliminary assessment, not a final all-clear. No link to other reported US government incidents is established here.

The November 24 relief order responds to a service disruption and does not itself disclose a cyberattack. Public confirmation was reported on November 25. The start of the relief window, November 18, is not a confirmed intrusion date.

FIN-2026-R002 moves covered submissions otherwise due **November 18–December 29, 2026** to **December 30, 2026**. It applies to financial institutions using **Secure Data Transfer Mode (SDTM) as of November 18** for BSA reports, companies required to file beneficial-ownership reports and individuals required to update a FinCEN Identifier. Other applicable AML/CFT duties, including ongoing monitoring, remain in force. The order can be modified or extended; affected filers should check FinCEN’s current instructions.

The Federal Reserve, FDIC, NCUA and OCC’s November 25 joint statement also provides limited supervisory and enforcement forbearance for disruption-related late BSA/SAR reports by supervised institutions using SDTM as of November 18, for the extent and period of FinCEN’s relief. Institutions should document submission problems, affected reports and attempted filing dates. This does not waive unrelated statutes, regulations or monitoring duties.

This is rated L3 for a confirmed compromise disrupting a significant government reporting service. The disclosed scope does not support a mass-data-theft claim or a victim count, and the service restrictions should not be described as a total shutdown.
