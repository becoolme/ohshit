---
title: WebRTC skimmer found on five retailers; test-card exfiltration captured at Lascana
level: 4
date: '2026-11-27'
tags:
- e-commerce
- skimming
- WebRTC
summary: InfoHawk found a shared skimmer on five retail sites and captured test-card exfiltration at Lascana. Mobile checkout conditions can hide it from desktop scans. The code was removed November 24–25; actual shopper impact remains unknown.
splash: Payment-page visitors and retailers loading altered marketing pixels, consent-banner configurations or CDN files.
wipe: Remove injected code, restrict signaling requests, inspect mobile checkout and contact your issuer about suspicious charges.
inTheWild: 'yes'
inTheWildNote: InfoHawk observed malicious scripts and live test-card exfiltration at Lascana.
timeline:
- date: Nov 24, 14:25 UTC
  title: Code removed from Samsonite and American Tourister
  body: InfoHawk reports observed removal at both stores; neither the retailers nor Seers replied to its inquiry.
- date: Nov 24, 15:48 UTC
  title: Lascana removes the Quorum pixel
  body: According to the researcher, Lascana replied and had removed the pixel by this time.
- date: Nov 24, 21:09 UTC
  title: Quorum restores a clean pixel
  body: InfoHawk says Quorum confirmed removal of the identified malicious code and restoration of the clean marketing pixel.
- date: Nov 25, 2026
  title: Revolve and FWRD remove the code
  body: Revolve told InfoHawk it resolved a mobile/tablet website issue that day and was investigating potential impact.
- date: Nov 27, 2026
  title: InfoHawk publishes its investigation
  body: The team reports five affected sites, shared infrastructure and one captured live test-card exfiltration. Shopper counts and losses are unknown.
checklist:
- title: Contain altered scripts and preserve evidence
  hint: Compare page source, tag-manager changes, consent-banner settings and retailer CDN files with trusted copies. Preserve the modified assets, configuration history and network captures before removal. Suspend an affected payment flow, restore trusted assets, investigate who could edit them and rotate credentials identified as exposed. Coordinate investigation and customer notification with your payment processor.
- title: Hunt the full published indicator set on mobile checkout
  hint: 'Check <brand>-static.s3.amazonaws[.]com for Insds.js and gtage.js; qscripts.s3.amazonaws[.]com/pscript.js for a final-line reference to those buckets; cdn.seersco.com/banners/<account>/<domain>/cb.js for a privacy-policy URL containing a hidden image/onerror loader. Look for GET /_cf/ice and POST /_cf/rel to *.northbridgeads[.]com, relay-only WebRTC through turn.cloudflare.com, and strings KghRtc, rtc-signal-v1 and quickfetch. The received chunks were SHA-256 checked and executed with eval; no digest value is published. S3, Seers and Cloudflare are shared legitimate services: their presence alone is not proof. Correlate exact paths, script changes and data-channel activity; protect captures containing payment data.'
- title: Restrict the bootstrap and retest payment pages
  hint: Use a connect-src allowlist of required hosts on every payment page to block unapproved signaling requests before this kit opens WebRTC. The report says the data channel itself is outside connect-src; this is not a general WebRTC block. Remove unnecessary third-party tags from payment/login pages, isolate card fields in payment frames and validate the restored flow with test data on a phone-sized touch screen. Inspect the payment step, not just the home page or a desktop browser.
- title: Respond to possible card exposure
  hint: If you entered payment details on an affected flow, review statements and contact your card issuer through a trusted channel about suspicious charges or replacement. Capture can precede order validation, including a declined or cancelled order. The report establishes test-card capture at Lascana, not a known count of stolen customer cards at all five stores.
sources:
- name: InfoHawk original WebRTC skimmer investigation
  url: https://www.infohawk.com/news/2026-11-27-black-friday-webrtc-skimmer
  primary: true
  says: Researchers report live test-card exfiltration only at Lascana, five script placements, remediation dates, mobile gating and indicators; includes company replies. Customer impact and initial access remain unresolved.
---

InfoHawk traced malicious code across Lascana, Samsonite, American Tourister, Revolve and FWRD. Delivery differed: an altered Quorum marketing pixel at Lascana, an edited Seers consent-banner configuration at the two luggage stores, and a file on Revolve’s own CDN at Revolve/FWRD. This does not establish compromise of all infrastructure or customers of those providers. The original entry method and affected shopper count are not disclosed.

The kit loads an S3 script, gates execution on small or touch screens and, in the Samsonite variant, the checkout path. HTTP signaling then negotiates a WebRTC data channel through a Cloudflare TURN relay. It uses that channel for both incoming executable code and outgoing data. A payment page can therefore appear normal while a desktop or homepage-only check misses the behavior. InfoHawk captured its test card leaving Lascana; it did not capture live card exfiltration at the other four stores. The suspected collection includes card number, expiry, security code and billing/contact details, before payment validation. Real customer theft or losses are not quantified.

All five placements were removed November 24–25 according to the investigation. Lascana and Quorum replied; Revolve confirmed resolving the mobile/tablet issue while investigating impact. The two luggage sites and Seers had not replied, so their removal is the researcher’s observation. Removal does not establish a completed impact investigation. Rated L4 for observed malicious checkout code and demonstrated live exfiltration, without assuming mass theft from the five-site count.

This is a separately disclosed retail cluster. The report compares the delivery risk with the [Optimizely incident](/incidents/optimizely-project-script-injection/) and browser skimming is also covered in [CartJacked](/incidents/cartjacked-storefront-campaigns/); it does not attribute this cluster to either campaign. Shared use of WebRTC or legitimate relay infrastructure is insufficient to merge their identities.
