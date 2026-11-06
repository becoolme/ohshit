---
title: Sogou Windows input method HTTP configuration hijacked to install DarkVigil
level: 4
date: '2026-11-04'
tags:
- Sogou
- Windows
- DNS hijacking
summary: 'ESET observed attackers redirecting Sogou Input Method’s HTTP configuration requests to deliver DarkVigil on Windows. DNS or network-path manipulation is required; its location remains unknown. Upgrade to 16.10 and investigate existing infections: the update does not establish that implanted hosts are clean.'
splash: Windows Sogou Input Method before 16.10 where attackers can redirect its HTTP configuration traffic through DNS/network manipulation.
wipe: Install official Sogou 16.10 or later; isolate suspected hosts, preserve evidence and investigate DarkVigil before restoring access.
inTheWild: 'yes'
inTheWildNote: ESET observed malicious SGTool.exe configuration delivery and DarkVigil execution.
cves:
- id: CVE-2026-120422
  score: 8.9
  name: Unencrypted brand-promotion configuration retrieval
  description: SGTool.exe retrieves configuration over HTTP; attackers controlling DNS resolution or the network path can substitute instructions that place executable payloads in component-loading locations. ESET CNA scores CVSS 4.0 8.9; Windows versions before 16.10 are affected.
fixed:
- product: Sogou Input Method for Windows
  version: '16.10'
  status: Vendor release changes affected requests to HTTPS; ESET also reports certificate pinning
timeline:
- date: Jul 1, 2026
  title: ESET begins observing Sogou-mediated DarkVigil deployment
  body: Retrospective telemetry from targeted environments, not the public disclosure date.
- date: Sep 11, 2026
  title: ESET reports the weakness to Tencent Security
- date: Sep 21, 2026
  title: Tencent acknowledges the issue
- date: Oct 30, 2026
  title: Official 16.10 changelog records security fixes
  body: ESET’s disclosure timeline also dates remediation to October 30; one narrative passage instead says October 29. The version threshold is consistent, but the report’s day differs internally.
- date: Nov 2, 2026
  title: ESET assigns the CVE identifier
- date: Nov 4, 2026
  title: ESET publishes the operation and technical analysis
checklist:
- title: Install the verified Windows release from a trusted route
  hint: Check the installed Sogou Input Method version and obtain official 16.10 or later through the known Sogou site from a trusted network/device. The vendor changelog confirms 16.10; ESET says affected HTTP requests now use HTTPS and certificate pinning. No public numeric four-part build threshold or separate interim workaround is established. Do not treat a successful update as malware removal.
- title: Isolate suspected hosts and preserve the component-loading evidence
  hint: Preserve SGTool.exe process/network records, DNS settings and responses, downloaded configuration and files before cleanup. Investigate \SogouInput\Components\SogouComMgr.exe, \Components\libcef.dll and the versioned \Components\biz_center\<version_number>\ payload locations, including biz_helper.exe. A legitimate signed Adobe helper was renamed to SogouComMgr.exe to sideload the DLL; a signature or familiar filename alone does not establish safety. Review HKCU\Software\Microsoft\IME\<HWID>\pluginHash for compressed plugins. Use your incident-response process to scope persistence, rebuild from trusted media where needed, and replace exposed credentials from a clean device. These are defensive actions, not a vendor-issued cleanup tool.
- title: Hunt the complete published network set with context
  hint: 'ESET lists five domains and four IPs: blog.wangmengfun.top; update.mssproxy.net; img.fusfun.top; dev.soft-png-cdn.com; sogou-cdn.com; 47.86.15.162; 47.236.254.159; 47.237.122.175; 47.239.250.102. Correlate DNS/proxy/endpoint logs with SGTool.exe --appid=scdreg -update and HTTP config.pinyin.sogou.com/api/brandScd/getBrandScd.php. The configuration hostname is legitimate Sogou infrastructure, not an attacker domain. Check endpoint/router DNS controls and upstream resolvers; ESET has not established where manipulation occurred. A match alone does not prove compromise, and absence does not clear an exposed host.'
- title: Compare samples against the original hash files
  hint: 'The two published SHA-1 values are 8A60A8E90E1F5F08F28FE5A6DD57BD686C20DC23 (libcef.dll) and 3E16BA611782AF6E45576D390488D28FD676BADE (Microsoft.VisualStudio.HostingProcess.Utilities.Sync.dll). MD5: 92d5aa18041ccf0487a73ecaaa86f871; c0d248994187db08f6413df26c4c5d8c. SHA-256: fa9e3d0112fede8d31bbf759979fde3f9db48576c69e0e8ed4b5d6f9323fcec8; 7e628dd33aa09877bdda13606de11978743d09e0a3ea4a51dbd7cbd4b0ae8fb6. Use ESET’s original repository to preserve hash-to-sample context; do not execute samples. The signed helper SHA-1 79188C8DE2378B437D39E867475C5B4714A0D7C9 is a legitimate binary abused by the operation, not inherently malicious. Hash matches need context and nonmatches do not exclude other builds.'
sources:
- name: ESET original SlippyNunchucks investigation
  url: https://www.welivesecurity.com/en/eset-research/slippynunchucks-hijacks-sogou-input-methods-brand-promotion-mechanism-to-distribute-malware/
  primary: true
- name: Sogou official Windows changelog
  url: https://pinyin.sogou.com/changelog.php
  primary: true
  says: October 30 release 16.10 and security fixes; original Chinese text decoded as GB18030.
- name: ESET-authored CNA record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-120422
  primary: true
- name: ESET original indicators and sample hash files
  url: https://github.com/eset/malware-ioc/tree/master/slippynunchucks/
  primary: true
---

ESET describes a targeted surveillance operation, not a compromise of every Sogou installation or proof that Tencent’s servers were breached. The affected Windows component fetches brand-dictionary icon configuration over HTTP. In victim environments, DNS resolved the legitimate configuration host to attacker staging servers. A replacement configuration placed a signed Adobe helper and a DarkVigil DLL in locations used by existing component-loading workflows, enabling sideloading and persistence.

The attack requires control over DNS resolution or the traffic path; ESET could not determine whether manipulation occurred at routers, an ISP or elsewhere. It reports Sogou-mediated activity from July 1 in Hong Kong, Thailand, Japan, Vietnam, Sri Lanka and Oman, while discussing a broader, older DarkVigil ecosystem separately. No victim total or aggregate loss is supplied. ESET tracks the China-aligned actor as SlippyNunchucks and says it found no overlap establishing Mustang Panda attribution. Those are researcher assessments, not a confirmed identity or proof that all previously mentioned applications shared this vector.

L4 reflects observed malicious delivery and execution through a widely used client. This entry covers CVE-2026-120422, not the separate CVE-2026-51990 mentioned as earlier research. Windows is the affected platform in the CNA record; no equivalent mobile flaw is established. Version 16.10 repairs the delivery weakness, but preexisting implants and their plugins require incident response. The original report’s October 29/30 remediation-day discrepancy is retained above; neither day changes the November 4 public disclosure date.
