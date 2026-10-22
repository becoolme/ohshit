---
# Copy this file to incidents/<year>/<yyyy-mm-dd>-<slug>.md and fill it in.
# The part after the date becomes the URL: /incidents/<slug>/
# Every field is validated on build (src/content.config.ts). Run `npm run check` locally.
title: "One sentence that says what broke and how bad it is (10–160 chars)"
headline: "Optional punchline for the detail page (≤90 chars)"
level: 3 # 1 Silent Fart · 2 Bit of a Leak · 3 Sharted · 4 Septic Tank Blew · 5 Shitstorm
date: 2026-01-31 # the day it became public
# dateIsApproximate: true   # if you only know the month
tags: [one, two, three] # 1–5 short tags
ecosystems: [node] # optional, lowercase
summary: >-
  1–2 sentences for the feed card (≤360 chars).
splash: "Who is affected, one line (≤140 chars)"
wipe: "The fix, one line (≤160 chars)"
inTheWild: unknown # yes | no | disputed | unknown | n/a
inTheWildNote: "Why we say that (≤90 chars)"
oneLiner: >-
  Optional. How the attack works, in words your manager understands.
cves:
  - id: CVE-2026-0000
    score: 9.8
    name: Short name
    description: What the bug is.
    plain: Optional toilet-humour translation.
fixed:
  - { product: Thing 2.x, branch: "2", version: 2.4.1, status: Supported }
  - { product: Thing 1.x and older, version: none, status: End of life }
# checker:                 # optional; turns `fixed` into an interactive version checker
#   runtime: Thing
#   command: thing --version
#   examples: ["2.4.0", "2.4.1"]
# mitigation:              # optional interim workaround
#   file: config.ini
#   code: |
#     feature = off
#   note: Why this only partly helps.
timeline:
  - date: Jan 30, 2026
    title: What happened
    body: Optional detail.
checklist:
  - title: Something the reader should do
    hint: Where to look or how
sources: # at least one; mark vendor / researcher posts as primary
  - name: Vendor advisory
    url: https://example.com/advisory
    says: What this source claims, especially where sources disagree
    primary: true
---

What happened, in plain Markdown. Keep it factual, link sources, and say clearly
where reports disagree or a number is unverified.
