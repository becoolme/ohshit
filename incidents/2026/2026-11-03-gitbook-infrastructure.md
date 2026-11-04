---
title: GitBook infrastructure intrusion prompts API-token revocation and secret rotation
level: 4
date: '2026-11-03'
tags:
- GitBook
- SaaS
- credentials
summary: GitBook’s postmortem traces SSO session forgery through a GitHub App and Cloudflare key to infrastructure access. It treats all customer data as exposed, without proving all was read. Replace API/integration/custom-auth secrets and re-authenticate MCP; Git Sync/GitLab keys were rotated by GitBook. Service is restored; three hunting IPs are published.
splash: GitBook customers using API tokens, integrations, Git Sync/GitLab, custom-auth docs, Assistant or MCP
wipe: Replace API/integration secrets and custom-auth signing keys, re-authenticate MCP, and investigate connected repository activity
inTheWild: 'yes'
inTheWildNote: GitBook confirms unauthorized access to infrastructure credentials.
cves: []
fixed: []
timeline:
- date: Nov 2, 18:00 UTC
  title: Attacker accesses infrastructure credentials
  body: The original notice gives 19:00 CET (18:00 UTC); GitBook says it detected the attack immediately and later took services offline as a precaution. This was the initial approximate account; the November 4 postmortem revises production access to 17:48 and the alert to 18:10 UTC.
- date: Nov 3, 12:15 UTC
  title: Initial notice reports platform intrusion
  body: The 13:15 CET notice says data impact is still being investigated and no customer action is yet required.
- date: Nov 3, 15:21 UTC
  title: New guidance requires credential rotation
  body: The 16:21 CET update replaces the earlier no-action guidance, identifies possible exposure categories and reports services available again with some degradation.
- date: Nov 3, 2026
  title: PancakeSwap restores documentation on its own infrastructure
  body: Its original update says existing links still work. The earlier precautionary notice says its docs were not compromised and its app was unaffected.
- date: Nov 4, 10:36 UTC
  title: GitBook declares the incident resolved; Git Sync has a separate outage
  body: The 11:36 CET update reports restored platform functionality, keeps customer actions in force and promises a full postmortem within 24 hours. Git Sync remains affected by an unrelated GitHub outage.
- date: Nov 4, 19:30 UTC
  title: Full postmortem details the intrusion and customer actions
  body: The 20:30 CET original publishes the SSO/GitHub App/Cloudflare/service-account path, UTC chronology and three IPs. All customer data is treated as exposed; repository actions cannot be determined. Custom-auth backends need a regenerated and deployed signing key.
checklist:
- title: Replace GitBook API tokens used by your systems
  hint: GitBook says customer API tokens were invalidated and all personal tokens revoked. Ask your organization admin to create replacements through the established GitBook account, update dependent apps/CI secret stores and verify authentication. Do not send old or replacement tokens to unsolicited support contacts.
- title: Rotate connected-provider and published-integration secrets
  hint: 'Inventory third-party API tokens and published-integration secrets, rotate them at the issuing provider and update authorized configuration. The postmortem distinguishes GitBook-managed Git Sync (GitHub App) and GitLab keys: GitBook rotated these and says no customer rotation is needed for that item. Other third-party credentials remain your responsibility. Its impact table also mentions reconnecting Git Sync/GitLab if applicable; ask your admin/support if a connection still fails rather than assuming repository activity was safe.'
- title: Re-authenticate GitBook MCP
  hint: Reconnect the GitBook MCP server through your established client and account. The company explicitly requires re-authentication; check dependent automation after credentials change. Ask your organization admin for help rather than disclosing tokens in chat or email.
- title: Check sensitive Assistant questions and current service status
  hint: 'Visitors’ questions to GitBook Assistant may have been accessed. Review whether questions contained confidential information or credentials and include those credentials in your rotation assessment. Follow the official incident detail and your account manager; recovered availability does not complete the investigation. The November 4 resolution notice retains the credential actions. Verify Git Sync separately: the notice attributes its continuing problem to GitHub, not additional attacker access; read the now-published full postmortem. The November 3 question-exposure warning still needs assessment, and recovered availability does not establish that no reads occurred.'
- title: Use verified project links when consulting hosted documentation
  hint: PancakeSwap says its docs now run at docs.pancakeswap.finance under its own infrastructure; existing links remain valid. Reach them through pancakeswap.finance. Its original warning says documentation never requires wallet connection or token approval. Do not treat a precautionary takedown as evidence that the project app or wallet was breached.
- title: Regenerate the custom-auth signing key
  hint: If documentation uses a custom authentication backend, regenerate the authenticated access signing key in the GitBook app, update your backend implementation and test old-key rejection and the new authentication flow. Replacing an API token alone does not complete this step.
- title: Hunt the three IPs and review connected repositories
  hint: Preserve audit, token and session records for connected GitHub/GitLab repositories and your own services. Check 94.183.188.91, 45.139.84.195 and 198.251.83.217 alongside anomalous November 2–3 access, changes or credential use. GitBook cannot determine whether attackers acted in customers’ authorized repositories; investigate the scope granted to the app. An IP match alone does not prove compromise, and absence does not rule it out.
sources:
- name: GitBook November 3 security incident notice
  url: https://www.gitbook.com/status/security-incident-2026-11-03
  primary: true
  says: 'Full 13:15/16:21 CET updates: confirmed infrastructure access, possible token/secret/question exposure, token revocation, required rotations/MCP re-authentication, and incomplete service restoration. November 4 11:36 CET declares resolution, separates GitHub-related Git Sync disruption, retains required actions and promises a postmortem within 24 hours. November 4 20:30 CET full postmortem adds attack path, all-customer exposure posture, three IPs, custom-auth key and managed-sync distinctions; its detailed UTC timeline revises the initial approximate timing.'
- name: GitBook original status incident history
  url: https://www.gitbookstatus.com/incidents/01M6FXDDGQRWHMYYWXY2REQ46X
  primary: true
  says: Tracks precautionary downtime, restored app/public content and remaining degradation. Displayed times lack an explicit timezone, so they are not converted into timeline timestamps. November 4 resolution entry says customer action details were emailed and a postmortem is pending. A later entry now links the published full postmortem.
- name: PancakeSwap original precautionary notice
  url: https://x.com/PancakeSwap/status/2117445975476449290
  primary: true
  says: 'Full public original read without login: docs not compromised, app unaffected; temporary precautionary takedown and no wallet-connection/token-approval requirement.'
- name: PancakeSwap original docs-migration update
  url: https://x.com/PancakeSwap/status/2117528846052556998
  primary: true
  says: 'Full public original read: docs back on controlled infrastructure, existing links work. Displayed publication time lacks timezone; date-only timeline.'
updated: '2026-11-04'
---

GitBook’s initial notice placed infrastructure-credential access on November 2 at 19:00 CET (18:00 UTC); the detailed postmortem below revises this approximate timing. The company attributes the targeted attack to AI agents, but names no framework or actor. The later postmortem below adds the attack path and three IPs; no CVE or affected-customer count is published. Confirmed platform access supports L4; access to the listed customer-data categories remains possible, not confirmed for every organization.

The November 3 16:21 CET notice supersedes the 13:15 CET “no action yet” position: rotate existing GitBook and connected third-party credentials, published-integration secrets, and re-authenticate MCP. GitBook says it blocked the attacker, closed the vulnerabilities and replaced its infrastructure credentials. It reports no evidence that customer content was modified, which does not rule out reads or future findings. The November 3 update reported app, API and published docs available with some degradation; this is superseded by the recovery notice below. No connection to WorkOS/ARTEX or other recent incidents is established.

**Downstream documentation response:** PancakeSwap’s November 3 original says its documentation is back online after migration off GitBook to infrastructure it controls, with existing links preserved. Its earlier original explicitly says its docs were not compromised and its app was unaffected; the takedown was precautionary. This does not establish an exchange breach, injected wallet drainer or customer losses, and does not replace GitBook’s credential-rotation instructions.

**November 4 recovery:** At 11:36 CET (10:36 UTC), GitBook declared the incident resolved and platform functionality restored. Git Sync was still affected by a separate GitHub outage. The company retains the token/secret rotations and MCP re-authentication above and promises a full postmortem within 24 hours. Availability recovery does not independently establish that every customer completed those actions or settle the possible data-access scope.

**November 4 full postmortem (20:30 CET / 19:30 UTC):** GitBook says an SSO login flaw allowed forged staff sessions, followed by querying a misconfigured internal GitHub App’s authentication information, access to code repositories, a Cloudflare API key, and production secrets granting infrastructure access through a service account. It treats all customer data as exposed, beyond the targeted customer; that does not establish every record was read. Accessible categories include API/integration/session-signing secrets, authenticated documentation and docs/spaces/change requests. GitHub/GitLab access was limited to repositories authorized by each customer; actual repository actions cannot be determined. The company says billing information, passwords and IP addresses were not compromised and reports no evidence of customer-content modification.

The detailed UTC chronology revises the initial approximate account: on November 2, a target customer account was hijacked at 12:27, staff sessions/code reached at 16:32, production reached at 17:48, an alert fired at 18:10, SSO was fixed at 19:58, and accounts were disabled/platform taken offline at 20:32. On November 3, redeployment/API-token invalidation began at 02:34, new Cloudflare Workers deployed at 03:09, release preparation began at 06:00, GitHub App keys rotated at 10:52, all secrets rotated/service returned at 11:56, and GitLab sync tokens rotated at 22:51. It separately reports about 2 hours 45 minutes of production access on November 2 and about 40 minutes early November 3, without full endpoints for the latter; downtime alone is not proof of final eviction. Earlier approximate timing is retained as historical reporting.

Complete the new custom-auth key step and repository investigation. GitBook-managed sync-key rotation does not rotate customer-owned third-party credentials. Its action list says no Git Sync/GitLab action is needed while its impact table mentions reconnection if applicable; both statements are retained with a support check. Earlier MCP re-authentication and Assistant-question exposure assessment still apply. The company’s automation/AI assessment does not independently identify a framework or establish a shared actor.
