---
title: "Railway says an intruder reached the store holding customer environment variables and decrypted some of them"
headline: "Railway: your .env went for a ride without you"
level: 4
date: 2026-10-21
updated: 2026-11-12
tags: [PaaS, secrets, credentials, supply chain]
ecosystems: [railway]
summary: Railway says at most 1.85% of workspaces (~100,000) could have had variables decrypted. It confirms 353 build histories were read and linked-account tokens for 1,852 users were decrypted. Estimated unauthorized AI spend is ~$740,000. Rotate stored secrets and replace revoked deploy credentials.
splash: "Secrets stored before Oct 21; vendor upper bound is 1.85% of workspaces (~100,000), with broader precautionary resets"
wipe: "Rotate/revoke stored secrets, audit logs from Oct 20, recreate deploy tokens, reconnect GitHub and redeploy"
inTheWild: "n/a"
inTheWildNote: Railway estimates about $740,000 in unauthorized spend on stolen keys.
oneLiner: >-
  Your hosting provider keeps a locked box of all your passwords so your apps can use them. Someone got into
  the room with the box, and for some customers they got it open.
cves: []
timeline:
  - date: Oct 20, 13:58 UTC
    title: Anomalous registry calls trigger a Railway alert
    body: The November report dates the initial build-isolation exploit to 07:28 UTC on October 20.
  - date: Oct 21, 07:24 UTC
    title: Railway starts investigating a platform outage
    body: >-
      Dashboard, API and CLI go down and builds are paused in all regions. The status page later folds the
      security notice into this same incident. The preliminary report now links build pauses to security triage.
  - date: Oct 21, 20:19 UTC
    title: OAuth sessions invalidated
    body: Railway cites impact on "adjacent cache systems"; users are signed out.
  - date: Oct 21, 22:10 UTC
    title: Security notice published
    body: Railway tells all users to roll every variable and registry credential. Deploys stay paused, Enterprise included.
  - date: Oct 21, 22:37 UTC
    title: Railway starts rotating all storage bucket credentials
  - date: Oct 22, 02:19 UTC
    title: Step-by-step guides published
    body: Database rotation (Postgres, MySQL, MongoDB, Redis) and usage checks for AWS, GCP, GitHub, Stripe, OpenAI, Anthropic, Grok and OpenRouter.
  - date: Oct 22, 03:32 UTC
    title: Builds return for Enterprise workspaces
    body: Pro, Hobby, then Free and Trial follow in stages.
  - date: Oct 22, 2026
    title: Railway publishes preliminary scope and containment findings
    body: At most 1.85% of workspaces, about 100,000, potentially affected; the preliminary report gave 03:32 UTC on October 22 as the end of access. The November report revises that endpoint. All plan tiers resumed builds by 22:49 UTC on October 22.
  - date: Oct 23, 2026
    title: Login and deployment recovery guides published
    body: Missed commits were not queued; revoked CLI and CI credentials must be replaced before retrying deployments.
  - date: Oct 26, 2026
    title: Railway reports existing-user restoration and adds AI-spend guidance
    body: "New signups remain paused. Ask the AI provider about refunds first, then submit supporting evidence to Railway for escalation."
  - date: Nov 10, 18:02 UTC
    title: Railway publishes the forensic report and reimbursement steps
    body: The report revises containment timing and describes the build, CI and key-store access chain. It gives confirmed build-history and token exposure counts and estimated unauthorized AI spend.
checklist:
  - title: Rotate every secret stored in Railway variables, starting with the expensive ones
    hint: AI provider keys, cloud (AWS/GCP) keys, Stripe, DB passwords, OAuth client secrets, webhook signing secrets. If it's in Variables, assume it's gone
  - title: Revoke the old values at the provider, don't just add new ones
    hint: A new key next to a live old key fixes nothing. Delete the old key in the provider console
  - title: Rotate Railway-hosted database passwords
    hint: Railway has guides for PostgreSQL, MySQL, MongoDB and Redis; update every service that references them
  - title: Revoke GitHub tokens you stored as registry credentials
    hint: Railway removed them from its side, but they keep working on GitHub until you revoke them yourself
  - title: Check provider audit logs and billing from Oct 20 or earlier
    hint: Unknown IPs in AWS CloudTrail / GCP audit logs, new GitHub tokens or deploy keys, odd Stripe API calls, surprise AI token bills
  - title: Escalate suspected fraudulent AI charges
    hint: "Submit unauthorized charges through the form in Railway’s November report. Preserve provider billing records and timestamps. Follow the provider-specific instructions below, including passing the OpenAI Case ID to Railway support."
  - title: Reconnect GitHub, replace deploy credentials and redeploy
    hint: "Builds are accepted again. Missed commits were not queued: trigger Deploy Latest Commit. Reconnect the GitHub app, run railway logout then railway login, and replace revoked RAILWAY_TOKEN / RAILWAY_API_TOKEN CI secrets. Redeploy to load rotated variables and bucket keys"
  - title: Review your Railway account and deploy history
    hint: Audit log for changes you didn't make (Railway's own resets show as "Railway Staff"), unknown members, tokens or deploys
  - title: Watch your inbox for a Railway email
    hint: Railway says it will email accounts it confirms as affected
sources:
  - name: "Railway blog: Security Disclosure, Wednesday October 21st"
    url: https://blog.railway.com/p/security-disclosure-wednesday-october-21st
    says: Encrypted variables may have been accessed and some decrypted; likely part of attacks on platforms aimed at AI inference providers; impact may be limited to a subset of users
    primary: true
  - name: Railway status page (incident QH8L8B3E)
    url: https://status.railway.com/incident/QH8L8B3E
    says: Outage from 07:24 UTC, OAuth sessions invalidated, all bucket credentials rotated, staged build restore
    primary: true
  - name: "Railway blog: Redeploy Buckets and Reconnect GitHub After the Credential Reset"
    url: https://blog.railway.com/p/security-disclosure-recommendation-redeploy-buckets-and-reconnect-github-after-the-credential-reset
    says: Railway reset all bucket S3 keys and the GitHub tokens it held; stored GitHub registry tokens still work until the user revokes them
    primary: true
  - name: Railway on X
    url: https://x.com/Railway/status/2113025284148715845
    says: Official account posts the urgent security notice
    primary: true
  - name: Cybersecurity News
    url: https://cybersecuritynews.com/railway-security-incident/amp/
    says: Early coverage had no affected-account count or access details; scope later revised by the vendor; no confirmed misuse
  - name: StartupHub.ai
    url: https://www.startuphub.ai/cybersecurity/railway-tells-all-users-to-rotate-secrets-after-breach
    says: Early gaps in decryption mechanics and notified providers, partially superseded by the preliminary report
  - name: Railway preliminary incident report
    url: https://blog.railway.com/p/preliminary-report-october-security-incident
    says: October 22 preliminary scope, attack timeline, containment and restored build tiers; October 26 existing-user restoration and third-party AI-spend escalation guidance
    primary: true
  - name: Railway deployment recovery guide
    url: https://blog.railway.com/p/security-disclosure-recommendation-recover-failing-deploys
    says: Missed commits were not queued; reconnect GitHub and replace revoked CLI / CI credentials
    primary: true
  - name: Railway account recovery guide
    url: https://blog.railway.com/p/security-disclosure-recommendation-recover-account-access
    says: Log in with the original account identity; an empty dashboard can indicate a different account
    primary: true
  - name: Railway November incident report
    url: https://blog.railway.com/p/incident-report-october-security-incident
    primary: true
    says: Details the attack chain, revised scope and containment, provider-specific claims and Railway’s reimbursement commitment.
---

Railway, a popular platform-as-a-service, initially said that on the morning of **October 21, 2026** it detected
unusual activity in the systems that store customer **environment variables**. That initial notice said an unauthorized party may have accessed the encrypted variables and, **for some of them, obtained the
decrypted contents**. On Railway, environment variables are where apps keep their API keys, database
passwords and registry credentials, so this is effectively a secrets store.

Railway believes the intrusion is part of a recent series of attacks on platform companies whose goal is to
get at **AI inference providers**. It says it has asked those upstream providers to revoke keys proactively.
The initial notice did not name them; its preliminary report identifies GitHub, GitLab, Anthropic, OpenAI, OpenRouter, SpaceXSI and Stripe among notified providers. Its usage-check guides also cover Grok.

## What Railway did on its side

- **Paused new builds and deployments** during triage, including earlier October 20 interruptions. Builds came back
  for Enterprise around 03:30 UTC on Oct 22, with other plans following in stages.
- **Invalidated OAuth sessions** (users get logged out).
- **Reset every storage bucket's S3 credentials** and the **GitHub tokens** Railway held for account
  connections, and removed GitHub tokens stored as registry credentials. These resets show in workspace
  audit logs under "Railway Staff".
- Asked upstream providers to revoke keys; the initial notice left them unnamed, and the preliminary report now identifies several.

Railway **can't rotate your third-party secrets for you**: the Stripe key, the OpenAI key and the
database password in your variables are yours to roll. And because containers only read variables at
startup, any rotation needs a redeploy, which was impossible while builds were paused.

## Why L4

Railway says the impact "may be limited to a subset of users", yet tells **all** users to rotate. It
confirms that decrypted secrets were obtained for at least some customers. A breach of a multi-tenant
secrets store at a large PaaS is a mass credential leak, and each leaked key opens a different downstream
system. That is L4. It would move up if large-scale abuse of the stolen keys were confirmed.

## What's still unclear

- Initial entry and exact exploit details remain undisclosed. The preliminary report describes privilege escalation and compromised CI credentials.
- Exactly which variables were decrypted remains unknown; the workspace upper bound does not answer that. Broad provider revocations do not establish compromise of every reset credential.
- Railway says individual user accounts were not accessed; source-code access is still not ruled out.
- **Misuse.** Railway now gives a process for customers seeking refunds for fraudulent AI spend. That guidance does not publish a verified misuse count or attribute every suspicious charge to this intrusion; check your own provider logs.

**Correction, October 24:** Railway's October 22 preliminary report supersedes the earlier unknown-scope account: at most 1.85% of workspaces (about 100,000) potentially had variables compromised. This is an upper bound, not a confirmed-victim total. It dates the attack window to October 20, 13:58 UTC through October 22, 03:32 UTC, and says existing workloads stayed online. All plan tiers accept builds again. The October 23 guides explain how to catch up missed deployments and replace revoked access; use the original login identity if projects appear missing.

**Update, October 27:** Railway’s October 26 update says services are fully restored for existing users, while new signups remain paused. Recovery does not replace the credential rotation and deployment-recovery steps above. For suspected fraudulent AI charges, contact the AI provider first, then submit timestamps, prompts and supporting proof at [Railway Station](https://station.railway.com/) for escalation. Railway cannot refund third-party AI spend, and its escalation offer is not a refund guarantee. No verified downstream-abuse total or broader victim count is established by this update.

**November 10 report.** Railway now dates the partial build filesystem escape to October 20 at 07:28 UTC. A stolen build credential reached internal Temporal build histories and enabled retrieval of Railway’s own monorepo. An overly broad OIDC binding then yielded a short-lived cloud credential. The attacker used that access to reach orchestration infrastructure and decrypt some retrieved environment variables. Railway dates eviction to October 21 at 09:24 UTC and found no access to customer data beyond 09:25 UTC that day. This supersedes its preliminary October 22 endpoint. New signups reopened November 2.

Railway found 353 build histories read, including sealed variables, and reset decrypted linked-account tokens for 1,852 users, including GitHub OAuth and bring-your-own-key agent credentials. It reports no Railway account logins using credentials stolen in this incident and no indications that customer repositories or snapshots were downloaded or customer databases accessed. The 1.85% estimate remains an upper bound on workspaces that could have had variables decrypted. The counts measure different things and cannot be added.

Railway estimates about $740,000 in unauthorized spend and asks customers to submit charges through the form linked in its report. AWS Bedrock and Google Gemini began refunding under their fraud policies. For OpenAI, open a provider case and share the Case ID with Railway support. Submit SpaceXSI claims to Railway. Railway says it will cover affected Anthropic and OpenRouter charges and backstop losses that upstream providers will not cover.
