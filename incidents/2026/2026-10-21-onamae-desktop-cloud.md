---
title: Onamae Desktop Cloud confirms malware in customer servers and shuts down all plans for investigation
headline: "Onamae Desktop Cloud: the hosted desktop came with an extra tenant"
level: 4
tags:
  - cloud
  - malware
  - credentials
ecosystems:
  - onamae
summary: GMO confirms unauthorized programs in some Onamae Desktop Cloud customer environments, with 26,739 servers potentially affected. All plans began shutting down at 04:00 JST on October 21. Server data may have been viewed; confirmed data misuse has not been reported.
splash: Onamae Desktop Cloud customers; 26,739 servers potentially affected, not confirmed infected
wipe: Rotate credentials stored on affected desktops, check connected-service logs and await vendor recovery guidance
inTheWild: yes
inTheWildNote: Vendor confirms unauthorized programs installed on customer servers
timeline:
  - date: Oct 20, 2026
    title: Vendor confirms malicious programs in some customer environments
  - date: Oct 20, 19:00 UTC
    title: Service shutdown begins across all plans
    body: October 21 at 04:00 JST; the cited vendor notice is dated October 21.
checklist:
  - title: Rotate credentials stored or used on the hosted desktops from a clean device
  - title: Change reused passwords on other services
  - title: Review connected accounts for unauthorized activity
  - title: Follow official recovery notices and beware of phishing
sources:
  - name: Onamae official notice
    url: https://www.onamae.com/news/article/11584
    primary: true
    says: 26,739 potentially affected servers; malware confirmed in some environments; data misuse unconfirmed
  - name: BleepingComputer
    url: https://www.bleepingcomputer.com/news/security/japans-onamae-desktop-cloud-hacked-up-to-27-000-servers-affected/
    says: Reports the service-wide interruption and credential-rotation advice
date: 2026-10-21
---

The vendor distinguishes possible exposure from proven misuse: the server total is a potential scope, not an infection count. Its dated notice does not identify the access method or attacker. L4 reflects confirmed compromise of customer environments at a hosting provider.
