---
title: "MCP reference servers fix Git code execution and access boundary flaws"
date: 2026-11-11
level: 3
inTheWild: unknown
tags: [MCP, Git, Filesystem, Fetch]
summary: "MCP reference release v2.4.0 fixes six issues across Git, Filesystem and Fetch. An untrusted Git repository can make a read-only tool run code with server privileges. Filesystem protections still have Windows limits."
splash: "Installations of the affected MCP reference servers, particularly Git tools pointed at untrusted repositories."
wipe: "Upgrade mcp-server-git and mcp-server-fetch to 2026.11.11 and Filesystem to 2.3.0. Keep untrusted workloads isolated."
fixed:
- { product: "mcp-server-git", version: "2026.11.11" }
- { product: "mcp-server-fetch", version: "2026.11.11" }
- { product: "@modelcontextprotocol/server-filesystem", version: "2.3.0" }
cves:
- id: GHSA-6hqx-gqrx-c5r2
  name: "Git configuration can run code"
  description: "A client must direct a Git tool to a repository with attacker-controlled local configuration. Even status can execute a program with the MCP server account."
- id: GHSA-q74p-4wrc-q7w6
  name: "Git repository boundary escape"
  description: "A crafted Git directory, alternate object store or linked worktree can redirect access outside the configured repository. Windows directory junctions remain a limitation."
- id: GHSA-p9cv-8g75-4xcg
  name: "Filesystem read race"
  description: "A local process that can swap a checked parent directory for a symlink can race a read and expose a file outside the allowed roots."
- id: GHSA-7m4x-rv66-mxhh
  name: "Filesystem move race"
  description: "A local process that can swap the checked source directory during a same-device move can redirect which file gets moved into the allowed tree."
- id: GHSA-3rxj-6jhw-qfv7
  name: "Fetch private-address guard gap"
  description: "A deprecated IPv6 site-local address can pass the public-address check. Impact depends on routing from the server."
- id: GHSA-f9hh-cmx9-2f23
  name: "Fetch crawler rule bypass"
  description: "An alternate spelling of a path can evade robots.txt checks when the origin normalizes that path before serving it."
timeline:
- date: Nov 11, 2026
  title: "Maintainers disclose six advisories and ship fixes"
checklist:
- title: "Upgrade the actual server packages"
  hint: "Check the command, pin and environment each MCP client launches. Set mcp-server-git and mcp-server-fetch to 2026.11.11 or later. Explicitly install @modelcontextprotocol/server-filesystem@2.3.0 if moving from a date version, then restart the MCP processes and verify the installed versions. Git must be 2.31 or newer."
- title: "Isolate untrusted Git and filesystem inputs"
  hint: "Until upgraded, point the Git server only at repositories whose .git directory you trust. Run as a dedicated low-privilege account with only required files mounted. Disable Git or filesystem tools for untrusted users if you cannot isolate them. On Windows do not rely on --repository against clients that can create junctions or on allowed directories against an untrusted process that can race filesystem changes."
- title: "Limit Fetch network access"
  hint: "Restrict the worker’s outbound network access to destinations it needs. Check proxy and DNS settings before relying on application-layer filtering."
sources:
- name: "MCP reference server v2.4.0 release"
  url: https://github.com/modelcontextprotocol/servers/releases/tag/v2.4.0
  primary: true
- name: "GHSA-6hqx-gqrx-c5r2"
  url: https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-6hqx-gqrx-c5r2
  primary: true
- name: "GHSA-q74p-4wrc-q7w6"
  url: https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-q74p-4wrc-q7w6
  primary: true
- name: "GHSA-p9cv-8g75-4xcg"
  url: https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-p9cv-8g75-4xcg
  primary: true
- name: "GHSA-7m4x-rv66-mxhh"
  url: https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-7m4x-rv66-mxhh
  primary: true
- name: "GHSA-3rxj-6jhw-qfv7"
  url: https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-3rxj-6jhw-qfv7
  primary: true
- name: "GHSA-f9hh-cmx9-2f23"
  url: https://github.com/modelcontextprotocol/servers/security/advisories/GHSA-f9hh-cmx9-2f23
  primary: true
---

The Git configuration issue lets an untrusted repository trigger program execution when an older server runs a status or diff tool inside it. The update overrides program-launching settings and refuses Git versions older than 2.31. A separate Git confinement fix covers alternate object stores and linked worktrees. Windows directory junctions remain a path around that confinement.

Both Filesystem issues require a local directory swap and a successful race. The release identifies Filesystem versions before 2.3.0, including date releases 2025.1.14 through 2026.8.31, as affected. The maintainers say the Windows read race was narrowed and remains possible. The Fetch fixes cover address classification and crawler policy. Bypassing robots.txt does not bypass origin authentication. The advisories document reproduction details without reporting confirmed attacks. The reproducible Git code execution path warrants L3.
