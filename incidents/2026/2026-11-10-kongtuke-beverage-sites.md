---
title: KongTuke injected malicious scripts into five beverage sites including Canada Dry
level: 4
date: '2026-11-10'
tags:
- WordPress
- ClickFix
- malware
- JavaScript
summary: Ohey found malicious JavaScript on five beverage sites including Canada Dry’s Canadian site. It collects browser-readable cookies and token-like storage values, then shows some visitors a fake Cloudflare check. Windows users who run the pasted command can download and execute malware.
splash: Visitors to five beverage sites. Windows users who ran the fake verification command also risk endpoint compromise.
wipe: Remove WordPress implants, invalidate exposed sessions and isolate Windows endpoints that ran the fake verification command.
inTheWild: 'yes'
inTheWildNote: Ohey captured malicious code on five sites. The number of infected endpoints is unknown.
timeline:
- date: Jul 17, 2026
  title: Public scans capture earlier loaders
  body: Ohey identifies scripts in historical scans of the Mott’s Clamato and Nestea sites.
- date: Nov 10, 2026
  title: Ohey publishes captures from the beverage sites
  body: The researchers confirm malicious code on four sites and add Bai in a same-day update.
- date: Nov 10, 17:30 UTC
  title: Ohey adds a fifth site and details the download stage
  body: The researchers confirm the Bai script and file downloads triggered by an FTP greeting.
checklist:
- title: Remove site-side persistence and invalidate exposed sessions
  hint: Preserve the served HTML, logs, plugin files and database before cleanup. Inspect asset-cache/asset-cache.php, wp-content/mu-plugins/asset-cache-runtime.php, wmedia-optimizer/wmedia-optimizer.php, wp-content/mu-plugins/wmedia-recovery.php and wp_upd. Remove verified implants, restore clean files, purge caches and rotate site credentials and exposed sessions.
- title: Isolate Windows endpoints that ran the fake check
  hint: Disconnect and investigate devices where a user ran the pasted command. Check cmd.exe and FTP activity and %APPDATA%\Microsoft\Windows\Themes for vclreg.exe and vclx370.bpl. Recover affected devices and reset exposed credentials from a clean device.
- title: Hunt network activity and validate cleanup
  hint: Search DNS, proxy and endpoint logs for canadadry[.]ca, mottsclamato[.]ca, www.drinknestea[.]ca (/asset-cache/fjs), hydratewithcore[.]com, drinkbai[.]com, battaglia[.]lol, monteiro[.]click, watsiia[.]top, sehneider[.]com, lrmbardo[.]lol, kloppert[.]lol, bradtte[.]lol, griffihhs[.]click, report-ftp[.]wiki (144.31.215[.]239), yelahaye[.]surf (46.29.26[.]20), syncservice9638[.]com. Ohey lists 15 network entries, 13 hashes and 6 host-artifact groups in its report. Correlate with script responses
    and execution. A match alone does not establish compromise. After cleanup test both page HTML and the loader path from a separate client.
sources:
- name: Ohey KongTuke investigation
  url: https://api.ohey.ca/research/kongtuke-canada-dry-clickfix/
  says: Documents five brand sites, script behavior and delivery indicators from captures and static analysis.
  primary: true
---

Ohey captured KongTuke code on canadadry.ca, mottsclamato.ca, drinknestea.ca, hydratewithcore.com and drinkbai.com. Historical public scans put the earliest script Ohey found on Mott’s Clamato and Nestea on July 17. The November 10 report publicly disclosed this group of affected sites. All five share a parent company and use different servers and WordPress themes. The initial access path and number of affected users remain unclear.

Three sites serve the loader through `/asset-cache/fjs` on their own domain. Core Hydration and Bai reference changing external hosts. Before deciding whether to show fake verification, the loader collects JavaScript-readable cookies and token-like values in local or session storage. For Windows visitors who get the lure, it puts a command on the clipboard and prompts them to run it through the Run dialog. Ohey captured a chain using an FTP greeting to download and start `vclreg.exe` and `vclx370.bpl`.

The researchers confirmed malicious code on live websites and observed active delivery. The number of infected endpoints and any payment-data theft remain unknown. The compromise of public sites delivering malware warrants L4.
