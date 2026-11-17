---
title: CartJacked researchers verify live checkout skimmers and malware lures
summary: Guardio found live script injection, fake payment forms and ClickFix lures on compromised storefronts. Its October crawl estimate was about 12,200 hijacked shops. In sealed tests, code from 63 October shops captured a test card. The study does not count stolen customer cards.
splash: Compromised e-commerce pages, including checkout pages serving a skimmer and storefronts presenting fake verification prompts.
wipe: Inspect storefront and checkout as a guest, contain suspect scripts and verify the restored payment flow before reopening.
inTheWildNote: Guardio observed live malicious code and reproduced card capture with test data.
level: 4
date: '2026-11-09'
updated: '2026-11-17'
tags:
- e-commerce
- skimming
- ClickFix
inTheWild: 'yes'
timeline:
- date: Nov 9, 2026
  title: Guardio publishes CartJacked measurements
  body: The report separates crawl estimates, live storefront observations and sealed checkout testing.
- date: "Nov 12, 2026"
  title: "Ohey counts 26 sites serving RTCGnaw"
  body: "The November 12 snapshot counts 26 affected sites observed since September 4 and identifies overlap with two hosts in the CartJacked appendix."
- date: Nov 14, 2026
  title: Ohey records a change in RTCGnaw contract routing
  body: Ohey dates a route from a BNB Smart Chain testnet contract to a Sepolia payload contract to November 14.
- date: Nov 15, 2026
  title: Ohey updates the observed RTCGnaw scope
  body: The cumulative count stays at 26 sites. Ohey matched 17 sites in the past 30 days and reads 16 related contracts daily.
- date: Nov 16, 2026
  title: Ohey updates the RTCGnaw match count
  body: Researchers matched 27 sites in their full dataset and 18 sites in the past 30 days.
checklist:
- title: Inspect and contain payment-page modifications
  hint: Compare production themes, plugins, inline scripts and third-party assets to known-good versions. Test payment as a guest in an isolated browser with test data. If you find a skimmer, preserve page, network and deploy evidence, suspend affected checkout and coordinate with your payment processor.
- title: Hunt the published network indicators
  hint: Guardio’s Selected indicators appendix lists 90 entries across seven groups. Network indicators include kjhg[.]lol · ath.pleh[.]org · gentle-dew-e922.avsecurity.workers[.]dev (newusdt.png, /download/Pro*.dll) · fastly.jsdelivr[.]net/gh/Katy7684/ · fastly.jsdelivr[.]net/gh/sdedyk172/ · cdn.jsdelivr[.]net/gh/zor-876/futures-import@04e2419/llm · dc84406c-gei55kj16cf-d1fa3d9fc.fablegrid[.]cc/install.ps1 · swingerwives[.]com · escapeai[.]live/loader_v2.sh · t-trustrest[.]com/govnologi/ · cosmical2049[.]com · copiose[.]org · interseq[.]at · latoem[.]biz · ncheck-brows[.]beer · hagosuro[.]lc · gfisoda[.]biz · forecast-chaos[.]com · stand-medal[.]com · notion-brown[.]com · railroad-boot[.]com · great-basic[.]com · highlight-pyramid[.]com · basic-junior[.]com · cold-pyramid[.]com (September) · rehearsal-b[.]com · correspondabb[.]com · chordapple[.]com (October; some already in September) · hostpdf[.]co · zendlock[.]shop · ledon[.]pics · iresume[.]shop · jetmaster[.]wiki · globalstat[.]shop
    · gload[.]pics · hightraff[.]shop · homed[.]pics (g.php, r.php) · ymsi[.]my · phobosp[.]info · armedsurf[.]wiki · xincha[.]vip · habcd[.]cc · hiends[.]top · bidirect[.]shop · vsign[.]biz · dccome[.]app · resultip[.]cc · geotagcloud[.]shop · ministat[.]shop · hyperstat[.]shop · statmaster[.]shop (/cdn/) · streetmeriks[.]top · worldpixelwide[.]top · searchpixelstuff[.]top · variuspixel[.]top · fabulo[.]xyz (/api/accept-car) · google-api.hhos[.]net · lomivos[.]com · onlinestatus[.]site · gstatls[.]cc · pixelhaimer[.]top · jinoapi[.]com · bugsolve[.]net · speed-rankeer-east[.]com · visscoregate[.]com · securities-cdn[.]com · socket-connect[.]com · medianinfer[.]com · iostatic[.]net · llvechatinc[.]com · api.securesflare[.]com · cloud.protectionflare[.]com · api.cloudservicecon[.]com (TURN on 443). Consult the appendix for hashes, contracts and paths. Match only the listed paths or subdomains on shared services, and corroborate any hit before concluding compromise.
- title: Restore trusted checkout and respond to exposed users
  hint: Rebuild from trusted code, remove injected assets, investigate entry points and unauthorized accounts, rotate relevant admin and deployment credentials, and validate external requests before reopening. Follow your payment processor’s incident guidance. If you entered card details on a confirmed affected checkout, contact your issuer through a trusted channel.
- title: "Look for RTCGnaw in checkout traffic"
  hint: "Use Ohey’s full list of 16 tracked contracts and browser indicators. Network indicators include systmshield[.]com · threatblck[.]com · defendsstm[.]com · guardsstm[.]com · contentprotectiongate[.]com · cdn[.]api-middle-connect[.]com/metrics · tawoauth[.]com/chat · scomper[.]store/sslsocket · mouseflow[.]nexus/connection · woocompay[.]com/assets · wpguarding[.]com/system · api[.]cloudservicecon[.]com · cloud[.]protectionflare[.]com · 185[.]141[.]27[.]56:3479 · 103[.]141[.]13[.]26:3479 · app[.]dinkfoundry[.]com · authwic[.]com (historical) · blanautch[.]com (historical). Check deployed JavaScript for 0xe2179b8e, 0xd62aa7b8, __S_INITED and __OWE_EARLY. Check checkout traffic for WebRTC data channels and image requests with p and t. Correlate hits with the published script markers and payment logs. Treat beacon payloads as sensitive and corroborate a hit before concluding compromise. Look for a Blob worker receiving nodes, contractAddress and functionSelector. Check WebSocket requests under /api/bundle/ and beacons to /api/events."
sources:
- name: Guardio Labs CartJacked report
  says: Provides crawl estimates, live checks, controlled test-card capture and indicators.
  url: https://site.guard.io/labs/cartjacked---one-in-195-online-shops-we-scanned-was-hijacked
  primary: true
- says: "Documents observed sites, fake checkout behavior, overlapping infrastructure and indicators."
  name: Ohey RTCGnaw research
  url: https://ohey.ca/threats/web-skimmers/rtcgnaw/
  primary: true
- name: Ohey EtherHiding contract tracker
  url: https://ohey.ca/threats/etherhiding/contracts/
  says: Lists RTCGnaw routes by chain and records destination history.
  primary: true
---

This is a set of observed campaigns. The figure of roughly 12,200 comes from an adjusted estimate across about 2.38 million stores in October Common Crawl data. The 63 figure comes from sealed tests on code from October shops and measures capture of test data. It does not measure customer losses. Guardio documented fake fields replacing legitimate payment frames, collection via external hosts or browser storage, and fake verification prompts that copy commands. Some kits suppressed the fake form for logged-in administrators. Test as a guest to cover that case.

Ohey’s November 12 snapshot counted 26 sites serving RTCGnaw since September 4, including 16 in the previous 30 days. This is a separate set of observations from Guardio’s crawl and controlled tests. Two hosts appear in both reports. The observed scripts used payloads loaded from blockchain contracts and targeted WooCommerce and Magento stores. Ohey recorded fake forms styled as Stripe and Poynt on separate stores. The skimmer can collect card and billing data, display a fake decline and then stay quiet for 15 minutes. The customer may complete the genuine checkout on retry. During triage, compare reported declines with the processor’s transaction records and look for WebRTC data channels or, in some variants, image beacons with p and t parameters.

**November 15 update.** Ohey’s rolling count rose from 16 to 17 sites, with 26 sites observed in total. These are sites where researchers matched script code. The count gives no measure of stolen cards or confirmed losses. The researchers also observed a two-stage loader on a PrestaShop store. It used a Blob worker to read a BNB Smart Chain testnet contract, then loaded the next stage from Sepolia. Ohey dates the routing record to November 14. BNB Smart Chain testnet contract `0x3596a5d8fdd13763482de91a4ca74b7dbcbd98f9` points to Sepolia contract `0xf7baf5d244086fb305588f1de192e3ae7203e70c`, which lists app[.]dinkfoundry[.]com as its destination.

Ohey’s November 16 count includes 27 matched sites, 18 of them matched in the past 30 days. Ohey still reads 16 related contracts daily. These observations cannot establish how many payment records were captured or how much money was lost.
