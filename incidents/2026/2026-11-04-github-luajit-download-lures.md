---
title: GitHub repository lures distribute a LuaJIT loader through poisoned README downloads
level: 3
date: '2026-11-04'
tags:
- GitHub
- Malware
- Supply chain
summary: Huorong reports GitHub README download lures delivering a Windows batch/LuaJIT loader that uploads screenshots and system data, executes C2 responses and can fetch further stealers. Its sample spans 30,738 repositories and 15,584 accounts, including fakes and some hijacked accounts—not victim or infection counts.
splash: Windows users or coding agents executing ZIP/batch payloads linked by affected READMEs; browsing alone is not established as infection.
wipe: Stop suspect downloads, preserve evidence, inspect persistence and Defender exclusions, and replace confirmed exposed secrets from a clean device.
inTheWild: 'yes'
inTheWildNote: Huorong documents malicious repository distribution and some hijacked accounts.
timeline:
- date: Nov 4, 2026
  title: Huorong publishes original campaign analysis
  body: Research covers activity monitored since 2025, with February and October 2026 bulk repository changes. November 4 is the report date, not the beginning of the campaign.
checklist:
- title: Verify repository downloads before execution
  hint: Inspect actual README link destinations and commit histories; multiple labels pointing at one ZIP, one-line start launchers and repeated README-only edits are warnings. Configure coding agents to isolate untrusted code and require review before downloading/executing it; a popular project name or longstanding account is insufficient provenance.
- title: Preserve and hunt the complete published sample indicators
  hint: SHA256 2602DC0D38834493CD2C2211F1231DAE24BEC59AC251E1FB12ED24D8BE33C59F; C2 213.176.73.151:80 and 144.31.108.193; path /api/NTE3YjdjNWU1NjYzNjU2YTA1N2Y=; multipart 边界 a1u4xbodohy2cqdc2n0i336qy9tcap8w64yb424; files Launcher.cmd, luajit.exe, uix.txt, optional lua51.dll and %LOCALAPPDATA%/ODM5/ODM5.exe. Polygon contract 0x1823A9a0Ec8e0C25dD957D0841e3D41a4474bAdc with eth_call selector 0x3bc5de30 supplies fallback configuration. Public infrastructure www.microsoft.com, ip-api.com/json/, polygon.drpc.org and polygon.publicnode.com are connectivity/geolocation/RPC pivots, not attacker ownership evidence. The article appendix images contain 20 illustrative malicious ZIP URLs; use the full published images for those paths, without downloading or executing payloads. An indicator match alone is not proof of compromise; shared services, file names and the legitimate LuaJIT interpreter are not inherently malicious.
- title: Contain suspected execution and inspect persistence
  hint: Disconnect a suspected host and preserve scripts, process/network records and security logs before cleanup. The report recommends a full security scan and checking registry startup entries and scheduled tasks. Conditional configuration can add a luajit value under the current-user Run key and matching StartupApproved/Run value, create a daily task, hide uix.txt, and request elevated Defender exclusions for the system drive and .exe/.dll files. Review unauthorized exclusions and persistence with your security team; do not delete legitimate entries by name alone. If secrets were exposed, revoke/rotate them from a clean device; a clean scan does not prove no arbitrary code ran.
sources:
- name: Huorong original November 4 research and indicator/appendix images
  url: https://huorong.cn/document/tech/vir_report/2087
  primary: true
  says: Repository/account/URL counts describe observed artifacts, not victims; sample reverse engineering, two C2s, one SHA256, seven conditional configuration fields and 20 illustrative malicious ZIP URLs were read, including image-only tables.
---

The sample disguises downloads as AI tools and other projects; some repositories are fabricated or cloned, while some established accounts were hijacked according to Huorong. Running Launcher.cmd starts the renamed LuaJIT interpreter with uix.txt. The loader collects host identifiers and a screenshot, then evaluates transformed C2 responses as Lua code; later credential, chat-session or wallet theft depends on further components being delivered and run. This is not proof that every exposed repository infected a user or that GitHub’s platform infrastructure was breached.

Huorong counts over 56,000 malicious URLs by October 2026; its repository/account totals mix artifact types and cannot be added as victims or assumed to be all compromised accounts. The report does not identify a confirmed victim total, aggregate wallet loss or universal cleanup patch. L3 reflects a documented developer-download malware campaign; a ZIP on GitHub is not itself proof of installation or downstream data theft.
