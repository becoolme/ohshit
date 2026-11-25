---
title: Ash fixes code execution and SQL injection through unsigned keyset pagination cursors
level: 3
date: '2026-11-24'
tags:
- Elixir
- Ash
- Deserialization
- RCE
- SQL injection
ecosystems:
- elixir
summary: Ash 3.31.3 through versions before 3.38.0 can accept forged structs in unsigned keyset cursors. With specific sort types and the demonstrated AshPostgres path, this permits code execution or SQL injection. Upgrade to 3.38.0; on 3.37.0+, signing cursors is an interim mitigation.
splash: Ash apps accepting client keyset cursors, with no signing secret and struct-accepting sort fields; demonstrated on AshPostgres
wipe: Upgrade Ash to 3.38.0; on 3.37.0+, set a strong keyset_signing_secret while preparing the upgrade
inTheWild: unknown
inTheWildNote: The advisory provides a PoC; it does not confirm exploitation of Ash deployments.
cves:
- id: CVE-2026-124283
  score: 8.9
  name: Forged struct values in keyset cursors
  description: Unsigned client cursors can carry structs past expression and type checks, reaching protocol callbacks or raw SQL. CNA CVSS 4.0 8.9 uses AV:L and AT:P; exposure depends on the application.
fixed:
- product: Ash >=3.31.3 and <3.38.0
  version: 3.38.0
  status: Caller-side decoding fix
timeline:
- date: Nov 24, 2026
  title: Ash publishes its security advisory and 3.38.0
  body: The GHSA was published at 02:29:39 UTC; the Hex registry records 3.38.0 publication at 02:57:12 UTC. Unsigned cursors switch to JSON; signed terms require verification before decoding.
checklist:
- title: Find exposed keyset pagination paths
  hint: 'Check mix.lock for ash >=3.31.3 and <3.38.0. Trace read actions with pagination keyset?: true and client values passed to page[:after] or page[:before]. Check whether keyset_signing_secret is unset and sort fields include :ci_string, :map, :struct or :term. The advisory demonstrates AshPostgres with ecto 3.14.3 and db_connection 2.10.2; do not assume every Ash read is exposed.'
- title: Deploy Ash 3.38.0 and refresh affected cursors
  hint: 'Update the ash dependency constraint and lockfile, rebuild and deploy every application instance using the vulnerable library. The patch encodes unsigned keysets as JSON and validates decoded values; unsigned keysets issued by older releases stop working. Test fresh pagination, stale-cursor handling and sort-value serialization: values that cannot round-trip may no longer produce keysets. A keyset page sorted by a non-JSON value such as a tuple can raise; configure a signing secret to retain signed-term pagination for those types.'
- title: Use signing only where the installed release supports it
  hint: 'For Ash 3.37.0 or later, set config :ash, keyset_signing_secret: System.fetch_env!("ASH_KEYSET_SIGNING_SECRET") in config/runtime.exs, backed by a protected long random secret (the maintainer suggests mix phx.gen.secret). Use distinct secrets per environment and keep production secrets out of source control. Restart/redeploy every instance. Old unsigned cursors become invalid. Earlier affected releases must upgrade or stop accepting client keyset cursors; unsupported configuration is not mitigation.'
- title: Review errors and possible execution before restoring a suspected host
  hint: Preserve request, application, database and process logs. Investigate unexpected Ecto.Query.DynamicExpr, DBConnection.Stream, Ash.CiString and Ash.Query.Function.Fragment values, unusual cursor decode/cast errors, SQL or child processes. The PoC can execute code before returning an invalid-filter error, so an error response does not establish safety. A matching string alone is not proof. If compromised, isolate the service, rotate reachable secrets, investigate database actions and rebuild from trusted inputs.
sources:
- name: EEF CNA Ash advisory
  url: https://cna.erlef.org/cves/CVE-2026-124283.html
  primary: true
  says: Affected range, prerequisites, public PoC, signing workaround and score/vector.
- name: Ash maintainer advisory
  url: https://github.com/ash-project/ash/security/advisories/GHSA-m5v6-3qwf-6w9r
  primary: true
  says: Confirms 3.38.0 and the separate code-execution and SQL-injection paths.
- name: Ash decoder fix
  url: https://github.com/ash-project/ash/commit/8da3fe514975ac93682f8377c5439baefaf50bad
  primary: true
  says: Unsigned cursors become JSON; old unsigned keysets are rejected and signed terms remain verified.
- name: Hex Ash release metadata
  url: https://hex.pm/api/packages/ash
  primary: true
  says: 3.38.0 was published on November 24, 2026.
---

Ash disclosed this vulnerability on November 24, 2026. It affects **3.31.3 up to, but not including, 3.38.0**. A public proof of concept and possible server-side execution support L3; the advisory does not establish an Ash victim count or confirmed exploitation of Ash applications.

Exposure requires a read action with keyset pagination, a client-controlled `after` or `before` cursor, an unset `keyset_signing_secret`, and a sort field of type `:ci_string`, `:map`, `:struct` or `:term`. The published demonstrations use AshPostgres. Strict types such as `:integer` reject the forged struct. Do not turn this configuration-specific finding into a claim that every Elixir or Phoenix app is vulnerable. The CNA reports **CVSS 4.0 8.9**, with **AV:L/AT:P**; the application still determines whether an untrusted remote client can reach the vulnerable read.

The old decoder used Erlang term decoding in `:safe` mode, which blocks functions and new atoms but permits maps that impersonate existing structs. Ash's expression check did not inspect fields within a non-expression struct. With accepted sort types, a value could reach protocol dispatch during error formatting and invoke a DBConnection stream callback. The code-execution example used Ecto 3.14.3 and db_connection 2.10.2. A separate path wraps `Ash.Query.Function.Fragment` in `Ash.CiString` and reaches raw SQL, with the application's database privileges. Fixing only a downstream callback does not remove that SQL-injection or unsafe-decoding path.

**3.38.0 changes unsigned cursors to JSON** with embedded type conversion and round-trip checks. Signed Erlang terms remain supported only after signature verification. Existing unsigned cursors must be refreshed, and a keyset page sorted by values without a JSON form, such as tuples in a `:term` attribute, can raise an error. Configuring a signing secret retains signed-term pagination for those values. On 3.37.0 or later, a strong signing secret is the documented interim control; it also invalidates old unsigned cursors.

This is a distinct application-library advisory from the [Hex registry intrusion](/incidents/hex-registry-intrusion/) and the [Flop cursor issue](/incidents/flop-cursor-struct-rce/). The shared struct/callback technique does not establish that the Hex attacker exploited Ash or Flop deployments.
