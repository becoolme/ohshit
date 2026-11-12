---
title: ScreenConnect disables five extensions after attacks on partner environments
summary: ConnectWise is investigating unauthorized partner access and rogue remote-access software. It disabled five third-party extensions in about 400 environments as a precaution and published indicators for partners to investigate. Initial access and scope remain open.
splash: ScreenConnect partners with the five named extensions, including on-premises installs. Investigate potentially affected technician devices.
wipe: Disable the five extensions, investigate through separate tooling and revoke sessions from a trusted device.
inTheWildNote: ConnectWise reports unauthorized partner access and rogue remote-access deployments.
level: 4
date: '2026-11-11'
updated: 2026-11-12
tags:
- ScreenConnect
- RMM
- supply chain
inTheWild: 'yes'
timeline:
- date: Nov 11, 22:45 UTC
  title: ConnectWise publishes precautionary guidance
  body: The vendor lists five extensions and steps for hosted and on-premises partners.
- date: Nov 12, 02:45 UTC
  title: ConnectWise publishes the first indicator set
  body: The vendor describes a passphrase-protected remote-command API in the extension family and publishes network, file, persistence and ScreenConnect indicators.
checklist:
- title: Verify and disable the five extensions
  hint: Check Labtech Plus, RMM Plus, RMM+, RMM Plus Password Link and RMM+ Password Link. Preserve their installation and activity records. On-premises partners must act on their own installs. Keep the extensions disabled pending further guidance.
- title: Use separate tooling and secure administrative access
  hint: Avoid opening interactive ScreenConnect sessions to suspected devices. Use an independent response tool and a trusted device to revoke active ScreenConnect and identity-provider sessions, reset relevant passwords and enforce MFA.
- title: Preserve evidence and contain affected devices
  hint: Retain authentication, extension-installation, admin, Run Command and Toolbox logs. Investigate unexpected users, permission changes, deployments and commands. Isolate suspected endpoints and technician workstations, preserve evidence before removing software, and verify remediation before reconnecting.
- title: Verify maintenance across the remote-access stack
  hint: Check the current vendor guidance for servers, technician clients and endpoint agents. Run compromise triage and remediation independently of the software update.
- title: Hunt the vendor indicators
  hint: Correlate the 25 entries below with network, process, scheduled-task, registry Run and ScreenConnect logs. Check for TrapWatch running as SYSTEM, reportedly every 10 seconds, then review client fingerprints and API configuration. A filename, account name or legitimate utility alone does not establish compromise.
sources:
- name: ConnectWise November 11 ScreenConnect advisory
  says: Lists the five disabled extensions, approximately 400 environments with one or more installed, suspected behavior and partner actions.
  url: https://www.connectwise.com/company/trust/advisories#screenconnect-original-advisory-2026-11-11
  primary: true
- name: ConnectWise November 12 investigation update
  url: https://www.connectwise.com/company/trust/advisories#screenconnect-investigation-update
  says: Details the remote-command API, evidence limitations, partner actions and indicators in the November 12 02:45 UTC update.
  primary: true
---

ConnectWise says the extensions may be associated with the campaign. The roughly 400 environments had one or more of them installed. The vendor has not established the number of compromised environments, the initial access method or a CVE. It is investigating whether attackers used extensions to deploy additional remote access and whether interactive connections exposed technician workstations. Treat extension disabling as containment and check separately for persistence. This is distinct from the [Cloud Backup incident](/incidents/connectwise-cloud-backup/).

**November 12 update.** The RMM+ family provides a remote-command API protected by a passphrase set during partner setup. ConnectWise asks partners to review API access and configuration, use unique passwords and remove unneeded administrative access. The report does not establish whether the API or its passphrase was used for initial access. The vendor lacks telemetry for post-access activity inside partner environments. Partners should examine their own logs and endpoints, including technician workstations that opened interactive sessions.

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
