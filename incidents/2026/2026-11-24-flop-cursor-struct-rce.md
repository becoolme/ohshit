---
title: Flop fixes remote code execution through forged pagination cursors in four release lines
level: 3
date: '2026-11-24'
tags:
- Elixir
- Flop
- Ecto
- Deserialization
- RCE
ecosystems:
- elixir
summary: Flop can decode a client pagination cursor into forged structs that execute a callback during Ecto error formatting. Fixed releases are 0.26.7, 0.27.3, 0.28.1 and 0.29.2. Upgrade the applicable line, or disable cursor pagination; public PoC does not establish real-world Flop exploitation.
splash: Flop apps passing client parameters to cursor pagination; the demonstrated path uses Ecto, DBConnection and :naive_datetime sorting
wipe: Upgrade Flop to 0.26.7, 0.27.3, 0.28.1 or 0.29.2; temporarily exclude :first and :last from pagination_types
inTheWild: unknown
inTheWildNote: CNA publishes a PoC; it does not confirm attacks against Flop applications.
cves:
- id: CVE-2026-130411
  score: 9.2
  name: Unsafe struct decoding in pagination cursors
  description: A forged DateTime nested in an after/before cursor can reach Inspect/Enumerable dispatch and an attacker-selected callback during a failed Ecto cast. CNA CVSS 4.0 9.2 requires the application path.
fixed:
- product: Flop >=0.8.0 and <0.26.7
  version: 0.26.7
  status: Upgrade this range
- product: Flop 0.27.x
  branch: '0.27'
  version: 0.27.3
  status: Patched
- product: Flop 0.28.x
  branch: '0.28'
  version: 0.28.1
  status: Patched
- product: Flop 0.29.x
  branch: '0.29'
  version: 0.29.2
  status: Patched
timeline:
- date: Nov 24, 2026
  title: Flop publishes four patched releases and the CNA disclosure
  body: Hex records publication of 0.29.2, 0.28.1, 0.27.3 and 0.26.7 between 14:51:06 and 14:56:12 UTC. The patch rejects struct-bearing cursors and changes how supported values are encoded.
checklist:
- title: Locate client-controlled cursor pagination
  hint: 'Inspect mix.lock for flop: >=0.8.0 <0.26.7, >=0.27.0 <0.27.3, >=0.28.0 <0.28.1 or >=0.29.0 <0.29.2. Trace request parameters passed to Flop.validate_and_run/3 or related functions. Cursor pagination is allowed by default; the demonstrated chain sorts on :naive_datetime with Ecto and DBConnection loaded.'
- title: Update the applicable Flop line and deploy rebuilt applications
  hint: 'Install 0.26.7, 0.27.3, 0.28.1 or 0.29.2 as appropriate, update the dependency constraint/lockfile and replace all running instances. Old cursors containing structs are rejected. Test fresh and old cursor handling, date/time and decimal ordering, and any custom sort types: the encoder now uses plain representations and the schema type must cast them correctly.'
- title: Disable cursor pagination if patching must wait
  hint: 'Set pagination_types so it excludes both :first and :last, for example pagination_types: [:page, :offset]. Apply this to every exposed schema or call-site override and test a crafted or stale after/before parameter is not decoded. Removing only a UI pagination button does not protect the server route.'
- title: Investigate error-time execution and preserve evidence
  hint: Review request/cursor, application, database and process logs for abnormal DateTime/NaiveDateTime values, Ecto.Query.CastError, Inspect.Error, Ecto.Query.DynamicExpr or DBConnection.Stream and its :log option. An exception can occur after the callback has run; an error response does not show that execution was blocked. The sources give no campaign IP/hash list; a matching type or error alone is not proof. If compromised, isolate the application, rotate accessible credentials, inspect persistence and rebuild from trusted inputs.
sources:
- name: EEF CNA Flop advisory
  url: https://cna.erlef.org/cves/CVE-2026-130411.html
  primary: true
  says: Four affected ranges and fixes, demonstration prerequisites, public PoC and pagination_types workaround.
- name: Flop cursor fix
  url: https://github.com/woylie/flop/commit/6382b932ce85872b5dcce78e45731dc9ce3be438
  primary: true
  says: Rejects structs on decode and converts structs to plain representations on encode.
- name: Hex Flop release metadata
  url: https://hex.pm/api/packages/flop
  primary: true
  says: Confirms all four fixed releases were published on November 24, 2026.
---

Flop disclosed **CVE-2026-130411** on November 24, 2026. The CNA publishes a proof of concept and rates it **CVSS 4.0 9.2**. We rate it L3 for a demonstrated execution path in an application library; no Flop victim count or real-world exploitation is confirmed by these sources.

Exposure requires an application to accept request parameters for cursor pagination, which Flop permits by default. The demonstrated route uses `Flop.validate_and_run!`, a schema sorted on an Ecto `:naive_datetime` field, and Ecto/DBConnection in the application. The attacker-controlled module and function atoms must already exist in the VM. This is not a claim that every Ecto query or all Elixir installations are remotely exploitable.

The `:safe` option to Erlang term decoding rejects several dangerous term types but still permits maps impersonating structs. A forged `DateTime` with a nested struct in its year field survives the initial cast. A later Ecto cast fails; error formatting inspects the value and reaches protocol implementations in Ecto and DBConnection. Those callbacks can run an attacker-selected function before the request reports its error. The published PoC prints a marker; the CNA describes the broader code-execution impact with application process privileges.

Install **0.26.7, 0.27.3, 0.28.1 or 0.29.2**, matching the affected range. The earliest vulnerable release listed is 0.8.0. The fix rejects struct-bearing cursors and encodes supported date/time and decimal values as strings, with other structs converted to maps. Review custom cursor types and how clients recover from invalidated old cursors. If an update must wait, exclude both `:first` and `:last` from `pagination_types` to disable cursor pagination at the server.

This is separate from [Ash's unsigned keyset issue](/incidents/ash-keyset-struct-injection/) and the [Hex registry intrusion](/incidents/hex-registry-intrusion/). A shared DBConnection gadget does not prove the Hex attacker exploited Flop. The downstream callback is only one layer: rejecting untrusted structs at the application's decoding boundary remains necessary.
