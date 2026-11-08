---
title: b14g confirms unauthorized withdrawal of about 97 million staked CORE
level: 4
date: 2026-10-31
updated: 2026-11-08
tags: [b14g, Core, staking]
ecosystems: [crypto]
summary: b14g says one transaction stole about 97.05 million CORE from 91 staking orders via zero-amount withdrawals. It reports 68.15 million CORE recovered through a Core fork and about 12 million reported frozen. b14g plans to restore about 70.2% of each affected order as staked balance. Distribution and a verified fix remain pending.
splash: CORE staked through b14g. The operator says BTC staked through b14g was unaffected.
wipe: Pause new deposits into the affected contracts. Save order records, check restored stake against the official allocation and verify any claim instructions.
inTheWild: yes
inTheWildNote: b14g directly confirms unauthorized withdrawals to attacker-controlled addresses.
cves: []
fixed: []
timeline:
  - date: Oct 31, 09:29:51 UTC
    title: Unauthorized withdrawal of staked CORE
    body: The operator’s postmortem gives this time for a single transaction that withdrew 97,045,563 CORE.
  - date: Oct 31, 10:35:51 UTC
    title: b14g pauses affected contracts
  - date: Oct 31, 16:38 UTC
    title: b14g publicly confirms the incident
  - date: Oct 31, 21:00 UTC
    title: Bitquery publishes a zero-amount withdrawal analysis
    body: The researcher reports 99 zero-amount requests draining 91 orders and an on-chain pause 66 minutes later; source code and discovery time were not established.
  - date: Nov 2, 2026
    title: BTCS discloses preliminary token exposure and an accounting impairment
    body: The company reports about 20M CORE potentially lost and remaining staked tokens locked. Its PLN6.05M full carrying-value write-down is not an additional theft amount.
  - date: Nov 2, 2026
    title: Fermi fork moves three account balances to a recovery address
    body: November 6 research estimates an unverified 68,146,177.22 CORE, roughly 70% of the drain, moved at the November 2 fork. The published Core implementation confirms the three-account balance adjustment, not user payouts.
  - date: Nov 6, 2026
    title: Bytecode research explains why the stake comparison accepts zero
    body: SigIntZero reconstructs an amount-versus-recorded-stake comparison that accepts zero for an unfunded recipient. Its present-state simulation is not a historical exploit replay or vendor-approved fix.
  - date: Nov 6, 11:22 UTC
    title: b14g publishes its postmortem and repayment plan
    body: The operator attributes the drain to a zero-amount withdrawal compatibility gap. It reports 68.15M CORE recovered by the November 2 fork and says it plans to credit roughly 70.2% of each affected order as staked balance within five to seven days of the postmortem.
checklist:
  - title: Verify contract status before taking further staking actions
    hint: Open b14g through your existing bookmark or its established b14g_network account and check its incident announcements before depositing or interacting with the affected deployment. The readable notice reports a pause; it does not establish a safe replacement contract or verified fix. Do not treat this report as a confirmed compromise of the Core network itself.
  - title: Preserve position history and reject recovery requests
    hint: Record your staking-order identifiers, transaction hashes, relevant contracts and pre-incident balances for official support. Use established project channels to verify any next steps. Do not disclose seed phrases or private keys, pay recovery fees or sign unsolicited recovery transactions. These are general precautions; b14g has announced a repayment plan and has yet to publish its claim procedure. A recovery-wallet balance is not permission to use a claim site or proof that your position was repaid.
  - title: Compare staking records with the researcher’s reference ledger
    hint: "Use Bitquery’s October 31 report and its Core Scan links to compare your order and transaction history. Its complete 12-entry reference ledger is: attacker wallet A 0xc556ed208285406d71705927f92d4f4eaea579f1; attacker wallet B 0x27758c30f8e424fbd8ca605bf31e9496c26ce92c; drain transaction 0xe1947f325e1f0bc22290ea97dc5b2ce44827fbb56e1cc40abaeda1d2ed04f62c; b14g proxy 0x04ea61c431f7934d51fed2acb2c5f942213f8967; b14g multisig 0xff2a4d8f696991d5350b28fd6fbcf3c7b7f94233; service Y 0x63c619d68c0f6daacf09f0a11ad03cea5f9ee1d8; service X 0xa78a018a7df5bcb6bd5517bdb1b0cd0a379d814e; Bybit hot wallet (researcher label) 0xf89d7b9c864f589bbf53a82105107622b35eaa40; MEXC deposit (researcher label) 0x8251321719179b7dc5680c5722741347756753ec; new wallet holding 2.0M CORE at the snapshot 0x18435b4e54a5771c77170689a86ae9b1df5fad8e; new wallet holding 2.5M CORE at the snapshot 0xa2cc1744a33fe73522b43d70ae2a7ff025dccae5; wallet sending 4,999,999 CORE back to attacker wallet B 0x911c3bf11dfc5497a53a7a04ff7980532516f176. These are role-labelled references, not twelve attacker wallets. A match alone does not prove compromise or loss; intermediary/exchange labels do not imply wrongdoing. Balances are historical, not live."
  - title: Distinguish the fork recovery address from attacker wallets
    hint: Core’s v1.0.27 code debits 0x27758c30f8e424fbd8ca605bf31e9496c26ce92c, 0x18435b4e54a5771c77170689a86ae9b1df5fad8e and 0xa2cc1744a33fe73522b43d70ae2a7ff025dccae5 into recovery recipient 0xb85095fE01C1d95da3B1df0998ff5eDDcC9ac064. This is a state adjustment, not a customer claims contract. A match alone does not prove compromise or repayment.
  - title: Verify the restored balance and any weekly claims through b14g
    hint: Compare the credited staked amount with your affected order’s original balance and the operator’s approximate 70.2% initial allocation. Watch b14g’s official channels for the claim location, instructions and start date. The announced plan allocates 50% of future b14g Core staking revenue and adds funds later recovered from exchange freezes to weekly claims.
sources:
  - name: b14g incident postmortem
    url: https://x.com/b14g_network/article/2118665399394795969
    primary: true
    says: Gives the integration failure, affected order count, recovery amounts, planned safeguards and two-stage repayment.
  - name: Core native staking code
    url: https://github.com/coredao-org/core-genesis-contract/blob/bc9dfa2d239937a94ca937efd9f350ac0c0c77be/contracts/CoreAgent.sol#L345-L348
    primary: true
    says: Shows the zero-amount branch substituting the delegator’s real-time stake.
  - name: b14g original security update
    url: https://x.com/b14g_network/status/2116570456245596580
    primary: true
    says: The full public copy confirms the pause, initial asset scope and an earlier estimate for frozen funds.
  - name: Official public embed of b14g's update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fb14g_network%2Fstatus%2F2116570456245596580&omit_script=true
    primary: true
  - name: Bitquery original b14g on-chain investigation
    url: https://bitquery.io/investigations/b14g-hack
    primary: true
    says: October 31 transaction analysis and role-labelled address ledger; researchers did not inspect b14g source code or verify the Bitcoin side.
  - name: BTCS company ESPI report 32/2026, publicly republished by Bankier
    url: https://www.bankier.pl/wiadomosc/BTCS-S-A-Incydenty-bezpieczenstwa-w-protokole-b14g-i-na-gieldzie-Binance-ekspozycja-Spolki-oraz-odpis-aktualizujacy-wartosc-tokenow-CORE-9222306.html
    primary: true
    says: November 2 issuer-authored Polish/English filing; preliminary ~20M CORE loss subject to verification, remaining stake locked; PLN6.05M non-cash impairment is not additional stolen funds; no known withdrawal-restoration date.
  - name: SigIntZero original bytecode and recovery analysis
    url: https://sigintzero.com/blog/b14g-1-47m-zero-amount-withdrawal-drain
    primary: true
    says: November 6 reconstruction and present-state simulation; recovery amount is an unverified research figure, not audited customer repayment.
  - name: Core Fermi adjustment implementation at v1.0.27
    url: https://raw.githubusercontent.com/coredao-org/core-chain/v1.0.27/consensus/misc/fermi.go
    primary: true
    says: Three debited accounts, one recovery recipient, one-time transition and conserved supply.
---

In its October 31 disclosure, b14g said it paused affected contracts upon discovery, reported an initial estimate of about 9M CORE frozen and said staked BTC was unaffected. The operator’s later timeline places the withdrawal at 09:29:51 UTC and the pause at 10:35:51 UTC, about 66 minutes later. The discovery time remains unspecified. [Public copy of the October 31 disclosure](https://teapaw.org/b14g_network/status/2116570456245596580).

**October 31 Bitquery analysis:** Bitquery reports that a wallet with no funded orders submitted 99 requests for zero CORE, emptying 91 orders. Its analysis says the downstream staking contract interprets zero as full withdrawal. This is a transaction-based finding, not a source-code audit or final vendor root cause. The researcher places the pause at 10:35:51 UTC on October 31, about 66 minutes after the drain; that does not establish when b14g discovered it. The vendor’s pause statement remains valid. Its 19:43 UTC balance snapshot is historical and cannot prove exchange freezes or repayments. The verified-fix and exit-procedure gaps remain.

**November 2 affected-company disclosure:** BTCS’s ESPI report 32/2026, read as an issuer-authored filing publicly republished by Bankier, says it holds about 68.3M CORE, around 90% staked through b14g. Preliminary information from the protocol operator suggests about 30% (~20M CORE) may have been lost; BTCS is verifying this. Remaining staked tokens are locked with no known withdrawal-restoration date. This is one holder’s exposure within the ~97M CORE incident, not an additive loss. The company writes down the full CORE carrying value by about PLN6.05M to zero, also citing liquidity and its exit decision. That non-cash impairment does not change token quantities and is neither a confirmed theft total nor compensation. BTCS says its own 202.27 BTC (September 30 snapshot) was unaffected and it has no Binance exposure; this does not establish safety or recovery of all b14g assets. It reported its positions to the operator; final losses and recovery arrangements remain pending.

**November 6 research follow-up:** SigIntZero’s bytecode reconstruction identifies a check that still allows the drain: zero passes an amount-versus-stake comparison, then requests the full downstream stake. It reports an **unverified 68,146,177.22 CORE** moved to recovery, not users. The Core implementation corroborates the adjustment mechanism, but code alone cannot prove execution, balances or distributions. The operator’s postmortem separately confirms the approximate fork recovery and explains the root cause.

In its November 6 postmortem, b14g confirms that the affected contracts passed zero through a public withdrawal path because it satisfied the check against the caller’s balance. The operator says a September 9, 2025 update made zero release the order contract’s entire stake with the validator. The order contract forwarded the proceeds to the caller. b14g says no keys were stolen, its contracts had not changed for 17 months and its time-locked BTC was unaffected. Its planned safeguards are local rejection of zero and other invalid amounts, integration tests when Core changes, automated withdrawal alerts and a faster pause. No fixed deployment is identified in the postmortem. [Public copy of b14g’s postmortem](https://teapaw.org/b14g_network/article/2118665399394795969).

b14g reports that the fork recovered about **68.15M CORE** and about **12M CORE** was reported frozen at exchanges. The latter includes 9.5M reported by SEAL 911 across three ChangeNOW orders without direct confirmation from ChangeNOW to b14g, and 2.5M at Bybit. The operator plans to credit approximately **70.2%** of each affected order as staked balance within five to seven days of the November 6 report. The remaining repayment would use 50% of future b14g Core staking revenue, plus any funds returned from exchange freezes, through weekly claims. The report gives no claim start date or completed repayment.
