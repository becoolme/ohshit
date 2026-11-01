---
title: b14g confirms unauthorized withdrawal of about 97 million staked CORE
level: 4
date: 2026-10-31
tags: [b14g, Core, staking]
ecosystems: [crypto]
summary: b14g says about 97 million CORE staked through its service was withdrawn without authorization on October 31. It reports pausing affected contracts upon discovery. This is a token count, not dollars or users; the readable portion of the original notice does not establish a final cause, verified fix or repayment plan.
splash: CORE staked through b14g; do not infer that the Core network or every asset supported by b14g was compromised
wipe: Avoid new exposure to affected staking contracts; preserve position records and verify recovery guidance through established b14g channels
inTheWild: yes
inTheWildNote: b14g directly confirms unauthorized withdrawals to attacker-controlled addresses.
cves: []
fixed: []
timeline:
  - date: Oct 31, 09:29 UTC
    title: Unauthorized withdrawal of staked CORE
    body: b14g gives this explicit UTC time for the withdrawal of approximately 97 million CORE.
  - date: Oct 31, 2026
    title: b14g publicly confirms the incident and reports pausing affected contracts
checklist:
  - title: Verify contract status before taking further staking actions
    hint: Open b14g through your existing bookmark or its established b14g_network account and check its incident announcements before depositing or interacting with the affected deployment. The readable notice reports a pause; it does not establish a safe replacement contract or verified fix. Do not treat this report as a confirmed compromise of the Core network itself.
  - title: Preserve position history and reject recovery requests
    hint: Record your staking-order identifiers, transaction hashes, relevant contracts and pre-incident balances for official support. Use established project channels to verify any next steps. Do not disclose seed phrases or private keys, pay recovery fees or sign unsolicited recovery transactions. These are general precautions; no vendor-approved exit or repayment procedure was verified here.
sources:
  - name: b14g original security update
    url: https://x.com/b14g_network/status/2116570456245596580
    primary: true
    says: Public embed confirms the amount in CORE, withdrawal time and contract pause; the remainder is truncated.
  - name: Official public embed of b14g's update
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fb14g_network%2Fstatus%2F2116570456245596580&omit_script=true
    primary: true
---

The operator describes unauthorized withdrawals and attacker-controlled recipients, rather than an unexplained transfer. That confirmed asset theft supports L4. Approximately 97 million CORE must not be reported as $97 million. The readable opening of the vendor's October 31 notice confirms the pause but does not establish when discovery occurred or how quickly the pause followed the withdrawal. Its later text could not be read in full, so later tracing, frozen-fund, unaffected-asset and compensation claims are not established here. Frozen or traced assets would not by themselves prove that users have been repaid.
