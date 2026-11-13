---
title: New N-central attack chains reach HF2 servers and Windows managed endpoints
date: '2026-11-12'
level: 4
tags:
- N-able
- N-central
- RMM
- Windows
summary: Huntback reports 21 N-central servers mining after 4EverAble2Shell exploitation, including 19 on 2026.4.1.26 HF2. The server chain requires Legacy API. Separately disclosed Windows Agent and Probe paths have their own prerequisites.
splash: Reachable N-central HF2 with Legacy API enabled, and connected Windows Agents or Probes meeting the disclosed conditions
wipe: Disable Legacy API, restrict untrusted appliance access, review server and endpoint logs, and track fixes for both paths.
inTheWild: 'yes'
inTheWildNote: Huntback reports exploitation of the server chain. Windows paths remain unconfirmed.
timeline:
- date: Nov 12, 2026
  title: Researcher posts new server and Windows endpoint chains
  body: The published tests name N-central Appliance 2026.4.1.26 HF2.
- date: Nov 12, 07:48 UTC
  title: Research repository records the server prerequisite
  body: The 4EverAble2Shell test had Legacy API enabled.
- date: Nov 12, 08:24 UTC
  title: Previdian records attempts against its sensors
  body: Its public report counts two attempts from one source IP, with no confirmed successful compromise.
- date: Nov 12, 09:16 UTC
  title: Huntback captures the full chain on decoys
  body: The payload attempts to install XMRig after reaching root.
- date: Nov 12, 12:50 UTC
  title: Huntback links 21 active miners to N-central servers
  body: It cross-checks mining pool labels and recent shares against N-central services at the corresponding addresses. Nineteen report build 2026.4.1.26.
checklist:
- title: Disable Legacy API and restrict exposure now
  hint: At the system level, open Administration → Mail and Network Settings → Network Security → Legacy APIs and verify that the deprecated APIs are disabled. Restrict appliance access from untrusted networks. Preserve required Agent and Probe access through controlled paths and verify managed devices
    still check in.
- title: Hunt on servers and downstream Windows systems
  hint: Preserve proxy, appliance, task and endpoint logs. Hunt 157.20.241[.]16 (TCP 8080 and 19202–19418), 139.99.69[.]109:10128 and 79.76.51[.]56:39100. Correlate /dms/services/ServerUI requests, unexpected processes and Windows Agent or Probe tasks. Huntback lists 12 indicator groups and host artifacts
    at the end of its report, including /tmp/.xvd, /var/tmp/.xvd, xvd.service and the jline.internal.TerminalLineSettings SOAP class. A match alone does not establish compromise.
- title: Track separate fixes for the appliance and Windows chains
  hint: Keep the earlier HF2 security update in place and check N-able’s official notices for remediation of these new paths. Confirm guidance for your hosted or on-premises deployment and the Agent and Probe builds before relaxing network controls. If compromise is found, isolate affected appliances
    and managed systems, revoke exposed credentials and restore from verified clean systems.
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
  says: Records the initial repository commits and the Legacy API clarification.
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
- name: Huntback exploitation report
  url: https://huntback.io/blog/ncentral-4everable2shell-miners-on-live-servers
  primary: true
  says: Correlates a full chain captured on decoys and mining-pool telemetry with 21 live N-central servers and publishes indicators.
- name: Apache Software Foundation Axis advisory
  url: https://lists.apache.org/thread/8slf0j9gz35z56t0glt5h0ncwlbn4bdz
  primary: true
  says: Documents class instantiation while processing an inbound SOAP fault in Apache Axis 1.x. The Apache notice is also available at mail-archive.com.
- name: Apache Axis mailing-list notice (readable archive)
  url: https://www.mail-archive.com/java-user@axis.apache.org/msg05810.html
  primary: true
  says: Preserves the original Apache advisory and links its patch commit.
updated: 2026-11-13
cves:
- id: CVE-2026-90436
  name: Apache Axis SOAP class instantiation
  description: A reachable Axis 1.x SOAP path can instantiate classes for an unauthenticated caller. In N-central the reported server chain needs Legacy API and a separate weakness to reach root.
---

The researcher behind [the earlier Able2Shell disclosure](/incidents/ncentral-able2shell/) published additional chains tested on N-central Appliance 2026.4.1.26 HF2. In the server test, the attacker could reach a SOAP endpoint while Legacy API was enabled. The chain ran commands as the appliance service account and then used privileged helpers to reach root.

The separate Agent2Shell report documents Windows paths. The Reactive path needs the appliance ID and an online Agent with Reactive enabled. The researcher demonstrated command execution as SYSTEM. The Probe path also uses device and task data, an online Probe and an existing task controlled as an output carrier. Disabling Legacy API addresses the stated prerequisite for the server chain. Confirm separate guidance for the Windows paths before treating managed endpoints as protected.

Previdian recorded two attempts against sensors. Huntback later captured the full chain against its decoys, ending in an attempt to install XMRig. It matched the IP addresses encoded in the names of 21 recently active miners to live N-central production servers. Nineteen reported build 2026.4.1.26. This is Huntback’s assessment from mining-pool telemetry and server responses. It supports L4 for in-the-wild exploitation of the server chain. The observations establish neither a count of affected organizations or downstream devices nor exploitation of the Windows chain.

The server chain uses Apache Axis CVE-2026-90436 to execute commands as the N-central service account, then abuses a privileged helper to reach root. Apache says Axis 1.x has reached end of life. The full affected-version range for N-central and fixed builds for these new paths remain unverified. Keep the earlier HF2 update in place and apply the network and configuration controls. Evidence of root access warrants treating the appliance as fully compromised, investigating managed endpoints for unauthorized activity and restoring from trusted systems.
