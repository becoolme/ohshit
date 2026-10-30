---
title: Malicious GitHub issue and PR text reached shell execution in two Actions workflows
level: 4
date: 2026-10-29
tags: [GitHub Actions, supply chain, command injection]
ecosystems: [github-actions]
summary: Radware found 83 malicious items targeting 61 repositories and evidence of command execution in two Actions workflows. The September campaign exploited unsafe interpolation of issue or PR text into shell scripts; downstream software compromise was not established.
splash: Actions workflows inserting externally controlled titles, bodies or comments directly into shell code
wipe: Disable unsafe workflows, pass untrusted text as data, reduce job privileges and rotate credentials exposed to executed payloads
inTheWild: yes
inTheWildNote: Radware finds execution in two September workflows; 61 is the target count.
cves: []
fixed: []
timeline:
  - date: Sep 1, 2026
    title: Two attack waves post malicious GitHub content
  - date: Oct 29, 2026
    title: Radware publishes campaign and execution analysis
checklist:
  - title: Disable unsafe interpolation before rerunning jobs
    hint: Audit .github/workflows for event text embedded in run blocks. Pass it through step-level environment variables and quoted arguments, never eval. Separate untrusted events from privileged jobs and grant minimum permissions.
  - title: Hunt historical runs
    hint: 'Search September 1 onward for HTTP POSTs to 54.205.16.142:8443/c/ and path suffixes 047199962bc6404c171317902a0d012c, 91dad78d29e61a903a7e6d0af93270ca and f404c64b3e1dabb51ec61d91efa5c3b7. Check raw Markdown, command-substitution warnings and runner egress. A match alone does not prove compromise.'
  - title: Revoke credentials available to an executed job
    hint: Preserve logs; inventory accessible GitHub, cloud, deployment and registry credentials, rotate them from a trusted environment, and inspect repository and provider audit trails for misuse. Secrets available to a job depend on its configuration.
sources:
  - name: Radware original campaign analysis
    url: https://www.radware.com/blog/inside-a-github-supply-chain-attack-campaign/
    primary: true
  - name: GitHub Actions secure use reference
    url: https://docs.github.com/en/actions/reference/security/secure-use
    primary: true
---

Posting untrusted text is sufficient only when vulnerable automation processes it; merging a PR is unnecessary. Radware identifies execution evidence in PX4/PX4-Autopilot and Snouzy/workout-cool. Its counts are researcher findings, not independently verified here. Successful secret delivery, repository write access and altered downstream releases remain unconfirmed. The report publishes three collection-path examples, not all 83 identifiers; absence of these examples cannot clear a workflow.
