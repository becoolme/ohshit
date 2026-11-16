---
title: "Firmware TPM rollback weakens Windows Hello and BitLocker PIN protection"
level: 3
date: 2026-11-14
updated: 2026-11-16
tags: [Windows Hello, BitLocker, TPM, firmware]
summary: >-
  Researchers demonstrated physical attacks that roll back the failed-attempt state of some firmware TPMs. On their test setups, measured attempt rates yielded worst-case estimates of 40 hours for a four-digit Windows Hello PIN and 20 days for a six-digit BitLocker startup PIN.
splash: "Physically accessible Windows devices with affected AMD firmware TPM configurations or Winbond RPMC flash."
wipe: "Increase short numeric PINs, protect devices from physical tampering and check the OEM for a verified firmware or hardware fix."
inTheWild: no
inTheWildNote: "Researchers demonstrated the attacks in the lab. No real-world exploitation was reported."
timeline:
  - date: Nov 14, 2026
    title: ACM publishes the Hello Again paper
    body: The researchers describe firmware TPM rollback on tested AMD and Intel configurations and demonstrate attacks against Windows Hello and BitLocker.
  - date: Nov 16, 2026
    title: Researchers document how to check AMD systems for RPMC
    body: Their repository explains the Linux firmware security attributes and what missing attributes mean.
checklist:
  - title: Identify hardware configurations exposed to physical access
    hint: Inventory exact device models, firmware and TPM type. Verify the board and flash configuration with the OEM. On Linux on AMD, read AMD SPI Replay protections in fwupdmgr security or check rpmc_spirom_available and rpmc_production_enabled when present. Missing attributes are inconclusive.
  - title: Replace short numeric PINs and enforce longer minimums
    hint: The researchers recommend increasing numeric PIN length by at least two digits. For the four- and six-digit examples, use at least six digits for Windows Hello and eight for BitLocker TPM+PIN. Set separate PIN policies and check existing PINs. Confirm BitLocker recovery keys are available before changing startup PINs.
  - title: Protect devices and verify OEM remediation
    hint: Restrict physical access to devices and investigate suspected board tampering. Track OEM advisories for the exact board and firmware configuration. Continue using long PINs while waiting for a verified fix.
sources:
  - name: Hello Again research paper
    url: https://arxiv.org/pdf/2611.18126
    says: Documents the attack prerequisites, measured attempt rates, affected test hardware, vendor responses and interim mitigations.
    primary: true
  - name: ACM proceedings metadata
    url: https://api.crossref.org/works/10.1145/3830454.3846631
    says: Records November 14 as the publication date of the proceedings paper.
    primary: true
  - name: Researchers’ RPMC repository
    url: https://github.com/mattifinder/rpmc_attacks
    says: Gives hardware identification guidance and explains how to check AMD RPMC attributes.
    primary: true
  - name: Microsoft Windows Hello for Business policy settings
    url: https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/policy-settings
    says: Documents the policy for setting the minimum length of Windows Hello for Business PINs.
    primary: true
  - name: Microsoft BitLocker configuration
    url: https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/configure
    says: Documents the separate minimum length policy for BitLocker startup PINs.
    primary: true
---

A firmware TPM (fTPM) can store encrypted state, including failed PIN attempts, on external SPI flash. Some systems use a replay-protected monotonic counter (RPMC) on the flash to stop old state from being accepted. The researchers showed that a physical attacker who can alter flash contents or interpose on the board’s SPI bus can restore earlier state and bypass the delay between PIN attempts on affected hardware.

On the AMD path tested on an HP OmniBook 3, suppressing a counter increment left the platform treating it as successful. The team also observed comparable unverified counter increments with Pluton enabled on that device. On an Intel Framework Laptop 13 with affected Winbond flash, extracting the flash authentication key enabled forged counter responses. The researchers also rolled back state on two tested AMD systems without RPMC by restoring an old flash image. These results establish specific attack paths and test configurations. A device’s actual firmware and flash determine its exposure.

The authors tested Windows Hello on the HP device and BitLocker’s TPM+PIN protector on the Framework device. The 40-hour and 20-day figures are worst-case estimates from measured attempt rates on their setups. Their model raises those estimates to 168 days for a six-digit numeric Hello PIN and about six years for an eight-digit numeric BitLocker PIN. Longer PINs increase guessing cost while the rollback weakness remains. The paper reports no CVE for the Windows Hello case and gives no verified firmware or silicon fix for the principal AMD and Winbond issues at publication.
