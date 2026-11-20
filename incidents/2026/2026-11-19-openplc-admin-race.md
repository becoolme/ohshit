---
title: OpenPLC Runtime race condition permits unauthenticated administrator creation
level: 3
date: '2026-11-19'
tags:
- OpenPLC
- ICS
- authentication bypass
summary: CISA discloses CVE-2026-126088 in OpenPLC Runtime 4.2.4 and earlier. Concurrent requests can pass an account-existence check before any user is committed, creating unauthorized administrators. Upgrade to 4.3.0 or later.
splash: Network-reachable affected OpenPLC Runtime account-creation paths; exploitation requires a successful race.
wipe: Upgrade OpenPLC Runtime to 4.3.0 or later through an assessed maintenance plan; restrict control-network access.
inTheWild: 'no'
inTheWildNote: CISA reports no known public exploitation at disclosure.
cves:
- id: CVE-2026-126088
  score: 8.1
  name: Administrator-creation race condition
  description: Concurrent requests pass an existence check before a user is committed. CISA scores this 8.1 under CVSS 3.1 and 9.2 under CVSS 4.0; high attack complexity applies.
fixed:
- product: OpenPLC Runtime 4.2.4 and earlier
  version: 4.3.0
  status: CISA-listed corrective release
timeline:
- date: Nov 19, 2026
  title: CISA publishes ICSA-26-323-01
  body: Lists the affected versions, 4.3.0 fix and absence of reported known public exploitation.
checklist:
- title: Plan and verify the runtime upgrade
  hint: Inventory the running OpenPLC Runtime version and follow the vendor upgrade procedure to 4.3.0 or later. Assess process/safety impact, back up configuration and validate the running version and control behavior in an approved maintenance window.
- title: Reduce network exposure while patching
  hint: CISA recommends keeping control systems off the public internet, isolating control networks from business networks and placing remote devices behind firewalls. Restrict management access to trusted sources; maintain any required VPN and its endpoints. Segmentation does not fix the race.
- title: Review administrator creation and investigate anomalies
  hint: As a general response check, compare existing administrators with approved records and preserve available account-change/network logs before remediation. CISA provides no attack-specific IPs or signatures. Unexpected accounts need investigation; their absence does not prove no exposure. Report suspected malicious activity through your internal response process.
sources:
- name: CISA ICSA-26-323-01 original advisory
  url: https://www.cisa.gov/news-events/ics-advisories/icsa-26-323-01
  primary: true
  says: November 19 publication; versions through 4.2.4 affected, corrective version 4.3.0, CVSS scores, network isolation and change-impact guidance.
- name: CISA CNA CVE record
  url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/126xxx/CVE-2026-126088.json
  primary: true
  says: Confirms the existence-check race and publication date; does not establish real-world victims.
---

The check and the account commit are not synchronized: competing requests can each pass the existence check before the account write completes. Reachability and execution timing matter; this is not evidence that every already configured PLC has been taken over. CISA identifies industrial deployment sectors, not a count of affected facilities. No public exploitation is reported in the advisory. L3 reflects a remotely reachable administrator-creation flaw in an industrial runtime.
