---
title: MapleStory Universe server intrusion exposed user data and Builder API keys
level: 4
date: '2026-11-12'
updated: '2026-11-13'
tags: [MapleStory Universe, Nexpace, API]
ecosystems: [crypto]
summary: An intruder accessed MapleStory Universe’s off-chain servers, including some user records and credentials for 328 Builder apps. The operator reported no related asset transfers or theft.
splash: MapleStory Universe users with affected records and developers of 328 Builder apps.
wipe: Check the official notice for exposure and OpenAPI status. Follow Builder key reissue instructions when published and review suspicious account activity.
inTheWild: 'yes'
inTheWildNote: MapleStory Universe confirmed unauthorized access to off-chain servers.
timeline:
  - date: Nov 12, 04:05 UTC
    title: Temporary maintenance appears on the service schedule
    body: The maintenance notice gives 04:05 UTC as its start. The later security report gives 04:43 UTC for the incident-response maintenance.
  - date: Nov 12, 2026
    title: MapleStory Universe confirms the intrusion
    body: The operator found unauthorized off-chain access, blocked the route used, revoked access credentials it confirmed the intruder had obtained, and denied subsequent reuse attempts.
  - date: Nov 12, 21:40 UTC
    title: Listed services return except OpenAPI
    body: The game client, website, marketplace and Builder were among the services restored. The maintenance notice expected OpenAPI to return the following week.
  - date: Nov 13, 2026
    title: Operator details the records accessed and its asset review
    body: The report identifies affected user records and data from 328 Builder apps. The operator plans to email potentially affected users who registered an email address and publish separate API key reissue instructions.
checklist:
  - title: Confirm OpenAPI recovery before replaying requests
    hint: Check OpenAPI status separately from the game and marketplace in the official maintenance notice. Pause retries during the outage and reconcile queued requests against your own records before replaying them.
  - title: Replace affected Builder API keys and review usage
    hint: Use official Builder notices for reissue instructions. Once available, replace affected keys in server-side secret stores and check that applications work with the new keys. Preserve logs of unexpected requests and flag suspicious activity to MapleStory Universe.
  - title: Review account activity and verify incident messages
    hint: Open the official site directly. Review unfamiliar account activity and contact terms_policy@nexpace.io with incident or privacy questions. Avoid connecting a wallet or signing transactions through links in incident messages and keep seed phrases and private keys private.
sources:
  - name: MapleStory Universe security incident report
    url: https://msu.io/notices/3580916
    says: Describes the accessed records, Builder app scope, asset review, containment and planned notifications.
    primary: true
  - name: MapleStory Universe maintenance notice
    url: https://www.msu.io/notices/3580067
    says: Gives the maintenance schedule, restored services and the remaining OpenAPI outage.
    primary: true
  - name: MapleStory Universe initial incident notice via X’s public embed
    url: https://publish.twitter.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FMaplestoryU%2Fstatus%2F2120927819786309872
    says: The readable opening confirms unauthorized off-chain access as the reason for maintenance.
    primary: true
---

The operator identified accessed records dated after **November 4, 2026 at 23:26 UTC**. It has not disclosed the initial entry point or a count of affected users. Exposure varies by user and activity. The confirmed records include account profiles and wallet addresses, login history with IP addresses, approximate locations, device and browser details and session keys, the first 12 characters of email addresses, linked social-account identifiers, OpenAPI call metadata and request and response content, shop consent records, and transaction and service activity. The confirmed records exclude real names, phone numbers, physical addresses, identity verification data and payment card information. These records can link public wallet activity to account information and make phishing more convincing.

The 328 Builder apps had their developer wallet addresses, nicknames, API keys and OAuth client IDs accessed. According to the operator, the exposed API keys cannot move or otherwise affect assets. The operator says it never stores users’ wallet private keys and that the blockchain and smart contracts were unaffected. It says the encrypted operation keys that can move assets were unexposed, access attempts against its key management system were blocked, and contract permissions stayed the same. It replaced affected servers and says all operation keys were rotated before services resumed. After checking on-chain records and service wallets, it reported no asset movement or theft attributable to the incident and said users need not change wallets or move assets based on its findings.
