---
title: SuperPixel replaces checkout forms through modified shop-hosted JavaScript
level: 4
date: 2026-11-05
tags: [SuperPixel, Magecart, JavaScript]
summary: Report URI finds SuperPixel stealing card and billing details through modified JavaScript hosted by online shops. It reports over 100 infected stores across WordPress, PrestaShop and OpenCart, an unverified research count. An Ethereum contract supplies the collection URL; the initial entry point remains unknown.
splash: Shoppers using compromised checkout pages; shop operators whose locally hosted JavaScript was modified
wipe: Suspend affected checkout, preserve evidence, restore verified assets and investigate server write access before reopening.
inTheWild: yes
inTheWildNote: Report URI observed infected shops and analyzed the payment-form replacement code.
timeline:
  - date: Nov 5, 2026
    title: Report URI publishes its original SuperPixel investigation
    body: The researcher describes active infections across three shop platforms, fake payment forms and an Ethereum-controlled collection endpoint. No confirmed shopper count, loss total or entry vulnerability is supplied.
checklist:
  - title: Suspend affected checkout and preserve the modified files
    hint: Keep private copies of served JavaScript, server/access logs and checkout network evidence before replacing assets. Compare WordPress wp-includes/js/jquery/jquery.min.js against official checksums and review theme/plugin assets separately; also inspect PrestaShop jQuery UI, tools.js and Fancybox, and OpenCart common.js. Look for roughly megabyte-sized appended code, including repeated copies. These are observed locations, not an exhaustive affected-file list.
  - title: Hunt the full published indicator set in context
    hint: 'Collection domain: metrics-onclick.com. Ethereum contract: 0x4F3D0C43acdF8308B9258dfC9d8aA45DdF3E1D17, selector 0xa38f3568; reported creator: 0x21f6dBC1E3Efb16014E5E6bd56F0A2f27da98934. RPC endpoints: ethereum-rpc.publicnode.com, 1rpc.io and eth.drpc.org are legitimate services being abused, not inherently malicious hosts. Markers: window.__SuperPixelRunning, localStorage.superpixel_rendered, #superpixel-original-hide-style, #superpixel-replace-hide-style, <!--superpixel-render-guard--> and restoreMarkedReplaceTargets. WordPress URL hints: wp-includes/js/jquery/jquery.min.js?v=12 or ?v=13. A match alone does not prove compromise or actor ownership; the contract can change the collection URL and builds have different hashes.'
  - title: Test checkout in a clean browser profile
    hint: Inspect served assets and outbound requests during checkout without entering real card data. The skimmer hides genuine payment fields and shows its replacement once per browser-storage state; a returning session can display the real form. A single clean rendering or automated scan cannot exclude infection, and the report also observed a separately gated loader whose relation to SuperPixel is unknown.
  - title: Restore integrity and close the original write-access path
    hint: Replace modified assets from verified clean distributions and investigate how the server or publishing path became writable. Do not simply remove the appended line and resume sales. The report identifies no CVE or universal fixed version; repeated payload copies suggest reinjection but do not establish its cause. Scope potential payment-card exposure before restoring normal operations.
  - title: Verify script integrity and restrict checkout connections
    hint: A script-src policy permitting self does not detect changes inside trusted same-origin files. After restoring trusted assets and markup, validate SRI hashes and review an enforced connect-src allowlist against required checkout services; reporting alone does not block requests. Monitor unexpected RPC and collection traffic. Do not globally label the legitimate RPC services malicious, or treat CSP/SRI as removal of existing server access.
  - title: Contact your card issuer if you used an affected checkout
    hint: Preserve the shop notice and transaction details, then contact your issuer through its established app or number to assess the card and unexpected charges. Do not send card details to unsolicited recovery contacts. The research does not identify which individual shoppers lost data or establish a monetary loss total.
sources:
  - name: Report URI original SuperPixel research by Scott Helme
    url: https://blog.report-uri.com/superpixel-the-card-skimmer-hiding-inside-your-own-jquery/
    primary: true
    says: Full November 5 report read through the public canonical blog and its identical Ghost publication. Describes observed infections, form replacement, complete indicators, investigation limits and integrity/connection controls. The over-100-shop figure is the researcher's unverified count, not a vendor-confirmed shopper total.
---

Report URI describes a card-skimming campaign that appends obfuscated code to JavaScript already hosted by a compromised shop. Observed files include jQuery and theme/plugin assets; this is not evidence that the upstream jQuery project or every installation of the named commerce platforms was compromised. The researcher reports more than 100 infected stores, an **unverified research count**, while the original server-entry mechanism and exposure period remain undetermined.

The payload watches checkout elements, hides the genuine payment form and substitutes its own. Card number, expiry, CVC and billing details are encoded and sent to a collection endpoint obtained from a read-only Ethereum contract call. The contract can supply a different URL without changing each infected shop. Legitimate RPC providers and the recorded contract-creator address do not by themselves identify the operator or establish compromise of Ethereum.

Per-victim builds differ, and browser storage suppresses repeat display of the fake form. Static hashes, a familiar script URL or an apparently normal returning session therefore cannot establish safety. L4 reflects observed payment-data theft code in active shop infections, not a proven count of stolen cards or financial losses. No blanket software upgrade threshold or completed campaign takedown is established. Preserve evidence, investigate the initial access and assess exposure before reopening checkout.
