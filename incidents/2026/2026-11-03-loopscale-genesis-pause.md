---
title: Loopscale pauses protocol activity after attacks targeting SOL and USDC Genesis vaults
level: 4
date: '2026-11-03'
updated: '2026-11-07'
tags: [Loopscale, Solana, DeFi]
summary: Loopscale confirms two attack paths against SOL and USDC Genesis vaults. Collateral top-ups resumed for all loans. Repayment and collateral withdrawal remain blocked for USDC Genesis-funded loans, and vault withdrawals remain restricted. Loopscale says depositors will incur no loss, while a researcher disputes replenishment.
splash: Loopscale users, especially SOL/USDC Genesis vault depositors and borrowers needing repayment access
wipe: Check your loan's funding vault before repaying or withdrawing collateral. Verify positions through Loopscale and reject unsolicited recovery requests.
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
checklist:
- title: Check the pause and your positions through official channels
  hint: Read Loopscale's original notice from its verified account and reach the app through the established project website. Check your vault, loan and collateral records when the interface is available. The affected-vault statement concerns SOL and USDC Genesis vaults; do not assume all products were exploited or all operations have resumed.
- title: Verify repayment access and liquidation handling
  hint: As of November 6, top-ups are available on all loans. Repayment and collateral release after full repayment are available except for loans funded by USDC Genesis. Vault withdrawals remain restricted. Check the official interface and established support for the status of your loan and repayment route; retain loan identifiers, transaction hashes and any failed repayment records. Do not assume a pause stops interest or liquidations, or sign a purported emergency repayment from a direct message. No fixed reopening time or universal user transaction is published.
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
---

Loopscale reports a sustained campaign during the preceding week and says a detected escalation triggered its protocol pause. Its over-30,000 daily malicious-request figure is a vendor estimate, not a count of successful attacks or affected users. The notice identifies SOL and USDC Genesis vaults as targets and says affected vaults have been made whole without loss to user deposits. It does not publish the original amount affected, the replacement-funding source or a final forensic explanation.

Full operations are conditional on establishing the complete scope and further security hardening. The November 5 notice outlined plans to restore the interface and repayments. The November 6 update confirms the partial restoration below. It is cooperating with federal law enforcement and security professionals. The November 6 confirmation of actual exploitation warrants L4. No CVE, patched software version or Solana-wide compromise is established.

**Earlier reporting and disputed replacement:** On November 3, Andrew Seb alleged that a November 1 loan of 4,597 SOL (about $431,000 at the researcher's valuation) used one kySOL misidentified/priced as zBTC, with a decimal mismatch; the loan allegedly expired unpaid on November 2. On November 5, the researcher separately claimed a 586,000-USDC withdrawal after a 65,000-USDC deposit, about $520,000 net, and no return visible by 11:50 UTC. These figures and mechanisms are **unverified researcher claims**, not vendor-confirmed losses, and are not added together. The later post disputes replenishment, but a token-account snapshot does not settle off-account replacement commitments or customer-wide compensation. The vendor's statement is retained as its claim, not independently established recovery. The public disclosure date follows the earlier November 3 report, not the alleged theft date or later vendor acknowledgment.

**November 6 attack paths and recovery.** Loopscale attributes the SOL vault attack to a combination of pricing settings that valued collateral as a different asset, allowing an undercollateralized loan of about $412,000. It says an atomic bundle sold an extreme-interest loan into the USDC vault, inflated net asset value and enabled about $521,000 in disproportionate redemption. Loopscale says it stopped the activity within 30 seconds of transaction generation and that depositors will incur no loss. These are distinct vendor-reported amounts. The announcement does not reconcile them with the researcher's earlier figures or independently establish net losses, how replacement was funded or repayment to individual users.
