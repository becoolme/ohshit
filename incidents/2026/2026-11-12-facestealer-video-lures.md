---
title: FBI says FaceStealer used fake video meetings to steal over $400 million in cryptocurrency
level: 4
date: '2026-11-12'
tags:
- social engineering
- cryptocurrency
- supply chain
- malware
summary: The FBI links more than $400 million in theft over 18 months to FaceStealer. Hijacked messaging accounts invite contacts to fake meetings that replay victim footage and push malware as a repair. US authorities disrupted cloud infrastructure and seized over 900 videos.
splash: Crypto and Web3 workers and open-source maintainers contacted through compromised or impersonated messaging accounts.
wipe: Isolate affected devices, move exposed funds to fresh wallets from a clean device and revoke sessions and credentials.
inTheWild: 'yes'
inTheWildNote: The FBI documents thefts and an attempted software supply-chain compromise.
timeline:
- date: Nov 12, 2026
  title: FBI details FaceStealer and DOJ announces disruption
  body: The FBI reports more than $400 million stolen over 18 months and more than 900 seized webcam videos.
checklist:
- title: Isolate suspected devices and protect funds from a clean device
  hint: If you ran a purported fix, disconnect the affected device and involve incident response. Generate a fresh wallet seed on a clean device and move assets out of exposed wallets. Keep substantial balances in a separate hardware wallet and keep recovery phrases off computers and phones.
- title: Revoke sessions and recover accounts
  hint: From a clean device, reset exposed passwords, revoke sessions and tokens for messaging, work, repository and registry accounts, and enable MFA and login alerts. Review changed recovery details. Ask the platform to restore or suspend inaccessible accounts.
- title: Hunt for fake meeting traffic and publishing changes
  hint: Search DNS, proxy and endpoint logs for uu01webzoom[.]us and teams.livemeet[.]us, then correlate with browser downloads, shells launched near the call and suspicious sessions. A match alone does not establish compromise. Maintainers should review commits, dependency changes, registry publishes
    and CI runs, then revoke exposed publishing credentials.
- title: Notify contacts, employers and the FBI
  hint: Warn contacts through a separate trusted channel that your account or video may be used to impersonate you. Alert your employer if work access was exposed. Preserve invite links, messages, timestamps and logs and report at IC3.gov with the keyword FaceStealer.
- title: Verify invitations independently
  hint: Confirm unexpected meetings by phone or another known channel. Open the official client and enter the meeting code, keep your camera off until you verify the participants, and update the client through its official updater.
sources:
- name: FBI FLASH AC-111226-MS
  url: https://www.ic3.gov/CSA/2026/261112.pdf
  says: Describes the campaign, domain examples, maintainer targeting and response steps.
  primary: true
- name: FBI FaceStealer resource hub
  url: https://www.fbi.gov/investigate/cyber/facestealer-cryptocurrency-theft-scheme
  says: Summarizes the attack lifecycle and the FBI’s reported figures.
  primary: true
- name: US Department of Justice announcement
  url: https://www.justice.gov/opa/pr/justice-department-announces-actions-disrupt-north-koreas-massive-theft-cryptocurrency
  says: Announces the infrastructure disruption and reports the separate Binance asset action.
  primary: true
---

The FBI attributes FaceStealer to North Korean actors tracked under names including Sapphire Sleet, UNC1069 and BlueNoroff. Attackers take over messaging or social accounts, then approach the victim’s contacts through services such as Telegram, LinkedIn, Slack or Discord. They can use a legitimate scheduling invite and send the fake meeting link just before the call. The imitation meeting can record the new target’s webcam and play genuine footage of earlier victims. The FBI also describes some use of generated deepfakes.

Attackers claim that the target’s audio or software has failed and ask the target to install an update, run a script or paste commands into a terminal. The FBI describes malware that harvests browser cookies, records keystrokes and screens, and leaves a backdoor. Some thefts and account takeovers happened months or more than a year after initial compromise. Attackers can reuse the new victim’s contacts and footage to repeat the process.

The FBI puts theft at more than $400 million over 18 months. It reports more than 900 seized webcam videos, a count of recordings. In one case it describes a maintainer’s device being infected and attackers using the access to create malicious dependencies for an unnamed JavaScript library. The FBI says quick detection and response stopped the attack from becoming widespread and reports other targeting of npm and Rust maintainers. The reported theft and targeting support L4. DOJ announced the disruption of cloud infrastructure on November 12 and addressed the [separate Binance theft](/incidents/binance-wallet-investigation/) in the same announcement.
