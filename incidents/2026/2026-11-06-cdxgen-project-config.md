---
title: cdxgen repository configuration can execute commands despite scan safeguards
level: 3
date: '2026-11-06'
tags:
- cdxgen
- CI
- SBOM
summary: A malicious checkout can make cdxgen execute commands despite --no-install-deps and secure mode. Three companion advisories cover parser stalls, output symlinks and Git redirects. @cyclonedx/cdxgen 12.9.1 is fixed; the @cdxgen/cdxgen 13.x fix is planned for 13.7.0, with no patched release yet listed.
splash: Developers and CI scanning attacker-controlled checkouts with cdxgen; config execution requires running inside the checkout.
wipe: Use @cyclonedx/cdxgen 12.9.1; on 13.x apply the advisory workarounds until a verified patched release is available.
inTheWild: unknown
inTheWildNote: Public PoCs are available; no confirmed exploitation or victim count was reported.
cves:
- id: GHSA-phj7-7j69-xmfh
  name: Repository configuration command execution
  description: '@cyclonedx/cdxgen >=12.0.0,<12.9.1 and @cdxgen/cdxgen >=13.0.0 load unsafe project configuration from the working directory. Repository control can become code execution as the scanning user.'
- id: GHSA-4v76-rxfx-x42x
  name: CrewAI parser denial of service
  description: '@cyclonedx/cdxgen >=12.3.1,<12.9.1 and @cdxgen/cdxgen >=13.0.0 synchronously parse crafted CrewAI agents.py/tasks.py with quadratic regular expressions. CLI or ai-skill/ai server scans can stall.'
- id: GHSA-jgqw-xmhg-9rfm
  name: Output symlink file corruption
  description: '@cyclonedx/cdxgen >=8.1.6,<12.9.1 and @cdxgen/cdxgen >=13.0.0 follow an output-path symlink, overwriting a predictable writable target with generated BOM content, not arbitrary attacker-supplied bytes.'
- id: GHSA-7pxf-2399-4955
  name: Git redirect host-allowlist bypass
  description: '@cyclonedx/cdxgen >=11.2.5,<12.9.1 and @cdxgen/cdxgen >=13.0.0 allow Git HTTP redirects past host checks when an allowlisted host can redirect to an attacker-chosen destination.'
fixed:
- product: '@cyclonedx/cdxgen 12.x'
  version: 12.9.1
  status: Released fix for all four advisories
- product: '@cdxgen/cdxgen 13.x'
  version: none
  status: 13.7.0 planned; advisories list no patched release
timeline:
- date: Nov 6, 2026
  title: Maintainer publishes four advisories and public demonstrations
  body: The shared patch batch fixes 12.x in 12.9.1; 13.x source fixes are identified in PR 4759, with release 13.7.0 still planned.
checklist:
- title: Identify the package and verify its fix
  hint: Check package.json, the lockfile and the scanner image/build manifest for @cyclonedx/cdxgen versus @cdxgen/cdxgen. Upgrade the former to 12.9.1 and rebuild pinned images. For 13.x, follow PR 4759 and the release advisory; a source patch or planned version is not proof that your installed artifact is fixed.
- title: Stop loading configuration from untrusted checkouts
  hint: 'Run cdxgen from a trusted working directory and pass the checkout as the path argument, or remove all four project config files before scanning: .cdxgenrc, .cdxgen.json, .cdxgen.yml and .cdxgen.yaml. --no-install-deps, secure mode and cdxgen-secure alone do not block this flaw. Removing shells from CDXGEN_ALLOWED_COMMANDS stops only the dosai route.'
- title: Protect output files and bound untrusted parser work
  hint: Choose an output path with -o outside the checkout, or remove its bom.json symlink before scanning. Until patched, avoid ai-skill/ai scans of untrusted repositories and reject those project types from untrusted server clients. The trusted-working-directory workaround only addresses project config loading, not these separate flaws.
- title: Constrain Git destinations at the network boundary
  hint: Until patched, allowlist only hosts that cannot redirect to arbitrary destinations, or block the scanner server from reaching internal networks. CDXGEN_GIT_ALLOWED_HOSTS and CDXGEN_SERVER_ALLOWED_HOSTS alone do not validate Git redirect targets. After patching, use the current canonical repository URL because allowlisted Git requests stop at redirects.
- title: Investigate suspicious scanner runs before reusing their credentials
  hint: Preserve CI logs and the scanned revision. Review all four config files for dosaiCommand, scalasem-command, traceCmd, traceWritePaths, traceDisableNetwork, extends and output aliases; examine agents.py/tasks.py, bom.json links and unexpected child processes or Git destinations. These are attack surfaces and PoC artifacts, not confirmed campaign IoCs; a match alone does not prove compromise. If code execution is confirmed, scope exposed CI credentials, revoke/replace them from a clean environment and rebuild affected outputs.
sources:
- name: 'cdxgen maintainer advisory: Repository configuration command execution'
  url: https://github.com/cdxgen/cdxgen/security/advisories/GHSA-phj7-7j69-xmfh
  primary: true
  says: '@cyclonedx/cdxgen >=12.0.0,<12.9.1 and @cdxgen/cdxgen >=13.0.0 load unsafe project configuration from the working directory. Repository control can become code execution as the scanning user.'
- name: 'cdxgen maintainer advisory: CrewAI parser denial of service'
  url: https://github.com/cdxgen/cdxgen/security/advisories/GHSA-4v76-rxfx-x42x
  primary: true
  says: '@cyclonedx/cdxgen >=12.3.1,<12.9.1 and @cdxgen/cdxgen >=13.0.0 synchronously parse crafted CrewAI agents.py/tasks.py with quadratic regular expressions. CLI or ai-skill/ai server scans can stall.'
- name: 'cdxgen maintainer advisory: Output symlink file corruption'
  url: https://github.com/cdxgen/cdxgen/security/advisories/GHSA-jgqw-xmhg-9rfm
  primary: true
  says: '@cyclonedx/cdxgen >=8.1.6,<12.9.1 and @cdxgen/cdxgen >=13.0.0 follow an output-path symlink, overwriting a predictable writable target with generated BOM content, not arbitrary attacker-supplied bytes.'
- name: 'cdxgen maintainer advisory: Git redirect host-allowlist bypass'
  url: https://github.com/cdxgen/cdxgen/security/advisories/GHSA-7pxf-2399-4955
  primary: true
  says: '@cyclonedx/cdxgen >=11.2.5,<12.9.1 and @cdxgen/cdxgen >=13.0.0 allow Git HTTP redirects past host checks when an allowlisted host can redirect to an attacker-chosen destination.'
- name: cdxgen 12.9.1 release
  url: https://github.com/cdxgen/cdxgen/releases/tag/v12.9.1
  primary: true
  says: Published 12.x release; the four advisories identify it as patched.
- name: cdxgen 13.x patch PR 4759
  url: https://github.com/cdxgen/cdxgen/pull/4759
  primary: true
  says: Source fixes for the four advisories; these do not establish a released 13.7.0 package.
---

The November 6 batch concerns the scanner’s trust boundary when it processes an untrusted repository. It is not a claim that the published cdxgen package was malicious. The maintainer rates command execution and parser denial of service moderate, and the symlink and redirect issues low. This event is rated L3 because public demonstrations show repository-controlled code executing in a CI/developer security tool despite its documented safeguards. No actual victim total or confirmed exploitation is established.

Configuration is loaded from cdxgen’s current working directory. The advisory describes four execution routes: a .NET evidence helper accepting dosaiCommand, Scala evidence accepting scalasem-command from 13.4.0 onward, dynamic tracing accepting traceCmd and sandbox changes, and yargs 18 loading extends inside the scanner process. The last route affects versions using yargs 18 from 12.0.0. Running from a separate trusted directory avoids loading the target checkout’s configuration; it does not make every other scanning operation safe.

The other three issues have distinct prerequisites. CrewAI parsing can block the Node.js event loop. A final-component output symlink can corrupt another file the scanner user can write, including outside Node permission-model paths, but the written content is the generated BOM. Git redirects require a redirect-capable allowlisted host; unauthenticated server clients can choose the initial repository URL. This can enable internal-host probing, internal-repository SBOM disclosure or resource exhaustion; outside secure mode, configured Git HTTP headers may also reach the redirect target.

All four advisories identify @cyclonedx/cdxgen 12.9.1 as fixed. They list no patched @cdxgen/cdxgen 13.x version and say its fixes will ship in 13.7.0. The 13.7.0 release URL returned 404 during verification. Do not treat the planned release or a merged patch as an available fixed artifact. No version checker is provided because the two package names have different affected ranges and 13.x remediation is pending.

The fix restricts project-config keys and resolves allowed paths through symlinks, replaces unsafe output symlinks, uses bounded parsing and disables Git redirects when a host allowlist or secure mode applies. The earlier bundled-Node Brotli issue remains tracked in the [Node.js October incident](/incidents/nodejs-oct-2026/); it is a separate flaw and fixing it alone does not address this batch.
