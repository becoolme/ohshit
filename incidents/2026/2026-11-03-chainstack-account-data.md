---
title: Chainstack reports customer account database access; rotate passwords and node credentials
level: 4
date: '2026-11-03'
updated: 2026-11-12
tags:
- Chainstack
- Data breach
- Credentials
summary: Chainstack says a test Grafana instance with default credentials led to production access and customer account database reads. Names, emails and password hashes may be exposed. Node credential reads remain unproven. Rotate passwords and node credentials, and regenerate platform API keys.
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
  body: The November 10 update traces access back to an exposed test Grafana instance.
- date: Oct 31, 2026
  title: Chainstack detects the intrusion and cuts access
  body: Customer-facing services continued operating, according to the vendor.
- date: Nov 2, 2026
  title: Vendor finalizes investigation and closes incident
  body: Closure does not complete customer-side credential rotation.
- date: Nov 3, 2026
  title: Public report asks customers to replace credentials
  body: Account database access is confirmed; node credential reads are not established.
- date: Nov 10, 2026
  title: Chainstack adds the technical report and indicators
  body: The report details the Grafana and Kubernetes pivot, cross-environment credentials and production database access.
checklist:
- title: Change your Chainstack password and reused passwords
  hint: 'Open the known console directly: Settings > Personal > Security > Change password. Replace any password reused on other services. If you cannot sign in, use official account recovery; SSO access is handled by your identity provider administrator.'
- title: Complete every node credential rotation
  hint: An organization Admin or Editor opens the node and selects Rotate credentials > Generate new credentials. Update applications with the new HTTPS/WSS URLs, username/password and gRPC x-token, as applicable, and test them. Then select Complete rotation and Deactivate old credentials. Old credentials remain usable without a time limit until this final step. Rotate each active credential set separately; this process does not change a multichain auth token.
- title: Regenerate platform API keys if you use the platform API
  hint: Follow the incident notice to regenerate platform API keys and replace them in integrations and secret stores. Node credential rotation is a separate operation; contact Chainstack through its known support channel if the API key replacement procedure is unclear.
- title: Watch for targeted phishing and review node usage
  hint: The exposed categories may include names and organization-member emails. Chainstack says it will never ask for passwords, tokens or keys. Review the node Metrics section for unexpected request volume, methods and response codes, preserving suspicious records for support; an anomaly alone does not prove compromise.
- title: Hunt with the vendor’s technical indicators
  hint: 'Review Grafana, cloud secret-access, VPN, DNS and Kubernetes audit logs. The report lists 11 network entries, eight hashes and host and cluster artifacts. Network indicators: 18.237.52[.]142, 187.15.134[.]80, 187.15.134[.]77, 187.15.134[.]45, 185.242.233[.]68, 185.242.233[.]68:10800, 185.242.233[.]68:8088/artx-beacon, 185.242.233[.]68:9331, 185.242.233[.]68:39443, silverbullet[.]icu, hxxps://silverbullet[.]icu/p/17fbad90-3094-4198-9b60-49fc852e331d/bootstrap.js. See the report for hashes and artifacts. Correlate hits with the observation windows and behaviors before concluding compromise.'
sources:
- name: Chainstack incident report
  url: https://chainstack.com/security-incident-nov-2026/
  says: First published November 3; intrusion dates, possible exposed categories, service integrity claims and customer actions.
  primary: true
- name: Chainstack node credential rotation guide
  url: https://docs.chainstack.com/docs/manage-your-node#rotate-node-credentials
  says: Generate, migrate and deactivate; role requirements, multiple sets and multichain-token limitation.
  primary: true
- name: Chainstack account management guide
  url: https://docs.chainstack.com/docs/manage-your-account
  says: Password-change location, official recovery and SSO administrator responsibilities.
  primary: true
- name: Chainstack technical report and indicators
  url: https://chainstack.com/security-incident-nov-2026/#technical-details
  primary: true
  says: November 10 technical update explains the attack chain, containment, detection and hardening.
---

Chainstack’s November 3 report says an attacker entered through an unnamed third-party component and accessed a customer account database. Organization names, account holder names, organization-member emails and password hashes may have been exposed. The company also treats node credentials as exposed because their hosting systems were accessible, although it found no evidence the credentials were read. Notifying all customers does not establish that every customer’s records were copied. No victim count or confirmed wallet loss is provided.

The vendor says customer nodes, the console and the API were not modified, and customer-facing services kept operating. It says full payment card numbers and security codes were not exposed because it does not store them. These are vendor findings, not an independent forensic verification. The report links the incident to a broader AI-powered campaign but does not name the component, actor or an exploit identifier; a connection to another named incident is unverified.

L4 reflects a confirmed intrusion into production infrastructure and access to customer account data, not a proven mass-victim count. There is no customer software patch. Passwords, node credentials and platform API keys are separate remediation tasks. Generating new node credentials alone leaves the old ones active until rotation is completed.

The November 10 technical update identifies the entry point as an internet-facing test Grafana instance with unchanged default administrator credentials. The Grafana data-source proxy could reach internal services, including an unauthenticated MCP server with cluster-admin privileges. Chainstack linked that server to the pivot using network and permission evidence. It could not recover the individual calls. Machine credentials usable in production enabled further access. The attacker read production secrets, connected through a compromised VPN key and queried production databases. Chainstack found no evidence of a software vulnerability and reports revoking exposed identities and tokens, shutting down the affected development cluster and invalidating customer sessions. The update does not confirm node credential reads or a victim total.
