---
title: "eMudhra CA intermediate private keys were so weak that every one was a number below 256"
headline: "eMudhra: eight CA keys you could guess on a pocket calculator"
level: 4
date: 2026-10-17
tags: [PKI, CA, TLS]
ecosystems: [go, python, node, browsers]
summary: >-
  Eight intermediate certificates (six TLS, two code signing) under emSign ECC Root CA - G3, cross-signed by
  Sectigo, had P-384 private keys that were integers below 256. Anyone could recover them instantly and mint
  certificates for any domain.
splash: "Anything trusting emSign ECC Root CA - G3 or the Sectigo cross-signs: browsers, OSes, Go, Python, Node"
wipe: "Update browsers and OSes, certifi 2026.10.19, Go 1.27.3 / 1.26.10, Node 22.23.4+; block the 8 intermediates in custom trust stores"
inTheWild: "no"
inTheWildNote: No end-entity certs found in CT logs; blocked within hours
oneLiner: >-
  A certificate authority's key is supposed to be a 384-bit secret; these were numbers you could count to on
  your fingers and toes, so anyone could sign “trusted” certificates for any website.
cves:
  - id: CVE-2026-111943
    name: Go crypto/x509 trusts the compromised intermediates
    description: Go's root and intermediate handling accepted the weak eMudhra chain. Fixed in Go 1.27.3 and 1.26.10; no fix for 1.25 and older.
  - id: CVE-2026-113470
    name: Firefox trusts the compromised intermediates
    description: Firefox fix that distrusts the eight intermediates and removes the root.
fixed:
  - { product: Go, version: 1.27.3 / 1.26.10, status: "CVE-2026-111943. Go 1.25 and older get no fix" }
  - { product: Python certifi, version: 2026.10.19 }
  - { product: Node.js, version: 22.23.4 / 24.22.1 / 26.12.1, status: Ships NSS 3.131.1 CA bundle }
  - { product: Mozilla NSS, version: 3.131.1, status: Root removed Oct 20 }
  - { product: Cloudflare WARP / 1.1.1.1 / cloudflared, version: 2026.10.2 }
  - { product: Java (cacerts), version: unknown, status: Not covered by sources we reviewed. Check your vendor }
timeline:
  - date: Apr 30, 2025
    title: The keys are generated, in a batch of 24 intermediates
  - date: Oct 17, 2026
    title: A researcher reports to Chrome (18:05 UTC) and Mozilla (20:06 UTC)
    body: Chrome CRLSet blocks the six TLS intermediates by 19:45 UTC; Mozilla OneCRL by 22:59 UTC. Mozilla recovers the keys itself.
  - date: Oct 18, 2026
    title: All eight revoked as caCompromise
    body: Per the Mozilla bug. eMudhra's own statement dates the revocation to Oct 19.
  - date: Oct 19, 2026
    title: Apple and Android block the certificates; certifi ships a fix
  - date: Oct 20, 2026
    title: Microsoft blocks them; Go releases fixes; NSS removes the root
  - date: Oct 21, 2026
    title: Node.js security release rejects the keys
  - date: ~Oct 27, 2026
    title: Chrome Root Store v43 removes the emSign ECC Root CA - G3
checklist:
  - title: Update browsers and operating systems
    hint: Chrome, Firefox, Safari, Edge, Android and Windows have all shipped blocks
  - title: Update language trust stores
    hint: certifi 2026.10.19, Go 1.27.3 / 1.26.10, Node 22.23.4 / 24.22.1 / 26.12.1
  - title: Patch custom trust stores
    hint: Java cacerts, internal CA bundles, appliances, distroless images
  - title: Check code-signing trust
    hint: Two of the eight were code-signing CAs that Microsoft trusted
  - title: Search your CT monitor for emSign-issued certs
    hint: Anything on your domains you didn't request is a red flag
sources:
  - name: Mozilla Bugzilla 2083449
    url: https://bugzilla.mozilla.org/show_bug.cgi?id=2083449
    says: Keys are integers below 256; report times, OneCRL entries and revocation on Oct 18
    primary: true
  - name: eMudhra statement
    url: https://emudhra.com/en/post/certificate-security-incident
    says: Blames a key wrap/unwrap flaw; says 7 were never used in production and the 8th issued no certificates
    primary: true
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/eight-emudhra-ca-keys-compromised.html
    says: Quotes Scott Helme that one key was literally 4; vendor block timeline
  - name: BleepingComputer
    url: https://www.bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates/
    says: Browser and OS vendor response
---

A certificate authority's private key is the thing that makes "this is really your bank" true. For eight
eMudhra intermediate certificates, the P-384 private keys were **integers below 256**. One of them,
according to researcher Scott Helme, was literally the number 4. Anyone who noticed could have signed a
certificate for any domain, and every client trusting the chain would have believed it.

The intermediates sat under **emSign ECC Root CA - G3** and were **cross-signed by Sectigo**, which widened
who trusted them. Six were TLS CAs and two were code-signing CAs that Microsoft trusted. eMudhra blames a
key wrap/unwrap flaw that produced a weak batch of keys.

### Why L4 and not L5

A broken trust anchor is normally a Shitstorm. We graded it down after the review:

- There is no sign that anyone abused it. Certificate Transparency logs show no end-entity certificates
  from these intermediates.
- Browsers blocked them within hours of the report, and every major platform followed within three days.

The long tail is the real risk: language runtimes, Java `cacerts`, appliances and old containers that
still carry the old bundle.

There is one open question. The Mozilla bug mentions roughly 30,000 subscriber certificates to migrate,
which conflicts with eMudhra's statement that no end-entity certificates were issued from these keys.
