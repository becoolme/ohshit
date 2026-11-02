---
date: 2026-10-28
updated: 2026-11-02
title: Allium discloses unauthorized system access and revokes API keys during platform recovery
level: 3
tags:
  - Allium
  - API keys
  - SaaS
ecosystems:
  - cloud
  - crypto
summary: Allium confirms unauthorized access detected October 25. Its October 28 recovery notice revokes existing API keys and requires a new password. Datashare recovery was marked resolved November 2; uploaded-data access and AI/MCP still have separate restrictions. Customer-data exposure is not established.
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
checklist:
  - title: Replace revoked API keys through the official app
    hint: Create a new key in Allium and update each integration’s secret store. If your Allium contact is issuing a key directly, follow the status notice and wait for it. Test a representative API request after updating configuration; a restored endpoint does not make the old key valid.
  - title: Reset your password and enable MFA
    hint: Use your existing official Allium bookmark to sign in and set a new password as instructed. Turn on multi-factor authentication. Review the direct customer notice and coordinate unusual activity with Allium support; do not infer that every stored credential or customer dataset was stolen.
  - title: Validate data dependencies and service recovery
    hint: Check status.allium.so before resuming jobs. The read notice says uploads and access to previously uploaded tables are disabled, so queries depending on those tables will fail; Allium Assistant and MCP are not yet restored. All-chain datashare delivery and historical verification were confirmed October 30, and that incident was marked resolved November 2. Validate your downstream jobs and affected interval; a stale verified_until timestamp alone does not establish missing data. The datashare resolution does not announce uploaded-table or AI/MCP restoration.
sources:
  - name: Allium security statement
    url: https://www.allium.so/blog/allium-security-update-incident-response-and-platform-recovery/
    primary: true
    says: CEO Ethan Chan confirms unauthorized access detected October 25, direct notification and independent investigation. It does not specify customer-data exposure.
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
    says: The October 28 separate entry still lists Allium Assistant and MCP as unavailable; the datashare resolution does not lift it.
---

Allium’s security statement acknowledges access to some systems and says affected customers were notified directly. It does not identify the entry point, enumerate accessed customer data or provide a victim count. L3 reflects a developer-facing data provider’s confirmed intrusion and credential-reset requirements; it does not assert a mass data leak.

October 25 is the detection date. The incident date here follows the October 28 public security-reset and recovery notice, rather than treating an earlier maintenance/outage message as proof of public breach disclosure. Core service restoration is not equivalent to complete recovery: uploaded tables, AI/MCP functions and datashare verification have separate status. No link to the Binance or other bridge incidents is established.

The November 2 resolution applies specifically to datashare service degradation. The latest separate Explorer/API recovery notice still says Allium Assistant and MCP are unavailable; the October 28 uploaded-table restriction is not lifted by this datashare entry. No new root cause, customer-data scope or final forensic report is published in this resolution.
