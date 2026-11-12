---
title: MCP Gateway Registry flaws grant admin access and expose internal services
date: '2026-11-11'
level: 3
tags:
- AWS
- MCP
- SSRF
- authorization
summary: Two flaws in the open-source mcp-gateway-registry let a low-privileged authenticated user obtain registry admin rights and let a user with server-write permissions send internal requests. Upgrade to 1.35.0 or later and audit stored configuration.
splash: Affected mcp-gateway-registry deployments with authenticated users. The SSRF path requires server registration or update rights.
wipe: Upgrade to 1.35.0 or later, remove unauthorized grants and upstream addresses, and investigate exposed credentials.
inTheWild: unknown
inTheWildNote: The AWS bulletins do not report exploitation in the wild.
cves:
- id: CVE-2026-100307
  name: External management API lacks authorization
  description: Authenticated low-privileged callers can create a group mapping that gives their identity registry administrator access.
- id: CVE-2026-125926
  name: Server registration can send internal requests
  description: An authenticated caller with server registration or modification rights can send requests to internal destinations and may read the responses.
fixed:
- product: mcp-gateway-registry (both CVEs)
  version: 1.35.0
timeline:
- date: Nov 11, 20:30 UTC
  title: AWS discloses management API privilege escalation
  body: The advisory identifies 1.25.0 as the first fix and calls for an audit of existing grants and credentials.
- date: Nov 11, 21:00 UTC
  title: AWS discloses a separate server-side request forgery flaw
  body: The advisory identifies 1.35.0 as the first fix and calls for a review of stored upstream URLs.
checklist:
- title: Upgrade and restrict the API
  hint: Upgrade mcp-gateway-registry and affected forks to 1.35.0 or later. Until patched, restrict /api/servers/* mutation routes to trusted administrators and limit server registration and updates to trusted users. Restrict registry and auth-server egress to required destinations. On EC2 require IMDSv2 and minimize attached IAM permissions.
- title: Remove unauthorized grants
  hint: In the mcp_scopes DocumentDB collection, review group_mappings for mcp-registry-admin and other privileged scopes, and ui_permissions for mutation rights granted to all users. Remove unexpected grants. In HTTP logs review POST /api/servers/groups/import plus the create, add, remove and delete group routes and other server-mutation endpoints. Correlate with subsequent activity by the same identity.
- title: Audit stored server addresses and credentials
  hint: Compare registered servers and agents with a trusted inventory, including existing upstream URLs, and correct or remove unexpected settings. Review registration and update logs from the affected period. Rotate stored server credentials and sensitive headers at their source if unauthorized reads cannot be ruled out. If an attached cloud role may have been exposed, review its activity and replace or revoke exposed credentials or sessions as applicable.
sources:
- name: AWS bulletin 2026-179-AWS
  url: https://aws.amazon.com/security/security-bulletins/2026-179-aws/
  says: Affected versions, authorization requirements and persistent grants to audit for CVE-2026-100307.
  primary: true
- name: AWS bulletin 2026-180-AWS
  url: https://aws.amazon.com/security/security-bulletins/2026-180-aws/
  says: Affected versions, registration permissions and stored-address review for CVE-2026-125926.
  primary: true
- name: Maintainer advisory GHSA-fc39-fwh3-wv5r
  url: https://github.com/agentic-community/mcp-gateway-registry/security/advisories/GHSA-fc39-fwh3-wv5r
  says: Confirms the fixed version and explains the conditional path to cloud metadata and credentials.
  primary: true
---

AWS disclosed two issues in deployments of the open-source mcp-gateway-registry. CVE-2026-100307 (GHSA-rxf3-qgpv-wxvr) affects 1.0.9 through 1.24.7. An authenticated low-privileged caller can use the management API to map an identity-provider group to a privileged scope. The fix in 1.25.0 blocks the write path. Existing mappings remain active until reviewed and removed, and the upgrade does not invalidate any credentials already read.

CVE-2026-125926 (GHSA-fc39-fwh3-wv5r) affects 1.0.3 through 1.34.0. An authenticated user who can register or change a server can point its upstream address at services reachable from the gateway. Depending on network configuration and response handling, the path can expose internal data or cloud metadata credentials. Version 1.35.0 validates new or changed addresses and leaves existing configuration in place. Upgrade, audit historical state and confirm that management routes and outbound connections are restricted.
