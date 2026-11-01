---
title: Binance reports $6.3bn stolen; Bitcoin leads phased withdrawal rollout
level: 4
date: 2026-10-29
tags:
  - Binance
  - crypto
  - investigation
ecosystems:
  - crypto
summary: Binance reports ~$6.3bn stolen; the FBI attributes the theft to TraderTraitor. Bitcoin is the first withdrawal batch, with new wallets added to the reserve-address list. Yi He reports broadly smooth processing with possible congestion. Reported 95% replacement funding and ~$3bn frozen remain separate figures; full recovery is not established.
splash: Binance.com withdrawal users; Aave reports a precautionary freeze of DAO-operated V3/V4 markets
wipe: Follow official updates, inspect account activity, and use Binance's account-lock procedure if you find unauthorized actions
inTheWild: yes
inTheWildNote: Yi He acknowledges hacking losses and says Binance will cover them.
cves: []
fixed: []
timeline:
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
  - date: Nov 1, 06:00–09:00 UTC (scheduled)
    title: First withdrawal phase is planned
checklist:
  - title: Use official channels and reject recovery messages
    hint: Open Binance through your existing bookmark or official app and check its announcements for deposit and withdrawal restoration. The November 1 notice schedules the first withdrawal phase for 06:00–09:00 UTC; check your exact asset/network pair on the withdrawal or network-status page. The subsequent official update names Bitcoin as the first batch; this does not establish availability of every listed pair. Binance says future withdrawals use new wallets in its updated reserve-address list. Verify destination addresses and device security; congestion remains possible. The notice advises retrying later if needed. Verify unsolicited communications with Binance Verify or official support. Do not share passwords or 2FA codes, follow recovery links, or send money to purported support agents.
  - title: Inspect your own account and respond to unauthorized activity
    hint: Review Security and Account Activity for unfamiliar logins, transactions or security-setting changes. If found, Binance instructs users to disable the account and contact official support. In the app, its guide uses Account Info → Security → Manage Account → Disable Account. Read the consequences before confirming; reopening may require support. This account control does not fix a possible exchange-wallet compromise.
  - title: Check Aave status before planning deposits or borrowing
    hint: Aave reports all DAO-operated V3/V4 markets frozen as a precaution and says its contracts remain unaffected. Check official market status and support before acting; do not infer a smart-contract exploit or use unsolicited refund/unfreeze links. The read official embed truncates the later operation-specific details.
  - title: Screen the FBI laundering-address list
    hint: Virtual asset providers and node operators should use the FBI notice's complete ETH, BTC and SOL list, containing more than 600 addresses, to block transactions with or derived from them. Report relevant information to an FBI field office or IC3. A transaction match alone does not prove an account or platform was compromised.
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
updated: 2026-11-01
---

Binance’s initial notice said it had not confirmed an impact on user funds. The exchange then edited that notice to state that user funds are safe, and subsequently said withdrawals would resume after the security issue is fully resolved. These are the vendor’s statements, not an independently audited reserve or loss assessment. No resumption time or technical containment report was supplied in those notices. The withdrawal notice does not specify affected networks or withdrawal routes; do not infer that every Binance product is affected. Those earlier notices supported L3 because they acknowledged disruption without confirming the suspected theft.

CZ separately suspects a hack and says he expects users to be covered, while explicitly stating that he no longer manages Binance.com. His earlier expectation was not a formal reimbursement guarantee from current management. Reported stablecoin freezes must not be counted as refunds or added to outflow estimates to calculate a loss. Circulating monetary estimates are unverified here; no independently reconciled stolen-fund total or victim count is established.

The root cause, affected wallet scope, initial access and containment status remain unresolved. We have not independently traced the transactions or authenticated wallet ownership. The cited sources do not establish a link to the separate Polymarket/DebugBear incident, or a Binance root cause of frontend injection or private-key theft. Ordinary account-security measures are useful against account abuse, but cannot establish that exchange custody systems are safe.

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
