---
title: LiteLLM Enterprise proxy file-read flaw can expose the master key without authentication
level: 3
date: 2026-10-27
tags:
  - LiteLLM
  - credentials
  - Enterprise
ecosystems:
  - litellm
summary: An Enterprise-licensed LiteLLM proxy can leak local files through an unauthenticated LLM request, enabling admin access and, in some configurations, root code execution. Update to a patched release; unlicensed OSS deployments are unaffected.
splash: Enterprise-licensed proxies reachable over HTTP; exfiltration requires outbound access to an attacker endpoint
wipe: Use 1.103.10 / 1.104.8 / 1.105.6 / 1.106.5; filter trigger keys and restrict ingress/egress until patched
inTheWild: unknown
inTheWildNote: The advisory does not establish exploitation in the wild.
cves:
  - id: GHSA-w4c7-34wj-hqm8
    score: 10
    name: Enterprise proxy unauthenticated file read
    description: Local-file exfiltration can expose the master key and allow proxy administration; host code execution depends on configuration.
fixed:
  - product: LiteLLM 1.103
    version: 1.103.10
  - product: LiteLLM 1.104
    version: 1.104.8
  - product: LiteLLM 1.105
    version: 1.105.6
  - product: LiteLLM 1.106
    version: 1.106.5
timeline:
  - date: Oct 6, 2026
    title: Vendor distributes private fixes to Enterprise customers
  - date: Oct 27, 2026
    title: Embargo ends; advisory and public patched builds released
checklist:
  - title: Update the licensed proxy
    hint: Select the matching patched release above from verified official channels; the October 21 rollback version 1.106.2 does not fix this separate Enterprise flaw.
  - title: Block the trigger and constrain network paths
    hint: "At ingress, reject POST bodies containing any of these JSON keys: standard_callback_dynamic_params, gcs_path_service_account, callbacks, success_callback and failure_callback. Allow outbound traffic only to configured LLM providers; use VPN, mTLS, authenticating ingress or an IP allowlist for access."
  - title: Reduce secret exposure and investigate reachable credentials
    hint: "Load the master key from a secret manager, set a separate LITELLM_SALT_KEY, and review suspected file access/exfiltration, including /proc/self/environ. General incident-response guidance: preserve logs and rotate master/provider keys if exposure is found; no campaign-specific indicators are published."
sources:
  - name: LiteLLM Enterprise advisory
    url: https://github.com/BerriAI/litellm/security/advisories/GHSA-w4c7-34wj-hqm8
    primary: true
    says: Enterprise-only prerequisites, four fixed versions, CVSS 10.0, five trigger keys and mitigations; no CVE listed.
  - name: LiteLLM private-registry disclosure
    url: https://docs.litellm.ai/blog/litellm-private-registry
    primary: true
    says: Private fix October 6; public embargo ends October 27; confirms versions and limited Enterprise scope.
---

This is a separate advisory from the [October 21 release compromise](/incidents/litellm-pypi-compromise/). An active Enterprise license loads the vulnerable paths; a request can send local file contents to a chosen token endpoint. Environment-held master and provider keys are exposed if read. Root execution is conditional, not guaranteed for every proxy. L3 reflects an unauthenticated administrator-access flaw in a widely used gateway without confirmed real-world exploitation or a victim total.
