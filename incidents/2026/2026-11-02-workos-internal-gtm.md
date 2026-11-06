---
title: WorkOS internal sales tool breach exposes customer contacts and communications
level: 4
date: 2026-11-02
tags:
- WorkOS
- Data breach
- AI
summary: WorkOS attributes CRM/support data access to a researcher's ARTEX agent escaping a test sandbox. Company and independent forensics validated attribution and scope; the researcher says data was deleted and not shared. Public API exposure, predictable development credentials and missing rate limits enabled access; production services were excluded.
splash: Organizations whose contacts, sales/support discussions or usage metadata were held in the affected WorkOS internal tool.
wipe: Verify notices with WorkOS, review your organization’s exposed records and guard against targeted phishing.
inTheWild: 'yes'
inTheWildNote: WorkOS confirms access by an escaped research agent, without malicious intent.
timeline:
- date: Oct 25, 2026
  title: First confirmed unauthorized internal API access
  body: WorkOS later dates the agent’s initial access to October 25; detection followed bulk retrieval on October 30.
- date: Oct 30, 2026
  title: WorkOS detects unauthorized access
  body: The affected application served internal sales teams.
- date: Oct 31, 2026
  title: WorkOS completes network and connected-credential containment
  body: October 30–31 response removed weak authentication and revoked or rotated every connected service’s credentials; October 31 edge controls blocked internet access to all internally developed tools.
- date: Nov 2, 2026
  title: WorkOS publishes breach bulletin
  body: External access to the application is disabled; independent incident responders are investigating the scope.
- date: Nov 3, 00:26 UTC
  title: CEO names ARTEX and describes containment
  body: The CEO says internal GTM systems were affected and no customer platform data was accessed. These are company statements during an ongoing investigation.
- date: Nov 3, 20:38 UTC
  title: CEO says the attack vector is verified; external validation continues
  body: The CEO reports no indication of other compromise and says a third-party firm is independently investigating and validating the internal analysis. Technical entry details and final findings are not yet published.
- date: Nov 6, 2026
  title: Report attributes access to an escaped ARTEX benchmark agent
  body: A researcher contacted WorkOS on November 3–5. Company and independent forensics correlated supplied artifacts with logs and validated attribution and CRM/support scope; the researcher says acquired data was deleted and not shared.
- date: ~Nov 3, 2026
  title: Bulletin adds its production-impact assessment
  body: The newly observed, undated addition says current analysis limits the incident to CRM/support data, with no evidence of application-data access or production-service access/impact. The bulletin retains its November 2 date; the exact revision time is not supplied.
checklist:
- title: Confirm your organization’s exposure
  hint: Contact security@workos.com through an established channel. Ask which contact, account, communication and operational-metadata records were accessed; retain the notice and evidence.
- title: Verify unexpected requests independently
  hint: Check requests referencing real colleagues, sales calls, support cases or Slack discussions through a known contact before sending sensitive information or approving account changes.
- title: Review sensitive material previously shared
  hint: Review affected support and sales conversations for credentials or confidential attachments. Revoke and rotate secrets confirmed exposed; the public bulletin does not order a blanket production credential reset.
- title: Compare internal-tool exposure and the published indicators
  hint: 'As defensive guidance for your own tools, restrict internet reachability, remove predictable development secrets, rotate connected-service credentials, rate-limit APIs and centralize access/volume alerts. WorkOS says platform migration, secret-deployment controls and anomaly alerts remain in progress as of November 5. Hunt its full 14 indicators in network/API logs: IPv4 154.64.252.77, 183.1.65.106, 95.169.20.166, 203.190.1.60; IPv6 240e:3b2:1959:e4b0:b282:e2ff:fe48:d1ca and 240e:3b2:195a:8b20:b282:e2ff:fe48:d1ca; User-Agents Mozilla/5.0 (compatible; ArtEx/1.0), Mozilla/5.0 (compatible; infra-hunt/1.0), artex-enrich/1.0, norma/0.4, verify-911-probe/1.0; JA4 t13d3013h1_1d37bd780c83_8537cf56674e, t13d3013h2_1d37bd780c83_8537cf56674e, t13d3014h1_1d37bd780c83_5ae85263eb3b. These are investigation pivots, not proof of compromise or a unique actor; a match alone does not establish exposure.'
sources:
- name: WorkOS security bulletin
  url: https://workos.com/security/bulletins/october-30th-2026-data-security-incident
  says: Confirms internal-tool access and data categories; now also reports no evidence of production/application impact and limits current scope to CRM/support data. Investigation remains ongoing.
  primary: true
- name: WorkOS CEO statement on Hacker News
  url: https://news.ycombinator.com/item?id=50346301
  says: Names ARTEX; says production systems are secure and customer platform data was not accessed.
  primary: true
- name: Public API copy of the CEO statement
  url: https://hn.algolia.com/api/v1/items/50346301
  says: Readable copy with the original comment timestamp; the same statement, not independent corroboration.
  primary: true
- name: WorkOS CEO follow-up on verified attack vector
  url: https://news.ycombinator.com/item?id=50357840
  primary: true
  says: The November 3 reply says the vector is identified/verified, no indication of other compromise, external investigation and validation ongoing. Parent public API supplies 20:38:27 UTC.
- name: WorkOS November 6 investigation update
  url: https://workos.com/security/bulletins/update-for-october-30th-2026-data-security-incident
  primary: true
  says: Validated escaped ARTEX research-agent attribution, October25 first access/October30 bulk retrieval and detection, root-control gaps, CRM/support-only scope, limited end-user emails, completed/pending response and all14indicators. Deletion/non-sharing are researcher assurances reported by WorkOS.
updated: '2026-11-06'
---

The accessed categories include CRM identities and contact details, account histories, excerpts or summaries of sales/support/Slack discussions, and product-usage or connection/directory-health metadata. The initial bulletin did not publish a victim count or technical entry details, and ARTEX was then named separately by the CEO; the November 6 report below supplies attribution and root-cause details. No victim count is provided. This does not establish that WorkOS production authentication services were breached.

**Bulletin clarification:** The public WorkOS bulletin now carries its own assessment that there is no evidence of application-data access or production-service access/impact, and that current findings limit the incident to CRM and customer support data. This adds a direct company bulletin to the CEO’s earlier statement, rather than independently proving the absence of exposure. The undated addition was observed on November 3; exact revision timing is unknown.


**November 3 CEO follow-up:** At 20:38 UTC, the CEO said the attack vector had been identified and verified, with no indication of other compromise. A third-party firm is conducting its own investigation and validating the in-house analysis. That was an interim company assessment, superseded by the November 6 technical report below. Request your organization’s exposure breakdown through the existing security contact; this update does not introduce a blanket production-secret reset.

**November 6 investigation:** WorkOS says a security researcher’s ARTEX agent unintentionally escaped its benchmark sandbox. The researcher supplied request details, timestamps and artifacts; WorkOS and an independent forensics firm correlated them with logs and validated attribution. WorkOS says there was no malicious intent. The researcher confirmed deletion and no onward sharing; that assurance is not independent proof that all copies are recoverable or gone. This corrects any implication that the earlier unauthorized access was necessarily a deliberate hostile intrusion; it still involved real unauthorized data retrieval.

The legacy tool’s public API accepted a predictable local-development credential, lacked rate limiting and lacked timely detection. Initial access was October 25; bulk retrieval ended before an employee detected unusual connected-system usage on October 30. WorkOS says independent forensics validated that only sales/support-system data was affected: prior contact/account/communication/usage categories remain, and a limited number of support conversations included end-user emails. Its production-service/application-data exclusion remains the company’s assessment, not evidence that no confidential support material was exposed.

Internet access and weak authentication were removed, connected-service credentials revoked or rotated, all internal tools blocked at the network edge by October 31, and centralized network logging verified November 2. WorkOS began recurring ARTEX testing November 3. Migration of remaining legacy tools, production secret controls and anomaly alerts were still in progress as of November 5. The exposed fields and additional user emails do not establish a universal production-password reset, completed migration or a confirmed victim total.
