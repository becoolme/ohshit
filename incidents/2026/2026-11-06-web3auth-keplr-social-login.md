---
title: Web3Auth pauses embedded wallets as Keplr investigates unauthorized social-login transactions
level: 4
date: '2026-11-06'
updated: '2026-11-07'
tags: [Web3Auth, Keplr, Embedded wallets, Social login]
summary: Web3Auth suspended its embedded wallet service. Keplr paused Google and Apple login after receiving reports of unauthorized transactions from some wallets created that way. Bitquery estimates that collectors on eight chains held about $6.01M at its November 7 cutoff. The estimate is unverified. The entry mechanism and final loss remain unknown.
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
- date: Nov 7, 16:00 UTC
  title: Bitquery publishes an eight-chain trace
  body: The collectors held an estimated $6.01M as of the 15:38 UTC read. Cosmos Hub sweeps were still ongoing at that cutoff. Wallet counts represent keys and cannot be read as a count of people.
checklist:
- title: Stop new deposits and keep the existing wallet setup
  hint: If you created the account using Google or Apple login, Keplr asks you to stop sending new funds and to avoid re-importing or recreating that account anywhere while it investigates.
- title: Preserve and report unexpected activity
  hint: Save the public wallet address, chain, transaction hashes, times and amounts. Reach support through the official Keplr website. Follow Keplr’s official account for updates and ignore unsolicited recovery links. Keep keys and recovery phrases private.
- title: Check upstream status before restoring login integrations
  hint: If your app relies on Web3Auth, check the provider’s official status event and developer announcement. Wait for confirmed recovery instructions before resuming the affected flow. The displayed maintenance window is a schedule.
- title: Check the collectors, fee wallet and staking-share transfers
  hint: 'Bitquery lists eight collector addresses: cosmos1atuap9kfnt6y8ykvn3437e7j3z8qffh3qtnmwu, osmo1atuap9kfnt6y8ykvn3437e7j3z8qffh3gsqtcw, inj1lqmdmuczn5rxn5jkc34wwrqdeh70etpf5wvt7g, akash1atuap9kfnt6y8ykvn3437e7j3z8qffh3ds7uhx, celestia1atuap9kfnt6y8ykvn3437e7j3z8qffh33pzt53, noble1atuap9kfnt6y8ykvn3437e7j3z8qffh3ggxnkj, dydx1atuap9kfnt6y8ykvn3437e7j3z8qffh3fjalwt, bbn1atuap9kfnt6y8ykvn3437e7j3z8qffh3h4z239. Fee wallet: cosmos1pa0n22gcyyjnv6vqe9qgphrfhyhhf52t6kqud0. Payout addresses of unconfirmed ownership: cosmos1t5u0jfg3ljsjrh2m9e47d4ny2hea7eehxrzdgd, cosmos1jr9vwrjtv2z4nkngzu0yrmw9gfxj0n97uy9hkt. Published transaction IDs: 919D1C61D474DDB5BC16DB12639E15BBDBD1C95AEDDBDA063BC052918E8C9700, D1F9C2224490B6C705B6065F784993C8D4CDC732F4B8A1EF939EA719873505F9. The report also checks the Injective collector’s EVM representation, 0xf836ddf3029d0669d256c46ae70c0dcdfcfcac29. Verify address roles against section 12 and a chain explorer. On Cosmos Hub, also look for reward-recipient changes, delegation tokenization and share transfers. A match alone does not prove compromise or address ownership.'
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
- name: Bitquery original Keplr on-chain investigation
  url: https://bitquery.io/investigations/keplr-wallet-hack
  primary: true
  says: Lists chain-specific collector addresses, the staking-share route and valuation, and explains cross-chain counting and attribution limits.
---

Web3Auth disclosed a security issue affecting its embedded wallet service used by some third parties. Keplr reported unauthorized transactions from some wallets created with Google or Apple login. Keplr’s initial assessment excludes wallets created with a recovery phrase or used with hardware wallets. Web3Auth’s initial investigation found no evidence of impact on MetaMask users. The November 7 developer announcement repeats that assessment.

Keplr co-founder Josh Lee attributes the incident to Web3Auth and gives about 20% of Keplr’s Google or Apple login accounts as an early estimate of the potentially affected group. Lee says exploitation appears to involve a smaller share and recovery work is ongoing. The vendors have not published a final account count, loss total, entry mechanism or compensation plan.

Public copies of the original statements are available for [Web3Auth](https://teapaw.org/Web3Auth/status/2118814067359969745), [Keplr](https://teapaw.org/keplrwallet/status/2118926087615045807) and [Josh Lee](https://teapaw.org/dogemos/status/2118984142151196677).


Bitquery counted **44,041 wallets** across seven chains where it could deduplicate by key. It separately counted **7,603 Injective addresses** with overlap and estimated that Injective adds 440 to 934 distinct wallets based on a sample of 299. Adding the raw counts would double-count wallets. Bitquery used **15:27 UTC** spot prices and tracked transactions through **15:38 UTC on November 7**, when it still observed sweeps on Cosmos Hub. Its **$6.01M** valuation excludes unpriced and suspected spam tokens and has not been independently verified. The ledger does not reveal how each wallet was created or how signing keys were compromised.

The researchers traced about **1.96 million staked ATOM** moved as tokenized shares. Normal unbonding takes 21 days, but the share tokens can be transferred before then. Bitquery saw no outgoing transfers from the collectors at its cutoff. The vendors have not confirmed a freeze or return. Pausing social login does not revoke signing capability already obtained. Continue to follow Keplr’s instructions to stop funding the accounts and avoid re-importing them.
