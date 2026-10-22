---
title: "Signal's RingRTC bug can leave call audio active after a local hang-up"
level: 3
date: 2026-10-20
tags: [Signal, privacy, calls]
ecosystems: [signal]
summary: >-
  A malicious call peer can flood RingRTC's event queue and obstruct local call termination, leaving audio and possibly video active. CVE-2026-113380 affects RingRTC before 2.72.0; update Signal clients to builds containing the fixed library.
splash: "Signal clients embedding RingRTC before 2.72.0"
wipe: "Install current Signal updates; integrators must use RingRTC 2.72.0 or later"
inTheWild: no
inTheWildNote: "CISA's October 20 assessment lists no exploitation; the public demo is synthetic"
cves:
  - id: CVE-2026-113380
    score: 9.3
    name: Call termination blocked by event-queue saturation
    description: A call peer can interfere with local hang-up processing, potentially keeping media tracks active.
fixed:
  - product: RingRTC
    version: 2.72.0
  - product: Signal applications
    version: unknown
    status: Exact first fixed app versions are not established by the sources reviewed
timeline:
  - date: Sep 4, 2026
    title: RingRTC 2.72.0 released
    body: The library fix predates the public CVE disclosure.
  - date: Oct 20, 2026
    title: CVE published
    body: MITRE publishes the affected range and CVSS 4.0 score; CISA records no exploitation in its assessment.
checklist:
  - title: Update Signal on every device
    hint: Install current official desktop and mobile releases; RingRTC's version is not the Signal app version
  - title: Verify sensitive calls have actually ended
    hint: Check call and microphone indicators; close the application if capture continues
  - title: Check embedded RingRTC dependencies
    hint: Integrators should require 2.72.0 or later and rebuild their clients
sources:
  - name: MITRE CVE record and CISA enrichment
    url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/113xxx/CVE-2026-113380.json
    says: Published October 20; before 2.72.0 affected; CVSS 4.0 9.3; CISA exploitation assessment is none
    primary: true
  - name: Signal RingRTC fix
    url: https://github.com/signalapp/ringrtc/commit/4b1b6fa53c9f30c87c8ea78e44675d4a13e1e4d3
    says: Call termination requests are tracked independently of queued FSM events
    primary: true
  - name: Signal RingRTC changelog
    url: https://github.com/signalapp/ringrtc/blob/a1d2ffed1de6ac5b22458a3dced8374513cc44f8/CHANGELOG.md
    says: Documents the 2.72.0 library release
    primary: true
  - name: Public technical note and conceptual demonstration
    url: https://github.com/Imahian/Notes/tree/main/docs/CVEs/CVE-2026-113380
    says: Demonstrates queue starvation with an offline model, not an exploit against real Signal calls
    primary: true
---

**CVE-2026-113380** concerns Signal's RingRTC calling library. An existing call peer can saturate its finite-state-machine queue, delaying the local hang-up path while audio, and potentially video, continues. This requires participation in a call; the sources do not establish silent capture of an idle device.

The vendor's patch tracks termination requests separately from queued events. **RingRTC 2.72.0** is the fixed library threshold. The library release on September 4 and public vulnerability disclosure on October 20 are different dates. Neither that threshold nor the release date establishes the first fixed Signal app version for each operating system.

This is **L3** because a mainstream communications component has a credible confidentiality failure. The published demonstration models queue behavior offline; it is not a working Signal exploit. CISA's October 20 assessment records no exploitation. That assessment does not prove attacks have never occurred.
