---
title: Irish credit unions confirm saved-payee data exposure at a shared provider
level: 4
date: 2026-11-17
tags:
  - data breach
  - credit unions
  - SaaS
summary: Irish credit unions confirm unauthorized access to saved-payee information at an external online-services provider. Exposed fields can include names, bank account details, payment references and some addresses. The number of affected people remains unknown.
splash: Members and saved payees at credit unions whose online-services provider confirms exposure
wipe: Read your credit union’s notice, verify unexpected financial messages independently and follow individual notifications.
inTheWild: yes
inTheWildNote: Credit unions confirm unauthorized access to saved-payee information.
timeline:
  - date: Oct 2–4, 2026
    title: Provider flaw is exploited
    body: Capital Credit Union reports this exploitation window; it says the flaw was closed on October 6.
  - date: Nov 16, 2026
    title: Provider informs credit unions
    body: Capital, Phoenix and St. Canice’s say they were notified on this day.
  - date: Nov 17, 2026
    title: St. Canice’s publishes its member notice
    body: The exact members and payees affected are still being established.
  - date: Nov 18, 2026
    title: Capital and Phoenix publish further scope and guidance
    body: Capital treats all its saved payees as potentially affected because the precise retrieved subset is unknown.
checklist:
  - title: Check your own credit union’s exposure notice
    hint: Use its official website or established support channel. Confirm which saved payees and fields were affected; a provider-wide customer count is not an affected-person count.
  - title: Verify unexpected financial communications independently
    hint: Phoenix and St. Canice’s warn that known personal details can make calls, texts or emails convincing. Contact your credit union through an established channel before acting.
  - title: Do not transfer money in response to a “safe account” request
    hint: Phoenix says no account action or movement of money is required because of this notice and it will never ask you to transfer funds to keep them safe. Follow any later individualized guidance through official channels.
sources:
  - name: St. Canice’s member notice
    url: https://stcanicescu.ie/important-information-for-members-cybersecurity-incident/
    primary: true
    says: Published November 17; identifies saved-payee fields, exclusions, ongoing scope assessment and member precautions.
  - name: Capital Credit Union member notice
    url: https://capitalcu.ie/important-information-for-members-cybersecurity-incident/
    primary: true
    says: November 18 update gives the October exploitation and closure dates, retrieved fields and conservative payee scope.
  - name: Phoenix Credit Union member notice
    url: https://www.phoenixcu.ie/important-update-cybersecurity-incident/
    primary: true
    says: Confirms provider-side unauthorized access, excluded credentials and precautions against financial impersonation.
---

The incident concerns a shared external provider’s online-services platform. The credit unions’ notices say the compromise did not originate in their own systems. Capital reports successful retrieval of saved-payee information after exploitation on October 2–4, with the flaw closed on October 6. The November 16 notification date is distinct from the November 17 public notice cited here.

Potential fields include the payee’s bank account name and nickname, IBAN/BIC or account number and sort code, free-form payment references, and addresses where recorded. Capital also lists internal reference codes that it says contain no identifiable personal data. Payment references may themselves contain names or other identifying information. The precise retrieved subset and affected-person total remain unknown. Capital therefore treats all its saved payees as potentially affected; this is a precautionary scope, not a confirmed count of stolen records.

Capital says members’ linked accounts, balances, transaction counts and amounts, and online-banking credentials were not accessed. Phoenix and St. Canice’s exclude passwords, PINs, card details and login credentials, and say exposed payee data cannot itself provide account access. These statements do not establish a financial-loss total.

Capital assesses the limited data as not posing a high risk of fraud, phishing or identity theft. Phoenix and St. Canice’s nevertheless recommend vigilance for financial impersonation. These are the institutions’ assessments, not a guarantee that unexpected messages are genuine. Their references to roughly 50 credit unions using the provider describe its customer base, not a verified number of breached organizations or people. Confirmed unauthorized disclosure of financial contact information across institutions supports L4.
