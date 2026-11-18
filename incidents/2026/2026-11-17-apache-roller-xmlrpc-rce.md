---
title: Apache expands exploited Roller XML-RPC RCE warning to older releases
date: '2026-11-17'
level: 4
tags: [Apache, RCE, XML-RPC]
ecosystems: [java]
summary: Apache confirms active exploitation of Roller's XML-RPC deserialization flaw and expands affected versions to 4.0.0–6.1.4, alongside previously disclosed 6.1.5. Upgrade to 6.1.6 or later; 6.1.7 is current. Turning XML-RPC off in the old administration UI does not close the attack path.
splash: Network-reachable Apache Roller 4.0.0–6.1.5 XML-RPC endpoints; no login or non-default XML-RPC setting is required.
wipe: Upgrade to 6.1.7 (minimum fix 6.1.6); otherwise disable extension types in web.xml or remove the XML-RPC servlet mapping, then restart.
inTheWild: 'yes'
inTheWildNote: Apache reports active exploitation; the CVE's CISA ADP enrichment still says none.
cves:
- id: CVE-2026-129448
  score: 9.8
  name: XML-RPC deserialization in Roller 4.0.0–6.1.4
  description: Vendor extension types are deserialized before authentication, allowing remote code execution; this expands the affected range of the already disclosed flaw.
- id: CVE-2026-82384
  score: 9.8
  name: Same XML-RPC flaw previously listed for Roller 6.1.5
  description: Request parsing accepts attacker-controlled serialized bytes even when the global XML-RPC feature is disabled.
fixed:
- product: Apache Roller 4.0.0–6.1.5
  version: 6.1.6
  status: Minimum fix; current recommended release is 6.1.7
timeline:
- date: Sep 5, 2026
  title: Apache merges the endpoint fix
  body: Pull request 171 disables unused extension types and gates the endpoint on the XML-RPC setting before parsing.
- date: Sep 24, 2026
  title: Roller 6.1.6 released
  body: This is the fixed release for the XML-RPC endpoint flaw.
- date: Sep 25, 20:12 UTC
  title: Apache publicly discloses the flaw for 6.1.5
  body: The original CVE-2026-82384 mailing-list notice predates its September 28 CVE-record publication.
- date: Nov 11, 2026
  title: Roller 6.1.7 released
  body: The current recommended release fixes other vulnerabilities too; it does not introduce a new minimum fix for this endpoint issue.
- date: Nov 17, 11:02 UTC
  title: Apache expands scope and confirms exploitation
  body: CVE-2026-129448 covers 4.0.0–6.1.4 and identifies the same flaw as CVE-2026-82384. Apache does not give an attack start date, attacker identity or victim count.
checklist:
- title: Upgrade the deployed application and verify its running version
  hint: Inventory Roller WARs and deployed instances. Back up configuration and data, read the 6.1.7 release notes, obtain the release from Apache's download page and verify its published signature/checksum. Replace the deployed application, restart and confirm the running version; minimum fix 6.1.6, current recommended release 6.1.7. These deployment checks do not replace incident investigation.
- title: Apply a server-side workaround if upgrading must wait
  hint: In the deployed WEB-INF/web.xml set enabledForExtensions to false, or remove the /roller-services/xmlrpc servlet mapping, then restart Roller. The latter removes XML-RPC service. Test from the network path users actually reach; blocking or disabling only an administration UI checkbox is insufficient on vulnerable versions. Keep the workaround until the upgrade is verified.
- title: Review exposure and investigate suspicious execution
  hint: Preserve available proxy, servlet-container and host logs; examine requests to /roller-services/xmlrpc alongside unexpected Java child processes, files or outbound connections. Apache's cited warning supplies no attacker IPs, domains or hashes. These are general behavioral checks, not published attack signatures; a request or anomaly alone does not prove compromise. If compromise is suspected, isolate and investigate the host and rotate exposed secrets from a clean system; patching alone does not remove persistence.
sources:
- name: Apache November 17 advisory, original oss-security archive
  url: https://www.openwall.com/lists/oss-security/2026/11/17/5
  primary: true
  says: Expands scope to 4.0.0–6.1.4, identifies the same earlier flaw, confirms active exploitation and gives the minimum fixed version and alternative workarounds.
- name: Apache September 25 original advisory
  url: https://www.openwall.com/lists/oss-security/2026/09/25/17
  primary: true
  says: Covers 6.1.5 and explains why default settings and disabling XML-RPC in the UI do not prevent pre-authentication parsing.
- name: Apache security release table
  url: https://roller.apache.org/security.html
  primary: true
  says: Lists the September 24 fixed release and November 11 current release; older release lines are not patched in place.
- name: Apache Roller downloads
  url: https://roller.apache.org/downloads/downloads.html
  primary: true
  says: Recommends 6.1.7 and provides release-note and signature/checksum verification links.
- name: Apache endpoint fix, pull request 171
  url: https://github.com/apache/roller/pull/171
  primary: true
  says: Disables vendor extension types and rejects requests before body parsing when XML-RPC is disabled; preserves ordinary calls when enabled.
- name: Apache CNA record and CISA ADP enrichment
  url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/129xxx/CVE-2026-129448.json
  primary: true
  says: Apache's description confirms exploitation; the November 17 CISA ADP SSVC enrichment instead says exploitation none. This is not a KEV listing.
---

The November 17 warning newly covers Roller 4.0.0–6.1.4 and reports active exploitation. Apache explicitly links it to the same XML-RPC vulnerability publicly disclosed for 6.1.5 on September 25. These identifiers describe one issue, not two independent attack paths or two victim totals. The original flaw and the 6.1.6 patch are not new in November.

A reachable XML-RPC endpoint can parse vendor extension types before checking credentials or whether XML-RPC is enabled. An unauthenticated attacker can therefore reach unsafe deserialization without changing the default configuration. The patched endpoint rejects disabled-service requests before parsing and refuses extension types even when XML-RPC is enabled. Updating the JVM alone is not the Roller application fix.

Apache's direct exploitation warning supports the severity rating. Its CVE record also contains a CISA ADP SSVC assessment marked as no exploitation, unlike the CNA description. The CISA KEV feed checked on November 18 contains neither identifier; absence from KEV does not negate Apache's report. The cited originals provide no campaign attribution, compromise count, start date or attacker indicators.
