---
title: Tor 0.4.9.17 strengthens IPv6 defenses during a relay DDoS attack
level: 4
date: 2026-11-13
tags: [Tor, DDoS, IPv6]
summary: The Tor Project says a flood of client circuits affected most relay operators. Its emergency 0.4.9.17 release makes the relay's denial-of-service defenses count IPv6 clients by /64 prefix rather than by individual address.
splash: Operators of Tor relays on older releases, especially relays receiving abusive client traffic over IPv6.
wipe: Upgrade relays to Tor 0.4.9.17 or later promptly. The Tor Project requires no extra configuration after the upgrade.
inTheWild: 'yes'
inTheWildNote: Tor confirmed an ongoing relay DDoS and released an emergency mitigation.
fixed:
  - { product: Tor, version: 0.4.9.17 }
timeline:
  - date: Oct 28, 2026
    title: Tor adds defenses against a flood of directory requests
    body: Tor 0.4.9.15 adds limits for BEGIN_DIR requests. The project warns that the limits do not stop the flood of circuit creation.
  - date: Nov 13, 19:35 UTC
    title: Tor releases 0.4.9.17 while the attack continues
    body: The release groups IPv6 clients by /64 for DoS tracking. The Tor Project says most relay operators have been affected and that it is evaluating more defenses.
checklist:
  - title: Upgrade the relay package
    hint: Install Tor 0.4.9.17 or later from your trusted package source or the Tor Project's release downloads. Restart the relay if your package manager does not do it and check the service startup log to confirm the running version.
  - title: Check how the relay behaves after upgrading
    hint: Review your relay's logs and existing traffic or resource monitoring for continued overload. The project does not require new torrc settings for this fix. If the relay is still struggling, report observations to tor-relays or the Tor bug tracker.
sources:
  - name: Tor Project 0.4.9.17 release announcement
    url: https://forum.torproject.org/t/security-release-0-4-9-17/22454
    says: Confirms the ongoing DDoS, the effect on relay operators and the urgent upgrade recommendation.
    primary: true
  - name: Tor maintainer release email and changelog
    url: https://www.mail-archive.com/tor-announce%40lists.torproject.org/msg00340.html
    says: Records the IPv6 /64 change, the release version and identifier TROVE-2026-031.
    primary: true
  - name: Tor maintainer's October relay guidance
    url: https://forum.torproject.org/t/tor-relays-tor-0-4-9-15-released-new-dos-defenses/22331
    says: Explains the earlier directory request limits and why relays could still face heavy circuit traffic.
    primary: true
---

During an ongoing distributed denial-of-service attack, a large volume of client circuits overloaded relays across the Tor network. The November release addresses a weakness in how the relay tracks IPv6 clients for its denial-of-service defenses. Before the change, the relay tracked each IPv6 address separately, so traffic from many addresses within one /64 received separate accounting. Version 0.4.9.17 groups that traffic by prefix. The Tor Project tracks the change as TROVE-2026-031. The announcement confirms the circuit flood and leaves open which techniques the attackers used.

The Tor Project was still evaluating further defenses when it published the release. In the same release, it removed the bastet directory authority's keys over a possible compromise. The changelog does not confirm that those keys were compromised or link their removal to the circuit flood.
