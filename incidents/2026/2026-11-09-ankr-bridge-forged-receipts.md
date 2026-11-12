---
title: Forged receipts unlock assets from Ankr’s Ethereum bridge
summary: SlowMist reports five forged receipts used valid bridge signatures and referenced one earlier Optimism deposit. The Ethereum contract paid out five tokens. SlowMist estimates about $304,500. How the signatures were obtained remains under investigation.
splash: Ankr’s Ethereum cross-chain bridge escrow and integrations relying on that withdrawal path.
wipe: Pause affected routes where you control them, preserve signer and bridge records, and verify withdrawals against source-chain events.
inTheWildNote: SlowMist and OAK report five withdrawals. Signing-key exposure remains unconfirmed.
level: 4
date: '2026-11-09'
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
checklist:
- title: Contain bridge routes and reconcile source events
  hint: If you operate an affected route, suspend or isolate withdrawals you control. Preserve relayer, signer and contract logs. Match each receipt’s recipient, token, amount and unique source event before resuming. Investigate how the signatures were produced and rotate keys if compromise is established.
- title: Review the published transaction and address records
  hint: OAK lists 12 traced transfers plus the source event and related addresses. Compare the exact addresses 0x9A88Dd45AE846A979705c9cFdfD0f229e592D703, 0x119D250b82C1cf5345dF5912EFb4B1a4107a1Aa6, 0xc437DF90B37C1db6657339E31BfE54627f0e7181, 0x881d40237659c251811cec9c364ef91dc08d300c, 0x92b2a947551d780f94dda2ef7ec566accdbd796d, 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, 0x8290333cef9e6d528dd5618fb97a76f268f3edd4, 0x9846c1f06d2f0e7c4678aeea56eb826efe41bb9a. Use the reports for the full transaction hashes and spoofed lookalike example. Shared routers can appear in legitimate activity and a match alone does not establish compromise.
- title: Verify operator guidance before bridging
  hint: Check Ankr’s official channels before submitting or retrying a transfer on the affected route. Preserve existing transaction hashes and verify status with the operator. Ignore unsolicited refund links.
sources:
- name: SlowMist original technical alert, public copy
  says: Describes the forged receipts, valid signatures, reused source transaction and estimated amount.
  url: https://teapawt.org/SlowMist_Team/status/2119720284093890615
  primary: true
- name: OAK original transaction trace
  says: Corroborates five Ethereum withdrawals and documents evidence limits.
  url: https://onchainattack.org/document/examples/2026-11-ankr-ethereum-bridge-forged-signed-receipts-withdraw/
  primary: true
---

SlowMist’s [original alert](https://x.com/SlowMist_Team/status/2119720284093890615) says the bridge accepted five receipts that changed the recipient, token and amount while referring to the same legitimate Optimism transaction. The receipts carried valid consensus signatures. OAK traced withdrawals of ankrETH, ANKR, ankrMATIC, aPOLb and aETHb to one recipient. The dollar figure is SlowMist’s estimate. OAK’s trace provides transaction corroboration and does not establish final net loss or prove signing-key theft. The reviewed material did not establish a vendor remediation, confirmed pause or reimbursement plan.
