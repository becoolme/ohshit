---
title: Zoraxy discloses public-proxy SSRF and an admin log-viewer takeover chain
level: 3
date: '2026-11-24'
tags: [Zoraxy, reverse proxy, SSRF, XSS]
summary: Zoraxy through 3.3.5-rc1 can expose internal HTTP responses through ACME routing. Crafted client-IP headers can also plant scripts in the admin log viewer; missing Cookie protections allow session theft. Public PoCs are available. Upgrade to stable 3.3.5 or later; the initial fix was 3.3.5-rc2.
splash: Unpatched public Zoraxy listeners; the XSS path also needs an administrator to view a poisoned log.
wipe: Upgrade binaries and Docker deployments to stable 3.3.5 or later; restrict exposure and investigate suspicious logs.
inTheWild: unknown
inTheWildNote: The primary advisories provide PoCs, without establishing attacks against real victims.
cves:
- id: CVE-2026-105303
  score: 5.1
  name: Stored XSS in the admin log viewer
  description: Unauthenticated requests with crafted client-IP headers poison logs; viewing the affected log runs scripts in the administrator's origin.
- id: CVE-2026-129544
  score: 5.9
  name: Missing admin session Cookie protections
  description: The Cookie lacks HttpOnly, Secure and SameSite attributes. Script execution in the admin origin can expose a replayable session; the missing flags alone do not steal it.
- id: CVE-2026-105304
  score: 7.7
  name: ACME challenge routing SSRF
  description: An unauthenticated public-listener request can trigger HTTP GET requests to internal hosts and expose response bodies, even without configured ACME issuance.
fixed:
- product: Zoraxy stable
  version: 3.3.5
  status: Available stable release containing the fixes
- product: Zoraxy release candidate
  version: 3.3.5-rc2
  status: Initial fixed prerelease; affected versions end at 3.3.5-rc1
timeline:
- date: Sep 27, 2026
  title: Initial fixed release candidate ships
  body: The maintainer publishes 3.3.5-rc2; the coordinated advisory later identifies it as the fix boundary.
- date: Nov 13, 2026
  title: Stable 3.3.5 ships
  body: The stable release incorporates the release-candidate changes.
- date: Nov 24, 2026
  title: Coordinated advisories and proof-of-concept details become public
  body: JVN publishes three CVEs; the maintainer publishes the corresponding technical advisories and PoCs later that day.
checklist:
- title: Update every binary and container deployment
  hint: Compare the deployed Zoraxy version with the affected boundary, 3.3.5-rc1 and earlier. Install stable 3.3.5 or later and replace/redeploy Docker images, then verify the running version. The initial fixed 3.3.5-rc2 is a prerelease; 3.3.5 is available as a stable update.
- title: Restrict public access while arranging the update
  hint: If immediate updating is impossible, limit access to the proxy listener at the network perimeter. Turning off ACME issuance or only hiding the admin interface does not remove the SSRF route. The vulnerable ACME handler bypasses Zoraxy's system access-control rules; do not rely on those rules as the sole barrier.
- title: Review log handling without opening poisoned entries in an unpatched admin page
  hint: Inspect retained access logs as text for markup in CF-Connecting-IP, Fastly-Client-IP or X-Forwarded-For values. The affected /api/log/summary unique_ips field reaches the admin log viewer without escaping. Suspicious entries are leads, not proof of successful takeover; preserve evidence and update before using that viewer.
- title: Investigate possible admin or internal-service exposure
  hint: If exploitation is suspected, restrict access and review unexpected administrator accounts, proxy routes, TLS settings and internal-service requests. Treat potentially exposed session tokens, TLS private keys and internal credentials as compromised and arrange their invalidation/replacement; verify that old sessions actually stop working. Updating alone does not undo changes already made by an injected script.
sources:
- name: JVN coordinated Zoraxy advisory
  url: https://jvn.jp/en/jp/JVN84156789/
  primary: true
  says: November 24 disclosure, three CVE mappings, CVSS 4.0 scores, affected boundary and Docker update advice.
- name: Zoraxy maintainer ACME SSRF advisory
  url: https://github.com/tobychui/zoraxy/security/advisories/GHSA-w5fw-j7jw-8977
  primary: true
  says: Public listener, automatic handler registration, GET-only internal requests, returned response bodies and a public PoC.
- name: Zoraxy maintainer log-viewer XSS advisory
  url: https://github.com/tobychui/zoraxy/security/advisories/GHSA-qw75-66p2-hcg9
  primary: true
  says: Crafted client-IP headers, poisoned unique_ips, administrator log review and the PoC.
- name: Zoraxy maintainer session Cookie advisory
  url: https://github.com/tobychui/zoraxy/security/advisories/GHSA-qxf8-qqg6-54xc
  primary: true
  says: Missing Cookie attributes, replayable admin sessions and required script execution in the admin origin.
- name: Zoraxy initial fixed release candidate
  url: https://github.com/tobychui/zoraxy/releases/tag/v3.3.5-rc2
  primary: true
  says: Release published September 27; the later coordinated advisory identifies this as the initial fixed version.
- name: Zoraxy stable 3.3.5 release
  url: https://github.com/tobychui/zoraxy/releases/tag/v3.3.5
  primary: true
  says: November 13 stable release incorporating the release candidates and security changes.
---

The November 24 disclosure concerns three related security boundaries, with fixes already available. It does not date the vulnerability disclosure to the earlier release day. Rated L3 because the maintainer supplies public PoCs for a reverse proxy's internal-network and administrator boundaries; the sources do not establish a real-world victim count or exploitation campaign. Scores above use JVN's CVSS 4.0 values.

The ACME handler registers at startup even if certificate issuance is not configured. It matches a substring in the raw request target, then concatenates that target into a localhost URL. A specially formed target changes the parsed destination, letting a client reach an arbitrary host and port accessible to Zoraxy and read the response. The method is HTTP GET; this is not by itself arbitrary code execution. Loopback services, Docker-internal services and cloud metadata may be reachable, subject to their own protections.

The log-viewer path starts with an unauthenticated request to a proxied site. An attacker-controlled client-IP header is logged and returned in the summary's unique_ips field, then inserted as HTML when an administrator views that log. The script can use the authenticated admin API. Closing or reloading the page ends that script's execution, but changes it already made can remain. The separate Cookie flaw permits token theft and replay if script runs in the admin origin; the missing flags alone do not execute code. The maintainer reports session lifetimes of one hour, or up to seven days with remember-me enabled. Do not infer effective browser SameSite behavior solely from an omitted attribute.
