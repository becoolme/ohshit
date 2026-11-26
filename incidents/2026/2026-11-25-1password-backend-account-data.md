---
title: 1Password confirms backend intrusion and account-data theft; vaults reported unaffected
level: 4
date: '2026-11-25'
updated: '2026-11-26'
tags: [1Password, data breach, GitHub, CI/CD]
summary: 1Password confirms stolen account records and source code after an employee GitHub account enabled backend and CI/CD access. The company says vault contents and protecting keys were unaffected, and customers need no account changes. Independent scope and containment validation remains underway.
splash: A subset of 1Password account records; some emailed invitation/provisioning/recovery tokens were copied, not vault contents per the vendor.
wipe: Verify unexpected invitations and recovery requests through official channels; 1Password requires no blanket account change.
inTheWild: 'yes'
inTheWildNote: Vendor confirms backend intrusion and copied account records; no evidence of vault access.
cves: []
fixed: []
timeline:
- date: Nov 19, 2026
  title: 1Password begins investigating a corporate GitHub account compromise
  body: This is the investigation date in the later disclosure, not a stated start date for every attacker action or the public disclosure date.
- date: Nov 25, 2026
  title: 1Password discloses backend access and stolen account information
  body: The company reports clean-service restoration, containment and internal credential rotation or revocation. Its official community announcement also says no customer account action is required. No exact containment time or total affected-user count is supplied.
- date: Nov 26, 05:11 UTC
  title: Community manager says external scope assessment remains underway
  body: 1P_Blake reports no evidence of encrypted vault access or download and says work with independent experts to validate scope and containment is continuing. This is a vendor update, not a published independent forensic report.
checklist:
- title: Verify invitation and recovery messages outside the message itself
  hint: >-
    Treat unexpected 1Password invitations, provisioning or recovery emails, texts and calls as suspicious. Open the official app yourself or type the official website address; do not use an unsolicited link to provide credentials. 1Password says it will never contact you to ask for your account password or Secret Key. The Secret Key is normally needed only for the first sign-in on a new device or browser.
- title: Check pending provisioning or recovery with your administrator
  hint: >-
    If you were accepting a SCIM Bridge or Hosted Provisioning invitation, or recovering an account, compare the request with the process you actually initiated and contact your known organization administrator or support@1password.com about the notice. The vendor says a small number of users in these states were specifically notified. Copied link tokens require an SSO sign-in or an additional emailed code; do not infer token possession alone grants access, or that every customer's tokens were stolen or invalidated.
- title: Keep customer action separate from the provider's containment
  hint: >-
    Read the current incident blog and official community replies for account-specific instructions. The vendor says customers need not update anything in their accounts; it reports its own internal credential rotations and clean backend restoration. No case-specific patched app version, universal vault-password reset, Secret Key replacement or service shutdown is prescribed. This does not authenticate a later message claiming an urgent reset is mandatory.
- title: Preserve suspicious contact and report it without sharing secrets
  hint: >-
    Keep the message, sender details, links and relevant dates so support can assess suspected phishing. Contact support@1password.com through a freshly opened official channel; never include your account password, Secret Key or vault contents in a reply. If you already disclosed credentials or accepted an unexpected recovery request, tell official support what occurred and obtain instructions for your account rather than following the sender's recovery steps.
sources:
- name: 1Password November 2026 incident disclosure
  url: https://1password.com/blog/update-on-nov-2026-security-incident
  primary: true
  says: November 25 publication; investigation began November 19, account-record categories, source-code/CI access, containment and token limitations. Vendor says vaults and clients unaffected, no customer change required.
- name: 1Password official community announcement and staff clarifications
  url: https://www.1password.community/announcements-52/update-on-a-security-incident-involving-1password-s-backend-systems-customer-vaults-were-not-affected-and-all-vault-contents-remain-secure-26259
  primary: true
  says: Official November 25 announcement; staff explain SRP verifier limits and no evidence of encrypted vault access. November 26 at 05:11 UTC confirms independent scope/containment assessment remains underway.
---

1Password's November 25 disclosure confirms that an attacker used an employee's corporate GitHub account to access private source code and push malicious code into backend services. The code copied administrative records for a subset of customers. The attacker also accessed the company's CI/CD system, which held infrastructure secrets. How the employee account was compromised, the complete attacker timeline, the number of affected people and the full technical path into production are not disclosed. This is an actual backend intrusion, rated L4; the report does not establish a stolen password vault or a malicious customer app release.

The copied records include names and sign-in email addresses; account/user identifiers; account-creation and last-sign-in times; public keys; Secure Remote Password (SRP) parameters; tokens from certain invitation, provisioning and recovery email links; and other internal account metadata, such as numeric version and file identifiers. There is no public affected-user total. 1Password says public keys and SRP parameters cannot by themselves provide account access. A community manager explains that the SRP verifier derives from both the account password and Secret Key and cannot be used to guess the password without the Secret Key, which the company does not store. These are the vendor's explanations, not an independent forensic finding.

The email-link tokens have a separate scope from vault protection or account recovery keys. Provisioning invitations relate to SCIM Bridge or Hosted Provisioning; the vendor says a small number of users in the affected invitation/recovery state were individually notified. It says a link token must be combined with an SSO sign-in or an emailed verification code and cannot alone open an account. As a precaution, the company changed the code from six numeric digits to ten alphanumeric characters. It reports no internal evidence of account takeover using exposed provisioning tokens. The disclosure does not state that every metadata-affected user received an individual notice or that every customer link token was revoked.

1Password reports disabling the affected GitHub account, revoking a stolen token, removing attacker-created access, restoring clean service versions and rotating or revoking potentially exposed internal credentials. The blog's summary says rotation was triggered; its completed-action list says credentials were rotated or revoked. It also reports stronger GitHub, CI/CD and endpoint controls and new detection coverage, without publishing detailed configurations. Do not turn these provider-side steps into a customer-wide requirement to rotate every stored password.

The company says vaults, vault items and their protecting keys, account recovery keys, apps and browser extensions were unaffected, and services continue normally. Staff separately say there is no evidence that encrypted vaults were accessed or downloaded. On November 26 at **05:11 UTC**, the community manager says independent experts' broader scope and containment validation is still underway. Engagement of outside experts is not a completed independent audit or proof of final incident closure. The sources give no CVE, campaign-specific malicious indicators, confirmed customer-account-takeover count or published client patch threshold. Account data can make impersonation more convincing even while vault contents remain protected.
