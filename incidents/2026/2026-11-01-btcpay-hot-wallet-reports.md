---
title: BTCPay confirms old-flaw wallet thefts and requires fresh-server recovery
level: 4
date: 2026-11-01
updated: '2026-11-03'
tags: [BTCPay, Bitcoin, hot wallets]
ecosystems: [crypto]
summary: BTCPay confirms thefts on 2.4.1 and older via a different method for the flaw fixed in August’s 2.4.2. Older or compromised installs need a clean VM, new wallet seed and replacement credentials, even after updating. Bitquery’s ~$1.63m/682 sweeps remain unverified transaction estimates, not victim counts.
splash: The identified attack path targets BTCPay Server 2.4.1 and older; hot wallets on affected instances are at risk
wipe: For affected older or compromised installs, sweep to a new seed, rebuild on a clean VM and replace exposed credentials
inTheWild: yes
inTheWildNote: BTCPay confirms BTC/LTC thefts targeting 2.4.1 and earlier.
cves: []
fixed: []
timeline:
  - date: Nov 1, 2026
    title: Project warns of hot-wallet sweeps and requests shutdown
    body: The official alert asks instance operators to run ./btcpay-down.sh until the investigation is complete; no patch or restart time is given.
  - date: Nov 2, 2026
    title: Founder reports administrator access on older instances
    body: Nicolas Dorier says reports appear to involve versions before 2.4.2; how attackers logged in as admin remains under investigation.
  - date: Nov 2, 2026
    title: Project identifies a path targeting 2.4.1 and older
    body: The readable official update reports no credible hot-wallet drains on 2.4.7. The public embed truncates later guidance; it does not establish a restart procedure.
  - date: Nov 2, 2026
    title: Project confirms some hosting providers shut down older instances
    body: Operators should check with their provider; the post thanks LunaNode and others without declaring every hosted instance safe.
  - date: Nov 2, 2026
    title: Bitquery publishes a time-bounded BTC and LTC tracing estimate
    body: The research counts about 18.38 BTC and 3405 LTC across 682 sweeps, including 267 after the initial alert. Bitcoin coverage ends at block 974216 (05:42 UTC) and Litecoin at 06:00 UTC; these are transaction counts, not victim counts.
  - date: Nov 2, 2026
    title: Full project report confirms old-flaw exploitation and recovery steps
    body: The project ties the attacks to a different exploitation method for the flaw fixed in August’s 2.4.2. It calls for a fresh server, new seed and credential replacement on affected older installs, even after an update or without visible theft.
checklist:
  - title: Move affected installations to a fresh server and new wallet
    hint: If running 2.4.1 or earlier, or updated from those versions after the November 1 warning, use a trusted device/new seed to sweep remaining hot-wallet funds to a new wallet, then take the old instance offline and preserve evidence. This also applies without a visible theft or with keys held elsewhere; any signs of compromise require the same response regardless of current version. Provision a clean VM, install the latest supported release from trusted sources, connect the new wallet and do not restore the whole old machine. Contact your hosting provider if it was automatically stopped. Never reuse the old seed.
  - title: Preserve evidence and wallet records
    hint: >-
      The documented shutdown removes stack containers. If immediately available, save logs with docker-compose -f "$BTCPAY_DOCKER_COMPOSE" logs --timestamps before shutdown; do not delay containment to troubleshoot log collection. Retain deployment and version details, wallet addresses and suspicious transaction hashes before rebuilding. Never publish seeds, private keys or access tokens in a support ticket.
  - title: Replace every secret the old server could access
    hint: From a trusted device revoke/replace applicable hosting, SSH, application, API and Lightning credentials, plus exposed passwords/access keys. Do not enter replacement credentials on the old machine. An update alone does not evict earlier access or secure a copied wallet seed. Use wallets whose spending keys stay off the server and keep hot balances small; this does not remove the older-server rebuild requirement. Reject unsolicited refund links and requests for wallet secrets.
  - title: Verify version history and report theft through the project
    hint: Log in and check the version at the page bottom, using preserved records if the server is offline. The project observed no impact from these attacks on servers already at 2.4.2 or later when it warned on November 1; install the latest supported release on a clean machine rather than stopping at the old minimum. Send version/update history, incident time with timezone and public transaction IDs/addresses to security@btcpayserver.org; redact secrets and report stolen funds to local authorities.
  - title: Compare retained transactions with the published tracing record
    hint: Bitquery names BTC collector bc1p0f7wmcnesrapznymf9ljdn04pudgmh96sqtrm9vmgqxdh666fh8qvn63r7, LTC collector ltc1qp49tmfdueyaqrmgrx0uyx4uegyygt8yt02whee, associated BTC wallet bc1qqjynymlsxuanp5tavacqjz6588pt0n9nh6aru5, payout addresses bc1qn3fze9w3c0m38y84v76qr2z5dz9cjx0hz4aeva and bc1q8hyw6c47t4cskvn655csdc8ym7wc7tcnj6ws4j, and older onward recipient bc1qxy6r4hznukvwkavz7aq9rnresr53trx6zn644k. Its transaction references are 870ec7afc3792dc02e81718e8fbaaad7ccdfdc77dbd89f45523393427703b82c, 7a81bddd918af1fb49b323f56820491e9e4147355adca9a1a4418c9ec1bb1b1d and 8e25f0a572f562dd12514607eac4687408af09df8ccacd41e9acc66cea54ec11. The second wallet is behaviorally linked with moderate-high confidence, not independently labeled. These are research-assigned roles, not proof of who controls an onward recipient. A match alone does not prove your instance was compromised; preserve the transaction and server evidence for investigation.
sources:
  - name: BTCPay Server original emergency alert
    url: https://x.com/BtcpayServer/status/2117020340815819262
    primary: true
    says: The project reports unauthorized hot-wallet sweep reports and asks operators to shut down while it investigates; the original HTML is blocked, but its complete official public embed is readable.
  - name: Official public embed of the BTCPay Server alert
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FBtcpayServer%2Fstatus%2F2117020340815819262&omit_script=true
    primary: true
  - name: BTCPay Server Docker operations documentation
    url: https://docs.btcpayserver.org/Docker/operations/
    primary: true
    says: Documents the shutdown wrapper and container lifecycle; operational documentation is not an incident-specific fix.
  - name: Official November 2 scope update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FBtcpayServer%2Fstatus%2F2117106238123123008&omit_script=true
    primary: true
    says: Visible text identifies 2.4.1 and older and no credible 2.4.7 hot-wallet drain reports; later instructions are truncated and not adopted.
  - name: Nicolas Dorier administrator-access update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FNicolasDorier%2Fstatus%2F2117051298633900041&omit_script=true
    primary: true
    says: Complete post reports admin logins and apparent pre-2.4.2 exposure; entry method remains unknown.
  - name: Nicolas Dorier follow-up, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FNicolasDorier%2Fstatus%2F2117107091328639417&omit_script=true
    primary: true
    says: Promises a detailed blog post, urges frequent updates and limited hot-wallet balances; does not supply a host-cleanup procedure.
  - name: BTCPay Server official releases
    url: https://github.com/btcpayserver/btcpayserver/releases
    primary: true
    says: Lists current releases; the October 29 release is not by itself proof of recovery from a compromised host.
  - name: BTCPay Server hosting-provider follow-up, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FBtcpayServer%2Fstatus%2F2117106240098611681&omit_script=true
    primary: true
    says: Complete post says some providers may have automatically shut down older instances and thanks LunaNode and others.
  - name: Nicolas Dorier pre-2.4.2 vulnerability-traces update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FNicolasDorier%2Fstatus%2F2117072276122464473&omit_script=true
    primary: true
    says: Complete post reports traces of pre-2.4.2 vulnerabilities and promises a later blog; it does not identify the precise flaw or a cleanup procedure.
  - name: Bitquery original November2 BTCPay on-chain investigation
    url: https://bitquery.io/investigations/btcpay-server-hack
    primary: true
    says: Research estimate of about $1.63m in 18.38 BTC and 3405 LTC across 682 sweeps; explicit time/chain/attribution limits and a nine-item address/transaction record. Not a vendor-confirmed final total or server/victim count.
  - name: BTCPay complete November 2 incident and recovery report
    url: https://blog.btcpayserver.org/btcpay-server-security-incident-2-4-1-and-earlier/
    primary: true
    says: 'Resolves truncated-post gap: August flaw exploited differently; pre-warning2.4.2+ no observed impact; new seed/VM and secret replacement required for older or compromised installs. Collector history is not a confirmed loss total.'
---

The project's November 1 warning is an actionable containment request for operators of a self-hosted payment system. Reports of actual wallet sweeps support L4, while the investigation remains preliminary. The initial alert did not establish how many instances were affected, how much was taken, whether every hot wallet is exposed, or whether the entry point is software, credentials or a deployment component.

Do not infer that cold wallets, every Lightning deployment or the Bitcoin network were compromised. The initial warning named no vulnerability identifier or release. The November 2 observations below narrow the reported version range; they do not establish a complete host-recovery procedure.

**November 2 scope update:** The project now identifies an attack path against 2.4.1 and older. Dorier reports attackers logging in as administrators, with the entry method still unknown. The project has no credible hot-wallet drain reports on 2.4.7; Dorier says its public servers on that version were not attacked and urges regular updates and small hot-wallet balances. These statements narrow the observed scope without proving all newer instances safe or linking the incident to a specific August vulnerability. Vendor-confirmed loss totals, affected-instance counts and complete recovery instructions remain unconfirmed. A separate complete Dorier post reports traces of pre-2.4.2 vulnerabilities, but does not identify which flaw or combination enabled the admin access.

**November 2 tracing update:** Bitquery’s original investigation estimates **about $1.63 million**, approximately **18.38 BTC and 3405 LTC**, from **682 sweep transactions**. It counts **267 sweeps after the public alert**, worth about $150,000 at its chosen prices. These researcher figures have not been independently verified and are not a final project-confirmed loss figure. The count cannot identify servers or people: repeated sweeps may involve the same operator.

Bitcoin coverage ends at block **974216 (November 2, 05:42 UTC)**; Litecoin coverage ends at **06:00 UTC**. The estimate covers the named collection addresses, excludes Lightning and other coins, and leaves out 0.26 BTC received by an associated wallet without reaching the named collector. It values the coins at $78,326/BTC and $55.54/LTC; another valuation date changes the dollar estimate. Bitquery reports more than 99% still in addresses first used in the theft at its cutoff. This is not evidence that funds were frozen, returned or recoverable, and an unlabeled payout address is not proof of an exchange deposit.

The project separately confirms that some hosting providers automatically shut down older instances. Verify your own service state with the provider before any restart; that notice supplies no complete host-cleanup or funds-recovery procedure.


**Full November 2 report, verified November 3:** This supersedes the earlier incomplete recovery guidance and uncertainty over linkage to the August flaw. BTCPay confirms a different method against the vulnerability fixed in 2.4.2. Servers already at 2.4.2 or later when the November 1 warning was issued showed no observed impact from these attacks. Older installs, including those upgraded only afterward, should move to a fresh VM and new-seed wallet even without visible theft; signs of compromise trigger the same response regardless of present version. Keys kept off the server were unaffected by these thefts, but older-server rebuilding still applies. The project publishes the same BTC/LTC collector addresses and explicitly warns that earlier activity and unresolved attribution prevent treating their balances/history as confirmed losses. Bitquery’s separate estimate above remains source- and time-bounded, not a vendor-confirmed total.
