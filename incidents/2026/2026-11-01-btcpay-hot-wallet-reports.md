---
title: BTCPay Server urges shutdown after reports of unauthorized hot-wallet sweeps
level: 4
date: 2026-11-01
tags: [BTCPay, Bitcoin, hot wallets]
ecosystems: [crypto]
summary: BTCPay Server says it is receiving reports of unauthorized hot-wallet sweeps and asks operators to shut down their instances while it investigates. The alert identifies no affected versions, attack vector, loss total or verified fix.
splash: Operators of BTCPay Server instances; the official warning does not narrow affected versions or configurations
wipe: Follow the official shutdown warning; keep the instance offline pending investigation and verified recovery guidance
inTheWild: yes
inTheWildNote: The project reports receiving unauthorized hot-wallet sweep reports; scope is unconfirmed.
cves: []
fixed: []
timeline:
  - date: Nov 1, 2026
    title: Project warns of hot-wallet sweeps and requests shutdown
    body: The official alert asks instance operators to run ./btcpay-down.sh until the investigation is complete; no patch or restart time is given.
checklist:
  - title: Stop the instance using your deployment's shutdown procedure
    hint: The alert specifies ./btcpay-down.sh. For the official Docker deployment, run it from the existing btcpayserver-docker directory; the documented btcpay-down.sh wrapper also stops the stack. For hosted or other deployments, contact your operator. Expect payment processing to stop; the warning does not identify a safe configuration.
  - title: Preserve evidence and wallet records
    hint: Keep existing logs, deployment and version details, wallet addresses and suspicious transaction hashes before deleting containers or rebuilding. The documented shutdown removes stack containers, so retain accessible logs without delaying containment. Never publish seeds, private keys or access tokens in a support ticket.
  - title: Wait for verified recovery instructions
    hint: Check the project's established official account and release notes before restarting. This alert provides no fixed version or verified funds-recovery procedure. A successful shutdown does not recover completed transfers, and an unrelated earlier release is not evidence that this incident is fixed. Reject unsolicited refund links or requests for wallet secrets.
sources:
  - name: BTCPay Server original emergency alert
    url: https://x.com/BtcpayServer/status/2117020340815819262
    primary: true
    says: The project reports unauthorized hot-wallet sweep reports and asks operators to shut down while it investigates; the original HTML is blocked, but its complete official public embed is readable.
  - name: Official public embed of the BTCPay Server alert
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FBtcpayServer%2Fstatus%2F2117020340815819262&omit_script=true
    primary: true
  - name: BTCPay Server Docker operations documentation
    url: https://docs.btcpayserver.org/Docker/operations/
    primary: true
    says: Documents the shutdown wrapper and container lifecycle; operational documentation is not an incident-specific fix.
---

The project's November 1 warning is an actionable containment request for operators of a self-hosted payment system. Reports of actual wallet sweeps support L4, while the investigation remains preliminary. The alert does not establish how many instances were affected, how much was taken, whether every hot wallet is exposed, or whether the entry point is software, credentials or a deployment component.

Do not infer that cold wallets, every Lightning deployment or the Bitcoin network were compromised. No vulnerability identifier or release is tied to this warning. The project's earlier security releases should not be treated as a confirmed remedy for these new reports without an explicit follow-up.
