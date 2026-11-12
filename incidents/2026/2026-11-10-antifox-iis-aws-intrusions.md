---
title: AntiFox-linked intrusions used IIS web shells and valid AWS credentials
level: 3
date: '2026-11-10'
tags:
- AntiFox
- IIS
- AWS
- credentials
summary: Arctic Wolf Labs linked AntiFox-hosting infrastructure to intrusions involving internet-facing IIS applications and AWS customer accounts. Investigators observed successful access to a production secret and, in separate activity, S3 object reads, copies and deletions.
splash: Compromised internet-facing IIS applications and AWS customer accounts accessed with valid IAM credentials or role sessions.
wipe: Isolate compromised IIS servers, revoke exposed credentials and sessions, and audit CloudTrail for successful API calls.
inTheWild: 'yes'
inTheWildNote: Arctic Wolf observed live intrusions and successful AWS API calls.
timeline:
- date: Nov 10, 16:41 UTC
  title: Arctic Wolf Labs publishes its findings
  body: The report links AntiFox-hosting infrastructure to IIS web shell activity and authenticated AWS API abuse.
checklist:
- title: Isolate affected IIS servers and preserve evidence
  hint: If w3wp.exe spawns unexpected shells or writes ASPX files, isolate the server. Preserve IIS and endpoint logs, the web root and memory where feasible. Review writable upload and temporary directories and restore the application from a trusted build after containing the entry point.
- title: Revoke exposed AWS credentials and sessions
  hint: Disable exposed access keys and revoke affected role sessions. Review CloudTrail activity for each affected IAM user and role before issuing replacement credentials. Rotate the database passwords, API tokens and other secrets exposed through application settings, backup files or logs. Update dependent workloads and verify access with least-privilege replacement credentials.
- title: Correlate the published hunting indicators
  hint: Arctic Wolf lists network, banner, process, file, API and user-agent indicators. Published infrastructure and identifiers include 47[.]79[.]4[.]33 · 8[.]208[.]101[.]210 · TCP/8787 · c370d03542ed2ec696f7337940b14652e98e9bab · AntiFox — 自主渗透测试控制台 · Boto3/1.43.125 · Botocore/1.43.125. Use the full list in the report. In EDR, look for unexpected child processes of w3wp.exe and new ASPX files in writable upload paths. In CloudTrail, find successful GetSecretValue or S3 object calls within bursts of denials and correlate timestamps with IIS activity. A match alone does not establish compromise.
- title: Verify S3 changes and improve logging
  hint: For buckets with S3 data events enabled, compare GetObject, CopyObject and DeleteObject with expected workload behavior. Check object versions and restore affected objects from verified copies if required. Enable CloudTrail management events and relevant S3 data events, and use GuardDuty to monitor anomalous identity activity.
sources:
- name: Arctic Wolf Labs original report
  url: https://raw.githubusercontent.com/rtkwlf/wolf-tools/c18da9b1ad3186f9255c45e6c0b3560e897ac1df/pack_alerts/202611-antifox-alibaba-hosted-platforms-facilitate-web-cloud-intrusions/README.md
  says: Documents observed IIS and AWS activity, scope limits, indicators and containment steps.
  primary: true
- name: AWS IAM role session revocation
  url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html
  says: Official procedure to revoke active IAM role sessions.
  primary: true
---

Arctic Wolf observed an IIS worker write an ASPX web shell and run commands that extracted application settings and database connection strings. The initial IIS vulnerability is unknown. In other activity the attacker started with a valid AWS credential whose origin was unknown. The cloud actions occurred inside customer environments using existing AWS identities. The researchers did not identify a victim count or attribute every action to an AI agent.
