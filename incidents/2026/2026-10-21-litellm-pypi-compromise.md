---
title: "LiteLLM 1.107.0 on PyPI and Docker was a credential stealer with a remote-code loader, built from a lookalike repo"
headline: "LiteLLM, round two: your LLM gateway now proxies your keys to someone else"
level: 4
date: 2026-10-21
updated: 2026-11-01
tags: [supply chain, PyPI, Docker, AI, secrets]
ecosystems: [pypi, docker]
summary: >-
  LiteLLM confirms an unrevoked Agent Platform key exposed in May led to GitHub owner-token theft on October 10.
  Stolen maintainer tokens then published malicious 1.107.0 wheels and images on October 21. Rebuild on pinned 1.106.2 and rotate exposed credentials.
splash: "Anyone who installed litellm 1.107.0 or pulled latest / main-latest / main-stable / v1.107.0 images on Oct 21"
wipe: "Rebuild affected hosts from scratch on litellm 1.106.2 pinned by hash/digest, then rotate every credential the host could read"
inTheWild: "yes"
inTheWildNote: Wiz saw stolen AWS role credentials used from attacker IPs hours later
oneLiner: >-
  A hijacked release workflow built LiteLLM from an attacker's copy of the repo. The wheel drops a .pth file, so
  every Python process on the box, even pip, runs a stealer that ships your secrets to a fake litellm.dev and
  starts a daemon that can fetch and run more code.
cves:
  - id: GHSA-92x9-889m-jgmw
    name: Malware advisory includes LiteLLM 1.107.0
    description: The tracker includes 1.107.0 and older March malware versions; sharing a tracker does not establish a shared attacker.
fixed:
  - { product: LiteLLM (PyPI), version: 1.106.2, status: "Last clean release; 1.107.0 removed" }
  - { product: LiteLLM Docker images, version: v1.106.2 (pin by digest), status: "Floating tags were repointed" }
  - { product: LiteLLM Enterprise (private registry), version: not affected, status: Per LiteLLM }
timeline:
- date: May 27, 2026
  title: Agent Platform master key exposed in a public commit
  body: The commit was replaced, but the key was not revoked.
- date: Oct 10, 2026
  title: Agent Platform API returns the GitHub owner token
  body: Repository CI then leaks two additional maintainer tokens.
- date: Oct 12, 2026
  title: More repository secrets exfiltrated through CI
- date: Oct 13, 2026
  title: Lookalike domain litellm.dev registered
  body: Per JFrog's WHOIS data.
- date: Oct 21, 2026, 08:56–10:46 UTC
  title: Payload committed to the lookalike repo Berri-AI/litellm
  body: Wiz counts 10 commits; the first three add cook.pth, cook.py and sitecustomize.py.
- date: Oct 21, 2026, 10:08 UTC
  title: Branch protection overridden on the private release workflow
  body: An org-owner's stolen GitHub CLI token disables protection and points the workflow at the lookalike repo.
- date: Oct 21, 2026, 11:11 UTC
  title: A second stolen credential approves the production release
- date: Oct 21, 2026, 11:39–11:40 UTC
  title: Seven malicious litellm 1.107.0 wheels uploaded to PyPI
  body: Socket's scanner flags them about seven minutes later.
- date: Oct 21, 2026, 11:46 UTC
  title: Malicious images published to GHCR and Docker Hub
  body: v1.107.0, latest, main-latest and main-stable all point at the same bad image index.
- date: Oct 21, 2026, 11:53 UTC
  title: A third stolen credential deletes the workflow run records
- date: Oct 21, 2026, 13:51–14:20 UTC
  title: Docker tags pulled or repointed to clean images
  body: GHCR first, Docker Hub by 14:20 per LiteLLM. Wiz and Datadog put removal at ~13:53.
- date: Oct 22, 2026
  title: GitHub malware tracker includes 1.107.0
  body: GHSA-92x9-889m-jgmw also covers the older March versions; that does not establish common attribution.
- date: Oct 23, 2026
  title: LiteLLM publishes its canonical attack-chain findings
  body: The vendor replaces the earlier internal-deployment-log theory with a confirmed exposed-key and Agent Platform API path.
- date: Oct 30, 2026
  title: Vendor publishes the replacement image-signing key fingerprint
  body: The key rotated on October 23 signs releases starting with v1.103.8, v1.104.6, v1.105.4 and v1.106.3. The compromised images also had valid old-key signatures.
- date: Oct 21, 2026, ~13:20 UTC
  title: PyPI removes 1.107.0
  body: Wiz and Datadog say 13:20; LiteLLM's report says 13:23.
- date: Oct 21, 2026, ~16:20–17:01 UTC
  title: Stolen AWS instance-role credentials used from attacker IPs
  body: Observed by Wiz in customer environments, about 4.5 hours after exfiltration.
checklist:
  - title: Find every 1.107.0 install
    hint: "requirements, uv.lock, poetry.lock, Pipfile.lock, CI caches, wheelhouses, and any container started from latest/main-* on Oct 21. Grep for litellm-1.107.0.dist-info"
  - title: Check images by digest, not tag
    hint: Bad index is sha256:1bbcb1443bc962e45f5aad53fe3d2c30600e0379715fb6c664cdd3ac126c339e (litellm); litellm-database and litellm-non_root had their own bad digests. The vendor publishes only prefixes c00f9d92c427 and 7b00e91cd2fe for those other indexes; treat them as search prefixes, not complete digests. Use original pull records because tags have moved
  - title: Don't pip install your way out
    hint: The .pth runs on every Python start, pip included. Isolate the host, kill the daemon holding /tmp/remote_code_loader.lock, then rebuild from scratch
  - title: Rotate every key the process could read
    hint: All provider keys in the LiteLLM DB, master and virtual keys, the DATABASE_URL password, instance/task IAM roles, env vars, SSH/git/npm/PyPI/kube creds. Yes, all of them
  - title: Hunt the IOCs
    hint: "Socket exports 32 IoCs; use its complete indicator tables for package, payload and container hashes. Network paths: http://www.litellm.dev/healthcheck, https://raw.githubusercontent.com/letters9813/pythonclient-test/main/domain.txt and https://github.com/Berri-AI/litellm; correlate subsequent /codepy requests and X-Token header XWiA8gZNa7NcX2XRoAEb. Files: cook.pth, cook.py, sitecustomize.py, /tmp/.pc_once_72129118c59f5636c0bb, /tmp/remote_code_loader.lock; env PRIVCOLLECT_ACTIVE=1. A match alone does not prove compromise; GitHub and Python startup filenames also have legitimate uses"
  - title: Check cloud audit logs
    hint: CloudTrail GetCallerIdentity from your instance role near install time, and any use from 168.100.8.57 or 165.227.201.8; correlate role, timing and actions because an IP match alone does not prove compromise
  - title: Pin to 1.106.2 by hash and stop using floating tags
    hint: Hash-pinned lockfiles and image digests would have made this a non-event. The proxy was supposed to be the only middleman
  - title: Audit the confirmed upstream credential path
    hint: 'Review Agent Platform API and GitHub audit records from October 10. 15 investigation artifacts: 69.48.229.143, 199.91.221.39, webhook.site, Berri-AI/litellm, ci-tmp-a351cc, ci-tmp-be33e9 and commits 20535d8f, 9cf97e9, 285fbdc5, b69bc36, 78d968b, 1a6e3c1, d687b69. Check opencode.json history and /api/v1/managed_agents/agents?limit=100 access; compare the full canonical timeline. Revoke exposed keys even after history is rewritten. A match alone does not prove compromise; webhook.site is a legitimate shared service'
  - title: Replace the image-verification trust key
    hint: Use cosign.pub pinned to vendor commit e82a3c646908ba0a6ee0beddc4310d7a6cac4065 and verify its file SHA-256 e3fe3e08c44b16407fe0b37c43b4f8b603b3a0f4ee74c29e647bc022d762c2c0. Use the Docker image security guide for cosign commands. Check artifact digests too; an old-key signature cannot establish that 1.107.0 is safe, and verification does not clean an exposed host
sources:
  - name: LiteLLM incident report
    url: https://docs.litellm.ai/blog/security-incident-oct-21-2026
    says: Early initial-access theory superseded by the October 23 canonical report; affected artifacts, 1.106.2 recovery pin and enterprise exclusion remain unchanged
    primary: true
  - name: GitHub issue BerriAI/litellm#47826
    url: https://github.com/BerriAI/litellm/issues/47826
    says: Reporter's analysis; all 7 wheels affected, payload not in the v1.107.0 git tag; Docker tags yanked by 17:13 UTC
    primary: true
  - name: Socket
    url: https://socket.dev/blog/litellm-compromise
    says: Full payload breakdown, wheel and file hashes, image digests; flagged wheels ~7 min after publish
  - name: JFrog Security Research
    url: https://research.jfrog.com/post/litellm-hijacked-again/
    says: Exfil to www.litellm[.]dev/healthcheck, hourly dead-drop loader; no evidence linking this to the March TeamPCP compromise
  - name: Wiz
    url: https://www.wiz.io/blog/litellm-compromised-steals-credentials
    says: Observed stolen AWS role credentials validated from 168.100.8.57 and 165.227.201.8; PyPI quarantine at 13:20 UTC
  - name: Datadog Security Labs
    url: https://securitylabs.datadoghq.com/articles/litellm-compromised-pypi-docker/
    says: Live roughly two hours; no second-stage payload observed in the wild
  - name: LiteLLM canonical attack-chain report
    url: https://docs.litellm.ai/blog/security-incident-oct-21-2026-attack-chain
    says: Confirmed master-key exposure and owner-token access on October 10; supersedes the earlier initial-access theory
    primary: true
  - name: GitHub malware advisory
    url: https://github.com/advisories/GHSA-92x9-889m-jgmw
    says: October 22 update includes 1.107.0; GHSA-5mg7-485q-xm76 still covers only the March versions
    primary: true
  - name: LiteLLM image-signature verification and key rotation
    url: https://docs.litellm.ai/docs/proxy/docker_image_security
    primary: true
---

LiteLLM is the Python SDK and proxy that sits between apps and dozens of LLM providers, so it tends to run with
every provider key a company has. On **October 21, 2026** a malicious `litellm==1.107.0` landed on PyPI at
11:39 UTC, and the official Docker images under the `v1.107.0`, `latest`, `main-latest` and `main-stable` tags
pointed at a poisoned build from 11:46 UTC. This is LiteLLM's second release-pipeline compromise this year,
after 1.82.7 and 1.82.8 in March. JFrog and Datadog say nothing links the two so far.

### How it got out

According to [LiteLLM's own report](https://docs.litellm.ai/blog/security-incident-oct-21-2026), the attacker
held GitHub CLI OAuth tokens belonging to three engineers. One belonged to an organization owner and was used to
override branch protection on the private release workflow and point it at `Berri-AI/litellm`, a lookalike repo
one hyphen away from the real `BerriAI/litellm`. A second token passed the production approval gate, and a third
deleted the workflow run records afterwards. The real `v1.107.0` git tag is clean. The artifacts were built
from the attacker's copy and signed by the real pipeline. **Correction, October 24:** LiteLLM's October 23 canonical report supersedes its earlier theory that tokens leaked through an internal deployment's logs. An unrevoked Agent Platform master key exposed in May let the attacker retrieve the owner token through that service's API on October 10; malicious CI workflows then extracted two maintainer tokens.

### What the payload does

All seven 1.107.0 wheels carry three extra files: `cook.pth`, `cook.py` and `sitecustomize.py`. The source
distribution does not. Because of the `.pth` hook, the stealer runs at **every Python start** in that
environment, even if nothing imports LiteLLM and even when you run `pip`. Per Socket and JFrog it collects:

- cloud credentials (AWS, Azure, GCP), instance-metadata tokens, and an STS `GetCallerIdentity` check
- Kubernetes, Docker, Vault, Terraform and CI secrets; SSH, GPG and TLS keys; git, npm and PyPI configs
- AI tool credentials (Claude, Codex, Gemini, Cursor, Copilot, Hugging Face and others)
- browser databases, shell history, and every readable process environment on Linux
- if `DATABASE_URL` is set, the LiteLLM proxy's own `LiteLLM_CredentialsTable` and `LiteLLM_ProxyModelTable`,
  which hold your provider keys

The data is encrypted (AES-256 with an RSA-4096-wrapped key) and POSTed to `www.litellm[.]dev/healthcheck`.
`sitecustomize.py` also forks a detached daemon that checks a GitHub dead drop every hour for a domain, then
downloads and `exec()`s Python from it with no integrity check. The dead drop was empty when researchers looked
and has since been removed, but the stealer part does not depend on it.

### Is it being used?

Yes. Wiz observed stolen AWS instance-role credentials being validated from `168.100.8.57` and
`165.227.201.8` roughly 4.5 hours after exfiltration, and IAM enumeration in "a small number" of
environments. Datadog reports no second-stage payload seen in the wild. No source gives a download count for
1.107.0; the only figure cited is LiteLLM's ~23 million weekly downloads overall, which is not the exposure.

### Why L4

A package that by design holds every LLM provider key, a payload that steals cloud and AI credentials on any
Python start, and confirmed attacker use of stolen credentials: that is active exploitation with mass credential
theft. It stays below L5 because it was a single release live for about two hours, not self-propagating, and
no core runtime or trust anchor broke.

### What's still unclear

- **Exact windows.** LiteLLM says PyPI removal at 13:23 and Docker Hub cleaned by 14:20 UTC; Wiz and Datadog say
  13:20 and ~13:53; the GitHub issue reported Docker tags still bad at 13:23 and yanked by 17:13. If you pulled a
  floating tag anywhere in that afternoon, check the digest.
- **Initial access is now confirmed by the vendor:** exposed master key → Agent Platform API → GitHub owner token → CI secret exfiltration. This revises the earlier unconfirmed theory.
- **Tracker correction:** GHSA-92x9-889m-jgmw now includes 1.107.0. Its older publication date and March entries do not establish a relationship between the attacks. Wiz and JFrog also track this incident as `wiz-adv-2026-188` and `XRAY-955589`.
- LiteLLM mentions an embargoed enterprise fix due for disclosure on October 27; it is not clear whether it is
  related.

**Update, November 1 (UTC):** The vendor’s October 30 notice publishes the replacement cosign public-key fingerprint and says the old private key may have been exposed. The rotation happened October 23; the first releases signed with the replacement key shipped October 24. Verify the pinned key and the image digest together. The malicious images were signed by the real release pipeline with the old key, so a valid signature alone never excluded this compromise. The exposed-host rebuild and credential-rotation steps above still apply.
