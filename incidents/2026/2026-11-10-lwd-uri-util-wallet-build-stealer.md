---
title: Malicious Rust crate and pull requests target wallet build credentials
level: 3
date: '2026-11-10'
tags: [Rust, supply chain, credential theft]
summary: The sapho11 account published a credential stealer as lwd-uri-util and tried to introduce it into wallet projects. Remove every version, check developer machines and CI for execution, and rotate any credentials the code could reach.
splash: Developer workstations or CI that built the crate, ran related PR code or installed the malicious Git dependency.
wipe: Remove the dependency, isolate exposed machines, rotate reachable secrets and verify release artifacts.
inTheWild: 'unknown'
inTheWildNote: Malicious artifacts and PRs were public; RustSec found no evidence of crate use.
cves:
- id: GHSA-8mh3-cf36-7xxq
  name: Malicious lwd-uri-util crate
  description: All eight published versions use a Cargo build script to collect credentials.
fixed:
- product: lwd-uri-util
  version: none
  status: Remove versions 0.1.0 through 0.1.7. The crate was removed from crates.io.
timeline:
- date: Nov 10, 2026
  title: Malicious PRs target Chainapsis and Zingo Labs repositories
  body: OpenSourceMalware documented CI credential uploads, a reviewer instruction meant to conceal the uploads, an injected dependency and a fake maintainer sign-in.
- date: Nov 10, 2026
  title: GitHub publishes the malware advisory
  body: GHSA-8mh3-cf36-7xxq lists eight affected versions and no patched release. OpenSourceMalware reports takedowns later that day.
- date: Nov 11, 2026
  title: RustSec publishes its advisory
  body: RUSTSEC-2026-0483 confirms removal from crates.io and says there was no evidence of actual crate use.
checklist:
- title: Stop builds and remove the malicious inputs
  hint: Pause suspect PR jobs. Check Cargo.toml, Cargo.lock and dependency graphs for lwd-uri-util 0.1.0 through 0.1.7, and JavaScript lockfiles for sapho11/zip321-uri. Inspect manifests and diffs without building the suspect checkout. Block the affected crate versions and Git source in mirrors and caches.
- title: Check for execution and preserve evidence
  hint: Review CI job logs, endpoint telemetry and proxy records for the repositories, files and destinations below. Preserve the relevant artifacts securely, especially lwd_uri_build_context.json, which contains plaintext secrets. A match alone does not prove exfiltration.
- title: Contain exposed credentials and verify release integrity
  hint: Isolate affected workstations and runners. From a clean device revoke credentials entered into the fake sign-in, reset sessions and replace reachable GitHub, cloud and registry tokens, SSH keys, wallet credentials and signing material if untrusted code ran. If Keplr MCP vaults or their decryption credentials may have been exposed, move remaining funds to a fresh wallet from a clean device. Review audit logs, signed releases and package uploads before resuming. Rebuild on clean runners using verified dependency locks.
sources:
- name: OpenSourceMalware original sapho11 investigation
  url: https://opensourcemalware.com/blog/cryptocurrency-being-targeted-in-multi-faceted-attack
  primary: true
  says: Documents the PRs, source analysis, companion Git dependency, phishing and takedowns.
- name: GitHub malware advisory
  url: https://github.com/advisories/GHSA-8mh3-cf36-7xxq
  primary: true
  says: Lists the affected releases and includes Amazon Inspector’s build script analysis.
- name: RustSec RUSTSEC-2026-0483
  url: https://rustsec.org/advisories/RUSTSEC-2026-0483.html
  primary: true
  says: Confirms removal, no patched version and no evidence of actual crate use.
---

Cargo can execute the crate’s `build.rs` during `cargo build`, `cargo check`, `cargo test` or an IDE’s automatic check of a checkout. The code looks for environment secrets, credentials and signing material. Variants have different conditions for sending data. OpenSourceMalware also found a companion Node.js stealer in `sapho11/zip321-uri` that attempts to run via lifecycle hooks when installed as a Git dependency. The researchers note that a module format mismatch may make the hook fail on current Node.js releases.

The targeted PRs do not establish that a wallet platform was compromised or that credentials or funds were stolen. Chainapsis closed its four PRs. OpenSourceMalware could not inspect the later `sapho11/zec-uri` repository before its removal, so its behavior is unconfirmed.

### Indicators to correlate

- GitHub account `sapho11` (ID `354695800`); repositories `sapho11/lwd-uri-util`, `sapho11/zip321-uri`, and unverified lead `sapho11/zec-uri`.
- PRs `chainapsis/vizor-wallet#1199` through `#1202`, `zingolabs/zingo-common#85` and `zingolabs/zingolib#3148`. The Rust output can appear at `target/*/build/lwd-uri-util-*/out/lwd_uri_build_context.json`.
- `api.sdklfghaljksdhfkjasdfhlkasdhfjklasdf[.]xyz/v1/tipcheck` and `api.sdklfghaljksdhfkjasdfhlasdhfjklasdf[.]xyz/v1/tipcheck`; `session-check.sapho11.workers[.]dev` paths `/v1/tipcheck`, `/auth` and `/auth/login`; `webhook[.]site` paths `/0a60608b-63de-480c-a441-38a8d107a9ea` and `/14b3cc9b-3275-4b63-8b93-f4d2669fbdc1`.
- Commit author email `sapho11@wp.pl`; variables `LWD_URI_NO_METRICS`, `LWD_URI_METRICS_URL`, `ZIP321_NO_TELEMETRY`, `VIZOR_DIAG_ENDPOINT`, `VIZOR_TIP_MIRROR`.
- Vizor commits containing original material: `c675b967588f370a1eace7c73b81f82343b29486`, `716e01d64b36c40b0cd4e6f7e4e813ed792388da`, `a1762b9db1a4207ab0d823556c50fe86ea1dfd43`.
- SHA-256 (`.crate`):
  - `0.1.0`: `129be19ca4d1d997d168af561e5cea12b0a401716a05720daf48072e470d7db5`
  - `0.1.1`: `10304aa2c167bb0d66800020fb1f983bc62bb5bec89239de9fddb129b523149a`
  - `0.1.2`: `6d35f023e3d87f8d4bc91a3bc670ae4681e9d85937146b9b0683d0f33eb0f55a`
  - `0.1.3`: `80c54ff4fe231c363db0c75cbb81f566ea4d10c266ec594165d840df13ab0973`
  - `0.1.4`: `476a207e057ec463ff045a2c0115c8a34ea8eab70e0abe4c1efd90ceb8b5161c`
  - `0.1.5`: `3b290a899d741be14f9bb9f3545279911f774608362f348654f10823774c2f87`
  - `0.1.6`: `5c848823a78313c47596bdf3c260e8862a02c7e48fa8ce718aca332f7b80c4fd`
  - `0.1.7`: `7c0fbaf582b9b4e674c108ed5b0cb2835b11369fbdb1ce7ac29d63e9321a6981`
- SHA-256 (0.1.7): `build.rs` `f466d5621525a4cf229e4a8377cd7285da5797eee77384253f1040a722765953`; `src/lib.rs` `ac82fd28228bfb55acbb9bfdd2f3a4b926c6d65e2965db5a34c11d1a76fbd762`; `Cargo.toml` `c469240c313d7da0d40b901e51e642b4efd61906e28849c1059b70451065ccca`.
- Phishing page SHA-256 (`/auth`): `d8671b8aed8771dba6b57bd51d2e42914c0df87bd9e9d148478a0fbc121e81e6`.
