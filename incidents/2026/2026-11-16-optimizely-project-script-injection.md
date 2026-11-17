---
title: "Report URI finds malicious Optimizely scripts at 178 organizations"
updated: 2026-11-17
level: 4
date: 2026-11-16
tags: [Optimizely, JavaScript, supply chain, skimmer, iOS]
summary: >-
  Report URI found malicious Project JavaScript in 188 Optimizely Web snippets used by 178 organizations. The code replaced crypto addresses, targeted card fields and delivered iOS exploit loaders. The vendor confirmed exploitation of an Experimentation vulnerability and says it removed injected code. Total visitor impact remains unknown.
splash: "Visitors to pages that loaded a modified Optimizely Web snippet, including customer-hosted copies of the snippet."
wipe: "Remove or quarantine altered snippets, secure project write access, and review payments, wallets and exposed sessions."
inTheWild: yes
inTheWildNote: "Report URI captured malicious production snippets and traced related wallet transfers."
timeline:
  - date: Nov 16, 04:21 UTC
    title: Researchers record an altered Optimizely snippet
    body: Report URI’s earliest captured injection on an Optimizely snippet loaded the earlier webshell.lol injector on the BBC site.
  - date: Nov 16, 08:28 UTC
    title: The later wallet-replacement loader is observed
    body: Report URI saw the new payload on the BBC site. Researchers observed card skimming code in a later build at 13:43 UTC.
  - date: Nov 16, 21:52 UTC
    title: One of the 188 known affected snippets still contains the code
    body: Report URI found one remaining affected snippet in its recheck. The result covers the measured set at that time.
  - date: Nov 16, 22:47 UTC
    title: Report URI publishes its technical investigation
    body: The researchers describe the payload, affected snippets and containment checks. How the attacker gained project write access remains unresolved.
  - date: Nov 16, 2026
    title: Hudson Rock documents related script delivery through other providers
    body: Hudson Rock and Ohey verified malicious responses from minute-ly, Kissmetrics and StorifyMe that loaded the same earlier injector.
  - date: Nov 17, 01:02 UTC
    title: Optimizely confirms patch and code removal
    body: The vendor says it took steps to secure affected accounts and moved to monitoring.
checklist:
  - title: Pause affected snippets and preserve evidence
    hint: Check Project JavaScript, experiment custom code, deployed snippets and customer-hosted copies. Save known bad responses, hashes and timestamps before removing the code. Compare each deployed copy to a trusted baseline and check CDN or site caches after cleanup.
  - title: Secure Optimizely project write access and verify cleanup
    hint: Review project users, roles, changes, API tokens and integrations. Remove unauthorized access and rotate exposed credentials. Check for newly injected inline and encoded loaders. Enforce a tested Content Security Policy with narrow script-src and connect-src allowlists and reporting. Remove unsafe-eval where feasible. Confirm clean responses from each host even if the CDN is on the allowlist.
  - title: Hunt for the network indicators and assess exposure
    hint: "Review DNS, proxy, CSP and browser logs for these 12 domains and three IPs, including subdomains where applicable. Defanged domains are 1688360[.]cc, 5vobauua3ojpklx[.]icu, eil786npto9u5bq[.]icu, l7bcsnwc7nzr3uo[.]icu, webshell[.]lol, linkforge[.]cc, je4ft3gn8vxudum[.]icu, q1ls1ho9x7wsxlu[.]icu, ios-hack[.]icu, p55abnw2pnsz0bo[.]icu, 1y69gy2mdzaltz1[.]icu and gm38duxoihbmy5o[.]icu. IPs are 136.113.106.136, 34.96.213.201 and 34.87.36.58. See Report URI for the full paths, script markers, two hashes and eight wallet addresses. A match alone does not prove compromise."
  - title: Check related third-party widgets for the same loader
    hint: Inventory minute-ly, Kissmetrics and StorifyMe on public pages. Search saved responses for webshell[.]lol/get.js. Hudson Rock’s IOC tables list 16 archived vendor responses with hashes and eight mobile-stage hashes. Compare responses with known-good versions and quarantine confirmed altered assets. A match alone does not prove compromise.
  - title: Review exposed sessions and payments
    hint: Invalidate exposed non-HttpOnly session tokens and rotate affected secrets. Identify card data entered into first-party fields on affected pages and coordinate response and notifications with your payment processor. Confirm what was actually accessible from those pages.
  - title: Check transactions and update affected visitor devices
    hint: Verify crypto destinations against a trusted address and contact your wallet provider or exchange about an unexpected transfer. If you entered card details in an affected first-party form, review card activity and ask your issuer about protective steps. Install the latest security update available for your iPhone or iPad.
sources:
  - name: Optimizely official security incident status
    url: https://status.optimizely.com/incidents/ftw0fh9wx43z
    says: Confirms exploitation of an Experimentation vulnerability, patching, payload removal and account protection steps.
    primary: true
  - name: Report URI technical investigation
    url: https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/
    says: Provides captured snippets, timings, observed behavior, sample counts, indicators and response steps.
    primary: true
  - name: Hudson Rock and Ohey script analysis
    url: https://www.infostealers.com/article/poisoned-scripts-on-bbc-zoom-and-other-major-websites-linked-to-iphone-exploit-loaders/
    says: Documents malicious responses served by four providers, with archived captures and hashes.
    primary: true
  - name: Amirul Cyber OPTIMJACK research
    url: https://amirulcyber.com/2026/11/16/optimjack-optimizely-skimmer/
    says: Documents captured browser request chains and payload behavior used to identify affected scripts.
    primary: true
  - name: Apple security releases
    url: https://support.apple.com/en-us/100100
    says: Lists released security updates and their device availability.
    primary: true
---

Report URI found injected code in the Project JavaScript portion of Optimizely Web snippets. That code runs on pages that include the snippet, whether it is loaded from the Optimizely CDN or a customer host. The team observed remote, encoded and inline loaders. Optimizely later confirmed exploitation of an Experimentation vulnerability. The technical details remain undisclosed.

The payload could swap cryptocurrency destinations and send page screenshots and cookies readable by JavaScript to the attacker. Card capture targeted values accessible to the page, such as first-party card fields. Report URI says the code could not read card fields isolated in a cross-origin payment iframe. On iPhones and iPads, the loaders used operating-system-dependent paths. Report URI identified Coruna and DarkSword and observed only fingerprinting in the iOS 26 path it examined. A request to one of the loaders does not show whether an exploit succeeded.

Report URI’s 19:24–19:59 UTC sweep found 186 affected snippets among 1,611 checked. Its full investigation identified **188 altered snippets across 178 organizations**. These are sample counts and do not establish how many visitors lost data or assets. The researchers also observed transfers to wallets associated with the payload. Those transfers do not establish total visitor losses or the volume of any card or cookie theft. Their 21:52 UTC recheck found one remaining altered snippet in the measured set. A later clean response does not resolve exposure that occurred before cleanup.

Hudson Rock recovered a malicious minute-ly response in addition to the Optimizely scripts. Ohey’s archived captures also show affected Kissmetrics and StorifyMe responses. All three loaded the earlier webshell[.]lol injector. The research confirms the served code and leaves the entry methods for those three providers undetermined. Optimizely’s containment statement applies to its own service.

Optimizely says it patched the vulnerability, removed injected code from affected projects and took steps to secure affected accounts. Its status is monitoring. Verify deployed copies and caches, inspect logs for the pre-cleanup period, and review session and payment exposure where applicable.
