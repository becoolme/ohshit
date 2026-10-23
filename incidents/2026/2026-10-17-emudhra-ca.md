---
title: "eMudhra CA intermediate private keys were so weak that every one was a number below 256"
headline: "eMudhra: eight CA keys you could guess on a pocket calculator"
level: 4
date: 2026-10-17
updated: 2026-10-23
tags: [PKI, CA, TLS]
ecosystems: [go, python, node, browsers]
summary: >-
  Eight intermediate certificates (six TLS, two code signing) under emSign ECC Root CA - G3, cross-signed by
  Sectigo, had P-384 private keys that were integers below 256. Anyone could recover them instantly and mint
  certificates for any domain.
splash: "Anything trusting emSign ECC Root CA - G3 or the Sectigo cross-signs: browsers, OSes, Go, Python, Node"
wipe: "Update browsers, OSes and trust stores (certifi 2026.10.19, Go 1.27.3 / 1.26.10, Node 22.23.4+); replace certs under emSign ECC G3 before ~Oct 27"
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
  - id: GHSA-6q48-6c7w-9gw2
    name: certifi bundled root removal
    description: Advisory lists 2026.10.18; Python security guidance recommends 2026.10.19 for compatibility with unaffected roots.
  - id: GHSA-hq85-5cpj-mr62
    name: uv bundled root removal
    description: uv before 0.13.4 trusts the affected root by default; system or custom stores require separate verification.
fixed:
  - { product: Go, version: 1.27.3 / 1.26.10, status: "CVE-2026-111943. Go 1.25 and older get no fix" }
  - { product: Python certifi, version: 2026.10.19 }
  - { product: Node.js, version: 22.23.4 / 24.22.1 / 26.12.1, status: Ships NSS 3.131.1 CA bundle }
  - { product: Mozilla NSS, version: 3.131.1, status: Root removed Oct 20 }
  - { product: Cloudflare WARP / 1.1.1.1 / cloudflared, version: 2026.10.2 }
  - { product: Java (cacerts), version: unknown, status: Not covered by sources we reviewed. Check your vendor }
  - { product: pip, version: 26.2.2, status: Requires Python 3.10+; update pip separately in each environment }
  - { product: uv, version: 0.13.4, status: Refreshes bundled CA roots }
  - { product: sigstore-python, version: 4.5.1, status: Python security team’s recommended minimum }
  - { product: conda, version: 26.9.4, status: Also update CA packages in other environments }
  - { product: Pixi, version: 0.82.1, status: Updates bundled CA dependencies }
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
  - date: Oct 20, 2026
    title: Python security guidance lists packaging-tool updates
    body: Update pip in each environment; system distrust alone does not replace its bundled CA roots.
  - date: Oct 21, 2026
    title: Conda publishes package-manager and CA-bundle instructions
  - date: Oct 21, 2026
    title: Node.js security release rejects the keys
  - date: Oct 21, 2026
    title: Docker rebuilds Sandboxes templates with updated CA certificates
    body: Existing sandboxes must be recreated from fresh images; updating sbx alone is insufficient.
  - date: Oct 22, 2026
    title: eMudhra announces withdrawal from global SSL/TLS issuance
    body: Partner replacements are free; revocation and status services continue until all issued certificates expire or are replaced. No exit date is given.
  - date: ~Oct 27, 2026
    title: Chrome Root Store v43 removes the emSign ECC Root CA - G3
checklist:
  - title: Update browsers and operating systems
    hint: Chrome, Firefox, Safari, Edge, Android and Windows have all shipped blocks
  - title: Update language trust stores
    hint: certifi 2026.10.19, Go 1.27.3 / 1.26.10, Node 22.23.4 / 24.22.1 / 26.12.1
  - title: Upgrade pip in every virtual environment
    hint: Use the hash-pinned wheel linked in the Python security announcement; confirm pip 26.2.2+ before upgrading other packages
  - title: Update the other Python package and verification tools you use
    hint: uv 0.13.4, sigstore-python 4.5.1, conda 26.9.4, Pixi 0.82.1; check CI tools and separately installed copies
  - title: Refresh conda and Mamba CA packages and rebuild images
    hint: Update certifi and ca-certificates in each relevant environment; update mamba/libmamba together and rebuild containers without layer caching
  - title: Patch custom trust stores
    hint: Java cacerts, internal CA bundles, appliances, distroless images
  - title: Check code-signing trust
    hint: Two of the eight were code-signing CAs that Microsoft trusted
  - title: Replace any certificate of yours that chains to emSign ECC Root CA - G3
    hint: Reissue from another CA. The eight intermediates already fail, and Chrome drops the root around Oct 27
  - title: Search your CT monitor for emSign-issued certs
    hint: Anything on your domains you didn't request is a red flag
  - title: Refresh Docker Sandboxes templates and recreate existing sandboxes
    hint: Save files and unpushed commits first; create with --pull always. Updating sbx alone does not refresh existing sandboxes
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
  - name: Docker security announcements
    url: https://docs.docker.com/security/security-announcements/
    says: Rebuilt built-in Sandboxes templates; recreate existing sandboxes with --pull always after saving local work
    primary: true
  - name: eMudhra SSL/TLS business exit announcement
    url: https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business
    says: Board approves withdrawal; partner replacements and continued revocation/status services; no completion date specified
    primary: true
  - name: Chrome and Android Security Teams
    url: https://blog.google/security/protecting-chrome-and-android-users-from-compromised-emudhra-intermediate-ca-certificates/
    says: Removing the root also breaks legitimate chains; replacement certificates must use another trusted hierarchy; rollout expected October 27 PDT
    primary: true
  - name: Python security guidance
    url: https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576
    says: Tool minimums, hash-pinned pip bootstrap, per-environment updates and container rebuilds; pip also uses bundled roots
    primary: true
  - name: uv security advisory
    url: https://github.com/astral-sh/uv/security/advisories/GHSA-hq85-5cpj-mr62
    says: uv 0.13.4 removes the root; verify system/custom stores if overriding bundled defaults
    primary: true
  - name: certifi security advisory
    url: https://github.com/certifi/python-certifi/security/advisories/GHSA-6q48-6c7w-9gw2
    says: Root removal in 2026.10.18; Python guidance recommends the compatibility follow-up 2026.10.19
    primary: true
  - name: Conda security update instructions
    url: https://conda.org/blog/2026-10-21-emudhra-security-updates/
    says: Conda 26.9.4 and Pixi 0.82.1; separate CA-package updates, channel-specific minimums and Mamba build checks
    primary: true
  - name: pip 26.2.2 release
    url: https://github.com/pypa/pip/releases/tag/26.2.2
    says: Official release tag dated October 20
    primary: true
  - name: sigstore-python 4.5.1 release
    url: https://github.com/sigstore/sigstore-python/releases/tag/v4.5.1
    says: Release referenced by the Python security team
    primary: true
  - name: Pixi 0.82.1 release
    url: https://github.com/prefix-dev/pixi/releases/tag/v0.82.1
    says: Updates webpki-root-certs to 1.0.10 and rustls-webpki to 0.103.16 for this incident
    primary: true
  - name: pip 26.2.2 package metadata
    url: https://pypi.org/pypi/pip/26.2.2/json
    says: Requires Python 3.10 or newer
    primary: true
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

**Correction, October 22:** Our earlier text treated roughly 30,000 certificates needing migration as conflicting with the claim that the eight weak intermediates issued no end-entity certificates. Google explains that removing the parent root also breaks legitimate certificates under other intermediates. These are different populations; the migration count does not establish issuance from the compromised keys.

**Update, October 22:** Docker now documents rebuilt Sandboxes templates with refreshed CA certificates. Updating the CLI or cached templates does not update existing sandboxes. Save local files and unpushed commits before recreating them from newly pulled images. This changes the cleanup guidance, not the L4 assessment.

**Further update, October 22:** eMudhra’s board has decided to exit the global SSL/TLS certificate business. It promises free replacement certificates through partners and continued revocation/status services until every issued certificate expires or is replaced. The exit date and partners are unspecified. Its remaining RSA hierarchy is under Chrome review, so do not treat the vendor’s transition plan as a guarantee of future browser trust. Replace affected site certificates promptly; Chrome expects root removal on October 27 PDT.

**Update, October 23:** Earlier guidance omitted package managers that bundle their own roots. Update pip separately in every environment, even after updating system certificates or standalone certifi. Use the hash-pinned bootstrap in the Python security announcement. pip 26.2.2 requires Python 3.10 or newer; older interpreters need a compatible remediation plan, not an assumption that their CA bundle is safe. The additional minimums above come from Python and tool maintainers; they do not replace the runtime updates or October 27 certificate-migration deadline. For conda, update CA packages outside the base environment too. Mamba rebuilds may retain the same version, so inspect package builds as well.
