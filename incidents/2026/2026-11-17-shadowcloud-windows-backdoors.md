---
title: ShadowCloud backdoors use GitHub, Ably and SharePoint on compromised networks
level: 4
date: 2026-11-17
tags: [Windows, MeshAgent, GitHub, SharePoint]
summary: Kaspersky documented an active intrusion campaign primarily affecting government networks in Asia and Africa. Attackers used MeshAgent on compromised systems to deploy Windows backdoors that used GitHub, Ably and SharePoint for command and control.
splash: Windows systems with unauthorized MeshAgent activity or correlated ShadowCloud loader and network indicators.
wipe: Isolate suspected hosts, preserve execution and cloud evidence, and remove unauthorized remote access after scoping the intrusion.
inTheWild: yes
inTheWildNote: Kaspersky observed multiple backdoor builds and victims in government-focused intrusions.
timeline:
  - date: Nov 17, 08:00 UTC
    title: Kaspersky publishes the ShadowCloud investigation
    body: Two technical reports describe GitDoor, GraphDoor, the cloud command channels and supporting infrastructure.
checklist:
  - title: Verify remote access tools and trace how they ran
    hint: Compare MeshCentral and MeshAgent installations, configured servers and service creation times with your approved inventory. On suspect hosts, preserve process ancestry, DLL loads, network logs and the files placed alongside legitimate executables.
  - title: Hunt for the published network indicators and correlate them with host behavior
    hint: 'The two reports list 37 network indicators grouped here and additional file hashes. IPs: 27[.]102[.]66[.]162, 104[.]194[.]154[.]28, 216[.]73[.]158[.]72, 122[.]147[.]252[.]16, 103[.]106[.]230[.]33, 123[.]58[.]205[.]105, 223[.]165[.]4[.]203, 172[.]86[.]66[.]19, 103[.]214[.]68[.]20, 216[.]146[.]25[.]173, 103[.]137[.]63[.]39, 103[.]227[.]224[.]189, 104[.]194[.]152[.]173, 66[.]42[.]52[.]137, 153[.]75[.]94[.]148, 45[.]59[.]124[.]164, 104[.]194[.]153[.]161, 153[.]75[.]95[.]27, 216[.]73[.]158[.]117, 154[.]205[.]154[.]209, 43[.]134[.]62[.]111, 38[.]54[.]17[.]113, 38[.]52[.]17[.]113. Domains: buildersemp[.]sharepoint[.]com, cskautogo[.]sharepoint[.]com, twnic[.]top, ekmt[.]tw, upload.gofile[.]io. Paths under github[.]com: LatonyCharnleyaW, StevenDFournier, VenoraKlanimU, JeneLeo, AlexandaJazzmynwC, FloraineSuvitC, bvgarciajocelynxccZ, Eclemensadolph1n, aYulysseserinYtas. See both reports for hashes. On hosts, check for DLL sideloading, unexpected uploads and unexplained GUID directories under C:\ProgramData\Intel_Log. GitHub and the shared services have legitimate uses, and a match alone is not proof of compromise.'
  - title: Contain affected systems and check what the backdoors could reach
    hint: Isolate hosts with correlated evidence and retain memory, host and outbound records. Check affected Windows accounts and credentials from a clean system, scope what could have been accessed, and rotate exposed credentials after containment. Rebuild confirmed compromised hosts from known-good images and verify their remote access settings before reconnecting.
sources:
  - name: Kaspersky Securelist ShadowCloud part one
    url: https://securelist.com/operation-shadowcloud-gitdoor/122004/
    primary: true
    says: Documents MeshAgent delivery, sideloaded loaders, GitDoor and network and file indicators.
  - name: Kaspersky Securelist ShadowCloud part two
    url: https://securelist.com/operation-shadowcloud-graphdoor/122005/
    primary: true
    says: Documents GraphDoor, application authentication, cloud endpoints and plug-ins.
---

Kaspersky identified the campaign in early 2026. It found two instances of MeshAgent launched inside a Taiwanese organization. The agent connected to a configured external server and delivered a legitimate executable, a malicious DLL and an encrypted payload. The executable loaded the DLL, which unpacked the backdoor. The initial access method is unclear; the researchers found evidence consistent with a prior infection. The report does not establish a vulnerability in MeshAgent or compromise of the cloud providers.

GitDoor used GitHub repositories and Ably messaging to exchange data with the operator. GraphDoor used embedded application credentials to obtain a Microsoft Graph token and exchanged commands and results through SharePoint. Kaspersky recovered plug-ins for screen capture, keystroke collection and proxying. The observed victims were primarily government organizations across Asia and Africa. No total victim count was given.
