---
title: CloudPaste can reveal WebDAV credentials through a public file share
level: 3
date: '2026-11-15'
tags: [CloudPaste, WebDAV, credential exposure]
summary: CloudPaste 1.1.0 through 1.9.1 can return the backing WebDAV username and password to an unauthenticated caller who knows a public share identifier. Restrict access to the proxy-link endpoint and rotate exposed storage credentials. No patched release has been confirmed.
splash: CloudPaste 1.1.0–1.9.1 with a reachable proxy-link endpoint and public WebDAV shares that use direct upstream links.
wipe: Block public access to /api/proxy/link and rotate credentials for any exposed WebDAV storage account.
inTheWild: 'no'
inTheWildNote: The researcher demonstrated the leak in a lab. No production exploitation was reported.
cves:
- id: CVE-2026-129494
  score: 8.7
  name: WebDAV credentials in the proxy-link response
  description: The unauthenticated proxy-link endpoint can return the WebDAV Basic Authorization header when resolving a public share.
timeline:
- date: Oct 29, 2026
  title: An earlier report identifies access-control flaws in the same endpoint
  body: It describes unauthorized file reads and a share-password bypass.
- date: Nov 15, 02:57 UTC
  title: Researcher reports WebDAV credential exposure in the project tracker
  body: A test deployment returned the storage credentials and the researcher used them to read an unshared file.
- date: Nov 16, 00:00 UTC
  title: VulnCheck publishes CVE-2026-129494
  body: The record identifies 1.1.0 through 1.9.1 as affected.
checklist:
- title: Restrict the proxy-link endpoint
  hint: Block external access to POST /api/proxy/link at the edge and origin, including direct Worker URLs if applicable. If a trusted reverse proxy needs it, restrict the route to that proxy and verify that unauthenticated requests from other networks are rejected. Blocking the endpoint can interrupt link resolution.
- title: Rotate exposed WebDAV credentials
  hint: Treat credentials for public WebDAV shares using direct upstream links as exposed if the endpoint was reachable. Revoke the old secrets at the WebDAV server, replace them through a trusted admin path and give the replacement account only the storage permissions it needs.
- title: Investigate storage access and track a patch
  hint: Preserve access logs for the CloudPaste proxy-link route and the backing WebDAV server. Look for unexpected requests and subsequent reads, writes or deletes under the storage account. Keep the restriction in place until a verified fix ships and confirm the response never returns storage credentials to an external caller.
sources:
- name: Wu Yulun’s CloudPaste reproduction
  url: https://vul.yulun.ac.cn/zh-CN/20261115/cloudpaste/
  primary: true
  says: Documents the public WebDAV share, direct upstream request and reuse of the returned storage credentials.
- name: Researcher disclosure in the CloudPaste issue tracker
  url: https://github.com/ling-drag0n/CloudPaste/issues/223
  primary: true
  says: Records when the researcher publicly reported the credential exposure and linked the reproduction.
- name: VulnCheck CVE record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-129494
  primary: true
  says: Lists the affected range and CVSS 4.0 score of 8.7.
- name: Earlier proxy-link access-control report
  url: https://hackmd.io/@hieund/cloudpaste-proxy-link-missing-auth
  primary: true
  says: Documents file access and share-password bypass issues in the same endpoint.
- name: CloudPaste release list
  url: https://github.com/ling-drag0n/CloudPaste/releases
  primary: true
  says: The latest release at the time of checking was v1.9.1.
---

A November 15 public reproduction showed that an unauthenticated caller could send the identifier of a public WebDAV-backed share to `POST /api/proxy/link`. In direct upstream mode (`use_proxy: 0`), CloudPaste returned the upstream URL and the Basic Authorization header containing the storage account credentials. The researcher decoded the header and used those credentials to read an unshared file in the test WebDAV service. If the backing service is reachable and the account has broader rights, those credentials can also permit changes or deletions.

An October report documented file access and password checks at the same endpoint. The November report demonstrates that the path can also expose the backing account’s reusable credentials. Restrict the endpoint and revoke previously exposed credentials at the storage server. No patched release was confirmed at publication.
