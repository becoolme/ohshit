---
title: BOSSAI campaign extracts emergency-service and university data using AI-assisted attacks
level: 4
date: '2026-11-04'
tags: [BOSSAI, data breach, AI agents]
summary: Acronis reports confirmed medical, emergency-dispatch and university data access or theft in an AI-assisted campaign. Roughly ten targets had confirmed access or exfiltration across three countries; the wider eleven-country targeting does not mean every target was breached. Counts remain researcher estimates.
splash: Exposed medical/dispatch APIs, database administration panels and applications with SQL injection or weak authentication
wipe: Restrict exposed records and admin interfaces, fix authorization and injection flaws, preserve logs and scope stolen data and credentials.
inTheWild: 'yes'
inTheWildNote: Acronis reports confirmed access and data exfiltration, distinct from failed scans.
timeline:
- date: Nov 4, 2026
  title: Acronis publishes its BOSSAI investigation
  body: Recovered operator records distinguish confirmed access or exfiltration at roughly ten targets in three countries from attempts and reconnaissance. Exact incident dates and affected-person totals are not established.
checklist:
- title: Close unauthorized access to records and administration interfaces
  hint: Review internet-facing emergency/patient-record APIs, legacy application subdomains and database consoles. Require server-side authentication and record-level authorization, restrict management access to trusted networks and replace default administrative credentials. Check that unauthenticated requests cannot retrieve medical files or dispatch records; avoid downloading unrelated people's data during validation.
- title: Fix injection and exposed session secrets
  hint: Have application owners review SQL queries and use parameterized statements, patch supported application/database components, and test authorization separately. Acronis observed SQL injection, default database credentials and a frontend-embedded AES key; remove secrets from client code and replace affected keys and sessions after closing the exposure. There is no single campaign-wide fixed version or patch.
- title: Hunt the published infrastructure in preserved logs
  hint: 'Acronis lists 18 network indicators: IPs 112.121.185.218, 156.240.109.26, 49.158.237.136, 202.160.76.153, 202.160.76.154, 202.160.76.155, 202.160.76.156, 202.160.76.157, 202.160.76.174; domains vps.xs1.ccwu.cc, xss.xs1.ccwu.cc, c.xs1.ccwu.cc, attacker-collector.com, boss.jytian.cc.cd, gdp.gasjy.kdns.fr, gds.gasjy.kdns.fr, 888.bossjy.kdns.fr, ssh.gputw.ai. Compare DNS, proxy, API, authentication and database logs; preserve request/response and export records securely. The primary node also hosted services on ports 80, 443, 18080, 5001, 8000, 8443 and 3000. A match alone does not prove compromise; proxies and other infrastructure mean no match cannot rule it out. See the original IOC table for context.'
- title: Scope actual data access before reporting impact
  hint: Correlate successful API responses and database reads/exports with affected records, sessions and accounts. Separate public-directory scraping, failed attacks and attempted student-data extraction from confirmed theft. If access is confirmed, coordinate credential replacement, affected-person notification and reporting through your established incident-response team; the research supplies no universal recovery deadline.
sources:
- name: Acronis Threat Research Unit original BOSSAI investigation
  url: https://www.acronis.com/en/tru/posts/bossai-inside-the-ai-attack-mesh-that-targeted-taiwans-emergency-services/
  primary: true
  says: November 4 report based on recovered operator infrastructure and records. Confirms medical/dispatch and university data exposure or extraction, distinguishes unsuccessful activity, supplies 18 network indicators, and assesses a single Taiwan-based operator. Numerical scope and attribution are research findings, not independently confirmed victim notices.
---

Acronis describes a campaign operated through twelve configured AI agents, nine active during its investigation. The operator manually relayed results between agents; it was not an autonomous agent-to-agent network. Commercial models mainly helped build infrastructure and repeatedly refused explicit attacks, while the offensive work largely used locally run models with safety alignment removed. This is misuse of tools, not evidence that their vendors' platforms were breached.

The most serious reported exposure involved a Taipei emergency patient-care platform serving medical records from **2018 only**, including ECG readings, ambulance video and vital signs without credentials. A separate 119 dispatch API yielded incident times, response types, status and street-level locations across seven Taipei districts. These were case records, **not live ambulance GPS tracking**. A default-root database login exposed at least eighteen tables at a dispatch technology vendor; an attempted webshell against that vendor failed.

At Thai universities, Acronis reports data extraction at three institutions. One yielded a 2,563-row administrator table, while its student-data dump was only attempted; other universities had confirmed student/table extraction. These are the researcher's findings, not independently verified person counts. Its approximately 206,800 Mexican residential-phone records and separate roughly 124,000 yellow-pages records came from aggregation/scraping and must not be added as distinct breach victims.

The report estimates roughly ten targets with confirmed system access or exfiltration across three countries and about fifteen additional actively attacked targets without confirmed compromise. Broader targeting reached eleven countries, including reconnaissance and staged work; some queued targets saw no attack traffic. The tool even fabricated a critical Apache finding that was later rejected. There is no published campaign-wide CVE, victim-person total or completed recovery statement. The confirmed sensitive-data access supports the serious rating; neither every scanned organization nor every claimed vulnerability is confirmed compromised.

Acronis attributes the operation to one Taiwan-based individual through recovered configuration and infrastructure overlaps. That assessment does not establish state sponsorship, an arrest, or a connection to WorkOS/ARTEX or other AI-assisted incidents.
