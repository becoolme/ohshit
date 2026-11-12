---
title: Go fixes build-time code execution paths and an HTTP/1 server crash
level: 3
date: '2026-11-10'
tags:
- Go
- cgo
- CI
- HTTP/1
ecosystems:
- go
summary: Go 1.27.4 and 1.26.11 fix 12 vulnerabilities. Malicious build inputs can trigger code execution. A separate race can crash HTTP/1 servers whose handlers use MaxBytesReader or MaxBytesHandler and concurrently read the body and write response headers.
splash: Builds of untrusted Go packages and HTTP/1 handlers with concurrent body reads and header writes using Go’s body limit helpers
wipe: Upgrade to Go 1.27.4 or 1.26.11, rebuild and redeploy affected binaries, and isolate untrusted builds.
inTheWild: unknown
inTheWildNote: The Go release and vulnerability records do not report exploitation.
cves:
- id: CVE-2026-97033
  name: Unsafe cgo compiler flags
  description: A malicious cgo package can use compiler or linker flags such as --sysroot or -target to execute code during the build.
- id: CVE-2026-97034
  name: Untrusted GCC spec files
  description: With GCC, a malicious cgo package can make certain linker options load a package-controlled specs file and execute commands.
- id: CVE-2026-97035
  name: Clang and GCC flag bypass
  description: A malicious cgo package can abuse Clang -gen-* or GCC -gnat* flags to execute code or write files to arbitrary directories.
- id: CVE-2026-97036
  name: Apple linker plugin loading
  description: On Darwin, a malicious cgo package can make the Apple linker combine -l and to_library to load a package-chosen plugin.
- id: CVE-2026-97037
  name: cgo linker script injection
  description: Split -Wl, arguments and certain options accepted by GNU ld.bfd can let a malicious cgo package supply linker scripts that execute code.
- id: CVE-2026-97038
  name: Malicious linker input files
  description: Crafted .syso files or cgo linker inputs can inject flags or execute code at link time.
- id: CVE-2026-97039
  name: pkg-config flag bypass
  description: 'A malicious package using #cgo pkg-config: directives can load untrusted .pc files or pass unchecked compiler and linker flags.'
- id: CVE-2026-97040
  name: Go object disguised as .syso
  description: A package can disguise a Go object as a .syso file to inject cgo linker directives.
- id: CVE-2026-97041
  name: ELF linker flag injection
  description: Crafted //go:cgo_* directives in a malicious package can inject arbitrary flags into the external linker on ELF platforms.
- id: CVE-2026-97042
  name: Unsafe dynamic imports
  description: A malicious package can pass unsafe library arguments through //go:cgo_import_dynamic or through a crafted PE object on Windows.
- id: CVE-2026-97043
  name: Escaped quotes bypass cgo checks
  description: A malicious cgo package can use escaped quotes in //go:cgo_ldflag to execute code during the build or cause the go command to panic.
- id: CVE-2026-97054
  name: HTTP/1 response header race
  description: An HTTP/1 server using MaxBytesReader or MaxBytesHandler may crash when the body exceeds the limit and the handler reads it concurrently with writing response headers.
fixed:
- product: Go 1.27
  branch: '1.27'
  version: 1.27.4
  status: Supported
- product: Go 1.26
  branch: '1.26'
  version: 1.26.11
  status: Supported
- product: Older Go releases
  branch: '*'
  version: none
  status: Upgrade to a supported branch
checker:
  runtime: Go
  command: go version
  examples:
  - 1.27.3
  - 1.27.4
  - 1.26.10
  - 1.26.11
timeline:
- date: Nov 10, 17:14 UTC
  title: Go publishes 1.27.4 and 1.26.11
  body: The announcement details 11 toolchain fixes and one net/http fix.
- date: Nov 11, 02:51 UTC
  title: Go publishes the vulnerability records
  body: The 12 records give affected ranges and the two fixed versions.
checklist:
- title: Upgrade each build environment
  hint: Run go version and go env GOTOOLCHAIN in CI, on developer machines and in container build stages. Update pinned setup-go versions, go.mod toolchain directives and build images to Go 1.27.4, 1.26.11 or a newer supported patch. Move older builds to a supported branch.
- title: Rebuild and redeploy affected HTTP servers
  hint: Check handlers using MaxBytesReader or MaxBytesHandler for concurrent body reads and response header writes. Rebuild and roll out with the patched toolchain, check the binary with go version -m, and test oversized HTTP/1 requests in staging.
- title: Isolate untrusted builds
  hint: Stop building untrusted packages and pull requests on workers with secrets or release permissions. Use disposable runners with narrowly scoped credentials and keep signing and publication out of untrusted jobs.
- title: Investigate suspicious builds
  hint: 'Preserve runner and compiler logs. Check untrusted dependency changes, #cgo directives and .syso files alongside unexpected processes or artifact changes. If a build was compromised, revoke exposed credentials, replace affected runners and regenerate artifacts from trusted inputs.'
sources:
- name: Go release history
  url: https://go.dev/doc/devel/release#go1.27.4
  says: Confirms both releases and the support policy.
  primary: true
- name: Go security announcement
  url: https://groups.google.com/g/golang-announce/c/iY8TY0wWgbM
  says: Original Go team announcement explaining the prerequisites and impact for all 12 fixes.
  primary: true
- name: Go vulnerability database GO-2026-6848
  url: https://vuln.go.dev/ID/GO-2026-6848.json
  says: Official details and version ranges for CVE-2026-97043.
  primary: true
- name: Go vulnerability database GO-2026-6849
  url: https://vuln.go.dev/ID/GO-2026-6849.json
  says: Official details and version ranges for CVE-2026-97042.
  primary: true
- name: Go vulnerability database GO-2026-6850
  url: https://vuln.go.dev/ID/GO-2026-6850.json
  says: Official details and version ranges for CVE-2026-97041.
  primary: true
- name: Go vulnerability database GO-2026-6851
  url: https://vuln.go.dev/ID/GO-2026-6851.json
  says: Official details and version ranges for CVE-2026-97040.
  primary: true
- name: Go vulnerability database GO-2026-6852
  url: https://vuln.go.dev/ID/GO-2026-6852.json
  says: Official details and version ranges for CVE-2026-97039.
  primary: true
- name: Go vulnerability database GO-2026-6853
  url: https://vuln.go.dev/ID/GO-2026-6853.json
  says: Official details and version ranges for CVE-2026-97038.
  primary: true
- name: Go vulnerability database GO-2026-6854
  url: https://vuln.go.dev/ID/GO-2026-6854.json
  says: Official details and version ranges for CVE-2026-97037.
  primary: true
- name: Go vulnerability database GO-2026-6855
  url: https://vuln.go.dev/ID/GO-2026-6855.json
  says: Official details and version ranges for CVE-2026-97036.
  primary: true
- name: Go vulnerability database GO-2026-6856
  url: https://vuln.go.dev/ID/GO-2026-6856.json
  says: Official details and version ranges for CVE-2026-97035.
  primary: true
- name: Go vulnerability database GO-2026-6857
  url: https://vuln.go.dev/ID/GO-2026-6857.json
  says: Official details and version ranges for CVE-2026-97034.
  primary: true
- name: Go vulnerability database GO-2026-6858
  url: https://vuln.go.dev/ID/GO-2026-6858.json
  says: Official details and version ranges for CVE-2026-97033.
  primary: true
- name: Go vulnerability database GO-2026-6859
  url: https://vuln.go.dev/ID/GO-2026-6859.json
  says: Official details and version ranges for CVE-2026-97054.
  primary: true
---

Go released 1.27.4 and 1.26.11 on November 10. Eleven fixes address build inputs such as cgo directives, native objects and compiler or linker arguments. Several flaws can execute code as the build user when it builds a malicious package. The path depends on the input and toolchain. Examples include GCC spec files, Apple linker plugins and crafted .syso objects. Review CI jobs that compile untrusted contributions or newly introduced dependencies and can access credentials or publishing permissions.

The separate net/http flaw affects HTTP/1 handlers using MaxBytesReader or MaxBytesHandler. When the request body exceeds the limit, reading it concurrently with writing response headers can cause a panic that crashes the server. Upgrade the toolchain used to produce deployed binaries and rebuild affected services. Updating the build machine alone leaves existing binaries unchanged.
