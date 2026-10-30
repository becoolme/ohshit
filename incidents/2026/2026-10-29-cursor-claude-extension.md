---
title: Cursor removes malicious Claude Code extension 2.1.313 with SSH persistence
date: 2026-10-29
level: 4
tags: [Cursor, Claude Code, supply chain]
summary: Cursor confirms a modified Anthropic.claude-code 2.1.313 package in its marketplace, potentially affecting at most 5,000 users. It collects host details and installs SSH persistence. Admin-rights restrictions often prevented remote login, but affected machines still need cleanup. Cursor says the attacker server is offline.
splash: macOS and Windows users who installed the modified 2.1.313 package from Cursor’s extension marketplace
wipe: Isolate affected hosts, remove the extension and persistence, assess rebuilding, then rotate exposed credentials from a trusted system
inTheWild: yes
inTheWildNote: Cursor confirms malicious distribution, not successful remote access on every host.
cves: []
fixed: []
timeline:
  - date: Oct 29, 2026
    title: Malicious package distributed and removed
    body: Cursor gives an exposure window of about 2:27am–1:35pm PT and publishes its security notice dated October 29.
checklist:
  - title: Check installed packages and hunt across endpoints
    hint: Inspect extension-installation records for Anthropic.claude-code 2.1.313. Cursor publishes over 20 indicators across five sections; use its full package/hash, SSH-key, file/persistence and process tables. Network entries include 134[.]209[.]82[.]225, tunnel@134[.]209[.]82[.]225:22, hxxp://134[.]209[.]82[.]225:8099/beacon and loopback 127[.]0[.]0[.]1:8099/beacon. ifconfig[.]me and api[.]ipify[.]org are legitimate lookup services. A match alone does not prove compromise; an absent key alone does not rule out execution.
  - title: Remove persistence and rotate credentials
    hint: Preserve evidence and isolate hosts showing execution. Use Cursor’s linked remediate-macos.sh as the affected user, or remediate-windows.ps1 in administrator PowerShell, after reviewing the scripts. Verify cleanup succeeds; assess rebuilding before reuse. Rotate accessible credentials and sessions from a trusted machine. Uninstalling alone does not remove standalone persistence.
sources:
  - name: Cursor security notice and complete IoC tables
    url: https://cursor.com/blog/claude-code-extension-security-notice
    primary: true
    says: Confirms the Cursor-marketplace package, affected-user upper bound and response; does not establish compromise of Anthropic’s official distribution.
---

The modified package was not developed by Anthropic. Cursor’s notice identifies macOS arm64 and Windows x64 packages. SSH-service activation generally requires administrator rights, so remote login often failed; SSH keys, persistence and host-data reporting still require investigation. Scope is the identified distribution, not every Claude Code installation. L4 reflects a confirmed developer-tool supply-chain compromise.
