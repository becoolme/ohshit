---
title: CartJacked researchers verify live checkout skimmers and malware lures
summary: Guardio found live script injection, fake payment forms and ClickFix lures on compromised storefronts. Its October crawl estimate was about 12,200 hijacked shops. In sealed tests, code from 63 October shops captured a test card. The study does not count stolen customer cards.
splash: Compromised e-commerce pages, including checkout pages serving a skimmer and storefronts presenting fake verification prompts.
wipe: Inspect storefront and checkout as a guest, contain suspect scripts and verify the restored payment flow before reopening.
inTheWildNote: Guardio observed live malicious code and reproduced card capture with test data.
level: 4
date: '2026-11-09'
tags:
- e-commerce
- skimming
- ClickFix
inTheWild: 'yes'
timeline:
- date: Nov 9, 2026
  title: Guardio publishes CartJacked measurements
  body: The report separates crawl estimates, live storefront observations and sealed checkout testing.
checklist:
- title: Inspect and contain payment-page modifications
  hint: Compare production themes, plugins, inline scripts and third-party assets to known-good versions. Test payment as a guest in an isolated browser with test data. If you find a skimmer, preserve page, network and deploy evidence, suspend affected checkout and coordinate with your payment processor.
- title: Hunt the published network indicators
  hint: Guardio’s Selected indicators appendix lists 90 entries across seven groups. Network indicators include kjhg[.]lol · ath.pleh[.]org · gentle-dew-e922.avsecurity.workers[.]dev (newusdt.png, /download/Pro*.dll) · fastly.jsdelivr[.]net/gh/Katy7684/ · fastly.jsdelivr[.]net/gh/sdedyk172/ · cdn.jsdelivr[.]net/gh/zor-876/futures-import@04e2419/llm · dc84406c-gei55kj16cf-d1fa3d9fc.fablegrid[.]cc/install.ps1 · swingerwives[.]com · escapeai[.]live/loader_v2.sh · t-trustrest[.]com/govnologi/ · cosmical2049[.]com · copiose[.]org · interseq[.]at · latoem[.]biz · ncheck-brows[.]beer · hagosuro[.]lc · gfisoda[.]biz · forecast-chaos[.]com · stand-medal[.]com · notion-brown[.]com · railroad-boot[.]com · great-basic[.]com · highlight-pyramid[.]com · basic-junior[.]com · cold-pyramid[.]com (September) · rehearsal-b[.]com · correspondabb[.]com · chordapple[.]com (October; some already in September) · hostpdf[.]co · zendlock[.]shop · ledon[.]pics · iresume[.]shop · jetmaster[.]wiki · globalstat[.]shop
    · gload[.]pics · hightraff[.]shop · homed[.]pics (g.php, r.php) · ymsi[.]my · phobosp[.]info · armedsurf[.]wiki · xincha[.]vip · habcd[.]cc · hiends[.]top · bidirect[.]shop · vsign[.]biz · dccome[.]app · resultip[.]cc · geotagcloud[.]shop · ministat[.]shop · hyperstat[.]shop · statmaster[.]shop (/cdn/) · streetmeriks[.]top · worldpixelwide[.]top · searchpixelstuff[.]top · variuspixel[.]top · fabulo[.]xyz (/api/accept-car) · google-api.hhos[.]net · lomivos[.]com · onlinestatus[.]site · gstatls[.]cc · pixelhaimer[.]top · jinoapi[.]com · bugsolve[.]net · speed-rankeer-east[.]com · visscoregate[.]com · securities-cdn[.]com · socket-connect[.]com · medianinfer[.]com · iostatic[.]net · llvechatinc[.]com · api.securesflare[.]com · cloud.protectionflare[.]com · api.cloudservicecon[.]com (TURN on 443). Consult the appendix for hashes, contracts and paths. Match paths or subdomains on shared services and corroborate any hit before concluding compromise.
- title: Restore trusted checkout and respond to exposed users
  hint: Rebuild from trusted code, remove injected assets, investigate entry points and unauthorized accounts, rotate relevant admin and deployment credentials, and validate external requests before reopening. Follow your payment processor’s incident guidance. If you entered card details on a confirmed affected checkout, contact your issuer through a trusted channel.
sources:
- name: Guardio Labs CartJacked report
  says: Provides crawl estimates, live checks, controlled test-card capture and indicators.
  url: https://site.guard.io/labs/cartjacked---one-in-195-online-shops-we-scanned-was-hijacked
  primary: true
---

This is a set of observed campaigns. The figure of roughly 12,200 comes from an adjusted estimate across about 2.38 million stores in October Common Crawl data. The 63 figure comes from sealed tests on code from October shops and measures capture of test data. It does not measure customer losses. Guardio documented fake fields replacing legitimate payment frames, collection via external hosts or browser storage, and fake verification prompts that copy commands. Some kits suppressed the fake form for logged-in administrators. Test as a guest to cover that case.
