---
title: Header Accordions research exposes HTTP/3 QPACK denial-of-service paths across multiple stacks
headline: "HTTP/3: compressed headers, overflowing pipes"
level: 3
tags:
  - HTTP/3
  - DoS
  - QPACK
ecosystems:
  - quic-go
  - quiche
  - bun
  - rust
  - python
summary: FoxIO published cross-stack QPACK research and reproductions on October 20. Missing or late decoded-header limits can exhaust memory or hang servers. Several components were patched earlier; Bun, hyperium h3 and aioquic/mitmproxy had unresolved paths at disclosure.
splash: Applications exposing affected HTTP/3 stacks; Wireshark also has a separate capture-dissection issue
wipe: Upgrade patched libraries; disable exposed Bun HTTP/3 and mitmproxy HTTP/3, and bound decoded headers in h3
inTheWild: no
inTheWildNote: Public reproduction code; no confirmed in-the-wild attacks in the cited reports
cves:
  - id: CVE-2025-64702
    score: 5.3
    name: quic-go decoded-header memory exhaustion
    description: Decoded headers exceed the compressed-size budget on clients and servers.
  - id: CVE-2026-12523
    score: 7.5
    name: Cloudflare quiche resource exhaustion
    description: HTTP/3 frame allocation and QPACK accounting permit excessive memory use.
  - id: CVE-2025-13945
    name: Wireshark HTTP/3 dissector crash
    description: Decrypting HTTP/3 traffic or loading captures with decryption secrets can crash the dissector.
fixed:
  - product: quic-go
    version: 0.57.0
  - product: Cloudflare quiche
    version: 0.29.3
  - product: lsquic
    version: 4.9.0
  - product: Wireshark
    version: 4.6.2 / 4.4.12
  - product: Bun / hyperium h3 / aioquic
    version: none
    status: No fix documented by FoxIO at October 20 disclosure
timeline:
  - date: 2025–2026
    title: Individual component advisories and fixes published
  - date: Oct 20, 2026
    title: FoxIO publishes the cross-stack study and reproduction code
checklist:
  - title: Inventory HTTP/3 library versions in applications and proxies
  - title: Upgrade affected libraries to vendor-fixed releases
  - title: Disable exposed Bun HTTP/3 and use --set http3=false for mitmproxy until fixed
  - title: Configure a bounded max_field_section_size in hyperium h3
  - title: Monitor memory and CPU on HTTP/3 endpoints
sources:
  - name: FoxIO original research
    url: https://foxio.io/blog/header-accordions-qpack-amplification-attacks-against-http-3-servers
    primary: true
    says: October 20 cross-stack disclosure, reproduction code, unresolved stacks and mitigations
  - name: quic-go advisory
    url: https://github.com/quic-go/quic-go/security/advisories/GHSA-g754-hx8w-x2g6
    primary: true
    says: CVE-2025-64702, CVSS 5.3; fixed in 0.57.0
  - name: Cloudflare quiche advisory
    url: https://github.com/cloudflare/quiche/security/advisories/GHSA-4fgf-9xrr-88gf
    primary: true
    says: CVE-2026-12523, CVSS 7.5; earliest fixed version 0.29.3
  - name: lsquic official releases
    url: https://github.com/litespeedtech/lsquic/releases
    primary: true
    says: 4.9.0 limits buffered header sets to cap memory use
  - name: Wireshark advisory
    url: https://www.wireshark.org/security/wnpa-sec-2025-07.html
    primary: true
    says: CVE-2025-13945; fixed in 4.6.2 and 4.4.12; no known exploits
date: 2026-10-20
---

This entry tracks the newly published cross-stack study, not a claim that every listed CVE was disclosed this week. Old version numbers remain relevant when applications bundle an outdated library. Public reproductions and mainstream dependencies justify L3; the cited material does not establish active attacks.
