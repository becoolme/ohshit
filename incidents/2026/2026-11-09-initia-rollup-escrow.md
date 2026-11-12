---
title: Initia halts L1 after compromised rollup infrastructure enables forged withdrawals
summary: Initia says an attacker used compromised cloud credentials and reached Anvil, then validated forged withdrawals from five rollups. About $3.27 million moved from L1 escrow, including about $2.16 million still on the paused chain at the time of the update.
splash: Initia L1 escrow holding assets bridged from the five affected rollups and dependent integrations.
wipe: Pause affected bridge automation and track official recovery. Operators should isolate affected provisioning and rotate exposed credentials.
inTheWildNote: Initia confirmed unauthorized escrow transfers and halted its L1.
level: 4
date: '2026-11-09'
tags:
- Initia
- IBC
- cloud credentials
inTheWild: 'yes'
timeline:
- date: Nov 9, 19:30 UTC
  title: Initia discloses a rollup-infrastructure issue
  body: The team says rollups have paused. The L1 was still operating and the team had not identified a funds impact at that point.
- date: Nov 10, 06:18 UTC
  title: Validators halt the L1
  body: The halt follows discovery of unauthorized IBC escrow transfers.
- date: Nov 10, 16:43 UTC
  title: Initia publishes its preliminary attack chain and asset figures
  body: The team describes cloud and hosting credentials, five affected rollups, the retained L1 balance and restoration plans.
checklist:
- title: Pause affected integrations pending official recovery
  hint: Check the official Initia and rollup notices before retrying cross-chain deposits, withdrawals or queued transfers. Keep transaction hashes and compare records after the relevant networks and channels resume.
- title: Triage rollup provisioning and signing access
  hint: Operators should preserve cloud IAM, GitHub, Anvil and IBC logs. Inventory the affected GCP service accounts and environment secrets, revoke exposed credentials and audit recent signing and escrow activity before restoring transfers.
- title: Verify any recovery claim through official channels
  hint: Follow the project’s published plan and avoid links sent by purported compensation agents. A paused balance is not proof of returned funds. Keep keys and recovery phrases private.
sources:
- name: Initia November 9 notice, public copy
  says: Reproduces the rollup pause notice and initial assessment of user funds.
  url: https://teapawt.org/initia/status/2119875372183703612
  primary: true
- name: Initia L1 halt notice, public copy
  says: Reproduces the validator halt time and preliminary escrow findings.
  url: https://teapawt.org/initia?filter=posts
  primary: true
- name: Initia technical update, public copy
  says: Reproduces the preliminary intrusion chain, escrow movements, outbound assets and recovery intent.
  url: https://teapawt.org/initia/status/2120195620442910943
  primary: true
---

Initia first posted a [rollup incident notice](https://x.com/initia/status/2119875372183703612) and later a [halt notice](https://x.com/initia/status/2120050740626628972). In its [technical update](https://x.com/initia/status/2120195620442910943), Initia says command injection involving a compromised GCP key for private-node provisioning exposed environment variables. Credentials then let the attacker reach GitHub, GCP and Anvil, the rollup hosting platform. The resulting withdrawals unlocked assets held in L1 IBC escrow. Initia reports about $3.27 million moved to the attacker’s L1 address, about $2.16 million remained there on the halted chain, and outbound transfers included 13,400 TIA, 8,000 USDC.inj and 597,000 Noble USDC. It says the attacker withdrew no INIT from the chain.

The moved value, assets remaining on the halted L1, outbound transfers and any future compensation are distinct. Initia plans to restore affected asset backing and says it is rebuilding affected infrastructure in isolation. It has not published final recovery amounts or a restart timetable in these notices. The described mechanism is distinct from the October MoveVM incident.
