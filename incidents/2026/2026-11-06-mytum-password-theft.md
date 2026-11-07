---
title: myTUM breach exposes central passwords and lets attackers reach TUMonline
level: 4
date: '2026-11-06'
tags: [TUM, credential theft, campus IT]
summary: The Technical University of Munich says attackers stole central login passwords through myTUM and used an administrator's credentials to attack TUMonline. The university suspended affected accounts and took TUMonline offline. Reset instructions apply to all TUM IDs as a precaution.
splash: People who signed in to myTUM; staff and students may also have personal data exposed. All TUM ID holders must follow the reset guidance.
wipe: Reset through TUM's official channels, change reused passwords and enroll in MFA once TUMonline is available.
inTheWild: 'yes'
inTheWildNote: TUM confirmed password theft and use of admin credentials against TUMonline.
timeline:
- date: Nov 3, 07:55 UTC
  title: Start of the TUMonline service interruption as recorded by TUM IT
  body: The status entry gives the start of the interruption; it does not establish the initial intrusion or public disclosure time.
- date: Nov 5, 10:04 UTC
  title: TUM restricts EduVPN to users with MFA already configured
  body: EduVPN requires a passkey or a time-based one-time password together with a valid TUM password.
- date: Nov 6, 2026
  title: TUM publicly confirms password theft and the attack on TUMonline
  body: TUM suspended affected accounts and took TUMonline offline. It reported the incident to the Bavarian State Commissioner for Data Protection and filed a criminal complaint.
- date: Nov 6, 18:09 UTC
  title: Microsoft 365 access is blocked for TUM accounts without existing MFA
  body: Those users need an alternative reset route.
- date: Nov 7, 12:00 UTC
  title: TUM updates reset instructions for all TUM IDs
  body: The instructions apply even to people who did not use myTUM. A password changed since the published November 5 cutoff remains valid under current guidance.
checklist:
- title: Reset your TUM password through the university's official IT page
  hint: 'If you have not changed it since midnight at the start of November 5, follow the TUM IT reset instructions even if you never used myTUM. Try Microsoft 365 first, then the online ID (eID). If neither works, use the email option on campus or via EduVPN if you already have access. Without VPN or an eID, reset on campus. If the reset email does not arrive, check your TUM inbox, any configured forwarding address and spam. Contact TUM IT support if none of the routes works. TUM had not announced a final reset deadline in the reviewed guidance.'
- title: Update saved credentials and protect other accounts
  hint: Replace saved TUM passwords for eduroam, mail and other devices, and change the password anywhere outside TUM you reused it. The new password applies to central TUM and LRZ services that use your TUM ID. Propagation to other services generally takes up to 15 minutes. Enroll in TUM MFA when TUMonline login returns.
- title: Verify reset requests and report suspicious activity
  hint: 'Start from the TUM IT or status site. Use an emailed reset link only if you just requested it yourself through the official email option. TUM does not ask for your password by email, phone or letter. Report suspicious messages or unexpected resets to it-sicherheit@tum.de; direct exposure questions to datenschutz-vorfall@tum.de.'
sources:
- name: TUM incident disclosure
  url: https://www.tum.de/aktuelles/alle-meldungen/pressemitteilungen/details/it-sicherheitsvorfall-an-der-tum
  primary: true
  says: Confirms password theft, administrator credential use, possible personal-data scope and containment.
- name: TUM IT reset instructions
  url: https://www.it.tum.de/it/aktuelles/
  primary: true
  says: All TUM IDs, November 5 cutoff, official reset methods, service restrictions and phishing guidance.
- name: TUMonline status notice
  url: https://status.it.tum.de/entry/bfc5bb29-06b2-4b0f-afb8-aabcf0104220
  primary: true
  says: Records the service interruption start and links to the official reset procedures.
- name: TUM EduVPN status notice
  url: https://status.it.tum.de/entry/f5f6dbf1-ddf6-4fb4-a660-64bc4a4a8f0a
  primary: true
  says: EduVPN requires previously enrolled MFA, with a passkey or TOTP and a valid password.
- name: TUM Microsoft 365 status notice
  url: https://status.it.tum.de/entry/3dd19db7-6459-4e5a-833c-5bce5d1d0add
  primary: true
  says: Confirms login is blocked for users who had not already set up MFA.
---

TUM says unknown attackers stole central login passwords from people who had signed in to myTUM. They obtained a TUMonline system administrator's credentials and used them to attack the separate campus management system. TUM did not disclose the initial entry mechanism, the relevant login period or a victim count. TUM says MFA protected accounts in this incident; its reset requirement still covers all TUM IDs.

Beyond the confirmed password theft, TUM says names, home addresses and birth dates may have been accessed, as may work addresses and phone numbers for employees, and student IDs, degree programs and semesters of study where applicable. Its review of the mostly logged TUMonline access has not indicated exposure of grades or applications so far. That assessment is provisional.

TUMonline login remained unavailable in the November 7 reset instructions; a reset does not itself restore access. The L4 rating reflects confirmed password theft across the affected myTUM population and use of an administrator's credentials against a central system. It does not quantify victims or imply that every category of personal data was taken.
