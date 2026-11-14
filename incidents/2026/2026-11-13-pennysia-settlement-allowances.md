---
title: Pennysia settlement exploit spends leftover Ethereum token approvals
level: 4
date: '2026-11-13'
tags:
- DeFi
- Ethereum
- Token approvals
summary: A Pennysia swap route could call an arbitrary token contract using approvals users had left in place. Researchers traced one exploit transaction from four wallets. Revoke approvals even if swaps are disabled.
splash: Ethereum wallets with remaining ERC-20 allowances to the affected PennysiaSettlement contract.
wipe: Review Ethereum token approvals and revoke every remaining allowance to the affected settlement contract.
inTheWild: 'yes'
inTheWildNote: SlowMist investigated user theft reports; an independent trace shows four wallets drained.
timeline:
- date: Nov 12, 13:59 UTC
  title: A transaction drains tokens from four wallets
  body: The transaction in Ethereum block 26,399,314 uses remaining allowances to move three assets.
- date: Nov 13, 2026
  title: SlowMist alerts users and researchers trace the transaction
  body: The trace analysis finds that swaps are disabled at the time of review. Existing allowances still need to be revoked.
checklist:
- title: Revoke all approvals to the settlement contract
  hint: In your wallet’s Ethereum approvals page or a trusted approval tool, find spender 0x3aad97e5a91b8e43b7dc830aceb004307678795e. Set each remaining token allowance to zero, confirm the transactions on Ethereum and verify the allowances read zero. Check every wallet you used. A disabled swap interface does not remove approvals.
- title: Check wallet history and avoid recovery scams
  hint: Compare unexpected token movements with transaction 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, sender 0x813a5ab666adeba907548235fbac087642878300, helper 0x96bb89e3f86312968ce11a1bd8d9d28f4891a17a and the settlement contract above. A match alone does not establish theft. Record hashes, amounts and wallet addresses; report suspected losses through a known project channel. Revocation does not reverse completed transfers.
sources:
- name: SlowMist original alert via public embed
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FSlowMist_Team%2Fstatus%2F2121135351377047735&omit_script=true
  says: Explains the arbitrary external call and the use of leftover allowances.
  primary: true
- name: PandaSecurity transaction-trace analysis
  url: https://panda-security.vercel.app/blog/pennysia-settlement-arbitrary-call-approval-drain/
  says: Reconstructs the call flow, four affected wallets, token transfers and paused swap entry point.
  primary: true
- name: Ethereum transaction and token transfer records
  url: https://eth.blockscout.com/api/v2/transactions/0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d/token-transfers
  says: Shows token movements through the settlement and helper contracts.
  primary: true
- name: PennysiaSettlement verified contract
  url: https://eth.blockscout.com/address/0x3aad97e5a91b8e43b7dc830aceb004307678795e?tab=contract
  says: Identifies the deployed contract for which approvals should be checked.
  primary: true
---

SlowMist says it investigated theft reports and identified an arbitrary external call in Pennysia's Ethereum settlement contract. PandaSecurity reconstructed the trace: a caller-controlled route made the settlement contract invoke ERC-20 `transferFrom` against tokens users had already approved. A token controlled by the attacker let the route pass its balance checks. The affected wallets did not need to sign the attack transaction.

The observed transaction moved **5,006.133489 USDC**, **0.05 wstETH** and **101,000 YUNO** from four wallets through the settlement and helper contracts. These are the amounts observed in that transaction; the sources do not establish a final loss total or reimbursements. PandaSecurity observed that the contract's swap flag was off. Pausing swaps does not erase approvals, and the sources do not establish a patched deployment.

For operators of similar contracts, restrict external calls to approved targets and methods, and keep execution separate from the contract holding user allowances. Test that an arbitrary route cannot debit a third party's balance or allowance.
