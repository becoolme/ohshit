---
title: Malicious mcp-aevo-server package steals Aevo credentials and wallet keys
date: '2026-11-17'
level: 3
tags: [PyPI, Malware, MCP, Cryptocurrency]
ecosystems: [python]
summary: Researchers identify six malicious mcp-aevo-server releases targeting users of Aevo trading tools through an unclaimed PyPI name. Analysis finds credential theft and remote-command functionality. No patched release or confirmed victim/loss total is reported; stop the server and replace exposed secrets from a clean system.
splash: Hosts or CI jobs that ran the listed mcp-aevo-server releases, especially with Aevo API credentials or wallet private keys in their environment.
wipe: Stop and isolate the affected server, remove the package from clean tooling, rebuild, and revoke API credentials and replace exposed wallet keys.
inTheWild: unknown
inTheWildNote: Malicious releases are identified; actual victim executions and losses are not quantified.
cves:
- id: GHSA-g97f-vppp-p428
  name: Malicious mcp-aevo-server distribution
  description: The reported package targets an unclaimed dependency name, exfiltrates environment credentials and includes a background remote-command listener.
fixed:
- product: mcp-aevo-server 0.2.0, 0.2.0.post1, post2, post3, post4 and post6
  version: none
  status: Malicious releases; no patched version listed
timeline:
- date: Nov 17, 14:45 UTC
  title: Research catalog records the malicious package
  body: MAL-2026-20068 lists six affected versions. This is a disclosure/catalog timestamp, not an established attack start date.
- date: Nov 18, 00:32 UTC
  title: OpenSSF record incorporates Amazon Inspector findings
  body: The record revision describes server-start credential collection, Telegram delivery, an optional telemetry URL and disk-spooled retries, with evidence for the post1 artifacts.
checklist:
- title: Stop the server before using the affected environment again
  hint: Stop its MCP server, agent and dependent jobs, isolate the host or runner and preserve logs and package evidence. Inventory mcp-aevo-server in lockfiles, environment metadata, MCP launch commands and CI definitions without starting the package. The flagged versions are exactly 0.2.0, 0.2.0.post1, 0.2.0.post2, 0.2.0.post3, 0.2.0.post4 and 0.2.0.post6; an unlisted version is not thereby verified safe. The documented trigger is server startup, not a demonstrated install-only trigger.
- title: Replace exposed credentials and wallet material from a clean system
  hint: Review AEVO_API_KEY, AEVO_API_SECRET, AEVO_SIGNING_KEY_PRIVATE_KEY and AEVO_WALLET_PRIVATE_KEY supplied to the process. Revoke and reissue API credentials through the established service; treat an exposed wallet private key as compromised and move remaining assets to a fresh securely generated wallet using trusted tooling. Check permissions, trades and transfers, and rotate other secrets accessible to a remotely controlled process. These are response recommendations, not proof that a particular account lost funds.
- title: Rebuild and remove the malicious dependency path
  hint: From clean tooling remove the package from dependencies and MCP/agent launch configuration, then rebuild affected environments using reviewed sources and artifacts. Do not launch the malicious server to uninstall or test it. The report targets users of ribbon-finance/aevo-trading-skills referencing an unclaimed PyPI name; verify package ownership and repository references rather than trusting a familiar project name. No safe replacement release is established. AEVO_TELEMETRY=0 is not a recovery procedure and cannot undo prior leakage or remote commands.
- title: Hunt using the reported sample evidence and process context
  hint: The detailed report names src/mcp_aevo_server/_telemetry.py, main() calling _telemetry.arm(), api.telegram.org/bot8867174343:.../sendMessage and chat 8838719553, plus configurable AEVO_TELEMETRY_URL and disk-spooled retries. The bot token is redacted in the source. Correlate Telegram requests with the affected process and bot/chat identifiers; the shared api.telegram.org domain alone is not malicious. The post1 telemetry file SHA-256 is 8e8a5a24dc15128554984123aa90662fc6a06d0c507e1375ef948e4f02bee299 (TLSH 05328359fd5a6c33c253c56dc822c561e33a79073a41a934faac43296f5e03982fd6ec). mcp_aevo_server-0.2.0.post1-py3-none-any.whl has SHA-256 e1d7c618697ec9160ac82314e2845ee2af80b7023bbd2a6fe192ae60d0cc458d, MD5 b7fc9ab6309f85d55c3a96af4027c378 and BLAKE2b-256 c9aa2f56b7c605c932f947fca7679e0000a98971afd4ecc44a007b15681d789b; mcp_aevo_server-0.2.0.post1.tar.gz has SHA-256 4540499b3cf6261c04b5cd3f7b31786fa2b52e400df29f30f6b1aff7bad87d8f, MD5 1d1f9207b19f14ad7816a69f9fbc9d77 and BLAKE2b-256 b5a65577f6349096b97cde77cf0c328129b441afa700df6ac7a61eaa84fa7323. These fingerprints cover the reported sample, not every version. Source/origin report digests in OpenSSF are not package-artifact hashes. A network or file match alone does not prove execution or account compromise.
sources:
- name: Kamil Mańkowski's original package report
  url: https://bad-packages.kam193.eu/pypi/package/mcp-aevo-server/
  primary: true
  says: Identifies the targeted project/unclaimed-name path, six affected releases, environment theft, Telegram use and a remote-command listener whose command set is uncertain.
- name: OpenSSF report revision with Amazon Inspector findings
  url: https://raw.githubusercontent.com/ossf/malicious-packages/15a626ef6f7aa6dd923069570e87918f76efcc7b/osv/malicious/pypi/mcp-aevo-server/MAL-2026-20068.json
  primary: true
  says: Preserves the original disclosure timestamp and adds startup/secret/Telegram/retry behavior and post1 evidence. Metadata origin digests identify reports, not malware artifacts.
- name: GitHub malware advisory
  url: https://github.com/advisories/GHSA-g97f-vppp-p428
  primary: true
  says: Lists the same six releases, no patched version and both OpenSSF revisions. This is redistribution of researcher reports, not independent confirmation of victim losses.
---

Kamil Mańkowski reports that the PyPI package targeted users of ribbon-finance/aevo-trading-skills, which referenced an unclaimed package name. The finding concerns a malicious distribution, not confirmed compromise of Aevo's exchange infrastructure or of the legitimate project's repository. The reports identify credential exfiltration and a remote-command thread, possibly limited to a specific command set; they do not establish unrestricted shell control or publish a victim count or confirmed stolen-funds total.

Amazon Inspector's analysis, preserved in the OpenSSF revision linked by GitHub, describes `main()` invoking `_telemetry.arm()` at server start. It collects Aevo API secrets and wallet/signing keys, hostname, operating-system user, working directory, arguments and names of environment variables prefixed `AEVO_` or `UV_`. Full secret values are enabled by default and sent in cleartext within the message payload to a Telegram bot; this does not mean the HTTPS transport itself is unencrypted. A configured telemetry URL receives the same data, with disk spooling for retries across restarts. Calling the code telemetry does not make this collection harmless.

The detailed post1 file/artifact fingerprints are not a claim that every flagged version has identical bytes or behavior. This is rated L3 because the published malicious integration can expose trading and wallet credentials, while deployment reach and confirmed victim impact remain unknown. Downloading or finding a package proves neither that its server ran nor that credentials were stolen; a process that did run with these secrets warrants the containment and replacement steps above.
