---
title: CNCERT reports a new Cling variant controlling thousands of Linux and IoT devices
level: 4
date: 2026-11-24
tags:
- Cling
- Linux
- IoT
- botnet
summary: CNCERT reports about 5,600 infected devices in China during November 9–20, with up to 2,730 online in one day. The new Cling variant hides commands in STUN traffic and retains remote execution and payload delivery. The figures are devices in a bounded observation window, not a global victim count.
splash: Linux servers and IoT devices reached by the campaign; CNCERT reports spread through CVE-2021-35394 despite stripped exploit modules.
wipe: Patch exposed devices, inspect network and startup indicators, then isolate and clean infected hosts while tracing the entry path.
inTheWild: 'yes'
inTheWildNote: CNCERT observed infected devices during November 9–20.
cves:
- id: CVE-2021-35394
  name: Reported delivery path for the November Cling variant
  description: CNCERT reports current propagation through this historical vulnerability, while saying the captured variant no longer contains its own exploitation module; it does not establish that every Linux server is vulnerable to this CVE.
fixed: []
timeline:
- date: Nov 9, 2026
  title: CNCERT observation window begins
  body: The later report counts infected devices in China during November 9–20; this is not the first appearance of the Cling family.
- date: Nov 20, 2026
  title: Reported observation window ends
  body: CNCERT reports about 5,600 infected devices across the window and a daily-online peak of 2,730; neither number counts unique people or establishes a global total.
- date: Nov 24, 2026
  title: CNCERT discloses the streamlined variant
  body: The alert describes ChaCha20-protected configuration, changed control infrastructure, persistent remote execution and 12 sample MD5s plus 18 download endpoints and one C2 address.
checklist:
- title: Patch exposed devices and verify the actual entry path
  hint: Inventory Linux servers and IoT devices, apply vendor system/firmware fixes and restrict exposed services. CNCERT associates current spread with CVE-2021-35394 but supplies no complete product/version matrix or universal fixed release. Check each device vendor; do not infer that updating one library clears an established infection. Use distinct strong device passwords; CNCERT recommends at least 16 characters.
- title: Check every published network indicator and preserve evidence
  hint: 'The report lists 18 download endpoints and one C2, reproduced here: http[:]//202.110.70.60:800/alya.x86; http[:]//202.110.70.60:800/alya.mipsel; http[:]//202.110.70.60:800/alya.arc; http[:]//202.110.70.60:800/alya.mips; http[:]//202.110.70.60:800/alya.x86_64; http[:]//202.110.70.60:800/alya.m68k; http[:]//202.110.70.60:800/alya.i486; http[:]//202.110.70.60:800/alya.sparc; http[:]//202.110.70.60:800/alya.powerpc; http[:]//58.211.144.243:800/alya.mipsel; http[:]//58.211.144.243:800/alya.mips; http[:]//58.211.144.243:800/alya.x86_64; http[:]//58.211.144.243:800/alya.i486; http[:]//58.211.144.243:800/alya.arc; http[:]//58.211.144.243:800/alya.powerpc; http[:]//58.211.144.243:800/alya.m68k; http[:]//118.45.196.225:800; http[:]//120.193.219.210:800; C2 209.99.188[.]119. It also publishes 12 sample MD5s in its complete IoC appendix; use that list, not a single hash. Inspect processes, downloads, periodic multi-node STUN registration and structured transaction IDs. A match alone does not prove compromise, and no match does not prove safety; shared public STUN services are not all attacker-controlled.'
- title: Inspect startup persistence and replaced tools
  hint: CNCERT reports replacement of wget, startup entries for .alya and attempts to lower the OOM-kill score. Inspect wget; /etc/inittab; /etc/init.d/rcS; /etc/rc.d/rc.boot; .alya; /proc/self/oom_score_adj (-1000); local port 58346; STUN UDP 3478. Correlate files, process ancestry, persistence and traffic before concluding compromise. Port use or ordinary STUN traffic alone is insufficient.
- title: Contain infected hosts and restore trusted operation
  hint: If infection is confirmed, isolate the device, preserve available logs and samples, establish the entry path and clean it in coordination with the vendor or incident responders; report to the relevant local authority as CNCERT advises. As a precaution, restore from trusted system/firmware media when integrity cannot be established and rotate credentials exposed to the host after containment. Verify startup entries and tools are clean before reconnecting; patching alone does not remove persistence.
sources:
- name: CNCERT November 24 report — public same-document copy
  url: https://www.secrss.com/articles/95935
  primary: true
  says: Attributed full copy of the CNCERT report, including technical analysis, bounded China infection counts, response guidance and the complete IoC appendix. Read through ordinary public HTTPS; this is one CNCERT evidentiary origin.
- name: CNCERT original report URL
  url: https://www.cert.org.cn/portal/yjtb/eydmtb/2026/11/41bca19a481c413c96180a1d051fd5cb.htm
  primary: false
  says: Original URL linked from the readable CNCERT index dated November 24. The detail page returned 403/unavailable; factual claims here come from the attributed full copy, not unread original content.
---

CNCERT's November 24 alert concerns a new wave and variant of an existing botnet family, not the first discovery of Cling. The captured payload removes built-in scanning, exploitation, proxy and DDoS modules while retaining command execution, program delivery, task control and node updates. CNCERT nevertheless observes propagation through CVE-2021-35394; removal of an embedded exploit module does not mean the surrounding delivery campaign has no exploit path. The report does not establish that all Linux devices share that vulnerability.

CNCERT reports approximately 5,600 infected devices in China during November 9–20 and a highest daily-online count of 2,730. These are the reporting team's bounded device observations, not organizations, people, a global total or a new count for every day. L4 reflects observed infection and persistent remote control, not a claimed DDoS event by this stripped-down payload.

The malware's configuration contains 13 STUN nodes: twelve public services and one attacker-controlled C2. Legitimate services provide NAT mapping information and discard the nonstandard registration message; the attacker's node records the mapped port and infection tag. Commands occupy the STUN transaction-ID field, and the control traffic can spoof a Google STUN source. This is abuse and source impersonation, not evidence that Google or all public STUN services were breached. ChaCha20 protects configuration and command material, and the variant changes its C2 and earlier response-pattern tell.

No complete affected-product matrix or universal fixed version is provided. CNCERT recommends vulnerability and firmware remediation, host/network hunting, isolation and cleanup of infected systems, and reporting. The original detail page was inaccessible; the complete attributed public copy was read, including all indicators. Copies of this report are not independent corroboration.

The appendix contains twelve sample MD5s: `84ced85e53bc326f8b11115ae4bc24a7`, `65d94c9dddea41ef4690f193fbc54ec3`, `92533318fb6f0365eefd25090e7df146`, `be719987bf96fa16ac98b7c2a280cc74`, `e37b94dfcaa56924142c344edcb3652a`, `79de772daa218e25a812ecbedca08476`, `606f2fee6fa4b3ca556187c9ee709f3d`, `b672e3238742504faa93d5a7cb8d0ea0`, `dc11a0e68e5235e36480ddf14f08afbe`, `76021af2d82cade790dd87d3af0f80c9`, `16ef618bf21a3322c6793be87d553f08`, `fe35c5b3cfa118fdf8e1afb9a134e084`. The hunting checklist includes every listed download endpoint and C2. Treat hashes, paths and traffic as investigation inputs; legitimate STUN and isolated port matches do not establish an infection.
