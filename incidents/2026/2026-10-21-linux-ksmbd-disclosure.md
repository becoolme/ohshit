---
title: "Two reported Linux KSMBD remote-code-execution flaws become public before confirmed fixes"
level: 3
date: 2026-10-21
tags: [Linux, KSMBD, SMB, disclosure]
ecosystems: [linux]
summary: "Public reports describe ZDI-CAN-33774, a KSMBD dispatch race, and ZDI-CAN-33549, an SMB Direct integer underflow. Both are rated 9.0 by ZDI according to reporting; no fixed released kernel was verified in this review."
splash: "Systems serving SMB through kernel KSMBD; the SMB Direct issue additionally requires RDMA"
wipe: "Restrict SMB reachability; disable unused KSMBD/SMB Direct and follow your distribution's fixes"
inTheWild: unknown
inTheWildNote: "The reviewed reports do not confirm attacks against deployed systems"
fixed:
  - product: Linux KSMBD
    version: unknown
    status: No released fixed version verified; a development patch is not a distribution update
timeline:
  - date: Oct 21, 2026
    title: Public KSMBD race report described by freenode
  - date: Oct 22, 2026
    title: Phoronix and The Hacker News cover both disclosures
checklist:
  - title: Inventory KSMBD before assuming all SMB servers are affected
    hint: Inspect loaded modules and service configuration; Samba is a separate implementation
  - title: Limit SMB access to required clients and trusted networks
  - title: Disable unused KSMBD and SMB Direct, then track vendor patches
sourceException: "The original lore.kernel.org mailing-list reports returned HTTP 403 during review. Phoronix and The Hacker News independently describe both bugs; freenode carries an October 21 report. Exact kernel ranges and a released fix remain unverified."
sources:
  - name: Phoronix
    url: https://www.phoronix.com/news/LKML-New-Trend-Vulnerabilities
    says: Both flaws rated 9.0; mainline unpatched at reporting, SMB Direct patch reportedly in a development branch
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/two-cvss-90-linux-ksmbd-rce-flaws.html
    says: Distinguishes dispatch race from SMB Direct/RDMA underflow; no named mainline fix at reporting
  - name: freenode
    url: https://freenode.net/article/zdi-flags-cvss-9-0-race-condition-rce-in-linux-ksmbd
    says: October 21 coverage of ZDI-CAN-33774
---

**L3:** reported RCE in an optional kernel file server, with public technical details. The dispatch race concerns protocol-handler confusion; the SMB Direct underflow has narrower transport prerequisites. Neither report establishes that every Linux installation is exposed.

The original mailing-list evidence could not be read here. Reports differ on development-patch status, so no safe kernel version is asserted. The date follows the earliest accessible report; exact original posting time remains unverified. No working exploit or exploitation is claimed.
