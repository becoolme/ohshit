---
title: SignalPlus confirms engineer compromise, API shutdown and losses below $82,000
level: 4
date: '2026-11-05'
updated: '2026-11-06'
tags: [SignalPlus, Binance, API credentials]
summary: SignalPlus confirms an engineer compromise via a fake Teams invitation from a hijacked vendor Telegram account. It estimates losses below $82,000 affecting a few accounts without IP allowlisting, says all linked exchange API keys were disabled, and has begun full reimbursements. Services remain suspended pending review and patches.
splash: Exchange accounts whose API keys were shared with SignalPlus; Binance confirms revocation, other exchanges need individual checks
wipe: Review orders and positions directly at your exchange, revoke other SignalPlus-linked keys, and wait for resolution before reconnecting with an IP allowlist.
inTheWild: yes
inTheWildNote: SignalPlus confirms intrusion and losses; investigation and reimbursements continue.
timeline:
- date: Nov 4, 2026
  title: SignalPlus detects internal-network attack
  body: Its later statement says an attacker used a compromised engineer’s access in the early hours, after a fake Teams invitation sent through a hijacked vendor contact’s Telegram account. No timezone is specified.
- date: Nov 5, 2026
  title: Binance removes every SignalPlus-linked API key
  body: Its original notice identifies a reported potential issue, says Binance systems are unaffected and funds remain safe, and asks users to inspect positions and orders directly before any reconnection.
- date: Nov 5, 2026
  title: CZ advises revoking SignalPlus keys on other exchanges
  body: The original follow-up extends the precaution to other exchange integrations. It does not prove those exchanges already revoked keys or suffered a breach.
- date: Nov 5, 2026
  title: SignalPlus confirms losses, containment and reimbursement progress
  body: The vendor estimates losses below $82,000, says affected accounts lacked IP allowlisting, all partner-exchange keys were disabled and services paused. Full reimbursements have begun case by case; complete repayment and service recovery are not yet established.
- date: Nov 5, 2026
  title: Coincall publishes its own SignalPlus precautions
  body: Coincall asks current and former integration users to revoke linked keys, inspect trading activity and enable 2FA/IP allowlisting. It reports no information indicating its infrastructure was compromised; this is not a loss or automatic key-removal confirmation.
checklist:
- title: Review positions and open orders through the exchange itself
  hint: Open your established exchange app or bookmarked website directly, rather than a link in a security message. Binance asks SignalPlus users to inspect positions and open orders there. Do not assume removing an API key cancels existing orders or closes positions; use the exchange's normal account controls and support for discrepancies.
- title: Revoke remaining keys shared with SignalPlus
  hint: In each other exchange account's API-management area, identify keys supplied to SignalPlus and revoke them, following CZ's precautionary advice. Binance says it already removed its linked keys; verify your own account rather than assuming the same action occurred everywhere. Preserve available API-access and order history and report unexplained activity through established exchange support.
- title: Wait for resolution before creating a replacement connection
  hint: Binance recommends waiting for SignalPlus to confirm full resolution before rebinding API keys and enabling IP whitelisting. Reconnect only through established platform settings with the required access restrictions; do not submit replacement credentials to messages claiming to restore service. SignalPlus expects recovery over the next few days, after review and patches; this is a forecast, not completed restoration.
- title: Submit suspected impact for reimbursement verification
  hint: Preserve exchange order, API and balance history, then contact SignalPlus through established official support to start its verification process. It says case-by-case full reimbursement has begun and pledges to cover every affected user. Do not assume your claim is approved or paid, and never disclose exchange credentials to a compensation message.
- title: Apply the Coincall-specific precautions if you used that integration
  hint: Coincall includes past as well as current SignalPlus connections. Review its API-management settings and revoke linked keys yourself; inspect transactions, open orders and positions and report discrepancies through official Coincall support. Enable 2FA and IP allowlisting where available. Do not reconnect until SignalPlus clarifies and confirms service security; Coincall does not say it automatically removed every key or suffered customer losses.
sources:
- name: Binance original SignalPlus precautionary notice
  url: https://x.com/binance/status/2118295116716589383
  primary: true
  says: Full public original read in the browser. Confirms all SignalPlus-linked Binance API keys removed, own systems unaffected and funds safe; advises direct position/order review, waiting for resolution and IP whitelisting. Publication display lacks a timezone, so the timeline uses a date only.
- name: CZ original cross-exchange precaution
  url: https://x.com/cz_binance/status/2118298620797812955
  primary: true
  says: Original advises revoking SignalPlus-linked keys used on other exchanges and mentions an earlier Deribit report. That mention alone does not independently establish Deribit's exact actions or incident scope.
- name: SignalPlus full original incident response
  url: https://x.com/SignalPlus_Web3/status/2118334759697068490
  primary: true
  says: Confirms vendor-contact impersonation, engineer endpoint compromise, internal intrusion, global key disabling and suspension; estimates losses below $82,000 and says case-by-case full reimbursements began. Review and patches precede phased restoration.
- name: SignalPlus original scope and recovery summary
  url: https://x.com/SignalPlus_Web3/status/2118334613374329154
  primary: true
  says: A small number of accounts without IP allowlisting were affected. Full restoration is expected over the next few days, not already complete. Public post times show no timezone; only dates are used.
- name: Coincall official SignalPlus advisory, public article API
  url: https://support.coincall.com/api/v2/help_center/en-us/articles/64006637184025.json
  primary: true
  says: November 5 advisory covers current/historical integrations, user revocation, order review, 2FA, IP restrictions and waiting before reconnection; no information indicating Coincall infrastructure compromise. Public API supplied the full article while HTML access failed.
---

SignalPlus’s November 5 statement supersedes the earlier uncertainty about whether an attack occurred. It describes a vendor contact’s hijacked Telegram account, an impersonated Teams meeting invitation that compromised an engineer’s computer, and later use of that engineer’s privileges against the internal network on November 4. The vendor acknowledges it had not made exchange API IP allowlisting mandatory. Confirmed intrusion and user losses raise the rating to L4; the precise affected count, credential permissions and final forensic findings remain unpublished.

SignalPlus estimates total losses below $82,000 and says full reimbursements have started case by case. The amount is a vendor assessment, not an independent audit; a compensation pledge is not completed payment to every user. Its summary identifies a small number of affected accounts without IP allowlisting. Precautionary disabling covered all users and does not prove every account’s data or assets were compromised.

Binance’s earlier notice says its own systems are unaffected and funds remain safe in this integration response. That statement does not negate SignalPlus’s later loss assessment or reverse the separate October 29 Binance wallet incident. SignalPlus says all partner exchanges disabled its linked API keys; users should still verify their own accounts, positions and open orders directly. Service recovery remains conditional on review, patches and safe phased reopening. No cause or actor link to the [October 29 Binance incident](/incidents/binance-wallet-investigation/) is established.

**Coincall downstream guidance, verified November 6:** Its November 5 notice independently gives the precautions above for Coincall integrations. This adds actionable exchange-specific guidance; it neither proves Coincall was breached nor establishes automatic key removal, additional losses or completed SignalPlus recovery.
