---
title: Microsoft patches exploited Outlook spoofing flaw in Windows Office
summary: Microsoft documents an Outlook interface that omits a warning for an unsafe action. The network attack requires user interaction and is in CISA KEV. Install the November security update for your Office edition and channel.
splash: Windows Outlook in Office LTSC 2021/2024 and Microsoft 365 Apps for Enterprise, x86 and x64.
wipe: Install the November security update for your Office edition and update channel. Verify the installed build.
inTheWildNote: CISA listed CVE-2026-124194 as known exploited on November 10.
level: 4
date: '2026-11-10'
tags:
- Outlook
- Office
- credential exposure
inTheWild: 'yes'
timeline:
- date: Nov 10, 2026
  title: Microsoft discloses the flaw and CISA lists it in KEV
  body: CISA lists November 24 as the deadline for applicable U.S. federal civilian agencies.
- date: Nov 11, 2026
  title: Microsoft updates its CVE record
  body: The record lists the LTSC build thresholds and refers Microsoft 365 customers to the channel release table.
checklist:
- title: Patch and verify Office
  hint: In Outlook, check File → Office Account for the installed edition and build. Apply the relevant November security update via your Office update channel or enterprise management, and verify after restart. Microsoft 365 builds vary by channel.
- title: Triage suspicious Outlook activity
  hint: Preserve the relevant messages, Outlook endpoint telemetry and network authentication logs. Review suspicious actions initiated by Outlook with incident responders. The Microsoft CVE record does not provide case-specific indicators.
sources:
- name: Microsoft CNA record
  says: Lists affected Windows Office products, user interaction in the CVSS vector and LTSC build thresholds.
  url: https://cveawg.mitre.org/api/cve/CVE-2026-124194
  primary: true
- name: CISA KEV catalog
  says: Confirms known exploitation and the listed federal remediation deadline.
  url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
  primary: true
cves:
- name: Unsafe-action warning missing
  description: Outlook can fail to warn users before an unsafe action, enabling spoofing.
  id: CVE-2026-124194
  score: 6.5
fixed:
- product: Office LTSC 2021
  version: 16.0.14334.21048
- product: Office LTSC 2024
  version: 16.0.17932.21140
---

The Microsoft CNA record describes a missing warning that allows spoofing over a network. Its CVSS 3.1 vector requires user interaction and no attacker privileges. The record does not establish the exact lure, a zero-click path or victim scope. For Microsoft 365 Apps for Enterprise use the [Office security release table](https://aka.ms/OfficeSecurityReleases) for your channel.
