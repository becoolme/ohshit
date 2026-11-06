---
title: Istio November batch fixes mTLS and policy bypasses, secret disclosure and mesh denial of service
level: 3
date: '2026-11-06'
tags:
- Istio
- Service mesh
- Authorization
summary: Istio fixes eight advisories plus a JWKS-cache validation issue in 1.31.4 and 1.30.8. Conditional flaws bypass ambient mTLS, authorization or sidecar interception, expose multicluster
  secrets, and disrupt istiod/ztunnel. A debug-request crash requires a mesh identity. The vendor reports no exploitation in these notices.
splash: Istio 1.31.0–1.31.3 and 1.30.0–1.30.7; exposure varies by ambient, HBONE, policy, multicluster and mesh-identity use.
wipe: Upgrade to Istio 1.31.4+ or 1.30.8+; update control/data planes and verify the affected policies and traffic paths.
inTheWild: unknown
inTheWildNote: Reviewed vendor advisory and release notes do not report actual exploitation.
cves:
- id: GHSA-rr2c-p22p-6r9r
  score: 8.2
  name: Ambient port-level mTLS bypass
  description: A port-level STRICT PeerAuthentication can be skipped with workload PERMISSIVE/DISABLE under mesh-wide STRICT, allowing plaintext to the protected port.
- id: GHSA-7m6f-j3gp-2r53
  score: 6.5
  name: Host-header authorization bypass
  description: Different letter casing in a host value can bypass AuthorizationPolicy conditions on request.headers[:authority] or request.headers[host].
- id: GHSA-cxwg-46mx-q8hf
  score: 7.4
  name: Stale connection-tracking sidecar bypass
  description: Reusing a torn-down connection’s 4-tuple can match a stale ESTABLISHED entry and bypass sidecar interception with iptables or nftables.
- id: GHSA-635j-qv98-9275
  score: 7.7
  name: Authenticated debug request crashes istiod
  description: A workload with a mesh identity can send an invalid resource name in an istio.io/debug xDS request and crash-loop the mesh control plane.
- id: GHSA-8jw7-82jp-wr2c
  score: 6.3
  name: Empty ambient policy crashes istiod
  description: An ambient AuthorizationPolicy with an empty to/from entry that escapes webhook rejection can crash-loop istiod until the policy is removed.
- id: GHSA-gf6w-6mxv-5fj4
  score: 6.3
  name: Multicluster SDS secret disclosure
  description: A proxy can claim another cluster’s CLUSTER_ID to receive that cluster’s kubernetes:// secrets through SDS.
- id: GHSA-77vw-rg85-wx5x
  score: 6.5
  name: Malformed traceparent drops HBONE streams
  description: A malformed 55-byte traceparent header can terminate an inbound ztunnel HBONE connection task and drop its multiplexed streams.
- id: GHSA-9gqj-583v-mpqp
  score: 5.6
  name: HBONE client-IP DENY rules fail open
  description: On ambient waypoints and sidecars receiving HBONE, ipBlocks/notIpBlocks/source.ip can evaluate the internal listener address, allowing DENY rules to fail open.
fixed:
- product: Istio 1.31
  branch: '1.31'
  version: 1.31.4
- product: Istio 1.30
  branch: '1.30'
  version: 1.30.8
timeline:
- date: Nov 6, 2026
  title: Istio publishes security batch 2026-009 and both fixes
  body: The advisory and release notes cover eight GHSA entries and a separate periodic JWKS-refresh validation fix.
checklist:
- title: Roll out both control-plane and affected data-plane fixes
  hint: Inventory Istio revisions, istiod, sidecar/waypoint proxies, CNI interception and ztunnel components. Follow the official upgrade documentation for 1.31.4 or 1.30.8, including
    the data-plane rollout, and verify actual component versions rather than only updating a chart or CLI. Test mTLS, authorization, multicluster secret distribution and representative
    traffic after rollout. The notice does not establish safety of older release lines.
- title: Review the exact policy and topology prerequisites
  hint: Inspect ambient PeerAuthentication mesh/workload/port combinations, empty AuthorizationPolicy to/from entries, host-header conditions, sidecar interception rules and multicluster
    identities. For HBONE client-IP rules, the vendor’s workaround is remoteIpBlocks/notRemoteIpBlocks/remote.ip instead of ipBlocks/notIpBlocks/source.ip; test the intended trusted-proxy
    and client-IP behavior before adopting it. This addresses that policy issue only, not the whole batch.
- title: Preserve evidence and investigate abnormal mesh behavior
  hint: Review istiod and ztunnel restarts, rejected/debug xDS requests, unexpected plaintext or denied traffic being accepted, and suspicious cross-cluster SDS access using existing
    mesh and platform logs. If the empty-policy crash applies, locate/remove the offending empty to/from entry while applying fixes. Scope and rotate secrets only when exposure is established.
    The notices give no dedicated intrusion indicators; crashes or a matching configuration alone do not prove exploitation.
sources:
- name: Istio security advisory 2026-009
  url: https://istio.io/latest/news/security/istio-security-2026-009/
  primary: true
  says: Eight GHSA entries, topology/policy prerequisites, branch ranges, fixed versions and client-IP workaround.
- name: Istio 1.31.4 release notes
  url: https://istio.io/latest/news/releases/1.31.x/announcing-1.31.4/
  primary: true
  says: Confirms the eight fixes, JWKS periodic-refresh validation and control/data-plane-related changes.
- name: Istio 1.30.8 release notes
  url: https://istio.io/latest/news/releases/1.30.x/announcing-1.30.8/
  primary: true
  says: Confirms the backported security batch and corresponding fixes on the 1.30 line.
---

This is a new Istio advisory batch, distinct from the earlier eMudhra trust-anchor response. The conditions differ: not every installation is exposed to every bypass, and the debug crash requires a valid mesh identity. The JWKS fix validates periodically fetched responses before caching; it is not evidence of a new malicious key or confirmed customer data theft. No victim count or observed attack campaign is established. L3 reflects mainstream service-mesh security boundaries, not confirmed exploitation.
