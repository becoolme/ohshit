---
title: "Luxor patches Commander after client mining hashrate is redirected"
level: 4
date: 2026-11-15
tags: [crypto, mining, unauthorized-access]
summary: >-
  Luxor says an unauthorized redirect through Commander temporarily pointed machines from just over a dozen client accounts at another mining pool. Luxor patched the service, began restoring pool settings and committed to compensating affected clients for the diverted hashrate.
splash: "Machines managed through Luxor Commander in just over a dozen affected client accounts."
wipe: "Verify pool and worker settings against your approved configuration and report any discrepancies to Luxor."
inTheWild: yes
inTheWildNote: "Luxor confirmed that mining equipment was temporarily pointed at a different pool."
timeline:
  - date: Nov 15, 2026
    title: Luxor publicly confirms the unauthorized redirect
    body: Luxor said it detected the redirect through internal monitoring the previous night, patched Commander within two hours, began restoring settings and pledged full compensation for diverted hashrate.
checklist:
  - title: Verify the fleet is using the expected mining pool
    hint: Compare worker and pool settings in Commander and on managed equipment with a trusted configuration baseline. Contact Luxor through the known support channel about any mismatch.
  - title: Reconcile mining activity and compensation if affected
    hint: Retain pool-side worker records, payout history and any Commander configuration history. Use those records to reconcile the diversion window and subsequent compensation with Luxor.
  - title: Follow Luxor’s incident updates
    hint: Luxor reported normal Commander operation and said users did not need to take action. Confirm any new instructions with Luxor before applying changes.
sources:
  - name: Luxor Technology disclosure
    url: https://publish.twitter.com/oembed?omit_script=true&url=https%3A%2F%2Fx.com%2Fluxor%2Fstatus%2F2122018094914601464
    says: Confirms the unauthorized redirect, affected account scope, patch, restoration steps and compensation commitment.
    primary: true
  - name: CryptoCompass report with Luxor’s full public statement
    url: https://www.cryptocompass.com/articles/luxor-patched-commander-in-two-hours-the-diverted-address-earned-0-162-btc
    says: Reproduces the operator’s statement and describes independent observations of pool activity.
---

Luxor’s internal monitoring detected that mining equipment managed through Commander had been pointed at another pool without authorization. Luxor said just over a dozen client accounts were affected for a limited period and reported that no data was leaked or exfiltrated from its systems. Its notice did not describe the initial access method or name fixed versions.

Luxor said it patched Commander within two hours, started restoring machines to their original pool settings and would compensate each affected client for redirected hashrate as if mining had continued normally. It reported normal Commander operation and said users did not need to take action. Luxor said it would publish a postmortem. The disclosure did not quantify aggregate losses or confirm that reimbursements had been paid.
