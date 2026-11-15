---
title: Perl JSON::XS discloses seven parsing and serialization flaws
level: 3
date: 2026-11-13
tags: [Perl, JSON, CPAN, memory safety]
ecosystems: [perl]
summary: CPANSec disclosed seven JSON::XS vulnerabilities fixed in 4.05. Malformed JSON can exhaust memory or the stack, and specific incremental parsing and tagged serialization paths can mishandle memory. Update services that parse or encode untrusted data.
splash: Perl applications using JSON::XS before 4.05. Exposure varies with incremental parsing, malformed input, and tagged values.
wipe: Upgrade JSON::XS to 4.05 or a verified vendor backport, redeploy Perl workers, and verify the module loaded in production.
inTheWild: unknown
cves:
  - id: CVE-2026-124536
    name: Incremental parser can exceed max_size
    description: Before 4.05, a NUL byte can cause incr_parse to accumulate incremental input beyond the configured size limit.
  - id: CVE-2026-124539
    name: Memory leak on a missing object colon
    description: Before 4.05, rejecting an object with a missing colon can leave the allocation for a decoded key unreleased.
  - id: CVE-2026-124540
    name: Tagged data can exhaust the stack
    description: Before 4.05, decoding deeply nested tagged values with allow_tags enabled can exhaust the stack.
  - id: CVE-2026-124541
    name: Memory leak on a malformed long string
    description: Before 4.05, rejection of a malformed long string can leave memory allocated for the already-decoded portion.
  - id: CVE-2026-129113
    name: Incremental skip corrupts the buffer length
    description: From 4.0_00 to before 4.05, incr_skip can remove bytes beyond the end of the buffer after a top-level number.
  - id: CVE-2026-129114
    name: One-byte heap write past the buffer
    description: From 3.04 to before 4.05, appending a one-byte chunk during incremental parsing can write one byte beyond the heap buffer.
  - id: CVE-2026-129115
    name: Tagged serialization reads released stack memory
    description: From 3.0 to before 4.05, under allow_tags, serializing a FREEZE method result that grows the Perl stack can read released stack memory.
fixed:
  - product: JSON::XS
    version: '4.05'
    status: First upstream release fixing the seven issues
timeline:
  - date: Nov 13, 2026
    title: JSON-XS 4.05 is released
    body: The distribution changelog describes the parser and serialization fixes.
  - date: Nov 14, 12:05 UTC
    title: CPANSec publishes seven vulnerability advisories
    body: The oss-security post gives affected ranges, trigger conditions and remediation.
checklist:
  - title: Identify the version actually loaded by each service
    hint: "Run perl -MJSON::XS -e 'print $JSON::XS::VERSION' inside each running image or deployment environment. Search lockfiles and application code for direct or transitive JSON::XS use and inspect package manager versions for vendor builds."
  - title: Upgrade, restart workers and retest parsing
    hint: Update the CPAN release to 4.05 or later, or confirm your distribution's package carries all relevant fixes. Rebuild and redeploy images and restart long-running Perl processes. In staging, retest incremental decoding, error handling and tagged values used by the application.
  - title: Limit exposure before the upgrade
    hint: Limit request sizes and streaming input outside the Perl parser. Disable allow_tags where your application does not need it and restrict untrusted traffic to affected endpoints. Review restarts or abnormal memory use and keep request evidence for investigation.
sources:
  - name: CPANSec notices on oss-security
    url: https://www.openwall.com/lists/oss-security/2026/11/14/9
    says: Lists the seven CVEs, affected ranges, trigger conditions and the fixed release.
    primary: true
  - name: JSON-XS 4.05 distribution changelog
    url: https://api.metacpan.org/source/MLEHMANN/JSON-XS-4.05/Changes
    says: Documents the November 13 release and its fixes.
    primary: true
---

The input paths differ by flaw. Several affect the incremental decoder, and others affect invalid object or string parsing. The stack exhaustion and released-memory read depend on tagged mode. The latter is an encoding issue involving a FREEZE result. Services parsing untrusted JSON are the main priority, along with apps using tagged serialization.

CPANSec identifies memory exhaustion, hangs, crashes and invalid memory accesses as concerns. Its report does not establish exploitation in production. Request limits and disabling optional features reduce exposure while you prepare the upgrade.
