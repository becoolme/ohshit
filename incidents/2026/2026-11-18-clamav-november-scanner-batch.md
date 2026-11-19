---
title: ClamAV fixes ten scanner flaws in 1.5.5 and 1.4.7
date: 2026-11-18
level: 3
tags:
  - ClamAV
  - antivirus
  - DoS
  - Cisco
summary: ClamAV 1.5.5 and 1.4.7 patch ten flaws involving malformed scan inputs, memory errors, loops and resource-limit bypasses. Cisco Secure Endpoint Connectors require separate platform updates. Cisco reports no known malicious use.
splash: ClamAV processing attacker-supplied scan inputs; some paths need phishing database entries or debug logging
wipe: Upgrade ClamAV to 1.5.5 or 1.4.7; bundled Cisco Connectors need their platform-specific updates.
inTheWild: no
inTheWildNote: Cisco PSIRT reports no known malicious use of the vulnerabilities.
cves:
  - id: CVE-2026-76411
    score: 7.5
    name: Phishcheck URL length accounting
    description: Crafted email can cause a stack-buffer write when full-hash phishing database entries are loaded. Upstream traces introduction to 0.94.
  - id: CVE-2026-76414
    score: 7.5
    name: CHM cyclic directory traversal
    description: Crafted CHM directory pointers can cause an infinite scanning loop. Upstream traces introduction to 0.100.0.
  - id: CVE-2026-76415
    score: 7.5
    name: yC executable offset validation
    description: Malformed yC-packed executables can trigger underflow and out-of-bounds heap reads. Upstream traces introduction to 0.96.
  - id: CVE-2026-76416
    score: 7.5
    name: InstallShield worker loop
    description: Malformed InstallShield file-table counts or offsets can pin a scan worker. Upstream traces introduction to 0.96.
  - id: CVE-2026-76417
    score: 7.5
    name: OLE2 resource exhaustion
    description: Upstream describes stack exhaustion from deeply nested OLE2 properties; Cisco describes memory exhaustion. Upstream traces introduction to 0.71.
  - id: CVE-2026-76421
    score: 7.5
    name: CHM LZX match offsets
    description: Malformed CHM LZX matches can cause out-of-bounds heap writes. Upstream traces introduction to 0.80.
  - id: CVE-2026-76422
    score: 7.5
    name: Rust-to-C logging format handling
    description: Upstream describes crash, process-memory disclosure or corruption from attacker-controlled logged text; Cisco describes a debug-logging DoS path. Introduced in 0.105.0.
  - id: CVE-2026-76430
    score: 7.5
    name: UPX decompression and PE rebuild bounds
    description: Upstream describes out-of-bounds heap writes while unpacking malformed executables; Cisco describes an out-of-bounds read/DoS. Introduced in 0.94.1.
  - id: CVE-2026-76515
    score: 7.5
    name: OLE2 directory-chain scan-time bypass
    description: Crafted OLE2 directory chains can consume excessive CPU beyond configured scan time. Upstream traces introduction to 0.98.1.
  - id: CVE-2026-76516
    score: 7.5
    name: XAR extraction resource-limit bypass
    description: Upstream describes temporary-storage exhaustion during extraction; Cisco describes MaxFileSize bypass and possible looping. Introduced in 0.98.
fixed:
  - product: ClamAV 1.5
    branch: "1.5"
    version: 1.5.5
    status: November security fixes
  - product: ClamAV 1.4
    branch: "1.4"
    version: 1.4.7
    status: November security fixes backported
  - product: Cisco Secure Endpoint Connector for Linux
    version: 1.29.3
    status: Cisco-listed first fixed release
  - product: Cisco Secure Endpoint Connector for Mac
    version: 1.27.5
    status: Cisco-listed first fixed release
  - product: Cisco Secure Endpoint Connector for Windows
    version: 8.6.4
    status: Cisco-listed first fixed release
timeline:
  - date: Nov 18, 16:00 UTC
    title: Cisco publishes its downstream advisory
    body: Ten independent ClamAV vulnerabilities affect Secure Endpoint Connectors; Cisco lists platform-specific fixes and no workaround.
  - date: Nov 18, 16:30 UTC
    title: ClamAV publishes the upstream security release
    body: The project announces 1.5.5 and 1.4.7 with the same ten CVE fixes. Docker images may appear later than the announcement.
checklist:
  - title: Update the scanning engine and verify the running deployment
    hint: Use ClamAV 1.5.5 or 1.4.7 from the project’s downloads, GitHub releases or the updated distribution package. Update container images when available and deploy the fixed engine; do not assume signature-database updates replace an engine upgrade.
  - title: Use Cisco’s Connector fixes for bundled deployments
    hint: Cisco lists Linux 1.29.3, Mac 1.27.5 and Windows 8.6.4 through its Secure Endpoint portal. Check configured auto-update policy and actual connector versions. Private Cloud customers receive connector updates through normal content updates after clients become available; the Private Cloud service itself is not the affected component.
  - title: Check the relevant scan paths and avoid relying on existing limits
    hint: Inventory email/file scanning of CHM, yC/UPX executables, InstallShield, OLE2/CFB and XAR archives. Phishcheck CVE-2026-76411 needs full-hash phishing database entries; Cisco describes CVE-2026-76422 with debug logging enabled. Some flaws bypass scan-time, file-size or extraction limits, so existing limits are not a complete fix.
  - title: Verify scanning health after deployment
    hint: Check that the updated scanner is running and completing expected scans; investigate crashes, stuck workers, CPU/memory exhaustion or exhausted temporary storage. These are documented possible effects, not published compromise indicators. Cisco lists no workaround that addresses the vulnerabilities.
sources:
  - name: ClamAV November security release
    url: https://blog.clamav.net/2026/11/clamav-155-147-security-patch-release.html
    primary: true
    says: Names all ten fixes, historical introductions, upstream 1.5.5/1.4.7 targets and container availability caveat; describes several memory-write and logging effects.
  - name: Cisco downstream ClamAV advisory
    url: https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-clamav-multi-e93M3vdA
    primary: true
    says: Describes DoS/limit-bypass impact, per-platform Connector fixes, Windows-versus-Linux/Mac severity, no workaround and no known malicious use.
---

ClamAV’s November 18 security release fixes ten independent vulnerabilities in 1.5.5 and the 1.4.7 backport. Exposure requires attacker-controlled content to reach the corresponding scanner, unpacker or logging path. The phishcheck issue additionally requires full-hash phishing database entries; Cisco describes the logging issue with debug logging enabled. A deployment affected by one bug need not be affected by all ten.

The upstream blog identifies historical introduction versions for each issue and describes the affected development range through 1.5.4, while explicitly identifying 1.4.7 as a fixed backport. Use the release-line-specific fixes above rather than treating the largest version in that historical range as the only upgrade target. These are engine fixes; the release announcement also warns that updated Docker images may not be immediately available.

**The sources describe different impact detail.** ClamAV documents stack/heap writes, a logging format-string problem that can disclose or corrupt process memory, scan loops and resource exhaustion. Cisco’s downstream advisory and CNA records describe denial of service and scan-limit bypasses in its products. In particular, the UPX report differs on read versus write, OLE2 differs on memory versus stack exhaustion, and XAR differs on file-size/looping versus extraction-storage limits. Preserve those product-specific descriptions; neither a memory-write label nor Windows scanner privileges establish a demonstrated remote code-execution chain here.

The displayed 7.5 scores are Cisco’s CVSS 3.1 values for the ten identifiers, not a uniform assessment of every deployment. Cisco rates Windows Connector impact High and Linux/Mac Medium, listing platform scores of 7.5 and 5.3 respectively. Cisco says Secure Endpoint Private Cloud itself is not impacted: its connector distribution is the concern. Its fixed-software table still has a Private Cloud release placeholder, so follow the Connector targets and content-update process instead of inventing a server patch version.

Cisco reports no known malicious use or public announcements of exploitation, and lists no workaround addressing the vulnerabilities. L3 reflects remotely supplied input reaching a mainstream scanning engine, with documented memory-safety and availability impact; it is not a report of victim compromise. No incident-specific attack indicators or victim count are published in these sources.
