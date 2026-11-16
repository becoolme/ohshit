---
title: "RIKEN confirms Fugaku intrusion and downstream credential abuse attempts"
level: 4
date: 2026-11-16
tags: [hpc, data-breach, credential-theft]
summary: >-
  RIKEN says an intruder used Fugaku’s public status dashboard as a foothold into its operations network. Authentication records for up to 4,597 Fugaku and Rikyu users may have been exposed. The intruder used some obtained credentials to attempt access to other systems.
splash: "Up to 4,222 Fugaku and 375 Rikyu users, plus external services whose credentials were stored on Fugaku."
wipe: "Revoke credentials stored on Fugaku at each destination, issue replacements and investigate access made with the old credentials."
inTheWild: yes
inTheWildNote: "RIKEN confirmed intrusion, server tampering and attempts to reuse stolen credentials."
timeline:
  - date: Nov 10, 2026
    title: Intrusion window begins
    body: RIKEN traced activity from November 10 through November 13 to a foothold on the public status dashboard.
  - date: Nov 12, 2026
    title: RIKEN detects suspicious network traffic
    body: RIKEN began investigating with its maintenance contractor.
  - date: Nov 13, 2026
    title: RIKEN confirms the intrusion and isolates the system used to gain entry
  - date: Nov 14, 2026
    title: RIKEN takes Fugaku offline
    body: RIKEN cut external access and replaced administrative keys.
  - date: Nov 15, 2026
    title: Users are notified and existing login public keys are invalidated
    body: RIKEN notified users, stopped all running and queued jobs, and asked users to revoke credentials stored on Fugaku at their destinations.
  - date: Nov 16, 2026
    title: RIKEN discloses the incident and possible exposure
    body: RIKEN published the potential scope and confirmed attempts to reuse obtained credentials. The entry method and downstream impact were still under investigation.
checklist:
  - title: Inventory credentials that were stored on Fugaku
    hint: Include SSH private keys and access keys kept in home directories, job scripts or configuration files. Identify where each key was accepted.
  - title: Revoke old credentials at every destination before issuing replacements
    hint: Remove the corresponding SSH public keys from destination systems and revoke affected access keys in the issuing services. Generate replacements from a trusted system and update authorized jobs and integrations.
  - title: Check destination systems for attempted or successful reuse
    hint: Preserve SSH, identity and API audit logs from November 10 onward. Review unexpected sessions, key additions and actions by affected identities, and report suspicious activity to the destination operator and your security team.
  - title: Watch for impersonation and follow official recovery instructions
    hint: Check RIKEN notices through a known address. RIKEN says it will never ask for passwords by email. Follow its instructions for registering replacement Fugaku login keys when service resumes.
sources:
  - name: RIKEN incident disclosure (Japanese)
    url: https://www.riken.jp/pr/news/2026/20261116_2/index.html
    says: Confirms the intrusion, potential exposure, containment timeline and credential revocation advice.
    primary: true
  - name: RIKEN Fugaku operating-status page
    url: https://www.r-ccs.riken.jp/en/fugaku/opp-status/
    says: Says publication of the operating-status display was suspended for safety.
    primary: true
---

RIKEN’s Center for Computational Science confirmed unauthorized access to Fugaku’s operations network. The intruder used the public operating-status dashboard as a foothold, manipulated multiple internal servers and installed unauthorized software on some of them. RIKEN was investigating the exact entry method. Its announcement did not identify a product version or CVE.

The potentially exposed authentication records comprise names, email addresses and user IDs for up to 4,222 Fugaku users, and names and email addresses for up to 375 Rikyu users. Fugaku home-directory files were also in scope, including research files and SSH private keys or access keys for external systems. RIKEN had found no specific evidence that research outcomes left its systems and was checking whether the files contained third-party personal information. Attempts to use obtained credentials on other systems were confirmed. Whether those attempts caused further compromise remains under investigation.

RIKEN plans to address the abused software vulnerability, rebuild compromised servers and revise the network configuration before resuming Fugaku operations. The login keys RIKEN invalidated controlled access to Fugaku. Keys and other credentials stored on Fugaku for use elsewhere must be revoked by the destination operators or their users.
