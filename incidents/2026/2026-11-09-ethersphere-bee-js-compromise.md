---
title: Compromised Bee JS and Swarm Desktop releases stole node keys and installed remote access
level: 4
date: '2026-11-09'
updated: 2026-11-12
tags: [npm, Swarm, Supply chain]
ecosystems: [node]
summary: Swarm confirms @ethersphere/bee-js 13.3.0 and Swarm Desktop 0.56.2 were malicious and removed. The payload stole node keys and installed remote access. Pin npm 13.2.0, use Desktop 0.56.3, isolate affected hosts and protect funds from a clean device.
splash: Systems that ran Swarm Desktop 0.56.2 or installed @ethersphere/bee-js 13.3.0 with lifecycle scripts enabled.
wipe: Block npm 13.3.0 and Desktop 0.56.2. Use verified 13.2.0 and 0.56.3 on clean hosts. Move funds and stake from exposed keys.
inTheWild: 'yes'
inTheWildNote: Swarm confirms the published releases stole node keys and installed remote access.
fixed:
- product: '@ethersphere/bee-js'
  version: '13.2.0'
  status: Prior release without this install hook. Pin this exact version.
- product: Swarm Desktop
  version: 0.56.3
timeline:
- date: Nov 9, 00:06 UTC
  title: The project's GitHub release for v13.3.0 goes public
- date: Nov 9, 00:09 UTC
  title: npm publishes the affected 13.3.0 package
  body: The manifest runs scripts/generate-version.cjs as a postinstall hook and includes npm provenance metadata.
- date: Nov 9, 00:51 UTC
  title: Bitbison publishes its artifact and payload analysis
  body: The researcher documents collection of Swarm Desktop key material and a persistent Linux remote-access agent.
- date: Nov 9, 12:52 UTC
  title: Swarm Desktop publishes replacement 0.56.3
  body: Swarm confirms the compromised Desktop and npm releases were removed.
- date: Nov 11, 2026
  title: SafeDep expands the release and persistence findings
  body: SafeDep reports loaders in all nine Desktop 0.56.2 installers and links the payload to SleepyDuck via shared implants and Ethereum control infrastructure. The route into the affected GitHub accounts and infected-host totals remain unknown.
checklist:
- title: Find and block the affected version
  hint: Check lockfiles, npm logs, CI build logs and registry proxy caches for @ethersphere/bee-js 13.3.0, including transitive dependencies. Check application inventories and auto-update logs for Swarm Desktop 0.56.2. Block that exact version and identify every host and runner that may have installed it.
- title: Isolate systems that ran either compromised release
  hint: Disconnect affected machines and retire exposed runners. Preserve logs, package artifacts and systemd state. Inspect other hosts built from the same images. After collecting evidence, purge cached copies of 13.3.0 and affected build outputs. Regenerate lockfiles to pin 13.2.0 and rebuild from trusted inputs on clean runners. Inspect Desktop 0.56.2 hosts as well and replace the client with 0.56.3 after containment. A separately installed agent can persist after package removal.
- title: Replace exposed keys and credentials
  hint: Check for exposure of the Swarm Desktop node configuration and key at ~/.local/share/Swarm Desktop/data-dir/keys/swarm.key. From a clean system, replace exposed node keys and review associated wallet activity. Follow Swarm's official guidance for moving assets if a wallet key was exposed. Revoke and rotate other credentials readable by the install user, including developer and CI tokens, and review their use.
- title: Hunt for the loader and observed Linux persistence
  hint: 'Review DNS and proxy logs for frameworkmetrics[.]xyz and api.frameworkmetrics[.]xyz, including /v1/analytics, /v1/swarm/report, /v1/assets/linux_amd64 and /v1/assets/linux_arm64. The initial request uses the Node platform as User-Agent and X-Ethersphere: 1. Check package/scripts/generate-version.cjs (SHA-256 ee2f762e9ed3fd89f106e0b80c2e923bf1aed9a280277d3d998a5902c4d9ec0f), ~/.solidity/linux_amd64, ~/.solidity/linux_arm64, ~/.solidity/.run.py and ~/.config/systemd/user/solidity-langsupport-runner.service. A match alone does not prove compromise.'
- title: Hunt for macOS and Windows persistence
  hint: "On macOS, check ~/.solidity/ and the LaunchAgent named com.solidity.langsupport.runner. On Windows, check for ScreenConnect Client (5cbe79c9c25524df), relay 185[.]232[.]84[.]169:8041, invoke.ps1 and .stuffed-* staging traces under %TEMP%. Preserve evidence before removing unauthorized agents and persistence. Rebuild from a trusted image if you cannot verify cleanup. Look in bee-desktop.log for Bee Desktop version: 0.56.2 (production), and in proxy logs for /v1/electron and 193[.]57[.]9[.]155:4912. Compare the full indicator lists; a match alone does not prove compromise. Correlate the instance ID and relay to exclude legitimate ScreenConnect clients. Also check mirrors, proxies, developer caches and retained source archives for the removed release."
sources:
- name: Ethersphere GitHub release v13.3.0
  url: https://github.com/ethersphere/bee-js/releases/tag/v13.3.0
  primary: true
  says: The release API recorded the GitHub publication at 00:06 UTC before removal.
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
- name: Swarm Desktop replacement release
  url: https://github.com/ethersphere/swarm-desktop/releases/tag/v0.56.3
  primary: true
  says: 0.56.3 replaces compromised Desktop 0.56.2. The release API dates publication to 12:52 UTC.
- name: Swarm official security notice (public embed)
  url: https://publish.twitter.com/oembed?url=https://x.com/ethswarm/status/2119764040008491491
  primary: true
  says: Confirms both malicious releases were removed, describes key theft and remote access, and tells Desktop users to move funds and stake.
- name: SafeDep original analysis and November 11 update
  url: https://safedep.io/blog/ethersphere-bee-js-npm-compromise
  primary: true
  says: Analyzes the platform payloads, affected installers, release-account activity, retained artifacts and campaign overlap.
- name: Socket original cross-platform and on-chain analysis
  url: https://socket.dev/blog/bee-js-compromise
  primary: true
  says: Documents updater eligibility, platform persistence and the Ethereum infrastructure shared with SleepyDuck.
---

Version 13.3.0 changes a version-generation script into an npm postinstall loader. Installing the package with lifecycle scripts enabled can execute server-supplied code as the install user before an application imports the dependency. The loader sends an HTTPS request and executes the response. It does not need Swarm Desktop installed to start. Swarm Desktop key collection depends on the files being present and readable.

Bitbison observed a payload reading the Swarm Desktop configuration and node key, posting them to the same domain and installing a Linux user service that runs a remote-access agent. These observations describe a payload served during research. Its server can vary the response, so missing Linux files do not rule out execution. npm's provenance points to the project workflow, and the source commit itself contains the loader. The entry point into the release process remains unknown.

The registry now lists 13.2.0 as latest and no longer serves 13.3.0 in the package metadata. Check internal caches and lockfiles for copies. The November 9 UTC incident date follows the registry publication and Bitbison's timestamped report. StepSecurity labels its initial notice November 8 without a timezone. Its 3,560-download figure covers all releases in the week before 13.3.0 and gives no count of affected installations. No victim count or stolen amount has been verified.

Swarm’s notice confirms that both release channels carried malicious code and directs users who updated Desktop to move funds and stake immediately. Use a separate clean system and follow verified Swarm instructions. Replace Desktop 0.56.2 with 0.56.3 after investigating and cleaning or rebuilding the host. The maintainer’s confirmation of key theft and remote access warrants L4. The scope and amount of any losses remain unverified.

SafeDep reports that all nine Swarm Desktop 0.56.2 installers contained the loader. The macOS app was signed and notarized. Socket found that the updater could offer the release to Apple Silicon and Windows x64 installations. An update offer or download does not establish execution. SafeDep found 13 GitHub pushes attributed in activity logs to a maintainer account on November 6, with unsuccessful attempts to steal CI credentials via injected workflows, and linked the malicious releases to the release bot. How the accounts were accessed remains unknown. Both research teams link the releases to the earlier SleepyDuck Open VSX campaign through the same Ethereum configuration contract, controlling wallet and matching implants. The link does not establish an infected-host count or amount stolen.

Use [SafeDep’s stage-one indicators](https://safedep.io/blog/ethersphere-bee-js-npm-compromise#indicators-of-compromise), [its 65 later-stage indicators in CSV](https://safedep.io/data/blogs/ethersphere-bee-js-stage2-3-iocs.csv) and [Socket’s 43 published indicators](https://socket.dev/blog/bee-js-compromise#Indicators-of-Compromise-%28IOCs%29). The lists overlap. Check the source notes for historical relays and unverified hashes.
