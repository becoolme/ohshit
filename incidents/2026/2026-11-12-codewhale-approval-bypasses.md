---
title: CodeWhale fixes two approval bypasses in shell commands and scheduled jobs
date: 2026-11-12
level: 3
tags: [CodeWhale, coding agents, prompt injection]
summary: CodeWhale 0.9.0 fixes two flaws. Crafted tool calls can skip shell approval in the default interactive Agent profile. An approved recurring job that omits auto_approve can run later tool calls without prompts.
splash: CodeWhale through 0.8.67 when the agent reads attacker-controlled content or a user approves an attacker-influenced recurring job
wipe: Upgrade to 0.9.0 or later and inspect existing recurring jobs and shell activity.
inTheWild: disputed
inTheWildNote: Maintainer advisories include PoCs. In-the-wild exploitation is unconfirmed.
cves:
  - id: CVE-2026-83816
    score: 8.1
    name: Interactive shell approval bypass
    description: The read-only classifier overlooks flags that let fd, rg and git grep launch programs.
  - id: CVE-2026-83817
    score: 7.5
    name: Recurring job auto-approval
    description: Omitting auto_approve when creating an automation can authorize later mutating tool calls without prompts.
fixed:
  - product: CodeWhale
    version: 0.9.0
timeline:
  - date: Jul 16, 2026
    title: CodeWhale releases 0.9.0
    body: The release tag contains the fix commit the maintainers later identify in both advisories.
  - date: Nov 12, 2026
    title: Maintainers publish two approval bypass advisories
    body: Both advisories list releases through 0.8.67 as affected and 0.9.0 as fixed.
checklist:
  - title: Upgrade all CodeWhale installations
    hint: Check the installed version for the npm codewhale package, the Rust codewhale-tui package and any standalone binaries. Upgrade each to 0.9.0 or newer before using the agent on untrusted inputs.
  - title: Review and pause unexpected scheduled jobs
    hint: Check job prompts, schedules, auto_approve and allow_shell. Disable unknown jobs and turn off unnecessary auto-approval and shell access.
  - title: Investigate unexpected local execution
    hint: Review tool and process history for search commands launching child programs or scheduled jobs writing outside their intended scope. If you find unauthorized activity, preserve evidence and revoke credentials the affected process could access.
sources:
  - name: CodeWhale interactive shell advisory
    url: https://github.com/codewhale-hq/Codewhale/security/advisories/GHSA-3mgh-93r5-r7jf
    primary: true
    says: Gives the affected packages, fixed version and indirect prompt injection reproduction.
  - name: CodeWhale automation advisory
    url: https://github.com/codewhale-hq/Codewhale/security/advisories/GHSA-8hp3-xxrg-v9c8
    primary: true
    says: Documents omitted auto_approve and the additional condition for recurring shell execution.
  - name: CodeWhale 0.9.0 release
    url: https://github.com/codewhale-hq/Codewhale/releases/tag/v0.9.0
    primary: true
    says: Records the patched release date.
---

In the default interactive Agent profile, attacker-controlled text in a repository, issue or fetched page can steer CodeWhale into calling its shell tool. CodeWhale treated certain search commands as read-only based on their names. The reporter demonstrated that flags accepted by those commands could launch programs with the agent process’s privileges and skip the approval prompt.

The second flaw requires an automation creation approval. When the creation call omits `auto_approve`, an affected build treats later runs as auto-approved. This can allow changes through tools that write files or modify repositories. Recurring shell execution also requires `allow_shell` to be enabled. Both advisories include proof-of-concept steps and identify 0.9.0 as the first patched version.
