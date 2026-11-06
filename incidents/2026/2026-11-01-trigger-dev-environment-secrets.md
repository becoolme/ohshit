---
title: Trigger.dev confirms unauthorized access to some organizations’ environment variables
level: 4
date: '2026-11-01'
updated: '2026-11-06'
tags:
- Trigger.dev
- cloud
- credentials
summary: Trigger.dev reports root API-key exposure affecting 0.66% of customers, including environment variables and some run, deployment and schedule metadata. Affected API keys are revoked; replace them and rotate downstream secrets. Self-hosters and webhook signing secrets were unaffected, according to the vendor; the attack vector remains undisclosed.
splash: Notified Trigger.dev cloud environments; root API keys exposed settings and secrets. Vendor says self-hosters were unaffected.
wipe: Review the owner notice, revoke and replace exposed secrets at their issuers, then update dependent tasks and integrations
inTheWild: 'yes'
inTheWildNote: Trigger.dev confirms attacker access to environment variables.
timeline:
- date: Nov 1, 2026
  title: Trigger.dev discloses environment-variable exposure
- date: Nov 1, 22:50 UTC
  title: Status notice marked resolved; exploit blocked and owners contacted
  body: The notice promises further details; it does not publish a root cause, exposure window or affected-organization count.
- date: Nov 2, 20:27 UTC
  title: Second impact email sent to affected customers
  body: The later report dates the first email to approximately November 1, 21:36 UTC; dashboard banners also identify affected environments.
- date: Nov 6, 2026
  title: Full report confirms root API-key exposure and 0.66% customer impact
  body: Some environments also had recent runs, deployments and schedules listed. The vendor reports revoking exposed API keys, engaging incident responders and notifying law enforcement. It excludes self-hosters and webhook signing secrets; the attack vector remains withheld.
checklist:
- title: Have account owners check their incident email
  hint: Check the owner emails sent approximately November 1, 21:36 UTC and November 2, 20:27 UTC, and the dashboard banner for named environments. The November 6 report says organizations without an impact notification were unaffected. If delivery or scope is uncertain, ask support through your established account channel to verify; do not rely on an operational-status badge.
- title: Revoke exposed credentials at the issuing service
  hint: Regenerate Trigger.dev API keys using the instructions in your notification; the vendor says all exposed keys are revoked. Treat credentials in notified environments as compromised. Revoke old database passwords, third-party API keys and access tokens at their issuers, update Trigger.dev and dependent integrations, and test tasks with replacements. Editing an environment variable does not invalidate a copied credential. The report says webhook signing secrets were not exposed and need no incident-driven rotation.
- title: Review downstream access and preserve evidence
  hint: Retain the owner notification, relevant task history, provider authentication/usage logs and billing records. Investigate unexpected use of exposed credentials and contact Trigger.dev through its established support route. The full report lists exposed metadata categories but no dedicated detection indicators or complete exposure window. Root API keys grant full environment settings access; review use of scoped keys with IP allowlists and the newly released OIDC support through the official documentation. These controls do not invalidate downstream secrets already copied.
- title: Restrict self-hosted tenant access
  hint: The vendor says self-hosters were not impacted, but recommends single-tenant operation with WHITELISTED_EMAILS limited to accounts you control. Review this setting on your own deployment; it is defense in depth, not a published patch for the cloud attack.
sources:
- name: Trigger.dev CTO disclosure
  url: https://trigger.dev/blog/security-incident-nov-2026
  primary: true
- name: Trigger.dev full incident status entry
  url: https://status.trigger.dev/incident/1110434?mp=true
  primary: true
- name: Trigger.dev November 6 full incident report
  url: https://trigger.dev/blog/security-incident-report-nov-2026
  primary: true
cves: []
fixed: []
---

The November 6 report supersedes the initial absence of scope details: Trigger.dev says 0.66% of all customers were affected and root API keys for some environments were obtained. Those keys grant full access to environment settings, including environment variables. The percentage is not a count of people, organizations or stolen secrets. The vendor says its API-log review established scope; customers without an impact notification were unaffected, according to that assessment. Confirm uncertain delivery or account status with support.

For some environments, listing recent runs, deployments and schedules exposed run IDs, deployment IDs, schedule IDs, task names, run idempotency keys, run status, run tags, deployment metadata, deployment errors, schedule external IDs and run metadata. Trigger.dev found no evidence of other customer-data access, service access, production-database access or customer-dashboard account access. These are vendor investigation findings, not independent proof that copied credentials were never abused.

Trigger.dev says it blocked the attacker, mitigated the vector, rotated internal secrets, reviewed system and API logs, applied risk-based account restrictions, revoked affected customer API keys, engaged incident responders and notified law enforcement. It released scoped-key IP whitelisting and OIDC support. The precise vector remains withheld to protect the investigation; no public safe software version or complete exposure interval is established. Self-hosters and webhook signing secrets are explicitly excluded from this attack. The November 1 resolved status does not revoke third-party credentials; impacted customers still need issuer-side rotation and replacement-key rollout.
