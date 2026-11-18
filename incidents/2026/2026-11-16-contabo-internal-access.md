---
title: Contabo discloses unauthorized internal access and resets all VNC passwords
date: 2026-11-16
level: 4
tags:
  - Cloud
  - Credentials
  - Intrusion
summary: Contabo confirms unauthorized access to part of its internal infrastructure, resets all VNC passwords and rotates internal credentials. Its investigation continues; customer-server compromise and personal-data leakage have not been established.
splash: Contabo customers reviewing server, account and remote-console access after the provider’s internal intrusion.
wipe: Review access and credentials, enable MFA, disable unused VNC access and preserve evidence of suspicious server activity.
inTheWild: yes
inTheWildNote: Contabo confirms unauthorized internal access; downstream customer impact remains under review.
timeline:
  - date: Nov 13, 14:29 UTC
    title: Reported access window begins
    body: Contabo later dates unauthorized access from November 13 15:29 CET to November 14 11:28 CET.
  - date: Nov 14, 10:28 UTC
    title: Reported access window ends
    body: Contabo says it detected the intrusion on November 14 and stopped access.
  - date: Nov 16, 20:00 UTC
    title: First public notice
    body: Contabo reports VNC-password resets, internal credential rotation and external forensic assistance.
  - date: Nov 18, 12:45 UTC
    title: Investigation continues
    body: Contabo reports authority notification and no indications of personal-data leakage so far; operations continue.
checklist:
  - title: Review server and account activity
    hint: Preserve available login and system logs and investigate unexpected users, access or changes around November 13–14. Contabo recommends monitoring and reviewing credentials and permissions; no technical entry path or incident IoCs are published in its notice. Suspicious activity requires investigation, not an automatic conclusion that every customer server was breached.
  - title: Secure Customer Panel access
    hint: Replace default or reused passwords and review authorized access. Under Account → Access & Security → Authentication → Multi-factor Authentication, activate an authenticator app, complete setup at the next login and store recovery codes securely. Migrated accounts must set up MFA again; old-panel settings do not carry over.
  - title: Disable VNC when it is not needed
    hint: In the Customer Panel select Servers & Hosting → VPS/VDS → More → Access → VNC control, toggle VNC off and confirm. Contabo says it reset all VNC passwords; that action alone does not establish that an attacker used VNC or reached a particular server. If console access is needed, use the provider’s current instructions.
  - title: Verify updates through the provider
    hint: Read the linked incident page directly, rather than links in unexpected messages. Its daily-update target is 14:00 CET; an investigation or normal service status is not proof that no data was accessed.
sources:
  - name: Contabo incident notice
    url: https://help.contabo.com/en/support/solutions/articles/103000426255-potential-security-incident-of-14-november
    primary: true
    says: First publication November 16; later access window, containment and investigation updates.
  - name: Contabo VNC control guide
    url: https://help.contabo.com/en/support/solutions/articles/103000337806-how-do-i-enable-disable-vnc-for-my-server-
    primary: true
    says: Documents where to disable or enable remote-console access.
  - name: Contabo MFA guide
    url: https://help.contabo.com/en/support/solutions/articles/103000305452-how-do-i-change-my-2-factor-authentication-settings-
    primary: true
    says: Documents setup, recovery codes and new-panel migration requirements.
---

Contabo confirms an internal intrusion, with the affected systems and downstream scope still being investigated. The provider reports containment, credential replacement and no indications of personal-data leakage as of November 18. These are provider findings, not an independent assurance that customer workloads were untouched. L4 reflects confirmed unauthorized access at a hosting provider; no mass leak or universal VPS compromise is claimed.
