---
title: MapleStory Universe confirms intrusion into off-chain servers and pauses its OpenAPI
level: 4
date: '2026-11-12'
tags: [MapleStory Universe, Nexpace, API]
ecosystems: [crypto]
summary: MapleStory Universe says an external party accessed part of its off-chain server infrastructure. The game, marketplace and other listed services returned on November 12 UTC, while OpenAPI maintenance continued.
splash: MapleStory Universe players and developers whose apps use its OpenAPI.
wipe: Check the official maintenance notice before retrying API calls. Review account activity and follow official instructions for developer credentials.
inTheWild: 'yes'
inTheWildNote: MapleStory Universe confirms unauthorized external access to its off-chain servers.
timeline:
  - date: Nov 12, 04:05 UTC
    title: MapleStory Universe begins emergency maintenance
    body: The maintenance notice lists the game client, website, marketplace, Builder and OpenAPI among affected services.
  - date: Nov 12, 2026
    title: The operator publicly confirms unauthorized access
    body: The incident notice attributes the service maintenance to access to part of its off-chain server infrastructure.
  - date: Nov 12, 21:40 UTC
    title: Listed services return except OpenAPI
    body: The operator says OpenAPI maintenance continues and expects service to resume the following week. Check the notice for any revised target.
checklist:
  - title: Check service status before replaying requests
    hint: Open the official maintenance notice and verify OpenAPI status separately from the game and marketplace. Hold retries while the API is unavailable and reconcile queued requests against your own records before replaying them.
  - title: Review credentials and account activity
    hint: Check official Builder notices for any required key changes. Keep API keys on the server and replace affected credentials through official controls when available. Preserve logs of unexpected API calls and report unfamiliar account activity through official support.
  - title: Verify links before connecting a wallet
    hint: Open the official site directly. Ignore unsolicited migration or recovery messages and never share a seed phrase or private key.
sources:
  - name: MapleStory Universe incident notice via X’s public embed
    url: https://publish.twitter.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FMaplestoryU%2Fstatus%2F2120927819786309872
    says: The readable opening confirms unauthorized external access to off-chain servers as the reason for maintenance.
    primary: true
  - name: MapleStory Universe maintenance notice
    url: https://www.msu.io/notices/3580067
    says: Lists the maintenance window, restored services and the remaining OpenAPI outage.
    primary: true
---

MapleStory Universe disclosed an intrusion into its off-chain infrastructure. The official service notice gives separate recovery status for OpenAPI and the rest of the listed services. The incident notice excerpt confirms the server intrusion. The exact entry point, affected user count and any wallet losses remain unverified in the primary material available for this entry.
