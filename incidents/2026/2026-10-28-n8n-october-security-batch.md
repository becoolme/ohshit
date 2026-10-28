---
title: n8n publishes 12 advisories covering code isolation, credential leaks and workflow authentication
level: 3
date: 2026-10-28
tags:
- n8n
- automation
- credentials
ecosystems:
- n8n
summary: n8n’s October 28 batch includes three high-severity code-execution issues and nine medium issues. Workflow editors, untrusted node inputs and enabled features create different attack paths. Update and migrate deprecated code nodes; saved workflows can keep running.
splash: n8n workflow editors or untrusted inputs reaching affected nodes; Browser Use and Enterprise OAuth have additional prerequisites
wipe: Use 2.45.5 / 2.46.1 / 3.0.1 as appropriate; replace deprecated code nodes and audit affected workflows and credentials
inTheWild: unknown
inTheWildNote: The advisories do not report a malicious campaign or victim counts.
cves:
- id: GHSA-gx3v-3x3v-f8r5
  name: Expression isolation escape
  description: A workflow editor can execute code on the host.
- id: GHSA-9p7v-45m2-wxgj
  name: Deprecated code nodes bypass runners
  description: Workflow editors can execute in the main process through Function, Function Item or LangChain Code; existing workflows still run after the default block.
- id: GHSA-f2cw-9483-7vcp
  name: GraphicsMagick image processing
  description: Untrusted images reaching Edit Image in the official Docker image can cause code execution.
- id: GHSA-9qx8-fhxv-w794
  name: Browser Use server file read
  description: An authenticated member connecting a browser can read server files when Browser Use is explicitly enabled; the path is resolved on the n8n server.
- id: GHSA-pwj5-wwm6-g83j
  name: Embedded chat authentication bypass
  description: A published embedded Chat Trigger using n8n User Auth permits unauthenticated setup GETs to read a named session or trigger work.
- id: GHSA-4v22-g448-h4rg
  name: MongoDB update target manipulation
  description: Untrusted updateKey input can make Update/Find And Replace overwrite unintended documents or insert new ones.
- id: GHSA-426f-xmcv-g8pg
  name: Dynamic OAuth account hijack
  description: Enterprise resolvable OAuth2 credentials let a member capture another person’s provider tokens if that person follows the authorization URL and consents without an n8n session.
- id: GHSA-rc3w-8jc8-7x3w
  name: MCP OAuth open redirect
  description: Unauthenticated client registration can redirect a visitor opening a crafted URL; no token/session data is included in that redirect.
- id: GHSA-mx4r-96jx-v278
  name: Asana verification-secret reset
  description: An unauthenticated caller knowing the webhook URL can replace X-Hook-Secret and forge events while legitimate deliveries fail.
- id: GHSA-2x68-96jw-5r6c
  name: OracleDB vector metadata SQL injection
  description: Untrusted metadata filter keys can read data accessible to the configured Oracle credential.
- id: GHSA-prmc-fg87-r4gh
  name: Cross-origin credential forwarding
  description: Credential-using nodes can forward authentication across attacker-influenced redirects; HTTP Request v4.4 opted out of the unsafe default.
- id: GHSA-jmcg-c7p5-q69g
  name: NocoDB attachment token exposure
  description: A base editor can supply an attachment URL that receives the configured API token when Download Attachments is enabled and the workflow runs.
fixed:
- product: n8n 2.45
  version: 2.45.5
- product: n8n 2.46
  version: 2.46.1
- product: n8n 3.0
  version: 3.0.1
timeline:
- date: Oct 28, 2026
  title: n8n publishes twelve advisories
checklist:
- title: Upgrade all running n8n components
  hint: Use the applicable 2.45.5, 2.46.1 or 3.0.1 release or a later patched build. Several advisories list 1.123.89, but others do not list a 1.x fix; do not treat that version as blanket coverage. Follow each advisory for older backports.
- title: Replace deprecated nodes even after upgrading
  hint: Migrate existing Function, Function Item and LangChain Code workflows to the Code node. Keep the default block enabled; N8N_DEPRECATED_NODES_BLOCK=false restores the risky behavior. As temporary mitigation, exclude n8n-nodes-base.function, n8n-nodes-base.functionItem and @n8n/n8n-nodes-langchain.code via NODES_EXCLUDE.
- title: Remove untrusted image and database paths
  hint: Restrict editing and webhook ingress. Disconnect unauthenticated Webhooks from Edit Image; if needed exclude n8n-nodes-base.editImage or remove unused GraphicsMagick url/svg/mvg/pcd/msl coder modules. Validate MongoDB updateKey and OracleDB Metadata Filter Name inputs; deactivate unsafe workflows until patched.
- title: Disable unused Browser Use and bind OAuth callbacks
  hint: Set N8N_INSTANCE_AI_BROWSER_USE_ENABLED=false or leave it unset if unused. For Enterprise dynamic credentials, use N8N_OAUTH_BROWSER_BINDING=true, restrict project editors and disable dynamic credentials if unnecessary. A browser approval naming a host does not establish the file path is safe.
- title: Review chat and trigger authentication
  hint: Until patched, deactivate embedded Chat Trigger workflows using n8n User Auth or use basic auth; restrict Asana webhook access. Limit unauthenticated /mcp-oauth/register and /mcp-oauth/authorize access and avoid unsolicited authorization links.
- title: Contain credential forwarding and investigate exposure
  hint: Disable NocoDB Download Attachments until patched. Restrict outbound destinations, enable N8N_SSRF_PROTECTION_ENABLED=true, and prevent untrusted URLs/redirects from driving credentialed requests. Rotate potentially exposed NocoDB and other workflow credentials; review execution logs. No campaign-specific IoCs are published; anomalous requests alone do not prove compromise.
sources:
- name: n8n GHSA-gx3v-3x3v-f8r5
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-gx3v-3x3v-f8r5
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-9p7v-45m2-wxgj
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-9p7v-45m2-wxgj
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-f2cw-9483-7vcp
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-f2cw-9483-7vcp
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-9qx8-fhxv-w794
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-9qx8-fhxv-w794
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-pwj5-wwm6-g83j
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-pwj5-wwm6-g83j
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-4v22-g448-h4rg
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-4v22-g448-h4rg
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-426f-xmcv-g8pg
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-426f-xmcv-g8pg
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-rc3w-8jc8-7x3w
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-rc3w-8jc8-7x3w
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-mx4r-96jx-v278
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-mx4r-96jx-v278
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-2x68-96jw-5r6c
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-2x68-96jw-5r6c
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-prmc-fg87-r4gh
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-prmc-fg87-r4gh
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
- name: n8n GHSA-jmcg-c7p5-q69g
  url: https://github.com/n8n-io/n8n/security/advisories/GHSA-jmcg-c7p5-q69g
  primary: true
  says: Affected node/feature, conditions, fixed releases and interim controls.
---

L3 reflects isolation failures and credential exposure in a mainstream automation service. The twelve advisories describe different trust boundaries; they do not establish a single unauthenticated takeover path for every instance. The default block on deprecated nodes rejects newly added or modified nodes but leaves saved workflows running. Some fixes were available on earlier maintenance releases; the disclosure day is October 28. No CVE IDs are assigned in the reviewed advisories. A universal version checker is omitted because older-line coverage differs.
