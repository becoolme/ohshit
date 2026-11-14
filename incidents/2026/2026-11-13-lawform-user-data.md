---
title: Intrusion at LawForm operator exposes contact details of 20,028 users
date: 2026-11-13
level: 4
tags: [data breach, SaaS, South Korea]
summary: South Korea’s Ministry of SMEs and Startups says an intrusion into Amicus Lex exposed names, phone numbers and email addresses of 20,028 LawForm users. The total includes 818 people in the second round of the government’s startup program.
splash: Users whose contact details were held by Amicus Lex, including 818 participants in the government startup program
wipe: Verify the notice through LawForm or the startup program and report suspicious messages that use the exposed details.
inTheWild: "n/a"
timeline:
  - date: Nov 11, 2026
    title: Amicus Lex detects signs of intrusion
    body: The company identifies suspicious activity on its own systems and takes measures including blocking access from foreign IP addresses.
  - date: Nov 12, 2026
    title: Amicus Lex informs the startup program agency
    body: The Korea Institute of Startup and Entrepreneurship Development works with the operator to identify affected users and data.
  - date: Nov 13, 2026
    title: Affected users are notified and the ministry discloses the breach
    body: The operator sends individual notices. The ministry and startup agency separately send guidance to affected participants.
  - date: Nov 14, 2026
    title: Ministry publishes the overall count and planned oversight
    body: The ministry confirms that 818 participants are included in the total of 20,028 and says it will continue checking suppliers’ access and data retention practices.
checklist:
  - title: Verify any breach notice independently
    hint: Open LawForm or the startup program through a known address and use its existing support channel. Ask whether your account is in the affected set if you have yet to receive an individual notice.
  - title: Watch for phishing using your contact details
    hint: Confirm messages about startup funding or LawForm activity through a known support channel before opening links or sharing credentials or one-time codes. Report suspicious messages to the relevant service.
  - title: Check how your program integrations handle contact data
    hint: Review account provisioning, permissions and stored participant data at each provider. Remove access and delete copies when their retention period ends, and preserve relevant access records if you are investigating exposure.
sources:
  - name: South Korean Ministry of SMEs and Startups
    url: https://m.korea.kr/briefing/actuallyView.do?newsId=148975732&pageIndex=1&repCode_F=
    primary: true
    says: Identifies the affected operator, confirmed user counts, disclosed data fields, individual notices and planned checks of program suppliers.
  - name: Kyunghyang Shinmun
    url: https://www.khan.co.kr/en/article/202611131742007
    says: Reports the ministry’s November 13 disclosure.
---

Amicus Lex operates LawForm on its own systems. It was one of 50 AI solution providers for the second round of South Korea’s startup support program. The ministry says the attacker obtained users’ names, phone numbers and email addresses from the operator’s systems. The 818 program participants are part of the 20,028 affected users.

The ministry has yet to disclose the entry point or give a technical containment assessment. Blocking connections from foreign IPs was one of the operator’s immediate measures. The government said it would continue checking access controls and deletion after retention periods across the program’s suppliers.
