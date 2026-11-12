---
title: Chrome fixes an exploited XML use-after-free in a new desktop update
summary: Google says an exploit for CVE-2026-125350 exists in the wild. The November 9 Chrome Stable rollout fixes the XML use-after-free alongside other security bugs. Relaunch Chrome after the update to load the patched build.
splash: Desktop Chrome Stable on Windows, macOS and Linux below the November 9 patched build.
wipe: Update Chrome Stable to 157.0.8103.50/.51 on Windows or macOS, or 157.0.8103.50 on Linux, then relaunch.
inTheWildNote: Google reports a live exploit. CISA added the flaw to KEV on November 10.
level: 4
date: '2026-11-09'
tags:
- Chrome
- browser
- use-after-free
inTheWild: 'yes'
timeline:
- date: Nov 9, 2026
  title: Google announces the Chrome Stable update
  body: Google says it knows of an exploit for the XML bug in the wild.
- date: Nov 10, 2026
  title: CISA adds CVE-2026-125350 to KEV
  body: The catalog lists November 24 as the due date for applicable U.S. federal civilian agencies.
checklist:
- title: Install and verify the patched build
  hint: Open chrome://settings/help to check the build and start the update. Use your managed package channel where applicable. Relaunch, then reopen the page to verify the running version.
- title: Review alerts on exposed systems
  hint: Check endpoint alerts and browser activity around suspicious browsing. Preserve relevant evidence and investigate affected devices with your security team. Google has not published case-specific indicators in this release note.
sources:
- name: Chrome Stable release announcement
  says: November 9 platform builds, XML use-after-free and confirmation of an exploit in the wild.
  url: https://chromereleases.googleblog.com/2026/11/stable-channel-update-for-desktop_018223192.html?amp=1
  primary: true
- name: CISA KEV catalog
  says: Confirms known exploitation and the listed federal remediation deadline.
  url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
  primary: true
cves:
- name: XML use-after-free
  description: Google identifies a use-after-free in Chrome’s XML component.
  id: CVE-2026-125350
fixed:
- product: Chrome Stable for Windows and macOS
  version: 157.0.8103.50/.51
- product: Chrome Stable for Linux
  version: 157.0.8103.50
---

This is a later Stable release than the [November 3 Chrome batch](/incidents/chrome-157-security/). Google lists the flaw as High and has not published the full delivery chain, exact interaction requirements or victim scope in its announcement. Confirm the build on each desktop platform and track browser derivatives through their own vendors.
