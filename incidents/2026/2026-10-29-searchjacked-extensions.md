---
date: 2026-10-29
title: Searchjacked research links hundreds of browser extensions to search-query interception
level: 3
tags:
  - Chrome
  - extensions
  - Searchjacked
ecosystems:
  - web
summary: Socket documents search-hijacking extensions that route queries through operator-controlled proxies. Its 319-extension, roughly 13.4-million-user tally spans a decade and is not a count of newly infected or unique victims. The new report adds 264 identified extensions.
splash: Browser profiles with the identified extensions installed and their search-provider overrides enabled
wipe: Remove identified extensions, restore trusted search settings and audit managed browser policies
inTheWild: yes
inTheWildNote: The researcher directly tested live proxy redirection and documented installed extensions.
cves: []
fixed: []
timeline:
  - date: Oct 29, 2026
    title: Socket publishes expanded identification and proxy-redirection analysis
  - date: ~Apr 2025
    title: Earlier research documents related search-hijacking extensions
checklist:
  - title: Inventory and remove the identified extensions
    hint: The report covers 319 extensions, but its complete machine-readable ID list was not available in the public text we could read. Inspect chrome://extensions and enterprise inventory using verified examples and request the full indicator dataset from the researcher. Predator Search has extension ID odkcfoohjiicbelloepgcomekdknchjh. Remove confirmed unwanted extensions from every synced profile and check chrome://policy for forced reinstalls; names and store visibility alone are unreliable.
  - title: Restore search settings and inspect redirects
    hint: Review default search engines and manifest chrome_settings_overrides.search_provider settings. Report examples include search.safesearchgame[.]com/query, suggest.safesearchgame[.]com/querying/autocomplete, searchlio[.]net, searchtosearch[.]com, mcftink[.]com, extension-search[.]online, newtabsearch[.]net, newtabhub[.]net, getsimplepdfsearch[.]com, *.system1[.]partners, *.s1search[.]co and axt.iadispatcher[.]com. Restore a trusted provider after removal. These domains are investigation leads, not a complete blocklist; a match alone does not prove compromise.
  - title: Assess query exposure without overstating it
    hint: Use retained browser and proxy logs to establish whether sensitive queries traversed these proxies. The report does not prove blanket theft of passwords or tokens, nor confirm that all redirects delivered malware. Apply browser extension allowlists and review new install requests; do not infer that unlisted IDs are safe when the full dataset cannot be retrieved.
sources:
  - name: Socket Searchjacked research
    url: https://socket.dev/blog/searchjacked
    primary: true
    says: Primary investigation of newly identified extensions, historical totals, proxy behavior and hunting pivots.
  - name: BleepingComputer report
    url: https://www.bleepingcomputer.com/news/security/chrome-extensions-with-134-million-installs-caught-hijacking-searches/
    says: Reports the same researcher’s findings; it is not independent confirmation of the historical user total.
---

The newly published research adds identified operators and extensions to an older search-hijacking pattern; it does not date the whole campaign to October 29. Search overrides can send queries to an intermediate server even without conspicuous extension permissions or background code.

Socket observed server-selected destinations. Redirecting to phishing or malware is a potential consequence, not a confirmed outcome for every extension. Its aggregate user figures are researcher-reported, unverified outside that investigation, and include extensions from different years. Do not call them 13.4 million newly breached accounts. L3 reflects broad browser exposure and concrete interception behavior, without claiming an internet-wide exploit.
