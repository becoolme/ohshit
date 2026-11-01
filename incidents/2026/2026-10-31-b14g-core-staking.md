---
title: b14g confirms unauthorized withdrawal of about 97 million staked CORE
level: 4
date: 2026-10-31
updated: 2026-11-01
tags: [b14g, Core, staking]
ecosystems: [crypto]
summary: b14g says about 97 million CORE staked through its service was withdrawn without authorization on October 31. It reports pausing affected contracts upon discovery. This is a token count, not dollars or users; the readable portion of the original notice does not establish a final cause, verified fix or repayment plan.
splash: CORE staked through b14g; do not infer that the Core network or every asset supported by b14g was compromised
wipe: Avoid new exposure to affected staking contracts; preserve position records and verify recovery guidance through established b14g channels
inTheWild: yes
inTheWildNote: b14g directly confirms unauthorized withdrawals to attacker-controlled addresses.
cves: []
fixed: []
timeline:
  - date: Oct 31, 09:29 UTC
    title: Unauthorized withdrawal of staked CORE
    body: b14g gives this explicit UTC time for the withdrawal of approximately 97 million CORE.
  - date: Oct 31, 2026
    title: b14g publicly confirms the incident and reports pausing affected contracts
  - date: Oct 31, 2026
    title: Bitquery publishes a zero-amount withdrawal analysis
    body: The researcher reports 99 zero-amount requests draining 91 orders and an on-chain pause 66 minutes later; source code and discovery time were not established.
checklist:
  - title: Verify contract status before taking further staking actions
    hint: Open b14g through your existing bookmark or its established b14g_network account and check its incident announcements before depositing or interacting with the affected deployment. The readable notice reports a pause; it does not establish a safe replacement contract or verified fix. Do not treat this report as a confirmed compromise of the Core network itself.
  - title: Preserve position history and reject recovery requests
    hint: Record your staking-order identifiers, transaction hashes, relevant contracts and pre-incident balances for official support. Use established project channels to verify any next steps. Do not disclose seed phrases or private keys, pay recovery fees or sign unsolicited recovery transactions. These are general precautions; no vendor-approved exit or repayment procedure was verified here.
  - title: Compare staking records with the researcher’s reference ledger
    hint: "Use Bitquery’s October 31 report and its Core Scan links to compare your order and transaction history. Its complete 12-entry reference ledger is: attacker wallet A 0xc556ed208285406d71705927f92d4f4eaea579f1; attacker wallet B 0x27758c30f8e424fbd8ca605bf31e9496c26ce92c; drain transaction 0xe1947f325e1f0bc22290ea97dc5b2ce44827fbb56e1cc40abaeda1d2ed04f62c; b14g proxy 0x04ea61c431f7934d51fed2acb2c5f942213f8967; b14g multisig 0xff2a4d8f696991d5350b28fd6fbcf3c7b7f94233; service Y 0x63c619d68c0f6daacf09f0a11ad03cea5f9ee1d8; service X 0xa78a018a7df5bcb6bd5517bdb1b0cd0a379d814e; Bybit hot wallet (researcher label) 0xf89d7b9c864f589bbf53a82105107622b35eaa40; MEXC deposit (researcher label) 0x8251321719179b7dc5680c5722741347756753ec; new wallet holding 2.0M CORE at the snapshot 0x18435b4e54a5771c77170689a86ae9b1df5fad8e; new wallet holding 2.5M CORE at the snapshot 0xa2cc1744a33fe73522b43d70ae2a7ff025dccae5; wallet sending 4,999,999 CORE back to attacker wallet B 0x911c3bf11dfc5497a53a7a04ff7980532516f176. These are role-labelled references, not twelve attacker wallets. A match alone does not prove compromise or loss; intermediary/exchange labels do not imply wrongdoing. Balances are historical, not live."
sources:
  - name: b14g original security update
    url: https://x.com/b14g_network/status/2116570456245596580
    primary: true
    says: Public embed confirms the amount in CORE, withdrawal time and contract pause; the remainder is truncated.
  - name: Official public embed of b14g's update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fb14g_network%2Fstatus%2F2116570456245596580&omit_script=true
    primary: true
  - name: Bitquery original b14g on-chain investigation
    url: https://bitquery.io/investigations/b14g-hack
    primary: true
    says: October 31 transaction analysis and role-labelled address ledger; researchers did not inspect b14g source code or verify the Bitcoin side.
---

The operator describes unauthorized withdrawals and attacker-controlled recipients, rather than an unexplained transfer. That confirmed asset theft supports L4. Approximately 97 million CORE must not be reported as $97 million. The readable opening of the vendor's October 31 notice confirms the pause but does not establish when discovery occurred or how quickly the pause followed the withdrawal. Its later text could not be read in full, so later tracing, frozen-fund, unaffected-asset and compensation claims are not established here. Frozen or traced assets would not by themselves prove that users have been repaid.

**November 1 research update:** Bitquery reports that a wallet with no funded orders submitted 99 requests for zero CORE, emptying 91 orders. Its analysis says the downstream staking contract interprets zero as full withdrawal. This is a transaction-based finding, not a source-code audit or final vendor root cause. The researcher places the pause at 10:35:51 UTC on October 31, about 66 minutes after the drain; that does not establish when b14g discovered it. The vendor’s pause statement remains valid. Its 19:43 UTC balance snapshot is historical and cannot prove exchange freezes or repayments. The verified-fix and exit-procedure gaps remain.
