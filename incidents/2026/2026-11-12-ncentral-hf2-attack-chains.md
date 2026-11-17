---
title: Apache Axis attacks reach N-central and Confluence Data Center
date: '2026-11-12'
level: 4
tags:
- N-able
- N-central
- RMM
- Windows
summary: Huntback reports 21 N-central servers mining after 4EverAble2Shell exploitation, including 19 on 2026.4.1.26 HF2. The server chain requires Legacy API. Separately disclosed Windows Agent and Probe paths have their own prerequisites. Rapid7 detected exploitation of the same Axis flaw in Confluence Data Center.
splash: Reachable N-central HF2 with Legacy API, affected Confluence with Remote API, and certain Windows Agents or Probes
wipe: Apply N-central HF3 and the Confluence fix, restrict appliance access and investigate previously exposed servers and endpoints.
inTheWild: 'yes'
inTheWildNote: Huntback and Rapid7 report server attacks. Windows paths remain unconfirmed.
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
- date: Nov 12, 16:00 UTC
  title: N-able restricts Intune integration and issues deployment-specific guidance
  body: The vendor applies temporary controls to hosted environments and asks on-premises customers to verify that Legacy API is disabled. Earlier Agent and Probe upgrade guidance still applies.
- date: Nov 13, 03:50 UTC
  title: N-able begins checking additional indicators with specific customers
  body: The vendor says it is working with those customers to assess and mitigate risk.
- date: Nov 13, 13:40 UTC
  title: N-able publishes indicators for Legacy API exposure
  body: The vendor provides download and callback paths for customers who have not disabled Legacy API. Assessment and remediation continue.
- date: Nov 13, 2026
  title: N-able outlines Legacy API removal and endpoint hardening for HF3
  body: The vendor plans to remove Legacy API permanently and strengthen authentication and communication for Agents, Probes and appliances.
- date: Nov 13, 2026
  title: Italy’s CSIRT reports active exploitation of the Apache Axis flaw
  body: The alert documents exploitation of CVE-2026-90436 and recommends migrating from unsupported Axis 1.x or applying Apache’s source patch. It does not identify which downstream products were observed under attack.
- date: Nov 16, 2026
  title: N-able releases HF3
  body: Server build 2026.4.1.39 permanently blocks Legacy APIs. Hosted and on-premises customers both need to update their Agents and Probes to 2026.4.1 HF3.
- date: Nov 16, 2026
  title: Rapid7 reports exploitation against Confluence in a customer environment
  body: Rapid7 detected exploitation against Confluence on November 13 and published four associated IP addresses.
checklist:
- title: Disable Legacy API and restrict exposure now
  hint: At the system level, open Administration → Mail and Network Settings → Network Security → Legacy APIs and verify that the deprecated APIs are disabled. Restrict appliance access from untrusted networks. Preserve required Agent and Probe access through controlled paths and verify managed devices
    still check in.
- title: Hunt on servers and downstream Windows systems
  hint: Preserve proxy, appliance, task and endpoint logs. Hunt 157.20.241[.]16 (TCP 8080 and 19202–19418), 139.99.69[.]109:10128 and 79.76.51[.]56:39100. Correlate /dms/services/ServerUI requests, unexpected processes and Windows Agent or Probe tasks. Huntback lists 12 indicator groups and host artifacts
    at the end of its report, including /tmp/.xvd, /var/tmp/.xvd, xvd.service and the jline.internal.TerminalLineSettings SOAP class. A match alone does not establish compromise.
- title: Track separate fixes for the appliance and Windows chains
  hint: Upgrade on-premises servers to 2026.4.1.39. N-able upgrades hosted servers. All customers must upgrade Agents and Probes to 2026.4.1 HF3. Once they reconnect, review Inactive Assets for unexpected agents. Use the incident response steps below for confirmed compromise and downstream exposure.
- title: Check temporary protections and Intune status for your deployment
  hint: Hosted customers should update Agents and Probes per N-able guidance. The vendor applied temporary server-side protections. For HF3 rollout, verify Legacy API access has been removed from dependent integrations. N-able disabled the hosted Intune integration and attempted to deactivate it for on-premises customers using it. N-able says support will contact customers where it could not deactivate the integration. Check restoration guidance with support.
- title: Hunt using the vendor’s Legacy API indicators
  hint: 'Review outbound traffic to 157.20.241[.]16 (TCP 8080 and 19202–19418), 139.99.69[.]109:10128 and 79.76.51[.]56:39100. On 157.20.241[.]16:8080, look for /jup.sh, /xvgz, /xmrig.tgz, /ob/cronhit?h=jup_start_<rig>&persist=<method> and /ob/fcheck. Correlate matches with past configuration and host activity. A match alone does not establish compromise.'
- title: Inventory other Axis 1.x deployments and apply product-specific fixes
  hint: For standalone deployments, migrate to a supported SOAP engine or use a build with Apache’s source patch. Upgrade Confluence Data Center 9.2 to 9.2.28 or move to a supported 10.x or later release. If you cannot upgrade yet, test dependent scripts, automations and add-ons in a non-production environment. As an administrator, open General Configuration → Further Configuration (/admin/viewspacesconfig.action), select Edit, clear Remote API (XML-RPC & SOAP), and save. The change takes effect immediately without a restart. Verify that /plugins/servlet/soap-axis1/confluenceservice-v2 returns 403 and investigate previously exposed instances for compromise.
- title: Investigate previously exposed Confluence Data Center instances
  hint: Preserve reverse proxy and Confluence access logs and correlate unexpected SOAP endpoint requests with unusual child processes from the application. Check 192.238.253[.]176, 5.133.47[.]243, 163.182.68[.]109 and 104.13.106[.]166. A match alone does not prove compromise, and no match does not rule it out.
sources:
- name: N-able HF3 release notes
  url: https://status.n-able.com/2026/11/16/n-central-2026-4-hf3-release-notes/
  says: Gives the fixed build, endpoint upgrade requirements and known limitations.
  primary: true
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
- name: N-able public incident record 202613
  url: https://uptime.n-able.com/event/202613/
  primary: true
  says: Provides deployment-specific guidance, Intune restrictions and indicators for customers who have not disabled Legacy API.
- name: N-able November 13 security update
  url: https://www.n-able.com/blog/new-security-update-on-n-central
  primary: true
  says: Publishes Legacy API indicators and the actions for hosted and on-premises deployments.
- name: N-able Vulnerability Remediation Update
  url: https://www.n-able.com/blog/n-able-vulnerability-remediation-update
  primary: true
  says: Outlines planned Legacy API removal and stronger authentication and communication for Agents, Probes and appliances in HF3.
- name: CSIRT Italia alert (public republication by CSIRT Toscana)
  url: https://csirt.regione.toscana.it/apache-axis-rilevato-sfruttamento-in-rete-della-cve-2026-90436-al02-261113-csirt-ita/
  primary: true
  says: Reports in-the-wild exploitation of the Axis flaw and gives migration or manual patch guidance for standalone deployments.
- name: Atlassian Confluence Data Center advisory
  url: https://confluence.atlassian.com/security/cve-2026-90436-remote-code-execution-in-confluence-data-center-and-server-1874560038.html
  primary: true
  says: Documents the Remote API prerequisite, fixed release and steps to verify the temporary mitigation.
- name: Rapid7 report on Confluence exploitation
  url: https://www.rapid7.com/blog/post/etr-rapid7-detected-exploitation-of-cve-2026-90436-against-atlassian-confluence-data-center-n-able-n-central-also-exploited
  primary: true
  says: Documents exploitation in a customer environment and four associated IP addresses.
updated: 2026-11-17
cves:
- id: CVE-2026-90436
  name: Apache Axis SOAP class instantiation
  description: A reachable Axis 1.x SOAP path can instantiate classes for an unauthenticated caller. In N-central the reported server chain needs Legacy API and a separate weakness to reach root.
---

The researcher behind [the earlier Able2Shell disclosure](/incidents/ncentral-able2shell/) published additional chains tested on N-central Appliance 2026.4.1.26 HF2. In the server test, the attacker could reach a SOAP endpoint while Legacy API was enabled. The chain ran commands as the appliance service account and then used privileged helpers to reach root.

The separate Agent2Shell report documents Windows paths. The Reactive path needs the appliance ID and an online Agent with Reactive enabled. The researcher demonstrated command execution as SYSTEM. The Probe path also uses device and task data, an online Probe and an existing task controlled as an output carrier. Disabling Legacy API addresses the stated prerequisite for the server chain. Confirm separate guidance for the Windows paths before treating managed endpoints as protected.

Previdian recorded two attempts against sensors. Huntback later captured the full chain against its decoys, ending in an attempt to install XMRig. It matched the IP addresses encoded in the names of 21 recently active miners to live N-central production servers. Nineteen reported build 2026.4.1.26. This is Huntback’s assessment from mining-pool telemetry and server responses. It supports L4 for in-the-wild exploitation of the server chain. The observations establish neither a count of affected organizations or downstream devices nor exploitation of the Windows chain.

The server chain uses Apache Axis CVE-2026-90436 to execute commands as the N-central service account, then abuses a privileged helper to reach root. Apache says Axis 1.x has reached end of life. The full affected-version range for N-central remains unverified. HF3 blocks the Legacy API path; the Windows paths require separate Agent and Probe updates. Upgrade to HF3 and keep the network and configuration controls in place. Evidence of root access warrants treating the appliance as fully compromised, investigating managed endpoints for unauthorized activity and restoring from trusted systems.

**Vendor response update.** N-able applied temporary protections to hosted environments and asks on-premises customers to verify that Legacy API is disabled. The November 13 download and callback indicators apply to customers who have not disabled Legacy API. Review historical exposure as well. The vendor is still assessing and remediating the incident and does not name a fixed build for the new chains in this update.

On November 13, N-able outlined plans for HF3. The vendor intends to remove Legacy API permanently and harden authentication and communication for Agents, Probes and appliances to reduce the risk of agent impersonation. N-able says the agent impersonation it describes requires an existing foothold on an endpoint. The November 16 release notes give the build and its scope.

**Other Axis deployments.** On November 13, Italy’s CSIRT reported active exploitation of CVE-2026-90436 and gave no downstream product names for its observations. Apache lists Axis 1.x through 1.4 as affected. The engine parses the SOAP fault before service-level authentication handlers run. Remote code execution requires a suitable class on the classpath. For standalone Axis 1.x, migrate to a supported SOAP engine or build with the source patch. N-central customers should follow the vendor’s guidance above. [Apache patch](https://github.com/apache/axis-axis1-java/commit/41f3b4e8d04e310ca81f86b92630ab2c11d608bd)

Atlassian lists Confluence Data Center versions 1.x through 9.x as affected before the fix when Remote API (XML-RPC & SOAP) is enabled. The Remote API setting has been off by default on new installations since 3.0. Confluence 9.2.28 fixes the issue. Confluence 10.0 removed the feature, and Atlassian Cloud is unaffected. Rapid7 reported on November 16 that it detected exploitation against Confluence Data Center in a customer environment on November 13. Its report does not establish a broader victim count or impact.

The November 16 HF3 release permanently disables the legacy APIs and lists 17 fixes, CVE-2026-129271 through CVE-2026-129287. The release notes still list remote control other than Take Control as disabled. Update all Agents and Probes even after the server upgrade because older endpoints remain susceptible to impersonation.
