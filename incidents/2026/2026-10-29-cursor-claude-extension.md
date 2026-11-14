---
title: Stolen Fireworks key led to Cursor data theft and malicious Claude Code extension builds
date: 2026-10-29
updated: 2026-11-14
level: 4
tags: [Cursor, Claude Code, supply chain]
summary: Cursor says a key exposed at Fireworks let an attacker copy historical coding-agent traces, then reach internal tools and publish tampered Claude Code 2.1.312 and 2.1.313 builds via Cursor’s extension cache. Cursor has notified affected customers and says the incident is contained.
splash: Notified Cursor users and teams, and macOS or Windows users who installed the tampered 2.1.312 or 2.1.313 builds from Cursor.
wipe: Isolate affected hosts, remove persistence, assess rebuilding and rotate host-accessible credentials and any notified keys from a trusted device.
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
  - date: Nov 1, 2026
    title: Cursor blocks the last attacker activity it observed
  - date: Nov 13, 2026
    title: Cursor publishes its investigation and reports containment
    body: The report links a Fireworks key and exposed historical traces to the downstream compromise, including the extension cache.
checklist:
  - title: Check installed packages and hunt across endpoints
    hint: Inspect extension-installation records for Anthropic.claude-code 2.1.312 and 2.1.313 from Cursor. Cursor publishes over 20 indicators across seven sections; use its full package/hash, SSH-key, file/persistence and process tables. Network entries include 134[.]209[.]82[.]225, tunnel@134[.]209[.]82[.]225:22, hxxp://134[.]209[.]82[.]225:8099/beacon and loopback 127[.]0[.]0[.]1:8099/beacon. ifconfig[.]me and api[.]ipify[.]org are legitimate lookup services. A match alone does not prove compromise; an absent key alone does not rule out execution.
  - title: Remove persistence and rotate credentials
    hint: Preserve evidence and isolate hosts showing execution. Use Cursor’s linked remediate-macos.sh as the affected user, or remediate-windows.ps1 in administrator PowerShell, after reviewing the scripts. Verify cleanup succeeds; assess rebuilding before reuse. Rotate accessible credentials and sessions from a trusted machine. Uninstalling alone does not remove standalone persistence.
  - title: Rotate the specific credentials listed in your notice
    hint: Check Cursor’s in-app notice or verify the email through a known Cursor channel. Team admins should use the affected-key list to revoke and replace keys at each issuer and review logs for use between exposure and revocation. Escalate suspected misuse to security@cursor.com.
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
  - name: Cursor November 13 investigation
    url: https://cursor.com/blog/security-incident-update
    primary: true
    says: Traces the Fireworks key, data exposure, cache injection, customer notifications and containment.
---

Cursor says it took the attacker’s server offline. The modified package was not developed by Anthropic. Cursor’s notice identifies macOS arm64 and Windows x64 packages. SSH-service activation generally requires administrator rights, so remote login often failed; SSH keys, persistence and host-data reporting still require investigation. Scope is the identified distribution, not every Claude Code installation. L4 reflects a confirmed developer-tool supply-chain compromise.

Anthropic's Felix Rieseberg says its systems and employee laptops were not compromised in this incident. David Dworken says 2.1.313 was never released through Open VSX, the Microsoft VS Code Marketplace or Anthropic's official hosts; Anthropic skipped to 2.1.314 to distinguish its next release. These statements narrow distribution scope; they do not remove cleanup requirements for the malicious Cursor package.

**Scope correction:** Cursor’s October 30 update expands the earlier 2.1.313-only notice to include malicious 2.1.312 packages from its marketplace. Recheck both versions against the revised vendor hash tables; the version number alone does not make an official-channel 2.1.312 package malicious. The October 30 revision omitted the earlier 5,000-user upper bound; the November 13 investigation restates it.

### November 13 investigation

Cursor says an access key it issued to [Fireworks](/incidents/fireworks-cloud-customer-data/) was exposed there. The attacker used it to copy data from a read-only bucket containing historical coding-agent traces, mostly from 2025, from sessions outside Privacy Mode. Cursor says the trace exposure affected fewer than **0.05% of users** and that fewer than **0.01% of customers** had API credentials exposed. These figures use different denominators.

Unredacted credentials in the traces enabled access to some Cursor SaaS tools. Cursor reports access to archived non-production source repositories, some support and email records, contact and usage data, conversation summaries and credentials sent to support. A credential obtained from Cursor’s internal data was used to put the tampered packages directly into the extension marketplace cache. The November 13 report again gives **5,000 users** as an upper bound on potential delivery of those builds during roughly **11 hours**. It is not an installation or host-compromise count.

Cursor says Privacy Mode prompts and code, live traffic, customer code repositories, the app and official updates, and release signing keys were unaffected. It revoked the Fireworks key, cut off data access, moved inference off Fireworks and rebuilt the extension marketplace. Cursor says it notified affected customers and asked third-party issuers to revoke exposed keys. Verify revocation with each issuer instead of assuming the request completed it.
