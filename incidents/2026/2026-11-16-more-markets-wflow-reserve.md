---
title: MORE Markets liquidation flaw drains its WFLOW reserve on Flow EVM
level: 4
date: '2026-11-16'
tags: [MORE Markets, Flow EVM, DeFi]
ecosystems: [crypto]
summary: Blockaid observed an exploit of MORE Markets’ ankrFLOW/WFLOW lending market and estimated about $308,000 was drained from its WFLOW reserve. MORE Markets paused the protocol. Flow says the network itself kept running normally.
splash: WFLOW suppliers in the affected MORE Markets ankrFLOW/WFLOW market on Flow EVM.
wipe: Save your position and transaction records, check official status before interacting and verify any recovery instructions.
inTheWild: 'yes'
inTheWildNote: Blockaid tracked the exploit and MORE Markets confirmed a protocol pause.
timeline:
- date: Nov 16, 2026
  title: Blockaid detects the WFLOW reserve drain
  body: Blockaid reports flash loans and self-liquidations in the ankrFLOW/WFLOW market and estimates about $308,000 drained at the time of its alert.
- date: Nov 16, 2026
  title: MORE Markets pauses the protocol
  body: The project confirmed a security council pause and later said the AnkrFLOW protocol was also paused while the teams investigated.
- date: Nov 16, 2026
  title: Flow identifies a bug in MORE Markets’ lending contracts
  body: Flow says its network, Flow EVM and Cadence continued operating normally.
checklist:
- title: Record your affected position and wait for official instructions
  hint: Save the affected wallet address, deposit and position records, transaction hashes and timestamps without signing anything. Check MORE Markets and Ankr’s official channels before interacting with either paused protocol. Confirm whether a recovery process exists. Ignore unsolicited refund or recovery links.
- title: Match suspected activity to the affected reserve
  hint: On Flow EVM, correlate reported exploiter 0xe1eA6F2365215389f9DCd50a51c974313BF6785C, example transaction 0xdf9e3ed4858103569f684166d9833e1980b6ba96334c9a8ec172b4e2aa1d15d8, pool 0xbC92aaC2DBBF42215248B5688eB3D3d2b32F2c8d and vault 0x02BF4bd075c1b7C8D85F54777eaAA3638135c059. A match alone does not prove a wallet was compromised.
sources:
- name: Blockaid’s original exploit alert via X public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fblockaid_%2Fstatus%2F2122386020624707607
  primary: true
  says: Describes the self-liquidation path and contemporaneous estimate of funds drained.
- name: Blockaid’s on-chain indicators via X public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fblockaid_%2Fstatus%2F2122386079705657517
  primary: true
  says: Links the reported attacker, an example transaction, the victim pool and the vault.
- name: MORE Markets pause statement via X public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FMORE_DeFi%2Fstatus%2F2122389050443383236
  primary: true
  says: Confirms the security council paused the protocol.
- name: MORE Markets follow-up via X public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2FMORE_DeFi%2Fstatus%2F2122395894469533976
  primary: true
  says: Confirms both MORE Markets and AnkrFLOW were paused and the teams were working together.
- name: Flow’s incident statement via X public embed
  url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fflow_blockchain%2Fstatus%2F2122457454726312274
  primary: true
  says: Attributes the exploit to the lending application and describes network status.
---

Blockaid says the attacker borrowed through flash loans and used the market’s e-mode to create and liquidate their own ankrFLOW/WFLOW positions. That left WFLOW debt without matching collateral and drained WFLOW from the market’s reserve. Flow attributes the incident to MORE Markets’ lending contracts. The underlying Flow network remained operational.

Blockaid’s roughly $308,000 figure is a contemporaneous estimate of the amount taken from the reserve. It does not establish final depositor losses, realized proceeds or the amount users might recover. MORE Markets says both its protocol and AnkrFLOW were paused. Final recovery terms and a patched deployment remain unconfirmed in the sources reviewed.
