---
title: Binance pauses withdrawals for security checks after reported wallet outflows
level: 3
date: '2026-10-29'
tags:
- Binance
- crypto
- investigation
ecosystems:
- crypto
summary: Binance says withdrawals will resume once its security issue is resolved and states user funds are safe. The investigation followed reported wallet outflows. Root cause, any stolen-fund total and a restoration time remain unconfirmed.
splash: Binance.com withdrawals awaiting security checks; affected assets and attack prerequisites remain unconfirmed
wipe: Follow official updates, inspect account activity, and use Binance's account-lock procedure if you find unauthorized actions
inTheWild: unknown
inTheWildNote: Binance confirms security checks and pending withdrawals, but not the suspected theft.
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
checklist:
- title: Use official channels and reject recovery messages
  hint: Open Binance through your existing bookmark or official app and check its announcements for withdrawal restoration; the cited notice gives no resumption time. Verify unsolicited communications with Binance Verify or official support. Do not share passwords or 2FA codes, follow recovery links, or send money to purported support agents.
- title: Inspect your own account and respond to unauthorized activity
  hint: Review Security and Account Activity for unfamiliar logins, transactions or security-setting changes. If found, Binance instructs users to disable the account and contact official support. In the app, its guide uses Account Info → Security → Manage Account → Disable Account. Read the consequences before confirming; reopening may require support. This account control does not fix a possible exchange-wallet compromise.
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
---

Binance’s initial notice said it had not confirmed an impact on user funds. The exchange then edited that notice to state that user funds are safe, and subsequently said withdrawals would resume after the security issue is fully resolved. These are the vendor’s statements, not an independently audited reserve or loss assessment. No resumption time or technical containment report is supplied. L3 reflects the acknowledged security investigation and withdrawal disruption at a mainstream exchange; the notices do not establish a confirmed theft for L4.

CZ separately suspects a hack and says he expects users to be covered, while explicitly stating that he no longer manages Binance.com. His expectation is not a formal reimbursement guarantee from the exchange. Reported stablecoin freezes must not be counted as refunds or added to outflow estimates to calculate a loss. Circulating monetary estimates are unverified here; no independently reconciled stolen-fund total or victim count is established.

The root cause, affected wallet scope, initial access and containment status remain unresolved. We have not independently traced the transactions or authenticated wallet ownership. The cited sources do not establish a link to the separate Polymarket/DebugBear incident, or a Binance root cause of frontend injection or private-key theft. Ordinary account-security measures are useful against account abuse, but cannot establish that exchange custody systems are safe.
