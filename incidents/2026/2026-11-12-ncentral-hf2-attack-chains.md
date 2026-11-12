---
title: New N-central attack chains reach HF2 servers and Windows managed endpoints
date: '2026-11-12'
level: 3
tags:
- N-able
- N-central
- RMM
- Windows
summary: A researcher published new exploit chains tested on N-central Appliance 2026.4.1.26 HF2. The server chain needs Legacy API enabled. Separate Windows Agent and Probe paths have their own prerequisites. Sensors saw attempts against the server path.
splash: Reachable N-central HF2 with Legacy API enabled, and connected Windows Agents or Probes meeting the disclosed conditions
wipe: Disable Legacy API, restrict untrusted appliance access, review server and endpoint logs, and track fixes for both paths.
inTheWild: disputed
inTheWildNote: Previdian observed attempts against sensors. Successful compromise is unconfirmed.
timeline:
- date: Nov 12, 03:58 UTC
  title: Researcher posts new server and Windows endpoint chains
  body: The published tests name N-central Appliance 2026.4.1.26 HF2.
- date: Nov 12, 07:48 UTC
  title: Researcher clarifies the server prerequisite
  body: The 4EverAble2Shell test had Legacy API enabled.
- date: Nov 12, 08:24 UTC
  title: Previdian records attempts against its sensors
  body: Its public report counts two attempts from one source IP, with no confirmed successful compromise.
checklist:
- title: Disable Legacy API and restrict exposure now
  hint: At the system level, open Administration → Mail and Network Settings → Network Security → Legacy APIs and verify that the deprecated APIs are disabled. Restrict appliance access from untrusted networks. Preserve required Agent and Probe access through controlled paths and verify managed devices still check in.
- title: Review server and downstream Windows activity
  hint: Preserve proxy, appliance, task and endpoint logs. Correlate unusual requests to /dms/services/ServerUI, unexpected command execution by the appliance service, and unusual Windows Agent or Probe activity with task and device records. A path match alone is not proof of compromise.
- title: Track separate fixes for the appliance and Windows chains
  hint: Keep the earlier HF2 security update in place and check N-able’s official notices for remediation of these new paths. Confirm guidance for your hosted or on-premises deployment and the Agent and Probe builds before relaxing network controls. If compromise is found, isolate affected appliances and managed systems, revoke exposed credentials and restore from verified clean systems.
sources:
- name: Researcher’s 4EverAble2Shell report
  url: https://raw.githubusercontent.com/MSPNightmare/CVEs/ac2c37497f5d19639ec2f9a996a5c186a43dd8d7/0-Days/N-Central%20N-Able/4EverAble2Shell/README.md
  says: Documents the tested server build, SOAP endpoint, root chain and Legacy API prerequisite.
  primary: true
- name: Researcher’s Agent2Shell report
  url: https://raw.githubusercontent.com/MSPNightmare/CVEs/288a6b0a312ff2c8586bcd97911b97245439af2b/0-Days/N-Central%20N-Able/Agent2Shell/README.md
  says: Documents the tested build, device identifiers and distinct Windows Agent and Probe prerequisites.
  primary: true
- name: Researcher’s publication and correction history
  url: https://github.com/MSPNightmare/CVEs/commits/main/
  says: Dates the initial public commits and the Legacy API clarification.
  primary: true
- name: N-able Legacy APIs documentation
  url: https://documentation.n-able.com/N-central/Release_Notes/GA/Content/N-central_2025.4_Release_Notes.htm
  says: Locates the setting that permits re-enabling deprecated APIs.
  primary: true
- name: N-able HF2 release notes
  url: https://status.n-able.com/2026/11/10/n-central-2026-4-hf2-release-notes/
  says: Identifies HF2 as build 2026.4.1.26 and describes Agent and Probe rollout for the previous fixes.
  primary: true
- name: Previdian sensor observations
  url: https://previdian.com/VULN-2026-0009
  says: First-party sensor report records two attempts from one source IP, with no evidence of success.
  primary: true
---

The researcher behind [the earlier Able2Shell disclosure](/incidents/ncentral-able2shell/) published additional chains tested on N-central Appliance 2026.4.1.26 HF2. In the server test, the attacker could reach a SOAP endpoint while Legacy API was enabled. The chain ran commands as the appliance service account and then used privileged helpers to reach root.

The separate Agent2Shell report documents Windows paths. The Reactive path needs the appliance ID and an online Agent with Reactive enabled. The researcher demonstrated command execution as SYSTEM. The Probe path also uses device and task data, an online Probe and an existing task controlled as an output carrier. Disabling Legacy API addresses the stated prerequisite for the server chain. Confirm separate guidance for the Windows paths before treating managed endpoints as protected.

Previdian reported two attempts against its sensors from one source IP. This establishes observed attempts against the server chain. No successful customer compromise or complete affected-version matrix was established from the sources, and no fixed build was verified for these new chains. Keep HF2 for the earlier fixes and apply the configuration and network controls while tracking further vendor guidance.
