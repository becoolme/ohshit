---
date: '2026-11-06'
title: Apache Axis 1.x can load attacker-selected classes before authentication
level: 3
tags:
- Apache Axis
- SOAP
- Java
ecosystems:
- maven
summary: Apache Axis 1.x through 1.4 processes attacker-controlled class names in SOAP faults before service authentication. Code execution requires a suitable class on the application classpath. Apache recommends migration or a build containing its source patch.
splash: Applications running reachable Apache Axis 1.x SOAP endpoints through 1.4. Code execution requires a suitable class on the classpath.
wipe: Restrict access to Axis 1.x, then migrate to a supported SOAP engine or deploy a tested build containing the Apache patch.
inTheWild: unknown
inTheWildNote: Apache disclosed the flaw and source patch. No in-the-wild exploitation is established.
cves:
- id: CVE-2026-90436
  name: Unauthenticated SOAP fault class loading
  description: An inbound SOAP fault can load a named class and invoke a compatible constructor before Axis checks its type. Service-level authentication runs too late.
fixed:
- product: Apache Axis 1.x through 1.4
  version: none
  status: End of life. Source patch available.
timeline:
- date: Nov 6, 15:32 UTC
  title: Apache publishes the advisory
  body: The advisory covers releases through 1.4 and identifies a source patch for the unsupported branch.
checklist:
- title: Find Axis 1.x and restrict the SOAP endpoint
  hint: Inspect deployed WARs and dependency inventories for axis:axis or org.apache.axis:axis, including bundled copies. Block access from untrusted networks at the gateway or firewall while migrating. Service-level authentication handlers cannot stop parsing that occurs before they run.
- title: Migrate or deploy the Apache source fix
  hint: Plan a move to a supported SOAP engine such as Axis2/Java. If migration needs time, build from reviewed source containing 41f3b4e8d04e310ca81f86b92630ab2c11d608bd or port that patch to the deployed fork. Test custom fault handling and verify the running artifact includes the change. Apache plans no fixed Axis 1.x release.
- title: Review previously reachable deployments
  hint: Preserve gateway and application logs. Look for unusual inbound SOAP faults carrying exceptionName and unexpected JVM child processes, file changes or outbound requests. Correlate with normal traffic and classpath contents. These are investigation leads, and a match alone does not establish compromise.
sources:
- name: Apache advisory on oss-security
  url: https://www.openwall.com/lists/oss-security/2026/11/06/12
  primary: true
  says: Describes pre-authentication fault parsing, the classpath prerequisite and migration or source-patch options.
- name: Apache CNA record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-90436
  primary: true
  says: Identifies both Maven coordinates, versions through 1.4 and the affected source range.
- name: Apache source patch
  url: https://github.com/apache/axis-axis1-java/commit/41f3b4e8d04e310ca81f86b92630ab2c11d608bd
  primary: true
  says: Prevents class initialization during lookup and restricts construction to AxisFault subtypes.
---

Axis resolves the target service by parsing the request before running that service's handlers. A SOAP fault can reach this path without login and direct Axis to load a class. A static initializer can run on load, and a compatible constructor can be invoked with fault data. Code execution depends on what the application has on its classpath.

Apache lists released Axis 1.x versions through 1.4 and source builds from `aac718c6035435d96b39d6aebb9c078a13af7cc8` before `41f3b4e8d04e310ca81f86b92630ab2c11d608bd`. The latter is a source commit. Include shaded or vendored copies in the inventory.
