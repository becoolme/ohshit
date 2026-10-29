---
title: NebuSec reports Telegram Android call RCE; update to 12.10.4 or later
level: 3
date: '2026-10-29'
tags:
- Telegram
- Android
- RCE
ecosystems:
- android
summary: NebuSec reports code execution after a victim answers a Telegram Android call. Android 12.10.4 contains the parser correction. Reported testing covers private calls on ARM64 phones; real-world exploitation and the full exploit chain remain unconfirmed.
splash: Telegram Android 8.6.2–12.10.3 per the researcher’s report; victim must answer a private call; ARM64 tested
wipe: Update Telegram for Android to 12.10.4 or later and verify the installed version
inTheWild: unknown
inTheWildNote: A researcher reports a demonstration; no confirmed real-world attacks are cited.
cves: []
fixed:
- product: Telegram for Android
  version: 12.10.4
  status: Parser correction included
timeline:
- date: Sep 24, 2026
  title: Android 12.10.4 source update contains the correction
- date: Oct 29, 2026
  title: NebuSec publicly reports call-triggered code execution
checklist:
- title: Update the Android app and confirm its version
  hint: Install the current Telegram Android update through your trusted distribution channel; check the version at the bottom of Settings. The minimum identified corrected version is 12.10.4.
- title: Avoid answering untrusted calls until updated
  hint: The reported path requires accepting a private call. Declining unfamiliar calls reduces that exposure while you update; it is not a substitute for installing the corrected app.
sources:
- name: NebuSec disclosure
  url: https://x.com/nebusecurity/status/2115601122727702634
  says: Researcher claims call-triggered Telegram RCE; original post was read through its official embed.
- name: Official X embed of the NebuSec post
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2Fnebusecurity%2Fstatus%2F2115601122727702634&omit_script=true
  primary: true
  says: Primary copy dates the researcher’s public RCE claim to October 29.
- name: Telegram Android 12.10.3 parser
  url: https://github.com/DrKLO/Telegram/blob/9552e5541e1274b9557c9832b204dbfcaf44b3dc/TMessagesProj/jni/voip/tgcalls/v2/Signaling.cpp
  primary: true
  says: The rotation branch reads videoState rather than videoRotation.
- name: Telegram Android 12.10.4 parser
  url: https://github.com/DrKLO/Telegram/blob/c84801762fd5f936c8296ecf09a14a48ebfc4fe4/TMessagesProj/jni/voip/tgcalls/v2/Signaling.cpp
  primary: true
  says: The corrected branch reads videoRotation; repository commit identifies 12.10.4 (7099).
- name: The Hacker News
  url: https://thehackernews.com/2026/10/telegram-android-flaw-lets-attackers.html
  says: Reports NebuSec’s affected range, ARM64 private-call testing and lack of a public full-chain write-up.
---

The public report concerns Android call signaling, not the separate animated-sticker research. It requires the victim to answer; describing it as zero-click would be misleading. L3 reflects a mainstream client and a public researcher claim, not evidence of ongoing attacks.

We compared Telegram’s published Android source: 12.10.3 checks for videoRotation but dereferences videoState in that branch; 12.10.4 uses the correct field. This confirms the parser correction, not an independently reproduced code-execution chain. The reported 8.6.2–12.10.3 range and ARM64 private-call testing come from NebuSec’s account to The Hacker News. They do not establish iOS, desktop or group-call exploitation, device-wide access, or victims. No CVE is identified in the cited disclosure.
