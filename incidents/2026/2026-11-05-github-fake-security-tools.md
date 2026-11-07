---
title: Fake GitHub security tools install a Windows backdoor, clipper and infostealer
level: 4
date: 2026-11-05
tags: [GitHub, Windows, supply chain]
summary: Doctor Web found malicious GitHub projects posing as security tools and blockchain game utilities. Opening or building affected Visual Studio projects or running malicious scripts can launch a Windows malware chain. The researchers report more than 2,000 infected PCs across the campaign.
splash: Windows users and build environments that open, build or run code from the malicious GitHub projects.
wipe: Isolate suspected hosts, preserve evidence, rebuild confirmed infections and revoke exposed credentials from a clean system.
inTheWild: 'yes'
inTheWildNote: Doctor Web reports more than 2,000 infected PCs across the campaign.
timeline:
  - date: Nov 5, 2026
    title: Doctor Web publishes the infection chain
    body: Researchers identify security and blockchain-themed lures, report more than 2,000 infected PCs and publish sample indicators.
checklist:
  - title: Stop running affected projects and isolate suspect systems
    hint: Disconnect suspect Windows hosts and build runners from networks and stop affected jobs. Preserve the clone and its commit, project and build logs, process and network telemetry, and suspected files. Review what secrets and internal systems the host could reach.
  - title: Check the repository, execution and network evidence
    hint: 'Inspect .suo files, .csproj pre-build hooks and unexpected code far beyond the visible portion of Python or Go lines. Hunt for PowerShell creating C:\Users\Public\Pictures\t.ps1 or L.ps1, or unpacking Quixo.7z under C:\ProgramData\Windows.Microsoft.Photos. Check Microsoft.exe and app.asar by hash and review Defender exclusions, unexpected injected processes and changes to the Windows hosts file. Network pivots include muckanthropic[.]com, muckduck.duckdns[.]org, muckcoding[.]com, muckdeveloper[.]com, 130.12.182.172 and 130.12.182.209. The linked indicator list gives 17 SHA-1 entries and 52 URLs, including repository and download examples. Use the addresses and URLs as log pivots. A hit alone does not prove compromise.'
  - title: Replace exposed credentials and verify transfers
    hint: From a clean system, revoke active sessions and rotate credentials or tokens available to the affected browser, transfer tools, VPN or developer environment. Check Discord and other affected accounts for abuse. Compare payment addresses with a trusted source or hardware-wallet display before signing, and inspect recent transfers for unexpected recipients.
  - title: Rebuild confirmed infections and restore trusted source
    hint: Reimage compromised systems from known-good media and restore verified backups and endpoint protections. Review build outputs and repositories the host could modify before reuse. Open untrusted code only in an isolated environment with no production credentials, and inspect build hooks before executing it.
sources:
  - name: Doctor Web investigation
    url: https://news.drweb.com/show/?i=15311&lng=en
    says: Describes malicious repositories and execution paths, the campaign-wide infection count, and the loader, clipper and stealer.
    primary: true
  - name: Doctor Web indicator list
    url: https://github.com/DoctorWebLtd/malware-iocs/blob/master/Trojan.Loader.3261/README.adoc
    says: Lists malicious repository examples, network pivots and file hashes for detection.
    primary: true
---

Doctor Web traces the first malicious repositories back roughly two years, when the lures focused on blockchain games. Later repositories targeted security professionals with scanning, testing and log-processing utilities, including a supposed Fscan output formatter. Some Visual Studio projects carried malicious build hooks or solution-user settings. Python and Go files in other repositories concealed malicious code beyond long stretches of whitespace. The reported infection paths depend on loading or executing the affected content in a Windows environment.

The PowerShell stage retrieves a loader that can impair endpoint defenses, inject code into other processes and install additional payloads. The clipper can substitute cryptocurrency addresses on the clipboard. The stealer collects data from browsers, file-transfer tools, VPN configurations and other applications, and sends collected data through a Telegram bot. The total of more than 2,000 infected PCs is Doctor Web’s campaign-wide count at the time of research. There is no separate count for the security-tool lures or disclosed total for stolen funds. The rating reflects confirmed infections and the payload capabilities. The report identifies no vulnerable GitHub or Visual Studio version to patch.
