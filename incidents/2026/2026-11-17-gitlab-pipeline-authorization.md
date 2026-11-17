---
title: GitLab patches access to protected pipeline variables and other secrets
level: 3
date: '2026-11-17'
tags: [GitLab, CI/CD, Kubernetes, Access control]
summary: GitLab fixed a race in pipeline job authorization that can expose protected CI/CD variables to an authenticated user under certain conditions. The same patch batch fixes two stored script-injection flaws and a workspace issue affecting Kubernetes Secrets.
splash: Self-managed GitLab CE/EE before the fixed versions. Workspace exposure requires a cluster connected through the GitLab agent.
wipe: Upgrade to GitLab 19.5.6, 19.4.8 or 19.3.9 on the applicable branch and review access to sensitive pipeline and workspace secrets.
inTheWild: unknown
inTheWildNote: The vendor advisory does not describe exploitation in the wild.
cves:
- id: CVE-2026-18241
  score: 8.2
  name: Pipeline job authorization race
  description: An authenticated user may access protected CI/CD variables and resources under certain race conditions.
- id: CVE-2026-97187
  score: 7.6
  name: Workspace authorization bypass
  description: An authenticated user with high privileges (CVSS PR:H) may read Kubernetes Secrets from other namespaces through a connected GitLab agent.
- id: CVE-2026-105739
  score: 8.7
  name: Wiki cross-site scripting
  description: An authenticated user can inject JavaScript that runs when another user views a wiki page.
- id: CVE-2026-108153
  score: 8.7
  name: Error Tracking cross-site scripting
  description: An authenticated user can inject JavaScript that runs when another user views an Error Tracking page.
fixed:
- {product: GitLab CE/EE 19.5, branch: '19.5', version: '19.5.6'}
- {product: GitLab CE/EE 19.4, branch: '19.4', version: '19.4.8'}
- {product: GitLab CE/EE 19.3, branch: '19.3', version: '19.3.9'}
timeline:
- date: Nov 16, 2026
  title: GitLab releases three patched versions
  body: GitLab lists November 16 as the release date for 19.5.6, 19.4.8 and 19.3.9.
- date: Nov 17, 2026
  title: Pipeline authorization CVE is published
  body: The GitLab CNA record details the CI/CD authorization race and fixed branches.
checklist:
- title: Upgrade the self-managed instance and verify its version
  hint: Check the installed edition and version using the GitLab Admin area or package manager. Follow GitLab’s upgrade path from your installed version. Apply the fixed release for your branch or upgrade to a supported fixed branch, then confirm the running instance and test a representative protected pipeline.
- title: Review pipelines and connected workspaces for unexpected access
  hint: Review available pipeline and job logs, audit events and Kubernetes API audit logs for unexpected users, jobs and cross-namespace Secret reads. Preserve relevant records. If exposure is suspected, revoke and reissue affected CI/CD secrets and Kubernetes credentials at their issuers and update legitimate jobs that use them.
- title: Review wiki and Error Tracking activity
  hint: Inspect recent edits and unusual input to affected wiki and Error Tracking pages. If you find injected scripts, remove them after preserving evidence and review sessions and tokens for the users who opened those pages.
sources:
- name: GitLab security patch release
  url: https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-6-released/
  primary: true
  says: Gives release dates, fixed versions, affected features and CVSS scores for the patch batch.
- name: GitLab CNA record for the CI/CD authorization race
  url: https://cveawg.mitre.org/api/cve/CVE-2026-18241
  primary: true
  says: Gives the publication time, authentication prerequisite and affected versions for the pipeline race.
---

The pipeline authorization race affects GitLab CE/EE from 9.3 before 19.3.9, on 19.4 before 19.4.8, and on 19.5 before 19.5.6. GitLab says an authenticated user could access protected CI/CD variables and resources under certain conditions. It has not published the precise race trigger in the advisory.

The workspace flaw affects GitLab CE/EE from 17.6 up to the applicable fixed release, and requires a cluster connected through the GitLab agent for Kubernetes. The wiki and Error Tracking flaws affect CE/EE starting at 17.2 and 16.1 respectively, up to the applicable fixed releases. In both script-injection cases an attacker must be authenticated and a user must view an affected page. GitLab’s release notes list the other fixes in this batch. Use the [GitLab upgrade path guide](https://docs.gitlab.com/update/upgrade_paths/) to identify required stops from your installed version.
