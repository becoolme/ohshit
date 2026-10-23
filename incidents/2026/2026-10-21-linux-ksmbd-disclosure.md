---
title: "Two Linux KSMBD remote-code-execution reports land on a public mailing list before released fixes"
level: 3
date: 2026-10-21
updated: 2026-10-22
tags: [Linux, KSMBD, SMB, disclosure]
ecosystems: [linux]
summary: "ZDI posted ZDI-CAN-33774, a KSMBD dispatch race, and ZDI-CAN-33549, an SMB Direct integer underflow, to public LKML with technical details. Both are rated CVSS 9.0. Fixes exist only in development trees; no released kernel fix is verified."
splash: "Systems serving SMB through kernel KSMBD; the race needs a guest share, the SMB Direct bug an RDMA device and writable share"
wipe: "Restrict SMB reachability; disable guest shares and unused KSMBD/SMB Direct; take your distribution's kernel update when it ships"
inTheWild: unknown
inTheWildNote: "No attacks reported; the public reports include enough detail to reproduce the bugs"
fixed:
  - product: KSMBD dispatch race (ZDI-CAN-33774)
    version: unknown
    status: Maintainer says fixed in the ksmbd development tree (commit 68f410faedaf); no released kernel verified
  - product: SMB Direct underflow (ZDI-CAN-33549)
    version: unknown
    status: Developer expects a for-7.5 development branch already fixes it; unconfirmed
timeline:
  - date: Oct 21, 21:16 UTC
    title: ZDI posts ZDI-CAN-33549 to public LKML
    body: The SMB Direct report, tested on 7.3-rc3, includes the vulnerable code path and target requirements.
  - date: Oct 21, 21:36 UTC
    title: ZDI posts ZDI-CAN-33774 to public LKML
    body: The dispatch race report includes analysis and a KASAN trace.
  - date: Oct 21, 22:16 UTC
    title: SMB Direct developer asks for a retest on a development branch
  - date: Oct 22, 2026
    title: KSMBD maintainer points to an existing fix for the dispatch race
    body: Greg Kroah-Hartman separately objects to unpatched reports on a public list.
checklist:
  - title: Find out whether you run KSMBD at all
    hint: Look for the ksmbd module and ksmbd.mountd. Samba is a separate userspace server and isn't this bug
  - title: Turn off guest access on KSMBD shares
    hint: The dispatch race needs a guest share
  - title: Limit SMB access to required clients and trusted networks
    hint: Port 445 has no business facing the internet
  - title: Disable SMB Direct unless you actually use RDMA
  - title: Track your distribution's kernel advisories
    hint: A commit in a maintainer tree is not a kernel you can install
sources:
  - name: ZDI-CAN-33774 report on LKML
    url: https://lore.kernel.org/lkml/BYAPR01MB383076AC412E19C48CFBEAE980662@BYAPR01MB3830.prod.exchangelabs.com/
    says: CVSS 9.0 KSMBD dispatch race tested on 7.3-rc3; OOB read leaks heap memory, path to OOB write; requires race and guest share
    primary: true
  - name: ZDI-CAN-33549 report on LKML
    url: https://lore.kernel.org/lkml/BYAPR01MB3830472B5702C089B0BBB77D80662@BYAPR01MB3830.prod.exchangelabs.com/
    says: CVSS 9.0 integer underflow in smbdirect_connection_rdma_xmit(); needs an RDMA device, writable share and SMB Direct
    primary: true
  - name: KSMBD maintainer reply (MARC archive)
    url: https://marc.info/?l=linux-kernel&m=179267126536524&w=2
    says: Namjae Jeon says ZDI-CAN-33774 is already fixed by commit 68f410faedaf in the ksmbd tree
    primary: true
  - name: SMB Direct developer reply (MARC archive)
    url: https://marc.info/?l=linux-kernel&m=179262082806304&w=2
    says: Stefan Metzmacher asks the reporter to retest on the for-7.5/smbdirect branch and guesses it is already fixed
    primary: true
  - name: Phoronix
    url: https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities
    says: ZDI reports posted to public lists before mainline fixes, alongside other ZDI kernel reports
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/two-cvss-90-linux-ksmbd-rce-flaws.html
    says: No named mainline or linux-next fix for either flaw at reporting
---

**L3:** reported RCE in an optional in-kernel SMB server, with technical details on a public list. Both reports were tested against 7.3-rc3. The dispatch race lets an SMB1 buffer be handled as SMB2, leaking heap memory, with a reported path to an out-of-bounds write; it needs a guest share. The SMB Direct underflow needs an RDMA device, a writable share and SMB Direct. Most Linux machines don't run KSMBD at all.

The KSMBD maintainer says the dispatch race is already fixed in the ksmbd development tree. The SMB Direct developer only expects a development branch already fixes the other one. Neither has reached a released kernel we could verify, so no safe kernel version is listed. No working exploit or exploitation has been reported.
