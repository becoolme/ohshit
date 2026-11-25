---
title: K3 Capital pauses sBOLD after a multimillion-dollar vault drain
date: 2026-11-18
level: 4
tags:
- DeFi
- Ethereum
- sBOLD
summary: K3’s November 19 postmortem attributes the sBOLD drain to donation-inflated shares and a leftover router approval. It reports about 3.43M BOLD lost in 99 transactions. Liquity V2 and 1inch were not exploited. Recovery commitments are not confirmed repayments; the plan contains conflicting details.
splash: Depositors in K3 Capital’s independent Ethereum sBOLD vault; Liquity V2 is separately scoped
wipe: Do not deposit into sBOLD; retain position records and await K3’s verified remediation and recovery instructions.
inTheWild: true
inTheWildNote: K3 confirms malicious activity and a pause; researchers report the vault drain.
timeline:
- date: Nov 18, 2026
  title: K3 pauses contracts; Liquity warns against deposits
  body: The project investigates malicious activity. Liquity distinguishes the independently operated vault from V2.
- date: Nov 18, 16:14 UTC
  title: Bitquery records its investigation snapshot
  body: Its analysis counts 97 drain transactions and about $3.42M; these are research estimates, not a final project accounting.
- date: Nov 19, 2026
  title: K3 publishes root cause and a conditional recovery plan
  body: Its ChainSecurity-assisted analysis reports ten attacker operators, 99 transactions and a 99.9% vault loss. Recovery participation and future BOLD redemptions are planned; contradictory counterparty counts and collection periods remain unresolved.
checklist:
- title: Stop new sBOLD deposits
  hint: Keep the deposit halt in place until K3 explicitly announces a verified safe reopening. The postmortem describes the pause and recovery effort; a recovery plan is not a patched-vault release.
- title: Retain evidence and verify recovery instructions
  hint: Keep wallet, transaction and position records, including Pendle SY-sBOLD exposure. Follow K3’s original report and official updates for the future redemption channel. Do not send seed phrases, private keys or advance fees to refund contacts. The report’s recovery treasury is for entities returning funds, not an instruction for depositors to send money; collection timing is contradictory.
- title: Use the complete research record when investigating
  hint: Use Bitquery’s 24 addresses and one transaction hash together with K3’s complete operator, contract and 21 validator-fee-recipient tables. The postmortem appendix contains more than ten addresses, including legitimate recipients. Check roles and full addresses in the linked originals. A match alone does not prove compromise, ownership or participation in the exploit.
sources:
- name: K3 Capital original notice
  url: https://x.com/k3_capital/status/2123040539578970305
  primary: true
  says: Readable public embed confirms malicious activity investigation and paused contracts.
- name: Liquity original scope and deposit warning
  url: https://x.com/LiquityProtocol/status/2123053380893573433
  primary: true
  says: Readable full public embed says sBOLD is independently operated and V2 is not affected.
- name: Bitquery original transaction investigation
  url: https://bitquery.io/investigations/k3-capital-sbold-hack
  primary: true
  says: Counts 97 transactions, about $3.42M and no trove liquidations; deployed-code version was not checked.
- name: Blockaid original preliminary alert
  url: https://x.com/blockaid_/status/2123036162847613184
  primary: true
  says: Readable excerpt describes self-liquidation and about $3.43M; long-post embed truncates the remaining text.
- name: K3 Capital postmortem and recovery plan
  url: https://x.com/k3_capital/status/2123395654214967426
  primary: true
  says: 'Full November 19 article, now readable publicly: residual approval root cause, 3.43M BOLD/99 transactions, no Liquity liquidations, MEV flows and conditional recovery. Summary and detailed recovery sections conflict on counterparties and timing.'
updated: '2026-11-25'
---

K3 confirms malicious activity and paused contracts. Liquity says the independent sBOLD vault is affected, not Liquity V2. Confirmed exploitation and deposit exposure support L4.

Bitquery estimates about $3.42M across 97 transactions; Blockaid’s preliminary alert estimated about $3.43M. These are attributed estimates, not K3’s final loss total. Blockaid describes self-liquidation; Bitquery found no trove liquidations and instead describes direct WETH transfers exploiting share valuation. Bitquery did not check the deployed code version, so its audit comparison does not prove an old fix was absent. The project’s later postmortem supplies a more complete mechanism, described below; final recovery accounting remains outstanding.

**November 19 postmortem, verified November 25.** K3 reports approximately 3.43M BOLD lost, 99.9% of vault assets, in 99 transactions by ten attacker operators. These project figures supersede the earlier six-wallet/97-transaction research scope without making that earlier estimate an independently verified final accounting. Its timeline dates the first drain to November 18 at 12:25:23 UTC, the 99.9% depletion to 12:32:47 UTC and the pause to 13:05:11 UTC. The analysis was carried out by ChainSecurity on K3’s behalf.

The public `swap()` path approved the router for collateral and checked incoming BOLD, but neither checked that the collateral left nor cleared unused allowance. Attackers borrowed BOLD, acquired most vault shares, transferred WETH directly into the vault, and supplied a crafted router order that delivered BOLD without consuming WETH. Both donations raised share value. After redeeming the shares, a second swap triggered by a dust wstETH donation used the leftover WETH approval to recover that collateral. The router could spend the approval only through a call made by the vault; it was not an arbitrary external allowance withdrawal. K3 explicitly corrects the early liquidation explanation: no Liquity liquidations were involved, and neither Liquity V2 nor 1inch was exploited. The report does not establish that an earlier audited fix was deployed.

K3 attributes about 986 ETH in builder payments to competition among attackers and reports 986.55 ETH passed to 21 validator fee recipients. These are onward flows of exploit proceeds, not extra vault losses or evidence that builders and validators participated in the exploit. Pendle’s SY-sBOLD wrapper held 399,993 sBOLD, 12.79% of pre-attack shares; K3 does not quantify those users’ losses separately.

**Recovery remains conditional.** The report’s summary says eight counterparties hold 894.50 ETH and describes two weeks of ETH collection. Its detailed section instead says nine counterparties hold 894.50 ETH plus 131,316 yBOLD, valued at roughly 1.7M BOLD at the attack-time ETH price, and describes four weeks of collection. Those contradictions remain unresolved; neither period is a reliable redemption deadline. Some entities have committed to participate, but identified balances and commitments are not confirmed returned funds or completed compensation.

K3 designates Ethereum address `0x2f02BCd2163176B29C7B070B43A1660A5341C795` for entities returning funds and offers them a 15% bounty. This is not an instruction for depositors to transfer money. The plan is to convert collected ETH to BOLD and redeem affected clients individually through a later announced channel; available BOLD depends on actual recovery and the conversion price. Verify every further instruction through K3’s original channels. No reopening, guaranteed full reimbursement or completed recovery is established by this report.
