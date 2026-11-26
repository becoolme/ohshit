---
title: "Hex.pm confirms command execution on six registry servers; account data and signing key may have been read"
headline: "The package registry needs an account reset"
level: 4
date: 2026-11-24
updated: 2026-11-26
tags: [Hex, Elixir, Erlang, supply-chain, RCE]
ecosystems: [elixir, erlang]
summary: >-
  Hex confirmed 69 exploit requests hit six servers on November 23. It found no package tampering, but cannot rule out database or private-package reads. Change account passwords, reset enabled 2FA, reauthenticate clients and use only repo.hex.pm while the registry signing-key replacement is pending.
splash: "Hex.pm accounts and private organizations; self-hosted hexpm servers with the vulnerable Erlang-term request parser"
wipe: "Reset account credentials and reauthenticate clients; avoid mirrors, await the signing update, and patch self-hosted hexpm"
inTheWild: 'yes'
inTheWildNote: "Hex confirms command execution on six web servers on November 23, 2026."
oneLiner: >-
  An unauthenticated request supplied fake Elixir structs; error reporting inspected them and followed library callbacks into operating-system command execution as the server process.
cves:
  - id: CVE-2026-129514
    score: 10.0
    name: Unauthenticated Erlang-term deserialization RCE
    description: "The hexpm request parser accepted attacker-controlled struct maps before routing and authentication. Inspect and Enumerable protocol dispatch reached a command-execution callback; the CNA gives CVSS 4.0 10.0."
  - id: CVE-2026-133555
    score: 8.9
    name: Forged DBConnection stream callback gadget
    description: "db_connection 1.1.0 through versions before 2.10.3 can invoke a forged stream’s :log callback. Exploitation requires a downstream component to decode untrusted structs and enumerate or inspect them; the library alone is not exploitable. CVSS 4.0 8.9."
fixed:
  - product: Hosted hex.pm service
    version: "2026-11-23"
    status: "Patched everywhere by 18:31 UTC"
  - product: Self-hosted hexpm/hexpm
    version: "379b0a29bcc95164249f38ad7d772a37a8ff9533"
    status: "Deploy this fix or a build containing it"
  - product: Registry signing-key replacement / new Hex client
    version: none
    status: "Announced; release with the new signing system pending"
  - product: db_connection library hardening
    version: "2.10.3"
    status: "Closes this stream gadget; does not fix an unsafe downstream decoder"
timeline:
  - date: Feb 23, 2016
    title: The request decoder loses its struct safety check
    body: "The advisory traces the affected server code to commit ab1bbcef7cc8395d1056d3b1aa6a174353492d59. This is not evidence of exploitation throughout that period."
  - date: Nov 23, 2026, 18:16–18:29 UTC
    title: Hex records 69 malicious requests and command execution on six web servers
    body: "The final request reaching a vulnerable server was at 18:29:33. A restart during the attack brought up three more servers on the old build."
  - date: Nov 23, 2026, 18:30–18:31 UTC
    title: All servers are replaced with the patched build
    body: "A firewall rule added at 18:27 took effect between 18:30 and 18:33; requests from the attacking address were denied from 18:33:48 onward."
  - date: Nov 23, 2026, 18:49 UTC
    title: Hex deactivates the affected servers' AWS access key
    body: "Most infrastructure credentials were rotated by 20:21. Hex later notified Sweden's IMY, CISA and ENISA."
  - date: Nov 24, 2026, 10:42 UTC
    title: Most readable credentials have been replaced, with signing-key exceptions
    body: "By this time the database password was also rotated. The registry signing key and a few low-impact secrets remained exceptions; the client/signing-system replacement was still being prepared."
  - date: Nov 24, 2026, 13:48 UTC
    title: Hex publishes the CVE
    body: "The incident report is dated November 24. It confirms exploitation but separates that from unproven database reads and package tampering."
  - date: Nov 24, 2026
    title: DBConnection publishes hardening for the stream callback used in the chain
    body: "GHSA-gmmq-fw75-wq46 / CVE-2026-133555 covers db_connection >=1.1.0 and <2.10.3. Its advisory explicitly requires a downstream unsafe decoder; installing the library alone does not create an exploitable entry point."
checklist:
  - title: Change the password on an existing Hex account
    hint: "Open https://hex.pm yourself and use Dashboard → Security. The database may have exposed email addresses and bcrypt password hashes; a weak password can still be guessed. GitHub-only accounts do not need an invented Hex password reset. Users who never registered and only fetch public packages have no account credentials to reset."
  - title: Replace an enabled authenticator and store new recovery codes
    hint: "At https://hex.pm/dashboard/security, choose Authenticator App → Setup New App and verify a code from the replacement entry. This generates a new secret and recovery codes; confirm and save the new codes. This also works when organization policy prevents disabling 2FA, and applies to GitHub sign-ups with 2FA enabled."
  - title: Authenticate Hex clients again
    hint: "The service rotated session/access-token signing keys and logged users out. Run mix hex.user auth, or rebar3 hex user auth for that client. GitHub sign-ups also need to reauthenticate. For 'Failed to exchange API key for OAuth token', the maintainer asks for mix hex.user whoami diagnostics, then removal of ~/.hex/hex.config and another mix hex.user auth. Before removing that file, keep a protected backup and note custom repository settings; restore only settings you have reviewed. Do not publish tokens or the contents of credential files when asking for help."
  - title: Use the official repository and install the signing update when it ships
    hint: "Fetch only from repo.hex.pm; inspect local and CI repository/mirror settings and avoid third-party mirrors while signing-key rotation is pending. Watch the official incident report and Hex releases for the new signing system. When that release is available, run mix local.hex --force and update rebar3 or Gleam if used. An update to today's client alone does not establish that the signing key was replaced."
  - title: Review organization access and private-package exposure
    hint: "Hex will contact affected organizations directly. Review account audit activity and package publications; preserve lockfiles, cached artifacts and relevant CI logs if anything is unexpected, and contact support@hex.pm. Private storage reads and documentation reads cannot all be excluded. The report does not establish a count of accounts whose data was taken or a compromised package version."
  - title: Patch and investigate any self-hosted hexpm server
    hint: "Deploy commit 379b0a29bcc95164249f38ad7d772a37a8ff9533 or a build containing it, replacing every web, worker and job server. Review unauthenticated POSTs with Content-Type application/vnd.hex+erlang on all routes, Sentry/HTTP error records, process and cloud audit logs. The chain uses __struct__, Ecto.Query.DynamicExpr, DBConnection.Stream and its :log callback; a 500 response or matching string alone does not prove exploitation. If compromised, preserve evidence, replace exposed infrastructure/session/token secrets and rebuild trusted servers; assess registry signing-key rotation separately."
  - title: Treat Hex-themed mail cautiously without rotating API keys solely for exposed hashes
    hint: "Check links lead to hex.pm and forward suspicious mail to security@hex.pm. Hex says API secrets are random 128-bit values stored as HMAC-SHA256 and does not require API-key rotation merely because those hashes may have been read. Revoke a key if other evidence shows its actual secret or use was compromised."
  - title: Apply dependency hardening without leaving the unsafe decoder in place
    hint: "If your application uses db_connection, update to 2.10.3 or later and confirm the resolved version in mix.lock and deployed builds. Audit :erlang.binary_to_term/2 and Plug.Crypto.non_executable_binary_to_term/2 paths that handle untrusted input before enumeration or inspection; :safe does not reject structs. Patch the downstream decoder as well. Other struct gadgets may remain after this library update, and it does not replace the hexpm server fix or pending registry-signing update."
sources:
  - name: Hex incident report
    url: https://hex.pm/blog/security-incident-on-hexpm
    primary: true
    says: "Confirms the attack, investigation limits, credential response, pending registry signing-key replacement and account instructions."
  - name: Erlang Ecosystem Foundation CNA
    url: https://cna.erlef.org/cves/CVE-2026-129514.html
    primary: true
    says: "Server prerequisites, affected date/commit ranges, active exploitation and CVSS 4.0 10.0."
  - name: hexpm GitHub security advisory
    url: https://github.com/hexpm/hexpm/security/advisories/GHSA-9pmm-hf4r-27pg
    primary: true
    says: "GHSA alias, server-side scope and patched service date/source commit."
  - name: hexpm decoder fix
    url: https://github.com/hexpm/hexpm/commit/379b0a29bcc95164249f38ad7d772a37a8ff9533
    primary: true
    says: "Rejects nested struct maps and returns an error instead of passing them into request parameters."
  - name: Hex maintainer clarification on Elixir Forum
    url: https://elixirforum.com/t/hex-pm-security-incident/77503
    primary: true
    says: "Distinguishes anonymous package consumers and GitHub sign-ups; gives client reauthentication and new recovery-code guidance."
  - name: Hex client releases
    url: https://github.com/hexpm/hex/releases
    primary: true
    says: "Latest published release checked was v2.7.0, dated November 6; no new signing-system release was established."  - name: DBConnection maintainer advisory
    url: https://github.com/elixir-ecto/db_connection/security/advisories/GHSA-gmmq-fw75-wq46
    primary: true
    says: "November 24 publication; CVE-2026-133555, >=1.1.0 and <2.10.3, fixed in 2.10.3; requires an unsafe downstream decoder and is not independently exploitable."
  - name: EEF CNA record for the DBConnection gadget
    url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/133xxx/CVE-2026-133555.json
    primary: true
    says: "Confirms the related attack gadget, prerequisites and CVSS 4.0 8.9; links the decoder vulnerabilities and library fix."
---

Hex disclosed the incident on **November 24, 2026**. The attack occurred the previous day: unauthenticated commands ran on **six web servers**, after **69 malicious requests** reached the registry. This merits **L4** because a package registry was actively compromised and server-side credentials and account data were within reach. No evidence establishes malicious package distribution or an internet-wide compromise of Elixir applications.

The vulnerable component is the **hexpm server**, not a command-execution flaw in everyone's Hex client. Its Erlang-term body parser ran before authentication on every route. Rejecting functions and new atoms was insufficient: a map could name an existing Elixir module through `__struct__`. An error caused that value to be inspected; protocol dispatch through Ecto and DBConnection reached an attacker-selected callback. Commands ran with the BEAM process's operating-system permissions, not automatically host root.

The hosted service was patched on November 23. Self-hosted operators must deploy the decoder fix: the affected source range begins at `ab1bbcef7cc8395d1056d3b1aa6a174353492d59` and ends before `379b0a29bcc95164249f38ad7d772a37a8ff9533`. This service/source versioning is separate from Hex client version numbers. The server fix recursively rejects struct maps; related library hardening and the registry signing-system replacement are separate work described in the official report.

**What is confirmed, and what remains unknown:** Hex compared every database row against a pre-attack snapshot and reconciled the changes it found. All **23 package releases** during the attack matched audit records; **62 package files** and **186 registry files** written since 18:00 matched database checksums or contents. It found no unexpected package modification or lasting access. These checks do not prove that no data was read, nor can the database comparison catch every change that was reverted or overwritten. Documentation archives had no stored checksum for that comparison.

Database reads, environment-variable reads and shell commands were not logged. Potentially readable account data includes email addresses, password hashes, API-key hashes, 2FA secrets, sessions and audit logs. Reads of private packages from an already compromised server could resemble legitimate service traffic; direct storage reads of private documentation were not logged. There is no verified stolen-account total, confirmed signing-key theft or named malicious package release to publish.

Hex replaced infrastructure credentials and the keys used for sessions and access tokens, forcing users to sign in again. **The registry signing key is a different key and remained an exception in the report.** Maintainers were preparing a new signing system with client releases expected in the following days. Use the official repository and follow the release announcement; neither an operational status page nor installing an existing client release proves that rotation is complete.

For account holders, change the Hex password if one exists, replace enabled 2FA and save its new recovery codes, then reauthenticate clients. GitHub sign-ups still need the latter steps. Anonymous users who only download public packages have no account reset to perform, but should follow the repository and client-update guidance. Hex does not require blanket API-key replacement solely for possible exposure of its strongly randomized API-key hashes; actual secret exposure or suspicious use is a separate reason to revoke one.

The DBConnection hop now has its own advisory, **CVE-2026-133555 / GHSA-gmmq-fw75-wq46**, published November 24. It covers **db_connection >=1.1.0 and <2.10.3**, with hardening in **2.10.3**. A forged `DBConnection.Stream` or `DBConnection.PrepareStream` carries a `:log` callback selected by the attacker. The maintainers explicitly say the library is not exploitable alone: an application or dependency must first decode untrusted terms into structs and enumerate or inspect them. Upgrading this library closes this gadget, but other structs can provide alternative gadgets if the unsafe decoder remains. This is a defense within the existing Hex attack chain, not evidence of a separate registry intrusion. The maintainer’s forum post also directs Ash and Flop users to their separate updates; see [Ash keyset decoding](/incidents/ash-keyset-struct-injection/) and [Flop cursor decoding](/incidents/flop-cursor-struct-rce/).
