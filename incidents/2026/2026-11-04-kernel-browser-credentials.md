---
title: Kernel discloses logging-provider data theft and access to three browser-session servers
level: 3
date: 2026-11-04
tags: [Kernel, Credentials, Cloud]
summary: Kernel says stolen credentials enabled logging-provider data downloads and access to four GPU servers, three running customer browser sessions. Logs contained some Kernel API keys and deployment secrets. The vendor reports 0.28% of customers affected, revoked credentials and isolated servers; it suspects ARTEX-assisted cryptomining.
splash: Notified Kernel customers with exposed logging data, deployment secrets or sessions on the three affected browser servers.
wipe: Confirm your exposure with Kernel; revoke exposed API and third-party secrets, review sessions and investigate downstream access.
inTheWild: 'yes'
inTheWildNote: Kernel confirms data downloads and server access; ARTEX involvement is its assessment.
timeline:
  - date: Oct 24, 21:18 UTC
    title: Compromised API key used to read internal-profile data
    body: The vendor's retrospective dates the first probing and access to October 24; this is not the public disclosure date.
  - date: Oct 27, 18:01 UTC
    title: Attacker reaches the logging provider
    body: Kernel reports access through a staff login and downloaded data containing a small number of Kernel API keys and app deployments' third-party secrets.
  - date: Nov 2, 19:28 UTC
    title: Affected customer escalates the issue
  - date: Nov 2, 22:20 UTC
    title: Kernel declares its first incident
    body: It revokes the identified API key at 22:30 UTC and escalates severity at 23:50 UTC. The first containment phase ends November 3 at 02:00 UTC.
  - date: Nov 3, 05:41–07:17:57 UTC
    title: Compromised hosting credential reaches four GPU servers
    body: A miner starts on a development server with no customer data; the same miner is attempted on other servers. Three affected servers ran Kernel browser sessions. Server access is not proof every session secret was stolen.
  - date: Nov 3, 07:37 UTC
    title: Hosting-provider API keys rotated
    body: Browser servers are taken offline at 07:46 UTC; the development server follows at 09:29 UTC, with a forensic clone retained. Kernel links the two incidents to the same actor at 09:00 UTC.
  - date: Nov 3, 22:50 UTC
    title: Second containment phase ends and affected customers are notified
    body: Kernel reports rotating all credentials accessible to the affected servers, auditing potential unauthorized access and sending remediation guidance.
  - date: Nov 4, 2026
    title: Kernel publishes its incident notice
    body: The vendor reports 0.28% of customers affected and assesses a financially motivated cryptomining campaign using ARTEX. It plans stronger API-key scoping, network controls, rotation and monitoring.
checklist:
  - title: Obtain your organization's exposure details
    hint: Use Kernel's established support channel or support@kernel.sh to confirm whether your organization was notified, which logging records or browser sessions were affected, and the specific remediation guidance. The 0.28% figure is a customer proportion, not an absolute victim or session count.
  - title: Revoke exposed keys and investigate their use
    hint: From a clean administrative environment, revoke and replace identified Kernel API keys and third-party secrets stored in app deployments. Review their permissions and provider audit logs from October 24 onward for unexpected reads or actions. Kernel rotated credentials accessible to its affected servers; that does not establish that every customer-managed downstream secret has been replaced.
  - title: Review affected browser sessions and downstream accounts
    hint: Ask Kernel which of your sessions ran on the affected servers. Review the corresponding accounts for unauthorized activity and revoke potentially exposed sessions or credentials according to the confirmed scope. This is a defensive precaution; the notice does not confirm theft of all session contents, cookies or passwords, and a clean activity review cannot rule it out.
  - title: Apply scoped credentials and follow the investigation
    hint: Limit API-key permissions and network access where supported, replace unnecessary long-lived keys and monitor unusual usage. Kernel lists scoping, network controls, rotation mechanisms, SIEM improvements and dynamic blocking as work in progress. No public IP, hash or other dedicated indicator list is included; security@kernel.sh is the vendor's stated route to request its technical fingerprint. Do not infer completed preventive controls or a software patch version.
sources:
  - name: Kernel original November 4 incident notice
    url: https://www.kernel.sh/blog/public-notice-of-security-incident-nov-4-2026
    primary: true
    says: Confirms compromised API/hosting credentials, logging downloads, four GPU servers, 0.28% customer impact and UTC response chronology. ARTEX and financial motivation are vendor assessments; no absolute victim count or public indicator list.
---

Kernel's November 4 notice describes two connected intrusions. A compromised Kernel API key first enabled internal-profile access, then access to a staff login at its logging provider. Downloaded logging data contained some Kernel API keys and third-party secrets from app deployments. Later, a compromised hosting-provider credential enabled access to four GPU servers, three of which ran customer browser sessions. The fourth was a development server with no customer data. The notice does not explain how the first key was obtained or establish that every browser session or stored credential was copied.

Kernel says it revoked compromised credentials, removed logging-provider access, blocked the involved IP addresses, took the servers offline, rotated credentials accessible to them and notified affected organizations. It reports an impact of **0.28% of customers**, without an absolute count. Customer-managed third-party credentials and session access still need organization-specific review; vendor containment is not proof that downstream credentials were never misused.

The company assesses a financially motivated cryptomining campaign and believes ARTEX was used to coordinate it. That is attributed vendor analysis, not independent actor attribution or proof that this is the same intrusion as the separate [WorkOS incident](/incidents/workos-internal-gtm/). L3 reflects confirmed credential exposure and infrastructure access in a browser service, with a limited reported customer proportion and unresolved detailed scope. No customer software fix or universal safe version is published.
