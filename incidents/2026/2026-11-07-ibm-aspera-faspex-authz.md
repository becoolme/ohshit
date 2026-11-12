---
title: IBM Aspera Faspex authorization bypass can grant full administrator access
level: 4
date: '2026-11-07'
updated: 2026-11-12
tags: [IBM, Aspera, authorization]
summary: IBM says a crafted message can grant full administrative privileges on Faspex 5.0.0 through 5.0.19. Its text describes an authenticated user, while its CVSS vector lists no privileges required. The Linux fix is 5.0.19 PL1. Check the running faspex-core image for build 1ce4b13 and Fix Pack 1.
splash: IBM Aspera Faspex 5.0.0 through unpatched 5.0.19. IBM's narrative and scoring disagree on the login requirement.
wipe: Restrict untrusted access and install 5.0.19 PL1. Verify the running faspex-core image and review changes to administrator access.
inTheWild: 'yes'
inTheWildNote: CISA added the Faspex authorization flaw to KEV on November 9.
cves:
- id: CVE-2026-123218
  score: 9.8
  name: Authorization bypass to full administrator
  description: IBM says a crafted message can grant full administrative privileges. The score is IBM's CVSS 3.1 assessment.
fixed:
- product: IBM Aspera Faspex on Linux
  version: 5.0.19 PL1
  status: Verify faspex-core 5.0.19 build 1ce4b13, Fix Pack 1
timeline:
- date: Nov 7, 2026
  title: IBM publishes the Faspex security bulletin and CVE
  body: IBM identifies the vulnerable range and recommends applying the Linux patch level.
- date: Nov 9, 2026
  title: CISA adds CVE-2026-123218 to KEV
  body: The catalog confirms known exploitation. The catalog due date for applicable U.S. federal civilian agencies is November 12, 2026. Follow vendor remediation and CISA BOD 26-04 forensic triage guidance.
checklist:
- title: Inventory Faspex and limit who can reach it
  hint: Check deployed Faspex versions and review firewall or reverse-proxy rules. Restrict access from untrusted networks while preparing the patch. Do not rely on the login screen alone while IBM's prerequisite is unclear.
- title: Install the vendor patch level and verify the running image
  hint: Follow IBM's linked Faspex container-image patch instructions for 5.0.19 PL1. Check that the running faspex-core image reports 5.0.19 build 1ce4b13 and Fix Pack 1, then test authorized transfers and administration.
- title: Review administrator changes and preserve evidence
  hint: Preserve Faspex and proxy access logs. Review new administrator grants and unexpected administrative activity against approved changes. If suspicious activity is found, investigate access and scope affected credentials before rotating them from a clean system.
sources:
- name: IBM Faspex security bulletin
  url: https://www.ibm.com/support/pages/node/7295921
  primary: true
  says: Lists affected releases, conflicting prerequisite signals and the exact Linux fix and image build.
- name: IBM CNA record
  url: https://cveawg.mitre.org/api/cve/CVE-2026-123218
  primary: true
  says: Records IBM's description, CVSS vector and patch verification details.
- name: CISA Known Exploited Vulnerabilities Catalog
  url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
  primary: true
  says: CISA adds CVE-2026-123218 to KEV on November 9, with a November 12 due date.
---

IBM's bulletin summary describes an authenticated user, and the vulnerability text refers to an authorized user. The same bulletin and CNA record use `PR:N` in the CVSS vector. The reviewed sources do not resolve whether credentials are required. Restrict access and patch even when Faspex already requires login. IBM identifies no workaround. CISA subsequently confirmed known exploitation, which warrants L4. The reviewed sources do not establish the victims or attack method.

The catalog confirms known exploitation. The catalog due date for applicable U.S. federal civilian agencies is November 12, 2026. Follow vendor remediation and CISA BOD 26-04 forensic triage guidance.
