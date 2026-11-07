---
title: Web3Auth pauses embedded wallets as Keplr investigates unauthorized social-login transactions
level: 4
date: '2026-11-06'
tags: [Web3Auth, Keplr, Embedded wallets, Social login]
summary: Web3Auth suspended its embedded wallet service. Keplr paused Google and Apple login after receiving reports of unauthorized transactions from some wallets created that way. Keplr’s co-founder estimates about 20% of that group may be affected, with a smaller fraction apparently exploited. Total losses and the mechanism remain unknown.
splash: Keplr wallets created using Google or Apple login. Keplr’s initial assessment excludes recovery-phrase and hardware wallets.
wipe: Stop funding or re-importing potentially affected accounts. Track official guidance and report unrecognized transactions through Keplr support.
inTheWild: 'yes'
inTheWildNote: Keplr received unauthorized transaction reports. Its co-founder reports exploitation.
timeline:
- date: Nov 6, 21:13 UTC
  title: Web3Auth discloses an embedded wallet security issue
  body: It paused the service used by some third parties and reported no evidence of impact on MetaMask users in its initial investigation.
- date: Nov 7, 04:38 UTC
  title: Keplr reports unauthorized transactions and pauses social login
  body: Reports concern some wallets created with Google or Apple login. Keplr and Web3Auth are investigating.
- date: Nov 7, 08:29 UTC
  title: Keplr co-founder gives a preliminary scope estimate
  body: Josh Lee places the origin at Web3Auth and estimates about 20% of Keplr social-login accounts may be affected. Lee says a smaller fraction appears to have been exploited.
checklist:
- title: Stop new deposits and keep the existing wallet setup
  hint: If you created the account using Google or Apple login, Keplr asks you to stop sending new funds and to avoid re-importing or recreating that account anywhere while it investigates.
- title: Preserve and report unexpected activity
  hint: Save the public wallet address, chain, transaction hashes, times and amounts. Reach support through the official Keplr website. Follow Keplr’s official account for updates and ignore unsolicited recovery links. Keep keys and recovery phrases private.
- title: Check upstream status before restoring login integrations
  hint: If your app relies on Web3Auth, check the provider’s official status event and developer announcement. Wait for confirmed recovery instructions before resuming the affected flow. The displayed maintenance window is a schedule.
sources:
- name: Web3Auth disclosure
  url: https://x.com/Web3Auth/status/2118814067359969745
  primary: true
  says: Original public post read in a public copy. Confirms the service pause and the initial assessment of MetaMask user impact.
- name: Keplr incident notice
  url: https://x.com/keplrwallet/status/2118926087615045807
  primary: true
  says: Original public post read in a public copy. Reports unauthorized transactions, affected wallet creation methods, the login pause and immediate user precautions.
- name: Keplr co-founder’s initial findings
  url: https://x.com/dogemos/status/2118984142151196677
  primary: true
  says: Original public post read in a public copy. Attributes the incident to the upstream provider and gives the early scope estimate and recovery status.
- name: Web3Auth Login Service maintenance
  url: https://status.web3auth.io/events/maintenance/461
  primary: true
  says: Records security-related maintenance and says the provider will announce restoration.
- name: MetaMask developer announcement
  url: https://builder.metamask.io/t/a-security-incident-with-web3auth-embedded-wallets/3663
  primary: true
  says: Confirms the service pause and repeats the initial finding of no evidence of impact on MetaMask users.
---

Web3Auth disclosed a security issue affecting its embedded wallet service used by some third parties. Keplr reported unauthorized transactions from some wallets created with Google or Apple login. Keplr’s initial assessment excludes wallets created with a recovery phrase or used with hardware wallets. Web3Auth’s initial investigation found no evidence of impact on MetaMask users. The November 7 developer announcement repeats that assessment.

Keplr co-founder Josh Lee attributes the incident to Web3Auth and gives about 20% of Keplr’s Google or Apple login accounts as an early estimate of the potentially affected group. Lee says exploitation appears to involve a smaller share and recovery work is ongoing. No independently verified account count, final loss figure, attack mechanism or compensation plan was established in the reviewed disclosures.

Public copies of the original statements are available for [Web3Auth](https://teapaw.org/Web3Auth/status/2118814067359969745), [Keplr](https://teapaw.org/keplrwallet/status/2118926087615045807) and [Josh Lee](https://teapaw.org/dogemos/status/2118984142151196677).
