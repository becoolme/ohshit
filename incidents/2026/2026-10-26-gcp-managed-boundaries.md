---
title: Google discloses patched Compute Engine disk authorization and Application Integration code-execution flaws
level: 3
date: 2026-10-26
tags:
- Google Cloud
- IAM
- managed services
ecosystems:
- gcp
summary: Google’s October 26/28 bulletins disclose an IAM bypass for Compute Engine disk data and authenticated code execution in Application Integration. Both were patched server-side before disclosure; Google requests no customer update.
splash: Previously affected Compute Engine authorization and Application Integration SubWorkflow handling; authentication required
wipe: No customer patch required; review relevant access and integrations under your normal audit process
inTheWild: unknown
inTheWildNote: The bulletins do not report exploitation or a victim count.
cves:
- id: CVE-2026-85299
  name: Compute Engine disk authorization bypass
  description: Before the August 31 server-side fix, a user could exfiltrate disk data without the required IAM permissions.
- id: CVE-2026-93327
  name: SubWorkflow unsafe deserialization
  description: Before the September 11 server-side fix, an authenticated user could submit a crafted serialized object to execute code in Application Integration.
fixed:
- product: Compute Engine
  version: Provider patch, August 31, 2026
- product: Application Integration
  version: Provider patch, September 11, 2026
timeline:
- date: Aug 31, 2026
  title: Compute Engine issue patched
- date: Sep 11, 2026
  title: Application Integration issue patched
- date: Oct 26, 2026
  title: GCP-2026-073 discloses the disk authorization flaw
- date: Oct 28, 2026
  title: GCP-2026-074 discloses the deserialization flaw
checklist:
- title: Confirm service-specific notices
  hint: Google says no customer action is required to apply either patch. These notices do not call for a guest OS or SDK upgrade.
- title: Keep the exposure assessment scoped
  hint: 'General audit guidance: review relevant disk access, IAM changes and integration execution records. Consult Google Cloud Support about suspected historical misuse; the bulletins publish no campaign-specific indicators.'
sources:
- name: Google Cloud GCP-2026-073 and GCP-2026-074
  url: https://docs.cloud.google.com/support/bulletins
  primary: true
  says: Disclosure dates, prerequisites and completed provider patches.
---

These are separate flaws summarized from adjacent managed-service bulletins. L3 reflects cloud authorization and code-execution boundaries, not evidence that Google Cloud is currently breached.
