---
title: Fake cryptocurrency hosts enroll in self-hosted ScreenConnect servers
date: '2026-11-14'
level: 3
inTheWild: unknown
tags:
- ScreenConnect
- Remote access
summary: Huntress observed emulated ScreenConnect guests with exchange-themed names on at least 118 self-hosted servers in 109 protected organizations. The guests could lure technicians into opening sessions.
splash: Reachable self-hosted ScreenConnect relays known to the operator. File execution needs a vulnerable client and active session.
wipe: Patch technician clients, avoid unverified sessions, and retain and review session evidence before removing the entries.
inTheWildNote: Huntress confirmed unauthorized registrations and saw no guest-to-host exploitation.
timeline:
- date: Nov 3, 2026 21:26 UTC
  title: First three entries appear
  body: Huntress traces the earliest entries to 197.47.160[.]252.
- date: Nov 12, 2026
  title: An MSP asks Huntress to investigate
  body: The server contained unexpected entries but showed no evidence of web shells, suspicious child processes or new accounts.
- date: Nov 14, 2026
  title: Huntress publishes its investigation
  body: Its telemetry found new entries from November 3 through 13 and included a possible sensitive-text exposure.
checklist:
- title: Patch the clients and restrict access
  hint: Upgrade every technician client to 26.6.5 or later and update affected Access agents. Verify client versions in server history. Where upgrades must wait, follow ConnectWise guidance on removing TransferFiles permissions for every role under Administration > Security > Roles, checking each session group. Keep installer links private and restrict installer and web access where supported.
- title: Preserve and hunt before removal
  hint: Copy App_Data\Session.db and its WAL. Search Access and server logs for 74.208.158[.]106 and 197.47.160[.]252. Treat 87.106.111[.]220 as an infrastructure lead. Huntress lists 14 indicators, detailed below and in its report. Correlate them with your approved device inventory. An indicator match alone does not establish compromise. Quarantine unfamiliar entries from technicians and delete confirmed fakes after preserving evidence.
- title: Check who joined and contain affected workstations
  hint: Review session history for text, file transfers and commands in each direction. For an unpatched technician client that joined, examine its ScreenConnect Temp and Startup directories and process history. If credentials may have been typed, rotate them from a clean system and revoke relevant sessions. Isolate workstations with evidence of execution and follow incident response procedures.
sources:
- name: Huntress investigation
  says: Documents emulated guests, observed scope, session history, indicators and remediation.
  url: https://www.huntress.com/blog/fake-crypto-exchange-sessions-screenconnect
  primary: true
- name: ConnectWise September 8 bulletin
  says: Documents the file-transfer flaw, fixed technician client and permission workaround.
  url: https://www.connectwise.com/company/trust/security-bulletins/2026-09-08-screenconnect-bulletin
  primary: true
---

Huntress found an installer publicly downloadable on the first server it examined. A guest needs the relay address embedded in the installer. The report gives 2,408 registrations in its summary and 2,223 in the body, without reconciling the two totals. It observed no guest pushing or running files. One technician used Send Text twice and the content was not retained, so Huntress treated it as possible credential exposure. The researchers list [the separate SCKit campaign](/incidents/screenconnect-partner-access/) as context and report no match to its published indicators. CVE-2026-84869 is a possible attack path for the lures.

### Hunting indicators

- `74.208.158[.]106` — Source of 97.8% of observed connections
- `197.47.160[.]252` — Earliest three registrations
- `87.106.111[.]220` — Shares JARM and TLS certificates with the main IP, with no observed guest sessions
- `SHA256:kt6iiIS3kcQ3NsUSVfk7gJoGMSSUqMdXqsmjb+/cSHg` — ECDSA SSH host key fingerprint for the main IP
- `25.3.4.9288, ClientType 1, empty guest key` — Claimed guest version and emulator fingerprint
- `KUCOIN-SRV, LAPTOP-BINANCE, BACKUP-PROBIT, WORKSTATION-COINEX` — Example exchange and role names, often with blank company and site
- `ScreenConnect.WindowsClient.exe → cmd.exe / powershell.exe / wscript.exe / msiexec.exe` — Look for launches using files under Documents\*\Temp\. This is a possible sign of guest-to-host execution, not an observed outcome here.

SHA-256 hashes of the fake WebP previews published by Huntress.

- `008839ef2a2d54e9efa47013bb23c773d3a152f351e9dfd3b2f4dd27086121df`
- `45136a9ab47015c4334b881df9daf824a72347daae0b5730ce3bd7d42b204bf2`
- `e73020645e7a11a90865d93bd7f3d797585f49ef72b1ac7354392a2da7fbd91f`
- `c15b008b0296b1bc9e0f979e6f25b780e3e89edabb344c7ee8c284a1a140f0d7`
- `b55ce5130cd2623017cca29318341f6b4656e3a1dc5ab82ce704e912d0d17535`
- `bea82efc82672225cf29eb869972670754f15941bc61b9e5801ffd41c5c39e5f`
- `f6d37291c4948b974caf2e9e7e8ca9c2173d2779d1ec0a391488706bbd1a995c`
