---
title: Poisoned Windows software updates deliver a Yunnan-targeted implant
level: 4
date: '2026-11-06'
tags: [software updates, supply chain, Windows, Yunnan]
summary: QiAnXin’s RedDrip team reports six Chinese software update channels hijacked. An analyzed Windows implant checks for Yunnan and uses DNS-over-HTTPS TXT records to find its command servers. The report publishes indicators and omits product names and victim counts.
splash: Windows systems that ran tampered updates or installers from the campaign, especially endpoints in Yunnan.
wipe: Isolate suspicious hosts, preserve update and network evidence, and use verified signed installers to rebuild affected systems.
inTheWild: 'yes'
inTheWildNote: RedDrip observed hijacked update channels and analyzed the delivered malware.
timeline:
- date: Nov 6, 2026
  title: Researchers disclose the update hijacks and campaign indicators
  body: The report documents malicious installers, sideloading, persistence and command-server discovery.
- date: '~Oct 31, 2026'
  title: RedDrip starts tracking the activity in late October
  body: The report gives only an approximate observation date.
checklist:
- title: Isolate suspected endpoints and preserve evidence
  hint: Disconnect suspected hosts from normal network access. Preserve suspicious installers, endpoint logs, process trees, scheduled-task exports, and DNS and proxy logs. Review updater executions and downloads from late October onward. Pause suspect update channels until you can verify their integrity.
- title: Hunt for the published network and host indicators
  hint: >-
    Check traffic to 107.173.84[.]53 and its /information.php, /fjai87gajio.zip and /newxx_x64 paths, plus
    m1m101010.fmcag[.]org, tg002.mmp-gep[.]org, img01.mmca-cdn[.]com, img21.mmca-cdn[.]com,
    img31.mmca-cdn[.]com, mp.mmca-cdn[.]com:443/install_v.exe.shell and the placeholder ms.jsf[.]ink.
    Look for /wA8zS0xD8gT3-zzz/aaa_config_new.php or /aaa_getjson.php under the same prefix, and non-browser
    /dns-query?dns= or /resolve?name= requests. On hosts, inspect the Dsemanager Update task, pipes ending in
    _MyControlPipeaaa, and dsemanager.exe loading atiadlxy.dll from its own directory. The report's IOC section
    has the 15 full SHA-256 hashes, additional host artifacts, headers and user agents. It also gives one
    MD5 for the website-installer sample earlier in the report. Correlate matches with process, file and
    update history. A match alone does not prove compromise.
- title: Rebuild affected hosts and restore trusted updates
  hint: Use a known-clean image and publisher-verified signed packages. Check installer signatures and provenance before enabling updates again. Rotate credentials and revoke sessions accessible from affected hosts from a clean system. For updater operators, serve manifests over authenticated HTTPS and verify package signatures against a trusted key before execution.
sources:
- name: QiAnXin RedDrip technical analysis as published on CTF导航
  url: https://www.ctfiot.com/314981.html
  primary: true
  says: Describes six observed update-channel hijacks, sample behavior, geography checks, persistence and detailed indicators. The public page marks November 6 as the publication date.
---

The research describes update clients that accepted unencrypted manifests containing both the download link and its MD5 digest. Anyone able to alter that response could replace both values and advertise a newer version. The affected update flow also lacked publisher-signature verification. The report does not establish how each update channel was first hijacked.

The researchers analyzed tampered installers, including one that used a signed AMD executable to load an adjacent malicious DLL. A later Windows payload can load .NET plug-ins in memory and persist through a scheduled task. One analyzed implant checks the endpoint's geolocation for Yunnan. The researchers also linked a modified system tool and a trojanized messaging client using shared infrastructure and a named-pipe pattern. They do not name the affected products, quantify infections or establish which plug-ins ran on victim systems.
