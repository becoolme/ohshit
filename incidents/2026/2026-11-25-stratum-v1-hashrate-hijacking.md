---
title: Braiins confirms route hijacking diverted Bitcoin miners' work over plain Stratum V1
level: 4
date: '2026-11-25'
tags: [crypto, mining, network hijacking]
summary: Braiins reports attackers diverting miners' work through forged internet routes and unauthenticated Stratum V1 connections. Its November 20 episodes affected 1,050–1,600 sites each. Protect every primary and backup connection with verified Stratum V2 or TLS; a firmware upgrade alone is insufficient.
splash: Plain Stratum V1 or unverified TLS links, including backups; attackers must control the miner-to-pool network path.
wipe: Authenticate every pool connection with Stratum V2 or validated TLS; use a protected local proxy for unsupported miners.
inTheWild: 'yes'
inTheWildNote: Braiins documents intercepted sessions and forged routes, without a pool-system breach.
cves: []
fixed:
- product: Pool connection protocol
  version: Configuration-dependent
  status: Use Stratum V2 with pool-key verification or Stratum V1 over certificate-validated TLS; remove plaintext internet backups.
- product: Braiins OS TLS support
  version: '26.11'
  status: Adds certificate and hostname validation on supported hardware; change every pool URL after upgrading. Older releases can use Stratum V2.
- product: Braiins SV2 Proxy
  version: '0.1.1'
  status: Initial release for legacy miners; LAN-side Stratum V1 with authenticated upstream connections. Start with a small pilot.
timeline:
- date: Nov 7–12, 2026
  title: Braiins records the first regional episodes
  body: Its later report lists 19 Latin American episodes, mostly Brazil and Argentina, with 120–400 sites per episode. This wave has less detailed causal confirmation than the later capture and routing evidence.
- date: Nov 16, 2026
  title: A Brazilian miner captures an intercepted session
  body: Three miners receive jobs relayed from a different public pool and submit work through the attacker's account. That destination pool is not identified as a participant in the attack.
- date: Nov 20, 2026
  title: Four mostly European episodes coincide with forged routes
  body: Braiins reports 1,050–1,600 sites and 0.6–1.9 EH/s per episode, lasting 6–49 minutes. The network provider blocks the propagating network that evening; this does not establish an end to the wider campaign.
- date: Nov 22, 2026
  title: Similar route announcements remain visible for other address blocks
  body: Braiins says some blocks hosting other pools still received forged announcements. Those blocks also host unrelated services, so not every announcement proves a mining attack.
- date: Nov 25, 2026
  title: Braiins publishes the incident report and protection guidance
  body: The disclosure says the threat remains live. Braiins OS 26.11 adds validated TLS, and the initial SV2 Proxy release provides an option for unsupported miners.
checklist:
- title: Protect every primary and backup internet connection
  hint: >-
    Inventory all pool entries on each miner. Use Stratum V2 with the pool's official authority key, or TLS with certificate-chain and hostname validation. Remove every direct plaintext stratum+tcp:// internet entry, including backups; an attacker can force failover. Braiins publishes its current endpoints and keys in the Connection Security guide. Encryption does not prevent a routing attacker from disconnecting you.
- title: Apply the firmware change and the connection change together
  hint: >-
    On supported Braiins OS hardware, upgrade to 26.11 and then replace every pool URL with a protected endpoint. For Braiins Pool, TLS endpoints are stratum+ssl://stratum.braiins.com:3443 and :33443; some firmware uses stratum+tls://. Version 26.10 and older should use Stratum V2 for every entry. Do not infer that upgrading alone changes existing pool settings or fixes other vendors' firmware.
- title: Test certificate rejection on one miner before relying on TLS
  hint: >-
    Follow the official guide with saved settings, correct NTP time and exactly one pool entry during each test. First verify the TLS endpoint from a computer on the same LAN using the guide's OpenSSL/subscription check, then confirm accepted shares through the genuine TLS hostname. Verify that each URL change takes effect; restart Whatsminer after every change so an old connection cannot mask the result. Then test hostname mismatch and self-signed, wrong-host and expired certificates. The guide uses badssl.com, self-signed.badssl.com, wrong.host.badssl.com and expired.badssl.com on port 443 as benign test servers, not attack indicators. A protocol failure after successful TLS is not certificate rejection. If logs are inconclusive or invalid certificates are accepted, use Stratum V2 or the proxy. Restore protected pool and backup entries afterward.
- title: Put unsupported miners behind a trusted local proxy
  hint: >-
    Obtain Braiins SV2 Proxy 0.1.1 from the official download page and verify its published SHA-256; pilot a few miners on Linux with systemd or Windows WSL2. Keep miner-to-proxy plaintext inside the trusted LAN. Verify upstream pool keys or TLS certificates and enable the proxy's option allowing only encrypted and authenticated pool connections for custom configurations. Use a second protected proxy as backup, never direct plaintext internet failover. Protect its administrative interface and use an SSH tunnel for remote access.
- title: Compare local work with credited shares and preserve evidence
  hint: >-
    Correlate miner logs, pool dashboards, timestamps and packet captures for connection resets, unchanged DNS/IP, normal local hashing with missing credited work, and abnormally high share difficulty. Braiins Pool's stated maximum is 16,777,216; this is not a threshold for every pool. On Whatsminer, search for 'JSON-RPC unexpected mining.configure value: subscribe-extranonce'. That line can occur with legitimate pools; a match alone does not prove compromise. The report publishes no campaign-specific malicious IP, domain, hash or wallet address.
- title: Check routing evidence with the network provider
  hint: >-
    Pool operators should inspect RIPE RIS or RouteViews since November 1 for more-specific prefixes and unexpected adjacent networks in the AS path, not just changed origins. Coordinate a /24 announcement and matching prefix-length-limited RPKI ROA with the hosting or DDoS provider; enable RPKI origin validation on networks you control. These reduce routing risk without guaranteeing availability or replacing authenticated mining connections.
sources:
- name: Braiins original Stratum V1 hijacking investigation
  url: https://braiins.com/blog/bitcoin-hashrate-hijacking-unencrypted-stratum-v1
  primary: true
  says: November 25 disclosure, captured interception, episode ranges and routing evidence; no pool or ASIC compromise, no quantified aggregate reward loss, and specific mitigations.
- name: Braiins Academy Connection Security
  url: https://academy.braiins.com/braiins-pool/connection-security
  primary: true
  says: Protected endpoints, pool authority key, certificate tests, backup requirements and limits of authenticated connections against disconnection.
- name: Braiins OS 26.11 release notes
  url: https://academy.braiins.com/braiins-os/whats-new
  primary: true
  says: November 25 release adds Stratum over TLS for supported Antminer S19, S21 and S23 series; no universal fixed firmware for every miner.
- name: Braiins Proxy official releases
  url: https://downloads.braiins.com/braiins-proxy/
  primary: true
  says: Initial 0.1.1 release on November 25, supported platforms, installation and architecture-specific SHA-256 values.
- name: Braiins SV2 Proxy setup guide
  url: https://academy.braiins.com/farm-proxy/sv2-proxy
  primary: true
  says: Local deployment, authenticated upstream defaults, optional validated-TLS fallback, custom connection restrictions, backup proxy and administrative access requirements.
---

Braiins' November 25 investigation describes work being credited to an attacker's pool account after internet routes were diverted. Plain Stratum V1 neither encrypts the connection nor authenticates the pool. A miner can reconnect to its usual hostname and IP, keep hashing normally and still work for an impostor. Braiins says its pool, accounts, balances and payout settings were unaffected. It found at least 12 firmware types among affected miners; the weakness is not confined to one firmware or provider. L4 reflects observed theft of mining work, not a claim of stolen wallet keys or compromised Bitcoin consensus.

The strongest evidence combines a November 16 Brazilian packet capture with the November 20 routing investigation. In the capture, a closer server accepted arbitrary credentials and relayed jobs from another public pool under the attacker's account. The destination pool was a service the attacker used, not a proven accomplice. For November 20, Braiins describes an unauthorized 256-address route inside the provider's 4,096-address block. More-specific routing drew traffic away without changing DNS. The provider confirmed the diverted connections never reached it and blocked the propagating network that evening.

The four November 20 episodes involved **1,050–1,600 sites and 0.6–1.9 EH/s each**, according to Braiins. These are episode measurements, not a deduplicated total of victims or a monetary loss estimate. The earlier 19 episodes involved **120–400 sites and 36–174 PH/s each**, lasting **1.5 minutes to three hours**; Braiins says that wave has less detailed confirmation. No aggregate stolen BTC amount, final attacker identity, recovery or compensation total is established. The historical $83,000 cited in the report concerns a separate 2014 attack.

Protecting the transport requires verifying the remote party. Stratum V2 uses the pool's authority key; TLS requires certificate and hostname checks. Braiins reports that two other tested firmware implementations accepted invalid certificates despite offering TLS. Their names are not disclosed, so a TLS switch alone is no assurance. Braiins OS 26.11 requires a separate pool-URL change after installation. Legacy miners can use the new local proxy, whose upstream must remain authenticated; its plaintext LAN leg still depends on the site's local network trust.

Authenticated transport prevents working for an impostor but cannot prevent a routing attacker from resetting connections. Origin-only monitoring also missed the November 20 route because it retained the legitimate origin; the route was invalid under the relevant RPKI authorization. Broader route observations include address blocks with unrelated services and must not be counted as confirmed mining victims.

This is separate from the [Luxor Commander redirect](/incidents/luxor-commander-hashrate-redirect/), which concerned unauthorized changes through a fleet-management service. No common attacker or shared initial access is established.
