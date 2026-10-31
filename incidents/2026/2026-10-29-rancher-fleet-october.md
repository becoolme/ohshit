---
title: Rancher and Fleet fixes cover management-cluster takeover and credential exposure
date: 2026-10-29
level: 3
tags:
  - Rancher
  - Fleet
  - Kubernetes
summary: Four advisories cover Fleet cluster-admin escalation plus Rancher shell access, SSRF and credential forwarding. Ordinary authenticated users can reach some paths in default deployments. Upgrade Rancher and Fleet together; exposure is not proof of exploitation.
splash: Rancher accounts with the default user role and users of cloud provisioning forms
wipe: Upgrade both components, verify Fleet's actual version, and invalidate potentially forwarded Rancher credentials
inTheWild: unknown
inTheWildNote: The vendor advisories do not report active exploitation or a victim count.
cves:
  - id: CVE-2026-94290
    name: Fleet controller privilege escalation
    description: A default-role user can cause the import controller to use management-cluster credentials, gaining cluster-admin and downstream secrets.
  - id: CVE-2026-104623
    name: Local cluster shell authorization bypass
    description: An authenticated user can start an unprivileged cattle-system shell pod; this alone adds no Kubernetes API permissions.
  - id: CVE-2026-88809
    name: Meta proxy SSRF
    description: Authenticated HTTP/1.1 absolute-form requests reaching Rancher without rewriting can bypass the destination allowlist.
  - id: CVE-2026-88811
    name: Meta proxy credential forwarding
    description: Ordinary provisioning lookups or API calls missing credential-selection headers can forward Rancher credentials to allowed third-party hosts.
fixed:
  - product: Rancher 2.15
    version: 2.15.3
  - product: Rancher 2.14
    version: 2.14.7
  - product: Rancher 2.13
    version: 2.13.11
  - product: Rancher 2.12
    version: 2.12.15
  - product: Rancher 2.11
    version: 2.11.19
    status: Rancher fixes only; check Fleet separately
  - product: Fleet 0.16
    version: 0.16.3
  - product: Fleet 0.14
    version: 0.14.12
  - product: Fleet 0.13
    version: 0.13.17
  - product: Fleet 0.15
    version: 0.15.8
timeline:
  - date: Oct 29, 2026
    title: Rancher publishes the cited management-plane advisories
checklist:
  - title: Upgrade Rancher and bundled Fleet together
    hint: Check both installed versions against the table and upgrade compatible Rancher/Fleet versions together. The Fleet thresholds cover the controller escalation; the Rancher thresholds cover the three cited Rancher flaws. This table does not certify every advisory in the October release batch.
  - title: Check cross-namespace kubeconfig references
    hint: After upgrade, manually managed cross-namespace secrets need fleet.cattle.io/kubeconfig-referenceable-from set to the Cluster namespace. Check Imported conditions. Do not leave allowUnlabeledKubeConfigSecretNamespaces enabled as a permanent workaround; deployed agents remain in place.
  - title: Invalidate potentially forwarded credentials
    hint: After patching, rotate or delete Rancher API tokens used through the meta proxy and invalidate user sessions. Audit whitelist-domain, drivers and ProxyEndpoint entries. API clients needing an upstream Authorization value must use X-API-Auth-Header.
  - title: Review management-plane access and evidence
    hint: Investigate unexpected dashboard-shell-* pods in cattle-system, shell audit requests, local Fleet agents and cluster-admin ClusterRoleBindings. Remove unaccounted shell pods. A Failed to proxy log line is also produced for benign rejections and is not proof of forwarding or compromise. If SSRF is suspected, rotate reachable internal-service and cloud-metadata credentials.
  - title: Reduce exposure while arranging upgrades
    hint: Restrict Fleet workspace creation and cluster/bundle writes to trusted operators. Require HTTP-aware ingress on every Rancher path, block direct pod-to-Service access except necessary components, and block unnecessary Rancher access to internal services and metadata. Limit shell endpoints to trusted administrative networks. These measures reduce exposure; they do not replace the patches.
sources:
  - name: Fleet controller escalation advisory
    url: https://github.com/rancher/fleet/security/advisories/GHSA-qfmw-gw96-ffcr
    primary: true
  - name: Rancher local shell advisory
    url: https://github.com/rancher/rancher/security/advisories/GHSA-8x6f-2v58-x6p7
    primary: true
  - name: Rancher SSRF advisory
    url: https://github.com/rancher/rancher/security/advisories/GHSA-f9gf-wh3x-jx3v
    primary: true
  - name: Rancher credential-forwarding advisory
    url: https://github.com/rancher/rancher/security/advisories/GHSA-x82x-2qj6-5rm2
    primary: true
---

Fleet is enabled by default. Its controller flaw needs an authenticated ordinary user, not an existing local-cluster role.

The shell flaw grants a management-network foothold, not cluster-admin by itself. SSRF requires a direct absolute-form HTTP/1.1 path; tested HTTP-aware proxies rewrite or reject it, but local pods may still reach the Service. Instance-metadata credential exposure depends on the environment, such as AWS IMDSv1.

Credential forwarding can happen during normal cloud-provisioning UI navigation without an attacker request. Patching stops future forwarding; it does not invalidate credentials already sent. No confirmed exploitation is established. L3 reflects mainstream control-plane and tenant-isolation impact.
