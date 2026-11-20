---
title: Refitter schema fields can inject executable C# into generated clients
level: 3
date: '2026-11-17'
tags:
- Refitter
- code generation
- RCE
ecosystems:
- dotnet
summary: GHSA-h924-jfhp-9vjr reports code injection through schema names, discriminators, defaults and enums. A malicious OpenAPI document produces compiling code whose module initializer executes when its assembly loads. No fixed release is listed.
splash: Developers/CI consuming attacker-influenced OpenAPI; tested 2.3.1 and 2.4.0-preview.126
wipe: Suspend untrusted OpenAPI generation; inspect generated C# and await a verified fix
inTheWild: 'no'
inTheWildNote: Public reproduction; no confirmed in-the-wild attacks in the reviewed sources.
cves:
- id: GHSA-h924-jfhp-9vjr
  name: Schema-to-C# injection
  description: Default validation misses schema-derived literal/value sinks; assembly loading triggers execution without calling the client.
fixed:
- product: Refitter
  version: none
  status: No patch listed; endpoints tested, intermediate releases not tested
timeline:
- date: Nov 17, 2026
  title: Maintainer publishes the advisory
checklist:
- title: Stop generating from untrusted specifications
  hint: Include CLI, SourceGenerator and MSBuild inputs. Keep credentials out of isolated generation environments.
- title: Audit generated code before building or loading it
  hint: Inspect schema property names, discriminator fields/mappings, numeric defaults and integer enums. Default validation and the older 2.1.2 fix are insufficient.
- title: Track a complete upstream fix
  hint: Require C#-literal escaping or rejection across every affected schema sink; do not assume 2.4.0 is patched.
sources:
- name: Refitter original advisory
  url: https://github.com/christianhelle/refitter/security/advisories/GHSA-h924-jfhp-9vjr
  primary: true
- name: Refitter 2.4.0 template source
  url: https://raw.githubusercontent.com/christianhelle/refitter/2.4.0/src/Refitter.Core/CodeGeneration/CustomTemplateFactory.cs
  primary: true
---

The advisory reproduces execution on two releases; it does not demonstrate every intermediate version. L3 reflects a public code-generation exploit.

The independently read 2.4.0 template still interpolates `Discriminator` inside the `JsonPolymorphic` attribute without an escaping operation at that insertion. This corroborates the advisory’s source-level concern for that release, rather than claiming a new runtime reproduction. The code also loads NJsonSchema and NSwag template assemblies. Treat generated source as a trust boundary; a successful compile does not establish safety.

Isolation is a general precaution, not a confirmed complete workaround.
