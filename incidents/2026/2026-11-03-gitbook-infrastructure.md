---
title: GitBook infrastructure intrusion prompts API-token revocation and secret rotation
level: 4
date: '2026-11-03'
tags:
- GitBook
- SaaS
- credentials
summary: GitBook confirms infrastructure-credential intrusion. Integration tokens, Git Sync secrets, API tokens and visitors’ Assistant questions may have been accessed. Customer API tokens were invalidated; users must rotate connected secrets and re-authenticate MCP. App, API and published docs are back, with some degradation; investigation continues.
splash: GitBook customers using API tokens, integrations, Git Sync, Assistant or MCP
wipe: Replace GitBook API tokens, rotate connected third-party and integration secrets, and re-authenticate GitBook MCP
inTheWild: 'yes'
inTheWildNote: GitBook confirms unauthorized access to infrastructure credentials.
cves: []
fixed: []
timeline:
- date: Nov 2, 18:00 UTC
  title: Attacker accesses infrastructure credentials
  body: The original notice gives 19:00 CET (18:00 UTC); GitBook says it detected the attack immediately and later took services offline as a precaution.
- date: Nov 3, 12:15 UTC
  title: Initial notice reports platform intrusion
  body: The 13:15 CET notice says data impact is still being investigated and no customer action is yet required.
- date: Nov 3, 15:21 UTC
  title: New guidance requires credential rotation
  body: The 16:21 CET update replaces the earlier no-action guidance, identifies possible exposure categories and reports services available again with some degradation.
- date: Nov 3, 2026
  title: PancakeSwap restores documentation on its own infrastructure
  body: Its original update says existing links still work. The earlier precautionary notice says its docs were not compromised and its app was unaffected.
checklist:
- title: Replace GitBook API tokens used by your systems
  hint: GitBook says customer API tokens were invalidated and all personal tokens revoked. Ask your organization admin to create replacements through the established GitBook account, update dependent apps/CI secret stores and verify authentication. Do not send old or replacement tokens to unsolicited support contacts.
- title: Rotate connected-provider and published-integration secrets
  hint: Inventory third-party API tokens, Git Sync secrets and integration tokens connected to GitBook. Revoke/rotate them at the issuing provider and update the authorized GitBook configuration. Rotate secrets used by your published integrations too; GitBook-side token revocation does not establish that provider-side credentials are safe.
- title: Re-authenticate GitBook MCP
  hint: Reconnect the GitBook MCP server through your established client and account. The company explicitly requires re-authentication; check dependent automation after credentials change. Ask your organization admin for help rather than disclosing tokens in chat or email.
- title: Check sensitive Assistant questions and current service status
  hint: Visitors’ questions to GitBook Assistant may have been accessed. Review whether questions contained confidential information or credentials and include those credentials in your rotation assessment. Follow the official incident detail and your account manager; recovered availability does not complete the investigation.
- title: Use verified project links when consulting hosted documentation
  hint: PancakeSwap says its docs now run at docs.pancakeswap.finance under its own infrastructure; existing links remain valid. Reach them through pancakeswap.finance. Its original warning says documentation never requires wallet connection or token approval. Do not treat a precautionary takedown as evidence that the project app or wallet was breached.
sources:
- name: GitBook November 3 security incident notice
  url: https://www.gitbook.com/status/security-incident-2026-11-03
  primary: true
  says: 'Full 13:15/16:21 CET updates: confirmed infrastructure access, possible token/secret/question exposure, token revocation, required rotations/MCP re-authentication, and incomplete service restoration.'
- name: GitBook original status incident history
  url: https://www.gitbookstatus.com/incidents/01M6FXDDGQRWHMYYWXY2REQ46X
  primary: true
  says: Tracks precautionary downtime, restored app/public content and remaining degradation. Displayed times lack an explicit timezone, so they are not converted into timeline timestamps.
- name: PancakeSwap original precautionary notice
  url: https://x.com/PancakeSwap/status/2117445975476449290
  primary: true
  says: 'Full public original read without login: docs not compromised, app unaffected; temporary precautionary takedown and no wallet-connection/token-approval requirement.'
- name: PancakeSwap original docs-migration update
  url: https://x.com/PancakeSwap/status/2117528846052556998
  primary: true
  says: 'Full public original read: docs back on controlled infrastructure, existing links work. Displayed publication time lacks timezone; date-only timeline.'
updated: '2026-11-03'
---

GitBook says an attacker gained infrastructure credentials on November 2 at 19:00 CET (18:00 UTC). The company attributes the targeted attack to AI agents, but names no framework or actor and publishes no CVE, exploit details, indicators or affected-customer count. Confirmed platform access supports L4; access to the listed customer-data categories remains possible, not confirmed for every organization.

The November 3 16:21 CET notice supersedes the 13:15 CET “no action yet” position: rotate existing GitBook and connected third-party credentials, published-integration secrets, and re-authenticate MCP. GitBook says it blocked the attacker, closed the vulnerabilities and replaced its infrastructure credentials. It reports no evidence that customer content was modified, which does not rule out reads or future findings. App, API and published docs are available again with some degradation; a full postmortem is pending. No connection to WorkOS/ARTEX or other recent incidents is established.


**Downstream documentation response:** PancakeSwap’s November 3 original says its documentation is back online after migration off GitBook to infrastructure it controls, with existing links preserved. Its earlier original explicitly says its docs were not compromised and its app was unaffected; the takedown was precautionary. This does not establish an exchange breach, injected wallet drainer or customer losses, and does not replace GitBook’s credential-rotation instructions.
