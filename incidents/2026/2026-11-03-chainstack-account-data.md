---
title: Chainstack reports customer account database access; rotate passwords and node credentials
level: 4
date: '2026-11-03'
tags:
- Chainstack
- Data breach
- Credentials
summary: Chainstack confirms an intruder accessed its customer account database and systems holding node credentials. Names, member emails and password hashes may be exposed. Node credential reads are unproven, but the vendor requests rotation and platform API key regeneration.
splash: Chainstack customer accounts and node credentials held in the accessed systems; affected customer count is undisclosed.
wipe: Change passwords, finish node credential rotation, regenerate platform API keys if used, and watch for phishing.
inTheWild: 'yes'
inTheWildNote: Chainstack confirms unauthorized access to development and production infrastructure.
timeline:
- date: Oct 26, 2026
  title: Attacker enters development environment
  body: Vendor investigation dates the first access to this day.
- date: Oct 29, 2026
  title: Attacker reaches parts of production
  body: Chainstack does not identify the third-party component used for entry.
- date: Oct 31, 2026
  title: Chainstack detects the intrusion and cuts access
  body: Customer-facing services continued operating, according to the vendor.
- date: Nov 2, 2026
  title: Vendor finalizes investigation and closes incident
  body: Closure does not complete customer-side credential rotation.
- date: Nov 3, 2026
  title: Public report asks customers to replace credentials
  body: Account database access is confirmed; node credential reads are not established.
checklist:
- title: Change your Chainstack password and reused passwords
  hint: 'Open the known console directly: Settings > Personal > Security > Change password. Replace any password reused on other services. If you cannot sign in, use official account recovery; SSO access is handled by your identity provider administrator.'
- title: Complete every node credential rotation
  hint: An organization Admin or Editor opens the node and selects Rotate credentials > Generate new credentials. Update applications with the new HTTPS/WSS URLs, username/password and gRPC x-token, as applicable, and test them. Then select Complete rotation and Deactivate old credentials. Old credentials remain usable without a time limit until this final step. Rotate each active credential set separately; this process does not change a multichain auth token.
- title: Regenerate platform API keys if you use the platform API
  hint: Follow the incident notice to regenerate platform API keys and replace them in integrations and secret stores. Node credential rotation is a separate operation; contact Chainstack through its known support channel if the API key replacement procedure is unclear.
- title: Watch for targeted phishing and review node usage
  hint: The exposed categories may include names and organization-member emails. Chainstack says it will never ask for passwords, tokens or keys. Review the node Metrics section for unexpected request volume, methods and response codes, preserving suspicious records for support; an anomaly alone does not prove compromise.
sources:
- name: Chainstack incident report
  url: https://chainstack.com/security-incident-nov-2026/
  says: Created and updated November 3; intrusion dates, possible exposed categories, service integrity claims and customer actions.
  primary: true
- name: Chainstack node credential rotation guide
  url: https://docs.chainstack.com/docs/manage-your-node#rotate-node-credentials
  says: Generate, migrate and deactivate; role requirements, multiple sets and multichain-token limitation.
  primary: true
- name: Chainstack account management guide
  url: https://docs.chainstack.com/docs/manage-your-account
  says: Password-change location, official recovery and SSO administrator responsibilities.
  primary: true
---

Chainstack’s November 3 report says an attacker entered through an unnamed third-party component and accessed a customer account database. Organization names, account holder names, organization-member emails and password hashes may have been exposed. The company also treats node credentials as exposed because their hosting systems were accessible, although it found no evidence the credentials were read. Notifying all customers does not establish that every customer’s records were copied. No victim count or confirmed wallet loss is provided.

The vendor says customer nodes, the console and the API were not modified, and customer-facing services kept operating. It says full payment card numbers and security codes were not exposed because it does not store them. These are vendor findings, not an independent forensic verification. The report links the incident to a broader AI-powered campaign but does not name the component, actor or an exploit identifier; a connection to another named incident is unverified.

L4 reflects a confirmed intrusion into production infrastructure and access to customer account data, not a proven mass-victim count. There is no customer software patch. Passwords, node credentials and platform API keys are separate remediation tasks. Generating new node credentials alone leaves the old ones active until rotation is completed.
