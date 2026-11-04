---
title: Chrome 157 fixes 213 security bugs, including seven critical flaws
level: 3
date: '2026-11-03'
tags:
- Chrome
- browser
- memory safety
ecosystems:
- chromium
- android
summary: Chrome 157 fixes 213 security bugs, including seven critical flaws. Crafted web pages can trigger code execution; three critical entries are Android-specific. Update desktop/Android Stable and restart. Extended Stable 156.0.8078.88 carries a separate 55-fix subset, not all 213 fixes. Exploitation is unconfirmed.
splash: Chrome desktop and Android users visiting attacker-controlled HTML; some critical bugs are Android-specific
wipe: 'Install Chrome Stable 157.0.8103.38+ (.38/.39 Windows/Mac), then restart; managed Extended Stable: 156.0.8078.88+ subset'
inTheWild: unknown
inTheWildNote: Google’s release notes do not report exploitation; this is not proof that none occurred.
cves:
- id: CVE-2026-121156
  name: Dawn buffer overflow
  description: Google rates this Critical. A malicious HTML page can trigger potential code execution outside the sandbox in Chrome before 157.0.8103.38.
- id: CVE-2026-121229
  name: ANGLE memory corruption on Android
  description: Google rates this Critical. A malicious HTML page can trigger potential code execution outside the sandbox in Android Chrome before 157.0.8103.38.
- id: CVE-2026-121246
  name: WebGL use-after-free on Android
  description: Google rates this Critical. A malicious HTML page can trigger potential code execution outside the sandbox in Android Chrome before 157.0.8103.38.
- id: CVE-2026-121035
  name: Prerender use-after-free
  description: Google rates this Critical. A malicious HTML page can trigger code execution outside the sandbox in Chrome before 157.0.8103.38.
- id: CVE-2026-121247
  name: Dawn buffer overflow on Android
  description: Google rates this Critical. A malicious HTML page can trigger potential code execution outside the sandbox in Android Chrome before 157.0.8103.38.
- id: CVE-2026-121203
  name: Geometry use-after-free
  description: Google rates this Critical. A malicious HTML page can trigger code execution inside the sandbox in Chrome before 157.0.8103.38.
- id: CVE-2026-121126
  name: Core use-after-free
  description: Google rates this Critical. A malicious HTML page can trigger potential code execution outside the sandbox in Chrome before 157.0.8103.38.
- id: CVE-2026-118306
  name: FileSystem use-after-free — earlier Stable fix
  description: Google rates this Critical. A malicious HTML page can trigger code execution outside the sandbox in Chrome before 156.0.8078.73.
- id: CVE-2026-76024
  name: MediaStream use-after-free — earlier Stable fix
  description: Google rates this Critical. A malicious HTML page can trigger code execution inside the sandbox in Chrome before 156.0.8078.79.
fixed:
- product: Chrome Stable — Windows / macOS
  version: 157.0.8103.38
  status: Google ships .38/.39
- product: Chrome Stable — Linux
  version: 157.0.8103.38
  status: Stable release
- product: Chrome Stable — Android
  version: 157.0.8103.38
  status: Google Play rollout
- product: Chrome Extended Stable — Windows / macOS
  version: 156.0.8078.88
  status: Separate 55-fix subset; not all 157 fixes
timeline:
- date: Nov 3, 2026
  title: Extended Stable receives a separate 55-fix update
  body: 156.0.8078.88 lists three critical CVEs, including Dawn CVE-2026-121156 and two earlier Stable disclosures.
- date: Nov 3, 2026
  title: Chrome 157 reaches desktop Stable
  body: 'Google lists 213 security fixes: seven Critical, 77 High, 75 Medium and 54 Low. Windows/Mac receive .38/.39; Linux receives .38.'
- date: Nov 3, 2026
  title: Android Stable rollout begins
  body: 157.0.8103.38 includes corresponding desktop security fixes unless otherwise noted; Play availability may take days.
checklist:
- title: Update and relaunch desktop Stable
  hint: 'Open Chrome’s menu → Help → About Google Chrome, allow the update, select Relaunch and recheck the displayed version: 157.0.8103.38 or newer (Windows/Mac may show .39). Linux users can update through the package manager. Downloading without restarting leaves the running browser unpatched.'
- title: Update Android through Google Play
  hint: Open Google Play → profile → Manage apps & device → Updates available → Chrome → Update, then reopen Chrome → menu → Settings → About Chrome and verify 157.0.8103.38 or newer. Google rolls the release out over several days; if unavailable, recheck rather than treating the old version as patched.
- title: Verify managed channel and product-specific coverage
  hint: For Windows/Mac Extended Stable fleets, install 156.0.8078.88 or later and restart, then verify the actual channel and version. Its 55-fix list overlaps Chrome 157 but does not assert coverage of every 157 CVE. Track your browser vendor’s own advisory for Edge, other Chromium products, WebView, ChromeOS and iOS; these version numbers do not establish their fixes. Bug details remain restricted in some cases; do not try to bypass them.
sources:
- name: Google Chrome 157 desktop release
  url: https://chromereleases.googleblog.com/2026/11/stable-channel-update-for-desktop.html
  primary: true
  says: 213 fixes and seven Critical entries; no exploitation statement.
- name: Google Chrome 157 Android release
  url: https://chromereleases.googleblog.com/2026/11/chrome-for-android-update.html
  primary: true
  says: 157.0.8103.38 rollout and corresponding desktop security fixes.
- name: Google Extended Stable November 3 release
  url: https://chromereleases.googleblog.com/2026/11/extended-stable-update-for-desktop.html
  primary: true
  says: 156.0.8078.88 and its separate 55-CVE subset.
- name: Google Chrome Releases public feed
  url: https://chromereleases.googleblog.com/feeds/posts/default?alt=json&max-results=10
  primary: true
  says: Readable full originals when direct HTML omits article bodies; same publisher, not independent corroboration.
- name: Google desktop update instructions
  url: https://support.google.com/chrome/answer/95414
  primary: true
  says: About Chrome, restart requirement and Linux package-manager route.
- name: Google Android update instructions
  url: https://support.google.com/chrome/answer/95414?co=GENIE.Platform%3DAndroid
  primary: true
  says: Play Store update path and version checking.
- name: Google CNA record CVE-2026-121156
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121156
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-121229
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121229
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-121246
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121246
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-121035
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121035
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-121247
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121247
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-121203
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121203
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-121126
  url: https://cveawg.mitre.org/api/cve/CVE-2026-121126
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-118306
  url: https://cveawg.mitre.org/api/cve/CVE-2026-118306
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
- name: Google CNA record CVE-2026-76024
  url: https://cveawg.mitre.org/api/cve/CVE-2026-76024
  primary: true
  says: Vendor-authored record; individual platform, affected version and sandbox boundary.
---

Google’s November 3 Chrome 157 release fixes 213 security issues in one batch. The CVE entries here highlight all seven Critical issues in that release and the two additional Critical issues in the accompanying Extended Stable update; they are not the full 213-entry list. The complete vendor list remains in the desktop release and readable public feed. These are vendor severity labels, not independently assigned CVSS scores.

The seven Chrome 157 Critical issues are not interchangeable: Google’s CNA records limit the ANGLE, WebGL and second Dawn entry to Android. The Geometry issue describes code execution inside the sandbox; the other six describe execution, or potential execution, outside it. The attack input is a crafted HTML page. The release and CNA descriptions do not specify additional feature/configuration prerequisites; restricted bug details cannot support invented exploit chains. No public PoC or confirmed exploitation is established by the reviewed sources. L3 reflects a mainstream browser and vendor-described sandbox-boundary risks, rather than a claim of an ongoing attack campaign.

Desktop Stable fixes ship as 157.0.8103.38/.39 on Windows/Mac and 157.0.8103.38 on Linux. Android receives 157.0.8103.38 and the corresponding desktop fixes unless otherwise noted. Rollout takes days or weeks on desktop and days in Play; installation and browser restart must be verified.

Windows/Mac Extended Stable separately receives 156.0.8078.88 with 55 security fixes. That list includes CVE-2026-121156, plus earlier disclosures CVE-2026-118306 and CVE-2026-76024. Their earlier Stable fix thresholds were 156.0.8078.73 and 156.0.8078.79 respectively; this report does not change their initial disclosure dates to November 3. The 55 and 213 lists overlap: do not add them as unique vulnerabilities, or treat 156.0.8078.88 as a universal fix for every Chrome 157 issue. Other products need their own release confirmation.
