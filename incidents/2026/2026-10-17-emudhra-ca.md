---
title: "eMudhra CA intermediate private keys were so weak that every one was a number below 256"
headline: "eMudhra: eight CA keys you could guess on a pocket calculator"
level: 4
date: 2026-10-17
updated: '2026-11-06'
tags: [PKI, CA, TLS]
ecosystems: [go, python, node, browsers]
summary: Eight emSign ECC G3 intermediates (six TLS/two code signing, Sectigo-cross-signed) had P-384 keys below 256, enabling forged certificates. Update Dart/Flutter/Firestore and CA bundles. Chrome 153+ will distrust G1 TLS certificates with earliest SCT after Nov 16, 23:59:59 UTC; earlier SCTs are unaffected by this new rule.
splash: "Clients trusting ECC G3/Sectigo on attacker-controlled network paths; G1 TLS sites issuing certificates past Chrome’s SCT cutoff."
wipe: "Update OSes, browsers and app CA bundles (certifi 2026.10.19; Go 1.27.3/1.26.10; Node 22.23.4+). Replace affected certificates now."
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
  - id: GHSA-frr6-h895-5pxp
    name: Dart and Flutter trust compromised intermediates
    description: Network-path attackers can intercept dart:io HTTPS on Android and Windows, plus Linux retaining affected roots; rebuild with patched SDKs.
  - id: CVE-2026-91403
    score: 9.1
    name: Oracle Java intermediate-certificate distrust update
    description: Oracle's October 21 JSSE alert covers the compromised eMudhra intermediates; its initial update is distinct from the later root-removal fix.
  - id: CVE-2026-114820
    score: 9.1
    name: Oracle Java root-certificate removal update
    description: Oracle's October 24 JSSE alert removes related roots in Java SE and GraalVM; attackers need a trusted affected chain and a network path to intercept TLS.
  - id: CVE-2026-117611
    score: 7.1
    name: Checkmk bundled CA trust
    description: Checkmk certifi and webpki-roots bundles retain trust for the affected hierarchy. An attacker must intercept the TLS connection; this is the same eMudhra event, not a newly compromised CA.
  - id: GHSA-5xjx-3w67-w9x9
    score: 9.3
    name: PyPI publishing action bundled CA trust
    description: The action bundles certifi roots used by its Sigstore dependency; the advisory lists 1.14.3 as patched.
  - id: GHSA-2xm2-c8xx-p9vh
    name: Python grpcio bundled CA trust
    description: Affected grpcio bundled roots require 1.78.2, 1.80.1, 1.82.3, 1.83.2 or 1.84.1 for the corresponding release line; updating OS roots or certifi alone does not replace this store.
  - id: GHSA-p3vr-xp4c-r8fh
    name: Ruby grpc bundled CA trust
    description: Affected Ruby grpc bundled roots require 1.78.2, 1.80.1, 1.82.3, 1.83.2 or 1.84.1 for the corresponding release line, independently of OS updates.
  - id: GHSA-gvrc-7wf9-p7hg
    name: PHP grpc/grpc bundled CA trust
    description: Composer grpc/grpc before 1.84.1 uses an affected bundled trust store.
  - id: GHSA-m4gc-hcgx-wmc7
    name: Google Java API client bundled CA trust
    description: google-api-client before 2.9.2 can load affected bundled roots through newTrustedTransport(); JDK stores require separate updates.
  - id: GHSA-mm89-g5jq-mmfq
    score: 9.1
    name: Objective-C gRPC CocoaPod bundled CA trust
    description: The gRPC CocoaPod before 1.84.1, including gRPC-ProtoRPC dependencies, needs upgrading and application rebuilds; standalone Core/C++ CocoaPods and grpc-ios SPM do not use this store.
fixed:
  - { product: Go, version: 1.27.3 / 1.26.10, status: "CVE-2026-111943. Go 1.25 and older get no fix" }
  - { product: Python certifi, version: 2026.10.19 }
  - { product: Node.js, version: 22.23.4 / 24.22.1 / 26.12.1, status: Ships NSS 3.131.1 CA bundle }
  - { product: Mozilla NSS, version: 3.131.1, status: Root removed Oct 20 }
  - { product: Cloudflare WARP / 1.1.1.1 / cloudflared, version: 2026.10.2 }
  - { product: Java (cacerts), version: unknown, status: Oracle October 24 root-removal patches available; exact fixed builds require vendor verification. Other JDKs and custom stores need separate checks }
  - { product: pip, version: 26.2.2, status: Requires Python 3.10+; update pip separately in each environment }
  - { product: uv, version: 0.13.4, status: Refreshes bundled CA roots }
  - { product: sigstore-python, version: 4.5.1, status: Python security team’s recommended minimum }
  - { product: conda, version: 26.9.4, status: Also update CA packages in other environments }
  - { product: Pixi, version: 0.82.1, status: Updates bundled CA dependencies }
  - { product: Dart SDK stable / beta, version: 3.13.7 / 3.14.0-315.3.beta, status: Rebuild and redistribute affected applications }
  - { product: Flutter SDK stable / beta, version: 3.47.8 / 3.50.0-0.2.pre, status: Rebuild with patched Dart SDK }
  - { product: FirebaseFirestore for Apple, version: 13.1.1 / 12.19.3, status: CocoaPods uses 12.19.3; republish apps }
  - { product: FlutterFire cloud_firestore (Apple / Windows), version: 7.1.0 / 6.10.1 (Apple) / 6.10.2 (Windows), status: Rebuild and republish apps }
  - { product: Firebase Unity SDK, version: 14.1.0 / 13.17.1, status: Firestore on Apple and desktop; rebuild and republish }
  - { product: Firebase C++ SDK, version: 14.1.0 / 13.13.1, status: Firestore on Apple and desktop; rebuild and republish }
  - { product: Firebase App Distribution Gradle plugin, version: 5.3.1, status: Refresh CI dependencies; app republication not required }
  - { product: Checkmk 2.4, version: 2.4.0p39, status: Patched }
  - { product: Checkmk 2.3, version: 2.3.0p52, status: Patched }
  - { product: Checkmk 2.5, version: 2.5.0p18, status: Patched; released November 2 }
  - { product: Checkmk 2.2, version: none, status: End of life; migrate to a supported fixed line }
  - { product: pypa/gh-action-pypi-publish, version: 1.14.3, status: Refresh pinned action references as well as local tools }
  - product: httplib2
    version: 0.32.1
    status: Used when certifi is absent from affected Python HTTP transports
  - product: Python grpcio / Ruby grpc
    version: 1.78.2 / 1.80.1 / 1.82.3 / 1.83.2 / 1.84.1
    status: Use the patch for the corresponding release line; bundled roots are separate from OS roots
  - product: Java google-api-client
    version: 2.9.2
    status: For GoogleNetHttpTransport.newTrustedTransport(); also update JDK/custom stores
  - product: Google Cloud Java libraries-bom
    version: 26.91.0
    status: Alternatively update service libraries to a -2.9.2 suffix or declare google-api-client 2.9.2
  - product: Spring Framework on Google Cloud
    version: 8.3.1 / 7.5.2 / 6.5.12 / 3.9.19
    status: Use the patch for your release line; imports libraries-bom 26.91.0
  - product: PHP google/gax
    version: 1.51.2
    status: Pulls grpc/grpc 1.84.1 or later
  - product: C++ gRPC fallback roots
    version: 1.84.1
    status: Rebuild if bundled roots.pem is used instead of a system store
  - product: rustls-webpki
    version: 0.103.16
    status: Rebuild and redeploy; RUSTSEC-2026-0382
  - product: webpki-root-certs / webpki-roots
    version: 1.0.10
    status: Update whichever root-store crate the application uses; RUSTSEC-2026-0383 / 0381
  - product: Java google-api-client-apache-v5
    version: 2.9.0
    status: Separate artifact; advisory lists 2.7.0–2.8.1 as affected; also patch the JDK trust store
  - { product: "Istio 1.31", version: "1.31.3", status: "Updated images, Go build and ztunnel trust handling" }
  - { product: "Istio 1.30", version: "1.30.7", status: "Updated images, Go build and ztunnel trust handling" }
  - { product: "Istio 1.29", version: "1.29.10", status: "Exceptional EOL release; CA-bundle fix only for Go components; migrate to 1.30+" }
  - { product: "In-cluster Cloud Service Mesh 1.31", version: "1.31.3-asm.3", status: "GCP-2026-076 patched bundle" }
  - { product: "In-cluster Cloud Service Mesh 1.30", version: "1.30.7-asm.3", status: "GCP-2026-076 patched bundle" }
  - { product: "In-cluster Cloud Service Mesh 1.29", version: "1.29.10-asm.0", status: "GCP-2026-076 patched bundle; 1.28 and earlier are EOL" }
  - product: PHP grpc/grpc
    version: 1.84.1
    status: Composer package; Python/Ruby backport versions must not be inferred for PHP
  - product: Objective-C gRPC CocoaPod
    version: 1.84.1
    status: Rebuild applications; excludes standalone gRPC-Core/gRPC-C++ CocoaPods and grpc-ios SPM
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
  - date: Oct 21, 2026
    title: Sonatype reports Java fingerprint-blocklist bypasses
    body: Re-encoded intermediates passed tested configurations; removing the relevant roots rejected both tested chains.
  - date: Oct 21, 2026
    title: Oracle publishes the initial intermediate-distrust alert
    body: CVE-2026-91403 covers Java SE and GraalVM; a later alert removes related roots.
  - date: Oct 21, 2026
    title: PyPI publishing-action advisory identifies a bundled CA fix
  - date: Oct 22, 2026
    title: eMudhra announces withdrawal from global SSL/TLS issuance
    body: Partner replacements are free; revocation and status services continue until all issued certificates expire or are replaced. No exit date is given.
  - date: Oct 23, 2026
    title: Dart advisory and Firebase guidance identify application-level fixes
    body: SDK updates require rebuilt and redistributed clients; the Gradle plugin needs only an update in build pipelines.
  - date: Oct 24, 2026
    title: Oracle issues a root-removal update
    body: CVE-2026-114820 and revised operational guidance supersede reliance on intermediate fingerprint blocking alone.
  - date: Oct 26, 2026
    title: Checkmk 2.3.0p52 ships CA-store fixes
  - date: Oct 27, 2026
    title: Checkmk 2.4.0p39 ships CA-store fixes
  - date: Oct 27, 2026
    title: Google expands Cloud and Firebase operational guidance
    body: Self-managed trust stores, Cloud CLI and COS nodes need specific updates; managed services are being updated.
  - date: Oct 28, 2026
    title: eMudhra clarifies the affected customer migration
    body: The vendor places roughly 30,800 G3-hierarchy certificates in a US client ecosystem using a temporary G1 RSA issuance pathway; no firm date for ending G1 TLS issuance is given.
  - date: Oct 28, 2026
    title: Objective-C advisory identifies the affected CocoaPod and rebuild requirement
    body: GHSA-mm89-g5jq-mmfq belongs to the same CA event. gRPC CocoaPod 1.84.1 fixes the store; GRPC_DEFAULT_SSL_ROOTS_FILE_PATH does not work for this transport.
  - date: Oct 29, 2026
    title: Checkmk publishes CVE-2026-117611 for its bundled trust stores
    body: At this update, 2.5.0p18 was still marked unreleased; system CA updates do not replace every bundled store.
  - date: Nov 2, 2026
    title: Checkmk 2.5.0p18 becomes available
    body: The official download archive lists this release for November 2; the CA-store fixes are no longer only an announced target.
  - date: Nov 2, 2026
    title: Google publishes language-specific Cloud SDK trust-store remediation
    body: GCP-2026-075 separates bundled transports, runtimes and system stores; update the actual trust path and rebuild applications. Google reports no Cloud infrastructure breach or evidence of exploitation against Cloud workloads.
  - date: Nov 2, 2026
    title: Google publishes Cloud Service Mesh trust-store patch bundles
    body: GCP-2026-076 lists in-cluster bundles 1.31.3-asm.3, 1.30.7-asm.3 and 1.29.10-asm.0. Managed Cloud Service Mesh updates automatically with no customer action required.
  - date: Nov 3, 2026
    title: Google adds Apigee outbound TLS remediation
    body: GCP-2026-077 distinguishes managed platform rollouts, image-local Hybrid stores, manual OPDK remediation and customer-managed TrustStores. No Hybrid patch version is named.
  - date: Nov 4, 2026
    title: Chrome announces a separate SCT cutoff for emSign Root CA - G1
    body: Certificates whose earliest SCT is after November 16 23:59:59 UTC will lose default trust in Chrome 153 and higher. Earlier SCTs are unaffected by this new restriction; explicit local trust overrides it. Rollout aims to coincide with Chrome 158 Stable on November 17 and may change.
  - date: Nov 5, 2026
    title: gRPC advisories specify Python and Ruby backports
    body: Python’s 01:44:12 UTC and Ruby’s 02:01:37 UTC revisions list 1.82.3, 1.83.2 and 1.84.1. PHP Composer still lists only 1.84.1; do not infer older-line PHP patches from other languages.
  - date: Nov 5, 2026
    title: eMudhra reports additional G1 migration deadlines and regional progress
    body: The issuer reports a November 16 SCT cutoff for Chrome and Mozilla and all-G1 Apple removal on November 30. It says migration is complete outside the US, where transition continues. Browser policy details remain subject to each root program.
  - date: Nov 5, 2026
    title: gRPC releases root-store fixes for two more older lines
    body: Releases 1.78.2 and 1.80.1 include root-store fixes. The Python and Ruby advisories now list these alongside 1.82.3, 1.83.2 and 1.84.1. PHP Composer retains its separate 1.84.1 minimum.
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
  - title: Verify Java trust paths beyond fingerprint blocklists
    hint: For Oracle runtimes, install the October 24 root-removal patch or follow ops.java/emudhra/ to back up cacerts, remove its four listed roots, and restart every installation. For other JDKs and custom stores, follow their vendor guidance. Test TLS dependencies and monitor failures; fingerprint blocking alone failed Sonatype's tests
  - title: Patch custom trust stores
    hint: Internal CA bundles, appliances and distroless images need separate updates; an OS update does not refresh every application bundle
  - title: Check code-signing trust
    hint: Two of the eight were code-signing CAs that Microsoft trusted
  - title: Replace any certificate of yours that chains to emSign ECC Root CA - G3
    hint: Reissue from another CA now. The eight intermediates are revoked; Chrome’s published root-removal target was around October 27, a past deadline. Verify current client trust rather than waiting for that date.
  - title: Search your CT monitor for emSign-issued certs
    hint: Anything on your domains you didn't request is a red flag
  - title: Refresh Docker Sandboxes templates and recreate existing sandboxes
    hint: Save files and unpushed commits first; create with --pull always. Updating sbx alone does not refresh existing sandboxes
  - title: Rebuild Dart and Flutter clients
    hint: Use Dart 3.13.7 or Flutter 3.47.8 with patched Dart; beta minimums are 3.14.0-315.3.beta and 3.50.0-0.2.pre. Rebuild and distribute binaries. Android and Windows ignore OS intermediate blocklists; Linux exposure depends on its CA bundle
  - title: Ship updated Firestore clients and refresh App Distribution CI
    hint: Use the platform-specific SDK versions above. Rebuild, republish and prompt users to update Firestore apps; browser or OS fixes alone do not replace embedded bundles. Update the App Distribution Gradle plugin to 5.3.1+ and refresh CI dependencies; this plugin needs no app republication
  - title: Apply Google Cloud guidance to the layers you manage
    hint: Update gcloud CLI and OS/custom-image trust stores. For COS, upgrade or restart nodes onto current milestones, or follow the cos_ca_cert_mitigation guidance. Check GKE’s linked version matrix and each managed service’s notices; Google fleet updates do not replace customer image/SDK updates. Google reports no infrastructure breach or exploitation against Cloud workloads.
  - title: Update Checkmk sites and the affected agent components
    hint: Use 2.5.0p18, 2.4.0p39 or 2.3.0p52 for the corresponding line; 2.5.0p18 was released November 2, and 2.2 is EOL. Refresh Linux agent updaters in Pro/Ultimate/Cloud editions and Windows Python-based agent plug-ins as applicable. check_httpv2 always consults its built-in roots; toggling Use system wide CAs does not remove exposure. Cron-launched site processes may use bundled certifi; also update OS/site CA stores.
  - title: Update the PyPI publishing action in CI
    hint: Use pypa/gh-action-pypi-publish 1.14.3 or later, including replacing older commit-SHA pins. Updating runner or local certifi alone does not replace the action’s bundled copy.
  - title: Update Python, Ruby and PHP transport dependencies
    hint: For Python, use certifi 2026.10.19+, httplib2 0.32.1+ (its bundle is used without certifi), and grpcio 1.84.1+. For Ruby, update grpc to 1.84.1+ or update google-cloud-* gems to pull it in. For PHP, update grpc/grpc to 1.84.1+ or google/gax to 1.51.2+. Update the OS store for REST paths too; do not assume gRPC reads system roots. The PHP PECL extension itself does not bundle roots; its system store still needs updating. Explicitly supplied gRPC root sets need separate verification. Python grpcio and Ruby grpc can also use 1.78.2, 1.80.1, 1.82.3 or 1.83.2 on the corresponding release line. The advisory API groups 1.81.x with the 1.82.3 patch path; do not assume an unlisted 1.79.x patch exists. PHP grpc/grpc retains its advisory’s 1.84.1 minimum. For Ruby’s temporary workaround, patch system CAs first and set GRPC_DEFAULT_SSL_ROOTS_FILE_PATH=/etc/ssl/certs/ca-certificates.crt before process startup on Debian; a missing/unreadable file falls back to bundled roots. PHP-FPM clears worker environments by default; configure env[GRPC_DEFAULT_SSL_ROOTS_FILE_PATH] in the pool if using that workaround and verify it takes effect.
  - title: Verify Google Java clients and legacy gRPC transports
    hint: For newTrustedTransport(), use google-api-client 2.9.2+ or libraries-bom 26.91.0+. Service-library-only builds need a -2.9.2 or later suffix or an explicit client dependency. Spring line patches are 8.3.1, 7.5.2, 6.5.12 and 3.9.19 or later. Before 2.9.0, Apache newTrustedTransport() methods also use bundled roots; update the separate google-api-client-apache-v5 artifact from affected 2.7.0–2.8.1 to 2.9.0+. Direct transport constructors use the JDK store. Separately update JDK and Windows roots. Migrate deprecated Node grpc npm to @grpc/grpc-js and .NET Grpc.Core to Grpc.Net.Client.
  - title: Rebuild the actual C++, Rust, Go and Swift trust paths
    hint: 'For C++ fallback roots.pem, relink gRPC 1.84.1+ and update system/image roots. Run cargo update for Rust; verify rustls-webpki 0.103.16+ and the used webpki-root-certs or webpki-roots 1.0.10+. Rebuild Go with the patched toolchains above and current base images. Swift AsyncHTTPClient/grpc-swift-2 uses system stores: update the OS; do not apply the separate Objective-C CocoaPod fix to Swift by assumption. Redistribute rebuilt apps or redeploy images.'
  - title: Check the root fingerprints actually loaded by applications
    hint: 'GCP-2026-075 says to verify absence of all three: emSign ECC Root CA - G3, SHA-256 86:A1:EC:BA:08:9C:4A:8D:3B:BE:27:34:C6:12:BA:34:1D:81:3E:04:3C:F9:E8:A8:62:CD:5C:57:A3:6B:BE:6B; emSign Root TLS CA - G3, 7D:D7:8D:5F:4F:13:45:9A:83:DF:F9:AB:BB:A6:2E:DB:AF:6F:2D:10:2B:F2:57:FD:71:2F:4D:9F:27:46:ED:8D; AAA Certificate Services, D7:A7:A0:FB:5D:7E:27:31:D7:71:E9:48:4E:BC:DE:F7:1D:5F:0C:3E:0A:29:48:78:2B:C8:3E:E0:EA:69:9E:F4. Verify rebuilt images and each independent trust store. Presence means trust remains; it does not prove an attack.'
  - title: Patch Istio and the Cloud Service Mesh bundle you actually run
    hint: For upstream Istio, use 1.31.3, 1.30.7 or the exceptional 1.29.10 release; 1.29 is EOL and its Go 1.25 build lacks the Go key-distrust fix, so migrate to 1.30+. For in-cluster Google Cloud Service Mesh, use 1.31.3-asm.3, 1.30.7-asm.3 or 1.29.10-asm.0; 1.28 and earlier are EOL. Managed Cloud Service Mesh updates automatically. Check DestinationRule SIMPLE TLS without caCertificates/credentialName, RequestAuthentication jwksUri fetches and XDS_ROOT_CA=SYSTEM. Mesh-issued mTLS certificates are unaffected. Redeploy updated sidecars/gateways and workloads as appropriate; if upstream upgrades must wait, use explicit trusted CA credentials or caCrl for affected external TLS paths, not disabled verification.
  - title: Audit every Apigee outbound TLS trust path
    hint: Back up keystores, trust stores and configuration; test changes outside production. Inspect TargetEndpoint, TargetServer, ServiceCallout SSLInfo and outbound JWKS lookups. Review custom TrustStores in every environment; managed platform updates do not remove certificates customers uploaded. Check the affected root fingerprints above and the compromised intermediate names in GCP-2026-077; a match shows remaining trust, not an observed attack.
  - title: Separate Apigee managed rollouts from Hybrid image upgrades
    hint: 'Google describes Apigee X and Edge SaaS platform-default remediation as in progress; do not call it complete. Audit custom stores now. Hybrid embeds isolated CA stores inside its containers and does not bind-mount host CA stores: upgrade to patched images once Google releases them. The bulletin names no fixed Hybrid version; an OS-only update is insufficient.'
  - title: Remediate Apigee Edge Private Cloud on every node
    hint: 'Follow GCP-2026-077: update ca-certificates and extract OS trust on RHEL/CentOS/Rocky. For FIPS using the shipped BCFKS store, first create a customer-owned store using the linked FIPS Option A; Edge updates overwrite the shipped store. Inspect and remove the actual affected aliases with the correct provider/store password, preserve apigee:apigee ownership, then perform the documented rolling stop/start of Apigee services across all nodes. Also audit or create explicit outbound target TrustStores.'
  - title: Replace affected backend certificates before removing their trust
    hint: Inspect backend certificate issuers. Replace and reissue eMudhra-issued backend certificates through a trusted CA, then remove affected aliases from custom stores. In the console use Apigee > Management > Environments > TLS Keystores, inspect aliases and delete the affected certificates. Update SSLInfo to a validated TrustStore; ref:// references take effect without proxy redeployment, while direct-name references require redeploying the proxy. Test outbound TLS/mTLS and JWKS-dependent flows; never disable verification to restore connectivity.
  - title: Plan replacement of newly issued G1-rooted TLS certificates
    hint: Inspect the served chain and earliest Signed Certificate Timestamp, not just NotBefore or expiry. For emSign Root CA - G1 (not the already removed ECC G3 root), Chrome 153+ will reject default trust when the earliest SCT is later than November 16, 2026 23:59:59 UTC. Coordinate migration to another trusted CA hierarchy before new issuance or renewal crosses that cutoff, and test the chain in Chrome. Earlier SCTs are unaffected by this specific change, not guaranteed universally trusted. Audit enterprise/user explicit trust such as Windows GPO, which overrides these SCT constraints; do not add such an override as a routine workaround. Follow the linked Root Program notice for rollout revisions.
  - title: Rebuild Apple applications using the Objective-C gRPC CocoaPod
    hint: Inspect Podfile.lock for gRPC, including transitive gRPC-ProtoRPC dependencies. Upgrade to 1.84.1 or later, rebuild and redistribute the application; an iOS/macOS update alone is insufficient. The advisory excludes standalone gRPC-Core/gRPC-C++ CocoaPods and grpc-ios Swift Package Manager; other products’ bundled stores still require their own checks. GRPC_DEFAULT_SSL_ROOTS_FILE_PATH does not work here.
  - title: Confirm the broader G1 replacement schedule with your issuer
    hint: eMudhra’s November 5 Update 8 reports Apple will remove trust for all G1-chained certificates on November 30, unlike the SCT-based rules it reports for Chrome and Mozilla on November 16. Obtain and test a replacement chain through established support before the applicable cutoff, including existing Apple-facing certificates. US migration remains in progress according to the issuer. Verify each browser root program; retain Chrome’s precise UTC rule above and never bypass validation.
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
  - name: Dart SDK security advisory
    url: https://github.com/dart-lang/sdk/security/advisories/GHSA-frr6-h895-5pxp
    says: October 23 advisory; Android and Windows ignore OS intermediate blocks; Linux depends on its CA bundle; stable and beta fixes listed
    primary: true
  - name: Firebase eMudhra remediation guide
    url: https://firebase.google.com/support/guides/compromised-emudhra-intermediate-ca
    says: Platform-specific SDK and Gradle plugin updates; installed apps need redistributed binaries; Firebase backends unaffected
    primary: true
  - name: Sonatype Java blocklist research
    url: https://www.sonatype.com/blog/the-limits-of-fingerprint-blocklists-a-reproducible-java-certificate-bypass
    says: Tested re-encodings bypassed exact-fingerprint blocks; root removal rejected both tested chains; results limited to tested configurations
    primary: true
  - name: Oracle CVE-2026-91403 alert
    url: https://www.oracle.com/security-alerts/alert-cve-2026-91403.html
    says: October 21 intermediate-distrust update; affected Java SE and GraalVM releases
    primary: true
  - name: Oracle CVE-2026-114820 alert
    url: https://www.oracle.com/security-alerts/alert-cve-2026-114820.html
    says: October 24 root-removal update; its version table lists affected releases, not fixed builds
    primary: true
  - name: Oracle JDK operational guidance
    url: https://ops.java/emudhra/
    says: October 24 guidance includes per-runtime keystore backup, root removal and restart, revocation checks and CheckCerts.java
    primary: true
  - name: Google Cloud GCP-2026-071
    url: https://docs.cloud.google.com/support/bulletins#gcp-2026-071
    primary: true
    says: October 27 update; customer-managed trust stores, gcloud/COS/GKE guidance and managed-service rollout, without an infrastructure breach.
  - name: Checkmk Werk 22169
    url: https://checkmk.com/werk/22169
    primary: true
    says: Built-in HTTP-check roots remain relevant regardless of the system-CA toggle; fixed versions include 2.5.0p18, now listed in the vendor download archive.
  - name: Checkmk Werk 22623
    url: https://checkmk.com/werk/22623
    primary: true
    says: Identifies Linux updater, Windows Python plug-ins and external site-process exposure through bundled certifi.
  - name: Checkmk CNA record
    url: https://cveawg.mitre.org/api/cve/CVE-2026-117611
    primary: true
    says: October 29 publication; CVSS 4.0 score 7.1 and affected Checkmk versions.
  - name: Checkmk 2.3.0p52 release
    url: https://forum.checkmk.com/t/release-checkmk-stable-release-2-3-0p52/60718
    primary: true
    says: October 26 release includes both CA-store fixes.
  - name: Checkmk 2.4.0p39 release
    url: https://forum.checkmk.com/t/release-checkmk-stable-release-2-4-0p39/60722
    primary: true
    says: October 27 release includes both CA-store fixes.
  - name: PyPA publishing-action advisory
    url: https://github.com/pypa/gh-action-pypi-publish/security/advisories/GHSA-5xjx-3w67-w9x9
    primary: true
    says: Lists 1.14.3 as patched; description and affected-version metadata differ at the 1.14.2 boundary.
  - name: PyPA 1.14.3 release
    url: https://github.com/pypa/gh-action-pypi-publish/releases/tag/v1.14.3
    primary: true
  - name: Checkmk official download archive
    url: https://checkmk.com/download/archive
    primary: true
    says: Lists Checkmk 2.5.0p18 dated November 2 with edition and platform packages
  - name: Google Cloud SDK language-specific remediation
    url: https://docs.cloud.google.com/support/bulletins#gcp-2026-075
    primary: true
    says: 'November 2 GCP-2026-075: per-language transport/client/system-store updates and verification fingerprints; GCP-2026-071 adds SDK Libraries the same day.'
  - name: gRPC Python advisory
    url: https://github.com/grpc/grpc/security/advisories/GHSA-2xm2-c8xx-p9vh
    primary: true
    says: Original bundled-root advisory; upgrade and custom trust-store caveats.
  - name: gRPC Ruby advisory
    url: https://github.com/grpc/grpc/security/advisories/GHSA-p3vr-xp4c-r8fh
    primary: true
    says: Original bundled-root advisory; upgrade and custom trust-store caveats.
  - name: gRPC PHP advisory
    url: https://github.com/grpc/grpc/security/advisories/GHSA-gvrc-7wf9-p7hg
    primary: true
    says: Original bundled-root advisory; upgrade and custom trust-store caveats.
  - name: Google Java API client advisory
    url: https://github.com/googleapis/google-api-java-client/security/advisories/GHSA-m4gc-hcgx-wmc7
    primary: true
    says: Original transport-specific scope and mitigation; Java additionally covers the separate Apache v5 artifact.
  - name: Google Cloud Service Mesh GCP-2026-076
    url: https://docs.cloud.google.com/service-mesh/docs/security-bulletins#gcp-2026-076
    primary: true
    says: November 2 advisory gives three in-cluster patched bundles and says managed deployments update automatically.
  - name: Istio ISTIO-SECURITY-2026-008
    url: https://istio.io/latest/news/security/istio-security-2026-008/
    primary: true
    says: Upstream fixes, public-CA trust prerequisites, Go 1.25 limitation, ztunnel distrust and external-TLS workarounds; mesh-issued mTLS is unaffected.
  - name: Google Apigee GCP-2026-077 security bulletin
    url: https://docs.cloud.google.com/apigee/docs/security-bulletins/security-bulletins#gcp-2026-077
    primary: true
    says: 'Published November 3: managed rollout still in progress, Hybrid image-local stores, OPDK OS/FIPS/custom-store steps and target certificate/redeployment checks. No patched Hybrid version specified.'
  - name: Chrome Root Program November 4 G1 trust-constraint notice
    url: https://groups.google.com/a/ccadb.org/g/public/c/DU8p98nyQWc/m/R33zS9UIBgAJ
    primary: true
    says: Original policy distinguishes G1 from removed ECC G3, specifies earliest-SCT cutoff, Chrome versions, intended November 17 rollout and explicit-local-trust exception.
  - name: gRPC Objective-C original security advisory
    url: https://github.com/grpc/grpc/security/advisories/GHSA-mm89-g5jq-mmfq
    primary: true
    says: Published October 28; GHSA-mm89-g5jq-mmfq scopes the gRPC CocoaPod, 1.84.1 fix, rebuild requirement, excluded packages and unsupported environment-variable workaround.
  - name: gRPC Python advisory API
    url: https://api.github.com/repos/grpc/grpc/security-advisories/GHSA-2xm2-c8xx-p9vh
    primary: true
    says: Lists five Python patch thresholds, including 1.78.2 and 1.80.1; 1.81.x is included in the 1.82.3 path.
  - name: gRPC Ruby advisory API
    url: https://api.github.com/repos/grpc/grpc/security-advisories/GHSA-p3vr-xp4c-r8fh
    primary: true
    says: Lists five Ruby patch thresholds, independently of the PHP Composer and Objective-C advisories.
  - name: gRPC 1.78.2 release
    url: https://github.com/grpc/grpc/releases/tag/v1.78.2
    primary: true
    says: November 5 release includes the security update to repository roots.
  - name: gRPC 1.80.1 release
    url: https://github.com/grpc/grpc/releases/tag/v1.80.1
    primary: true
    says: November 5 release includes the security update to repository roots.
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

### Application bundles and Java mitigation gaps

**Update, October 24:** The [Dart advisory](https://github.com/dart-lang/sdk/security/advisories/GHSA-frr6-h895-5pxp) covers network-path interception of `dart:io` HTTPS on Android and Windows, plus Linux environments retaining affected roots. Its exclusion of web and Apple verification does not exempt separately bundled Firestore TLS libraries.

[Firebase](https://firebase.google.com/support/guides/compromised-emudhra-intermediate-ca) lists Firestore fixes for native Apple apps, FlutterFire on iOS/macOS/Windows, and Unity or C++ on iOS/Linux/macOS/Windows. These client SDK scopes differ from the Dart advisory above. Ship rebuilt apps and have users install them. Cloud Firestore and App Distribution backends were unaffected.

[Sonatype](https://www.sonatype.com/blog/the-limits-of-fingerprint-blocklists-a-reproducible-java-certificate-bypass) found that alternate encodings of ECDSA- and RSA-signed intermediates escaped Java fingerprint blocks in its tests. Removing relevant roots blocked both chains, with potential disruption to legitimate connections. Verify each deployed runtime and trust store with vendor guidance; this is a laboratory mitigation bypass, not evidence of attacks or a universal claim about every JDK.

**Update, October 25:** Oracle's October 24 alert, CVE-2026-114820, now provides root-removal patches after its October 21 intermediate-distrust alert, CVE-2026-91403. Both belong to this same incident. The public version table identifies affected builds, not safe ones; obtain the matching patch through Oracle's availability document. Keep the other runtime and application updates above. No exploitation is established by these alerts.

For an unpatched Oracle runtime, the [operational guide](https://ops.java/emudhra/) gives an alternative: back up `cacerts`, remove `emsignrootcag1 [jdk]`, `emsignrootcag2 [jdk]`, `emsigneccrootcag3 [jdk]` and `comodoaaaca [jdk]`, then restart each installed runtime. JDK 8 uses `$JDK_HOME/jre/lib/security/cacerts`; JDK 11+ uses `$JDK_HOME/lib/security/cacerts`. Test legitimate certificate chains before removal, monitor failures afterward, and check application-specific stores separately. The guide also documents revocation-checking options and a verification tool.

**Update, October 28:** Google’s October 27 bulletin separates managed-service rollout from customer-controlled trust stores, custom images and bundled clients. Review its service-specific guidance; the affected-product list does not establish that Cloud backends were breached. Existing runtime, SDK and certificate-replacement instructions still apply.

**Update, October 29:** In its October 28 update, eMudhra says roughly 30,800 certificates under the affected G3 hierarchies belong to a US client ecosystem now using its G1 RSA issuance pathway. It plans to end TLS issuance through G1 once that transition completes, without a firm date. This vendor migration figure does not establish issuance by the eight weak-key intermediates or exploitation. G1 is not a guarantee of continued browser trust; the replacement and trust-store updates above remain necessary.

**Further update, October 29:** Checkmk assigns CVE-2026-117611 (CVSS 4.0 7.1) to the same CA-trust incident. Its HTTP check always consults bundled roots; the system-CA setting cannot bypass this exposure. Bundled Python trust affects Linux agent updaters in Pro/Ultimate/Cloud editions, Windows Python plug-ins, and processes launched outside the site environment with neither SSL_CERT_FILE nor REQUESTS_CA_BUNDLE set. Processes started by `omd start` or a site shell use the site CA file instead. Update each relevant bundle and the OS/site store. At that October 29 update, the 2.5.0p18 milestone was not yet released; an announced target was not an installed fix. This adds product remediation, not evidence of exploitation.

**November 1 addition:** PyPA’s October 21 advisory covers this same trust-store event, not a separate compromise of PyPI publishing. Its metadata includes 1.14.2 as affected while prose says versions before 1.14.2; both direct users to 1.14.3. Update the action itself rather than assuming a runner CA update is sufficient. The advisory does not establish theft of publishing credentials.

**Update, November 2:** The vendor download archive now lists Checkmk 2.5.0p18 dated November 2 with edition/platform package metadata. Werks 22169 and 22623 list it as carrying the bundled CA-store fixes, without their earlier unreleased marker. This supersedes the earlier availability warning, not the need to update affected sites and agent components or separate OS/site trust stores. It is not new evidence of exploitation.

**November 3 addition, following the November 2 official update:** GCP-2026-075 explains that Google Cloud SDK Libraries usually inherit trust from transport dependencies, runtimes or the OS; Java google-api-client before 2.9.2 is the exception. For GoogleNetHttpTransport.newTrustedTransport(), versions before 2.9.0 use the bundled store, while 2.9.0/2.9.1 fall back to it if the JDK store cannot be loaded. Direct transport constructors use the JDK store and need its vendor update. Updating a Cloud SDK alone does not prove all applications are fixed. Python grpcio, Ruby grpc and PHP grpc/grpc use bundled roots rather than system roots; deprecated Node grpc and .NET Grpc.Core require migration. Apply the added checklist to actual dependencies, verify removal of all three roots and rebuild, redistribute or redeploy. Google again reports no infrastructure breach or telemetry evidence of exploitation against Cloud workloads. This is downstream remediation of the same CA event.

**November 2 mesh guidance:** Google’s GCP-2026-076 adds the three in-cluster Cloud Service Mesh patch bundles above; managed deployments need no customer action. The linked Istio advisory separates public-root trust from mesh-issued mTLS. Its older 1.29 line gets updated CA images but no Go 1.25 key-distrust backport. This is the existing compromised-CA incident, not a new breach of mesh signing keys.

**November 4 follow-up to GCP-2026-077 (published November 3):** Apigee outbound TLS can still trust the compromised chain through default or customer-managed stores. An attacker needs a network interception position and a trusted forged chain; this bulletin is not evidence of an Apigee breach or exploitation. X and Edge SaaS platform-default updates are described as rolling out, while all products still require customer TrustStore review. Hybrid needs updated container images once released, not merely host CA updates. OPDK requires OS/JVM trust remediation and service restarts. Plan backend certificate replacement before removing trust to avoid breaking legitimate target connections. Existing runtime, SDK, mesh and certificate-replacement actions above remain necessary.

**November 4 Chrome policy:** The Root Program adds a separate constraint for **emSign Root CA - G1**. TLS server certificates whose earliest SCT is after **November 16, 2026 23:59:59 UTC** will no longer be trusted by default in Chrome 153 and higher. Certificates at or before the cutoff are unaffected by this particular change; it is not a blanket assurance about other trust checks. The intended rollout coincides with Chrome 158 Stable on November 17, and the programme may revise the date or accelerate restrictions. Explicit platform/user/enterprise trust overrides these SCT constraints. This G1 policy decision does not establish another stolen key, new forged certificate or actual interception, and does not replace the existing ECC G3 removal or runtime/SDK updates.

**November 5 gRPC clarification:** Python and Ruby advisories now specify 1.82.3 / 1.83.2 / 1.84.1 patch paths. The earlier 1.84.1-only description needs this release-line qualification; PHP Composer still lists 1.84.1. The October 28 Objective-C advisory is also incorporated: it covers the gRPC CocoaPod, including gRPC-ProtoRPC dependencies, and requires an upgraded, rebuilt and redistributed app. Standalone Core/C++ CocoaPods and grpc-ios SPM are excluded from this specific store, and the environment-variable workaround does not apply. This is neither a new CA compromise nor new evidence of attacks.

**November 5 issuer update:** eMudhra reports that migration to other providers is complete outside the US, with US customers still transitioning. It reports November 16 SCT constraints for Chrome/Mozilla and November 30 removal of all G1 certificates on Apple platforms, including earlier issuance. This is the issuer’s account of the schedules; Chrome’s independently read precise cutoff remains above. No completed US transition or universal continued trust of earlier certificates is established.

**November 6 correction to older-line coverage:** The November 5 releases 1.78.2 and 1.80.1 also repair the bundled root store. The Python and Ruby advisories now list five patch paths. Use the patch matching the installed release line or migrate to 1.84.1 or later; versions 1.81.x need the 1.82.3 path. This extends the earlier three-version guidance without changing the PHP Composer or Objective-C minimums. The requirement to verify explicit/custom roots and rebuild or restart affected applications remains. It does not establish another CA compromise or new exploitation.
