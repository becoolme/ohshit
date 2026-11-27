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
- date: Nov 10, 2026
  title: Arctic Wolf Labs publishes its findings
  body: The report links AntiFox-hosting infrastructure to IIS web shell activity and authenticated AWS API abuse.
- date: Nov 10, 2026
  title: The report supplies indicators and containment guidance
  body: The published table has 22 infrastructure, interface, process, file, API-sequence and user-agent entries. The report also recommends secret/session revocation, EC2 metadata hardening and S3 recovery controls.
checklist:
- title: Isolate affected IIS servers and preserve evidence
  hint: If w3wp.exe spawns unexpected shells or writes ASPX files, isolate the server. Preserve IIS and endpoint logs, the web root and memory where feasible. Review writable upload and temporary directories and restore the application from a trusted build after containing the entry point.
- title: Revoke exposed AWS credentials and sessions
  hint: Disable exposed access keys separately from revoking temporary sessions. For a normal IAM role, open IAM → Roles → role name → Revoke sessions → Revoke active sessions; this requires PutRolePolicy and attaches AWSRevokeOlderSessions. It denies sessions issued before the cutoff (including an approximately 30-second propagation margin), affects legitimate users of that role too and can disrupt work. Sessions assumed after the margin are unaffected, so contain the compromised identity/access path to stop fresh sessions as well. This procedure cannot revoke service-linked-role sessions; IAM Identity Center permission-set roles require the separate Identity Center session-revocation procedure linked by AWS. Review CloudTrail per affected IAM user/role before replacing credentials. Rotate database passwords, AWS keys, API tokens, encryption keys and application secrets exposed through web.config, settings, deployment artifacts, environment variables, backups or debug logs. Update dependent workloads, reacquire legitimate sessions and verify least-privilege replacement access.
- title: Correlate the published hunting indicators
  hint: 'Arctic Wolf’s indicator table contains 22 entries: 47[.]79[.]4[.]33 · 8[.]208[.]101[.]210 · TCP/8787 · c370d03542ed2ec696f7337940b14652e98e9bab · AntiFox — 自主渗透测试控制台; process chains w3wp.exe → cmd.exe, w3wp.exe → powershell.exe, w3wp.exe → where.exe, cmd.exe → whoami.exe, cmd.exe → icacls.exe; file patterns *.aspx, \pwn*.aspx, \cfg*.txt, \wc*.txt, \el*.txt; API sequences ListSecrets → GetSecretValue, GetCallerIdentity → ListBuckets, ListBuckets → ListObjects, ListObjects → HeadObject, ListObjects → GetObject; user agents Boto3/1.43.125 and Botocore/1.43.125. Also inspect PowerShell for System.Web.Configuration.WebConfigurationManager, WebConfigurationFileMap, VirtualDirectoryMapping, ConnectionStrings.ConnectionStrings, AppSettings.Settings and [IO.File]::ReadAllText; look for whoami.exe/icacls.exe/archive utilities, new ASPX files and config/log copies disguised as .txt or images in writable upload/temporary/image-conversion directories. Correlate EDR and IIS timestamps with successful GetSecretValue and S3 calls embedded in bursts of denials, multiple identities from one source and unfamiliar hosting ASNs. Cloud addresses can be shared/reassigned and the tool has legitimate uses: a match alone does not establish compromise. The complete source remains linked.'
- title: Verify S3 changes and improve logging
  hint: For buckets with S3 data events enabled, compare GetObject, CopyObject and DeleteObject with expected workload behavior. Check object versions and restore affected objects from verified copies if required. Enable CloudTrail management events and relevant S3 data events, and use GuardDuty to monitor anomalous identity activity. Enable S3 versioning and, where appropriate, Object Lock for critical objects. Where EC2 roles are needed, enforce IMDSv2 with a restrictive metadata-response hop limit and limit application identities to required resources; prioritize testing and patching internet-facing upload/conversion applications. These controls do not repair the unidentified initial IIS vulnerability or remove an existing web shell.
sources:
- name: Arctic Wolf Labs original report
  url: https://raw.githubusercontent.com/rtkwlf/wolf-tools/c18da9b1ad3186f9255c45e6c0b3560e897ac1df/pack_alerts/202611-antifox-alibaba-hosted-platforms-facilitate-web-cloud-intrusions/README.md
  says: Documents observed IIS and AWS activity, scope limits, indicators and containment steps.
  primary: true
- name: AWS IAM role session revocation
  url: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html
  says: Official role-session revocation steps, cutoff/propagation behavior, impact on legitimate sessions, service-linked-role/Identity Center limitations and temporary-versus-long-term credential scope.
  primary: true
- name: Arctic Wolf Labs current report
  url: https://raw.githubusercontent.com/rtkwlf/wolf-tools/main/pack_alerts/202611-antifox-alibaba-hosted-platforms-facilitate-web-cloud-intrusions/README.md
  primary: true
  says: Current full original matches the pinned November10 report; supplies all 22 table entries plus additional behavioral hunting and containment guidance.
updated: '2026-11-27'
---

Arctic Wolf observed an IIS worker write an ASPX web shell and run commands that extracted application settings and database connection strings. The initial IIS vulnerability is unknown. In other activity the attacker started with a valid AWS credential whose origin was unknown. The cloud actions occurred inside customer environments using existing AWS identities. The researchers did not identify a victim count or attribute every action to an AI agent.


**Hunting and revocation correction:** The earlier checklist linked the full indicator table but omitted several file patterns, process chains and API sequences. They are now included above, with the report’s additional behavioral checks. The pinned and current researcher reports still describe customer-environment access with valid credentials, not an AWS platform compromise. No new victim count, CVE or remediation release is established. The original report gives November10 without a publication hour; the earlier precise timeline time has been removed.

AWS role-session revocation is a time-based deny policy, not a replacement for disabling exposed long-term keys or containing the path that issues new sessions. Review its effect on legitimate workloads and follow the separate procedure for Identity Center-managed roles; service-linked roles are excluded from this procedure.
