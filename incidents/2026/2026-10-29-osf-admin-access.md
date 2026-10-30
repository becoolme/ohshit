---
title: OSF administrative access flaw exposes user contacts and private project metadata
date: 2026-10-29
level: 3
tags: [OSF, SaaS, access control]
summary: OSF confirms unauthorized access through sixteen internal administrative endpoints. Names, emails, user IDs and project metadata were exposed, including private project titles and descriptions. The operator says files and passwords were not accessed; the affected-user count is unknown.
splash: OSF users, moderators and owners of public or private projects, registrations and preprints
wipe: Read OSF’s notice and verify unexpected requests through known channels; the operator requires no user action
inTheWild: yes
inTheWildNote: OSF confirms unauthorized external access and says the issue is resolved.
cves: []
fixed: []
timeline:
  - date: Oct 17, 2026
    title: Administrative access-control vulnerability introduced
  - date: Oct 24, 2026
    title: Earliest unauthorized access in logs
  - date: Oct 27, 2026
    title: Application disabled, then fixes verified and staff access restored
  - date: Oct 29, 2026
    title: Public incident notice
checklist:
  - title: Review the official notice
    hint: OSF says no user action is required. For questions about your account or project exposure, contact support@osf.io through the official help site.
  - title: Verify requests quoting private project details
    hint: Check unexpected messages with your collaborators through an existing contact method. A familiar project title does not authenticate the sender.
sources:
  - name: OSF incident notice
    url: https://help.osf.io/article/774-security-incident-october26
    primary: true
    says: Confirms accessed metadata, containment and exclusions; all users are being notified.
---

Exposed metadata includes GUIDs, titles and descriptions. OSF reports no content changes, deletions or data loss. L3 reflects a research platform’s confirmed intrusion; it does not imply that private research files were downloaded.
