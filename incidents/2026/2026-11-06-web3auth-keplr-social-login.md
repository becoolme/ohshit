---
title: Web3Auth pauses embedded wallets as Keplr investigates unauthorized social-login transactions
level: 4
date: '2026-11-06'
updated: '2026-11-08'
tags: [Web3Auth, Keplr, Embedded wallets, Social login]
summary: Keplr confirmed that some Google or Apple login wallet keys were exposed through a Web3Auth infrastructure vulnerability. Web3Auth published recovery addresses covering all eight collectors where Bitquery estimated a $6.01M balance on November 7. The final loss remains unknown.
splash: Some Keplr wallets created with Google or Apple login. Keplr says recovery-phrase and hardware wallets are unaffected.
wipe: Stop deposits and avoid re-importing the affected account. Move remaining liquid assets to a separate recovery-phrase or hardware wallet.
inTheWild: 'yes'
inTheWildNote: Keplr received unauthorized transaction reports. Its co-founder reports exploitation.
timeline:
- date: Nov 6, 20:52 UTC
  title: First transfers observed retrospectively by Bitquery
  body: The researchers traced small transfers from ten Cosmos Hub wallets to the same collector.
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
- date: Nov 7, 16:53 UTC
  title: Web3Auth confirms an infrastructure security issue
  body: The provider identifies certain Keplr embedded wallets as affected and says it is working with Keplr to secure assets.
- date: Nov 7, 17:06 UTC
  title: Web3Auth discloses protective transfers
  body: Web3Auth says it and its partners began moving assets from vulnerable wallets that had yet to be hit, using the same path as the attacker. It says assets it secured this way are safe and a verified list of recovery addresses is being prepared.
- date: Nov 7, 17:17 UTC
  title: Keplr confirms private-key exposure and issues transfer guidance
  body: Keplr advises users to move remaining liquid assets to a wallet secured by a recovery phrase or hardware wallet. It says staked and locked assets will take longer to secure and an account checker is in development.
- date: Nov 8, 06:23 UTC
  title: Web3Auth publishes verified recovery addresses
  body: The list includes all eight destinations in Bitquery’s balance snapshot, three additional Cosmos ecosystem addresses and one address shared across eight EVM chains.
- date: Nov 8, 06:31 UTC
  title: Keplr publishes the same recovery addresses
  body: Keplr directs users to official Web3Auth updates and warns about impersonators and fraudulent recovery requests.
checklist:
- title: Stop new deposits and keep the existing wallet setup
  hint: If you created the account using Google or Apple login, Keplr asks you to stop sending new funds and to avoid re-importing or recreating that account anywhere while it investigates.
- title: Move remaining liquid assets to a separate wallet
  hint: Follow Keplr’s guidance to send remaining liquid assets to a separate wallet secured by a recovery phrase or hardware wallet. Verify the destination before sending. For staked or locked assets, follow official Keplr and Web3Auth updates for further steps.
- title: Check balance changes through official channels
  hint: An empty or reduced balance may reflect a protective transfer. Save the transaction hashes and compare the destination in a chain explorer with the official recovery list below. Use the list to check past transfers. Move remaining assets only to a separate wallet you control. Watch for the account checker and return instructions. Ignore unsolicited recovery messages and links.
- title: Preserve and report unexpected activity
  hint: Save the public wallet address, chain, transaction hashes, times and amounts. Reach support through the official Keplr website. Follow Keplr’s official account for updates and ignore unsolicited recovery links. Keep keys and recovery phrases private.
- title: Compare destinations with the official recovery addresses
  hint: Cosmos Hub cosmos1atuap9kfnt6y8ykvn3437e7j3z8qffh3qtnmwu, Osmosis osmo1atuap9kfnt6y8ykvn3437e7j3z8qffh3gsqtcw, Celestia celestia1atuap9kfnt6y8ykvn3437e7j3z8qffh33pzt53, Akash akash1atuap9kfnt6y8ykvn3437e7j3z8qffh3ds7uhx, Noble noble1atuap9kfnt6y8ykvn3437e7j3z8qffh3ggxnkj, Injective inj1lqmdmuczn5rxn5jkc34wwrqdeh70etpf5wvt7g, dYdX dydx1atuap9kfnt6y8ykvn3437e7j3z8qffh3fjalwt, Babylon bbn1atuap9kfnt6y8ykvn3437e7j3z8qffh3h4z239, Axelar axelar1atuap9kfnt6y8ykvn3437e7j3z8qffh3y99n9a, Saga saga1atuap9kfnt6y8ykvn3437e7j3z8qffh37c2ff6, Agoric agoric1atuap9kfnt6y8ykvn3437e7j3z8qffh3jk3y72, EVM 0x413e4F4De7E5FF010913488F781E679e76f706dA. Web3Auth says the last address serves eight EVM chains and did not name those chains in this thread. A match helps identify a protective transfer. It does not establish a return of funds or individual loss.
- title: Check upstream status before restoring login integrations
  hint: If your app relies on Web3Auth, check the provider’s official status event and developer announcement. Wait for confirmed recovery instructions before resuming the affected flow. The displayed maintenance window is a schedule.
- title: Check the collectors, fee wallet and staking-share transfers
  hint: 'Bitquery lists eight collector addresses: cosmos1atuap9kfnt6y8ykvn3437e7j3z8qffh3qtnmwu, osmo1atuap9kfnt6y8ykvn3437e7j3z8qffh3gsqtcw, inj1lqmdmuczn5rxn5jkc34wwrqdeh70etpf5wvt7g, akash1atuap9kfnt6y8ykvn3437e7j3z8qffh3ds7uhx, celestia1atuap9kfnt6y8ykvn3437e7j3z8qffh33pzt53, noble1atuap9kfnt6y8ykvn3437e7j3z8qffh3ggxnkj, dydx1atuap9kfnt6y8ykvn3437e7j3z8qffh3fjalwt, bbn1atuap9kfnt6y8ykvn3437e7j3z8qffh3h4z239. Fee wallet: cosmos1pa0n22gcyyjnv6vqe9qgphrfhyhhf52t6kqud0. Payout addresses of unconfirmed ownership: cosmos1t5u0jfg3ljsjrh2m9e47d4ny2hea7eehxrzdgd, cosmos1jr9vwrjtv2z4nkngzu0yrmw9gfxj0n97uy9hkt. Published transaction IDs: 919D1C61D474DDB5BC16DB12639E15BBDBD1C95AEDDBDA063BC052918E8C9700, D1F9C2224490B6C705B6065F784993C8D4CDC732F4B8A1EF939EA719873505F9. The report also checks the Injective collector’s EVM representation, 0xf836ddf3029d0669d256c46ae70c0dcdfcfcac29, and the linked key’s Bitcoin representation, bc1qatuap9kfnt6y8ykvn3437e7j3z8qffh3k3ds23. Use section 12 and a chain explorer for transaction context. Web3Auth later identified all eight collectors as recovery addresses. Its announcement did not separately establish ownership of the fee wallet, payout addresses, Injective EVM representation or Bitcoin representation. On Cosmos Hub, also look for reward-recipient changes, delegation tokenization and share transfers. A match alone does not prove compromise or address ownership.'
sources:
- name: Web3Auth disclosure
  url: https://x.com/Web3Auth/status/2118814067359969745
  primary: true
  says: Original public post read in a public copy. Confirms the service pause and the initial assessment of MetaMask user impact.
- name: Keplr incident notice
  url: https://x.com/keplrwallet/status/2118926087615045807
  primary: true
  says: Original public post read in a public copy. Reports unauthorized transactions, affected wallet creation methods, the login pause and immediate user precautions.
- name: Web3Auth infrastructure update
  url: https://x.com/Web3Auth/status/2119110953975635985
  primary: true
  says: Confirms an infrastructure security issue affecting certain embedded wallets used by Keplr users.
- name: Web3Auth protective transfer thread
  url: https://x.com/Web3Auth/status/2119114303907196932
  primary: true
  says: Describes protective transfers using the attack path, says the secured funds are safe and announces work on a verified list of recovery addresses.
- name: Keplr private-key exposure and user guidance
  url: https://x.com/keplrwallet/status/2119117067500806350
  primary: true
  says: Confirms private-key exposure for some social-login wallets and gives guidance for liquid, staked and locked assets.
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
- name: Web3Auth verified recovery address thread
  url: https://x.com/Web3Auth/status/2119314957057871935
  primary: true
  says: Lists eleven Cosmos ecosystem addresses and one address for eight EVM chains, with additional verifications planned.
- name: Keplr recovery address notice
  url: https://x.com/keplrwallet/status/2119316885737177339
  primary: true
  says: Publishes the same addresses and directs users to official Web3Auth updates.
---

Web3Auth disclosed a security issue affecting its embedded wallet service used by some third parties. Keplr reported unauthorized transactions from some wallets created with Google or Apple login. Keplr’s initial assessment excludes wallets created with a recovery phrase or used with hardware wallets. Web3Auth’s initial investigation found no evidence of impact on MetaMask users. The November 7 developer announcement repeats that assessment.

Keplr co-founder Josh Lee attributes the incident to Web3Auth and gives about 20% of Keplr’s Google or Apple login accounts as an early estimate of the potentially affected group. Lee says exploitation appears to involve a smaller share and recovery work is ongoing. The vendors have not published a final account count, loss total, entry mechanism or compensation plan.

Public copies of the original statements are available for [Web3Auth](https://teapaw.org/Web3Auth/status/2118814067359969745), [Keplr](https://teapaw.org/keplrwallet/status/2118926087615045807) and [Josh Lee](https://teapaw.org/dogemos/status/2118984142151196677).

Bitquery counted **44,041 wallets** across seven chains where it could deduplicate by key. It separately counted **7,603 Injective addresses** with overlap and estimated that Injective adds 440 to 934 distinct wallets based on a sample of 299. Adding the raw counts would double-count wallets. Bitquery used **15:27 UTC** spot prices and tracked transactions through **15:38 UTC on November 7**, when it still observed sweeps on Cosmos Hub. Its **$6.01M** valuation excludes unpriced and suspected spam tokens and has not been independently verified. On the seven chains deduplicated by key, Bitquery found that about 86% of the affected wallets were first swept after Keplr’s 04:38 UTC warning. The ledger does not reveal how each wallet was created or how signing keys were compromised.

The researchers traced about **1.96 million staked ATOM** moved as tokenized shares. Normal unbonding takes 21 days, but the share tokens can be transferred before then. Bitquery saw no outgoing transfers from the collectors at its cutoff. On November 8 Web3Auth identified all eight of Bitquery’s collectors as addresses used for protective transfers. Keplr published the same list. Bitquery’s original report attributed those addresses to the attacker based on its tracing and the information available at publication. The estimated $6.01M was the November 7, 15:38 UTC balance at the destinations Web3Auth later identified as recovery wallets. The vendors have yet to establish the attacker’s final take or reconcile the traced transfers individually.

Web3Auth says the assets secured by its protective transfers are safe. The latest notices identify verified recovery addresses. Asset returns, a claims process and the account checker remain pending confirmation. A balance change alone cannot determine whether funds were stolen or moved for protection. Pausing social login does not revoke signing capability already obtained. Keep deposits paused, avoid re-importing affected accounts, and follow Keplr’s guidance to move any remaining liquid assets to a separate wallet.

Public copies of the later statements are available. [Web3Auth infrastructure update](https://teapaw.org/Web3Auth/status/2119110953975635985), [protective transfers](https://teapaw.org/Web3Auth/status/2119114303907196932), [secured funds](https://teapaw.org/Web3Auth/status/2119114305475854345), [recovery address list update](https://teapaw.org/Web3Auth/status/2119114423239647375), [Keplr guidance](https://teapaw.org/keplrwallet/status/2119117067500806350).

Public copies include the published lists. [Web3Auth thread](https://teapaw.org/Web3Auth/status/2119314957057871935), [Keplr notice](https://teapaw.org/keplrwallet/status/2119316885737177339).
