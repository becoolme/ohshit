---
date: 2026-10-28
title: Allium discloses unauthorized system access and revokes API keys during platform recovery
level: 3
tags:
  - Allium
  - API keys
  - SaaS
ecosystems:
  - cloud
  - crypto
summary: Allium confirms unauthorized access detected October 25. Its October 28 recovery notice revokes existing API keys and requires a new password. Core Explorer APIs are restored, but uploaded-data access and AI/MCP features remain unavailable in the notice read. Customer-data exposure is not established.
splash: Allium application and API customers, especially integrations using existing keys or uploaded tables
wipe: Replace revoked API keys as instructed, set a new password, enable MFA and check affected workflows before restarting
inTheWild: yes
inTheWildNote: Allium confirms unauthorized access to certain systems; customer-data exposure is unspecified.
cves: []
fixed: []
timeline:
  - date: Oct 25, 2026
    title: Allium detects unauthorized access, according to its later security statement
  - date: Oct 28, 2026
    title: Recovery notice announces security resets and partial restoration
    body: Existing API keys are being revoked; customers should create a new key or wait for one issued by their Allium contact. Password reset and MFA are recommended, while uploaded-data access and AI/MCP recovery remain restricted.
checklist:
  - title: Replace revoked API keys through the official app
    hint: Create a new key in Allium and update each integration’s secret store. If your Allium contact is issuing a key directly, follow the status notice and wait for it. Test a representative API request after updating configuration; a restored endpoint does not make the old key valid.
  - title: Reset your password and enable MFA
    hint: Use your existing official Allium bookmark to sign in and set a new password as instructed. Turn on multi-factor authentication. Review the direct customer notice and coordinate unusual activity with Allium support; do not infer that every stored credential or customer dataset was stolen.
  - title: Validate data dependencies and service recovery
    hint: Check status.allium.so before resuming jobs. The read notice says uploads and access to previously uploaded tables are disabled, so queries depending on those tables will fail; Allium Assistant and MCP are not yet restored. Datashare backfill and verification continue, and a stale verified_until timestamp alone does not establish missing data. Check the affected interval and per-chain verification before relying on downstream results.
sources:
  - name: Allium security statement
    url: https://www.allium.so/blog/allium-security-update-incident-response-and-platform-recovery/
    primary: true
    says: CEO Ethan Chan confirms unauthorized access detected October 25, direct notification and independent investigation. It does not specify customer-data exposure.
  - name: Allium official status and recovery notices
    url: https://status.allium.so/
    primary: true
    says: October 28 security-reset notice requires new API keys/password; distinguishes restored core services from uploaded data, AI/MCP and ongoing datashare validation.
---

Allium’s security statement acknowledges access to some systems and says affected customers were notified directly. It does not identify the entry point, enumerate accessed customer data or provide a victim count. L3 reflects a developer-facing data provider’s confirmed intrusion and credential-reset requirements; it does not assert a mass data leak.

October 25 is the detection date. The incident date here follows the October 28 public security-reset and recovery notice, rather than treating an earlier maintenance/outage message as proof of public breach disclosure. Core service restoration is not equivalent to complete recovery: uploaded tables, AI/MCP functions and datashare verification have separate status. No link to the Binance or other bridge incidents is established.
