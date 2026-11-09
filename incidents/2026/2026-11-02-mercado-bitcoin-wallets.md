---
title: Mercado Bitcoin details read-only return and account revalidation after wallet theft
level: 4
date: '2026-11-02'
updated: '2026-11-09'
tags:
- Mercado Bitcoin
- exchange
- wallets
ecosystems:
- crypto
summary: Mercado Bitcoin plans phased read-only access and will require in-app account revalidation and a new password before transactions resume. It reports over 33% of diverted assets blocked and replacement with its own funds under way. It previously reported over $16M blocked. Bitquery’s $48.6M estimate across 11 chains remains unverified.
splash: Mercado Bitcoin customers and integrations using its deposit addresses; exchange hot wallets are implicated
wipe: Keep deposits and withdrawals paused. Verify balances on the official site. Use the app for revalidation and await deposit-address confirmation.
inTheWild: 'yes'
inTheWildNote: Exchange confirms an incident; Bitquery reports unauthorized wallet transfers.
cves: []
fixed: []
timeline:
- date: Nov 2, 2026
  title: Exchange acknowledges a security incident and preventive transfer pause
  body: Its official statement says the incident in one system was contained quickly, customers suffered no loss and no data leaked. BitNotícias reproduces the full statement including the temporary deposit/withdrawal suspension.
- date: Nov 2, 2026
  title: Bitquery publishes a ten-chain investigation with a later observation cutoff
  body: Its Ethereum observations run through 15:46 UTC, with other chains checked between 14:16 and 15:47 UTC. The report estimates $48.5M and 35,853 Ethereum deposit addresses swept through at least 15:44 UTC. These are unverified research figures, not an exchange-confirmed loss or customer count.
- date: Nov 3, 2026
  title: Bitquery revises totals, freezes and deposit-address observations
  body: Research now estimates $48.6M, 36,042 Ethereum addresses and $11.4M frozen. The sweep is corrected to November 2 12:27–16:56 UTC, with BNB Chain observations added; these remain unverified loss/address figures, not customer counts.
- date: Nov 3, 2026
  title: Research revises separate flows; exchange attribution remains unconfirmed
  body: Bitquery expands its earlier $298k separate-flow estimate to about $391k, mostly from wallets it links to BitMart. Do not add this to Mercado Bitcoin losses or treat it as confirmation that BitMart was breached.
- date: Nov 3, 2026
  title: Company updates amounts and confirms platform/app pause
  body: The company reports affected assets currently worth ~$36.3M and $12.9M blocked, guaranteeing customer assets and preserved balance records. It subsequently plans gradual restoration after feature-specific security checks, without confirming reopening or a deadline.
- date: Nov 3, 2026
  title: BitMart founder confirms a separate intrusion
  body: The readable opening of Sheldon Xia’s original public post confirms a hack the previous day and calls the amount small, without a figure or wallets. This supersedes the earlier absence of a verified BitMart acknowledgment; it does not establish shared cause or ownership of the researcher-labelled wallets.
- date: Nov 4, 2026
  title: Research raises freeze estimate and tracks new token sales
  body: Bitquery now estimates $11.8M frozen, including the remaining Ethereum EURC frozen at 00:55 UTC. It reports $11.9M of token sales and 8,678 ETH held by its November 4 snapshot. These are unverified research figures, not returned funds or confirmed customer losses.
- date: Nov 4, 2026
  title: Exchange raises blocked-assets figure and pledges its own replacement funds
  body: Full public originals report over $15M blocked, superseding the company’s $12.9M snapshot, and promise replacement using its own funds. This is not completed repatriation, compensation or an independent balance reconciliation.
- date: Nov 5, 2026
  title: Research expands chain coverage and Base deposit sweeps
  body: Bitquery now counts 11 chains and 308 Base deposit addresses (~$16k); its separate BitMart-linked estimate becomes ~$424k. Mercado Bitcoin remains ~$48.6M. Holdings were not refreshed beyond November 4; these are unverified research figures and address counts, not unique customers or confirmed exchange losses.
- date: Nov 5, 2026
  title: Corrected Teiten research separates wallet attribution confidence
  body: Its unverified $49.1M estimate comprises $33.6M high-confidence, $10.7M medium-confidence and $4.8M timing-only attribution. Its ~$12M issuer freezes use a dated on-chain method, separate from the vendor’s later >$16M blocking claim.
- date: Nov 6, 2026
  title: Official FAQ raises blocked assets and explains the staged return
  body: The FAQ reports over $16M blocked, with buybacks still being prepared. Pre-interruption limit orders will be cancelled and reserved funds returned without fees. Initial November 9 website access remains viewing-only; transfers and trading await security validation.
- date: Nov 6, 23:33 UTC
  title: FAQ narrows the initial viewing list
  body: Revision 8 removes statements from both descriptions of the November 9 first stage. It still lists balances, assets and investments; this omission does not establish a separate statement-service reopening date.
- date: Nov 9, 00:30 UTC
  title: FAQ gives read-only access and account revalidation instructions
  body: Revision 9 says the website will offer detailed viewing and the app will show a summary. API access will follow later. Transactions will require revalidation and a new password in the official app. The exchange reports over 33% of diverted assets blocked and own-funds replacement under way.
- date: Nov 9, 2026 (scheduled)
  title: Staged website access is planned to begin
  body: Revision 9 describes a phased rollout of detailed balance and asset views on the website and a summary in the app. Trading, deposits, withdrawals, transfers and the API remain pending.
checklist:
- title: Keep deposits paused and recheck saved addresses
  hint: Do not send funds to a saved Mercado Bitcoin deposit address while transfers are suspended. Check the established exchange app and official channels for explicit recovery and address instructions before restarting automated payouts or exchange integrations. Bitquery reports signed transfers from deposit addresses; changing your login password alone does not secure exchange-controlled keys. The November 3 original confirms that the platform/app remain paused and says reinstalling the app or changing devices is unnecessary. The recovery plan requires feature-specific security checks; confirm each service and limitation in subsequent official announcements, rather than treating the plan as completed reopening. The November 4 company update now targets November 9 for initial website viewing only. Transfers, withdrawals and trading have no confirmed restart date; verify each module before enabling automation. The November 5 research also identifies Base deposit-address sweeps; include Base in the saved-address review and do not assume an address is safe because it was absent from the earlier ten-chain list.
- title: Verify balances and preserve transaction evidence
  hint: Record your visible balance, affected network, deposit address, transaction hash, amount and time. Contact Mercado Bitcoin through its established support channel about missing credits or pending withdrawals. The exchange’s no-customer-loss statement is not independent verification that every balance or transfer is settled; address counts are not customer counts.
- title: Monitor the published wallet set with its attribution limits
  hint: 'Bitquery’s wallet record lists 18 addresses, including source wallets, suspected recipients, later destinations and a separate unconfirmed BitMart-labelled source. Main reported recipients: EVM 0xe485e7a70b1131216cb47ca4555c4bbb2c742478; Bitcoin 19qGpsHvzh1t6pVi526XNNkh6hW6prDZp; Solana 3YX6WHncP1Ra4AotE9YLawFt4nPmxyux288FWXkEW97J; Tron TEX3HuDRHRa3tnYpy96M4UfSx62VhDyA5L; Stellar GDXYRI6IONQA5YTGRLQ6O3FGJ2BWXPJTTQPUXFPSEXSRKBZLFKMZSOLP. Use the full research record for the other thirteen and each role. A match alone does not establish compromise, wallet ownership or attribution. The November 4 revision adds 0x4d5f3758938df94a76bfd19652f118ccd7a72c9d, 0x469189223f286b51198163b4eb5a1e532669523d and 0xf666e184bb8d7b9724c1746e3621e72df4d3ce08 as Ethereum sale/consolidation destinations; they are hunting pivots, not proven actor identities.'
- title: Reject unsolicited recovery requests
  hint: Open the exchange through an existing bookmark or app. Do not follow refund links in replies or direct messages, disclose passwords, MFA codes or wallet recovery phrases, or send a payment to unlock a balance. Confirm any support request through the official channel. Staff do not request codes, passwords, photos or deposits through WhatsApp, email, social media or telephone. Revision 9 says account revalidation will take place in the official app.
- title: Review cancelled orders and pending investment payments
  hint: "Before relying on November 9 access to export statements, recheck the official FAQ: revision 8 no longer lists statements in the initial viewing stage. The November 6 FAQ says all limit orders open before the November 2 interruption will be cancelled, with reserved amounts returned in full without fees. Check your records when services resume and submit any new order deliberately at current market conditions. The company says pending digital fixed-income payments will be credited in BRL in the next phase. It plans to reopen Pix then, initially limiting withdrawals to accounts in the customer’s own name and CPF. These are planned steps. Revision 9 confirms the open limit orders were cancelled. Before transactions resume, initiate revalidation and set a new password in the official app."
- title: Compare corrected tracing limits and attribution confidence
  hint: Use Teiten’s corrected November 5 report alongside the existing Bitquery wallet record. Its trace follows three transfers from attributed attacker/parking wallets, with one manually added fourth-hop wallet; no labelled exchange/mixer within that limit does not exclude later cash-out. Its many wallet references are abbreviated in the prose, not a usable full-address blocklist. Do not expand partial addresses or label shared Mayan/Bridgers contracts as attacker wallets. Keep the existing complete-address research and vendor records; a match alone cannot establish ownership or compromise.
- title: Use official sign-in and prepare for account revalidation
  hint: Type www.mercadobitcoin.com.br and use the code sent to your registered email to sign in. The website shows asset details and the app shows a summary. The first stage excludes the API, trading, deposits, withdrawals, transfers, card, Pix and TED. For the later phase, start revalidation and set a new password in the official app. Keep passwords and codes private.
sources:
- name: Mercado Bitcoin official statement
  url: https://x.com/MercadoBitcoin/status/2117239507263132056
  primary: true
  says: 'Full public original now read without login: incident, rapid-containment/no-customer-loss/no-data-leak claims and complete temporary deposit/withdrawal suspension. The separately cited oEmbed remains truncated.'
- name: Bitquery original multi-chain investigation
  url: https://bitquery.io/investigations/mercado-bitcoin-hack
  primary: true
  says: November 3 original-research revision estimates $48.6M, 36,042 Ethereum deposit addresses and $11.4M frozen; corrects the earlier sweep start and adds BNB Chain observations. Figures and labels remain unverified. A later revision expands separate flows to about $391k; BitMart ownership remains an inference from labels and historical payments. November 4 revision estimates $11.8M frozen, $11.9M in token sales and 8,678 ETH held; expands the wallet record to 18 entries. Cutoffs are 10:02 UTC on Ethereum and 10:02–10:08 UTC elsewhere. November 5 revision adds Base deposit sweeps and an eleventh chain, retains the $48.6M Mercado Bitcoin estimate, and revises separate BitMart-linked flows to ~$424k. Holdings remain a November 4 snapshot.
- name: BitNotícias report with the exchange statement
  url: https://bitnoticias.com.br/noticias/mercado-bitcoin-ataque-hacker/
  says: Reproduces the exchange’s temporary deposit/withdrawal pause and no-customer-loss statement; attributes the earlier preliminary $40M-plus estimate to Hypernative, rather than independently proving that amount.
- name: Mercado Bitcoin official public embed
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FMercadoBitcoin%2Fstatus%2F2117239507263132056&omit_script=true
  primary: true
  says: Public original embed actually read; confirms incident and containment/customer-loss/data-leak claims, but truncates before completing the transfer-pause sentence.
- name: Mercado Bitcoin November 3 official update
  says: 'Full original read in public browser without login: $36.3M affected assets at current prices, $12.9M blocked, platform/app pause, preserved customer balances and no need to reinstall/change devices.'
  url: https://x.com/MercadoBitcoin/status/2117637227551273267
  primary: true
- name: Mercado Bitcoin staged-restoration plan
  says: Full original read without login; each functionality must pass security checks, stages and limits to be announced. This is a plan, not completed recovery.
  url: https://x.com/MercadoBitcoin/status/2117648409838379026
  primary: true
- name: Mercado Bitcoin November 4 staged return and replacement funding
  url: https://x.com/MercadoBitcoin/status/2118096165430550882
  primary: true
  says: 'Full public original read without login: November 9 website-first plan, later module-by-module transfers/withdrawals/trading and replacement from the company’s own funds.'
- name: Mercado Bitcoin November 4 asset-blocking update
  url: https://x.com/MercadoBitcoin/status/2118096171818504630
  primary: true
  says: Full public original reports over $15M blocked, ongoing repatriation efforts and official-channel anti-scam guidance. No completed recovery is established.
- name: Mercado Bitcoin November 4 validation and buyback preparations
  url: https://x.com/MercadoBitcoin/status/2118096168265892094
  primary: true
  says: 'Full public original: environments/flows undergoing independent tests, investigation continues, own-fund wallet replacement and buybacks being prepared; spend/withdraw only as services reopen.'
- name: BitMart founder Sheldon Xia original public embed
  url: https://publish.twitter.com/oembed?url=https://x.com/sheldonbitmart/status/2117650361154691529
  primary: true
  says: Readable opening confirms a hack the previous day and calls the amount small. The embed truncates later prose; no amount, wallet attribution, root cause, customer-loss or full recovery claim is taken from the omitted section.
- name: Mercado Bitcoin official incident FAQ
  url: https://central.ajuda.mercadobitcoin.com.br/wiki/spaces/TF/pages/2968387585
  primary: true
  says: Over $16M blocked; balances versus replacement assets, cancelled orders, investment-payment sequencing, restricted account changes and staged November 9 viewing-only access.
- name: Public FAQ revision metadata
  url: https://central.ajuda.mercadobitcoin.com.br/wiki/rest/api/content/2968387585?expand=version,history
  primary: true
  says: Version 7 was updated November 6 at 12:29:10 UTC; revision 8 at 23:33:33 UTC removes statements from the initial access list. Revision 9 was published November 9 at 00:30:17 UTC. The FAQ was created November 3. The revision time does not date every individual freeze.
- name: Teiten corrected original investigation, November 5
  url: https://teiten.lat/analysis/inside-the-mercado-bitcoin-drain
  primary: true
  says: Corrected attribution, pricing and bounded tracing; unverified research estimates, not vendor-confirmed losses or recovery.
- name: Mercado Bitcoin FAQ revision 9 content
  url: https://central.ajuda.mercadobitcoin.com.br/wiki/rest/api/content/2968387585?expand=body.storage,version&version=9
  primary: true
  says: Details phased access, revalidation, planned Pix and investment credits, and the updated blocking and custody figures.
---

Mercado Bitcoin’s public acknowledgement establishes a platform security incident, rather than just an unexplained transfer or an individual customer account theft. The November 2–3 statements did not disclose how the intruder entered, a compromised software version, the final financial impact or a recovery deadline; the November 4 plan below now sets a website-viewing target. Those initial statements did not describe an account-reset requirement. Revision 9 gives the later revalidation instructions below.

Bitquery reports hot-wallet outflows on ten chains and deposit-address sweeps continuing after the exchange’s rapid-containment statement. Its estimate is **unverified**: some source-wallet ownership comes from labels, behaviour and timing, particularly on Solana, Tron and Stellar. The revised $48.6M uses transfer-time prices and excludes tokens without a price; $1.21M comes from a thinly traded EVA token, and the report gives $47.4M when excluding it. Neither figure is an exchange-confirmed final loss.

The revised 36,042 Ethereum deposit addresses represent addresses, not unique customers. A transfer signed by an address does not distinguish stolen private keys from misuse of a signing service. The research’s master-key and shared-supplier suggestions are hypotheses, not established causes; its earlier separate $298k outflow and BitMart label do not establish that BitMart was breached or that the cases share a supplier.

Bitquery's November 3 revision raises its frozen estimate from $7.3M to $11.4M across Tether, Circle, Paxos, Agora and Ripple; its earlier observation that Circle had frozen nothing is superseded. Frozen funds are not returned funds, and funds left in a wallet are not necessarily recoverable. Issuer components are rounded, not an audited total. The exchange's customer-protection statement and containment claim remain vendor claims, distinct from the researcher's observations. No connection to the [Binance incident](/incidents/binance-wallet-investigation/) is established.

**Statistical correction:** The researcher says its earlier count included look-alike spam addresses, moving the sweep's start from 12:10 to November 2 12:27 UTC; it ended at 16:56 UTC, about four hours after the 12:56 UTC company statement. Another 143 BNB Chain addresses paid the suspected attacker, including 42 also swept on Ethereum; do not add cross-chain address counts as unique customers. A BNB Chain wallet labelled as the exchange reportedly sent funds until 18:08 UTC, but that attribution still relies on the researcher's assessment.

The November 3 revision’s Ethereum cutoff was 08:49 UTC, with other chains read between 08:49 and 10:05 UTC. It also reports cross-chain swaps and new recipients, which do not establish the entry point, a master-key leak or a shared-supplier compromise. The initial November 2 figures remain in the timeline as historical estimates, superseded by this revision.

**November 3 separate-flow update:** Bitquery expands earlier flows unrelated to Mercado Bitcoin wallets from $298k to about $391k. It adds observations of 80 tokens leaving the Base wallet over roughly six minutes from November 2 20:20 UTC, with 45 sold the next morning for about $85k. The $391k is the separate-flow total: do not add its $298k subset again or include it in Mercado Bitcoin’s $48.6M. Ownership relies on labels and small 2024 payments with a wallet in BitMart’s proof of reserves; at that check, no BitMart acknowledgment had been verified; the November 5 follow-up below supersedes that publication-status statement, while specific wallet control remains unconfirmed. A separate roughly 66,283 USDC freeze on Base is also excluded from the Mercado Bitcoin freeze figures. These amounts and attributions remain unverified.

**November 3 company update:** Full public originals now confirm the whole platform/app remain paused until a safe restart, with no need to reinstall the app or change devices. The company reports affected assets currently worth about $36.3M and about $12.9M blocked, guaranteeing customer assets and preserved balance records. A subsequent post plans staged recovery after feature-specific security checks, with advance notices of available services and limits, but no deadline. These are company claims, not independently reconciled balances, returned funds or completed recovery. The $36.3M uses current prices and is not interchangeable with Bitquery’s $48.6M transfer-time estimate; the $12.9M blocked and researcher’s $11.4M frozen are different statements/observation snapshots. The company has not reconciled all differences; do not add, subtract or derive a net loss from them.

**November 4 research revision:** Bitquery raises its freeze estimate to **$11.8M**, including the remaining Ethereum EURC reportedly frozen by Circle at 00:55 UTC. It reports 136 tokens worth about $11.9M sold on November 3–4, yielding 4,804 ETH, and 8,678 ETH held across ten Ethereum wallets at its 10:02 UTC cutoff; other chains were read between 10:02 and 10:08 UTC. These remain unverified research estimates. The $11.9M describes token sales, not an additional theft or recovery. Frozen funds have not necessarily been returned; the company’s separate $12.9M blocked/$36.3M current-value statements are retained, not reconciled or subtracted. No verified reopening or entry-point finding is established by this revision. Its updated record has 18 addresses, including separate, unconfirmed BitMart-labelled flows; do not combine them into Mercado Bitcoin losses.

**November 4 company update:** The exchange now reports **over $15M blocked**, replacing its earlier $12.9M snapshot, and pledges to replace affected assets with its own funds. This is distinct from Bitquery’s $11.8M frozen estimate and $48.6M transfer-time loss estimate; the company’s earlier $36.3M current-value figure remains historical. Do not add the snapshots, subtract them to derive a net loss, or treat blocking as returned assets. No completed customer reimbursement is demonstrated.

Initial website access is planned from **November 9**, limited first to viewing balances, statements, assets and investments. Transfers, withdrawals and trading will follow each module’s final security validation, with no confirmed full-reopening date. This supersedes the earlier absence of a recovery date, not the transfer pause or unknown entry point.

The accompanying company post says each environment and transaction flow is undergoing independent tests while the investigation continues. Its trading desk is **preparing** domestic and international buybacks; the statement does not establish completed purchases or full reserve coverage. The replacement balances are to become usable for trading or withdrawal only as services are released.

**November 5 research and BitMart acknowledgment:** Bitquery expands Mercado Bitcoin coverage from ten to **eleven chains**, adding **308 Base deposit addresses** that reportedly sent about **$16k** in three minutes. Of its sample of 92, 33 were also swept on Ethereum: these overlap and are not unique customer counts. Its Mercado Bitcoin estimate remains **$48.6M**. Use the report’s full wallet record to distinguish address roles; no full Base sweep-recipient address is supplied in its visible record. A signature still does not identify whether a key or signing service was compromised.

The separate BitMart-linked research total is now about **$424k**, replacing the earlier $391k estimate, and must not be added to Mercado Bitcoin’s total. The readable opening of founder Sheldon Xia’s November 3 original confirms that BitMart was hacked the previous day and calls the amount small. This corrects the earlier statement here that no acknowledgment was verified. The public embed truncates later text; no quantified loss, customer-impact assessment or recovery promise is inferred. The original does not authenticate Bitquery’s specific wallet labels or shared-supplier hypothesis. Bitquery explicitly says it re-read missed sweeps on November 5 **without refreshing holdings**: its 8,678 ETH and other holdings remain a November 4 snapshot. The November 9 website-viewing plan, transfer pause and company replacement pledge remain unchanged.

**November 6 official FAQ:** The exchange now reports **over $16M blocked**, superseding its $15M snapshot. Blocking is not repatriation or compensation. Preserved customer balance records establish entitlements; replacement assets and planned buybacks are separate, unfinished work. The FAQ gives the order-cancellation and investment-payment steps above. Initial November 9 access remains website viewing only; transaction modules and account changes are not yet restored. It describes only hot wallets as affected and BRL balances as preserved, without establishing the entry mechanism or a final loss total.

**Corrected November 5 research:** Teiten prices transfers at their transfer-hour values and estimates $49.1M, with $33.6M high-confidence attribution, $10.7M medium-confidence and $4.8M assigned from timing alone. Its 36,104 Ethereum senders include 11 poisoning lookalikes and are not 36,104 confirmed customers. The ~$12M issuer-freeze calculation is separate from the company’s later >$16M blocked claim and from Bitquery’s $48.6M loss/$11.8M freeze snapshots; none should be added or subtracted to manufacture a net loss. The corrected report withdrew its November 3 version, which misclassified shared service contracts and understated sender/freeze totals. It cannot establish whether keys or a signing service were compromised, or confirm a shared supplier. Its three-transfer tracing limit, plus one manually added fourth hop, cannot rule out later cash-out.

**November 6 FAQ scope revision:** Version 8, timestamped **23:33:33 UTC**, removes statements from both first-stage viewing lists. The earlier November 4 announcement is retained above as historical guidance; the revision 8 list was **balances, assets and investments**. Do not promise statement exports or infer a separate reopening date from the omission. Transfers, trading and account changes remain suspended as described above.

**November 9 FAQ revision 9.** The exchange says read-only access will roll out during the day. The website shows balance and asset details, the app shows a portfolio summary, and API access will follow later. Displayed crypto balances and their BRL valuations use a November 2 snapshot from before the incident. The exchange says valuations will update when trading resumes. Trading, deposits, withdrawals, transfers, card use, Pix and TED are unavailable in the first stage. Before customers can move funds again, they will need to confirm account details and set new passwords in the official app. The planned next stage includes Pix and crediting pending digital fixed-income payments in BRL. Initially, Pix withdrawals will be limited to accounts in the customer’s own name and CPF.

The exchange reports blocking over **33%** of diverted assets and says the unrecovered portion amounts to about **3%** of all assets in its custody. It says it has started replacing the affected assets from its own funds. The two percentages have different denominators and do not establish an individual customer’s loss. The prior over-$16M blocking figure and Bitquery estimates use their own measures. Blocking, replacement and the return of transaction access remain separate milestones.
