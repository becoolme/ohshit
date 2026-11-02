---
title: BTCPay Server urges shutdown after reports of unauthorized hot-wallet sweeps
level: 4
date: 2026-11-01
updated: 2026-11-02
tags: [BTCPay, Bitcoin, hot wallets]
ecosystems: [crypto]
summary: BTCPay Server now identifies an attack path targeting 2.4.1 and older after hot-wallet sweep reports. Its founder reports attacker admin logins, with the entry method unresolved. The project reports no credible drains on 2.4.7; that is not proof that an upgraded, previously compromised host is clean.
splash: The identified attack path targets BTCPay Server 2.4.1 and older; hot wallets on affected instances are at risk
wipe: Follow the official shutdown warning; keep the instance offline pending investigation and verified recovery guidance
inTheWild: yes
inTheWildNote: The project reports receiving unauthorized hot-wallet sweep reports; scope is unconfirmed.
cves: []
fixed: []
timeline:
  - date: Nov 1, 2026
    title: Project warns of hot-wallet sweeps and requests shutdown
    body: The official alert asks instance operators to run ./btcpay-down.sh until the investigation is complete; no patch or restart time is given.
  - date: Nov 2, 2026
    title: Founder reports administrator access on older instances
    body: Nicolas Dorier says reports appear to involve versions before 2.4.2; how attackers logged in as admin remains under investigation.
  - date: Nov 2, 2026
    title: Project identifies a path targeting 2.4.1 and older
    body: The readable official update reports no credible hot-wallet drains on 2.4.7. The public embed truncates later guidance; it does not establish a restart procedure.
checklist:
  - title: Stop the instance using your deployment's shutdown procedure
    hint: The alert specifies ./btcpay-down.sh. For the official Docker deployment, run it from the existing btcpayserver-docker directory; the documented btcpay-down.sh wrapper also stops the stack. For hosted or other deployments, contact your operator. Expect payment processing to stop; the warning does not identify a safe configuration.
  - title: Preserve evidence and wallet records
    hint: >-
      The documented shutdown removes stack containers. If immediately available, save logs with docker-compose -f "$BTCPAY_DOCKER_COMPOSE" logs --timestamps before shutdown; do not delay containment to troubleshoot log collection. Retain deployment and version details, wallet addresses and suspicious transaction hashes before rebuilding. Never publish seeds, private keys or access tokens in a support ticket.
  - title: Wait for verified recovery instructions
    hint: Check the project's established official account and release notes before restarting. The initial alert provided no version; the November 2 follow-up names 2.4.1 and older as the identified target and reports no credible drains on 2.4.7. No verified funds-recovery procedure is given. A successful shutdown does not recover completed transfers, and an earlier release number alone does not establish safe recovery. Reject unsolicited refund links or requests for wallet secrets.
  - title: Check the installed release and administrator activity
    hint: Record your installed version and review retained administrator login and wallet transaction records. The project identifies an attack path against 2.4.1 and older; its founder reports admin access without establishing the entry method. Check the official releases page for 2.4.7 and subsequent guidance before recovery. An upgrade alone cannot establish that a previously compromised host or its secrets are clean; retain the initial shutdown precaution until you can verify safe recovery with the project or your operator.
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
  - name: Official November 2 scope update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FBtcpayServer%2Fstatus%2F2117106238123123008&omit_script=true
    primary: true
    says: Visible text identifies 2.4.1 and older and no credible 2.4.7 hot-wallet drain reports; later instructions are truncated and not adopted.
  - name: Nicolas Dorier administrator-access update, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FNicolasDorier%2Fstatus%2F2117051298633900041&omit_script=true
    primary: true
    says: Complete post reports admin logins and apparent pre-2.4.2 exposure; entry method remains unknown.
  - name: Nicolas Dorier follow-up, public embed
    url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FNicolasDorier%2Fstatus%2F2117107091328639417&omit_script=true
    primary: true
    says: Promises a detailed blog post, urges frequent updates and limited hot-wallet balances; does not supply a host-cleanup procedure.
  - name: BTCPay Server official releases
    url: https://github.com/btcpayserver/btcpayserver/releases
    primary: true
    says: Lists current releases; the October 29 release is not by itself proof of recovery from a compromised host.
---

The project's November 1 warning is an actionable containment request for operators of a self-hosted payment system. Reports of actual wallet sweeps support L4, while the investigation remains preliminary. The initial alert did not establish how many instances were affected, how much was taken, whether every hot wallet is exposed, or whether the entry point is software, credentials or a deployment component.

Do not infer that cold wallets, every Lightning deployment or the Bitcoin network were compromised. The initial warning named no vulnerability identifier or release. The November 2 observations below narrow the reported version range; they do not establish a complete host-recovery procedure.

**November 2 scope update:** The project now identifies an attack path against 2.4.1 and older. Dorier reports attackers logging in as administrators, with the entry method still unknown. The project has no credible hot-wallet drain reports on 2.4.7; Dorier says its public servers on that version were not attacked and urges regular updates and small hot-wallet balances. These statements narrow the observed scope without proving all newer instances safe or linking the incident to a specific August vulnerability. Loss totals, affected-instance counts and complete recovery instructions remain unconfirmed.
