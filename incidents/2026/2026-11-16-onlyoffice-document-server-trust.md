---
title: ONLYOFFICE Docs view-only access can lead to container root
level: 3
date: 2026-11-16
tags: [ONLYOFFICE, Document Server, Docker, JWT]
summary: Rapid7 demonstrated two chains from view-only document access to root in the official ONLYOFFICE Document Server container. A separate entry path needs no existing account or token when WOPI is enabled and the server can reach an attacker-controlled source allowed by the WOPI filter.
splash: Demonstrated on official Document Server 9.4.0-129. The full affected range of the combined findings is unknown.
wipe: Upgrade to supported Document Server 10.0.0 or later. Until then, restrict access and disable unused WOPI integrations.
inTheWild: unknown
inTheWildNote: Rapid7 published working proofs of concept and did not report real-world exploitation.
cves:
  - id: CVE-2026-113627
    score: 7.1
    name: DocBuilder native file read and session forgery
    description: An accepted editor token can authorize file reads that expose signing material for forged session tokens.
  - id: CVE-2026-110385
    score: 8.7
    name: DocBuilder output path injection
    description: An Inbox-compatible token can reach a conversion job that writes outside the intended job directory and leads to command execution as ds.
  - id: CVE-2026-97727
    score: 6.5
    name: Complete-save path traversal
    description: A session token can reach a save path that writes outside the intended destination.
  - id: CVE-2026-113630
    score: 7.8
    name: Privileged maintenance helper command injection
    description: Code execution as ds in the official container can escalate to root through a helper allowed by sudoers.
  - id: CVE-2026-113631
    score: 6.5
    name: View-only export bypass
    description: A viewer can export hidden document data even when download and form filling are disabled.
fixed:
  - product: ONLYOFFICE Document Server
    version: 10.0.0
timeline:
  - date: Oct 14, 2026
    title: DocBuilder output path CVE is published
    body: The public CVE describes the file write and execution as the document service account.
  - date: Oct 23, 2026
    title: ONLYOFFICE confirms the five fixes to Rapid7
    body: Rapid7 says the vendor confirmed that Document Server 10.0 fixed all five findings.
  - date: Nov 16, 2026
    title: Rapid7 discloses the combined paths and publishes test code
    body: The researcher demonstrates container root from a view-only session and from the conditional WOPI entry.
checklist:
  - title: Upgrade Document Server and check the running version
    hint: Check the runtime package or image and your integration’s compatibility. Back up persistent data and retain the configured mounts and secrets. Follow the vendor's update guide for your edition, confirm the running version, and test viewing, editing and saving with a restricted user.
  - title: Limit exposure until upgrade
    hint: Disable WOPI if unused. If required, restrict WOPI sources to known integrations and use egress controls to prevent the server reaching untrusted sources. Limit public access and external sharing on unpatched servers. These measures do not fix the view-only token path.
  - title: Investigate suspicious access before rebuilding or rotating secrets
    hint: Preserve container, reverse proxy, integration and host logs. Look for unexpected document build or WOPI requests, changes to runtime.json, unusual callback destinations and shells launched by the document service or its cache helper. A match alone does not establish compromise. If compromise is suspected, isolate the workload, check the host and mounted data, rebuild from a clean image and rotate exposed JWT keys and integration credentials before restoring access.
sources:
  - name: Rapid7 coordinated disclosure and technical analysis
    url: https://www.rapid7.com/blog/post/ve-from-view-only-access-to-container-root-five-vulnerabilities-in-onlyoffice-docs-fixed/
    primary: true
    says: Documents the five findings, test builds, prerequisites, proofs of concept and vendor confirmation of fixes.
  - name: ONLYOFFICE Document Server changelog
    url: https://github.com/ONLYOFFICE/DocumentServer/blob/master/CHANGELOG.md
    primary: true
    says: Lists security changes in 10.0.0, including fixes to DocBuilder and WOPI.
  - name: ONLYOFFICE Community Edition Docker update guide
    url: https://helpcenter.onlyoffice.com/docs/installation/community/docker/update
    primary: true
    says: Explains how to update the Docker installation and preserve its mapped directories.
  - name: CVE record for the DocBuilder output path flaw
    url: https://cveawg.mitre.org/api/cve/CVE-2026-110385
    primary: true
    says: Records the earlier disclosure and describes code execution as ds before 10.0.0.
---

Rapid7 tested the official 9.4.0 image with package 9.4.0-129, JWT checks enabled, and Browser and Inbox validation using the same effective key. The two chains use a shared DocBuilder authorization weakness but different file-write paths. Each reaches execution as the document service account and then abuses a maintenance helper to obtain root inside the container. The report does not demonstrate a container escape.

The alternate entry requires the non-default WOPI feature, network reachability from Document Server to an attacker-controlled WOPI source, and a filter that allows that source. Under those conditions, Rapid7 demonstrated both chains without a pre-existing account or token. Separately, a viewer can export a reconstructed DOCX containing items such as custom XML and field instructions that were never rendered.

ONLYOFFICE confirmed all five fixes in Document Server 10.0. Rapid7 ran targeted checks on package 10.0.0-169. The aggregate affected range beyond the tested vulnerable package is unknown. The independently disclosed CVE-2026-110385 covers versions before 10.0.0 under its own prerequisites.
