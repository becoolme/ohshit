---
date: 2026-10-29
title: Fake Solana starter kit distributes a NetSupport backdoor through README install instructions
level: 3
tags:
  - Solana
  - GitHub
  - AI agents
  - NetSupport
ecosystems:
  - windows
summary: Air Security analyzed a fake GitHub starter kit whose README downloads a PowerShell payload and installs remote access on Windows. The repository dates to 2025; the October 29 disclosure highlights exposure through coding-agent searches. Confirmed victim counts are unavailable.
splash: Windows developers or coding agents that executed the install command from SolanaUpdateTools/solana-starter-kit
wipe: Isolate exposed hosts, preserve persistence artifacts, rebuild if integrity is uncertain, and replace reachable credentials from a clean device
inTheWild: unknown
inTheWildNote: Recovered malware was analyzed; real-world infections are not quantified.
cves: []
fixed: []
timeline:
  - date: Oct 29, 2026
    title: Air Security publishes its analysis of the recovered PowerShell payload
  - date: ~Nov 2025
    title: The malicious starter-kit repository is created
checklist:
  - title: Check whether the command ran
    hint: Review agent transcripts, shell history and process telemetry for SolanaUpdateTools/solana-starter-kit and developer-update[.]app/update/indicator. The delivery command is Windows PowerShell; merely viewing the README or visiting GitHub does not establish infection. Do not rerun it to test exposure.
  - title: Contain and hunt for the installed backdoor
    hint: Look for maxwintodaybtc[.]com:443, %LOCALAPPDATA%/y2inwRnI6G/client32.exe, client32.ini, indicator.ps1 and HKCU\Software\Microsoft\Windows\CurrentVersion\Run value SecureModule. The analyzed dropper SHA-256 is 41902d18fa2c285c0f4a6b39cf0f2eefbc7acbff33b6eb6fc88ba680a201d17d. Preserve logs, files and configuration before cleanup; disconnect affected hosts. A match alone is not proof, particularly for legitimate NetSupport binaries.
  - title: Recover credentials and tighten agent execution
    hint: From a clean device, revoke or rotate credentials and tokens reachable by the host; if wallet secrets were exposed, move assets to a newly generated wallet. Remove unauthorized Run-key persistence and remote-access files with incident-response support; rebuild if integrity cannot be established. Require review before agents execute downloaded scripts and validate repository provenance rather than trusting search rank or stars.
sources:
  - name: Air Security SolanaCry research
    url: https://www.air.security/blog-posts/solanacry
    primary: true
    says: Analyzes the archived payload, Windows-only execution path, persistence and C2; reports the delivery URL was offline when checked.
  - name: BleepingComputer independent payload check
    url: https://www.bleepingcomputer.com/news/security/hugging-face-malware-campaign-returns-to-hijack-gpus-for-crypto-mining/
    says: Separately recovered the archived payload and confirmed its remote-access behavior.
---

This is a malicious repository, not a compromise of the legitimate Solana project or of GitHub itself. Its README advertises application code that is absent and supplies an obfuscated download-and-execute command instead. Air’s recovered payload installs genuine NetSupport Manager components with attacker-controlled configuration and login persistence.

The researcher demonstrated a viable route from an agent selecting a search result to executing the repository’s instructions. That does not show that every coding agent follows those instructions or establish a victim count. L3 reflects the publicly documented delivery chain and its relevance to developer workflows. The original payload URL returning 404 does not establish that a previously exposed machine is clean.
