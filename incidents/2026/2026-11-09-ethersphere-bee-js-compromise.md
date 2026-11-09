---
title: Compromised Bee JavaScript client runs a remote payload during npm installation
level: 3
date: '2026-11-09'
tags: [npm, Swarm, Supply chain]
ecosystems: [node]
summary: '@ethersphere/bee-js 13.3.0 runs remote JavaScript during installation. Researchers observed payloads targeting Swarm Desktop keys and installing persistent remote access on Linux. Block 13.3.0, isolate hosts that ran the hook, and rebuild from a trusted version.'
splash: Developer systems and CI runners that installed @ethersphere/bee-js 13.3.0 with lifecycle scripts enabled.
wipe: Block 13.3.0, pin verified 13.2.0, isolate and rebuild exposed hosts, and replace exposed credentials from a clean system.
inTheWild: unknown
inTheWildNote: The malicious release and served payload were verified. Victim installations are unknown.
fixed:
- product: '@ethersphere/bee-js'
  version: '13.2.0'
  status: Prior release without this install hook. Pin exactly while awaiting maintainer guidance.
timeline:
- date: Nov 9, 00:06 UTC
  title: The project's GitHub release for v13.3.0 goes public
- date: Nov 9, 00:09 UTC
  title: npm publishes the affected 13.3.0 package
  body: The manifest runs scripts/generate-version.cjs as a postinstall hook and includes npm provenance metadata.
- date: Nov 9, 00:51 UTC
  title: Bitbison publishes its artifact and payload analysis
  body: The researcher documents collection of Swarm Desktop key material and a persistent Linux remote-access agent.
checklist:
- title: Find and block the affected version
  hint: Check lockfiles, npm logs, CI build logs and registry proxy caches for @ethersphere/bee-js 13.3.0, including transitive dependencies. Block that exact version and identify every host and runner that may have installed it.
- title: Isolate systems that ran the install hook
  hint: Disconnect affected machines and retire exposed runners. Preserve logs, package artifacts and systemd state. Inspect other hosts built from the same images. After collecting evidence, purge cached copies of 13.3.0 and affected build outputs. Regenerate lockfiles to pin 13.2.0 and rebuild from trusted inputs on clean runners. Removing the package alone leaves any separately installed agent behind.
- title: Replace exposed keys and credentials
  hint: Check for exposure of the Swarm Desktop node configuration and key at ~/.local/share/Swarm Desktop/data-dir/keys/swarm.key. From a clean system, replace exposed node keys and review associated wallet activity. Follow Swarm's official guidance for moving assets if a wallet key was exposed. Revoke and rotate other credentials readable by the install user, including developer and CI tokens, and review their use.
- title: Hunt for the loader and observed Linux persistence
  hint: 'Review DNS and proxy logs for frameworkmetrics[.]xyz and api.frameworkmetrics[.]xyz, including /v1/analytics, /v1/swarm/report, /v1/assets/linux_amd64 and /v1/assets/linux_arm64. The initial request uses the Node platform as User-Agent and X-Ethersphere: 1. Check package/scripts/generate-version.cjs (SHA-256 ee2f762e9ed3fd89f106e0b80c2e923bf1aed9a280277d3d998a5902c4d9ec0f), ~/.solidity/linux_amd64, ~/.solidity/linux_arm64, ~/.solidity/.run.py and ~/.config/systemd/user/solidity-langsupport-runner.service. A match alone does not prove compromise.'
sources:
- name: Ethersphere GitHub release v13.3.0
  url: https://github.com/ethersphere/bee-js/releases/tag/v13.3.0
  primary: true
  says: The release API records the GitHub publication at 00:06 UTC.
- name: npm registry package and version history
  url: https://registry.npmjs.org/@ethersphere%2fbee-js
  primary: true
  says: Records publication time, the affected install hook and provenance metadata. The 13.2.0 manifest lacks that hook.
- name: Ethersphere source commit
  url: https://github.com/ethersphere/bee-js/commit/de2f74e784b2eafa0d66fbb6d88b42ea11ee34cf
  primary: true
  says: Shows the manifest change and loader executing the HTTPS response with the install user's privileges.
- name: Bitbison artifact analysis
  url: https://github.com/sbahra/malicious-packages/blob/ee17a453788ff7bab9ce229a7f332b16c83c06a8/osv/malicious/npm/@ethersphere/bee-js/MAL-0000-ethersphere-bee-js.json
  primary: true
  says: Documents the observed Swarm key collection, Linux binaries and persistence indicators.
- name: StepSecurity initial investigation
  url: https://www.stepsecurity.io/blog/ethersphere-bee-js-13-3-0-compromise
  primary: true
  says: Confirms the install-time loader and wallet targeting. Weekly download data covers all versions.
---

Version 13.3.0 changes a version-generation script into an npm postinstall loader. Installing the package with lifecycle scripts enabled can execute server-supplied code as the install user before an application imports the dependency. The loader sends an HTTPS request and executes the response. It does not need Swarm Desktop installed to start. Swarm Desktop key collection depends on the files being present and readable.

Bitbison observed a payload reading the Swarm Desktop configuration and node key, posting them to the same domain and installing a Linux user service that runs a remote-access agent. These observations describe a payload served during research. Its server can vary the response, so missing Linux files do not rule out execution. npm's provenance points to the project workflow, and the source commit itself contains the loader. The entry point into the release process remains unknown.

The registry still listed 13.3.0 as latest when checked. Pin the exact prior version during containment. The November 9 UTC incident date follows the registry publication and Bitbison's timestamped report. StepSecurity labels its initial notice November 8 without a timezone. Its 3,560-download figure covers all releases in the week before 13.3.0 and gives no count of affected installations. No victim count or stolen amount has been verified.
