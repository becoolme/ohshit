---
title: "A Safe multisig lost assets through a permitted Zodiac Roles transaction"
level: 4
date: 2026-11-16
updated: 2026-11-17
tags: [Safe, Zodiac, Ethereum, crypto]
summary: >-
  A transaction through a Safe’s enabled Zodiac Roles module transferred about 4.39 million USDC and 1.72 million syrupUSDC. Safe and Zodiac point to a role-member key that was likely compromised and a custom policy that permitted the call.
splash: "One Ethereum Safe with a third-party Zodiac Roles module and a role-member policy that allowed the action."
wipe: "Revoke suspected role access, remove the affected module if needed, and restrict the replacement policy before restoring automation."
inTheWild: yes
inTheWildNote: "The transfer is on-chain. Safe and Zodiac describe likely compromise of a role key."
timeline:
  - date: Nov 16, 11:35 UTC
    title: A transaction through the enabled module transfers assets
    body: Ethereum logs record a successful module execution and transfers of USDC and syrupUSDC from the Safe.
  - date: Nov 16, 2026
    title: Zodiac and Safe describe the scope and suspected access path
    body: Zodiac says a custom policy authorized the action and it found no contract vulnerability. Safe says one multisig was affected and no owner signed the transaction.
  - date: Nov 17, 2026
    title: Bitquery documents approvals and follows the proceeds
    body: Bitquery traced the Morpho redemption and ParaSwap calls. Its November 17 snapshot still showed unlimited ParaSwap allowances for both tokens and an enabled Roles module.
checklist:
  - title: Remove suspected role access and suspend related automation
    hint: From a trusted device, use the modifier owner’s authority to remove the member’s active assignments. If you cannot safely constrain the module, coordinate the required Safe owner approvals to disable it. Confirm the on-chain change took effect. Check other Safes that reused the same member key or policy.
  - title: Verify which permissions let the transaction execute
    hint: Save transaction receipts and trace the enabled modules, role members, allowed targets, functions and parameter conditions. Inspect the receiving address and module against expected policy. An address match alone does not establish ownership or compromise. Review module executions and token approvals. Inspect owner changes separately from module activity.
  - title: Revoke unneeded token allowances before refunding a Safe
    hint: Check on-chain allowances for USDC and syrupUSDC to the ParaSwap spender used in the transaction. Revoke approvals the Safe no longer needs and verify they are zero. For remaining routes, limit amounts, executors and recipients, and simulate each route before moving assets back.
  - title: Test narrower permissions before restoring operations
    hint: Replace affected member keys, scope the allowed recipients and amounts, and simulate both allowed and prohibited calls. Verify the applied policy on-chain before restarting bots.
sources:
  - name: Safe statement (public embed)
    url: https://publish.twitter.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fsafe%2Fstatus%2F2122379948417581059
    says: Confirms one multisig was affected and describes the third-party module path and unconfirmed role-key compromise.
    primary: true
  - name: Zodiac statement (public embed)
    url: https://publish.twitter.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fzodiaceco%2Fstatus%2F2122360804661940545
    says: Describes the custom policy and likely key compromise and reports no contract vulnerability found.
    primary: true
  - name: Ethereum transaction and receipt
    url: https://eth.blockscout.com/tx/0x6c7cce68b6373dd0e645e6667d46788f49da5a4afc286bc363a2bf34f0a8c9c5
    says: Records the execution through the module and exact token amounts.
    primary: true
  - name: Zodiac role membership
    url: https://docs.roles.gnosisguild.org/general/membership
    says: Explains how role membership grants and revokes access.
    primary: true
  - name: Safe module removal reference
    url: https://docs.safe.global/reference-smart-account/modules/disableModule
    says: Documents how an enabled Safe module can be disabled.
    primary: true
  - name: Bitquery transaction and proceeds analysis
    url: https://bitquery.io/investigations/gnosis-safe-wallet-drain
    says: Reconstructs the Morpho withdrawal, ParaSwap calls, token allowances, subsequent swaps and the wallet’s response.
    primary: true
---

The Ethereum receipt for `0x6c7cce68b6373dd0e645e6667d46788f49da5a4afc286bc363a2bf34f0a8c9c5` records an `ExecutionFromModuleSuccess` event from Safe `0x595362a906a0b4e90aee1430b1f80fdde2be80de` for module `0x729c87d1b6939c9b2b0858ac25e235e83e5e6410`. Transfer logs record 4,387,188.426175 USDC and 1,717,918.961706 syrupUSDC moving from that Safe to `0x2b02c38022fee2f3c805055f49cd8d24a90cb9e1`. These are observed token quantities. The receipt establishes the transfer path. It does not establish how the caller’s key was obtained, who controls the addresses, the aggregate dollar loss or any recovery.

Safe says the module was installed outside Safe{Wallet}, no owner signed the transaction and its core contracts and wallet interface were unaffected. Zodiac says the transaction used a role-member key and that the custom policy permitted an action the wallet operator likely did not intend. Zodiac says it found no contract flaw. The key compromise remains a working explanation. A Safe can execute through an enabled module without the signatures used for a normal owner transaction, so owners reviewing similar exposure should check module permissions as well as their signing thresholds.

Bitquery reconstructed a Morpho vault redemption followed by two ParaSwap calls. The Safe had given the ParaSwap spender unlimited allowances for both transferred tokens. The calls passed the assets to a new executor address and returned no proceeds to the Safe. Bitquery observed the Safe change one owner and move its remaining tokens to another Safe. At 06:32 UTC on November 17, its snapshot still showed both token allowances and the enabled Roles module, even though the Safe no longer held the two tokens. Check and revoke outstanding access before depositing back into the original Safe.

Bitquery estimated the transferred tokens were worth about $6.44 million at the prices it used. It traced about $1.89 million to 12 orders for XMR1 on Hyperliquid and observed 1,833 ETH across three linked addresses at the November 17 snapshot. That describes movements and balances at a point in time. Any eventual Monero payout, recovery or link to the separate Lighter incident remains unverified.
