---
title: "GhostAction is back: hijacked maintainer accounts plant “security-audit.yml” workflows that ship your CI secrets out"
headline: "GhostAction returns: the security audit that steals your secrets"
level: 4
date: 2026-10-09
tags: [supply chain, GitHub Actions, secrets]
ecosystems: [github-actions]
summary: >-
  Compromised GitHub accounts pushed workflows dressed up as security jobs that exfiltrate Actions secrets.
  A new variant scans full git history, so the key you deleted three years ago still counts. GitHub started
  blocking the workflow on Oct 9.
splash: "~1,900 accounts and 30,000+ repos targeted (GitGuardian); 3,174 secrets attempted"
wipe: "Search .github/workflows for security-audit.yml and friends, rotate every CI secret and any key ever committed, revoke old PATs"
inTheWild: "yes"
inTheWildNote: Thousands of secrets exfiltrated before GitHub's block
oneLiner: >-
  A stolen maintainer token pushes a “security audit” workflow; it runs on push, dumps every secret and every
  credential-looking string in your git history, and POSTs them to the attacker.
timeline:
  - date: Aug 31, 2026
    title: New wave first observed by GitGuardian
    body: StepSecurity sees the exfiltration endpoint in use from Sep 4–5.
  - date: Oct 8, 2026
    title: Mass sweeps
    body: The kitao and henrywoo accounts push the workflow to 345 repos. GitGuardian counts ~28,000 repos targeted over Oct 8–9.
  - date: Oct 9, 2026
    title: GitHub starts blocking the workflow; Socket and StepSecurity publish
  - date: Oct 10 & 12, 2026
    title: Further waves fail to extract secrets
checklist:
  - title: Search for the malicious workflows
    hint: security-audit.yml, github_actions_security.yml, security-check.yml, including in forks
  - title: Check Actions logs for POSTs to 193.32.204.199
    hint: Any run of those workflows means assume every secret is gone
  - title: Rotate every Actions and environment secret
    hint: Cloud keys, npm/PyPI tokens, deploy keys, webhooks
  - title: Rotate anything ever committed to git history
    hint: The variant runs git log -p --all, so deleted secrets count
  - title: Revoke and re-issue maintainer PATs
    hint: Prefer fine-grained tokens with expiry; enforce 2FA
sources:
  - name: Socket
    url: https://www.socket.dev/blog/ghostaction-cloud-credentials
    says: Tracks activity from Oct 7; claims 500+ accounts and tens of thousands of repos, detailed count 346 repos from 2 accounts
    primary: true
  - name: StepSecurity
    url: https://www.stepsecurity.io/blog/ghostaction-returns
    says: 378 repos still had the workflow on the default branch on Oct 9; suspects PATs from infostealer logs (unconfirmed)
    primary: true
  - name: The Hacker News
    url: https://thehackernews.com/2026/10/ghostaction-compromises-about-1900.html
    says: GitGuardian numbers, ~1,900 accounts, 30,000+ repos, 3,174 secrets
  - name: The New Stack
    url: https://thenewstack.io/hackers-hijacked-1900-github-accounts-then-they-went-after-30000-repos/
    says: Same GitGuardian figures
---

GhostAction first hit in 2025. This wave started quietly on **August 31, 2026** and exploded on
**October 8**. The attackers log in as real maintainers, probably with leaked personal access tokens
(unconfirmed), and push a workflow with a reassuring name like `security-audit.yml`.

The workflow reads named Actions secrets and greps for 13 credential patterns: AWS, Anthropic, OpenAI,
OpenRouter, GitHub and GitLab tokens, GCP, Slack, SendGrid. A newer variant checks out with
`fetch-depth: 0` and runs `git log -p --all`. **Anything that was ever committed is in scope**, even if you
removed it years ago. Results go by HTTP POST to `193.32.204[.]199`.

### How big?

The counts disagree, so here they all are:

| Who | Says |
| --- | --- |
| GitGuardian | ~1,900 accounts, 30,000+ repos targeted, 3,174 secrets attempted |
| Socket | 500+ accounts, "tens of thousands" of repos. Its detailed count is 346 repos from 2 accounts |
| StepSecurity | 378 repos still carried the workflow on Oct 9 |

Some victims were repeats from earlier waves. They had never rotated the secrets stolen last time.
GitHub began blocking the workflow on October 9, and later waves on October 10 and 12 came away empty.
