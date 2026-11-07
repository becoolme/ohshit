---
title: Loopscale reopens vaults and loans after attacks on SOL and USDC Genesis
level: 4
date: '2026-11-03'
updated: '2026-11-07'
tags: [Loopscale, Solana, DeFi]
summary: Loopscale says deposits, withdrawals and full loan management have resumed across all vaults, including USDC Genesis. The team confirmed two attack paths against Genesis vaults and says depositors will incur no loss. Replenishment remains disputed and a full technical report is pending.
splash: Loopscale users, especially SOL/USDC Genesis vault depositors and borrowers needing repayment access
wipe: Verify your position and available liquidity in the official app before depositing, withdrawing or managing a loan.
inTheWild: 'yes'
inTheWildNote: Loopscale confirms two attack paths. Deposit replenishment is not independently verified.
timeline:
- date: Nov 3, 2026
  title: Researcher alleges a collateral-pricing exploit
  body: Andrew Seb reports a November 1 SOL-vault loan against misidentified collateral. The amount and mechanism are unverified and not confirmed by the later vendor notice.
- date: Nov 5, 2026
  title: Loopscale announces a pause and affected-vault replacement
  body: The team reports over 30,000 malicious API requests daily during the preceding week. It says affected vaults are made whole and user deposits suffered no loss; interface and repayment restoration are planned, not confirmed completed.
- date: Nov 5, 2026
  title: Researcher disputes the made-whole statement
  body: A separate claimed USDC-vault outflow and lack of a visible return as of 11:50 UTC are unverified; a vault balance alone cannot establish customer-wide compensation or net loss.
- date: Nov 6, 00:34 UTC
  title: Loopscale confirms two attack paths and restores some loan functions
  body: All loans can add collateral. USDC Genesis-funded loans still cannot repay or withdraw collateral. Vault withdrawals and other protocol functions remain restricted.
- date: Nov 7, 21:40 UTC
  title: Loopscale announces full vault and loan functionality
  body: Deposits and withdrawals across all vaults and full loan management have resumed, according to Loopscale. A full technical postmortem is still pending.
checklist:
- title: Verify restored functions and available liquidity
  hint: Open the app through the established Loopscale website and confirm your vault, loan and collateral records. The November 7 announcement covers all vaults, including USDC Genesis. Check the available liquidity and any fee or queue shown for your withdrawal. Reopening does not guarantee immediate withdrawal at every size.
- title: Verify repayment access and liquidation handling
  hint: Verify the amount due and the collateral release shown by the official interface before signing. Contact established support if a transaction fails or the pause affected repayment or liquidation. Keep loan identifiers, hashes and failed repayment records. Reject emergency repayment or recovery requests sent by direct message.
- title: Preserve and report relevant address activity
  hint: 'The vendor links four addresses to the activity: 247Lk5YNH9URfBBvxVUtDruz8GvGX8gKGuYHVCZThpiR, AzPh2dUV3duK9n8PWV6CxKMwWr9Rk7fxPNBZuv1CiwMr, 0xb8959Aca4e4C796A3BaDA66833eAe60b1BC0bfb2, 0xB7Ec7eF24FD73f3000C651CA9D0Fa45b61DcF854. Compare relevant transactions and preserve hashes/times for official support or your response team. A match alone does not prove compromise or establish an address owner, exploit cause or loss total. Do not send funds to these addresses.'
sources:
- name: Loopscale original November 5 security notice
  url: https://x.com/Loopscale/status/2118285556123611378
  primary: true
  says: Full public original read in the browser. Confirms ongoing attacks, protocol pause, SOL/USDC Genesis scope, vaults made whole and no user-deposit loss; repayment and interface recovery still planned, four associated addresses and law-enforcement engagement. Displayed time lacks a timezone.
- name: Andrew Seb original November 3 research claim
  url: https://x.com/AndrewSeb555/status/2117601791441326490
  primary: true
  says: Researcher's own hypothesis and estimated SOL-vault borrowing, read in full publicly. Establishes earlier public reporting, not independently verified cause or loss. Bare publication time is not converted.
- name: Andrew Seb original November 5 replenishment dispute
  url: https://x.com/AndrewSeb555/status/2118308630759919739
  primary: true
  says: Claims a USDC-vault outflow and no visible return as of 11:50 UTC, contradicting the vendor's made-whole statement. Amounts, vault accounting and full compensation status are not independently verified.
- name: Loopscale November 6 recovery and attack-path update
  url: https://x.com/Loopscale/status/2118502123705159769
  primary: true
  says: Confirms partial reopening, two contained attack paths, approximately $412,000 of undercollateralized borrowing and approximately $521,000 in disproportionate redemption. The full public mirror gives the UTC timestamp.
- name: Full public mirror of Loopscale's November 6 statement
  url: https://teapaw.org/Loopscale/status/2118502123705159769
  says: Readable copy of the same original disclosure and its timestamp.
- name: Loopscale November 7 reopening announcement
  url: https://x.com/Loopscale/status/2119183228011422122
  primary: true
  says: Confirms deposits and withdrawals across all vaults and full loan management. A technical postmortem is pending.
- name: Full public copy of the November 7 announcement
  url: https://teapaw.org/Loopscale/status/2119183228011422122
  says: Provides the same statement and its UTC timestamp.
- name: Loopscale vault documentation
  url: https://docs.loopscale.com/using-loopscale/lend/lend
  primary: true
  says: Explains normal withdrawal liquidity constraints, queues and possible fees.
---

Loopscale reports a sustained campaign during the preceding week and says a detected escalation triggered its protocol pause. Its over-30,000 daily malicious-request figure is a vendor estimate, not a count of successful attacks or affected users. The notice identifies SOL and USDC Genesis vaults as targets and says affected vaults have been made whole without loss to user deposits. The November 5 notice did not quantify either path or identify how the replacement was funded.

Loopscale initially tied reopening to confirming the scope and applying further security measures. It announced partial restoration on November 6 and full vault and loan functionality on November 7. It says it is cooperating with federal law enforcement and security professionals. The November 6 confirmation of actual exploitation warrants L4. No CVE, patched software version or Solana-wide compromise is established.

**Earlier reporting and disputed replacement:** On November 3, Andrew Seb alleged that a November 1 loan of 4,597 SOL (about $431,000 at the researcher's valuation) used one kySOL misidentified/priced as zBTC, with a decimal mismatch; the loan allegedly expired unpaid on November 2. On November 5, the researcher separately claimed a 586,000-USDC withdrawal after a 65,000-USDC deposit, about $520,000 net, and no return visible by 11:50 UTC. These figures and mechanisms are **unverified researcher claims**, not vendor-confirmed losses, and are not added together. The later post disputes replenishment, but a token-account snapshot does not settle off-account replacement commitments or customer-wide compensation. The vendor's statement is retained as its claim, not independently established recovery. The public disclosure date follows the earlier November 3 report, not the alleged theft date or later vendor acknowledgment.

**November 6 attack paths and recovery.** Loopscale attributes the SOL vault attack to a combination of pricing settings that valued collateral as a different asset, allowing an undercollateralized loan of about $412,000. It says an atomic bundle sold an extreme-interest loan into the USDC vault and inflated its net asset value. Loopscale reports about $521,000 in disproportionate redemption and says its systems halted the activity within 30 seconds of transaction generation and that depositors will incur no loss. These are distinct vendor-reported amounts. The announcement does not reconcile them with the researcher's earlier figures or independently establish net losses, how replacement was funded or repayment to individual users.

**November 7 reopening.** Loopscale says the November 6 restrictions have been lifted, including those on loans funded by USDC Genesis. Normal vault liquidity rules still apply. The reopening notice does not provide a final loss or replenishment accounting, detail the hardening measures or give a date for the technical postmortem.
