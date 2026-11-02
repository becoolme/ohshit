---
title: Fastify HTTP proxy lets decoded route parameters escape enforced upstream paths
level: 3
date: '2026-11-02'
tags:
- Node.js
- Fastify
- SSRF
ecosystems:
- npm
- node
summary: '@fastify/http-proxy 9.0.0 through 11.6.5 can let unauthenticated requests escape a fixed upstream path when parameterized prefix and rewritePrefix enforce path limits. Depending on the upstream, this enables SSRF or authorization bypass. Upgrade to 11.6.6; the advisory lists no workaround.'
splash: Apps using @fastify/http-proxy 9.0.0–11.6.5 with parameterized prefix/rewritePrefix as upstream path restrictions
wipe: Upgrade @fastify/http-proxy to 11.6.6 or later and verify upstream path restrictions; no vendor workaround is listed
inTheWild: unknown
inTheWildNote: The maintainer advisory does not report real-world exploitation.
cves:
- id: CVE-2026-120213
  score: 9.1
  name: Decoded-parameter prefix escape
  description: Decoded path separators and query/fragment delimiters alter the upstream path and remove its enforced suffix.
fixed:
- product: '@fastify/http-proxy'
  version: 11.6.6
  status: Patched; affected range >=9.0.0, <11.6.6
timeline:
- date: Nov 2, 2026
  title: Maintainers publish the advisory and identify 11.6.6 as patched
checklist:
- title: Find affected proxy configurations
  hint: Check deployed dependency versions and lockfiles, then find @fastify/http-proxy registrations using parameters in prefix and rewritePrefix to limit upstream paths. Exposure depends on this use of path restrictions, not just on installing Fastify.
- title: Upgrade and redeploy every affected service
  hint: Use @fastify/http-proxy 11.6.6 or later, regenerate the lockfile through your normal dependency process and verify the version in the deployed service. The maintainer lists no workaround; do not treat a proxy restart alone as a fix.
- title: Verify boundaries and investigate unexpected paths
  hint: In your own test environment, confirm encoded separators and query/fragment delimiters cannot remove the intended upstream suffix. Review proxy and upstream logs for access outside allowed paths, and investigate unauthorized data access or changes. Such requests alone do not prove successful compromise.
sources:
- name: Fastify maintainer advisory GHSA-h3vp-4jfr-v364
  url: https://github.com/fastify/fastify-http-proxy/security/advisories/GHSA-h3vp-4jfr-v364
  primary: true
---

The proxy inserts URL-decoded route parameters into rewritePrefix without re-encoding them. A decoded slash together with a fragment or query delimiter can add path segments and discard the required suffix without using parent-directory traversal. The attack needs a reachable vulnerable proxy configuration; the resulting access depends on the upstream’s own authorization. This is not a general compromise of Fastify or all proxy deployments.

GHSA-h3vp-4jfr-v364 identifies the affected range and patch. The public advisory includes request examples, but does not confirm exploitation or publish a victim count.
