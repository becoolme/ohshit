---
title: PromZard can execute JavaScript supplied through context property names
date: 2026-11-12
level: 3
tags: [Node.js, npm, Code injection]
summary: CERT/CC disclosed CVE-2026-127109 in promzard 4.0.0 and earlier. When a caller accepts attacker-controlled property names in the template context object, loading even a trusted template can execute JavaScript with the privileges of the Node.js process.
splash: Applications and tools using promzard 4.0.0 or earlier with context property names an attacker can influence.
wipe: Build the template context from explicit trusted property names, or disable the affected workflow until it can be changed.
inTheWild: unknown
inTheWildNote: The CERT/CC disclosure does not report confirmed exploitation.
cves:
  - id: CVE-2026-127109
    name: JavaScript code injection through context property names
    description: The template loader interpolates context property names into JavaScript source and evaluates it in the current Node.js context.
timeline:
  - date: Oct 13, 2026
    title: CERT/CC notifies PromZard
    body: CERT/CC lists this as the vendor notification date and says it did not receive a statement.
  - date: Nov 12, 2026
    title: CERT/CC publishes VU#685399
    body: The disclosure identifies affected releases up to and including 4.0.0 and advises callers to validate context keys.
checklist:
  - title: Locate direct and indirect uses of promzard
    hint: Inspect lockfiles and use npm ls promzard --all in installed projects. Check developer tooling, CI jobs and deployed applications, then trace how each call constructs the context object.
  - title: Construct contexts with explicit trusted property names
    hint: Copy expected values into a fresh object with fixed keys. Do not pass arbitrary property names from a request, environment map or parsed configuration into promzard. Test that unexpected input keys are rejected or dropped.
  - title: Disable exposed paths and review suspected execution
    hint: If you cannot control the keys at every call site, disable the affected workflow or replace the dependency. If you suspect code ran, isolate the affected runner or service, preserve evidence, rotate credentials available to that process and rebuild from trusted inputs before restoring it.
sources:
  - name: CERT/CC vulnerability note VU#685399
    url: https://www.kb.cert.org/vuls/id/685399
    primary: true
    says: Identifies the affected versions, exploitation prerequisite and recommended mitigation.
  - name: npm registry metadata
    url: https://registry.npmjs.org/promzard
    primary: true
    says: Shows 4.0.0 as the latest published version at the time of writing.
---

PromZard evaluates prompt templates with a caller-supplied context object. Its template loader uses the property names as formal parameters in generated JavaScript, then evaluates that source with Node.js. An attacker who controls a property name can inject code even when the template is trusted. Trace how each caller constructs the context to determine whether an attacker can reach that path.

This is L3 because it affects a widely distributed npm package and can lead to code execution in vulnerable callers. The npm registry still listed 4.0.0 as the latest published release on November 14, 2026. Check the registry and upstream guidance before relying on any subsequent upgrade.
