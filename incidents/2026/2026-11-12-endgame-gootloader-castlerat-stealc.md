---
title: Operation Endgame disrupts Gootloader, CastleRAT and StealC infrastructure
level: 4
date: '2026-11-12'
tags: [Gootloader, CastleRAT, StealC, malware]
summary: Operation Endgame reported action against 235 servers and 257 domains and identified roughly 6.4 million victim datasets on criminal infrastructure. CastleRAT victims can check Have I Been Pwned for exposed email addresses.
splash: Operators of compromised websites and people or organizations whose computers ran Gootloader, CastleRAT or StealC.
wipe: Isolate and investigate infected hosts. Revoke sessions and rotate exposed credentials from a clean device. Patch and inspect affected WordPress sites.
inTheWild: 'yes'
inTheWildNote: Authorities confirmed malware infections and associated ransomware cases.
timeline:
  - date: Nov 12, 2026
    title: Operation Endgame announces a new round of infrastructure disruption
    body: The action targets Gootloader distribution, CastleRAT infrastructure and StealC servers. Partners are helping notify victims and remediate affected systems.
  - date: Nov 12, 2026
    title: US Justice Department reports its Gootloader operation
    body: The department reports removing the malware from more than 100 servers and seizing US domains used to deliver or control it.
  - date: Nov 13, 05:41 UTC
    title: Have I Been Pwned adds CastleRAT data
    body: The service lists email addresses tied to infections and makes about 893,000 distinct passwords searchable separately through Pwned Passwords.
checklist:
  - title: Contain and investigate potentially infected endpoints
    hint: Isolate affected hosts and preserve endpoint telemetry. Review downloads from unfamiliar sites, especially supposed legal documents, and trace what ran afterward. Investigate follow-on access and ransomware before returning machines to service.
  - title: Revoke exposed access from a clean device
    hint: Check affected email addresses at Have I Been Pwned and review any verified notification from your security team or provider. Treat stored passwords on a confirmed infected system as exposed even if your email does not appear. Never send a password to someone offering help. Revoke browser and account sessions, rotate stored or reused credentials, and enable MFA where supported. Check sign-in and recovery settings for unexpected changes.
  - title: Clean compromised websites before serving traffic
    hint: For affected WordPress sites, inspect access logs and unauthorized changes to site files and administrator accounts. Remove malicious content, update WordPress and its extensions, rotate administrative credentials and enable MFA before restoring service.
sources:
  - name: Operation Endgame announcement
    url: https://operation-endgame.com/news/
    says: Gives the scope of the November action, recovered records, victim-notification channels and WordPress guidance.
    primary: true
  - name: US Justice Department Gootloader announcement
    url: https://www.justice.gov/usao-co/pr/gootloader-malware-disrupted-international-cyber-operation
    says: Describes US action against Gootloader and estimates its historical impact.
    primary: true
  - name: Have I Been Pwned breach index
    url: https://haveibeenpwned.com/api/v3/breach/CastleRAT
    says: Lists 179,745 CastleRAT accounts and names email addresses and passwords as affected data.
    primary: true
---

Gootloader used compromised sites, including WordPress sites, to lure visitors into downloading files presented as legal documents. Criminals sold access to infected machines, which could then be used for ransomware. CastleRAT gave operators remote control of infected computers. StealC collected passwords and other stored account data. The November action continued separate work against StealC that had already started in June.

The 6.4 million figure counts victim datasets identified across the November action. Have I Been Pwned lists 179,745 accounts for CastleRAT and added about 893,000 distinct passwords to the separate Pwned Passwords service. The US Justice Department separately estimates that Gootloader infected at least 25,000 computers worldwide since 2018 and was used in ransomware attacks affecting at least 44 US victims, with approximately $28.8 million in losses. These counts cover different populations and periods. Investigate and remediate affected systems even after the infrastructure disruption.
