---
title: Binance revokes SignalPlus API keys after a reported potential security issue
level: 3
date: '2026-11-05'
tags: [SignalPlus, Binance, API credentials]
summary: Binance removed all API keys linked to SignalPlus as a precaution after the trading platform reported a potential security issue. Binance says its own systems are unaffected and user funds remain safe. Review positions and orders directly; wait for SignalPlus resolution before reconnecting. No confirmed loss or root cause is disclosed.
splash: Exchange accounts whose API keys were shared with SignalPlus; Binance confirms revocation, other exchanges need individual checks
wipe: Review orders and positions directly at your exchange, revoke other SignalPlus-linked keys, and wait for resolution before reconnecting with an IP allowlist.
inTheWild: unknown
inTheWildNote: Binance confirms precautionary revocation, not demonstrated exploitation or theft.
timeline:
- date: Nov 5, 2026
  title: Binance removes every SignalPlus-linked API key
  body: Its original notice identifies a reported potential issue, says Binance systems are unaffected and funds remain safe, and asks users to inspect positions and orders directly before any reconnection.
- date: Nov 5, 2026
  title: CZ advises revoking SignalPlus keys on other exchanges
  body: The original follow-up extends the precaution to other exchange integrations. It does not prove those exchanges already revoked keys or suffered a breach.
checklist:
- title: Review positions and open orders through the exchange itself
  hint: Open your established exchange app or bookmarked website directly, rather than a link in a security message. Binance asks SignalPlus users to inspect positions and open orders there. Do not assume removing an API key cancels existing orders or closes positions; use the exchange's normal account controls and support for discrepancies.
- title: Revoke remaining keys shared with SignalPlus
  hint: In each other exchange account's API-management area, identify keys supplied to SignalPlus and revoke them, following CZ's precautionary advice. Binance says it already removed its linked keys; verify your own account rather than assuming the same action occurred everywhere. Preserve available API-access and order history and report unexplained activity through established exchange support.
- title: Wait for resolution before creating a replacement connection
  hint: Binance recommends waiting for SignalPlus to confirm full resolution before rebinding API keys and enabling IP whitelisting. Reconnect only through established platform settings with the required access restrictions; do not submit replacement credentials to messages claiming to restore service. No restoration time or published software fix is established.
sources:
- name: Binance original SignalPlus precautionary notice
  url: https://x.com/binance/status/2118295116716589383
  primary: true
  says: Full public original read in the browser. Confirms all SignalPlus-linked Binance API keys removed, own systems unaffected and funds safe; advises direct position/order review, waiting for resolution and IP whitelisting. Publication display lacks a timezone, so the timeline uses a date only.
- name: CZ original cross-exchange precaution
  url: https://x.com/cz_binance/status/2118298620797812955
  primary: true
  says: Original advises revoking SignalPlus-linked keys used on other exchanges and mentions an earlier Deribit report. That mention alone does not independently establish Deribit's exact actions or incident scope.
---

Binance's November 5 notice confirms a security-driven revocation of a third-party integration's credentials. It describes SignalPlus's report as a **potential** security issue. It does not confirm stolen keys, unauthorized trades, data theft, a victim count or monetary loss. Binance's statement that its own systems are unaffected is a vendor claim about this notice, not a reversal of the separate October 29 wallet incident.

The exposure boundary is an API connection shared with SignalPlus, not every Binance account. Revoked credentials stop authenticating new API requests; users must still inspect the state of their accounts directly. The rating reflects the concrete, platform-wide integration revocation and immediate action for exchange-credential users, while exploitation remains unconfirmed.

CZ also mentions Deribit, but its exact original customer notification was not independently verified here. SignalPlus's full technical account, affected credential permissions, confirmed exploitation and reopening conditions remain unresolved. No cause or actor link to the [October 29 Binance incident](/incidents/binance-wallet-investigation/) is established.
