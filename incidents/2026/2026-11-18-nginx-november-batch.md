---
title: nginx November batch fixes HTTP/2 RCE paths and eight other flaws
date: 2026-11-18
level: 3
tags:
  - nginx
  - HTTP/2
  - RCE
  - TLS
  - F5
summary: nginx 1.30.7 and 1.31.9 address a new ten-CVE batch. Five memory-safety flaws can lead to worker-level RCE in specific HTTP/2, HTTP/3, resolver or mail configurations. Researchers demonstrate exploitation, but CERT-EU reports no attacks in the wild. Plus needs the matching vendor fixes.
splash: Unpatched nginx/NGINX Plus with HTTP/2, HTTP/3, resolver subrequests, mail proxy or the listed TLS/stream configurations.
wipe: Upgrade OSS to 1.30.7/1.31.9 or confirmed distro backports; Plus needs its branch fix. Replace running binaries and old workers.
inTheWild: no
inTheWildNote: Researchers demonstrate RCE; CERT-EU reports no exploitation in the wild.
cves:
  - id: CVE-2026-123007
    score: 8.1
    name: HTTP/2 flow-control memory corruption
    description: HTTP/2 must be enabled. Crafted flow-control traffic can corrupt heap memory; nginx.org lists 1.9.5–1.31.8. F5 conditions RCE on disabled or bypassed ASLR; Wiz demonstrates an ASLR bypass, including a static-file server.
  - id: CVE-2026-123633
    score: 8.1
    name: HTTP/2 connection-draining use-after-free
    description: HTTP/2 reverse proxying with scarce worker_connections can free a connection still used by an upstream request. nginx.org lists 1.19.7–1.31.8.
  - id: CVE-2026-121810
    score: 8.1
    name: HTTP/3 connection-draining use-after-free
    description: QUIC/HTTP/3 upstream processing and connection pressure can trigger use-after-free. nginx.org lists 1.25.0–1.31.8; F5 also notes conditions outside attacker control.
  - id: CVE-2026-123634
    score: 8.1
    name: Resolver subrequest use-after-free
    description: A proxy hostname containing variables and concurrent SSI or mirror subrequests resolving the same name can trigger the bug. nginx.org lists 0.6.18–1.31.8; the researcher’s narrower tested mirror path starts at 1.13.4.
  - id: CVE-2026-113425
    score: 8.1
    name: Mail proxy use-after-free
    description: Mail proxy authentication can trigger use-after-free without valid credentials. Xint’s tested setup uses proxy on with auth_http. nginx.org lists 0.5.33–1.31.8; Xint traces its path to 0.5.15.
  - id: CVE-2026-118899
    score: 7.5
    name: TLS 1.3 request-body infinite loop
    description: An SSL HTTP listener with TLS 1.3 can leave a worker spinning while reading a request body. nginx.org lists 1.13.0–1.31.8; F5’s evaluated OSS range is narrower.
  - id: CVE-2026-120993
    score: 5.3
    name: PROXY v2 and dynamic-certificate worker crash
    description: Requires stream dynamic certificate loading and PROXY protocol v2 during an abbreviated TLS handshake. nginx.org lists 1.31.4–1.31.8; F5 additionally flags stable 1.30.6 before 1.30.7.
  - id: CVE-2026-125283
    score: 5.3
    name: alias/try_files capture buffer overflow
    description: Certain alias and try_files configurations with a map variable and regex captures can crash a worker. nginx.org lists 0.9.6–1.31.8.
  - id: CVE-2026-120967
    score: 4.8
    name: Stream client-certificate verification bypass
    description: A non-default stream virtual server requiring ssl_verify_client on may inherit the default server’s verification decision during synchronous handshake. nginx.org lists 1.25.5–1.31.8.
  - id: CVE-2026-123640
    score: 5.3
    name: ssl_preread routing-policy bypass
    description: A malformed ClientHello can forge preread variables and reach an unintended backend when routing trusts those values. nginx.org lists 1.15.2–1.31.8.
fixed:
  - product: nginx stable 1.30.x
    branch: "1.30"
    version: 1.30.7
    status: Upstream stable release
  - product: nginx mainline 1.31.x
    branch: "1.31"
    version: 1.31.9
    status: Upstream mainline release
  - product: NGINX Plus 37.0 maintenance line
    version: 37.0.8.1
    status: Batch target; 37.0.7.1 fixes only some findings
  - product: NGINX Plus 37.1+ maintenance line
    version: 37.3.0.1
    status: Batch target; 37.2.0.1 fixes only some findings
  - product: Older upstream branches and Plus R33–R36
    version: none
    status: No complete fixed release established here; migrate or verify a supported vendor backport
timeline:
  - date: Oct 21, 2026
    title: Wiz privately reports HTTP/2 use-after-free
    body: This is a coordinated-disclosure milestone, not the public disclosure date.
  - date: Nov 18, 2026
    title: Public disclosure and OSS releases
    body: nginx publishes 1.30.7 and 1.31.9. F5 CNA records and researcher reports describe the new batch.
  - date: Nov 18, 2026
    title: CERT-EU urges prioritized patching
    body: Researcher demonstrations do not establish real-world exploitation.
checklist:
  - title: Inventory the actual binary, package and configuration
    hint: "Use nginx -v, nginx -V and nginx -T to inspect version, modules and effective listeners/configuration. Distribution backports can keep an old upstream version string: check the full installed package against the distribution advisory. Inventory proxy/appliance/container copies too; do not assume an image tag proves its binary is patched."
  - title: Install the complete fix for the line you run
    hint: "OSS stable: 1.30.7; mainline: 1.31.9. For the listed Plus lines, target 37.0.8.1 or 37.3.0.1 after confirming the vendor product/branch. Plus 37.0.7.1 and 37.2.0.1 already fix 123633 and 123640, but leave other batch bugs; the TLS-loop record separately lists 37.2.1.1. Older/eol products need vendor guidance. Follow the package restart or supported executable-upgrade procedure and confirm no vulnerable master/workers remain. Merely installing a new file or reloading configuration does not replace the old executable."
  - title: Disable HTTP/2 temporarily on every exposed shared listener
    hint: For 1.25.1+, set http2 off in affected server blocks and remove legacy http2 listen parameters; older versions require removal of the listen parameter. Run nginx -t, reload, confirm HTTP/2 is no longer negotiated and verify HTTPS still works. A failed connection is not proof of mitigation. Native gRPC/other HTTP/2-only clients may break. Close or restart lingering old workers; existing connections retain old configuration. This covers 123007/123633 only.
  - title: Cover the other three memory-safety paths
    hint: For 121810 remove affected QUIC listeners, set http3 off, clear advertised Alt-Svc and confirm no relevant UDP listener remains. For 123634 avoid variable proxy hostnames and SSI/mirror subrequests; fixed upstream groups remove the tested request-time DNS path. mirror_request_body on alone is not a fix, and disabling mirror alone misses SSI. For 113425 restrict every mail-proxy listener to trusted networks or loopback while patching; valid mail credentials are not required. Validate/reload and retire old sessions/workers; plan the service interruption.
  - title: Review the TLS, stream and capture-specific bugs too
    hint: "For 120967 require client certificates in the default server on the shared socket, or give the protected stream server its own address/port. For 123640 replace ssl_preread-based trust/routing with TLS termination, configured certificates and ssl_server_name-based routing; preserve backend TLS settings as needed. For 125283 use named captures without reusing them across regexes. For 120993 disable PROXYv2/use v1 or disable both session tickets and cache; F5 excludes BoringSSL/AWS-LC builds for that bug. No workaround is listed for 118899: prioritize patching that TLS 1.3 listener. Each workaround is CVE-specific, not whole-batch protection."
  - title: Correlate logs and process execution before declaring compromise
    hint: Review configured error logs (commonly /var/log/nginx/error.log) for worker exits, signal 11/segfault and core dumps. Correlate long-lived high-inbound/low-outbound connections, repeated TLS connections and bytes received that greatly exceed logged request lengths. Xint gives an optional h2_hunt format and /var/log/nginx/h2-hunt.log; adding it now cannot reconstruct old traffic. Review auditd execve/execveat records by worker UID and parent PID for unexpected /bin/sh, /bin/bash or other programs; same-UID applications and crashes can be legitimate. A match alone does not prove compromise; absence of newly enabled logs does not clear earlier activity.
sources:
  - name: nginx.org security advisories
    url: https://nginx.org/en/security_advisories.html
    says: Ten November vulnerabilities, upstream ranges and fixed releases.
    primary: true
  - name: nginx mainline release notes
    url: https://nginx.org/en/CHANGES
    says: November 18 release 1.31.9 lists all ten fixes.
    primary: true
  - name: nginx stable release notes
    url: https://nginx.org/en/CHANGES-1.30
    says: November 18 release 1.30.7 lists nine fixes; stable PROXYv2 scope differs in the CNA record.
    primary: true
  - name: nginx downloads
    url: https://nginx.org/en/download.html
    says: Lists 1.31.9 mainline and 1.30.7 stable as released.
    primary: true
  - name: Wiz original HTTP/2 research
    url: https://www.wiz.io/blog/nginx-http2-rce-vulnerabilities
    says: Demonstrated RCE with ASLR bypass, HTTP/2 prerequisites, distinct Plus fixes and mitigation/reload checks.
    primary: true
  - name: Xint original nginx2root research
    url: https://xint.io/blog/nginx2root-remote-code-execution
    says: Five independent nginx attack paths, tested configuration ranges, exposure checks and mitigations. Host-root demonstration also needs a separate Linux kernel flaw.
    primary: true
  - name: CERT-EU advisory 2026-022
    url: https://cert.europa.eu/publications/security-advisories/2026-022/
    says: Five RCE-capable findings; no in-the-wild exploitation reported; prioritizes internet-facing deployments.
    primary: true
  - name: nginx process-control documentation
    url: https://nginx.org/en/docs/control.html
    says: Distinguishes configuration reload from executable upgrade and explains lingering old workers.
    primary: true
  - name: F5 CNA record CVE-2026-123007
    url: https://cveawg.mitre.org/api/cve/CVE-2026-123007
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-123633
    url: https://cveawg.mitre.org/api/cve/CVE-2026-123633
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-121810
    url: https://cveawg.mitre.org/api/cve/CVE-2026-121810
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-123634
    url: https://cveawg.mitre.org/api/cve/CVE-2026-123634
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-113425
    url: https://cveawg.mitre.org/api/cve/CVE-2026-113425
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-118899
    url: https://cveawg.mitre.org/api/cve/CVE-2026-118899
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-120993
    url: https://cveawg.mitre.org/api/cve/CVE-2026-120993
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-125283
    url: https://cveawg.mitre.org/api/cve/CVE-2026-125283
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-120967
    url: https://cveawg.mitre.org/api/cve/CVE-2026-120967
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
  - name: F5 CNA record CVE-2026-123640
    url: https://cveawg.mitre.org/api/cve/CVE-2026-123640
    primary: true
    says: Vendor-authored prerequisites, evaluated version ranges, CVSS 3.1/4.0 and workarounds. End-of-support versions are not evaluated.
---

This is the November 18 batch, distinct from the [October nginx release](/incidents/nginx-oct-2026/). All displayed scores use F5’s CVSS 3.1 values; its five memory-safety records also score 9.2 under CVSS 4.0. nginx.org labels those findings major or medium rather than using the same scoring vocabulary. L3 reflects widely deployed software and demonstrated exploitation without reported real-world attacks. The nginx bugs run code as a worker, not automatically as host root: Xint’s root/container-escape demonstration also chains a separate Linux SCTP vulnerability.

Keep source boundaries visible. F5 says RCE requires ASLR disabled or bypassed; Wiz demonstrates a bypass, so enabled ASLR is not a sufficient mitigation. The resolver/mail historical start versions differ between upstream ranges and Xint’s tested paths; do not treat the narrower tested range as a safe-version list. F5’s 121810 record contains a malformed 1.25.09 lower bound; nginx.org and the researcher identify 1.25.0. For 120993, the CNA additionally flags stable 1.30.6, while the upstream advisory lists only mainline and stable release notes omit that item; upgrade rather than declaring stable unaffected. No victim count or campaign-specific malicious network indicators are established by these sources.
