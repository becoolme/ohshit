---
title: Amplitude discloses event-data exposure affecting fewer than 0.3% of customer accounts
date: 2026-10-28
level: 3
tags: [Amplitude, analytics, data breach]
summary: Amplitude confirms unauthorized internal-system access affected event data for fewer than 0.3% of customer accounts. It says it contained the September 28 incident and contacted affected customers; exposed fields and a person count remain undisclosed.
splash: Amplitude customers whose event data was in the affected internal systems; vendor notifications determine scope
wipe: Follow your direct vendor notice, confirm affected event fields and assess downstream disclosure obligations
inTheWild: yes
inTheWildNote: Amplitude confirms unauthorized access, rather than only a theoretical vulnerability.
cves: []
fixed: []
timeline:
  - date: Sep 28, 2026
    title: Amplitude says it detected and contained unauthorized access
  - date: Oct 28, 2026
    title: Customer update publishes the event-data scope
checklist:
  - title: Establish your affected scope
    hint: Follow Amplitude's direct notification or ask security@amplitude.com which projects, event fields and time ranges are affected. Do not interpret a customer-account percentage as a count of people.
  - title: Assess the data you sent
    hint: Compare the vendor-confirmed scope with your event schemas and data-retention records; involve your security and privacy teams where sensitive fields were collected. A software update cannot retract previously exposed data.
sources:
  - name: Amplitude October 28 customer security update
    url: https://trust.amplitude.com/updates?itemUid=63ef9771-9d9e-4b16-833f-6f4647918e2e&source=click
    primary: true
---

Amplitude separates this incident from the recent PHP and Node.js vulnerabilities. It reports independent forensic support and says its other customers' end-user information was not exposed. The access mechanism and attacker remain unspecified. L3 reflects confirmed exposure at a mainstream analytics service, without evidence establishing a mass leak or an affected-person total.
