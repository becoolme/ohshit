---
title: Forged receipts unlock assets from Ankr’s Ethereum bridge
summary: Ankr Labs confirms forged-receipt exploitation and says only its own funds were affected, with staker funds safe. Its November 17 update reports bridge and staking pauses on Ethereum, Polygon and BNB Chain, new infrastructure and operator-key migration. SlowMist’s roughly $304,500 remains an estimate; no completion date is given.
splash: Ankr’s Ethereum bridge escrow, dependent integrations and staking users on Ethereum, Polygon and BNB Chain.
wipe: Follow official pause notices, preserve bridge and signer records, verify source events, and await confirmed reopening before retrying affected routes.
inTheWildNote: Ankr Labs confirms bridge exploitation; how valid signatures were obtained is unresolved.
level: 4
date: '2026-11-09'
updated: '2026-11-27'
tags:
- Ankr
- bridge
- Ethereum
inTheWild: 'yes'
timeline:
- date: Nov 9, 08:09 UTC
  title: Ethereum bridge begins paying the forged receipts
  body: OAK’s trace shows five withdrawals to a single recipient between 08:09:35 and 08:11:59 UTC.
- date: Nov 9, 09:14 UTC
  title: SlowMist publishes its initial analysis
  body: The researchers estimate about $304,500 and identify the reused Optimism transaction and signed receipts.
- date: Nov 10, 2026
  title: OAK traces the Ethereum leg
  body: Its independent transaction trace corroborates the five releases.
- date: Nov 17, 2026
  title: Ankr Labs confirms service pauses and infrastructure changes
  body: The operator says the bridge and staking on Ethereum, Polygon and BNB Chain have been paused since the exploit. Critical services are on new infrastructure and operators are moving to new keys. It says only Ankr Labs funds were affected and staker funds are safe. The bridge will remain paused until the fix is complete; staking reopening is promised without a firm date.
checklist:
- title: Contain bridge routes and reconcile source events
  hint: If you operate an affected route, suspend or isolate withdrawals you control. Preserve relayer, signer and contract logs. Match each receipt’s recipient, token, amount and unique source event before resuming. Investigate how the signatures were produced and rotate keys if compromise is established. Ankr Labs says its operators are moving to new keys and critical services have moved to new infrastructure; verify those changes and withdrawal validation before restoring a route. Key migration alone does not prove key theft or a completed fix.
- title: Review the published transaction and address records
  hint: OAK lists 12 traced transfers plus the source event and related addresses. Compare the exact addresses 0x9A88Dd45AE846A979705c9cFdfD0f229e592D703, 0x119D250b82C1cf5345dF5912EFb4B1a4107a1Aa6, 0xc437DF90B37C1db6657339E31BfE54627f0e7181, 0x881d40237659c251811cec9c364ef91dc08d300c, 0x92b2a947551d780f94dda2ef7ec566accdbd796d, 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, 0x8290333cef9e6d528dd5618fb97a76f268f3edd4, 0x9846c1f06d2f0e7c4678aeea56eb826efe41bb9a. Use the transaction hashes below. OAK identifies 0x92bb1f958a8aeb971227fba643b18cee5abd796d as a lookalike used in spoofed zero-value events. Shared routers can appear in legitimate activity and a match alone does not establish compromise.
- title: Verify operator guidance before bridging
  hint: Open Ankr Labs’ original November 17 update and check official channels for a later reopening notice before submitting or retrying affected transfers or staking operations on Ethereum, Polygon or BNB Chain. The update keeps the bridge paused until the fix is complete and gives no firm staking-unfreeze date. Preserve existing transaction hashes and verify the exact asset, network and route with the operator. Do not treat the promise of an imminent reopening or the statement that staker funds are safe as proof that access is restored. Ignore unsolicited refund, migration or unfreeze links, and never disclose a seed phrase or private key.
sources:
- name: SlowMist original technical alert, public copy
  says: Describes the forged receipts, valid signatures, reused source transaction and estimated amount.
  url: https://teapawt.org/SlowMist_Team/status/2119720284093890615
  primary: true
- name: OAK original transaction trace
  says: Corroborates five Ethereum withdrawals and documents evidence limits.
  url: https://onchainattack.org/document/examples/2026-11-ankr-ethereum-bridge-forged-signed-receipts-withdraw/
  primary: true
- name: Ankr Labs original staking incident update
  url: https://x.com/AnkrLabsTeam/status/2122758977910186482
  primary: true
  says: November 17 vendor statement confirms forged receipts reusing a redeemed Optimism deposit, says only Ankr Labs funds were affected, and reports multi-chain bridge/staking pauses, new infrastructure and operator-key migration. No firm reopening date or completed fix is announced.
- name: Public copy of the same Ankr Labs update
  url: https://teapaw.org/AnkrLabsTeam/status/2122758977910186482
  says: Full readable copy of the same November 17 vendor statement; not an independent corroborating origin.
---

SlowMist’s [original alert](https://x.com/SlowMist_Team/status/2119720284093890615) says the bridge accepted five receipts that changed the recipient, token and amount while referring to the same legitimate Optimism transaction. The receipts carried valid consensus signatures. OAK traced withdrawals of ankrETH, ANKR, ankrMATIC, aPOLb and aETHb to one recipient. The dollar figure is SlowMist’s estimate. OAK’s trace provides transaction corroboration and does not establish final net loss or prove signing-key theft. The original researcher reports did not establish a vendor remediation, confirmed pause or reimbursement plan. The later vendor statement below confirms pauses and containment work, but not a completed fix or reimbursement plan.

On November 17, Ankr Labs confirmed that the Ethereum bridge accepted forged receipts referring to an Optimism deposit that had already been redeemed. The operator says only Ankr Labs funds were affected and staker funds are safe. This is a vendor statement about financial impact, not an independent reconciliation of every balance or a claim that users retain uninterrupted access. The roughly $304,500 figure remains SlowMist’s estimate, not a newly verified final loss total.

The same update says the bridge and staking on Ethereum, Polygon and BNB Chain have been paused since the exploit. Critical services have moved to new infrastructure, and operators are moving to new keys. The bridge is to stay paused until the fix is complete. The promise that staking will reopen soon gives no firm date and is not confirmation of reopening. The reviewed official update does not explain how the valid signatures were obtained or publish a completed technical fix, final postmortem or reimbursement plan. Infrastructure and key changes alone do not prove signer-key theft. These November bridge facts are separate from Ankr’s earlier ankrFLOW/Flow incident.

Published transaction hashes. The first is the legitimate Optimism source event reused by the forged receipts.

```text
0x02e805b51beb4ed39e6a66ffcbdf9060cf008b3c3f0e827d0d357dfa115e7d4a
0x139e3e30b2993b96aec206e168d299d1678cf05a57c58d90593cf6c7b5f6d3e8
0x7310af5d53e08259915bc3547daf343d188b9c36db8dd6b3ff3b5e70565e88df
0x90c563360cc343a640721662abe762e9ab9665aee0c22820b1656ff23bcfc891
0xde2d5b455c0071698fec9c23a9c50f9ecdfd8efa96b4fbb48ed0620bd4c29b5c
0x91ba1a9c81a1bb67ce7a2779d5b2de54b7aece166f67d9e3a31e29e4e13c2886
0x46e20d4c8cd43dece94f7a2a890a348fefcb0dc8310279658c8f836e758bdad0
0x05f3d8109ca5bbc9e4d51697667ba9013dac5a476f1e2c6e695fffdfa2f0368c
0x560715bdd7f6eb59907395f6c6b519c489c2e7d1a13a22580079866a8c0799a8
0x393524106e749e57086c5b67e27cdbfabad4b30087dbe85c11e5b11099ff6bf3
0xfb4288a47f0146a534c17480b9eca017994fa587c25f022b051abb70c8e38e53
0x604820e86bc0eff1c85f4cbc2a4cc34d0c17f7254903e8623776359a8e042b90
```
