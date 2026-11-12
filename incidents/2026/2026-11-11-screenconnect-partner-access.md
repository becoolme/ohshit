---
title: ScreenConnect disables five extensions after attacks on partner environments
summary: ConnectWise is investigating unauthorized partner-account access and rogue remote-access software in customer environments. It disabled five third-party extensions in about 400 partner environments as a precaution. Initial access and the full scope remain under investigation.
splash: ScreenConnect partners with the five named extensions, including on-premises installs. Investigate potentially affected technician devices.
wipe: Disable the five extensions, investigate through separate tooling and revoke sessions from a trusted device.
inTheWildNote: ConnectWise reports unauthorized partner access and rogue remote-access deployments.
level: 4
date: '2026-11-11'
tags:
- ScreenConnect
- RMM
- supply chain
inTheWild: 'yes'
timeline:
- date: Nov 11, 22:45 UTC
  title: ConnectWise publishes precautionary guidance
  body: The vendor lists five extensions and steps for hosted and on-premises partners.
checklist:
- title: Verify and disable the five extensions
  hint: Check Labtech Plus, RMM Plus, RMM+, RMM Plus Password Link and RMM+ Password Link. Preserve their installation and activity records. On-premises partners must act on their own installs. Keep the extensions disabled pending further guidance.
- title: Use separate tooling and secure administrative access
  hint: Avoid opening interactive ScreenConnect sessions to suspected devices. Use an independent response tool and a trusted device to revoke active ScreenConnect and identity-provider sessions, reset relevant passwords and enforce MFA.
- title: Preserve evidence and contain affected devices
  hint: Retain authentication, extension-installation, admin, Run Command and Toolbox logs. Investigate unexpected users, permission changes, deployments and commands. Isolate suspected endpoints and technician workstations, preserve evidence before removing software, and verify remediation before reconnecting.
- title: Verify maintenance across the remote-access stack
  hint: Check the current vendor guidance for servers, technician clients and endpoint agents. Run compromise triage and remediation independently of the software update.
sources:
- name: ConnectWise November 11 ScreenConnect advisory
  says: Lists the five disabled extensions, approximately 400 environments with one or more installed, suspected behavior and partner actions.
  url: https://www.connectwise.com/company/trust/advisories
  primary: true
---

ConnectWise says the extensions may be associated with the campaign. The roughly 400 environments had one or more of them installed. The vendor has not established the number of compromised environments, the initial access method or a CVE. It is investigating whether attackers used extensions to deploy additional remote access and whether interactive connections exposed technician workstations. Treat extension disabling as containment and check separately for persistence. This is distinct from the [Cloud Backup incident](/incidents/connectwise-cloud-backup/).
