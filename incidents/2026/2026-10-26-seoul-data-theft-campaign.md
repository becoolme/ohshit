---
title: "Seoul police report 8.2 million records stolen across about 90 organizations"
level: 4
date: 2026-10-26
tags: [South Korea, data theft, AI]
summary: >-
  Seoul police allege a campaign stole 8.2 million personal-data records from about 90 organizations. AI tools were reportedly used against about 60; the record count is not a count of unique people.
splash: "About 90 South Korean organizations, including hospitals, academies and golf courses; specific attack prerequisites are unpublished"
wipe: "Preserve evidence, report extortion and investigate access paths; no campaign-wide patch or indicator list has been published"
inTheWild: n/a
inTheWildNote: "Reported data theft; no specific vulnerability or affected software version is disclosed."
sourceException: >-
  No accessible original Seoul police notice was located after searches of police.go.kr, smpa.go.kr and korea.kr. Yonhap and Edaily independently report the October 26 police briefing; technical details remain undisclosed.
timeline:
  - date: Oct 15, 2026
    title: Principal suspect arrested
    body: Yonhap reports the arrest of the alleged campaign leader.
  - date: Oct 23, 2026
    title: Case referred to prosecutors
    body: Police referred the principal suspect in custody; six others were investigated without detention.
  - date: Oct 26, 2026
    title: Police publicly describe the campaign
    body: Independent Korean reports describe about 90 affected organizations and 8.2 million stolen personal-data records.
checklist:
  - title: Preserve and report extortion evidence
    hint: "Police advise reporting promptly rather than negotiating or paying. Preserve original messages and access logs for investigators."
  - title: Scope exposure with your incident responders
    hint: "General response guidance: review database and administrative access logs, preserve evidence before changing systems, and close access paths your investigation confirms. No public CVE, fixed version or campaign indicator list is available."
  - title: Verify what the affected operator confirms
    hint: "Use the organization's official breach notices to determine which records concern you. The reported total does not identify unique people or prove that every organization lost the same types of data."
sources:
  - name: Yonhap — Seoul police investigation
    url: https://www.yna.co.kr/view/AKR20261026075100004
    says: "Reports 8.2 million records, about 90 organizations, AI use against about 60, and extortion demands against 38 organizations; describes arrest and referral dates."
  - name: Edaily — independent reporting on the police briefing
    url: https://coinlab.edaily.co.kr/News/Read?mediaCodeNo=257&newsId=02955286645616856
    says: "Independently reports the scale and extortion targets; identifies ARTEX with coding-agent tools and relays police advice to report rather than negotiate or pay."
---

Yonhap and Edaily report police allegations of a campaign running from September 2025 into October 2026. Reported AI use began in late August 2026; it does not describe every intrusion throughout the campaign. Edaily identifies ARTEX combined with coding-agent tools. The alleged leader previously worked in penetration testing: describing this as an inexperienced novice's attack would be misleading.

Both outlets report demands totaling about KRW 360 million against 38 organizations. That is money demanded, not verified proceeds or losses. Police recovered stolen data and were investigating possible onward distribution; recovery does not establish that no copies remain.

The reports do not publish exact flaws, authentication requirements, affected versions or technical indicators. They also do not establish a shared actor with other ARTEX-related incidents. The checklist's investigation steps are general response guidance, not a vendor-confirmed fix. These are allegations in a criminal investigation, not findings of guilt.
