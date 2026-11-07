---
title: LibreOffice fixes a dBASE index heap overflow triggered through database documents
level: 3
date: 2026-11-05
tags: [LibreOffice, document parsing, memory corruption]
summary: Crafted dBASE index data can overflow LibreOffice memory when a database document references it. Update the 26.2 branch to 26.2.6+ or 26.8 to 26.8.1+. ZDI describes code execution with user interaction; the vendor scores the same flaw 5.4 under CVSS 4.0. No confirmed attacks are established by these notices.
splash: Users opening untrusted database documents or dBASE data sources with crafted .ndx index files
wipe: Install LibreOffice 26.2.6+ or 26.8.1+ from your official channel, relaunch and verify Help > About
inTheWild: unknown
inTheWildNote: The read vendor and researcher notices do not establish attacks in the wild.
cves:
  - id: CVE-2026-76181
    score: 5.4
    name: dBASE index heap buffer overflow
    description: Unchecked index-page entry counts can overflow a heap buffer; cyclic page references can also cause uncontrolled recursion. Vendor CVSS 4.0 is 5.4; ZDI gives a separate 7.8 score and describes code execution in the current process.
fixed:
  - { product: LibreOffice 26.2, branch: '26.2', version: 26.2.6 }
  - { product: LibreOffice 26.8, branch: '26.8', version: 26.8.1 }
timeline:
  - date: Nov 5, 2026
    title: The Document Foundation announces the flaw and fixed versions
  - date: Nov 6, 2026
    title: ZDI publishes its coordinated researcher advisory
    body: ZDI-26-895 describes a malicious .odb reference to dBASE index data, requiring the target to open malicious content.
checklist:
  - title: Update and verify the desktop application
    hint: Use LibreOffice’s official download or your operating system’s maintained package channel. Compare Help > About with 26.2.6 or 26.8.1 for your branch, then fully close and relaunch the suite. Confirm distribution backports with your distributor rather than treating an older upstream number as proof of missing patches.
  - title: Hold untrusted database material while updating
    hint: Do not open unexpected .odb files or dBASE folders containing .ndx indexes on an unpatched installation. ZDI identifies document-driven parsing; this is not an unauthenticated network-service vulnerability. Keep the files for controlled investigation if unexpected crashes occur.
sources:
  - name: LibreOffice official security advisory
    url: https://www.libreoffice.org/security/#cve-2026-76181
    primary: true
    says: November 5 announcement, index bounds/recursion mechanism and fixed 26.2.6/26.8.1 branches.
  - name: Document Foundation CNA record
    url: https://raw.githubusercontent.com/CVEProject/cvelistV5/main/cves/2026/76xxx/CVE-2026-76181.json
    primary: true
    says: Vendor CVSS 4.0 5.4; affected 26.2/26.8 ranges. Its proof-of-concept maturity metric is not evidence of an observed attack.
  - name: ZDI-26-895 original researcher advisory
    url: https://www.zerodayinitiative.com/advisories/ZDI-26-895/
    primary: true
    says: November 6 disclosure; 7.8 and user-assisted code execution through dBase indexes referenced from .odb documents.
---

The affected driver reads dBASE tables and their index files when a folder is used as a database source. A crafted page can claim more entries than its allocation permits, or point back to a parent. The fixes bound entry counts and reject recursive page chains.

The vendor and ZDI describe the same vulnerability with different scoring systems and impact emphasis; their scores are not interchangeable. L3 reflects a mainstream document parser and ZDI’s credible code-execution assessment with user interaction, rather than a confirmed campaign or universal exposure of every document format. No complete range for older unsupported branches is established here; move those installations to a maintained fixed release.
