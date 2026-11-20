---
title: Ruby fixes seven string and regexp memory flaws, with conditional RCE proofs
headline: Changing case can change control flow
level: 3
date: '2026-11-19'
tags:
- Ruby
- RCE
- memory safety
ecosystems:
- ruby
summary: Ruby 4.0.10 / 3.4.13 / 3.3.14 fix seven flaws in string case conversion and regular expressions. Ruby confirms RCE PoCs for some paths; exposure depends on processing crafted strings or attacker-controlled patterns. The backreference flaw is described as memory disclosure or a crash.
splash: Ruby ≤3.3.13, 3.4.0–3.4.12 or 4.0.0–4.0.9; applications reaching affected string/regexp operations
wipe: Upgrade to Ruby 4.0.10 / 3.4.13 / 3.3.14, rebuild images and restart applications; migrate unsupported Ruby ≤3.2
inTheWild: unknown
inTheWildNote: Ruby confirms RCE PoCs in some scenarios, but does not report exploitation in the wild.
cves:
- id: GHSA-34m4-m9fh-gqp5
  name: Case-conversion one-byte overwrite
  description: Changing case in certain single-byte encodings, including ISO-8859-1 and Windows-1252, can write beyond the output buffer. Ruby confirms RCE PoCs in some scenarios.
- id: GHSA-7x2q-68qv-6p8x
  name: Regexp intersection double free
  description: Compiling attacker-controlled patterns containing a character-class intersection can free a buffer twice; Ruby confirms RCE PoCs in some scenarios.
- id: GHSA-87fm-7w84-j2px
  name: Case-conversion size overflow
  description: A converted string exceeding 4 GiB can overflow the calculated length and overrun heap storage; Ruby confirms RCE PoCs in some scenarios.
- id: GHSA-wpqw-5qxg-m68r
  name: Case-insensitive regexp memory read
  description: Matching attacker-controlled case-insensitive patterns can read beyond bounds and produce attacker-influenced memory corruption; this is not a claim of a complete RCE demonstration.
- id: GHSA-3p8q-wmhx-vm2w
  name: Regexp compiled-program size overflow
  description: Compiling an attacker-controlled pattern can overflow the program-size calculation and overwrite a heap buffer; Ruby confirms RCE PoCs in some scenarios.
- id: GHSA-7whj-cfh7-xgm4
  name: Regexp stringification heap overwrite
  description: Regexp#to_s can overwrite heap memory when processing a crafted pattern, potentially exposing memory or executing code; Ruby confirms RCE PoCs in some scenarios.
- id: GHSA-pvgc-g7gj-pv6h
  name: Case-insensitive backreference overread
  description: A case-insensitive backreference can read past the subject string. Ruby reports possible memory disclosure or a process crash, not RCE for this flaw.
fixed:
- product: Ruby 4.0
  branch: '4.0'
  version: 4.0.10
  status: Patched
- product: Ruby 3.4
  branch: '3.4'
  version: 3.4.13
  status: Patched
- product: Ruby 3.3
  branch: '3.3'
  version: 3.3.14
  status: Security maintenance; patched
- product: Ruby 3.2 and older
  version: none
  status: End of life; these fixes will not be released upstream
checker:
  runtime: Ruby
  command: ruby -v
  examples:
  - 4.0.9
  - 4.0.10
  - 3.4.12
  - 3.4.13
  - 3.3.13
  - 3.3.14
timeline:
- date: Nov 19, 00:00 UTC
  title: Ruby publishes the seven-issue advisory
  body: The history explicitly gives this UTC publication time, despite the page header and URL carrying November 18. Fixed versions are 4.0.10, 3.4.13 and 3.3.14.
checklist:
- title: Inventory deployed Ruby, including bundled runtimes
  hint: Run ruby -v in the actual production/container environment and inspect build/base images and embedded products. Check whether untrusted input reaches string case conversion, regexp compilation, matching or Regexp#to_s; an ordinary fixed pattern alone is not the prerequisite for every issue.
- title: Install fixed Ruby and restart every application process
  hint: Use 4.0.10 / 3.4.13 / 3.3.14 or the corresponding maintained vendor package, rebuild and redeploy images, and confirm the running process uses the update. Obtain bundled-product guidance from its vendor; migrate Ruby 3.2 and older.
- title: Restrict untrusted input paths until updated
  hint: As an interim application precaution, remove exposure to attacker-controlled regexp patterns and affected case-conversion operations where practical. The backreference issue can instead be triggered by a crafted subject string. Input restrictions reduce exposure but are not a vendor-confirmed complete replacement for the update.
sources:
- name: Ruby seven-issue security advisory
  url: https://www.ruby-lang.org/en/news/2026/11/18/multiple-vulnerabilities-in-regexp-and-string/
  says: Seven GHSA identities, branch fixes, EOL status and explicit UTC publication history
  primary: true
- name: Ruby GHSA-34m4-m9fh-gqp5 advisory
  url: https://github.com/ruby/ruby/security/advisories/GHSA-34m4-m9fh-gqp5
  says: Changing case in certain single-byte encodings, including ISO-8859-1 and Windows-1252, can write beyond the output buffer. Ruby confirms RCE PoCs in some scenarios.
  primary: true
- name: Ruby GHSA-7x2q-68qv-6p8x advisory
  url: https://github.com/ruby/ruby/security/advisories/GHSA-7x2q-68qv-6p8x
  says: Compiling attacker-controlled patterns containing a character-class intersection can free a buffer twice; Ruby confirms RCE PoCs in some scenarios.
  primary: true
- name: Ruby GHSA-87fm-7w84-j2px advisory
  url: https://github.com/ruby/ruby/security/advisories/GHSA-87fm-7w84-j2px
  says: A converted string exceeding 4 GiB can overflow the calculated length and overrun heap storage; Ruby confirms RCE PoCs in some scenarios.
  primary: true
- name: Ruby GHSA-wpqw-5qxg-m68r advisory
  url: https://github.com/ruby/ruby/security/advisories/GHSA-wpqw-5qxg-m68r
  says: Matching attacker-controlled case-insensitive patterns can read beyond bounds and produce attacker-influenced memory corruption; this is not a claim of a complete RCE demonstration.
  primary: true
- name: Ruby GHSA-3p8q-wmhx-vm2w advisory
  url: https://github.com/ruby/ruby/security/advisories/GHSA-3p8q-wmhx-vm2w
  says: Compiling an attacker-controlled pattern can overflow the program-size calculation and overwrite a heap buffer; Ruby confirms RCE PoCs in some scenarios.
  primary: true
- name: Ruby GHSA-7whj-cfh7-xgm4 advisory
  url: https://github.com/ruby/ruby/security/advisories/GHSA-7whj-cfh7-xgm4
  says: Regexp#to_s can overwrite heap memory when processing a crafted pattern, potentially exposing memory or executing code; Ruby confirms RCE PoCs in some scenarios.
  primary: true
- name: Ruby GHSA-pvgc-g7gj-pv6h advisory
  url: https://github.com/ruby/ruby/security/advisories/GHSA-pvgc-g7gj-pv6h
  says: A case-insensitive backreference can read past the subject string. Ruby reports possible memory disclosure or a process crash, not RCE for this flaw.
  primary: true
---

These are runtime defects in string case conversion and the regular-expression engine, rather than a claim that every Rails application is automatically exploitable. Several regexp paths require an application to compile or use attacker-controlled patterns; case conversion and backreference matching have different input conditions. The advisory confirms RCE PoCs for some flaws, attacker-influenced memory corruption for the case-insensitive pattern read, and disclosure/crash risk for the backreference read. It does not establish a victim count or active exploitation campaign. L3 reflects a mainstream runtime with confirmed exploit proofs.

The official page header says November 18, while its history explicitly says first publication was November 19 at 00:00 UTC. This entry follows that stated UTC timestamp. Ruby’s original advisories still use GHSA identifiers and say CVE assignments are pending. A secondary report labels the first flaw CVE-2026-132825; that mapping is not asserted here without original confirmation.

The seven issues share one release batch, so they are indexed together. No general configuration switch is established as a complete mitigation. Apply the vendor releases, including Ruby bundled into other products, rather than treating a development dependency change as proof production was updated.
