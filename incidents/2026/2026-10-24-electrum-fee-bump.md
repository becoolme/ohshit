---
title: "Electrum fixes an exploited malicious-server trick that turns a fee bump into an attacker payment"
level: 4
date: 2026-10-24
tags: [Electrum, Bitcoin, exploited]
ecosystems: [electrum]
summary: "A malicious Electrum server can substitute an invalid pending transaction. If the user fee-bumps it, the wallet signs a payment to the attacker. Maintainers report one user lost funds; upgrade to 4.8.3."
splash: "Electrum before 4.8.3 connected to a malicious main server; loss requires the user to sign the substituted transaction"
wipe: "Install Electrum 4.8.3 from electrum.org; verify signatures and every full destination address and amount before signing"
inTheWild: yes
inTheWildNote: "Maintainers confirm attacking servers and two reports, including one loss"
cves:
  - id: GHSA-6jp4-8v48-cc5v
    name: Malicious-server substitution of an unconfirmed transaction
    description: "A server hides a broadcast and supplies a conflicting transaction with invalid signatures; a manual replace-by-fee operation can authorize the attacker payment."
fixed:
  - product: Electrum
    version: 4.8.3
    status: "Checks wallet-owned input signatures before accepting mempool transactions"
timeline:
  - date: Oct 11, 2026
    title: First private report identifies a substituted transaction
  - date: Oct 18, 2026
    title: A second user privately reports losing funds after a fee bump
  - date: Oct 23, 2026
    title: The fixed 4.8.3 source is tagged
  - date: Oct 24, 2026
    title: Binaries and the public advisory are released
checklist:
  - title: Upgrade before signing another transaction
    hint: "Use electrum.org and its GPG verification instructions; confirm the running application is 4.8.3 or newer"
  - title: Check complete outputs on every signing request
    hint: "Compare full destination addresses and amounts with the intended payment, including fee bumps. Reported attacker addresses copied the legitimate address's last four characters; suffix matching is insufficient"
  - title: Use a server you actually trust
    hint: "The advisory excludes clients connected to trusted servers, such as their own. Switching to an arbitrary public server does not establish trust; upgrade anyway"
  - title: Review suspicious pending transactions without signing them
    hint: "Compare wallet history and transaction IDs with an independent trusted view. Preserve conflicting transaction details and server information for investigation. A suspicious entry alone does not prove funds moved"
sources:
  - name: Electrum security advisory
    url: https://github.com/spesmilo/electrum/security/advisories/GHSA-6jp4-8v48-cc5v
    says: "Active attacks, two reports, one reported loss, prerequisites, affected versions and disclosure timeline"
    primary: true
  - name: Electrum fix commit
    url: https://github.com/spesmilo/electrum/commit/90fe30822561e515a9d2d6e5a352cc07780999eb
    says: "Validates signatures for wallet-owned inputs of mempool transactions"
    primary: true
  - name: Electrum 4.8.3 release notes
    url: https://raw.githubusercontent.com/spesmilo/electrum/4.8.3/RELEASE-NOTES
    says: "October 23 source release is a security update; binary release and disclosure followed October 24"
    primary: true
  - name: Electrum official downloads
    url: https://electrum.org/
    says: "Official 4.8.3 downloads and GPG verification instructions"
    primary: true
---

The malicious server withholds a newly broadcast payment and inserts a conflicting transaction with attacker-controlled outputs into the wallet's pending history. Its old signatures are invalid for those changed outputs. If the user then signs a replacement to increase the fee, the replacement authorizes the attacker payment.

This needs a malicious main server and a further user signature. It is not automatic seed theft. The original payment may never have reached Bitcoin peers. Even a transaction previously checked on a hardware wallet must be checked again when signing a fee bump.

Version 4.8.3 rejects invalid signatures on inputs belonging to the wallet before accepting mempool history. It does not turn this light client into a full consensus validator: incoming unconfirmed payments remain outside that added check.

The project received two reports and says one reporter lost money. It gives no total loss or wider victim count. Active exploitation in a widely used wallet warrants L4; no broader loss estimate is inferred.
