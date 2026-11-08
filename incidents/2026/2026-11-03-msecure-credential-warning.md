---
title: mSecure asks current and former users to replace stored credentials after suspicious activity
level: 3
date: 2026-11-03
updated: 2026-11-08
tags: [mSecure, password manager, credentials]
summary: mSecure notified current and former customers to protect stored passwords, two-factor methods and passkeys after suspicious activity. mSecure staff publicly acknowledged the Cloud breach email. Customers relay a reply describing theft of an encrypted database. Plaintext exposure, affected count and cause remain unconfirmed.
splash: Current and former mSecure users; the narrower mSecure Cloud scope is a customer-relayed support claim
wipe: Review the direct notice; replace stored credentials at their issuing services, re-enroll affected MFA and remove old passkeys safely.
inTheWild: unknown
inTheWildNote: Staff acknowledged the Cloud breach notice. The database details are customer-relayed.
timeline:
  - date: Nov 3, 2026
    title: mSeven sends a precautionary credential warning
    body: The Register independently reports reading the customer email that day. It describes suspicious activity, mitigation and an investigation assisted by outside cybersecurity experts.
  - date: Nov 4, 2026
    title: Second outlet inspects notice and reports customer-relayed scope
    body: BleepingComputer also received the notification and follows public customer posts describing an encrypted mSecure Cloud database copy. Those posts do not establish decrypted secrets or a final affected-user count.
  - date: Nov 7, 18:39 UTC
    title: mSecure support publicly acknowledges the Cloud breach email
    body: A staff reply directs incident questions to the support mailbox and warns that responses may be delayed.
checklist:
  - title: Review your direct notice and inventory stored secrets
    hint: Open your existing mSecure app and established support bookmark. Include former accounts and ask support which sync mode, stored data and time period your notice covers. The customer-transcribed reply also recommends changing the master password; verify this through your established app/support route. Do not treat that transcription as proof your account is excluded. Staff direct incident questions to support@msevensoftware.com. Use the existing support channel and continue credential rotation while awaiting a response.
  - title: Replace credentials at their issuing services
    hint: Start with email, administrator, financial and other high-impact accounts saved in mSecure. Use each service's established settings to change passwords and replace exposed tokens or other secrets as applicable. Changing only the vault password or deleting the app cannot revoke a previously copied database or invalidate credentials stored inside it.
  - title: Re-enroll affected MFA and replace old passkeys safely
    hint: The notice recommends resetting or re-enrolling two-factor methods and removing existing passkeys. Use the issuing account's security settings to enroll replacements and test access before removing old methods; preserve a safe recovery route to avoid lockout. Never give recovery codes or vault passwords to unsolicited support messages.
sources:
  - name: The Register independently inspected November 3 email
    url: https://assets.theregister.com/2026/11/03/202616/
    says: Reports seeing the original customer notice; suspicious activity and precautionary credential guidance, with no disclosed cause or confirmed secret exposure.
  - name: BleepingComputer independently received customer notification
    url: https://www.bleepingcomputer.com/news/security/msecure-password-manager-hack-prompts-password-reset-warnings/
    says: Separately inspected notice; traces encrypted-cloud-database claims to customer-shared support replies rather than independent forensic confirmation.
  - name: Customer posts claimed support response on mSecure forum
    url: https://support.msecure.com/en/support/discussions/topics/36000039016
    says: The customer who opened the thread relays a support claim that the incident concerns mSecure Cloud sync users.
  - name: mSecure staff reply on the support forum
    url: https://support.msecure.com/en/support/discussions/topics/36000039016#post-36000102390
    primary: true
    says: Acknowledges the Cloud breach email and names the support mailbox. Gives no database, encryption or victim-count details.
  - name: Customer repost of a follow-up email
    url: https://support.msecure.com/en/support/discussions/topics/36000039003/page/last
    says: A customer reproduces text claiming an encrypted database copy and describing the scope as mSecure Cloud sync. The post is customer-authored.
---

The November 3 notification is established by two outlets that separately inspected it. It warns current and former customers to protect confidential information stored in mSecure while mSeven investigates suspicious activity. L3 reflects actionable credential guidance for a password manager; a mass plaintext leak is not established.

An encrypted cloud-database theft and cloud-sync-only scope appear in customer transcriptions of support replies. These remain attributed claims. An affected count, fixed application version, attack mechanism and proof of decrypted vault contents remain unavailable. Do not assume other sync modes are cleared. The two media inspections corroborate the warning, not independent forensic findings about theft.

**November 7 support update.** A staff reply on mSecure’s own support forum acknowledges the Cloud breach email and directs incident questions to `support@msevensoftware.com`. Support says high ticket volume may delay responses. The public reply confirms the notification and support route. The encrypted-copy description and narrower sync scope still come from customer reposts.
