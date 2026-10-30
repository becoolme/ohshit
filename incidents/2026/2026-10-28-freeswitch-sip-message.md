---
title: FreeSWITCH patches exploited SIP MESSAGE command execution
date: 2026-10-28
level: 4
tags: [FreeSWITCH, SIP, RCE]
summary: FreeSWITCH confirms exploitation of a SIP MESSAGE path that selects its API command interface. Versions through 1.11.2 are affected; 1.11.3 closes the route by default. Authentication can still leave ordinary registered users able to exploit it.
splash: SIP profiles accepting inbound MESSAGE; stock passwordless users can remove the account prerequisite
wipe: Upgrade to 1.11.3; disable unused inbound chat and keep enable-chat-api-proto off
inTheWild: yes
inTheWildNote: SignalWire confirms exploitation of this command-execution path.
cves:
  - id: CVE-2026-116779
    score: 9.8
    name: Inbound MESSAGE API dispatch
    description: A peer whose MESSAGE is accepted can execute commands with the FreeSWITCH process’s privileges.
fixed:
  - product: FreeSWITCH
    version: 1.11.3
timeline:
  - date: Oct 28, 2026
    title: Advisory confirms exploitation and publishes patched version
checklist:
  - title: Patch and verify each SIP profile
    hint: Check fs_cli -x version. Upgrade, keep enable-chat-api-proto disabled, and set enable-chat=false wherever inbound chat is unnecessary. Review configuration management before restarting affected services.
  - title: Remove passwordless users and investigate accepted messages
    hint: Check default and Skinny example users. Authentication, inbound ACL tightening and disable_system_api_commands alone do not close this path. Preserve SIP and host logs; inspect unexpected commands and credential access. A log match alone does not prove compromise.
sources:
  - name: SignalWire FreeSWITCH advisory
    url: https://github.com/signalwire/freeswitch/security/advisories/GHSA-mg63-h38w-8p9p
    primary: true
---

Inbound chat is enabled by default. Where MESSAGE authentication is enforced, one ordinary profile account suffices; stock users without passwords can permit accountless access. The fix rejects the API selector by default. No victim count or static indicators are published. L4 reflects confirmed exploitation.
