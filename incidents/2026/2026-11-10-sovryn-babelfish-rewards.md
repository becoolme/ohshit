---
title: Sovryn confirms Babelfish reward inventory extraction on Rootstock
date: '2026-11-10'
level: 4
tags:
- Sovryn
- Babelfish
- Rootstock
- DeFi
ecosystems:
- crypto
summary: Sovryn identified 15 transactions that extracted 69,381.254896 XUSD from the Babelfish reward inventory. A sequence could create and reverse an imbalance while retaining its reward. The affected mint and redemption flows are stopped.
splash: Babelfish XUSD conversion and reward inventory. Ordinary XUSD transfers and approvals are outside the containment stop.
wipe: Avoid affected conversions and alternate interfaces. Preserve transaction records and follow official status updates.
inTheWild: 'yes'
inTheWildNote: Sovryn documented 15 successful reward-paying transactions.
timeline:
- date: Nov 4, 2026
  title: Reward extraction and containment
  body: The identified reward transactions ran from 04:14:50 to 04:59:36 UTC. Babelfish’s conversion contract lost its XUSD mint and burn authority at 08:05:49 UTC.
- date: Nov 10, 2026
  title: Sovryn publishes the technical and recovery findings
  body: Sovryn discloses the reward calculation flaw, the amount identified and the continued conversion restrictions.
checklist:
- title: Keep conversion restrictions in place
  hint: Avoid minting or redeeming XUSD through the affected Babelfish contract, including alternate interfaces. Integrators should keep those routes disabled until Sovryn publishes validated production settings and supported paths. Ordinary XUSD transfers and approvals are outside this stop.
- title: Preserve records and verify official recovery notices
  hint: Keep transaction IDs, balances, and records of pending conversions. Use Sovryn’s official Discord announcements to check status. The project has not opened claims or migration. Ignore unsolicited refund or migration approvals and seed-phrase requests.
sources:
- name: Sovryn attack disclosure
  url: https://forum.sovryn.com/t/sovryn-attack-disclosure-bob-rootstock-and-babelfish/3612
  says: Documents the economic flaw, 15 identified transactions and the reward-inventory accounting.
  primary: true
- name: Sovryn mitigation and recovery manifest
  url: https://forum.sovryn.com/t/sovryn-mitigation-and-recovery-manifest/3611
  says: Documents the verified ownership stop, ordinary transfer scope and pending production remediation.
  primary: true
---

The reward calculation paid for apparent improvements to the reserve mix. An attacker could first create the imbalance, then reverse it and collect the reward. The project says the DOC and DLLR principal used in the examined transactions returned. The 69,381.254896 XUSD figure measures rewards taken from the inventory in those transactions. Sovryn has not published the final residual loss or found an equal shortfall in remaining XUSD backing on this evidence alone.

The ownership stop removed the conversion contract’s XUSD mint and burn authority. Sovryn tested a rewards-off option locally and says production changes still need qualification and approval. It has yet to certify any Babelfish-specific recovered amount or open a claim. The earlier [Rootstock lending and AMM attacks](/incidents/sovryn-rootstock/) use separate accounting.
