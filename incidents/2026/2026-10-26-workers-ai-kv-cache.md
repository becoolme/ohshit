---
title: "Cloudflare discloses cross-customer data in 155 Workers AI GLM-5.3 responses"
level: 3
date: 2026-10-26
tags: [Cloudflare, SGLang, AI, data-leak]
ecosystems: [cloudflare, sglang]
summary: "Cloudflare says 155 GLM-5.3 responses contained other customers' request data between August 27 and September 9. It fixed the hosted service before restoring access; self-hosted disaggregated SGLang operators should review engine versions and cache handling."
splash: "Workers AI GLM-5.3 users during Aug 27–Sep 9; self-hosted SGLang prefill/decode deployments need review"
wipe: "Hosted fixed September 9; SGLang 0.5.22+ with capacity/transfer checks; NIXL/MORI also need failed-send fix #45973"
inTheWild: no
inTheWildNote: "Confirmed accidental exposure; Cloudflare found no evidence of deliberate exploitation"
fixed:
  - product: Workers AI GLM-5.3
    version: Provider remediation, September 9, 2026
    status: Hosted service restored after validation
  - product: Self-hosted SGLang
    version: 0.5.22
    status: Vendor-recommended baseline; NIXL/MORI also require the additional failed-send fix
  - product: SGLang NIXL/MORI failed-send handling
    version: Build including upstream patch 45973
    status: Merged after 0.5.22; maintainer disclosure targets 0.5.23, not yet a published release
timeline:
  - date: Aug 27, 2026
    title: Affected model launched with an undersized prefill cache
  - date: Sep 8, 23:11 UTC
    title: Researcher reported cross-customer output through HackerOne
  - date: Sep 9, 14:00 UTC
    title: Cloudflare disabled public access to GLM-5.3
  - date: Sep 9, 19:40 UTC
    title: Model restored after capacity and engine fixes were validated
  - date: Oct 19, 2026
    title: SGLang 0.5.22 released, according to Cloudflare's incident timeline
  - date: Oct 26, 2026
    title: Coordinated disclosure describes the data exposure and upstream hardening
checklist:
  - title: Assess historical Workers AI usage separately from current service status
    hint: "Identify calls to @cf/zai-org/glm-5.3 between August 27 and September 9. Review retained request/output records under your data-handling rules and contact Cloudflare about customer-specific scope. The 681,280-token threshold describes receiving requests; a shorter request could have supplied leaked cache data. Rotate credentials only if your assessment identifies exposed secrets."
  - title: Update self-hosted disaggregated SGLang
    hint: "Use 0.5.22 or later, or an equivalent reviewed backport set, and verify the running prefill, decode and router builds. Cloudflare identifies #36988 in 0.5.20 and the earlier admission rejection in #38935 in 0.5.21; 0.5.22 includes further transfer and lifetime fixes. For NIXL/MORI, also use a reviewed build/backport containing #45973: failed sends could otherwise acknowledge draining while writes remain in flight. Maintainers target 0.5.23 for it; the latest published GitHub release at review is 0.5.22. The #39729 checksum cleanup was also awaiting release."
  - title: Check real KV capacity on both roles after every deployment change
    hint: "Read each prefill/decode node's startup logs and compare its measured KV pool with configured context length after changes to weights, quantization, parallelism or memory fraction. Lower context length if it exceeds capacity. Test that oversized requests fail before cache handoff; proxy limits and successful HTTP responses alone do not establish isolation."
  - title: Harden interrupted transfers and verify isolation
    hint: "Use a router that pairs aborts, enable deferred KV release on both roles and bound Mooncake transfer batches. Monitor sglang:decode_deferred_kv_release_total{outcome}; frequent timeouts need investigation because mixed acknowledgement formats can break the drain handshake. Follow the vendor's load-balancer guidance to avoid unnecessary mid-transfer aborts and permit progress to the first token. Where supported, enable --disaggregation-enable-kv-checksum and --kv-canary and verify checks in logs; coverage did not yet include every architecture, including GLM 5.3. Use isolated test accounts and synthetic markers, never other customers' data."
sources:
  - name: Cloudflare incident report
    url: https://blog.cloudflare.com/kv-cache-exposure-remediation/
    primary: true
    says: "October 26 disclosure; 155 affected responses, one hosted model, September 9 remediation, no evidence of deliberate exploitation, and detailed SGLang operator guidance."
  - name: SGLang coordinated security disclosure
    url: https://staging.lmsys.org/blog/2026-10-26-cf-security
    primary: true
    says: "Maintainers explain rejected-request handoff and related interrupted-transfer races; the latter require PD disaggregation and in-flight writes into reused slots."
  - name: SGLang NIXL/MORI failed-send fix
    url: https://github.com/sgl-project/sglang/pull/45973
    primary: true
    says: "Additional fix prevents false drained acknowledgements after failed NIXL/MORI writes; merged after 0.5.22, which remains the latest published GitHub release at review."
  - name: Cloudflare September 9 status notice
    url: https://www.cloudflarestatus.com/incidents/jsvvrtk5hvym
    primary: true
    says: "The earlier availability notice described increased errors, rather than publicly identifying cross-customer data exposure."
---

Cloudflare's October 26 report describes a production data exposure that was already contained in September. Between August 27 and September 9, **155 responses**, all to prompts longer than **681,280 tokens**, included information from other customers' recent requests to the same Workers AI model, `@cf/zai-org/glm-5.3`. That is a response count, not a count of people, organizations or accounts. Cloudflare says no other hosted Workers AI model was affected and found no evidence of deliberate exploitation after excluding its testing and the researcher's activity.

The deployment advertised a 1,048,576-token context window while its prefill KV pool held only 681,280 tokens. In disaggregated serving, prefill processes prompts and transfers cached model state to separate decode GPUs. An over-capacity request became a one-token placeholder instead of being stopped. Decode treated the transfer as complete and generated output using pages still containing earlier requests' data. The threshold describes the request receiving the response, not a safe lower bound for data submitted by potential source customers.

Cloudflare increased capacity and patched rejection handling before restoring the model on September 9. Its earlier public status notice covered errors; October 26 is the coordinated disclosure date for the data exposure. An older public SGLang bug report and pre-disclosure fixes do not establish that this hosted incident's customer impact was public then.

For self-hosters, the recommendation is **SGLang 0.5.22 or later plus configuration validation**, rather than assuming a model name or an HTTP success code proves safety. The incident-specific rejection fixes appeared in 0.5.20 and 0.5.21. Related fixes address interrupted RDMA transfers, premature page reuse and cache lifetime; these have distinct prerequisites. The maintainers say the cross-engine interrupted-transfer race requires a mid-transfer termination and reuse of slots while writes are still in flight; a single-instance deployment without that transfer path is not affected by that specific race. In their reproduction it leaks the aborted request's context into another client's output, not back to the aborting client, which cannot select a victim. That is distinct from this incident's rejected-request stale reads. The maintainer disclosure also identifies failed-send fix **#45973 for NIXL/MORI**, targeted for 0.5.23. It merged after 0.5.22; review confirmed 0.5.22 was still the latest published GitHub release, so these backends need that additional patch in a reviewed build/backport. The checksum cleanup #39729 and additional hardening were also pending release or development; 0.5.22 does not imply every proposed safeguard has shipped.

**L3:** confirmed tenant-isolation failure in a mainstream managed AI service, with actionable upstream implications. The known scope is limited and the service was repaired before disclosure; this is not evidence of ongoing theft, a platform-wide breach or a defect in every deployment of the model. Customer count, specific exposed data and customer-specific notifications are not quantified in the cited report. No CVE or GHSA identifier is assigned in these disclosures.
