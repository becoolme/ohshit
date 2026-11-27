---
date: 2026-10-28
updated: 2026-11-27
title: Allium discloses unauthorized system access and revokes API keys during platform recovery
level: 3
tags:
  - Allium
  - API keys
  - SaaS
ecosystems:
  - cloud
  - crypto
summary: Allium revoked API keys and required new passwords after detecting unauthorized access. It reports independently validated containment November 6 and full Allium App restoration November 20. Verify uploaded-table workflows separately; the restoration notice does not resolve customer-data impact or publish a final forensic report.
splash: Allium application and API customers, especially integrations using existing keys or uploaded tables
wipe: Replace revoked API keys as instructed, set a new password, enable MFA and check affected workflows before restarting
inTheWild: yes
inTheWildNote: Allium confirms unauthorized access; customer-data impact remains unspecified.
cves: []
fixed: []
timeline:
  - date: Oct 25, 2026
    title: Allium detects unauthorized access, according to its later security statement
  - date: Oct 28, 2026
    title: Recovery notice announces security resets and partial restoration
    body: Existing API keys are being revoked; customers should create a new key or wait for one issued by their Allium contact. Password reset and MFA are recommended, while uploaded-data access and AI/MCP recovery remain restricted.
  - date: Oct 30, 15:03 UTC
    title: All-chain datashare delivery and historical verification confirmed
    body: Allium says Snowflake, BigQuery and Databricks datashares passed historical checks for all chains across all regions.
  - date: Nov 2, 15:38 UTC
    title: Datashare incident marked resolved
    body: This closes the datashare outage, not the security investigation or separate uploaded-data and AI/MCP restrictions.
  - date: Nov 2, 16:22 UTC
    title: Allium Assistant restored for all users; MCP recovery still pending
    body: The separate Explorer/API recovery notice confirms Assistant restoration but says more features, including MCP, will follow. It does not lift the uploaded-table restriction or close the security investigation.
  - date: Nov 5, 14:11 UTC
    title: MCP restored for all users
    body: The Explorer/API notice restores MCP; public dashboard-link sharing is still being brought back online. This does not announce uploaded-table recovery or completion of the security investigation.
  - date: Nov 6, 2026
    title: Allium reports independent validation of containment
    body: The forensic investigation continues to determine the full scope and impact. Allium plans a summary once it concludes.
  - date: Nov 20, 16:19 UTC
    title: Allium reports full App functionality restored
    body: The Explorer/API recovery incident is resolved with monitoring continuing. This broad service-restoration statement does not separately describe uploaded-table recovery or close the forensic investigation.
checklist:
  - title: Replace revoked API keys through the official app
    hint: Create a new key in Allium and update each integration’s secret store. If your Allium contact is issuing a key directly, follow the status notice and wait for it. Test a representative API request after updating configuration; a restored endpoint does not make the old key valid.
  - title: Reset your password and enable MFA
    hint: Use your existing official Allium bookmark to sign in and set a new password as instructed. Turn on multi-factor authentication. Review the direct customer notice and coordinate unusual activity with Allium support; do not infer that every stored credential or customer dataset was stolen.
  - title: Validate data dependencies and service recovery
    hint: Check status.allium.so and the full Explorer/API incident history before resuming jobs. Allium says all App functionality was restored November 20 at 16:19 UTC, superseding its earlier recovery-in-progress notice. Test public dashboard links, uploads, access to previously uploaded tables and dependent queries with your own data; the broad resolution does not separately document uploaded-table recovery. Assistant recovered November 2 at 16:22 UTC and MCP November 5 at 14:11 UTC. All-chain datashare delivery and historical verification were confirmed October 30, with that incident resolved November 2. Reconcile downstream jobs and the affected interval; a stale verified_until timestamp alone does not establish missing data. Report discrepancies through your existing Allium contact and keep following customer notices and the forensic report.

sources:
  - name: Allium security statement
    url: https://www.allium.so/blog/allium-security-update-incident-response-and-platform-recovery/
    primary: true
    says: CEO Ethan Chan confirms unauthorized access detected October 25, direct notification and independent investigation. The November 6 update reports independent validation of containment and leaves customer-data impact open.
  - name: Allium official status and recovery notices
    url: https://status.allium.so/
    primary: true
    says: October 28 security-reset notice requires new API keys/password; distinguishes restored core services from uploaded data, AI/MCP and ongoing datashare validation.
  - name: Allium full datashare incident history
    url: https://status.allium.so/incidents/dry5s6427nfb
    primary: true
    says: October 30 confirms all-chain delivery and historical verification; November 2 at 10:38 EST marks this datashare incident resolved. Other feature restrictions and the security investigation are separate.
  - name: Allium separate Explorer/API recovery notice
    url: https://status.allium.so/incidents/fhl7h8hp4sfz
    primary: true
    says: November 2 at 11:22 EST restores Assistant; November 5 at 09:11 EST restores MCP for all users. The November 20 update at 11:19 EST reports all App functionality restored. It does not separately explain uploaded-table recovery or resolve customer-data impact.
---

Allium’s security statement acknowledges access to some systems and says affected customers were notified directly. It does not identify the entry point, enumerate accessed customer data or provide a victim count. L3 reflects a developer-facing data provider’s confirmed intrusion and credential-reset requirements; it does not assert a mass data leak.

October 25 is the detection date. The incident date here follows the October 28 public security-reset and recovery notice, rather than treating an earlier maintenance/outage message as proof of public breach disclosure. The initial core-service restoration left uploaded tables, AI/MCP functions and datashare verification with separate status. The later broad App resolution below does not provide a final security-impact assessment. No link to the Binance or other bridge incidents is established.

The November 2 resolution applies specifically to datashare service degradation. At 16:22 UTC on November 2, the separate Explorer/API notice subsequently restored Allium Assistant for all users while leaving MCP recovery pending. Neither update lifts the October 28 uploaded-table restriction. No new root cause, customer-data scope or final forensic report is published in this resolution.

The November 5 update at 14:11 UTC restores MCP for all users. At that time, public dashboard-link sharing remained in recovery. MCP availability does not establish restored uploaded-table access, a final forensic conclusion or resolved customer-data scope.

On November 6, Allium said the independent security firm it engaged had validated its containment measures. The company is still determining the full impact and plans to publish its findings once the investigation is complete. The validation gives no new feature-recovery or customer-data determination.

At 16:19 UTC on November 20 (11:19 EST in the source), Allium marked its Explorer/API recovery incident resolved and said all Allium App functionality was fully restored, with monitoring continuing. This supersedes the earlier statement that public dashboard-link sharing was still being restored. It does not individually enumerate uploads or access to previously uploaded tables, so customers should test those workflows rather than treating the old restriction as definitely still active or the broad notice as a per-feature guarantee. The November 6 security statement still leaves scope and customer-data impact under investigation and promises a later summary; resolving the service incident is not a final forensic conclusion.
