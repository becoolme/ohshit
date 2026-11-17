---
title: "Rootways Apple Pay flaw used to plant a payment skimmer on a Magento store"
level: 4
date: 2026-11-17
tags: [Magento, SSRF, skimmer, e-commerce]
ecosystems: [php, magento]
summary: >-
  Attackers exploited CVE-2026-130583 in the Rootways Authorize.net CIM Pro extension for Magento 2 to read secrets, gain admin access and install a card skimmer on one store investigated by Sansec. Upgrade to 4.1.5 or use the vendor patch.
splash: "Magento 2 stores with the Apple Pay edition of Rootways Authorize.net CIM Pro before 4.1.5."
wipe: "Upgrade the extension to 4.1.5 or apply the vendor patch. Investigate and rotate secrets if the endpoint was exposed."
inTheWild: yes
inTheWildNote: "Sansec investigated an exploited Magento store running extension version 4.0.0."
cves:
  - id: CVE-2026-130583
    score: 9.2
    name: Unauthenticated Apple Pay validation SSRF
    description: The merchant validation controller fetches attacker-supplied URLs and returns their contents, exposing local files and internal services.
fixed:
  - { product: Rootways Authorize.net CIM Pro, version: "4.1.5", status: First patched release }
timeline:
  - date: Nov 14, 22:58 UTC
    title: Probing begins at the store later investigated by Sansec
    body: Investigators saw attempts against several other Magento flaws before the Apple Pay endpoint was exploited.
  - date: Nov 15, 2026
    title: Attackers exploit the validation endpoint and install a skimmer
    body: They obtain database credentials, create an admin account, gain code execution and inject a loader into storefront pages.
  - date: Nov 16, 2026
    title: Sansec identifies and reports the flaw to Rootways
  - date: Nov 17, 2026
    title: Rootways ships 4.1.5 and VulnCheck publishes the CVE
    body: Sansec publishes its investigation, mitigation steps and indicators.
checklist:
  - title: Identify and patch every affected installation
    hint: "Run `composer show rootways/module-authorizecim` or check `app/code/Rootways/Authorizecim/composer.json` for manual installs. Upgrade to 4.1.5 or later even if Apple Pay is off, or apply the two-file patch linked by Rootways. Contact Rootways if your Marketplace channel has no fixed release."
  - title: Restrict the validation endpoint while patching
    hint: "If you can suspend Apple Pay, disable it with `payment/rootways_authorizecim_option_applepay/active` set to `0`, flush the Magento cache, and block `/rootways_authorizecim/applepay/index` at the web server. Test that the block works from outside the store. Apply the patch even if you have blocked the route."
  - title: Preserve logs and look for signs of exploitation
    hint: "Search HTTP logs for the Apple Pay endpoint with unexpected `validationUrl` hosts, non-HTTPS schemes or injected PHP in `z`. Sansec’s indicator table has the full request, file, hash and marker list. Network indicators include 45-86-62-180[.]sslip[.]io, 45.86.62.180, 37.72.140.221, 45.166.20.61, 54.39.16.34 and 2.27.168.28. A match alone does not prove compromise."
  - title: Contain compromised stores and replace exposed secrets
    hint: "If exposure or compromise is suspected, save logs and disk and database snapshots. Isolate affected hosts, inspect `admin_user` for unexpected accounts, review `design/head/includes` in `core_config_data` and scan the web root for skimmers and shells such as `pub/media_sync.php`. Restore clean code and configuration, rotate the database password and follow Adobe Commerce key-rotation procedures for `crypt/key` in `app/etc/env.php`. Invalidate unauthorized admin sessions, protect Redis with authentication, restrict Adminer to trusted IPs and coordinate any potential card exposure with your payment processor."
sources:
  - name: Rootways security advisory
    url: https://www.rootways.com/blog/security-update-authorizenet-cim-pro-extension-v415-apple-pay
    primary: true
    says: Confirms the affected edition, version 4.1.5 and the two-file patch.
  - name: Sansec forensic investigation
    url: https://sansec.io/research/rootways-authorize-net-apple-pay-ssrf
    primary: true
    says: Documents exploitation at a Magento store and provides mitigation steps and indicators.
  - name: VulnCheck CNA record
    url: https://cveawg.mitre.org/api/cve/CVE-2026-130583
    primary: true
    says: Identifies affected releases before 4.1.5 and rates the flaw 9.2 under CVSS 4.0.
---

An unauthenticated request to the extension’s Apple Pay merchant validation endpoint can make Magento fetch an attacker-selected URL and send back the response. The request can read files accessible to Magento’s PHP process or reach services that are normally internal. Sansec says the patch restricts the destination to Apple Pay gateway URLs over HTTPS and disables redirects.

Sansec investigated a Magento 2.4.8 store running Rootways 4.0.0 with Apple Pay enabled. The attacker read database credentials and the Magento encryption key from `app/etc/env.php`, used the exposed credentials through an internal Adminer instance to add an administrator, and got code execution through a template preview. The attacker then deployed a web shell and injected a loader that sent card fields to a WebSocket collector. Sansec documents one store and does not give a count of affected cardholders or confirmed losses.

If you cannot update the full extension immediately, use the two-file patch linked in the [Rootways advisory](https://www.rootways.com/blog/security-update-authorizenet-cim-pro-extension-v415-apple-pay). Rootways says its edition without Apple Pay is unaffected. Apply the fix if you use the Apple Pay edition, even with the feature switched off. If the route was exposed, check for persistence and stolen credentials before returning the store to normal service.
