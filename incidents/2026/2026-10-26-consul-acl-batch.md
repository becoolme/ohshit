---
title: "Consul fixes five flaws spanning mesh private keys, ACL bypasses and API denial of service"
level: 3
date: 2026-10-26
tags: [Consul, Kubernetes, ACL, service-mesh]
ecosystems: [consul, kubernetes]
summary: "HashiCorp's five October 26 advisories cover unauthenticated cached mesh certificate/key access, service and health-check authorization bypasses, unauthenticated API memory exhaustion, and consul-k8s cross-namespace privilege escalation. Preconditions differ by flaw."
splash: "Reachable Consul agent HTTP APIs; ACL-enabled mesh deployments; consul-k8s with global.acls.manageSystemACLs=true"
wipe: "Update Consul CE to 2.1.0, Enterprise to 2.1.0/1.21.19, and consul-k8s to 2.1.0/1.8.18 as applicable; restrict agent API access"
inTheWild: unknown
inTheWildNote: "HashiCorp's five advisories do not report malicious exploitation"
cves:
  - id: CVE-2026-105765
    name: Cached mesh leaf certificate authorization bypass
    description: "Affected Consul/Enterprise releases from 1.17.0 through 2.0.4, excluding the fixed Enterprise 1.21.19 release, can return an already-cached service leaf certificate and private key without validating an ACL token. Requires ACLs enabled and access to the agent HTTP API; its default loopback binding limits remote exposure."
  - id: CVE-2026-105608
    name: Proxy escape-hatch permission bypass
    description: "Affected releases are Consul 2.0.4 and Enterprise 2.0.4, 1.22.12 and 1.21.18. With ACLs enabled, a principal with write access to the proxy and destination service but without mesh write can bypass override-key checks and supply Envoy configuration."
  - id: CVE-2026-105626
    name: Unbounded HTTP request memory consumption
    description: "Affected Consul/Enterprise releases through 2.0.4, excluding the fixed Enterprise 1.21.19 release, decode request bodies without a size cap before ACL checks. An attacker who can reach the HTTP API can exhaust agent memory without a valid token."
  - id: CVE-2026-115804
    name: Cross-service health-check authorization bypass
    description: "Affected Consul/Enterprise releases from 0.7.2 through 2.0.4, excluding the fixed Enterprise 1.21.19 release, with ACLs enabled allow a principal with service:write for another service on the same node to modify or rebind an existing health check, affecting discovery or mesh routing."
  - id: CVE-2026-110720
    name: Cross-namespace consul-k8s component authentication
    description: "The advisory identifies consul-k8s 0.42.0 through 2.0.4, except fixed 1.8.18, with system ACL management enabled. An attacker able to create a ServiceAccount and obtain its token in another namespace, and reach the Consul API, can obtain a component's Consul privileges."
fixed:
  - product: Consul Community Edition
    version: 2.1.0
    status: Upgrade affected community installations
  - product: Consul Enterprise 2.x
    version: 2.1.0
    status: Vendor-listed fixed release
  - product: Consul Enterprise 1.x
    version: 1.21.19
    status: Vendor-listed fixed release; no separate 1.22 fix is listed
  - product: consul-k8s 2.x
    version: 2.1.0
    status: Fix for component ACL binding rules
  - product: consul-k8s 1.x
    version: 1.8.18
    status: Fix for component ACL binding rules
timeline:
  - date: Oct 26, 2026
    title: HashiCorp publishes HCSEC-2026-46 through HCSEC-2026-50
    body: Five advisories identify distinct attack prerequisites and fixed Consul, Enterprise and consul-k8s releases.
checklist:
  - title: Upgrade the actual Consul agents and Kubernetes integration
    hint: "Inventory client/server agents, deployed images and consul-k8s controllers rather than only the local CLI. Use CE 2.1.0, Enterprise 2.1.0 or 1.21.19, and consul-k8s 2.1.0 or 1.8.18 as applicable. Do not treat 1.21.19 as a generic downgrade instruction for 1.22; plan a vendor-supported upgrade path. Verify every running component after rollout."
  - title: Limit access to the agent HTTP API immediately
    hint: "Check listener bindings, host processes and network access rules; the default loopback binding does not protect against untrusted local workloads. Restrict access to trusted callers. For the leaf-key flaw, http_config.block_endpoints can block the leaf-certificate endpoint only if Connect-native applications and consul-template configurations on that agent do not depend on it. This workaround does not fix the other four flaws."
  - title: Review exposed mesh identities and lower-privilege service changes
    hint: "Determine which leaf certificates were already cached on reachable agents; Dataplane-serving servers may cache many identities. Review available API/audit and proxy configuration records for unexpected certificate retrieval, equivalent-spelling Envoy overrides and cross-service health-check changes. Investigate anomalous service impersonation; rotate exposed credentials through supported procedures if exposure is established. These are behavioral leads, not published attacker IoCs, and a match alone does not prove compromise."
  - title: Verify Kubernetes component authentication stays in its namespace
    hint: "Check global.acls.manageSystemACLs and component ACL binding rules. If enabled, review who can create ServiceAccounts and obtain their tokens outside the Consul namespace while reaching its API. After updating consul-k8s, verify the installed rules reject a synthetic non-Consul-namespace identity and review unexpected component-token issuance. Disabled system ACL management is outside this specific flaw's scope."
  - title: Test HTTP payload compatibility and permission boundaries after updating
    hint: "HCSEC-2026-48 says most write endpoints reject bodies larger than 512 KiB after the fix. Check large configuration submissions before rollout. In a test environment, verify unauthorized cached-leaf reads fail, service-only tokens cannot set mesh overrides, and a token for one service cannot alter another service's check on the same node."
sources:
  - name: HashiCorp HCSEC-2026-46
    url: https://discuss.hashicorp.com/t/hcsec-2026-46-consul-vulnerable-to-an-authorization-bypass-in-the-agents-service-mesh-leaf-certificate-api/77911
    primary: true
    says: "Cached leaf-certificate/private-key disclosure; ACL and API prerequisites, loopback default, and conditional endpoint-blocking workaround."
  - name: HashiCorp HCSEC-2026-47
    url: https://discuss.hashicorp.com/t/hcsec-2026-47-consul-vulnerable-to-an-authorization-bypass-in-service-mesh-registration/77912
    primary: true
    says: "Specific affected releases and service-write versus mesh-write check mismatch in Envoy override registration."
  - name: HashiCorp HCSEC-2026-48
    url: https://discuss.hashicorp.com/t/hcsec-2026-48-consul-vulnerable-to-a-denial-of-service-in-http-apis/77913
    primary: true
    says: "Unauthenticated API memory exhaustion and the fixed release's 512 KiB limit on most write endpoints."
  - name: HashiCorp HCSEC-2026-49
    url: https://discuss.hashicorp.com/t/hcsec-2026-49-consul-vulnerable-to-an-authorization-bypass-in-health-check-registration/77914
    primary: true
    says: "Same-node, cross-service health-check modification requires ACLs and write permission to a separate service."
  - name: HashiCorp HCSEC-2026-50
    url: https://discuss.hashicorp.com/t/hcsec-2026-50-consul-k8s-vulnerable-to-a-cross-namespace-authorization-bypass-in-component-acl-binding-rules/77915
    primary: true
    says: "Component identity bypass requires system ACL management, another namespace's ServiceAccount creation/token access, and Consul API reachability."
---

HashiCorp disclosed five Consul-related vulnerabilities on October 26. They are one release batch, but they do not share a universal unauthenticated attack path. **L3:** these affect mainstream service-discovery and mesh authorization boundaries; the advisories do not establish malicious exploitation or give victim counts.

The leaf API flaw can disclose a **cached service certificate and its private key** to someone who can reach an ACL-enabled agent's HTTP API. It does not expose every mesh identity automatically: the requested certificate must already be cached on that agent. Most agents cache their own managed sidecars' identities; servers supporting Consul Dataplane may cache more. Consul normally binds the HTTP API to loopback, so remote reachability depends on the deployment, while untrusted local processes still matter. A stolen identity could reach only services permitted by applicable mesh intentions; this is not disclosure of the root CA key.

The registration flaw needs an authenticated principal with write permission to both a proxy and its destination service, but without mesh write. In affected releases, equivalent spellings of Envoy override keys evade the narrower permission check. HashiCorp describes possible code execution **inside that proxy**, traffic access/modification and intention bypass there; this is not an unconditional Consul-server RCE. The separate health-check flaw needs write access to another service on the same node and can manipulate the victim service's health/discovery results.

The memory-exhaustion issue needs API reachability but no valid ACL token. Large bodies are processed before authorization; enabling ACLs alone is insufficient. The fix also changes compatibility: most write endpoints cap bodies at 512 KiB.

For consul-k8s, the critical boundary is `global.acls.manageSystemACLs=true`. A user able to create a ServiceAccount and obtain its token in a different Kubernetes namespace, and contact the Consul API, may authenticate as a Consul component and acquire its associated privileges. This is not an anonymous Internet attack or proof that every Kubernetes user becomes cluster administrator. Deployments with system ACL management disabled are not affected by this specific issue.

The vendor lists **Consul CE 2.1.0**, **Enterprise 2.1.0 or 1.21.19**, and **consul-k8s 2.1.0 or 1.8.18** as applicable fixes. Notably, HCSEC-2026-47 names Enterprise 1.22.12 as affected but does not list a dedicated 1.22 fixed release; follow a supported upgrade path rather than guessing one or blindly downgrading. No automatic version checker is offered because these products and affected release sets differ. Restricting or blocking one endpoint is temporary mitigation for the leaf-key issue, not a replacement for the batch's updates.
