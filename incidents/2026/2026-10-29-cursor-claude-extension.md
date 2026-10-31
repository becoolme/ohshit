---
title: Cursor expands malicious Claude Code extension scope to 2.1.312 and 2.1.313
date: 2026-10-29
updated: 2026-10-31
level: 4
tags: [Cursor, Claude Code, supply chain]
summary: Cursor now identifies modified Anthropic.claude-code 2.1.312 and 2.1.313 packages in its marketplace. They collect host details and install SSH persistence. Admin-rights restrictions often prevented remote login, but affected machines still need cleanup. Cursor says the attacker server is offline.
splash: macOS and Windows users who installed modified 2.1.312 or 2.1.313 packages from Cursor’s extension marketplace
wipe: Isolate affected hosts, remove the extension and persistence, assess rebuilding, then rotate exposed credentials from a trusted system
inTheWild: yes
inTheWildNote: Cursor confirms malicious distribution, not successful remote access on every host.
cves: []
fixed: []
timeline:
  - date: Oct 29, 2026
    title: Malicious package distributed and removed
    body: Cursor gives an exposure window of about 2:27am–1:35pm PT and publishes its security notice dated October 29.
  - date: Oct 30, 11:30am PT
    title: Cursor expands affected versions and updates IoCs
checklist:
  - title: Check installed packages and hunt across endpoints
    hint: Inspect extension-installation records for Anthropic.claude-code 2.1.312 and 2.1.313 from Cursor. Cursor publishes over 20 indicators across seven sections; use its full package/hash, SSH-key, file/persistence and process tables. Network entries include 134[.]209[.]82[.]225, tunnel@134[.]209[.]82[.]225:22, hxxp://134[.]209[.]82[.]225:8099/beacon and loopback 127[.]0[.]0[.]1:8099/beacon. ifconfig[.]me and api[.]ipify[.]org are legitimate lookup services. A match alone does not prove compromise; an absent key alone does not rule out execution.
  - title: Remove persistence and rotate credentials
    hint: Preserve evidence and isolate hosts showing execution. Use Cursor’s linked remediate-macos.sh as the affected user, or remediate-windows.ps1 in administrator PowerShell, after reviewing the scripts. Verify cleanup succeeds; assess rebuilding before reuse. Rotate accessible credentials and sessions from a trusted machine. Uninstalling alone does not remove standalone persistence.
sources:
  - name: Cursor security notice and complete IoC tables
    url: https://cursor.com/blog/claude-code-extension-security-notice
    primary: true
    says: Updated October 30 to identify both affected versions and revised hashes; does not establish compromise of Anthropic’s official distribution.
  - name: Anthropic's Felix Rieseberg clarifies incident scope
    url: https://news.ycombinator.com/item?id=50304129
    primary: true
  - name: Anthropic's David Dworken clarifies release channels
    url: https://news.ycombinator.com/item?id=50305148
    primary: true
---

The modified package was not developed by Anthropic. Cursor’s notice identifies macOS arm64 and Windows x64 packages. SSH-service activation generally requires administrator rights, so remote login often failed; SSH keys, persistence and host-data reporting still require investigation. Scope is the identified distribution, not every Claude Code installation. L4 reflects a confirmed developer-tool supply-chain compromise.

Anthropic's Felix Rieseberg says its systems and employee laptops were not compromised in this incident. David Dworken says 2.1.313 was never released through Open VSX, the Microsoft VS Code Marketplace or Anthropic's official hosts; Anthropic skipped to 2.1.314 to distinguish its next release. These statements narrow distribution scope; they do not remove cleanup requirements for the malicious Cursor package.

**Scope correction:** Cursor’s October 30 update expands the earlier 2.1.313-only notice to include malicious 2.1.312 packages from its marketplace. Recheck both versions against the revised vendor hash tables; the version number alone does not make an official-channel 2.1.312 package malicious. The earlier 5,000-user upper bound is not restated in the revised notice.
