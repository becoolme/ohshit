---
title: Git 2.56.1 fixes recursive-clone code execution and five other vulnerabilities
level: 3
date: '2026-11-10'
tags:
- Git
- RCE
- CI/CD
summary: Git fixed six bugs across seven release lines. Recursively cloning a repository hosted by an attacker can run code on the cloning host. Other flaws affect untrusted refs, tags, merges, binary patches and fast-import streams.
splash: Git clients and automation recursively cloning attacker-hosted repositories or processing other crafted Git inputs.
wipe: Upgrade Git to 2.56.1 or its patched maintenance release. Update bundled copies and GitHub Enterprise Server separately.
inTheWild: unknown
inTheWildNote: The maintainer confirms the attack path. No in-the-wild exploitation was verified.
cves:
- id: CVE-2026-111760
  name: Code execution during recursive clone
  description: A crafted path can overwrite the submodule gitfile with a symlink to attacker-controlled Git configuration or hooks. The maintainer describes an attacker-hosted repository cloned with --recurse-submodules.
- id: CVE-2026-113408
  name: Path traversal through an unborn HEAD
  description: Cloning from a malicious protocol v2 server with the files reference backend can leave a malformed unborn HEAD target. A later branch update can write outside the reference directory.
- id: CVE-2026-114467
  name: Stack corruption when merging signed tags
  description: Merging a crafted tag with more than two GPG signatures can corrupt the stack and crash Git, including on a service that performs that merge.
- id: CVE-2026-114469
  name: Out-of-bounds read in binary patches
  description: Applying a compressed binary patch with an oversized expanded form can bypass the input limit and crash Git.
- id: CVE-2026-105437
  name: Heap overflow in large three-way merges
  description: Large merge output can overflow a size calculation. A crafted conflict-marker-size can amplify it when the operation reads attributes from the relevant tree.
- id: CVE-2026-114466
  name: Filesystem access through fast-import streams
  description: Untrusted stream directives can read files through submodule mark rewriting or create and append to files through export-pack-edges. Patched Git gates them behind --allow-unsafe-features.
fixed:
- product: Git 2.56
  branch: '2.56'
  version: 2.56.1
- product: Git 2.55
  branch: '2.55'
  version: 2.55.1
- product: Git 2.54
  branch: '2.54'
  version: 2.54.1
- product: Git 2.53
  branch: '2.53'
  version: 2.53.1
- product: Git 2.52
  branch: '2.52'
  version: 2.52.1
- product: Git 2.51
  branch: '2.51'
  version: 2.51.3
- product: Git 2.50
  branch: '2.50'
  version: 2.50.2
timeline:
- date: Nov 10, 2026
  title: Git publishes six fixes
  body: Git 2.56.1 and six maintenance releases are available. GitHub reports hosted-service fixes and lists GitHub Enterprise Server updates.
checklist:
- title: Update every copy of Git that handles external input
  hint: Run git --version on workstations, CI runners and hosts that import or merge repositories. Install the matching patched upstream release or your distributor’s backport. Rebuild runner images and verify their effective Git version. Update clients that bundle Git via their own distributor.
- title: Update GitHub Enterprise Server and verify CI images
  hint: For GitHub Enterprise Server install 3.19.15, 3.20.11, 3.21.9 or 3.22.4 for your release line. On managed CI check the image or job log for the actual installed Git version.
- title: Restrict untrusted Git operations while patching
  hint: Clone only from trusted servers. Disable recursive clones and automatic submodule checkout for untrusted repositories. Hold untrusted merges, tags, binary patches and fast-import streams. Do not enable --allow-unsafe-features for an untrusted generator.
- title: Investigate suspicious prior operations
  hint: Correlate checkout or import logs with the remote URL, job identity and any unexpected processes. Preserve runner logs and isolate affected hosts if suspicious execution is found. Rebuild from trusted images and revoke exposed credentials at their issuers.
sources:
- name: Git maintainer announcement on GitHub
  url: https://github.blog/open-source/git/git-security-vulnerabilities-announced-7/
  says: Six fixes, upstream release versions, GitHub deployments and temporary mitigations.
  primary: true
- name: Git maintainer on oss-security
  url: https://www.openwall.com/lists/oss-security/2026/11/11/10
  says: Detailed trigger conditions, release coverage and filesystem behavior.
  primary: true
- name: Git recursive-clone advisory
  url: https://github.com/git/git/security/advisories/GHSA-vp2w-7xxj-jvxr
  says: Recursive-clone attack prerequisites and workaround. Use the release announcement for the shipped fixes.
  primary: true
---

Git's November release addresses a code execution path where a very long index entry passes path validation under one name and is written under a truncated name. In the recursive-clone path the write can replace a submodule's gitfile with a symlink. The code then runs with the privileges of the user or job performing the clone. The maintainer describes a repository hosted by the attacker and a recursive clone using `--recurse-submodules`.

GitHub reports fixes on GitHub.com and GitHub Enterprise Cloud, including data residency. Its November 10 announcement lists GitHub Enterprise Server updates separately and describes patched Git for Actions, Codespaces, GitHub Desktop and the Copilot app as forthcoming. Verify the installed version in the environment where Git actually runs. Distribution packages may carry backported fixes under different package versions.

The other five vulnerabilities have distinct inputs. For example, an attacker can trigger the three-way merge flaw through a service that checks mergeability using attributes from the proposed tree. Avoid untrusted inputs until the relevant service has been updated.
