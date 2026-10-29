---
title: Langflow bulletin discloses unauthenticated RCE and auth bypass; upgrade to 1.13.0
level: 3
tags:
- Langflow
- RCE
- authentication
ecosystems:
- python
- langflow
summary: IBM discloses critical unauthenticated code execution and authentication bypass affecting Langflow OSS 1.0.0–1.12.8, alongside authenticated issues and Hono dependency flaws. Upgrade to 1.13.0 after backing up data and preparing password sign-in.
splash: Langflow OSS 1.0.0–1.12.8; critical remote paths need no login, while other issues have narrower prerequisites
wipe: Back up database, secret key and uploads; prepare existing login, then upgrade Langflow OSS to 1.13.0 or later
inTheWild: unknown
inTheWildNote: The cited vendor bulletin does not confirm real-world exploitation.
cves:
- id: CVE-2026-93680
  score: 9.8
  name: Authentication bypass
  description: Remote access without credentials can bypass authentication restrictions; IBM describes incomplete auto-login remediation.
- id: CVE-2026-110186
  score: 9.8
  name: Unauthenticated code execution
  description: Remote code execution without credentials; the bulletin describes an MCP tool-enumeration attack surface.
- id: CVE-2026-110193
  score: 8.8
  name: Agentic Assistant code execution
  description: A low-privileged authenticated user can submit or generate component code through unblocked patterns and execute OS commands.
- id: CVE-2026-110192
  score: 6.5
  name: Insufficiently protected credentials
  description: Authenticated remote access may disclose sensitive information; the bulletin also discusses operator-injected API key exposure.
- id: CVE-2026-84363
  score: 5.9
  name: Hono query and cache interpretation mismatch
  description: A literal URL fragment passed by the runtime/intermediary can hide query parameters from filters and cache keys. Fragment-stripping paths, including Cloudflare Workers, are outside this Hono exposure.
- id: CVE-2026-84364
  score: 5.3
  name: Hono dot-notation memory exhaustion
  description: Only endpoints enabling non-default dot-notation body parsing are affected; nested form fields can exhaust memory.
- id: CVE-2026-84365
  score: 6.5
  name: Hono static-generation traversal
  description: Build-time SSG can write outside its output directory when ssgParams are untrusted; ordinary request routing and fully developer-controlled parameters are outside scope.
fixed:
- product: Langflow OSS
  version: 1.13.0
  status: IBM recommended product fix
timeline:
- date: Oct 22, 2026
  title: Langflow 1.13.0 release is available
- date: Oct 28, 2026
  title: IBM initially publishes the multi-vulnerability bulletin
- date: Oct 29, 2026
  title: IBM clarifies remediation and publishes product CVE records
checklist:
- title: Back up and prepare existing sign-in before replacing the deployment
  hint: Back up the database, secret key and uploads. For auto-login installations, follow the existing-account password preparation guide before upgrading; setting LANGFLOW_SUPERUSER_PASSWORD alone does not reset an existing non-legacy password. Do not delete or reinstall to recover access.
- title: Install the product upgrade and preserve Docker data
  hint: In the application environment run pip install --upgrade "langflow==1.13.0", or pull langflowai/langflow:1.13.0 and recreate using the vendor upgrade procedure. Mount the path set in LANGFLOW_CONFIG_DIR for the key and uploads; separately keep the database external with LANGFLOW_DATABASE_URL or in that mounted directory with LANGFLOW_SAVE_DB_IN_CONFIG_DIR=true. Move any data still inside the old container before replacing it; a mounted volume alone is insufficient. Keep the existing database backend: pointing SQLite users at a new PostgreSQL database does not migrate their data. Test password sign-in and your flows afterward.
sources:
- name: IBM Langflow security bulletin
  url: https://www.ibm.com/support/pages/node/7294467
  says: Initially published October 28, updated October 29; seven listed CVEs and product upgrade to 1.13.0.
  primary: true
- name: Langflow installation and upgrade preparation
  url: https://docs.langflow.org/get-started-installation
  says: Auto-login transition and existing-account preparation; avoid data-destructive access recovery.
  primary: true
- name: Langflow Docker upgrade guide
  url: https://docs.langflow.org/deployment-docker#upgrade-the-langflow-docker-image
  says: Configuration and data-location checks required before replacing containers.
  primary: true
- name: Langflow 1.13.0 release
  url: https://github.com/langflow-ai/langflow/releases/tag/v1.13.0
  says: Release availability predates the IBM disclosure; patch date is not the incident disclosure date.
  primary: true
date: '2026-10-28'
---

IBM’s October 28 bulletin is the disclosure tracked here, with the October 29 clarification incorporated. The 1.13.0 release already existed on October 22. The bulletin combines four Langflow product CVEs with three older Hono dependency CVEs; it does not establish that every deployment exposes every dependency path. Hono’s underlying fixes are in 4.13.5, while IBM’s product remediation is Langflow 1.13.0. Upgrade the application rather than substituting an unverified dependency-only change.

The critical product vectors require no credentials; Agentic Assistant code execution and the credential-disclosure CVE require authenticated access. The bulletin’s summary also mentions API-key access without intended authorization, while the credential CVE’s vector requires low privileges; do not generalize that path to all anonymous users. No exact exploit endpoint, confirmed victim count or real-world exploitation is established by the cited bulletin. L3 reflects a mainstream AI workflow server and serious disclosed attack paths.
