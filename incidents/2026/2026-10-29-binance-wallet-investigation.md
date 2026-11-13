---
title: Binance preliminary report details signing-service intrusion and revises funding figures
level: 4
date: 2026-10-29
updated: 2026-11-13
tags:
  - Binance
  - crypto
  - investigation
ecosystems:
  - crypto
summary: Binance reports signing-service intrusion and EIP-7702 abuse. The FBI attributes the theft to TraderTraitor. Binance now says it fully covered impacted assets and published a 198-token reserve snapshot. The new proof and full withdrawal reopening remain pending. DOJ has court authorization to seize or restrain over $1.2bn.
splash: Binance.com withdrawal users; Aave reports a precautionary freeze of DAO-operated V3/V4 markets
wipe: Follow official updates, inspect account activity, and use Binance's account-lock procedure if you find unauthorized actions
inTheWild: yes
inTheWildNote: Yi He acknowledges hacking losses and says Binance will cover them.
cves: []
fixed: []
timeline:
  - date: Oct 20, 2026
    title: Preliminary report dates internal device pivot
    body: Binance says the attacker pivoted through internal AI tools from engineer B to devices A and C and found A’s container-deployment token.
  - date: Oct 29, 2026
    title: Binance acknowledges an investigation; CZ separately suspects a hack
    body: The earlier exchange notice says user-fund impact is not confirmed. CZ reports stablecoin freezes and expects coverage, noting he no longer manages Binance.com.
  - date: Oct 29, 2026
    title: Binance edits its notice to say user funds are safe
    body: The revised wording replaces the earlier statement about unconfirmed impact; the investigation continues.
  - date: Oct 29, 2026
    title: Binance says withdrawals will resume after the security issue is resolved
    body: The exchange says it is conducting security checks and repeats that user funds remain safe. No restoration time is given.
  - date: Oct 29, 2026
    title: Aave freezes DAO-operated V3/V4 markets as a precaution
    body: Aave says its contracts are unaffected and positions remain overcollateralized; its statement concerns reports about Binance-affiliated wallets.
  - date: Oct 29, 2026
    title: TRM publishes cross-chain investigation
    body: The report is dated October 29; its figures use an October 30 00:30 UTC snapshot. Amounts and attribution are researcher findings.
  - date: Oct 29, 17:15–19:56 UTC
    title: Stolen token used to deploy a malicious container
    body: The November 3 report places deployment in this window after conversion from UTC+8; unauthorized access to the internal signing service followed.
  - date: Oct 29, 23:56 UTC
    title: Last pending ETH transfer finalizes
    body: Binance says the last pending 2,961.9 ETH transfer finalized, with no further unauthorized transfers identified afterward; this is a preliminary vendor assessment.
  - date: Oct 30, 00:10 UTC
    title: Binance clears malicious on-chain delegation
    body: The preliminary report says a new authorization operation from the Binance14 hot wallet cleared malicious EIP-7702 delegation; pausing withdrawals alone did not revoke on-chain authorization.
  - date: Oct 30, 2026
    title: Yi He says Binance will cover hacking losses and confirms deposit and withdrawal suspension
    body: The co-founder says security checks, fund freezes and law-enforcement coordination continue; a post-mortem will follow the investigation.
  - date: Oct 30, 2026
    title: Binance reports around $3 billion in frozen assets
    body: The vendor calls this a verified frozen amount. It is not the total stolen, permanently recovered or reimbursed.
  - date: Oct 30, 2026
    title: Binance gives a preliminary DevOps-to-service-container attack path
    body: The exchange says a compromised engineer laptop may have enabled service-container access and unauthorized withdrawal submissions. The visible notice is a preliminary investigation, not a completed post-mortem.
  - date: Oct 30, 2026
    title: Yi He says deposits operate normally and gives a withdrawal recovery estimate
    body: Withdrawal service and address-control enhancements continue; resumption is expected to begin within the next 48 hours, not guaranteed complete recovery.
  - date: Oct 30, 2026
    title: Binance reports additional breach points
    body: The vendor investigation extends beyond its preliminary laptop theory; no final root cause is established.
  - date: Oct 30, 2026
    title: Full notice updates recovery plans and private-key assessment
    body: Phased withdrawals remain conditional on security checks; no completed reopening is confirmed.
  - date: Oct 31, 2026, 00:00 UTC
    title: Binance takes its new proof-of-reserves snapshot
    body: The later recovery notice says this snapshot is available; the full zero-knowledge proof is still being generated.
  - date: Oct 31, 2026
    title: Binance reports 90% replenishment and updates recovery targets
    body: The vendor targets November 1 for withdrawals and November 3 UTC for the full reserve proof. Replenishment is not recovery of stolen assets.
  - date: Oct 31, 2026
    title: FBI attributes the theft to North Korea
    body: The bureau identifies TraderTraitor and requests transaction blocking against published laundering addresses.
  - date: Nov 1, 2026
    title: Binance reports 95% replacement funding
  - date: Nov 1, 2026
    title: Binance identifies Bitcoin as the first withdrawal batch
  - date: Nov 1, 2026
    title: Binance adds new wallet addresses to its reserve list for future withdrawals
  - date: Nov 1, 2026
    title: Yi He reports broadly smooth processing but warns of congestion
  - date: Nov 1, 2026
    title: Binance reports selected Ethereum and BSC withdrawals restored
    body: Ethereum supports USDC, USDT and ETH; BSC supports USDC, USDT and BNB. This is a limited asset/network update, not full restoration.
  - date: Nov 1, 2026
    title: Binance confirms additional XRP, Base, DOGE and Optimism withdrawals
    body: The readable original lists XRP on XRP; ETH and USDC on Base; DOGE on DOGE; and ETH, USDT and USDC on Optimism.
  - date: Nov 1, 2026
    title: Binance confirms Arbitrum and TRX withdrawals
    body: Arbitrum supports ARB, ETH, USDT and USDC; TRX supports TRX and USDT.
  - date: Nov 1, 2026
    title: Binance confirms selected Solana withdrawals
    body: The new-asset section lists SOL, USDT and USDC on Solana.
  - date: Nov 1, 2026
    title: Binance confirms Polygon and Avalanche C-Chain withdrawals
    body: Polygon supports POL, USDT and USDC; Avalanche C-Chain supports AVAX, USDT and USDC.
  - date: Nov 1, 2026
    title: Binance confirms selected ZEC, TON and SUI withdrawals
    body: The newer original lists ZEC on ZEC, USDT and GRAM on TON, and SUI on SUI. Other networks remain subject to separate checks.
  - date: Nov 2, 2026
    title: Binance says the October 31 reserve proof is ready for ten tokens
    body: "Recovery Update #5 says users can verify their snapshot balances for BTC, ETH, USDT, BNB, SOL, USDC, XRP, USD1, RLUSD and ZEC. Replacement funding remains about 95%; additional withdrawals are planned for November 3, and a broader snapshot for November 4 is still planned."
  - date: Nov 3, 2026
    title: Binance announces more withdrawal pairs from 04:00 UTC
    body: "Recovery Update #6 lists further assets across nine networks and BSC bSTOCKS. Availability rolls out progressively after security/readiness checks; the notice does not establish that every listed pair is already open. Deposits remain open."
  - date: Nov 3, 2026
    title: Preliminary report updates attack path, assets and response
    body: The report puts assets involved at ~$6.34bn and frozen/blocked assets at ~$2.85bn, retrospectively reporting 98% replacement by October 31 (UTC+8) versus earlier 95% notices. Binance claims exploited entry points were closed and affected systems rebuilt; independent review is still being commissioned.
  - date: Nov 3, 2026
    title: TRM traces new laundering routes through tokens and chained swaps
    body: Research follows self-minted liquidity-pool tokens, lending receipt tokens and bridge-to-bridge payouts. These observations do not revise vendor losses or establish new platform intrusions.
  - date: Nov 4, 00:00 UTC
    title: Binance takes a broader 44-token reserve snapshot
    body: "Recovery Update #7 says the new snapshot covers 44 tokens instead of ten; full zero-knowledge proof generation is expected to take 50–60 hours. The older ten-token proof remains separate."
  - date: Nov 4, 2026
    title: Research expands THORChain and Solana laundering observations
    body: Bitquery reports $3.1bn held and 556,271 ETH at its November 4 09:56 UTC snapshot, with some newly counted wallets checked through 11:28 UTC. It follows Solana proceeds toward Bitcoin and revises earlier TRX-route coverage. These remain unverified research estimates, not vendor losses or recovered assets.
  - date: Nov 4, 2026
    title: Polygon forum proposes a native-POL recovery fork; approval is pending
    body: The proposal attributes 46,626,593.27 POL to this incident, within about 70.49M POL across two separate cases. It is a governance proposal with no decided client release or activation block, not completed recovery or additional user compensation.
  - date: Nov 5, 2026
    title: Binance announces another staged withdrawal expansion from 04:00 UTC
    body: Recovery Update 8 lists additional pairs on ETH, BSC, Base, TRX, MATIC and SUI. Security/readiness checks still govern each pair; this is not confirmation that all listed withdrawals are already available.
  - date: Nov 5, 2026
    title: Research tracks a partial Aave liquidation and revised holdings
    body: Bitquery reports a November 4 liquidation repaying 9,884 WETH and taking 24.4M USDT from the pool. Its November 5 07:37 UTC snapshot estimates ~$3.2bn still attributed to the attacker and a remaining 35.6M USDT deposit/9,885 WETH debt. These are unverified research positions and valuations, not returned stolen assets or a new loss total.
  - date: Nov 5, 2026
    title: Binance proposes Arbitrum release of frozen ETH and ARB
    body: The Constitutional AIP requests 8,425.997 ETH and 74,559,805.2 ARB. Discussion, Snapshot and on-chain governance remain pending; an estimated 49-day process may be extended by legal restraints. This is not completed recovery.
  - date: Nov 5, 2026
    title: SEAL estimates an extended intrusion window and distinguishes TraderTraitor
    body: The research estimates roughly eight weeks of Binance access before the theft and publishes four front-company domains from broader TraderTraitor campaigns. This is a research estimate, not a precise vendor-confirmed first-access date or proof that each domain was used against Binance.
  - date: Nov 5, 2026
    title: Global Ledger publishes a November 4 holdings and freeze snapshot
    body: Its research estimates $5.99B still at linked addresses, including $2.82B frozen and $3.16B freely held. The selected tracing sample is $1.28B of outflows, not the entire theft; these are unverified research estimates, not returned funds.
  - date: Nov 6, 04:00 UTC
    title: Update 9 schedules a further withdrawal expansion
    body: More asset/network pairs across nine named networks reopen progressively after checks, not all at once. Deposits stay open; live availability remains pair-specific.
  - date: Nov 6, 2026
    title: SEAL revises post-issuance session and production-access guidance
    body: The research warns that short-lived sessions can be stolen repeatedly from a persistently compromised endpoint; it expands detection exercises and scoped service/production identities. These are defensive recommendations, not newly confirmed Binance findings.
  - date: Nov 7, 2026
    title: Elliptic traces more stolen XRP into bitcoin
    body: At about 08:00 UTC, the researcher estimates roughly 2,300 BTC converted from other stolen assets and more bitcoin entering coinjoins. The major original BTC and ETH holdings had yet to move in its analysis.
  - date: Nov 7, 2026
    title: Bitquery revises its freeze and laundering estimates
    body: Its updated analysis estimates about $2.8bn frozen or rescued, identifies about $7.7M in SOL sent to Privacy Cash and reclassifies 19,762 ETH as borrowed on Aave. These are research estimates, not a recovery total.
  - date: Nov 8, 08:52 UTC
    title: Binance confirms HYPE and APT withdrawals reopened
    body: The exchange also lists previously restored ETH and SOL pairs and says it will reopen further pairs in phases after security checks.
  - date: Nov 9, 08:16 UTC
    title: Arbitrum Foundation confirms the proposed recovery destination
    body: The Foundation confirms Binance’s control of the destination and that the proposal was posted on its behalf.
  - date: Nov 10, 11:00 UTC
    title: Elliptic publishes a newer tracing snapshot
    body: The firm estimates about 3,350 BTC converted from other assets and around $3.0 billion remaining at addresses linked to the theft.
  - date: Nov 12, 2026
    title: DOJ announces court-authorized action on stolen assets
    body: Government and private-sector efforts froze over $2.7 billion, of which more than $1.2 billion is subject to court authorization for seizure or restraint. Tracing and forfeiture efforts continue.
  - date: Nov 12, 2026
    title: Binance says it completed coverage of affected assets
    body: The exchange reports more than $6.34 billion committed and a new reserve snapshot covering 198 tokens. Proof generation and the phased reopening of withdrawals continue.
  - date: Nov 1, 06:00–09:00 UTC (scheduled)
    title: First withdrawal phase is planned


checklist:
  - title: Use official channels and reject recovery messages
    hint: Open Binance through your existing bookmark or official app and check its announcements for deposit and withdrawal restoration. The November 1 notice schedules the first withdrawal phase for 06:00–09:00 UTC; check your exact asset/network pair on the withdrawal or network-status page. The subsequent official update names Bitcoin as the first batch; a later update confirms Ethereum withdrawals for USDC, USDT and ETH, and BSC withdrawals for USDC, USDT and BNB. Later original posts also confirm XRP on XRP; ETH and USDC on Base; DOGE on DOGE; ETH, USDT and USDC on Optimism; ZEC on ZEC; USDT and GRAM on TON; and SUI on SUI. The linked intermediate updates also confirm ARB, ETH, USDT and USDC on Arbitrum; TRX and USDT on TRX; SOL, USDT and USDC on Solana; POL, USDT and USDC on Polygon; and AVAX, USDT and USDC on Avalanche C-Chain. Verify the exact pair live; these statements do not establish that every asset on these networks is available. Binance says future withdrawals use new wallets in its updated reserve-address list. Verify destination addresses and device security; congestion remains possible. The notice advises retrying later if needed. Verify unsolicited communications with Binance Verify or official support. Do not share passwords or 2FA codes, follow recovery links, or send money to purported support agents. Update 8 announces more pairs from November 5 04:00 UTC on ETH, BSC, Base, TRX, MATIC and SUI. Use its exact table and check the selected pair live; listing an asset does not mean all its networks are open. Deposits remain open, and delays/retries may occur during rollout. Binance confirmed HYPE and APT withdrawals reopened on November 8. Check the live page for the network and asset you intend to use.
  - title: Inspect your own account and respond to unauthorized activity
    hint: Review Security and Account Activity for unfamiliar logins, transactions or security-setting changes. If found, Binance instructs users to disable the account and contact official support. In the app, its guide uses Account Info → Security → Manage Account → Disable Account. Read the consequences before confirming; reopening may require support. This account control does not fix a possible exchange-wallet compromise.
  - title: Check Aave status before planning deposits or borrowing
    hint: Aave reports all DAO-operated V3/V4 markets frozen as a precaution and says its contracts remain unaffected. Check official market status and support before acting; do not infer a smart-contract exploit or use unsolicited refund/unfreeze links. The read official embed truncates the later operation-specific details.
  - title: Screen the FBI laundering-address list
    hint: Virtual asset providers and node operators should use the FBI notice's complete ETH, BTC and SOL list, containing more than 600 addresses, to block transactions with or derived from them. Report relevant information to an FBI field office or IC3. A transaction match alone does not prove an account or platform was compromised.
  - title: Verify your inclusion in the completed reserve snapshot
    hint: "Use Binance’s official PoR page and linked account-balance guide on a trusted device. In Profile → Wallet → Verification select the October 31 00:00 UTC record with verification type Merkle Tree + Zksnarks and download its data. The guide lists verifier 1.2.1 for August 2026 onward. Place config.json, proof.csv and zkpor864.vk.save in its config folder; check ProofTable and ZkKeyName against the downloaded proof/key. Run the platform’s verifier for the root, then add your account-specific user_config.json and use -user to check inclusion; never upload account files to an unsolicited checker. Update #5 covers BTC, ETH, USDT, BNB, SOL, USDC, XRP, USD1, RLUSD and ZEC. This is a historical snapshot, not a live balance or evidence that stolen assets were recovered. Update #7 announces a separate November 4 00:00 UTC snapshot covering 44 tokens; its full proof is still pending, with a 50–60-hour generation estimate. Use the older completed proof until the newer one is published; do not treat the new snapshot alone as a completed verification. Update #6 announces a progressive rollout from November 3 04:00 UTC. Use its exact asset/network table and the live withdrawal or network-status page; the announcement does not confirm every listed pair is already open."
  - title: 'Operators: investigate devices, deployment tokens and signing authority'
    hint: 'The report names /opt/homebrew/Cellar/pyenv/2.8.0/libexec/pyenv_, the replaced /opt/homebrew/Cellar/pyenv/2.8.0/libexec/pyenv and /opt/homebrew/bin/pyenv. Correlate file content, symlinks, processes and deployment logs; a path match alone is not proof. General operator response: isolate suspected devices, preserve evidence, rebuild from trusted media and revoke affected credentials/deployment tokens from a clean environment. Check signing-service access and whether EIP-7702 delegation still authorizes unknown code. Do not execute suspect installers. The report does not require ordinary Binance users to perform these server operations.'
  - title: Trace receipt tokens and cross-chain payouts when screening exposure
    hint: Compliance teams should follow lending receipt-token transfers and liquidity-pool relationships, not just USDT transfers; examine several hops and bridge-to-bridge deposit payouts. TRM notes that some matches rely only on amount/timing and remain under investigation. Use the linked research and corroborate counterparties; a label or matched transfer alone does not establish ownership or criminal involvement.
  - title: Recheck downstream swap routes against the dated research record
    hint: 'Compliance teams should consult Bitquery’s November 7 Binance report and its address record, which contains over 100 address/transaction indicators. Start with the labelled main receiver 0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c, then follow the reported THORChain, CCTP and Relay routes and their payout notes. Source wallets, recipients, transactions and legitimate services have different roles: do not block every user of a named service or treat an address match alone as proof of compromise/ownership. Preserve the FBI list above; a research snapshot is supplementary and incomplete.'
  - title: Track the governance decision without treating a proposal as recovery
    hint: Read the original Polygon forum proposal, subsequent governance decision and official client release. Separate transaction blocking, proposed recovery, actual returned funds and customer compensation. It lists this case’s addresses 0x5227f603C1eE34CE3C06eFe6477003BDfCCB2f8c, with a historical reference total of 46,626,593.27 POL; roles are the proposal’s attribution and a match alone does not prove a new compromise. Only native POL would move; other tokens and Class B addresses are excluded. Recovery addresses must prove control. A PPGC discussion is planned for November 5 at 14:30 UTC; activation requires governance approval, Amoy rehearsal and a final release, with no client version or activation block decided yet. Do not transfer to unsolicited recovery addresses, connect a wallet or sign a claim. Existing reimbursement and security steps still apply.
  - title: Track Arbitrum recovery separately from customer reimbursement
    hint: Read the original AIP and its votes, not a recovery-message link. It names frozen address 0x0000000000000000000000000000000000000DA0 and proposed Binance recovery address 0xd9fd39103674cb061d64d9c3b73b878dbe610b80; these are proposal roles, not destinations for customer claims or proof of a new compromise. No wallet signature or transfer is required from customers. Release needs the constitutional process and legal/indemnification conditions; the 49-day estimate is not an execution promise. Do not add these frozen balances to losses or compensation paid.
  - title: Check the Update 9 table for your exact asset and network
    hint: Read the official November 6 Recovery Update 9 and the live withdrawal/network-status page before submitting. The rollout begins at 04:00 UTC across BSC, Base, ETH, Optimism, MATIC, Arbitrum, AVAXC, TRX and SUI; individual pairs are not simultaneous. If processing is delayed, retry after a short wait as instructed by Binance. Reopening is not proof that frozen funds were returned or the reserve proof completed.
  - title: Extend operator hunting beyond the initial recruitment lure
    hint: SEAL lists citalab.net, citalab.com, bitfit.io and oddium.io as observed TraderTraitor front-company domains; its AFX example also uses git.oddium.io. Hunt these against recruiting, DNS/proxy, endpoint and repository logs, then correlate cloud sessions, lateral movement, privilege changes and signing-service activity. A match alone does not prove compromise, and these are campaign indicators, not confirmed Binance intrusion URLs. SEAL’s roughly eight-week estimate is not a safe log-retention cutoff. Preserve older evidence and independently validate withdrawal instructions against a trusted source.
  - title: Isolate external coding tasks from signing-adjacent access
    hint: Use a disposable VM without corporate credentials, SSH keys or cloud sessions for recruitment tasks and unfamiliar code. Report privileged-employee recruitment to security for independent company/domain/recruiter checks; real people and registered front companies do not establish safety. Review short-lived/device-bound sessions, alerts for new devices, integrity checks on wallet/RPC binaries and configurations, and patching/segmentation of privileged security appliances. Configure EDR to block suspicious behavior as one layer, not a guarantee; these are SEAL’s defensive recommendations, not proof Binance has deployed them.
  - title: Test post-issuance session theft and reduce standing access
    hint: SEAL’s November 6 revision notes that short-lived sessions and binding at issuance do not stop repeated theft or in-place use on a compromised endpoint. Reduce standing permissions, separate scoped service identities and retire abandoned services. Remove standing local administrator access where feasible. Exercise repository/CI-administrator and token abuse in a controlled environment and verify alerts actually fire. Move toward reviewed pipeline-mediated production changes with scoped identities; defend that concentrated repository/CI path first. These are operator recommendations, not an exchange-wide reset instruction or proof Binance has implemented them.
  - title: Screen newly traced bitcoin payouts and Solana transfers
    hint: For deposit screening, compare XRP-to-BTC payouts and coinjoin exposure against Elliptic’s dated labels and the FBI list. Check the route, timestamps and wallet context before escalating. A match alone cannot establish who controls an address. For Solana, also check the Privacy Cash transactions in Bitquery’s updated report and distinguish them from unrelated use of the mixer.
sources:
  - name: Binance investigation notice
    url: https://x.com/binance/status/2115915708504900039
    says: Earlier version of the exchange notice; initially checked by embed and later read directly, including its link to the edited version.
    primary: true
  - name: Official X embed of Binance's notice
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2115915708504900039&omit_script=true
    primary: true
    says: Confirms the investigation and says user-fund impact is not confirmed. The returned embed truncates the rest of the longer post.
  - name: CZ statement
    url: https://x.com/cz_binance/status/2115915423174853077
    says: Original shareholder statement, read directly and through its official embed; not a statement by current exchange management.
    primary: true
  - name: Official X embed of CZ's statement
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fcz_binance%2Fstatus%2F2115915423174853077&omit_script=true
    primary: true
    says: Suspects a hack, reports Tether/Circle freezes and expects funds to be covered; explicitly says he no longer manages Binance.com.
  - name: Cointelegraph
    url: https://cointelegraph.com/news/binance-linked-wallet-faces-possible-exploit-blockchain-researcher-warns
    says: Reports suspicious transfers from a Binance-linked wallet and an exchange spokesperson's investigation statement. Read through the public search index; direct retrieval returned 403.
  - name: Binance account security guidance
    url: https://www.binance.com/en/support/faq/detail/360000106932
    primary: true
    says: Explains account-activity checks, official-channel verification, credential protection and disabling an account after suspicious activity.
  - name: Binance account-disable guide
    url: https://www.binance.com/en-AE/support/faq/detail/115003800652
    primary: true
    says: Gives the app and website disable-account paths and warns about reopening requirements.
  - name: Binance revised investigation notice
    url: https://x.com/binance/status/2115918888429133902
    primary: true
    says: Edited official notice now says user funds are completely safe while the security investigation continues.
  - name: Binance withdrawal update
    url: https://x.com/binance/status/2115930656589119995
    primary: true
    says: Security checks are ongoing; withdrawals will resume once the issue is fully resolved. Repeats the assurance about user funds but gives no resumption time.
  - name: Official X embed of the withdrawal update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2115930656589119995&omit_script=true
    primary: true
    says: Independently readable primary copy of the complete withdrawal-status update.
  - name: Yi He loss-coverage statement
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fheyibinance%2Fstatus%2F2115958049244631357&omit_script=true
    primary: true
    says: The visible official embed states that Binance will cover all hacking losses, deposits and withdrawals are suspended, and a post-mortem will follow; the end of the post is truncated.
  - name: Aave precautionary market freeze
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Faave%2Fstatus%2F2115937863162339637&omit_script=true
    primary: true
    says: The visible official embed states contracts are unaffected, positions are overcollateralized and all DAO-operated V3/V4 markets are frozen; later operation-specific details are truncated.
  - name: Binance verified frozen-asset update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2115970069696217576&omit_script=true
    primary: true
    says: The visible official embed reports around $3 billion frozen and continuing tracing/freezing; not a final stolen-fund or reimbursement total.
  - name: Binance preliminary attack-path notice
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2115993361517891592&omit_script=true
    primary: true
    says: The visible first sentence describes a possible compromised DevOps laptop leading to service-container access and unauthorized withdrawal submissions. The sentence beginning about wallet private keys is truncated and not used to establish their status.
  - name: Yi He service recovery update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fheyibinance%2Fstatus%2F2116021551262740985&omit_script=true
    primary: true
    says: Visible official statement says deposits operate normally and withdrawal resumption is expected to begin within 48 hours; later text is truncated.
  - name: Binance further investigation update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116089661408108712&omit_script=true
    primary: true
    says: Visible official embed confirms additional breach points beyond the initial laptop hypothesis; later text truncates.
  - name: TRM original cross-chain investigation
    url: https://www.trmlabs.com/resources/blog/north-korea-steals-usd-6-36-billion-from-binance-in-the-largest-hack-in-history
    primary: true
    says: High-confidence TraderTraitor attribution and roughly $6.36bn outflows across ten chains; snapshot as of October 30 00:30 UTC.
  - name: Binance full security progress notice, number 2
    url: https://www.binance.com/zh-CN/support/announcement/detail/d3306d9dca5243548c813b605e1d1751
    primary: true
  - name: Binance recovery update number 3
    url: https://www.binance.com/en-AU/support/announcement/detail/1fdf1f61559c401da0435895ffcccb62
    primary: true
    says: October 31 notice reports 90% replenishment, a 00:00 UTC reserve snapshot, a November 3 UTC proof target and November 1 withdrawal target.
  - name: FBI attribution and laundering-address notice
    url: https://www.fbi.gov/investigate/cyber/alerts/2026/north-korea-responsible-for-6-billion-binance-attack
    primary: true
  - name: Binance recovery update number 4
    url: https://www.binance.com/en-GB/support/announcement/security-incident-recovery-update-4-withdrawals-resume-in-phases-2026-11-01-73911fb819b240f88b88256bdd318eda
    primary: true
    says: Schedules phase-one withdrawals and reports 95% replacement funding.
  - name: Binance first-batch network update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116773465072251141&omit_script=true
    primary: true
    says: Complete public embed identifies Bitcoin as the first-batch network.
  - name: Binance new withdrawal-wallet notice
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116785774540787920&omit_script=true
    primary: true
    says: Complete public embed says new wallets are in the reserve-address list and will process future withdrawals.
  - name: Yi He withdrawal-processing update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fheyibinance%2Fstatus%2F2116791881057354102&omit_script=true
    primary: true
    says: Readable portion describes generally smooth processing, possible congestion and address/device checks; the ending truncates.
  - name: Binance Ethereum and BSC withdrawal update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116799757507305516&omit_script=true
    primary: true
    says: Readable original lists six restored asset/network pairs; the final sentence is truncated.
  - name: Binance original additional-network restoration update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116833451949306221&omit_script=true
    primary: true
    says: Readable portion confirms exact BTC/ETH/BSC/XRP/Base/DOGE/Optimism pairs; closing text truncates.
  - name: Binance original ZEC, TON and SUI restoration update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116871932075516174&omit_script=true
    primary: true
    says: Readable new-asset section confirms ZEC/ZEC, TON/USDT and GRAM, and SUI/SUI; later already-enabled list truncates.
  - name: Binance original Arbitrum and TRX restoration update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116844881448743094&omit_script=true
    primary: true
    says: Readable new section confirms Arbitrum/ARB, ETH, USDT, USDC and TRX/TRX, USDT; older list truncates.
  - name: Binance original Solana restoration update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116851716448718901&omit_script=true
    primary: true
    says: Readable new section confirms Solana/SOL, USDT, USDC; older list truncates.
  - name: Binance original Polygon and Avalanche C-Chain restoration update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fbinance%2Fstatus%2F2116855614634852611&omit_script=true
    primary: true
    says: Readable new section confirms Polygon/POL, USDT, USDC and Avalanche C-Chain/AVAX, USDT, USDC; older list truncates.
  - name: Binance Recovery Update 5
    url: https://www.binance.com/en-UZ/square/post/383927538755526
    primary: true
    says: November 2 official announcement says the October 31 ten-token proof is generated; about 95% replacement coverage is unchanged, more withdrawals are planned November 3 and a broader snapshot November 4.
  - name: Binance account-balance verification guide
    url: https://www.binance.com/en-UZ/support/faq/detail/815b25f0cb054bdd9d35eccc408fe981
    primary: true
    says: Explains official verifier downloads, account-specific Merkle data, configuration and root/user checks; explicitly says the report is a snapshot, not real-time assets.
  - name: Binance official profile publishing recovery updates
    url: https://www.binance.com/en-UZ/square/profile/binance_announcement
    primary: true
    says: Readable complete official copies of Recovery Updates 5 and 6 when an individual post is unavailable; the same vendor statements, not independent corroboration.
  - name: Binance Recovery Update 6
    url: https://www.binance.com/en-UZ/square/post/384132999604606
    primary: true
    says: November 3 original lists nine networks and BSC bSTOCKS for progressive withdrawal reopening from 04:00 UTC, conditional on checks; deposits remain open.
  - name: Binance November 3 preliminary investigation and response report
    says: 'Full public page read without login: multi-stage device intrusion, token/signing-service access, delegation removal and revised 98% replacement/~$2.85bn frozen or blocked. Not a final independent audit.'
    url: https://www.binance.com/en/square/post/384314641614134
    primary: true
  - name: TRM November 3 laundering update
    url: https://www.trmlabs.com/resources/blog/binance-hack-update-north-korea-launders-proceeds-through-self-minted-tokens-and-chained-bridges
    primary: true
    says: Researchers trace self-minted tokens/pools, lending receipt tokens and chained bridge swaps. Quantities/snapshot dates and the stale no-government-attribution FAQ are not adopted as reconciled facts.
  - name: Bitquery original Binance investigation and November 7 revision
    url: https://bitquery.io/investigations/binance-hack
    primary: true
    says: Revised THORChain payees and Solana-to-Bitcoin routes; holdings snapshot 09:56 UTC, selected wallets through 11:28 UTC. About $3.1bn held / 556,271 ETH are unverified researcher figures; bank/exchange/service compromise and recovered funds cannot be inferred from flows. November 5 revision reports partial Aave liquidation, revised 07:37 UTC holdings and further Solana/THORChain routes. November 7 revises frozen or rescued assets, identifies a Solana mixer route and distinguishes Aave borrowing from swaps. These are researcher attributions, not independently reconciled customer balances.
  - name: Binance original preliminary report on its Bahrain site
    url: https://www.binance.bh/en/blog/community/3229153443759566763
    primary: true
    says: Readable official November 3 report corroborates affected/frozen amounts, replacement funding, signing-service access and ongoing independent review; same company report, not independent corroboration.
  - name: Binance Recovery Update 7
    url: https://www.binance.com/en/support/announcement/detail/c6ba9aa726974fc6b9332a2c8f63b405
    primary: true
    says: November 4 original read in full through the public CMS response below; 44-token snapshot at 00:00 UTC, proof pending with a 50–60-hour estimate, 98% replenishment and remaining illiquid purchases.
  - name: Binance public CMS copy of Recovery Update 7
    url: https://www.binance.com/bapi/composite/v1/public/cms/article/detail/query?articleCode=c6ba9aa726974fc6b9332a2c8f63b405
    primary: true
    says: Complete original article payload; the ordinary announcement page returned an empty response. Same vendor source, not independent corroboration.
  - name: Original Polygon forum native-POL recovery proposal
    says: Author proposes moving about 70.49M native POL from five listed addresses; separates incident shares, approval/rehearsal conditions and undecided activation parameters. Not evidence of an executed fork or repayment.
    url: https://forum.polygon.technology/t/pip-proposal-recovery-of-funds-held-in-blocked-addresses-following-the-polymarket-and-binance-incidents/22497
    primary: true
  - name: Binance public CMS copy of Recovery Update 8
    url: https://www.binance.com/bapi/composite/v1/public/cms/article/detail/query?articleCode=a225a3b6084c41dc8c8dfb33f4de5872
    primary: true
    says: Full November 5 original lists six networks, progressive withdrawal reopening from 04:00 UTC, security/readiness conditions, live-status checks and possible delays; deposits stay open.

  - name: Binance original Arbitrum Constitutional AIP
    url: https://forum.arbitrum.foundation/t/constitutional-aip-approve-release-of-frozen-eth-and-arb/31655
    primary: true
    says: November 5 forum proposal requests frozen ETH/ARB release, estimates 49 days, specifies recovery/frozen addresses and legal conditions, and permits reserves replenishment where Binance already covered losses. Not an approved transfer.

  - name: Binance original Recovery Update 9 public CMS copy
    url: https://www.binance.com/bapi/composite/v1/public/cms/article/detail/query?articleCode=a2dd10b860a14c35a856fe9d66d6032c
    primary: true
    says: Full November 6 original lists nine networks and staged withdrawal pairs from 04:00 UTC; deposits remain open, live pair status governs and temporary delays are possible.
  - name: SEAL original TraderTraitor threat profile and Binance assessment
    url: https://radar.securityalliance.org/tradertraitor-vs-contagious-interview-a-look-at-binances-initial-incident-report/
    primary: true

  - name: Global Ledger six-day fund-movement research
    url: https://blog.globalledger.io/research-investigations/six-days-after-the-binance-hack
    primary: true
    says: November 5 original research uses November 4 prices/holdings, distinguishes frozen balances from free holdings, and analyzes 132 stablecoin freezes across 12 issuers. Selected outflow coverage and address labels limit the estimates.
  - name: Elliptic November 7 tracing update
    url: https://www.elliptic.co/insights/how-north-korea-is-laundering-the-6-4-billion-stolen-from-binance/
    primary: true
    says: Traces XRP conversion through THORChain, linked bitcoin balances and mixing through about 08:00 UTC on November 7. Separates conversion, freezing and cash-out.
  - name: Bitquery November 7 nine-chain flow analysis
    url: https://bitquery.io/investigations/binance-hack-laundering
    primary: true
    says: Tracks an estimated $333M crossing chains, reaching mixers or entering exchanges through November 6 at 10:00 UTC. The figure does not establish conversion to fiat.
  - name: Binance November 8 withdrawal update
    url: https://x.com/binance/status/2119352231732580574
    primary: true
    says: Confirms HYPE and APT withdrawals reopened and lists the previously restored ETH and SOL pairs.
  - name: Arbitrum Foundation confirmation of the proposal destination
    url: https://forum.arbitrum.foundation/t/constitutional-aip-approve-release-of-frozen-eth-and-arb/31655/7
    primary: true
    says: November 9 confirmation from the Foundation that Binance controls the proposal destination and authorized the filing.
  - name: US Department of Justice announcement
    url: https://www.justice.gov/opa/pr/justice-department-announces-actions-disrupt-north-koreas-massive-theft-cryptocurrency
    says: Reports the joint freeze total and the court-authorized subset for seizure or restraint.
    primary: true
  - name: Binance asset coverage and reserve announcement
    url: https://www.binance.com/en/support/announcement/detail/0729ad59cde74700b4eaa96c33441e71
    says: Reports full coverage, funding sources, the 198-token snapshot and phased withdrawals.
    primary: true
  - name: Binance public announcement metadata
    url: https://www.binance.com/bapi/composite/v1/public/cms/article/detail/query?articleCode=0729ad59cde74700b4eaa96c33441e71
    says: The publication timestamp falls on November 12 UTC. The release carries a November 13 dateline.
    primary: true
---

Binance’s initial notice said it had not confirmed an impact on user funds. The exchange then edited that notice to state that user funds are safe, and subsequently said withdrawals would resume after the security issue is fully resolved. These are the vendor’s statements, not an independently audited reserve or loss assessment. No resumption time or technical containment report was supplied in those notices. The withdrawal notice does not specify affected networks or withdrawal routes; do not infer that every Binance product is affected. Those earlier notices supported L3 because they acknowledged disruption without confirming the suspected theft.

CZ separately suspects a hack and says he expects users to be covered, while explicitly stating that he no longer manages Binance.com. His earlier expectation was not a formal reimbursement guarantee from current management. Reported stablecoin freezes must not be counted as refunds or added to outflow estimates to calculate a loss. Circulating monetary estimates are unverified here; no independently reconciled stolen-fund total or victim count is established.

The November 3 preliminary report now describes initial access and claims key containment steps are complete; final root cause and independent validation remain pending. We have not independently traced the transactions or authenticated wallet ownership. The cited sources do not establish a link to the separate Polymarket/DebugBear incident, or a Binance root cause of frontend injection or private-key theft. Ordinary account-security measures are useful against account abuse, but cannot establish that exchange custody systems are safe.

**Update, October 30:** Yi He now explicitly says Binance will cover all hacking losses, confirms that deposits and withdrawals are temporarily suspended, and promises a post-mortem after the investigation. This current-management acknowledgment replaces the earlier uncertainty over whether the exchange itself had acknowledged hacking losses and supports L4. It does not establish a technical root cause or audited net loss.

Binance separately reports a verified frozen amount of around $3 billion. This vendor figure is not an independent reconciliation, and frozen assets must not be treated as returned funds or added to outflow estimates. Aave says it froze all DAO-operated V3/V4 markets as a precaution while its contracts remain unaffected and positions overcollateralized; the available official embed truncates later operational details.

**Further update, October 30:** Binance now says its initial investigation suggests a compromised DevOps engineer’s laptop may have enabled access to a service container and submission of unauthorized withdrawals. This replaces the earlier absence of a vendor-described attack path, but remains preliminary. The visible notice truncates its private-key statement, so it does not establish here whether wallet keys were exposed. At that stage, loss coverage, deposit/withdrawal suspension and the frozen-asset figure were unchanged. The newer service update below supersedes current deposit status; a full post-mortem and reconciled net loss remain outstanding.

**Service update, October 30:** Yi He now says deposits remain unaffected and operate normally, superseding the earlier suspension notice for current deposit status. Withdrawals are expected to begin resuming within 48 hours while service and address-control enhancements continue. This forecast does not establish full reopening or completed containment.

**Investigation update:** Binance now reports additional breach points, so the laptop must not be treated as a confirmed single root cause. TRM attributes the attack with high confidence to North Korea’s TraderTraitor and assesses signing-infrastructure compromise as likely; these are researcher judgments, not final vendor findings. Its roughly $6.36bn measures outflows at transfer-time prices, not net loss; this figure is not independently verified here. TRM’s ~$2.7bn frozen snapshot at 00:30 UTC differs in timing and scope from Binance’s later ~$3bn report; do not add them.

**Full-notice update:** Binance puts stolen assets at about $6.3bn and says it has not found evidence of wallet-private-key leakage. This supersedes the earlier truncated notice, without ruling out exposure. Its loss figure remains unaudited here and differs from TRM’s outflow estimate. Recovery timing is conditional; the report does not establish completed containment or a final root cause.

**Recovery update, October 31:** Binance says it has replenished 90% of the previously announced company-funded coverage. This is a vendor claim about replacement funding, not a statement that 90% of stolen assets were recovered. Its new reserve snapshot is dated October 31 at 00:00 UTC; the full zero-knowledge proof is still being generated and is now expected November 3 UTC. Withdrawals remain targeted for November 1, superseding earlier countdown estimates without confirming reopening. Neither this funding update nor a reserve snapshot establishes a final attack root cause.

**October 31 attribution update:** The FBI now assigns the theft to North Korea’s TraderTraitor. This adds a law-enforcement assessment to TRM’s earlier research finding. It does not resolve Binance’s initial-access investigation or establish a reconciled net loss. The FBI observed conversion mainly into ETH; further DeFi and instant-swap laundering is its expectation.

**November 1 recovery update:** The new notice specifies a first-phase withdrawal window of 06:00–09:00 UTC. Check the vendor’s asset/network table and live status; other pairs await readiness checks. Binance now reports 95% replacement funding, with the remaining 5% in less-liquid tokens outside its ten fully backed assets. This is company funding, not recovered stolen funds or an independent audit. A post-incident report remains pending.

**Further November 1 update:** Binance names Bitcoin as the first withdrawal batch and says newly generated wallets, now included in its reserve-address list, will handle future withdrawals. Yi He subsequently describes processing as broadly smooth while allowing for congestion and asks users to check destinations and device security. These statements do not establish that every asset/network pair is available, that the full reserve proof has been published, or that the investigation is complete.

**Later November 1 restoration:** Binance now explicitly reports withdrawals restored for USDC, USDT and ETH on Ethereum, and USDC, USDT and BNB on BNB Smart Chain. This is stronger than the earlier first-batch announcement for these six pairs only. Continue checking live availability for the exact pair; the post does not establish recovery of every asset or network, a completed investigation, or a published full reserve proof.

**Further November 1 restoration updates:** The separately read new-asset sections of Binance’s linked posts confirm the checklist’s 33 specific pairs across 15 networks. Their closing or repeated lists truncate in the public copies. These are vendor statements, not independent proof that every withdrawal succeeds or every asset on a network is supported. Check live availability. Neither restoration nor replacement funding proves recovery of stolen funds; the investigation remains unfinished.

**November 2 reserve update:** Recovery Update #5 supersedes the earlier pending-proof status: Binance says the full zero-knowledge proof for the October 31 00:00 UTC snapshot is generated and the ten listed tokens are verifiable. This reports the vendor’s publication and verification instructions; it is not an independent audit or a claim that we verified a customer account. The approximately 95% replacement funding remains unchanged. Additional networks/assets are planned for November 3 and a broader snapshot for November 4; the latter is expected to require another 40–50 hours of proof generation. These plans do not establish that all withdrawals are already open or that the stolen money has been returned.

**November 3 withdrawal update:** Recovery Update #6 announces further asset/network pairs from 04:00 UTC across BSC, Ethereum, Solana, XRP, SUI, Arbitrum, Optimism, TRX and Base, plus all BSC bSTOCKS. Its table is a rollout list: each pair awaits security and readiness checks, and the vendor directs users to live availability. Deposits remain open; delays and retries may occur. This advances the earlier plan without establishing complete restoration, recovered stolen funds or a final root cause.

**November 3 preliminary investigation:** Binance retrospectively says engineer A downloaded a tampered Homebrew installer while seeking an AI coding tool in June. Device replacement and credential rotation followed, but role/team information had already been exposed. In September, engineer B ran a fake recruitment assignment that installed malware on a work device and replaced a development-tool component. This does not establish compromise of the official Homebrew project or an unpatched CVE. On October 20 the attacker pivoted through internal AI tools to other devices and obtained A’s container-deployment token. A malicious container was deployed from C’s device on October 29 at 17:15–19:56 UTC, followed by access to the internal wallet signing service, bypassing ordinary withdrawals.

The report says 50 signed transactions manipulated account nonces and EIP-7702 delegation; malicious on-chain authority persisted after withdrawals were paused. The last pending 2,961.9 ETH transfer finalized on October 29 at 23:56 UTC. Binance says a new authorization operation from its Binance14 hot wallet cleared the delegation on October 30 at 00:10 UTC. These UTC times are converted from the report’s explicit UTC+8 timezone. This is not evidence that MPC was broken, private keys leaked or every ordinary user account was compromised.

**Revised amounts and containment:** The report now puts assets involved at about $6.34bn and frozen or blocked assets at about $2.85bn, subject to reconciliation and price changes. It retrospectively says 98% of affected token assets had been replenished by October 31 (UTC+8), with illiquid tokens still being purchased. This differs from the roughly 95% in the November 1–2 notices: treat it as a later vendor revision, while preserving the historical timeline. Frozen assets, blocked assets and company-funded replacement are not returned stolen funds or an audited net loss.

Binance claims exploited entry points are closed, systems on the attack path have been rebuilt or replaced, related credentials/tokens revoked and employee devices checked, with stronger wallet, device and anomaly monitoring. Independent security review is still being commissioned and some details remain undisclosed for the investigation. These are preliminary vendor findings, not a completed independent audit, final root cause or complete service restoration. The published pyenv paths require file and behavioural evidence; legitimate installations can contain the same paths.

**November 3 laundering research:** TRM reports value moving through attacker-created tokens and liquidity pools on TRON, transferable lending receipt tokens, and chained cross-chain swaps whose payout is sent directly to another bridge’s deposit address. These routes can break a USDT-only trace without proving funds vanished. TRM also describes active TRON/Solana movement while major ETH/BTC positions remained parked at its observation time; no current all-funds location is inferred. This is researcher attribution, with some payouts linked by amounts/timing. The report’s differing amounts and snapshot dates are not reconciled here and do not replace Binance’s figures, establish returned funds or prove that an onward service was compromised. Its FAQ’s statement that no government attributed the theft is superseded by the FBI source already retained above.

**November 4 research revision:** Bitquery expands its TRX-route tracing from an earlier partial THORChain sample to 98 labelled sending wallets and 102 named Ethereum payees, reporting about 19,985 ETH in their onward wallets, including about 4,000 ETH from senders it has not traced. It separately describes Solana proceeds moving via USDC/CCTP to Ethereum or Avalanche and then through THORChain toward Bitcoin after that service reopened. Its total holdings estimate is about **$3.1bn**, including **556,271 ETH**, at 09:56 UTC; selected newly counted Solana/Bitcoin wallets were checked through 11:28 UTC. These unverified research estimates mix attribution, routing and valuation assumptions; they are neither an additional theft nor returned funds, and do not replace Binance’s ~$6.34bn affected/~$2.85bn frozen-or-blocked vendor figures or replacement-funding claims.

The researcher no longer says none of the traced money reached exchange deposit addresses: earlier analysis described TRX flows to HitBTC and a cash desk. The revision replaces the cash-desk label with a shared hub wallet and excludes its payouts from the attacker’s flows. The earlier pass found no mixer transfer in the paths it followed. Its November 7 revision supersedes that finding for Solana. This does not prove those onward services were compromised or identify all proceeds. The newly counted wallets revise coverage, not the original theft size; do not extrapolate one snapshot into a complete current balance or combine unrelated bank/BitMart events.

**November 4 reserve expansion:** Recovery Update #7 confirms a new 00:00 UTC snapshot for 44 tokens, replacing the earlier plan for a broader snapshot. Its full zero-knowledge proof is still being generated, now estimated at 50–60 hours rather than the earlier 40–50-hour forecast. The completed October 31 ten-token proof remains a separate historical record. Binance repeats 98% company-funded replenishment, with remaining illiquid tokens bought through market and OTC channels. This is neither a new recovery of stolen funds nor confirmation of full withdrawal restoration.

**November 4 Polygon governance proposal:** The original forum proposal says five transaction-blocked addresses hold about 70.49M native POL associated with two separate incidents: four Polymarket addresses have a reference total of 23,862,736.07 POL and one Binance address 46,626,593.27 POL. It requests a one-time coordinated fork moving the specified balances to verified recovery addresses without changing supply; other tokens and Class B addresses are outside the transfer. Governance approval, balance reconciliation, proof of recovery-address control and an Amoy rehearsal are conditions. The client release, fork name and mainnet activation block are undecided. November 5 at 14:30 UTC is the planned discussion, not an activation promise. Address ownership and blocking are the author’s account, not an independent chain investigation here. This does not establish an approved fork, returned assets or additional customer reimbursement. Do not add the two incident shares to this event’s loss, or double-count them with frozen funds, replacement funding or compensation.

**November 5 withdrawal expansion:** [Recovery Update 8](https://www.binance.com/en/support/announcement/detail/a225a3b6084c41dc8c8dfb33f4de5872), read through its full public CMS response, announces additional asset/network pairs from **04:00 UTC**. The table covers ETH, BSC, Base, TRX, MATIC and SUI; examples are UNI/AAVE/PAXG on ETH, ASTER/PROM/UNI on BSC, AERO/VIRTUAL/MORPHO/AVNT on Base, JST/SUN/BTTC on TRX, GNS on MATIC and MMT on SUI. Consult the complete table for all entries. Each pair opens progressively after checks, not simultaneously; verify live availability and expect possible delays. This advances the restoration plan without establishing full reopening, a completed new reserve proof or additional recovered stolen funds.

**November 5 research follow-up:** Bitquery reports that a trading bot partially liquidated the attributed Aave position on November 4, repaying **9,884 WETH** and taking **24.4M USDT** from the pool. This is a lending liquidation, not a transfer of that sum back to Binance or a new issuer freeze: the USDT came from the pool, while the attacker retained previously borrowed ETH. At its **November 5 07:37 UTC** holdings snapshot, the researcher estimates about **$3.2bn** still in attributed wallets (previously $3.1bn at the November 4 snapshot), plus a remaining Aave deposit of **35.6M USDT** against **9,885 WETH** debt. The changed dollar valuation is not a newly established theft amount; the report excludes the deposited USDT from its wallet-holdings total. It also follows further Solana proceeds through CCTP and THORChain into Bitcoin. Amounts, linkage and completeness remain **unverified** research findings. Preserve the vendor’s separate loss, blocked-assets, replenishment and staged-withdrawal statements; none of these figures establishes recovery of stolen funds or compromise of Aave, a bridge or every user of those services.

**November 5 Arbitrum recovery proposal:** Binance requests **8,425.997 ETH and 74,559,805.2 ARB** held at the frozen address. Its AIP anticipates forum discussion, a Snapshot temperature check, an on-chain vote and final execution over about 49 days, potentially longer if legal restraints apply. Submission/execution are conditional on the stated legal process and indemnification agreements. No new DAO treasury allocation is requested. Returned assets would address incident losses and costs, potentially replenishing SAFU/treasury reserves already used to cover users; they are not necessarily an additional user payment. This is separate from the Polygon native-POL proposal and does not prove approval, released funds or completed compensation.

**November 6 withdrawal expansion:** Recovery Update 9 schedules additional pairs from **04:00 UTC** on **BSC, Base, ETH, Optimism, MATIC, Arbitrum, AVAXC, TRX and SUI**. Read its complete asset/network table: examples include USDE/PENDLE on BSC, ZRO/BREV on Base, U/XRP on ETH, ETH/WLD on Optimism and FDUSD on SUI. Each pair opens progressively after security/readiness checks; deposits remain open. Confirm the exact pair on the withdrawal page or official network-status page and allow for temporary delays. This is further service restoration, not an assertion that every withdrawal is available, stolen funds have been recovered or the new reserve proof has finished.

**SEAL’s November 5 assessment:** SEAL estimates roughly eight weeks of access before October 29 and distinguishes TraderTraitor from Contagious Interview despite the shared job-interview lure. Binance has not supplied a precise September entry date or confirmed the report’s four campaign domains as its own intrusion URLs. SEAL’s AFX example can exploit Git CVE-2025-48384; that is not evidence Binance was compromised through that CVE. The analysis also contrasts other incidents involving cloud sessions or backend transaction manipulation, so it does not prove that every case involved stolen signing keys. The estimate and campaign indicators supplement the exchange’s findings; they do not revise stolen, frozen, replenished or repaid totals.

**November 5 Global Ledger snapshot, verified November 6:** The researcher estimates **$5.99B** remained at linked addresses at November 4 prices: **$2.82B frozen** and **$3.16B freely held** in BTC, ETH and XRP. These rounded, unverified research figures differ in timing and scope from Binance’s approximately $3B freeze statement; do not add or subtract them to calculate final losses. Its **$1.28B selected outflow sample** covers $996.2M swaps and $176.6M bridges, not all stolen assets; swaps can return proceeds to attacker wallets, so flows are not additional thefts. It counts 132 stablecoin freeze transactions by 12 issuers, not 132 victims or repayments. The snapshot establishes neither returned funds nor completed recovery.

**SEAL November 6 revision:** Session expiration and device binding at issuance remain useful but cannot by themselves protect a persistently compromised endpoint. The expanded guidance prioritizes least standing privilege, distinct service identities, adversarial alert verification and reducing direct human production access. Pipeline-mediated changes concentrate risk in repositories and CI, so those paths need explicit protection. This adds response guidance without changing losses, freezes or recovery claims.

**November 7 tracing update.** Elliptic estimates that roughly **2,300 BTC ($175 million)** converted from other stolen assets sat in new Bitcoin addresses at about **08:00 UTC**, up from about **1,650 BTC ($124 million)** at **08:45 UTC on November 6**. It traces about **44 million additional XRP** leaving the linked XRP addresses overnight, mostly into BTC through THORChain, and estimates **88 BTC** had gone through Wasabi-style coinjoins in total. Elliptic says the major original BTC and ETH holdings had yet to move and estimates that little had been cashed out. These tracing estimates remain independently unverified. Conversions and mixing describe where portions of the existing proceeds moved. They do not establish additional theft, asset recovery or the identity of the controller of each onward wallet. The exchange’s freeze, replenishment and withdrawal statements remain separate.

**November 7 Bitquery correction.** Bitquery revised its estimate of frozen or rescued assets from about **$2.7bn to $2.8bn**, including roughly **$75M** in wBETH it says Binance blacklisted on the night of the theft. It reports that linked wallets sent about **$7.7M** in SOL to Privacy Cash on November 3–4, a route missed in its earlier reports. It also attributes **19,762 ETH** to borrowing against stolen USDT on Aave rather than purchases. These are unverified estimates and tracing judgments. A freeze, a transfer into a mixer or a lending position is not evidence of a refund, and the $2.8bn estimate must not be added to Binance’s separate ~$2.85bn frozen-or-blocked figure.

In a companion analysis, Bitquery estimates that by **November 6 at 10:00 UTC**, about **$333M** had crossed chains, reached mixers or entered exchanges, valued at theft-time prices. That category includes transfers and does not establish conversion to fiat, recovery or additional theft. Do not add it to other tracing estimates.

**November 8 withdrawal update.** At 08:52 UTC, Binance announced that HYPE and APT withdrawals had reopened. It separately listed ETH and SOL asset pairs that were already available. Binance plans to reopen more pairs after security checks. Check the exact asset and network in the live withdrawal interface. This update provides no new accounting of stolen, frozen or returned funds.

**November 9–10 follow-up.** The Arbitrum Foundation says Binance confirmed control of the proposed recovery address 0xd9fd39103674cb061d64d9c3b73b878dbe610b80 and authorized the proposal. This confirmation concerns the destination and authorship. Approval and execution still require the governance process. At 11:00 UTC on November 10 Elliptic estimated about 3,350 BTC (roughly $250 million) converted from other stolen assets and about $3.0 billion still held at linked addresses, mostly ETH and BTC. It estimated around 150 BTC routed through Wasabi-style coinjoins and 11,000 ETH into Tornado Cash. These are Elliptic’s tracing estimates and have not been independently verified here. Its flows and balance estimates measure different things from the exchange’s replenishment, frozen assets and user repayments.

**November 12 law enforcement update.** DOJ says US government and private-sector efforts froze over **$2.7 billion** in stolen assets. It has court authorization to seize or restrain over **$1.2 billion** within that total. Tracing, freezing, seizure and forfeiture efforts continue. The announcement gives no confirmation of returned funds or additional customer payments. Binance’s earlier blocked-asset and replacement-funding figures retain their separate scopes. The same announcement covers the [separate FaceStealer campaign](/incidents/facestealer-video-lures/).

**November 12 UTC reserve update.** Binance says it completed coverage of the impacted assets and committed more than **$6.34 billion** from part of SAFU, surplus Futures insurance funds and company treasury. It sourced tokens through market and OTC purchases and pledged to restore SAFU to about **$1 billion**. The earlier 95% and 98% notices describe previous stages. The November 12 **00:00 UTC** reserve snapshot covers **198 tokens**, with a full zero-knowledge proof expected to take approximately **40–50 hours**. Check the matching snapshot in the official reserve portal once its proof is available. Withdrawals still reopen in phases, so confirm your exact asset and network before relying on a transfer. Binance says affected tokens it no longer supports will be handled through its delisting process. The coverage figure is Binance’s account of replacement funding. Law-enforcement seizure and restraint figures track the stolen assets separately.
