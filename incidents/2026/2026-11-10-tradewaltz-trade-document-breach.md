---
title: TradeWaltz confirms theft of 130 trade documents after contractor key abuse
summary: TradeWaltz says an attacker abused an administrative access key stored on a compromised contractor server. The provider stopped production and training, confirmed 130 trade documents were taken and completed direct notices to identified customers.
splash: TradeWaltz customers with documents in production or training, both breached through an abused administrative key.
wipe: Verify any notice with TradeWaltz and review exposed documents and related trade instructions.
inTheWildNote: TradeWaltz confirms unauthorized access and acquisition of 130 trade documents.
level: 4
date: '2026-11-10'
updated: '2026-11-13'
tags:
- TradeWaltz
- third party
- data breach
inTheWild: 'yes'
timeline:
- date: Nov 10, 2026
  title: TradeWaltz detects intrusion and takes two environments offline
  body: The provider removes abused and attacker-created accounts, restricts source IP addresses and starts analyzing logs.
- date: Nov 11, 2026
  title: Provider confirms document theft and identifies the key abuse
  body: The provider reports that the key was stored on an external contractor server that had been attacked.
- date: Nov 12, 2026
  title: TradeWaltz completes direct notifications and scopes 130 documents
  body: The provider says the documents included names and initials. Production and training remain suspended.
- date: Nov 13, 2026
  title: TradeWaltz targets November 16 for reopening
  body: Production and training remain offline. The company says recovery work has begun and security measures are still being implemented and tested.
checklist:
- title: Verify notices and identify affected files
  hint: Use the established TradeWaltz help desk or account contact. Confirm document identifiers and fields with the provider, and compare them with your own shipment and document records. Preserve notices and suspicious requests.
- title: Verify unexpected trade instructions through a known channel
  hint: Independently verify payment, shipping or document changes with the relevant counterparty. Send suspicious requests and unexpected reset emails to the established help desk. Avoid unexpected links and attachments, and do not provide passwords, codes or API keys in response.
- title: Check environment status before resuming work
  hint: Consult the provider’s incident notice before retrying submissions. Use approved contingency channels for urgent work and reconcile submissions after reopening. For operators with outsourced administrative access, audit its use and rotate any exposed keys from a trusted environment.
sources:
- name: TradeWaltz incident notices and November 13 recovery update
  says: Confirms the contractor key abuse, 130 trade documents, customer notices, service scope and the tentative reopening date.
  url: https://www.tradewaltz.com/news/13816/
  primary: true
---

The provider first disclosed the intrusion and service suspension on November 10. It says the attacker used a system administration key stored on a server operated by an external contractor. TradeWaltz confirmed intrusions into both production and training, shut those environments down and submitted an initial report to Japan’s Personal Information Protection Commission.

In its November 12 update, the company says 130 trade documents were taken and that the documents included names and initials. The number describes documents. It has not published a distinct count of people or customers. The provider completed individual contact with identified affected customers. TradeWaltz for Grain Importers and TradeWaltz for Export Documentary remained available. In its tenth notice, on November 13, the company says it finished identifying the affected data and started recovery on November 12. Production and training remain offline. November 16 is the target, and the company has yet to confirm a reopening time. The next update is scheduled for November 15 at 16:00 Japan time.
