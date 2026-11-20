---
title: PHP November security releases fix conditional RCE, FPM request smuggling and worker-to-master escalation
headline: Another set of pipes needs checking
level: 3
date: '2026-11-18'
tags:
- PHP
- RCE
- PHP-FPM
ecosystems:
- php
summary: PHP 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 and 8.6.0 fix November security flaws. Persistent FPM connections can enable request-smuggling RCE; other paths require specific backtrace, logging or session setups. A separate FPM flaw can escalate existing worker execution to the master.
splash: 'Exposure varies: persistent backend connections, unusual PHP settings, shared session state or existing FPM worker execution'
wipe: Upgrade to 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 or 8.6.0; restart workers and apply configuration-specific defenses
inTheWild: unknown
inTheWildNote: PHP documents exploit demonstrations; no exploitation in the wild is established here.
cves:
- id: CVE-2026-129291
  name: FPM worker-to-master privilege escalation
  description: Linux epoll, catch_workers_output enabled and existing worker code execution can permit control of the FPM master; root only if the master runs as root.
- id: CVE-2026-129182
  name: Shutdown backtrace state survives into another request
  description: 'PHP 8.5 only: late shutdown diagnostics can recreate a freed backtrace. A later early diagnostic in the same worker can corrupt memory; RCE on these entry points is not demonstrated.'
- id: CVE-2026-129496
  name: Startup timezone cache survives freed memory
  description: Startup diagnostics written through PHP file error logging can leave a stale cache for a fresh worker request. Local FPM/mod_php command execution needs known addresses and additional assumptions.
- id: CVE-2026-129481
  name: Session cleanup leaves a freed script filename
  description: 'PHP 8.3–8.5: fatal errors during session cleanup can leave request-owned filename memory for another request in the same worker. Crashes/UAF confirmed; RCE not demonstrated.'
- id: CVE-2026-129474
  name: Magic-method argument backtrace memory corruption
  description: 'PHP 8.5: reachable magic-method calls, a precisely timed fatal error, fatal backtraces enabled and arguments included can yield worker-level RCE. Production INI argument exclusion blocks this demonstrated path.'
- id: CVE-2026-129289
  name: Persistent FPM connection request smuggling
  description: Backend connection reuse plus an application opening but not fully consuming php://input can admit a forged FastCGI request and worker-level RCE. LSAPI stream desynchronization is also affected; LSAPI RCE is not established.
- id: CVE-2026-129438
  name: Oversized RFC 3986 URI serialization
  description: PHP 8.5 Uri\Rfc3986\Uri can return invalid or truncated text near 2 GiB with enough available memory. parse_url and WhatWG URLs are outside scope; no RCE demonstrated.
- id: CVE-2026-129538
  name: CGI path correction accesses invalid memory
  description: php-cgi with cgi.fix_pathinfo=1 and inconsistent server path mappings can crash, disclose memory or corrupt it. PHP-FPM/mod_php are excluded; code execution is not confirmed.
- id: CVE-2026-126714
  name: Interrupted session-file replacement enables object injection
  description: The files session handler can combine old and new data after an interrupted write. RCE needs attacker-influenced contents, a useful interruption and an application gadget chain.
- id: CVE-2026-129506
  name: SOAP XML cleanup uses freed DTD data
  description: Crafted SOAP XML with DTD entity references can crash a worker; untrusted WSDL/schema handling can also reach the faulty cleanup. Memory disclosure and RCE are unconfirmed.
- id: CVE-2026-129501
  name: Modern DOM XML serialization double free
  description: PHP 8.4–8.5 modern DOM saveXml() on attacker-controlled documents can corrupt memory and crash. Legacy DOMDocument is excluded; realistic application RCE is not demonstrated.
- id: CVE-2026-128064
  name: Uppercase secure URL schemes lose TLS
  description: Built-in stream wrappers can send HTTPS/FTPS data in plaintext when the scheme has uppercase S, including redirects. An observer can obtain transmitted secrets.
- id: CVE-2026-127960
  name: Folded HTTP response headers consume excessive CPU
  description: An attacker-controlled server response with many continuation lines can occupy workers fetching through built-in HTTP streams; allow_url_fopen alone does not establish exposure.
- id: CVE-2026-129292
  name: FPM full status output accepts injected markup
  description: Request metadata can plant script for an operator viewing full HTML status. Basic-auth header forwarding enables one path; private status access alone does not prevent planting.
- id: CVE-2026-15353
  name: SOAP array decoding exposes heap fragments
  description: Invalid arraySize dimensions can expose a small heap value as an array key if the application returns the decoded array; default-allocator RCE or corruption is not established.
- id: CVE-2026-128090
  name: Phar signature algorithm downgrade
  description: Replacing a signed archive and changing its signature to a keyless digest can bypass its trusted sidecar public key. Loading the modified archive can execute code; independently protect the key.
fixed:
- product: PHP 8.6
  branch: '8.6'
  version: 8.6.0
  status: November security fixes included; individual CVE ranges differ
- product: PHP 8.5
  branch: '8.5'
  version: 8.5.13
  status: November security fixes included; individual CVE ranges differ
- product: PHP 8.4
  branch: '8.4'
  version: 8.4.28
  status: November security fixes included; individual CVE ranges differ
- product: PHP 8.3
  branch: '8.3'
  version: 8.3.37
  status: November security fixes included; individual CVE ranges differ
- product: PHP 8.2
  branch: '8.2'
  version: 8.2.36
  status: November security fixes included; individual CVE ranges differ
- product: PHP 8.1 and older
  version: none
  status: Unsupported upstream; obtain a maintained vendor fix or migrate
checker:
  runtime: PHP
  command: php -v
  examples:
  - 8.5.12
  - 8.5.13
  - 8.4.27
  - 8.4.28
  - 8.3.37
  - 8.2.36
  - 8.6.0
timeline:
- date: Nov 18, 2026
  title: PHP warns of a critical regular security release
  body: The advance notice identifies non-default or uncommon critical attack paths, without the detailed advisories.
- date: Nov 19, 2026
  title: PHP publishes security releases and detailed advisories
  body: Fixes arrive in 8.5.13, 8.4.28, 8.3.37 and 8.2.36; the new 8.6.0 also includes them.
checklist:
- title: Deploy the security release for every runtime
  hint: Install 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 or 8.6.0, rebuild images and restart all PHP workers. Verify the effective web runtime, not only php -v. Obtain appliance-specific vendor updates rather than replacing embedded PHP manually.
- title: Disable persistent backend connections while patching
  hint: For CVE-2026-129289, disable nginx fastcgi_keep_conn / Apache mod_proxy_fcgi enablereuse or equivalent FastCGI reuse. Restrict FPM/LSAPI listeners to trusted front ends. Reading input fully helps, but error paths make it insufficient as the only defense.
- title: Close the fatal-backtrace paths on PHP 8.5
  hint: Administratively set fatal_error_backtraces=0 for CVE-2026-129182 and 129474, prevent request overrides and restart workers. zend.exception_ignore_args=1 also blocks the demonstrated 129474 fatal-error chain. display_errors=0 does not prevent backtrace construction.
- title: Reduce timezone and interrupted-shutdown exposure
  hint: For 129496, fix startup warnings/deprecations and restart the master and workers, or use a logging destination such as syslog that avoids PHP file timestamp formatting. For 129481, avoid fatal session-cleanup callbacks; FPM pm.max_requests=1 plus worker restart blocks the demonstrated cross-request sequence at a performance cost. Upload-progress disablement or enabling OPcache alone does not fix 129481.
- title: Remove the FPM worker-to-master escalation prerequisite
  hint: For 129291, disable catch_workers_output in affected epoll pools until updated. A non-root master limits the result but does not fix the UAF. Disabling Curl or OPcache only removes parts of the demonstrated chain; container-master privileges do not by themselves prove a container escape.
- title: Harden session stores and archive verification
  hint: For 126714, disable unneeded upload progress and limit untrusted session data; applications storing such data remain exposed to interrupted file writes. Consider an atomic-replacement backend. For 128090, obtain the publisher key authentically and protect <archive>.pubkey independently from archive replacement/deletion, or verify a pinned key before loading. phar.require_hash alone is not authentication.
- title: Constrain CGI paths and operator status output
  hint: For 129538, set cgi.fix_pathinfo=0 only after checking routing compatibility, or correct and validate all script/PATH_INFO mappings. For 129292, disable full HTML status or use a consumer treating all fields as untrusted text; restricting operator access alone is incomplete.
- title: Constrain outbound URLs and untrusted parsers
  hint: Normalize HTTPS/FTPS schemes to lowercase and validate every redirect, disabling automatic redirects if needed (128064). Allowlist outbound targets and enforce response-header limits at an egress proxy (127960). Restrict SOAP endpoints/trust WSDL; reject DTDs with encoding-aware parsing (129506), validate arraySize before SOAP decoding and avoid returning unvalidated arrays (15353). Avoid modern DOM saveXml on untrusted documents; saveHtml avoids that XML serializer where HTML output suffices (129501). Bound RFC3986 URI lengths far below 2 GiB before construction/resolution (129438). These measures do not replace the PHP update.
sources:
- name: PHP November 18 advance notice and November 19 releases
  url: https://www.php.net/archive/2026.php
  says: Critical paths require unusual or non-default setups; release dates and available branches
  primary: true
- name: PHP ChangeLog
  url: https://www.php.net/ChangeLog-8.php
  says: Per-branch November fixes, including 8.6.0
  primary: true
- name: PHP CVE-2026-129291 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-jm4m-qfqx-967m
  says: Linux epoll, catch_workers_output enabled and existing worker code execution can permit control of the FPM master; root only if the master runs as root.
  primary: true
- name: PHP CVE-2026-129182 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-2fjv-p558-g82m
  says: 'PHP 8.5 only: late shutdown diagnostics can recreate a freed backtrace. A later early diagnostic in the same worker can corrupt memory; RCE on these entry points is not demonstrated.'
  primary: true
- name: PHP CVE-2026-129496 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-gr4f-wgx5-jpfv
  says: Startup diagnostics written through PHP file error logging can leave a stale cache for a fresh worker request. Local FPM/mod_php command execution needs known addresses and additional assumptions.
  primary: true
- name: PHP CVE-2026-129481 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-g3vh-838c-65v7
  says: 'PHP 8.3–8.5: fatal errors during session cleanup can leave request-owned filename memory for another request in the same worker. Crashes/UAF confirmed; RCE not demonstrated.'
  primary: true
- name: PHP CVE-2026-129474 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-8mjj-2r7p-4hg2
  says: 'PHP 8.5: reachable magic-method calls, a precisely timed fatal error, fatal backtraces enabled and arguments included can yield worker-level RCE. Production INI argument exclusion blocks this demonstrated path.'
  primary: true
- name: PHP CVE-2026-129289 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-qc49-hpvq-g2w6
  says: Backend connection reuse plus an application opening but not fully consuming php://input can admit a forged FastCGI request and worker-level RCE. LSAPI stream desynchronization is also affected; LSAPI RCE is not established.
  primary: true
- name: PHP CVE-2026-129438 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-mg3p-mxj9-g2mm
  says: PHP 8.5 Uri\Rfc3986\Uri can return invalid or truncated text near 2 GiB with enough available memory. parse_url and WhatWG URLs are outside scope; no RCE demonstrated.
  primary: true
- name: PHP CVE-2026-129538 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-5j3f-64r7-f564
  says: php-cgi with cgi.fix_pathinfo=1 and inconsistent server path mappings can crash, disclose memory or corrupt it. PHP-FPM/mod_php are excluded; code execution is not confirmed.
  primary: true
- name: PHP CVE-2026-126714 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-fm2m-fjf5-v3cp
  says: The files session handler can combine old and new data after an interrupted write. RCE needs attacker-influenced contents, a useful interruption and an application gadget chain.
  primary: true
- name: PHP CVE-2026-129506 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-4646-p932-gw34
  says: Crafted SOAP XML with DTD entity references can crash a worker; untrusted WSDL/schema handling can also reach the faulty cleanup. Memory disclosure and RCE are unconfirmed.
  primary: true
- name: PHP CVE-2026-129501 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-x8r7-mg3g-74hg
  says: PHP 8.4–8.5 modern DOM saveXml() on attacker-controlled documents can corrupt memory and crash. Legacy DOMDocument is excluded; realistic application RCE is not demonstrated.
  primary: true
- name: PHP CVE-2026-128064 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-f6gg-rchx-xw8j
  says: Built-in stream wrappers can send HTTPS/FTPS data in plaintext when the scheme has uppercase S, including redirects. An observer can obtain transmitted secrets.
  primary: true
- name: PHP CVE-2026-127960 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-mmf9-xm3v-hg2x
  says: An attacker-controlled server response with many continuation lines can occupy workers fetching through built-in HTTP streams; allow_url_fopen alone does not establish exposure.
  primary: true
- name: PHP CVE-2026-129292 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-3mg3-cr28-46gc
  says: Request metadata can plant script for an operator viewing full HTML status. Basic-auth header forwarding enables one path; private status access alone does not prevent planting.
  primary: true
- name: PHP CVE-2026-15353 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-q23r-hr55-xmpg
  says: Invalid arraySize dimensions can expose a small heap value as an array key if the application returns the decoded array; default-allocator RCE or corruption is not established.
  primary: true
- name: PHP CVE-2026-128090 advisory
  url: https://github.com/php/php-src/security/advisories/GHSA-68fq-fh7h-f8gr
  says: Replacing a signed archive and changing its signature to a keyless digest can bypass its trusted sidecar public key. Loading the modified archive can execute code; independently protect the key.
  primary: true
---

This is the November release batch, first announced on November 18, rather than a second report of October’s [PHP2Shell incident](/incidents/php2shell/). It also includes the separately tracked [CVE-2026-115560 serializer mismatch](/incidents/php-session-upload-progress/), whose October disclosure date and existing URL are preserved. The CVE list here covers the 16 other advisories verified for this batch, without duplicating that identifier.

PHP’s advance notice says the critical cases require non-default configuration or uncommon setups. L3 reflects a widely deployed runtime with demonstrated attack paths and published fixes; it does not assert mass compromise or active exploitation. No victim count or campaign is established by these advisories. Individual CVEs affect different branches; the version table identifies releases containing the batch, not proof that every older runtime is vulnerable to every listed issue.

**The most direct remote path is CVE-2026-129289:** the frontend must reuse backend connections, and an application path must open `php://input` without fully consuming it. nginx `fastcgi_keep_conn on` or Apache `enablereuse=on` are relevant examples. A malformed upload can leave bytes that PHP-FPM interprets as another FastCGI request, including attacker-supplied script and administrator parameters. The demonstrated chain requires a known existing script path but does not require a memory corruption exploit, race or address leak. Frontends that close the connection after each request avoid that demonstrated FPM path. LSAPI shares the cleanup flaw, but the advisory establishes stream disruption, not the same code-execution chain.

PHP 8.5 backtrace flaws need their own assessment. CVE-2026-129474 requires a reachable magic-method call, suitable fatal-error timing, enabled fatal backtraces and included arguments; the demonstrated chain also needs usable addresses. A complete Laravel or Magento compromise is not demonstrated merely by showing those frameworks use magic methods. CVE-2026-129182 needs shutdown diagnostics that recreate the backtrace and an early diagnostic in a later request on the same worker; its specific entry points demonstrate UAF/crashes, not RCE. It is an incomplete fix of earlier stale-state handling. PHP 8.4 and earlier do not contain that fatal-backtrace global.

CVE-2026-129481 is another incomplete stale-state fix, in PHP 8.3–8.5 session shutdown. A fatal cleanup callback can leave a request-owned script filename for the next request in the same worker; upload progress is not required. Code execution through this field is not demonstrated. PHP 8.2 lacks the affected field. CVE-2026-129496 instead needs a suitable startup diagnostic actually written via PHP’s file-based error log and an early diagnostic in a fresh worker. FPM’s own log alone does not meet that condition. Native command execution was demonstrated locally with known addresses and additional assumptions; a complete independent remote ASLR bypass was not demonstrated.

**Worker execution is not root execution.** CVE-2026-129291 requires existing local code execution in a Linux epoll FPM worker and `catch_workers_output` enabled, plus control over process lifetimes and inherited descriptors. The master often runs as root, including affected official PHP-FPM Docker configurations. A non-root master limits the resulting privilege. This does not itself establish container escape. The upstream default outside such configurations leaves output capture disabled.

The remaining advisories cover interrupted file-session writes, signed-Phar downgrade, CGI path correction, modern DOM and SOAP parsing, status-page injection, outbound TLS scheme handling and oversized URI/HTTP-header processing. Their conditions and temporary measures are listed above. In particular, PHP-FPM and mod_php are outside the CGI PATH_INFO flaw; legacy DOMDocument is outside the modern DOM serializer flaw. Do not turn the presence of an extension into an assertion that every application is remotely exploitable.

PHP’s current release notes and each advisory are the authority for availability. Some advisory prose still says to upgrade when available; the November 19 release announcements confirm the versions have shipped. The October PHP2Shell versions remain historically correct fixes for the original CVEs, but do not cover these newly published incomplete-fix paths.
