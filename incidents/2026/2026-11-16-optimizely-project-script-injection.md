---
title: "Report URI finds malicious Optimizely scripts at 178 organizations"
updated: 2026-11-24
level: 4
date: 2026-11-16
tags: [Optimizely, JavaScript, supply chain, skimmer, iOS]
summary: >-
  Report URI found malicious Project JavaScript in 188 Optimizely Web snippets used by 178 organizations. The code replaced crypto addresses, targeted card fields and delivered iOS exploit loaders. The vendor confirmed exploitation of an Experimentation account signup flaw and says it removed injected code. Total visitor impact remains unknown.
splash: "Visitors to pages that loaded a modified Optimizely Web snippet, including customer-hosted copies of the snippet."
wipe: "Remove or quarantine altered snippets, secure project write access, and review payments, wallets and exposed sessions."
inTheWild: yes
inTheWildNote: "Report URI captured malicious production snippets and traced related wallet transfers."
cves:
  - id: CVE-2026-132224
    name: Signup-flow control permits malicious Project JavaScript
    description: The account signup flow permits impersonation of existing customer users and modification of Project JavaScript, distributing attacker code through Optimizely-hosted assets.
timeline:
  - date: Nov 13, 2026
    title: Archived responses show related scripts before the Optimizely wave
    body: Later analysis identified poisoned Kissmetrics and StorifyMe responses from November 13. These captures establish when those responses were served, rather than when access began.
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
  - date: Nov 16, 23:11 UTC
    title: The last known altered Optimizely snippet tests clean
    body: Report URI said in its November 17 update that every affected file it tracked returned clean content by this check.
  - date: Nov 16, 2026
    title: Hudson Rock documents related script delivery through other providers
    body: Hudson Rock and Ohey verified malicious responses from minute-ly, Kissmetrics and StorifyMe that loaded the same earlier injector.
  - date: Nov 17, 01:02 UTC
    title: Optimizely confirms patch and code removal
    body: The vendor says it took steps to secure affected accounts and moved to monitoring.
  - date: Nov 17, 06:30 UTC
    title: Researchers publish follow-up evidence
    body: Hudson Rock and Ohey document earlier captures and later mobile stages. The follow-up also reports Optimizely’s statement identifying the account signup flow.
  - date: Nov 17, 07:00 UTC
    title: Bitquery estimates likely victim payments
    body: Its on-chain review separates likely victim payments from observed wallet inflows tied to a swap.
  - date: Nov 17, 2026
    title: Optimizely publishes its preliminary customer investigation report
    body: The vendor describes signup-flow impersonation, a 16:10 UTC fix and 16:53 UTC session/token revocation on November 16. It gives 22:24 UTC as cleanup completion, publishes additional indicators and withdraws the general disable-snippet advice. Final forensics remain pending.
  - date: Nov 17, 2026
    title: Netskope publishes customer-subset traffic observations
    body: Its telemetry includes requests after snippet cleanup from browser-cached pages and earlier sightings of shared infrastructure. Requests, many blocked or from unsupported device types, are not counts of successful exploitation.
  - date: Nov 18, 2026
    title: Socket publishes static analysis of an archived early payload
    body: The November 16 08:08:15 UTC capture contains a wallet clipper and iOS loader, without the card-skimming module found in later builds. Socket publishes its sample hash and flags an unresolved difference from the reported 08:10 first-build time.
  - date: Nov 24, 2026
    title: CISA adds the signup-flow vulnerability to KEV
    body: CISA tracks the exploited issue as CVE-2026-132224, flags forensic triage and gives covered US federal agencies a November 27 remediation due date.
checklist:
  - title: Pause affected snippets and preserve evidence
    hint: Check Project JavaScript, experiment custom code, deployed snippets and customer-hosted copies. Save known bad responses, hashes and timestamps before removing the code. Compare each deployed copy to a trusted baseline and check CDN or site caches after cleanup.
  - title: Secure Optimizely project write access and verify cleanup
    hint: Review project users, roles, changes, API tokens and integrations. The November 17 vendor report says impersonated users’ sessions and tokens were already revoked and does not require blanket password or API-token resets. Remove unauthorized access and rotate only credentials independently found exposed. Downstream visitor-session exposure still needs assessment. Check for newly injected inline and encoded loaders. Enforce a tested Content Security Policy with narrow script-src and connect-src allowlists and reporting. Remove unsafe-eval where feasible. Confirm clean responses from each host even if the CDN is on the allowlist.
  - title: Hunt for the network indicators and assess exposure
    hint: "Review DNS, proxy, CSP and browser logs for these 12 domains and three IPs, including subdomains where applicable. Defanged domains are 1688360[.]cc, 5vobauua3ojpklx[.]icu, eil786npto9u5bq[.]icu, l7bcsnwc7nzr3uo[.]icu, webshell[.]lol, linkforge[.]cc, je4ft3gn8vxudum[.]icu, q1ls1ho9x7wsxlu[.]icu, ios-hack[.]icu, p55abnw2pnsz0bo[.]icu, 1y69gy2mdzaltz1[.]icu and gm38duxoihbmy5o[.]icu. IPs are 136.113.106.136, 34.96.213.201 and 34.87.36.58. See Report URI for the full paths, script markers, two hashes and eight wallet addresses. A match alone does not prove compromise."
  - title: Check related third-party widgets for the same loader
    hint: Inventory minute-ly, Kissmetrics and StorifyMe on public pages. Search saved responses for webshell[.]lol/get.js. Hudson Rock’s IOC tables list 16 archived vendor responses with hashes and eight mobile-stage hashes. Compare responses with known-good versions and quarantine confirmed altered assets. A match alone does not prove compromise.
  - title: Review exposed sessions and payments
    hint: Invalidate exposed non-HttpOnly session tokens and rotate affected secrets. Identify card data entered into first-party fields on affected pages and coordinate response and notifications with your payment processor. Confirm what was actually accessible from those pages.
  - title: Check transactions and update affected visitor devices
    hint: Verify crypto destinations against a trusted address and contact your wallet provider or exchange about an unexpected transfer. Save the transaction hash, destination and timestamp for that report. If you entered card details in an affected first-party form, review card activity and ask your issuer about protective steps. Install the latest security update available for your iPhone or iPad.
  - title: Request customer-specific evidence and restore legitimate code
    hint: Ask your Customer Success Manager or support@optimizely.com for affected-project confirmation, per-site windows and change logs. The vendor permits re-enabling cleaned Web Experimentation, while sensitive-input pages without experiments should remove it. Feature Experimentation, SDKs and legacy Full Stack need no changes under this report. If original Project JavaScript was replaced, ask Support to restore it. Preserve web/CDN/WAF/CSP and payment/fraud logs covering at least November 16; assess notification duties with your advisers.
  - title: Check the vendor's additional preliminary indicators
    hint: Block and search web, CDN, CSP and proxy logs for pay-cloud[.]online, pay.pay-cloud[.]online and pay-relay.wordpressadmin001.workers[.]dev. The report also lists 193.176.211[.]170 and 193.176.211[.]203 as commercial VPN source addresses, explicitly warning they are ephemeral and unreliable as IOCs. Retain the earlier researcher indicators too. A match alone does not establish compromise, successful data capture or attribution.
  - title: Compare preserved early payloads with Socket's sample
    hint: Socket lists 1688360[.]cc/track.js, 5vobauua3ojpklx[.]icu/boot.js, window._k7 and sample SHA-256 1ec4245b3b303304ea24a89b3b2351b0f0c085087050f517d23dcba9694c165a. Its decoded replacement addresses are 0xC4026b06D82b0F0B363eda0642D61CfbDc17884e, THvs6p56XkUiMkJeSc51cAP64u2RsTYqxa and 19g9rZcPeiz8rUvyWpTRyXXhPnjsWrc3kW; the iOS script sets data-channel-code="02111110" and data-cfasync="false". Check saved responses or sandboxed static analysis, not live execution. This hash covers one archived build only; a different hash does not clear another build, and a match alone does not establish visitor exploitation or loss.
  - title: Separate cached-page requests and device exposure from successful exploitation
    hint: Netskope lists 1688360[.]cc, 5vobauua3ojpklx[.]icu, eil786npto9u5bq[.]icu, l7bcsnwc7nzr3uo[.]icu, webshell[.]lol, je4ft3gn8vxudum[.]icu, q1ls1ho9x7wsxlu[.]icu and ios-hack[.]icu; IPs 136.113.106[.]136, 34.96.213[.]201 and 34.87.36[.]58; track.js hashes 814a963c0da480e2449d9b6664480156e1cd6d731014117401bf635badec3a0f and f7b84b9a94f749f8ced3f0112d0a66894e8bbc3b4aa5592021d1b8976a9bad40. Preserve the earlier full indicator sets. Block confirmed campaign domains/IPs in web controls; assess tested Newly Registered Domain/Security Risk URL filtering and browser isolation where blocking is not feasible. Prioritize review of contacting iPhones/iPads on iOS 18 or 26 without treating OS version as evidence of compromise. Match browser/egress logs to device OS, policy result and saved content, then assess card entry or copied wallet addresses. Contact to an iOS endpoint from a desktop does not prove device exploitation, and a match alone does not prove compromise. Netskope is investigating v8hub[.]xyz as a lead; membership in the kit is unconfirmed.
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
  - name: Optimizely statement to BleepingComputer
    url: https://www.bleepingcomputer.com/news/security/optimizely-supply-chain-attack-delivers-malware-to-cnn-fox-news-bbc-salesforce-sites/
    says: Identifies the signup workflow and explains the steps taken to secure affected Optimizely accounts.
    primary: true
  - name: Hudson Rock follow-up with Ohey
    url: https://www.infostealers.com/article/beyond-optimizely-malicious-scripts-traced-across-four-web-services/
    says: Documents dated archive captures and distinguishes observed mobile payloads from proven exploitation.
    primary: true
  - name: Bitquery on-chain follow-up
    url: https://bitquery.io/investigations/optimizely-hack
    says: Estimates likely victim payments after separating wallet inflows tied to a swap, and flags one uncertain payment.
    primary: true
  - name: Apple security releases
    url: https://support.apple.com/en-us/100100
    says: Lists released security updates and their device availability.
    primary: true
  - name: Optimizely November 17 preliminary customer incident report
    url: https://pages.optimizely.com/rs/947-RKE-048/images/Security%20Incident%20Report%20-%20Optimizely%20Web%20Experimentation%20-%20Nov%2017%202026.pdf
    says: Gives signup-flow impersonation details, preliminary vendor timings and indicators, product exclusions, customer evidence requests and revised re-enablement/credential guidance. Final forensics remain pending.
    primary: true
  - name: Socket archived payload analysis
    url: https://socket.dev/blog/optimizely-supply-chain-attack
    says: Statically decodes the 08:08:15 UTC archive capture, publishes its sample hash and markers, and distinguishes its clipper/iOS modules from later card-skimming builds. The capture-versus-first-build timing remains unresolved.
    primary: true
  - name: Netskope original customer-subset telemetry analysis
    url: https://threatlabs.netskope.com/blog/2026/11/optimizely-snippet-compromise
    primary: true
    says: Reports earlier shared-infrastructure sightings and later cached-page requests, separates device traffic from exploitation and treats v8hub.xyz as an unconfirmed investigative lead.
  - name: CISA Known Exploited Vulnerabilities catalog, November 24
    url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
    primary: true
    says: Lists CVE-2026-132224 for Optimizely Web Experimentation signup-flow impersonation and Project JavaScript modification; flags forensic triage with a November 27 due date.

---

Report URI found injected code in the Project JavaScript portion of Optimizely Web snippets. That code runs on pages that include the snippet, whether it is loaded from the Optimizely CDN or a customer host. The team observed remote, encoded and inline loaders. Optimizely confirmed exploitation of an Experimentation vulnerability and told BleepingComputer it was in the account signup flow. Its November 17 preliminary report says the signup flaw let new accounts impersonate existing administrator users using public information and repeated email guesses, without stealing or using their passwords. The vendor says no Optimizely administrator account was breached.

The payload could swap cryptocurrency destinations and send page screenshots and cookies readable by JavaScript to the attacker. Card capture targeted values accessible to the page, such as first-party card fields. Report URI says the code could not read card fields isolated in a cross-origin payment iframe. On iPhones and iPads, the loaders used operating-system-dependent paths. Report URI identified Coruna and DarkSword and observed only fingerprinting in the iOS 26 path it examined. In a follow-up, Hudson Rock reports that Ohey retrieved a later DarkSword stage containing code to upload a Keychain database and other files. A request sent with an iOS 26.3 user agent reached another loader and worker, but the chain’s own log marked the route as nonfunctional. Neither finding establishes that a visitor’s device was compromised.

Report URI’s 19:24–19:59 UTC sweep found 186 affected snippets among 1,611 checked. Its full investigation identified **188 altered snippets across 178 organizations**. These are sample counts and do not establish how many visitors lost data or assets. The researchers also observed transfers to wallets associated with the payload. Those transfers do not establish total visitor losses or the volume of any card or cookie theft. Their 21:52 UTC recheck found one remaining altered snippet in the measured set. In its November 17 update, Report URI said all tracked affected files were clean by 23:11 UTC on November 16. Its November 17 checks also found that 1688360[.]cc stopped resolving after a registrar hold, webshell[.]lol went on hold, eil786npto9u5bq[.]icu no longer resolved to an IP address and 5vobauua3ojpklx[.]icu still resolved but did not respond. These observations do not resolve exposure before cleanup or verify customer-hosted copies.

On November 17, Bitquery estimated about $2,260 across 19 likely victim payments on November 16, or about $2,210 excluding one ambiguous transfer. It traced much of the roughly $7,040 in earlier observed wallet inflows to a swap rather than direct payments from visitors. These are estimates based on the timing and paths of transfers to the eight known addresses. They do not establish each sender’s intent or account for card theft or losses outside the sampled wallets.

Hudson Rock recovered a malicious minute-ly response in addition to the Optimizely scripts. Ohey’s archived captures show poisoned Kissmetrics and StorifyMe responses on November 13, before the Optimizely captures. Those observations do not show continuous delivery between dates. All three loaded the earlier webshell[.]lol injector. The research confirms the served code and leaves the entry methods for those three providers undetermined. Optimizely’s containment statement applies to its own service.

Optimizely says it patched the vulnerability, removed injected code from affected projects and ended active sessions, revoked tokens and reset access for affected Optimizely accounts, according to its statement to BleepingComputer. Its status is monitoring. Downstream site operators still need to assess and address exposure of their own users’ sessions. Verify deployed copies and caches, inspect logs for the pre-cleanup period, and review session and payment exposure where applicable.


The vendor's preliminary timeline puts first account creation at 00:37 UTC and first malicious project code at 07:51 UTC on November 16. It records detection at 13:34, blocking at Cloudflare at 16:06, the signup fix at 16:10, session/token revocation at 16:53 and cleanup completion at 22:24 UTC. The 07:51 first-write claim is later than Report URI's 04:21 captured injection; the reviewed sources do not reconcile that difference. Retain both and request a customer-specific window rather than narrowing log review to the vendor window alone. Cleanup completion and the later independent clean-response check are different observations.

Optimizely excludes Feature Experimentation, SDKs and legacy Full Stack from the identified scope, but says the impersonated users could access whatever Experimentation data their privileges allowed. It says customer passwords were not exposed, does not require general password/API-token resets and permits cleaned Web Experimentation snippets to be re-enabled. Its report says some original Project JavaScript was replaced, so code restoration can require Support. These vendor statements do not erase potential downstream browser exposure, establish visitor loss totals or settle the entry methods at the other script providers. Mandiant-assisted forensics, final root-cause analysis and the final indicator list remain pending.


Socket's November 18 analysis identifies a 19,513-byte archived track.js response captured at 08:08:15 UTC on November 16. Its static decoding found a wallet clipper and an iOS loader, without the card-skimming module described in later versions. This does not contradict the later card-skimmer observations or establish that every served build had identical behavior. The archive capture precedes the reported 08:10 first-build time; Socket says the relationship to the 26 reported builds remains unconfirmed. The analysis did not execute the sample and does not establish successful iOS exploitation or additional visitor losses.

Netskope's November 17 original analysis covers an authorized subset of its customers. It reports webshell[.]lol traffic as early as September 12 and iOS-router traffic on November 10; these are infrastructure sightings, not proof that Optimizely was compromised on those dates or that all earlier traffic shared an entry vector. It observed a final 1688360[.]cc request at 11:38 UTC on November 17 from browser-cached pages, so such a request need not imply a fresh poisoned CDN response after cleanup. Most exploit-domain requests came from desktops; nearly all observed iOS devices were on iOS 27, which the published chains did not target according to Netskope. These findings do not establish successful mobile exploitation, new visitor-loss totals or universal protection outside that customer subset.


On November 24, CISA added the signup-flow issue to its Known Exploited Vulnerabilities catalog as **CVE-2026-132224**. The entry describes impersonation of existing customer users followed by Project JavaScript modification and browser execution through trusted hosted assets. It flags forensic triage and sets **November 27** as the remediation due date for covered US federal agencies. This formal exploitation listing does not establish a new attack wave, a new visitor count or additional losses; retain the earlier customer-specific cleanup and exposure guidance.
