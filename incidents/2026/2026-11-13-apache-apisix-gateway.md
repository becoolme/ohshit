---
title: Apache APISIX discloses seven gateway access-control vulnerabilities
level: 3
date: 2026-11-13
tags: [Apache APISIX, API gateway, authentication, authorization]
summary: Apache disclosed seven flaws fixed in APISIX 3.20.0, including a path normalization mismatch, spoofed identity headers and bypasses involving Keycloak, mTLS and MCP. Exposure depends on route, plugin and upstream configuration.
splash: APISIX through 3.19.0 with affected route or plugin configurations. See each advisory for the starting version and prerequisites.
wipe: Upgrade to 3.20.0 or later. Verify unauthorized requests fail and upstream identity headers come only from the gateway.
inTheWild: unknown
cves:
  - id: CVE-2026-124680
    score: 7.0
    name: Authentication bypass through path normalization
    description: From 0.9 through 3.19.0, an unauthenticated route can expose protected paths when both routes share an upstream that does not collapse encoded dot segments.
  - id: CVE-2026-124679
    score: 7.8
    name: Forged identity on skipped or degraded authentication
    description: From 3.18.0 through 3.19.0, tokenless jwe-decrypt requests can pass a caller-supplied value if strict is false and forward_header differs from the token header. A forward-auth request can do likewise if allow_degradation is enabled and the auth service is unavailable.
  - id: CVE-2026-124666
    score: 6.4
    name: Wolf identity headers survive authentication fallback
    description: From 3.8.0 through 3.19.0, multi-auth can retain caller-supplied Wolf identity headers when it falls back from wolf-rbac to another successful authenticator. This matters when the upstream trusts those headers.
  - id: CVE-2026-124716
    score: 6.4
    name: Keycloak partial grant bypass
    description: From 1.4.0 through 3.19.0, an authenticated caller with only part of the required grant can reach the upstream. This can include methods the authorization server denied.
  - id: CVE-2026-124723
    score: 6.3
    name: Encoded path bypasses mutual TLS
    description: From 3.18.0 through 3.19.0, enabling match_uri_encoded_slash with skip_mtls_uri_regex lets a client without a certificate reach a protected upstream when the request decodes to an exempt path.
  - id: CVE-2026-124726
    score: 6.9
    name: MCP call reaches undeclared API path
    description: In 3.19.0, an openapi-to-mcp caller can use a declared tool's HTTP method and the route's credentials to access an API path missing from the OpenAPI document.
  - id: CVE-2026-124719
    score: 2.3
    name: MCP call overrides a configured identity
    description: In 3.19.0, an openapi-to-mcp caller can spoof an upstream identity if the route adds an identity header that the document also declares.
fixed:
  - product: Apache APISIX
    version: 3.20.0
    status: First release fixing the seven advisories
timeline:
  - date: Nov 11, 2026
    title: Apache announces APISIX 3.20.0
    body: The release notes describe behavior changes and migration steps.
  - date: Nov 13, 2026
    title: Apache publishes the seven security advisories
    body: The notices identify affected releases and specific configuration prerequisites.
checklist:
  - title: Upgrade the gateway and migrate affected settings
    hint: Roll 3.20.0 or later across the gateway fleet. Review the release notes for route changes. In particular, move custom wolf-rbac header_prefix settings from Consumers to Routes or Services, including multi-auth entries. Ensure affected Consumers set appid. Remove any mcp-bridge configuration before deploying.
  - title: Check route and mTLS boundaries
    hint: Find public routes sharing upstreams with authenticated routes. Require upstream authorization or restrict the public route until patched. Test encoded dot segments and encoded slashes against protected routes in staging, including certificate-free requests that should fail. Review skip_mtls_uri_regex exemptions.
  - title: Test identity and permission failures
    hint: Verify upstreams reject spoofed identity headers on tokenless jwe-decrypt, failing forward-auth and multi-auth fallback paths. Disable fail-open authentication where feasible before upgrading. Test multi-scope Keycloak grants and method denials, and preserve gateway and upstream logs if access looks suspicious.
  - title: Limit the MCP tool surface
    hint: Compare tool paths and declared headers with the actual upstream API. Restrict callers and scope injected credentials to required endpoints. After upgrade, verify attempts to call undeclared paths or override gateway-owned identities fail.
sources:
  - name: Apache APISIX 3.20.0 release notes
    url: https://apisix.apache.org/blog/2026/11/11/release-apache-apisix-3.20.0/
    says: Gives deployment and migration instructions for the fixed release.
    primary: true
  - name: Apache APISIX CVE batch on oss-security
    url: https://www.openwall.com/lists/oss-security/2026/11/13/
    says: Links Apache's seven original advisory posts for this batch.
    primary: true
  - name: Apache CNA record for CVE-2026-124680
    url: https://cveawg.mitre.org/api/cve/CVE-2026-124680
    says: Confirms the routing conditions, release range and CVSS 4.0 score.
    primary: true
---

The path normalization flaw can let a request match an unauthenticated route at the gateway and resolve to a protected path at the upstream. The route must share an upstream with the protected route, and the upstream must handle encoded dot segments as described in Apache's advisory. Other bypasses depend on the corresponding plugins or TLS options. Apache's advisories do not report exploitation in the wild. The impact on gateway access controls warrants L3.
