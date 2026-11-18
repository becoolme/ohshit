---
title: Blockaid reports B18TimeBank voucher redemption exploit draining about 404,540 USDC
date: 2026-11-17
level: 4
tags:
  - DeFi
  - Base
  - USDC
summary: "Blockaid reports an ongoing B18TimeBank exploit on Base: signed level-reward vouchers were redeemed to withdraw about 404,540 USDC from a settlement contract in one transaction. The alert does not explain how usable vouchers were obtained, and containment remains unverified."
splash: B18TimeBank settlement-contract and pool exposure on Base; total depositor exposure is not established
wipe: Avoid new deposits and contract interaction pending verified containment; follow official project updates and preserve transaction records.
inTheWild: yes
inTheWildNote: Blockaid’s original alert reports an ongoing exploit and a settlement-contract withdrawal.
timeline:
  - date: Nov 17, 2026
    title: Blockaid reports an ongoing exploit
    body: The security firm attributes about 404,540 USDC withdrawn in one transaction to redemption of signed level-reward vouchers.
checklist:
  - title: Avoid new exposure while containment is unverified
    hint: 0xCERT recommends no deposits or contract interaction until B18TimeBank confirms containment. Follow the project’s official channels for a validated recovery plan; this is not a withdrawal or recovery transaction instruction.
  - title: Preserve and compare your Base transaction records
    hint: 0xCERT relays address 0x28189eaeb578569e74fc1548b87440a384a51973 and example transaction 0x4b3061fef8f16796f632e3563bc034809eed74c1a6e46bd6481ea99e30db4966. Blockaid’s complete reference post links exploiter addresses (https://t.co/yiq4XZcixN), example transaction (https://t.co/DtczEVmQ2C), victim settlement (https://t.co/YAtH9GncAz) and victim pool (https://t.co/a9rrOtZIDt). Those short-link destinations could not be opened in this review; consult the original thread for the full references. A match alone does not establish your loss, and no match does not rule out exposure.
  - title: Wait for a verified explanation and final scope
    hint: The readable original does not explain how usable vouchers were obtained. Seek a project incident report and confirmed contract/remediation details before treating reported remaining balances or a quiet address as proof of safety.
sources:
  - name: Blockaid original exploit alert (public embed)
    url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fblockaid_%2Fstatus%2F2122779678427521387
    primary: true
    says: Original November 17 report of voucher redemption, ongoing exploitation and approximately 404,540 USDC withdrawn in one transaction.
  - name: Blockaid original reference post (public embed)
    url: https://publish.x.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fblockaid_%2Fstatus%2F2122779717455515738
    primary: true
    says: Publishes four links for exploiter addresses, example transaction, settlement contract and pool; redirect destinations were inaccessible here.
  - name: 0xCERT secondary advisory 2026-0372
    url: https://www.0xcert.com/advisory/0xCERT-2026-0372
    says: Relays Blockaid’s alert and two indicators, gives precautionary non-interaction advice, and identifies remaining root-cause and containment gaps.
---

Blockaid’s November 17 original alert describes an ongoing exploit against B18TimeBank on Base. It says an attacker redeemed signed level-reward vouchers and withdrew approximately 404,540 USDC from the settlement contract in one transaction. This is an incident-response firm’s attribution, not a conclusion inferred from a transfer alone. The amount is Blockaid’s reported estimate, not an independently verified final loss total.

The readable alert does not explain how the attacker obtained usable signed vouchers. It does not establish a signer-key leak, signature forgery or a particular contract-code defect. It also supplies no final depositor count, complete exposure figure or verified containment announcement. L4 reflects the security firm’s report of active exploitation of a DeFi settlement path, not a claim that Base itself or every wallet on it was compromised.

0xCERT’s November 18 secondary summary relays the alert, publishes the address and transaction above, and recommends avoiding deposits and contract interaction until containment is confirmed. It also repeats a report of a remaining contract balance; that is neither a verified safety guarantee nor a measure of recoverable funds here. Its source is the same Blockaid thread, so it is not independent confirmation of the attack’s cause. The linked Defiant article and Blockaid’s shortened explorer links were inaccessible during this review.

Preserve your own deposit and interaction records and follow official project announcements. No verified fix or recovery transaction is provided by the readable original alert; do not treat the example transaction as a remediation procedure.
