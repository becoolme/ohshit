---
title: Jenkins fixes 15 core flaws including controller RCE and administrator account takeover
level: 3
date: '2026-10-28'
tags:
- Jenkins
- CI/CD
- RCE
ecosystems:
- jenkins
summary: Jenkins fixes 15 core flaws in weekly 2.588 and LTS 2.580.2. Several paths can execute code on the controller; others affect accounts, sessions and browser rendering. Most require permissions or agent control; one targets the initial setup window. Exploitation is unconfirmed.
splash: Weekly ≤2.587 or LTS ≤2.580.1; permissions/agent control vary; an unauthenticated race targets initial setup
wipe: Upgrade the controller to weekly 2.588 or LTS 2.580.2; restrict untrusted users and agents until patched
inTheWild: unknown
inTheWildNote: The Jenkins advisory does not report in-the-wild exploitation.
cves:
- id: CVE-2026-117612
  name: XStream type filter bypass
  description: Overall/Read plus either a non-anonymous account or permission to POST config.xml permits unfiltered resolves-to classes during deserialization, potentially enabling code execution.
- id: CVE-2026-117613
  name: Collection type confusion
  description: Crafted job XML from a caller with Item/Configure can insert unexpected collection elements and cause stored XSS; other impacts may be possible.
- id: CVE-2026-117614
  name: Agent launch approval bypass
  description: Agent/Configure permits execution in the controller JVM when legacy launch commands are migrated to the Command Agent Launcher Plugin without administrator approval.
- id: CVE-2026-117615
  name: Rename follows symbolic links
  description: Item/Create together with Item/Configure permits controller file reads when a renamed item must be copied and contains symbolic links; this can lead to code execution.
- id: CVE-2026-117616
  name: Agent configuration path traversal
  description: Overall/Read permits loading a controller config.xml as an agent; saving that agent can overwrite another config.xml and potentially execute code.
- id: CVE-2026-117617
  name: Artifact extraction race
  description: Item/Configure permits concurrent artifact archiving to race symbolic-link checks and write outside the extraction directory on the controller, potentially enabling code execution.
- id: CVE-2026-117618
  name: First administrator creation race
  description: With Jenkins’s own user database, an unauthenticated attacker can create an administrator during the brief setup-wizard interval between deletion of the initial user and creation of its replacement.
- id: CVE-2026-117619
  name: API token revocation bypass via cookies
  description: A stolen API token can obtain a persistent remember-me cookie that continues granting access after the token is revoked or expires.
- id: CVE-2026-117620
  name: Old Data Monitor account overwrite
  description: Overall/Read permits injecting an Old Data warning; administrator action on that warning can overwrite user data, including passwords when Jenkins uses its own user database.
- id: CVE-2026-117621
  name: Workspace browser agent-controlled XSS
  description: Control of an agent process permits supplying malicious file links to the controller workspace browser, causing XSS.
- id: CVE-2026-117622
  name: Agent error response XSS
  description: A controlled agent can send exceptions implementing Stapler HttpResponse that the controller renders as web responses, causing XSS.
- id: CVE-2026-117623
  name: Breadcrumb tooltip stored XSS
  description: Overall/Read permits stored XSS through unescaped tooltip text in the breadcrumb overflow menu.
- id: CVE-2026-117624
  name: Nested persistence-root injection
  description: A deserialization boundary bypass permits nested objects. Confirmed impact is new name/display-name records, not new accounts capable of logging in.
- id: CVE-2026-117625
  name: HTTP proxy configuration disclosure
  description: Overall/Read permits reading the proxy server, port, username and no-proxy host list. The advisory does not list proxy passwords as exposed.
- id: CVE-2026-117626
  name: File browser metadata traversal
  description: Overall/Read permits reading controller file names, sizes and modification times; Item/Workspace additionally exposes names of jobs sharing an agent workspace host.
fixed:
- product: Jenkins weekly
  version: '2.588'
  status: Patched
- product: Jenkins LTS
  version: 2.580.2
  status: Patched
timeline:
- date: Oct 28, 2026
  title: Core security batch disclosed and patched
  body: The Jenkins advisory and both release changelogs announce weekly 2.588 and LTS 2.580.2.
checklist:
- title: Upgrade every running controller
  hint: Inventory controller versions, including WAR packages and container image tags. Deploy weekly 2.588 or LTS 2.580.2, restart, then confirm the running version. Updating plugins alone does not replace Jenkins core.
- title: Restrict access during the upgrade
  hint: Review Overall/Read, Item/Create, Item/Configure and Agent/Configure grants; restrict untrusted agents. Keep initial setup reachable only by administrators. Requirements differ across the 15 flaws.
- title: Retain the new deserialization protections
  hint: Test representative job and agent configurations after upgrading. Do not enable hudson.util.XStream2.SUPPRESS_TYPE_PERMISSION or hudson.util.RobustReflectionConverter.skipFieldValueElementTypeCheck as security workarounds; they turn off added checks. Investigate compatibility failures against the advisory.
- title: Review suspicious configuration and account activity
  hint: Compare job and agent config.xml files, user records and controller filesystem changes with trusted backups; review available access logs for unusual configuration requests. These are behavioral checks, not published IoCs; one anomaly alone does not prove compromise.
- title: Treat stolen-token cookies as separate credentials
  hint: If an API token was exposed, do not assume revoking it also ends existing remember-me access. Contain controller access and use your incident-response process to invalidate affected persistent sessions and replace exposed credentials.
sources:
- name: Jenkins October 28 core security advisory
  url: https://www.jenkins.io/security/advisory/2026-10-28/
  says: Fifteen core CVEs, distinct access prerequisites, fixes and compatibility caveats; no exploitation claim.
  primary: true
- name: Jenkins weekly changelog
  url: https://www.jenkins.io/changelog/
  says: Weekly 2.588 released October 28, 2026 with security fixes.
  primary: true
- name: Jenkins LTS changelog
  url: https://www.jenkins.io/changelog-stable/
  says: LTS 2.580.2 released October 28, 2026 with security fixes.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117612'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117612
  says: XStream type filter bypass.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117613'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117613
  says: Collection type confusion.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117614'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117614
  says: Agent launch approval bypass.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117615'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117615
  says: Rename follows symbolic links.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117616'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117616
  says: Agent configuration path traversal.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117617'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117617
  says: Artifact extraction race.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117618'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117618
  says: First administrator creation race.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117619'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117619
  says: API token revocation bypass via cookies.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117620'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117620
  says: Old Data Monitor account overwrite.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117621'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117621
  says: Workspace browser agent-controlled XSS.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117622'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117622
  says: Agent error response XSS.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117623'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117623
  says: Breadcrumb tooltip stored XSS.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117624'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117624
  says: Nested persistence-root injection.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117625'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117625
  says: HTTP proxy configuration disclosure.
  primary: true
- name: 'Jenkins CNA record: CVE-2026-117626'
  url: https://cveawg.mitre.org/api/cve/CVE-2026-117626
  says: File browser metadata traversal.
  primary: true
---

Jenkins’s October 28 batch affects its widely deployed build controller, warranting L3. Weekly releases through 2.587 and LTS releases through 2.580.1 need the corresponding patched core. No victim count is supplied.

These are distinct attack paths, not one universal unauthenticated exploit. Most involve a readable controller plus additional permissions, control of an agent, or administrator interaction. The setup race instead requires reaching the short first-account replacement window. The individual entries above retain these distinctions.

The root-object issue has only been confirmed to create non-login user records. The file-browser issue exposes metadata, not arbitrary file contents. Neither should be described as full account takeover or unrestricted file read.

The vendor lists Content Security Policy enforcement as a mitigation for the collection, workspace-browser and breadcrumb XSS issues on weekly 2.539 / LTS 2.541.1 and newer. This does not cover the entire batch or replace the core upgrade. The advisory also documents compatibility switches that relax new checks; disabling protections is not remediation.
