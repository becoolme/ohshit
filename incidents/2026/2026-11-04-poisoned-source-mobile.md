---
title: Poisoned Source mobile exploit campaign uses compromised sites, lookalikes and Plerdy analytics
level: 4
date: '2026-11-04'
updated: '2026-11-06'
tags:
- Plerdy
- Mobile
- Supply chain
summary: Sekoia reports Poisoned Source delivering patched iOS/Android exploits through websites, lookalikes and Plerdy’s August–September script compromise. It assesses an APT29 link with moderate-to-high confidence. Plerdy confirms server/contact-data access but no known visitor compromise; infection totals are unknown.
splash: Unpatched mobile visitors to campaign pages or sites loading poisoned Plerdy code August 27–September 3; exposure is not proof of infection.
wipe: Update mobile OS/browsers, preserve site/device evidence, verify scripts and revoke exposed sessions through trusted devices.
inTheWild: 'yes'
inTheWildNote: Sekoia documents deployed exploit delivery; no confirmed visitor-infection total is given.
cves:
- id: CVE-2025-43529
  name: Class A/B WebKit entry
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
- id: CVE-2024-27834
  name: Class A pointer-authentication bypass
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
- id: CVE-2026-20700
  name: Class B pointer-authentication bypass
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
- id: CVE-2025-14174
  name: Class B first sandbox-escape step
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
- id: CVE-2025-43510
  name: Class B second sandbox-escape step
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
- id: CVE-2025-43520
  name: Class B kernel privilege escalation
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
- id: CVE-2026-3910
  name: Class C Chrome entry
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
- id: CVE-2025-27038
  name: Class C Android escalation
  description: Known, previously patched flaw used in a recovered mobile exploit chain; not a newly disclosed zero-day.
timeline:
- date: Aug 27, 2026
  title: Plerdy’s script-compromise window begins
- date: Sep 3, 2026
  title: Plerdy removes unauthorized tracking code
  body: The vendor says server credentials were replaced; passwords and all sessions were reset/ended September 4.
- date: Nov 4, 2026
  title: Sekoia publishes the wider Poisoned Source campaign
  body: The report links three delivery vectors and recovered iOS/Android chains; attribution is a moderate-to-high-confidence assessment, not proof every visitor was infected.
- date: Nov 6, 2026
  title: Plerdy updates its public response
  body: It confirms stolen administrator credentials, customer contact-data access and prior resets, says no visitor compromise is known, and offers technical indicators to customers.
checklist:
- title: Update mobile operating systems and browsers
  hint: Use official device and browser update channels. Sekoia’s observed profiles are iOS 16.7, iOS 18.5 and Android Chrome 139–145 except 143; these are delivery profiles, not universal affected/fixed ranges. Its recovered chains use already-patched flaws. Escalate suspected exploitation to your security team, preserve device evidence and revoke exposed sessions/credentials from a clean device; do not infer a visit alone stole data.
- title: Verify website scripts and the Plerdy response
  hint: Preserve served HTML/JavaScript, hashes, timestamps, CDN/proxy logs and device/network evidence for August 27–September 3 before cleanup. Plerdy says its current build is verified and removal is unnecessary; inspect actual requests in browser developer tools and obtain its technical report/domain list through official support. It reset all passwords and ended sessions September 4; change reused passwords elsewhere and enable its email-code two-step login.
- title: Hunt all public network indicators and both hash sets
  hint: 'Public attacker domains/IPs: static.flux-telemetry.com (109.104.106.107), edge-ord.clouds-stacks.com (95.133.231.28), ad.starx-net.com (195.58.140.105), america250.holiday (192.121.46.25), theowo.club (188.190.17.232), adsprism-stat.com, ads-it-assets.com, cdn.adv-static.com, wpvortex-mod.com, assets-int.com. The legitimate compromised source was a.plerdy.com/public/js/click/main.js, not an attacker-owned Plerdy domain. Check /module/5b4c8fea5cbcee273e8d830f52-temfp.js, /api/uGmlx2pmMHU1jq7wZU2QWgeC28vbXalf/v1, /api/<NONCE>/v1–v3, port 8881 /telemetry/v12 and VDGH_TOKEN_REF. The full report publishes 13 distinct SHA256 values: nine in its IoC table plus four different body variants. Use both sets; not all stages share one hash. Additional indicators are withheld, so this is the complete public set, not complete campaign coverage. A match or tracker load alone does not prove exploitation.'
sources:
- name: Sekoia original Poisoned Source investigation
  url: https://www.sekoia.com/blog/poisoned-source-apt29-watering-holes-targets-mobile-devices-with-n-day-exploits
  primary: true
  says: 'November 4 wider campaign report: three vectors, eight used CVEs, observed profiles, all public network/13 hash indicators and attribution confidence; some infrastructure is withheld.'
- name: Plerdy original incident response, updated November 6
  url: https://www.plerdy.com/blog/security-incident/
  primary: true
  says: Confirms August–September server/script compromise, client contacts, September 4 password/session reset, no known visitor compromise, verified current build and technical-report availability.
---

The November 4 disclosure covers the wider campaign; Plerdy’s earlier component notice is not a new November intrusion. Its script was one vector alongside direct injections and lookalike reverse proxies. Sekoia inferred the Plerdy fingerprinting link from matching filenames and redirects because that host was offline; Plerdy says no visitor compromise is known. Hundreds/thousands of tracker-loading sites are exposure estimates, not infected-device counts. Attribution remains Sekoia’s assessment. No final victim total or confirmed card theft is established. L4 reflects documented operational exploit delivery; a fully updated device is outside the recovered n-day chains, not immune to every attack.
