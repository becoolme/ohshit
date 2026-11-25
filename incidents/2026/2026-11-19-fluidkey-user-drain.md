---
title: Fluidkey links $1.6 million theft to logged session tokens and SigNoz flaws
level: 4
date: 2026-11-19
tags:
- Fluidkey
- wallet
- crypto
summary: Fluidkey reports about $1.6m stolen from 52 accounts after SigNoz flaws exposed logged session tokens. Transfers still needed users to open and unlock the app. Service resumed with 1.79.22 and sessions were ended; personal data and viewing keys also leaked. Investigation and fund recovery continue.
splash: Fluidkey accounts with exposed session tokens; fraudulent transfers executed when users opened and unlocked the app.
wipe: Use Fluidkey 1.79.22 or later through official channels, review account activity and direct notices, and verify recovery messages.
inTheWild: 'yes'
inTheWildNote: Fluidkey acknowledges a security incident and unauthorized user transactions.
timeline:
- date: Nov 5, 2026
  title: Fluidkey dates earlier SigNoz endpoint probes
  body: The later report says these probes returned no log content.
- date: Nov 12, 2026
  title: Attacker starts reading internal logs
  body: Fluidkey reports log access from November 12 through November 19 on its SigNoz 0.121.1 installation.
- date: Nov 19, 17:28 UTC
  title: First unauthorized transfer
  body: Fluidkey reports approximately $1.6 million stolen from 52 accounts before transaction processing stopped at 18:05 UTC.
- date: Nov 19, 18:05 UTC
  title: Fluidkey takes services offline
  body: In its later statement, Fluidkey says no unauthorized transactions occurred after this shutdown. It is working with SEAL 911 on investigation and fund tracing and promises a postmortem.
- date: Nov 20, 2026
  title: Bitquery publishes its original transaction analysis
  body: The researcher follows payouts on six chains and separates attacker-linked, uncertain and likely user-owned destinations. Its findings do not establish how the relayer was induced to send transactions.
- date: Nov 20, 15:27 UTC
  title: Fluidkey restores service with 1.79.22
  body: The vendor says it ended existing sessions, patched and isolated SigNoz, stopped logging sensitive data and changed transfer approval and two-factor-limit verification.
- date: Nov 22, 2026
  title: Fluidkey publishes its incident report
  body: The official post links the report on log exposure, signing interaction, separate data/viewing-key impact and ongoing recovery. This supersedes the initial pause guidance; it does not announce completed refunds.
checklist:
- title: Use the restored release and review your account
  hint: Fluidkey reports returning online with 1.79.22 on November 20 at 15:27 UTC after ending all existing sessions. Obtain the current app through established official channels, review transfers and two-factor limits, and read direct in-app/email notices. Contact official support about unrecognized activity; a service reopening does not establish that stolen funds were returned.
- title: Preserve transaction evidence without labelling every withdrawal as theft
  hint: As a precaution, retain chain names, transaction hashes, timestamps, assets and destination addresses for your own accounts. Bitquery's report lists 22 addresses in its complete wallet record, including legitimate infrastructure and likely user destinations as well as suspected attacker wallets; use its role labels and full table, not a blanket denylist. The relayer contract is 0x8090a9db6aca56ffa186c75ca0787b18af1058a0; its Ethereum signer is 0x7997e87480f17aadbbb5fdb02546261da4d982da and Base signer is 0x2b40fe2e6772c99e114f3e835fca1dace9a0854a. A transaction involving those addresses alone does not prove theft or compromise, and absence from the report does not prove safety.
- title: Treat recovery messages as unverified until checked independently
  hint: As a precaution, verify recovery or migration instructions through established project support before signing. Never disclose a seed phrase or private spending key to a reimbursement contact. The vendor says spending keys stayed on devices; exposed viewing keys reveal addresses, balances and history but cannot spend. Investigation and tracing with zeroShadow continue; no completed refunds or universal spending-key rotation are announced.
- title: If you operate SigNoz, close both flaws and remove logged secrets
  hint: Inventory query-service exposure and upgrade to 0.142.1 or later for both cited flaws; 0.141.1 fixes the authentication gap only and 0.142.0 incompletely fixes SQL injection. Restrict the query interface to trusted networks, review access, invalidate exposed sessions and rotate accessible credentials after containment. Stop collecting tokens and sensitive data in logs. If patching is delayed, upstream advises blocking POST /api/v1/trace-funnels/analytics/* and restricting ClickHouse privileges/table functions; this is temporary containment, not remediation of an existing intrusion.
sources:
- name: Fluidkey initial incident statement
  url: https://x.com/fluidkey/status/2123481430634492278
  primary: true
  says: Full initial statement read through X's public oEmbed endpoint; confirms an incident affecting users and advises against website/app interaction during investigation.
- name: Fluidkey service-shutdown update
  url: https://x.com/fluidkey/status/2123510970165436704
  primary: true
  says: Public oEmbed exposes the complete opening paragraphs on the 18:05 UTC shutdown, no subsequent unauthorized transactions and SEAL 911 investigation. Later text is truncated and is not relied upon here.
- name: Bitquery — Fluidkey hack
  url: https://bitquery.io/investigations/fluidkey-hack
  primary: true
  says: Original six-chain transaction analysis read in full, including its attribution method, wallet-role table and explicit limits; its dollar estimate is not an official loss tally.
- name: Fluidkey official incident report
  url: https://docs.fluidkey.com/security/incident-2026-11-19/
  primary: true
  says: Vendor account of SigNoz exploitation, session-token misuse, user-unlock prerequisite, losses, distinct data scopes and service restoration; investigation remains ongoing.
- name: Fluidkey postmortem announcement
  url: https://x.com/fluidkey/status/2124318988566208871
  primary: true
  says: Full public oEmbed text dates the report announcement to November 22 and says affected users were contacted; it does not confirm reimbursement.
- name: SigNoz authentication advisory
  url: https://github.com/SigNoz/signoz/security/advisories/GHSA-v549-7j2x-qjm5
  primary: true
  says: 'CVE-2026-92729: affected 0.88.0–0.141.0; patched 0.141.1. Six payload endpoints lack authentication; six ID-based endpoints require claims but miss role checks.'
- name: SigNoz SQL injection advisory
  url: https://github.com/SigNoz/signoz/security/advisories/GHSA-w5pf-xwjh-vr5v
  primary: true
  says: 'CVE-2026-93292: affected from 0.88.0 before 0.142.1; 0.142.0 was only a partial fix. Data reach depends on the ClickHouse user privileges.'
updated: 2026-11-25
cves:
- id: CVE-2026-92729
  name: SigNoz trace-funnel authentication bypass
  description: Six analytics endpoints can be queried without credentials when network reachable; upstream fixed this in 0.141.1. Fluidkey identifies this advisory as part of the attack.
- id: CVE-2026-93292
  name: SigNoz trace-funnel SQL injection
  description: Attacker-controlled funnel fields can read data accessible to the ClickHouse account. Fully fixed in 0.142.1 after a partial 0.142.0 fix; Fluidkey identifies this advisory as part of the attack.
fixed:
- product: Fluidkey service restoration
  version: 1.79.22
  status: Vendor reports service restored with this release; existing sessions ended
- product: SigNoz — both cited flaws
  version: 0.142.1
  status: Upstream minimum covering both flaws; Fluidkey does not disclose its exact upgraded version
---

Fluidkey's initial November 19 statement acknowledged a security incident affecting users and asked them not to interact with its website or app while it investigated. This was the initial pause instruction; the later official report confirms service restoration with 1.79.22 on November 20 at 15:27 UTC. The complete opening paragraphs of its later statement say it took all services offline at 18:05 UTC, saw no unauthorized transactions after that time, was working with SEAL 911 on investigation and fund tracing, and would publish a postmortem. Direct X pages were inaccessible; these statements were read through X's public oEmbed endpoint. The remainder of the later post is truncated there, so no further instructions are inferred from it.

Bitquery's November 20 original analysis follows the relayer's payouts on Ethereum, Base, BNB Chain, Optimism, Arbitrum and Polygon. It classifies roughly $1.58 million as reaching attacker-linked wallets, with a possible upper range near $1.64 million when uncertain destinations are included. These remain **separate research estimates**; Fluidkey's later report independently gives an approximate $1.6 million loss, rather than adopting Bitquery's lower/upper bounds. It separately identifies about $349,000 in transfers to wallets with prior histories, some likely ordinary withdrawals. Adding every relayer payout together would therefore overstate the evidence for theft. Its figures exclude unpriced assets and Gnosis; its classifications can be revised.

The researcher traces relayer activity through 18:04:59 UTC on November 19 and reports no subsequent transactions by its November 20 07:35 UTC check. That bounded observation agrees with the shutdown statement; it does not establish permanent containment. Transfers into Tornado Cash are not evidence of recovery or repayment. This was the researcher's bounded November 20 view, before the official report; the later vendor explanation follows below. Its ongoing investigation does not imply that the service remains offline.

**The official explanation:** Fluidkey says its self-hosted SigNoz 0.121.1 was exploited through the two cited advisories to read internal logs from November 12–19, after unsuccessful probes starting November 5. Logged session tokens let the attacker create and approve transfer requests and raise two-factor spending limits on the server. Spending keys remained on users' devices: the prepared transfers still needed a user to open and unlock the app. Small incoming payments triggered notifications, and unlocking let the app sign requests it believed were already approved. The report does not establish a general Safe vulnerability or name the attacker.

The vendor reports approximately **$1.6 million stolen from 52 accounts** across Ethereum, Base, BNB Chain, Polygon, Optimism and Arbitrum. Separately, log disclosure affected **70 accounts**, including 38 email addresses, 37 names, 17 IBANs, 24 postal addresses, four dates of birth and two phone numbers. It also reports viewing keys from **54 newly registered accounts**: those expose addresses, balances and transaction history, not spending authority. These are different scopes and must not be added together as a unique victim count. Fluidkey says it contacted each affected user. L4 continues to reflect confirmed unauthorized transfers and disclosure, rather than assuming every user or private key was compromised.

**Restoration and remaining work:** Before reopening, Fluidkey says it ended all existing sessions, patched both SigNoz flaws, rotated its credentials and removed public access to the query interface. It stopped writing session tokens and sensitive data to logs. Server-side transfer creation/approval now requires the user's key authorization, and two-factor-limit changes are verified on the server. Upstream's minimum covering both vulnerabilities is **SigNoz 0.142.1**, but Fluidkey does not identify its exact upgraded SigNoz version. The earlier 0.141.1 authentication patch and partial 0.142.0 SQL patch are not substitutes for both fixes.

The report says approximately **887 ETH** entered a mixer on November 19, while Bitquery's separately scoped analysis reports **881.6 ETH**. Neither figure is recovered money. Fluidkey engaged zeroShadow for tracing, reported to FBI IC3 and Switzerland's NCSC and was notifying data-protection authorities. Its service review and investigation continue; no completed reimbursement or recovered-funds total is announced.

For investigation, preserve the role distinctions in Bitquery's **22-address record**. In addition to the three legitimate relayer addresses in the checklist, it lists scout/gas addresses `0x9140837ca5020c42fcbcb29a1af74293d6e5b9dc` and `0x72873fa107aba9310f220660a1e64e31b4de5cf2`; payout/collector/gas/swap addresses `0xeb6ed5a926a653ade23b62e9a582d2262f3f0980`, `0x9e5143a57ef1b609ef4b96248374e8cfdca940ae`, `0xf37e4220636e797cf1e10ef0f9c11a4e103792fc`, `0xdc70810d767b3109d8afa9678561738bdb4a2984`, `0x9e5ff0a62fb0a6ec15574315cafb782fc63fa1ee`, `0xe42d211940438803c8f441ef7080c68f9bce73c9` and `0x5afec19fb1d0e1a2a92ab0f3ccca246c59120021`; and Tornado-deposit addresses `0xd3a9d27ad80ff9528e158bffa9752f8a88024eea`, `0xc4ab6dcd6542973048d374e1b1129cd534c7dba9`, `0x4b98363885ebf124018e5d779aea033d9d04c95b`, `0x6fad29bc41f3391c99ed61416d22ca23b7f6d01a`, `0xd915dec9402c1aa9f508b8371375c140ab9e0c4c` and `0xf5e261c18cb87dc1a6ee58f61fa6b64b58f20e50`. Its record also includes two scouted/drained accounts, `0x746fb37befb7b827cc050f62f45f7de4edfdd6e7` and `0x03573cbe72c503155411201215aadbc4b6c65059`, a likely user's own destination `0x1f3211e62bb3a8446fa9d8f69a5c380362b6d3a3` and a KuCoin deposit address `0x6a3ec2a1485123bb6ffcaa05bc2260aae3d95e99`. This is a research record with mixed roles, not a list of 22 attackers.
