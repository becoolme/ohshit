---
title: "UnrealIRCd label injection lets ordinary users run privileged IRC commands"
level: 4
date: 2026-11-07
tags: [unrealircd, irc, injection, exploited]
summary: >-
  Attackers are exploiting CVE-2026-114713 to inject server-to-server commands from ordinary client
  connections on linked UnrealIRCd networks. Version 6.2.7.1 and the November 7 hot-patch fix the
  injection and eight other security issues.
splash: "Unpatched UnrealIRCd 6 and 5 networks with two or more linked servers and the labeled-response module."
wipe: "Apply the IRCOp filter where supported, then hot-patch every affected Unix-like 6.x server or upgrade to 6.2.7.1 and restart."
inTheWild: "yes"
inTheWildNote: "The UnrealIRCd maintainer reported active exploitation on November 8."
cves:
  - id: CVE-2026-114713
    score: 8.6
    name: "IRCv3 label command injection"
    description: >-
      A crafted label tag can inject IRC commands into traffic between linked servers. An ordinary
      client can issue commands with server authority, including KILL and GLINE.
fixed:
  - { product: "UnrealIRCd 6", version: "6.2.7.1", status: "Supported. Hot-patch available for 6.0.0 through 6.2.7 on Unix-like systems." }
  - { product: "UnrealIRCd 5", version: none, status: "End of life. Disable labeled-response and restart while migrating to 6.2.7.1 or later." }
timeline:
  - date: "Nov 4, 2026"
    title: "Project announces an upcoming security release"
    body: "The advance notice gives operators time to prepare for a critical fix and hot-patch."
  - date: "Nov 7, 15:00 UTC"
    title: "UnrealIRCd ships 6.2.7.1 and the hot-patch"
    body: "The maintainer discloses the privileged IRC command injection alongside eight other fixes."
  - date: "Nov 8, 02:31 UTC"
    title: "CVE record becomes public"
    body: "MITRE publishes CVE-2026-114713 with CVSS 3.1 score 8.6."
  - date: "Nov 8, 2026"
    title: "Maintainer reports active exploitation"
    body: "The project updates the advisory and urges administrators to deploy protection immediately."
checklist:
  - title: "Deploy the temporary filter if every server supports it"
    hint: >-
      With all linked servers on 6.0.4 or later, run
      `/SPAMFILTER add -regex T block - Invalid_label ^label=(?![^\r\n;\x20]*\z)`
      once as an IRCOp. The network-wide filter covers CVE-2026-114713 only. If any linked server is
      older than 6.0.4, proceed directly to patching or upgrading the vulnerable nodes.
  - title: "Hot-patch or upgrade every affected server"
    hint: >-
      On Unix-like systems running 6.0.0 through 6.2.7, run `./unrealircd hot-patch bundle-20261107`
      on every affected server and check that installation and rehash succeeded. On Windows, or if hot-patching
      fails, upgrade to 6.2.7.1 or later and restart. On Unix-like systems use `./unrealircd upgrade` or install
      the official release. On Windows use the project's installer. The project FAQ under Hot-patching failed
      covers build failures after a system upgrade.
  - title: "Verify each node and investigate unexpected privileged commands"
    hint: >-
      On 6.0.2 or later, run `./unrealircd module-status | grep labeled-response`. Check for
      `5.0-hot-patch-bundle-20261107` or the fixed release's module version, such as `6.2.7.1`.
      A bare `5.0` indicates the bundle is missing. If the shell check is unavailable or empty, use
      `/MODULE -all` as IRCOp, or `/MODULE -all remote.server.name` for a linked node. If verification
      fails, upgrade and recheck. Review available operator and server logs for unexplained KILLs or GLINEs.
      These commands also have legitimate uses.
  - title: "Contain and replace unsupported servers"
    hint: >-
      For UnrealIRCd 5, add `blacklist-module "labeled-response";` to the configuration on every server
      and restart each process. A rehash alone leaves the module active. Move unsupported releases to
      6.2.7.1 or later. The maintainer did not test other end-of-life series.
sources:
  - name: "UnrealIRCd maintainer advisory and exploitation update"
    url: https://forums.unrealircd.org/viewtopic.php?t=9487
    primary: true
    says: "Confirms exploitation and the affected 5.x series, and gives the filter, hot-patch, upgrade and verification steps."
  - name: "UnrealIRCd project release notices"
    url: https://www.unrealircd.org/index/news
    primary: true
    says: "Dates the advance notice and the November 7 security release."
  - name: "MITRE CVE record"
    url: https://cveawg.mitre.org/api/cve/CVE-2026-114713
    primary: true
    says: "Specifies the linked-server prerequisite and CVSS 3.1 score of 8.6. Its narrative describes 6.x and the project also confirms 5.x."
  - name: "Maintainer's oss-security disclosure"
    url: https://seclists.org/oss-sec/2026/q4/576
    primary: true
    says: "Explains how unescaped newlines in the label tag allow IRC commands to cross the server link."
  - name: "UnrealIRCd hot-patch troubleshooting"
    url: https://www.unrealircd.org/docs/FAQ#hot-patch-failed
    primary: true
    says: "Explains how to diagnose a failed hot-patch and when to upgrade the daemon."
  - name: "GitHub Advisory Database alias"
    url: https://github.com/advisories/GHSA-237f-p9h6-wq4r
    says: "Lists GHSA-237f-p9h6-wq4r as an alias of CVE-2026-114713."
---

A client connected to a vulnerable IRC network can send a crafted IRCv3 `label` tag. The
`labeled-response` module carries unescaped delimiters into a reply passed between servers, where
the receiving server interprets them as additional IRC commands. This path requires at least two
linked servers. The injected IRC commands run with server authority. A client can disconnect other
users with KILL or apply network-wide bans with GLINE.

The project calls the injection critical, while the MITRE record scores it 8.6 under CVSS 3.1.
The maintainer confirmed exploitation on November 8 without publishing a victim count or attack
indicators. The other eight fixes address two ways to expose users' IP addresses,
a hang during blacklist rechecks, a crash involving services' CHGIDENT, incorrect full-server
responses to new connections, excessive bans set by services, potential TLS renegotiation flooding
and a possible crash in the WHOWAS database. The temporary filter addresses the command injection.
Use the full hot-patch or release for the rest of the batch.
