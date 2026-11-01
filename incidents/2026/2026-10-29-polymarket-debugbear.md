---
title: Polymarket confirms third-party breach; researchers find wallet-draining DebugBear script
level: 4
date: '2026-10-29'
updated: 2026-11-01
tags: [Polymarket, DebugBear, supply-chain, crypto]
ecosystems: [web]
summary: Polymarket's postmortem confirms session abuse through a compromised monitoring script. It reports $2.7m in drained funds plus $1.2m for pause-related losses, with 95% of affected wallets refunded as of October 30. Trading resumed and active sessions were reset; total affected users remain undisclosed.
splash: Logged-in Polymarket.com users exposed to the malicious script; DebugBear RUM customers should remove its embed
wipe: Close exposed tabs, review account activity through a clean session, and remove DebugBear RUM embeds from your sites
inTheWild: 'yes'
inTheWildNote: Polymarket confirms a provider compromise and reimbursement for affected users.
cves: []
fixed: []
timeline:
  - date: Oct 29, 18:05 UTC
    title: Polymarket pauses new trades and relayer actions
  - date: Oct 29, 18:37 UTC
    title: Polymarket confirms the provider compromise and promises reimbursement
  - date: Oct 29, 19:05 UTC
    title: Official status history marks the incident resolved
  - date: Oct 30, 20:07 UTC
    title: Postmortem details containment and compensation
    body: Polymarket reports cache clearance, active-session resets and $3.9m in total compensation.
  - date: Oct 30, 23:11 UTC
    title: DebugBear reports DNS changes through its registrar
    body: Its preliminary investigation points to a specific customer website; it reports no evidence of an internal-system compromise so far.
checklist:
  - title: Close exposed tabs and inspect account activity
    hint: Reject unexpected signatures. From a clean session, check orders, position movements and wallet transfers; preserve timestamps and transaction hashes for official support. Review sessions, API credentials and permissions with support. Disconnecting a wallet does not revoke on-chain approvals or reverse transfers. Never give recovery agents a seed phrase.
  - title: Remove DebugBear RUM from your websites
    hint: DebugBear asks RUM customers to remove the embed code. Check templates, tag managers and generated pages. This warning applies beyond Polymarket; it does not establish that every DebugBear customer was attacked.
  - title: Hunt for the captured payload
    hint: 'Check retained scripts and request logs for cdn.debugbear[.]com/C7xcKKrjUnXK.js; SHA-256 0755e767504d8103f6c27b9e765a1026507a17c04513242adb503df7777879e5; recipient 0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18; tracking ID 4c6b64a0-a7ef-4c0f-9c70-3a4e6f89065c; data.debugbear[.]com/metrics/submit, /metrics/update and /metrics/handle; and configuration path /metrics/init. Preserve evidence without executing the file. A match alone is not proof of compromise: the hosts serve legitimate monitoring traffic, and configuration can change the recipient.'
  - title: Verify automatic compensation through official channels
    hint: Polymarket says eligible wallets need no claim or ticket; its October 30 postmortem links an official review form for missing or disputed payments. Reach it from the official incident page, not unsolicited recovery messages. The reported 95% is a dated wallet figure, not a current completion guarantee.
sources:
  - name: Polymarket official status history
    url: https://status.polymarket.com/history/1
    primary: true
    says: Records the October 29 pause, provider compromise, reimbursement commitment and resolution, with explicit UTC timestamps.
  - name: Hudson Rock research
    url: https://www.infostealers.com/article/polymarket-breach-alert-wallet-draining-code-found-in-a-third-party-script/
    primary: true
    says: Static analysis identifies session reuse and asset-transfer logic; indicators and financial-evidence limitations were read in the publicly indexed report. Direct page retrieval returned 403.
  - name: DebugBear security notice
    url: https://x.com/DebugBear/status/2115866496643535293
    says: Original vendor notice; read through the official X embed below.
  - name: Official X embed of DebugBear's notice
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FDebugBear%2Fstatus%2F2115866496643535293&omit_script=true
    primary: true
    says: DebugBear confirms an ongoing security incident and tells RUM customers to remove its embed code.
  - name: Polymarket October 30 postmortem
    url: https://status.polymarket.com/cmvvek1i90eme14ruga1z6tuj
    primary: true
  - name: DebugBear October 30 investigation update
    url: https://www.linkedin.com/posts/debugbear_were-continuing-to-investigate-the-security-activity-7522072665495588865-NsiJ
    primary: true
    says: Reports registrar-mediated DNS compromise, interrupted inbound email and preliminary scope; public post metadata dates publication to October 30 at 23:11 UTC.
---

Polymarket's international platform confirmed a compromised provider on October 29 and committed to compensating affected users. Its status page now records the outage as resolved. L4 reflects a real compromise, rather than a theoretical vulnerability.

Hudson Rock attributes the malicious script to a DebugBear delivery URL. The sample reuses the logged-in application's trading client and signer to attempt position transfers or sales and subsequent asset transfers. This does not prove every signing request silently succeeds, private keys were exported, or smart contracts were compromised. Removing the script does not establish that every already-open session is safe.

The platform's notice does not name its provider; DebugBear separately acknowledges an incident. The precise exposure window, how access to the registrar was obtained and total affected population remain unknown. The later operator figures below supersede the absence of a vendor loss estimate; wallet balances and individual claims are not aggregate losses. This is a separate October event; June incident figures must not be reused for it.

**October 30 postmortem:** Polymarket reports removing the script, clearing caches and resetting active sessions. It assigns $2.7m to drained funds and $1.2m to pause-related losses: $3.9m in compensation, not $3.9m stolen. Its 95% refund figure includes drained-wallet and goodwill refunds at that time. These are operator figures, not an independent audit. It also describes stronger script integrity controls and continued investigation.

**DebugBear’s October 30 update:** The provider says its DNS records were altered through its domain registrar. Its early findings point to one customer website, with no evidence so far of intrusion into its internal systems; investigation continues. This does not establish that other customers were unaffected or that the monitoring script is safe to restore. DebugBear also reported that inbound email to its domain was unavailable at the time; follow its public updates rather than assuming an emailed support request was received.
