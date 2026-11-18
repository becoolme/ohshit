---
title: Microsoft's agent-framework PyPI releases steal cloud and CI credentials at Python startup
level: 4
date: 2026-11-17
tags: [Microsoft, PyPI, supply chain, credentials]
ecosystems: [python]
summary: Malicious agent-framework 1.26.1 and 1.26.2 wheels install Python startup hooks that collect secrets and request cloud/CI identity tokens. Microsoft confirms both versions were removed. Remove hooks before running pip, restore the clean 1.26.0 release and respond to credential exposure.
splash: Python environments, CI runners and images with agent-framework 1.26.1 or 1.26.2; startup hooks run without a framework import
wipe: Isolate affected hosts, remove startup hooks before using pip, rebuild with 1.26.0 and rotate exposed credentials
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
checklist:
  - title: Find exposure without starting the affected Python
    hint: Inspect requirements, lockfiles, build logs, images and site-packages from November 17 20:35 UTC onward with shell tools. Look for agent_framework-1.26.1.dist-info or agent_framework-1.26.2.dist-info and the payload files listed below. Do not begin with python, pip list or pip uninstall; normal startup evaluates the hook.
  - title: Isolate the host and remove hooks before reinstalling
    hint: Preserve files, process listings and egress logs, then isolate the environment. Use shell tools to remove agent_framework_meta.pth, af_runtime_diag.pth and af_runtime_diag.py from the affected site-packages before invoking pip. _AF_TEL=1 is a temporary kill switch for both known payloads. Reinstalling clean 1.26.0 must also replace agent_framework_meta/__init__.py and remove agent_framework_meta/_telemetry.py; hook deletion alone leaves an explicit-import trigger in 1.26.1. If cleaning in place, remove matching payload __pycache__ entries and malicious dist-info directories too. Prefer rebuilding a clean image or environment; preserve evidence and terminate identified detached collector processes.
  - title: Restore a verified clean release and purge distribution caches
    hint: Pin agent-framework==1.26.0 in the rebuilt environment and block 1.26.1/1.26.2 in package proxies. The clean wheel SHA-256 is 14267ec8e6929c139015f8ec918adc638a71c7656901413426bb30ab199b6d71. For pip --require-hashes, generate hashes for the entire dependency set. Purge malicious wheels from pip/uv caches, CI caches and internal mirrors; do not rely on an unpinned upgrade or PyPI removal alone.
  - title: Respond to credentials and workload identity exposure
    hint: If Python ran after installation, treat credentials it could read or request as exposed. From a clean system rotate environment/file secrets, Azure CLI caches, npm/PyPI/Docker/git/Hugging Face credentials, cloud/model keys and Azure DevOps service connections. Review federated credentials and managed-identity role assignments, temporarily remove unsafe access and inspect Entra sign-in/activity logs. Re-register self-hosted runners with readable credential files. Issued access tokens may remain usable until expiry. Review Actions cache/artifact writes if ACTIONS_RUNTIME_TOKEN was exported; these tokens are not exposed to ordinary run steps by default.
  - title: Hunt using the full endpoint and published artifacts
    hint: Search for POSTs to webhook[.]site/d381fd80-ec62-42ad-8f5c-d1b15103c9bb?t=telemetry, User-Agents af-runtime-diagnostics/1 and runtime-diagnostics/1, and the seven malicious SHA-256 hashes below. Also inspect _AF_TEL=1, detached Python children and reads of /proc/*/environ. Correlate unusual OIDC requests and bursts to the legitimate Azure metadata endpoint 169.254.169.254/metadata/identity/oauth2/token; Python-urllib/3.x can appear on token requests. The endpoint was created from 18.142.122[.]94 using curl/8.19.0; this is infrastructure context, not an attacker or victim identity. A domain, IP or marker match alone does not establish compromise or successful exfiltration; webhook.site is also used legitimately.
sources:
  - name: Upwind original report and Microsoft maintainer confirmation
    url: https://github.com/microsoft/agent-framework/issues/10411
    primary: true
    says: Records publication times, both payloads, hook-first cleanup, cache/artifact risks and a Microsoft maintainer's confirmation that both releases were removed. The precise publishing credential remains unconfirmed.
  - name: Endor Labs artifact analysis
    url: https://www.endorlabs.com/learn/agent-framework-compromised-software-supply-chain-attack
    primary: true
    says: Analyzes both wheels, startup execution, identity requests, seven malicious artifact hashes and safe containment. Its initial latest-version status predates the later removal confirmation.
  - name: StepSecurity static analysis
    url: https://www.stepsecurity.io/blog/microsoft-agent-framework-pypi-package-compromised
    primary: true
    says: Independently analyzes the wheels and reports a new publishing account. Continued publisher access after the first removal does not establish that access is still valid now.
  - name: PyPI agent-framework release metadata
    url: https://pypi.org/pypi/agent-framework/json
    primary: true
    says: At the November 18 check the latest release is 1.26.0, its wheel hash matches the known-clean artifact, and 1.26.1/1.26.2 are absent from the release map.
---

This is a compromise of the published Python meta-package, not evidence that every Agent Framework component or Microsoft's source repository was modified. Researchers found malware in two official PyPI wheels, and a Microsoft maintainer confirmed their removal. The confirmed malicious distribution warrants L4. The reviewed sources do not provide a verified count of affected installations or stolen credentials.

The installed .pth files execute import statements during normal Python startup in the environment where they are installed. No Agent Framework import is needed, and starting pip can trigger the collector. Separate virtual environments are not automatically infected merely because they use the same Python executable. The payload reads accessible environment variables, credential files and other processes' environments, requests Azure managed-identity and Azure DevOps tokens, and in 1.26.2 also attempts GitHub Actions OIDC requests. These requests require the corresponding identity, permissions or token-request variables; installing the package does not grant arbitrary cloud access. A detached child may outlive the job that started it.

The likely publishing-access compromise remains under investigation. StepSecurity reports a newly created maintainer account; Upwind leaves the exact credential route unresolved. Do not infer a wider Microsoft compromise or an attacker identity from those observations. Endor's initial report still describes 1.26.2 as latest, but the later Microsoft confirmation and current PyPI metadata establish that both malicious releases were removed. That does not clean installed environments or prove the publishing access has been revoked.

Published malicious SHA-256 indicators are listed in full. The clean 1.26.0 initializer shares its hash with the restored initializer in malicious 1.26.2, so that clean file alone cannot clear an environment.

| Artifact | SHA-256 |
| --- | --- |
| agent_framework-1.26.1-py3-none-any.whl | d27fa34414e6201d5e03e559ef634f020057554d7b3f4898dd5d7cd3e989e110 |
| agent_framework_meta.pth | 21f28e8517a10ffe431f8d68f5875c85eca4001ae6d118322b0a41873998eb5e |
| agent_framework_meta/__init__.py in 1.26.1 | c275ccbe520ef3c0f02dc6a35389e427f9f1b4e0b12e140cd7bf7179ce143f02 |
| agent_framework_meta/_telemetry.py | 39fa329f2a93f734b0bb8f5adb203ea3331d1ae479832a5015a54cb17aabd663 |
| agent_framework-1.26.2-py3-none-any.whl | 3d20a8bc91351a9a16b6db243b848ceca0206b7a8623b02d2af553a9c9f7e0a9 |
| af_runtime_diag.pth | 325e7e9f0ec94e41ad1a1b7a3f18a6b8b5bffece2e2b97b8d3369eb967452f93 |
| af_runtime_diag.py | 54d885b7d7161c9ed96489c66364c4bfbf635929166843bba10d97d46b5a2e1f |
