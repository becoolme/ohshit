---
title: "Railway says an intruder reached the store holding customer environment variables and decrypted some of them"
headline: "Railway: your .env went for a ride without you"
level: 4
date: 2026-10-21
tags: [PaaS, secrets, credentials, supply chain]
ecosystems: [railway]
summary: >-
  Railway detected unusual activity in the systems that store customer environment variables. An unauthorized
  party may have read encrypted variables and, for some, the decrypted values. Railway paused all deploys,
  reset bucket and GitHub credentials, and tells every user to rotate every secret.
splash: "Every Railway user with secrets in environment variables; Railway says a subset was hit but won't say who yet"
wipe: "Rotate and revoke every secret stored in Railway variables, check provider logs since Oct 21, redeploy once builds return"
inTheWild: "n/a"
inTheWildNote: An intrusion, not a bug; no misuse of stolen secrets confirmed publicly yet
oneLiner: >-
  Your hosting provider keeps a locked box of all your passwords so your apps can use them. Someone got into
  the room with the box, and for some customers they got it open.
cves: []
timeline:
  - date: Oct 21, 07:24 UTC
    title: Railway starts investigating a platform outage
    body: >-
      Dashboard, API and CLI go down and builds are paused in all regions. The status page later folds the
      security notice into this same incident; Railway has not said how the two are connected.
  - date: Oct 21, 2026 (morning)
    title: Anomalous activity detected in the env-var storage systems
    body: Railway's notice says it detected the activity "earlier this morning". No start time for the intrusion has been published.
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
checklist:
  - title: Rotate every secret stored in Railway variables, starting with the expensive ones
    hint: AI provider keys, cloud (AWS/GCP) keys, Stripe, DB passwords, OAuth client secrets, webhook signing secrets. If it's in Variables, assume it's gone
  - title: Revoke the old values at the provider, don't just add new ones
    hint: A new key next to a live old key fixes nothing. Delete the old key in the provider console
  - title: Rotate Railway-hosted database passwords
    hint: Railway has guides for PostgreSQL, MySQL, MongoDB and Redis; update every service that references them
  - title: Revoke GitHub tokens you stored as registry credentials
    hint: Railway removed them from its side, but they keep working on GitHub until you revoke them yourself
  - title: Check provider audit logs and billing since Oct 21 (earlier if you can)
    hint: Unknown IPs in AWS CloudTrail / GCP audit logs, new GitHub tokens or deploy keys, odd Stripe API calls, surprise AI token bills
  - title: Reconnect GitHub and redeploy once builds are back for your plan
    hint: Containers only read variables at startup, so new secrets and the reset bucket keys do nothing until you redeploy
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
  - name: Cybersecurity News
    url: https://cybersecuritynews.com/railway-security-incident/amp/
    says: No affected-account count, attacker or access method disclosed; no confirmed misuse
  - name: StartupHub.ai
    url: https://www.startuphub.ai/cybersecurity/railway-tells-all-users-to-rotate-secrets-after-breach
    says: Notes Railway hasn't said how encrypted values became readable or which providers it notified
---

Railway, a popular platform-as-a-service, says that on the morning of **October 21, 2026** it detected
unusual activity in the systems that store customer **environment variables**. Its investigation so far
says an unauthorized party may have accessed the encrypted variables and, **for some of them, obtained the
decrypted contents**. On Railway, environment variables are where apps keep their API keys, database
passwords and registry credentials, so this is effectively a secrets store.

Railway believes the intrusion is part of a recent series of attacks on platform companies whose goal is to
get at **AI inference providers**. It says it has asked those upstream providers to revoke keys proactively.
It has not named them, but its own follow-up guides cover OpenAI, Anthropic, Grok and OpenRouter usage
checks.

## What Railway did on its side

- **Paused all builds and deployments**, Enterprise included, from the morning of Oct 21. Builds came back
  for Enterprise around 03:30 UTC on Oct 22, with other plans following in stages.
- **Invalidated OAuth sessions** (users get logged out).
- **Reset every storage bucket's S3 credentials** and the **GitHub tokens** Railway held for account
  connections, and removed GitHub tokens stored as registry credentials. These resets show in workspace
  audit logs under "Railway Staff".
- Asked upstream (unnamed) providers to revoke keys.

Railway **can't rotate your third-party secrets for you**: the Stripe key, the OpenAI key and the
database password in your variables are yours to roll. And because containers only read variables at
startup, any rotation needs a redeploy, which was impossible while builds were paused.

## Why L4

Railway says the impact "may be limited to a subset of users", yet tells **all** users to rotate. It
confirms that decrypted secrets were obtained for at least some customers. A breach of a multi-tenant
secrets store at a large PaaS is a mass credential leak, and each leaked key opens a different downstream
system. That is L4. It would move up if large-scale abuse of the stolen keys were confirmed.

## What's still unclear

- **How** the attacker got in (stolen employee or service credential, vendor, bug) and when the intrusion
  actually started. Railway has only said when it detected it.
- **How many** customers or variables were affected, and which ones were decrypted. Railway will email
  confirmed accounts, but has given no number.
- **How** encrypted values became readable, and therefore whether rotating secrets alone closes the path
  the attacker used.
- Whether the outage that started at 07:24 UTC was caused by the attack or by the response. Railway's
  status page tracks both under one incident but doesn't say.
- **Misuse.** No public report yet confirms that a stolen Railway secret was used. Absence of reports is
  not evidence of absence: check your own provider logs.
