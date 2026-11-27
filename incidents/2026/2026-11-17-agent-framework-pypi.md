---
title: Microsoft's agent-framework PyPI releases steal cloud and CI credentials at Python startup
level: 4
date: 2026-11-17
updated: 2026-11-27
tags: [Microsoft, PyPI, supply chain, credentials]
ecosystems: [python]
summary: Malicious agent-framework 1.26.1/1.26.2 wheels steal credentials at Python startup. Microsoft says the repository, other Python packages, .NET and Semantic Kernel were unaffected. Treat installed environments as compromised, rebuild rather than downgrade in place, rotate reachable credentials and pin 1.26.0. Repository access remains suspended.
splash: Python environments, CI runners and images with agent-framework 1.26.1 or 1.26.2; startup hooks run without a framework import
wipe: Isolate affected hosts, rebuild from a clean image with 1.26.0, rotate reachable credentials and review cloud/CI logs from November 17
inTheWild: 'yes'
inTheWildNote: Microsoft confirms malicious releases; researchers analyzed the published wheels.
fixed:
  - product: agent-framework
    version: '1.26.0'
    status: Known-clean rollback; not a newer patch
timeline:
  - date: Nov 12, 2026
    title: Clean 1.26.0 release published
  - date: Nov 17, 20:35:20 UTC
    title: Malicious 1.26.1 wheel published
    body: A .pth hook loads a credential collector when Python starts in the affected environment.
  - date: Nov 17, 21:08:39 UTC
    title: Malicious 1.26.2 appears after the first version was removed
    body: The new layout restores the normal package initializer and moves the startup payload to af_runtime_diag.py; GitHub Actions OIDC collection is added.
  - date: Nov 17, 21:35 UTC
    title: Researcher reports both versions removed
    body: The issue's status update says PyPI is back to 1.26.0; a Microsoft maintainer also confirms removal. Cached wheels and mirrors can still distribute the malware.
  - date: Nov 18, 2026
    title: Revised analysis leaves the publishing identity unconfirmed
    body: StepSecurity's revised main analysis does not establish the account, credential or initial access vector. An older flow summary on the same page still carries the account claim; it is not a verified identity finding.
  - date: Nov 18, 14:00 UTC
    title: Wiz assesses an ESRP credential path and analyzes captured uploads
    body: Its investigation points to a client certificate/private key and identifies three distinct cases of victim-data exfiltration in the captured sample, not a complete victim count.
  - date: Nov 18, 2026
    title: PyPI advisory records account review and remediation with Microsoft
    body: PYSEC-2026-4388 says both releases were removed after PyPI Security worked with Microsoft to review project accounts and complete remediation. It does not identify the initial stolen credential or prove installed hosts were cleaned.
  - date: Nov 25, 2026
    title: Microsoft clarifies package scope and requires clean rebuilding
    body: The published Python meta-package was affected; repository code, other Python packages, .NET and Semantic Kernel were not. Repository access remains temporarily unavailable pending a safety determination, without a confirmed restoration timeline. Installed malicious versions require treating the environment as compromised, rotating reachable credentials, rebuilding and reviewing logs from November 17 onward; unaffected users should pin 1.26.0 or exact needed sub-packages.
checklist:
  - title: Find exposure without starting the affected Python
    hint: Inspect requirements, lockfiles, build logs, images and site-packages from November 17 20:35 UTC onward with shell tools. Look for agent_framework-1.26.1.dist-info or agent_framework-1.26.2.dist-info and the payload files listed below. Do not begin with python, pip list or pip uninstall; normal startup evaluates the hook.
  - title: Isolate and rebuild rather than downgrading in place
    hint: Preserve files, process listings and egress logs, then isolate the environment. Do not run its Python or pip. Microsoft’s November 25 guidance requires rebuilding from a clean image and removing affected environments, images, caches and mirror/proxy copies; an in-place downgrade is insufficient. For containment before disposal, use trusted shell tools to identify agent_framework_meta.pth, agent_framework_meta/_telemetry.py, af_runtime_diag.pth and af_runtime_diag.py, and terminate identified detached collectors after preserving evidence. _AF_TEL=1 prevents new collection in both known payloads when inherited by that process; it does not stop an already-running collector and is not cleanup. Hook removal alone leaves the 1.26.1 explicit-import trigger in agent_framework_meta/__init__.py; malicious dist-info and payload __pycache__ entries also belong to the affected environment. Rebuild instead of trying to certify that environment clean by deleting these files.
  - title: Restore a verified clean release and purge distribution caches
    hint: Pin agent-framework==1.26.0 in the rebuilt environment and block 1.26.1/1.26.2 in package proxies. The clean wheel SHA-256 is 14267ec8e6929c139015f8ec918adc638a71c7656901413426bb30ab199b6d71. For pip --require-hashes, generate hashes for the entire dependency set. Purge malicious wheels from pip/uv caches, CI caches, internal mirrors and artifact proxies; do not rely on an unpinned upgrade or PyPI removal alone. If neither malicious version was ever installed, Microsoft says no further action is required beyond pinning 1.26.0 or the exact sub-packages needed and holding those pins until further guidance. Repository unavailability is not evidence that the project was discontinued.
  - title: Respond to credentials and workload identity exposure
    hint: If either malicious version was installed, Microsoft says to treat the machine, container or CI job as compromised and rotate every credential the environment could access, including package-registry and Git credentials, API keys and cloud/CI identities; do not wait to prove collector execution. From a clean system rotate environment/file secrets, Azure CLI caches, npm/PyPI/Docker/git/Hugging Face credentials, cloud/model keys and Azure DevOps service connections. Review federated credentials and managed-identity role assignments, temporarily remove unsafe access and inspect Entra sign-in/activity logs. Re-register self-hosted runners with readable credential files. Issued access tokens may remain usable until expiry. Review Actions cache/artifact writes if ACTIONS_RUNTIME_TOKEN was exported; these tokens are not exposed to ordinary run steps by default. Review cloud and CI audit logs from November 17 onward for unrecognized use of reachable credentials.
  - title: Hunt using the full endpoint and published artifacts
    hint: Search for POSTs to webhook[.]site/d381fd80-ec62-42ad-8f5c-d1b15103c9bb?t=telemetry, User-Agents af-runtime-diagnostics/1 and runtime-diagnostics/1, and the seven malicious SHA-256 hashes below. Also inspect _AF_TEL=1, detached Python children and reads of /proc/*/environ. Correlate unusual OIDC requests and bursts to the legitimate Azure metadata endpoint 169.254.169.254/metadata/identity/oauth2/token; Python-urllib/3.x can appear on token requests. The endpoint was created from 18.142.122[.]94 using curl/8.19.0; this is infrastructure context, not an attacker or victim identity. Registry logs may also show uploader User-Agent RestSharp/106.13.0.0, which identifies only the claimed client, not its operator. A domain, IP, User-Agent or marker match alone does not establish compromise or successful exfiltration; webhook.site is also used legitimately.
  - title: Interpret captured uploads without clearing other exposed hosts
    hint: Wiz lists _telemetry.py SHA-1 0a013e4724c4437cf9b177def1d988113e167539. Its observed tooling markers /tmp/cairn_pkg, CAIRN_ESRP_PROBE2 and pi_glm53 are context, not actor attribution. An endpoint HTTP 200 indicates acceptance; 410/429 suggests rejection. Missing captured data does not clear exposure or replace credential response.
sources:
  - name: Upwind original report and Microsoft maintainer confirmation
    url: https://github.com/microsoft/agent-framework/issues/10411
    primary: true
    says: Records publication times, both payloads, hook-first cleanup, cache/artifact risks and a Microsoft maintainer's confirmation that both releases were removed. The precise publishing credential remains unconfirmed. The issue now returns 404; its earlier contents were read previously, and the later Microsoft blog and PyPI advisory provide accessible official confirmation.
  - name: Endor Labs artifact analysis
    url: https://www.endorlabs.com/learn/agent-framework-compromised-software-supply-chain-attack
    primary: true
    says: Analyzes both wheels, startup execution, identity requests, seven malicious artifact hashes and safe containment. Its initial latest-version status predates the later removal confirmation.
  - name: StepSecurity static analysis
    url: https://www.stepsecurity.io/blog/microsoft-agent-framework-pypi-package-compromised
    primary: true
    says: Analyzes the wheels; its revised main text leaves the account and credential unestablished, while an older flow summary retains the earlier account claim. Re-publication after the first removal does not establish current access.
  - name: PyPI agent-framework release metadata
    url: https://pypi.org/pypi/agent-framework/json
    primary: true
    says: At the November 18 check the latest release is 1.26.0, its wheel hash matches the known-clean artifact, and 1.26.1/1.26.2 are absent from the release map.
  - name: Wiz original investigation and November 18 update
    url: https://www.wiz.io/blog/malicious-version-of-microsofts-agent-framework-published-to-pypi
    primary: true
    says: Assesses the ESRP publishing path and analyzes captured uploads; does not establish initial credential theft or a global victim total.
  - name: Microsoft November 25 repository and remediation update
    url: https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-repository-update/
    primary: true
    says: Confirms affected and unaffected package scope, temporary repository suspension without a deadline, compromised-host handling, no in-place downgrade, credential rotation, log review and pins for unaffected users. The project has not been discontinued.
  - name: PyPI Security advisory PYSEC-2026-4388
    url: https://osv.dev/vulnerability/PYSEC-2026-4388
    primary: true
    says: Published November 17 and revised November 18; records the malicious versions, indicators, compromised-host response, removal and project-account review/remediation with Microsoft. Initial credential theft and installed-host recovery are not established.
---

This is a compromise of the published Python meta-package. Microsoft’s November 25 statement explicitly says the repository code, other Agent Framework Python packages, .NET packages and Semantic Kernel were not affected. Researchers found malware in two official PyPI wheels, and a Microsoft maintainer confirmed their removal. The confirmed malicious distribution warrants L4. A verified total of affected installations or stolen credentials is still unavailable.

The installed .pth files execute import statements during normal Python startup in the environment where they are installed. No Agent Framework import is needed, and starting pip can trigger the collector. Separate virtual environments are not automatically infected merely because they use the same Python executable. The payload reads accessible environment variables, credential files and other processes' environments, attempts to obtain Azure managed-identity and Azure DevOps tokens, and in 1.26.2 also makes GitHub Actions OIDC requests. These requests require the corresponding identity, permissions or token-request variables; installing the package does not grant arbitrary cloud access. Static collection code does not prove successful token issuance, cloud access or completed exfiltration on a particular host. A detached child may outlive the job that started it, depending on runner and container cleanup.

The likely publishing-access compromise remains under investigation. Earlier StepSecurity text reported a newly created maintainer account. Its revised main analysis says the available evidence does not establish the specific account, credential, initial access vector or uploader identity, although an older flow summary on the same page retains the account claim. That identity claim remains unverified; Upwind also leaves the exact credential route unresolved. Do not infer a wider Microsoft compromise or an attacker identity from those observations. Endor's initial report still describes 1.26.2 as latest, but the later Microsoft confirmation and current PyPI metadata establish that both malicious releases were removed. That removal did not clean installed environments or, by itself, establish that publishing access had been remediated. The later-read PyPI Security advisory records account review and remediation with Microsoft, while leaving the initial credential route unspecified.

Published malicious SHA-256 indicators are listed in full. The clean 1.26.0 initializer shares its hash with the restored initializer in malicious 1.26.2, so that clean file alone cannot clear an environment.

**November 19 follow-up:** Wiz's November 18 update assesses that a client certificate and private key for Microsoft's Engineering System Release Pipeline (ESRP) were compromised. It reports a rejected publishing attempt from AWS followed by success from Microsoft-owned IP space; neither location identifies the actor. Initial credential theft and Microsoft confirmation of this assessment remain unresolved. Wiz's single-source analysis of 50 captured requests separates four attacker-side requests, 29 apparent sandboxes/scans/tests and 17 requests representing three victim exfiltration cases. This is not an independently verified or exhaustive victim total: collection was limited and later requests could be rejected. The credential-response and known-clean pin remain relevant; the later Microsoft guidance below supersedes the earlier option of cleaning and downgrading an affected environment in place.

**November 25 vendor guidance:** Microsoft says the source repository is temporarily unavailable as a precaution and will remain so until it can safely be re-enabled; no restoration date is confirmed, and Agent Framework has not been discontinued. The malicious code was in the published wheels, not the repository. Versions 1.26.0 and earlier were not affected, but the recommendation for users who never installed either malicious release is to pin 1.26.0 or exact needed sub-packages and hold until further guidance. This is not permission to use any unpinned release.

For installed 1.26.1 or 1.26.2, Microsoft says to treat the machine, container or CI job as compromised, rotate every credential it could access, rebuild from a clean image, remove affected environment and cached/distribution copies, and review cloud/CI audit logs from November 17 onward. It explicitly rejects in-place downgrading. The prior hook-first precautions remain useful to avoid executing the payload while preserving evidence, but file deletion is not an alternative to rebuilding. PyPI Security’s advisory says project accounts were reviewed and remediation completed with Microsoft; that is separate from cleaning customers’ installed environments and does not disclose the initial stolen credential.

| Artifact | SHA-256 |
| --- | --- |
| agent_framework-1.26.1-py3-none-any.whl | d27fa34414e6201d5e03e559ef634f020057554d7b3f4898dd5d7cd3e989e110 |
| agent_framework_meta.pth | 21f28e8517a10ffe431f8d68f5875c85eca4001ae6d118322b0a41873998eb5e |
| agent_framework_meta/__init__.py in 1.26.1 | c275ccbe520ef3c0f02dc6a35389e427f9f1b4e0b12e140cd7bf7179ce143f02 |
| agent_framework_meta/_telemetry.py | 39fa329f2a93f734b0bb8f5adb203ea3331d1ae479832a5015a54cb17aabd663 |
| agent_framework-1.26.2-py3-none-any.whl | 3d20a8bc91351a9a16b6db243b848ceca0206b7a8623b02d2af553a9c9f7e0a9 |
| af_runtime_diag.pth | 325e7e9f0ec94e41ad1a1b7a3f18a6b8b5bffece2e2b97b8d3369eb967452f93 |
| af_runtime_diag.py | 54d885b7d7161c9ed96489c66364c4bfbf635929166843bba10d97d46b5a2e1f |
