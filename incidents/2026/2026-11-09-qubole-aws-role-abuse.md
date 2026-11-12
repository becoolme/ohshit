---
title: Stolen Qubole-linked AWS credentials were used to enter customer accounts
summary: Wiz and Sentra traced an attacker using IAM credentials from an AWS account associated with Qubole to assume integration roles. The actor stole S3 data and accessed secrets that could reach AWS, Entra ID and Okta. Dormant trust policies still granted access.
splash: AWS accounts with IAM roles trusting the Qubole-linked account, including unused integrations.
wipe: Remove unused trusts, investigate CloudTrail and S3 logs, revoke affected role sessions and rotate reachable secrets.
inTheWildNote: Wiz and Sentra observed unauthorized role assumption and access to customer AWS resources.
level: 4
date: '2026-11-09'
tags:
- AWS
- IAM
- supply chain
inTheWild: 'yes'
timeline:
- date: Oct 8–11, 2026
  title: Wiz observes separate customer-key activity
  body: An actor used customer-owned keys believed to have been created for Qubole. Wiz has not linked this activity to the later role assumptions.
- date: Oct 14–26, 2026
  title: Attacker assumes customer integration roles
  body: Wiz observes secret harvesting, checks of stolen credentials and S3 exfiltration.
- date: Nov 9, 2026
  title: Wiz and Sentra disclose their findings
  body: They publish role-assumption and data-access hunting guidance.
checklist:
- title: Find and restrict Qubole integration roles
  hint: Search IAM trust policies for account 805246085872, including stale integrations. Remove unused roles or the vendor principal. For active roles, coordinate with the vendor to narrow the principal, approved source network and permissions, and rotate the External ID.
- title: Hunt across accounts from October 1
  hint: Check CloudTrail AssumeRole from 805246085872 outside AWS, AIDA3W7DIFLYOLTK63SFS, AIDAJYRRH5Y3A7AAJM2HW outside AWS, quiam-* sessions and TruffleHog validation. Wiz lists 15 indicator rows, including 57.129.54[.]120, 2001:41d0:70d[:]7800::, 45.83.220[.]211, 185.209.199[.]73 and 89.37.63[.]175. See its Indicators of Compromise tables for exact user agents and sso_agent.iso hashes. A match alone is not proof.
- title: Contain sessions and scope accessed data
  hint: Preserve CloudTrail, S3 data events or server access logs, and Entra ID/Okta sign-in logs. Trace the assumed sessions to Lambda, Secrets Manager, SSM and S3 reads. Revoke active role sessions, rotate all secrets the compromised role could read and investigate downstream use.
sources:
- name: Wiz incident-response research
  says: Documents successful role assumption, secret validation, S3 exfiltration, detection and the November 11 unverified claim of responsibility.
  url: https://www.wiz.io/blog/qubole-cross-account-access-abused-in-the-wild
  primary: true
- name: Sentra incident-response research
  says: Explains detection and the scope observed in Sentra customer environments.
  url: https://sentra.io/blog/breaches/inside-the-qubole-supply-chain-attack
  primary: true
---

The attacker presented the expected External ID to obtain temporary credentials for roles that still trusted the Qubole-linked account. The role policies determined what was reachable. Management events can show role assumptions and bucket enumeration. S3 object reads require data events or server access logs. The research does not explain how the vendor credentials were acquired. Wiz noted a third-party report of a claim of responsibility on November 11 and has not established attribution.
