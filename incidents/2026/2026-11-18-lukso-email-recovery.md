---
title: LUKSO email-recovery backend exploit drains about 300 Universal Profiles
date: 2026-11-18
level: 4
tags:
  - Cryptocurrency
  - Recovery
  - Credentials
summary: LUKSO says a backend flaw let an attacker add a controller to about 300 email-recovery-enabled profiles and take around 1.4 million LYX. The recovery service is off, but existing malicious controllers must still be removed.
splash: Universal Profiles that used LUKSO’s email-based recovery; retained attacker permissions still endanger remaining assets.
wipe: Remove the attacker and recovery controllers, verify on-chain permissions are cleared, and create a supported backup.
inTheWild: yes
inTheWildNote: LUKSO’s postmortem confirms exploited recovery infrastructure and stolen LYX.
timeline:
  - date: Nov 17–18, 2026
    title: Email-recovery backend exploited
    body: LUKSO reports takeover of recovery-service profiles and unauthorized controllers added to approximately 300 user profiles.
  - date: Nov 18, 2026
    title: Postmortem and removal instructions published
    body: The recovery service is disabled and being decommissioned. Reimbursement arrangements remain in development, not completed compensation.
checklist:
  - title: Remove the attacker controller first
    hint: Follow the postmortem’s UP Authorize link at authorize.universalprofile.cloud, choose authorize controller, enter 0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7, connect with the established UP! app or extension, then scroll down and remove it. The key may be missing from the displayed controller list; follow the removal instructions anyway. Do not approve an addition or grant new permissions.
  - title: Remove recovery access and keep a usable backup
    hint: In UP! Controllers remove recovery-UP. The postmortem also permits removing its Add Permission permission, but the linked incident checker warns that partial permission edits can leave transfer powers (0x1500). Prefer complete controller removal and verify the permission value is empty (0x), rather than trusting a UI list. Keep another valid backup before removing recovery access and create a file backup in UP! Mobile or the browser extension. Recheck after importing a profile or adding a device.
  - title: Check the reported addresses and remaining permissions
    hint: "The postmortem identifies attacker controller 0xa2f8Fd85366d1B4A3B13C33A48CD959F6D1Ba3a7 and Ethereum proceeds address 0x4d2BFb7Ca38Cb3Ea136845a9dd0FBEACe2Cd365C. Its linked incident-check.lukso.tools tool checks eleven LUKSO addresses: the attacker plus ten recovery profiles, fully listed in https://incident-check.lukso.tools/check.js. This is twelve published addresses across the two sources, not twelve attackers. The checker is read-only: enter only the profile address, never a key, recovery phrase or 2FA code. It covers that address set only, not general safety. A transaction or address match alone does not establish ownership, cause or a total loss; if an affected profile controls another account or contract, inspect that downstream access too."
  - title: Track recovery through official channels
    hint: Recheck permissions after removal. Controller removal does not undo past transfers. LUKSO says reimbursement details will follow in coming weeks; do not treat that as a payment already made. Use the postmortem’s support@lukso.network contact and established official channels, and reject requests for a recovery phrase.
sources:
  - name: LUKSO original postmortem
    url: https://medium.com/@lukso/post-mortem-security-incident-in-the-email-based-recovery-system-029f6f241e2b
    primary: true
    says: Reports backend exploitation, approximate profile and LYX figures, scope exclusions, shutdown, controller-removal steps and planned reimbursement.
  - name: Incident checker linked by LUKSO
    url: https://incident-check.lukso.tools/
    primary: true
    says: Warns about retained super permissions, hidden controllers, re-registration and the limits of its read-only check.
  - name: Published incident address list
    url: https://incident-check.lukso.tools/check.js
    primary: true
    says: Lists one attacker controller and ten recovery profiles; these are incident context, not twelve independent attackers.
---

LUKSO attributes the incident to its email-recovery backend, not its blockchain or Universal Profile contracts. It reports no leaked private keys or recovery phrases and excludes profiles that never used email recovery; these are vendor claims. Its approximate 1.4 million LYX figure is a reported theft amount, not the roughly 50 ETH obtained after bridging and swaps (valued by the postmortem at about $95,000). Do not equate those quantities or infer a market-price guarantee from the vendor’s statement that the stolen tokens were sold. Existing unauthorized controllers remain dangerous even after service shutdown.
