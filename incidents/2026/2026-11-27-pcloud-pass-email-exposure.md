---
title: pCloud confirms Pass cyberattack and email exposure; vault-copy question remains open
date: 2026-11-27
level: 4
tags: [pCloud, Password manager, Data breach]
summary: pCloud confirms a contained attack on pCloud Pass exposed some users’ email addresses and triggered login attempts. It says stored passwords and notes remain protected and Cloud Storage was unaffected. The affected count, entry point and whether encrypted vaults were copied remain undisclosed.
splash: pCloud Pass users whose email addresses were exposed; affected count and attack prerequisites are undisclosed
wipe: Review account devices, secure unexpected account access, enable 2FA and distrust requests for master passwords or recovery words.
inTheWild: yes
inTheWildNote: pCloud’s own statement confirms an attack, email exposure and login attempts.
timeline:
  - date: Nov 27, 2026
    title: pCloud confirms the Pass incident
    body: The pCloud Team says the attack was contained, some Pass email addresses were exposed and login attempts generated automatic notifications. It says vault contents and Cloud Storage were not compromised; no affected count or technical entry point is supplied.
checklist:
  - title: Check unfamiliar-device alerts through the service directly
    hint: Open the pCloud site yourself. In Settings > Security > Logged devices, remove sessions you do not recognize. Preserve the alert, device name, IP and time, then contact support@pcloud.com about unexplained access; do not send master passwords or recovery words. A notification alone does not establish vault access.
  - title: Secure unexpected account access
    hint: pCloud’s general login guidance recommends changing the pCloud account password after an unfamiliar login. Open my.pcloud.com > account avatar > Settings > Security, re-enter the current password and follow the password-change prompts. This is account protection, not a vendor-announced reset of every password stored in Pass.
  - title: Enable two-factor authentication and retain recovery access
    hint: In my.pcloud.com > Settings > Security, turn on Two-factor authentication, confirm your account password and configure SMS or an authenticator app. Complete the verification and save recovery codes securely. Existing 2FA users should retain it; this incident has not established a 2FA bypass.
  - title: Reject follow-up phishing
    hint: pCloud says it will never request your Master Password or recovery words by email, phone or chat. Do not supply them in response to an alert or an unsolicited support message; open the official service independently to investigate.
sources:
  - name: pCloud Team original incident statement
    url: https://www.reddit.com/r/pcloud/comments/1y6fu1g/comment/19t9lvjcu2sap/
    primary: true
    says: The pCloudApp account confirms the contained Pass attack, email exposure and login attempts; claims vault contents and Cloud Storage were unaffected; warns against phishing. It does not say whether encrypted vault copies were taken.
  - name: pCloud login and account access guidance
    url: https://help.pcloud.com/article/login-account-access-issues
    primary: true
    says: General guidance supplies account password-change steps, a response to unfamiliar login alerts and support escalation. These are not incident-specific mass-reset instructions.
  - name: pCloud two-factor authentication guidance
    url: https://help.pcloud.com/article/two-factor-authentication
    primary: true
    says: Explains 2FA setup, recovery codes and removal of suspicious logged devices; it does not establish how this attack worked.
---

On November 27, the pCloud Team confirmed that a cyberattack against pCloud Pass exposed an unspecified, reportedly small number of users’ email addresses and led to login attempts. It says the attack was contained. This is a confirmed attack on a password-manager service, supporting L4; there is no published victim total or confirmed financial-loss figure.

pCloud says stored passwords, notes and other Pass information remain protected by client-side encryption and the Master Password, and that its Cloud Storage service was unaffected. These are vendor statements, not an independent forensic clearance. The statement does not explicitly answer whether encrypted vault files were accessed or copied. Do not turn that omission into either a claim of vault theft or proof that no copies were taken.

Users in the original discussion dispute the login-attempt explanation and report unfamiliar-device notifications despite having 2FA. Those reports do not establish a 2FA bypass, decrypted vault access or a compromise of Cloud Storage. The entry point, attack prerequisites and any affected software version remain undisclosed. pCloud’s discussion of faster AI-assisted vulnerability discovery does not identify AI as the cause of this incident.

No incident-specific patched version, blanket master-password reset or requirement to rotate every stored credential is announced in the statement. Review unfamiliar activity using the general account guidance above and seek clarification from pCloud; keep the account password distinct from the Pass Master Password when following those instructions.
