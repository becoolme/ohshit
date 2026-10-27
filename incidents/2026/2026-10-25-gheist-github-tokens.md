---
title: "Gheist uses stolen GitHub tokens to dump repository secrets through Actions logs"
level: 4
date: 2026-10-25
tags: [GitHub Actions, credentials, supply chain]
ecosystems: [github-actions]
summary: >-
  Wiz reports over 13,500 planted branches across over 850 compromised accounts. Stolen tokens push secret-dumping workflows; successful execution was observed in private repositories and enterprise environments. Revoke tokens and rotate exposed secrets.
splash: "Repositories writable by stolen workflow-capable tokens; private repositories and GHES lack GitHub's public-repository approval hold"
wipe: "Revoke compromised tokens, rotate reachable secrets, investigate runner hosts and restrict environment/OIDC access"
inTheWild: yes
inTheWildNote: "Wiz observed private-repository execution and follow-on AWS Secrets Manager enumeration."
timeline:
  - date: Sep 15, 2026
    title: Wiz begins tracking the campaign
  - date: Oct 19, 2026
    title: A variant adds a self-hosted runner job
  - date: Oct 24, 2026
    title: Wiz's observation cutoff still shows ongoing activity
  - date: Oct 25, 2026
    title: Wiz publishes the campaign investigation
checklist:
  - title: Contain affected access without running the payload
    hint: "Do not approve held sync-check runs or execute ci-sync branches. Revoke the tokens that pushed unauthorized commits and investigate their owners' devices for infostealers. Preserve available audit evidence."
  - title: Rotate every secret an affected repository could access
    hint: "Include repository, organization and available environment secrets. Deleting the branch or run does not undo exposure. An empty workflow permissions block restricts GITHUB_TOKEN, not access to the secrets context."
  - title: Hunt across GitHub and cloud audit logs
    hint: >-
      Look for ^ci-sync-[0-9a-z]{6}$ branches adding .github/workflows/sync-check.yml, commit message ci: sync config, workflow name sync-check and user agent gheist. Correlate completed runs deleted within a minute and cloud OIDC role assumptions/token exchanges naming ci-sync- branches. A match alone does not prove secrets were stolen.
  - title: Investigate self-hosted runners and compare all published blobs
    hint: >-
      If an affected branch executed on a self-hosted runner, treat the host and its instance role as compromised. Look for job sync-host, files .gdmp_pat, .gdmp_patg, .gdmp_sweep, log header ===== gdmp-pivot: and markers toJSON(secrets), base32 -w 120 and LAFA====. Wiz lists four workflow blob SHAs: f3da2b8b357dcda02fd455d314be2a95007516a6 (plain), d09535857a741bbb976bdc084a9a021713133291 (timeout), 1dc5af9cce950aad1eb1546ecce8565b117540c4 (separator), c665b778b2d822453293003e7ca0bbb2cb08e39d (self-hosted). Environment-matrix variants have different hashes; an absent match is not a clean bill of health, and a marker alone does not prove execution.
  - title: Gate secrets and cloud roles, and isolate runners
    hint: "Require production-environment reviewers; restrict OIDC trust to protected branches or environments. Prefer GitHub Apps or short-lived fine-grained tokens. Use ephemeral self-hosted runners without Docker-socket or unrestricted metadata access."
sources:
  - name: Wiz Gheist investigation
    url: https://www.wiz.io/blog/gheist-attempted-scaled-abuse-of-stolen-github-tokens-stumbles
    says: "October 25 primary investigation: account/branch counts, observed private-repository execution, complete indicators, payload limitations and response steps."
    primary: true
  - name: GitHub malicious-workflow approval protection
    url: https://github.blog/changelog/2026-07-28-github-actions-holds-potentially-malicious-workflows-for-approval/
    says: "Certain suspicious runs require approval from a write collaborator via an authenticated web session; applies to public github.com repositories, not private repositories or GHES."
    primary: true
---

The attacker needs a stolen token capable of pushing workflows. Encoded secrets evade verbatim log masking; the attacker retrieves logs through GitHub's API, then deletes runs. An environment matrix can reach secrets where environment protections permit the job to run. Wiz's branch/account totals are not counts of successful exfiltrations.

GitHub's automatic hold stopped every public-repository run Wiz examined; it does not cover private repositories or GitHub Enterprise Server. This does not establish that every public workflow is safe. The self-hosted payload also attempts host, Docker and metadata collection, but Wiz found bugs: it used the wrong runner key file, had a broken URL-credential regex and did not collect GCP or Azure tokens.

This is distinct from [GhostAction](/incidents/ghostaction-returns/): shared credential-abuse tactics do not establish a common operator. No software patch substitutes for token revocation and secret rotation. L4 reflects observed secret theft and follow-on cloud activity.
