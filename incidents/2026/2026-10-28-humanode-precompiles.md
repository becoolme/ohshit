---
title: Humanode patches exploited EVM precompiles after eHMND is drained from 436 accounts
level: 4
date: 2026-10-28
tags: [Humanode, EVM, crypto]
summary: Humanode reports 12,773,243.03 eHMND taken from 436 accounts, including a ChainPort vault. Existing WeHMND approvals enabled theft without fresh signatures. Native-side balances were outside this flaw’s reach.
splash: Affected Humanode EVM approval holders and the ChainPort eHMND vault
wipe: Verify runtime spec 134, respect the announced service freeze and follow official reimbursement updates
inTheWild: yes
inTheWildNote: Humanode confirms exploitation and says the identified flaws are fixed.
cves: []
fixed:
  - product: Humanode mainnet runtime
    version: spec 134
    status: Activated
timeline:
  - date: Oct 28, 15:00:42 UTC
    title: Attack transaction executes
  - date: Oct 28, 15:40:48 UTC
    title: Mainnet activates the fix
  - date: Oct 28, 20:21 UTC
    title: Statement announces a 72-hour DEX, bridge and LP-staking freeze
checklist:
  - title: Confirm the deployed runtime before resuming integrations
    hint: Check spec 134 at block 20,446,186 against the official report. Do not assume patch activation also reopens frozen services.
  - title: Reconcile balances and follow recovery notices
    hint: Compare account state around attack block 20,445,791. Reference transaction 0x5ed6b9e5661b7ba5237a81244725272482044b0b572267d2f7f31874d68c4a82; a match alone does not prove compromise. Use official channels for reimbursement instructions; reject unsolicited claim links.
sources:
  - name: Humanode incident response and recovery report
    url: https://blog.humanode.io/humanode-incident-response-and-recovery-update/
    primary: true
    says: Confirms losses and remediation; promises full eHMND reimbursement, not completed payments.
---

Stateful precompiles accepted DELEGATECALL/CALLCODE, enabling identity confusion. This does not establish separate integration vulnerabilities. The attacker’s roughly 18,804 USDC sale proceeds are not total victim losses. Investigation continues. The page header says October 29, but its explicitly dated statement is October 28; that earlier disclosure date is used here.
