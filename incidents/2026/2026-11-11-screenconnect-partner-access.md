---
title: ScreenConnect disables five extensions after attacks on partner environments
summary: ConnectWise disabled five third-party extensions in about 400 partner environments as a precaution. Huntress observed rogue ScreenConnect deployments on at least 288 endpoints across 48 organizations. Initial access remains under investigation.
splash: ScreenConnect partners and managed Windows endpoints. Review deployments with or without the five listed extensions.
wipe: Keep the extensions disabled, update technician clients to 26.6.5 or later, revoke sessions from a trusted device and investigate out of band.
inTheWildNote: Huntress observed unauthorized Run Commands and rogue clients on managed endpoints.
level: 4
date: '2026-11-11'
updated: 2026-11-12
tags:
- ScreenConnect
- RMM
- supply chain
inTheWild: 'yes'
cves:
- id: CVE-2026-127063
  score: 9.3
  name: RMM+ default API secret
  description: The third-party extension can accept unauthorized requests, including commands to managed agents, when its default secret is retained.
- id: CVE-2026-84869
  name: ScreenConnect file transfer during an active session
  description: The toolkit attempts to exploit this previously patched client issue when a technician connects to an infected endpoint.
fixed:
- product: ScreenConnect technician client
  version: 26.6.5
  status: Blocks the observed endpoint-to-technician spread technique
- product: DataComm RMM+ extension
  version: none
  status: Keep disabled
timeline:
- date: Nov 11, 2026
  title: Huntress observes malicious commands on managed endpoints
  body: Suspicious activity began around 17:47 UTC. Huntress observed 288 affected hosts in 90 minutes.
- date: Nov 11, 22:45 UTC
  title: ConnectWise publishes precautionary guidance
  body: The vendor lists five extensions and steps for hosted and on-premises partners.
- date: Nov 11, 2026
  title: Sophos publishes independent deployment telemetry
  body: Sophos identifies three source instances, two rogue destination instances and the installer and follow-on script activity.
- date: Nov 12, 02:00 UTC
  title: Huntress publishes SCKit analysis
  body: It confirms rogue clients and bulk panel commands across 48 organizations in its telemetry. The console-takeover path failed in the host logs examined.
- date: Nov 12, 02:45 UTC
  title: ConnectWise publishes the first indicator set
  body: The vendor describes a passphrase-protected remote-command API in the extension family and publishes network, file, persistence and ScreenConnect indicators.
- date: Nov 12, 18:45 UTC
  title: ConnectWise identifies extension CVE and confirms technician client protection
  body: The vendor identifies CVE-2026-127063 in RMM+ and says technician client 26.6.5 or later blocks SCKit’s attempted spread from infected endpoints. Initial access is still under investigation.
checklist:
- title: Verify and disable the five extensions
  hint: Check Labtech Plus, RMM Plus, RMM+, RMM Plus Password Link and RMM+ Password Link. Preserve their installation and activity records. On-premises partners must act on their own installs. Keep the extensions disabled pending further guidance.
- title: Use separate tooling and secure administrative access
  hint: Avoid interactive ScreenConnect sessions to suspected hosts. Use EDR live response or another trusted out-of-band tool. Investigate technician workstations that already connected. From a clean device, revoke ScreenConnect, browser and identity-provider sessions, rotate affected credentials and enforce MFA.
- title: Preserve evidence and contain affected devices
  hint: Retain authentication, extension-installation, admin, Run Command and Toolbox logs. Investigate unexpected users, permission changes, deployments and commands. Isolate suspected hosts and preserve evidence. Identify the legitimate client separately. Clear unauthorized queued commands and tools on the server. Remove the rogue service, TrapWatch task, RelayTrap directory and Run value. Check for reinfection and validate access before reconnecting.
- title: Verify maintenance across the remote-access stack
  hint: Verify version 26.6.5 or later on each technician workstation for hosted and on-premises deployments. Reinstall the technician client following vendor instructions where needed. While updating, remove unnecessary Transfer Files permissions from session-group roles. Keep endpoint agents current and investigate potential compromise separately.
- title: Hunt the published indicators
  hint: Correlate the three published indicator sets below with network, process, scheduled-task, registry Run and ScreenConnect logs. Check for TrapWatch running as SYSTEM, reportedly every 10 seconds, then review client fingerprints and API configuration. A filename, account name or legitimate utility alone does not establish compromise.
sources:
- name: ConnectWise November 11 ScreenConnect advisory
  says: Lists the five disabled extensions, approximately 400 environments with one or more installed, suspected behavior and partner actions.
  url: https://www.connectwise.com/company/trust/advisories#screenconnect-original-advisory-2026-11-11
  primary: true
- name: ConnectWise November 12 investigation update
  url: https://www.connectwise.com/company/trust/advisories#screenconnect-investigation-update
  says: Documents the 02:45 UTC indicators and the 18:45 UTC clarification on extension scope, technician clients and partner actions.
  primary: true
- name: Huntress original SCKit analysis
  url: https://www.huntress.com/blog/sckit-worm-rogue-screenconnect
  primary: true
  says: Describes observed endpoints, affected versions, unsuccessful console takeover in recovered logs, indicators and cleanup.
- name: Sophos X-Ops independent deployment telemetry
  url: https://www.sophos.com/en-us/blog/malicious-screenconnect-deployments-observed
  primary: true
  says: Documents command-source and rogue instance IDs, MSI installation and subsequent script activity.
- name: ConnectWise RMM+ CVE-2026-127063 disclosure
  url: https://raw.githubusercontent.com/ConnectWise-Advisories/Disclosures/main/CVE-2026-127063/README.md
  says: Documents the default-secret prerequisite, API exposure and disabling guidance.
  primary: true
- name: ConnectWise September 8 ScreenConnect bulletin
  url: https://www.connectwise.com/company/trust/security-bulletins/2026-09-08-screenconnect-bulletin
  says: Documents the client patch and interim file-transfer permission controls.
  primary: true
---

ConnectWise says the extensions may be associated with the campaign. The roughly 400 environments had one or more of them installed. The vendor has yet to establish the number of compromised environments or the initial access method. It is investigating whether attackers used extensions to deploy additional remote access and whether interactive connections exposed technician workstations. Treat extension disabling as containment and check separately for persistence. This is distinct from the [Cloud Backup incident](/incidents/connectwise-cloud-backup/).

**November 12, 02:45 UTC.** The RMM+ family provides a remote-command API protected by a passphrase set during partner setup. ConnectWise asks partners to review API access and configuration, use unique passwords and remove unneeded administrative access. The report does not establish whether the API or its passphrase was used for initial access. The vendor lacks telemetry for post-access activity inside partner environments. Partners should examine their own logs and endpoints, including technician workstations that opened interactive sessions.

**November 12, 18:45 UTC.** ConnectWise disclosed CVE-2026-127063 in the independently developed RMM+ extension. Its default API secret can allow unauthenticated commands to managed agents if the administrator has kept that value. The company continues to investigate whether the flaw was the initial entry point. ConnectWise verified that technician client 26.6.5 and later blocks SCKit’s attempted spread from infected hosts through CVE-2026-84869 during a live remote session. That protection applies to the propagation step. Investigate endpoints already accessed or running unauthorized software separately.

Vendor-reported investigation indicators. The filename Panel-Lateral.ps1 still needs confirmation. sqlite3.exe is a legitimate utility that was reportedly abused.

```text
185.99.255[.]28 (screen)
155.94.150[.]39 (WIN-FB5CKHMU4E1)
ns[.]mo7sen[.]dev
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=4
sc[.]payproofkit[.]com
cdn007-digitaldownloads[.]com
newnewnew[.]gotdns[.]org
soxnewwork[.]homedns[.]org
sckit-run.bat
sckit-decoder.ps1
TrapWatch.ps1
Panel-Lateral.ps1
Run-Lateral-Full.bat
runnew.cmd
ToolboxRelayUploader.exe
sqlite3.exe
C:\ProgramData\RelayTrap\
C:\ProgramData\RelayTrap\TrapWatch.ps1
%TEMP%\sckit-*
TrapWatch
RelayTrapLiteAlert
2588ef5c15954b10
ed630cc2c873b091
Addmin
rmmserver
```

Huntress observed an operator use Run Command on cloud-hosted panels to install rogue clients and SCKit on managed Windows endpoints. Huntress lists 26.6.6.9747 and 26.7.6.9783 as affected by the campaign. The 26.6.5 minimum applies to the technician client and its protection against the observed spread technique. Updating alone does not remove persistence. The toolkit is built to intercept browser session cookies and spread through interactive technician sessions. The researchers found failed console-takeover attempts in the host logs they examined, so successful self-propagation remains unconfirmed. Their 288 hosts across 48 organizations describe their own observations. ConnectWise’s roughly 400 environments are the extension-installation count.

Sophos independently observed curl.exe downloading ScreenConnect.ClientSetup.msi from 185.99.255[.]28 to C:\Windows\TEMP\sc.msi. A ScreenConnect-generated command file then launched msiexec.exe for a silent installation. Sophos also observed batch-file staging and PowerShell bypassing execution policy to fetch a second-stage script from hxxps://ns[.]mo7sen[.]dev/EadF.php?p=4. Check the three suspected abused source instance IDs d905b2b1b165d0a9, 4b8f4089ddaac6a9 and df1f7ef0cfacd0d8 separately from the rogue destination IDs 2588ef5c15954b10 and ed630cc2c873b091. Correlate with command, process and network logs. A match alone does not establish compromise.

Additional Huntress indicators, including 16 sample hashes. Per-host values vary. Correlate hits with logs and execution evidence.

```text
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=1
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=5
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=6
soxnewwork[.]homedns[.]org:81
/Bin/ScreenConnect.ClientSetup.msi?...&c=Exploited<N>
C:\Windows\TEMP\sc.msi
C:\Windows\Temp\sckit-run.bat
C:\Windows\Temp\sckit-decoder.ps1
%TEMP%\sckit-loader.ps1
%TEMP%\k<guid>.ps1
C:\ProgramData\RelayTrap\install.ps1
C:\ProgramData\RelayTrap\trapbins\<client id>\RelayTrap.exe
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\RelayTrapLiteAlert
%PUBLIC%\RELAY-TRAP-PROOF.txt
CWInstall_<8 hex>-c1\Installer.ps1
lab-trap-cleanup-embedded.ps1
Stop-LabTrap.ps1
WithUninstall.ps1
desktop-vmc0ifs
send
sc-observation-lab
94b93c649b0ae0281352da9d01761fa9195ab1e6ac7010af3b9ba1646355eb11  Panel-Lateral-free.ps1
7a9aca9fdd4dcc13fe497cabdb13ca1e5d6a529271c8aa495e5ca1c1c80271ec  Panel-Lateral.ps1
b93f10f30ee453d1e1c046fec9d141c41d7680be5cd46c3aeb3febe0f4953b4d  LabConfig.ps1
3c7a98f0fdb6235b8076319c74dc1085f7b349b6d750416dd0cadb07d7972ec4  SCKit/trapkit/RelayTrap.cs
d2ed7a7bf4f8ac9c7969e9b3a07ebd4dda0d858f372c876ac0a041611698de9a  SCKit/trapkit/TrapWatch.ps1
4a1dd3cd2ea14368afadf7e9dfdd63b104e3981ef8c85bbb6510919b810af04b  SCKit/trapkit/install.ps1
8cb5f48bbe70b5248db7f327f3d1ad6649df5c767d2a7e0711ee147fd92e06af  ToolboxRelayUploader.exe
cf50d73fa8117a758093b1344de41cd6a6ccddc645cdda1fa91a9264efe93956  SCKit/trapkit/Lite-Alert.ps1
81cc2baa35b798d6084bd078662fa29ff28df02c46c6ccdb2b43bde97d19f781  Stage0Loader.ps1
c31e6f075cd77e01839aebce32ed35659a9ee962d102aca53040bb5e297410a9  SCKit/Release-Machine.cmd
deda7c30d798a19b6699a45fbcba503cf778594df9163c61c2f96bb2d2b9fb45  SCKit/Recover-ExecutionPolicy.cmd
0bd84c776dc01f784a617e73fc77b269f847fc4a062ffd489e4692869724bf08  Lab-context.json
454c43d296b1276bde9a4f6ff1da2221cb35ccdb2fc7991bdd572e45bce12a8a  SCKit/trapkit/payload/TRAP-PROOF.bat
5dd3a6ba806ac472663e243cfc1c034c534d5d9a42ec362c3dbf0f8d950148d0  Stop-LabTrap.bat
43b7a5e56f9e6c7b74e1ce2b7b5af63f383084625fcc2d3a5985fa1059e2db95  Run-Lateral-Full.bat
50659748723e906c8b3d3c0386bd4cf692f693a3e23639398c1a14d0c31fed61  runnew.cmd
```
