---
title: "GeoNode proxy bypass exposes internal services and a vector upload can run server commands"
level: 3
date: 2026-11-05
tags: [GeoNode, SSRF, RCE, GIS]
summary: "GeoNode disclosed seven vulnerabilities, including a proxy allowlist bypass that can return internal HTTP responses and a command injection flaw in vector uploads. The proxy advisory includes a public proof of concept."
splash: "GeoNode deployments exposing the affected proxy, or allowing users to upload vectors, documents or other assets."
wipe: "Upgrade to GeoNode 5.0.3 or 5.1.0, or a newer release. Restrict proxy, upload and asset-link access until patched."
inTheWild: unknown
inTheWildNote: "Public proxy and asset-read proofs of concept. No confirmed attacks in the advisories."
cves:
  - id: GHSA-8mc9-fhgx-fwcj
    name: "Proxy allowlist bypass"
    description: "A crafted URL containing an allowed host can reach another destination through /proxy/ and return the upstream response."
  - id: CVE-2026-33050
    score: 8.8
    name: "Vector upload command injection"
    description: "A low-privilege user who can upload vectors can put shell syntax in a layer name and run commands as the server's import process."
  - id: CVE-2026-65830
    score: 6.5
    name: "Cross-user asset file read"
    description: "An authenticated asset owner can use path traversal on the asset download link to read other users' local asset files."
  - id: GHSA-hw9r-6m78-w6h3
    score: 5.3
    name: "Document thumbnail SSRF"
    description: "An authenticated user who can add a remote document can induce requests to loopback or other internal services."
  - id: CVE-2026-55649
    score: 6.3
    name: "Stored document metadata XSS"
    description: "Script in a document abstract can execute when a user views the affected content."
  - id: GHSA-7vj5-f7gq-96m5
    score: 8.7
    name: "GeoStory DOM XSS"
    description: "A low-privilege attacker can plant browser script in the affected MapStore2-based client. A victim must interact with the crafted content."
  - id: CVE-2026-46429
    score: 5.5
    name: "Unrestricted file upload"
    description: "A crafted upload can bypass validation and let GeoNode store and serve a malicious file."
fixed:
  - { product: GeoNode 5.0.x, branch: "5.0", version: "5.0.3", status: "Patched for this batch" }
  - { product: GeoNode 5.1.x, branch: "5.1", version: "5.1.0", status: "Patched for this batch" }
timeline:
  - date: Aug 18, 2026
    title: "GeoNode ships 5.0.3 and 5.1.0"
  - date: Nov 5, 2026
    title: "Maintainers publish seven advisories"
  - date: Nov 6, 2026
    title: "CVE records publish for vector injection, file uploads and metadata XSS"
checklist:
  - title: "Upgrade every deployed component"
    hint: "Back up the database and asset storage, upgrade the web application and import workers, and confirm every replica runs the patched version."
  - title: "Limit exposure while upgrading"
    hint: "Restrict /proxy/, asset-link downloads, and untrusted uploads. Disable remote document imports where possible. Use network egress rules to block unnecessary access to internal services and cloud metadata."
  - title: "Check for signs of abuse"
    hint: "Review proxy requests for unusual encoded URLs and internal destinations, requests to /api/v2/assets/<pk>/link/<path> for encoded traversal, and upload worker logs for unexpected child processes. A match alone is not proof."
  - title: "Review content already stored"
    hint: "Review suspect document abstracts, GeoStories and uploaded files before restoring normal access. Preserve copies for investigation and quarantine or remove malicious content."
  - title: "Contain confirmed compromise"
    hint: "Isolate affected hosts, preserve logs and uploaded artifacts, and rebuild from trusted images. Revoke credentials the affected processes could access, including database or cloud credentials where applicable."
sources:
  - name: "GeoNode advisory index"
    url: https://github.com/GeoNode/geonode/security/advisories
    says: "Links all seven disclosures, their prerequisites and the maintainers' affected-version statements."
    primary: true
  - name: "GeoNode proxy advisory"
    url: https://github.com/GeoNode/geonode/security/advisories/GHSA-8mc9-fhgx-fwcj
    says: "Documents the allowlist bypass, its public reproduction and the 5.0.3 fix."
    primary: true
  - name: "GeoNode vector importer patch"
    url: https://github.com/GeoNode/geonode/commit/1408290c0bb54872924a9b334a516db9758a2180
    says: "Stops passing a user-influenced command string to a shell."
    primary: true
  - name: "GeoNode 5.0.3 release"
    url: https://github.com/GeoNode/geonode/releases/tag/5.0.3
    says: "Publishes the patched 5.0.x release."
    primary: true
  - name: "GeoNode 5.1.0 release"
    url: https://github.com/GeoNode/geonode/releases/tag/5.1.0
    says: "Publishes the patched 5.1 release."
    primary: true
---

GeoNode publishes maps, datasets and documents. Its proxy checks requests against an allowlist before forwarding them. The published example embeds a permitted hostname in a crafted URL. The proxy then connects to another destination and returns its HTTP response. The attacker needs access to the proxy and a hostname the deployment allows. A separate thumbnail-fetch issue lets an authenticated user with remote-document upload access send requests to internal destinations.

A user allowed to upload vector data can supply a layer name that changes what the import worker executes. The [CNA record](https://cveawg.mitre.org/api/cve/CVE-2026-33050) lists 5.1.0, and the tagged [5.0.3 importer](https://github.com/GeoNode/geonode/blob/5.0.3/geonode/upload/handlers/common/vector.py) also passes an argument list to the conversion process with shell execution disabled. The repository advisory still lists no patched release for that issue.

The batch also covers cross-user access to local asset files, two browser scripting flaws and upload validation bypass. The repository advisory for stored document XSS names 5.0.1, while the [CNA record](https://cveawg.mitre.org/api/cve/CVE-2026-55649) and metadata sanitization backport support 5.0.3 as the upgrade target. The GeoStory advisory lists 4.4.5 and 5.0.2 for the client flaw alone. Sites using an older line or independently packaged client should verify the GeoStory fix in the deployed client and plan a GeoNode upgrade for the server fixes.

The vendor advisories for the CVE entries are [GHSA-9fpx-fr6j-2vh6](https://github.com/GeoNode/geonode/security/advisories/GHSA-9fpx-fr6j-2vh6), [GHSA-q88x-rvm8-wxp4](https://github.com/GeoNode/geonode/security/advisories/GHSA-q88x-rvm8-wxp4), [GHSA-r4hm-p9f9-fj9v](https://github.com/GeoNode/geonode/security/advisories/GHSA-r4hm-p9f9-fj9v) and [GHSA-fqpv-mq26-pr4j](https://github.com/GeoNode/geonode/security/advisories/GHSA-fqpv-mq26-pr4j).
