---
title: BlackX bootkit persisted on patched Windows hosts that lacked Secure Boot revocations
level: 4
date: '2026-10-22'
tags:
- Windows
- UEFI
- BlackX
- exploited
summary: Kaspersky reports BlackX infections at Central Asian diplomatic organizations. Attackers already held administrator access and used a known Secure Boot bypass; Windows updates alone had not applied the required revocations. Attribution to APT41 is medium confidence.
splash: Windows hosts with missing Secure Boot revocations; deployment requires prior administrator access
wipe: Install current Windows updates, validate Secure Boot revocations and recovery media, and investigate boot-level persistence
inTheWild: 'yes'
inTheWildNote: Kaspersky observed BlackX and follow-on payloads in targeted intrusions
cves:
- id: CVE-2022-21894
  name: Baton Drop Secure Boot bypass reused by BlackX
  description: A known bypass reused for persistence on hosts without required revocations; not a new remote initial-access flaw.
timeline:
- date: Oct 22, 2026
  title: Kaspersky publishes the BlackX investigation
  body: New campaign details explain persistence despite Windows patch installation.
- date: Early 2026 (approximate)
  title: Researchers identify infections in Central Asian diplomatic agencies
checklist:
- title: Verify revocations as well as Windows patch installation
  hint: Follow Microsoft KB5025885 deployment guidance; audit Secure Boot DB / DBX state rather than assuming an installed update enforced revocation
- title: Prepare recovery before deploying revocations
  hint: Retain BitLocker recovery keys, update recovery media and test representative firmware classes; Microsoft warns revocations cannot simply be undone by reformatting
- title: Hunt the published BlackX artifacts
  hint: Correlate www.archivetj.com, inst.exe, C:\ProgramData\Intel\inst.exe, PVMDIJGKAX2, RC4 key Q46F6MDLI3RX2KV1, googleupdate.exe / jcef_helper.exe (legitimate loader MD5 AF8A983B9ADA07EAE1259BF2953ABD40), v8_context_snapshot.bin, driver certificate serial 0bcdf5e0da32d68900b8b7638459d072 and C:\Users\xdd\Desktop PDB-path context. OxiDLLRunner and cloud-storage task suffixes 0X01–0X06 / SSSR are additional hunting context. A match alone does not prove compromise; legitimate loaders and cloud services need contextual evidence
sources:
- name: Kaspersky Securelist BlackX investigation
  url: https://securelist.com/uefi-bootkit-blackx/121539/
  says: Observed campaign, artifacts, missing revocations and medium-confidence APT41 attribution
  primary: true
- name: Microsoft KB5025885
  url: https://support.microsoft.com/en-us/servicing/os/windows/2023/03/how-to-manage-the-windows-boot-manager-revocations-for-secure-boot-changes-associated-with-cve-2023
  says: Supported deployment procedure, firmware testing, recovery-media preparation and BitLocker recovery considerations
  primary: true
---

This newly detailed campaign is rated L4 for confirmed exploitation and boot-level persistence. It is not a newly discovered Windows zero-day. Kaspersky observed diplomatic targets in Tajikistan, Uzbekistan and Turkmenistan; initial network entry remains unspecified. Its link to APT41 is an assessment, not confirmed attribution.

Administrator access precedes installation. Investigators found patched machines missing the revocation step; certificate expiry is not equivalent to a DBX block. Apply Microsoft's staged procedure, including recovery preparation, rather than copying isolated registry commands.
