---
title: Cacti guest access enables an unpatched command-execution chain
level: 3
date: 2026-11-26
tags: [Cacti, SQL-injection, RCE]
summary: A public four-request exploit turns anonymous guest access in Cacti 1.2.31 into command execution. Previdian reports SQL injection attempts against honeypots, without confirmed successful RCE. Disable guest access and restrict the interface while a vendor fix remains unconfirmed.
splash: Cacti 1.2.31 with guest access enabled and a reachable web interface; other versions remain unverified.
wipe: Disable anonymous guest access, restrict the UI to trusted management networks, and monitor official security releases.
inTheWild: disputed
inTheWildNote: Honeypot SQL injection attempts observed; successful remote command execution unconfirmed.
fixed:
  - product: Cacti Core 1.2.31
    version: none
    status: Confirmed affected; official fix not identified as of November 27
timeline:
  - date: Nov 26, 2026
    title: Researcher publishes 4HTTP2SHELL
    body: ek0ms savi0r demonstrates the guest-to-command chain against Cacti 1.2.31 on an isolated host.
  - date: Nov 27, 2026
    title: Previdian reports exploitation attempts
    body: Its application honeypots received time-based SQL injection probes. The researcher does not confirm successful command execution or production compromises.
checklist:
  - title: Disable both the anonymous mapping and guest account
    hint: In Cacti Authentication Settings, remove the designated Guest User. Under Console > Configuration > Users, select that account, choose Disable, click Go and confirm Continue. Test protected functionality from a fresh unauthenticated browser session; an existing session is insufficient. Guest access is disabled by default.
  - title: Restrict access and reduce process privileges
    hint: Limit the web interface to trusted management networks or authenticated VPN users. Check the service identities of the web tier and poller; avoid unnecessary root privileges. The exploit inherits those identities and does not itself guarantee root access. These controls mitigate exposure rather than repair the SQL injection.
  - title: Preserve and inspect settings, poller data and logs
    hint: Retain web/PHP logs and a database snapshot before changing suspicious data. Inspect preview_graphs_per_page entries in settings_user for SQL rather than a page size, and poller_item.arg1 for unexpected commands. Correlate auth_profile.php?action=update_data, graph_view.php?action=preview and graph_realtime.php?action=init requests, non-numeric PHP warnings and unusual poller child processes. A match alone does not prove compromise.
  - title: Distinguish lab artifacts from attacker indicators
    hint: The original demonstration uses /tmp/cacti.jar and /tmp/cacti_guest.html on the test client and /srv/cacti-lpe/pwn.txt as a server marker; these are lab paths, not confirmed campaign indicators. No public attacker-specific list was available in these sources; absence of a match cannot establish safety.
  - title: Rotate exposed monitoring credentials if compromise is suspected
    hint: Isolate a suspect host while preserving evidence. Assess Cacti database credentials in include/config.php, stored device/SNMP credentials, poller SSH keys or service accounts, and mail relay secrets. Replace affected credentials at their issuers and update dependent monitoring configurations; investigate subsequent access to monitored devices. Disabling guests cannot undo earlier command execution.
  - title: Follow the official release and advisory channels
    hint: Check Cacti/cacti releases and security advisories for a fix explicitly covering this guest-setting chain. Version 1.2.31 remains the latest published stable release checked here and is vulnerable; do not treat upgrading to it as remediation. The full affected range, CVE and official CVSS score remain unconfirmed.
sources:
  - name: ek0ms savi0r — Four Requests to Root
    url: https://raw.githubusercontent.com/ekomsSavior/Sad-Girls-0day-Club/main/4http2shell/README.md
    says: Original November 26 report, read through its public raw README; documents the tested version, guest prerequisite, chain, lab artifacts and deployment-dependent privileges.
    primary: true
  - name: Previdian — Cacti zero-day research
    url: https://blog.previdian.com/cacti-zero-day-what-we-know-so-far/
    says: Reports independent lab verification and November 27 time-based SQL injection attempts; explicitly does not confirm successful RCE. Provides containment and credential assessment steps.
    primary: true
  - name: Cacti user management documentation
    url: https://github.com/Cacti/documentation/blob/develop/User-Management.md
    says: Anonymous access requires an enabled designated guest account, is disabled by default, and can be disabled through user management and Authentication Settings.
    primary: true
  - name: Cacti official releases
    url: https://github.com/Cacti/cacti/releases
    says: Latest stable release checked on November 27 is 1.2.31; no later fixed release was identified.
    primary: true
  - name: Cacti official security advisories
    url: https://github.com/Cacti/cacti/security/advisories
    says: No published advisory explicitly fixing this newly disclosed chain was identified during this check.
    primary: true

---

Cacti's enabled guest account lets an anonymous visitor persist a graph page-size value. A later query trusts that stored value, allowing SQL injection that changes the polling configuration. The realtime graph path then executes the altered command. The researcher calls this chain 4HTTP2SHELL; it is also publicized as 4HTTP2ROOT.

The demonstration targets Cacti Core 1.2.31 with guests enabled. Root output came from a lab deliberately running the web tier and poller as root. Typical deployments execute as the application account. Stored monitoring credentials and reachable management networks could then be exposed; this is a potential consequence, not evidence of stolen credentials or affected organizations.

Previdian's November 27 update reports time-based SQL injection attempts against its honeypots. Its report explicitly leaves successful remote command execution unconfirmed. No production victim count is verified. We retain L3 for the public exploit in a mainstream monitoring component, without treating probes as confirmed production RCE.

As checked on November 27, no official fixed release or complete affected-version range was identified. Disabling guests removes a prerequisite of this unauthenticated chain, but leaves the underlying bug. Keep network restrictions in place and follow the vendor's patch guidance when published.
