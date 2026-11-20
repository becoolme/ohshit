---
title: Wagyu acknowledges XMR1 incident after deployer-account token transfers
date: 2026-11-20
level: 4
tags: [Wagyu, XMR1, crypto, key compromise]
summary: Wagyu's linked operator acknowledges an XMR1 hack and promises refunds after tokens left the deployer account and were sold. Bitquery estimates $13.51 million paid by 420 buying accounts; the figures remain provisional. The reported hosting/key-theft cause and completed compensation are not independently verified.
splash: Wagyu XMR1 holders and market makers; the same deployer also controls ZEC1 inventory, but no ZEC1 drain is established
wipe: Verify Wagyu's incident and refund instructions through established channels; retain trade records and do not assume redemptions or refunds are complete.
inTheWild: yes
inTheWildNote: Wagyu's linked operator calls it a hack; original research traces the token sales.
timeline:
  - date: Nov 20, 2026
    title: Operator acknowledges the incident and promises compensation
    body: PerpetualCow initially says the cause is uncertain and market makers were mainly affected, then promises full refunds and a relaunch. A later post attributes the deployer-key exposure to a hosting incident; only its opening text is publicly readable here.
  - date: Nov 20, 13:30 UTC
    title: Bitquery updates its original investigation
    body: Sales counted through 13:00 UTC total 369,623 XMR1 and $13.51 million across 420 buying accounts, revising the earlier 388-account tally. These are research estimates, not a finalized loss or compensation ledger.
checklist:
  - title: Confirm the affected token and recovery channel before acting
    hint: XMR1 is Wagyu's wrapped Monero token, not native XMR or Hyperliquid's XMR derivatives market. Reach the operator through the X account linked by docs.wagyu.xyz and use the support link in those docs. Verify any incident-specific relaunch or redemption guidance before sending tokens; the documentation's November 12 availability snapshot is not a post-incident restoration announcement.
  - title: Preserve your own fills, balances and notices
    hint: Retain Hyperliquid account addresses, trade/fill records, order IDs, timestamps and transaction hashes for any claim. The operator's refund promise does not establish a completed payment or a verified claim process. As a precaution, do not disclose private keys or seed phrases to a purported refund agent, or sign an unexplained recovery transaction from an unsolicited message.
  - title: Compare address roles using the complete research record
    hint: Bitquery's record has 11 unique addresses plus three transaction hashes, with mixed roles. The deployer is 0x207700bd207df757825f9193ef9c648c1c65e06a; the selling address is 0x1464dacaceb0d511f9964cdac5eba50ea42220bf across Hyperliquid, Arbitrum and Ethereum, and its onward Ethereum recipient is 0xf32d7842611a5d63b875075dadd19c55f3f1dc59. Other listed roles are the earlier top-up recipient 0x048b75dc11fd31bc38808478fee0c08d4cc05eb3, busy deposit address 0x0d52f93bd76d5b35f26da8b4d6cb63dfd57acee9, largest buyer 0x4c6d679eac539bf7c5a0b7ebd8949ae93b1e5ee9, CoW settlement 0x9008d19f58aabd9ed0d60971565aa8510560ab41, Socket contract 0x50c4e75a512f2a14a7b304787adf79c4531a5909, Mayan contracts 0xc1062b7c5dc8e4b1df9f200fe360cdc0ed6e7741 and 0xd78d199f8c402e7b5cc2abe278df0412400a3bae, and Stargate pool 0x77b2043768d28e9c9ab44e1abfc95944bce57931. Use the original's full record and dated observations; these are not 11 malicious addresses. A match alone does not prove compromise, and a missing match does not prove safety.
  - title: Verify compensation and related-token scope separately
    hint: Follow the operator's updates for actual claim instructions, paid amounts and restart confirmation. Bitquery reports that the deployer also held 99.97% of ZEC1 at its November 20 13:16 UTC snapshot; that is a shared-key exposure concern, not proof of a ZEC1 theft. Its check of the ten largest buying accounts found no incoming transfers from other Hyperliquid accounts since 06:00 UTC as of 13:16 UTC; this limited check cannot establish that nobody was compensated elsewhere or later.
sources:
  - name: Wagyu operator initial response
    url: https://x.com/PerpetualCow/status/2123711967055458711
    primary: true
    says: Full statement read through public X oEmbed; initially uncertain about cause, says market makers were mainly hit and swappers suffered no loss.
  - name: Wagyu operator compensation commitment
    url: https://x.com/PerpetualCow/status/2123740930838589734
    primary: true
    says: Full statement read through public X oEmbed; promises full market-maker refunds and relaunch, not completed reimbursement.
  - name: Wagyu operator later incident explanation
    url: https://x.com/PerpetualCow/status/2123760480061718801
    primary: true
    says: Public oEmbed exposes only the opening hosting-incident/deployer-key claim; later text is truncated and not treated as independently verified root cause.
  - name: Bitquery original XMR1 investigation
    url: https://bitquery.io/investigations/xmr1-hyperliquid-hack
    primary: true
    says: Full original read over ordinary public HTTPS; November 20 13:30 UTC revision gives sales, buyer-account counts, money trail, related-token inventory and explicit attribution/compensation limits.
  - name: Wagyu native-bridge documentation
    url: https://docs.wagyu.xyz/native-bridge
    primary: true
    says: Describes XMR1/ZEC1 bridging, links the operator and support, and labels availability data as a November 12 snapshot rather than current recovery status.
---

On November 20, Wagyu's XMR1 deployer account sent 5.2 million tokens to a newly established selling account, according to Bitquery's original transaction investigation. The recipient sold into Hyperliquid's order book as XMR1 fell from around $500 to about $1. These were transfers of existing tokens; the observed sales do not establish unlimited minting or a compromise of Hyperliquid's core exchange or native Monero.

PerpetualCow, the operator account linked by Wagyu's documentation, initially said the cause was unclear and market makers were mainly affected, while swap users suffered no loss. A subsequent full statement calls the event a hack, promises to refund affected market makers fully and says Wagyu will relaunch. These are operator claims and commitments, not independent confirmation that all other users are unaffected, that token backing is intact or that compensation has finished. L4 reflects the acknowledged incident and original tracing of the sell-off, without treating the market's total valuation decline as stolen funds.

Bitquery's 13:30 UTC update revises its earlier 388-buyer tally to **420 buying accounts**, counting sales through 13:00 UTC. It estimates **369,623 XMR1 sold for $13.51 million**. Exact figures remain provisional and unverified beyond this original investigation; accounts are not a verified count of unique people. The 5.2 million tokens transferred, sale proceeds, remaining inventory, holders' mark-to-market losses and promised compensation are different quantities and must not be added together.

The research follows USDC withdrawals to Arbitrum, conversion to ETH and bridging onward to Ethereum. It reports roughly 7,348 ETH across three chain/address positions, bounded by Ethereum data through 12:38 UTC and Arbitrum through 13:03 UTC. Those balances are not frozen or recovered assets. Its inference that seven smaller recipient accounts may have been Monero swap deposits is not proof of a native-XMR payout, because that side of the route is not visible in the analysis.

The opening of a later operator post attributes the incident to a hosting-provider breach and says the deployer key had been on an old server. Direct X pages were inaccessible; public oEmbed exposes this opening but truncates the rest. The full retained-file mechanism is not established here. The hosting incident's scope and its causal link to the key remain claims to verify against readable original provider/CERT notices; blockchain transfers alone cannot prove where a private key came from or who used it. Nor do earlier unrelated attackers' use of XMR1 establish a connection to this incident.

For investigators, the original record also links three transaction hashes: `0x33513047a342ea41bbcc6503aa8c889a8b5d05a4ef332354fba682fdc60b53ee` (initial Tornado funding), `0x1b6f68247603d6c3d1754680d9f73aee87d1791a8e51ec92bea1dfa58a47733e` (decoded bridge transaction), and `0x74a704c0b00bd9cb6c671e339f361718c7d885d5776d13074ecb0ed17edf4752` (onward ETH transfer). They are transaction identifiers, not additional wallets. Preserve chain and role labels when comparing them with your own records.
