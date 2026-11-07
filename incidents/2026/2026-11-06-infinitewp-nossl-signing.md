---
date: '2026-11-06'
title: InfiniteWP Client NOSSL signing key can be recovered from a captured request
level: 3
tags:
- WordPress
- InfiniteWP
- Authentication
ecosystems:
- wordpress
summary: A researcher recovered the management signing key for a NOSSL-enrolled InfiniteWP Client 1.13.10 test site from one captured request and the panel public key. A forged request changed database options. Restrict or disable the management channel while confirming remediation.
splash: InfiniteWP Client 1.13.10 sites enrolled in NOSSL mode. Key recovery needs a captured signed request and the panel public key.
wipe: Confirm the enrollment mode, restrict or disable vulnerable management access and investigate unexpected commands.
inTheWild: 'no'
inTheWildNote: The researcher demonstrated key recovery and forgery on a controlled test instance.
timeline:
- date: Nov 6, 2026
  title: Researcher publishes the NOSSL key-recovery demonstration
  body: The researcher recovered the test key offline in 291.9 seconds and used it to forge a state-changing command.
checklist:
- title: Identify NOSSL-enrolled sites
  hint: Inventory InfiniteWP Client versions and review each site’s enrollment with the panel administrator. The panel can select NOSSL even on RSA-capable hosts. An HTTPS endpoint or RSA-capable PHP runtime alone does not establish which enrollment is active.
- title: Contain the vulnerable management channel
  hint: Restrict management requests to the trusted panel path at the gateway, or disable the client plugin if the path cannot be constrained. Confirm the enrollment and replacement procedure with InfiniteWP before restoring access. The reviewed changelog does not identify a fix for this report.
- title: Investigate possible command forgery
  hint: Preserve WordPress and gateway logs plus the panel’s command history. Compare unexpected management requests and changes to database options against known panel actions. If unauthorized activity is found, follow the site incident procedure, rebuild from known-good artifacts where needed and rotate affected credentials from a clean system.
sources:
- name: Researcher disclosure on oss-security
  url: https://www.openwall.com/lists/oss-security/2026/11/06/29
  primary: true
  says: Describes the tested version, NOSSL enrollment, key-recovery prerequisites, timing and controlled command forgery.
- name: Researcher publication
  url: https://github.com/the-knell/Thirty-One-Bits
  primary: true
  says: Documents the experiment and links the signed paper.
- name: InfiniteWP Client WordPress listing
  url: https://wordpress.org/plugins/iwp-client/
  primary: true
  says: Vendor listing and changelog for the client plugin. No fix for this report was established from the reviewed listing.
---

NOSSL derives its management key from a public prefix and at most 31 bits of secret randomness. The researcher used the panel public key and a captured `get_stats` request to test candidates offline. A forged `maintain_site` request then wrote new database options on the test site. The signed fields cover the action and message ID while leaving parameters out.

The result applies to NOSSL enrollment. The approximately 200,000 installations cited in the report describe the whole plugin, and the number enrolled in NOSSL is unknown. The report establishes a controlled demonstration.
